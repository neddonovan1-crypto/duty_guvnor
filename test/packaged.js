/* Does the packaged app actually start?
 *
 * Everything else tests the game as loose files served over file://. The
 * shipped thing is different in one way that has already broken this project
 * twice: it reads itself out of app.asar. The app id was fetched from a file
 * that does not exist inside the archive, and later the Steam library was
 * sealed inside it where the loader could not reach — both worked perfectly
 * in dev and were dead in every build a player could install.
 *
 * So this launches the REAL packaged executable through Playwright's Electron
 * driver, on the platform that built it, and proves the window opens and the
 * parade sheet renders. Steam is absent on a build runner, which is the point
 * of the relay failing quietly: its absence must not stop the desk opening.
 *
 * Usage: node test/packaged.js <path to executable or .app>
 *   Linux runners need a display: xvfb-run -a node test/packaged.js <exe>
 */
'use strict';
const { _electron: electron } = require('playwright');
const fs = require('fs');
const path = require('path');

const target = process.argv[2];
if (!target) { console.error('usage: node test/packaged.js <executable>'); process.exit(2); }
if (!fs.existsSync(target)) { console.error('no such executable: ' + target); process.exit(2); }

// a .app bundle is a directory; Playwright wants the binary inside it
function resolveExe(p) {
  if (!p.endsWith('.app')) return p;
  const macos = path.join(p, 'Contents', 'MacOS');
  const found = fs.readdirSync(macos)[0];
  return path.join(macos, found);
}

(async () => {
  const exe = resolveExe(target);
  const errors = [];
  const app = await electron.launch({ executablePath: exe, timeout: 90000 });

  const win = await app.firstWindow({ timeout: 60000 });

  // The store page and the README both say this game talks to nobody. That is
  // a claim about a paying customer's machine, so it is checked rather than
  // asserted: every request the window makes must be a local file. Fonts,
  // analytics, an errant CDN — anything with a scheme would show up here.
  const offSite = [];
  win.on('request', (r) => {
    const u = r.url();
    if (!/^(file|data|blob|devtools):/i.test(u)) offSite.push(r.method() + ' ' + u);
  });

  win.on('pageerror', (e) => errors.push('PAGEERROR: ' + String(e)));
  win.on('console', (m) => {
    const t = m.text();
    if (m.type() === 'error' && !/ERR_FILE_NOT_FOUND|avatars\/|fonts\.g/.test(t)) errors.push('CONSOLE: ' + t);
  });

  // the parade sheet is the first thing a player sees; if the asar is wrong
  // this is where it fails, with a blank window and a module error
  await win.waitForSelector('h1:has-text("DUTY GUVNOR")', { timeout: 45000 });

  // the desktop build must show the campaign — proves the preload bridge ran,
  // which is the same bridge the saves and the achievements travel over
  await win.waitForSelector('.week-block', { timeout: 15000 });

  // Where the saves actually land, asked of the main process rather than
  // assumed. Steam Auto-Cloud is configured on the partner site by absolute
  // root + subdirectory, and nothing in this repo can enforce that mapping —
  // so if Electron's user-data directory ever moved (a productName edit is
  // all it would take) the cloud would go on syncing an empty folder and no
  // error would appear anywhere. A player would simply find their career
  // missing on the second machine, which is how Valve found it.
  const fail = (m) => { errors.push(m); };

  // platform: the Auto-Cloud root as named on the partner site, the
  // subdirectory entered beside it, and a marker that proves we are under
  // that root and not a neighbouring one (Local instead of Roaming would
  // otherwise pass, and sync nothing).
  const CLOUD = {
    win32: { root: 'WinAppDataRoaming', sub: 'Duty Guvnor/saves', marker: '/Roaming/' },
    linux: { root: 'LinuxHome', sub: '.config/Duty Guvnor/saves', marker: '/.config/' },
    darwin: { root: 'MacAppSupport', sub: 'Duty Guvnor/saves', marker: '/Application Support/' },
  };
  const paths = await app.evaluate(async ({ app: a }) => ({
    name: a.getName(),
    userData: a.getPath('userData'),
    platform: process.platform,
  }));
  // write through the real bridge, then look for it on disk
  await win.evaluate(() => window.dgStore.set('dg_career', JSON.stringify({ nights: 1, probe: true })));
  await win.waitForTimeout(500);

  const savesDir = path.join(paths.userData, 'saves');
  const want = CLOUD[paths.platform];
  if (paths.name !== 'Duty Guvnor') {
    fail('the app calls itself "' + paths.name + '" — the user-data directory, and so the ' +
      'Auto-Cloud mapping, moves with this name');
  }
  if (!fs.existsSync(savesDir)) {
    fail('nothing was written to ' + savesDir + ' — Steam Cloud would sync an empty folder');
  } else {
    const files = fs.readdirSync(savesDir);
    // the partner-site pattern is *.json: anything a career depends on has to
    // match it, or it stays on the one machine
    if (!files.some((f) => /^dg_[a-z_]+\.json$/.test(f))) {
      fail('no dg_*.json save in ' + savesDir + ' (found: ' + files.join(', ') +
        ') — the Auto-Cloud *.json pattern would match nothing');
    }
    const here = savesDir.replace(/\\/g, '/');
    if (want) {
      if (here.slice(-want.sub.length) !== want.sub) {
        fail('saves are in ' + here + ', but the partner site is told to sync ' +
          want.root + ' + ' + want.sub);
      }
      if (here.indexOf(want.marker) < 0) {
        fail('saves are in ' + here + ', which is not under the ' + want.root +
          ' root the partner site syncs (expected ' + want.marker + ' in the path)');
      }
    } else {
      fail('no Auto-Cloud mapping is recorded for ' + paths.platform);
    }
    console.log('saves: ' + here + '  (Auto-Cloud: ' + want.root + ' + ' + want.sub + ')');
  }

  const seen = await win.evaluate(() => ({
    week: !!document.querySelector('.week-block'),
    store: typeof window.dgStore === 'object' && typeof window.dgStore.get === 'function',
    recover: typeof (window.dgStore || {}).recover === 'function',
    achieve: typeof (window.dgAchieve || {}).unlock === 'function',
    desktop: window.dgDesktop === true,
    daily: document.body.textContent.indexOf('THE DAILY') >= 0,
  }));

  if (!seen.week) fail('the campaign is missing from the packaged parade sheet');
  if (!seen.store) fail('window.dgStore is absent — the save bridge did not load');
  if (!seen.recover) fail('dgStore.recover is absent — this is an old preload');
  if (!seen.achieve) fail('window.dgAchieve is absent — achievements cannot be relayed');
  if (!seen.desktop) fail('window.dgDesktop is not set — the desktop gate is shut');
  if (seen.daily) fail('the daily is retired and must not appear');

  if (offSite.length) {
    fail('the window reached the network: ' + offSite.slice(0, 5).join(' | '));
  }

  const shot = path.join(path.dirname(target), '..', 'packaged-start.png');
  await win.screenshot({ path: shot }).catch(() => {});

  await app.close();

  if (errors.length) {
    console.error('PACKAGED APP FAILED:');
    errors.forEach((e) => console.error('  ' + e));
    process.exit(1);
  }
  console.log('PACKAGED OK: the built app starts, the parade sheet renders, the save and ' +
    'achievement bridges are both live, and the saves land where Steam Cloud is told to look.');
})().catch((e) => {
  console.error('PACKAGED APP DID NOT START: ' + String(e).slice(0, 500));
  process.exit(1);
});
