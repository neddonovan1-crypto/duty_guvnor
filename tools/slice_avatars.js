#!/usr/bin/env node
/* Slices the 3x2 avatar sprite sheets into per-character frame PNGs.
 *
 * Input:  sheets/base.png, halfblink.png, blink.png, mouthpart.png, mouthopen.png
 *         (each a 3x2 grid of six characters in the fixed roster order:
 *          1 grey senior, 2 Black officer with moustache, 3 woman in bowler hat,
 *          4 young officer, 5 heavyset sideburns, 6 veteran in glasses)
 * Output: avatars/<1..6>/<frame>.png at 160x160 (build.js copies avatars/ into public/)
 *
 * Uses the pre-installed Chromium via Playwright for image decoding/encoding —
 * no extra dependencies. Run: NODE_PATH=<playwright path> node tools/slice_avatars.js
 */
'use strict';
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const ROOT = path.join(__dirname, '..');
const FRAMES = ['base', 'halfblink', 'blink', 'mouthpart', 'mouthopen'];
const SIZE = 160;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  for (const frame of FRAMES) {
    const src = path.join(ROOT, 'sheets', frame + '.png');
    if (!fs.existsSync(src)) { console.log('MISSING sheets/' + frame + '.png — skipped'); continue; }
    const b64 = fs.readFileSync(src).toString('base64');
    const cells = await page.evaluate(async ({ b64, SIZE }) => {
      const img = new Image();
      await new Promise((ok, no) => { img.onload = ok; img.onerror = no; img.src = 'data:image/png;base64,' + b64; });
      const cw = img.width / 3, ch = img.height / 2;
      const out = [];
      for (let row = 0; row < 2; row++) {
        for (let col = 0; col < 3; col++) {
          const c = document.createElement('canvas');
          c.width = SIZE; c.height = SIZE;
          const g = c.getContext('2d');
          g.imageSmoothingQuality = 'high';
          // centre-crop each cell to a square before scaling
          const s = Math.min(cw, ch);
          g.drawImage(img, col * cw + (cw - s) / 2, row * ch + (ch - s) / 2, s, s, 0, 0, SIZE, SIZE);
          out.push(c.toDataURL('image/png').split(',')[1]);
        }
      }
      return out;
    }, { b64, SIZE });
    cells.forEach((data, i) => {
      const dir = path.join(ROOT, 'avatars', String(i + 1));
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, frame + '.png'), Buffer.from(data, 'base64'));
    });
    console.log('sliced sheets/' + frame + '.png -> avatars/1-6/' + frame + '.png');
  }
  await browser.close();
})();
