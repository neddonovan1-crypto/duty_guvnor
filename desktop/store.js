/* Pure file-backed key/value store for the desktop shell. No Electron
 * dependency, so it is unit-testable on its own; main.js wires it to IPC
 * and the user-data directory. One JSON file per key under a base dir.
 * Steam Auto-Cloud maps the base dir for free careers.
 *
 * Durability is most of the job here: a career is months of nights and the
 * player has exactly one copy. Writes go temp-then-rename with the bytes
 * fsynced BEFORE the rename and the directory fsynced after it. Without
 * those, a power cut can land the rename and lose the contents, leaving a
 * zero-length save — which reads back as "no career", and the end of the
 * next shift writes over the wreck. Every write also keeps one generation
 * in a .bak, and nothing damaged is ever deleted: it is moved aside under
 * its own dated name so a player who writes to support has something to
 * send.
 */
'use strict';
const path = require('path');
const fs = require('fs');

function createStore(baseDir) {
  function ensure() {
    try { fs.mkdirSync(baseDir, { recursive: true }); } catch (e) { /* already there */ }
    return baseDir;
  }
  // keys are our own fixed set (dg_hist, dg_career, dg_avatar, dg_mode…);
  // sanitise anyway so a key can never climb out of the base directory
  function file(key) {
    return path.join(ensure(), String(key).replace(/[^a-z0-9_]/gi, '_') + '.json');
  }

  // A directory entry created by rename is not durable until the directory
  // itself is synced. Windows refuses to open a directory for reading at
  // all, and does not need this — so a failure here is expected, not an
  // error.
  function syncDir() {
    var fd = null;
    try { fd = fs.openSync(baseDir, 'r'); fs.fsyncSync(fd); } catch (e) { /* see above */ }
    if (fd !== null) { try { fs.closeSync(fd); } catch (e) { /* ditto */ } }
  }

  function read(f) {
    try { return fs.readFileSync(f, 'utf8'); } catch (e) { return null; }
  }

  // Write bytes to a scratch file and get them onto the platter. Returns the
  // path on success and null if the disk refused, having cleaned up after
  // itself — the caller decides what to do about it, but must not be handed
  // a half-written file to rename into place.
  function stage(to, s) {
    var fd = null;
    try {
      fd = fs.openSync(to, 'w');
      fs.writeFileSync(fd, s);
      fs.fsyncSync(fd);
      fs.closeSync(fd);
      return to;
    } catch (e) {
      if (fd !== null) { try { fs.closeSync(fd); } catch (e2) { /* already gone */ } }
      try { fs.unlinkSync(to); } catch (e3) { /* never got made */ }
      return null;
    }
  }

  // Put damage beyond reach of the next write and hand back the generation
  // before it, if one survived.
  //
  // Order matters more than it looks. The restore is staged FIRST, because
  // writing needs free blocks and can fail, while renaming needs none and
  // cannot. Quarantine first and a full disk (or a kill between the two
  // steps) leaves the slot with no live file at all — which used to read
  // back as a fresh career and get written over on the next shift. The two
  // renames that follow are the only things standing between the player and
  // their career, and neither can run out of anything.
  function salvage(key) {
    var f = file(key), bak = f + '.bak';
    var prev = read(bak);
    var have = prev != null && prev !== '';
    var staged = have ? stage(f + '.salv', prev) : null;
    try { fs.renameSync(f, f + '.corrupt-' + Date.now()); } catch (e) { /* nothing to move */ }
    if (staged) {
      try { fs.renameSync(staged, f); syncDir(); }
      catch (e) { /* read-only disk: the value still returns to the caller */ }
    }
    return have ? prev : null;
  }

  return {
    get: function (key) {
      var f = file(key);
      var cur = read(f);
      // No live file. Usually a fresh career — but it is also what a failed
      // restore or an over-eager cleaner leaves behind, and a .bak sitting
      // next to the hole is proof there was a career here. Never start blank
      // while a generation survives on disk.
      if (cur == null) return fs.existsSync(f + '.bak') ? salvage(key) : null;
      // Zero length is never something we wrote — set() stores the four
      // bytes 'null' for an empty value precisely so that an empty FILE can
      // only mean a write that lost its contents.
      if (cur === '') return salvage(key);
      return cur;
    },
    // The reader found bytes it could not parse. Same treatment as an empty
    // file: aside with the wreck, and back a generation.
    recover: function (key) { return salvage(key); },
    // Returns true only if the bytes are on the platter. The caller may be
    // about to drop the only other copy — see suspendNight in src/ui.js —
    // so "it didn't land" has to be answerable, not swallowed.
    set: function (key, val) {
      var f = file(key), bak = f + '.bak';
      var s = String(val);
      if (s === '') s = 'null'; // see get(): an empty file means damage
      if (!stage(f + '.tmp', s)) return false;
      // One generation back, taken before the new one lands, and itself
      // written temp-then-rename so a crash mid-copy cannot shred it. A
      // zero-length live file is damage, not a generation: copying that over
      // the .bak would destroy the last good copy on the way to replacing it.
      try {
        var old = read(f);
        if (old != null && old !== '' && stage(bak + '.tmp', old)) {
          fs.renameSync(bak + '.tmp', bak);
        }
      } catch (e) { /* no previous good copy to keep */ }
      try {
        fs.renameSync(f + '.tmp', f);
        syncDir();
        return true;
      } catch (e) {
        try { fs.unlinkSync(f + '.tmp'); } catch (e2) { /* leave it */ }
        return false;
      }
    },
  };
}

module.exports = { createStore };
