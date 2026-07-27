/* Unit test for the achievement predicates (src/achievements.js): each one
 * fires exactly when its feat is real, stays quiet before, and never fires
 * twice once recorded. Pure contexts, no DOM, no Steam. */
'use strict';
const assert = require('assert');
const A = require('../src/achievements');

const IDS = A.LIST.map((a) => a.id);
assert.strictEqual(new Set(IDS).size, IDS.length, 'achievement ids must be unique');
A.LIST.forEach((a) => {
  assert.ok(/^ACH_[A-Z_]+$/.test(a.id), a.id + ': id shape');
  assert.ok(a.name && a.desc, a.id + ': needs name and desc for the Steamworks config');
});

const blankCareer = { nights: 0, survived: 0, deaths: {}, streak: 0, bestStreak: 0, sagas: [] };
const base = (over) => ({
  state: null, career: JSON.parse(JSON.stringify(blankCareer)), ledgerLen: 3,
  storylineIds: ['horse', 'docks', 'mp'],
  ...over,
});
const fires = (ctx) => A.evaluate(ctx, {});

// a fresh slate earns nothing
assert.deepStrictEqual(fires(base()), [], 'blank slate must earn nothing');

// survival + streak + commendation ride the career record
assert.ok(fires(base({ career: { ...blankCareer, survived: 1 } })).includes('ACH_FIRST_WATCH'));
assert.ok(!fires(base({ career: { ...blankCareer, bestStreak: 4 } })).includes('ACH_OLD_SWEAT'));
assert.ok(fires(base({ career: { ...blankCareer, bestStreak: 5 } })).includes('ACH_OLD_SWEAT'));
assert.ok(fires(base({ career: { ...blankCareer, commendations: 1 } })).includes('ACH_COMMENDED'));

// shift-end feats need a survived ending on the live state
const debrief = { over: true, ending: { kind: 'debrief' }, mode: 'short' };
assert.ok(fires(base({ state: debrief })).includes('ACH_SHORT_HANDED'));
assert.ok(!fires(base({ state: { ...debrief, ending: { kind: 'disaster' } } })).includes('ACH_SHORT_HANDED'),
  'a MINIMUM STRENGTH death is not a survival');
assert.ok(fires(base({ state: { ...debrief, mode: 'standard' }, ledgerLen: 0 })).includes('ACH_QUIET_NIGHT'));
assert.ok(!fires(base({ state: { ...debrief, mode: 'standard' }, ledgerLen: 1 })).includes('ACH_QUIET_NIGHT'));

// mid-shift feats
assert.ok(fires(base({ state: { lastGamble: 'won', lastOdds: 85 } })).includes('ACH_BACKED_HILT'));
assert.ok(!fires(base({ state: { lastGamble: 'won', lastOdds: 84 } })).includes('ACH_BACKED_HILT'));
assert.ok(!fires(base({ state: { lastGamble: 'lost', lastOdds: 95 } })).includes('ACH_BACKED_HILT'),
  'a lost gamble at high odds earns sympathy, not an achievement');
assert.ok(fires(base({ state: { assistUsed: true } })).includes('ACH_URGENT_ASSISTANCE'));
assert.ok(fires(base({ state: { callsUsed: { spg: true, dogs: true, cid: true } } })).includes('ACH_EVERY_FAVOUR'));
assert.ok(!fires(base({ state: { callsUsed: { spg: true, dogs: true } } })).includes('ACH_EVERY_FAVOUR'));

// the sorrowful set: one disaster of each flavour
assert.ok(fires(base({ career: { ...blankCareer, deaths: { streets: 1, brass: 2, relief: 1 } } })).includes('ACH_ALL_SORROWS'));
assert.ok(!fires(base({ career: { ...blankCareer, deaths: { streets: 5, brass: 3 } } })).includes('ACH_ALL_SORROWS'));
assert.ok(fires(base({ career: { ...blankCareer, deaths: { dismissed: 1 } } })).includes('ACH_DISMISSED'));

// the casebook
assert.ok(fires(base({ career: { ...blankCareer, sagaGrades: { horse: 'good' } } })).includes('ACH_CASE_CLOSED'));
assert.ok(!fires(base({ career: { ...blankCareer, sagaGrades: { horse: 'mixed' } } })).includes('ACH_CASE_CLOSED'));
assert.ok(fires(base({ career: { ...blankCareer, sagaGrades: { horse: 'good', docks: 'good', mp: 'good' } } }))
  .includes('ACH_WHOLE_CASEBOOK'));
assert.ok(!fires(base({ career: { ...blankCareer, sagaGrades: { horse: 'good', docks: 'good', mp: 'mixed' } } }))
  .includes('ACH_WHOLE_CASEBOOK'));
assert.ok(!fires(base({ storylineIds: [], career: { ...blankCareer, sagaGrades: {} } })).includes('ACH_WHOLE_CASEBOOK'),
  'an empty saga pool must not auto-award the casebook');

// the hidden set
assert.ok(fires(base({ career: { ...blankCareer, deaths: { streets: 2, brass: 1, relief: 1, dismissed: 1 } } }))
  .includes('ACH_OTHER_CAREERS'), 'five letters of any flavour add up');
assert.ok(!fires(base({ career: { ...blankCareer, deaths: { streets: 2, brass: 2 } } })).includes('ACH_OTHER_CAREERS'));
assert.ok(fires(base({ career: { ...blankCareer, commendations: 5 } })).includes('ACH_QPM'));
assert.ok(!fires(base({ career: { ...blankCareer, commendations: 4 } })).includes('ACH_QPM'));
const scraped = { over: true, ending: { kind: 'debrief' }, mode: 'standard', meters: { streets: 4, brass: 60, relief: 55 } };
assert.ok(fires(base({ state: scraped })).includes('ACH_SKIN_TEETH'), 'a meter at 4 is the skin of the teeth');
assert.ok(!fires(base({ state: { ...scraped, meters: { streets: 5, brass: 60, relief: 55 } } })).includes('ACH_SKIN_TEETH'),
  'five is not under five');
assert.ok(!fires(base({ state: { ...scraped, over: true, ending: { kind: 'disaster' }, meters: { streets: 0, brass: 60, relief: 55 } } }))
  .includes('ACH_SKIN_TEETH'), 'zero is not close to the edge, it is over it');
assert.ok(fires(base({ state: { soloHandled: true } })).includes('ACH_HANDLED_PERSONALLY'));
assert.ok(!fires(base({ state: { soloHandled: false } })).includes('ACH_HANDLED_PERSONALLY'));

// already-earned feats stay earned and silent
const ctx = base({ career: { ...blankCareer, survived: 3 } });
assert.deepStrictEqual(A.evaluate(ctx, { ACH_FIRST_WATCH: true }), [], 'no refiring once recorded');

// a predicate that throws must not take the evaluator down
const hostile = base({ career: null });
assert.doesNotThrow(() => A.evaluate({ ...hostile, career: {} }, {}), 'evaluator must survive odd state');

console.log('ACHIEVEMENTS OK: ' + A.LIST.length + ' feats — fire when real, silent before, never twice.');
