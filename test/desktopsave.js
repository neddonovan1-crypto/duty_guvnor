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
// survives a reload — but stores under a prefix, so we can tell its writes
// apart from the game's own localStorage fallback (which uses bare keys).
const INSTALL_DGSTORE = () => {
  const PFX = '__dgfile__';
  window.dgStore = {
    get: function (k) {
      var v = window.localStorage.getItem(PFX + String(k));
      return v === null ? null : v;
    },
    set: function (k, v) { window.localStorage.setItem(PFX + String(k), String(v)); },
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
    await playAShift(page);
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
    });
    // now the desktop shell arrives: dgStore present on the next load
    await page.addInitScript(INSTALL_DGSTORE);
    await page.reload();
    // the adapter's migration runs at module load; read what it adopted
    const migrated = await page.evaluate(() => ({
      career: localStorage.getItem('__dgfile__dg_career'),
      mode: localStorage.getItem('__dgfile__dg_mode'),
      flag: localStorage.getItem('__dgfile__dg_migrated'),
    }));
    assert.ok(migrated.career, 'browser career must be adopted into dgStore');
    assert.strictEqual(JSON.parse(migrated.career).nights, 7, 'adopted career keeps its nights');
    assert.strictEqual(migrated.mode, 'full', 'adopted the chosen strength too');
    assert.strictEqual(migrated.flag, '1', 'migration marks itself done so it runs once');
    await ctx.close();
    console.log('  B: first desktop run adopts a browser-era career (7 nights, MUTUAL AID) once.');
  }

  await browser.close();
  console.log('DESKTOP SAVE OK: dgStore is the desktop back end, the fallback stays web-only, careers migrate.');
})();
