/* THE WEEK (issue #4) — campaign plumbing, engine hook and verdict tiers.
 * Drives real nights through the real engine, records them onto the week
 * envelope exactly as the UI does, and asserts the transitions the design
 * locked: consequences carry, the back nights lean harder, death ends the
 * week where it stands, and the letter's arithmetic lands on its tiers. */
'use strict';
const assert = require('assert');
const Engine = require('../src/engine.js');
const DATA = require('../src/data.js');
const WEEK = require('../src/week.js');

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function step(g, rnd) {
  if (g.phase === 'choose' && g.current && g.current.card && g.current.card.choices) {
    const cs = g.current.card.choices
      .map((c, i) => ({ c, i }))
      .filter((x) => Engine.choiceStatus(g, x.c).enabled);
    if (!cs.length) { Engine.proceed(g); return; }
    Engine.choose(g, cs[Math.floor(rnd() * cs.length)].i, null);
  } else {
    Engine.proceed(g);
  }
}

function playNight(opts, seed) {
  const rnd = mulberry32(seed);
  const g = Engine.createGame(DATA, rnd, opts);
  let guard = 0;
  while (!(g.over && g.phase === 'over') && guard++ < 400) step(g, rnd);
  assert.ok(g.over && g.ending, 'night never ended (seed ' + seed + ')');
  return g;
}

// play nights until one ends the wanted way, so both paths are reachable
function playNightEnding(opts, wantDebrief, seedBase) {
  for (let s = 0; s < 200; s++) {
    const g = playNight(opts, seedBase + s * 7717);
    if ((g.ending.kind === 'debrief') === wantDebrief) return g;
  }
  throw new Error('no night found ending ' + (wantDebrief ? 'in a debrief' : 'in a death'));
}

// --- the envelope's shape and the calendar it carries ---
{
  const env = WEEK.fresh();
  assert.strictEqual(env.night, 1, 'a fresh week parades night one');
  assert.strictEqual(env.done, false);
  assert.strictEqual(env.diedNight, 0);
  assert.strictEqual(env.results.length, 0);
  assert.strictEqual(WEEK.NIGHTS, 7);
  assert.strictEqual(WEEK.DAYS.length, 7);
  assert.strictEqual(WEEK.DAYS[0], 'FRIDAY', 'the week opens Friday the 14th');
  assert.strictEqual(WEEK.DAYS[6], 'THURSDAY', 'the week closes Thursday the 20th');
}

// --- nightOpts: standard strength throughout, the back nights lean harder ---
{
  const env = WEEK.fresh();
  let o = WEEK.nightOpts(env);
  assert.strictEqual(o.mode, 'standard', 'the week parades AS ROSTERED');
  assert.strictEqual(o.driftExtra, 0, 'night one carries no extra drift');
  env.night = 5;
  assert.strictEqual(WEEK.nightOpts(env).driftExtra, 0, 'night five still ordinary');
  env.night = 6;
  assert.strictEqual(WEEK.nightOpts(env).driftExtra, 1, 'night six leans harder');
  env.night = 7;
  assert.strictEqual(WEEK.nightOpts(env).driftExtra, 1, 'night seven leans harder');
}

// --- the engine hook: driftExtra lands only in the peak window ---
{
  const g0 = Engine.createGame(DATA, Engine.seededRng(99), { mode: 'standard' });
  const g1 = Engine.createGame(DATA, Engine.seededRng(99), { mode: 'standard', driftExtra: 1 });
  assert.strictEqual(g0.driftExtra, 0, 'a single night never sets driftExtra');
  assert.strictEqual(g1.driftExtra, 1, 'the opt must reach the state');
  for (const turn of [2, 5, 8, 13, 15]) {
    g0.turn = turn; g1.turn = turn;
    assert.strictEqual(Engine.streetsDriftNow(g1), Engine.streetsDriftNow(g0),
      'turn ' + turn + ' must not carry the week surcharge');
  }
  for (const turn of [9, 10, 12]) {
    g0.turn = turn; g1.turn = turn;
    assert.strictEqual(Engine.streetsDriftNow(g1), Engine.streetsDriftNow(g0) + 1,
      'deep small hours turn ' + turn + ' must cost exactly one more');
  }
  // a suspended week night must wake up just as hard
  const snap = Engine.snapshot(g1);
  assert.strictEqual(Engine.restore(DATA, snap).driftExtra, 1, 'driftExtra must survive suspend/resume');
}

// --- recordNight, survived: the row, the continuity, the advance ---
{
  const env = WEEK.fresh();
  const g = playNightEnding(WEEK.nightOpts(env), true, 1000);
  WEEK.recordNight(env, g, DATA);
  assert.strictEqual(env.night, 2, 'a survived night advances the parade');
  assert.strictEqual(env.done, false);
  assert.strictEqual(env.diedNight, 0);
  const r = env.results[0];
  assert.strictEqual(r.night, 1);
  assert.strictEqual(r.day, 'FRIDAY');
  assert.strictEqual(r.kind, 'debrief');
  assert.strictEqual(r.avg, g.ending.avg);
  assert.strictEqual(r.sagaTitle, g.ending.saga.title);
  // the continuity mirrors what saveHist would keep for a single night
  assert.strictEqual(env.lastMarquee, g.marquee, 'the marquee must not repeat tomorrow');
  assert.ok(env.seenMarquees.indexOf(g.marquee) >= 0, 'the rotation must remember tonight');
  assert.strictEqual(env.recent, g.drawn.length, 'tonight’s cards sink in tomorrow’s deck');
  assert.strictEqual(env.favours, Math.min(2, g.favours), 'unspent markers bank, capped at two');
  assert.deepStrictEqual(env.flags, g.flagsSet, 'tonight’s consequences parade tomorrow');
  // and night two actually opens with that baggage
  const g2 = Engine.createGame(DATA, Engine.seededRng(5), WEEK.nightOpts(env));
  assert.notStrictEqual(g2.marquee, g.marquee, 'night two drew last night’s marquee');
}

// --- recordNight, death: the week ends where the career does ---
{
  const env = WEEK.fresh();
  const g1 = playNightEnding(WEEK.nightOpts(env), true, 3000);
  WEEK.recordNight(env, g1, DATA);
  const g2 = playNightEnding(WEEK.nightOpts(env), false, 4000);
  WEEK.recordNight(env, g2, DATA);
  assert.strictEqual(env.done, true, 'a death ends the week');
  assert.strictEqual(env.diedNight, 2, 'the week remembers which night it died');
  assert.strictEqual(env.results.length, 2);
  assert.notStrictEqual(env.results[1].kind, 'debrief');
  const v = WEEK.verdict(env);
  assert.strictEqual(v.tier, 'dismissed');
  assert.strictEqual(v.title, 'DISMISSED THE FORCE');
  assert.ok(v.line.indexOf('second night') >= 0, 'the letter names the night it ended');
}

// --- a full week: seven distinct sagas, the days in order, done at the end ---
{
  const env = WEEK.fresh();
  for (let n = 1; n <= 7; n++) {
    assert.strictEqual(env.night, n);
    const g = playNightEnding(WEEK.nightOpts(env), true, 10000 + n * 40000);
    WEEK.recordNight(env, g, DATA);
  }
  assert.strictEqual(env.done, true, 'seven survived nights finish the week');
  assert.strictEqual(env.diedNight, 0);
  assert.strictEqual(env.results.length, 7);
  const mqs = {};
  env.results.forEach(function (r, i) {
    assert.strictEqual(r.day, WEEK.DAYS[i], 'the days must run Friday to Thursday');
    assert.strictEqual(typeof r.exemplary, 'boolean', 'every row must say whether it was stamped');
  });
  env.seenMarquees.forEach(function (id) { mqs[id] = true; });
  assert.strictEqual(Object.keys(mqs).length, 7, 'seven nights, seven different marquee sagas');
  const v = WEEK.verdict(env);
  assert.ok(['promoted', 'retained'].indexOf(v.tier) >= 0, 'a survived week promotes or retains');
}

// --- two weeks back to back: fourteen nights, fourteen different sagas ---
{
  assert.ok(DATA.storylines.length >= 14, 'two clean weeks need at least fourteen marquee sagas');
  const worked = [];
  let env = WEEK.fresh();
  for (let n = 1; n <= 7; n++) {
    const g = playNightEnding(WEEK.nightOpts(env), true, 60000 + n * 35000);
    worked.push(g.marquee);
    WEEK.recordNight(env, g, DATA);
  }
  const rotation = env.seenMarquees.slice();
  env = WEEK.fresh(env); // BEGIN ANOTHER WEEK: rotations carry, baggage does not
  assert.strictEqual(env.night, 1);
  assert.strictEqual(env.done, false);
  assert.strictEqual(env.flags.length, 0, 'a new week opens clean of consequences');
  assert.strictEqual(env.favours, 0, 'no favours ride between weeks');
  assert.deepStrictEqual(env.seenMarquees, rotation, 'the new week remembers last week’s stories');
  for (let n = 1; n <= 7; n++) {
    const g = playNightEnding(WEEK.nightOpts(env), true, 700000 + n * 45000);
    worked.push(g.marquee);
    WEEK.recordNight(env, g, DATA);
  }
  const distinct = {};
  worked.forEach(function (id) { distinct[id] = true; });
  assert.strictEqual(Object.keys(distinct).length, 14, 'fourteen nights, fourteen different sagas');
}

// --- the three doors out of a week from hell, exactly where promised ---
{
  const at = (exFlags, died) => {
    const env = WEEK.fresh();
    env.done = true;
    env.diedNight = died || 0;
    env.results = exFlags.map((x, i) => ({
      night: i + 1, day: WEEK.DAYS[i], kind: 'debrief', avg: 60, arrests: 0, exemplary: !!x,
    }));
    return WEEK.verdict(env);
  };
  assert.strictEqual(at([1, 1, 1, 0, 0, 0, 0]).tier, 'promoted', 'three EXEMPLARY promote');
  assert.strictEqual(at([1, 1, 1, 0, 0, 0, 0]).title, 'PROMOTED TO CHIEF INSPECTOR');
  assert.ok(at([1, 1, 1, 0, 0, 0, 0]).line.indexOf('Private Office') >= 0, 'the promotion names the posting');
  assert.strictEqual(at([1, 1, 1, 1, 1, 1, 1]).tier, 'promoted', 'seven of seven certainly promotes');
  assert.strictEqual(at([1, 1, 0, 0, 0, 0, 0]).tier, 'retained', 'two is not three');
  assert.strictEqual(at([0, 0, 0, 0, 0, 0, 0]).title, 'RETAINED IN POST');
  assert.ok(at([0, 0, 0, 0, 0, 0, 0]).line.indexOf('Monday') >= 0, 'retention names Monday and the day shift');
  assert.strictEqual(at([1, 1, 1], 3).tier, 'dismissed', 'a death outranks any arithmetic');
  assert.strictEqual(at([1, 1, 0, 0, 0, 0, 0]).exemplary, 2, 'the letter counts its stamps');
  assert.strictEqual(at([0, 0, 0, 0, 0, 0, 0]).mean, 60, 'the letter still shows its working');
}

console.log('WEEK OK: envelope, drift surcharge, carry-over, death, rotation and verdict tiers all hold.');
