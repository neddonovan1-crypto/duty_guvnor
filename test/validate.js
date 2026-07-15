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

// --- one-off cards ---
const ids = new Set();
for (const card of DATA.cards) {
  const where = `card ${card.id}`;
  if (ids.has(card.id)) err(`${where}: duplicate id`);
  ids.add(card.id);
  checkCardShape(where, card);
  if (!['grief', 'weary'].includes(card.tone)) err(`${where}: tone must be "grief" or "weary"`);
}

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
console.log(
  `Content OK: ${DATA.cards.length} incident cards, ` +
  `${DATA.storylines.length} storylines (${DATA.storylines.map((s) => s.stages.length).join('+')} stages), ` +
  `${DATA.quietTurns.length} quiet turns, ${DATA.ambient.length} ambient lines.`
);
