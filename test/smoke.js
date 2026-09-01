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
  let sawOpenerGate = false; // the correspondence must be met with a dead Division panel
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
      // Division does not answer before the book is open. The overnight
      // correspondence is read at phase 'choose', so the panel used to sit
      // live behind it — and ringing C.I.D. flips the phase to 'result',
      // which is the one thing that ends the correspondence for good. Every
      // unread slip went in the bin, with the meters already moved by them.
      if (await page.$('.paper.opener')) {
        const live = await page.$$eval('#division .call-btn:not([disabled])', (b) => b.length);
        if (live) throw new Error(live + ' Division buttons are live while the overnight correspondence is unread');
        sawOpenerGate = true;
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
  if (!sawOpenerGate) throw new Error('no shift ever opened with correspondence — the Division gate went unchecked');
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

  // ---- the casebook and the saga rotation must learn on the same event ----
  // The casebook is written the moment a case closes, so a night abandoned
  // before 06:00 keeps its credit. The rotation was only written at the
  // ending — so a saga worked on an abandoned night was counted by the
  // casebook and left in the fresh pool, and came round again on a career
  // the player could see had already worked it. Prove both books agree, and
  // that the rotation survives the abandonment that exposed the gap.
  {
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('h1:has-text("DUTY GUVNOR")', { timeout: 8000 });
    // Take the marquee the game itself deals and find a resolving choice on
    // it that costs nothing to take, so the probe never fails for want of a
    // body or a marker. The route in is the suspended-night envelope, the
    // same front door test/sweep.js uses — no debug hooks in the build.
    const target = await page.evaluate(() => {
      const g = Engine.createGame(DATA, Engine.seededRng(99), { mode: 'standard', guvnor: 'm' });
      const s = DATA.storylines.find((x) => x.id === g.marquee);
      let pick = null;
      for (const st of s.stages) {
        const i = st.choices.findIndex((c) => !c.goto && !c.risk &&
          !((c.effects || {}).dispatchUnits > 0) && !((c.effects || {}).arrests > 0) &&
          !((c.effects || {}).favours < 0));
        if (i >= 0) { pick = { stage: st.id, choice: i }; break; }
      }
      if (!pick) return null;
      const stage = s.stages.find((x) => x.id === pick.stage);
      g.turn = Math.max(1, Math.min(16, stage.notBefore || s.startTurn || 4));
      g.current = { kind: 'story', card: stage, storyId: s.id };
      g.phase = 'choose';
      localStorage.setItem('dg_shift', JSON.stringify({
        v: 1, nightOff: 0, week: false, snap: Engine.snapshot(g),
        ui: { trayHistory: [], uiLog: [], uiLedger: [], spgNudged: false, gradeFlushed: false },
      }));
      return { saga: s.id, choice: pick.choice };
    });
    if (!target) throw new Error('no marquee saga offers a free resolving choice — the rotation probe cannot run');
    await page.reload();
    await page.waitForSelector('.resume-btn', { timeout: 8000 });
    await page.click('.resume-btn');
    await page.waitForSelector('#card .choices button', { timeout: 8000 });
    const btns = await page.$$('#card .choices button');
    await btns[target.choice].click();
    await page.waitForSelector('.continue button', { timeout: 8000 });

    // the night is deliberately NOT played out: this is the abandoned case
    await page.reload();
    await page.waitForSelector('h1:has-text("DUTY GUVNOR")', { timeout: 8000 });
    const books = await page.evaluate(() => ({
      hist: JSON.parse(localStorage.getItem('dg_hist') || '{}'),
      career: JSON.parse(localStorage.getItem('dg_career') || '{}'),
    }));
    const graded = Object.keys(books.career.sagaGrades || {});
    const seenM = books.hist.seenMarquees || [];
    if (graded.indexOf(target.saga) < 0) {
      throw new Error('the casebook lost "' + target.saga + '" on an abandoned night (graded: [' + graded.join(', ') + '])');
    }
    if (seenM.indexOf(target.saga) < 0) {
      throw new Error('the casebook counted "' + target.saga + '" but the rotation did not — it will be dealt again ' +
        '(seenMarquees: [' + seenM.join(', ') + '])');
    }
    if (books.hist.lastMarquee !== target.saga) {
      throw new Error('lastMarquee is "' + books.hist.lastMarquee + '", not the saga just worked — it can repeat immediately');
    }
    // lastMarquee and lastMarqueeGrade are read as a PAIR by createGame to
    // print the morning-after slip. Writing the id without the grade leaves
    // tonight's saga wearing the last completed night's verdict, so the manor
    // congratulates a guvnor on a saga they botched.
    const gradeInBook = (books.career.sagaGrades || {})[target.saga];
    if (books.hist.lastMarqueeGrade !== gradeInBook) {
      throw new Error('the casebook graded "' + target.saga + '" ' + gradeInBook +
        ' but the rotation carries lastMarqueeGrade "' + books.hist.lastMarqueeGrade +
        '" — tomorrow\'s morning-after slip will describe a different night');
    }
    console.log('rotation: "' + target.saga + '" closed on an abandoned night went into BOTH the casebook and the rotation.');
  }

  // ---- a full night as each of the six guvnors ----
  // Everything above plays as whoever the muster room happens to open on.
  // The deck's own gendered copy is proved exhaustively at the engine level
  // (the localiseText contract in simulate.js walks every tokened string
  // under both guvnors), but the guvnor is also an IDENTITY carried across
  // the whole night — the warrant card, the memorandum, the letter — and
  // that is threaded through the UI, where it has broken before: a face
  // tried on and backed out of once changed the guvnor anyway. So each of
  // the six is picked, booked on, and played to an ending, and the desk is
  // asked at every step whether it still knows who is on duty.
  {
    const faces = await page.evaluate(() => {
      const out = [];
      document.querySelectorAll('.muster-row .muster-pick').forEach((b, i) => out.push(i));
      return out;
    }).catch(() => []);
    void faces;
    const seen = [];
    for (let who = 0; who < 6; who++) {
      await page.evaluate(() => localStorage.clear());
      await page.reload();
      await page.waitForSelector('h1:has-text("DUTY GUVNOR")', { timeout: 8000 });
      await page.click('button:has-text("BOOK ON DUTY")');
      await page.waitForSelector('.muster .pfile', { timeout: 8000 });
      const picks = await page.$$('.muster-row .muster-pick');
      if (picks.length !== 6) throw new Error('the muster room paraded ' + picks.length + ' inspectors, not six');
      await picks[who].click();
      await page.waitForTimeout(80);
      // who the file says is stepping forward, before the night starts
      const chosen = await page.evaluate(() => {
        const head = document.querySelector('.pfile-head').textContent.replace(/\s+/g, ' ').trim();
        const facts = [...document.querySelectorAll('.pfact')].map((x) => x.textContent.replace(/\s+/g, ' ').trim());
        return { head: head, facts: facts };
      });
      const warrantWanted = (chosen.facts.join(' ').match(/\b\d{4,6}\b/) || [])[0];
      const surname = (chosen.head.match(/INSPECTOR\s+([A-Z]+)/i) || [])[1];
      if (!surname) throw new Error('muster file ' + who + ' names no inspector: "' + chosen.head + '"');
      if (seen.indexOf(surname) >= 0) throw new Error('the muster room offered ' + surname + ' twice');
      seen.push(surname);

      await (await page.waitForSelector('.start-btn', { timeout: 8000 })).click();
      await page.waitForSelector('#status', { timeout: 8000 });
      const booked = await page.evaluate(() => localStorage.getItem('dg_avatar'));
      // the warrant card on the desk must be the file that was picked
      const card = await page.evaluate(() => (document.querySelector('#status .warrant, #status') || {}).textContent || '');
      if (card.indexOf(surname) < 0) {
        throw new Error('picked Insp. ' + surname + ' at muster, but the warrant card on the desk does not name them');
      }
      if (warrantWanted && card.indexOf(warrantWanted) < 0) {
        throw new Error('Insp. ' + surname + ' paraded with warrant ' + warrantWanted +
          ', but the desk shows a different number');
      }

      let steps = 0;
      while (steps++ < 250) {
        if (await page.$('button:has-text("WORK ANOTHER SHIFT")')) break;
        const cont = await page.$('.continue button');
        if (cont) { await cont.click(); continue; }
        const ch = await page.$('.chanceit');
        if (ch) { await ch.click(); continue; }
        const key = await page.$('#txkey:not([disabled])');
        if (key && !(await page.$('.continue button'))) {
          await key.click();
          await page.waitForSelector('.continue button', { timeout: 15000 }).catch(() => {});
          continue;
        }
        const c = await page.$('#card:not(.out) .choices button:not([disabled])');
        if (c) { await c.click(); continue; }
        await page.waitForTimeout(40);
      }
      // The Yard's letter is addressed to the post — 'INSPECTOR — THORNE
      // STREET (B RELIEF)' — not to the officer, which is correct for 1975
      // and is why this does not look for the name here. What it does look
      // for is a token the localiser never reached, a night that ended
      // without a verdict, and a guvnor who quietly changed identity while
      // the night was being worked.
      const end = await page.evaluate(() => document.body.textContent || '');
      const tok = end.match(/\{[a-z_]+\}/i);
      if (tok) throw new Error('Insp. ' + surname + "'s ending screen carries an unresolved " + tok[0]);
      if (!/EXEMPLARY|ACCEPTABLE|A GRUDGING NOD|COMMENDATION|SHIFT ABANDONED|DISMISSED THE FORCE/.test(end)) {
        throw new Error('Insp. ' + surname + "'s night ended without a verdict on the screen");
      }
      const after = await page.evaluate(() => localStorage.getItem('dg_avatar'));
      if (after !== booked) {
        throw new Error('Insp. ' + surname + ' booked on as avatar ' + booked +
          ' and came off duty as ' + after + ' — the guvnor changed identity mid-night');
      }
      // Bream annotates the carbon by hand, and one of his notes addresses
      // the guvnor. It is UI-authored copy, so the content validator cannot
      // see it: if it ever loses the localiser again the token stands here
      // in braces, in front of the player, on their own commendation.
      const biro = await page.textContent('.memo-biro').catch(() => null);
      // 'sir' is correct for five of the six and wrong for the sixth, which
      // is the whole point — the note has to go through the localiser, not
      // be written one way and hoped over.
      const female = await page.evaluate(() => document.body.textContent.indexOf('INSPECTOR MARCH') >= 0);
      if (biro && (biro.indexOf('{') >= 0 || (female && /\bsir\b/i.test(biro)))) {
        throw new Error("Bream's biro on Insp. " + surname + "'s memo reads \"" + biro.trim() + '"');
      }
      // and the pick must still be the pick when the sheet comes back round
      await page.reload();
      await page.waitForSelector('h1:has-text("DUTY GUVNOR")', { timeout: 8000 });
      await page.click('button:has-text("BOOK ON DUTY")');
      await page.waitForSelector('.muster .pfile', { timeout: 8000 });
      const reopened = await page.textContent('.pfile-head');
      if (reopened.toUpperCase().indexOf(surname) < 0) {
        throw new Error('the muster room reopened on "' + reopened.trim() +
          '" after a night worked by Insp. ' + surname + ' — the pick did not stick');
      }
    }
    console.log('guvnors: all six (' + seen.join(', ') + ') picked at muster, carried onto the warrant card ' +
      'with the right number, still the same officer at 06:00, and still the pick when the sheet came round again.');
  }

  // ---- working the desk without a mouse ----
  // A handheld has no pointer. The controller drives the same four functions
  // the arrow keys do, so exercising the keyboard here proves the whole
  // navigation model and leaves only the button mapping on trust — Playwright
  // can drive a keyboard and cannot drive a pad.
  {
    await page.evaluate(() => localStorage.clear());
    await page.reload();
    await page.waitForSelector('h1:has-text("DUTY GUVNOR")', { timeout: 8000 });
    const focused = () => page.evaluate(() => {
      const a = document.activeElement;
      if (!a || a === document.body) return null;
      return { text: (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40),
        ring: getComputedStyle(a).outlineWidth };
    });

    await page.keyboard.press('ArrowDown');
    const first = await focused();
    if (!first) throw new Error('ArrowDown from cold focused nothing — the desk cannot be worked by keyboard');
    // a focus you cannot see is not navigation: this is the whole point
    if (first.ring === '0px') throw new Error('focused "' + first.text + '" draws no ring');
    await page.keyboard.press('ArrowDown');
    if ((await focused()).text === first.text) throw new Error('ArrowDown did not move the focus');
    await page.keyboard.press('ArrowUp');
    if ((await focused()).text !== first.text) throw new Error('ArrowUp did not come back');

    // Escape backs out of the muster room without booking anyone on
    await page.click('button:has-text("BOOK ON DUTY")');
    await page.waitForSelector('.muster .pfile', { timeout: 8000 });
    await page.keyboard.press('Escape');
    await page.waitForSelector('h1:has-text("DUTY GUVNOR")', { timeout: 5000 });
    if (await page.$('.muster .pfile')) throw new Error('Escape did not leave the muster room');

    // and on the desk, the arrows must reach a choice and Enter take it
    await bookOn(page);
    await page.waitForSelector('#status', { timeout: 8000 });
    for (let i = 0; i < 6; i++) {
      const op = await page.$('.paper.opener .choices button');
      if (!op) break;
      await op.click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(120);
    }
    let hops = 0, onChoice = false;
    while (hops++ < 40 && !onChoice) {
      await page.keyboard.press('ArrowDown');
      onChoice = await page.evaluate(() => !!(document.activeElement && document.activeElement.closest &&
        document.activeElement.closest('.choices')));
    }
    if (!onChoice) throw new Error('the arrow keys never reached a choice on the desk');
    if ((await focused()).ring === '0px') throw new Error('a focused choice draws no ring');
    await page.keyboard.press('Enter');
    const took = await page.waitForSelector('.continue button, .chanceit, #txkey.armed', { timeout: 12000 })
      .then(() => true).catch(() => false);
    if (!took) throw new Error('Enter on a focused choice did nothing');
    console.log('no mouse: arrows move a visible focus, Escape backs out of the muster room, Enter takes a choice.');
  }

  // ---- ringing Division must not restart the teleprinter ----
  // ANIMATIONS ON, and deliberately so: everything above this line runs under
  // reduced motion for speed, which collapses the arrival window entirely and
  // is exactly why this went unseen. Anything that redrew the desk while a
  // card was still coming through used to wipe the sheet and hammer the whole
  // thing out again from the top; a Division call is the easy way to do it.
  // Sampling before and after is too coarse — a restarted printer has caught
  // back up by the time the transmit sequence ends — so the body length is
  // watched right through the call and must never once go backwards.
  {
    await page.evaluate(() => localStorage.clear());
    // before the reload, not after: the desk reads the motion preference once
    // as it loads, so flipping it on a live page leaves the printer switched off
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.reload();
    await page.waitForSelector('h1:has-text("DUTY GUVNOR")', { timeout: 8000 });
    await bookOn(page);
    await page.waitForSelector('#status', { timeout: 8000 });
    for (let i = 0; i < 6; i++) { // read the overnight correspondence away
      const op = await page.$('.paper.opener .choices button');
      if (!op) break;
      await op.click({ timeout: 2000 }).catch(() => {});
      await page.waitForTimeout(150);
    }
    let watched = false;
    for (let card = 0; card < 25 && !watched; card++) {
      // a telex sheet still arriving is the one carrying a SKIP button
      const skip = await page.$('.paper .skipbtn');
      const spg = await page.$('.call-btn:not([disabled]):has-text("S.P.G.")');
      if (skip && spg) {
        await page.evaluate(() => {
          window.__lens = [];
          window.__w = setInterval(function () {
            var b = document.querySelector('#card .paper .body');
            if (b) window.__lens.push(b.textContent.length);
          }, 20);
        });
        await spg.click({ timeout: 2000 });
        await page.click('#txkey', { timeout: 2000 });
        await page.waitForSelector('#card .choices button', { state: 'visible', timeout: 25000 });
        const lens = await page.evaluate(() => { clearInterval(window.__w); return window.__lens; });
        let drop = -1;
        for (let i = 1; i < lens.length; i++) if (lens[i] < lens[i - 1]) { drop = i; break; }
        if (drop >= 0) {
          throw new Error('the teleprinter went backwards while Division was rung (' +
            lens.slice(Math.max(0, drop - 2), drop + 2).join(' -> ') + ') — the card reset');
        }
        if (lens.length < 20) throw new Error('the printer was barely sampled — the probe proved nothing');
        console.log('teleprinter: ' + lens.length + ' readings across a Division call with animations on, ' +
          lens[0] + ' -> ' + lens[lens.length - 1] + ' chars, never once backwards.');
        watched = true;
        break;
      }
      const cont = await page.$('.continue button');
      if (cont) { await cont.click({ timeout: 2000 }).catch(() => {}); await page.waitForTimeout(120); continue; }
      const ch = await page.$('#card .choices button:not([disabled])');
      if (ch) {
        await ch.click({ timeout: 2000 }).catch(() => {});
        await page.waitForTimeout(120);
        const key = await page.$('#txkey:not([disabled])');
        if (key && !(await page.$('.continue button'))) {
          await key.click({ timeout: 2000 }).catch(() => {});
          await page.waitForSelector('.continue button', { timeout: 20000 }).catch(() => {});
        }
        continue;
      }
      if (await page.$('button:has-text("WORK ANOTHER SHIFT")')) break;
      await page.waitForTimeout(80);
    }
    if (!watched) throw new Error('never caught a card mid-arrival with the S.P.G. still in hand — probe did not run');
    await page.emulateMedia({ reducedMotion: 'reduce' });
  }

  if (errors.length) {
    console.error('CONSOLE/PAGE ERRORS:');
    errors.forEach((e) => console.error('  ' + e));
    process.exit(1);
  }
  console.log('SMOKE OK: 5 full shifts + TX abort + phantom scan + rotation probe + a Division call ' +
    'mid-arrival with animations on, all through the real UI, zero console errors.');
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
