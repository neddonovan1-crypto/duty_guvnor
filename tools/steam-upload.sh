#!/usr/bin/env bash
# One command from source to a Steam depot upload.
# Needs: a Steamworks App ID and depot IDs (fill the __APPID__ placeholders
# in tools/steam/app_build.vdf), steamcmd on PATH, and a partner login.
# Usage: STEAM_USER=youraccount tools/steam-upload.sh
set -euo pipefail
cd "$(dirname "$0")/.."

if grep -q __APPID__ tools/steam/app_build.vdf; then
  echo "tools/steam/app_build.vdf still has __APPID__ placeholders —" >&2
  echo "fill in the App ID and depot IDs from the Steamworks partner site first." >&2
  exit 1
fi
: "${STEAM_USER:?set STEAM_USER to your Steamworks build account}"

tools/desktop-build.sh win
tools/desktop-build.sh linux

# steamcmd prompts for password/guard code interactively on first login,
# then caches a sentry file for CI use.
steamcmd +login "$STEAM_USER" +run_app_build "$(pwd)/tools/steam/app_build.vdf" +quit
echo "Depot upload complete. Set the build live on a branch in the Steamworks partner site."
