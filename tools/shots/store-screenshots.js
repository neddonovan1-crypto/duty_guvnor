/* Steam store screenshots — gameplay only.
 *
 * Valve rejected the old set's first image for being a menu, and they were
 * right: it was the parade sheet, title and all. Nothing here is a menu, a
 * title card or a loading screen. Every frame is the desk mid-shift.
 *
 * Each shot plays a real night through the real UI first, so the board, the
 * station log, the cells and the crew rail are all genuinely lived-in. Only
 * then is the wanted incident put on the desk, by patching the game's own
 * suspended-night envelope — the same door test/sweep.js uses. The state is
 * one the game could deal on any night; we are choosing WHICH, not inventing.
 *
 * Run: node build.js && NODE_PATH=/opt/node22/lib/node_modules node tools/shots/store-screenshots.js
 * ONLY=4 reshoots one frame; OUT=<dir> puts them somewhere else.
 *
 * Two traps worth knowing, both of which produced a useless frame first time:
 * reduced motion does NOT skip the teleprinter, so the card must be settled
 * with SKIP before shooting or it is caught half-typed with no choices; and a
 * gamble that also dispatches units commits on the radio and never opens the
 * CHANCE IT panel, so only a pure desk gamble will do for that shot.
 */
'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const OUT = process.env.OUT || (__dirname + '/out');
if (!process.env.ONLY) fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });
const GAME = 'file://' + path.resolve(__dirname, '..', '..', 'index.html');
// The desktop shell zooms the 1280x800 desk to fill the window: at 1920x1080
// that is min(1920/1280, 1080/800) = 1.35. Shooting a 1920-wide viewport flat
// leaves the desk as a small island in a lot of dark, which is not what a
// customer sees. Laying out at 1422x800 and rendering at 1.35 gives a
// 1920x1080 image of exactly the game they will run.
const ZOOM = 1.35;
const VP = { width: Math.round(1920 / ZOOM), height: Math.round(1080 / ZOOM) };

const CAREER = {
  nights: 11, survived: 6, deaths: { streets: 3, brass: 1, relief: 1 }, streak: 2, bestStreak: 3,
  best: { title: 'A GRUDGING NOD', avg: 58 }, sagas: [],
  sagaGrades: { horse: 'good', tratt: 'mixed', docks: 'good', mp: 'unresolved', ira: 'mixed' },
};

(async () => {
  const browser = await chromium.launch();

  const tap = async (p, sel) => {
    const h = await p.$(sel); if (!h) return false;
    try { await h.click({ timeout: 1200 }); return true; } catch (e) { return false; }
  };

  // Book on and work the night for a few turns, so the log has traffic, some
  // cells are filled and some officers are out. This is ordinary play.
  async function workANight(p, turns) {
    await tap(p, 'button:has-text("BOOK ON DUTY")');
    await p.waitForSelector('.start-btn', { timeout: 8000 });
    await tap(p, '.start-btn');
    await p.waitForSelector('#status', { timeout: 8000 });
    for (let i = 0; i < turns * 4; i++) {
      if (await p.$('button:has-text("WORK ANOTHER SHIFT")')) break;
      const clock = await p.$eval('#status', () => 0).catch(() => 0);
      if (clock === null) break;
      if (await tap(p, '.paper.opener .choices button')) { await p.waitForTimeout(80); continue; }
      if (await tap(p, '.continue button')) { await p.waitForTimeout(80); continue; }
      // prefer a plain desk choice: keeps the run moving without the radio
      const cs = await p.$$('.choices button:not([disabled])');
      if (cs.length) {
        await cs[cs.length - 1].click({ timeout: 1500 }).catch(() => {});
        await tap(p, '.chanceit');
        const key = await p.$('#txkey:not([disabled])');
        if (key && !(await p.$('.continue button'))) {
          await key.click({ timeout: 1500 }).catch(() => {});
          await p.waitForSelector('.continue button', { timeout: 15000 }).catch(() => {});
        }
        await p.waitForTimeout(80);
        continue;
      }
      await tap(p, '.paper,.rt-panel');
      await p.waitForTimeout(60);
    }
  }

  // Put a chosen incident on the desk of the night just worked, keeping the
  // board, the log and the clock that the play produced.
  async function stage(p, spec) {
    await tap(p, '.suspend-link');
    await p.waitForSelector('.resume-btn', { timeout: 8000 });
    await p.evaluate((s) => {
      const env = JSON.parse(localStorage.getItem('dg_shift'));
      let card = null, storyId = null, kind = 'incident';
      if (s.saga) {
        const st = DATA.storylines.find((x) => x.id === s.saga);
        card = st.stages.find((x) => x.id === s.stageId);
        storyId = st.id; kind = 'story';
        env.snap.marquee = st.id;
      } else {
        card = DATA.cards.find((x) => x.id === s.card);
      }
      if (card.window) {
        env.snap.turn = Math.max(card.window[0], Math.min(env.snap.turn, card.window[1]));
      }
      env.snap.current = { kind: kind, card: card, storyId: storyId };
      env.snap.phase = 'choose';
      localStorage.setItem('dg_shift', JSON.stringify(env));
    }, spec);
    await tap(p, '.resume-btn');
    await p.waitForSelector('#card', { timeout: 8000 });
    // The teleprinter hammers the card in a character at a time, and reduced
    // motion does NOT skip it — so a screenshot taken now catches a half-typed
    // sentence and no choices at all, which is what a store page least wants.
    // Press SKIP the way a player would, then wait for the orders to land.
    await tap(p, '.skipbtn');
    await p.waitForSelector('.choices button', { timeout: 15000 }).catch(() => {});
    await p.waitForTimeout(500);
  }

  async function freshPage(reduce) {
    const ctx = await browser.newContext({ viewport: VP, deviceScaleFactor: ZOOM });
    const p = await ctx.newPage();
    await p.addInitScript(() => { window.dgDesktop = true; });
    await p.goto(GAME);
    await p.evaluate((c) => {
      localStorage.clear();
      localStorage.setItem('dg_career', JSON.stringify(c));
    }, CAREER);
    await p.reload();
    await p.emulateMedia({ reducedMotion: reduce ? 'reduce' : 'no-preference' });
    return { ctx, p };
  }

  const ONLY = process.env.ONLY || '';
  const shots = [
    { file: '1-crane.png', spec: { card: 'grime_crane_protest' }, turns: 7 },
    { file: '2-saga-earl.png', spec: { saga: 'earl', stageId: 'earl_house' }, turns: 6 },
    { file: '3-wages-van.png', spec: { card: 'gang_wages_van' }, turns: 5 },
  ].filter((s) => !ONLY || ONLY.indexOf(s.file[0]) >= 0);

  for (const s of shots) {
    const { ctx, p } = await freshPage(true);
    await workANight(p, s.turns);
    if (await p.$('button:has-text("WORK ANOTHER SHIFT")')) {
      console.log('  (' + s.file + ': night ended early, reshooting shorter)');
      await ctx.close();
      const again = await freshPage(true);
      await workANight(again.p, 3);
      await stage(again.p, s.spec);
      await again.p.screenshot({ path: OUT + '/' + s.file });
      await again.ctx.close();
      console.log('shot ' + s.file);
      continue;
    }
    await stage(p, s.spec);
    await p.screenshot({ path: OUT + '/' + s.file });
    await ctx.close();
    console.log('shot ' + s.file);
  }

  // 4) The gamble: a risk choice staged, odds and backing on the desk
  if (!ONLY || ONLY.indexOf('4') >= 0) {
    const { ctx, p } = await freshPage(true);
    await workANight(p, 6);
    if (!(await p.$('button:has-text("WORK ANOTHER SHIFT")'))) {
      // A DESK gamble, not a dispatch one: a risk choice that also sends units
      // commits on the radio and never opens this panel at all. Short card, so
      // CHANCE IT button both sit inside the frame rather than off the bottom
      await stage(p, { card: 'dawn_window_cleaner' });
      const btns = await p.$$('.choices button:not([disabled])');
      for (const b of btns) {
        if (await b.$('.req-odds')) { await b.click({ timeout: 2000 }).catch(() => {}); break; }
      }
      await p.waitForTimeout(600);
      await p.screenshot({ path: OUT + '/4-gamble.png' });
      console.log('shot 4-gamble.png  (chanceit panel: ' + !!(await p.$('.chanceit')) + ')');
    }
    await ctx.close();
  }

  // 5) The R/T: a dispatch chosen, the set awake and armed to transmit
  if (!ONLY || ONLY.indexOf('5') >= 0) {
    const { ctx, p } = await freshPage(true);
    await workANight(p, 6);
    if (!(await p.$('button:has-text("WORK ANOTHER SHIFT")'))) {
      await stage(p, { card: 'ordinary_warehouse_alarm' });
      const btns = await p.$$('.choices button:not([disabled])');
      for (const b of btns) {
        const t = await b.textContent();
        if (t && t.indexOf('VIA R/T') >= 0) { await b.click({ timeout: 2000 }).catch(() => {}); break; }
      }
      await p.waitForTimeout(500);
      await p.screenshot({ path: OUT + '/5-radio.png' });
      console.log('shot 5-radio.png  (set armed: ' + !!(await p.$('#txkey:not([disabled])')) + ')');
    }
    await ctx.close();
  }

  await browser.close();
  console.log('\nwritten to ' + OUT);
})().catch((e) => { console.error(e); process.exit(1); });
