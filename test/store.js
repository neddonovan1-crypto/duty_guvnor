/* Unit test for the desktop file-backed save store (desktop/store.js).
 * Exercises the real module against a temp directory — round-trip, missing
 * key, overwrite, atomicity (no half-written file survives), key sanitising,
 * and JSON payloads the size of a real career. No Electron needed. */
'use strict';
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { createStore } = require('../desktop/store');

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'dg-store-'));
const store = createStore(path.join(base, 'saves'));

// missing key reads as null, not a throw
assert.strictEqual(store.get('dg_hist'), null, 'missing key should be null');

// round-trip a realistic career blob
const career = JSON.stringify({
  nights: 12, survived: 4, deaths: { streets: 5, brass: 2, relief: 1 },
  best: { title: 'A GRUDGING NOD', avg: 61 }, streak: 2, bestStreak: 3,
  sagaGrades: { horse: 'good', docks: 'mixed', ira: 'poor' },
});
store.set('dg_career', career);
assert.strictEqual(store.get('dg_career'), career, 'career must round-trip byte-for-byte');

// overwrite replaces, does not append
store.set('dg_career', '{"nights":13}');
assert.strictEqual(store.get('dg_career'), '{"nights":13}', 'overwrite must replace');

// independent keys do not collide
store.set('dg_mode', 'full');
store.set('dg_avatar', '3');
assert.strictEqual(store.get('dg_mode'), 'full');
assert.strictEqual(store.get('dg_avatar'), '3');
assert.strictEqual(store.get('dg_career'), '{"nights":13}', 'other keys untouched by new writes');

// no temp files linger after a successful write (atomicity housekeeping)
const files = fs.readdirSync(path.join(base, 'saves'));
assert.ok(!files.some((f) => f.endsWith('.tmp')), 'no .tmp files should remain: ' + files.join(','));

// a key with path characters cannot escape the saves directory
store.set('../escape', 'nope');
const after = fs.readdirSync(path.join(base, 'saves'));
assert.ok(after.some((f) => f.indexOf('escape') >= 0), 'sanitised key stays in saves dir');
assert.ok(!fs.existsSync(path.join(base, 'escape.json')), 'must not write outside saves dir');
assert.strictEqual(fs.existsSync(path.join(base, 'saves')), true);

// a fresh store over the same dir sees the persisted values (survives restart)
const reopened = createStore(path.join(base, 'saves'));
assert.strictEqual(reopened.get('dg_mode'), 'full', 'values persist across store instances');

fs.rmSync(base, { recursive: true, force: true });
console.log('STORE OK: file-backed saves round-trip, overwrite, isolate keys, stay in-dir, and persist.');
