/* Unit test for the desktop file-backed save store (desktop/store.js).
 * Exercises the real module against a temp directory — round-trip, missing
 * key, overwrite, atomicity (no half-written file survives), key sanitising,
 * JSON payloads the size of a real career, and the durability contract that
 * matters most: a save damaged by a lost write is never silently treated as
 * an absent one. No Electron needed. */
'use strict';
const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { createStore } = require('../desktop/store');

const base = fs.mkdtempSync(path.join(os.tmpdir(), 'dg-store-'));
const dir = path.join(base, 'saves');
const store = createStore(dir);
const ls = () => fs.readdirSync(dir);

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

// ...and the generation it replaced is kept one deep
assert.strictEqual(fs.readFileSync(path.join(dir, 'dg_career.json.bak'), 'utf8'), career,
  'the previous good career must survive as a .bak');

// independent keys do not collide
store.set('dg_mode', 'full');
store.set('dg_avatar', '3');
assert.strictEqual(store.get('dg_mode'), 'full');
assert.strictEqual(store.get('dg_avatar'), '3');
assert.strictEqual(store.get('dg_career'), '{"nights":13}', 'other keys untouched by new writes');

// no temp files linger after a successful write (atomicity housekeeping)
assert.ok(!ls().some((f) => f.endsWith('.tmp')), 'no .tmp files should remain: ' + ls().join(','));

// an empty value is stored as the JSON null, never as a zero-length file —
// a zero-length file is reserved for damage, and must stay unambiguous
store.set('dg_week', '');
assert.strictEqual(fs.readFileSync(path.join(dir, 'dg_week.json'), 'utf8'), 'null',
  'clearing a slot must write four bytes, not none');
assert.strictEqual(store.get('dg_week'), 'null', 'a cleared slot reads back as null, not as damage');

// ---- the lost write: the rename landed, the bytes did not ----
// This is the power-cut save-wipe. The file exists and is empty; before the
// fsync/.bak work the game read it as "no career" and wrote a blank one over
// it at the end of the next shift.
fs.writeFileSync(path.join(dir, 'dg_career.json'), '');
assert.strictEqual(store.get('dg_career'), career,
  'a zero-length save must fall back to the generation before it');
assert.strictEqual(store.get('dg_career'), career, 'and stay recovered on the next read');
assert.ok(ls().some((f) => f.indexOf('dg_career.json.corrupt-') === 0),
  'the damaged file must be kept aside, not deleted: ' + ls().join(','));

// ---- bytes that are there but make no sense ----
// The store cannot know what parses, so the reader (src/ui.js) tells it.
store.set('dg_hist', '{"seen":["a"]}');
store.set('dg_hist', '{"seen":["a","b"]}');
fs.writeFileSync(path.join(dir, 'dg_hist.json'), '{"seen":["a","b"'); // truncated
assert.strictEqual(store.recover('dg_hist'), '{"seen":["a"]}',
  'recover() must hand back the previous generation');
assert.strictEqual(store.get('dg_hist'), '{"seen":["a"]}', 'and promote it in place');

// nothing to fall back to: recovery is honest about it, and still quarantines
fs.writeFileSync(path.join(dir, 'dg_ach.json'), '{"ACH_');
assert.strictEqual(store.recover('dg_ach'), null, 'no .bak means no recovery');
assert.strictEqual(store.get('dg_ach'), null, 'and the slot reads empty afterwards');
assert.ok(ls().some((f) => f.indexOf('dg_ach.json.corrupt-') === 0),
  'even unrecoverable wreckage is kept for support: ' + ls().join(','));

// recovering a key that was never written is a no-op, not a throw
assert.strictEqual(store.recover('dg_never'), null);

// a key with path characters cannot escape the saves directory
store.set('../escape', 'nope');
assert.ok(ls().some((f) => f.indexOf('escape') >= 0), 'sanitised key stays in saves dir');
assert.ok(!fs.existsSync(path.join(base, 'escape.json')), 'must not write outside saves dir');
assert.strictEqual(fs.existsSync(dir), true);

// a fresh store over the same dir sees the persisted values (survives restart)
const reopened = createStore(dir);
assert.strictEqual(reopened.get('dg_mode'), 'full', 'values persist across store instances');
assert.strictEqual(reopened.get('dg_career'), career, 'and sees the recovered career too');

fs.rmSync(base, { recursive: true, force: true });
console.log('STORE OK: saves round-trip, keep a generation back, survive a lost write, ' +
  'quarantine damage, isolate keys, stay in-dir, and persist.');
