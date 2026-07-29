/* Bridge between the game page and the desktop shell. Exposes a synchronous
 * key/value store (window.dgStore) backed by JSON files in the Electron
 * user-data directory, so the game's existing save code in src/ui.js — shaped
 * for localStorage — persists to disk instead: durable across reinstalls and
 * mappable by Steam Cloud. The sandbox keeps Node out of the page, so the
 * actual file access happens in the main process over IPC.
 *
 * The save/achievement bridges (issues #9, #10) expose their narrow APIs here. */
'use strict';
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('dgStore', {
  // Reads are rare — a parade, an end of shift — so a blocking round-trip to
  // the main process costs nothing the player can feel, and keeps the game's
  // synchronous save code exactly as it is on the web.
  get: function (key) {
    try {
      var v = ipcRenderer.sendSync('dg-store-get', String(key));
      return typeof v === 'string' ? v : null;
    } catch (e) {
      return null;
    }
  },
  // Writes block until the bytes are on the platter and report whether they
  // landed. Fire-and-forget was cheaper, but the game sometimes writes a
  // thing and then drops its only other copy — suspending a night parks it
  // on disk and clears it from memory — and a caller that cannot be told
  // "the disk said no" will do that over a failed write. Writes happen at a
  // parade, an end of shift, a suspend: never often enough to feel.
  set: function (key, val) {
    try {
      return ipcRenderer.sendSync('dg-store-set', { key: String(key), val: String(val) }) === true;
    } catch (e) {
      return false; // channel gone: nothing to do but keep the in-memory copy
    }
  },
  // The game read bytes it could not parse. Ask the shell to put the damage
  // aside and return the generation before it; null means there is genuinely
  // nothing left, and only then does a blank career start.
  recover: function (key) {
    try {
      var v = ipcRenderer.sendSync('dg-store-recover', String(key));
      return typeof v === 'string' ? v : null;
    } catch (e) {
      return null;
    }
  },
});

// Achievement unlocks (issue #10). Fire-and-forget: the game keeps its own
// earned record; this only tells Steam. Without Steam it lands in a no-op.
contextBridge.exposeInMainWorld('dgAchieve', {
  unlock: function (id) {
    try { ipcRenderer.send('dg-achieve', String(id)); } catch (e) { /* no-op */ }
  },
});

// The desktop tell. THE WEEK (issue #4) parades only where this flag flies:
// the web build never sees it, so the campaign stays a Steam matter.
contextBridge.exposeInMainWorld('dgDesktop', true);
