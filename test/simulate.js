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
    lastNotice: null, seenNotices: [], flags: [] };
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
  return { survived: survived / runs, topTwo: topTwo / runs };
}

// --- engine mechanics the policy sim never exercises ---
// The random/greedy policies only call choose/proceed, so lifelines and the
// cross-night flags go untested by the balance runs. Assert them directly:
// a regression here (a dropped death check, a stranded loan PC, a lifeline
// that blocks its siblings) would otherwise ship green.
function mechanicsChecks() {
  const assert = (cond, msg) => { if (!cond) { console.error('\nMECHANICS: ' + msg); process.exit(1); } };
  const fresh = (opts) => Engine.createGame(DATA, Engine.seededRng(4242), opts || { mode: 'standard' });

  // Division answers one call per unit, independently — using one never blocks another.
  let g = fresh();
  assert(Engine.callIn(g, 'spg') === 'spg', 'S.P.G. call refused on a fresh night');
  assert(Engine.callIn(g, 'spg') === null, 'S.P.G. answered a second time');
  assert(Engine.callIn(g, 'dogs') === 'dogs', 'DOGS blocked after an S.P.G. call — units not independent');
  assert(g.gambleBoost === 20, 'DOGS call did not stand the boost by');
  assert(Engine.callIn(g, 'dogs') === null, 'DOGS answered a second time');

  // A job that spends the dog van drops any standing boost with it.
  g = fresh();
  Engine.callIn(g, 'dogs');
  g.dogsSpent = false; g.gambleBoost = 20; // simulate a boost still in hand
  // apply a spendDogs effect through the real path: find a card offering it
  const dogCard = DATA.cards.find((c) => c.choices.some((ch) => (ch.effects || {}).spendDogs));
  if (dogCard) {
    const idx = dogCard.choices.findIndex((ch) => (ch.effects || {}).spendDogs && !ch.risk);
    g.current = { kind: 'incident', card: dogCard, storyId: null };
    g.phase = 'choose';
    Engine.choose(g, idx);
    assert(g.dogsSpent === true, 'spendDogs did not spend the dog van');
    assert(g.gambleBoost === 0, 'a standing dog boost survived the van being sent out');
  }

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

  // The abduction penalty parades one short, floored at two.
  for (const [mode, want] of [['standard', 3], ['short', 2], ['full', 4]]) {
    const a = Engine.createGame(DATA, Engine.seededRng(7), { mode, flags: ['flag_pc_abducted'] });
    const paraded = a.crew.filter((p) => !p.seconded).length;
    assert(paraded === want, `abducted ${mode}: paraded ${paraded}, expected ${want}`);
  }
  console.log('mechanics: lifelines, dog-boost spend, urgent assistance and the abduction floor all hold.');
}
mechanicsChecks();

const RUNS = 400;
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
process.exit(bad ? 1 : 0);
