import { BlockAssembler, createUserMessage } from "@deepseek-ai/dsh-llm";
import { copyFileSync, mkdirSync, readdirSync, readFileSync, renameSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { homedir } from "node:os";
import z from "@deepseek-ai/schemastery";
/** Polish API for the browser composer: rewrite a draft with the session LLM. */
const name = "polish";
/** Services required: the web server (route), the LLM runtime, and sessions (route fallback). */
const inject = ["webServer", "llm", "sessions", "agentDefaultModel"];
/** Route, framing, byte, token, and timeout policy. */
const Config = z.object({
	provider: z.string(),
	model: z.string(),
	maxInputBytes: z.number().default(32768),
	maxOutputTokens: z.number().default(2048),
	timeoutMs: z.number().default(30000)
});
/** Resolve the prompt-library JSON document path (default: ~/.dsh/prompts.json). */
function libraryPath() {
	const root = process.env.DSH_HOME ?? join(homedir(), ".dsh");
	return join(root, "prompts.json");
}
/** Read the persisted prompt list (absent/corrupt file yields an empty list). */
function readLibrary() {
	try {
		const raw = readFileSync(libraryPath(), "utf8");
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((item) => item !== null && typeof item === "object" && typeof item.id === "string" && typeof item.title === "string" && typeof item.text === "string");
	} catch {
		return [];
	}
}
/** Write the prompt list atomically (tmp file + rename), keeping rolling backups. */
function writeLibrary(items) {
	const path = libraryPath();
	mkdirSync(join(path, ".."), { recursive: true });
	try {
		if (readFileSync(path, "utf8").length > 0) {
			const bak = path + ".bak." + Date.now();
			copyFileSync(path, bak);
			const baks = readdirSync(join(path, "..")).filter((f) => /^prompts\.json\.bak\.[0-9]+$/.test(f)).sort();
			while (baks.length > 5) unlinkSync(join(path, "..", baks.shift()));
		}
	} catch {}
	const tmp = path + ".tmp";
	writeFileSync(tmp, JSON.stringify(items, null, 2));
	renameSync(tmp, path);
}
/** Serialize writes so concurrent POSTs cannot interleave and drop items. */
let writeChain = Promise.resolve();
function writeLibrarySerial(items) {
	writeChain = writeChain.then(() => writeLibrary(items));
	return writeChain;
}
/**
* Mount the /polish and /prompt-library JSON endpoints.
* /polish body: { text, requirement?, sessionId? } -> { ok: true, text }.
* /prompt-library: GET -> { ok: true, items }; POST { items } -> { ok: true }.
* @param ctx - host context with webServer, llm, and sessions services.
* @param config - validated route and call policy.
*/
/** Read a request body into a parsed JSON object with a byte cap. */
async function readBody(req, maxBytes) {
	const chunks = [];
	let total = 0;
	for await (const chunk of req) {
		const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
		total += buf.length;
		if (total > maxBytes) throw new Error("request body too large");
		chunks.push(buf);
	}
	return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

function apply(ctx, config) {
	const disposes = [];
	disposes.push(ctx.webServer.register({
		kind: "prefix",
		path: "/prompt-library",
		handler: async (req, res) => {
			if (req.method === "GET") {
				res.writeHead(200, { "content-type": "application/json" });
				res.end(JSON.stringify({ ok: true, items: readLibrary() }));
				return;
			}
			let body;
			try {
				body = await readBody(req, 65536);
			} catch (error) {
				res.writeHead(String(error).includes("too large") ? 413 : 400, { "content-type": "application/json" });
				res.end(JSON.stringify({ ok: false, error: String(error).includes("too large") ? "body too large" : "bad json" }));
				return;
			}
			const items = body?.items;
			if (!Array.isArray(items)) {
				res.writeHead(400, { "content-type": "application/json" });
				res.end(JSON.stringify({ ok: false, error: "items must be an array" }));
				return;
			}
			try {
				await writeLibrarySerial(items.filter((item) => item !== null && typeof item === "object" && typeof item.id === "string" && typeof item.title === "string" && typeof item.text === "string"));
				res.writeHead(200, { "content-type": "application/json" });
				res.end(JSON.stringify({ ok: true }));
			} catch (error) {
				res.writeHead(500, { "content-type": "application/json" });
				res.end(JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) }));
			}
		}
	}, "dsh-polish: /prompt-library route"));
	disposes.push(ctx.webServer.register({
		kind: "prefix",
		path: "/suggest",
		handler: async (req, res) => {
			let body;
			try { body = await readBody(req, 65536); } catch (error) { res.writeHead(String(error).includes("too large") ? 413 : 400, { "content-type": "application/json" }); res.end(JSON.stringify({ ok: false, error: String(error).includes("too large") ? "body too large" : "bad json" })); return; }
			const text = typeof body?.text === "string" ? body.text.trim() : "";
			if (text === "") { res.writeHead(400, { "content-type": "application/json" }); res.end(JSON.stringify({ ok: false, error: "empty text" })); return; }
			if (Buffer.byteLength(text, "utf8") > config.maxInputBytes) { res.writeHead(413, { "content-type": "application/json" }); res.end(JSON.stringify({ ok: false, error: "text too long" })); return; }
			// The user's own previous message, when the client could supply it. Without
			// it the model only saw the assistant's reply and produced generic guesses.
			const context = typeof body?.context === "string" ? body.context.trim().slice(0, 4000) : "";
			const route = resolveRoute(ctx, config, body);
			if (route === void 0) { res.writeHead(400, { "content-type": "application/json" }); res.end(JSON.stringify({ ok: false, error: "no model route configured: open a session and pick a model first" })); return; }
			try {
				const suggestions = await suggestReplies(ctx, config, route, text, context);
				res.writeHead(200, { "content-type": "application/json" });
				res.end(JSON.stringify({ ok: true, suggestions }));
			} catch (error) {
				res.writeHead(500, { "content-type": "application/json" });
				res.end(JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) }));
			}
		}
	}, "ui-enhancer: /suggest route"));
	disposes.push(ctx.webServer.register({
		kind: "prefix",
		path: "/polish",
		handler: async (req, res) => {
			let body;
			try {
				body = await readBody(req, 65536);
			} catch (error) {
				res.writeHead(String(error).includes("too large") ? 413 : 400, { "content-type": "application/json" });
				res.end(JSON.stringify({ ok: false, error: String(error).includes("too large") ? "body too large" : "bad json" }));
				return;
			}
			const text = typeof body?.text === "string" ? body.text : "";
			const requirement = typeof body?.requirement === "string" ? body.requirement.trim() : "";
			if (text.trim() === "") {
				res.writeHead(400, { "content-type": "application/json" });
				res.end(JSON.stringify({ ok: false, error: "empty text" }));
				return;
			}
			if (Buffer.byteLength(text, "utf8") > config.maxInputBytes) {
				res.writeHead(413, { "content-type": "application/json" });
				res.end(JSON.stringify({ ok: false, error: "text too long" }));
				return;
			}
			const route = resolveRoute(ctx, config, body);
			if (route === void 0) {
				res.writeHead(400, { "content-type": "application/json" });
				res.end(JSON.stringify({ ok: false, error: "no model route configured: open a session and pick a model first" }));
				return;
			}
			try {
				const result = await polishText(ctx, config, route, text, requirement);
				res.writeHead(200, { "content-type": "application/json" });
				res.end(JSON.stringify({ ok: true, text: result }));
			} catch (error) {
				res.writeHead(500, { "content-type": "application/json" });
				res.end(JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) }));
			}
		}
	}, "dsh-polish: /polish route"));
	return disposes;
}
/**
* Prefer the caller session's own model route; fall back to the configured pair.
* @param ctx - host context exposing the sessions service.
* @param config - validated plugin policy.
* @param body - parsed request body.
* @returns the provider/model pair, or undefined when neither source has one.
*/
function resolveRoute(ctx, config, body) {
	if (config.provider !== void 0 && config.model !== void 0) return {
		provider: config.provider,
		model: config.model
	};
	const sessionId = typeof body?.sessionId === "string" ? body.sessionId : void 0;
	if (sessionId !== void 0) {
		const session = ctx.sessions.get(sessionId);
		const header = session?.requestHeader?.();
		const route = header?.config;
		if (route !== void 0 && typeof route.provider === "string" && typeof route.model === "string") return {
			provider: route.provider,
			model: route.model
		};
	}
	try {
		const sel = ctx.agentDefaultModel?.currentSelection?.();
		if (sel && typeof sel.provider === "string" && typeof sel.model === "string") return {
			provider: sel.provider,
			model: sel.model
		};
	} catch {}
	return void 0;
}
/**
* Run one polishing call: system framing, streamed completion, text-only output.
* @param ctx - host context exposing the LLM runtime.
* @param config - validated call policy.
* @param route - resolved provider/model pair.
* @param text - draft text to polish.
* @param requirement - optional user requirement (empty = default style).
* @returns the polished text.
*/

/** Built-in route used when the session's own provider adapter is not usable
 * through the public llm.stream API (e.g. adapters that predate prepareCall). */
const FALLBACK_ROUTE = { provider: "deepseek-official", model: "deepseek-v4-flash" };

/** Stream once with one route; throws on finish error, returns text blocks. */
async function streamRoute(ctx, config, route, messages, system) {
	const controller = new AbortController();
	const timer = setTimeout(() => controller.abort(), config.timeoutMs);
	try {
		const assembler = new BlockAssembler();
		let __finish = null;
		for await (const chunk of ctx.llm.stream({
			provider: route.provider,
			model: route.model,
			messages,
			system,
			maxTokens: config.maxOutputTokens,
			signal: controller.signal
		})) { if (chunk.type === "finish") __finish = chunk; assembler.push(chunk); }
		if (__finish && __finish.reason && __finish.reason.kind === "error") throw new Error(`llm stream failed on ${route.provider}/${route.model}: ${__finish.reason.failure?.message ?? "unknown"}`);
		return assembler.blocks();
	} finally {
		clearTimeout(timer);
	}
}

async function polishText(ctx, config, route, text, requirement) {
	const system = [
		"You are a writing assistant that polishes the user's draft message.",
		"Return ONLY the polished text, with no quotes, prefixes, explanations, Markdown, or extra content.",
		"Preserve the original meaning and language; improve grammar, wording, and flow.",
		requirement === "" ? "Polish with the default natural style." : "Polish according to this requirement: " + requirement
	].join("\n");
	const messages = [createUserMessage({
		content: [{
			type: "text",
			text
		}],
		source: {
			kind: "plugin",
			plugin: "dsh-polish"
		}
	})];
		let blocks;
		try {
			blocks = await streamRoute(ctx, config, route, messages, system);
		} catch (error) {
			console.error("[ui-enhancer] polish route failed, falling back:", error.message);
			blocks = await streamRoute(ctx, config, FALLBACK_ROUTE, messages, system);
		}
		const take = (bs) => bs.filter((block) => block.type === "text").map((block) => block.text).join("").trim();
		let result = take(blocks);
		if (result === "") {
			blocks = await streamRoute(ctx, config, route, messages, system);
			result = take(blocks);
		}
		if (result === "") throw new Error("模型未返回内容，请稍后重试");
		return result;
}

async function suggestReplies(ctx, config, route, text, context) {
	const ask = typeof context === "string" ? context.trim() : "";
	const system = [
		"You predict what the user of a coding-assistant chat will type next.",
		"You receive the user's previous message (optional) and the assistant's latest message.",
		"Return exactly THREE candidate next messages from the user, as a JSON array of three strings.",
		"Rules:",
		"- The three must cover DIFFERENT intents (for example: push the work forward / ask why or for detail / change the approach or scope). Never return three paraphrases of one idea.",
		"- Write them in the SAME LANGUAGE as the conversation; if the assistant replied in Chinese, the candidates must be Chinese.",
		"- Keep each one under 30 characters, natural and directly sendable as a message.",
		"- No quotes, no markdown, no trailing punctuation, no empty filler such as a bare \"continue\" unless it is genuinely the best next move.",
		"Output ONLY the JSON array."
	].join(String.fromCharCode(10));
	const body = ask === "" ? text : [
		"The user's previous message:",
		ask,
		"",
		"The assistant's latest message:",
		text
	].join(String.fromCharCode(10));
	const messages = [createUserMessage({
		content: [{ type: "text", text: body }],
		source: { kind: "plugin", plugin: "ui-enhancer" }
	})];
		let blocks;
		try {
			blocks = await streamRoute(ctx, config, route, messages, system);
		} catch (error) {
			console.error("[ui-enhancer] suggest route failed, falling back:", error.message);
			blocks = await streamRoute(ctx, config, FALLBACK_ROUTE, messages, system);
		}
		const raw = blocks.filter((block) => block.type === "text").map((block) => block.text).join("").trim();
		if (raw === "") throw new Error("模型未返回内容，请稍后重试");
		const stripped = raw.replace(/^\s*\x60\x60\x60(?:json)?\s*/i, "").replace(/\s*\x60\x60\x60\s*$/, "").trim();
		let parsed;
		try { parsed = JSON.parse(stripped); } catch { parsed = null; }
		if (!Array.isArray(parsed)) throw new Error("suggest: model output was not a JSON array");
		const suggestions = parsed.filter((item) => typeof item === "string" && item.trim() !== "").map((item) => item.trim()).slice(0, 3);
		if (suggestions.length === 0) throw new Error("suggest: no valid suggestions produced");
		return suggestions;
}

export { Config, apply, inject, name };
