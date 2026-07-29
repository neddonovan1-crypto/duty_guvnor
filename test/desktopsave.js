/* Desktop-save integration test. The real desktop wrapper is Electron, which
 * won't run headless here — but the contract that matters lives in src/ui.js:
 * when window.dgStore is present the game must save THROUGH it and never touch
 * the localStorage fallback, and on first desktop run it must adopt a career
 * begun in the browser. We stand in a synchronous, reload-surviving dgStore
 * (backed by prefixed localStorage keys, so its writes are distinguishable
 * from the fallback's) and drive the real UI.
 *
 * Run: NODE_PATH=/opt/node22/lib/node_modules node test/desktopsave.js */
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
const assert = require('assert');

const GAME = 'file://' + path.resolve(__dirname, '..', 'index.html');

// A dgStore that behaves like the desktop bridge — synchronous get/set that
// survives a reload, one generation kept in a .bak, and the same recover()
// contract as desktop/store.js — but stores under a prefix, so we can tell
// its writes apart from the game's own localStorage fallback (bare keys).
const INSTALL_DGSTORE = () => {
  const PFX = '__dgfile__';
  window.dgStore = {
    get: function (k) {
      var v = window.localStorage.getItem(PFX + String(k));
      return v === null ? null : v;
    },
    set: function (k, v) {
      var key = PFX + String(k), prev = window.localStorage.getItem(key);
      if (prev !== null) window.localStorage.setItem(key + '.bak', prev);
      window.localStorage.setItem(key, String(v) === '' ? 'null' : String(v));
    },
    recover: function (k) {
      var key = PFX + String(k), bad = window.localStorage.getItem(key);
      if (bad !== null) window.localStorage.setItem(key + '.corrupt', bad);
      var prev = window.localStorage.getItem(key + '.bak');
      if (prev === null) { window.localStorage.removeItem(key); return null; }
      window.localStorage.setItem(key, prev);
      return prev;
    },
  };
};

async function playAShift(page) {
  // clicks race the render that rebuilds #card; a detach just means try again
  const tap = async (sel) => {
    const h = await page.$(sel);
    if (!h) return false;
    try { await h.click({ timeout: 1500 }); return true; } catch (e) { return false; }
  };
  for (let i = 0; i < 500; i++) {
    if (await page.$('button:has-text("WORK ANOTHER SHIFT")')) return true;
    if (await tap('.paper.opener .choices button')) continue;
    if (await tap('.continue button')) continue;
    if (await tap('.choices button:not([disabled])')) {
      // a staged desk gamble shows the backing panel; CHANCE IT commits it
      if (await tap('.chanceit')) continue;
      // a dispatch choice arms the set: key it and let the message finish
      if (await page.$('#txkey:not([disabled])') && !(await page.$('.continue button'))) {
        if (await tap('#txkey')) {
          await page.waitForSelector('.continue button', { timeout: 15000 }).catch(() => {});
        }
      }
      continue;
    }
    await page.waitForTimeout(80);
  }
  return false;
}

(async () => {
  const browser = await chromium.launch();

  // ---- Test A: the game saves through dgStore, not the fallback ----
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(INSTALL_DGSTORE);
    await page.goto(GAME);
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await bookOn(page);
    const reachedEnd = await playAShift(page);
    assert.ok(reachedEnd, 'shift never reached an ending');

    const snap = await page.evaluate(() => {
      const out = { file: {}, bare: {} };
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i);
        if (k.indexOf('__dgfile__') === 0) out.file[k.slice(10)] = localStorage.getItem(k);
        else out.bare[k] = localStorage.getItem(k);
      }
      return out;
    });
    assert.ok(snap.file.dg_career, 'career must be written through dgStore');
    assert.ok(snap.file.dg_hist, 'hist must be written through dgStore');
    assert.ok(!('dg_career' in snap.bare), 'fallback localStorage must NOT hold the career');
    assert.ok(!('dg_hist' in snap.bare), 'fallback localStorage must NOT hold the hist');
    const nights1 = JSON.parse(snap.file.dg_career).nights;
    assert.ok(nights1 >= 1, 'career should record at least one night, got ' + nights1);

    // reload and play again: nights must climb, proving read+write through
    // dgStore round-trips across a restart
    await page.reload();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await bookOn(page);
    // checked, not assumed: playAShift returns false when it runs out of
    // steps, and swallowing that turned a shift which never ended into the
    // confusing report that the career had not moved
    assert.ok(await playAShift(page), 'the second shift never reached an ending');
    const nights2 = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('__dgfile__dg_career')).nights);
    assert.ok(nights2 === nights1 + 1,
      'career must accumulate across reload: ' + nights1 + ' -> ' + nights2);
    assert.strictEqual(errors.length, 0, 'console errors: ' + errors.join(' | '));
    await ctx.close();
    console.log('  A: saves go through dgStore, skip the fallback, and survive reload (' +
      nights1 + ' -> ' + nights2 + ' nights).');
  }

  // ---- Test B: first desktop run adopts a browser-era career ----
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    // load once WITHOUT dgStore — the web build — and seed a career
    await page.goto(GAME);
    await page.evaluate(() => {
      localStorage.setItem('dg_career', JSON.stringify({ nights: 7, survived: 3, streak: 2 }));
      localStorage.setItem('dg_mode', 'full');
      localStorage.setItem('dg_ach', JSON.stringify({ ACH_FIRST_WATCH: true }));
      localStorage.setItem('dg_shift', JSON.stringify({ v: 1, nightOff: 0, snap: { turn: 4 } }));
    });
    // now the desktop shell arrives: dgStore present on the next load
    await page.addInitScript(INSTALL_DGSTORE);
    await page.reload();
    // the adapter's migration runs at module load; read what it adopted
    const migrated = await page.evaluate(() => ({
      career: localStorage.getItem('__dgfile__dg_career'),
      mode: localStorage.getItem('__dgfile__dg_mode'),
      flag: localStorage.getItem('__dgfile__dg_migrated'),
      ach: localStorage.getItem('__dgfile__dg_ach'),
      shift: localStorage.getItem('__dgfile__dg_shift'),
    }));
    assert.ok(migrated.career, 'browser career must be adopted into dgStore');
    assert.strictEqual(JSON.parse(migrated.career).nights, 7, 'adopted career keeps its nights');
    assert.strictEqual(migrated.mode, 'full', 'adopted the chosen strength too');
    assert.strictEqual(migrated.flag, '1', 'migration marks itself done so it runs once');
    assert.ok(migrated.ach, 'feats earned in the browser must be adopted, not re-earned');
    assert.ok(migrated.shift, 'a night left suspended in the browser must come across too');
    await ctx.close();
    console.log('  B: first desktop run adopts a browser-era career (7 nights, MUTUAL AID) once.');
  }

  // ---- Test C: a damaged career is recovered, never written over ----
  // The power-cut case. A save that will not parse must not read as "no
  // career": the game asks the store for the generation before it, and the
  // wreck is kept aside where the next end-of-shift cannot land on it.
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.addInitScript(INSTALL_DGSTORE);
    await page.goto(GAME);
    const GOOD = JSON.stringify({
      nights: 9, survived: 5, deaths: { streets: 3, brass: 1, relief: 0 },
      streak: 2, bestStreak: 4, best: { title: 'A GRUDGING NOD', avg: 58 }, sagas: [],
    });
    await page.evaluate((good) => {
      localStorage.setItem('__dgfile__dg_career.bak', good);
      localStorage.setItem('__dgfile__dg_career', '{"nights":9,"survi'); // torn mid-write
    }, GOOD);
    await page.reload();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForSelector('.record', { timeout: 5000 });

    const shown = await page.textContent('.record');
    assert.ok(/NIGHTS 9\b/.test(shown), 'the recovered career must be the one on the parade sheet: ' + shown);
    const after = await page.evaluate(() => ({
      live: localStorage.getItem('__dgfile__dg_career'),
      wreck: localStorage.getItem('__dgfile__dg_career.corrupt'),
    }));
    assert.strictEqual(after.live, GOOD, 'the previous generation must be promoted in place');
    assert.strictEqual(after.wreck, '{"nights":9,"survi', 'the damaged bytes must be kept, not dropped');

    // and the recovered career carries on accumulating, not restarting
    await bookOn(page);
    assert.ok(await playAShift(page), 'shift never reached an ending');
    const nights = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('__dgfile__dg_career')).nights);
    assert.strictEqual(nights, 10, 'the night must be added to the recovered career, got ' + nights);
    assert.strictEqual(errors.length, 0, 'console errors: ' + errors.join(' | '));
    await ctx.close();
    console.log('  C: a torn career save is recovered from the previous generation (9 -> 10 nights), ' +
      'the wreckage kept aside.');
  }

  // ---- Test D: a feat earned in play actually reaches the shell ----
  // The whole achievement system is guarded by two nested swallows — the
  // evaluator catches per-predicate, and src/ui.js catches around the lot so
  // a feat can never take the desk down. Which is right, and which also
  // means the entire thing can stop firing with every other test green. So
  // this plays a real night with the relay stubbed and watches it come out.
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.addInitScript(INSTALL_DGSTORE);
    await page.addInitScript(() => {
      window.__relayed = [];
      window.dgAchieve = { unlock: function (id) { window.__relayed.push(id); } };
      window.dgDesktop = true;
    });
    const errs = [];
    page.on('pageerror', (e) => errs.push(String(e)));
    await page.goto(GAME);
    // A career already one night old. Which night the shuffle deals decides
    // whether a guvnor lives to six, and a test that only proves the relay
    // works on a lucky deal proves nothing on an unlucky one. Standing this
    // up first makes the feat a certainty and leaves the thing actually
    // under test — evaluator to record to shell — the only variable.
    await page.evaluate(() => {
      localStorage.setItem('__dgfile__dg_career', JSON.stringify({
        nights: 1, survived: 1, streak: 1, bestStreak: 1,
        deaths: { streets: 0, brass: 0, relief: 0 }, best: null, sagas: [],
      }));
    });
    await page.reload();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await bookOn(page);
    assert.ok(await playAShift(page), 'the achievement night never reached an ending');
    const got = await page.evaluate(() => ({
      relayed: window.__relayed.slice(),
      recorded: Object.keys(JSON.parse(localStorage.getItem('__dgfile__dg_ach') || '{}')),
    }));
    assert.ok(got.recorded.length, 'a full night earned no feat at all — the evaluator is not running');
    assert.ok(got.recorded.indexOf('ACH_FIRST_WATCH') >= 0,
      'a night survived must earn ACH_FIRST_WATCH, got [' + got.recorded.join(', ') + ']');
    assert.ok(got.relayed.indexOf('ACH_FIRST_WATCH') >= 0,
      'the feat was recorded but never relayed to the shell — Steam would never hear of it');
    // and it must not keep firing: the shell would toast it on every render
    assert.strictEqual(got.relayed.filter((x) => x === 'ACH_FIRST_WATCH').length, 1,
      'the same feat was relayed more than once');
    assert.strictEqual(errs.length, 0, 'page errors: ' + errs.join(' | '));

    // A career from an older build, or one a hand has been in, can be missing
    // a field this build expects. saveCareer runs inside a catch that exists
    // so a save can never take the desk down — which also meant one missing
    // key stopped the record dead and said nothing, for the rest of that
    // player's career. It must survive and keep counting.
    await page.evaluate(() => {
      localStorage.setItem('__dgfile__dg_career', JSON.stringify({ nights: 5 }));
    });
    await page.reload();
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await bookOn(page);
    assert.ok(await playAShift(page), 'the night on a thin career never ended');
    const thin = await page.evaluate(() =>
      JSON.parse(localStorage.getItem('__dgfile__dg_career')));
    assert.strictEqual(thin.nights, 6,
      'a career missing its fields must still take the night, got ' + JSON.stringify(thin));
    assert.ok(thin.deaths && typeof thin.deaths === 'object', 'and must come back whole');
    await ctx.close();
    console.log('  D: a night\'s work earns feats and relays them to the shell (' +
      got.recorded.length + ' recorded, ' + got.relayed.length + ' relayed).');
  }

  await browser.close();
  console.log('DESKTOP SAVE OK: dgStore is the desktop back end, the fallback stays web-only, ' +
    'careers and feats migrate, feats reach the shell, and damage never wipes a record.');
})().catch((e) => { console.error(e); process.exit(1); });
