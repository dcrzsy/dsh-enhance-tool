import { createRequire } from "node:module";
import * as polishRoutes from "./polish-routes.js";
//#region src/index.ts
/**
* Harness UI Enhancer — host half.
*
* What lives here:
*
*  1. `/polish`, `/suggest`, `/prompt-library` — the composer's prompt tools
*     (registered by `./polish-routes.js`).
*  2. An adapter patch that fills in `prepareCall` for LLM adapters that lack it,
*     so those routes can use the caller session's own model route.
*  3. The session-title provider: all-prompts generation plus a
*     `-YYYYMMDDHHmmss` created-at suffix.
*
* MCP server management and the scheduled-automation panels were REMOVED from this
* plugin (they belonged to the harness, not to a UI enhancer, and dsh ships the MCP
* client runtime itself). The implementation is preserved in git history — see the
* commits up to 845f415, or `git show 845f415:lib/index.js`.
*
* All side effects are Fiber-scoped via ctx.effect, so stopping or removing the
* plugin removes its routes and listeners.
*/
const require = createRequire(import.meta.url);
/** Services this host half hard-depends on. */
const inject = [
	"webServer",
	"llm",
	"sessions",
	"sessionTitle",
	"agentDefaultModel"
];
const POLISH_ROUTE_CONFIG = { maxInputBytes: 32768, maxOutputTokens: 2048, timeoutMs: 30000 };
// Route policy: leave provider/model unset so /polish and /suggest resolve the
// caller session's own model (session.requestHeader().config); a friendly error
// is returned when no session route is available yet.
/** Plugin entry: prompt-tool routes, the adapter patch, and the title provider. */
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
}
//#endregion
export { apply, inject };
