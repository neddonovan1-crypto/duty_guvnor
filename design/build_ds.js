#!/usr/bin/env node
/* Generates the "Duty Guvnor — 1975 CRT" design-system preview cards into
 * design/ds/. Each file is a self-contained HTML preview with a first-line
 * @dsCard marker, ready to sync to a Claude Design project. */
'use strict';
const fs = require('fs');
const path = require('path');

const OUT = path.join(__dirname, 'ds');

// The core visual language, inlined into every card so each preview is
// self-contained. Kept in lockstep with src/style.css by hand — this is a
// curated extract, not a build artifact.
const CORE = `
:root {
  --amber: #ffb000; --amber-dim: #8a6200; --amber-faint: #4a3500;
  --bg: #0d0b06; --panel: #16120a; --red: #ff5533; --paper: #d8cfb8;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: var(--bg); color: var(--amber);
  font-family: "Courier New", Courier, monospace; font-size: 15px; line-height: 1.45;
  text-shadow: 0 0 6px rgba(255,176,0,0.35); padding: 20px;
}
body::before {
  content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 50;
  background: repeating-linear-gradient(0deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 3px);
}
.stamp {
  font-size: 12px; letter-spacing: 2px; color: var(--bg); background: var(--amber);
  display: inline-block; padding: 1px 6px; text-shadow: none;
}
.panel { border: 1px solid var(--amber-dim); background: var(--panel); padding: 12px 14px; }
.dim { color: var(--amber-dim); } .faint { color: var(--amber-faint); } .alert { color: var(--red); }
h1.display { font-size: 40px; letter-spacing: 4px; }
button.choice {
  font: inherit; text-align: left; background: transparent; color: var(--amber);
  border: 1px solid var(--amber-dim); padding: 8px 10px; cursor: pointer;
  text-shadow: inherit; display: block; width: 100%;
}
button.choice:hover:not(:disabled) { background: var(--amber); color: var(--bg); text-shadow: none; }
button.choice:disabled { color: var(--amber-faint); border-color: var(--amber-faint); cursor: not-allowed; }
button.choice .req { float: right; color: var(--amber-dim); font-size: 12px; }
button.choice:disabled .req { color: var(--red); }
button.primary {
  font: inherit; font-size: 18px; letter-spacing: 2px; background: var(--amber);
  color: var(--bg); border: none; padding: 12px 28px; cursor: pointer; text-shadow: none;
}
button.secondary {
  font: inherit; font-size: 14px; letter-spacing: 2px; background: transparent;
  color: var(--amber); border: 1px solid var(--amber-dim); padding: 12px 28px; cursor: pointer;
}
.meter .label { display: flex; justify-content: space-between; font-size: 12px; letter-spacing: 1px; }
.meter .bar { height: 10px; border: 1px solid var(--amber-dim); margin-top: 2px; position: relative; }
.meter .fill { position: absolute; inset: 1px auto 1px 1px; background: var(--amber); }
.meter.low .fill { background: var(--red); }
.meter.low .label { color: var(--red); animation: blink 1s steps(2) infinite; }
@keyframes blink { 50% { opacity: 0.35; } }
.meter .drift { color: var(--red); font-size: 10px; }
.meter .delta.up { color: var(--amber); font-size: 12px; margin-left: 4px; }
.meter .delta.down { color: var(--red); font-size: 12px; margin-left: 4px; }
`;

function card(file, group, title, body, extra) {
  const html = `<!-- @dsCard group="${group}" -->
<!doctype html>
<html lang="en-GB"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<style>${CORE}${extra || ''}</style></head>
<body>
${body}
</body></html>
`;
  const dest = path.join(OUT, file);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  console.log('wrote design/ds/' + file);
}

// ---------- Foundations ----------
card('foundations/colors.html', 'Foundations', 'Palette — amber phosphor', `
<div class="stamp">PALETTE</div>
<p class="dim" style="margin:10px 0">One hue, five intensities, one alarm. Everything on screen is the same phosphor.</p>
<div style="display:flex;flex-wrap:wrap;gap:10px">
${[
  ['--amber', '#ffb000', 'AMBER — text, fills, the living voice'],
  ['--amber-dim', '#8a6200', 'AMBER DIM — borders, secondary text'],
  ['--amber-faint', '#4a3500', 'AMBER FAINT — disabled, ghosts'],
  ['--bg', '#0d0b06', 'BG — the tube, near-black warm'],
  ['--panel', '#16120a', 'PANEL — raised surfaces'],
  ['--red', '#ff5533', 'RED — danger only: low meters, lost gambles'],
].map(([v, hex, label]) => `
  <div style="width:150px">
    <div style="height:56px;background:var(${v});border:1px solid var(--amber-dim)"></div>
    <div style="font-size:11px;margin-top:4px">${label}</div>
    <div class="dim" style="font-size:11px">${hex} · ${v}</div>
  </div>`).join('')}
</div>`);

card('foundations/type.html', 'Foundations', 'Type — teleprinter voice', `
<div class="stamp">TYPE</div>
<div style="display:flex;flex-direction:column;gap:14px;margin-top:12px;max-width:560px">
  <div><h1 class="display">DUTY GUVNOR</h1><div class="dim" style="font-size:11px">DISPLAY — 40px / 4px tracking / Courier New</div></div>
  <div><div style="font-weight:bold;letter-spacing:1px">DISTURBANCE — DUKE OF CLARENCE PH</div><div class="dim" style="font-size:11px">CARD TITLE — bold, telex headline, em-dash location</div></div>
  <div><div>The fog comes up off the river about the middle of the shift, a proper yellow-grey pea-souper.</div><div class="dim" style="font-size:11px">BODY — 15px/1.45, typewritten, present tense</div></div>
  <div><div style="font-size:12px;letter-spacing:1px" class="dim">FOG NOW GENERAL SOUTH OF THE CANAL. PANDA 3 NAVIGATING BY MEMORY</div><div class="dim" style="font-size:11px">LOG LINE — 12-13px, uppercase, deadpan</div></div>
  <div><div style="border-left:3px solid var(--amber);padding-left:10px;font-style:italic">Bream rules off the charge sheet like a man signing a surrender.</div><div class="dim" style="font-size:11px">RESULT — italic, amber rule left</div></div>
</div>
<p class="dim" style="margin-top:14px;font-size:12px">Rules: British English; period Met vocabulary; UPPERCASE for machine voice (telex, stamps, log); sentence case for the narrator. All text glows: text-shadow 0 0 6px rgba(255,176,0,.35).</p>`);

card('foundations/crt.html', 'Foundations', 'CRT surface — scanlines & glow', `
<div class="stamp">THE TUBE</div>
<div class="panel" style="margin-top:12px;max-width:520px">
  <p>Every page sits behind two fixed overlays: 1px scanlines every 3px at 18% black, and a radial vignette pulling the corners down. Text carries a 6px amber glow. Images are luminance-mapped to amber (grayscale → sepia → saturate) so photographs read as renders on the same phosphor.</p>
  <p class="dim" style="margin-top:8px">Deliberately single-theme: there is no light mode in 1975.</p>
</div>`);

// ---------- Chrome ----------
card('chrome/header.html', 'Chrome', 'Force header', `
<header style="border:1px solid var(--amber-dim);padding:8px 12px;display:flex;justify-content:space-between;align-items:baseline;flex-wrap:wrap;gap:4px 16px">
  <span style="letter-spacing:2px;font-weight:bold">METROPOLITAN POLICE · THORNE STREET · B RELIEF</span>
  <span><span class="dim">FRI 14 NOV 1975 </span><span style="font-size:20px;font-weight:bold">0230</span>
  <button class="secondary" style="font-size:12px;padding:2px 8px;margin-left:14px">SND ◉</button></span>
</header>
<p class="dim" style="font-size:12px;margin-top:10px">Identity left, state right. The clock is the biggest thing on the bar — time is the resource.</p>`);

card('chrome/stamps.html', 'Chrome', 'Stamps — inverse-video labels', `
<div style="display:flex;flex-direction:column;gap:10px;align-items:flex-start">
  <span class="stamp">STATE OF PLAY</span>
  <span class="stamp">INCIDENT — A GRIEFY ONE</span>
  <span class="stamp">INCIDENT — A WEARY ONE</span>
  <span class="stamp">ONGOING GRIEF</span>
  <span class="stamp">SIGNAL — ALL STATIONS</span>
  <span class="stamp">STATION LOG</span>
</div>
<p class="dim" style="font-size:12px;margin-top:12px">Inverse video = the machine speaking. One per panel, top-left, letter-spaced caps. The griefy/weary pair doubles as play information.</p>`);

// ---------- Components ----------
card('components/meters.html', 'Components', 'Meters', `
<div style="max-width:240px;display:flex;flex-direction:column;gap:10px">
  <div class="meter"><div class="label"><span>BRASS</span><span>55</span></div><div class="bar"><div class="fill" style="width:55%"></div></div></div>
  <div class="meter"><div class="label"><span>STREETS <span class="drift">▼3/½HR</span></span><span>41 <span class="delta down">-6</span></span></div><div class="bar"><div class="fill" style="width:41%"></div></div></div>
  <div class="meter low"><div class="label"><span>RELIEF</span><span>18</span></div><div class="bar"><div class="fill" style="width:18%"></div></div></div>
</div>
<p class="dim" style="font-size:12px;margin-top:12px">States: normal · decaying (red ▼ rate) · post-choice delta flash · critical (&lt;25: red fill, blinking label).</p>`);

card('components/roster.html', 'Components', 'Roster & cells', `
<div style="max-width:240px;font-size:12px;display:flex;flex-direction:column;gap:12px">
  <div>
    <div style="letter-spacing:1px;margin-bottom:2px">THE RELIEF</div>
    <div style="display:flex;justify-content:space-between"><span>● PC DOYLE</span></div>
    <div style="display:flex;justify-content:space-between" class="faint"><span>○ PC WHITTLE</span><span style="font-size:10px">BACK 0330</span></div>
    <div style="display:flex;justify-content:space-between"><span>● WPC HARTLE</span></div>
  </div>
  <div>
    <div style="letter-spacing:1px;margin-bottom:2px">THE CELLS</div>
    <div class="faint">■ KENNY OLLERENSHAW</div>
    <div class="faint">■ THE MEMBER</div>
    <div>□ EMPTY</div>
    <div>□ EMPTY</div>
  </div>
  <div><span style="letter-spacing:1px;display:block">FAVOURS OWED</span><span style="letter-spacing:3px">★</span></div>
</div>
<p class="dim" style="font-size:12px;margin-top:12px">Every resource is named, never a number: ●/○ officers with return times, ■/□ cells with occupants, ★ favours.</p>`);

card('components/buttons.html', 'Components', 'Buttons & choices', `
<div style="max-width:560px;display:flex;flex-direction:column;gap:6px">
  <button class="choice"><span>&gt; Send the van round before the puddings turn political</span><span class="req">2 PCs + 1 CELL</span></button>
  <button class="choice"><span>&gt; Go up Perce's ladder yourself for one proper look</span><span class="req">GAMBLE 55%</span></button>
  <button class="choice" disabled><span>&gt; Everything spare — plug both ends of the street</span><span class="req">NO UNITS SPARE</span></button>
  <button class="choice"><span>&gt; Noted. Carry on.</span><span class="req">-2 PCs FOR 3 TURNS · RELIEF -4</span></button>
</div>
<div style="display:flex;gap:10px;margin-top:14px">
  <button class="primary">BOOK ON DUTY</button>
  <button class="secondary">COPY RESULT</button>
</div>
<p class="dim" style="font-size:12px;margin-top:12px">Choice rows: "&gt;" prompt, cost right-aligned. Decisions hide their consequences; SIGNAL events stamp the full toll; gambles show odds. Disabled states name the missing resource.</p>`);

card('components/card.html', 'Components', 'Incident card', `
<div class="panel" style="max-width:560px;display:flex;flex-direction:column;gap:10px">
  <span class="stamp">INCIDENT — A GRIEFY ONE</span>
  <div style="border-bottom:1px dashed var(--amber-dim);padding-bottom:6px;font-weight:bold;letter-spacing:1px">BURGLARY IN PROGRESS — GATHERCOLE'S CHEMISTS</div>
  <div>A cabbie off the Ordnance Street rank dials 999: torchlight moving inside Gathercole's, glass out of the transom, and the unmistakable sound of a crowbar being introduced to the Dangerous Drugs cabinet.<span style="opacity:.6">█</span><div class="faint" style="font-size:10px;letter-spacing:1px;margin-top:8px">▸ TAP TO SKIP</div></div>
  <button class="choice"><span>&gt; Everything spare — front, back, and the alley roof</span><span class="req">3 PCs + 2 CELLS</span></button>
  <button class="choice"><span>&gt; Note it for CID's morning list</span></button>
</div>`);

card('components/result.html', 'Components', 'Result & gamble outcomes', `
<div style="max-width:560px;display:flex;flex-direction:column;gap:14px">
  <div style="border-left:3px solid var(--amber);padding-left:10px;font-style:italic">Two villains come off the flat roof into the arms of PC Whittle, pockets rattling like maracas. Even the cabbies applaud, and cabbies applaud nothing.</div>
  <div style="border-left:3px solid var(--red);padding-left:10px;font-style:italic"><div class="alert" style="font-style:normal;font-size:12px;letter-spacing:1px;margin-bottom:4px">✗ THE GAMBLE GOES WRONG</div>The slates give their opinion. Doyle goes through a conservatory roof into a lily pond — nothing broken but the lilies and his standing.</div>
  <button class="secondary" style="align-self:center">— CARRY ON —</button>
</div>`);

card('components/log.html', 'Components', 'Station log', `
<div class="panel" style="max-width:560px">
  <span class="stamp">STATION LOG</span>
  <div style="margin-top:6px;font-size:13px" class="dim">
    <div><span style="color:var(--amber);margin-right:8px">0230</span>THE CODEWORD — VERIFY THE CODEWORD WITH THE YARD</div>
    <div><span style="color:var(--amber);margin-right:8px">0200</span>CELL TWO HAS COMMENCED NELLIE DEAN. SECOND VERSE. ALL UNITS BRACE</div>
    <div><span style="color:var(--amber);margin-right:8px">0130</span>ALL QUIET — WALK THE GROUND YOURSELF</div>
    <div><span style="color:var(--amber);margin-right:8px">0100</span>POLAC — AREA CAR TANGO TWO VERSUS SKIP (PC DOYLE, PC RENWICK)</div>
  </div>
</div>
<p class="dim" style="font-size:12px;margin-top:10px">Newest first in play; chronological on the shift report. Timestamps amber, entries dim, dispatched names in brackets.</p>`);

card('components/debrief.html', 'Components', 'Debrief screen', `
<div class="panel" style="max-width:560px;text-align:center;display:flex;flex-direction:column;gap:12px;align-items:center;padding:24px">
  <h1 class="display" style="font-size:32px">A GRUDGING NOD</h1>
  <div class="dim" style="font-size:13px">THE MARQUEE — THE WILDCAT: HANDLED WELL</div>
  <div style="text-align:left;max-width:460px;border-top:1px dashed var(--amber-dim);padding-top:8px" class="dim">
    <b style="color:var(--amber)">THE NIGHT'S SAGAS:</b>
    <div>• Peace came up with the dawn at Thameshead Wharf — unsigned, unminuted, honoured to the letter.</div>
  </div>
  <div class="dim" style="font-size:13px;letter-spacing:1px">AVERAGE STANDING 51 · BODIES IN THE BOOK 6 · STILL IN THE CELLS AT SIX 4</div>
  <button class="primary">WORK ANOTHER SHIFT</button>
</div>`);

console.log('done');
