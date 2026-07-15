#!/usr/bin/env node
/* Builds the single-file playable game: inlines CSS + engine + data + UI into index.html.
 * Usage: node build.js */
'use strict';
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let build = 'dev';
try {
  build = 'build ' + execSync('git rev-parse --short HEAD', { cwd: __dirname }).toString().trim();
} catch (e) { /* not a git checkout */ }

// "</script" anywhere in inlined JS (e.g. inside a content string) would end the
// <script> block early and silently break the page; escape it for the HTML context.
const read = (f) => fs.readFileSync(path.join(__dirname, f), 'utf8').replace(/<\/script/gi, '<\\/script');

const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Duty Guvnor</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Special+Elite&family=Caveat:wght@400..600&display=swap" rel="stylesheet">
<style>
${read('src/style.css')}
</style>
</head>
<body>
<div id="app"></div>
<script>
${read('src/engine.js')}
</script>
<script>
${read('src/audio.js')}
</script>
<script>
${read('src/data.js')}
</script>
<script>window.DG_BUILD = ${JSON.stringify(build)};</script>
<script>
${read('src/ui.js')}
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), html);
// public/ is what Cloudflare Workers (static assets) serves — game only, no source.
fs.mkdirSync(path.join(__dirname, 'public'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'public', 'index.html'), html);
// Avatar frames (optional — sliced by tools/slice_avatars.js) ride along.
const avatars = path.join(__dirname, 'avatars');
if (fs.existsSync(avatars)) {
  fs.cpSync(avatars, path.join(__dirname, 'public', 'avatars'), { recursive: true });
  console.log('Copied avatars/ into public/avatars/.');
}
// Period image assets (heraldry etc.) for the desk UI.
const assets = path.join(__dirname, 'assets');
if (fs.existsSync(assets)) {
  fs.cpSync(assets, path.join(__dirname, 'public', 'assets'), { recursive: true });
  console.log('Copied assets/ into public/assets/.');
}
console.log('Built index.html + public/index.html (' + Math.round(html.length / 1024) + ' KB).');
