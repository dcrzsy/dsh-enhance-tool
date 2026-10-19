#!/usr/bin/env node
/**
 * Logic lock-in tests for the context panel's pure derivation (lib/client.js).
 *
 * The panel must show what the model's context currently holds, not the raw log:
 *   - system prompts are separated from the conversation (they get their own view);
 *   - workspace reminder injections are not the user talking;
 *   - a compaction checkpoint replaces its shadowed span, so the list shows the
 *     summary plus everything after it and hides the folded history (the log keeps
 *     it for replay; the panel follows the surface);
 *   - a system-prompt rewrite (a surface `replace`) hides the superseded prompt;
 *   - text caps keep the panel bounded.
 *
 * Usage: node tools/context-logic-test.mjs   (exit 0 = all invariants hold)
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

/** Extract a top-level function declaration by delimiter matching. */
function grab(name) {
  const fn = source.indexOf(`function ${name}(`);
  if (fn < 0) throw new Error(`lib/client.js no longer defines ${name}`);
  const paramsOpen = source.indexOf('(', fn);
  const bodyOpen = source.indexOf('{', matchDelimiter(source, paramsOpen));
  const bodyClose = matchDelimiter(source, bodyOpen);
  if (bodyClose < 0) throw new Error(`unterminated ${name}`);
  return source.slice(fn, bodyClose + 1);
}

const sandbox = new Function(
  `${grab('contextItems')}\n${grab('contextCompactCommand')}\nreturn { contextItems, contextCompactCommand };`,
)();
const { contextItems, contextCompactCommand } = sandbox;

let checks = 0;
let failed = 0;
const check = (name, ok, detail) => {
  checks += 1;
  if (!ok) {
    failed += 1;
    console.log(`FAIL ${name}${detail === undefined ? '' : ': ' + detail}`);
  }
};
const eq = (name, actual, expected) => check(name, JSON.stringify(actual) === JSON.stringify(expected), `${JSON.stringify(actual)} !== ${JSON.stringify(expected)}`);

let seq = 0;
const event = (type, data, extra = {}) => ({ type: 'event', event: { type, seq: (seq += 1), time: 1000 + seq, data, ...extra } });
const windowOf = (...entries) => ({ entries, hasMore: false, revision: 1, change: { kind: 'replace', entries } });
const textBlock = (text) => [{ type: 'text', text }];
const user = (text, extra) => event('user/message', { content: textBlock(text), ...extra });
const assistant = (text) => event('assistant/message', { message: { content: textBlock(text) } });
const system = (text) => event('system/message', { message: { content: textBlock(text) } });
const checkpoint = (text) => event('user/message', { content: textBlock(text), source: { kind: 'compact-checkpoint', compactionId: 'c' } });

// 1. A plain window: system prompts are split off, the conversation stays in order.
seq = 0;
let result = contextItems(windowOf(system('base prompt'), user('q1'), assistant('a1')));
eq('plain: item roles', result.items.map((item) => item.role), ['user', 'assistant']);
eq('plain: system split', result.systems.map((item) => item.text), ['base prompt']);
eq('plain: no compaction', result.compacted, 0);

// 2. Workspace reminder injections are not the user talking.
seq = 0;
result = contextItems(windowOf(
  system('base'),
  user('<system-reminder>workspace changed</system-reminder>'),
  user('<system>subdir instructions</system>'),
  user('<instructions>skill body</instructions>'),
  user('real question'),
));
eq('reminders: only the real question', result.items.map((item) => item.text), ['real question']);

// 3. A compaction checkpoint hides its shadowed span and is labelled as a summary.
seq = 0;
const first = [
  system('base'),
  user('old question'),
  assistant('old answer'),
  event('compaction/summary', { summary: textBlock('the summary'), shadowedSeqs: [2, 3], shadowedRange: { start: 2, end: 3 } }),
  checkpoint('This is an automatically generated checkpoint\n\n<compacted-summary>the summary</compacted-summary>'),
  user('new question'),
  assistant('new answer'),
];
result = contextItems(windowOf(...first));
eq('compaction: roles', result.items.map((item) => item.role), ['summary', 'user', 'assistant']);
eq('compaction: old history hidden', result.items.map((item) => item.text.slice(0, 12)), ['This is an a', 'new question', 'new answer']);
eq('compaction: system survives', result.systems.map((item) => item.text), ['base']);
eq('compaction: counted', result.compacted, 1);

// 3b. A replace lands at the shadowed range's POSITION, not at the log tail.
seq = 0;
result = contextItems(windowOf(
  system('base'),
  user('old'),
  assistant('retained tail'),
  event('compaction/summary', { summary: textBlock('sum'), shadowedSeqs: [2], shadowedRange: { start: 2, end: 2 } }),
  event('user/message', { content: textBlock('checkpoint'), source: { kind: 'compact-checkpoint' } }, { surfaceOp: { op: 'replace', startSeq: 2, endSeq: 2 } }),
));
eq('compaction: positional order', result.items.map((item) => item.text), ['checkpoint', 'retained tail']);

// 4. A second compaction can shadow the first checkpoint itself.
seq = 0;
result = contextItems(windowOf(
  system('base'),
  user('old'),
  event('compaction/summary', { summary: textBlock('one'), shadowedSeqs: [2], shadowedRange: { start: 2, end: 2 } }),
  checkpoint('checkpoint one'),
  user('middle'),
  event('compaction/summary', { summary: textBlock('two'), shadowedSeqs: [3, 4, 5], shadowedRange: { start: 3, end: 5 } }),
  checkpoint('checkpoint two'),
  user('latest'),
));
eq('chained: only the latest checkpoint and after', result.items.map((item) => item.text), ['checkpoint two', 'latest']);
eq('chained: two compactions', result.compacted, 2);

// 5. A system-prompt rewrite (surface replace) hides the superseded prompt.
seq = 0;
result = contextItems(windowOf(
  system('old prompt'),
  user('q'),
  event('system/message', { message: { content: textBlock('new prompt') } }, { surfaceOp: { op: 'replace', startSeq: 1, endSeq: 1 } }),
));
eq('rewrite: only the new prompt', result.systems.map((item) => item.text), ['new prompt']);
eq('rewrite: conversation kept', result.items.map((item) => item.text), ['q']);

// 6. A prune (no summary) hides its shadowed span just the same.
seq = 0;
result = contextItems(windowOf(
  system('base'),
  user('gone'),
  event('compaction/prune', { shadowedSeqs: [2], shadowedRange: { start: 2, end: 2 } }),
  user('kept'),
));
eq('prune: hidden', result.items.map((item) => item.text), ['kept']);
eq('prune: not counted as a summary checkpoint', result.compacted, 0);

// 7. Caps: message text 12000, system prompt 200000.
seq = 0;
result = contextItems(windowOf(system('s'.repeat(220000)), user('u'.repeat(20000))));
eq('cap: system 200000', result.systems[0].text.length, 200000);
eq('cap: message 12000', result.items[0].text.length, 12000);

// 8. Junk entries and empty content are ignored.
seq = 0;
result = contextItems({ entries: [null, { type: 'transient' }, { type: 'event', event: { type: 'tool/call', seq: 1, data: {} } }, user('   ')] });
eq('junk: no items', result.items, []);
eq('junk: no systems', result.systems, []);
result = contextItems(null);
eq('null window: no items', result.items, []);

// 9. The /compact command watcher pairs a run with its settled done outcome.
seq = 0;
const runOne = event('command/run', { commandId: 'c1', name: 'compact' });
const doneOne = event('command/done', { commandId: 'c1', kind: 'success', text: 'Compacted 5 history items (~7570 tokens).' });
let scan = contextCompactCommand(windowOf(runOne, doneOne), 0);
check('command: run seq', scan.runSeq === runOne.event.seq, String(scan.runSeq));
eq('command: done outcome', scan.done, { kind: 'success', text: 'Compacted 5 history items (~7570 tokens).' });
scan = contextCompactCommand(windowOf(runOne, doneOne), runOne.event.seq);
check('command: floor excludes the run', scan.runSeq === 0, String(scan.runSeq));
eq('command: no done for an excluded run', scan.done, null);
const runTwo = event('command/run', { commandId: 'c2', name: 'compact' });
const doneTwo = event('command/done', { commandId: 'c2', kind: 'error', text: 'busy' });
scan = contextCompactCommand(windowOf(runOne, doneOne, runTwo, doneTwo), 0);
check('command: the latest run owns the outcome', scan.runSeq === runTwo.event.seq && scan.done?.text === 'busy', JSON.stringify(scan));
scan = contextCompactCommand(null, 0);
eq('command: null window', scan, { runSeq: 0, done: null });

console.log(failed === 0 ? `\nall ${checks} context invariants hold` : `\n${failed}/${checks} context invariants FAILED`);
process.exit(failed === 0 ? 0 : 1);
