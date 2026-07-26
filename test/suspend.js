/* Suspend-save round trip (engine side). Across many seeded shifts: play to
 * a random mid-shift point, snapshot, restore, and require (a) the restored
 * state re-snapshots byte-identical, (b) the name map is re-pointed at the
 * revived crew by identity, and (c) the restored night plays to an ending
 * without a throw. Also proves the snapshot is genuinely frozen: mutating
 * the live game after snapshotting must not leak into it. */
'use strict';
const assert = require('assert');
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

const MODES = ['short', 'standard', 'full'];
let roundTrips = 0;
for (let seed = 1; seed <= 60; seed++) {
  const rnd = mulberry32(seed * 2654435761 + 1);
  const mode = MODES[seed % 3];
  // cross-night baggage rides some seeds so flags/openers/favours are covered
  const opts = seed % 4 === 0
    ? { mode, flags: ['flag_duke_grateful', 'flag_president_grateful'], favours: 2, lastMarquee: 'horse', lastMarqueeGrade: 'good' }
    : { mode };
  const g = Engine.createGame(DATA, rnd, opts);
  const stopAt = 2 + Math.floor(rnd() * 10);
  let guard = 0;
  while (!g.over && g.turn < stopAt && guard++ < 200) step(g, rnd);
  if (g.over) continue; // died before the stop: nothing to suspend

  const snap = Engine.snapshot(g);
  const frozen = JSON.stringify(snap);

  // (immutability) play the live night onward — the snapshot must not move
  let guard2 = 0;
  while (!g.over && guard2++ < 300) step(g, rnd);
  assert.strictEqual(JSON.stringify(snap), frozen, 'seed ' + seed + ': live play leaked into the snapshot');

  // (fidelity) restore and re-snapshot: byte-identical
  const r = Engine.restore(DATA, JSON.parse(frozen));
  assert.strictEqual(JSON.stringify(Engine.snapshot(r)), frozen,
    'seed ' + seed + ': restore -> snapshot must round-trip identically');

  // (identity) the name map points at the revived crew, not at copies
  for (const part in r.nameMap) {
    const ent = r.nameMap[part];
    if (!ent.pc) continue; // an unfilled part keeps its written self
    assert.ok(r.crew.indexOf(ent.pc) >= 0,
      'seed ' + seed + ': ' + part + ' must be cast from the revived crew by identity');
  }
  assert.strictEqual(typeof r.rng, 'function', 'restored night must roll real dice');
  assert.strictEqual(r.data, DATA, 'restored night must see live data');

  // (playability) the revived night runs to an ending
  let guard3 = 0;
  while (!r.over && guard3++ < 300) step(r, rnd);
  assert.ok(r.over && r.ending, 'seed ' + seed + ': restored night never reached an ending');
  roundTrips++;
}

assert.ok(roundTrips >= 40, 'too few mid-shift round trips exercised: ' + roundTrips);
console.log('SUSPEND OK: ' + roundTrips + ' mid-shift nights frozen, revived byte-identical, and played to the end.');
