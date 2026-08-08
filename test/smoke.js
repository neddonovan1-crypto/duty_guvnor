/* End-to-end smoke test: loads index.html in Chromium, plays 5 full shifts by
 * clicking through the real desk UI (including press-to-transmit holds), and
 * fails on any console error, missing element, or non-terminating shift. */
'use strict';
// The parade sheet's BOOK ON DUTY opens the muster room; the guvnor is
// chosen there and that screen's own button starts the night.
async function bookOn(page) {
  await page.click('button:has-text("BOOK ON DUTY")');
  const start = await page.waitForSelector('.start-btn', { timeout: 8000 });
  await start.click();
}

const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const errors = [];
  // file:// avatar probes 404 by design; Google Fonts is unreachable offline.
  const benign = (t) => t.includes('ERR_FILE_NOT_FOUND') || t.includes('avatars/') ||
    t.includes('fonts.g') || t.includes('ERR_CONNECTION_RESET') || t.includes('ERR_NAME_NOT_RESOLVED');
  page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto('file://' + path.resolve(process.argv[2] || path.join(__dirname, '..', 'index.html')));
  await page.emulateMedia({ reducedMotion: 'reduce' }); // skip typewriter for speed

  let sawHold = false; // at least one commit must go through the TX key
  let sawChance = false; // at least one staged gamble must go through CHANCE IT
  let sawNotice = false; // the parade notice strip must render
  let ranDivision = false; // ring Division once across the run
  for (let shift = 1; shift <= 5; shift++) {
    await page.reload();
    // Title screen (the parade sheet)
    await page.waitForSelector('h1:has-text("DUTY GUVNOR")', { timeout: 5000 });
    await bookOn(page);

    let steps = 0;
    let sawStory = false, sawMeters = false, sawLog = false, sawBoard = false;
    while (steps++ < 250) {
      // Ending screen (the Yard memorandum)?
      const endBtn = await page.$('button:has-text("WORK ANOTHER SHIFT")');
      if (endBtn) break;
      // Carry-on button after a result?
      const cont = await page.$('.continue button');
      if (cont) { await cont.click(); continue; }
      // Ring Division once: stage the S.P.G., then the request goes out on the key.
      if (!ranDivision) {
        const spg = await page.$('.call-btn:not([disabled]):has-text("S.P.G.")');
        if (spg) {
          await spg.click();
          const staged = await page.textContent('#division .div-status');
          if (!staged.includes('SPECIAL PATROL GROUP')) throw new Error(`division call did not stage: "${staged}"`);
          await page.click('#txkey');
          // a spent unit says so by greying its own button, not with a sentence
          await page.waitForFunction(() => {
            const b = Array.prototype.slice.call(document.querySelectorAll('#division .call-btn'))
              .find((x) => x.textContent.includes('S.P.G.'));
            return b && b.disabled;
          }, { timeout: 20000 });
          ranDivision = true;
          continue;
        }
      }
      // Otherwise pick a choice — hunting gambles until one has been chanced,
      // so the staging panel is guaranteed coverage every run.
      let choice = null;
      if (!sawChance) choice = await page.$('.choices button:not([disabled]):has(.req-odds)');
      if (!choice) choice = await page.$('.choices button:not([disabled])');
      if (choice) {
        // the posted parade: never more than two WPCs, every tag carries a trait
        if (steps < 5) {
          const tags = await page.$$eval('#status .hookrow .tag', (t) => t.map((x) => x.textContent));
          const wpcs = tags.filter((t) => t.startsWith('WPC')).length;
          if (wpcs > 2) throw new Error(`${wpcs} WPCs on the rail — cap is 2`);
          const traits = await page.$$eval('#status .hookrow .tag .trait', (t) => t.length);
          if (traits !== tags.length) throw new Error(`traits missing: ${traits}/${tags.length} tags chalked`);
        }
        if (!sawMeters) sawMeters = !!(await page.$('#status .meter .fill'));
        if (!sawStory) sawStory = !!(await page.$('h2:has-text("ONGOING GRIEF")'));
        if (!sawLog) sawLog = !!(await page.$('#log div'));
        if (!sawBoard) sawBoard = !!(await page.$('#status .hookrow'));
        if (!sawNotice) sawNotice = !!(await page.$('.notice-strip'));
        // the desk is a moving thing — paper settles, the board answers a
        // commit at once — so a handle can go stale or unstable between
        // query and click. Retry once against a freshly-found button.
        try {
          await choice.click({ timeout: 4000 });
        } catch (e) {
          const again = await page.$('.choices button:not([disabled])');
          if (!again) continue;
          await again.click({ timeout: 8000 });
        }
        // A staged desk gamble shows the backing panel: toggle a boost if one
        // is affordable, then CHANCE IT commits.
        if (await page.$('.chanceit')) {
          const boost = await page.$('.boost-btn:not([disabled])');
          if (boost) await boost.click(); // panel re-renders with new odds
          await page.click('.chanceit');
          sawChance = true;
        }
        // A dispatch choice arms the radio: key the set and let the message
        // finish. Only ever press it ARMED — mid-message the same key reads
        // BELAY, and pressing it then aborts the order instead of sending it.
        const key = await page.$('#txkey.armed');
        if (key && !(await page.$('.continue button'))) {
          await key.click();
          await page.waitForSelector('.continue button', { timeout: 15000 });
          sawHold = true;
        }
        continue;
      }
      // the card types a character at a time and reduced motion does not skip
      // it: waiting it out is most of this loop's budget, and how much of it
      // depends on how much prose the deal dealt
      const skip = await page.$('.skipbtn');
      if (skip) { await skip.click().catch(() => {}); continue; }
      await page.waitForTimeout(50);
    }
    if (steps > 250) throw new Error(`shift ${shift}: did not reach an ending in 250 UI steps`);
    const stamp = await page.textContent('.stamp-verdict');
    const memoOk = !!(await page.$('.memo .paras p'));
    console.log(`shift ${shift}: memo stamped "${stamp.trim()}" (meters:${sawMeters} saga:${sawStory} log:${sawLog} board:${sawBoard} memo:${memoOk})`);
    if (!sawMeters) throw new Error('chalk meters never rendered');
    // Printed in the line above since this test was written, asserted by
    // nothing: the marquee saga is the centrepiece of a night, and it could
    // stop announcing itself entirely with every shift still reported green.
    if (!sawStory) throw new Error('the ongoing grief never rendered — no saga announced itself all shift');
    if (!sawLog) throw new Error('station log never rendered');
    if (!sawBoard) throw new Error('the board never rendered');
    if (!memoOk) throw new Error('memorandum paragraphs missing');
    if (!['EXEMPLARY', 'ACCEPTABLE', 'UNACCEPTABLE', 'DISMISSED THE FORCE'].includes(stamp.trim())) {
      throw new Error(`unexpected stamp: "${stamp}"`);
    }
    // The occurrence book unfolds from the rail on every ending.
    if (shift === 1) {
      await page.click('button:has-text("THE OCCURRENCE BOOK")');
      const head = await page.textContent('.ledger .ledger-head');
      if (!head.includes('OCCURRENCE BOOK')) throw new Error(`book head wrong: "${head}"`);
      const rows = await page.$$eval('.ledger .ledger-row', (r) => r.length);
      if (!rows) throw new Error('occurrence book empty or missing');
      console.log(`occurrence book: ${rows} entries`);
    }
  }
  if (!sawHold) throw new Error('no commit ever went through the TX key — the radio path is untested');
  if (!sawChance) throw new Error('no staged gamble ever went through CHANCE IT');
  if (!sawNotice) throw new Error('the parade notice strip never rendered');
  if (!ranDivision) throw new Error('never rang Division');

  // Belay must abort: key the set, press again mid-message, expect SAY AGAIN.
  await page.reload();
  await bookOn(page);
  let aborted = false;
  for (let i = 0; i < 60 && !aborted; i++) {
    const cont = await page.$('.continue button');
    if (cont) { await cont.click(); continue; }
    const choice = await page.$('.choices button:not([disabled])');
    if (!choice) { await page.waitForTimeout(50); continue; }
    await choice.click();
    // a staged desk gamble would otherwise pin the loop on this card
    const ch = await page.$('.chanceit');
    if (ch) { await ch.click(); continue; }
    const key = await page.$('#txkey:not([disabled])');
    if (key && !(await page.$('.continue button'))) {
      await key.click();
      await page.waitForTimeout(150);
      await page.click('#txkey'); // BELAY THAT
      const status = await page.textContent('#radio .rt-status');
      if (!status.includes('SAY AGAIN')) throw new Error(`belay did not abort (status: "${status}")`);
      if (await page.$('.continue button')) throw new Error('belay still committed the choice');
      aborted = true;
    }
  }
  if (!aborted) throw new Error('never found a dispatch choice to test the belay');
  console.log('belay abort: OK (SAY AGAIN shown, no commit)');

  // Parade strength: short parades 3 PCs, full parades 5, rostered 4.
  // (fresh history: a grateful Duke from an earlier smoke shift would
  // second DS Palgrave onto the count and skew it — that's a feature)
  for (const [label, want] of [['MINIMUM STRENGTH', 3], ['MUTUAL AID', 5], ['AS ROSTERED', 4]]) {
    await page.evaluate(() => localStorage.removeItem('dg_hist'));
    await page.reload();
    await page.waitForSelector('.pick.mode', { timeout: 5000 });
    await page.click(`.pick.mode:has-text("${label}")`);
    await bookOn(page);
    await page.waitForSelector('#status .hookrow', { timeout: 5000 });
    const n = await page.$$eval('#status .hookrow', (r) => r.length);
    if (n !== want) throw new Error(`${label}: expected ${want} PCs on the rail, got ${n}`);
    console.log(`${label}: ${n} PCs on the rail`);
  }

  // No phantom names reach the desk. The four canonical casting parts must
  // be recast to real officers by every display point (this is the runtime
  // guard for the localiseText contract — the engine sim proves the recast
  // is correct, this proves the UI actually calls it). Full mode always fills
  // the three male parts (5 PCs, so >=3 non-WPC), so a male canonical name in
  // the rendered card or log that ISN'T on tonight's board means a display
  // point skipped localisation. Hartle can legitimately stay itself only when
  // no WPC paraded (the identity fallback).
  const CANON = ['Doyle', 'Whittle', 'Duffin', 'Hartle'];
  const canonRe = new RegExp('\\b(' + CANON.join('|') + ')\\b', 'i');
  for (let shift = 1; shift <= 3; shift++) {
    await page.evaluate(() => localStorage.removeItem('dg_hist')); // fresh: 5 PCs, no carried flags
    await page.reload();
    await page.waitForSelector('.pick.mode', { timeout: 5000 });
    await page.click('.pick.mode:has-text("MUTUAL AID")');
    await bookOn(page);
    await page.waitForSelector('#status .hookrow', { timeout: 5000 });
    const board = await page.evaluate(() => {
      const rows = [...document.querySelectorAll('#status .hookrow .tag')];
      const surnames = rows.map((t) => (t.firstChild ? t.firstChild.textContent : t.textContent)
        .replace(/^(PC|WPC|DS|S\.C\.)\s+/, '').trim().toUpperCase());
      const wpc = rows.filter((t) => (t.firstChild ? t.firstChild.textContent : '').indexOf('WPC') === 0).length;
      return { surnames, wpc };
    });
    const allowed = new Set(board.surnames);
    if (board.wpc === 0) allowed.add('HARTLE'); // unfillable → keeps its written self
    // The whole page, not two panels of it. An unrecast officer in the Yard's
    // memorandum, the occurrence book or an overnight slip is the same bug
    // this scan was built for, and all three were outside it. The crew rail
    // is cut out because it is the one surface that legitimately prints
    // tonight's names, which is what the scan measures everything against.
    const scan = async (where) => {
      const text = await page.evaluate(() => {
        const doc = document.body.cloneNode(true);
        doc.querySelectorAll('.hookrow').forEach((n) => n.remove());
        return doc.textContent;
      });
      let m; const re = new RegExp(canonRe.source, 'gi');
      while ((m = re.exec(text))) {
        if (!allowed.has(m[1].toUpperCase())) {
          throw new Error(`phantom name "${m[1]}" on the desk (${where}); board = [${[...allowed].join(', ')}]`);
        }
      }
    };
    let steps = 0;
    while (steps++ < 200) {
      // scan BEFORE the break: the memorandum only exists on the ending
      // screen, and breaking first meant it was never once looked at
      await scan(`phantom shift ${shift} step ${steps}`);
      if (await page.$('button:has-text("WORK ANOTHER SHIFT")')) break;
      const cont = await page.$('.continue button');
      if (cont) { await cont.click(); continue; }
      const ch = await page.$('.chanceit');
      if (ch) { await ch.click(); continue; }
      const key = await page.$('#txkey:not([disabled])');
      if (key && !(await page.$('.continue button'))) { await key.click(); await page.waitForSelector('.continue button', { timeout: 15000 }).catch(() => {}); continue; }
      const choice = await page.$('#card:not(.out) .choices button:not([disabled])');
      if (choice) { await choice.click(); continue; }
      await page.waitForTimeout(40);
    }
  }
  console.log('phantom scan: no unrecast canonical name reached card or log across 3 full-strength shifts.');

  if (errors.length) {
    console.error('CONSOLE/PAGE ERRORS:');
    errors.forEach((e) => console.error('  ' + e));
    process.exit(1);
  }
  console.log('SMOKE OK: 5 full shifts + TX abort + phantom scan played through the real UI, zero console errors.');
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
