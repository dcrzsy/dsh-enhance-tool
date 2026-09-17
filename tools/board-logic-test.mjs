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
 *   2. auto placement is projection-driven: running / queued prompt → 进行中, an
 *      unanswered prompt or an open todo item → 待办, an answered Session inside the
 *      recent window → 完成, older → 归档, and 搁置 is never automatic;
 *   3. a manual drop always beats the auto rule, and "reset to auto" gives it back;
 *   4. moves insert at an index with sparse orders that stay strictly increasing
 *      (repeated inserts at the same index must not collapse);
 *   5. pruning keeps unknown ids during the grace period and drops them after;
 *   6. the view filters (subagents off by default, query, workspace) and orders by
 *      placement then updatedAt, and trash only holds manual entries;
 *   7. hiding (a cleared trash whose real delete failed) keeps sessions off the board
 *      until they are unhidden or deliberately moved again.
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

const CONSTS = ['BOARD_COLUMNS', 'BOARD_DAY_MS', 'BOARD_RECENT_DAYS', 'BOARD_PRUNE_DAYS', 'BOARD_ITEM_TITLE_MAX'];
const FUNCS = [
  'boardEmptyState',
  'boardParse',
  'boardSerialize',
  'boardJobsRunning',
  'boardProjection',
  'boardInboxBusy',
  'boardPendingTodos',
  'boardTurnState',
  'boardAutoColumn',
  'boardMove',
  'boardPrune',
  'boardView',
  'boardForget',
  'boardIsItem',
  'boardItemId',
  'boardAddItem',
  'boardUpdateItem',
  'boardDeleteItem',
  'boardHide',
  'boardUnhide',
  'boardUndoAdd',
  'boardUndoDrop',
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
  BOARD_ITEM_TITLE_MAX,
  boardEmptyState,
  boardParse,
  boardSerialize,
  boardAutoColumn,
  boardMove,
  boardPrune,
  boardView,
  boardForget,
  boardIsItem,
  boardItemId,
  boardAddItem,
  boardUpdateItem,
  boardDeleteItem,
  boardHide,
  boardUnhide,
  boardUndoAdd,
  boardUndoDrop,
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

// 2 — auto placement (driven by the Session projections the host exposes)
const recent = session('recent');
const stale = { ...recent, updatedAt: now - (BOARD_RECENT_DAYS + 1) * BOARD_DAY_MS };
const pv = (values) => ({ projectionValues: values });
const answered = pv({ turnOutline: [{ turn: 1, prompt: 'do it', response: 'done' }] });
const unanswered = pv({ turnOutline: [{ turn: 1, prompt: 'do it', response: '' }] });
const place = (summary, jobs) => boardAutoColumn(summary, jobs ?? [], now, BOARD_RECENT_DAYS);

check('running -> 进行中', place({ ...recent, running: true }), 'doing');
check('running job -> 进行中', place(recent, [{ status: 'running' }]), 'doing');
check('stopping job -> 进行中', place(recent, [{ status: 'stopping' }]), 'doing');
check('queued prompt -> 进行中', place({ ...recent, ...pv({ inbox: { 'next-turn': [{ id: 'q' }], 'next-step': [] } }) }), 'doing');
check('queued step -> 进行中', place({ ...recent, ...pv({ inbox: { 'next-turn': [], 'next-step': [{ id: 'q' }] } }) }), 'doing');
check('answered + recent -> 完成', place({ ...recent, ...answered }), 'done');
check('answered + stale -> 归档', place({ ...stale, ...answered }), 'archived');
check('cold session (no projections) + recent -> 完成', place(recent), 'done');
check('cold session + stale -> 归档', place(stale), 'archived');
check('unanswered prompt -> 待办', place({ ...recent, ...unanswered }), 'todo');
check('open todo item -> 待办', place({ ...recent, ...pv({ todos: [{ status: 'pending' }, { status: 'completed' }] }) }), 'todo');
check('all todos completed -> not 待办', place({ ...recent, ...pv({ todos: [{ status: 'completed' }] }) }), 'done');
check('never prompted (empty outline) + recent -> 待办', place({ ...recent, ...pv({ turnOutline: [] }) }), 'todo');
check('open todo beats an answered turn', place({ ...recent, ...answered, ...pv({ todos: [{ status: 'in_progress' }] }) }), 'todo');
check('open todo beats the recent window', place({ ...stale, ...pv({ todos: [{ status: 'pending' }] }) }), 'todo');
check('搁置 is never automatic', BOARD_COLUMNS.filter((c) => c.key === 'shelved').length === 1
  && [recent, stale, { ...recent, running: true }, { ...recent, ...answered }, { ...recent, ...unanswered },
      { ...recent, ...pv({ todos: [{ status: 'pending' }] }) }, { ...recent, ...pv({ inbox: { 'next-turn': [{}] } }) }]
      .every((summary) => place(summary) !== 'shelved'), true);

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
check('subagent hidden by default', ids(view.columns.done), []);
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
check('unplaced cards order by updatedAt desc', ids(view.columns.done), ['a3', 'a1', 'a2']);
check('query filters by title', boardView(boardEmptyState(), filtered, now, { query: '备份' }).total, 2);
check('query filters by cwd', boardView(boardEmptyState(), filtered, now, { query: 'report' }).total, 1);
check('workspace filter', boardView(boardEmptyState(), filtered, now, { workspace: '/data/work/report' }).total, 1);
check('total counts every rendered card', boardView(boardEmptyState(), filtered, now, {}).total, 3);

// 6b — a cleared trash must not bounce back onto the board
const three2 = listOf([session('h1'), session('h2')]);
let hidden = boardHide(boardEmptyState(), ['h1']);
check('hidden sessions leave the board', ids(boardView(hidden, three2, now, {}).columns.done), ['h2']);
check('hidden is persisted in the payload', boardParse(boardSerialize(hidden)).hidden, ['h1']);
check('unhide brings them back', ids(boardView(boardUnhide(hidden), three2, now, {}).columns.done), ['h1', 'h2']);
check('a deliberate move unhides', boardHide(boardEmptyState(), ['h1']).hidden.length === 1 ? boardMove(boardHide(boardEmptyState(), ['h1']), 'h1', 'doing', -1, true).hidden : ['x'], []);
check('prune drops hidden ids of vanished sessions', boardPrune(hidden, ['h2'], now).hidden, []);

// 6c — undo bookkeeping for a clear that could not really delete
let undoState = boardUndoAdd(boardHide(boardEmptyState(), ['u1']), ['u1']);
check('undo ids are persisted', boardParse(boardSerialize(undoState)).undo, ['u1']);
check('a restored session leaves the undo list', boardUndoDrop(undoState, ['u1']).undo, []);
check('undo is idempotent', boardUndoAdd(undoState, ['u1']).undo, ['u1']);
check('undo keeps ids of sessions that still exist', boardPrune(undoState, ['u1'], now).undo, ['u1']);
check('undo drops ids of sessions that are gone and not hidden', boardPrune(boardUndoAdd(boardEmptyState(), ['u2']), [], now).undo, []);

// 6d — free-form to-do cards (待办 新建), which have no session behind them
const itemList = listOf([session('s1'), session('s2')]);
let items = boardAddItem(boardEmptyState(), '  写周报  ');
const itemId = Object.keys(items.items)[0];
check('a new to-do card is stored with a trimmed title', items.items[itemId].title, '写周报');
check('a new to-do card starts on top of 待办', ids(boardView(items, itemList, now, {}).columns.todo)[0], itemId);
check('a new to-do card is manual', boardView(items, itemList, now, {}).columns.todo[0].manual, true);
check('an empty title is ignored', Object.keys(boardAddItem(boardEmptyState(), '   ').items).length, 0);
check('item ids never look like session ids', boardItemId().startsWith('todo-'), true);
check('boardIsItem distinguishes cards from sessions', [boardIsItem(items, itemId), boardIsItem(items, 's1')], [true, false]);
check('the payload keeps free-form cards', Object.keys(boardParse(boardSerialize(items)).items), [itemId]);
check('the header reports free-form cards', boardView(items, itemList, now, {}).todoItems, 1);
check('second card lands above the first', ids(boardView(boardAddItem(items, '第二条'), itemList, now, {}).columns.todo)[0] !== itemId, true);

// editing + completing
let edited = boardUpdateItem(items, itemId, { title: '写周报（已完成部分）' });
check('a card title can be edited', edited.items[itemId].title, '写周报（已完成部分）');
check('editing does not move the card', boardView(edited, itemList, now, {}).columns.todo.length, 1);
let done = boardUpdateItem(items, itemId, { done: true });
check('checking a card off files it under 完成', ids(boardView(done, itemList, now, {}).columns.done).includes(itemId), true);
check('a checked card leaves 待办', ids(boardView(done, itemList, now, {}).columns.todo).includes(itemId), false);
check('the done flag is persisted', boardParse(boardSerialize(done)).items[itemId].done, true);
check('unchecking sends it back to 待办', ids(boardView(boardUpdateItem(done, itemId, { done: false }), itemList, now, {}).columns.todo).includes(itemId), true);
check('updating an unknown id is a no-op', boardUpdateItem(items, 'nope', { title: 'x' }).items[itemId].title, '写周报');

// moved / hidden / pruned / deleted
check('a card can be parked in 搁置', ids(boardView(boardMove(items, itemId, 'shelved', -1, true), itemList, now, {}).columns.shelved), [itemId]);
let pruned = boardPrune(items, [], now + 400 * BOARD_DAY_MS);
check('prune never drops free-form cards', Object.keys(pruned.items), [itemId]);
check('prune never drops their placement', boardView(pruned, itemList, now, {}).columns.todo.length, 1);
check('deleting a card removes card and placement', [Object.keys(boardDeleteItem(items, itemId).items).length, Object.keys(boardDeleteItem(items, itemId).entries).length], [0, 0]);
check('a free-form card is not a session for the purge path', boardIsItem(items, itemId), true);
check('free-form cards ignore the workspace filter', boardView(items, itemList, now, { workspace: '/data/work/mdm' }).todoItems, 0);
check('free-form cards obey the query filter', boardView(items, itemList, now, { query: '周报' }).todoItems, 1);

// 7 — helpers
check('workspace label is the last segment', boardWorkspace(session('x')), 'mdm');
check('workspace label of a rootless cwd', boardWorkspace(session('x', { cwd: undefined })), '');
check('the board has six columns', BOARD_COLUMNS.map((column) => column.key), ['todo', 'doing', 'done', 'shelved', 'archived', 'trash']);
check('the board exposes labels', BOARD_COLUMNS.every((column) => typeof column.label === 'string' && column.label !== ''), true);

if (failures.length > 0) {
  console.error(`\n${failures.length} invariant(s) failed`);
  process.exit(1);
}
console.log('\nall board invariants hold');
