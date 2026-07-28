#!/usr/bin/env bash
# Prove the Steam relay is actually in the package.
#
# steamworks.js is an optionalDependency: if its native prebuild fails to
# install, npm carries on without a word and electron-builder packages a game
# whose achievements can never fire. That is exactly how every build before
# 9f4f271 shipped with sixteen dead commendations, and it is invisible unless
# something looks. This is the something.
#
#   check-steamworks.sh <resources-dir> <asar-listing>
#
# The JS half lives inside app.asar. The native binding CANNOT: it dlopens
# libsteam_api.so / steam_api64.dll from its own directory, so the whole
# steamworks.js tree has to be unpacked to disk (asarUnpack in package.json).
# electron-builder only unpacks *.node by default, which leaves the shared
# library sealed in the archive and the require() throwing — dead achievements
# again, by a different route. So check for the library, not just the binding.
set -euo pipefail
RES="$1"
LISTING="$2"

if ! grep -q "/node_modules/steamworks.js/" "$LISTING"; then
  echo "STEAMWORKS NOT PACKAGED: no node_modules/steamworks.js in app.asar."
  echo "Achievements would be dead in this build. Package listing (first 60):"
  sed -n '1,60p' "$LISTING"
  exit 1
fi

UNPACKED="$RES/app.asar.unpacked/node_modules/steamworks.js"
if [ ! -d "$UNPACKED" ]; then
  echo "STEAMWORKS NOT UNPACKED: expected $UNPACKED"
  echo "Sealed inside the asar the native binding cannot be dlopened, and every"
  echo "commendation in the game is unreachable. Contents of $RES:"
  ls -la "$RES" || true
  exit 1
fi

# the binding and the Steam API library it links against must be on disk,
# in the same directory, or the loader gives up
BINDING="$(find "$UNPACKED" -name '*.node' 2>/dev/null || true)"
APILIB="$(find "$UNPACKED" \( -name 'libsteam_api.so' -o -name 'steam_api64.dll' \) 2>/dev/null || true)"
if [ -z "$BINDING" ] || [ -z "$APILIB" ]; then
  echo "STEAMWORKS UNPACKED BUT INCOMPLETE."
  echo "  native binding: ${BINDING:-<none>}"
  echo "  steam api lib : ${APILIB:-<none>}"
  find "$UNPACKED" -type f | sed -n '1,40p'
  exit 1
fi

echo "steamworks relay packaged: JS in the asar, binding and Steam API library unpacked to disk"
printf '  %s\n' $BINDING $APILIB
