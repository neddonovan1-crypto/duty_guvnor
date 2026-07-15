/* Duty Guvnor — core game engine.
 * Pure logic, no DOM: the browser UI (src/ui.js) and the Node test harness
 * (test/*.js) both drive the game through this module.
 *
 * Roguelike structure: each shift features exactly ONE marquee saga drawn from
 * the pool (never the same one twice running), a deck of one-off incidents that
 * respects time-of-night windows and sinks recently-seen cards, and a pool of
 * chance events the player can only acknowledge. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Engine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var TURNS = 16;          // 22:00 to 06:00 in half-hour turns
  var UNITS_TOTAL = 5;
  var UNITS_MAX = 7;
  var CELLS_TOTAL = 4;
  var CELL_HOLD_TURNS = 99; // the van to Bow Street comes at six: a body holds its cell all night
  var QUIET_CHANCE = 0.10;
  var EVENT_CHANCE = 0.22;
  var AMBIENT_CHANCE = 0.3;
  var METER_KEYS = ['streets', 'brass', 'relief'];

  var QUIET_CHOICES = [
    { label: 'Brew up for the lads', result: 'Tea the colour of creosote, all round. Morale visibly improves.', effects: { relief: 4 } },
    { label: 'Catch up on the paperwork', result: 'Two hours of overdue crime sheets done in thirty minutes. The Chief Inspector will never know how close it was.', effects: { brass: 4 } },
    { label: 'Walk the ground yourself', result: 'You show the flag down the high street. Two scallywags change their plans for the evening.', effects: { streets: 4 } },
  ];

  function clamp(v) { return Math.max(0, Math.min(100, v)); }

  function shuffle(arr, rng) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(rng() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  function turnClock(turn) {
    // turn 1 = 22:00, each turn +30 min
    var mins = (22 * 60 + (turn - 1) * 30) % (24 * 60);
    var h = Math.floor(mins / 60), m = mins % 60;
    return (h < 10 ? '0' : '') + h + (m < 10 ? '0' : '') + m;
  }

  function freeUnits(state) {
    var busy = 0;
    for (var i = 0; i < state.busy.length; i++) busy += state.busy[i].count;
    return state.unitsTotal - busy;
  }

  function freeCells(state) {
    return CELLS_TOTAL - state.cells.length - (state.mpInCell ? 1 : 0);
  }

  function stageById(story, id) {
    for (var i = 0; i < story.stages.length; i++) {
      if (story.stages[i].id === id) return story.stages[i];
    }
    return null;
  }

  function choiceStatus(state, choice) {
    var e = choice.effects || {};
    if ((e.dispatchUnits || 0) > freeUnits(state)) return { enabled: false, reason: 'NO UNITS SPARE' };
    if ((e.arrests || 0) > freeCells(state)) return { enabled: false, reason: 'CELLS FULL' };
    if ((e.favours || 0) < 0 && state.favours < -e.favours) return { enabled: false, reason: 'NO FAVOURS OWED' };
    return { enabled: true, reason: '' };
  }

  function pushLog(state, text) {
    state.log.push({ time: turnClock(state.turn), text: text });
  }

  // The borough decays on its own unless actively policed; the small hours are
  // worse, and the last stretch before dawn is worst of all.
  function streetsDrift(turn) {
    if (turn < 2) return 0;
    if (turn >= 13) return 5;
    return turn >= 9 ? 4 : 2;
  }

  function checkDeath(state) {
    for (var i = 0; i < METER_KEYS.length; i++) {
      if (state.meters[METER_KEYS[i]] <= 0) {
        state.over = true;
        state.ending = {
          kind: 'disaster',
          meter: METER_KEYS[i],
          title: 'SHIFT ABANDONED',
          text: state.data.meterEndings[METER_KEYS[i]],
        };
        return true;
      }
    }
    return false;
  }

  // A card may declare a time-of-night window [firstTurn, lastTurn].
  function inWindow(card, turn) {
    return !card.window || (turn >= card.window[0] && turn <= card.window[1]);
  }

  // Shuffle, then sink recently-seen ids so fresh material surfaces first.
  // `seen` is most-recent-first, so last night's cards sink deepest and are
  // only ever drawn when nothing else fits the hour. Draws come from the END.
  function orderedPool(items, seen, rng) {
    return shuffle(items, rng)
      .map(function (it) {
        var r = seen.indexOf(it.id);
        return { it: it, key: r === -1 ? 1e9 : r }; // finite: Infinity-Infinity is NaN and breaks sort
      })
      .sort(function (a, b) { return a.key - b.key; })
      .map(function (x) { return x.it; });
  }

  // Take the last window-eligible entry from a pool (mutates the pool).
  // Cards dealt on the immediately previous shift are banned outright — a
  // quiet half hour beats a rerun.
  function takeEligible(pool, turn, banned) {
    for (var i = pool.length - 1; i >= 0; i--) {
      if (inWindow(pool[i], turn) && banned.indexOf(pool[i].id) < 0) return pool.splice(i, 1)[0];
    }
    return null;
  }

  function pickMarquee(data, rng, lastMarquee) {
    var pool = [];
    for (var i = 0; i < data.storylines.length; i++) {
      if (data.storylines[i].id !== lastMarquee) pool.push(data.storylines[i]);
    }
    if (!pool.length) pool = data.storylines.slice();
    return pool[Math.floor(rng() * pool.length)];
  }

  function createGame(data, rng, opts) {
    rng = rng || Math.random;
    opts = opts || {};
    var seen = opts.seen || [];
    var marquee = pickMarquee(data, rng, opts.lastMarquee || null);
    var state = {
      data: data,
      rng: rng,
      turn: 0,
      meters: { streets: 55, brass: 55, relief: 55 },
      favours: 1,
      unitsTotal: UNITS_TOTAL,
      busy: [],            // [{count, turns}]
      cells: [],           // [{turnsLeft}]
      mpInCell: false,
      deck: orderedPool(data.cards, seen, rng),
      events: orderedPool(data.events || [], seen, rng),
      banned: seen.slice(0, opts.recent || 0), // last shift's cards: never dealt tonight
      quietPool: shuffle(data.quietTurns, rng),
      ambientPool: shuffle(data.ambient, rng),
      marquee: marquee.id,
      stories: {},         // marquee id -> {pending, resolved, started, outcome}
      drawn: [],           // ids of incidents/events dealt this shift (for cross-shift history)
      current: null,       // {kind, card, storyId?}
      phase: 'choose',     // 'choose' | 'result' | 'over'
      lastResult: null,
      arrestsTotal: 0,
      favoursSpent: 0,
      outcomes: [],
      log: [],
      over: false,
      ending: null,
    };
    state.stories[marquee.id] = {
      pending: { stageId: marquee.stages[0].id, dueTurn: marquee.startTurn },
      resolved: false, started: false, outcome: null,
    };
    advance(state);
    return state;
  }

  function dueStory(state) {
    // Earliest-due unresolved storyline whose stage is scheduled for now or earlier.
    var best = null, bestDue = Infinity;
    for (var i = 0; i < state.data.storylines.length; i++) {
      var s = state.data.storylines[i];
      var st = state.stories[s.id];
      if (!st || st.resolved || !st.pending) continue;
      if (st.pending.dueTurn <= state.turn && st.pending.dueTurn < bestDue) {
        best = s; bestDue = st.pending.dueTurn;
      }
    }
    return best;
  }

  function drawQuiet(state) {
    if (!state.quietPool.length) state.quietPool = shuffle(state.data.quietTurns, state.rng);
    var text = state.quietPool.pop();
    return {
      kind: 'quiet',
      card: { title: 'ALL QUIET', text: text, choices: QUIET_CHOICES },
    };
  }

  function advance(state) {
    if (state.over) return;
    state.turn++;
    state.lastResult = null;

    if (state.turn > TURNS) {
      endShift(state);
      return;
    }

    // Units come back, prisoners go off in the morning van.
    for (var i = state.busy.length - 1; i >= 0; i--) {
      if (--state.busy[i].turns <= 0) state.busy.splice(i, 1);
    }
    for (var j = state.cells.length - 1; j >= 0; j--) {
      if (--state.cells[j].turnsLeft <= 0) state.cells.splice(j, 1);
    }

    state.meters.streets = clamp(state.meters.streets - streetsDrift(state.turn));
    if (checkDeath(state)) { state.phase = 'over'; return; }

    if (state.ambientPool.length && state.rng() < AMBIENT_CHANCE) {
      pushLog(state, state.ambientPool.pop());
    }

    var story = dueStory(state);
    var card;
    if (story) {
      var st = state.stories[story.id];
      var stage = stageById(story, st.pending.stageId);
      st.pending = null;
      st.started = true;
      if (story.id === 'mp' && !st.resolved) state.mpInCell = true;
      state.current = { kind: 'story', card: stage, storyId: story.id };
    } else if (state.events.length && state.rng() < EVENT_CHANCE &&
               (card = takeEligible(state.events, state.turn, state.banned))) {
      state.drawn.push(card.id);
      state.current = { kind: 'event', card: card };
    } else if (state.deck.length && state.rng() >= QUIET_CHANCE &&
               (card = takeEligible(state.deck, state.turn, state.banned))) {
      state.drawn.push(card.id);
      state.current = { kind: 'incident', card: card };
    } else {
      state.current = drawQuiet(state);
    }
    state.phase = 'choose';
  }

  function choose(state, idx) {
    if (state.over || state.phase !== 'choose') return null;
    var card = state.current.card;
    var choice = card.choices[idx];
    if (!choice || !choiceStatus(state, choice).enabled) return null;

    var e = choice.effects || {};
    for (var i = 0; i < METER_KEYS.length; i++) {
      var k = METER_KEYS[i];
      if (e[k]) state.meters[k] = clamp(state.meters[k] + e[k]);
    }
    if (e.favours) {
      if (e.favours < 0) state.favoursSpent += -e.favours;
      state.favours = Math.max(0, state.favours + e.favours);
    }
    var n;
    if (e.arrests > 0) {
      for (n = 0; n < e.arrests; n++) state.cells.push({ turnsLeft: CELL_HOLD_TURNS });
      state.arrestsTotal += e.arrests;
    }
    if (e.dispatchUnits > 0) {
      state.busy.push({ count: e.dispatchUnits, turns: Math.max(1, e.dispatchTurns || 1) });
    }
    if (e.bonusUnits > 0) {
      state.unitsTotal = Math.min(UNITS_MAX, state.unitsTotal + e.bonusUnits);
    }
    if (e.seizeCount > 0) {
      // The night takes officers off the books with no say; it can only take
      // officers who are actually spare.
      var taken = Math.min(e.seizeCount, freeUnits(state));
      if (taken > 0) state.busy.push({ count: taken, turns: Math.max(1, e.seizeTurns || 2) });
    }

    pushLog(state, card.title + ' — ' + choice.label.toUpperCase());

    if (state.current.kind === 'story') {
      var story = null;
      for (n = 0; n < state.data.storylines.length; n++) {
        if (state.data.storylines[n].id === state.current.storyId) story = state.data.storylines[n];
      }
      var st = state.stories[story.id];
      if (choice.goto && stageById(story, choice.goto)) {
        st.pending = { stageId: choice.goto, dueTurn: state.turn + Math.max(1, choice.delay || 2) };
      } else {
        st.resolved = true;
        st.outcome = choice.outcome || null;
        if (choice.outcome) state.outcomes.push(choice.outcome);
        if (story.id === 'mp') state.mpInCell = false;
      }
    }

    state.lastResult = choice.result;
    state.phase = 'result';
    checkDeath(state);
    return choice;
  }

  function proceed(state) {
    if (state.phase !== 'result') return;
    if (state.over) { state.phase = 'over'; return; }
    advance(state);
  }

  function endShift(state) {
    state.over = true;
    state.phase = 'over';
    var avg = Math.round((state.meters.streets + state.meters.brass + state.meters.relief) / 3);
    var tier = null;
    var tiers = state.data.debriefs.slice().sort(function (a, b) { return b.minAvg - a.minAvg; });
    for (var i = 0; i < tiers.length; i++) {
      if (avg >= tiers[i].minAvg) { tier = tiers[i]; break; }
    }
    if (!tier) tier = tiers[tiers.length - 1];

    var outcomes = state.outcomes.slice();
    for (var j = 0; j < state.data.storylines.length; j++) {
      var s = state.data.storylines[j];
      var st = state.stories[s.id];
      if (st && st.started && !st.resolved && s.unresolvedOutcome) outcomes.push(s.unresolvedOutcome);
    }
    state.ending = {
      kind: 'debrief', avg: avg, title: tier.title, text: tier.text, outcomes: outcomes,
      stats: {
        arrests: state.arrestsTotal,
        favoursSpent: state.favoursSpent,
        cellsHeld: state.cells.length + (state.mpInCell ? 1 : 0),
      },
    };
  }

  return {
    TURNS: TURNS,
    UNITS_TOTAL: UNITS_TOTAL,
    CELLS_TOTAL: CELLS_TOTAL,
    createGame: createGame,
    choose: choose,
    proceed: proceed,
    choiceStatus: choiceStatus,
    freeUnits: freeUnits,
    freeCells: freeCells,
    turnClock: turnClock,
  };
});
