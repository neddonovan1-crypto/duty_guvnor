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

const RUNS = 400;
const rand = run('RANDOM', randomPolicy, RUNS);
const greedy = run('GREEDY', greedyPolicy, RUNS);

// Balance guardrails. "Teeth" means random play must not prosper: it should
// rarely reach the respectable endings, and should sometimes not survive at
// all — while deliberate play is clearly rewarded.
let bad = false;
if (rand.survived < 0.15) { console.error('\nBALANCE: random play survives <15% — night too brutal'); bad = true; }
if (rand.survived > 0.70) { console.error('\nBALANCE: random play survives >70% — not roguelike enough'); bad = true; }
if (rand.survived < 0.25) { console.error('\nBALANCE: random play survives <25% — night too brutal'); bad = true; }
if (greedy.survived > 0.995) { console.error('\nBALANCE: strong play literally cannot lose'); bad = true; }
if (greedy.survived < 0.85) { console.error('\nBALANCE: even strong play mostly dies — unwinnable'); bad = true; }
if (rand.topTwo > 0.4) { console.error('\nBALANCE: random play prospers (top tiers ' + Math.round(rand.topTwo * 100) + '%) — night has no teeth'); bad = true; }
if (greedy.topTwo < rand.topTwo + 0.25) {
  console.error('\nBALANCE: playing well barely beats playing at random');
  bad = true;
}
process.exit(bad ? 1 : 0);
