#!/usr/bin/env node
/* Monte Carlo balance check: plays full shifts with two policies and reports
 * outcome distributions. Deterministic (seeded), no dependencies.
 * Usage: node test/simulate.js */
'use strict';
const Engine = require('../src/engine.js');
const DATA = require('../src/data.js');

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function enabledChoices(state) {
  return state.current.card.choices
    .map((c, i) => ({ c, i }))
    .filter(({ c }) => Engine.choiceStatus(state, c).enabled);
}

// Random policy: any enabled choice.
function randomPolicy(state, rng) {
  const opts = enabledChoices(state);
  return opts[Math.floor(rng() * opts.length)].i;
}

// Greedy policy: maximise the post-choice minimum meter (a decent player
// protecting whatever is weakest).
function greedyPolicy(state) {
  const opts = enabledChoices(state);
  let best = opts[0], bestScore = -Infinity;
  for (const o of opts) {
    const e = o.c.effects || {};
    const after = ['streets', 'brass', 'relief'].map((k) => state.meters[k] + (e[k] || 0));
    const score = Math.min(...after) * 1000 + after.reduce((a, b) => a + b, 0);
    if (score > bestScore) { bestScore = score; best = o; }
  }
  return best.i;
}

function playShift(policy, seed, hist) {
  const rng = mulberry32(seed);
  const state = Engine.createGame(DATA, rng, hist);
  let guard = 500;
  while (!state.over || state.phase !== 'over') {
    if (--guard <= 0) throw new Error('shift did not terminate (possible deadlock)');
    if (state.phase === 'choose') {
      const opts = enabledChoices(state);
      if (!opts.length) throw new Error(`DEADLOCK: no enabled choice on "${state.current.card.title}" turn ${state.turn}`);
      Engine.choose(state, policy(state, rng));
    } else {
      Engine.proceed(state);
    }
  }
  return state;
}

function run(name, policy, runs) {
  const endings = {};
  const marquees = {};
  let survived = 0, meterSum = 0, arrests = 0, sagasResolved = 0, sagasStarted = 0, topTwo = 0;
  // Play like a real player: consecutive shifts carry seen-card history,
  // never repeat the previous night's marquee, and rotate the saga pool —
  // no marquee comes round again until every one has been worked.
  const rotate = (list, id, poolSize) => {
    if (!list.includes(id)) list = list.concat([id]);
    return list.length >= poolSize ? [id] : list;
  };
  let hist = { seen: [], lastMarquee: null, lastMini: null, seenMarquees: [], seenMinis: [],
    lastNotice: null, seenNotices: [], favours: 0, flags: [] };
  let prevDrawn = [];
  let followups = 0;
  for (let s = 1; s <= runs; s++) {
    const st = playShift(policy, s * 7919 + 13, hist);
    marquees[st.marquee] = (marquees[st.marquee] || 0) + 1;
    if (st.marquee === hist.lastMarquee) throw new Error('marquee repeated on consecutive shifts');
    if (st.mini && st.mini === hist.lastMini) throw new Error('mini-saga repeated on consecutive shifts');
    if (st.mini && hist.seenMinis.includes(st.mini)) {
      throw new Error(`mini ${st.mini} repeated before the rotation was exhausted`);
    }
    if (hist.seenMarquees.includes(st.marquee)) {
      throw new Error(`marquee ${st.marquee} repeated before the rotation was exhausted`);
    }
    // parade notices rotate the same way: the whole board posts before repeats
    if (st.notice.id === hist.lastNotice) throw new Error('parade notice repeated on consecutive shifts');
    if (hist.seenNotices.includes(st.notice.id)) {
      throw new Error(`notice ${st.notice.id} repeated before the rotation was exhausted`);
    }
    for (const id of st.drawn) {
      if (prevDrawn.includes(id)) throw new Error(`card ${id} repeated across consecutive shifts`);
      if (id.startsWith('follow_')) followups++;
    }
    // one visit per venue per night: no two dealt cards may share a venue,
    // and none may share one with the night's sagas
    const byId = {};
    for (const c of DATA.cards) byId[c.id] = c;
    for (const e of DATA.events || []) byId[e.id] = e;
    const sagaVenues = [st.marquee, st.mini]
      .map((id) => { const all = DATA.storylines.concat(DATA.minisagas || []); const hit = all.find((x) => x.id === id); return hit && hit.venue; })
      .filter(Boolean);
    const nightVenues = [];
    for (const id of st.drawn) {
      const v = byId[id] && byId[id].venue;
      if (!v) continue;
      if (nightVenues.includes(v) || sagaVenues.includes(v)) {
        throw new Error(`venue ${v} visited twice in one night (card ${id})`);
      }
      nightVenues.push(v);
    }
    prevDrawn = st.drawn;
    hist = {
      seen: st.drawn.concat(hist.seen).slice(0, 72), recent: st.drawn.length,
      lastMarquee: st.marquee, lastMini: st.mini,
      seenMarquees: rotate(hist.seenMarquees, st.marquee, DATA.storylines.length),
      seenMinis: st.mini ? rotate(hist.seenMinis, st.mini, DATA.minisagas.length) : hist.seenMinis,
      lastNotice: st.notice.id,
      seenNotices: rotate(hist.seenNotices, st.notice.id, DATA.notices.length),
      favours: Math.min(2, st.favours), // banked like the real UI banks them
      lastMarqueeGrade: (() => {
        const mq = st.stories[st.marquee];
        return mq && mq.started ? (mq.resolved ? mq.grade : 'unresolved') : null;
      })(),
      flags: st.flagsSet,
    };
    const key = st.ending.kind === 'disaster' ? `DISASTER:${st.ending.meter}`
      : st.ending.kind === 'dismissal' ? `DISMISSAL:${st.ending.cause}`
      : `DEBRIEF:${st.ending.title}`;
    endings[key] = (endings[key] || 0) + 1;
    if (st.ending.kind === 'debrief') {
      survived++;
      meterSum += st.ending.avg;
      if (st.ending.avg >= 45) topTwo++; // the two respectable debrief tiers
    }
    arrests += st.arrestsTotal;
    for (const id of Object.keys(st.stories)) {
      if (st.stories[id].started) sagasStarted++;
      if (st.stories[id].resolved) sagasResolved++;
    }
  }
  console.log(`\n=== ${name} policy, ${runs} shifts ===`);
  console.log(`survived to 06:00: ${survived}/${runs} (${Math.round((100 * survived) / runs)}%)`);
  if (survived) console.log(`avg standing among survivors: ${Math.round(meterSum / survived)}`);
  console.log(`avg arrests/shift: ${(arrests / runs).toFixed(1)}`);
  console.log(`sagas resolved: ${sagasResolved}/${sagasStarted}`);
  console.log(`marquees: ${Object.keys(marquees).sort().map((k) => k + ':' + marquees[k]).join(' ')}`);
  console.log(`follow-up (consequence) cards dealt: ${followups}`);
  for (const k of Object.keys(endings).sort()) console.log(`  ${k}: ${endings[k]}`);
  return {
    survived: survived / runs, topTwo: topTwo / runs,
    disasters: {
      streets: endings['DISASTER:streets'] || 0,
      brass: endings['DISASTER:brass'] || 0,
      relief: endings['DISASTER:relief'] || 0,
    },
  };
}

// --- engine mechanics the policy sim never exercises ---
// The random/greedy policies only call choose/proceed, so lifelines and the
// cross-night flags go untested by the balance runs. Assert them directly:
// a regression here (a dropped death check, a stranded loan PC, a lifeline
// that blocks its siblings) would otherwise ship green.
function mechanicsChecks() {
  const assert = (cond, msg) => { if (!cond) { console.error('\nMECHANICS: ' + msg); process.exit(1); } };
  const fresh = (opts) => Engine.createGame(DATA, Engine.seededRng(4242), opts || { mode: 'standard' });

  // Division answers one call per unit, independently — using one never
  // blocks another. And Division remembers who asks: every call costs brass.
  // (notice mods can move the opening meters, so all costs are measured
  // relative to whatever the night actually opened at)
  let g = fresh();
  let bBefore = g.meters.brass, rBefore = g.meters.relief, sBefore = g.meters.streets;
  assert(Engine.callIn(g, 'spg') === 'spg', 'S.P.G. call refused on a fresh night');
  assert(g.meters.brass === bBefore - 3, 'the S.P.G. call must cost 3 brass');
  assert(g.meters.relief === rBefore - 2 && g.meters.streets === Math.min(100, sBefore + 10), 'S.P.G. arithmetic moved');
  assert(Engine.callIn(g, 'spg') === null, 'S.P.G. answered a second time');
  bBefore = g.meters.brass;
  assert(Engine.callIn(g, 'dogs') === 'dogs', 'DOGS blocked after an S.P.G. call — units not independent');
  assert(g.gambleBoost === 20, 'DOGS call did not stand the boost by');
  assert(g.meters.brass === bBefore - 2, 'the DOGS call must cost 2 brass');
  assert(Engine.callIn(g, 'dogs') === null, 'DOGS answered a second time');
  {
    const c = fresh();
    const cb = c.meters.brass;
    c.current = { kind: 'incident', card: DATA.cards[0], storyId: null };
    c.phase = 'choose';
    assert(Engine.callIn(c, 'cid') === 'cid', 'C.I.D. refused an ordinary incident');
    assert(c.meters.brass === cb - 4, 'C.I.D. taking the job must cost 4 brass');
    assert(c.lastDeltas.brass === -4, 'the desk must show the C.I.D. price honestly');
  }

  // A lost gamble travels: the card's failure costs plus the standing
  // surcharge (-2 brass, -2 relief), and lastDeltas reads the true total.
  {
    const synth = {
      id: 'x_surcharge_probe', title: 'PROBE', text: 'probe',
      choices: [
        { label: 'chance it', result: 'r', effects: {}, risk: { odds: 25, failResult: 'f', failEffects: { streets: -1 } } },
        { label: 'walk away', result: 'r', effects: {} },
      ],
    };
    const lost = fresh();
    const lm = { ...lost.meters };
    lost.current = { kind: 'incident', card: synth, storyId: null };
    lost.phase = 'choose';
    lost.rng = () => 0.999; // the dice come up wrong, guaranteed
    Engine.choose(lost, 0);
    assert(lost.lastGamble === 'lost', 'the forced roll must lose');
    assert(lost.meters.streets === lm.streets - 1 && lost.meters.brass === lm.brass - 2 &&
      lost.meters.relief === lm.relief - 2,
      'lost gamble must cost card failure plus the surcharge');
    assert(lost.lastDeltas.brass === -2 && lost.lastDeltas.relief === -2, 'surcharge missing from lastDeltas');
    const won = fresh();
    const wm = { ...won.meters };
    won.current = { kind: 'incident', card: synth, storyId: null };
    won.phase = 'choose';
    won.rng = () => 0.0; // and now they come up right
    Engine.choose(won, 0);
    assert(won.lastGamble === 'won' && won.meters.brass === wm.brass && won.meters.relief === wm.relief,
      'a WON gamble must carry no surcharge');
  }

  // A job that spends the dog van drops any standing boost with it.
  g = fresh();
  Engine.callIn(g, 'dogs');
  g.dogsSpent = false; g.gambleBoost = 20; // simulate a boost still in hand
  // apply a spendDogs effect through the real path: find a card offering it
  // Guarding this on the card existing meant deleting the last spendDogs
  // choice would quietly retire the mechanic AND the test of it, with the
  // suite still green and the log still claiming the dog boost was checked.
  const dogCard = DATA.cards.find((c) => c.choices.some((ch) => (ch.effects || {}).spendDogs));
  assert(dogCard, 'no card spends the dog van: the boost-drop mechanic is unreachable');
  const dogIdx = dogCard.choices.findIndex((ch) => (ch.effects || {}).spendDogs && !ch.risk);
  assert(dogIdx >= 0, 'the dog van can only be spent behind a gamble: the drop is untestable');
  g.current = { kind: 'incident', card: dogCard, storyId: null };
  g.phase = 'choose';
  Engine.choose(g, dogIdx);
  assert(g.dogsSpent === true, 'spendDogs did not spend the dog van');
  assert(g.gambleBoost === 0, 'a standing dog boost survived the van being sent out');

  // Urgent assistance: one short board next night is spent and gone.
  g = fresh();
  g.crew.forEach((p) => { p.turns = 3; }); // whole board out
  const n0 = g.crew.length, b0 = g.meters.brass, r0 = g.meters.relief;
  const got = Engine.urgentAssistance(g);
  assert(got && g.crew.length === n0 + 1, 'urgent assistance lent no body');
  assert(g.meters.brass === b0 - 8 && g.meters.relief === r0 - 8, 'urgent assistance cost wrong');
  assert(Engine.urgentAssistance(g) === null, 'whistle answered twice in one shift');
  const loaner = g.crew[g.crew.length - 1];
  g.phase = 'result'; Engine.proceed(g); // commit the turn — the loaned body goes home
  assert(loaner.off === true, 'the loaned officer never went home');

  // Favour banking: carried markers add to the parade allowance, the book
  // never opens owing more than two, and even a grateful President cannot
  // push it past the cap.
  {
    const carry1 = Engine.createGame(DATA, Engine.seededRng(11), { mode: 'standard', favours: 1 });
    assert(carry1.favours === 2, 'standard + 1 banked should open owing 2, got ' + carry1.favours);
    assert(carry1.log.some((l) => l.text.indexOf('STILL ON THE BOOK') >= 0), 'carried favour log line missing');
    const carry9 = Engine.createGame(DATA, Engine.seededRng(11), { mode: 'full', favours: 9 });
    assert(carry9.favours === 2, 'the cap must hold against any banked total, got ' + carry9.favours);
    const prez = Engine.createGame(DATA, Engine.seededRng(11), { mode: 'standard', favours: 1, flags: ['flag_president_grateful'] });
    assert(prez.favours === 2, 'president marker must respect the cap, got ' + prez.favours);
    const none = Engine.createGame(DATA, Engine.seededRng(11), { mode: 'short' });
    assert(none.favours === 0, 'short mode with nothing banked should open owing 0');
  }

  // Every saga echoes into the next parade: the morning-after line lands in
  // the log for each grade, and an unstarted marquee stays silent.
  {
    for (const grade of ['good', 'mixed', 'poor', 'unresolved']) {
      const e = Engine.createGame(DATA, Engine.seededRng(21), { mode: 'standard', lastMarquee: 'horse', lastMarqueeGrade: grade });
      const want = DATA.storylines.find((s) => s.id === 'horse').echoes[grade];
      assert(e.log.some((l) => l.text === want), 'echo missing for horse/' + grade);
    }
    const silent = Engine.createGame(DATA, Engine.seededRng(21), { mode: 'standard', lastMarquee: 'horse', lastMarqueeGrade: null });
    assert(!silent.log.some((l) => l.text.indexOf('THE MORNING AFTER') >= 0), 'echo fired without a grade');
  }

  // The abduction penalty parades one short, floored at two.
  for (const [mode, want] of [['standard', 3], ['short', 2], ['full', 4]]) {
    const a = Engine.createGame(DATA, Engine.seededRng(7), { mode, flags: ['flag_pc_abducted'] });
    const paraded = a.crew.filter((p) => !p.seconded).length;
    assert(paraded === want, `abducted ${mode}: paraded ${paraded}, expected ${want}`);
  }

  // Wilf's gratitude: the Spain flag opens the night +20 relief / -10 brass,
  // announced as a slip on the desk and a line in the book.
  {
    const spain = Engine.createGame(DATA, Engine.seededRng(31), { mode: 'standard', flags: ['flag_pools_grateful'] });
    assert(spain.meters.relief === 75, 'Spain must open relief at 75, got ' + spain.meters.relief);
    assert(spain.meters.brass === 45, 'the propriety file must open brass at 45, got ' + spain.meters.brass);
    assert(spain.log.some((l) => l.text.indexOf('TORREMOLINOS') >= 0), 'the Spain log line is missing');
    assert(spain.openers.some((o) => o.title === 'THE RELIEF ARE GOING TO SPAIN'), 'the Spain opener slip is missing');
    const sober = Engine.createGame(DATA, Engine.seededRng(31), { mode: 'standard' });
    assert(sober.meters.relief === 55 && sober.meters.brass === 55, 'no flag, no holiday');
  }

  // A favour staked on a gamble is spent whichever way the dice land —
  // and the count on the book drops by exactly one.
  {
    const stake = {
      id: 'x_favour_probe', title: 'P', text: 'p',
      choices: [
        { label: 'chance it', result: 'r', effects: {}, risk: { odds: 25, failResult: 'f' } },
        { label: 'walk away', result: 'r', effects: {} },
      ],
    };
    for (const roll of [0.0, 0.999]) {
      const fb = fresh();
      fb.favours = 2;
      fb.current = { kind: 'incident', card: stake, storyId: null };
      fb.phase = 'choose';
      fb.rng = () => roll;
      Engine.choose(fb, 0, { favour: true });
      assert(fb.favours === 1, 'a staked favour must be spent (' +
        (roll < 0.5 ? 'won' : 'lost') + ' gamble left ' + fb.favours + ')');
      assert(fb.favoursSpent === 1, 'the spent-favour ledger must count it');
    }
  }

  // An order written for a WPC: refused when none is on the board, refused
  // when she is out, and when it goes it takes HER — never the nearest body.
  // The desk must not promise a WPC and send a bloke.
  {
    const wpcChoice = { label: 'Send the WPC', result: 'r', needsWpc: true, effects: { dispatchUnits: 1, dispatchTurns: 2 } };
    const g1 = fresh();
    g1.crew = [
      { name: 'PC STROUD', trait: 'steady', turns: 0 },
      { name: 'PC LATIMER', trait: 'fast', turns: 0 },
    ];
    assert(Engine.choiceStatus(g1, wpcChoice).reason === 'NO WPC ON PARADE',
      'a WPC order must be refused when none paraded');
    const g2 = fresh();
    g2.crew = [
      { name: 'PC STROUD', trait: 'steady', turns: 0 },
      { name: 'WPC MOYES', trait: 'kind', turns: 3 },
    ];
    assert(Engine.choiceStatus(g2, wpcChoice).reason === 'THE WPC IS OUT',
      'a WPC order must be refused while she is out');
    const g3 = fresh();
    g3.crew = [
      { name: 'PC STROUD', trait: 'steady', turns: 0 },
      { name: 'PC LATIMER', trait: 'fast', turns: 0 },
      { name: 'WPC MOYES', trait: 'kind', turns: 0 },
    ];
    assert(Engine.choiceStatus(g3, wpcChoice).enabled, 'a free WPC must enable the order');
    const sent = Engine.crewToSend(g3, 1, wpcChoice.label, '', true);
    assert(sent.length === 1 && sent[0].name === 'WPC MOYES',
      'the WPC order must send the WPC, got ' + (sent[0] && sent[0].name));
    // even when the card's prose stars somebody else entirely
    const sent2 = Engine.crewToSend(g3, 1, wpcChoice.label, 'PC Stroud knows the family well', true);
    assert(sent2[0].name === 'WPC MOYES', 'prose must not outrank a WPC order');
  }

  // The board and the label agree: whoever crewToSend picks for a named
  // order is a free officer, every time.
  {
    const g = fresh();
    g.crew[0].turns = 3; // the star of the card is out
    const named = 'Send ' + g.crew[0].name + ' round the back';
    const who = Engine.crewToSend(g, 1, named, '');
    assert(who.length === 1 && who[0].turns <= 0, 'a dispatch must never pick an officer already out');
  }

  // Handled Personally: a live decision with an empty board flags the state;
  // the same decision with anyone free does not.
  const soloPick = (game) => {
    for (const card of DATA.cards) {
      game.current = { kind: 'incident', card, storyId: null };
      game.phase = 'choose';
      const i = card.choices.findIndex((ch) => !ch.risk && Engine.choiceStatus(game, ch).enabled);
      if (i >= 0) return i;
    }
    return -1;
  };
  g = fresh();
  g.crew.forEach((p) => { p.turns = 3; });
  let idx = soloPick(g);
  assert(idx >= 0, 'no zero-resource choice playable on an empty board');
  Engine.choose(g, idx);
  assert(g.soloHandled === true, 'an empty-board decision must flag Handled Personally');
  g = fresh();
  idx = soloPick(g);
  Engine.choose(g, idx);
  assert(g.soloHandled === false, 'a manned board must not flag Handled Personally');

  console.log('mechanics: lifelines, dog-boost spend, urgent assistance, the abduction floor and the empty-board flag all hold.');
}
mechanicsChecks();

// --- dealability: every written card must actually reach a player ---
// A shape check cannot catch this. The dealer prefers time-specific cards,
// so a card can be perfectly valid and still never be dealt; 21 finished
// cards were dark for months that way. Play with every cross-night flag
// live and demand that the whole deck turns up.
function dealabilityCheck() {
  const seen = new Set();
  const allFlags = [];
  const collect = (c) => { if (c.requiresFlag) allFlags.push(c.requiresFlag); };
  DATA.cards.forEach(collect);
  (DATA.events || []).forEach(collect);
  // Two passes, because live follow-ups are deliberately dealt first and
  // would otherwise crowd the ordinary deck out of a flags-live run:
  // a clean book proves the everyday cards, a full book proves the payoffs.
  const pass = (nights, flags, salt) => {
    for (let s = 1; s <= nights; s++) {
      playShift(randomPolicy, s * 7919 + salt, { mode: 'standard', flags: flags })
        .drawn.forEach((id) => seen.add(id));
    }
  };
  pass(500, [], 5);
  pass(400, allFlags, 11);
  const missed = DATA.cards.filter((c) => !seen.has(c.id));
  if (missed.length) {
    console.error('\nDEALABILITY: ' + missed.length + ' card(s) never dealt across 600 nights with every flag live:\n  ' +
      missed.map((c) => c.id).join('\n  '));
    process.exit(1);
  }
  console.log('dealability: all ' + DATA.cards.length + ' incident cards reached the desk.');
}
dealabilityCheck();

// --- the casting contract: localiseText must be idempotent, and no
// canonical part-name may survive a pass except where it is cast to an
// officer of its own surname. This makes the "double-localise is harmless"
// property (which the log render relies on) an ENFORCED contract rather than
// a lucky accident: if buildNameMap ever cross-casts a part, double==single
// breaks here, loudly, before any phantom name can reach a player.
function castingContractChecks() {
  const CANON = ['Doyle', 'Whittle', 'Duffin', 'Hartle'];
  const canonRe = new RegExp('\\b(' + CANON.join('|') + ')\\b', 'gi');
  const strings = [];
  (function walk(node) {
    if (typeof node === 'string') { if (canonRe.test(node)) strings.push(node); canonRe.lastIndex = 0; }
    else if (Array.isArray(node)) node.forEach(walk);
    else if (node && typeof node === 'object') for (const k of Object.keys(node)) walk(node[k]);
  })(DATA);
  if (strings.length < 5) { console.error('\nCASTING: content walker found almost no canonical names — walker is broken'); process.exit(1); }

  let checked = 0;
  for (let seed = 1; seed <= 120; seed++) {
    for (const mode of ['short', 'standard', 'full']) {
      const g = Engine.createGame(DATA, Engine.seededRng(seed * 131 + 7), { mode });
      for (const s of strings) {
        const once = Engine.localiseText(g, s);
        const twice = Engine.localiseText(g, once);
        if (once !== twice) {
          console.error('\nCASTING: localiseText is not idempotent (seed ' + seed + ', ' + mode + ')' +
            '\n  in:    ' + s.slice(0, 90) + '\n  once:  ' + once.slice(0, 90) + '\n  twice: ' + twice.slice(0, 90));
          process.exit(1);
        }
        // Any canonical token still standing after a pass must be one the map
        // sends to ITSELF — the self-cast case (an officer named Doyle took
        // the Doyle part) or the deliberate identity fallback (an unfillable
        // part keeps its written self, off-board but rank-correct). If a
        // surviving token maps to a DIFFERENT surname, the localiser skipped a
        // replacement it owed — a phantom on its way to a player.
        let m;
        canonRe.lastIndex = 0;
        while ((m = canonRe.exec(once))) {
          const tok = m[1].toUpperCase();
          const ent = g.nameMap[tok];
          if (!ent || ent.cap.toUpperCase() !== tok) {
            console.error('\nCASTING: canonical name "' + m[1] + '" survived localisation but the map does not send it to itself' +
              ' (seed ' + seed + ', ' + mode + ', maps to ' + (ent && ent.cap) + ')' +
              '\n  in:   ' + s.slice(0, 90) + '\n  out:  ' + once.slice(0, 90));
            process.exit(1);
          }
        }
        checked++;
      }
    }
  }
  console.log('casting contract: localiseText idempotent + every survivor self-mapped across ' + checked.toLocaleString() + ' localised strings.');
}
castingContractChecks();

// --- the guvnor's pronouns ---
// Every card is written in the masculine with a token where the word would
// change. Three things must hold: no token ever survives to the screen under
// either guvnor; the two readings genuinely differ (otherwise the tokens are
// decoration); and no feminine word leaks into a night worked by one of the
// five men. That last one is the actual bug this guards — a card written for
// March that a player meets as Trott.
function guvnorPronounChecks() {
  const assert = (cond, msg) => { if (!cond) { console.error('\nGUVNOR: ' + msg); process.exit(1); } };
  const strings = [];
  const walk = (n) => {
    if (typeof n === 'string') { if (n.indexOf('{') >= 0) strings.push(n); }
    else if (Array.isArray(n)) n.forEach(walk);
    else if (n && typeof n === 'object') Object.values(n).forEach(walk);
  };
  walk(DATA);
  assert(strings.length >= 20, `only ${strings.length} tokenised strings — the gendered copy has gone missing`);

  // The expected words are written out here rather than imported, so the test
  // fails if the engine's table is edited by accident. Scanning the output for
  // feminine words instead would be unsound: a tokenised card may perfectly
  // well mention Rita, Miss Vadas, WPC Hartle — or Her Majesty.
  const WORDS = {
    m: { he: 'he', He: 'He', him: 'him', his: 'his', His: 'His', himself: 'himself',
      man: 'man', Man: 'Man', mans: 'man’s', gentleman: 'gentleman', sir: 'sir', Sir: 'Sir' },
    f: { he: 'she', He: 'She', him: 'her', his: 'her', His: 'Her', himself: 'herself',
      man: 'woman', Man: 'Woman', mans: 'woman’s', gentleman: 'lady', sir: 'ma’am', Sir: 'Ma’am' },
  };
  const expand = (s, map) => s.replace(/\{([A-Za-z]+)\}/g, (t, k) => (k in map ? map[k] : t));

  const m = Engine.createGame(DATA, Engine.seededRng(99), { mode: 'standard', guvnor: 'm' });
  const f = Engine.createGame(DATA, Engine.seededRng(99), { mode: 'standard', guvnor: 'f' });
  let differed = 0;
  for (const [sex, g] of [['m', m], ['f', f]]) {
    for (const s of strings) {
      const words = Engine.guvnorWords(g, s);
      assert(words === expand(s, WORDS[sex]),
        `guvnor ${sex}: wrong word chosen\n  got:  ${words.slice(0, 110)}\n  want: ${expand(s, WORDS[sex]).slice(0, 110)}`);
      const out = Engine.localiseText(g, s);
      assert(out.indexOf('{') < 0, `guvnor ${sex}: token survived to the screen — "${out.slice(0, 90)}"`);
      assert(Engine.localiseText(g, out) === out, `guvnor ${sex}: localiseText not idempotent on "${s.slice(0, 60)}"`);
    }
  }
  for (const s of strings) {
    if (Engine.localiseText(m, s) !== Engine.localiseText(f, s)) differed++;
  }
  assert(differed === strings.length,
    `${strings.length - differed} tokenised strings read identically for both guvnors`);
  // an untokenised string must be untouched either way
  const plain = 'The desk sergeant says nothing at all.';
  assert(Engine.localiseText(f, plain) === plain, 'plain copy must pass through unchanged');
  // and an unknown token is left visible rather than silently blanked
  assert(Engine.localiseText(f, 'a {nonsense} token') === 'a {nonsense} token',
    'an unknown token must survive so the validator and a screenshot can catch it');

  console.log(`guvnor pronouns: ${strings.length} tokenised strings, all resolved under both guvnors, all ${differed} reading differently.`);
}
guvnorPronounChecks();

// --- the overnight slips must show their working ---
// A consequence the player cannot see is a consequence they cannot learn
// from: the pools bonus moved the relief twenty points and the brass ten,
// and said neither. Every opener that changes the board now declares it, and
// the declared figures must BE the applied ones — the slip and the meters
// come from one object, and this proves they have not drifted apart.
function openerDisclosureChecks() {
  const assert = (cond, msg) => { if (!cond) { console.error('\nOPENERS: ' + msg); process.exit(1); } };
  const base = Engine.createGame(DATA, Engine.seededRng(5), { mode: 'standard' });
  const CASES = [
    { name: 'pools', opts: { flags: ['flag_pools_grateful'] } },
    { name: 'president', opts: { flags: ['flag_president_grateful'] } },
    { name: 'duke', opts: { flags: ['flag_duke_grateful'] } },
    { name: 'abducted', opts: { flags: ['flag_pc_abducted'] } },
    { name: 'favours', opts: { favours: 2 } },
  ];
  let declared = 0;
  for (const c of CASES) {
    const g = Engine.createGame(DATA, Engine.seededRng(5), Object.assign({ mode: 'standard' }, c.opts));
    const ops = (g.openers || []).filter((o) => o.effects || o.note);
    assert(ops.length, `${c.name}: its overnight slip says nothing about what it did`);
    for (const o of ops) {
      if (!o.effects) continue;
      // every declared meter delta must match the gap from a plain night
      for (const k of Object.keys(o.effects)) {
        const got = k === 'favours' ? g.favours - base.favours : g.meters[k] - base.meters[k];
        assert(got === o.effects[k],
          `${c.name}: slip declares ${k} ${o.effects[k]} but the board moved ${got}`);
        declared++;
      }
    }
  }
  assert(declared >= 4, `only ${declared} declared meter changes — the figures have gone missing`);
  console.log(`overnight slips: ${CASES.length} consequences, ${declared} declared figures, every one matching the board.`);
}
openerDisclosureChecks();

// --- THE WEEK (issue #4): campaign plumbing and balance ---
// Whole weeks played through the real envelope: consequences carry night to
// night, the marquee rotation never repeats inside a week, driftExtra lands
// on nights six and seven, and death ends the week where it stands.
const WEEK = require('../src/week.js');

function playWeek(policy, baseSeed) {
  const env = WEEK.fresh();
  let guard = 0;
  while (!env.done) {
    if (++guard > WEEK.NIGHTS) throw new Error('WEEK: the envelope never closed');
    const st = playShift(policy, baseSeed + env.night * 101, WEEK.nightOpts(env));
    if (st.driftExtra !== (env.night >= 6 ? 1 : 0)) {
      throw new Error('WEEK: night ' + env.night + ' paraded with driftExtra ' + st.driftExtra);
    }
    WEEK.recordNight(env, st, DATA);
  }
  return env;
}

function weekChecks() {
  const fail = (msg) => { console.error('\nWEEK: ' + msg); process.exit(1); };
  const WEEKS_G = 120, WEEKS_R = 200;
  let gDone = 0, rDone = 0, meanSum = 0;
  const verdicts = {};
  for (let w = 1; w <= WEEKS_G; w++) {
    const env = playWeek(greedyPolicy, w * 55581 + 3);
    const v = WEEK.verdict(env);
    verdicts[v.title] = (verdicts[v.title] || 0) + 1;
    if (env.diedNight) {
      if (v.tier !== 'dismissed') fail('a death must read DISMISSED, got ' + v.tier);
      continue;
    }
    gDone++;
    meanSum += v.mean;
    if (env.results.length !== WEEK.NIGHTS) fail('a finished week must hold seven rows');
    const mqs = new Set(env.seenMarquees);
    if (mqs.size !== WEEK.NIGHTS) fail('a marquee repeated inside one week');
    env.results.forEach((r, i) => {
      if (r.day !== WEEK.DAYS[i]) fail('the days must run Friday to Thursday');
    });
  }
  for (let w = 1; w <= WEEKS_R; w++) {
    const env = playWeek(randomPolicy, w * 77713 + 9);
    if (!env.diedNight) rDone++;
  }
  // the back-night surcharge, measured on its own: night-seven conditions
  // must be harder than the rostered ordinary, but still a night, not a wall
  let hard = 0;
  const HARD_RUNS = 300;
  for (let s = 1; s <= HARD_RUNS; s++) {
    const st = playShift(randomPolicy, s * 8887 + 21, { mode: 'standard', driftExtra: 1 });
    if (st.ending.kind === 'debrief') hard++;
  }
  console.log(`\n=== THE WEEK ===`);
  console.log(`greedy: ${gDone}/${WEEKS_G} weeks completed (${Math.round((100 * gDone) / WEEKS_G)}%)` +
    (gDone ? `, mean nightly avg ${Math.round(meanSum / gDone)}` : ''));
  console.log(`random: ${rDone}/${WEEKS_R} weeks completed (${Math.round((100 * rDone) / WEEKS_R)}%)`);
  console.log(`night-seven conditions, random single nights: ${hard}/${HARD_RUNS} survived (${Math.round((100 * hard) / HARD_RUNS)}%)`);
  console.log(`verdicts: ${Object.keys(verdicts).sort().map((k) => k + ':' + verdicts[k]).join(' · ')}`);
  return { greedyDone: gDone / WEEKS_G, randomDone: rDone / WEEKS_R, hardSurv: hard / HARD_RUNS };
}
const week = weekChecks();

const RUNS = 2500;
const rand = run('RANDOM', randomPolicy, RUNS);
const greedy = run('GREEDY', greedyPolicy, RUNS);

// Balance guardrails. "Teeth" means random play must not prosper: it should
// rarely reach the respectable endings, and should sometimes not survive at
// all — while deliberate play is clearly rewarded.
let bad = false;
if (rand.survived < 0.25) { console.error('\nBALANCE: random play survives <25% — night too brutal'); bad = true; }
if (rand.survived > 0.70) { console.error('\nBALANCE: random play survives >70% — not roguelike enough'); bad = true; }
if (greedy.survived > 0.995) { console.error('\nBALANCE: strong play literally cannot lose'); bad = true; }
if (greedy.survived < 0.85) { console.error('\nBALANCE: even strong play mostly dies — unwinnable'); bad = true; }
if (rand.topTwo > 0.4) { console.error('\nBALANCE: random play prospers (top tiers ' + Math.round(rand.topTwo * 100) + '%) — night has no teeth'); bad = true; }
if (greedy.topTwo < rand.topTwo + 0.25) {
  console.error('\nBALANCE: playing well barely beats playing at random');
  bad = true;
}
// Every meter must be able to lose the night, and that has to be asked of
// each meter on its own. Summed, brass carried relief for nothing: relief
// ends about one random night in four hundred, so the pair could clear the
// bar with relief stone dead, and a healthy build sat 0.0008 above a red.
// So the meters are driven down one at a time and each must actually kill.
{
  const KILLERS = ['streets', 'brass', 'relief'];
  KILLERS.forEach((meter) => {
    let killed = 0;
    for (let seed = 1; seed <= 60 && !killed; seed++) {
      const rnd = mulberry32(seed * 97 + 11);
      const g = Engine.createGame(DATA, rnd, { mode: 'standard' });
      let guard = 0;
      while (!g.over && guard++ < 400) {
        // walk the named meter towards the floor and let the engine judge it:
        // the death check is the engine's, only the pressure is ours
        g.meters[meter] = Math.max(0, g.meters[meter] - 12);
        KILLERS.forEach((o) => { if (o !== meter) g.meters[o] = 80; });
        if (g.phase === 'choose' && g.current) {
          const st = Engine.choiceStatus(g, g.current, 0);
          Engine.choose(g, st.enabled ? 0 : g.current.card.choices.findIndex(
            (c, i) => Engine.choiceStatus(g, g.current, i).enabled));
        }
        Engine.proceed(g);
      }
      if (g.over && g.ending && g.ending.kind === 'disaster' && g.ending.meter === meter) killed = 1;
    }
    if (!killed) {
      console.error('\nBALANCE: ' + meter + ' cannot lose the night — it is a score meter, not a survival meter');
      bad = true;
    }
  });
  // and random play must still be losing nights to something other than the
  // streets, or the other two are theoretically lethal and practically inert
  const dd = rand.disasters;
  const disasterTotal = dd.streets + dd.brass + dd.relief;
  if (disasterTotal && (dd.brass + dd.relief) / disasterTotal < 0.02) {
    console.error('\nBALANCE: brass and relief never kill in play (' + dd.brass + '+' + dd.relief +
      ' of ' + disasterTotal + ' disasters) — score meters, not survival');
    bad = true;
  }
}

// The week: a campaign a good player usually finishes and a careless one
// almost never does — and the hardened back nights stay survivable.
if (week.randomDone > 0.05) { console.error('\nBALANCE: random play completes weeks — the campaign has no teeth'); bad = true; }
if (week.greedyDone < 0.35) { console.error('\nBALANCE: strong play rarely finishes the week — campaign unwinnable'); bad = true; }
if (week.greedyDone > 0.85) { console.error('\nBALANCE: strong play strolls through the week'); bad = true; }
if (week.hardSurv < 0.10) { console.error('\nBALANCE: night-seven conditions are a wall, not a night'); bad = true; }
process.exit(bad ? 1 : 0);
