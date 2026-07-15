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

function playShift(policy, seed) {
  const rng = mulberry32(seed);
  const state = Engine.createGame(DATA, rng);
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
  let survived = 0, meterSum = 0, arrests = 0, sagasResolved = 0, sagasStarted = 0, topTwo = 0;
  for (let s = 1; s <= runs; s++) {
    const st = playShift(policy, s * 7919 + 13);
    const key = st.ending.kind === 'disaster' ? `DISASTER:${st.ending.meter}` : `DEBRIEF:${st.ending.title}`;
    endings[key] = (endings[key] || 0) + 1;
    if (st.ending.kind === 'debrief') {
      survived++;
      meterSum += st.ending.avg;
      if (st.ending.avg >= 50) topTwo++; // the two respectable debrief tiers
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
if (rand.survived > 0.97) { console.error('\nBALANCE: random play never dies — night has no teeth'); bad = true; }
if (rand.topTwo > 0.4) { console.error('\nBALANCE: random play prospers (top tiers ' + Math.round(rand.topTwo * 100) + '%) — night has no teeth'); bad = true; }
if (greedy.topTwo < rand.topTwo + 0.25) {
  console.error('\nBALANCE: playing well barely beats playing at random');
  bad = true;
}
process.exit(bad ? 1 : 0);
