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

  // Put damage beyond reach of the next write and hand back the generation
  // before it, if one survived.
  function salvage(key) {
    var f = file(key), bak = f + '.bak';
    try { fs.renameSync(f, f + '.corrupt-' + Date.now()); } catch (e) { /* nothing to move */ }
    var prev = read(bak);
    if (prev == null || prev === '') return null;
    try { fs.copyFileSync(bak, f); syncDir(); } catch (e) { /* read-only disk: the value still returns */ }
    return prev;
  }

  return {
    get: function (key) {
      var cur = read(file(key));
      if (cur == null) return null; // no file yet: a fresh career
      // Zero length is never something we wrote — set() stores the four
      // bytes 'null' for an empty value precisely so that an empty FILE can
      // only mean a write that lost its contents.
      if (cur === '') return salvage(key);
      return cur;
    },
    // The reader found bytes it could not parse. Same treatment as an empty
    // file: aside with the wreck, and back a generation.
    recover: function (key) { return salvage(key); },
    set: function (key, val) {
      var f = file(key), tmp = f + '.tmp', bak = f + '.bak';
      var s = String(val);
      if (s === '') s = 'null'; // see get(): an empty file means damage
      var fd = fs.openSync(tmp, 'w');
      try {
        fs.writeFileSync(fd, s);
        fs.fsyncSync(fd);
      } finally { fs.closeSync(fd); }
      // one generation back, taken before the new one lands, and itself
      // written temp-then-rename so a crash mid-copy cannot shred it
      try {
        if (fs.existsSync(f)) {
          fs.copyFileSync(f, bak + '.tmp');
          fs.renameSync(bak + '.tmp', bak);
        }
      } catch (e) { /* no previous good copy to keep */ }
      fs.renameSync(tmp, f);
      syncDir();
    },
  };
}

module.exports = { createStore };
