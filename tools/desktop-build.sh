#!/usr/bin/env bash
# Build the game, stage it into the desktop wrapper, and package.
# Usage: tools/desktop-build.sh [win|linux|stage]
#   stage  — build the game and refresh desktop/game/ only (no packaging)
set -euo pipefail
cd "$(dirname "$0")/.."

node build.js

rm -rf desktop/game
mkdir -p desktop/game
cp -r public/. desktop/game/

case "${1:-stage}" in
  stage)
    echo "Staged: desktop/game/ is current. Run desktop/ with 'npm start' or package with 'win'/'linux'."
    ;;
  win)
    (cd desktop && npx electron-builder --win)
    ;;
  linux)
    (cd desktop && npx electron-builder --linux)
    ;;
  *)
    echo "unknown target: $1 (want win, linux, or stage)" >&2
    exit 1
    ;;
esac
