/* Render every piece of content in the game, once, through the real UI.
 *
 * Why this exists: the browser tests play nights with Math.random, so which
 * cards they see is luck. Measured over twenty runs, a five-shift smoke
 * renders about a fifth of the deck, and a different fifth each time — so a
 * card whose prose or choice shape breaks the renderer has roughly four-in-
 * five odds of walking straight past CI and landing on a player. The
 * dealability check in test/simulate.js proves every card can be DEALT, but
 * it never draws a pixel: it stops at the engine boundary, which is exactly
 * where this class of bug starts.
 *
 * So: force each card onto the desk in turn and look at what comes out.
 * Alternating the guvnor down the list means every card is also seen through
 * one of the two pronoun tables. The route in is the suspended-night
 * envelope, which is the game's own front door for a state it did not roll
 * itself — no debug hooks in the shipped build.
 *
 * What this does NOT cover: result and failResult prose, which is only
 * rendered after a choice is committed. Those are checked at the engine level
 * by the localiseText contract in simulate.js, and in play by the phantom-name
 * scan in smoke.js.
 */
'use strict';
const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];
  const benign = (t) => t.includes('ERR_FILE_NOT_FOUND') || t.includes('avatars/') ||
    t.includes('fonts.g') || t.includes('ERR_CONNECTION_RESET') || t.includes('ERR_NAME_NOT_RESOLVED');
  page.on('console', (m) => { if (m.type() === 'error' && !benign(m.text())) errors.push(m.text()); });
  page.on('pageerror', (e) => errors.push(String(e)));

  await page.goto('file://' + path.resolve(process.argv[2] || path.join(__dirname, '..', 'index.html')));
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.waitForSelector('h1:has-text("DUTY GUVNOR")', { timeout: 8000 });

  // The full running order, read out of the shipped data rather than listed
  // here — a fifteenth saga or a new chance event joins the sweep by existing.
  const manifest = await page.evaluate(() => {
    const out = [];
    DATA.cards.forEach((c, i) => out.push({ kind: 'incident', at: i, id: c.id }));
    DATA.events.forEach((c, i) => out.push({ kind: 'event', at: i, id: c.id }));
    DATA.storylines.forEach((s, i) => s.stages.forEach((st, j) =>
      out.push({ kind: 'story', at: i, stage: j, story: s.id, id: s.id + '/' + st.id })));
    DATA.minisagas.forEach((s, i) => s.stages.forEach((st, j) =>
      out.push({ kind: 'mini', at: i, stage: j, story: s.id, id: s.id + '/' + st.id })));
    return out;
  });

  console.log('sweeping ' + manifest.length + ' pieces of content through the desk...');

  let done = 0;
  const faults = [];
  for (let n = 0; n < manifest.length; n++) {
    const item = manifest[n];
    const guvnor = n % 2 ? 'f' : 'm';

    // Park the wanted card on the hook as a suspended night. createGame is
    // the real constructor, so everything the renderer reads — crew, meters,
    // cells, notice — is a state the game could genuinely be in.
    await page.evaluate(({ it, guv }) => {
      const g = Engine.createGame(DATA, Engine.seededRng(4242), { mode: 'standard', guvnor: guv });
      let card = null, storyId = null, kind = it.kind;
      if (it.kind === 'incident') card = DATA.cards[it.at];
      else if (it.kind === 'event') card = DATA.events[it.at];
      else if (it.kind === 'story') {
        const s = DATA.storylines[it.at];
        card = s.stages[it.stage]; storyId = s.id; kind = 'story';
        g.marquee = s.id;
      } else {
        const s = DATA.minisagas[it.at];
        card = s.stages[it.stage]; storyId = s.id; kind = 'story';
        g.mini = s.id;
      }
      // sit the clock inside the card's own window so the kicker reads true
      if (card.window) g.turn = Math.max(1, Math.min(16, card.window[0]));
      g.current = { kind: kind, card: card, storyId: storyId };
      g.phase = 'choose';
      localStorage.setItem('dg_shift', JSON.stringify({
        v: 1, nightOff: 0, week: false, snap: Engine.snapshot(g),
        ui: { trayHistory: [], uiLog: [], uiLedger: [], spgNudged: false, gradeFlushed: false },
      }));
    }, { it: item, guv: guvnor });

    // The parade sheet only grows a RESUME button when it renders with a
    // night on the hook, so the first pass needs one reload to see it. From
    // then on suspending brings the sheet back with the button already there.
    if (!(await page.$('.resume-btn'))) {
      await page.reload();
      await page.waitForSelector('h1:has-text("DUTY GUVNOR")', { timeout: 8000 });
    }
    await page.click('.resume-btn', { timeout: 8000 });
    await page.waitForSelector('#card', { timeout: 8000 });

    const seen = await page.evaluate(() => {
      const card = document.getElementById('card');
      const btns = [...document.querySelectorAll('.choices button')];
      return {
        title: (card.querySelector('h2, h3') || {}).textContent || '',
        text: card.textContent || '',
        labels: btns.map((b) => b.textContent.trim()),
        // clipped inside its own box: the page would still measure as fitting
        clipCard: card.scrollHeight - card.clientHeight,
      };
    });

    const bad = [];
    if (!seen.title.trim()) bad.push('no title rendered');
    if (!seen.text.trim()) bad.push('no body text rendered');
    // An unresolved token is the localisation contract failing at a display
    // point: {his}, {sir}, or a name the recast never reached.
    const tok = seen.text.match(/\{[a-z_]+\}/i);
    if (tok) bad.push('unresolved token ' + tok[0]);
    if (/\bundefined\b|\bNaN\b|\[object Object\]/.test(seen.text)) bad.push('a value leaked into the prose');
    if (item.kind !== 'event' && !seen.labels.length) bad.push('no choices rendered');
    seen.labels.forEach((l, i) => {
      if (!l) bad.push('choice ' + i + ' has no label');
      if (/\{[a-z_]+\}/i.test(l)) bad.push('choice ' + i + ' carries an unresolved token');
    });
    if (seen.clipCard > 4) bad.push('the card hides ' + seen.clipCard + 'px inside its own box');
    if (bad.length) faults.push(item.kind + ' ' + item.id + ' (guvnor ' + guvnor + '): ' + bad.join('; '));

    done++;
    // back to the parade sheet for the next one, without a page reload:
    // reparsing three quarters of a megabyte of content 280 times over is
    // most of a minute spent proving nothing.
    await page.click('.suspend-link', { timeout: 8000 });
    await page.waitForSelector('.resume-btn', { timeout: 8000 });
  }

  if (faults.length) {
    console.error('CONTENT THAT DOES NOT RENDER:');
    faults.forEach((f) => console.error('  ' + f));
    process.exit(1);
  }
  if (errors.length) {
    console.error('CONSOLE/PAGE ERRORS DURING THE SWEEP:');
    errors.forEach((e) => console.error('  ' + e));
    process.exit(1);
  }
  // A sweep that quietly swept nothing would be the worst outcome of all.
  if (done !== manifest.length) throw new Error('only ' + done + ' of ' + manifest.length + ' pieces were rendered');
  if (manifest.length < 250) throw new Error('the manifest found only ' + manifest.length + ' pieces — content has gone missing');
  console.log('SWEEP OK: all ' + done + ' cards, events and saga stages rendered on the real desk — ' +
    'titles, prose and every choice label, under both guvnors, nothing clipped, no console errors.');
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
