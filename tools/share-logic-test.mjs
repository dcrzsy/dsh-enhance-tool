#!/usr/bin/env node
/**
 * Logic lock-in tests for session share (会话分享为图片).
 *
 * The turn-selection rules and the URL sanitizer are pure functions inside the
 * bundled client file (lib/client.js), so this harness extracts them and runs
 * them in a sandbox — no browser, no dsh boot, no $DSH_HOME access.
 *
 * Covered invariants:
 *   1. a turn is shareable when it has a non-empty user/steering message or a
 *      non-reasoning assistant text segment;
 *   2. reasoning rows, tool calls and empty text never make a turn shareable
 *      and never enter the copied answer list;
 *   3. every non-reasoning assistant text segment becomes its own selectable
 *      block, in DOM order (the final answer is not assumed to be the last row);
 *      blocks keep their role and a stable key across history paging;
 *   4. the marker timestamp prefers the user/steering/trigger clock and only
 *      falls back to the first row of the turn;
 *   5. groups keep first-appearance order and ignore rows without a turn/kind;
 *   6. every non-data URL is stripped from CSS/style text before rasterization —
 *      one surviving fetch taints the canvas and makes toBlob() throw;
 *   7. a rendered card taller than the live DOM (SVG table/container quirks) is
 *      cropped at the magenta end marker; the shipped source keeps the sentinel
 *      and crop helpers;
 *   8. the shipped source keeps the structural pieces the browser path depends
 *      on: the utilities-slot registration, the ClipboardItem promise handoff,
 *      the foreignObject rasterizer, the canvas size guard, and the default-on
 *      settings switch.
 *
 * Usage: node tools/share-logic-test.mjs   (exit 0 = all invariants hold)
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, '..', 'lib', 'client.js'), 'utf8');

/**
 * Index of the delimiter matching the one at `open`.
 *
 * Token-aware on purpose: a naive depth counter is derailed by a regex literal
 * such as `/url\((?!data:)[^)]*\)/` (the `)` inside the character class
 * closes the function early). Strings, template literals, comments and regex
 * bodies are skipped so the extracted slice stays valid JavaScript.
 */
function matchDelimiter(text, open) {
  const pairs = { '(': ')', '[': ']', '{': '}' };
  const closers = ')]}';
  let depth = 0;
  let mode = 'code';
  let inClass = false;
  let previous = '';
  const opensRegex = (ch) => ch === '' || '([{=,:;!&|?+-*%^~<>'.includes(ch);
  for (let i = open; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];
    if (mode === 'line') {
      if (ch === '\n') mode = 'code';
      continue;
    }
    if (mode === 'block') {
      if (ch === '*' && next === '/') { mode = 'code'; i += 1; }
      continue;
    }
    if (mode === 'single' || mode === 'double' || mode === 'template') {
      if (ch === '\\') { i += 1; continue; }
      if ((mode === 'single' && ch === "'") || (mode === 'double' && ch === '"') || (mode === 'template' && ch === '`')) mode = 'code';
      continue;
    }
    if (mode === 'regex') {
      if (ch === '\\') { i += 1; continue; }
      if (ch === '[') { inClass = true; continue; }
      if (ch === ']') { inClass = false; continue; }
      if (ch === '/' && inClass === false) mode = 'code';
      continue;
    }
    if (ch === '/' && next === '/') { mode = 'line'; i += 1; continue; }
    if (ch === '/' && next === '*') { mode = 'block'; i += 1; continue; }
    if (ch === "'") { mode = 'single'; continue; }
    if (ch === '"') { mode = 'double'; continue; }
    if (ch === '`') { mode = 'template'; continue; }
    if (ch === '/' && opensRegex(previous)) { mode = 'regex'; inClass = false; continue; }
    if (pairs[ch] !== undefined) depth += 1;
    else if (closers.includes(ch)) {
      depth -= 1;
      if (depth === 0) return i;
    }
    if (/\S/.test(ch)) previous = ch;
  }
  return -1;
}
/** Extract one top-level declaration by delimiter matching. */
function grab(name) {
  const decl = source.indexOf('const ' + name + ' = ');
  const asyncFn = source.indexOf('async function ' + name + '(');
  const plainFn = source.indexOf('function ' + name + '(');
  const fn = asyncFn >= 0 && (plainFn < 0 || asyncFn < plainFn) ? asyncFn : plainFn;
  if (decl < 0 && fn < 0) throw new Error('lib/client.js no longer defines ' + name);
  if (decl >= 0 && (fn < 0 || decl < fn)) {
    const eq = source.indexOf('=', decl);
    const firstValue = source.slice(eq + 1).trimStart()[0];
    if (!'([{'.includes(firstValue)) return source.slice(decl, source.indexOf(';', eq) + 1);
    const open = source.indexOf(firstValue, eq);
    const close = matchDelimiter(source, open);
    if (close < 0) throw new Error('unterminated ' + name);
    return source.slice(decl, source[close + 1] === ';' ? close + 2 : close + 1);
  }
  const paramsOpen = source.indexOf('(', fn);
  const bodyOpen = source.indexOf('{', matchDelimiter(source, paramsOpen));
  const bodyClose = matchDelimiter(source, bodyOpen);
  if (bodyClose < 0) throw new Error('unterminated ' + name);
  return source.slice(fn, bodyClose + 1);
}

const CONSTS = ['SHARE_MAX_CANVAS', 'SHARE_MIN_SCALE'];
const FUNCS = ['shareGroupTurns', 'shareBlocksFromGroups', 'shareCleanUrlText', 'shareErrorMessage'];
const sandbox = new Function(
  [...CONSTS, ...FUNCS].map(grab).join('\n') + '\nreturn { ' + [...CONSTS, ...FUNCS].join(', ') + ' };',
)();

const { shareGroupTurns, shareBlocksFromGroups, shareCleanUrlText, shareErrorMessage } = sandbox;

const results = [];
function check(label, ok, detail = '') {
  results.push([label, !!ok, detail]);
  console.log((ok ? 'ok   ' : 'FAIL ') + label + (detail === '' ? '' : '  (' + detail + ')'));
}
const eq = (a, b) => JSON.stringify(a) === JSON.stringify(b);

// 1 + 3: one turn keeps the user message and every non-reasoning assistant segment.
{
  const groups = shareGroupTurns([
    { turn: '1', kind: 'user', text: 'hi', time: '9月30日 17:39' },
    { turn: '1', kind: 'assistant-step', reasoning: true, text: 'thinking' },
    { turn: '1', kind: 'assistant-step', text: 'progress note' },
    { turn: '1', kind: 'tool-call', text: 'tool output' },
    { turn: '1', kind: 'assistant-step', text: 'final answer' },
  ]);
  check('one shareable turn', groups.length === 1, String(groups.length));
  check('turn key preserved', groups[0]?.key === '1');
  check('user indexes', eq(groups[0]?.userIndexes, [0]), JSON.stringify(groups[0]?.userIndexes));
  check('all assistant text segments kept', eq(groups[0]?.answerIndexes, [2, 4]), JSON.stringify(groups[0]?.answerIndexes));
  check('all rows belong to the group', eq(groups[0]?.indexes, [0, 1, 2, 3, 4]));
  check('user clock wins', groups[0]?.time === '9月30日 17:39', groups[0]?.time);
}

// 2: assistant-only continuation turn; reasoning/tool-only turns stay out.
{
  const groups = shareGroupTurns([
    { turn: '2', kind: 'turn-trigger', text: '', time: '10:00' },
    { turn: '2', kind: 'assistant-step', text: 'answer' },
    { turn: '3', kind: 'turn-process', text: 'done' },
    { turn: '3', kind: 'tool-call', text: 'x' },
    { turn: '3', kind: 'assistant-step', reasoning: true, text: 'think' },
  ]);
  check('assistant-only turn is shareable', groups.length === 1 && groups[0]?.key === '2', groups.map((g) => g.key).join(','));
  check('assistant-only has no user row', eq(groups[0]?.userIndexes, []));
  check('assistant-only answer index', eq(groups[0]?.answerIndexes, [1]));
  check('trigger clock used as fallback', groups[0]?.time === '10:00', groups[0]?.time);
}

// 4: fallback clock; steering counts as user input; empty strings ignored.
{
  const groups = shareGroupTurns([
    { turn: '4', kind: 'turn-process', text: '', time: 't0' },
    { turn: '4', kind: 'steering', text: 'continue' },
    { turn: '4', kind: 'user', text: '   ' },
    { turn: '4', kind: 'assistant-step', text: '   ' },
    { turn: '4', kind: 'assistant-step', text: 'ok' },
  ]);
  check('steering is user input', eq(groups[0]?.userIndexes, [1]), JSON.stringify(groups[0]?.userIndexes));
  check('blank text ignored', eq(groups[0]?.answerIndexes, [4]), JSON.stringify(groups[0]?.answerIndexes));
  check('first-row clock fallback', groups[0]?.time === 't0', groups[0]?.time);
}

// 5: first-appearance order and junk tolerance.
{
  const groups = shareGroupTurns([
    null,
    { turn: '', kind: 'user', text: 'x' },
    { turn: '5', text: 'no kind' },
    { turn: '5', kind: 'user', text: 'first' },
    { turn: '6', kind: 'user', text: 'second' },
    { turn: '5', kind: 'assistant-step', text: 'first answer' },
  ]);
  check('junk ignored, two turns', groups.length === 2, String(groups.length));
  check('first-appearance order', eq(groups.map((g) => g.key), ['5', '6']));
  check('interleaved rows grouped', eq(groups[0]?.indexes, [3, 5]), JSON.stringify(groups[0]?.indexes));
}

// 6: blocks flatten by role and DOM order; keys survive history paging.
{
  const items = [
    { key: 'u0', turn: '1', kind: 'user', text: 'hi', time: '9月30日 17:39' },
    { key: 'a1', turn: '1', kind: 'assistant-step', text: 'first segment' },
    { key: 'x2', turn: '1', kind: 'tool-call', text: 'tool output' },
    { key: 'a3', turn: '1', kind: 'assistant-step', text: 'second segment' },
  ];
  const blocks = shareBlocksFromGroups(shareGroupTurns(items), items);
  check('one block per user/assistant row', blocks.length === 3, String(blocks.length));
  check('block order follows the DOM', eq(blocks.map((b) => b.key), ['u0', 'a1', 'a3']), JSON.stringify(blocks.map((b) => b.key)));
  check('block roles', eq(blocks.map((b) => b.role), ['user', 'assistant', 'assistant']));
  check('block turn preserved', blocks.every((b) => b.turn === '1'));
}
{
  const items = [
    { key: 'a0', turn: '2', kind: 'assistant-step', text: 'answer first' },
    { key: 'u1', turn: '2', kind: 'steering', text: 'then steer' },
  ];
  const blocks = shareBlocksFromGroups(shareGroupTurns(items), items);
  check('steering after an answer keeps DOM order', eq(blocks.map((b) => b.role), ['assistant', 'user']), JSON.stringify(blocks.map((b) => b.role)));
}
{
  const items = [
    { turn: '3', kind: 'user', text: 'no anchor key' },
    { key: '', turn: '3', kind: 'assistant-step', text: 'empty anchor key' },
  ];
  const blocks = shareBlocksFromGroups(shareGroupTurns(items), items);
  check('missing keys get a stable fallback', blocks[0]?.key === 'user:3:0' && blocks[1]?.key === 'assistant:3:1', JSON.stringify(blocks.map((b) => b.key)));
}

// 7: external URLs never survive into the SVG image.
{
  const css = '.a{background:url(https://example.com/a.png)}.b{background:url( "/x.png" )}.c{background:url(data:image/png;base64,AAA)}.d{background:url("data:image/png;base64,BBB")}';
  const cleaned = shareCleanUrlText(css);
  check('http url stripped', !/example\.com/.test(cleaned), cleaned);
  check('root-relative url stripped', !/\/x\.png/.test(cleaned));
  check('data url kept', cleaned.includes('url(data:image/png;base64,AAA)'));
  check('quoted data url kept', cleaned.includes('url("data:image/png;base64,BBB")'));
  check('uppercase URL sanitized', !/HTTP:\/\//.test(shareCleanUrlText('.x{background:URL(HTTP://X/A.PNG)}')));
}

// 7: error text helper.
{
  check('error message extracted', shareErrorMessage(new Error('boom')) === 'boom');
  check('null error tolerated', shareErrorMessage(null) === 'unknown error');
}

// 8: shipped-source structure (browser path cannot rely on a missing piece).
{
  const structural = [
    ['share module present', source.includes('//#region dsh-enhance-tool: session share (image)')],
    ['utilities slot registration', /conversation\.session\.header\.utilities[\s\S]{0,200}id: "enhancer-share"/.test(source)],
    ['clipboard promise handoff', source.includes('new ClipboardItem({ "image/png": blobPromise })')],
    ['foreignObject rasterizer', source.includes('foreignObject x="0" y="0"')],
    ['canvas size guard', source.includes('SHARE_MAX_CANVAS / viewportHeight') && source.includes('scale >= SHARE_MIN_SCALE')],
    ['css sanitized before raster', /shareCollectCss[\s\S]{0,600}shareCleanUrlText/.test(source)],
    ['default-on switch', /showShare: true/.test(source)],
    ['settings row', /key: "share"[\s\S]{0,200}会话分享/.test(source)],
    ['remount keeps share mode', source.includes('mainConversationSessionId()')],
    ['block flattener', /function shareBlocksFromGroups\(/.test(source)],
    ['block marker attribute', source.includes('data-enhc-share-block')],
    ['selection chrome stripped from clones', source.includes('classList.remove("enhc-collapsed", "enhc-share-picked", "enhc-share-excluded")')],
    ['end marker appended', source.includes('enhc-share-sentinel')],
    ['raster height cropped at the marker', /function shareFindSentinel\(/.test(source) && /function shareCropCanvas\(/.test(source)],
    ['oversized SVG viewport', source.includes('viewportHeight = baseHeight + Math.max(600, Math.ceil(baseHeight * 0.25))')],
    ['selection cap', source.includes('一次最多分享 120 段内容')],
  ];
  for (const [label, ok] of structural) check(label, ok);
}

const failed = results.filter(([, ok]) => !ok).length;
console.log('\n' + (results.length - failed) + '/' + results.length + ' assertions passed');
process.exit(failed === 0 ? 0 : 1);
