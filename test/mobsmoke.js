/* Hard mobile smoke: 390x820, full shifts through the pocket-book UI.
 * Fails on any console error, any horizontal overflow at any step, content
 * clipped inside a surface, a choice the thumb cannot reach, a shift that
 * doesn't terminate, or a missing pocket-book surface (dock ticker, radio
 * sheet, notice strip, Division row, occurrence book).
 *
 * Page overflow on its own is not enough and was actively misleading — the
 * same lesson test/weekui.js learned about the muster sheet. Clip a
 * container and its contents vanish INSIDE it, so the page still measures
 * as fitting perfectly. Capping .choices at 30px makes every option but the
 * first untappable, which is an unplayable game, and the old version of this
 * file passed it without a murmur. So the surfaces are measured against
 * their own contents, and the choices are hit-tested where a thumb lands. */
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
    await checkClipped(where);
  }

  // The surfaces that hold text a player has to read. A few of these scroll
  // on purpose, so they are exempt by name rather than by guesswork.
  const SURFACES = ['#card', '.choices', '.paper', '#radio', '.ledger', '.board', '.notice-strip', '#division'];
  async function checkClipped(where) {
    const clipped = await page.evaluate((sel) => {
      const out = [];
      sel.forEach((q) => {
        document.querySelectorAll(q).forEach((el) => {
          const st = getComputedStyle(el);
          if (st.display === 'none' || st.overflow === 'auto' || st.overflow === 'scroll' ||
              st.overflowY === 'auto' || st.overflowY === 'scroll') return;
          const dy = el.scrollHeight - el.clientHeight;
          const dx = el.scrollWidth - el.clientWidth;
          // 4px, not 0: #card's border rounds to a steady 2px of phantom
          // overflow on every card in the game. Anything genuinely clipped
          // loses at least a line of type, which is well over this.
          if (dy > 4 || dx > 4) out.push(q + ' hides ' + dy + 'px below and ' + dx + 'px right of its own box');
        });
      });
      return out;
    }, SURFACES);
    if (clipped.length) throw new Error(`content clipped at ${where}: ${clipped.join('; ')}`);
  }


  let sawRadioSheet = false, sawNotice = false, sawDivision = false, ranDivision = false;
  let sawChance = false, toggledLog = false;

  // Three shifts is the floor, not the ceiling. Each coverage target below
  // needs a particular thing to turn up on the deal — a desk gamble, a
  // Division row, a dispatch — and three short nights (a run of dismissals
  // ends them early) can miss one honestly. Keep working nights until every
  // target is met rather than failing on the luck of the shuffle; the
  // assertions after the loop are unchanged, so a target that is genuinely
  // unreachable still fails the run.
  const MIN_SHIFTS = 3, MAX_SHIFTS = 8;
  let shiftsWorked = 0;
  const covered = () => sawRadioSheet && sawNotice && sawDivision && ranDivision && toggledLog && sawChance;
  for (let shift = 1; shift <= MAX_SHIFTS; shift++) {
    await page.reload();
    await page.waitForSelector('h1:has-text("DUTY GUVNOR")', { timeout: 5000 });
    await checkOverflow(`shift ${shift} title`);
    await bookOn(page);

    let steps = 0;
    while (steps++ < 250) {
      if (await page.$('button:has-text("WORK ANOTHER SHIFT")')) break;
      await checkOverflow(`shift ${shift} step ${steps}`);
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
          // a spent unit greys its own button — that IS the record of it
          await page.waitForFunction(() => {
            const b = Array.prototype.slice.call(document.querySelectorAll('#division .call-btn'))
              .find((x) => x.textContent.includes('S.P.G.'));
            return b && b.disabled;
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
          // CHANCE IT only appears on a DESK gamble: a risk choice that is
          // also a dispatch commits on the radio instead, so hunting any
          // odds chip can starve the panel for a whole run.
          const deskGamble = await page.$$eval('.choices button:not([disabled])', (btns) =>
            btns.findIndex((b) => b.querySelector('.req-odds') && !b.textContent.includes('VIA R/T')));
          if (deskGamble >= 0) pick = cs[deskGamble];
        }
        if (pick === cs[cs.length - 1] && !sawRadioSheet) {
          const rt = await page.$('.choices button:not([disabled]):has-text("VIA R/T")');
          if (rt) pick = rt;
        }
        // A real click, not a synthetic event. Playwright scrolls it into
        // view, waits for it to stop moving and hit-tests it — the only step
        // here that asks whether a PLAYER could have pressed this. A
        // dispatched event fires the handler on a button clipped to nothing,
        // hidden, or buried under the dock ticker, and reports a clean run.
        await pick.click({ timeout: 5000 });
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
    if (steps > 250) throw new Error(`shift ${shift}: did not reach an ending in 250 UI steps`);
    const stamp = (await page.textContent('.stamp-verdict')).trim();
    await checkOverflow(`shift ${shift} ending`);
    // the occurrence book on the small screen
    await page.click('button:has-text("THE OCCURRENCE BOOK")');
    const rows = await page.$$eval('.ledger .ledger-row', (r) => r.length);
    if (!rows) throw new Error('occurrence book empty on mobile');
    await checkOverflow(`shift ${shift} occurrence book`);
    console.log(`shift ${shift}: "${stamp}" — book ${rows} entries, worst page overflow ${worstOverflow}px`);
    shiftsWorked = shift;
    if (shift >= MIN_SHIFTS && covered()) break;
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
  console.log(`MOBILE SMOKE OK: ${shiftsWorked} full shifts, every choice pressed for real, nothing clipped, zero console errors, zero overflow.`);
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
