/* Steam capsule and library art — artwork and the game name, nothing else.
 *
 * Valve failed the store page because the capsules carried text beyond the
 * title: a whole incident card of prose, the crew board, an R/T message, the
 * polaroids' handwritten name labels, and the tagline "SURVIVE UNTIL SIX."
 * The rule is narrow and worth quoting, because it is easy to argue with and
 * pointless to: capsules may contain "game artwork, the game name, and any
 * official subtitle" — nothing else. The tagline is not an official subtitle;
 * the product is called Duty Guvnor. The proof is the small capsule, which
 * held the title and the tagline and almost nothing besides, and still failed.
 *
 * So these carry the wordmark and the world's materials — lamplight on dark
 * wood, the desk grille, the pixel polaroids with their labels removed, the
 * Metropolitan arms as a heraldic device — and not one other glyph.
 *
 * Library rules differ again and are handled here: the hero takes no text and
 * no logo at all (Steam draws the logo over it), and the logo is the wordmark
 * alone on transparency.
 *
 * Run: NODE_PATH=/opt/node22/lib/node_modules node tools/shots/capsules.js
 */
'use strict';
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const PACK = process.env.PACK ||
  '/tmp/claude-0/-home-user-duty-guvnor/ea3fa437-4c97-5f59-bdc6-3b4da220786e/scratchpad/design-pack';
const OUT = process.env.OUT || (__dirname + '/capsules');
fs.mkdirSync(OUT, { recursive: true });

const b64 = (f) => fs.readFileSync(f).toString('base64');
const FONT = b64(path.join(PACK, 'fonts', 'special-elite-latin.woff2'));
const ARMS = b64(path.join(PACK, 'assets', 'met-arms.png'));
const FACES = [1, 3, 5].map((n) => b64(path.join(PACK, 'avatars', 'insp-' + n + '.png')));

// Every asset Steam asks for. `text` false means not a single glyph goes on
// it — that is the library hero, which Steam overlays with the logo itself.
const ASSETS = [
  { file: 'main-capsule-1232x706.png', w: 1232, h: 706, kind: 'wide' },
  { file: 'header-capsule-920x430.png', w: 920, h: 430, kind: 'wide' },
  { file: 'small-capsule-462x174.png', w: 462, h: 174, kind: 'small' },
  { file: 'vertical-capsule-748x896.png', w: 748, h: 896, kind: 'tall' },
  { file: 'library-capsule-600x900.png', w: 600, h: 900, kind: 'tall' },
  { file: 'library-header-920x430.png', w: 920, h: 430, kind: 'wide' },
  { file: 'library-hero-3840x1240.png', w: 3840, h: 1240, kind: 'hero', text: false },
  { file: 'library-logo-1280x720.png', w: 1280, h: 720, kind: 'logo', alpha: true },
  { file: 'community-icon-184x184.png', w: 184, h: 184, kind: 'icon', text: false },
];

function page(a) {
  const transparent = a.alpha === true;
  // The wordmark: Special Elite caps, letterspaced, amber phosphor with the
  // same glow the game's own screens use. On the tall assets it stacks.
  const stack = a.kind === 'tall';
  const titleSize = { wide: 0.132, small: 0.285, tall: 0.135, logo: 0.145 }[a.kind] || 0.12;
  return `<!doctype html><html><head><meta charset="utf-8"><style>
  @font-face { font-family: 'Special Elite'; src: url(data:font/woff2;base64,${FONT}) format('woff2'); font-display: block; }
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${a.w}px; height: ${a.h}px; overflow: hidden; }
  body {
    position: relative;
    background: ${transparent ? 'transparent' : '#08060 4'.replace(' ', '')};
    font-family: 'Special Elite', serif;
  }
  /* --- the room: a pool of warm lamplight in a dark one --- */
  .lamp {
    position: absolute; inset: 0;
    background:
      radial-gradient(ellipse ${a.kind === 'hero' ? '34% 145%' : '58% 86%'} at 50% ${a.kind === 'tall' ? '34%' : '42%'},
        #55401a 0%, #3a2a10 26%, #241a0b 52%, #120d06 78%, #070502 100%);
  }
  /* --- the desk: grain across it, and the radio grille along the foot --- */
  .grain {
    position: absolute; inset: 0; opacity: .5;
    background-image: repeating-linear-gradient(94deg,
      rgba(255,176,0,.028) 0 1px, rgba(0,0,0,0) 1px 3px,
      rgba(0,0,0,.05) 3px 4px, rgba(0,0,0,0) 4px 7px);
  }
  .grille {
    position: absolute; left: 0; right: 0; bottom: 0;
    height: ${Math.round(a.h * (a.kind === 'hero' ? 0.2 : 0.26))}px;
    background:
      linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,.42) 34%, rgba(0,0,0,.6) 100%),
      repeating-linear-gradient(90deg,
        #241c0e 0 3px, #161007 3px 6px);
    opacity: .82;
  }
  .lip {
    position: absolute; left: 0; right: 0;
    bottom: ${Math.round(a.h * (a.kind === 'hero' ? 0.2 : 0.26))}px; height: 2px;
    background: linear-gradient(90deg, rgba(255,176,0,0), rgba(255,176,0,.22) 30%, rgba(255,176,0,.22) 70%, rgba(255,176,0,0));
  }
  /* --- the polaroids: the game's own faces, labels removed --- */
  .fan { position: absolute; display: flex; }
  .pol {
    background: #d8cfb8; padding: 6px 6px 14px;
    box-shadow: 0 10px 22px rgba(0,0,0,.62), inset 0 0 0 1px rgba(0,0,0,.16);
  }
  .pol img { display: block; image-rendering: pixelated; filter: grayscale(.22) contrast(1.04) brightness(.94); }
  /* the lamp catching the wall behind the sign */
  .bloom {
    position: absolute; transform: translate(-50%, -50%); pointer-events: none;
    background: radial-gradient(ellipse at center, rgba(255,150,30,.16), rgba(255,140,20,0) 70%);
  }
  .ring {
    position: absolute; border-radius: 50%;
    border: 2px solid rgba(120,84,34,.5);
    box-shadow: inset 0 0 10px rgba(120,84,34,.16);
    opacity: .5;
  }
  .arms {
    position: absolute; opacity: .17; filter: sepia(1) hue-rotate(-14deg) saturate(2.1) brightness(1.15);
    mix-blend-mode: screen;
  }
  /* --- the wordmark --- */
  .title {
    position: absolute; left: 0; right: 0; text-align: center;
    color: #ffb000; font-size: ${Math.round(a.h * titleSize)}px;
    letter-spacing: ${a.kind === 'small' ? '.02em' : '.13em'};
    line-height: ${stack ? '1.12' : '1'};
    text-shadow:
      0 0 ${Math.round(a.h * 0.012)}px rgba(255,176,0,.85),
      0 0 ${Math.round(a.h * 0.045)}px rgba(255,150,0,.5),
      0 0 ${Math.round(a.h * 0.11)}px rgba(255,120,0,.26),
      0 2px 0 rgba(0,0,0,.6);
    white-space: ${stack ? 'normal' : 'nowrap'};
  }
  /* --- the print: grain and a vignette, so nothing looks vector-clean --- */
  .vig { position: absolute; inset: 0; box-shadow: inset 0 0 ${Math.round(a.h * 0.22)}px ${Math.round(a.h * 0.06)}px rgba(0,0,0,.72); }
  .speck {
    position: absolute; inset: 0; opacity: .1;
    background-image:
      radial-gradient(circle at 17% 23%, rgba(255,255,255,.5) 0 .6px, transparent 1px),
      radial-gradient(circle at 63% 71%, rgba(255,255,255,.4) 0 .6px, transparent 1px),
      radial-gradient(circle at 82% 31%, rgba(255,255,255,.45) 0 .6px, transparent 1px),
      radial-gradient(circle at 38% 84%, rgba(255,255,255,.35) 0 .6px, transparent 1px);
    background-size: 140px 140px, 190px 190px, 110px 110px, 170px 170px;
  }
  </style></head><body>${body(a)}</body></html>`;
}

function polaroids(size, gap, tilts) {
  return tilts.map((t, i) =>
    `<div class="pol" style="transform: rotate(${t}deg); margin-left:${i ? gap : 0}px; z-index:${10 - i}">
       <img src="data:image/png;base64,${FACES[i % FACES.length]}" width="${size}" height="${size}">
     </div>`).join('');
}

function body(a) {
  const room = `<div class="lamp"></div><div class="grain"></div>`;
  const print = `<div class="speck"></div><div class="vig"></div>`;

  if (a.kind === 'logo') {
    // wordmark only, on transparency — Steam lays this over the hero
    return `<div class="title" style="top:50%; transform:translateY(-50%); font-size:${Math.round(a.h * 0.135)}px">DUTY&nbsp;GUVNOR</div>`;
  }

  if (a.kind === 'icon') {
    // no room for type at 184px, so the arms carry it alone
    return `${room}
      <img class="arms" src="data:image/png;base64,${ARMS}"
           style="opacity:.9; left:50%; top:50%; transform:translate(-50%,-50%); width:${Math.round(a.w * 0.72)}px">
      ${print}`;
  }

  if (a.kind === 'hero') {
    // not one glyph: Steam draws the logo over the middle, so the centre
    // 860px stays quiet and the interest sits out at the wings
    return `${room}
      <div class="grille"></div><div class="lip"></div>
      <div class="fan" style="left:${Math.round(a.w * 0.13)}px; bottom:${Math.round(a.h * 0.17)}px">
        ${polaroids(Math.round(a.h * 0.3), -Math.round(a.h * 0.07), [-7, 3, -2])}
      </div>
      <img class="arms" src="data:image/png;base64,${ARMS}"
           style="right:${Math.round(a.w * 0.14)}px; top:50%; transform:translateY(-50%); width:${Math.round(a.h * 0.52)}px">
      ${print}`;
  }

  if (a.kind === 'small') {
    // Valve: the logo should nearly fill the small capsule
    return `${room}
      <div class="grille" style="height:${Math.round(a.h * 0.2)}px"></div>
      <div class="title" style="top:50%; transform:translateY(-58%)">DUTY&nbsp;GUVNOR</div>
      ${print}`;
  }

  if (a.kind === 'tall') {
    return `${room}
      <div class="grille"></div><div class="lip"></div>
      <div class="title" style="top:${Math.round(a.h * 0.17)}px">DUTY<br>GUVNOR</div>
      <div class="fan" style="left:50%; transform:translateX(-50%); bottom:${Math.round(a.h * 0.1)}px">
        ${polaroids(Math.round(a.w * 0.26), -Math.round(a.w * 0.05), [-8, 4, -3])}
      </div>
      <img class="arms" src="data:image/png;base64,${ARMS}"
           style="left:50%; transform:translateX(-50%); top:${Math.round(a.h * 0.42)}px; width:${Math.round(a.w * 0.3)}px">
      ${print}`;
  }

  // wide: main capsule, header capsule, library header
  return `${room}
    <div class="ring" style="right:${Math.round(a.w * 0.26)}px; bottom:${Math.round(a.h * 0.34)}px;
         width:${Math.round(a.h * 0.16)}px; height:${Math.round(a.h * 0.16)}px"></div>
    <div class="grille"></div><div class="lip"></div>
    <div class="bloom" style="left:50%; top:${Math.round(a.h * 0.4)}px; width:${Math.round(a.w * 0.62)}px; height:${Math.round(a.h * 0.34)}px"></div>
    <div class="title" style="top:${Math.round(a.h * 0.31)}px">DUTY&nbsp;GUVNOR</div>
    <div class="fan" style="left:${Math.round(a.w * 0.06)}px; bottom:${Math.round(a.h * 0.055)}px">
      ${polaroids(Math.round(a.h * 0.25), -Math.round(a.h * 0.052), [-9, 4, -3])}
    </div>
    <img class="arms" src="data:image/png;base64,${ARMS}"
         style="right:${Math.round(a.w * 0.075)}px; bottom:${Math.round(a.h * 0.05)}px; width:${Math.round(a.h * 0.34)}px">
    ${print}`;
}

(async () => {
  const browser = await chromium.launch();
  for (const a of ASSETS) {
    const ctx = await browser.newContext({
      viewport: { width: a.w, height: a.h },
      deviceScaleFactor: 1,
    });
    const p = await ctx.newPage();
    await p.setContent(page(a), { waitUntil: 'load' });
    await p.evaluate(() => document.fonts.ready);
    await p.waitForTimeout(250);
    await p.screenshot({
      path: path.join(OUT, a.file),
      omitBackground: a.alpha === true,
    });
    await ctx.close();
    console.log('  ' + a.file);
  }
  await browser.close();
  console.log('\ncapsules written to ' + OUT);
})().catch((e) => { console.error(e); process.exit(1); });
