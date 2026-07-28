#!/usr/bin/env node
/* Static invariant checks on the game content. Exits non-zero on any violation.
 * Usage: node test/validate.js */
'use strict';
const DATA = require('../src/data.js');

const errors = [];
const err = (m) => errors.push(m);

const METER_KEYS = ['streets', 'brass', 'relief'];
const EFFECT_KEYS = METER_KEYS.concat(['favours', 'arrests', 'dispatchUnits', 'dispatchTurns', 'spendDogs']);

function isZeroResource(effects) {
  const e = effects || {};
  return !(e.dispatchUnits > 0) && !(e.arrests > 0) && !(e.favours < 0);
}

function checkChoice(where, c) {
  if (!c.label || !c.result) err(`${where}: choice missing label/result`);
  const e = c.effects || {};
  for (const k of Object.keys(e)) {
    if (!EFFECT_KEYS.includes(k)) err(`${where}: unknown effect key "${k}"`);
    if (!Number.isInteger(e[k])) err(`${where}: effect ${k}=${e[k]} not an integer`);
  }
  for (const k of METER_KEYS) {
    if (e[k] !== undefined && Math.abs(e[k]) > 15) err(`${where}: |${k}| effect ${e[k]} exceeds 15`);
  }
  if (e.favours !== undefined && Math.abs(e.favours) > 1) err(`${where}: favours effect beyond +/-1`);
  if (e.arrests !== undefined && (e.arrests < 0 || e.arrests > 3)) err(`${where}: arrests ${e.arrests} out of 0-3`);
  if ((e.dispatchUnits > 0) !== (e.dispatchTurns > 0)) err(`${where}: dispatchUnits/dispatchTurns must be set together`);
  if (e.dispatchUnits > 3) err(`${where}: dispatchUnits ${e.dispatchUnits} exceeds 3`);
  if (e.dispatchTurns > 4) err(`${where}: dispatchTurns ${e.dispatchTurns} exceeds 4`);
  if (c.risk !== undefined) {
    const r = c.risk;
    if (!Number.isInteger(r.odds) || r.odds < 25 || r.odds > 80) err(`${where}: risk odds ${r.odds} out of 25-80`);
    if (!r.failResult) err(`${where}: risk missing failResult`);
    const fe = r.failEffects || {};
    for (const k of Object.keys(fe)) {
      if (!METER_KEYS.includes(k)) err(`${where}: risk failEffects may only move meters (got "${k}")`);
      if (!Number.isInteger(fe[k]) || Math.abs(fe[k]) > 15) err(`${where}: risk failEffects.${k} out of range`);
    }
    if (c.outcome && !r.failGoto && !r.failOutcome) {
      err(`${where}: a resolving saga choice with a risk needs failGoto or failOutcome — the debrief must not lie about a lost gamble`);
    }
    if (r.failGoto && r.failOutcome) err(`${where}: risk cannot have both failGoto and failOutcome`);
    if (r.failOutcome && !['good', 'mixed', 'poor'].includes(r.failGrade)) {
      err(`${where}: risk failOutcome needs failGrade good/mixed/poor`);
    }
  }
  if (c.sets !== undefined && (typeof c.sets !== 'string' || !c.sets)) err(`${where}: sets must be a non-empty flag string`);
  // The engine stamps `sets` before it consults the dice, so a flag on a
  // gamble whose failure tells a different story promises the next night
  // something that did not happen. Hang those on the saga's gradeFlags.
  // `setsEitherWay` is the author saying: the failure branch still makes
  // this flag true (the raid happens, the man is booked; only the manner
  // of it goes wrong). Without that acknowledgement it is a bug.
  if (c.sets && c.risk && (c.risk.failGoto || c.risk.failOutcome) && !c.setsEitherWay) {
    err(`${where}: sets "${c.sets}" rides a gamble with a diverging failure — the flag would fire on the losing branch too. ` +
      'Move it to the saga gradeFlags, or mark setsEitherWay if the failure still makes it true.');
  }
  if (c.setsEitherWay !== undefined && (c.setsEitherWay !== true || !c.sets)) {
    err(`${where}: setsEitherWay is only meaningful as true on a choice that sets a flag`);
  }
  if (c.needsWpc !== undefined && c.needsWpc !== true) err(`${where}: needsWpc must be true or absent`);
}

function checkCardShape(where, card) {
  if (!card.id) err(`${where}: missing id`);
  if (!card.title || !card.text) err(`${where}: missing title/text`);
  if (!Array.isArray(card.choices) || card.choices.length < 2 || card.choices.length > 4) {
    err(`${where}: needs 2-4 choices`);
    return;
  }
  card.choices.forEach((c, i) => checkChoice(`${where} choice[${i}] "${c.label}"`, c));
  if (!card.choices.some((c) => isZeroResource(c.effects))) {
    err(`${where}: no zero-resource choice — player could be deadlocked`);
  }
}

function checkWindow(where, w, required) {
  if (w === undefined) {
    if (required) err(`${where}: missing window`);
    return;
  }
  if (!Array.isArray(w) || w.length !== 2 || !Number.isInteger(w[0]) || !Number.isInteger(w[1])) {
    err(`${where}: window must be [firstTurn, lastTurn]`);
    return;
  }
  if (w[0] < 1 || w[1] > 16 || w[0] > w[1]) err(`${where}: window [${w}] out of range`);
  if (w[1] - w[0] < 2) err(`${where}: window [${w}] narrower than 3 turns — card would almost never appear`);
}

// --- one-off cards ---
const ids = new Set();
for (const card of DATA.cards) {
  const where = `card ${card.id}`;
  if (ids.has(card.id)) err(`${where}: duplicate id`);
  ids.add(card.id);
  checkCardShape(where, card);
  if (!['grief', 'weary'].includes(card.tone)) err(`${where}: tone must be "grief" or "weary"`);
  // A window is mandatory. The dealer prefers time-specific cards, so a card
  // without one sinks under the 100-odd that have one and is never dealt —
  // that is how 21 finished cards went dark once before.
  checkWindow(where, card.window, true);
}

// --- chance events: the player only acknowledges, so they must always be playable ---
for (const ev of DATA.events || []) {
  const where = `event ${ev.id}`;
  if (ids.has(ev.id)) err(`${where}: duplicate id`);
  ids.add(ev.id);
  if (!ev.title || !ev.text) err(`${where}: missing title/text`);
  checkWindow(where, ev.window, true);
  if (!Array.isArray(ev.choices) || ev.choices.length !== 1) {
    err(`${where}: must have exactly one acknowledgement choice`);
    continue;
  }
  if (ev.maxFreeCells !== undefined && (!Number.isInteger(ev.maxFreeCells) || ev.maxFreeCells < 0 || ev.maxFreeCells > 2)) {
    err(`${where}: maxFreeCells ${ev.maxFreeCells} out of 0-2`);
  }
  if (ev.dismissIf !== undefined) {
    if (!['noUnits', 'noCells'].includes(ev.dismissIf)) err(`${where}: unknown dismissIf "${ev.dismissIf}"`);
    if (!ev.dismissText || ev.dismissText.length < 80) err(`${where}: dismissIf needs a substantial dismissText (the letter body)`);
    if (!ev.window) err(`${where}: a dismissal event must be time-windowed`);
    // arrests on the acknowledgement are allowed here: the noCells gate
    // guarantees a free cell whenever the card is actually shown
  }
  const c = ev.choices[0];
  if (!c.label || !c.result) err(`${where}: choice missing label/result`);
  const e = c.effects || {};
  const allowed = ['streets', 'brass', 'relief', 'bonusUnits', 'seizeCount', 'seizeTurns', 'releaseCells', 'lockCells', 'lockTurns'];
  if (ev.dismissIf === 'noCells') allowed.push('arrests');
  for (const k of Object.keys(e)) {
    if (!allowed.includes(k)) {
      err(`${where}: effect "${k}" not allowed on an event`);
    }
  }
  if (ev.minFreeCells !== undefined && (!Number.isInteger(ev.minFreeCells) || ev.minFreeCells < 1 || ev.minFreeCells > 2)) {
    err(`${where}: minFreeCells ${ev.minFreeCells} out of 1-2`);
  }
  if ((e.lockCells > 0) !== (e.lockTurns > 0)) err(`${where}: lockCells/lockTurns must be set together`);
  if (e.lockCells > 2) err(`${where}: lockCells ${e.lockCells} exceeds 2`);
  if (e.lockTurns > 99) err(`${where}: lockTurns ${e.lockTurns} exceeds 99`);
  if (e.lockCells > 0 && (ev.minFreeCells === undefined || ev.minFreeCells < e.lockCells)) {
    err(`${where}: a cell-locking event needs minFreeCells >= lockCells (only an empty cell can break)`);
  }
  for (const k of METER_KEYS) {
    if (e[k] !== undefined && Math.abs(e[k]) > 15) err(`${where}: |${k}| effect ${e[k]} exceeds 15`);
  }
  if (e.bonusUnits !== undefined && e.bonusUnits !== 1) err(`${where}: bonusUnits must be 1`);
  // arrests on an event acknowledgement (noCells cards only) still need a
  // cell to land in: the dismissIf gate guarantees exactly one, so cap at one
  if (e.arrests !== undefined && e.arrests !== 1) err(`${where}: an event may book at most one body (arrests must be 1)`);
  if ((e.seizeCount > 0) !== (e.seizeTurns > 0)) err(`${where}: seizeCount/seizeTurns must be set together`);
  if (e.seizeCount > 2) err(`${where}: seizeCount ${e.seizeCount} exceeds 2`);
  if (e.seizeTurns > 4 && e.seizeTurns !== 99) err(`${where}: seizeTurns ${e.seizeTurns} must be 1-4 (or 99: gone for the night)`);
  if (e.releaseCells !== undefined && (e.releaseCells < 1 || e.releaseCells > 2)) err(`${where}: releaseCells out of 1-2`);
  if (e.releaseCells > 0 && ev.maxFreeCells === undefined) {
    err(`${where}: a cell-releasing event must be gated by maxFreeCells so it only fires under pressure`);
  }
}
if (!DATA.events || DATA.events.length < 8) err('need at least 8 chance events');

// --- storylines ---
const storyIds = new Set();
for (const story of DATA.storylines) {
  if (!story.id) err('storyline missing id');
  if (storyIds.has(story.id)) err(`story ${story.id}: duplicate storyline id — would corrupt engine state`);
  storyIds.add(story.id);
  const stageIds = new Set(story.stages.map((s) => s.id));
  if (stageIds.size !== story.stages.length) err(`story ${story.id}: duplicate stage ids`);
  if (!Number.isInteger(story.startTurn) || story.startTurn < 1 || story.startTurn > 12) {
    err(`story ${story.id}: startTurn ${story.startTurn} out of 1-12`);
  }
  if (!story.unresolvedOutcome) err(`story ${story.id}: missing unresolvedOutcome fallback`);
  // every saga nods into the next night, whatever the ending
  for (const g of ['good', 'mixed', 'poor', 'unresolved']) {
    const e = story.echoes && story.echoes[g];
    if (typeof e !== 'string' || e.length < 40 || e.length > 220) {
      err(`story ${story.id}: echoes.${g} missing or out of shape (40-220 chars) — every saga echoes into the next parade`);
    }
  }

  // Which stages can reach a resolving choice?
  const resolves = new Map(); // stageId -> bool (has any path to resolution)
  const stageById = Object.fromEntries(story.stages.map((s) => [s.id, s]));
  for (const stage of story.stages) {
    const where = `story ${story.id} stage ${stage.id}`;
    checkCardShape(where, stage);
    if (stage.notBefore !== undefined && (!Number.isInteger(stage.notBefore) || stage.notBefore < 2 || stage.notBefore > 16)) {
      err(`${where}: notBefore ${stage.notBefore} out of 2-16`);
    }
    for (const c of stage.choices) {
      if (c.goto && !stageById[c.goto]) err(`${where}: goto "${c.goto}" does not exist`);
      // a lost gamble that jumps to a typo'd stage resolves with a fabricated
      // grade and no outcome line — the debrief must not lie about it
      if (c.risk && c.risk.failGoto && !stageById[c.risk.failGoto]) {
        err(`${where}: risk.failGoto "${c.risk.failGoto}" does not exist`);
      }
      if (!c.goto && !c.outcome) err(`${where}: resolving choice "${c.label}" missing outcome`);
      if (c.delay !== undefined && (c.delay < 1 || c.delay > 4)) err(`${where}: delay ${c.delay} out of 1-4`);
    }
    // A stage must always offer a way forward even with zero resources
    if (!stage.choices.some((c) => isZeroResource(c.effects))) {
      err(`${where}: no zero-resource choice — storyline could deadlock the game`);
    }
    for (const c of stage.choices) {
      if (!c.goto && !['good', 'mixed', 'poor'].includes(c.grade)) {
        err(`${where}: resolving choice "${c.label}" needs grade good/mixed/poor`);
      }
    }
  }
  // Reachability: from the first stage, every reachable stage should be able to resolve.
  let changed = true;
  while (changed) {
    changed = false;
    for (const stage of story.stages) {
      if (resolves.get(stage.id)) continue;
      const ok = stage.choices.some((c) => (!c.goto ? true : resolves.get(c.goto)));
      if (ok) { resolves.set(stage.id, true); changed = true; }
    }
  }
  const reachable = new Set([story.stages[0].id]);
  const queue = [story.stages[0].id];
  const step = (id) => { if (id && stageById[id] && !reachable.has(id)) { reachable.add(id); queue.push(id); } };
  while (queue.length) {
    const s = stageById[queue.shift()];
    for (const c of s.choices) {
      // dangling gotos are already reported above; don't let them crash the BFS.
      // A failed gamble (risk.failGoto) is a real path too — follow it.
      step(c.goto);
      if (c.risk) step(c.risk.failGoto);
    }
  }
  for (const id of reachable) {
    if (!resolves.get(id)) err(`story ${story.id} stage ${id}: reachable but has no path to resolution`);
  }
  for (const stage of story.stages) {
    if (!reachable.has(stage.id)) err(`story ${story.id} stage ${stage.id}: unreachable from first stage`);
  }
}

// --- mini-sagas ---
const miniIds = new Set();
for (const mini of DATA.minisagas || []) {
  const where = `mini ${mini.id}`;
  if (miniIds.has(mini.id) || storyIds.has(mini.id)) err(`${where}: duplicate id`);
  miniIds.add(mini.id);
  if (!Array.isArray(mini.stages) || mini.stages.length !== 2) err(`${where}: must have exactly 2 stages`);
  const w = mini.startWindow;
  if (!Array.isArray(w) || w.length !== 2 || w[0] < 1 || w[1] > 12 || w[0] > w[1]) {
    err(`${where}: startWindow [${w}] out of range`);
  }
  const ids2 = new Set((mini.stages || []).map((s) => s.id));
  for (const stage of mini.stages || []) {
    const sw = `${where} stage ${stage.id}`;
    checkCardShape(sw, stage);
    for (const c of stage.choices) {
      if (c.goto && !ids2.has(c.goto)) err(`${sw}: goto "${c.goto}" does not exist`);
      if (c.risk && c.risk.failGoto && !ids2.has(c.risk.failGoto)) {
        err(`${sw}: risk.failGoto "${c.risk.failGoto}" does not exist`);
      }
      if (!c.goto && !c.outcome) err(`${sw}: resolving choice "${c.label}" missing outcome`);
      if (!c.goto && !['good', 'mixed', 'poor'].includes(c.grade)) {
        err(`${sw}: resolving choice "${c.label}" needs grade`);
      }
    }
  }
  const last = mini.stages && mini.stages[1];
  if (last && last.choices.some((c) => c.goto)) err(`${where}: final stage must resolve on every choice`);
}
if (!DATA.minisagas || DATA.minisagas.length < 15) err('need at least 15 mini-sagas — a pool of fewer repeats within the fortnight');

// --- cross-night flags: every follow-up must be reachable from some outcome ---
const produced = new Set();
const forEachChoice = (fn) => {
  for (const card of DATA.cards) card.choices.forEach((c) => fn(c));
  for (const s of DATA.storylines) for (const st of s.stages) st.choices.forEach((c) => fn(c));
  for (const m of DATA.minisagas || []) for (const st of m.stages) st.choices.forEach((c) => fn(c));
};
forEachChoice((c) => { if (c.sets) produced.add(c.sets); });
for (const st of DATA.storylines) {
  for (const [g, v] of Object.entries(st.gradeFlags || {})) {
    if (!['good', 'mixed', 'poor'].includes(g)) err(`storyline ${st.id}: gradeFlags key "${g}" not a grade`);
    if (typeof v !== 'string' || !v) err(`storyline ${st.id}: gradeFlags.${g} must be a flag string`);
    produced.add(v);
  }
}
for (const card of DATA.cards) {
  if (card.requiresFlag && !produced.has(card.requiresFlag)) {
    err(`card ${card.id}: requiresFlag "${card.requiresFlag}" is never set by any choice — dead card`);
  }
}

// --- parade notices (nightly mutators) ---
// Each mod key the engine honours, with a sane range so a typo can't wreck a night.
const NOTICE_MODS = {
  dispatchExtra: [1, 2],    // fog: every dispatch is out this much longer
  vanAt: [8, 15],           // the early van clears the cells at this turn
  seizeOne: [2, 8],         // an officer held off the board for the front of the night
  reliefLateExtra: [1, 2],  // relief drains faster after three
  streetsPeakExtra: [1, 2], // the peak-hours street rot runs harder
  reliefStart: [1, 10],     // a good night: the relief books on happier
  streetsStart: [1, 10],    // a good night: the manor books on quieter
};
if (!Array.isArray(DATA.notices) || DATA.notices.length < 4) {
  err('need at least 4 parade notices');
}
if (!DATA.notices || DATA.notices.length < 20) err('need at least 20 parade notices — the board repeats itself otherwise');
const noticeIds = new Set();
for (const n of DATA.notices || []) {
  const w = `notice ${n.id || '(no id)'}`;
  if (!n.id || noticeIds.has(n.id)) err(`${w}: missing or duplicate id`);
  noticeIds.add(n.id);
  if (!n.title || !n.text) err(`${w}: needs title and text`);
  if (!n.effect || typeof n.effect !== 'string') {
    err(`${w}: needs an effect line (the plain arithmetic under the prose)`);
  }
  const modKeys = Object.keys(n.mods || {});
  if (!modKeys.length) err(`${w}: needs at least one mod`);
  for (const k of modKeys) {
    if (!NOTICE_MODS[k]) { err(`${w}: unknown mod "${k}"`); continue; }
    const [lo, hi] = NOTICE_MODS[k];
    if (typeof n.mods[k] !== 'number' || n.mods[k] < lo || n.mods[k] > hi) {
      err(`${w}: mod ${k}=${n.mods[k]} out of range [${lo},${hi}]`);
    }
  }
}

// --- venues: one visit per venue per night ---
// A venue tag only does its job if it's shared: a group of one is a typo.
const venueCounts = {};
const countVenue = (v) => { if (v) venueCounts[v] = (venueCounts[v] || 0) + 1; };
for (const c of DATA.cards) countVenue(c.venue);
for (const e of DATA.events || []) countVenue(e.venue);
for (const st of DATA.storylines) countVenue(st.venue);
for (const m of DATA.minisagas || []) countVenue(m.venue);
for (const [v, n] of Object.entries(venueCounts)) {
  if (n < 2) err(`venue "${v}" is tagged on only one thing — exclusivity needs company`);
  if (!/^[a-z_]+$/.test(v)) err(`venue "${v}" should be a lowercase_token`);
}

// --- endings & flavour ---
for (const k of METER_KEYS) {
  if (!DATA.meterEndings[k]) err(`meterEndings.${k} missing`);
}
if (!Array.isArray(DATA.debriefs) || DATA.debriefs.length !== 2) {
  err('need exactly 2 debrief tiers (EXEMPLARY-class and ACCEPTABLE-class; every other night ends in dismissal)');
} else {
  const mins = DATA.debriefs.map((d) => d.minAvg).sort((a, b) => a - b);
  if (mins[0] !== 0) err('lowest debrief tier must have minAvg 0');
}
if (!DATA.quietTurns || DATA.quietTurns.length < 8) err('need at least 8 quiet-turn vignettes');
if (DATA.quietChoices) {
  for (const slot of ['relief', 'brass', 'streets']) {
    const pool = DATA.quietChoices[slot];
    if (!Array.isArray(pool) || pool.length < 3) err(`quietChoices.${slot}: need at least 3 variants`);
    else for (const v of pool) {
      if (!v.label || !v.result) err(`quietChoices.${slot}: variant missing label/result`);
      if (v.effects) err(`quietChoices.${slot}: variants carry copy only — effects live on the slot`);
    }
  }
}
if (!DATA.ambient || DATA.ambient.length < 6) err('need at least 6 ambient log lines');

// --- the guvnor's pronouns ---
// Cards are written in the masculine with a token wherever the word would
// change for a woman guvnor, and the engine resolves them (guvnorWords). A
// token it does not know is left standing on the card, so a typo would ship
// as literal braces in front of a paying player. Catch it here instead.
{
  const KNOWN = new Set(['he', 'He', 'him', 'his', 'His', 'himself',
    'man', 'Man', 'mans', 'gentleman', 'sir', 'Sir']);
  const walk = (node, where, fn) => {
    if (typeof node === 'string') fn(node, where);
    else if (Array.isArray(node)) node.forEach((v, i) => walk(v, `${where}[${i}]`, fn));
    else if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) walk(v, `${where}.${k}`, fn);
    }
  };
  let used = 0;
  walk(DATA, 'DATA', (s, where) => {
    const toks = s.match(/\{[^}]*\}/g);
    if (!toks) return;
    for (const t of toks) {
      const k = t.slice(1, -1);
      if (!KNOWN.has(k)) err(`${where}: unknown guvnor token ${t} — known: ${[...KNOWN].join(', ')}`);
      else used++;
    }
  });
  if (used < 20) err(`only ${used} guvnor tokens in the deck — the gendered copy has gone missing`);
  console.log(`guvnor tokens: ${used} in the deck, all known.`);
}

// --- officers in prose ---
// The roster is randomised nightly; prose may only name the four canonical
// casting parts (localiseText recasts them to whoever actually paraded).
// Any other ranked PC/WPC is a phantom that will contradict the board, and
// a divisional pool surname outside the canon would collide with a real
// rostered officer walking the same paragraph.
const ENGINE = require('../src/engine.js');
const CANON = new Set(['doyle', 'whittle', 'duffin', 'hartle']);
// Persistent station characters who carry a PC rank but whose cards
// establish they are NOT tonight's posted parade — recasting them nightly
// would break their running jokes. Add here only with an on-card excuse:
//   dodds (off duty), gosling (probationer, no beat), latch (Fed rep, own
//   time), purbright (collator, off sick), hartree (rest day), warlow
//   (Early Turn, section house), naismith (Dog Section handler),
//   swaffham (the Inn constable, locked inside Pettifer's by night).
const FIXTURE_PCS = new Set(['dodds', 'gosling', 'latch', 'purbright', 'hartree', 'warlow', 'naismith', 'swaffham']);
const strayPool = (ENGINE.POOL || [])
  .map((p) => p[0].replace(/^W?PC /, ''))
  .filter((n) => !CANON.has(n.toLowerCase()));
if (strayPool.length < 10) err('engine POOL export missing or shrunk — prose guard cannot run');
const poolRe = new RegExp('\\b(' + strayPool.join('|') + ')\\b', 'i');
const rankRe = /\bW?PC\s+([A-Z][a-z]+|[A-Z]{4,})\b/g;
const walkStrings = (node, where, fn) => {
  if (typeof node === 'string') fn(node, where);
  else if (Array.isArray(node)) node.forEach((v, i) => walkStrings(v, `${where}[${i}]`, fn));
  else if (node && typeof node === 'object') {
    for (const [k, v] of Object.entries(node)) walkStrings(v, `${where}.${k}`, fn);
  }
};
walkStrings(DATA, 'DATA', (s, where) => {
  let m;
  rankRe.lastIndex = 0;
  while ((m = rankRe.exec(s))) {
    const sur = m[1].toLowerCase();
    if (!CANON.has(sur) && !FIXTURE_PCS.has(sur)) {
      err(`${where}: "${m[0]}" is not a canonical part (Doyle/Whittle/Duffin/Hartle) or a listed station fixture — the localiser cannot recast it`);
    }
  }
  const p = s.match(poolRe);
  if (p) err(`${where}: pool surname "${p[0]}" in prose — collides with the randomised roster`);
});

// --- report ---
if (errors.length) {
  console.error('CONTENT VALIDATION FAILED:');
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
const windowed = DATA.cards.filter((c) => c.window).length;
console.log(
  `Content OK: ${DATA.cards.length} incident cards (${windowed} time-windowed), ` +
  `${(DATA.events || []).length} chance events, ` +
  `${DATA.storylines.length} marquee sagas (${DATA.storylines.map((s) => s.stages.length).join('+')} stages), ` +
  `${DATA.quietTurns.length} quiet turns, ${DATA.ambient.length} ambient lines.`
);
