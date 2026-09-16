#!/usr/bin/env node
/**
 * Logic lock-in tests for the task board (通用面板).
 *
 * The board's placement rules, sparse ordering, pruning and view assembly are pure
 * functions inside the bundled client file (lib/client.js), so this harness extracts
 * them and runs them in a sandbox — no browser, no dsh boot, no $DSH_HOME access.
 *
 * Covered invariants:
 *   1. payload parsing tolerates junk and drops unknown columns / bad orders;
 *   2. auto placement: running (or a running background job) → 进行中, finished →
 *      完成, recently touched → 待办, stale → 归档;
 *   3. a manual drop always beats the auto rule, and "reset to auto" gives it back;
 *   4. moves insert at an index with sparse orders that stay strictly increasing
 *      (repeated inserts at the same index must not collapse);
 *   5. pruning keeps unknown ids during the grace period and drops them after;
 *   6. the view filters (subagents off by default, query, workspace) and orders by
 *      placement then updatedAt, and trash only holds manual entries.
 *
 * Usage: node tools/board-logic-test.mjs   (exit 0 = all invariants hold)
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, '..', 'lib', 'client.js'), 'utf8');

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
 * Extract one top-level declaration by delimiter matching: a `const NAME = <value>`
 * literal, or a `function NAME(...) { ... }` body (parameters are skipped, otherwise
 * the scan would stop at the parameter list instead of the body).
 */
function grab(name) {
  const decl = source.indexOf(`const ${name} = `);
  const asyncFn = source.indexOf(`async function ${name}(`);
  const plainFn = source.indexOf(`function ${name}(`);
  const fn = asyncFn >= 0 && (plainFn < 0 || asyncFn < plainFn) ? asyncFn : plainFn;
  if (decl < 0 && fn < 0) throw new Error(`lib/client.js no longer defines ${name}`);
  if (decl >= 0 && (fn < 0 || decl < fn)) {
    const eq = source.indexOf('=', decl);
    const firstValue = source.slice(eq + 1).trimStart()[0];
    if (!'([{'.includes(firstValue)) return source.slice(decl, source.indexOf(';', eq) + 1);
    const open = source.indexOf(firstValue, eq);
    const close = matchDelimiter(source, open);
    if (close < 0) throw new Error(`unterminated ${name}`);
    return source.slice(decl, source[close + 1] === ';' ? close + 2 : close + 1);
  }
  const paramsOpen = source.indexOf('(', fn);
  const bodyOpen = source.indexOf('{', matchDelimiter(source, paramsOpen));
  const bodyClose = matchDelimiter(source, bodyOpen);
  if (bodyClose < 0) throw new Error(`unterminated ${name}`);
  return source.slice(fn, bodyClose + 1);
}

const CONSTS = ['BOARD_COLUMNS', 'BOARD_DAY_MS', 'BOARD_RECENT_DAYS', 'BOARD_PRUNE_DAYS'];
const FUNCS = [
  'boardEmptyState',
  'boardParse',
  'boardSerialize',
  'boardJobsRunning',
  'boardAutoColumn',
  'boardMove',
  'boardPrune',
  'boardView',
  'boardForget',
  'boardWorkspace',
];
const sandbox = new Function(
  'ptL',
  [...CONSTS, ...FUNCS].map(grab).join('\n') +
    `\nreturn { ${[...CONSTS, ...FUNCS].join(', ')} };`,
)((zh) => zh);

const {
  BOARD_COLUMNS,
  BOARD_DAY_MS,
  BOARD_RECENT_DAYS,
  boardEmptyState,
  boardParse,
  boardSerialize,
  boardAutoColumn,
  boardMove,
  boardPrune,
  boardView,
  boardForget,
  boardWorkspace,
} = sandbox;

const failures = [];
const check = (label, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}${ok ? '' : `\n       expected ${JSON.stringify(expected)}\n       actual   ${JSON.stringify(actual)}`}`);
  if (!ok) failures.push(label);
};

const now = 1_800_000_000_000;
const session = (id, extra = {}) => ({
  id,
  displayTitle: `session ${id}`,
  cwd: '/data/work/mdm',
  running: false,
  updatedAt: now - 1000,
  blank: false,
  ...extra,
});
const listOf = (summaries, jobs = {}) => ({
  ids: summaries.map((s) => s.id),
  byId: Object.fromEntries(summaries.map((s) => [s.id, s])),
  jobsBySession: jobs,
  current: summaries[0]?.id,
});
const ids = (cards) => cards.map((card) => card.id);

// 1 — parsing
check('empty text parses to an empty state', boardParse(''), boardEmptyState());
check('junk parses to an empty state', boardParse('{oops'), boardEmptyState());
check('unknown column is dropped', boardParse(JSON.stringify({ entries: { a: { column: 'nope' } } })).entries, {});
check('bad order is coerced', boardParse(JSON.stringify({ entries: { a: { column: 'doing', order: 'x' } } })).entries.a.order, 0);
check('serialize round-trips', boardParse(boardSerialize(boardMove(boardEmptyState(), 'a', 'doing', -1, true))).entries.a.column, 'doing');
check('collapsed keeps known columns only', boardParse(JSON.stringify({ collapsed: ['todo', 'zzz'] })).collapsed, ['todo']);

// 2 — auto placement
const recent = session('recent');
check('idle + recent -> 待办', boardAutoColumn(recent, [], now, BOARD_RECENT_DAYS), 'todo');
check('running -> 进行中', boardAutoColumn({ ...recent, running: true }, [], now, BOARD_RECENT_DAYS), 'doing');
check('running job -> 进行中', boardAutoColumn(recent, [{ status: 'running' }], now, BOARD_RECENT_DAYS), 'doing');
check('stopping job -> 进行中', boardAutoColumn(recent, [{ status: 'stopping' }], now, BOARD_RECENT_DAYS), 'doing');
check('completed -> 完成', boardAutoColumn({ ...recent, completed: true }, [], now, BOARD_RECENT_DAYS), 'done');
check('stale -> 归档', boardAutoColumn({ ...recent, updatedAt: now - (BOARD_RECENT_DAYS + 1) * BOARD_DAY_MS }, [], now, BOARD_RECENT_DAYS), 'archived');

// 3 — manual placement wins, reset hands it back
const mixed = [
  session('run1', { running: true }),
  session('old1', { updatedAt: now - 30 * BOARD_DAY_MS }),
  session('sub1', { origin: 'subagent' }),
  session('blank1', { blank: true }),
];
let state = boardMove(boardEmptyState(), 'run1', 'archived', -1, true);
let view = boardView(state, listOf(mixed), now, {});
check('manual beats auto', ids(view.columns.archived).includes('run1'), true);
check('manual card left its auto column', ids(view.columns.doing).includes('run1'), false);
check('stale session auto-lands in 归档 next to it', ids(view.columns.archived).includes('old1'), true);
check('subagent hidden by default', ids(view.columns.todo), []);
check('blank sessions skipped', view.total, 2);
check('subagents included on request', boardView(state, listOf(mixed), now, { includeSubs: true }).total, 3);
state = boardForget(state, 'run1');
check('reset to auto returns it to 进行中', ids(boardView(state, listOf(mixed), now, {}).columns.doing), ['run1']);

// 4 — sparse ordering stays strictly increasing
state = boardEmptyState();
for (let i = 0; i < 6; i += 1) state = boardMove(state, `s${i}`, 'todo', 0, true);
const ordered = boardView(state, listOf([session('s0'), session('s1'), session('s2'), session('s3'), session('s4'), session('s5')]), now, {}).columns.todo;
check('insert-at-0 keeps every card', ids(ordered).sort(), ['s0', 's1', 's2', 's3', 's4', 's5']);
check('insert-at-0 reverses the order', ids(ordered), ['s5', 's4', 's3', 's2', 's1', 's0']);
const orders = ordered.map((card) => state.entries[card.id].order);
check('orders stay strictly increasing', orders.every((value, index) => index === 0 || value > orders[index - 1]), true);
check('orders stay integers', orders.every((value) => Number.isInteger(value)), true);
// a fresh three-card column: append in order, then drop the first one in the middle
let three = boardEmptyState();
for (const id of ['s0', 's1', 's2']) three = boardMove(three, id, 'todo', -1, true);
check('appended cards keep insertion order', ids(boardView(three, listOf([session('s0'), session('s1'), session('s2')]), now, {}).columns.todo), ['s0', 's1', 's2']);
three = boardMove(three, 's0', 'todo', 2, true);
check('insert in the middle lands there', ids(boardView(three, listOf([session('s0'), session('s1'), session('s2')]), now, {}).columns.todo), ['s1', 's2', 's0']);

// 5 — pruning
state = boardMove(boardMove(boardEmptyState(), 'gone', 'done', -1, true), 'here', 'doing', -1, true);
state.entries.gone.at = now - 8 * BOARD_DAY_MS;
state.entries.here.at = now - 8 * BOARD_DAY_MS;
check('unknown + stale is dropped', Object.keys(boardPrune(state, ['here'], now).entries), ['here']);
state.entries.gone.at = now - 1 * BOARD_DAY_MS;
check('unknown + fresh is kept', Object.keys(boardPrune(state, ['here'], now).entries).sort(), ['gone', 'here']);

// 6 — filters, ordering and trash
state = boardEmptyState();
state = boardMove(state, 't1', 'trash', -1, true);
const filtered = listOf([
  session('a1', { displayTitle: '备份策略', updatedAt: now - 5 }),
  session('a2', { displayTitle: '索引修复', cwd: '/data/work/report', updatedAt: now - 10 }),
  session('a3', { displayTitle: '备份演练', updatedAt: now - 1 }),
]);
check('trash never shows an unplaced session', ids(boardView(state, listOf([session('t2')]), now, {}).columns.trash), []);
check('trash hides a session that is not in the list', ids(boardView(state, filtered, now, {}).columns.trash), []);
check('trash shows its manual entry', ids(boardView(state, listOf([session('t1')]), now, {}).columns.trash), ['t1']);
view = boardView(boardEmptyState(), filtered, now, {});
check('unplaced cards order by updatedAt desc', ids(view.columns.todo), ['a3', 'a1', 'a2']);
check('query filters by title', boardView(boardEmptyState(), filtered, now, { query: '备份' }).total, 2);
check('query filters by cwd', boardView(boardEmptyState(), filtered, now, { query: 'report' }).total, 1);
check('workspace filter', boardView(boardEmptyState(), filtered, now, { workspace: '/data/work/report' }).total, 1);
check('total counts every rendered card', boardView(boardEmptyState(), filtered, now, {}).total, 3);

// 7 — helpers
check('workspace label is the last segment', boardWorkspace(session('x')), 'mdm');
check('workspace label of a rootless cwd', boardWorkspace(session('x', { cwd: undefined })), '');
check('the board has five columns', BOARD_COLUMNS.map((column) => column.key), ['todo', 'doing', 'done', 'archived', 'trash']);
check('the board exposes labels', BOARD_COLUMNS.every((column) => typeof column.label === 'string' && column.label !== ''), true);

if (failures.length > 0) {
  console.error(`\n${failures.length} invariant(s) failed`);
  process.exit(1);
}
console.log('\nall board invariants hold');
