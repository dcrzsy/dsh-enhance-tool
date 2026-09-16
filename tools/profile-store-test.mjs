#!/usr/bin/env node
/**
 * Regression test for the plugin's profile-side stores (host half).
 *
 * Two host behaviours have no live harness without booting dsh, yet both broke
 * for real:
 *
 *   1. profile files live under $DSH_HOME/profiles/web — outside every workspace —
 *      and 0.1.5's `ctx.fs` refuses those writes ("file access denied under
 *      workspace-write mode"), which silently broke the MCP drawer's save and the
 *      automation store. The helpers now use node:fs and keep a `<path>.bak`
 *      revision;
 *   2. the task store must round-trip through JSON and degrade to an empty store
 *      on a missing or corrupt file instead of throwing at the route.
 *
 * The functions are extracted from the built host file and run against a temp
 * directory, so this touches nothing under $DSH_HOME.
 *
 * Usage: node tools/profile-store-test.mjs
 */

import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { readFile, stat, writeFile as writeFileFs, copyFile, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, '..', 'lib', 'index.js'), 'utf8');

function grabFunction(name) {
  // keep the `async` keyword: extracting from `function …` alone strips it
  const plain = source.indexOf(`function ${name}(`);
  const asyncStart = source.indexOf(`async function ${name}(`);
  const start = asyncStart >= 0 && asyncStart + 'async '.length === plain ? asyncStart : plain;
  if (start < 0) throw new Error(`lib/index.js no longer defines ${name}()`);
  let depth = 0;
  for (let i = source.indexOf('{', start); i < source.length; i += 1) {
    if (source[i] === '{') depth += 1;
    else if (source[i] === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, i + 1);
    }
  }
  throw new Error(`unterminated ${name}()`);
}

const sandbox = mkdtempSync(join(tmpdir(), 'enhc-store-'));
const storePath = join(sandbox, 'enhancer-tasks.json');

const { readFileIfExists, writeFile, loadTasks, saveTasks, advanceTask, emptyTasks } = new Function(
  'copyFile',
  'mkdir',
  'readFile',
  'writeFileFs',
  'dirname',
  'process',
  'tasksFilePath',
  [
    grabFunction('readFileIfExists'),
    grabFunction('writeFile'),
    grabFunction('emptyTasks'),
    grabFunction('loadTasks'),
    grabFunction('saveTasks'),
    grabFunction('advanceTask'),
    'return { readFileIfExists, writeFile, loadTasks, saveTasks, advanceTask, emptyTasks };',
  ].join('\n'),
)(
  copyFile,
  mkdir,
  readFile,
  writeFileFs,
  dirname,
  process,
  () => storePath,
);

const failures = [];
const check = (label, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}${ok ? '' : `\n       expected ${JSON.stringify(expected)}\n       actual   ${JSON.stringify(actual)}`}`);
  if (!ok) failures.push(label);
};

// Permissive fs stub: the pre-0.1.5 helpers went through `ctx.fs`, so keeping one
// here lets this harness run unchanged against older revisions (where it must fail
// on the schedule/backup invariants) as well as against the current node:fs path.
const ctx = {
  fs: {
    resolve: async (p) => p,
    stat: async (p) => {
      try {
        await stat(p);
        return { path: p };
      } catch {
        return undefined;
      }
    },
    readText: async (p) => readFile(p, 'utf8'),
    writeText: async (p, content) => writeFileFs(p, content, 'utf8'),
  },
};

// 1 — missing file reads as null; the automation store degrades to empty
check('missing file reads as null', await readFileIfExists(ctx, storePath), null);
check('missing store loads empty', await loadTasks(ctx), emptyTasks());

// 2 — write creates missing parent directories (and the first write has no .bak yet)
const deepPath = join(sandbox, 'deep', 'nested', 'enhancer-tasks.json');
let deepWriteFailed = null;
try {
  await writeFile(ctx, deepPath, '{}');
} catch (error) {
  deepWriteFailed = String(error?.code ?? error);
}
check('write creates missing parent directories', deepWriteFailed, null);

await writeFile(ctx, storePath, JSON.stringify({ tasks: [{ id: '1' }], nextId: 2 }, null, 2));
check('write created the file', JSON.parse(readFileSync(storePath, 'utf8')), { tasks: [{ id: '1' }], nextId: 2 });
const readBak = () => {
  try {
    return JSON.parse(readFileSync(storePath + '.bak', 'utf8'));
  } catch {
    return null;
  }
};
check('no .bak before the first overwrite', readBak(), null);

// 3 — overwrite keeps the previous revision as .bak and round-trips
const second = { tasks: [{ id: '1' }, { id: '2' }], nextId: 3 };
await saveTasks(ctx, second);
check('saveTasks round-trips', await loadTasks(ctx), second);
check('.bak holds the previous revision', readBak(), { tasks: [{ id: '1' }], nextId: 2 });

// 4 — a corrupt file degrades to an empty store instead of throwing
writeFileSync(storePath, '{ not json');
check('corrupt store loads empty', await loadTasks(ctx), emptyTasks());
check('corrupt file is preserved for inspection', readFileSync(storePath, 'utf8'), '{ not json');

// 5 — advanceTask always lands strictly in the future (a nextAt equal to `now`
//     is re-fired by the 30s due check, so a UI-created task would loop)
const freq = 30;
const freqMs = freq * 60 * 1e3;
const now = 1 + freqMs * 5000; // a long pause, exactly on an interval boundary
let started = Date.now();
const longPaused = advanceTask({ frequencyMinutes: freq, firstAt: 1 }, now);
check('long pause lands strictly in the future', longPaused.nextAt > now, true);
check('long pause lands within one interval', longPaused.nextAt - now <= freqMs, true);
check('long pause is O(1) (no interval stepping)', Date.now() - started < 50, true);

// exactly-due task created from the UI (nextAt set, firstAt absent — the shape
// tasks/create produces) must not come back due on the same tick
started = Date.now();
const uiTask = advanceTask({ frequencyMinutes: freq, nextAt: now, history: [] }, now);
check('UI-created due task advances past now', uiTask.nextAt > now, true);
check('UI-created task advances by exactly one interval', uiTask.nextAt, now + freqMs);
check('advancing a due task is O(1)', Date.now() - started < 50, true);

// a manual run before the due time must leave the planned slot alone
const planned = now + 5 * freqMs;
const early = advanceTask({ frequencyMinutes: freq, nextAt: planned }, now);
check('run-now before the due time keeps the schedule', early.nextAt, planned);

rmSync(sandbox, { recursive: true, force: true });
if (failures.length > 0) {
  console.error(`\n${failures.length} invariant(s) failed`);
  process.exit(1);
}
console.log('\nall profile-store invariants hold');
