/* Duty Guvnor — desktop shell. One window, the built game loaded from disk,
 * nothing remote. Steamworks attaches only when a steam_appid.txt is present
 * so the same wrapper runs on itch, Steam, or somebody's USB stick. */
'use strict';
const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
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
// The answer travels back because the page acts on it: a night being parked
// on disk is cleared from memory the moment this returns true, so a false
// has to be a false and not a silence.
ipcMain.on('dg-store-set', (ev, msg) => {
  if (!msg || typeof msg.key !== 'string') { ev.returnValue = false; return; }
  try { ev.returnValue = saves().set(msg.key, msg.val) !== false; }
  catch (e) { ev.returnValue = false; /* disk full or read-only: the game keeps its in-memory copy */ }
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

// The overlay is what makes an unlock visible. Steam draws the toast itself,
// into our window — so with this never called, a feat could be recorded
// perfectly on Valve's side and the player would see nothing happen, and
// Shift+Tab would do nothing either. It has to run before the app is ready
// (it appends Chromium switches the GPU process reads at startup) and before
// any window exists (it hooks browser-window-created), which is why it sits
// out here rather than alongside initSteam.
//
// Gated on the environment Steam puts us in: the switches force a shared GPU
// process and the invalidator repaints at 60fps, and neither is worth paying
// for in the itch build, a folder copy, or a CI runner with no overlay to
// draw. Under the client both variables are set.
function enableOverlay() {
  if (!process.env.SteamAppId && !process.env.SteamGameId) return;
  try {
    // eslint-disable-next-line global-require
    require('steamworks.js').electronEnableSteamOverlay();
  } catch (e) { /* no module, no overlay — the game is unaffected */ }
}
enableOverlay();

let mainWindow = null;

// The desk is drawn at 1280x800 and stops growing there, so on a big screen
// it would sit as a small island in a lot of dark: 45% of a 1440p monitor,
// 30% of a 4K one. Zooming the page is the right lever rather than letting
// the layout sprawl — everything scales together, the type stays vector and
// the polaroids stay pixel-art. The factor is whatever makes the design size
// fill the shortest dimension, never below 1 (small screens have their own
// CSS tiers and must not be shrunk into them).
// On a Retina display the bounds arrive already in logical pixels, so a
// MacBook reports 1280x800 and correctly gets no zoom at all.
const DESIGN_W = 1280, DESIGN_H = 800;
function fitZoom(win) {
  if (!win || win.isDestroyed()) return;
  try {
    const b = win.getContentBounds();
    const z = Math.min(b.width / DESIGN_W, b.height / DESIGN_H);
    win.webContents.setZoomFactor(Math.max(1, Math.min(z, 3)));
  } catch (e) { /* window going away mid-resize */ }
}

// Fullscreen by default — it is a game, and on the Deck there is no other
// sensible state. But a player who puts it in a window means it, so the
// choice is remembered rather than re-imposed every launch.
function wantsFullScreen() {
  try { return saves().get('dg_fullscreen') !== '0'; } catch (e) { return true; }
}
function rememberFullScreen(on) {
  try { saves().set('dg_fullscreen', on ? '1' : '0'); } catch (e) { /* read-only disk */ }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 850,
    minWidth: 1024,
    minHeight: 700,
    fullscreen: wantsFullScreen(),
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

  // the zoom is re-fitted whenever the canvas changes size, and once the
  // page exists so the first paint is already at the right scale
  win.webContents.on('did-finish-load', () => fitZoom(win));
  win.on('resize', () => fitZoom(win));
  win.on('enter-full-screen', () => { fitZoom(win); rememberFullScreen(true); });
  win.on('leave-full-screen', () => { fitZoom(win); rememberFullScreen(false); });

  // F11 for fullscreen, the traditional way. Escape leaves it, which is what
  // everybody tries first; it does nothing when the window is already one.
  win.webContents.on('before-input-event', (ev, input) => {
    if (input.type !== 'keyDown') return;
    if (input.key === 'F11') {
      win.setFullScreen(!win.isFullScreen());
      ev.preventDefault();
    } else if (input.key === 'Escape' && win.isFullScreen()) {
      win.setFullScreen(false);
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
    // No menu on the shipped platforms. autoHideMenuBar only stops it being
    // drawn — the accelerators behind it stay live, and Ctrl+R reloads the
    // page, which throws away a night in progress with no warning and no way
    // back. Ctrl+Shift+I goes with it. macOS keeps its menu: that build is
    // for testing on the guvnor's own machine, and taking Cmd+Q off a Mac
    // app is worse than anything it would prevent.
    if (process.platform !== 'darwin') Menu.setApplicationMenu(null);
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
