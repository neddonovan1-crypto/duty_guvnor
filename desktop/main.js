/* Duty Guvnor — desktop shell. One window, the built game loaded from disk,
 * nothing remote. Steamworks attaches only when a steam_appid.txt is present
 * so the same wrapper runs on itch, Steam, or somebody's USB stick. */
'use strict';
const { app, BrowserWindow, shell, ipcMain } = require('electron');
const path = require('path');
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
// The page found a save it could not parse. The store moves the wreck aside
// and hands back the previous generation — the one thing that must never
// happen is a blank career quietly landing on top of a recoverable one.
ipcMain.on('dg-store-recover', (ev, key) => {
  try { ev.returnValue = saves().recover(String(key)); }
  catch (e) { ev.returnValue = null; }
});

// ---- achievement unlocks (issue #10) ----
// The game decides what was earned and keeps its own record; this only
// relays the unlock to Steam when the Steamworks client is live (which
// requires steam_appid.txt AND `npm install steamworks.js` — see README).
ipcMain.on('dg-achieve', (ev, id) => {
  if (!steam || typeof id !== 'string' || !/^ACH_[A-Z_]+$/.test(id)) return;
  try {
    steam.achievement.activate(id);
  } catch (e) { /* Steam not in the mood: the game's own record stands */ }
});

// Steam: entirely optional. Launched from the Steam client the handshake
// succeeds and feats are relayed; launched from a folder (or with the
// module absent in a dev checkout) it fails quietly and the game's own
// record stands. The app id is compiled in rather than read from a file:
// inside a packaged asar there is no file to read, which is how the relay
// was silently dead in every packaged build.
const STEAM_APP_ID = 5018290;
let steam = null;
function initSteam() {
  try {
    // eslint-disable-next-line global-require
    const sw = require('steamworks.js');
    steam = sw.init(STEAM_APP_ID);
  } catch (e) {
    steam = null; // no Steam, no problem — the desk still opens
  }
}

let mainWindow = null;

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
  mainWindow = win;
  return win;
}

// One desk at a time. Steam's launcher, a desktop shortcut and the Deck's
// game list can all fire the app, and two copies sharing one save directory
// will write over each other's career. The second copy hands the window to
// the first and quits before it can touch a file.
if (!app.requestSingleInstanceLock()) {
  app.quit();
} else {
  app.on('second-instance', () => {
    if (!mainWindow || mainWindow.isDestroyed()) return;
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  });

  app.whenReady().then(() => {
    initSteam();
    createWindow();
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
}

app.on('window-all-closed', () => {
  app.quit();
});
