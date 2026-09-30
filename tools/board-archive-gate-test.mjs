#!/usr/bin/env node
/**
 * Gate lock-in tests for the board's 垃圾桶「清空」 (trash → empty) chain.
 *
 * The harmful path this file exists to keep closed
 * -------------------------------------------------
 * Really deleting a Session needs the `dsh-archived-chats` plugin's routes
 * (`/plugins/dsh-archived-chats/delete-all` → `/trash/purge`). On a dsh whose version
 * gate skipped that plugin (0.2.0-rc.2 skips archived-chats@1.4.5) those routes answer
 * 404/405, so "empty" can only degrade to "remove the cards from this board".
 *
 * The destructive ORDER is what matters: archiving through the core Workspace
 * controller hides a Session from every sidebar surface. A build that archives first
 * and then discovers the delete route is missing strips Sessions out of the sidebar
 * with nothing to undo it — the user believes the card was merely removed from the
 * board. The gate in `boardDeleteSessions` (`if (await boardArchiveAvailable() !== true)
 * … return`) must therefore stay BEFORE the `workspaces.archiveSession` loop, and the
 * archive must stay reversible through the core `workspaces.unarchiveSession`.
 *
 * Why a runtime slice ALONE was not enough (the round-2 review finding)
 * --------------------------------------------------------------------
 * The first version of this file only sliced the eight declarations of the 清空 chain
 * and asserted the order *inside* them. That is satisfied by any equivalent break that
 * moves the archive call OUT of the sliced range — e.g. adding
 * `for (const id of sessionIds) await boardBridge.workspaces.archiveSession(id)` to the
 * caller `purgeTrash`, which is a closure of the board component and was never sliced.
 * The "18/18 green" result on such a build was reported as F6. The suite therefore now
 * carries TWO independent nets, and the acceptance rule is explicit:
 *
 *   **ANY equivalent way of putting the archive call before the gate must turn this
 *   suite red, including moving it out of the sliced function's range.**
 *
 *   1. the runtime slice (groups A–F): when the archive plugin is unavailable, the
 *      owner must archive nothing at all;
 *   2. a whole-bundle ownership assertion (group G): the only declarations in the
 *      shipped `lib/client.js` that may reference the core `archiveSession` API or the
 *      `BOARD_ARCHIVE_BASE` route constant are the gated owner (`boardDeleteSessions`),
 *      its capability probe and the restore declarations — an EXPLICIT allow-list, so a
 *      newly added `boardArchive*` helper is not waved through. Every
 *      `BOARD_ARCHIVE_BASE` reference outside its own declaration must lie inside that
 *      set; the route literal may be spelled exactly once (at the declaration); every
 *      directly written `archiveSession` reference must lie inside the gated owner; and
 *      `boardBridge` may not be accessed with a computed key outside the allow-list.
 *
 *      Residual limitation (known, deliberate — not to be chased): these are TEXT-level
 *      assertions over **directly written references** (`BOARD_ARCHIVE_BASE`,
 *      `archiveSession`, `boardBridge[`). A deliberately obfuscated dynamic property
 *      name (e.g. `workspaces["arch" + "iveSession"](id)`) is NOT covered. Chasing every
 *      spelling variant would turn this suite into a brittle string maze — and this
 *      project has already been burned once by assertions coupled to the internals of
 *      `lib/client.js`. Why that is acceptable: the normal way to reach either primitive
 *      is to use the constant / the method name (both sit in the same file), so only a
 *      build that deliberately dodges review would sidestep this; the runtime net
 *      (groups A–F) still guarantees the SLICED owner archives nothing while the chain
 *      is unusable. Known gap, written down instead of asserted away.
 *
 * Groups
 * ------
 *   0  sanity canaries (always run, even in `--mutate`): the slice really is the
 *      shipped implementation and the archive path still exists;
 *   A  archived-chats unavailable (0.2.0): unavailable, ZERO core archive calls, the
 *      only request is the empty-id capability probe, probe cached false;
 *   B  capability available: core archive → /delete-all → /trash/purge, deleted list right;
 *   C  archived, then the purge dies: the outcome is distinguishable and the core
 *      unarchive takes it back (no session is left stranded in the archive);
 *   D  restore: the plugin's own /unarchive-all is used when it works (core untouched),
 *      and the core unarchive still restores when it answers 405;
 *   E  the probe request throws: the verdict is false and nothing is thrown;
 *   F  the probe said available but /delete-all died: the archived Session is still
 *      reported (so the caller can restore it) and the cached verdict is downgraded;
 *   G  ownership (whole bundle): every `BOARD_ARCHIVE_BASE` reference outside its own
 *      declaration must lie inside `boardDeleteSessions` or an allowed restore
 *      declaration; the route literal is spelled only at that declaration; every
 *      direct `archiveSession` reference lies inside the gated owner; no computed
 *      member access on `boardBridge` outside the owner; and inside the owner the gate
 *      exists, precedes the archive loop and is an early return.
 *
 * Why the implementation is sliced out of the bundle instead of re-implemented
 * ---------------------------------------------------------------------------
 * `lib/client.js` IS the shipped artifact (no src/ in this repo), so re-writing the
 * decision logic here would test a copy that can drift away from what users run. Every
 * declaration below is extracted from the current `lib/client.js` by delimiter
 * matching (the same idiom as `tools/board-logic-test.mjs`), and `fetch` +
 * `boardBridge.workspaces` are stubbed, so no browser, dsh boot or $DSH_HOME is needed.
 * If an anchor disappears, extraction throws and the suite fails — a canary, never a
 * silent pass.
 *
 * Usage
 * -----
 *   node tools/board-archive-gate-test.mjs                       # exit 0 = every group holds
 *   node tools/board-archive-gate-test.mjs --mutate <name>|all
 *   node tools/board-archive-gate-test.mjs --help
 *
 * Negative-control semantics: `--mutate <name>` rewrites the FULL bundle source in
 * memory (the repo file is never touched), re-slices it, and runs both the pristine and
 * the mutated suite. Exit 0 only when the pristine suite was completely green and the
 * mutated one turned red — i.e. only when this suite can actually catch the regression
 * it exists for. Exit 1 when the mutated build still passes (the net is vacuous), the
 * pristine build fails (the net cannot be interpreted), or a control cannot even be
 * applied to the source (that would mean the control is coupled to one code layout).
 * The controls cover the in-function break (`gate` = guard neutralized, `probe`,
 * `reorder` = gate and archive loop swapped) and the out-of-slice breaks the round-2
 * review used to defeat the previous version (`move`, `move-route`, `helper`,
 * `move-helper-route`, `inline`).
 *
 * `--mutate all` also exercises the ONE refactor this file tolerates: when the shipped
 * guard uses layout (a), the whole control set runs against a generated, semantically
 * equivalent source whose guard is hoisted into a local (layout (b), see
 * `hoistCapabilityIntoLocal`) — two sources, 16 detections. When the shipped guard is
 * ALREADY layout (b) no second source can be generated: the tool prints a note and runs
 * that single source (`… on 1 source(s)`, 8 detections). Either way the run must end
 * pristine-green + all-controls-red — that is what kept t9's O1 (a layout-(b) locator
 * bug that reddened CI for a legal refactor) from coming back.
 *
 * BOUNDARY — the tolerance is exactly these TWO layouts, on purpose:
 *   (a) `if (await boardArchiveAvailable() !== true) { … }`
 *   (b) `const capability = await boardArchiveAvailable(); if (capability !== true) { … }`
 * Formatting-only variations inside those two shapes are accepted (extra parentheses,
 * line breaks, comments, a different local name). A DEEPER but still equivalent refactor
 * that routes the decision through an intermediate boolean, e.g.
 *   `const capability = await boardArchiveAvailable(); const denied = capability !== true; if (denied) { … }`
 * is NOT located: `--mutate all` then exits 1 with `REFACTOR TOLERANCE FAILED …`. That is
 * a FALSE RED, never a missed regression — the main suite stays green (its assertions are
 * structural, not textual), every real break is still caught, and the failure names both
 * the cause and the way out. The locator is deliberately NOT widened for further variants:
 * each tolerated layer invites a deeper equivalent spelling, so the tolerance would be an
 * infinite recursion, and every widening couples this tool more tightly to how
 * `lib/client.js` happens to be written — a coupling that already broke two teammates'
 * work on the same day. So: if a new equivalent spelling causes a false red, bound the
 * claim (or write the guard in one of the two documented layouts) instead of growing the
 * locator. A false red is the acceptable failure direction; an over-reporting net is
 * safer than one that misses a destructive regression.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const SOURCE_PATH = join(here, '..', 'lib', 'client.js');
const source = readFileSync(SOURCE_PATH, 'utf8');

/** Index of the delimiter matching the one at `open`. */
function matchDelimiter(text, open) {
  const pairs = { '(': ')', '[': ']', '{': '}' };
  const closers = ')]}';
  let depth = 0;
  for (let i = open; i < text.length; i += 1) {
    const ch = text[i];
    if (pairs[ch] !== undefined) depth += 1;
    else if (closers.includes(ch)) {
      depth -= 1;
      if (depth === 0) return i;
    }
  }
  return -1;
}

/**
 * Locate one top-level (or nested-in-component) declaration by delimiter matching: a
 * `const`/`let` literal, or a (possibly async) `function NAME(...) { ... }` body.
 * Parameters are skipped, otherwise the scan would stop at the parameter list instead
 * of the body. Returns both the text and its `[start, end)` range in `src`, because the
 * ownership assertions (group G) must reason about positions in the whole bundle.
 * @returns {{ text: string, start: number, end: number }}
 */
function locate(name, src = source) {
  const literal = ['const', 'let']
    .map((kind) => src.indexOf(`${kind} ${name} = `))
    .filter((index) => index >= 0)
    .sort((a, b) => a - b)[0] ?? -1;
  const asyncFn = src.indexOf(`async function ${name}(`);
  const plainFn = src.indexOf(`function ${name}(`);
  const fn = asyncFn >= 0 && (plainFn < 0 || asyncFn < plainFn) ? asyncFn : plainFn;
  if (literal < 0 && fn < 0) throw new Error(`lib/client.js no longer defines ${name}`);
  if (literal >= 0 && (fn < 0 || literal < fn)) {
    const eq = src.indexOf('=', literal);
    const firstValue = src.slice(eq + 1).trimStart()[0];
    if (!'([{'.includes(firstValue)) {
      const end = src.indexOf(';', eq) + 1;
      return { text: src.slice(literal, end), start: literal, end };
    }
    const open = src.indexOf(firstValue, eq);
    const close = matchDelimiter(src, open);
    if (close < 0) throw new Error(`unterminated ${name}`);
    const end = src[close + 1] === ';' ? close + 2 : close + 1;
    return { text: src.slice(literal, end), start: literal, end };
  }
  const paramsOpen = src.indexOf('(', fn);
  const bodyOpen = src.indexOf('{', matchDelimiter(src, paramsOpen));
  const bodyClose = matchDelimiter(src, bodyOpen);
  if (bodyClose < 0) throw new Error(`unterminated ${name}`);
  return { text: src.slice(fn, bodyClose + 1), start: fn, end: bodyClose + 1 };
}

/**
 * Declarations the 清空 chain MUST have. The rest of the chain (`boardArchive*` /
 * `boardProbe*` top-level declarations) is discovered automatically, so an internal
 * refactor that adds a flag next to the probe does not silently drop it from the
 * sandbox (an undeclared identifier would only survive as a sloppy-mode implicit
 * global) — and a rename of a required name still throws, as a canary must.
 */
const REQUIRED = [
  'BOARD_ARCHIVE_BASE',
  'boardBridge',
  'boardArchiveProbe',
  'boardProbeArchiveRoutes',
  'boardArchiveAvailable',
  'boardDeleteSessions',
  'boardRestoreArchived',
  'boardRestoreSessions',
];

/** Required declarations plus every top-level `boardArchive*` / `boardProbe*` one. */
function namesOf(src) {
  const names = [...REQUIRED];
  for (const match of src.matchAll(/^(?:async )?(?:function|const|let) ([A-Za-z_$][\w$]*)/gm)) {
    const name = match[1];
    if (/^(boardArchive|boardProbe)/.test(name) && !names.includes(name)) names.push(name);
  }
  return names;
}

/** Extract every declaration of the chain from one source text. */
function sliceImpl(src) {
  return namesOf(src).map((name) => locate(name, src).text).join('\n');
}

/** Replace the `[start, end)` range of `text`. */
function replaceRange(text, start, end, replacement) {
  return text.slice(0, start) + replacement + text.slice(end);
}

/** Insert `insert` right after the first anchor that exists (any of them may vanish in a refactor). */
function insertAfter(text, anchors, insert) {
  for (const anchor of anchors) {
    const at = text.indexOf(anchor);
    if (at >= 0) return text.slice(0, at + anchor.length) + insert + text.slice(at + anchor.length);
  }
  throw new Error(`mutation anchor not found among: ${anchors.map((anchor) => anchor.slice(0, 40)).join(' | ')}`);
}

/** Insert `insert` right before the first anchor that exists. */
function insertBefore(text, anchors, insert) {
  for (const anchor of anchors) {
    const at = text.indexOf(anchor);
    if (at >= 0) return text.slice(0, at) + insert + text.slice(at);
  }
  throw new Error(`mutation anchor not found among: ${anchors.map((anchor) => anchor.slice(0, 40)).join(' | ')}`);
}

/**
 * The `if ( … )` block that consumes the `boardArchiveAvailable()` call inside the
 * sliced owner — the capability guard. Both layouts the owner has had are accepted:
 *   (a) `if (await boardArchiveAvailable() !== true) { … }` — the call is in the condition;
 *   (b) `const capability = await boardArchiveAvailable(); if (capability !== true) { … }`
 *       — the value is consumed by the immediately following `if`.
 * Anchor-free on purpose: an internal refactor of the guard must not break the controls.
 * That claim is not just asserted — `--mutate all` runs the whole control set against a
 * generated layout-(b) source, so a broken branch here fails loudly instead of silently
 * reddening CI for anyone who does the refactor (t9 finding O1: the layout-(b) slice
 * check included the statement's own `;` and never matched).
 *
 * Scope, deliberately bounded to the two shapes above (+ formatting-only variations):
 * a deeper equivalent that hides the decision behind another local
 * (`const denied = capability !== true; if (denied) { … }`) returns `null` here on
 * purpose, and `--mutate all` reports `REFACTOR TOLERANCE FAILED …` — a clean FALSE RED,
 * not a missed regression (the main suite reads structure, not text). See the BOUNDARY
 * note in the file header for why the locator is not widened further.
 * @returns {{ ifAt: number, condOpen: number, condClose: number, braceAt: number, closeAt: number }|null}
 */
function guardBlock(ownerText) {
  const callAt = ownerText.indexOf('boardArchiveAvailable');
  if (callAt < 0) return null;
  const rangeOf = (ifAt) => {
    const condOpen = ownerText.indexOf('(', ifAt);
    if (condOpen < 0) return null;
    const condClose = matchDelimiter(ownerText, condOpen);
    if (condClose < 0) return null;
    const braceAt = ownerText.indexOf('{', condClose);
    if (braceAt < 0 || braceAt - condClose > 40) return null;
    const closeAt = matchDelimiter(ownerText, braceAt);
    if (closeAt < 0) return null;
    return { ifAt, condOpen, condClose, braceAt, closeAt };
  };
  // (a) the call sits inside an `if ( … )` condition
  const beforeAt = ownerText.lastIndexOf('if (', callAt);
  if (beforeAt >= 0) {
    const candidate = rangeOf(beforeAt);
    if (candidate !== null && candidate.condClose > callAt && !/[;{}]/.test(ownerText.slice(candidate.condClose + 1, callAt))) return candidate;
  }
  // (b) the call is a statement whose value the next `if` consumes:
  //     `const capability = await boardArchiveAvailable();\n\tif (capability !== true) {`
  // The check below must start AFTER the terminating `;` itself — including it made the
  // `[;{}]` test always true, so this branch could never match and both `gate` and
  // `reorder` threw on a perfectly legal hoist-the-await refactor (t9 finding O1).
  const stmtEnd = ownerText.indexOf(';', callAt);
  if (stmtEnd >= 0) {
    let searchAt = stmtEnd + 1;
    for (let hops = 0; hops < 20; hops += 1) {
      const ifAt = ownerText.indexOf('if (', searchAt);
      if (ifAt < 0 || ifAt > stmtEnd + 120) break;
      if (!/[;{}]/.test(ownerText.slice(stmtEnd + 1, ifAt))) return rangeOf(ifAt);
      searchAt = ifAt + 4;
    }
  }
  return null;
}

/**
 * Structurally disarm the capability gate: rewrite the guard condition to `false`, so
 * the archive loop runs even when the chain is unusable.
 */
function neutralizeGate(ownerText) {
  const guard = guardBlock(ownerText);
  if (guard === null) throw new Error('could not locate the capability gate inside boardDeleteSessions');
  const rewritten = replaceRange(ownerText, guard.condOpen + 1, guard.condClose, 'false');
  if (!rewritten.includes('if (false)')) throw new Error('could not neutralize the capability gate inside boardDeleteSessions');
  return rewritten;
}

/** The braced `if ( … ) { … archiveSession … }` block that performs the core archiving. */
function archiveLoopBlock(ownerText) {
  const callAt = ownerText.indexOf('.archiveSession(');
  if (callAt < 0) throw new Error('boardDeleteSessions no longer contains a core archive loop');
  // Walk outward: the nearest preceding `if (` may be a brace-less one-liner inside the
  // loop (`if (archived.has(id)) continue;`), so accept only an `if` whose block brace
  // follows the condition immediately and whose body encloses the archive call.
  let searchAt = callAt;
  for (let hops = 0; hops < 40; hops += 1) {
    const ifAt = ownerText.lastIndexOf('if (', searchAt);
    if (ifAt < 0) break;
    const condOpen = ownerText.indexOf('(', ifAt);
    const condClose = matchDelimiter(ownerText, condOpen);
    if (condClose > 0) {
      const braceAt = ownerText.indexOf('{', condClose);
      if (braceAt >= 0 && braceAt < callAt && /^\s*$/.test(ownerText.slice(condClose + 1, braceAt))) {
        const closeAt = matchDelimiter(ownerText, braceAt);
        if (closeAt > callAt) return { ifAt, closeAt };
      }
    }
    searchAt = ifAt - 1;
  }
  throw new Error('could not find the block enclosing the core archive loop');
}

/**
 * The negative controls: ways to reopen the harmful path, applied to the FULL bundle
 * source in memory. `gate`/`reorder`/`probe` are caught by the runtime slice (group A)
 * and/or the in-owner ordering assertions; `move`, `helper`, `move-route`,
 * `move-helper-route` and `inline` are the out-of-slice breaks (the round-2 review's
 * escapes A and C, plus the original ones) — they are caught by the ownership group G.
 */
const CALLER_ROUTE_ANCHORS = [
  'const itemIds = ids.filter((id) => boardIsItem(state, id));',
  'const itemIds = ids.filter((id) => !boardIsItem(state, id));',
  'const sessionIds = ids.filter((id) => !boardIsItem(state, id));',
];
const MUTATIONS = {
  gate: {
    why: 'boardDeleteSessions archives BEFORE it can know the delete routes exist (the capability guard is short-circuited)',
    apply: (text) => {
      const owner = locate('boardDeleteSessions', text);
      return replaceRange(text, owner.start, owner.end, neutralizeGate(owner.text));
    },
  },
  reorder: {
    why: 'the gate still exists but runs AFTER the archive loop (the guard and the loop are swapped)',
    apply: (text) => {
      const owner = locate('boardDeleteSessions', text);
      const guard = guardBlock(owner.text);
      if (guard === null) throw new Error('could not locate the capability gate inside boardDeleteSessions');
      const loop = archiveLoopBlock(owner.text);
      if (guard.ifAt > loop.ifAt) throw new Error('reorder: the gate is already after the archive loop');
      const guardText = owner.text.slice(guard.ifAt, guard.closeAt + 1);
      const withoutGuard = owner.text.slice(0, guard.ifAt) + owner.text.slice(guard.closeAt + 1);
      const loopEnd = loop.closeAt + 1 - guardText.length;
      const reordered = withoutGuard.slice(0, loopEnd) + '\n\t' + guardText + withoutGuard.slice(loopEnd);
      return replaceRange(text, owner.start, owner.end, reordered);
    },
  },
  probe: {
    why: 'the capability probe always claims to be usable (boardProbeArchiveRoutes() is恒 true)',
    apply: (text) => {
      const probe = locate('boardProbeArchiveRoutes', text);
      return replaceRange(text, probe.start, probe.end, 'async function boardProbeArchiveRoutes() { return true; }');
    },
  },
  move: {
    why: 'the CALLER (清空 button handler) archives every session through the core API before boardDeleteSessions is asked — outside the sliced range',
    apply: (text) => insertAfter(text, CALLER_ROUTE_ANCHORS,
      '\n\t\t// REGRESSION (negative control): archive before asking whether the routes exist\n\t\tfor (const id of sessionIds) { try { await boardBridge.workspaces.archiveSession(id); } catch {} }'),
  },
  helper: {
    why: 'a NEW helper next to the caller owns the core archive call — a declaration outside boardDeleteSessions',
    apply: (text) => {
      const callAnchor = '\tconst purgeTrash = async (ids) => {';
      const withCall = insertAfter(text, [callAnchor], '\n\t\tawait boardArchiveAllFirst(ids);');
      return insertBefore(withCall, [callAnchor],
        '\tconst boardArchiveAllFirst = async (idsForArchive) => { for (const id of idsForArchive) { try { await boardBridge.workspaces.archiveSession(id); } catch {} } };\n');
    },
  },
  'move-route': {
    why: 'the CALLER calls /delete-all through the BOARD_ARCHIVE_BASE constant before boardDeleteSessions is asked (round-2 escape A: reusing the constant, not re-spelling the path)',
    apply: (text) => insertAfter(text, CALLER_ROUTE_ANCHORS,
      '\n\t\t// REGRESSION (negative control): drive the destructive route from the caller\n\t\tfor (const id of sessionIds) { try { await fetch(BOARD_ARCHIVE_BASE + "/delete-all", { method: "POST", headers: { "content-type": "application/json", "x-dsh-archived-chats": "1" }, body: JSON.stringify({ sessionIds: [id] }) }); } catch {} }'),
  },
  'move-helper-route': {
    why: 'a NEW top-level helper (boardArchivePurge) hand-rolls the route through the BOARD_ARCHIVE_BASE constant and the caller awaits it (round-2 escape C)',
    apply: (text) => {
      const owner = locate('boardDeleteSessions', text);
      const withHelper = replaceRange(text, owner.end, owner.end,
        '\nasync function boardArchivePurge() { try { await fetch(BOARD_ARCHIVE_BASE + "/trash/purge", { method: "POST", headers: { "content-type": "application/json", "x-dsh-archived-chats": "1" }, body: JSON.stringify({ ids: [] }) }); } catch {} }');
      return insertAfter(withHelper, ['\tconst purgeTrash = async (ids) => {'], '\n\t\tawait boardArchivePurge();');
    },
  },
  inline: {
    why: 'the caller re-spells the archived-chats route literal instead of going through the gated owner',
    apply: (text) => insertAfter(text, CALLER_ROUTE_ANCHORS,
      '\n\t\tfor (const id of sessionIds) { try { await fetch("/plugins/dsh-archived-chats/delete-all", { method: "POST", headers: { "content-type": "application/json", "x-dsh-archived-chats": "1" }, body: JSON.stringify({ sessionIds: [id] }) }); } catch {} }'),
  },
};

/**
 * A semantically equivalent rewrite of the capability guard: hoist the awaited probe
 * into a local and test that one —
 *   `const capability = await boardArchiveAvailable(); if (capability !== true) { … }`
 * The negative controls must keep working on it, and `--mutate all` checks exactly that
 * whenever the shipped guard is layout (a) (t9 finding O1: the layout-(b) branch had an
 * off-by-one that made both `gate` and `reorder` throw here). This helper produces the
 * ONE tolerated refactor — it is not a general "any equivalent guard" rewriter; see the
 * BOUNDARY note in the file header.
 * @returns {{ src: string, refactored: boolean }} `refactored` is false when the shipped
 * guard already uses the hoisted layout (then the tolerance pass reuses the source and
 * the driver prints a note; the run covers 1 source, not 2).
 */
function hoistCapabilityIntoLocal(src) {
  const owner = locate('boardDeleteSessions', src);
  const guard = guardBlock(owner.text);
  if (guard === null) throw new Error('could not locate the capability gate to hoist');
  const condition = owner.text.slice(guard.condOpen + 1, guard.condClose);
  const awaited = 'await boardArchiveAvailable()';
  if (!condition.includes(awaited)) return { src, refactored: false };
  const rewrittenOwner = owner.text.slice(0, guard.ifAt)
    + `const capability = ${awaited};\n\tif (capability !== true) `
    + owner.text.slice(guard.braceAt);
  return { src: replaceRange(src, owner.start, owner.end, rewrittenOwner), refactored: true };
}

const response = (status, body) => ({
  status,
  ok: status >= 200 && status < 300,
  text: async () => (body === undefined ? '' : JSON.stringify(body)),
});

/**
 * Build a sandbox from extracted source, with `fetch` and the Workspace controller
 * stubbed. `dispatch` is a stable function so the per-scenario stub can be swapped
 * between checks.
 */
function makeSandbox(implSource, names, dispatch) {
  const body = `${implSource}
return { ${names.join(', ')}, getProbe: () => boardArchiveProbe, setProbe: (value) => { boardArchiveProbe = value; } };`;
  return new Function('fetch', body)(dispatch);
}

/**
 * Run the suite against one full bundle source (groups 0 and A–G).
 * @param {string} src full `lib/client.js` text (pristine or mutated).
 * @returns {Promise<{ failures: string[], checks: Array<{group: string, label: string, ok: boolean}> }>}
 */
function runSuite(src, options = {}) {
  const { groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G'], verbose = true } = options;
  // group 0 is the sanity canary set and runs on EVERY path, including --mutate: the
  // previous version filtered it out (groups never contained '0'), so the one check
  // labelled "sanity" could never execute — a dead assertion.
  const activeGroups = new Set([...groups, '0']);
  const failures = [];
  const checks = [];
  const names = namesOf(src);
  const impl = names.map((name) => locate(name, src).text).join('\n');
  const ranges = Object.fromEntries(names.map((name) => [name, locate(name, src)]));
  const api = makeSandbox(impl, names, (...args) => currentFetch(...args));
  const bridge = api.boardBridge;
  let currentFetch = null;
  const calls = [];

  const check = (group, label, actual, expected) => {
    if (!activeGroups.has(group)) return;
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    checks.push({ group, label, ok, actual, expected });
    if (!ok) failures.push(`${group}: ${label}`);
    if (verbose) {
      console.log(`${ok ? 'ok  ' : 'FAIL'} ${group} ${label}${ok ? '' : `\n       expected ${JSON.stringify(expected)}\n       actual   ${JSON.stringify(actual)}`}`);
    }
  };

  const workspacesStub = () => ({
    archiveSession: async (id) => {
      calls.push({ op: 'core.archive', id });
      if (id === 'refused') throw new Error('archive refused');
    },
    unarchiveSession: async (id) => { calls.push({ op: 'core.unarchive', id }); },
    list: { getSnapshot: () => ({ archivedSessionIds: [] }) },
  });
  /** Fresh sandbox state between scenarios: cache cleared, calls cleared, stub in place. */
  const reset = () => {
    calls.length = 0;
    api.setProbe(null);
    bridge.workspaces = workspacesStub();
  };
  const archivedThroughCore = () => calls.filter((call) => call.op === 'core.archive').length;
  const record = (url, init) => `${init.method} ${url.replace('http://stub', '')} ${init.body}`;

  return (async () => {
    // ---- 0: sanity canaries (always run)
    const owner = ranges.boardDeleteSessions;
    const archiveHits = [...src.matchAll(/\barchiveSession\b/g)].map((match) => match.index);
    const routeHits = [...src.matchAll(/\/plugins\/dsh-archived-chats/g)].map((match) => match.index);
    const insideOwner = (index) => index >= owner.start && index < owner.end;
    const ownerText = owner.text;
    const gateAt = ownerText.indexOf('await boardArchiveAvailable()');
    const returnAt = ownerText.indexOf('return out;', Math.max(gateAt, 0));
    const archiveAt = ownerText.indexOf('.archiveSession(');
    // Declarations that are allowed to reach the archive plugin's routes: the gated
    // owner, its capability probe and the restore paths — i.e. the route layer of the
    // sliced chain. The list is EXPLICIT on purpose: a newly added `boardArchive*`
    // helper is auto-sliced for the runtime sandbox but must NOT be allowed to touch the
    // route constant (round-2 escapes A and C). Callers/UI code must reference none.
    const routeAllowedRanges = ['boardDeleteSessions', 'boardProbeArchiveRoutes', 'boardRestoreArchived', 'boardRestoreSessions']
      .map((name) => ranges[name])
      .filter((range) => range !== undefined);
    const insideRouteAllowed = (index) => routeAllowedRanges.some((range) => index >= range.start && index < range.end);
    const declarationRange = ranges.BOARD_ARCHIVE_BASE;
    const baseReferences = [...src.matchAll(/\bBOARD_ARCHIVE_BASE\b/g)]
      .map((match) => match.index)
      .filter((index) => !(index >= declarationRange.start && index < declarationRange.end));

    check('0', 'BOARD_ARCHIVE_BASE is the archive plugin route base', api.BOARD_ARCHIVE_BASE, '/plugins/dsh-archived-chats');
    check('0', 'every required declaration of the 清空 chain was extracted (canary)', REQUIRED.filter((name) => ranges[name] !== undefined).length, REQUIRED.length);
    check('0', 'the gated owner still contains a core archive call and a bail-out (the net is not vacuous)', [returnAt >= 0, archiveAt >= 0], [true, true]);

    // ---- G: ownership — the destructive primitives may only be referenced inside the
    // owner or the allowed restore declarations. This is the round-2 finding: moving the
    // archive call (or a hand-rolled route call) out of the sliced range must be red, so
    // every assertion covers the WHOLE bundle, not just the extracted slice.
    check('G', 'every BOARD_ARCHIVE_BASE reference outside its declaration is owned by boardDeleteSessions or a restore declaration (escape A/C)',
      baseReferences.map((index) => insideRouteAllowed(index)), baseReferences.map(() => true));
    check('G', 'BOARD_ARCHIVE_BASE is referenced outside its declaration at least once (canary: the assertion above is not vacuous)',
      baseReferences.length >= 1, true);
    check('G', 'the route literal is spelled exactly once, inside the BOARD_ARCHIVE_BASE declaration (no caller may re-spell it)',
      [routeHits.length, routeHits.every((index) => index >= declarationRange.start && index < declarationRange.end)], [1, true]);
    check('G', 'the core archiveSession API is named at least once (canary)', archiveHits.length >= 1, true);
    check('G', 'every directly written archiveSession reference lies inside the gated owner (no caller/helper may own an archive)',
      archiveHits.map((index) => insideOwner(index)), archiveHits.map(() => true));
    check('G', 'no computed member access on boardBridge outside the owner/restore declarations (lightweight dynamic-name guard)',
      [...src.matchAll(/boardBridge\s*\[/g)].map((match) => match.index).map((index) => insideRouteAllowed(index)),
      [...src.matchAll(/boardBridge\s*\[/g)].map(() => true));
    check('G', 'the owner consults the capability gate at all', gateAt >= 0, true);
    check('G', 'the capability gate precedes the archive loop inside the owner', gateAt >= 0 && gateAt < archiveAt, true);
    check('G', 'the gate is an early return: it bails out before the archive loop', returnAt < archiveAt, true);

    // ---- A: 0.2.0 — archived-chats skipped by the version gate (all routes 405)
    {
      reset();
      const requests = [];
      currentFetch = async (url, init) => { requests.push(record(url, init)); return response(405); };
      const out = await api.boardDeleteSessions(['s1', 's2']);
      check('A', 'unavailable is reported', out.unavailable, true);
      check('A', 'no Session is archived before the routes are known to exist', archivedThroughCore(), 0);
      check('A', 'the only request is the empty-id capability probe', requests.slice(), ['POST /plugins/dsh-archived-chats/trash/purge {"ids":[]}']);
      check('A', 'the probe verdict is cached as unusable', await api.getProbe(), false);
      check('A', 'nothing is reported as deleted', out.deleted.slice(), []);
    }

    // ---- B: a runtime WITH a working archived-chats keeps the original real-delete path
    {
      reset();
      const requests = [];
      currentFetch = async (url, init) => {
        requests.push(record(url, init));
        if (url.endsWith('/trash/purge') && init.body === '{"ids":[]}') return response(200, { ok: true, purged: [] });
        if (url.endsWith('/delete-all')) return response(200, { ok: true, trashed: ['s1', 's2'] });
        if (url.endsWith('/trash/purge')) return response(200, { ok: true, purged: ['s1', 's2'] });
        return response(500);
      };
      const out = await api.boardDeleteSessions(['s1', 's2']);
      check('B', 'capability is cached as usable', await api.getProbe(), true);
      check('B', 'both Sessions are archived through the core controller', archivedThroughCore(), 2);
      check('B', 'both Sessions are reported deleted', out.deleted.slice().sort(), ['s1', 's2']);
      check('B', 'unavailable stays false', out.unavailable, false);
      check('B', 'probe -> delete-all -> purge, in that order', requests.map((r) => r.split(' ').slice(0, 2).join(' ')), [
        'POST /plugins/dsh-archived-chats/trash/purge',
        'POST /plugins/dsh-archived-chats/delete-all',
        'POST /plugins/dsh-archived-chats/trash/purge',
      ]);
    }

    // ---- C: archived, then the purge dies — the Session must stay recoverable
    {
      reset();
      currentFetch = async (url, init) => {
        if (url.endsWith('/trash/purge') && init.body === '{"ids":[]}') return response(200, { ok: true, purged: [] });
        if (url.endsWith('/delete-all')) return response(200, { ok: true, trashed: ['s9'] });
        return response(405);
      };
      const out = await api.boardDeleteSessions(['s9']);
      check('C', 'archived-but-not-deleted is distinguishable', [out.archived.includes('s9'), out.deleted.length, out.failed.includes('s9')], [true, 0, true]);
      const undoable = out.archived.filter((id) => !out.deleted.includes(id));
      const restored = await api.boardRestoreSessions(undoable);
      check('C', 'the core unarchive takes it back', restored.restored.slice(), ['s9']);
      check('C', 'the core unarchive is the path that ran', calls.some((call) => call.op === 'core.unarchive' && call.id === 's9'), true);
    }

    // ---- D1: the plugin's own /unarchive-all works — it is used and core is untouched
    {
      reset();
      const requests = [];
      currentFetch = async (url, init) => { requests.push(record(url, init)); return response(200, { ok: true, restored: ['x'] }); };
      const restored = await api.boardRestoreSessions(['x']);
      check('D', 'the plugin /unarchive-all success path restores', [restored.restored.slice(), restored.failed.slice()], [['x'], []]);
      check('D', 'the plugin route is the path that ran', requests.map((r) => r.split(' ').slice(0, 2).join(' ')), ['POST /plugins/dsh-archived-chats/unarchive-all']);
      check('D', 'the core unarchive is NOT touched when the plugin succeeded', calls.some((call) => call.op === 'core.unarchive'), false);
    }

    // ---- D2: the plugin's own /unarchive-all is gone — core still restores
    {
      reset();
      currentFetch = async () => response(405);
      const restored = await api.boardRestoreSessions(['x']);
      check('D', 'restored through the core unarchive', [restored.restored.slice(), restored.failed.slice()], [['x'], []]);
    }

    // ---- E: the probe request itself fails — verdict false, nothing thrown
    {
      reset();
      currentFetch = async () => { throw new Error('offline'); };
      const verdict = await api.boardProbeArchiveRoutes();
      check('E', 'a failed probe means unusable (and does not throw)', verdict, false);
    }

    // ---- F: probe said usable, then /delete-all died after the archive
    {
      reset();
      currentFetch = async (url, init) => {
        if (url.endsWith('/trash/purge') && init.body === '{"ids":[]}') return response(200, { ok: true, purged: [] });
        return response(405);
      };
      const out = await api.boardDeleteSessions(['s9']);
      check('F', 'the archived Session is still reported', [out.unavailable, out.archived.includes('s9'), out.deleted.length], [true, true, 0]);
      const stranded = out.archived.filter((id) => !out.deleted.includes(id));
      const restored = await api.boardRestoreSessions(stranded);
      check('F', 'it is not stranded: the core unarchive puts it back', restored.restored.slice(), ['s9']);
      check('F', 'the cached verdict is downgraded after the observed failure', await api.getProbe(), false);
    }

    return { failures, checks };
  })();
}

function usage() {
  console.log('Usage: node tools/board-archive-gate-test.mjs [--mutate <name>|all] [--help]');
  console.log('  (no flag)          run groups 0 and A–G against lib/client.js; exit 0 = all hold');
  console.log('  --mutate <name>    negative control: rewrite the extracted source in memory and');
  console.log('                     require the suite to turn red; exit 0 = mutation detected');
  console.log('  --mutate all       run every negative control (used by CI)');
}

function summarize(checks, groups) {
  return groups
    .filter((group) => checks.some((check) => check.group === group))
    .map((group) => `${group}:${checks.filter((c) => c.group === group && c.ok).length}/${checks.filter((c) => c.group === group).length}`)
    .join(' ');
}

const flag = process.argv[2];
if (flag === '--help' || flag === '-h') {
  usage();
  process.exit(0);
}

if (flag === '--mutate') {
  const name = process.argv[3];
  const names = name === 'all' ? Object.keys(MUTATIONS) : [name];
  if (names.length === 0 || names.some((candidate) => MUTATIONS[candidate] === undefined)) {
    console.error(`unknown mutation "${name ?? ''}"; expected one of: ${Object.keys(MUTATIONS).join(', ')}, all`);
    process.exit(2);
  }
  // `all` also checks the ONE tolerated refactor: when the shipped guard is layout (a),
  // the same controls must also hold on a source whose guard is hoisted into a local
  // (layout (b) of boardDeleteSessions) → 2 sources. When the shipped guard already IS
  // layout (b), there is no second source to build: print a note and run 1 source.
  // Deeper equivalent guard shapes are out of scope by design (see the BOUNDARY note in
  // the file header); they surface as a clean false red, never as a missed regression.
  const sources = [{ label: 'lib/client.js', src: source, verbose: true }];
  if (name === 'all') {
    try {
      const hoisted = hoistCapabilityIntoLocal(source);
      if (hoisted.refactored) {
        sources.push({ label: 'lib/client.js with the capability guard hoisted into a local (layout (b) refactor)', src: hoisted.src, verbose: false });
      } else {
        console.log('note: the shipped guard already uses the hoisted layout — the refactor-tolerance pass reuses it');
      }
    } catch (error) {
      console.error(`REFACTOR TOLERANCE FAILED: could not build the layout-(b) equivalence source (${error.message}) — the guard locator is coupled to one code layout, so a legal refactor of the gate would redden CI for no reason`);
      process.exit(1);
    }
  }
  let undetected = 0;
  for (const entry of sources) {
    console.log(`\n--- source: ${entry.label} ---`);
    const before = await runSuite(entry.src, { verbose: entry.verbose });
    if (before.failures.length > 0) {
      console.error(`\n${before.failures.length} check(s) already fail on ${entry.label} — the net cannot be interpreted:`);
      for (const failure of before.failures) console.error(`  ${failure}`);
      process.exit(1);
    }
    console.log(`pristine: all ${before.checks.length} checks hold`);
    for (const candidate of names) {
      const mutation = MUTATIONS[candidate];
      console.log(`\n--- mutation "${candidate}": ${mutation.why} ---`);
      let mutated;
      try {
        mutated = await runSuite(mutation.apply(entry.src), { verbose: entry.verbose });
      } catch (error) {
        undetected += 1;
        console.error(`NEGATIVE CONTROL FAILED: mutation "${candidate}" could not be applied to ${entry.label} (${error.message}) — the control is coupled to that source layout`);
        continue;
      }
      const failing = mutated.checks.filter((check) => !check.ok);
      const turnedGroups = [...new Set(failing.map((check) => check.group))];
      console.log(`\ngroup ${summarize(mutated.checks, ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G'])}`);
      if (failing.length === 0) {
        undetected += 1;
        console.error(`NEGATIVE CONTROL FAILED: mutation "${candidate}" still passes on ${entry.label} — the suite cannot guard this path`);
        continue;
      }
      console.log(`NEGATIVE CONTROL OK: "${candidate}" was caught on ${entry.label} (group(s) ${turnedGroups.join(', ')}; ${failing.length} failing check(s): ${failing.map((check) => check.label).join('; ')})`);
    }
  }
  if (undetected > 0) {
    console.error(`\n${undetected} negative control(s) went undetected`);
    process.exit(1);
  }
  console.log(`\nall ${names.length} negative control(s) detected on ${sources.length} source(s)`);
  process.exit(0);
}

if (flag !== undefined) {
  console.error(`unknown argument "${flag}"`);
  usage();
  process.exit(2);
}

console.log(`board-archive-gate: ${namesOf(source).length} declarations of the 清空 chain extracted from lib/client.js`);
const { failures, checks } = await runSuite(source);
const byGroup = summarize(checks, ['0', 'A', 'B', 'C', 'D', 'E', 'F', 'G']);
console.log(`\n${byGroup}`);
if (failures.length > 0) {
  console.error(`\n${failures.length} archive-gate invariant(s) failed`);
  process.exit(1);
}
console.log(`\nall ${checks.length} archive-gate invariants hold`);
