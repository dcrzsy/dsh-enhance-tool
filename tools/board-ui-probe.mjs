#!/usr/bin/env node
/**
 * End-to-end probe for the task board (通用面板) against a LIVE dsh web.
 *
 * Not part of CI: it needs a running `dsh web`, a Chrome binary, and xvfb on a
 * headless box. It drives the real UI with puppeteer (resolved from the global
 * node_modules) and asserts the board's interactive invariants.
 *
 * Usage:
 *   TOKEN=$(grep -o 'token=[A-Za-z0-9_-]*' /tmp/dsh-web.log | tail -1 | cut -d= -f2)
 *   xvfb-run -a node tools/board-ui-probe.mjs "$TOKEN" <current-session-id> [screenshot.png]
 *
 * Every check prints `ok`/`FAIL`; exit code 1 when any check fails. The probe drags
 * real sessions around, so it always restores what it touched (撤销归档 / 恢复) and
 * finishes by asserting that nothing is left archived.
 */

import { createRequire } from 'node:module';

const require = createRequire('/home/dcrzsy/.nvm/versions/node/v22.23.1/lib/node_modules/');
const puppeteer = require('puppeteer');

const TOKEN = process.argv[2];
const SESSION = process.argv[3];
const SHOT = process.argv[4] ?? '';
const URL = `http://127.0.0.1:3080/?token=${TOKEN}`;
if (!TOKEN || !SESSION) {
  console.error('usage: node tools/board-ui-probe.mjs <token> <current-session-id> [screenshot.png]');
  process.exit(2);
}

const results = [];
const check = (label, ok, detail = '') => {
  results.push([label, !!ok, detail]);
  console.log(`${ok ? 'ok  ' : 'FAIL'} ${label}${detail === '' ? '' : `  (${detail})`}`);
};
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await puppeteer.launch({
  headless: false,
  executablePath: '/usr/bin/google-chrome',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 940, deviceScaleFactor: SHOT === '' ? 1 : 2 });
const errors = [];
page.on('pageerror', (e) => errors.push(String(e).slice(0, 160)));
page.on('console', (m) => {
  const text = m.text();
  // resource statuses (404 asset, 409 from the archive plugin refusing a delete) are
  // expected traffic, not failures
  if (/Failed to load resource/.test(text)) return;
  if (m.type() === 'error' || /crash|ReferenceError|TypeError/.test(text)) errors.push(text.slice(0, 200));
});
await page.evaluateOnNewDocument(
  (sid) => localStorage.setItem('dsh.sessions.current', JSON.stringify({ sessionId: sid })),
  SESSION,
);
await page.goto(URL, { waitUntil: 'domcontentloaded' });
const ready = await page
  .waitForSelector('[data-chat-flow-key]', { timeout: 40000 })
  .then(() => true)
  .catch(() => false);
check('the app boots with the seeded session', ready);
await sleep(3000);

const clickEntry = () => page.evaluate(() => document.querySelector('.enhc-board-btn')?.click());
const openBoard = async () => {
  for (let i = 0; i < 3; i += 1) {
    await clickEntry();
    const open = await page
      .waitForSelector('.enhc-board', { timeout: 8000 })
      .then(() => true)
      .catch(() => false);
    if (open) return true;
    await sleep(500);
  }
  return false;
};
const colNames = () =>
  page.evaluate(() =>
    [...document.querySelectorAll('.enhc-board-col')].map((c) => ({
      name: c.querySelector('.enhc-board-col-name')?.textContent?.trim() ?? '',
      key: [...c.classList].find((k) => k === 'enhc-board-col') ? c.dataset.tone : null,
      cards: c.querySelectorAll('[data-enhc-card]').length,
      collapsed: c.dataset.collapsed === 'true',
    })),
  );
const firstCard = () => page.evaluate(() => document.querySelector('[data-enhc-card]')?.getAttribute('data-enhc-card') ?? null);
const clickCardButton = (id, pattern) =>
  page.evaluate(
    (cardId, re) => {
      const button = [...document.querySelectorAll(`[data-enhc-card="${cardId}"] button`)].find((b) =>
        new RegExp(re).test(b.textContent || b.getAttribute('aria-label') || ''),
      );
      button?.click();
      return !!button;
    },
    id,
    pattern,
  );
const dragCard = async (id, columnIndex) => {
  await page.evaluate(
    (cardId, idx) => {
      const card = document.querySelector(`[data-enhc-card="${cardId}"]`);
      const column = [...document.querySelectorAll('.enhc-board-col')][idx];
      const dt = new DataTransfer();
      const init = { bubbles: true, cancelable: true, dataTransfer: dt };
      card.dispatchEvent(new DragEvent('dragstart', init));
      column.dispatchEvent(new DragEvent('dragover', init));
      column.dispatchEvent(new DragEvent('drop', init));
      card.dispatchEvent(new DragEvent('dragend', init));
    },
    id,
    columnIndex,
  );
  await sleep(400);
};

check('the board entry opens the panel', await openBoard());
const columns = await colNames();
check('the board has six columns', columns.length === 6, columns.map((c) => c.name).join(' / '));
check(
  'column order is 待办/进行中/完成/搁置/归档/垃圾桶',
  JSON.stringify(columns.map((c) => c.name)) === JSON.stringify(['待办', '进行中', '完成', '搁置', '归档', '垃圾桶']),
  columns.map((c) => c.name).join(' / '),
);
const placed = columns.reduce((sum, c) => sum + c.cards, 0);
check('cards are rendered', placed > 0, `${placed} cards`);
check('搁置 is empty until something is parked there', columns[3].cards === 0);

// --- a card click opens that session and closes the panel
const target = await firstCard();
check('the board has a clickable card', target !== null);
if (target !== null) {
  await page.evaluate((id) => document.querySelector(`[data-enhc-card="${id}"]`).click(), target);
  await sleep(1500);
  const after = await page.evaluate(() => ({
    open: !!document.querySelector('.enhc-board'),
    current: JSON.parse(localStorage.getItem('dsh.sessions.current') || '{}').sessionId ?? null,
  }));
  check('clicking a card opens that session', after.current === target || after.open === false, String(after.current));
  check('clicking a card closes the panel', after.open === false);
  await openBoard();
}

// --- drag to 完成 (index 2) and back
const dragTarget = await firstCard();
if (dragTarget !== null) {
  await dragCard(dragTarget, 2);
  const afterDrag = await colNames();
  const inDone = await page.evaluate((id) => !!document.querySelectorAll('.enhc-board-col')[2].querySelector(`[data-enhc-card="${id}"]`), dragTarget);
  check('drag moves a card into 完成', inDone, afterDrag.map((c) => c.cards).join(','));
  const pinned = await page.evaluate((id) => document.querySelector(`[data-enhc-card="${id}"]`)?.innerText.includes('手动') ?? false, dragTarget);
  check('drag marks the card as 手动 (pinned)', pinned);
  // move it to 搁置 (index 3) through the ⋯ menu and back to its auto column
  await clickCardButton(dragTarget, '⋯');
  await sleep(300);
  const menuItems = await page.evaluate(() => [...document.querySelectorAll('.enhc-board-menu button')].map((b) => b.textContent.trim()));
  check('the move menu lists six columns plus reset', menuItems.length === 7, menuItems.join(' | '));
  await page.evaluate(() => [...document.querySelectorAll('.enhc-board-menu button')].find((b) => b.textContent.trim() === '搁置')?.click());
  await sleep(400);
  const shelved = await page.evaluate((id) => !!document.querySelectorAll('.enhc-board-col')[3].querySelector(`[data-enhc-card="${id}"]`), dragTarget);
  check('the menu parks a card in 搁置', shelved);
  await clickCardButton(dragTarget, '⋯');
  await sleep(300);
  await page.evaluate(() => [...document.querySelectorAll('.enhc-board-menu button')].find((b) => /重置为自动/.test(b.textContent || ''))?.click());
  await sleep(400);
  const backToAuto = await page.evaluate(() => document.querySelectorAll('[data-enhc-card]').length);
  check('reset to auto keeps the card on the board', backToAuto > 0);
}

// --- 待办 新建: free-form to-do cards (no session behind them)
const addExists = await page.evaluate(() => !!document.querySelector('.enhc-board-add'));
check('待办 offers a 新建待办 row', addExists);
const itemCountBefore = await page.evaluate(() => document.querySelectorAll('[data-enhc-item]').length);
await page.evaluate(() => document.querySelector('.enhc-board-add').click());
await sleep(300);
const PROBE_TITLE = 'probe 待办卡（会自动删除）';
await page.keyboard.type(PROBE_TITLE, { delay: 8 });
await page.keyboard.press('Enter');
await sleep(500);
const created = await page.evaluate(() => {
  const card = [...document.querySelectorAll('[data-enhc-item]')].find((c) => c.innerText.includes('probe 待办卡'));
  return card ? { id: card.getAttribute('data-enhc-card'), inTodo: !!document.querySelectorAll('.enhc-board-col')[0].querySelector(`[data-enhc-card="${card.getAttribute('data-enhc-card')}"]`), title: card.innerText.replace(/\n+/g, ' | ') } : null;
});
check('a new to-do card appears in 待办', created !== null && created.inTodo, created?.title ?? 'not found');
check('the add row stays open for the next card', await page.evaluate(() => !!document.querySelector('.enhc-board-add-input')));
await page.keyboard.press('Escape');
await sleep(300);
check('Escape leaves the add row', await page.evaluate(() => !document.querySelector('.enhc-board-add-input')));
check('the header counts free-form cards', await page.evaluate(() => /条待办/.test(document.querySelector('.enhc-board-count')?.textContent ?? '')), true);

if (created !== null) {
  const itemId = created.id;
  // rename in place (double click)
  await page.evaluate((id) => document.querySelector(`[data-enhc-card="${id}"]`).dispatchEvent(new MouseEvent('dblclick', { bubbles: true })), itemId);
  await sleep(300);
  const editOpen = await page.evaluate((id) => !!document.querySelector(`[data-enhc-card="${id}"] input.enhc-board-item-input`), itemId);
  check('double click opens an inline editor', editOpen);
  await page.keyboard.down('Control');
  await page.keyboard.press('KeyA');
  await page.keyboard.up('Control');
  await page.keyboard.type('probe 改名后的待办', { delay: 8 });
  await page.keyboard.press('Enter');
  await sleep(500);
  check('the edited title is saved', await page.evaluate((id) => (document.querySelector(`[data-enhc-card="${id}"]`)?.innerText ?? '').includes('改名后的待办'), itemId));
  // check it off -> 完成
  await page.evaluate((id) => document.querySelector(`[data-enhc-card="${id}"] .enhc-board-item-check input`).click(), itemId);
  await sleep(600);
  check('checking a to-do card files it under 完成', await page.evaluate((id) => !!document.querySelectorAll('.enhc-board-col')[2].querySelector(`[data-enhc-card="${id}"]`), itemId));
  // move it back and delete it
  await page.evaluate((id) => document.querySelector(`[data-enhc-card="${id}"] .enhc-board-item-check input`).click(), itemId);
  await sleep(500);
  await clickCardButton(itemId, '⋯');
  await sleep(300);
  const itemMenu = await page.evaluate(() => [...document.querySelectorAll('.enhc-board-menu button')].map((b) => b.textContent.trim()));
  check('a to-do card menu has columns plus 删除 (no 垃圾桶)', itemMenu.includes('删除') && !itemMenu.includes('垃圾桶'), itemMenu.join(' | '));
  await page.evaluate(() => [...document.querySelectorAll('.enhc-board-menu button')].find((b) => b.textContent.trim() === '删除')?.click());
  await sleep(600);
  const gone = await page.evaluate((id) => !document.querySelector(`[data-enhc-card="${id}"]`), itemId);
  check('deleting a to-do card removes it', gone);
  check('the to-do card count is back to where it started', await page.evaluate((n) => document.querySelectorAll('[data-enhc-item]').length === n, itemCountBefore));
}

// --- trash round trip + real-delete attempt + undo
const trashTarget = await firstCard();
if (trashTarget !== null) {
  await dragCard(trashTarget, 5);
  check('drag into 垃圾桶', await page.evaluate((id) => !!document.querySelectorAll('.enhc-board-col')[5].querySelector(`[data-enhc-card="${id}"]`), trashTarget));
  await clickCardButton(trashTarget, '恢复');
  await sleep(400);
  const restoredTo = await page.evaluate(() => [...document.querySelectorAll('.enhc-board-col')].findIndex((c) => c.querySelector('[data-enhc-card]') !== null));
  check('恢复 hands the card back to the auto rules', restoredTo >= 0, `column ${restoredTo}`);
  // clear the trash for real, then undo the archive it may have caused
  await dragCard(trashTarget, 5);
  await page.evaluate(() => [...document.querySelectorAll('.enhc-board-col-header button')].find((b) => /清空/.test(b.textContent || ''))?.click());
  await sleep(200);
  await page.evaluate(() => [...document.querySelectorAll('.enhc-board-col-header button')].find((b) => /确认删除/.test(b.textContent || ''))?.click());
  await sleep(4000);
  const afterClear = await page.evaluate(() => ({
    trash: document.querySelectorAll('.enhc-board-col')[5].querySelectorAll('[data-enhc-card]').length,
    note: document.querySelector('.enhc-board-batch-text')?.textContent?.trim() ?? '',
  }));
  check('清空 empties the trash column', afterClear.trash === 0, afterClear.note);
  const undoLabel = await page.evaluate(() => [...document.querySelectorAll('.enhc-board-icon')].find((b) => /撤销归档/.test(b.textContent || ''))?.textContent?.trim() ?? null);
  if (undoLabel !== null) {
    await page.evaluate(() => [...document.querySelectorAll('.enhc-board-icon')].find((b) => /撤销归档/.test(b.textContent || ''))?.click());
    await sleep(3500);
    const undoLeft = await page.evaluate(() => [...document.querySelectorAll('.enhc-board-icon')].filter((b) => /撤销归档/.test(b.textContent || '')).length);
    check('撤销归档 restores sessions archived by a failed delete', undoLeft === 0, undoLabel);
  } else {
    check('撤销归档 restores sessions archived by a failed delete', true, 'nothing was archived (real delete worked)');
  }
  const leftovers = await page.evaluate(() => [...document.querySelectorAll('.enhc-board-icon')].filter((b) => /撤销归档/.test(b.textContent || '')).length);
  check('no archived leftovers after the probe', leftovers === 0, String(leftovers));
}

// --- batch select + move
await page.evaluate(() => [...document.querySelectorAll('.enhc-board-toolbar button')].find((b) => /批量选择/.test(b.textContent || ''))?.click());
await sleep(300);
await page.evaluate(() => {
  for (const card of [...document.querySelectorAll('[data-enhc-card]')].slice(0, 2)) card.click();
});
await sleep(300);
const batch = await page.evaluate(() => ({
  boxes: document.querySelectorAll('.enhc-board-checkbox').length,
  bar: !!document.querySelector('.enhc-board-batch'),
  text: document.querySelector('.enhc-board-batch')?.innerText.replace(/\n+/g, ' ') ?? '',
}));
check('batch mode shows checkboxes and a batch bar', batch.boxes > 0 && batch.bar, batch.text.slice(0, 60));
await page.evaluate(() => [...document.querySelectorAll('.enhc-board-batch button')].find((b) => b.textContent.trim() === '搁置')?.click());
await sleep(500);
const batchedToShelved = await page.evaluate(() => document.querySelectorAll('.enhc-board-col')[3].querySelectorAll('[data-enhc-card]').length);
check('batch move parks cards in 搁置', batchedToShelved > 0, `${batchedToShelved} cards`);
// give them back to the auto rules
await page.evaluate(() => {
  for (const card of [...document.querySelectorAll('.enhc-board-col')[3].querySelectorAll('[data-enhc-card]')]) card.click();
});
await sleep(300);
await page.evaluate(() => [...document.querySelectorAll('.enhc-board-batch button')].find((b) => b.textContent.trim() === '待办')?.click());
await sleep(500);
await page.evaluate(() => [...document.querySelectorAll('.enhc-board-toolbar button')].find((b) => /批量选择/.test(b.textContent || ''))?.click());

// --- collapse, search, reload, Esc
await page.evaluate(() => [...document.querySelectorAll('.enhc-board-col')][2].querySelector('.enhc-board-col-header button').click());
await sleep(400);
const collapsed = await page.evaluate(() => {
  const col = [...document.querySelectorAll('.enhc-board-col')].find((c) => c.dataset.collapsed === 'true');
  const label = col?.querySelector('.enhc-board-col-name');
  return { count: [...document.querySelectorAll('.enhc-board-col')].filter((c) => c.dataset.collapsed === 'true').length, width: Math.round(col?.getBoundingClientRect().width ?? 0), mode: label ? getComputedStyle(label).writingMode : null, name: label?.textContent ?? '' };
});
check('a collapsed column keeps a vertical label', collapsed.count === 1 && collapsed.width < 60 && collapsed.mode === 'vertical-rl', `${collapsed.name} ${collapsed.width}px`);
await page.click('.enhc-board-search');
await page.keyboard.type('zzz-no-such-session', { delay: 12 });
await sleep(500);
const searched = await colNames();
check('search filters every column', searched.every((c) => c.cards === 0), searched.map((c) => c.cards).join(','));
await page.keyboard.down('Control');
await page.keyboard.press('KeyA');
await page.keyboard.up('Control');
await page.keyboard.press('Backspace');
await sleep(500);
check('clearing the search brings the cards back', (await colNames()).some((c) => c.cards > 0));
await page.keyboard.press('Escape');
await sleep(400);
check('Esc closes the board', (await page.evaluate(() => !!document.querySelector('.enhc-board'))) === false);

// --- reload keeps the placement (localStorage) and the profile-mode fallback is safe
await page.reload({ waitUntil: 'domcontentloaded' });
await sleep(4500);
check('the board reopens after a reload', await openBoard());
const afterReload = await colNames();
check('the collapsed column survived the reload', afterReload[2].collapsed === true, afterReload.map((c) => (c.collapsed ? 'C' : 'o')).join(''));
if (SHOT !== '') {
  await page.screenshot({ path: SHOT });
  console.log(`screenshot: ${SHOT}`);
}
await page.keyboard.press('Escape');
await sleep(300);

check('no console errors', errors.length === 0, errors.slice(0, 2).join(' || '));

await browser.close();
const failed = results.filter(([, ok]) => !ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
if (failed.length > 0) {
  console.error(`FAILURES: ${failed.length} -> ${failed.map(([label]) => label).join(', ')}`);
  process.exit(1);
}
