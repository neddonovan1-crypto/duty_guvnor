#!/usr/bin/env node
/* Builds the shippable game: a small index.html that paints immediately,
 * plus external, content-hashed assets —
 *   style.css        the stylesheet
 *   data-<hash>.js   story content (the bulk of the payload; changes only
 *                    when content changes, so it caches across UI deploys)
 *   app-<hash>.js    engine + audio + UI
 * Whole-line comments are stripped from shipped JS (see stripJs); inline
 * and trailing comments survive — line-based stripping can't remove them
 * without risking a "/*" that lives inside a content string. src/ keeps all.
 * Usage: node build.js */
'use strict';
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

let build = 'dev';
try {
  build = 'build ' + execSync('git rev-parse --short HEAD', { cwd: __dirname }).toString().trim();
} catch (e) { /* not a git checkout */ }

const read = (f) => fs.readFileSync(path.join(__dirname, f), 'utf8');

// Strip comments from shipped JS. Safe here because no src file uses
// template literals (checked by the guard below), so no string can span
// lines: a line whose trimmed start is // or /* is a comment, full stop.
// Inline trailing // is left alone (it could sit inside 'http://...').
function stripJs(src, name) {
  if (src.indexOf('`') >= 0) {
    throw new Error(name + ': template literal found — the comment stripper is line-based and no longer safe');
  }
  const out = [];
  let inBlock = false;
  for (const line of src.split('\n')) {
    const t = line.trim();
    if (inBlock) {
      if (t.includes('*/')) inBlock = false;
      continue;
    }
    if (t.startsWith('//')) continue;
    if (t.startsWith('/*')) {
      if (!t.includes('*/')) inBlock = true;
      continue;
    }
    out.push(line);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n');
}

const stripCss = (src) => src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\n{3,}/g, '\n\n');

const hash = (s) => crypto.createHash('sha1').update(s).digest('hex').slice(0, 8);

const css = stripCss(read('src/style.css'));
const dataJs = stripJs(read('src/data.js'), 'data.js');
const appJs = [
  stripJs(read('src/engine.js'), 'engine.js'),
  stripJs(read('src/achievements.js'), 'achievements.js'),
  stripJs(read('src/audio.js'), 'audio.js'),
  stripJs(read('src/ui.js'), 'ui.js'),
].join('\n');

const dataName = 'data-' + hash(dataJs) + '.js';
const appName = 'app-' + hash(appJs) + '.js';
const cssName = 'style.css';
const cssV = hash(css);

// data.js executes before app.js (the UI reads DATA when it runs); defer
// preserves document order, so the page paints before either arrives.
const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Duty Guvnor</title>
<link rel="stylesheet" href="${cssName}?v=${cssV}">
</head>
<body>
<div id="app"></div>
<script>window.DG_BUILD = ${JSON.stringify(build)};</script>
<script defer src="${dataName}"></script>
<script defer src="${appName}"></script>
</body>
</html>
`;

// Both the repo root (file:// test harnesses) and public/ (what Cloudflare
// serves) get the same set of files; stale hashed bundles are swept first.
const outDirs = [__dirname, path.join(__dirname, 'public')];
for (const dir of outDirs) {
  fs.mkdirSync(dir, { recursive: true });
  for (const old of fs.readdirSync(dir)) {
    if (/^(data|app)-[0-9a-f]{8}\.js$/.test(old)) fs.unlinkSync(path.join(dir, old));
  }
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  fs.writeFileSync(path.join(dir, cssName), css);
  fs.writeFileSync(path.join(dir, dataName), dataJs);
  fs.writeFileSync(path.join(dir, appName), appJs);
}

const avatars = path.join(__dirname, 'avatars');
if (fs.existsSync(avatars)) {
  fs.cpSync(avatars, path.join(__dirname, 'public', 'avatars'), { recursive: true });
  console.log('Copied avatars/ into public/avatars/.');
}
const assets = path.join(__dirname, 'assets');
if (fs.existsSync(assets)) {
  fs.cpSync(assets, path.join(__dirname, 'public', 'assets'), { recursive: true });
  console.log('Copied assets/ into public/assets/.');
}
const kb = (s) => Math.round(s.length / 1024) + ' KB';
console.log('Built index.html (' + kb(html) + ') + ' + cssName + ' (' + kb(css) + ') + ' +
  dataName + ' (' + kb(dataJs) + ') + ' + appName + ' (' + kb(appJs) + ').');
