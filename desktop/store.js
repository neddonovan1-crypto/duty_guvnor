/* Pure file-backed key/value store for the desktop shell. No Electron
 * dependency, so it is unit-testable on its own; main.js wires it to IPC
 * and the user-data directory. One JSON file per key under a base dir;
 * writes go temp-then-rename so a crash mid-write never leaves a
 * half-written save. Steam Auto-Cloud maps the base dir for free careers. */
'use strict';
const path = require('path');
const fs = require('fs');

function createStore(baseDir) {
  function ensure() {
    try { fs.mkdirSync(baseDir, { recursive: true }); } catch (e) { /* already there */ }
    return baseDir;
  }
  // keys are our own fixed set (dg_hist, dg_career, dg_avatar, dg_mode);
  // sanitise anyway so a key can never climb out of the base directory
  function file(key) {
    return path.join(ensure(), String(key).replace(/[^a-z0-9_]/gi, '_') + '.json');
  }
  return {
    get: function (key) {
      try { return fs.readFileSync(file(key), 'utf8'); }
      catch (e) { return null; } // no file yet: a fresh career
    },
    set: function (key, val) {
      var f = file(key), tmp = f + '.tmp';
      fs.writeFileSync(tmp, String(val));
      fs.renameSync(tmp, f);
    },
  };
}

module.exports = { createStore };
