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
  // Writes are fire-and-forget: the disk lags the game by a tick, and a
  // dropped write costs at most the last decision, never the career.
  set: function (key, val) {
    try {
      ipcRenderer.send('dg-store-set', { key: String(key), val: String(val) });
    } catch (e) {
      /* channel gone: nothing to do but keep the in-memory copy */
    }
  },
});
