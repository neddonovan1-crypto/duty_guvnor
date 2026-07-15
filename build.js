#!/usr/bin/env node
/* Builds the single-file playable game: inlines CSS + engine + data + UI into index.html.
 * Usage: node build.js */
'use strict';
const fs = require('fs');
const path = require('path');

const read = (f) => fs.readFileSync(path.join(__dirname, f), 'utf8');

const html = `<!DOCTYPE html>
<html lang="en-GB">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Duty Guvnor</title>
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
${read('src/data.js')}
</script>
<script>
${read('src/ui.js')}
</script>
</body>
</html>
`;

fs.writeFileSync(path.join(__dirname, 'index.html'), html);
console.log('Built index.html (' + Math.round(html.length / 1024) + ' KB). Open it in a browser to play.');
