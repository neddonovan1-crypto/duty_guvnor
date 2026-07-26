/* Duty Guvnor — desktop shell. One window, the built game loaded from disk,
 * nothing remote. Steamworks attaches only when a steam_appid.txt is present
 * so the same wrapper runs on itch, Steam, or somebody's USB stick. */
'use strict';
const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');
const { createStore } = require('./store');

// ---- file-backed save store (issue #9) ----
// The game's save code (src/ui.js) is shaped for localStorage; on the desktop
// it talks to window.dgStore (see preload.js), which lands here over IPC and
// persists to JSON files under <userData>/saves. Steam Auto-Cloud maps that
// directory (see README.md) for cross-machine careers with no API code.
let saveStore = null;
function saves() {
  // lazy: app.getPath is only valid once the app is ready, and the handlers
  // below never fire before the window (and its page) exist
  if (!saveStore) saveStore = createStore(path.join(app.getPath('userData'), 'saves'));
  return saveStore;
}
ipcMain.on('dg-store-get', (ev, key) => {
  try { ev.returnValue = saves().get(String(key)); }
  catch (e) { ev.returnValue = null; }
});
ipcMain.on('dg-store-set', (ev, msg) => {
  if (!msg || typeof msg.key !== 'string') return;
  try { saves().set(msg.key, msg.val); }
  catch (e) { /* disk full or read-only: the game keeps its in-memory copy */ }
});

// Steam: entirely optional. The module and the appid file both have to be
// there; otherwise the game neither knows nor cares.
let steam = null;
function initSteam() {
  try {
    const appidFile = path.join(__dirname, 'steam_appid.txt');
    if (!fs.existsSync(appidFile)) return;
    const appId = parseInt(fs.readFileSync(appidFile, 'utf8').trim(), 10);
    if (!appId) return;
    // eslint-disable-next-line global-require
    const sw = require('steamworks.js');
    steam = sw.init(appId);
  } catch (e) {
    steam = null; // no Steam, no problem — the desk still opens
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 1024,
    minHeight: 700,
    autoHideMenuBar: true,
    backgroundColor: '#0d0a07',
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // The game is local files, full stop: no navigation, no popups, and any
  // external URL that somehow appears goes to the system browser, not us.
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (/^https?:/i.test(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  win.webContents.on('will-navigate', (ev, url) => {
    if (!url.startsWith('file://')) ev.preventDefault();
  });

  win.loadFile(path.join(__dirname, 'game', 'index.html'));

  // F11 for fullscreen, the traditional way.
  win.webContents.on('before-input-event', (ev, input) => {
    if (input.type === 'keyDown' && input.key === 'F11') {
      win.setFullScreen(!win.isFullScreen());
      ev.preventDefault();
    }
  });
  return win;
}

app.whenReady().then(() => {
  initSteam();
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  app.quit();
});
