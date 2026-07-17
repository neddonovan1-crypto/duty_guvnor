# Duty Guvnor — desktop shell

Electron wrapper around the built game. The packaged app is fully
self-contained: game, fonts, avatars and assets all load from disk, and the
window makes no network requests at all (proven by the harness — see below).

## Running locally

```
tools/desktop-build.sh stage   # build the game and refresh desktop/game/
cd desktop
npm install                    # first time only — downloads the Electron binary
npm start
```

Note: `npm install` needs ordinary internet egress (the Electron binary comes
from GitHub releases). In restricted environments install with
`ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install` to get the JS dependencies and
lockfile only.

## Packaging

```
tools/desktop-build.sh win     # NSIS installer + portable exe -> desktop/dist/
tools/desktop-build.sh linux   # plain directory (what the Steam runtime wants)
```

## Steam

1. Create the app in the Steamworks partner site; note the App ID and the two
   depot IDs (Windows, Linux).
2. Fill the `__APPID__` / `__DEPOT_WIN__` / `__DEPOT_LINUX__` placeholders in
   `tools/steam/app_build.vdf`, and put the App ID in `desktop/steam_appid.txt`
   (that file's presence is what turns the Steamworks integration on; without
   it the wrapper runs Steam-free, e.g. for itch builds).
3. When ready for the API: `cd desktop && npm install steamworks.js` — the
   main process picks it up automatically, and `main.js` exposes the client to
   the save/achievement bridges as they land (issues #9, #10).
4. Upload: `STEAM_USER=account tools/steam-upload.sh` (steamcmd on PATH;
   first login prompts for the guard code, then caches a sentry for CI).

## Verification

The wrapper's file set is exercised by the ordinary harness against the
staged directory — the same five-shift desktop smoke, pointed at the
packaged files:

```
NODE_PATH=/opt/node22/lib/node_modules node test/smoke.js desktop/game/index.html
```

plus a self-containment probe that aborts and counts any non-`file://`
request (expected count: zero).
