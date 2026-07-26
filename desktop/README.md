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

The app is registered. App ID and depots are filled into
`tools/steam/app_build.vdf` and `desktop/steam_appid.txt`:

| | ID |
|---|---|
| App | 5018290 |
| Windows depot | 5018291 (the default "Duty Guvnor Content" depot, OS set to Windows) |
| Linux depot | 5018292 (added via "Add New Depot", OS set to Linux) |

`steam_appid.txt`'s presence is what turns the Steamworks integration on;
without it the wrapper runs Steam-free (e.g. for itch builds).

Partner-site checklist, once per app:
1. Depots → set 5018291's Operating System to **Windows**; **Add New Depot**
   5018292, Operating System **Linux**. Save.
2. Add **both** depots to the store package and the developer-comp package
   (the packages listed on the Depots page), or players get an empty install.
   Publish the depot config.
3. Cloud → **Auto-Cloud**: add root mappings so careers sync across machines
   (see Saves below).
4. When ready for achievements: `cd desktop && npm install steamworks.js` —
   `main.js` picks it up automatically behind the `steam_appid.txt` flag and
   exposes the client to the achievement bridge (issue #10).
5. Upload: `STEAM_USER=account tools/steam-upload.sh` (steamcmd on PATH;
   first login prompts for the guard code, then caches a sentry for CI).

## Saves and Steam Cloud

Careers persist to JSON files under the Electron user-data directory, written
by `desktop/store.js` via the `window.dgStore` bridge (issue #9):

- Windows: `%APPDATA%/Duty Guvnor/saves/` (dg_hist.json, dg_career.json, …)
- Linux: `~/.config/Duty Guvnor/saves/`

Point Steam **Auto-Cloud** at that directory for cross-machine careers with no
API code:

- Windows: root `WinAppDataRoaming`, subdirectory `Duty Guvnor/saves`, pattern `*`
- Linux: root `LinuxHome`, subdirectory `.config/Duty Guvnor/saves`, pattern `*`

On first desktop run the store adopts any career begun in the browser build
(same profile), so an early web player is not orphaned by the download.

## CI: build + upload from GitHub (no local toolchain)

`.github/workflows/steam-build.yml` builds the Windows and Linux apps on
GitHub's runners and uploads both to the depots. It runs only when you press
**Run workflow** in the Actions tab (never on a push). Two repo secrets are
needed (Settings → Secrets and variables → Actions):

| Secret | What it is |
|---|---|
| `STEAM_USERNAME` | the Steam account used to build |
| `STEAM_CONFIG_VDF` | base64 of `config.vdf` from one local `steamcmd` login, which carries the Steam Guard session so CI never needs the code |

Mint `STEAM_CONFIG_VDF` once: install steamcmd, `steamcmd +login <user>` (enter
password + Guard code once), `+quit`; then base64 the resulting
`config/config.vdf` and paste it as the secret. If Steam Guard later expires
the session, re-mint it the same way (a dedicated builder account with email
Guard is the stable choice for regular CI).

Leave the "set live" input blank to upload without publishing; set it live on
a branch from the Steamworks partner site (or type a branch name to have the
workflow do it).

## Verification

The wrapper's file set is exercised by the ordinary harness against the
staged directory — the same five-shift desktop smoke, pointed at the
packaged files:

```
NODE_PATH=/opt/node22/lib/node_modules node test/smoke.js desktop/game/index.html
```

plus a self-containment probe that aborts and counts any non-`file://`
request (expected count: zero).
