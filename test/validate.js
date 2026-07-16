#!/usr/bin/env node
/* Static invariant checks on the game content. Exits non-zero on any violation.
 * Usage: node test/validate.js */
'use strict';
const DATA = require('../src/data.js');

const errors = [];
const err = (m) => errors.push(m);

const METER_KEYS = ['streets', 'brass', 'relief'];
const EFFECT_KEYS = METER_KEYS.concat(['favours', 'arrests', 'dispatchUnits', 'dispatchTurns']);

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
  checkWindow(where, card.window, false);
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

  // Which stages can reach a resolving choice?
  const resolves = new Map(); // stageId -> bool (has any path to resolution)
  const stageById = Object.fromEntries(story.stages.map((s) => [s.id, s]));
  for (const stage of story.stages) {
    const where = `story ${story.id} stage ${stage.id}`;
    checkCardShape(where, stage);
    for (const c of stage.choices) {
      if (c.goto && !stageById[c.goto]) err(`${where}: goto "${c.goto}" does not exist`);
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
  while (queue.length) {
    const s = stageById[queue.shift()];
    for (const c of s.choices) {
      // dangling gotos are already reported above; don't let them crash the BFS
      if (c.goto && stageById[c.goto] && !reachable.has(c.goto)) { reachable.add(c.goto); queue.push(c.goto); }
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
      if (!c.goto && !c.outcome) err(`${sw}: resolving choice "${c.label}" missing outcome`);
      if (!c.goto && !['good', 'mixed', 'poor'].includes(c.grade)) {
        err(`${sw}: resolving choice "${c.label}" needs grade`);
      }
    }
  }
  const last = mini.stages && mini.stages[1];
  if (last && last.choices.some((c) => c.goto)) err(`${where}: final stage must resolve on every choice`);
}
if (!DATA.minisagas || DATA.minisagas.length < 3) err('need at least 3 mini-sagas');

// --- cross-night flags: every follow-up must be reachable from some outcome ---
const produced = new Set();
const forEachChoice = (fn) => {
  for (const card of DATA.cards) card.choices.forEach((c) => fn(c));
  for (const s of DATA.storylines) for (const st of s.stages) st.choices.forEach((c) => fn(c));
  for (const m of DATA.minisagas || []) for (const st of m.stages) st.choices.forEach((c) => fn(c));
};
forEachChoice((c) => { if (c.sets) produced.add(c.sets); });
for (const card of DATA.cards) {
  if (card.requiresFlag && !produced.has(card.requiresFlag)) {
    err(`card ${card.id}: requiresFlag "${card.requiresFlag}" is never set by any choice — dead card`);
  }
}

// --- endings & flavour ---
for (const k of METER_KEYS) {
  if (!DATA.meterEndings[k]) err(`meterEndings.${k} missing`);
}
if (!Array.isArray(DATA.debriefs) || DATA.debriefs.length !== 4) err('need exactly 4 debrief tiers');
else {
  const mins = DATA.debriefs.map((d) => d.minAvg).sort((a, b) => a - b);
  if (mins[0] !== 0) err('lowest debrief tier must have minAvg 0');
}
if (!DATA.quietTurns || DATA.quietTurns.length < 8) err('need at least 8 quiet-turn vignettes');
if (!DATA.ambient || DATA.ambient.length < 6) err('need at least 6 ambient log lines');

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
