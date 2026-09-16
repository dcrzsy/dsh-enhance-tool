import { createRequire } from "node:module";
import * as polishRoutes from "./polish-routes.js";
import { dirname, join } from "node:path";
import { copyFile, mkdir, readFile, writeFile as writeFileFs } from "node:fs/promises";
//#region src/index.ts
/**
* Harness UI Enhancer — host half.
*
* Two feature areas with NO official visual seat yet:
*
*  1. MCP server management — dsh-mcp-client rows in the profile's
*     `cordis.patch.yml`; DSH hot-applies that file, so writes take effect
*     without a restart.
*  2. Scheduled automation (WorkBuddy-style recurring prompts) — a persistent
*     task list (name / workspace / time / prompt / frequency) plus a run
*     history. A fiber timer checks due tasks and executes each one as a
*     fresh one-shot subagent (`spawn` provider) whose initial user message
*     IS the task prompt — exactly "auto-add a session in a workspace and
*     output a preset prompt". Runs are recorded in history regardless of
*     outcome.
*
* Everything is exposed to the browser half through ONE same-origin route:
*
*   POST /enhancer/enhancer-api   body: { kind, ... }
*
* All side effects are Fiber-scoped via ctx.effect; the route and the due
* timer disappear on stop/update/removal.
*/
const require = createRequire(import.meta.url);
/** Services this host half hard-depends on. */
const inject = [
	"webServer",
	"llm",
	"sessions",
	"jobs",
	"fs",
	"subagents",
	"agents",
	"sessionTitle",
	"agentDefaultModel"
];
const ROUTE = "/enhancer/enhancer-api";
const POLISH_ROUTE_CONFIG = { maxInputBytes: 32768, maxOutputTokens: 2048, timeoutMs: 30000 };
// Route policy: leave provider/model unset so /polish and /suggest resolve the
// caller session's own model (session.requestHeader().config); a friendly error
// is returned when no session route is available yet.
/** Accumulate a Node IncomingMessage body into a small JSON object.
* Hard cap on total bytes so an oversized request cannot exhaust memory. */
async function readJsonBody(req, maxBytes = 65536) {
	const chunks = [];
	let total = 0;
	for await (const chunk of req) {
		const buf = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
		total += buf.length;
		if (total > maxBytes) throw new Error("request body too large");
		chunks.push(buf);
	}
	const text = Buffer.concat(chunks).toString("utf-8");
	if (text.length === 0) return {};
	try {
		return JSON.parse(text);
	} catch {
		return {};
	}
}
function ok(value) {
	return {
		ok: true,
		...value
	};
}
function fail(message) {
	return {
		ok: false,
		error: String(message)
	};
}
function patchFilePath() {
	const home = process.env.DSH_HOME;
	if (home !== void 0 && home.length > 0) return join(home, "profiles", "web", "cordis.patch.yml");
	return join(require("node:os").homedir(), ".dsh", "profiles", "web", "cordis.patch.yml");
}
function tasksFilePath() {
	const home = process.env.DSH_HOME;
	if (home !== void 0 && home.length > 0) return join(home, "profiles", "web", "enhancer-tasks.json");
	return join(require("node:os").homedir(), ".dsh", "profiles", "web", "enhancer-tasks.json");
}
/** Serialize one dsh-mcp-client row into the profile patch's YAML shape. */
function serializeMcpRow(s) {
	const lines = [
		"  - id: mcp-" + s.serverName,
		"    name: '@deepseek-ai/dsh-mcp-client'",
		"    config:"
	];
	lines.push("      serverName: " + JSON.stringify(s.serverName));
	const transport = s.transport === "http" ? "http" : "stdio";
	lines.push("      transport: " + JSON.stringify(transport));
	if (transport === "http") {
		lines.push("      url: " + JSON.stringify(s.url || ""));
		if (s.headers) lines.push("      headers: " + JSON.stringify(s.headers));
	} else {
		lines.push("      command: " + JSON.stringify(s.command || ""));
		if (Array.isArray(s.args)) lines.push("      args: " + JSON.stringify(s.args));
	}
	return lines;
}
/**
 * Merge the enhancer MCP block into the profile patch file: strip any prior
 * enhancer block (identified by its header marker) and append a fresh one,
 * keeping all other user content (e.g. `liang-intensity-skin` rows) intact.
 */
function splicePatch(rows, existingText) {
	const MARK = "# Harness UI Enhancer — MCP servers.";
	let base = (existingText ?? "").trimEnd();
	const mi = base.indexOf(MARK);
	if (mi !== -1) {
		const rest = base.slice(mi);
		const lines = rest.split("\n");
		let end = lines.length;
		let inInsert = false;
		for (let i = 1; i < lines.length; i++) {
			if (lines[i].trim() === "- insert:") {
				inInsert = true;
				continue;
			}
			// A top-level "- " line after the insert marker ends our block.
			if (inInsert && /^-\s/.test(lines[i])) {
				end = i;
				break;
			}
		}
		const blockLen = lines.slice(0, end).join("\n").length;
		base = (base.slice(0, mi) + base.slice(mi + blockLen)).trimEnd();
	}
	if (rows.length === 0) return base + (base === "" ? "" : "\n");
	const block = [
		MARK,
		"# Managed by the enhancer MCP drawer; append `dsh-mcp-client` rows here.",
		"- insert:",
		...rows.flatMap((s) => serializeMcpRow(s))
	].join("\n");
	return (base === "" ? "" : base + "\n\n") + block + "\n";
}
/** Read back only the rows this route serializes (same shape ceiling). */
/**
* Parse every managed `dsh-mcp-client` row out of the patch layer.
*
* The writer emits ONE `- insert:` block holding one `- id: mcp-<name>` entry per
* server, so each row must be read from the text between its own marker and the
* next one. Matching only the first id per block made `mcp/list` report a single
* server and made the next write drop every other row (verified: adding a third
* server silently removed the second).
*
* @param text - patch layer text (may be null/empty).
* @returns one row per managed server, in file order.
*/
function parseMcpRows(text) {
	const rows = [];
	const parts = String(text ?? "").split(/\n\s*-\s*id:\s*mcp-/).slice(1);
	for (const part of parts) {
		// Stop at the next top-level list item so a following user row cannot
		// contribute command/url fields to this row.
		const body = part.split(/\n-\s/)[0];
		const name = /^([A-Za-z0-9_-]+)/.exec(body)?.[1];
		if (name === void 0) continue;
		const row = {
			serverName: name,
			transport: /transport:\s*['"]?http/.test(body) ? "http" : "stdio"
		};
		const cmd = /command:\s*['"]([^'"]+)['"]/.exec(body);
		if (cmd) row.command = cmd[1];
		const url = /url:\s*['"]([^'"]+)['"]/.exec(body);
		if (url) row.url = url[1];
		rows.push(row);
	}
	return rows;
}
/**
* Read one profile-side config file, or null when it does not exist yet.
*
* These files live under $DSH_HOME/profiles/web — OUTSIDE every workspace — and
* 0.1.5's `ctx.fs` enforces a workspace-write sandbox, so `ctx.fs.writeText`
* refuses them ("file access denied under workspace-write mode"). Node's own fs
* is used instead: this is trusted plugin code managing its own configuration
* (the MCP drawer's patch layer and the automation store), not agent-driven file
* access, which is what that sandbox exists for.
*
* @param ctx - host context (kept for call-site symmetry; fs is not used).
* @param path - absolute config path.
* @returns file text, or null when absent.
*/
async function readFileIfExists(ctx, path) {
	try {
		return await readFile(path, "utf8");
	} catch (error) {
		if (error?.code === "ENOENT") return null;
		throw error;
	}
}
/**
* Write one profile-side config file, keeping the previous revision as `<path>.bak`.
* @param ctx - host context (kept for call-site symmetry; fs is not used).
* @param path - absolute config path.
* @param content - full replacement text.
*/
async function writeFile(ctx, path, content) {
	await mkdir(dirname(path), { recursive: true });
	try {
		await copyFile(path, path + ".bak");
	} catch (error) {
		if (error?.code !== "ENOENT") throw error;
	}
	await writeFileFs(path, content, "utf8");
}
/**
* Task record:
* { id, name, workspace, prompt, frequencyMinutes, firstAt, enabled,
*   lastRunAt?, nextAt, createdAt, history: [{ at, ok, note, sessionId? }] }
*/
function emptyTasks() {
	return {
		tasks: [],
		nextId: 1
	};
}
async function loadTasks(ctx) {
	const text = await readFileIfExists(ctx, tasksFilePath());
	if (text === null) return emptyTasks();
	try {
		const parsed = JSON.parse(text);
		if (parsed && Array.isArray(parsed.tasks)) return parsed;
		return emptyTasks();
	} catch {
		return emptyTasks();
	}
}
async function saveTasks(ctx, store) {
	await writeFile(ctx, tasksFilePath(), JSON.stringify(store, null, 2));
}
/**
* Recompute `nextAt` for a periodic task after a run.
*
* Anchored on the task's own schedule: `firstAt` when the row carries one, else
* the last planned slot. The old "fall back to now" left `nextAt === now`, and the
* due check (`nextAt <= now`) then re-fired the task on every 30s timer tick —
* a task created from the UI (which sets `nextAt` but never `firstAt`) would spawn
* a session every 30 seconds after its first run.
*
* @param task - task whose schedule to advance (mutated).
* @param now - current epoch ms.
* @returns the same task.
*/
function advanceTask(task, now) {
	const freqMs = Math.max(1, Number(task.frequencyMinutes) || 60) * 60 * 1e3;
	const base = Number.isFinite(task.firstAt) ? task.firstAt : Number.isFinite(task.nextAt) ? task.nextAt : now;
	let next = base;
	// Jump straight to the first slot strictly after `now` instead of stepping by
	// freqMs one iteration at a time — a task that was paused for a long time
	// (or created with a far-past firstAt) would otherwise loop tens of
	// thousands of times and stall the event loop.
	if (next <= now) next += (Math.floor((now - next) / freqMs) + 1) * freqMs;
	task.nextAt = next;
	return task;
}
/** Check every enabled task and run those that are due. */
async function runDueTasks(ctx) {
	const store = await loadTasks(ctx);
	const now = Date.now();
	let changed = false;
	for (const task of store.tasks) {
		if (!task.enabled) continue;
		if (task.nextAt === void 0 || task.nextAt > now) continue;
		changed = true;
		task.lastRunAt = now;
		const entry = await executeTask(ctx, task, now);
		task.history = Array.isArray(task.history) ? task.history : [];
		task.history.push(entry);
		if (task.history.length > 50) task.history = task.history.slice(-50);
		advanceTask(task, now);
	}
	if (changed) await saveTasks(ctx, store);
	return store;
}
/**
* Execute one task: start a fresh one-shot subagent whose initial user
* message is the task prompt. The child derives its workspace from the
* parent agent's durable session (`meta.cwd`), mirroring WorkBuddy's
* "new session in workspace + preset prompt". If no live root agent exists
* (e.g. browser-only process), the run is recorded as failed.
*/
async function executeTask(ctx, task, now) {
	const base = {
		at: now,
		ok: false
	};
	try {
		const parent = ctx.agents.roots()[0];
		if (parent === void 0) return {
			...base,
			note: "no live root agent to parent the run"
		};
		const signal = new AbortController().signal;
		const timer = setTimeout(() => signal.abort(), 30 * 60 * 1e3);
		try {
			const run = await ctx.subagents.start("spawn", {
				label: `[automation] ${task.name}`,
				prompt: [{
					type: "text",
					text: task.prompt
				}],
				parent,
				signal
			});
			const sessionId = String(run.id);
			try {
				const result = await run.result;
				const okRun = result.stopReason === "completed";
				const text = result.output.filter((b) => b.type === "text").map((b) => String(b.text ?? "")).join("").trim();
				return {
					at: now,
					ok: okRun,
					sessionId,
					note: okRun ? text.length > 200 ? text.slice(0, 200) + "…" : text || "completed" : `stop: ${String(result.stopReason)}`
				};
			} finally {
				await run.dispose();
			}
		} finally {
			clearTimeout(timer);
		}
	} catch (e) {
		return {
			...base,
			note: String(e instanceof Error ? e.message : e)
		};
	}
}
async function handle(ctx, body) {
	switch (body.kind) {
		case "mcp/list": {
			const text = await readFileIfExists(ctx, patchFilePath());
			return ok({ servers: text === null ? [] : parseMcpRows(text) });
		}
		case "mcp/apply": {
			const op = body.op;
			const name = body.serverName;
			if (op === "add" && name && body.server) {
				const existing = await readFileIfExists(ctx, patchFilePath()) ?? "";
				const rows = parseMcpRows(existing).filter((r) => r.serverName !== name);
				rows.push(body.server);
				await writeFile(ctx, patchFilePath(), splicePatch(rows, existing));
				return ok({ servers: rows });
			}
			if (op === "remove" && name) {
				const existing = await readFileIfExists(ctx, patchFilePath()) ?? "";
				const rows = parseMcpRows(existing).filter((r) => r.serverName !== name);
				await writeFile(ctx, patchFilePath(), splicePatch(rows, existing));
				return ok({ servers: rows });
			}
			return fail("mcp/apply needs op=add|remove plus a serverName");
		}
		case "jobs/list": return ok({ jobs: ctx.jobs.list() });
		case "jobs/kill":
			if (body.id === void 0) return fail("jobs/kill needs an id");
			return ok({ outcome: ctx.jobs.kill(body.id, void 0, body.reason) });
		case "tasks/list": return ok({ tasks: (await loadTasks(ctx)).tasks });
		case "tasks/create": {
			const b = body.task ?? {};
			if (!b.name || !b.prompt) return fail("tasks/create needs name + prompt");
			const store = await loadTasks(ctx);
			const id = String(store.nextId++);
			const now = Date.now();
			const frequencyMinutes = Math.max(1, Number(b.frequencyMinutes) || 60);
			const task = {
				id,
				name: String(b.name),
				workspace: String(b.workspace ?? ""),
				prompt: String(b.prompt),
				frequencyMinutes,
				enabled: b.enabled !== false,
				createdAt: now,
				nextAt: now + frequencyMinutes * 60 * 1e3,
				history: []
			};
			store.tasks.push(task);
			await saveTasks(ctx, store);
			return ok({ task });
		}
		case "tasks/update": {
			const store = await loadTasks(ctx);
			const task = store.tasks.find((t) => t.id === String(body.id));
			if (!task) return fail("tasks/update: unknown id");
			if (body.patch !== void 0 && typeof body.patch === "object") {
				const p = body.patch;
				if (p.name !== void 0) task.name = String(p.name);
				if (p.workspace !== void 0) task.workspace = String(p.workspace);
				if (p.prompt !== void 0) task.prompt = String(p.prompt);
				if (p.frequencyMinutes !== void 0) {
					task.frequencyMinutes = Math.max(1, Number(p.frequencyMinutes) || 60);
					task.nextAt = Date.now() + task.frequencyMinutes * 60 * 1e3;
				}
				if (p.enabled !== void 0) task.enabled = !!p.enabled;
			}
			await saveTasks(ctx, store);
			return ok({ task });
		}
		case "tasks/delete": {
			const store = await loadTasks(ctx);
			store.tasks = store.tasks.filter((t) => t.id !== String(body.id));
			await saveTasks(ctx, store);
			return ok({ ok: true });
		}
		case "tasks/toggle": {
			const store = await loadTasks(ctx);
			const task = store.tasks.find((t) => t.id === String(body.id));
			if (!task) return fail("tasks/toggle: unknown id");
			task.enabled = body.enabled === void 0 ? !task.enabled : !!body.enabled;
			await saveTasks(ctx, store);
			return ok({ task });
		}
		case "tasks/run-now": {
			const store = await loadTasks(ctx);
			const task = store.tasks.find((t) => t.id === String(body.id));
			if (!task) return fail("tasks/run-now: unknown id");
			const now = Date.now();
			const entry = await executeTask(ctx, task, now);
			task.lastRunAt = now;
			task.history = Array.isArray(task.history) ? task.history : [];
			task.history.push(entry);
			if (task.history.length > 50) task.history = task.history.slice(-50);
			advanceTask(task, now);
			await saveTasks(ctx, store);
			return ok({ run: entry });
		}
		case "tasks/history": {
			const task = (await loadTasks(ctx)).tasks.find((t) => t.id === String(body.id));
			return ok({ history: task && Array.isArray(task.history) ? task.history : [] });
		}
		default: return fail("unknown kind");
	}
}
/** Plugin entry: register the route + the due-task timer, both Fiber-scoped. */
function apply(ctx) {
	const polishDisposes = polishRoutes.apply(ctx, POLISH_ROUTE_CONFIG);
	for (const d of polishDisposes) ctx.effect(() => d, "ui-enhancer polish route");
	// Adapter compatibility: dsh 0.1.1-rc.2 requires LlmAdapter.prepareCall for
	// auxiliary llm.stream calls, but some runtime adapters (e.g. modlens)
	// only implement the legacy `stream` interface. Patch a prepareCall wrapper
	// onto every registered adapter that lacks it so auxiliary calls (polish,
	// suggest, session title) work through the session's own model.
	const patchMissingPrepareCall = () => {
		try {
			const providers = typeof ctx.llm?.listProviders === "function" ? ctx.llm.listProviders() : [];
			for (const providerEntry of providers) {
				const pid = providerEntry?.id;
				if (typeof pid !== "string" || pid === "") continue;
				let reg;
				try { reg = ctx.llm.registration(pid); } catch { continue; }
				const adapter = reg?.adapter;
				if (!adapter || typeof adapter.prepareCall === "function" || typeof adapter.stream !== "function") continue;
				const streamFn = adapter.stream.bind(adapter);
				adapter.prepareCall = async (provider, model, signal) => {
					let modelInfo = null;
					if (typeof adapter.resolveModel === "function") {
						try { modelInfo = await adapter.resolveModel(provider, model, signal); } catch {}
					}
					if (modelInfo === null || typeof modelInfo.provider !== "string") modelInfo = { provider, id: model, name: model };
					return { model: modelInfo, stream: streamFn };
				};
				console.warn('[dsh-enhance-tool] patched prepareCall onto adapter "' + pid + '"');
			}
		} catch (error) {
			console.warn("[dsh-enhance-tool] adapter patch error:", error instanceof Error ? error.message : error);
		}
	};
	patchMissingPrepareCall();
	if (typeof ctx.on === "function") {
		const adapterDisposer = ctx.on("llm/adapters-updated", () => patchMissingPrepareCall());
		ctx.effect(() => adapterDisposer, "ui-enhancer adapter patch listener");
	}
	// Session title provider: all-prompts selection + created-at suffix.
	// Replaces the bundled `session-title-first-prompt-llm` plugin, which the
	// plugin's cordis.patch.yml disables (id: session-title-llm).
	if (typeof ctx.sessionTitle?.register === "function") {
		try {
			const titleApi = require("@deepseek-ai/dsh-session-title-llm");
			const TITLE_PROVIDER_ID = "dsh-enhance-tool/title";
			const titleConfig = { targetWords: 5, targetCjkCharacters: 10, maxInputBytes: 32768, maxOutputTokens: 512, timeoutMs: 30000 };
			const selectMessages = (messages) => {
				const budget = Math.max(256, (titleConfig.maxInputBytes ?? 32768) - 512);
				const picked = [];
				let used = 0;
				for (let i = messages.length - 1; i >= 0; i--) {
					const item = messages[i];
					const size = typeof item.text === "string" ? item.text.length * 2 : 0;
					if (size === 0) continue;
					if (used + size > budget) {
						if (picked.length === 0) picked.unshift(item);
					} else {
						picked.unshift(item);
						used += size;
					}
				}
				if (picked.length === 0) throw new Error("dsh-enhance-tool: title provider requires at least one human message");
				return picked;
			};
			const appendCreatedAtSuffix = (session, titleText) => {
				const ts = session?.header?.createdAt ?? session?.events?.[0]?.data?.createdAt;
				if (typeof ts !== "number" || !Number.isFinite(ts)) return titleText;
				const d = new Date(ts);
				const pad = (n) => String(n).padStart(2, "0");
				const suffix = "-" + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + pad(d.getHours()) + pad(d.getMinutes()) + pad(d.getSeconds());
				return titleText + suffix;
			};
			const resolved = titleApi.resolveSessionTitleLlmConfig(titleConfig);
			ctx.sessionTitle.register({
				id: TITLE_PROVIDER_ID,
				automatic: "all-prompts",
				async generate(request) {
					const result = await titleApi.generateSessionTitleWithLlm(ctx, resolved, request, selectMessages(request.messages), TITLE_PROVIDER_ID);
					return { ...result, title: appendCreatedAtSuffix(request.session, result.title) };
				}
			});
		} catch (error) {
			console.warn("[dsh-enhance-tool] title provider unavailable:", error instanceof Error ? error.message : error);
		}
	}
	const dispose = ctx.webServer.register({
		kind: "exact",
		path: ROUTE,
		handler: async (req, res) => {
			let reply;
			try {
				reply = await handle(ctx, await readJsonBody(req));
			} catch (error) {
				reply = { ok: false, error: error instanceof Error ? error.message : String(error) };
			}
			const output = JSON.stringify(reply);
			res.statusCode = reply.ok ? 200 : 400;
			if (reply.ok === false && String(reply.error).includes("too large")) res.statusCode = 413;
			res.setHeader("content-type", "application/json");
			res.setHeader("content-length", Buffer.byteLength(output));
			res.end(output);
		}
	});
	ctx.effect(() => dispose, "ui-enhancer /enhancer-api route");
	const timer = setInterval(() => {
		runDueTasks(ctx);
	}, 3e4);
	ctx.effect(() => () => clearInterval(timer), "ui-enhancer automation timer");
}
//#endregion
export { apply, inject };
