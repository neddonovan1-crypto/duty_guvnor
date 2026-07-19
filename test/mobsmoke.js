/* Hard mobile smoke: 390x820, three full shifts through the pocket-book UI.
 * Fails on any console error, any horizontal overflow at any step, a shift
 * that doesn't terminate, or a missing pocket-book surface (dock ticker,
 * radio sheet, notice strip, Division row, occurrence book). */
'use strict';
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 820 } });
  const errors = [];
  const benign = (t) => t.includes('ERR_FILE_NOT_FOUND') || t.includes('avatars/') ||
    t.includes('fonts.g') || t.includes('ERR_CONNECTION_RESET') || t.includes('ERR_NAME_NOT_RESOLVED');
  page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto('file://' + path.resolve(process.argv[2] || path.join(__dirname, '..', 'index.html')));
  await page.emulateMedia({ reducedMotion: 'reduce' });

  let worstOverflow = 0;
  async function checkOverflow(where) {
    const o = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (o > worstOverflow) worstOverflow = o;
    if (o > 0) throw new Error(`horizontal overflow ${o}px at ${where}`);
  }

  let sawRadioSheet = false, sawNotice = false, sawDivision = false, ranDivision = false;
  let sawChance = false, toggledLog = false;

  for (let shift = 1; shift <= 3; shift++) {
    await page.reload();
    await page.waitForSelector('h1:has-text("DUTY GUVNOR")', { timeout: 5000 });
    await checkOverflow(`shift ${shift} title`);
    await page.click('button:has-text("BOOK ON DUTY")');

    let steps = 0;
    while (steps++ < 250) {
      if (await page.$('button:has-text("WORK ANOTHER SHIFT")')) break;
      if (steps % 10 === 0) await checkOverflow(`shift ${shift} step ${steps}`);
      const cont = await page.$('.continue button');
      if (cont) { await cont.dispatchEvent('click').catch(() => {}); continue; }
      if (!sawNotice) sawNotice = !!(await page.$('.notice-strip'));
      if (!sawDivision) sawDivision = !!(await page.$('#division .call-btn'));
      // ring Division once: stage in the dock, key the set
      if (!ranDivision) {
        const spg = await page.$('.call-btn:not([disabled]):has-text("S.P.G.")');
        if (spg) {
          await spg.dispatchEvent('click');
          const key = await page.$('#txkey:not([disabled])');
          if (!key) throw new Error('division staged but the set did not wake');
          await key.dispatchEvent('click');
          await page.waitForFunction(() => {
            const d = document.querySelector('#division .div-status');
            return d && d.textContent.includes('came and went');
          }, { timeout: 20000 });
          ranDivision = true;
          continue;
        }
      }
      // toggle the dock ticker open and closed once
      if (!toggledLog) {
        const lp = await page.$('#logpanel');
        if (lp) {
          await lp.dispatchEvent('click');
          await page.waitForTimeout(100);
          const open = await page.$('#logpanel.open');
          await lp.dispatchEvent('click');
          toggledLog = !!open;
          await checkOverflow(`shift ${shift} log open`);
        }
      }
      const cs = await page.$$('.choices button:not([disabled])');
      if (cs.length) {
        // The last choice is usually the desk option, which never wakes the
        // set nor stages a gamble — so until each coverage target is proven,
        // actively hunt the choice that reaches it (a gamble chip, then a
        // VIA R/T dispatch). A run of desk-only last choices must not leave
        // the sheet or the chance panel starved of samples.
        let pick = cs[cs.length - 1];
        if (!sawChance) {
          const gamble = await page.$('.choices button:not([disabled]):has(.req-odds)');
          if (gamble) pick = gamble;
        }
        if (pick === cs[cs.length - 1] && !sawRadioSheet) {
          const rt = await page.$('.choices button:not([disabled]):has-text("VIA R/T")');
          if (rt) pick = rt;
        }
        await pick.dispatchEvent('click').catch(() => {});
        const ch = await page.$('.chanceit');
        if (ch) {
          await checkOverflow(`shift ${shift} gamble panel`);
          const boost = await page.$('.boost-btn:not([disabled])');
          if (boost) await boost.dispatchEvent('click');
          await page.dispatchEvent('.chanceit', 'click').catch(() => {});
          sawChance = true;
        }
        const key = await page.$('#txkey:not([disabled])');
        if (key && !(await page.$('.continue button'))) {
          // the set is a bottom sheet on mobile: it must actually be visible
          if (!sawRadioSheet) {
            // condition-wait, not a snapshot: the sheet must BECOME visible,
            // and a mid-render sample must not fail the whole run
            sawRadioSheet = await page.waitForFunction(() => {
              const r = document.getElementById('radio');
              return !!r && r.classList.contains('awake') && r.offsetHeight > 40;
            }, { timeout: 2000 }).then(() => true).catch(() => false);
          }
          await key.dispatchEvent('click');
          await page.waitForSelector('.continue button', { timeout: 15000 }).catch(() => {});
        }
        continue;
      }
      const p = await page.$('.paper,.rt-panel');
      if (p) await p.dispatchEvent('click').catch(() => {});
      await page.waitForTimeout(60);
    }
    if (steps >= 250) throw new Error(`shift ${shift}: did not reach an ending in 250 UI steps`);
    const stamp = (await page.textContent('.stamp-verdict')).trim();
    await checkOverflow(`shift ${shift} ending`);
    // the occurrence book on the small screen
    await page.click('button:has-text("THE OCCURRENCE BOOK")');
    const rows = await page.$$eval('.ledger .ledger-row', (r) => r.length);
    if (!rows) throw new Error('occurrence book empty on mobile');
    await checkOverflow(`shift ${shift} occurrence book`);
    console.log(`shift ${shift}: "${stamp}" — book ${rows} entries, overflow 0`);
  }

  if (!sawRadioSheet) throw new Error('the radio bottom sheet never woke');
  if (!sawNotice) throw new Error('the parade notice never rendered in the pocket book');
  if (!sawDivision) throw new Error('the Division row never rendered in the pocket book');
  if (!ranDivision) throw new Error('never rang Division on mobile');
  if (!toggledLog) throw new Error('the dock ticker never toggled open');
  if (!sawChance) throw new Error('the mobile gamble panel (chanceit) never rendered — its overflow check never ran');
  console.log(`extras — chanceit on mobile: ${sawChance}, radio sheet: OK, ticker toggle: OK`);

  if (errors.length) {
    console.error('CONSOLE/PAGE ERRORS:');
    errors.forEach((e) => console.error('  ' + e));
    process.exit(1);
  }
  console.log('MOBILE SMOKE OK: 3 full shifts, zero console errors, zero overflow.');
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
