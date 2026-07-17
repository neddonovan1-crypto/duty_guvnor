/* Duty Guvnor — desktop shell. One window, the built game loaded from disk,
 * nothing remote. Steamworks attaches only when a steam_appid.txt is present
 * so the same wrapper runs on itch, Steam, or somebody's USB stick. */
'use strict';
const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const fs = require('fs');

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
