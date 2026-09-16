#!/usr/bin/env node
/**
 * Regression test for the MCP patch-merge logic in the plugin's host half.
 *
 * The MCP drawer edits the profile's `cordis.patch.yml` through three pure
 * functions inside lib/index.js (parseMcpRows / serializeMcpRow / splicePatch).
 * They are not exported, so this harness extracts their source text and runs them
 * against synthetic patch layers — no dsh boot, no file writes.
 *
 * Invariants covered (each one regressed at least once):
 *   1. user content outside the managed block always survives;
 *   2. every managed row is parsed, so adding a server never drops the others
 *      (matching only the first id per block silently removed row 2 when row 3
 *      was added);
 *   3. the managed block is emitted exactly once, and disappears when the last
 *      row is removed;
 *   4. removing one row leaves the others untouched.
 *
 * Usage: node tools/mcp-merge-test.mjs   (exit 0 = all invariants hold)
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const source = readFileSync(join(here, '..', 'lib', 'index.js'), 'utf8');

/** Extract one top-level function's source text by brace matching. */
function grabFunction(name) {
  const start = source.indexOf(`function ${name}(`);
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

const { parseMcpRows, splicePatch } = new Function(
  [
    grabFunction('parseMcpRows'),
    grabFunction('serializeMcpRow'),
    grabFunction('splicePatch'),
    'return { parseMcpRows, splicePatch };',
  ].join('\n'),
)();

const failures = [];
const check = (label, actual, expected) => {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}${ok ? '' : `\n       expected ${JSON.stringify(expected)}\n       actual   ${JSON.stringify(actual)}`}`);
  if (!ok) failures.push(label);
};

const USER_LAYER = [
  '# custom profile patch layer',
  '# user note that must survive',
  '- id: session-title-llm',
  '  disabled: true',
  '',
].join('\n');

const http = (name) => ({ serverName: name, transport: 'http', url: `http://127.0.0.1:9/${name}` });
const stdio = (name) => ({ serverName: name, transport: 'stdio', command: '/bin/echo', args: ['hi'] });
const append = (text, row) => splicePatch([...parseMcpRows(text), row], text);
const userIntact = (text) =>
  text.includes('# user note that must survive') && text.includes('- id: session-title-llm');

// 1 — three adds in a row; every earlier row must survive
let text = append(USER_LAYER, http('alpha'));
text = append(text, stdio('beta'));
text = append(text, http('gamma'));
check('three adds keep all rows', parseMcpRows(text).map((r) => r.serverName), ['alpha', 'beta', 'gamma']);
check('three adds keep user content', userIntact(text), true);
check('single managed block', (text.match(/MCP servers\./g) ?? []).length, 1);
check('stdio row round-trips command', parseMcpRows(text)[1] ?? {}, {
  serverName: 'beta',
  transport: 'stdio',
  command: '/bin/echo',
});
check('http row round-trips url', parseMcpRows(text)[2]?.url ?? null, 'http://127.0.0.1:9/gamma');

// 2 — remove the middle row only
text = splicePatch(
  parseMcpRows(text).filter((r) => r.serverName !== 'beta'),
  text,
);
check('remove keeps the others', parseMcpRows(text).map((r) => r.serverName), ['alpha', 'gamma']);
check('remove keeps user content', userIntact(text), true);

// 3 — remove everything: managed block disappears, user layer stays byte-identical
text = splicePatch([], text);
check('last remove drops the managed block', parseMcpRows(text), []);
check('last remove restores the base text', text, USER_LAYER);
check('no user content lost', userIntact(text), true);

// 4 — a user row after the managed block must not leak into a parsed row
const trailing = `${append(USER_LAYER, http('alpha'))}- id: some-other-plugin\n  url: "http://leak.example/mcp"\n`;
check('trailing user row does not leak', parseMcpRows(trailing)[0] ?? {}, {
  serverName: 'alpha',
  transport: 'http',
  url: 'http://127.0.0.1:9/alpha',
});

if (failures.length > 0) {
  console.error(`\n${failures.length} invariant(s) failed`);
  process.exit(1);
}
console.log('\nall MCP merge invariants hold');
