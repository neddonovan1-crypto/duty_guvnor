/* Duty Guvnor — core game engine.
 * Pure logic, no DOM: the browser UI (src/ui.js) and the Node test harness
 * (test/*.js) both drive the game through this module.
 *
 * Roguelike structure: each shift features exactly ONE marquee saga and ONE
 * two-stage mini-saga (neither repeating the previous night's), a deck of
 * one-off incidents that respects time-of-night windows and sinks recently
 * seen cards, chance events the player can only acknowledge, gambles whose
 * outcomes are rolled when chosen, and cross-night flags: what you did last
 * night can come looking for you tonight. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.Engine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var TURNS = 16;          // 22:00 to 06:00 in half-hour turns
  var CELLS_TOTAL = 4;
  var CELL_HOLD_TURNS = 99; // the van to Bow Street comes at six: a body holds its cell all night
  var QUIET_CHANCE = 0.10;
  var EVENT_CHANCE = 0.22;
  var AMBIENT_CHANCE = 0.3;
  var BLEED_BELOW = 20;    // a meter this low starts to fester on its own
  var BLEED = 2;
  var METER_KEYS = ['streets', 'brass', 'relief'];
  var ROSTER = ['PC DOYLE', 'PC WHITTLE', 'PC DUFFIN', 'PC RENWICK', 'WPC HARTLE'];
  var CREW_MAX = 7;

  var QUIET_CHOICES = [
    { slot: 'relief', label: 'Brew up for the lads', result: 'Tea the colour of creosote, all round. Morale visibly improves.', effects: { relief: 4 } },
    { slot: 'brass', label: 'Catch up on the paperwork', result: 'Two hours of overdue crime sheets done in thirty minutes. The Chief Inspector will never know how close it was.', effects: { brass: 4 } },
    { slot: 'streets', label: 'Walk the ground yourself', result: 'You show the flag down the high street. Two scallywags change their plans for the evening.', effects: { streets: 4 } },
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

  // Deterministic RNG for seeded (daily) shifts.
  function seededRng(seed) {
    var a = seed >>> 0;
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function turnClock(turn) {
    // turn 1 = 22:00, each turn +30 min
    var mins = (22 * 60 + (turn - 1) * 30) % (24 * 60);
    var h = Math.floor(mins / 60), m = mins % 60;
    return (h < 10 ? '0' : '') + h + (m < 10 ? '0' : '') + m;
  }

  function freeUnits(state) {
    var free = 0;
    for (var i = 0; i < state.crew.length; i++) if (state.crew[i].turns <= 0) free++;
    return free;
  }

  function freeCells(state) {
    return CELLS_TOTAL - state.cells.length - (state.mpInCell ? 1 : 0) -
      (state.lockedCells ? state.lockedCells.length : 0);
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

  // The borough decays from the moment you book on, boils over between
  // midnight and three (chucking-out through the small hours), then eases
  // back — but never to nothing. It is a hard manor after dark.
  function streetsDrift(turn) {
    return turn >= 5 && turn < 11 ? 5 : 2;
  }

  // A marquee crisis that has begun and not been put to bed gnaws at the
  // borough on its own: the longer it runs unresolved, the more it costs.
  function sagaFester(state) {
    var st = state.marquee && state.stories[state.marquee];
    if (!st || !st.started || st.resolved) return 0;
    return 1;
  }

  // After three a.m. the relief's patience wears down all by itself.
  function reliefDrift(turn) {
    return turn >= 11 ? 1 : 0;
  }

  // Some signals cannot be left unanswered. Drawn with the board empty (or the
  // cells full), they do not become an incident — they end the career.
  function dismissCaught(state, cond) {
    if (cond === 'noUnits') return freeUnits(state) === 0;
    if (cond === 'noCells') return freeCells(state) <= 0;
    return false;
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

  // Eligibility: time-of-night window, cells-full gating, cross-night flags.
  function eligible(state, card) {
    if (card.window && (state.turn < card.window[0] || state.turn > card.window[1])) return false;
    if (card.maxFreeCells !== undefined && freeCells(state) > card.maxFreeCells) return false;
    if (card.minFreeCells !== undefined && freeCells(state) < card.minFreeCells) return false;
    if (card.requiresFlag && state.flags.indexOf(card.requiresFlag) < 0) return false;
    return true;
  }

  // Shuffle, then order for drawing (draws come from the END):
  //  - most-recently-seen ids sink deepest, only dealt when nothing else fits;
  //  - follow-up cards whose flag is live float to the very top: last night's
  //    consequences come looking for you early.
  function orderedPool(items, seen, flags, rng) {
    return shuffle(items, rng)
      .map(function (it) {
        var key;
        if (it.requiresFlag && flags.indexOf(it.requiresFlag) >= 0) key = 2e9;
        else {
          var r = seen.indexOf(it.id);
          key = r === -1 ? 1e9 : r; // finite: Infinity-Infinity is NaN and breaks sort
        }
        return { it: it, key: key };
      })
      .sort(function (a, b) { return a.key - b.key; })
      .map(function (x) { return x.it; });
  }

  // Take the last eligible entry from a pool (mutates the pool). Cards dealt
  // on the immediately previous shift are banned outright — a quiet half hour
  // beats a rerun. Time-specific cards (those with a window) are preferred so
  // the anytime cards become texture rather than the nightly openers; anytime
  // cards fill in only when nothing time-appropriate is left in the deck.
  function takeEligible(pool, state, banned) {
    var fallback = -1;
    for (var i = pool.length - 1; i >= 0; i--) {
      if (!eligible(state, pool[i]) || banned.indexOf(pool[i].id) >= 0) continue;
      if (pool[i].window) return pool.splice(i, 1)[0];
      if (fallback < 0) fallback = i;
    }
    return fallback >= 0 ? pool.splice(fallback, 1)[0] : null;
  }

  function pickFrom(pool, rng, lastId) {
    var candidates = [];
    for (var i = 0; i < pool.length; i++) {
      if (pool[i].id !== lastId) candidates.push(pool[i]);
    }
    if (!candidates.length) candidates = pool.slice();
    return candidates[Math.floor(rng() * candidates.length)];
  }

  function cellLabel(card) {
    var t = card.title || 'PRISONER';
    var dash = t.indexOf(' — ');
    if (dash > 0) t = t.slice(dash + 3);
    return t.length > 22 ? t.slice(0, 21) + '…' : t;
  }

  function createGame(data, rng, opts) {
    rng = rng || Math.random;
    opts = opts || {};
    var seen = opts.seen || [];
    var flags = opts.flags || [];
    var marquee = pickFrom(data.storylines, rng, opts.lastMarquee || null);
    var mini = (data.minisagas && data.minisagas.length)
      ? pickFrom(data.minisagas, rng, opts.lastMini || null) : null;
    var state = {
      data: data,
      rng: rng,
      turn: 0,
      meters: { streets: 55, brass: 55, relief: 55 },
      favours: 1,
      crew: ROSTER.map(function (n) { return { name: n, turns: 0 }; }),
      cells: [],           // [{turnsLeft, label}]
      lockedCells: [],     // [{turnsLeft}] — a cell out of service counts against capacity
      mpInCell: false,
      flags: flags,        // last night's consequences, live tonight
      flagsSet: [],        // tonight's consequences, live tomorrow
      deck: orderedPool(data.cards, seen, flags, rng),
      events: orderedPool(data.events || [], seen, flags, rng),
      banned: seen.slice(0, opts.recent || 0), // last shift's cards: never dealt tonight
      quietPool: shuffle(data.quietTurns, rng),
      ambientPool: shuffle(data.ambient, rng),
      marquee: marquee.id,
      mini: mini ? mini.id : null,
      activeSagas: mini ? [marquee, mini] : [marquee],
      stories: {},         // saga id -> {pending, resolved, started, outcome, grade}
      drawn: [],           // ids of incidents/events dealt this shift (cross-shift history)
      current: null,       // {kind, card, storyId?}
      phase: 'choose',     // 'choose' | 'result' | 'over'
      lastResult: null,
      lastDeltas: null,    // meter deltas applied by the last choice
      lastGamble: null,    // 'won' | 'lost' | null
      arrestsTotal: 0,
      favoursSpent: 0,
      outcomes: [],
      log: [],
      over: false,
      ending: null,
    };
    state.stories[marquee.id] = {
      pending: { stageId: marquee.stages[0].id, dueTurn: marquee.startTurn },
      resolved: false, started: false, outcome: null, grade: null,
    };
    if (mini) {
      var w = mini.startWindow || [3, 8];
      var start = w[0] + Math.floor(rng() * (w[1] - w[0] + 1));
      state.stories[mini.id] = {
        pending: { stageId: mini.stages[0].id, dueTurn: start },
        resolved: false, started: false, outcome: null, grade: null,
      };
    }
    advance(state);
    return state;
  }

  function dueStory(state) {
    // Earliest-due unresolved saga whose stage is scheduled for now or earlier.
    var best = null, bestDue = Infinity;
    for (var i = 0; i < state.activeSagas.length; i++) {
      var s = state.activeSagas[i];
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
    // Same three uses of a quiet half hour, never quite the same words:
    // variant copy rotates per draw, effects stay put.
    var pools = state.data.quietChoices;
    var choices = QUIET_CHOICES;
    if (pools) {
      choices = QUIET_CHOICES.map(function (base) {
        var pool = pools[base.slot] || [];
        if (!pool.length) return base;
        var v = pool[Math.floor(state.rng() * pool.length)];
        return { label: v.label, result: v.result, effects: base.effects };
      });
    }
    return {
      kind: 'quiet',
      card: { title: 'ALL QUIET', text: text, choices: choices },
    };
  }

  function advance(state) {
    if (state.over) return;
    state.turn++;
    state.lastResult = null;
    state.lastDeltas = null;
    state.lastGamble = null;

    if (state.turn > TURNS) {
      endShift(state);
      return;
    }

    // Units come back; prisoners stay until the morning van.
    for (var i = 0; i < state.crew.length; i++) {
      if (state.crew[i].turns > 0) state.crew[i].turns--;
    }
    for (var j = state.cells.length - 1; j >= 0; j--) {
      if (--state.cells[j].turnsLeft <= 0) state.cells.splice(j, 1);
    }

    state.meters.streets = clamp(state.meters.streets - streetsDrift(state.turn) - sagaFester(state));
    state.meters.relief = clamp(state.meters.relief - reliefDrift(state.turn));
    for (var lc = state.lockedCells.length - 1; lc >= 0; lc--) {
      if (--state.lockedCells[lc].turnsLeft <= 0) state.lockedCells.splice(lc, 1);
    }
    // Wounded meters fester: below BLEED_BELOW, everything gets worse on its own.
    for (i = 0; i < METER_KEYS.length; i++) {
      var v = state.meters[METER_KEYS[i]];
      if (v > 0 && v < BLEED_BELOW) state.meters[METER_KEYS[i]] = clamp(v - BLEED);
    }
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
    } else if (state.turn > 1 && state.events.length && state.rng() < EVENT_CHANCE &&
               (card = takeEligible(state.events, state, state.banned))) {
      // (never on the first half hour: the night opens with a job, not a signal)
      state.drawn.push(card.id);
      if (card.dismissIf && dismissCaught(state, card.dismissIf)) {
        pushLog(state, card.title + ' — NO ANSWER FROM THORNE ST');
        state.over = true;
        state.phase = 'over';
        state.ending = {
          kind: 'dismissal',
          cause: card.dismissIf,
          title: card.title,
          text: card.dismissText,
        };
        return;
      }
      state.current = { kind: 'event', card: card };
    } else if (state.deck.length && state.rng() >= QUIET_CHANCE &&
               (card = takeEligible(state.deck, state, state.banned))) {
      state.drawn.push(card.id);
      state.current = { kind: 'incident', card: card };
    } else {
      state.current = drawQuiet(state);
    }
    state.phase = 'choose';
  }

  // If the order names an officer ("Put WPC Hartle on it"), that officer goes —
  // provided they're free. Anyone else needed is made up from the top of the board.
  function crewToSend(state, count, label) {
    var lower = (label || '').toLowerCase();
    var picked = [];
    var i;
    for (i = 0; i < state.crew.length && picked.length < count; i++) {
      var surname = state.crew[i].name.replace(/^(PC|WPC|S\.C\.)\s+/, '').toLowerCase();
      if (state.crew[i].turns <= 0 && lower.indexOf(surname) >= 0) picked.push(state.crew[i]);
    }
    for (i = 0; i < state.crew.length && picked.length < count; i++) {
      if (state.crew[i].turns <= 0 && picked.indexOf(state.crew[i]) < 0) picked.push(state.crew[i]);
    }
    return picked;
  }

  function dispatchCrew(state, count, turns, label) {
    return crewToSend(state, count, label).map(function (pc) {
      pc.turns = turns;
      return pc.name;
    });
  }

  function choose(state, idx) {
    if (state.over || state.phase !== 'choose') return null;
    var card = state.current.card;
    var choice = card.choices[idx];
    if (!choice || !choiceStatus(state, choice).enabled) return null;

    var e = choice.effects || {};
    var gambleLost = false;
    if (choice.risk && state.rng() * 100 >= choice.risk.odds) gambleLost = true;
    state.lastGamble = choice.risk ? (gambleLost ? 'lost' : 'won') : null;

    // Meter deltas: the success effects, or the failure branch of a lost gamble.
    var meterSource = gambleLost ? (choice.risk.failEffects || {}) : e;
    var before = {
      streets: state.meters.streets, brass: state.meters.brass, relief: state.meters.relief,
    };
    for (var i = 0; i < METER_KEYS.length; i++) {
      var k = METER_KEYS[i];
      if (meterSource[k]) state.meters[k] = clamp(state.meters[k] + meterSource[k]);
    }
    state.lastDeltas = {
      streets: state.meters.streets - before.streets,
      brass: state.meters.brass - before.brass,
      relief: state.meters.relief - before.relief,
    };

    // Resources: a gamble spends what it spends whether or not it comes off —
    // but a lost gamble books nobody and earns no favours.
    if (e.favours) {
      if (e.favours < 0) {
        state.favoursSpent += -e.favours;
        state.favours = Math.max(0, state.favours + e.favours);
      } else if (!gambleLost) {
        state.favours += e.favours;
      }
    }
    var n;
    if (e.arrests > 0 && !gambleLost) {
      for (n = 0; n < e.arrests; n++) {
        state.cells.push({ turnsLeft: CELL_HOLD_TURNS, label: cellLabel(card) });
      }
      state.arrestsTotal += e.arrests;
    }
    var names = [];
    if (e.dispatchUnits > 0) {
      names = dispatchCrew(state, e.dispatchUnits, Math.max(1, e.dispatchTurns || 1), choice.label);
    }
    if (e.bonusUnits > 0 && state.crew.length < CREW_MAX) {
      state.crew.push({ name: 'S.C. PRING', turns: 0 });
    }
    if (e.seizeCount > 0) {
      // The night takes officers off the books with no say; it can only take
      // officers who are actually spare. Named officers go first here too.
      dispatchCrew(state, Math.min(e.seizeCount, freeUnits(state)), Math.max(1, e.seizeTurns || 2),
        (card.title || '') + ' ' + (choice.label || '') + ' ' + (card.text || ''));
    }
    if (e.lockCells > 0) {
      // A cell goes out of service: only an empty cell can break.
      var lockable = Math.min(e.lockCells, freeCells(state));
      for (var li = 0; li < lockable; li++) {
        state.lockedCells.push({ turnsLeft: Math.max(1, e.lockTurns || 4) });
      }
    }
    if (e.releaseCells > 0) {
      // Bail, or a word from on high: bodies walk, cells come back. The
      // Honourable Member's cell is not in anyone's gift but his saga's.
      state.cells.splice(0, e.releaseCells);
    }

    if (choice.sets && state.flagsSet.indexOf(choice.sets) < 0) state.flagsSet.push(choice.sets);

    pushLog(state, card.title + ' — ' + choice.label.toUpperCase() +
      (names.length ? ' (' + names.join(', ') + ')' : '') +
      (state.lastGamble === 'lost' ? ' — IT GOES WRONG' : ''));

    if (state.current.kind === 'story') {
      var story = null;
      for (n = 0; n < state.activeSagas.length; n++) {
        if (state.activeSagas[n].id === state.current.storyId) story = state.activeSagas[n];
      }
      var st = state.stories[story.id];
      // A lost gamble can throw the saga somewhere worse (failGoto) or resolve
      // it with its own bitter ending (failOutcome/failGrade).
      var goto_ = choice.goto, delay = choice.delay, outcome = choice.outcome, grade = choice.grade;
      if (gambleLost && choice.risk.failGoto) {
        goto_ = choice.risk.failGoto; delay = choice.risk.failDelay || 1; outcome = null;
      } else if (gambleLost && choice.risk.failOutcome) {
        goto_ = null; outcome = choice.risk.failOutcome; grade = choice.risk.failGrade || 'poor';
      }
      if (goto_ && stageById(story, goto_)) {
        // A stage can refuse to arrive before its hour (notBefore): first light
        // does not come at half past two however hard the player pushes.
        var target = stageById(story, goto_);
        var due = state.turn + Math.max(1, delay || 2);
        if (target && target.notBefore) due = Math.max(due, target.notBefore);
        st.pending = { stageId: goto_, dueTurn: due };
      } else {
        st.resolved = true;
        st.outcome = outcome || null;
        st.grade = grade || 'mixed';
        if (outcome) state.outcomes.push(outcome);
        if (story.id === 'mp') state.mpInCell = false;
      }
    }

    state.lastResult = gambleLost ? choice.risk.failResult : choice.result;
    state.phase = 'result';
    checkDeath(state);
    return choice;
  }

  function proceed(state) {
    if (state.phase !== 'result') return;
    if (state.over) { state.phase = 'over'; return; }
    advance(state);
  }

  var GRADE_MOD = { good: 4, mixed: 0, poor: -5 };

  function endShift(state) {
    state.over = true;
    state.phase = 'over';
    var avg = Math.round((state.meters.streets + state.meters.brass + state.meters.relief) / 3);

    // The sagas weight the debrief: a botched marquee drags the night down,
    // and no COMMENDATION was ever won on tidy meters alone.
    var marqueeStory = state.stories[state.marquee];
    var marqueeGrade = marqueeStory && marqueeStory.resolved ? marqueeStory.grade : 'unresolved';
    avg += marqueeGrade === 'unresolved' ? -11 : (GRADE_MOD[marqueeGrade] || 0);
    if (state.mini) {
      var miniStory = state.stories[state.mini];
      var miniGrade = miniStory && miniStory.resolved ? miniStory.grade : null;
      if (miniStory && miniStory.started) {
        avg += miniGrade === 'good' ? 2 : miniGrade === 'poor' || !miniGrade ? -2 : 0;
      }
    }
    avg = Math.max(0, Math.min(100, avg));

    var tiers = state.data.debriefs.slice().sort(function (a, b) { return b.minAvg - a.minAvg; });
    // Surviving the night is ACCEPTABLE. EXEMPLARY takes a strong average or
    // one statistic kept genuinely high — and a marquee saga brought home well.
    var maxMeter = Math.max(state.meters.streets, state.meters.brass, state.meters.relief);
    var tier = (avg >= tiers[0].minAvg || maxMeter >= 75) ? tiers[0] : tiers[tiers.length - 1];
    if (tier === tiers[0] && marqueeGrade !== 'good') tier = tiers[tiers.length - 1];

    var outcomes = state.outcomes.slice();
    for (var j = 0; j < state.activeSagas.length; j++) {
      var s = state.activeSagas[j];
      var st = state.stories[s.id];
      if (st && st.started && !st.resolved && s.unresolvedOutcome) outcomes.push(s.unresolvedOutcome);
    }
    var marqueeTitle = null;
    for (j = 0; j < state.data.storylines.length; j++) {
      if (state.data.storylines[j].id === state.marquee) marqueeTitle = state.data.storylines[j].title;
    }
    state.ending = {
      kind: 'debrief', avg: avg, title: tier.title, text: tier.text, outcomes: outcomes,
      saga: { title: marqueeTitle, grade: marqueeGrade },
      stats: {
        arrests: state.arrestsTotal,
        favoursSpent: state.favoursSpent,
        cellsHeld: state.cells.length + (state.mpInCell ? 1 : 0),
      },
    };
  }

  return {
    TURNS: TURNS,
    UNITS_TOTAL: ROSTER.length,
    CELLS_TOTAL: CELLS_TOTAL,
    createGame: createGame,
    choose: choose,
    proceed: proceed,
    choiceStatus: choiceStatus,
    crewToSend: crewToSend,
    freeUnits: freeUnits,
    freeCells: freeCells,
    turnClock: turnClock,
    streetsDrift: streetsDrift,
    reliefDrift: reliefDrift,
    sagaFester: sagaFester,
    seededRng: seededRng,
    BLEED_BELOW: BLEED_BELOW,
  };
});
