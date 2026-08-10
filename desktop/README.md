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

The app id is compiled into `main.js`. It used to be read from
`steam_appid.txt`, which is inside the asar in a packaged build and therefore
unreadable — that is how the achievement relay came to be silently dead in
every packaged build up to 9f4f271. The file is still shipped because
steamcmd and a Steam-free run both like to see it, but nothing depends on it.

Two more things have to hold or the relay dies quietly again, and both are
asserted in CI by `tools/check-steamworks.sh`:

- `steamworks.js` must actually be in the package. It is an
  `optionalDependency`, so a failed install is silent.
- The whole `steamworks.js` tree must be **unpacked** from the asar
  (`asarUnpack` in `package.json`). electron-builder unpacks `*.node` by
  default, but the binding dlopens `libsteam_api.so` / `steam_api64.dll` from
  its own directory — leave those sealed in the archive and `require()`
  throws, `initSteam()` swallows it, and sixteen commendations become
  unreachable with no error anywhere.

Partner-site checklist, once per app:
1. Depots → set 5018291's Operating System to **Windows**; **Add New Depot**
   5018292, Operating System **Linux**. Save.
2. Add **both** depots to the store package and the developer-comp package
   (the packages listed on the Depots page), or players get an empty install.
   Publish the depot config.
3. Cloud → **Auto-Cloud**: add root mappings so careers sync across machines
   (see Saves below).
4. Achievements: the sixteen IDs are entered on the partner site and must be
   **published** there. The game earns them on its own record either way; the
   relay to Steam only fires in a packaged build launched through the Steam
   client, from 9f4f271 onward (see above).
5. Upload with the CI workflow (below), then **set the build live on the
   default branch** on the Builds page. Uploading alone leaves the release
   checklist's launch-option item unticked, because nothing is live to check.

## Saves and Steam Cloud

Careers persist to JSON files under the Electron user-data directory, written
by `desktop/store.js` via the `window.dgStore` bridge (issue #9):

- Windows: `%APPDATA%/Duty Guvnor/saves/` (dg_hist.json, dg_career.json, …)
- Linux: `~/.config/Duty Guvnor/saves/`

Each write is fsynced before its rename and keeps one generation in a
`.json.bak`; anything that reads back damaged is moved aside as
`.json.corrupt-<stamp>` and never deleted, so a player who writes in has
something to send. Only the live saves belong in the cloud — the backups are
a local durability device and the wreckage is evidence, and syncing either
would burn the file quota for nothing.

Point Steam **Auto-Cloud** at that directory for cross-machine careers with no
API code. It is ONE root path plus an override, not one path per platform:
Valve only sync across platforms when the OS is `[All OSes]`, and a root other
than App Install Directory then needs a Root Override naming its equivalent
elsewhere. Two per-OS paths each sync into their own bucket, so a career begun
on a Windows desktop never reaches the Deck — which is most of the point.

ROOT PATHS — one row:

| Root | Subdirectory | Pattern | OS | Recursive |
|---|---|---|---|---|
| `WinAppDataRoaming` | `Duty Guvnor/saves` | `*.json` | `[All OSes]` | no |

ROOT OVERRIDES — one row, so Linux and the Deck resolve to the same place:

| Original Root | OS | New Root | Add/Replace Path | Replace Path |
|---|---|---|---|---|
| `WinAppDataRoaming` | `Linux` | `LinuxHome` | `.config` | no |

`.config` is *inserted* between the new root and the subdirectory, giving
`$HOME/.config/Duty Guvnor/saves` — hence Replace Path off. `test/packaged.js`
asserts, on each platform's own runner, that the app really does write there.

Then **publish**: the Cloud page states that changes take effect at publish
time, and an unpublished mapping syncs nothing while the store page still
advertises Steam Cloud.

Two settings on that page to leave alone. **Dynamic Cloud Sync** stays off —
it requires the Cloud API to guard against partial writes and to hear about
files changing underneath a running game, and this build uses Auto-Cloud and
implements neither; Valve's own warning on the setting is file corruption and
lost progress. **Enable cloud support for developers only** stays off too: it
hides the cloud icon and disables Auto-Cloud outright.

Quotas: twelve live files at most, the largest a suspended night at ~300 KB.
10 MB and 25 files is comfortable.

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
| `STEAM_PASSWORD` | that account's password |
| `STEAM_SHARED_SECRET` | the Steam Guard **mobile authenticator** shared secret |

The workflow mints a fresh Steam Guard code on every run from the shared
secret, so nothing expires and nothing needs re-pasting between builds. To
get the shared secret you need the mobile authenticator on the builder
account and a tool that will show you its seed (Steam Desktop Authenticator
is the usual one, and is Windows-only).

### The older cached-login-file route

`STEAM_CONFIG_VDF` — base64 of the `config.vdf` written by a local
`steamcmd` login, carrying the Guard session so CI never needs a code. The
workflow still falls back to it when no shared secret is set, and it works.
It has one real drawback: the token **expires**, and is invalidated by
signing into the account anywhere else, at which point the build fails with
`ERROR (Access Denied)` at the last step of a twenty-minute run and has to
be re-minted by hand. That is the whole argument for the TOTP route above —
not that this one is broken, but that it goes stale silently.

To mint it: `steamcmd +login <user>` (password + Guard code once), `+quit`,
then base64 `config/config.vdf` — on macOS that is under
`~/Library/Application Support/Steam/`, or wherever `HOME` pointed if you
ran steamcmd with an isolated root.

Two things learned the hard way in August 2026, both worth keeping:

- **Do not let the Steam desktop client share the directory.** steamcmd on
  macOS defaults to the same `~/Library/Application Support/Steam` as the
  client, and a login there did not persist a token at all — a second
  `steamcmd +login <user>` asked for the password again. Running it under an
  isolated `HOME` fixed that immediately and cached properly.
- **The file is portable and self-contained.** Verified by decoding the
  base64 into an otherwise empty Steam root and logging in from it: cached
  credentials, no password, no SSFN file needed. So if CI reports `Cached
  credentials not found`, suspect the secret rather than the file — check
  the "Updated" timestamp on it before regenerating anything.

Leave the "set live" input blank to upload without publishing. `prerelease`
and `beta` can be set live by the workflow.

**`default` cannot be, and is not offered.** SteamPipe refuses to set the
public branch live — steamcmd answers `ERROR! Failed to commit build for AppID
5018290 : Failure` and discards the entire build, both depots with it, so a
run that tries it uploads nothing at all. Valve requires that one to be done
by hand on the Steamworks **Builds** page, which is a reasonable place to
insist on a human: it is the branch every customer installs from. Upload with
the box blank, then set the build live there. Until something is live on
`default`, the release checklist's launch-option item stays unticked, because
there is nothing for it to look inside.

## Verification

The wrapper's file set is exercised by the ordinary harness against the
staged directory — the same five-shift desktop smoke, pointed at the
packaged files:

```
NODE_PATH=/opt/node22/lib/node_modules node test/smoke.js desktop/game/index.html
```

plus a self-containment probe that aborts and counts any non-`file://`
request (expected count: zero).
