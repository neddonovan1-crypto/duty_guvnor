/* THE WEEK through the real UI (issue #4). Two Chromium contexts:
 *  - the web, where the campaign must be entirely absent (no dgDesktop flag);
 *  - the desktop (window.dgDesktop injected, as the Electron preload does),
 *    where a week is begun, its nights are played through the actual desk,
 *    a week night is suspended and resumed mid-shift, and the run ends at
 *    THE WEEK IN REVIEW letter — by death or by Thursday, whichever comes.
 * Also proves the books are kept apart: week nights write dg_week and
 * dg_career, and never dg_hist. */
'use strict';
const { chromium } = require('playwright');
const path = require('path');

const INDEX = 'file://' + path.resolve(process.argv[2] || path.join(__dirname, '..', 'index.html'));
const DATES = ['FRI 14 NOV', 'SAT 15 NOV', 'SUN 16 NOV', 'MON 17 NOV', 'TUE 18 NOV', 'WED 19 NOV', 'THU 20 NOV'];

(async () => {
  const browser = await chromium.launch();
  const errors = [];
  const benign = (t) => t.includes('ERR_FILE_NOT_FOUND') || t.includes('avatars/') ||
    t.includes('fonts.g') || t.includes('ERR_CONNECTION_RESET') || t.includes('ERR_NAME_NOT_RESOLVED');
  const wirePage = (page) => {
    page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(String(e)));
  };

  // mid-render detachment is a fact of life: clicks retry through the loop
  const tryClick = async (el) => { try { await el.click(); return true; } catch (e) { return false; } };

  // Play the live night to its ending letter through the real desk. Every
  // state is handled at the top of the loop — a missed click never strands
  // the night (an armed set, a staged gamble) with nothing left to press.
  async function playNight(page) {
    let steps = 0;
    while (steps++ < 400) {
      if (await page.$('.memo-rail')) return;
      const cont = await page.$('.continue button');
      if (cont) { await tryClick(cont); continue; }
      const chance = await page.$('.chanceit');
      if (chance) { await tryClick(chance); continue; }
      // armed only: while transmitting the same key reads BELAY, and
      // pressing it would abort the message instead of passing it
      const key = await page.$('#txkey.armed');
      if (key) {
        if (await tryClick(key)) {
          await page.waitForSelector('.continue button', { timeout: 15000 }).catch(() => {});
        }
        continue;
      }
      const choice = await page.$('.choices button:not([disabled])');
      if (choice) { await tryClick(choice); continue; }
      await page.waitForTimeout(40);
    }
    throw new Error('night did not reach an ending in 400 UI steps');
  }

  // ---- the web: THE WEEK must not exist ----
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    wirePage(page);
    await page.goto(INDEX);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForSelector('h1:has-text("DUTY GUVNOR")', { timeout: 5000 });
    if (await page.$('.week-block')) throw new Error('the web parade sheet shows THE WEEK');
    const body = await page.textContent('body');
    if (body.includes('BEGIN THE WEEK')) throw new Error('BEGIN THE WEEK reached the web');
    if (body.includes('A SINGLE NIGHT')) throw new Error('the single-night head has no place on the web');
    if (body.includes('THE DAILY')) throw new Error('the daily is a desktop matter now and reached the web');
    console.log('web: THE WEEK and the daily absent from the parade sheet, as gated.');
    await ctx.close();
  }

  // ---- the desktop: begin the week, work it, read the letter ----
  const ctx = await browser.newContext();
  const page = await ctx.newPage();
  wirePage(page);
  await page.addInitScript(() => { window.dgDesktop = true; });
  await page.goto(INDEX);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForSelector('.week-block', { timeout: 5000 });
  const beginBtn = await page.$('button:has-text("BEGIN THE WEEK — FRIDAY 14 NOVEMBER")');
  if (!beginBtn) throw new Error('the fresh sheet must offer BEGIN THE WEEK — FRIDAY 14 NOVEMBER');
  if (!(await page.$('.single-head'))) throw new Error('the desktop sheet must label A SINGLE NIGHT');
  if (!(await page.$('button:has-text("THE DAILY")'))) {
    throw new Error('the desktop sheet must keep the daily');
  }
  await beginBtn.click();

  let testedSuspend = false;
  for (let night = 1; night <= 7; night++) {
    // the header reads the week's own calendar
    await page.waitForSelector('#status', { timeout: 5000 });
    const date = await page.textContent('header .date');
    if (!date.includes(DATES[night - 1])) {
      throw new Error('night ' + night + ' header reads "' + date + '", wanted ' + DATES[night - 1]);
    }
    // once, on the first night (always reached): put the night down and
    // pick it back up as a week night
    if (night === 1 && !testedSuspend) {
      const sus = await page.$('.suspend-link');
      if (!sus) throw new Error('a week night must be suspendable');
      await sus.click();
      const env = await page.evaluate(() => JSON.parse(localStorage.getItem('dg_shift') || 'null'));
      if (!env || env.week !== true) throw new Error('a suspended week night must carry the week flag');
      const note = await page.textContent('.resume-note');
      if (!note.includes('THE WEEK')) throw new Error('the resume note must name THE WEEK: "' + note + '"');
      await page.click('button:has-text("RESUME THE NIGHT")');
      await page.waitForSelector('#status', { timeout: 5000 });
      testedSuspend = true;
      console.log('suspend/resume: week night went down and came back as one.');
    }
    await playNight(page);

    // the books stay apart: the week writes its own envelope, never dg_hist
    const books = await page.evaluate(() => ({
      hist: localStorage.getItem('dg_hist'),
      week: JSON.parse(localStorage.getItem('dg_week') || 'null'),
      career: JSON.parse(localStorage.getItem('dg_career') || 'null'),
    }));
    if (books.hist) throw new Error('a week night left tracks on the single-night book');
    if (!books.week || books.week.results.length !== night) {
      throw new Error('night ' + night + ': envelope holds ' + (books.week ? books.week.results.length : 0) + ' rows');
    }
    if (!books.career || books.career.nights !== night) {
      throw new Error('the service record must take week nights like any other');
    }

    const cta = await page.textContent('.memo-rail .block-btn');
    if (cta.includes('THE WEEK IN REVIEW')) {
      console.log('night ' + night + ': the week ended — ' + (books.week.diedNight ? 'died' : 'worked through') + '.');
      break;
    }
    const wantNext = 'PARADE FOR NIGHT ' + (night + 1);
    if (!cta.includes(wantNext)) throw new Error('rail reads "' + cta + '", wanted "' + wantNext + '"');
    console.log('night ' + night + ': survived, rail marches on to night ' + (night + 1) + '.');
    await page.click('.memo-rail .block-btn');
  }

  // ---- the letter ----
  await page.click('.memo-rail .block-btn:has-text("THE WEEK IN REVIEW")');
  await page.waitForSelector('.memotitle:has-text("THE WEEK IN REVIEW")', { timeout: 5000 });
  const stamp = (await page.textContent('.stamp-verdict')).trim();
  const TIERS = ['CONFIRMED IN RANK', 'NOTED WITH APPROVAL', 'NOTED WITH INTEREST', 'RETAINED — ON REFLECTION', 'DISMISSED THE FORCE'];
  if (!TIERS.includes(stamp)) throw new Error('unexpected verdict stamp: "' + stamp + '"');
  const rows = await page.$$eval('.wk-row', (r) => r.length);
  if (rows !== 7) throw new Error('the letter must account for all seven nights, got ' + rows + ' rows');
  if (!(await page.$('button:has-text("BEGIN ANOTHER WEEK")'))) throw new Error('the letter must offer another week');
  console.log('letter: "' + stamp + '", all seven nights accounted for.');

  // back on the sheet, the finished week still offers its letter
  await page.click('button:has-text("BACK TO THE PARADE SHEET")');
  await page.waitForSelector('.week-block', { timeout: 5000 });
  const wkBtn = await page.textContent('.week-block .week-btn');
  if (!wkBtn.includes('THE WEEK IN REVIEW')) throw new Error('a finished week must keep its letter on the sheet');

  await ctx.close();
  await browser.close();
  if (errors.length) { console.error('CONSOLE ERRORS:\n' + errors.join('\n')); process.exit(1); }
  console.log('WEEK UI OK: web gated out, desktop worked a week through the real desk to the letter.');
})().catch((e) => { console.error(e); process.exit(1); });
