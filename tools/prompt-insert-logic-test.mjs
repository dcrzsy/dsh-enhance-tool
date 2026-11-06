#!/usr/bin/env node
/**
 * Logic lock-in tests for prompt-library insertion (lib/client.js).
 *
 * The prompt library must behave like a paste, never like "replace the draft":
 *   - a non-empty draft survives and receives exactly one newline separator;
 *   - an already-newline-terminated draft gets no extra blank line;
 *   - a missing/empty `useInput` hook falls back to the live DOM editor
 *     (Lexical contenteditable included) instead of treating the draft as empty.
 *
 * Usage: node tools/prompt-insert-logic-test.mjs   (exit 0 = all invariants hold)
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

/** Build a mock document whose only composer editor is the supplied element. */
const documentWith = (element) => ({
  querySelector: (selector) => (selector === '[data-slot="conversation.composer.bar"] textarea' || selector === 'textarea.uV2eYG_input' || selector === '[data-composer-input]' ? element : null),
});

const sandboxFor = (documentMock) => new Function(
  'document',
  `${grab('composerTextarea')}\n${grab('composerEditor')}\n${grab('composerElementText')}\n${grab('composerDraft')}\n${grab('appendDraftText')}\nreturn { composerDraft, appendDraftText };`,
)(documentMock);

const defaultSandbox = sandboxFor(documentWith(null));
const { appendDraftText } = defaultSandbox;

let checks = 0;
let failed = 0;
const check = (name, ok, detail) => {
  checks += 1;
  if (!ok) {
    failed += 1;
    console.log(`FAIL ${name}${detail === undefined ? '' : ': ' + detail}`);
  }
};
const eq = (name, actual, expected) => check(name, actual === expected, `${JSON.stringify(actual)} !== ${JSON.stringify(expected)}`);

// 1. The separator is exactly one newline, never a replacement.
eq('empty draft takes the prompt as-is', appendDraftText('', 'prompt'), 'prompt');
eq('whitespace-only draft is treated as empty', appendDraftText('  \n\t', 'prompt'), 'prompt');
eq('existing draft is preserved', appendDraftText('draft', 'prompt'), 'draft\nprompt');
eq('multi-line drafts keep their own text', appendDraftText('line 1\nline 2', 'prompt'), 'line 1\nline 2\nprompt');
eq('multi-line prompts are pasted verbatim', appendDraftText('draft', 'a\nb'), 'draft\na\nb');

// 2. Do not accumulate blank lines when a separator is already there.
eq('trailing newline is not doubled', appendDraftText('draft\n', 'prompt'), 'draft\nprompt');
eq('trailing CRLF is not doubled', appendDraftText('draft\r\n', 'prompt'), 'draft\r\nprompt');
eq('newline plus indentation is not doubled', appendDraftText('draft\n  ', 'prompt'), 'draft\n  prompt');

// 3. A missing or still-empty live hook must fall back to the DOM editor.
eq('live hook wins when non-empty', sandboxFor(documentWith(null)).composerDraft('from-hook'), 'from-hook');
eq('empty hook falls back to contenteditable text', sandboxFor(documentWith({ innerText: 'from-dom' })).composerDraft(''), 'from-dom');
eq('null hook reads contenteditable text', sandboxFor(documentWith({ innerText: 'from-dom' })).composerDraft(null), 'from-dom');
eq('textarea value is read on legacy builds', sandboxFor(documentWith({ value: 'from-textarea' })).composerDraft(null), 'from-textarea');
eq('missing editor is still an empty draft', sandboxFor(documentWith(null)).composerDraft(null), '');

// 4. The shipped insertion path uses the guarded helpers (no second overwrite path).
check('insert() uses appendDraftText', source.includes('setComposerDraft(inputActions, appendDraftText(current, text))'));
check('insert() refocuses at the end', source.includes('window.setTimeout(focusComposerAtEnd, 60)'));
check('composerDraft() reads the DOM fallback', source.includes('const domText = composerElementText(composerEditor())'));

console.log(`${checks - failed}/${checks} prompt-insert assertions passed`);
process.exit(failed === 0 ? 0 : 1);
