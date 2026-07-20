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
  var CREW_MAX = 7;

  var MODES = {
    short: { size: 3, favours: 0 },
    standard: { size: 4, favours: 1 },
    full: { size: 5, favours: 2 },
  };

  var TRAIT_INFO = {
    steady: { word: 'Steady', desc: 'Gambles they ride on run +10.' },
    fast: { word: 'Fast', desc: 'Back from every job half an hour early.' },
    thorough: { word: 'Thorough', desc: 'Brass gains on their jobs get +1.' },
    kind: { word: 'Kind', desc: 'Relief costs on their jobs softened by 1.' },
    sharp: { word: 'Sharp', desc: 'Streets costs on their jobs softened by 1.' },
    oldsweat: { word: 'Old sweat', desc: 'The night’s seizures never find them.' },
    jammy: { word: 'Jammy', desc: 'Gambles they ride on run +5.' },
    green: { word: 'Green', desc: 'Out on every job half an hour longer.' },
  };
  var POOL = [
    ['PC DOYLE', 'steady'], ['PC HALLAM', 'steady'],
    ['PC WHITTLE', 'fast'], ['PC PYE', 'fast'], ['PC MULLANEY', 'fast'],
    ['PC DUFFIN', 'thorough'], ['PC BICKERSTAFF', 'thorough'],
    ['WPC HARTLE', 'kind'], ['PC TANSEY', 'kind'], ['WPC MOYES', 'kind'],
    ['WPC MARRIS', 'sharp'], ['PC LATIMER', 'sharp'],
    ['PC ODGERS', 'oldsweat'], ['PC STROUD', 'oldsweat'], ['PC BURNELL', 'oldsweat'],
    ['PC JARRETT', 'jammy'], ['WPC FENN', 'jammy'],
    ['PC RENWICK', 'green'], ['PC TREADWELL', 'green'], ['WPC CADDICK', 'green'],
  ];

  function drawRoster(size, rng) {
    var shuffled = shuffle(POOL, rng);
    var picked = [], wpcs = 0;
    for (var i = 0; i < shuffled.length && picked.length < size; i++) {
      var isW = shuffled[i][0].indexOf('WPC') === 0;
      if (isW && wpcs >= 2) continue;
      if (isW) wpcs++;
      picked.push({ name: shuffled[i][0], trait: shuffled[i][1], turns: 0 });
    }
    return picked;
  }

  function buildNameMap(crew) {
    var pool = crew.slice();
    function take(pred) {
      for (var i = 0; i < pool.length; i++) {
        if (!pred || pred(pool[i])) return pool.splice(i, 1)[0];
      }
      return null;
    }
    function ent(pc) {
      var m = pc.name.match(/^(PC|WPC|DS|S\.C\.)\s+(.+)$/);
      var sur = m ? m[2] : pc.name;
      return { rank: m ? m[1] : 'PC', cap: sur.charAt(0) + sur.slice(1).toLowerCase(), pc: pc };
    }
    var isW = function (pc) { return pc.name.indexOf('WPC') === 0; };
    var notW = function (pc) { return !isW(pc); };
    var self = function (nm) { return function (pc) { return pc.name === nm; }; };
    var d = take(self('PC DOYLE'));
    var w = take(self('PC WHITTLE'));
    var u = take(self('PC DUFFIN'));
    var h = take(self('WPC HARTLE'));
    if (!h) h = take(isW);
    if (!d) d = take(notW);
    if (!w) w = take(notW);
    if (!u) u = take(notW);
    return {
      DOYLE: d ? ent(d) : { rank: 'PC', cap: 'Doyle', pc: null },
      WHITTLE: w ? ent(w) : { rank: 'PC', cap: 'Whittle', pc: null },
      DUFFIN: u ? ent(u) : { rank: 'PC', cap: 'Duffin', pc: null },
      HARTLE: h ? ent(h) : { rank: 'WPC', cap: 'Hartle', pc: null },
    };
  }

  function localiseText(state, text) {
    if (!state.nameMap || !text) return text;
    return text.replace(/\b(PC |WPC )?(Doyle|Whittle|Duffin|Hartle|DOYLE|WHITTLE|DUFFIN|HARTLE)\b/g,
      function (m, rank, nm) {
        var t = state.nameMap[nm.toUpperCase()];
        if (!t) return m;
        var caps = nm === nm.toUpperCase();
        var sur = caps ? t.cap.toUpperCase() : t.cap;
        return rank ? t.rank + ' ' + sur : sur;
      });
  }

  var QUIET_CHOICES = [
    { slot: 'relief', label: 'Brew up for the lads', result: 'Tea the colour of creosote, all round. Morale visibly improves.', effects: { relief: 4 } },
    { slot: 'brass', label: 'Catch up on the paperwork', result: 'Two hours of overdue crime sheets done in thirty minutes. The Chief Inspector will never know how close it was.', effects: { brass: 4 } },
    { slot: 'streets', label: 'Walk the ground yourself', result: 'You show the flag down the high street. Two scallywags change their plans for the evening.', effects: { streets: 5 } },
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

  function streetsDrift(turn) {
    return turn >= 5 && turn <= 12 ? 4 : 2; // steady rot, harder through the small hours
  }

  function sagaFester(state) {
    var st = state.marquee && state.stories[state.marquee];
    if (!st || !st.started || st.resolved) return 0;
    return 1;
  }

  function reliefDrift(turn) {
    return turn >= 11 ? 1 : 0;
  }

  function streetsDriftNow(state) {
    var d = streetsDrift(state.turn) + sagaFester(state);
    var m = state.notice && state.notice.mods;
    if (m && m.streetsPeakExtra && state.turn >= 5 && state.turn <= 12) d += m.streetsPeakExtra;
    return d;
  }

  function reliefDriftNow(state) {
    var d = reliefDrift(state.turn);
    var m = state.notice && state.notice.mods;
    if (m && m.reliefLateExtra && state.turn >= 11) d += m.reliefLateExtra;
    return d;
  }

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

  function eligible(state, card) {
    if (card.window && (state.turn < card.window[0] || state.turn > card.window[1])) return false;
    if (card.maxFreeCells !== undefined && freeCells(state) > card.maxFreeCells) return false;
    if (card.minFreeCells !== undefined && freeCells(state) < card.minFreeCells) return false;
    if (card.requiresFlag && state.flags.indexOf(card.requiresFlag) < 0) return false;
    if (card.venue && state.venuesTonight.indexOf(card.venue) >= 0) return false;
    if (card.requiresWPC && !state.crew.some(function (pc) { return pc.name.indexOf('WPC') === 0; })) return false;
    if (state.seconded && card.choices && card.choices[0] &&
        (card.choices[0].effects || {}).bonusUnits > 0) return false;
    return true;
  }

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

  function orderedEvents(items, seen, flags, rng) {
    var pool = orderedPool(items, seen, flags, rng);
    if (flags.indexOf('flag_duke_grateful') < 0) return pool;
    var seize = [], rest = [];
    for (var i = 0; i < pool.length; i++) {
      var e0 = pool[i].choices && pool[i].choices[0] && pool[i].choices[0].effects;
      (e0 && e0.seizeCount > 0 ? seize : rest).push(pool[i]);
    }
    return rest.concat(seize); // draws come from the end: seizures first
  }

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

  function pickRotating(pool, rng, lastId, seenIds) {
    var seen = seenIds || [];
    var fresh = [];
    for (var i = 0; i < pool.length; i++) {
      if (seen.indexOf(pool[i].id) < 0) fresh.push(pool[i]);
    }
    if (!fresh.length) fresh = pool.slice();
    return pickFrom(fresh, rng, lastId);
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
    var mode = MODES[opts.mode] ? opts.mode : 'standard';
    var marquee = pickRotating(data.storylines, rng, opts.lastMarquee || null, opts.seenMarquees);
    var mini = null;
    if (data.minisagas && data.minisagas.length) {
      var miniPool = data.minisagas.filter(function (m) {
        return !m.venue || !marquee.venue || m.venue !== marquee.venue;
      });
      if (!miniPool.length) miniPool = data.minisagas;
      var seenM = opts.seenMinis || [];
      if (!miniPool.some(function (m) { return seenM.indexOf(m.id) < 0; })) {
        var freshAll = data.minisagas.filter(function (m) { return seenM.indexOf(m.id) < 0; });
        if (freshAll.length) miniPool = freshAll;
      }
      mini = pickRotating(miniPool, rng, opts.lastMini || null, opts.seenMinis);
    }
    var paradeSize = MODES[mode].size;
    if (flags.indexOf('flag_pc_abducted') >= 0) paradeSize = Math.max(2, paradeSize - 1);
    var state = {
      data: data,
      rng: rng,
      turn: 0,
      mode: mode,
      meters: { streets: 55, brass: 55, relief: 55 },
      favours: Math.min(2, MODES[mode].favours + (opts.favours > 0 ? opts.favours : 0)),
      crew: drawRoster(paradeSize, rng),
      cells: [],           // [{turnsLeft, label}]
      lockedCells: [],     // [{turnsLeft}] — a cell out of service counts against capacity
      mpInCell: false,
      flags: flags,        // last night's consequences, live tonight
      flagsSet: [],        // tonight's consequences, live tomorrow
      deck: orderedPool(data.cards, seen, flags, rng),
      events: orderedEvents(data.events || [], seen, flags, rng),
      banned: seen.slice(0, opts.recent || 0), // last shift's cards: never dealt tonight
      venuesTonight: [marquee.venue, mini && mini.venue].filter(Boolean), // one visit per venue per night
      quietPool: shuffle(data.quietTurns, rng),
      ambientPool: shuffle(data.ambient, rng),
      marquee: marquee.id,
      mini: mini ? mini.id : null,
      activeSagas: mini ? [marquee, mini] : [marquee],
      stories: {},         // saga id -> {pending, resolved, started, outcome, grade}
      drawn: [],           // ids of incidents/events dealt this shift (cross-shift history)
      current: null,       // {kind, card, storyId?}
      phase: 'choose',     // 'choose' | 'result' | 'over'
      notice: null,        // tonight's parade notice: {id, title, text, mods}
      callsUsed: {},       // spg/dogs/cid — each unit answers one call a night
      assistUsed: false,   // the whistle only works once a shift
      gambleBoost: 0,      // Dog Section standing by: +odds on the next gamble
      lastResult: null,
      lastDeltas: null,    // meter deltas applied by the last choice
      lastGamble: null,    // 'won' | 'lost' | null
      lastBoost: null,     // boosts actually applied to the last gamble
      arrestsTotal: 0,
      favoursSpent: 0,
      outcomes: [],
      log: [],
      over: false,
      ending: null,
    };
    state.nameMap = buildNameMap(state.crew);
    if (flags.indexOf('flag_duke_grateful') >= 0) {
      state.crew.push({ name: 'DS PALGRAVE', trait: 'steady', turns: 0, seconded: true });
      state.seconded = true;
      state.log.push({
        time: '2245',
        text: 'SECONDED FOR THE NIGHT — DS PALGRAVE, ROYALTY PROTECTION, BY THE DUKE OF THORNBURY’S ARRANGEMENT (POSTMARKED BARBADOS). THE SERGEANT IS NOT THRILLED.',
      });
    }
    if (flags.indexOf('flag_pc_abducted') >= 0) {
      state.log.push({
        time: '2245',
        text: 'ONE SHORT ON PARADE — THE MAN WHO WENT UP THE RECREATION GROUND HAS NOT COME BACK. THE YARD RULES IT A MATTER FOR LOCAL MANAGEMENT, AND DECLINES TO DEFINE THE MATTER.',
      });
    }
    if (opts.lastMarquee && opts.lastMarqueeGrade) {
      for (var ec = 0; ec < data.storylines.length; ec++) {
        var echoSaga = data.storylines[ec];
        if (echoSaga.id === opts.lastMarquee) {
          var echoLine = echoSaga.echoes && echoSaga.echoes[opts.lastMarqueeGrade];
          if (echoLine) state.log.push({ time: '2245', text: echoLine });
          break;
        }
      }
    }
    if (opts.favours > 0 && state.favours > MODES[mode].favours) {
      var carried = state.favours - MODES[mode].favours;
      state.log.push({
        time: '2245',
        text: 'STILL ON THE BOOK FROM LAST NIGHT — ' +
          (carried > 1 ? 'TWO FAVOURS' : 'A FAVOUR') + ' OWED AROUND THE MANOR AND NOT YET COLLECTED.',
      });
    }
    if (flags.indexOf('flag_president_grateful') >= 0) {
      state.meters.brass = clamp(state.meters.brass + 8);
      state.favours = Math.min(2, state.favours + 1); // the cap holds even for presidents
      state.log.push({
        time: '2245',
        text: 'THE ZUBROVIAN EMBASSY CAR CALLS AT PARADE — PLUM BRANDY FOR THE RELIEF, AND A LETTER FROM NO 10 THE COMMANDER HAS ALREADY FRAMED. THE MANOR IS OWED A FAVOUR, AND KNOWS IT.',
      });
    }
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
    if (data.notices && data.notices.length) {
      var notice = pickRotating(data.notices, rng, opts.lastNotice || null, opts.seenNotices);
      state.notice = notice;
      var nm = notice.mods || {};
      if (nm.reliefStart) state.meters.relief = clamp(state.meters.relief + nm.reliefStart);
      if (nm.streetsStart) state.meters.streets = clamp(state.meters.streets + nm.streetsStart);
      if (nm.seizeOne && state.crew.length) state.crew[0].turns = nm.seizeOne;
      state.log.push({ time: '2245', text: 'PARADE NOTICE — ' + notice.title.toUpperCase() });
    }
    if (state.crew.length >= 4 && rng() < 0.08) {
      var fit = [];
      for (var fi2 = 0; fi2 < state.crew.length; fi2++) {
        if (state.crew[fi2].turns <= 0) fit.push(state.crew[fi2]);
      }
      if (fit.length) {
        var lush = fit[Math.floor(rng() * fit.length)];
        lush.turns = TURNS + 2; // not coming back tonight
        lush.off = true;        // the chalk reads SENT HOME, not BACK AT
        state.log.push({
          time: '2245',
          text: 'PARADE — ' + lush.name + ' REPORTS UNFIT THROUGH DRINK. SENT HOME. ONE SHORT ALL NIGHT.',
        });
      }
    }
    advance(state);
    return state;
  }

  function dueStory(state) {
    var best = null, bestDue = Infinity, bestHot = false;
    for (var i = 0; i < state.activeSagas.length; i++) {
      var s = state.activeSagas[i];
      var st = state.stories[s.id];
      if (!st || st.resolved || !st.pending) continue;
      if (st.pending.dueTurn > state.turn) continue;
      var hot = !!st.pending.hot;
      if (best === null || (hot && !bestHot) || (hot === bestHot && st.pending.dueTurn < bestDue)) {
        best = s; bestDue = st.pending.dueTurn; bestHot = hot;
      }
    }
    return best;
  }

  function drawQuiet(state) {
    if (!state.quietPool.length) state.quietPool = shuffle(state.data.quietTurns, state.rng);
    var text = state.quietPool.pop();
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

    for (var i = 0; i < state.crew.length; i++) {
      if (state.crew[i].turns > 0) state.crew[i].turns--;
    }
    for (var lb = 0; lb < state.crew.length; lb++) {
      var lent = state.crew[lb];
      if (lent.loan && !lent.off && state.turn > lent.until && lent.turns <= 0) {
        lent.turns = TURNS + 2;
        lent.off = true;
        pushLog(state, lent.name + ' AWAY BACK TO HIS OWN NICK — WITH SOMETHING TO TELL THEM');
      }
    }
    for (var j = state.cells.length - 1; j >= 0; j--) {
      if (--state.cells[j].turnsLeft <= 0) state.cells.splice(j, 1);
    }
    if (state.notice && state.notice.mods && state.notice.mods.vanAt === state.turn &&
        state.cells.length) {
      var away = state.cells.length;
      state.cells = [];
      pushLog(state, 'THE EARLY VAN — ' + away + (away > 1 ? ' BODIES' : ' BODY') + ' AWAY TO BOW STREET');
    }

    state.meters.streets = clamp(state.meters.streets - streetsDriftNow(state));
    state.meters.relief = clamp(state.meters.relief - reliefDriftNow(state));
    for (var lc = state.lockedCells.length - 1; lc >= 0; lc--) {
      if (--state.lockedCells[lc].turnsLeft <= 0) state.lockedCells.splice(lc, 1);
    }
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
      state.drawn.push(card.id);
      if (card.venue) state.venuesTonight.push(card.venue);
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
      if (card.venue) state.venuesTonight.push(card.venue);
      state.current = { kind: 'incident', card: card };
    } else {
      state.current = drawQuiet(state);
    }
    state.phase = 'choose';
  }

  function crewToSend(state, count, label) {
    var lower = localiseText(state, label || '').toLowerCase();
    var picked = [];
    var i;
    for (i = 0; i < state.crew.length && picked.length < count; i++) {
      var surname = state.crew[i].name.replace(/^(PC|WPC|DS|S\.C\.)\s+/, '').toLowerCase();
      if (state.crew[i].turns <= 0 && lower.indexOf(surname) >= 0) picked.push(state.crew[i]);
    }
    var h = ((state.turn * 374761393) + (state.drawn.length * 668265263)) >>> 0;
    h = ((h ^ (h >>> 13)) * 1274126177) >>> 0;
    var off = ((h ^ (h >>> 16)) >>> 0) % state.crew.length;
    for (i = 0; i < state.crew.length && picked.length < count; i++) {
      var pc = state.crew[(i + off) % state.crew.length];
      if (pc.turns <= 0 && picked.indexOf(pc) < 0) picked.push(pc);
    }
    return picked;
  }

  function dispatchCrew(state, count, turns, label) {
    return crewToSend(state, count, label).map(function (pc) {
      var t = turns;
      if (pc.trait === 'fast') t = Math.max(1, t - 1);
      if (pc.trait === 'green') t = t + 1;
      pc.turns = t;
      return pc.name;
    });
  }

  function crewGambleBonus(state, choice) {
    var e = choice.effects || {};
    if (!choice.risk || !(e.dispatchUnits > 0)) return null;
    var crew = crewToSend(state, e.dispatchUnits, choice.label);
    var best = null;
    for (var i = 0; i < crew.length; i++) {
      var b = crew[i].trait === 'steady' ? 10 : crew[i].trait === 'jammy' ? 5 : 0;
      if (b && (!best || b > best.bonus)) {
        best = { bonus: b, name: crew[i].name, word: TRAIT_INFO[crew[i].trait].word };
      }
    }
    return best;
  }

  var BOOST_UNIT = 15, BOOST_FAVOUR = 15, ODDS_CAP = 95;

  function boostAvail(state, choice) {
    var e = choice.effects || {};
    var needF = e.favours && e.favours < 0 ? -e.favours : 0;
    return {
      extraUnit: freeUnits(state) > (e.dispatchUnits || 0),
      favour: state.favours >= needF + 1,
      dogs: (state.gambleBoost || 0) > 0,
    };
  }

  function effectiveOdds(state, choice, boost) {
    if (!choice.risk) return null;
    var odds = choice.risk.odds;
    if (boost && boost.extraUnit) odds += BOOST_UNIT;
    if (boost && boost.favour) odds += BOOST_FAVOUR;
    odds += state.gambleBoost || 0;
    var rider = crewGambleBonus(state, choice);
    if (rider) odds += rider.bonus;
    return Math.min(ODDS_CAP, odds);
  }

  function choose(state, idx, boost) {
    if (state.over || state.phase !== 'choose') return null;
    var card = state.current.card;
    var choice = card.choices[idx];
    if (!choice || !choiceStatus(state, choice).enabled) return null;

    var e = choice.effects || {};
    var applied = { extraUnit: false, favour: false, dogs: false };
    if (choice.risk && boost) {
      var avail = boostAvail(state, choice);
      applied.extraUnit = !!boost.extraUnit && avail.extraUnit;
      applied.favour = !!boost.favour && avail.favour;
    }
    if (choice.risk && state.gambleBoost > 0) applied.dogs = true;

    var gambleLost = false;
    if (choice.risk && state.rng() * 100 >= effectiveOdds(state, choice, applied)) gambleLost = true;
    if (choice.risk) state.gambleBoost = 0; // the dogs get one run, win or lose
    state.lastGamble = choice.risk ? (gambleLost ? 'lost' : 'won') : null;
    state.lastBoost = choice.risk ? applied : null;

    var riding = {};
    if (e.dispatchUnits > 0) {
      crewToSend(state, e.dispatchUnits, choice.label).forEach(function (pc) {
        if (pc.trait) riding[pc.trait] = true;
      });
    }
    var meterSource = gambleLost ? (choice.risk.failEffects || {}) : e;
    var before = {
      streets: state.meters.streets, brass: state.meters.brass, relief: state.meters.relief,
    };
    for (var i = 0; i < METER_KEYS.length; i++) {
      var k = METER_KEYS[i];
      var dv = meterSource[k] || 0;
      if (dv < 0 && k === 'relief' && riding.kind) dv += 1;
      if (dv < 0 && k === 'streets' && riding.sharp) dv += 1;
      if (dv > 0 && k === 'brass' && riding.thorough) dv += 1;
      if (dv) state.meters[k] = clamp(state.meters[k] + dv);
    }
    state.lastDeltas = {
      streets: state.meters.streets - before.streets,
      brass: state.meters.brass - before.brass,
      relief: state.meters.relief - before.relief,
    };

    if (e.favours) {
      if (e.favours < 0) {
        state.favoursSpent += -e.favours;
        state.favours = Math.max(0, state.favours + e.favours);
      } else if (!gambleLost) {
        state.favours += e.favours;
      }
    }
    if (applied.favour) {
      state.favoursSpent += 1;
      state.favours = Math.max(0, state.favours - 1);
    }
    var n;
    if (e.arrests > 0 && !gambleLost) {
      for (n = 0; n < e.arrests; n++) {
        state.cells.push({ turnsLeft: CELL_HOLD_TURNS, label: cellLabel(card) });
      }
      state.arrestsTotal += e.arrests;
    }
    var names = [];
    var fogExtra = (state.notice && state.notice.mods && state.notice.mods.dispatchExtra) || 0;
    var outFor = Math.max(1, e.dispatchTurns || 1) + 1 + fogExtra;
    if (e.dispatchUnits > 0) {
      names = dispatchCrew(state, e.dispatchUnits, outFor, choice.label);
    }
    if (applied.extraUnit) {
      names = names.concat(dispatchCrew(state, 1, outFor, ''));
    }
    if (e.bonusUnits > 0 && state.crew.length < CREW_MAX) {
      state.crew.push({ name: 'S.C. PRING', turns: 0 });
    }
    if (e.seizeCount > 0) {
      var sweats = [];
      for (var sw = 0; sw < state.crew.length; sw++) {
        if (state.crew[sw].trait === 'oldsweat' && state.crew[sw].turns <= 0) sweats.push(state.crew[sw]);
      }
      sweats.forEach(function (pc) { pc.turns = 0.4; }); // briefly invisible to the draft
      var seizeFor = Math.max(1, e.seizeTurns || 2) + (state.seconded ? 2 : 0);
      dispatchCrew(state, Math.min(e.seizeCount, freeUnits(state)), seizeFor,
        (card.title || '') + ' ' + (choice.label || '') + ' ' + (card.text || ''));
      sweats.forEach(function (pc) { if (pc.turns === 0.4) pc.turns = 0; });
    }
    if (e.lockCells > 0) {
      var lockable = Math.min(e.lockCells, freeCells(state));
      for (var li = 0; li < lockable; li++) {
        state.lockedCells.push({ turnsLeft: Math.max(1, e.lockTurns || 4) });
      }
    }
    if (e.releaseCells > 0) {
      state.cells.splice(0, e.releaseCells);
    }

    if (e.spendDogs) { state.dogsSpent = true; state.gambleBoost = 0; }

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
      var goto_ = choice.goto, delay = choice.delay, outcome = choice.outcome, grade = choice.grade;
      if (gambleLost && choice.risk.failGoto) {
        goto_ = choice.risk.failGoto; delay = choice.risk.failDelay || 1; outcome = null;
      } else if (gambleLost && choice.risk.failOutcome) {
        goto_ = null; outcome = choice.risk.failOutcome; grade = choice.risk.failGrade || 'poor';
      }
      if (goto_ && stageById(story, goto_)) {
        var target = stageById(story, goto_);
        var due = state.turn + Math.max(1, delay || 2);
        if (target && target.notBefore) due = Math.max(due, target.notBefore);
        st.pending = { stageId: goto_, dueTurn: due, hot: due === state.turn + 1 };
      } else {
        st.resolved = true;
        st.outcome = outcome || null;
        st.grade = grade || 'mixed';
        var gradeFlag = story.gradeFlags && story.gradeFlags[st.grade];
        if (gradeFlag && state.flagsSet.indexOf(gradeFlag) < 0) state.flagsSet.push(gradeFlag);
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

  var CID_RESULT = 'Two night-duty C.I.D. men arrive wearing one overcoat’s worth of ' +
    'goodwill between them, take the papers, the witnesses and the grief off the front desk, ' +
    'and leave without saying thank you. The matter is theirs now, and so is whatever credit ' +
    'it carries. Division makes a note that Thorne Street rang for help.';

  var ASSIST_POOL = ['PC KEOGH', 'PC BLETHYN', 'PC SUMMERSKILL', 'PC DACRE'];
  function urgentAssistance(state) {
    if (state.over || state.phase !== 'choose' || state.assistUsed) return null;
    if (freeUnits(state) > 0 || state.crew.length >= CREW_MAX) return null;
    state.assistUsed = true;
    var name = ASSIST_POOL[Math.floor(state.rng() * ASSIST_POOL.length)];
    state.crew.push({ name: name, turns: 0, loan: true, until: state.turn });
    state.meters.brass = clamp(state.meters.brass - 8);
    state.meters.relief = clamp(state.meters.relief - 8);
    pushLog(state, 'URGENT ASSISTANCE — THE WHISTLE CARRIES THREE STREETS. ' +
      name + ' LENT BY THE NEIGHBOURING DIVISION FOR THE TURN. THE YARD WILL HEAR OF THIS.');
    checkDeath(state);
    if (state.over) state.phase = 'over';
    return name;
  }

  function callIn(state, which) {
    if (state.over || state.phase !== 'choose' || state.callsUsed[which]) return null;
    if (which === 'dogs' && state.dogsSpent) return null; // the van is otherwise engaged
    if (which === 'spg') {
      state.meters.streets = clamp(state.meters.streets + 10);
      state.meters.relief = clamp(state.meters.relief - 2);
      pushLog(state, 'RANG DIVISION — S.P.G. SERIAL TASKED TO THE MANOR FOR THE HOUR');
    } else if (which === 'dogs') {
      state.gambleBoost = 20;
      pushLog(state, 'RANG DIVISION — DOG SECTION STANDING BY');
    } else if (which === 'cid') {
      if (!state.current || state.current.kind !== 'incident') return null;
      pushLog(state, 'RANG DIVISION — NIGHT-DUTY C.I.D. TAKE ' + (state.current.card.title || 'THE JOB'));
      state.lastResult = CID_RESULT;
      state.lastDeltas = { streets: 0, brass: 0, relief: 0 };
      state.lastGamble = null;
      state.lastBoost = null;
      state.phase = 'result';
    } else {
      return null;
    }
    state.callsUsed[which] = true;
    checkDeath(state);
    if (state.over) state.phase = 'over';
    return which;
  }

  var GRADE_MOD = { good: 4, mixed: 0, poor: -5 };

  function endShift(state) {
    state.over = true;
    state.phase = 'over';
    var avg = Math.round((state.meters.streets + state.meters.brass + state.meters.relief) / 3);

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
    var maxMeter = Math.max(state.meters.streets, state.meters.brass, state.meters.relief);
    var tier = (avg >= tiers[0].minAvg || maxMeter >= 75) ? tiers[0] : tiers[tiers.length - 1];
    if (tier === tiers[0] && marqueeGrade !== 'good') tier = tiers[tiers.length - 1];
    if (state.mode === 'full') tier = tiers[tiers.length - 1];

    var outcomes = state.outcomes.slice();
    for (var j = 0; j < state.activeSagas.length; j++) {
      var s = state.activeSagas[j];
      var st = state.stories[s.id];
      if (st && st.started && !st.resolved && s.unresolvedOutcome) outcomes.push(s.unresolvedOutcome);
    }
    var marqueeTitle = state.activeSagas[0].title;
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
    UNITS_TOTAL: MODES.standard.size,
    CELLS_TOTAL: CELLS_TOTAL,
    MODES: MODES,
    TRAIT_INFO: TRAIT_INFO,
    POOL: POOL,
    createGame: createGame,
    choose: choose,
    proceed: proceed,
    callIn: callIn,
    urgentAssistance: urgentAssistance,
    choiceStatus: choiceStatus,
    boostAvail: boostAvail,
    effectiveOdds: effectiveOdds,
    crewGambleBonus: crewGambleBonus,
    localiseText: localiseText,
    crewToSend: crewToSend,
    freeUnits: freeUnits,
    freeCells: freeCells,
    turnClock: turnClock,
    streetsDrift: streetsDrift,
    reliefDrift: reliefDrift,
    streetsDriftNow: streetsDriftNow,
    reliefDriftNow: reliefDriftNow,
    sagaFester: sagaFester,
    seededRng: seededRng,
    BLEED_BELOW: BLEED_BELOW,
  };
});

(function (root) {
  'use strict';

  var ctx = null, master = null, noiseBuf = null;
  var ambient = null;      // {nodes: [], sirenTimer}
  var enabled = true;
  var volume = 0.55;       // user volume 0-1, mapped onto master gain
  try {
    enabled = (root.localStorage && root.localStorage.getItem('dg_sound')) !== 'off';
    var v = root.localStorage && root.localStorage.getItem('dg_vol');
    if (v !== null && v !== undefined && v !== '') volume = Math.max(0, Math.min(1, parseFloat(v)));
  } catch (e) { /* private mode */ }

  function masterGain() { return 0.3 * volume; }

  function ensure() {
    if (!enabled) return null;
    try {
      if (!ctx) {
        var AC = root.AudioContext || root.webkitAudioContext;
        if (!AC) { enabled = false; return null; }
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = masterGain();
        master.connect(ctx.destination);
        var len = Math.floor(ctx.sampleRate * 1.0);
        noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
        var d = noiseBuf.getChannelData(0);
        for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      }
      if (ctx.state !== 'running') {
        var p = ctx.resume();
        if (p && p.catch) p.catch(function () { /* not in a gesture yet */ });
      }
      startAmbient();
      return ctx;
    } catch (e) { enabled = false; return null; }
  }

  function unlock() { if (enabled) ensure(); }
  try {
    ['pointerdown', 'touchend', 'keydown'].forEach(function (ev) {
      root.addEventListener(ev, unlock, { passive: true });
    });
    if (root.document) {
      root.document.addEventListener('visibilitychange', function () {
        if (!root.document.hidden) unlock();
      });
    }
  } catch (e) { /* no DOM, no problem */ }

  try {
    if (root.navigator && root.navigator.audioSession) root.navigator.audioSession.type = 'playback';
  } catch (e) { /* older Safari */ }

  function tone(freq, type, dur, gain, when, glideTo) {
    var t0 = ctx.currentTime + (when || 0);
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t0);
    if (glideTo) o.frequency.exponentialRampToValueAtTime(glideTo, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0 + dur + 0.05);
  }

  function noise(dur, gain, freq, when, q) {
    var t0 = ctx.currentTime + (when || 0);
    var s = ctx.createBufferSource();
    s.buffer = noiseBuf; s.loop = true;
    var f = ctx.createBiquadFilter();
    f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = q || 1.2;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    s.connect(f); f.connect(g); g.connect(master);
    s.start(t0); s.stop(t0 + dur + 0.05);
  }

  function startAmbient() {
    if (ambient || !ctx) return;
    try {
      var nodes = [];
      var rain = ctx.createBufferSource();
      rain.buffer = noiseBuf; rain.loop = true;
      var rf = ctx.createBiquadFilter();
      rf.type = 'lowpass'; rf.frequency.value = 900;
      var rg = ctx.createGain(); rg.gain.value = 0.035;
      var lfo = ctx.createOscillator(); lfo.frequency.value = 0.11;
      var lfoG = ctx.createGain(); lfoG.gain.value = 0.012;
      lfo.connect(lfoG); lfoG.connect(rg.gain);
      rain.connect(rf); rf.connect(rg); rg.connect(master);
      rain.start(); lfo.start();
      nodes.push(rain, lfo);
      var hum = ctx.createOscillator(); hum.type = 'sine'; hum.frequency.value = 50;
      var hg = ctx.createGain(); hg.gain.value = 0.012;
      hum.connect(hg); hg.connect(master);
      hum.start();
      nodes.push(hum);
      var sirenTimer = setInterval(function () {
        if (!enabled || !ctx || ctx.state !== 'running') return;
        if (Math.random() < 0.45) {
          for (var i = 0; i < 6; i++) tone(i % 2 ? 620 : 460, 'sine', 0.5, 0.006, i * 0.5);
        }
      }, 50000);
      var rumbleTimer = setInterval(function () {
        if (!enabled || !ctx || ctx.state !== 'running') return;
        if (Math.random() < 0.6) {
          tone(52, 'sine', 2.6, 0.02, 0, 36);
          noise(2.2, 0.012, 90, 0.2, 0.8);
        }
      }, 85000);
      var houseTimer = setInterval(function () {
        if (!enabled || !ctx || ctx.state !== 'running') return;
        var r = Math.random();
        if (r < 0.3) { tone(130, 'sine', 0.14, 0.05, 0, 55); }
        else if (r < 0.42) { tone(523, 'sine', 0.4, 0.012, 0); tone(659, 'sine', 0.5, 0.008, 0.15); }
      }, 41000);
      ambient = { nodes: nodes, sirenTimer: sirenTimer, rumbleTimer: rumbleTimer, houseTimer: houseTimer };
    } catch (e) { /* the rain can fail silently */ }
  }

  function stopAmbient() {
    if (!ambient) return;
    try {
      ambient.nodes.forEach(function (n) { try { n.stop(); } catch (e) { /* already stopped */ } });
      clearInterval(ambient.sirenTimer);
      clearInterval(ambient.rumbleTimer);
      clearInterval(ambient.houseTimer);
    } catch (e) { /* ignore */ }
    ambient = null;
  }

  function safe(fn) {
    return function () {
      if (!enabled || !ensure()) return;
      try { fn.apply(null, arguments); } catch (e) { /* never break the game */ }
    };
  }

  root.Sound = {
    get on() { return enabled; },
    get state() { return ctx ? ctx.state : 'none'; },
    get volume() { return volume; },
    setVolume: function (v) {
      volume = Math.max(0, Math.min(1, v));
      try { root.localStorage && root.localStorage.setItem('dg_vol', String(volume)); } catch (e) { /* ignore */ }
      if (master) master.gain.value = masterGain();
    },
    toggle: function () {
      enabled = !enabled;
      try { root.localStorage && root.localStorage.setItem('dg_sound', enabled ? 'on' : 'off'); } catch (e) { /* ignore */ }
      if (enabled) ensure();
      else stopAmbient();
      return enabled;
    },
    tick: safe(function () { tone(1300 + Math.random() * 900, 'square', 0.03, 0.035, 0); }),
    thunk: safe(function () { tone(150, 'sine', 0.11, 0.35, 0, 48); }),
    hiss: safe(function () { noise(0.16, 0.08, 900, 0, 0.6); }),
    chatter: safe(function () {
      var t0 = ctx.currentTime;
      var o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(135, t0);
      var steps = 9;
      for (var i = 1; i <= steps; i++) {
        o.frequency.linearRampToValueAtTime(105 + Math.random() * 85, t0 + i * 0.18);
      }
      var f = ctx.createBiquadFilter();
      f.type = 'bandpass'; f.frequency.value = 700; f.Q.value = 2.2;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      for (var j = 0; j < steps; j++) {
        var at = t0 + 0.05 + j * 0.18;
        g.gain.linearRampToValueAtTime(0.04 + Math.random() * 0.025, at);
        g.gain.linearRampToValueAtTime(0.01, at + 0.11);
      }
      g.gain.linearRampToValueAtTime(0.0001, t0 + steps * 0.18 + 0.2);
      o.connect(f); f.connect(g); g.connect(master);
      o.start(t0); o.stop(t0 + steps * 0.18 + 0.3);
      noise(steps * 0.18, 0.03, 1100, 0, 0.5);
    }),
    whistle: safe(function () {
      var blast = function (at, dur) {
        [2150, 2795].forEach(function (f) {
          var t0 = ctx.currentTime + at;
          var o = ctx.createOscillator();
          o.type = 'sine';
          o.frequency.setValueAtTime(f, t0);
          var g = ctx.createGain();
          g.gain.setValueAtTime(0.0001, t0);
          g.gain.exponentialRampToValueAtTime(0.07, t0 + 0.015);
          g.gain.setValueAtTime(0.07, t0 + dur - 0.05);
          g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
          var lfo = ctx.createOscillator();
          lfo.frequency.value = 26;
          var lg = ctx.createGain();
          lg.gain.value = 0.028;
          lfo.connect(lg); lg.connect(g.gain);
          o.connect(g); g.connect(master);
          o.start(t0); o.stop(t0 + dur + 0.05);
          lfo.start(t0); lfo.stop(t0 + dur + 0.05);
        });
        noise(dur, 0.022, 2400, at, 1.1); // breath
      };
      blast(0, 0.95);
      blast(1.1, 0.45);
    }),
    neenaw: safe(function () {
      for (var i = 0; i < 8; i++) {
        var g = 0.06 + (i < 4 ? i : 8 - i) * 0.016; // swells close, then passes
        tone(i % 2 ? 466 : 622, 'triangle', 0.42, g, i * 0.45);
        tone(i % 2 ? 233 : 311, 'triangle', 0.42, g * 0.45, i * 0.45); // horn body
      }
    }),
    squelch: safe(function () { noise(0.05, 0.14, 1800, 0, 2.5); tone(320, 'square', 0.03, 0.05, 0); }),
    carrier: safe(function (dur) { noise(Math.min(dur || 1, 6), 0.028, 1000, 0, 0.4); }),
    clang: safe(function () {
      noise(0.06, 0.18, 2400, 0, 3);
      tone(181, 'square', 0.55, 0.1, 0.02, 178);
      tone(242, 'square', 0.4, 0.06, 0.02, 239);
      tone(90, 'sine', 0.7, 0.09, 0.03, 70);
    }),
    phone: safe(function () {
      for (var burst = 0; burst < 4; burst++) {
        var at = Math.floor(burst / 2) * 1.9 + (burst % 2) * 0.55;
        for (var i = 0; i < 16; i++) {
          var t = at + i * 0.026;
          var f = i % 2 ? 1795 : 1520; // the two gongs
          tone(f, 'triangle', 0.05, 0.09, t);
          tone(f * 2.76, 'sine', 0.03, 0.028, t); // clang partial
        }
        noise(0.42, 0.014, 2600, at, 1.4); // brass shimmer
      }
    }),
    bell: safe(function (grief) {
      tone(1318, 'sine', 0.35, 0.12, 0);
      if (grief) { tone(659, 'sine', 0.5, 0.09, 0.12); noise(0.3, 0.02, 220, 0.1); }
    }),
    saga: safe(function () {
      for (var i = 0; i < 4; i++) tone(i % 2 ? 592 : 790, 'square', 0.22, 0.028, i * 0.24);
    }),
    signal: safe(function () {
      tone(196, 'square', 0.18, 0.06, 0);
      tone(196, 'square', 0.28, 0.06, 0.28);
      noise(0.5, 0.02, 300, 0);
    }),
    click: safe(function () { noise(0.03, 0.06, 1500); tone(180, 'square', 0.04, 0.05, 0); }),
    carry: safe(function () { tone(120, 'sine', 0.09, 0.05, 0); }),
    quiet: safe(function () { tone(523, 'sine', 0.5, 0.04, 0); tone(659, 'sine', 0.6, 0.03, 0.18); }),
    disaster: safe(function (meter) {
      if (meter === 'brass') {
        for (var i = 0; i < 3; i++) { noise(0.06, 0.1, 180, i * 0.45, 4); tone(90, 'sine', 0.12, 0.07, i * 0.45); }
        tone(220, 'sine', 1.4, 0.05, 1.5, 196);
      } else if (meter === 'relief') {
        noise(0.18, 0.14, 240, 0, 2);
        for (var j = 0; j < 5; j++) noise(0.05, 0.05 - j * 0.008, 400, 0.5 + j * 0.4, 3);
        tone(147, 'sine', 1.6, 0.05, 2.4, 131);
      } else {
        tone(392, 'sawtooth', 1.2, 0.09, 0, 65);
        noise(1.6, 0.06, 140, 0.1);
        noise(1.2, 0.03, 700, 0.4, 0.7);
      }
    }),
    debrief: safe(function (avg) {
      var notes = avg >= 58 ? [392, 494, 587, 784] : avg >= 45 ? [392, 494, 587] : [392, 370];
      for (var i = 0; i < notes.length; i++) tone(notes[i], 'triangle', 0.5, 0.06, i * 0.22);
    }),
    warm: function () { ensure(); },
  };
})(typeof self !== 'undefined' ? self : this);

(function () {
  'use strict';

  var E = window.Engine;
  var DATA = window.DATA;
  var S = window.Sound;
  var app = document.getElementById('app');
  var state = null;
  var dailyMode = false;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var typer = null;        // typewriter interval
  var typed = null;        // card object whose arrival presentation finished
  var announced = null;    // card object a sound was played for
  var announcedEnd = null;
  var selected = -1;       // selected choice index (dispatch choices arm the TX key)
  var boostSel = { extraUnit: false, favour: false }; // preparation staged behind a gamble
  var divSel = null;       // a staged call to Division ('spg'|'dogs'|'cid') awaiting the key
  var lastAir = false;     // the last commit went out on the air: the set may RECEIVE its result
  var spgNudged = false;   // Bream has already suggested the S.P.G. this shift
  var gradeFlushed = false; // tonight's marquee grade already in the casebook
  var tx = { st: 'idle', timer: null, failTimer: null, line: '', full: '', isCall: null }; // idle|armed|transmitting|complete
  var rtShown = 0;         // paced R/T lines revealed
  var rtTimer = null;
  var trayHistory = [];    // resolved weary slips: {ref, title, turn}
  var uiLedger = [];       // the occurrence book: every decision as the desk kept it
  var uiLog = [];          // UI-voice lines merged into the log render: {time, text, kind}
  var lastAnimKey = null;  // the card surface eases in only when it actually changes
  var logOpen = false;     // mobile: the ticker expands to the full log on tap
  var isMobile = function () {
    return window.matchMedia && window.matchMedia('(max-width: 760px)').matches;
  };

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function refFor(card) {
    var h = 0;
    for (var i = 0; i < card.id.length; i++) h = (h * 31 + card.id.charCodeAt(i)) >>> 0;
    return 4400 + (h % 97);
  }

  function L(text) {
    return state && text ? E.localiseText(state, text) : text;
  }

  function shortTitle(card) {
    var t = card.title || '';
    var dash = t.indexOf(' — ');
    return dash > 0 ? t.slice(dash + 3) : t;
  }

  function paraSplit(text) {
    if (text.length < 220 || text.indexOf('\n') >= 0) return text;
    var sentences = text.split(/(?<=[.!?…'’”])\s+(?=[A-Z0-9‘“'"])/);
    if (sentences.length < 3) return text;
    var per = sentences.length > 5 ? 3 : 2;
    var out = [], chunk = [];
    for (var i = 0; i < sentences.length; i++) {
      chunk.push(sentences[i]);
      if (chunk.length === per) { out.push(chunk.join(' ')); chunk = []; }
    }
    if (chunk.length) out.push(chunk.join(' '));
    return out.join('\n\n');
  }

  function loadHist() {
    try {
      var h = JSON.parse(window.localStorage.getItem('dg_hist') || 'null');
      if (h && typeof h === 'object') {
        return {
          seen: h.seen || [], recent: h.recent || 0,
          lastMarquee: h.lastMarquee || null, lastMini: h.lastMini || null,
          seenMarquees: h.seenMarquees || [], seenMinis: h.seenMinis || [],
          lastNotice: h.lastNotice || null, seenNotices: h.seenNotices || [],
          favours: h.favours > 0 ? Math.min(2, h.favours) : 0,
          lastMarqueeGrade: h.lastMarqueeGrade || null,
          flags: h.flags || [],
        };
      }
    } catch (e) { /* private mode */ }
    return { seen: [], recent: 0, lastMarquee: null, lastMini: null, seenMarquees: [], seenMinis: [],
      lastNotice: null, seenNotices: [], favours: 0, lastMarqueeGrade: null, flags: [] };
  }

  function rotateSeen(list, id, poolSize) {
    if (list.indexOf(id) < 0) list = list.concat([id]);
    return list.length >= poolSize ? [id] : list;
  }

  function saveHist() {
    if (dailyMode) return; // the daily shift is everyone's same night; it leaves no tracks
    try {
      var prev = loadHist();
      var seen = state.drawn.concat(prev.seen).slice(0, 72);
      window.localStorage.setItem('dg_hist', JSON.stringify({
        seen: seen, recent: state.drawn.length,
        lastMarquee: state.marquee, lastMini: state.mini,
        seenMarquees: rotateSeen(prev.seenMarquees || [], state.marquee, DATA.storylines.length),
        seenMinis: state.mini
          ? rotateSeen(prev.seenMinis || [], state.mini, DATA.minisagas.length)
          : (prev.seenMinis || []),
        lastNotice: state.notice ? state.notice.id : (prev.lastNotice || null),
        seenNotices: state.notice
          ? rotateSeen(prev.seenNotices || [], state.notice.id, DATA.notices.length)
          : (prev.seenNotices || []),
        favours: Math.min(2, state.favours), // unspent markers keep — the book caps at two
        lastMarqueeGrade: (function () {
          var mq = state.stories[state.marquee];
          return mq && mq.started ? (mq.resolved ? mq.grade : 'unresolved') : null;
        })(),
        flags: state.flagsSet,
      }));
    } catch (e) { /* private mode */ }
  }

  function loadCareer() {
    try {
      var c = JSON.parse(window.localStorage.getItem('dg_career') || 'null');
      if (c && typeof c === 'object') return c;
    } catch (e) { /* private mode */ }
    return { nights: 0, survived: 0, deaths: { streets: 0, brass: 0, relief: 0 }, best: null, streak: 0, bestStreak: 0, sagas: [] };
  }

  var GRADE_RANK = { good: 3, mixed: 2, poor: 1, unresolved: 0 };

  function saveSagaGrade(id, grade) {
    try {
      var c = loadCareer();
      c.sagaGrades = c.sagaGrades || {};
      var prev = c.sagaGrades[id];
      if (prev === undefined || GRADE_RANK[grade] > GRADE_RANK[prev]) {
        c.sagaGrades[id] = grade;
        window.localStorage.setItem('dg_career', JSON.stringify(c));
      }
    } catch (e) { /* private mode */ }
  }

  function saveCareer() {
    try {
      var c = loadCareer();
      c.nights++;
      if (state.ending.kind === 'debrief') {
        c.survived++;
        c.streak++;
        if (c.streak > c.bestStreak) c.bestStreak = c.streak;
        if (!c.best || state.ending.avg > c.best.avg) c.best = { title: state.ending.title, avg: state.ending.avg };
        if (STAMP_FOR[state.ending.title] === 'EXEMPLARY') c.commendations = (c.commendations || 0) + 1;
      } else if (state.ending.kind === 'dismissal') {
        c.deaths.dismissed = (c.deaths.dismissed || 0) + 1;
        c.streak = 0;
      } else {
        c.deaths[state.ending.meter] = (c.deaths[state.ending.meter] || 0) + 1;
        c.streak = 0;
      }
      if (c.sagas.indexOf(state.marquee) < 0) c.sagas.push(state.marquee);
      var mq = state.stories[state.marquee];
      if (mq && mq.started) {
        c.sagaGrades = c.sagaGrades || {};
        var g = mq.resolved ? mq.grade : 'unresolved';
        var prev = c.sagaGrades[state.marquee];
        if (prev === undefined || GRADE_RANK[g] > GRADE_RANK[prev]) c.sagaGrades[state.marquee] = g;
      }
      window.localStorage.setItem('dg_career', JSON.stringify(c));
    } catch (e) { /* private mode */ }
  }

  var AVATARS = [
    { id: '1', name: 'Insp. Hargreaves' },
    { id: '2', name: 'Insp. Grant' },
    { id: '3', name: 'Insp. March' },
    { id: '4', name: 'Insp. Blythe' },
    { id: '5', name: 'Insp. Trott' },
    { id: '6', name: 'Insp. Crewe' },
  ];
  var AVATAR_FRAMES = ['base', 'halfblink', 'blink', 'mouthpart', 'mouthopen'];
  var avatarsReady = false;

  function avatarSrc(id, frame) { return 'avatars/' + id + '/' + frame + '.png'; }

  (function probeAvatars() {
    var probe = new Image();
    probe.onload = function () {
      avatarsReady = true;
      AVATARS.forEach(function (a) {
        AVATAR_FRAMES.forEach(function (f) { new Image().src = avatarSrc(a.id, f); });
      });
      if (!typer) render();
    };
    probe.src = avatarSrc('1', 'base');
  })();

  function chosenAvatar() {
    try {
      var v = window.localStorage.getItem('dg_avatar');
      if (v && AVATARS.some(function (a) { return a.id === v; })) return v;
    } catch (e) { /* private mode */ }
    return '1';
  }
  function setAvatar(id) {
    try { window.localStorage.setItem('dg_avatar', id); } catch (e) { /* private mode */ }
  }

  function chosenMode() {
    try {
      var v = window.localStorage.getItem('dg_mode');
      if (v && E.MODES[v]) return v;
    } catch (e) { /* private mode */ }
    return 'standard';
  }
  function setMode(m) {
    try { window.localStorage.setItem('dg_mode', m); } catch (e) { /* private mode */ }
  }
  function setAvatarFrame(f) {
    var img = document.getElementById('avatar-img');
    if (img) img.src = avatarSrc(chosenAvatar(), f);
  }
  var mouthBusy = false;
  function playFrames(frames, stepMs, mouth) {
    if (mouth) { if (mouthBusy) return; mouthBusy = true; }
    var i = 0;
    (function next() {
      if (i < frames.length) { setAvatarFrame(frames[i++]); setTimeout(next, stepMs); }
      else if (mouth) mouthBusy = false;
    })();
  }
  function mutter() {
    playFrames(['mouthpart', 'mouthopen', 'mouthpart', 'mouthopen', 'mouthpart', 'base'], 130, true);
  }
  (function blinkLoop() {
    setTimeout(function () {
      if (avatarsReady) playFrames(['halfblink', 'blink', 'halfblink', 'base'], 70);
      blinkLoop();
    }, 3200 + Math.random() * 3000);
  })();
  (function mutterLoop() {
    setTimeout(function () {
      if (avatarsReady) mutter();
      mutterLoop();
    }, 6000 + Math.random() * 7000);
  })();

  function pushUiLog(text, kind, time) {
    uiLog.push({ time: time || E.turnClock(Math.min(state.turn, E.TURNS)), text: text, kind: kind || 'entry' });
  }

  function mergedLog() {
    var all = state.log.map(function (l) { return { time: l.time, text: l.text, kind: 'entry', raw: true }; }).concat(uiLog);
    return all.reverse();
  }

  function presentKind(cur) {
    if (cur.kind === 'event') return 'rt';
    if (cur.kind === 'quiet') return 'pad';
    if (cur.kind === 'incident' && cur.card.tone === 'weary') return 'weary';
    return 'telex'; // grief incidents and saga stages hammer in on the printer
  }

  function kicker(cur) {
    var win = E.turnClock(state.turn) + '–' + E.turnClock(Math.min(state.turn + 1, 16));
    if (cur.kind === 'story') {
      var isMini = state.mini && cur.storyId === state.mini;
      return (isMini ? 'ONGOING GRIEF — SIDE MATTER · ' : 'ONGOING GRIEF · ') + win;
    }
    if (cur.kind === 'event') return 'SIGNAL — ALL STATIONS · ' + win;
    if (cur.kind === 'quiet') return 'ALL QUIET · ' + win;
    if (cur.card.tone === 'weary') return 'INCIDENT — A WEARY ONE · REF ' + refFor(cur.card) + ' · ' + win;
    return 'INCIDENT — A GRIEFY ONE · ' + win;
  }

  function typewrite(node, text, done) {
    if (typer) { clearInterval(typer); typer = null; }
    var finished = false;
    function finish() {
      if (finished) return;
      finished = true;
      if (typer) { clearInterval(typer); typer = null; }
      node.textContent = text;
      done();
    }
    if (reduceMotion) { finish(); return { skip: finish }; }
    var i = 0;
    node.textContent = '';
    var cur = el('span', 'cursor', ' ');
    node.appendChild(cur);
    node.parentElement.onclick = function () { finish(); node.parentElement.onclick = null; };
    var beat = 0;
    typer = setInterval(function () {
      i += 1;
      if (i >= text.length) { finish(); return; }
      node.textContent = text.slice(0, i);
      node.appendChild(cur);
      if (++beat % 2 === 0) S.tick();
    }, 18); // ~55 cps
    return { skip: finish };
  }

  var LETTERS = ['a', 'b', 'c', 'd'];

  var WEARY_NOTES = [
    'A weary one — nobody’s dying, but it won’t file itself.',
    'Paperwork with a pulse. Just.',
    'The night’s idea of a joke.',
    'Not worth a siren. Still worth ink.',
    'One for the book, not the blood pressure.',
    'Early Turn would leave it. Early Turn leaves everything.',
    'Late Turn swore the manor was quiet. Late Turn swears a lot.',
  ];

  function cap(s) { return s.charAt(0) + s.slice(1).toLowerCase(); }

  function vetoText(reason) {
    if (reason === 'NO UNITS SPARE') return 'No one left to send.';
    if (reason === 'CELLS FULL') return 'Nowhere to put him.';
    if (reason === 'NO FAVOURS OWED') return 'No markers left to call in.';
    return 'Not tonight.';
  }

  function sendsNames(choice) {
    var e = choice.effects || {};
    return E.crewToSend(state, e.dispatchUnits || 0, choice.label).map(function (pc) {
      return pc.name.replace(/^(PC|WPC|DS|S\.C\.) /, '');
    });
  }

  function metaSpan(choice) {
    var e = choice.effects || {}, parts = [];
    if (e.dispatchUnits > 0) parts.push(['−' + e.dispatchUnits + ' PC' + (e.dispatchUnits > 1 ? 's' : '') + ' (' + sendsNames(choice).join(' + ') + ')', 'neg']);
    if (e.arrests > 0) parts.push(['−' + e.arrests + ' CELL' + (e.arrests > 1 ? 'S' : ''), 'neg']);
    if (e.favours < 0) parts.push(['−' + (-e.favours) + ' FAVOUR', 'neg']);
    if (e.seizeCount > 0) parts.push(['−' + e.seizeCount + ' PC' + (e.seizeCount > 1 ? 's' : '') + ' FOR ' + (e.seizeTurns || 2) + ' TURN' + ((e.seizeTurns || 2) > 1 ? 'S' : ''), 'neg']);
    if (e.bonusUnits > 0) parts.push(['+1 PC TONIGHT', 'pos']);
    if (e.releaseCells > 0) parts.push(['+' + e.releaseCells + ' CELL' + (e.releaseCells > 1 ? 'S' : '') + ' FREED', 'pos']);
    if (e.spendDogs) parts.push(['THE DOG VAN GOES WITH IT', 'neg']);
    if (choice.risk) parts.push(['GAMBLE ' + choice.risk.odds + '%', 'odds']);
    if (needsTransmit(choice)) parts.push(['VIA R/T', 'dim']);
    if (!parts.length) return null;
    var span = el('span', 'req');
    parts.forEach(function (p, i) {
      if (i) span.appendChild(document.createTextNode(' · '));
      span.appendChild(el('span', 'req-' + p[1], p[0]));
    });
    return span;
  }

  function needsTransmit(choice) {
    return (choice.effects || {}).dispatchUnits > 0;
  }

  function txMessage(card, choice) {
    var order = choice.label.replace(/[.…]+$/, '').toUpperCase();
    return L('THORNE ST TO TANGO TWO — ' + shortTitle(card).toUpperCase() + '. ' + order + '. OVER.');
  }

  function txArm() { tx.st = 'armed'; tx.line = ''; S.hiss(); renderRadio(); }
  function txDisarm() { tx.st = 'idle'; tx.line = ''; renderRadio(); }

  function txStart() {
    if (tx.st !== 'armed') return;
    if (tx.failTimer) { clearTimeout(tx.failTimer); tx.failTimer = null; }
    if (divSel) {
      tx.isCall = divSel;
      tx.full = CALL_TX[divSel];
    } else if (selected >= 0) {
      var choice = state.current.card.choices[selected];
      if (!choice || !needsTransmit(choice)) return; // a desk decision never goes out on the air
      tx.isCall = null;
      tx.full = txMessage(state.current.card, choice);
    } else {
      return;
    }
    tx.st = 'transmitting';
    tx.line = '';
    S.squelch();
    S.carrier(tx.full.length * 0.026 + 0.5); // static under the whole message
    var i = 0;
    tx.timer = setInterval(function () {
      i++;
      tx.line = tx.full.slice(0, i);
      if (i % 2 === 0) S.tick();
      updateTxLine();
      if (i >= tx.full.length) {
        clearInterval(tx.timer); tx.timer = null;
        txComplete();
      }
    }, 26);
    renderRadio();
    renderDivision();
    renderLogPanel(); // puts the live #txline on the tube
    updateTxLine();
  }

  function txAbort() {
    if (tx.st !== 'transmitting') return;
    clearInterval(tx.timer); tx.timer = null;
    tx.st = 'failed';
    tx.line = '';
    S.hiss();
    renderRadio();
    renderDivision();
    renderLogPanel(); // belayed: the half-said line vanishes, READY comes back
    tx.failTimer = setTimeout(function () {
      tx.failTimer = null;
      if (tx.st !== 'failed') return;
      var c = selected >= 0 && state.current && state.phase === 'choose'
        ? state.current.card.choices[selected] : null;
      tx.st = (divSel || (c && needsTransmit(c))) ? 'armed' : 'idle';
      tx.isCall = null;
      renderRadio();
      renderDivision();
    }, 1700);
  }

  function txComplete() {
    tx.st = 'complete';
    pushUiLog('TX: ' + tx.full, 'tx');
    renderRadio();
    renderDivision();
    renderLogPanel();
    if (tx.isCall) {
      var which = tx.isCall;
      setTimeout(function () { doCall(which); }, reduceMotion ? 0 : 1200);
    } else {
      setTimeout(function () { commit(selected); }, reduceMotion ? 0 : 1500);
    }
  }

  function updateTxLine() {
    var n = document.getElementById('txline');
    if (n) {
      n.textContent = '';
      n.appendChild(el('span', 't', E.turnClock(state.turn)));
      n.appendChild(document.createTextNode(' TX: ' + tx.line));
      n.appendChild(el('span', 'cursorblk', '█'));
      n.scrollLeft = n.scrollWidth; // mobile ticker: keep the typing tail in view
    }
  }

  window.addEventListener('keydown', function (ev) {
    if (ev.code !== 'Space' || ev.repeat || !state || state.over) return;
    if (tx.st === 'armed') { ev.preventDefault(); txStart(); }
    else if (tx.st === 'transmitting') { ev.preventDefault(); txAbort(); }
  });

  function commit(idx) {
    var cur = state.current;
    var card = cur.card;
    var choice = card.choices[idx];
    var wasDispatch = needsTransmit(choice);
    lastAir = wasDispatch; // a desk decision makes no radio traffic to receive
    var wasWeary = cur.kind === 'incident' && card.tone === 'weary';
    var cellsBefore = state.cells.length + (state.mpInCell ? 1 : 0);

    E.choose(state, idx, boostSel);

    var cellsAfter = state.cells.length + (state.mpInCell ? 1 : 0);
    if (cellsAfter > cellsBefore) setTimeout(function () { S.clang(); }, reduceMotion ? 0 : 400);
    if (wasWeary) trayHistory.push({ ref: refFor(card), title: L(shortTitle(card)).slice(0, 26), turn: state.turn });

    uiLedger.push({
      time: E.turnClock(Math.min(state.turn, E.TURNS)),
      title: L(shortTitle(card)),
      label: L(choice.label),
      deltas: state.lastDeltas,
      gamble: state.lastGamble,
      backed: !!(state.lastBoost && (state.lastBoost.extraUnit || state.lastBoost.favour || state.lastBoost.dogs)),
    });

    if (wasDispatch) {
      var first = L(state.lastResult || '').split(/(?<=[.!?])\s/)[0] || '';
      var line = 'R/T: ' + (state.lastGamble === 'lost' ? '✗ ' : '') + first.toUpperCase().slice(0, 90);
      var lineKind = state.lastGamble === 'lost' ? 'fail' : 'rt';
      var at = E.turnClock(Math.min(state.turn, E.TURNS));
      setTimeout(function () {
        pushUiLog('TANGO TWO — RECEIVED. ON WAY.', 'entry', at);
        if (first) pushUiLog(line, lineKind, at);
        renderLogPanel();
        S.chatter(); // the crew acknowledging, words lost to the static
      }, reduceMotion ? 0 : 500);
    }

    selected = -1;
    boostSel = { extraUnit: false, favour: false };
    divSel = null; // an unsent call dies with the decision
    tx.st = 'idle';
    tx.isCall = null;
    renderRadio(); // an armed set folds shut the moment the desk moves on
    renderDivision();
    if (avatarsReady && state.lastGamble === 'lost') setTimeout(mutter, 300);
    transitionRender(1000);
  }

  function proceed() {
    S.carry();
    divSel = null;
    E.proceed(state);
    transitionRender(850);
  }

  function transitionRender(gapMs) {
    var card = document.getElementById('card');
    if (reduceMotion || !card) { render(); return; }
    card.classList.remove('in');
    card.classList.add('out'); // pointer-events off while it goes
    setTimeout(render, gapMs || 850);
  }

  function meterRow(name, key) {
    var v = state.meters[key];
    var m = el('div', 'meter' + (v <= 25 ? ' low' : ''));
    var lab = el('div', 'label');
    var left = el('span', null, name + ' ');
    var driftN = 0;
    if (key === 'streets' && !state.over) driftN += E.streetsDriftNow(state);
    if (key === 'relief' && !state.over) driftN += E.reliefDriftNow(state);
    if (v > 0 && v < E.BLEED_BELOW) driftN += 2;
    if (driftN > 0) left.appendChild(el('span', 'drift', '▼' + driftN + '/TURN'));
    lab.appendChild(left);
    var right = el('span', null, String(v));
    if (state.phase === 'result' && state.lastDeltas && state.lastDeltas[key]) {
      var d = state.lastDeltas[key];
      right.appendChild(el('span', 'delta' + (d < 0 ? ' down' : ''), d > 0 ? ' ▲' + d : ' ▼' + Math.abs(d)));
    }
    lab.appendChild(right);
    var track = el('div', 'track');
    var fill = el('div', 'fill');
    fill.style.width = v + '%';
    track.appendChild(fill);
    m.appendChild(lab);
    m.appendChild(track);
    m.setAttribute('role', 'img');
    m.setAttribute('aria-label', name + ' ' + v + ' of 100');
    return m;
  }

  var warrantEl = null, warrantFor = null;
  function warrantCard() {
    var key = chosenAvatar() + ':' + avatarsReady;
    if (warrantEl && warrantFor === key) return warrantEl;
    warrantFor = key;
    var wc = el('div', 'warrant');
    var wleft = el('div', 'half left');
    wleft.appendChild(el('div', 'card-head', 'METROPOLITAN POLICE'));
    var photo = el('div', 'photo');
    if (avatarsReady) {
      var img = el('img');
      img.id = 'avatar-img';
      img.src = avatarSrc(chosenAvatar(), 'base');
      img.alt = 'The guvnor';
      photo.appendChild(img);
    } else {
      photo.appendChild(el('div', 'slotnote', 'GUVNOR VOXEL — CONSTANT'));
    }
    wleft.appendChild(photo);
    var who = AVATARS[0];
    AVATARS.forEach(function (a) { if (a.id === chosenAvatar()) who = a; });
    wleft.appendChild(el('div', 'name', who.name.toUpperCase().replace('INSP.', 'INSPECTOR')));
    var wright = el('div', 'half');
    wright.appendChild(el('div', 'card-head', 'WARRANT CARD'));
    var arms = el('img', 'arms');
    arms.src = 'assets/met-arms.png';
    arms.alt = '';
    arms.onerror = function () { this.remove(); };
    wright.appendChild(arms);
    wright.appendChild(el('div', 'sig', 'Robert Mark'));
    wright.appendChild(el('div', 'role', 'COMMISSIONER OF POLICE OF THE METROPOLIS'));
    wc.appendChild(wleft);
    wc.appendChild(wright);
    warrantEl = wc;
    return warrantEl;
  }

  function heldCells() {
    if (selected < 0 || !state.current) return 0;
    var c = state.current.card.choices[selected];
    return (c && c.effects && c.effects.arrests) || 0;
  }

  function buildCellRow() {
    var row = el('div', 'cellrow');
    var occupied = [];
    if (state.mpInCell) occupied.push('THE MEMBER');
    state.cells.forEach(function (c) { occupied.push(c.label || 'PRISONER'); });
    var locked = (state.lockedCells || []).length;
    var hold = heldCells();
    for (var i = 0; i < E.CELLS_TOTAL; i++) {
      var cell;
      if (i < occupied.length) {
        cell = el('div', 'cell occupied');
        cell.title = occupied[i];
      } else if (locked > 0) {
        cell = el('div', 'cell locked');
        cell.title = 'OUT OF SERVICE';
        cell.appendChild(el('div', 'heldmark', 'U/S'));
        locked--;
      } else if (hold > 0) {
        cell = el('div', 'cell held');
        cell.appendChild(el('div', 'heldmark', 'held'));
        hold--;
      } else {
        cell = el('div', 'cell empty');
      }
      cell.appendChild(el('div', 'wicket'));
      row.appendChild(cell);
    }
    return row;
  }

  function refreshCells() {
    var row = document.querySelector('#status .cellrow');
    if (row) row.replaceWith(buildCellRow());
  }

  var CALL_SPENT = {
    spg: 'The S.P.G. came and went.',
    dogs: 'The Dog Section had their run.',
    cid: 'C.I.D. took their pick.',
  };
  var CALL_ACK = {
    spg: 'DIVISION — SERIAL OF THE S.P.G. ON THE MANOR WITHIN THE HOUR.',
    dogs: 'DIVISION — DOG AND HANDLER STANDING BY YOUR NEXT GAMBLE.',
    cid: 'DIVISION — NIGHT-DUTY C.I.D. ON THEIR WAY DOWN.',
  };
  var CALL_TX = {
    spg: 'THORNE ST TO DIVISION — REQUEST S.P.G. SERIAL FOR THE MANOR, ONE HOUR. OVER.',
    dogs: 'THORNE ST TO DIVISION — REQUEST DOG SECTION STAND BY THORNE ST GROUND. OVER.',
    cid: 'THORNE ST TO DIVISION — REQUEST NIGHT-DUTY C.I.D. ATTEND THE FRONT DESK. OVER.',
  };
  var CALL_DESC = {
    spg: { unit: 'SPECIAL PATROL GROUP', effect: 'STREETS +10 · RELIEF −2' },
    dogs: { unit: 'DOG SECTION', effect: 'YOUR NEXT GAMBLE +20' },
    cid: { unit: 'CRIMINAL INVESTIGATION DEPT', effect: 'TAKES THE JOB ON THE DESK' },
  };

  function cidAvailable() {
    return !!(state.current && state.current.kind === 'incident' && state.phase === 'choose');
  }

  function stageCall(which) {
    if (state.over || state.callsUsed[which]) return;
    if (tx.st === 'transmitting' || tx.st === 'complete') return;
    if (which === 'cid' && !cidAvailable()) return;
    if (which === 'dogs' && state.dogsSpent) return;
    S.click();
    divSel = divSel === which ? null : which; // tap again to think better of it
    if (divSel) {
      tx.st = 'armed';
      tx.line = '';
      S.hiss();
    } else {
      var c = selected >= 0 && state.current ? state.current.card.choices[selected] : null;
      tx.st = c && needsTransmit(c) ? 'armed' : 'idle';
    }
    renderRadio();
    renderDivision();
  }

  function doCall(which) {
    lastAir = true; // the request went out on the air; the answer comes back on it
    var cidCard = which === 'cid' && state.current ? state.current.card : null;
    var ok = E.callIn(state, which);
    divSel = null;
    tx.st = 'idle';
    tx.isCall = null;
    if (ok) {
      setTimeout(function () { S.chatter(); }, reduceMotion ? 0 : 250);
      pushUiLog(CALL_ACK[which], 'entry');
      if (which === 'cid') {
        if (cidCard) {
          uiLedger.push({
            time: E.turnClock(Math.min(state.turn, E.TURNS)),
            title: L(shortTitle(cidCard)),
            label: 'Handed to night-duty C.I.D.',
            deltas: null, gamble: null, backed: false,
          });
        }
        selected = -1;
        boostSel = { extraUnit: false, favour: false };
      } else if (selected >= 0 && state.current) {
        var c = state.current.card.choices[selected];
        if (c && needsTransmit(c)) tx.st = 'armed';
      }
    }
    render();
  }

  var divisionEl = null, divisionRefs = null;
  function buildDivision() {
    divisionEl = el('div');
    divisionEl.id = 'division';
    var head = el('div', 'div-head');
    head.appendChild(el('span', null, 'RING DIVISION'));
    divisionEl.appendChild(head);
    var row = el('div', 'call-row');
    var btns = {};
    [['spg', 'S.P.G.'], ['dogs', 'DOGS'], ['cid', 'C.I.D.']].forEach(function (def) {
      var b = el('button', 'call-btn', def[1]);
      b.onclick = function () { stageCall(def[0]); };
      btns[def[0]] = b;
      row.appendChild(b);
    });
    divisionEl.appendChild(row);
    var status = el('div', 'div-status');
    divisionEl.appendChild(status);
    divisionRefs = { btns: btns, status: status, row: row };
  }

  function renderDivision() {
    if (!divisionEl) buildDivision();
    var used = (state && state.callsUsed) || {};
    var busy = tx.st === 'transmitting' || tx.st === 'complete';
    var canStage = state && !state.over && state.phase === 'choose' && !busy;
    var streetsRed = state && !state.over && !used.spg && state.meters.streets <= 25;
    if (streetsRed && !spgNudged) {
      spgNudged = true;
      pushUiLog('SGT BREAM — STREETS GETTING AWAY FROM US, GUV. DIVISION STILL OWES US A CALL: THE S.P.G. WOULD SWEEP THE GROUND BACK.', 'entry');
      renderLogPanel();
    }
    ['spg', 'dogs', 'cid'].forEach(function (which) {
      var b = divisionRefs.btns[which];
      b.disabled = !canStage || used[which] || (which === 'cid' && !cidAvailable()) ||
        (which === 'dogs' && state.dogsSpent);
      b.classList.toggle('on', divSel === which);
      b.classList.toggle('urge', which === 'spg' && streetsRed && !b.disabled && divSel !== 'spg');
    });
    var st = divisionRefs.status;
    var spentUnits = ['spg', 'dogs', 'cid'].filter(function (w) { return used[w]; });
    if (divSel) {
      st.className = 'div-status staged';
      st.textContent = '';
      st.appendChild(el('span', 'd-unit', CALL_DESC[divSel].unit));
      st.appendChild(el('span', 'd-effect', CALL_DESC[divSel].effect));
      var hint = el('span', 'd-hint');
      hint.appendChild(document.createTextNode('To make the call: '));
      hint.appendChild(el('span', 'tx-point', '▣ PRESS TO TRANSMIT'));
      st.appendChild(hint);
    } else if (streetsRed) {
      st.className = 'div-status urge';
      st.textContent = '';
      st.appendChild(document.createTextNode('The streets are running red — the S.P.G. sweep would claw them back. '));
      st.appendChild(el('span', 'd-gain', '+10 STREETS'));
    } else if (spentUnits.length === 3) {
      st.className = 'div-status spent';
      st.textContent = 'All three favours called in. Division has nothing more to send tonight.';
    } else if (spentUnits.length) {
      st.className = 'div-status spent';
      st.textContent = spentUnits.map(function (w) { return CALL_SPENT[w]; }).join(' ') +
        ' Each unit answers once a night.';
      if (state.gambleBoost > 0) st.textContent += ' Dogs standing by — next gamble +20.';
    } else if (state.dogsSpent) {
      st.className = 'div-status';
      st.textContent = 'Each unit answers once a night — and the dog van is spoken for.';
    } else {
      st.className = 'div-status';
      st.textContent = 'Each unit answers one call a night. Division remembers who asks.';
    }
    return divisionEl;
  }

  function renderBoard() {
    var s = el('div');
    s.id = 'status';

    s.appendChild(warrantCard());

    var meters = el('div', 'meters-row');
    meters.appendChild(meterRow('STREETS', 'streets'));
    meters.appendChild(meterRow('BRASS', 'brass'));
    meters.appendChild(meterRow('RELIEF', 'relief'));
    s.appendChild(meters);

    if (state.notice) {
      var strip = el('div', 'notice-strip');
      strip.appendChild(el('div', 'pin'));
      var stripHead = el('div', 'nhead');
      stripHead.appendChild(el('span', 'nlabel', 'PARADE NOTICE'));
      stripHead.appendChild(el('span', 'ntitle', state.notice.title));
      stripHead.appendChild(el('span', 'ncaret'));
      strip.appendChild(stripHead);
      var nbody = el('div', 'nbody');
      nbody.appendChild(el('div', 'ntext', state.notice.text));
      if (state.notice.effect) {
        nbody.appendChild(el('div', 'neffect' + (state.notice.good ? ' good' : ''),
          '§ ' + state.notice.effect));
      }
      strip.appendChild(nbody);
      strip.onclick = function () { strip.classList.toggle('open'); };
      s.appendChild(strip);
    }

    s.appendChild(el('div', 'board-head', 'ON THE BOARD'));
    var rail = el('div', 'board-rail');
    var anyFree = false;
    state.crew.forEach(function (pc, i) {
      var row = el('div', 'hookrow');
      row.appendChild(el('div', 'hook'));
      var m = pc.name.match(/^(PC|WPC|DS|S\.C\.)\s+(.+)$/);
      var rank = m ? m[1].replace(/\./g, '') : '';
      var surname = m ? m[2] : pc.name;
      var tag = el('div', 'tag', (rank ? rank + ' ' : '') + surname);
      if (pc.trait && E.TRAIT_INFO[pc.trait]) {
        tag.appendChild(el('span', 'trait', E.TRAIT_INFO[pc.trait].word));
        tag.title = E.TRAIT_INFO[pc.trait].desc;
      } else if (pc.loan) {
        tag.appendChild(el('span', 'trait', 'on loan'));
        tag.title = 'Urgent assistance: lent by the neighbouring division for the turn.';
      }
      tag.style.transform = 'rotate(' + (i % 2 ? 0.4 : -0.6) + 'deg)';
      if (pc.turns <= 0) {
        anyFree = true;
      } else {
        tag.classList.add('out');
        var backTurn = state.turn + pc.turns;
        row.appendChild(tag);
        row.appendChild(el('div', 'chalkline back' + (backTurn > 16 ? ' overdue' : ''),
          pc.off ? (pc.loan ? 'Gone home' : 'Sent home') : 'Back ' + (backTurn > 16 ? 'past six' : E.turnClock(Math.min(backTurn, 16)))));
        rail.appendChild(row);
        return;
      }
      row.appendChild(tag);
      rail.appendChild(row);
    });
    s.appendChild(rail);
    if (!anyFree) {
      s.appendChild(el('div', 'board-empty', 'THE BOARD IS EMPTY'));
      if (state && !state.over && state.phase === 'choose' && !state.assistUsed) {
        var ub = el('button', 'assist-btn');
        ub.appendChild(el('span', 'a-head', '⚠ URGENT ASSISTANCE'));
        ub.appendChild(el('span', 'a-sub', 'Whistle up the neighbouring division. Once a shift — and it costs.'));
        ub.appendChild(el('span', 'a-cost', 'ONE PC FOR THE TURN · BRASS −8 · RELIEF −8'));
        ub.onclick = function () {
          var got = E.urgentAssistance(state);
          if (!got) return;
          S.whistle();
          render();
        };
        s.appendChild(ub);
      }
    }

    var cellHead = el('div', 'board-head', 'THE CELLS');
    if (E.freeCells(state) <= 0) cellHead.appendChild(el('span', 'full', 'FULL'));
    s.appendChild(cellHead);
    s.appendChild(buildCellRow());
    var occCount = state.cells.length + (state.mpInCell ? 1 : 0);
    var lockCount = (state.lockedCells || []).length;
    var inline = el('div', 'cells-inline',
      new Array(occCount + 1).join('■') +
      new Array(lockCount + 1).join('▨') +
      new Array(Math.max(0, E.CELLS_TOTAL - occCount - lockCount) + 1).join('□'));
    s.appendChild(inline);

    var footHead = el('div', 'board-head bare', 'FAVOURS OWED');
    footHead.appendChild(el('span', 'headright', 'TURN' + (dailyMode ? ' · DAILY' : '')));
    s.appendChild(footHead);
    var foot = el('div', 'board-foot');
    var fav = el('div', 'favours');
    if (state.favours > 0) {
      for (var fi = 0; fi < state.favours; fi++) fav.appendChild(el('div', 'favour-chit', 'IOU'));
    } else {
      fav.appendChild(el('div', 'none', 'All called in.'));
    }
    foot.appendChild(fav);
    var turnrow = el('div', 'turnrow');
    turnrow.appendChild(el('span', 'tlabel', 'TURN' + (dailyMode ? ' · DAILY' : '')));
    turnrow.appendChild(el('span', 'tval',
      String(Math.min(state.turn, E.TURNS)).padStart(2, '0') + ' of 16'));
    foot.appendChild(turnrow);
    s.appendChild(foot);
    return s;
  }

  function renderChoices(card, container) {
    var box = el('div', 'choices');
    card.choices.forEach(function (choice, idx) {
      var st = E.choiceStatus(state, choice);
      var b = el('button');
      var lbl = LETTERS[idx] + ') ' + L(choice.label) + (/[.!?…]$/.test(choice.label) ? '' : '.');
      b.appendChild(document.createTextNode(lbl));
      if (st.enabled) {
        var meta = metaSpan(choice);
        if (meta) b.appendChild(meta);
      } else {
        b.disabled = true;
        b.appendChild(el('span', 'veto', vetoText(st.reason)));
      }
      if (idx === selected) b.classList.add('sel');
      b.onclick = function () {
        if (!st.enabled) return;
        if (tx.st === 'transmitting' || tx.st === 'complete') return; // the air is busy
        S.click();
        if (divSel) { divSel = null; renderDivision(); } // the order outranks a staged call
        selected = idx;
        boostSel = { extraUnit: false, favour: false };
        if (needsTransmit(choice)) {
          txArm();
          syncSelection(box, card, container); // in place: a full re-render flashes
        } else if (choice.risk) {
          if (tx.st === 'armed' || tx.st === 'failed') { tx.st = 'idle'; renderRadio(); }
          syncSelection(box, card, container);
        } else {
          syncSelection(box, card, container);
          commit(idx);
        }
      };
      box.appendChild(b);
    });
    container.appendChild(box);
    syncSelection(box, card, container, true);
  }

  function syncSelection(box, card, container, initial) {
    Array.prototype.forEach.call(box.children, function (btn, i) {
      btn.classList.toggle('sel', i === selected);
    });
    var old = container.querySelector('.txnote');
    if (old) old.remove();
    var oldPanel = container.querySelector('.gamble-panel');
    if (oldPanel) oldPanel.remove();
    if (selected >= 0 && state.phase === 'choose') {
      var c = card.choices[selected];
      if (c && c.risk) container.appendChild(gamblePanel(box, card, container, c));
      if (c && needsTransmit(c)) {
        var going = sendsNames(c).map(cap).join(' and ');
        var note = el('div', 'margin-note txnote');
        note.appendChild(document.createTextNode(going + ' to go — say it on the air: '));
        var dir = el('span', 'tx-point');
        dir.appendChild(document.createTextNode('▣ PRESS TO TRANSMIT'));
        dir.appendChild(el('span', 'tx-arr r', '→'));
        dir.appendChild(el('span', 'tx-arr d', '▼'));
        note.appendChild(dir);
        container.appendChild(note);
      }
    }
    if (!initial) refreshCells();
  }

  function gamblePanel(box, card, container, choice) {
    var p = el('div', 'gamble-panel');
    var base = choice.risk.odds;
    var eff = E.effectiveOdds(state, choice, boostSel);
    var head = el('div', 'g-odds');
    head.appendChild(el('span', 'g-label', 'A GAMBLE — '));
    head.appendChild(el('span', 'g-base' + (eff !== base ? ' beaten' : ''), base + '%'));
    if (eff !== base) head.appendChild(el('span', 'g-eff', ' → ' + eff + '%'));
    head.appendChild(el('span', 'g-label', ' TO COME OFF'));
    p.appendChild(head);

    var avail = E.boostAvail(state, choice);
    var row = el('div', 'g-boosts');
    function boostBtn(key, label, offReason) {
      var on = !!boostSel[key];
      var b = el('button', 'boost-btn' + (on ? ' on' : ''));
      b.appendChild(el('span', 'bx', on ? '☑' : '☐'));
      b.appendChild(document.createTextNode(' ' + label));
      if (!avail[key] && !on) {
        b.disabled = true;
        b.appendChild(el('span', 'why', offReason));
      }
      b.onclick = function () {
        if (tx.st === 'transmitting' || tx.st === 'complete') return; // the order is already on the air
        S.click();
        boostSel[key] = !boostSel[key];
        syncSelection(box, card, container);
      };
      return b;
    }
    row.appendChild(boostBtn('extraUnit', 'SEND A SPARE PC ALONG · +15', 'no one spare'));
    row.appendChild(boostBtn('favour', 'CALL IN A FAVOUR · +15', 'none owed'));
    if (state.gambleBoost > 0) row.appendChild(el('div', 'boost-fixed', '☑ DOG SECTION STANDING BY · +20'));
    var rider = E.crewGambleBonus(state, choice);
    if (rider) {
      row.appendChild(el('div', 'boost-fixed',
        '☑ ' + rider.name.replace(/^(PC|WPC|DS)\s+/, '') + ' IS ' + rider.word.toUpperCase() +
        ' — ON THE CREW · +' + rider.bonus));
    }
    p.appendChild(row);

    if (!needsTransmit(choice)) {
      var go = el('button', 'chanceit', 'CHANCE IT — ' + eff + '%');
      go.onclick = function () {
        if (tx.st === 'transmitting' || tx.st === 'complete') return;
        S.click();
        commit(selected);
      };
      p.appendChild(go);
    }
    return p;
  }

  function renderIncident() {
    var wrap = el('div');
    wrap.id = 'card';
    var cur = state.current;
    var mode = presentKind(cur);
    var animKey = (cur.card && cur.card.id ? cur.card.id : cur.card && cur.card.title || 'quiet') + ':' + state.turn + ':' + state.phase;
    if (animKey !== lastAnimKey && !reduceMotion) wrap.classList.add('in');
    lastAnimKey = animKey;

    if (state.phase === 'result') {
      wrap.appendChild(renderResult());
      wrap.appendChild(renderTray());
      return wrap;
    }

    if (mode === 'rt') {
      var panel = el('div', 'phosphor rt-panel');
      var head = el('div', 'tube-head live');
      head.appendChild(el('span', null, '◉ R/T — ALL STATIONS'));
      if (typed !== cur && !reduceMotion) {
        var rtSkip = el('button', 'skipbtn', '▸ SKIP');
        rtSkip.onclick = function (ev) {
          ev.stopPropagation();
          typed = cur;
          if (rtTimer) { clearTimeout(rtTimer); rtTimer = null; }
          render();
        };
        head.appendChild(rtSkip);
      }
      panel.appendChild(head);
      var lines = el('div', 'lines');
      var parts = L(cur.card.text).split(/(?<=[.!?…])\s+/).filter(Boolean);
      parts.unshift('…THORNE ST FROM DIVISION — ' + L(cur.card.title));
      var upto = (typed === cur || reduceMotion) ? parts.length : rtShown;
      parts.slice(0, upto).forEach(function (p, i) {
        var cls = i === 0 ? 'dim' : 'hot';
        lines.appendChild(el('div', cls, p.toUpperCase()));
      });
      panel.appendChild(lines);
      panel.style.cursor = 'pointer';
      panel.onclick = function () { typed = cur; if (rtTimer) { clearTimeout(rtTimer); rtTimer = null; } render(); };
      wrap.appendChild(panel);
      if (typed !== cur && !reduceMotion) {
        if (rtShown < parts.length && !rtTimer) {
          rtTimer = setTimeout(function () {
            rtTimer = null;
            rtShown++;
            S.hiss();
            if (rtShown >= parts.length) typed = cur;
            render();
          }, rtShown === 0 ? 300 : 900);
        }
      } else {
        var ack = el('div', 'paper rt-ack');
        ack.style.cursor = 'default';
        ack.appendChild(el('h2', 'kicker', kicker(cur)));
        renderChoices(cur.card, ack); // signals still show their toll
        wrap.appendChild(ack);
      }
      wrap.appendChild(renderTray());
      return wrap;
    }

    if (mode === 'telex') {
      var bar = el('div', 'headbar');
      bar.appendChild(el('span', null, 'TELEPRINTER — THORNE ST'));
      wrap.appendChild(bar);
    }
    var paper = el('div', 'paper' + (mode === 'weary' ? ' weary' + (typed !== cur && !reduceMotion ? ' drop' : '') : mode === 'pad' ? ' pad' : (typed === cur ? ' torn' : '')));
    if (mode === 'telex' && typed !== cur && !reduceMotion) {
      paper.appendChild(el('button', 'skipbtn onpaper', '▸ SKIP'));
    }
    if (mode === 'telex') {
      paper.appendChild(el('div', 'rail left'));
      paper.appendChild(el('div', 'rail right'));
    }
    paper.appendChild(el('h2', 'kicker', kicker(cur)));
    paper.appendChild(el('div', 'title', L(cur.card.title)));
    if (cur.kind === 'quiet') {
      paper.appendChild(el('div', 'quiet-note',
        'Nothing doing — no calls, nothing on the printer, nobody at the desk. Half an hour is yours to spend.'));
    }
    var body = el('div', 'body');
    paper.appendChild(body);
    var choicesHome = el('div');
    paper.appendChild(choicesHome);
    wrap.appendChild(paper);
    wrap.appendChild(renderTray());

    var bodyText = paraSplit(L(cur.card.text));
    if (mode === 'telex' && typed !== cur) {
      choicesHome.style.visibility = 'hidden';
      var tw = typewrite(body, bodyText, function () {
        typed = cur;
        choicesHome.style.visibility = 'visible';
        var skip = wrap.querySelector('.skipbtn');
        if (skip) skip.remove();
        paper.classList.add('torn');
      });
      var skipBtn = wrap.querySelector('.skipbtn');
      if (skipBtn) skipBtn.onclick = function (ev) { ev.stopPropagation(); tw.skip(); };
    } else {
      body.textContent = bodyText;
      if (mode === 'weary' && typed !== cur) {
        typed = cur;
        if (!reduceMotion) setTimeout(function () { S.thunk(); }, 60);
      } else {
        typed = cur;
      }
    }
    renderChoices(cur.card, choicesHome);
    if (mode === 'weary') {
      choicesHome.appendChild(el('div', 'margin-note', WEARY_NOTES[refFor(cur.card) % WEARY_NOTES.length]));
    }
    return wrap;
  }

  function renderTray() {
    var tray = el('div', 'tray');
    tray.appendChild(el('span', 'tray-label', 'THE TRAY:'));
    if (!trayHistory.length) {
      tray.appendChild(el('span', 'tray-label', 'NOTHING WAITING'));
      return tray;
    }
    trayHistory.slice(-3).forEach(function (t, i) {
      var slip = el('div', 'slip');
      slip.style.background = i % 2 ? 'var(--paper-older)' : 'var(--paper-old)';
      slip.style.transform = 'rotate(' + (i % 2 ? -0.9 : 1.2) + 'deg)';
      slip.appendChild(el('div', null, 'REF ' + t.ref + ' — ' + t.title.toUpperCase()));
      slip.appendChild(el('div', 'age', 'DEALT WITH — TURN ' + t.turn));
      tray.appendChild(slip);
    });
    return tray;
  }

  function renderResult() {
    var cur = state.current;
    var paper = el('div', 'result-paper');
    paper.appendChild(el('h2', 'kicker', L(shortTitle(cur.card)).toUpperCase() + ' — RESULT' + (cur.kind === 'story' ? ' · ONGOING GRIEF' : '')));
    var q = el('div', 'result-quote' + (state.lastGamble === 'lost' ? ' lost' : ''));
    q.setAttribute('aria-live', 'polite');
    if (state.lastGamble === 'lost') {
      q.appendChild(el('span', 'fail-tag', '✗ THE GAMBLE GOES WRONG — '));
    } else if (state.lastGamble === 'won') {
      q.appendChild(el('span', 'win-tag', '✓ THE GAMBLE COMES OFF — '));
    }
    q.appendChild(document.createTextNode(L(state.lastResult) || ''));
    paper.appendChild(q);
    var d = state.lastDeltas || {};
    var chips = [];
    ['streets', 'brass', 'relief'].forEach(function (k) {
      if (d[k]) chips.push(el('span', 'rd ' + (d[k] > 0 ? 'up' : 'down'),
        (d[k] > 0 ? '+' : '−') + Math.abs(d[k]) + ' ' + k.toUpperCase()));
    });
    if (chips.length) {
      var row = el('div', 'result-deltas');
      chips.forEach(function (c) { row.appendChild(c); });
      paper.appendChild(row);
    }
    var cont = el('div', 'continue');
    var carry = el('button', 'carry', state.over ? '— So it ends —' : '— Carry on —');
    carry.onclick = proceed;
    cont.appendChild(carry);
    paper.appendChild(cont);
    return paper;
  }

  function radioStatus() {
    if (tx.st === 'transmitting') return { cls: 'live', text: 'TRANSMITTING — DIVISION HEARS YOU' };
    if (tx.st === 'complete') return { cls: 'live', text: 'MESSAGE PASSED — WAIT ONE' };
    if (tx.st === 'failed') return { cls: 'fail', text: '…THORNE ST, SAY AGAIN?' };
    if (tx.st === 'armed') return { cls: 'live', text: 'CHANNEL OPEN — KEY THE SET' };
    if (state.phase === 'result' && lastAir) return { cls: 'live', text: 'RECEIVING — TANGO TWO' };
    return { cls: '', text: '…CARRIER ONLY. ALL UNITS OFF AIR.' };
  }

  var radioEl = null, radioRefs = null;
  function buildRadio() {
    radioEl = el('div');
    radioEl.id = 'radio';
    var head = el('div', 'rt-head');
    head.appendChild(el('span', null, 'R/T — CHANNEL ONE'));
    var lamp = el('div', 'lamp');
    head.appendChild(lamp);
    radioEl.appendChild(head);
    var body = el('div', 'rt-body');
    body.appendChild(el('div', 'grille'));
    var status = el('div', 'rt-status');
    body.appendChild(status);
    var key = el('button');
    key.id = 'txkey';
    key.onclick = function () {
      if (tx.st === 'armed') txStart();
      else txAbort();
    };
    body.appendChild(key);
    radioEl.appendChild(body);
    var knobs = el('div', 'radio-knobs');
    var snd = el('button', 'sound');
    snd.onclick = function () { S.toggle(); renderRadio(); };
    knobs.appendChild(snd);
    var vol = el('input', 'vol');
    vol.type = 'range'; vol.min = 0; vol.max = 100; vol.value = Math.round(S.volume * 100);
    vol.setAttribute('aria-label', 'volume');
    vol.oninput = function () { S.setVolume(this.value / 100); };
    knobs.appendChild(vol);
    radioEl.appendChild(knobs);
    radioRefs = { lamp: lamp, status: status, key: key, snd: snd };
  }

  function renderRadio() {
    if (!radioEl) buildRadio();
    var awake = tx.st === 'armed' || tx.st === 'transmitting' || tx.st === 'failed' || tx.st === 'complete' ||
      (state && !state.over && state.phase === 'result' && lastAir);
    radioEl.classList.toggle('awake', awake);
    radioEl.classList.toggle('dormant', !awake);
    radioEl.classList.toggle('wants-key', tx.st === 'armed');
    radioRefs.lamp.className = 'lamp' + (tx.st === 'transmitting' || tx.st === 'complete' ? ' tx' : (state && state.phase === 'result' ? ' rx' : ''));
    var st = radioStatus();
    radioRefs.status.className = 'rt-status ' + st.cls;
    radioRefs.status.textContent = st.text;
    var key = radioRefs.key;
    key.textContent = tx.st === 'transmitting' ? '✕  BELAY THAT'
      : tx.st === 'complete' ? '▣  MESSAGE PASSED'
      : '▣  PRESS TO TRANSMIT';
    key.classList.toggle('down', tx.st === 'transmitting');
    key.classList.toggle('armed', tx.st === 'armed');
    key.disabled = tx.st !== 'armed' && tx.st !== 'transmitting';
    radioRefs.snd.textContent = S.on ? 'SND ◉' : 'SND ○';
    return radioEl;
  }

  function renderLogPanel() {
    var old = document.getElementById('logpanel');
    var p = el('div', 'phosphor' + (logOpen ? ' open' : ''));
    p.id = 'logpanel';
    var head = el('div', 'tube-head');
    head.appendChild(el('span', null, 'STATION LOG'));
    var snd = el('button', 'mob-snd', S.on ? 'SND ◉' : 'SND ○');
    snd.onclick = function (ev) {
      ev.stopPropagation();
      S.toggle();
      renderLogPanel();
      renderRadio();
    };
    head.appendChild(snd);
    p.appendChild(head);
    var log = mergedLog();
    var entries = el('div', 'entries' + (log.length ? ' has-entries' : ''));
    entries.id = 'log';
    if (tx.st === 'transmitting') {
      var live = el('div', 'fresh');
      live.id = 'txline';
      entries.appendChild(live);
    } else {
      var ready = el('div', 'ready-row');
      ready.appendChild(document.createTextNode('READY'));
      ready.appendChild(el('span', 'cursorblk', '█'));
      entries.appendChild(ready);
    }
    log.forEach(function (l, i) {
      var row = el('div', l.kind === 'fail' ? 'fail' : l.kind === 'rt' ? 'rtquote' : (i === 0 ? 'fresh' : ''));
      row.appendChild(el('span', 't', l.time));
      row.appendChild(document.createTextNode(' ' + (l.raw ? L(l.text) : l.text)));
      entries.appendChild(row);
    });
    p.appendChild(entries);
    p.onclick = function (ev) {
      if (!isMobile()) return;
      logOpen = !logOpen;
      renderLogPanel();
    };
    if (old) old.replaceWith(p);
    return p;
  }

  var beatMapEl = null;
  function beatMap() {
    if (beatMapEl) return beatMapEl;
    var m = el('div');
    m.id = 'beatmap';
    var img = el('img');
    img.src = 'assets/beatmap.jpg';
    img.alt = 'Beat map, Thorne Street sub-division, E Division, 1974';
    img.onerror = function () { m.style.display = 'none'; };
    m.appendChild(img);
    beatMapEl = m;
    return beatMapEl;
  }

  var MAP_SPOTS = [
    [/ropemakers/i, 30, 33],
    [/keller/i, 43, 38],
    [/chapel y(ar)?d/i, 60, 23],
    [/marsh lane|odeon/i, 79, 28],
    [/milford|section house/i, 27, 57],
    [/shadwell|foreshore|the river|tide|bagley'?s wharf/i, 82, 60],
    [/dockside|the docks|crane driver/i, 85, 66],
    [/halkin|mecca ballroom/i, 56, 67],
    [/wandle|allotment/i, 18, 75],
    [/alhambra/i, 50, 44],
    [/wimpy/i, 54, 47],
    [/feathers/i, 48, 49],
    [/duke of clarence/i, 57, 49],
    [/gaumont/i, 56, 42],
    [/golden pavilion/i, 59, 45],
    [/provident/i, 51, 41],
    [/victory theatre/i, 50, 35],
    [/vestry lane/i, 47, 34],
    [/greek court|valhalla|blue parrot/i, 46, 39],
    [/pemberton|berkeley row/i, 64, 32],
    [/gresham|barkers/i, 66, 41],
    [/st mark/i, 70, 49],
    [/st saviour/i, 72, 54],
    [/st chad|church walk/i, 63, 59],
    [/st aldhelm/i, 59, 62],
    [/jubilee street|regal bingo/i, 38, 63],
    [/washerama|bidder/i, 36, 50],
    [/chandos|sudsy/i, 44, 57],
    [/cadogan row/i, 65, 55],
    [/empire cinema|the empire/i, 45, 30],
    [/rennie/i, 33, 42],
    [/eastway|bypass/i, 88, 20],
    [/tram depot|gasworks/i, 75, 71],
    [/peabody/i, 40, 68],
    [/canal|towpath/i, 23, 42],
    [/trench street/i, 31, 26],
    [/gas lane/i, 37, 31],
    [/ferrier/i, 47, 27],
    [/polytechnic/i, 68, 22],
    [/calthorpe|trattoria|ferrovia/i, 44, 51],
    [/waterman'?s rest/i, 78, 64],
    [/ironmonger|pargeter/i, 64, 27],
    [/maitland court/i, 58, 35],
    [/verity street/i, 25, 63],
    [/meldon street/i, 69, 63],
    [/cannon row/i, 73, 36],
    [/fewter street/i, 41, 22],
    [/embassy|ishmaelia/i, 69, 34],
    [/splendide/i, 61, 37],
    [/crown & sceptre|crown and sceptre/i, 43, 45],
    [/the market|market approach|market gates/i, 35, 55],
    [/high street/i, 52, 46],
    [/paddock lane|the underground|running tunnel|fluffers|circle line/i, 44, 38],
    [/pettifer|mulberry tree|inn constable/i, 20, 36],
    [/recreation ground|the rec\b|pavilion/i, 32, 64],
    [/thorne street|front desk|front office|charge room|the nick\b/i, 58, 56],
  ];
  var BEAT_CENTRES = [[28, 26], [54, 24], [72, 27], [22, 50], [50, 48], [70, 47], [34, 71], [62, 69]];

  function mapSpot(card) {
    var title = card.title || '';
    var text = card.text || '';
    var i;
    for (i = 0; i < MAP_SPOTS.length; i++) {
      if (MAP_SPOTS[i][0].test(title)) return [MAP_SPOTS[i][1], MAP_SPOTS[i][2], true];
    }
    for (i = 0; i < MAP_SPOTS.length; i++) {
      if (MAP_SPOTS[i][0].test(text)) return [MAP_SPOTS[i][1], MAP_SPOTS[i][2], true];
    }
    var h = refFor(card);
    var b = BEAT_CENTRES[h % 8];
    return [b[0] + (h % 9) - 4, b[1] + (h % 5) - 2, false];
  }

  function updateMapPin() {
    if (!beatMapEl) return;
    var old = beatMapEl.querySelector('.map-pin');
    if (old) old.remove();
    var cur = state && !state.over && state.current;
    if (!cur || !cur.card || cur.kind === 'quiet') return;
    var s = mapSpot(cur.card);
    if (cur.kind === 'event' && !s[2]) return;
    var pin = el('div', 'map-pin');
    pin.style.left = s[0] + '%';
    pin.style.top = s[1] + '%';
    pin.title = L(cur.card.title) || '';
    beatMapEl.appendChild(pin);
  }

  var STAMP_FOR = {
    'COMMENDATION': 'EXEMPLARY',
    'A GRUDGING NOD': 'ACCEPTABLE',
  };

  function memoParagraphs() {
    var end = state.ending;
    var p = [];
    var mqStory = null;
    for (var i = 0; i < DATA.storylines.length; i++) {
      if (DATA.storylines[i].id === state.marquee) mqStory = DATA.storylines[i];
    }
    var marqueeTitle = (end.saga && end.saga.title) || (mqStory && mqStory.title) || 'the night';
    var arith = {
      'EXEMPLARY': 'and considers the arithmetic, on this occasion, exemplary.',
      'ACCEPTABLE': 'and considers the arithmetic acceptable.',
    };
    p.push('1.  The Assistant Commissioner has seen the station log. He notes the night’s principal matters in the order they arose, ' +
      arith[STAMP_FOR[end.title] || 'ACCEPTABLE']);
    var mq = state.stories[state.marquee];
    var mqLine = L((mq && mq.outcome) || (mqStory && mqStory.unresolvedOutcome) || null);
    var para2 = mqLine
      ? '2.  As to ' + marqueeTitle + ': ' + mqLine
      : '2.  As to ' + marqueeTitle + ': the matter was still open at first light, which the Assistant Commissioner regards as an answer of its own.';
    var mini = state.mini ? state.stories[state.mini] : null;
    if (mini && mini.outcome) {
      var miniTitle = '';
      for (var j = 0; j < DATA.minisagas.length; j++) {
        if (DATA.minisagas[j].id === state.mini) miniTitle = DATA.minisagas[j].title;
      }
      para2 += ' As to the side matter' + (miniTitle ? ' (' + miniTitle.toUpperCase() + ')' : '') + ': ' + L(mini.outcome);
    }
    p.push(para2);
    var stats = end.stats || { arrests: state.arrestsTotal, cellsHeld: state.cells.length, favoursSpent: state.favoursSpent };
    var at = 'at six o’clock';
    p.push('3.  The figures. Bodies in the book, ' + numWord(stats.arrests) + '. Still in the cells ' + at + ', ' +
      numWord(stats.cellsHeld || 0) + '. Favours called in overnight, ' + numWord(stats.favoursSpent || 0) +
      ' — the Assistant Commissioner counts these too.');
    var closer = {
      'EXEMPLARY': '4.  He is minded, unusually, to have the word above entered in Orders. He asks that it not become a habit.',
      'ACCEPTABLE': '4.  He is minded, on this occasion, to say nothing further.',
    };
    p.push(closer[STAMP_FOR[end.title] || 'ACCEPTABLE']);
    var c = loadCareer(); // tonight is already entered by the time the memo is typed
    if (STAMP_FOR[end.title] === 'EXEMPLARY' && (c.commendations || 0) >= 2) {
      p.push('5.  The Assistant Commissioner observes, from the file, that this is not the first such word entered against your name. He is following your career with interest. Men of experience will tell you that cuts both ways.');
    } else if (c.streak >= 3) {
      p.push('5.  The file shows ' + numWord(c.streak) + ' consecutive nights now brought home in order. The Assistant Commissioner reads these figures too, and has begun, privately, to rely on them.');
    }
    return p;
  }

  function numWord(n) {
    var w = ['none', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve'];
    return n >= 0 && n < w.length ? w[n] : String(n);
  }

  var GRADE_TEXT = {
    good: 'HANDLED WELL', mixed: 'SURVIVED, WITH A STAIN', poor: 'BOTCHED', unresolved: 'LEFT OPEN',
  };

  function shareLine() {
    var end = state.ending;
    var when = dailyMode ? 'THE DAILY ' + new Date().toISOString().slice(0, 10) : 'NIGHT DUTY';
    if (state.mode === 'short') when += ' · MINIMUM STRENGTH';
    if (state.mode === 'full') when += ' · MUTUAL AID';
    if (end.kind === 'dismissal') {
      return 'DUTY GUVNOR · ' + when + ' · DISMISSED THE FORCE (' + (end.title || 'CAUGHT SHORT') + ') · DUTYGUVNOR.COM';
    }
    if (end.kind === 'disaster') {
      return 'DUTY GUVNOR · ' + when + ' · DISMISSED THE FORCE (' + end.meter.toUpperCase() + ' HIT ZERO) · DUTYGUVNOR.COM';
    }
    return 'DUTY GUVNOR · ' + when + ' · ' + end.title + ' (' + end.avg + ') · ' +
      end.stats.arrests + ' IN THE BOOK · ' + end.stats.cellsHeld + ' STILL IN THE CELLS AT SIX · ' +
      (end.saga.title || 'THE NIGHT') + ': ' + (GRADE_TEXT[end.saga.grade] || '—') + ' · DUTYGUVNOR.COM';
  }

  function renderLedger() {
    var sheet = el('div', 'ledger');
    sheet.appendChild(el('div', 'ledger-head', 'OCCURRENCE BOOK — THORNE STREET · NIGHT OF 14/15 NOVEMBER'));
    if (!uiLedger.length) sheet.appendChild(el('div', 'ledger-row', 'A quiet night, apparently. The book is empty.'));
    uiLedger.forEach(function (en) {
      var row = el('div', 'ledger-row');
      row.appendChild(el('span', 'lt', en.time));
      var body = el('span', 'lbody');
      body.appendChild(el('span', 'ltitle', en.title.toUpperCase()));
      body.appendChild(document.createTextNode(' — ' + en.label));
      row.appendChild(body);
      var marks = el('span', 'lmarks');
      ['streets', 'brass', 'relief'].forEach(function (k) {
        var d = en.deltas && en.deltas[k];
        if (d) marks.appendChild(el('span', 'rd ' + (d > 0 ? 'up' : 'down'),
          (d > 0 ? '+' : '−') + Math.abs(d) + ' ' + k.slice(0, 2).toUpperCase()));
      });
      if (en.gamble === 'won') marks.appendChild(el('span', 'lg won', en.backed ? '✓ BACKED' : '✓'));
      if (en.gamble === 'lost') marks.appendChild(el('span', 'lg lost', '✗'));
      row.appendChild(marks);
      sheet.appendChild(row);
    });
    return sheet;
  }

  function attachLedger(rail, wrap) {
    var box = renderLedger();
    box.style.display = 'none';
    var btn = el('button', 'quiet-link', 'THE OCCURRENCE BOOK');
    btn.onclick = function () {
      var showing = box.style.display !== 'none';
      box.style.display = showing ? 'none' : '';
      btn.textContent = showing ? 'THE OCCURRENCE BOOK' : 'CLOSE THE OCCURRENCE BOOK';
    };
    rail.appendChild(btn);
    wrap.appendChild(box);
  }

  function renderDismissal() {
    var end = state.ending;
    var isDisaster = end.kind === 'disaster';
    var reLine = isDisaster
      ? ({
        streets: 'THE LOSS OF THE BOROUGH — NIGHT OF 14/15 NOVEMBER',
        brass: 'YOUR CONDUCT — NIGHT OF 14/15 NOVEMBER',
        relief: 'THE COLLAPSE OF B RELIEF — NIGHT OF 14/15 NOVEMBER',
      }[end.meter] || 'THE NIGHT OF 14/15 NOVEMBER')
      : (end.title || 'THE NIGHT OF 14/15 NOVEMBER');
    var wrap = el('div', 'memo-wrap');
    var memo = el('div', 'memo dismissal');
    memo.appendChild(el('div', 'punches'));

    var lh = el('div', 'letterhead');
    var arms = el('img');
    arms.src = 'assets/met-arms.png';
    arms.alt = '';
    arms.onerror = function () { this.remove(); };
    lh.appendChild(arms);
    lh.appendChild(el('div', 'force-name', 'METROPOLITAN POLICE'));
    lh.appendChild(el('div', 'addr', 'OFFICE OF THE COMMISSIONER · NEW SCOTLAND YARD · S.W.1'));
    memo.appendChild(lh);

    var refrow = el('div', 'refrow');
    refrow.appendChild(el('span', null, 'OUR REF: D.O.R. 9/75 — WITHOUT NOTICE'));
    refrow.appendChild(el('span', null, '15 NOVEMBER 1975'));
    memo.appendChild(refrow);
    memo.appendChild(el('div', 'memotitle', 'NOTICE OF DISMISSAL'));

    var toblock = el('div', 'toblock');
    var tofrom = el('div', 'tofrom');
    tofrom.textContent =
      'TO:      INSPECTOR — THORNE STREET (B RELIEF)\n' +
      'FROM:  THE COMMISSIONER\n' +
      'RE:      ' + reLine;
    toblock.appendChild(tofrom);
    toblock.appendChild(el('div', 'stamp-verdict', 'DISMISSED THE FORCE'));
    memo.appendChild(toblock);

    var judged = {
      streets: 'He observes that the first duty of the Force is the Queen’s Peace, and that on the night in question the peace of an entire borough was not lost to riot or to calamity but surrendered by degrees, half an hour at a time, under your hand.',
      brass: 'He observes that discipline is not an ornament of the Force but its skeleton, and that a duty inspector for whom his seniors can no longer answer is not an economy the Metropolitan Police is prepared to carry.',
      relief: 'He observes that an inspector commands nothing, in the end, but the willingness of his officers, and that you spent yours to the last man and then asked for more. B Relief paraded for you at a quarter to eleven. Tomorrow they parade for somebody else.',
      noUnits: 'He observes that the whole apparatus of the Force — the buildings, the vehicles, the twenty thousand men — exists so that when the one call comes, somebody goes. On your watch, nobody went.',
      noCells: 'He observes that custody is not a convenience but a trust, and that a station unable to produce one lawful cell on demand has failed in a duty older than the Force itself.',
    };
    var paras = el('div', 'paras');
    paras.appendChild(el('p', null, '1.  ' + (end.text || 'The events of last night do not require rehearsal here.')));
    paras.appendChild(el('p', null,
      '2.  The Commissioner has read the night’s papers and requires no gloss upon them. ' +
      (judged[end.meter || end.cause] || 'He finds in them nothing he is minded to excuse.')));
    paras.appendChild(el('p', null,
      '3.  You are dismissed the Force with effect from six o’clock this morning, without notice, under the powers ' +
      'reserved to the Commissioner. Warrant card and appointments to the officer at the front desk; sign the property ' +
      'book; leave by the yard. Questions of pension are for the Receiver and are not to be addressed to this office.'));
    paras.appendChild(el('p', null,
      end.meter === 'brass'
        ? '4.  The Commissioner is often quoted as intending that this Force should catch more criminals than it employs. Mornings such as this one are how the margin is kept.'
        : '4.  He is aware that this letter will follow you for the rest of your working life. That is its purpose.'));
    var career = loadCareer(); // tonight's entry is already made
    var priorLetters = (career.deaths.streets || 0) + (career.deaths.brass || 0) +
      (career.deaths.relief || 0) + (career.deaths.dismissed || 0) - 1;
    if (priorLetters > 0) {
      paras.appendChild(el('p', null,
        '5.  The Commissioner is aware that this office has corresponded with you before' +
        (priorLetters > 1 ? ', on ' + numWord(priorLetters) + ' occasions' : '') +
        '. He regards the present letter as the last of the series.'));
    }
    memo.appendChild(paras);

    var biro = isDisaster
      ? (end.meter === 'relief' ? 'The kettle’s still warm. — B.' : 'It wasn’t all like the letter says. — B.')
      : 'They didn’t even let you finish the night. — B.';
    memo.appendChild(el('div', 'memo-biro', biro));

    var foot = el('div', 'footrow');
    var cc = el('div', 'cc');
    cc.appendChild(el('div', null, 'cc: RECEIVER FOR THE METROPOLITAN POLICE DISTRICT'));
    cc.appendChild(el('div', null, 'FILE: CLOSED'));
    foot.appendChild(cc);
    var sig = el('div', 'sig');
    sig.appendChild(el('div', 'hand', 'Robert Mark'));
    sig.appendChild(el('div', 'role', 'COMMISSIONER OF POLICE OF THE METROPOLIS'));
    foot.appendChild(sig);
    memo.appendChild(foot);

    var rail = el('div', 'memo-rail');
    var cta = el('button', 'block-btn', 'WORK ANOTHER SHIFT');
    cta.onclick = function () { newGame(false); };
    rail.appendChild(cta);
    rail.appendChild(el('div', 'teaser', 'SOMEBODY ELSE PARADES B RELIEF TOMORROW.'));
    var copy = el('button', 'quiet-link', 'COPY RESULT');
    copy.onclick = function () {
      var text = shareLine();
      try {
        navigator.clipboard.writeText(text).then(function () { copy.textContent = 'COPIED'; });
      } catch (e) { copy.textContent = text; }
    };
    rail.appendChild(copy);

    var grid = el('div', 'memo-grid');
    grid.appendChild(memo);
    grid.appendChild(rail);
    wrap.appendChild(grid);
    attachLedger(rail, wrap);
    return wrap;
  }

  function renderMemo() {
    var end = state.ending;
    var wrap = el('div', 'memo-wrap');
    var memo = el('div', 'memo');
    memo.appendChild(el('div', 'punches'));

    var lh = el('div', 'letterhead');
    var arms = el('img');
    arms.src = 'assets/met-arms.png';
    arms.alt = '';
    arms.onerror = function () { this.remove(); };
    lh.appendChild(arms);
    lh.appendChild(el('div', 'force-name', 'METROPOLITAN POLICE'));
    lh.appendChild(el('div', 'addr', 'NEW SCOTLAND YARD · BROADWAY · S.W.1'));
    memo.appendChild(lh);

    var refrow = el('div', 'refrow');
    refrow.appendChild(el('span', null, 'OUR REF: A.C.C. 47/75'));
    refrow.appendChild(el('span', null, '15 NOVEMBER 1975'));
    memo.appendChild(refrow);
    memo.appendChild(el('div', 'memotitle', 'MEMORANDUM'));

    var toblock = el('div', 'toblock');
    var tofrom = el('div', 'tofrom');
    tofrom.textContent =
      'TO:      INSPECTOR — THORNE STREET (B RELIEF)\n' +
      'FROM:  OFFICE OF THE ASSISTANT COMMISSIONER "C"\n' +
      'RE:      YOUR CONDUCT OF THE NIGHT OF 14/15 NOVEMBER';
    toblock.appendChild(tofrom);
    var grade = STAMP_FOR[end.title] || 'ACCEPTABLE';
    toblock.appendChild(el('div', 'stamp-verdict', grade));
    memo.appendChild(toblock);

    var paras = el('div', 'paras');
    memoParagraphs().forEach(function (t) { paras.appendChild(el('p', null, t)); });
    memo.appendChild(paras);

    memo.appendChild(el('div', 'memo-biro', cap(end.title) + ', more like. — B.'));

    var foot = el('div', 'footrow');
    var cc = el('div', 'cc');
    cc.appendChild(el('div', null, 'cc: COMMANDER, No. 3 DISTRICT'));
    cc.appendChild(el('div', null, 'FILE: THORNE ST / NIGHTS / 1975'));
    foot.appendChild(cc);
    var sig = el('div', 'sig');
    sig.appendChild(el('div', 'hand', 'J. Gerrard'));
    sig.appendChild(el('div', 'role', 'ASSISTANT COMMISSIONER "C"'));
    foot.appendChild(sig);
    memo.appendChild(foot);

    var rail = el('div', 'memo-rail');
    var cta = el('button', 'block-btn', 'WORK ANOTHER SHIFT');
    cta.onclick = function () { newGame(false); };
    rail.appendChild(cta);
    rail.appendChild(el('div', 'teaser', 'SATURDAY. B RELIEF PARADES FOR NIGHT DUTY AT 2245.'));
    var copy = el('button', 'quiet-link', 'COPY RESULT');
    copy.onclick = function () {
      var text = shareLine();
      try {
        navigator.clipboard.writeText(text).then(function () { copy.textContent = 'COPIED'; });
      } catch (e) { copy.textContent = text; }
    };
    rail.appendChild(copy);

    var grid = el('div', 'memo-grid');
    grid.appendChild(memo);
    grid.appendChild(rail);
    wrap.appendChild(grid);
    attachLedger(rail, wrap);
    return wrap;
  }

  function renderHeader() {
    var h = el('header');
    h.appendChild(el('span', 'force', isMobile() ? 'THORNE ST · B RELIEF' : 'METROPOLITAN POLICE · THORNE STREET · B RELIEF'));
    var right = el('div', 'right');
    right.appendChild(el('span', 'date', isMobile() ? 'FRI 14 NOV' : 'FRI 14 NOV 1975'));
    right.appendChild(el('span', 'clock', state && !state.over && state.turn <= E.TURNS ? E.turnClock(state.turn) : '--:--'));
    h.appendChild(right);
    return h;
  }

  function newGame(daily) {
    S.warm();
    dailyMode = !!daily;
    selected = -1;
    boostSel = { extraUnit: false, favour: false };
    divSel = null;
    lastAir = false;
    spgNudged = false;
    gradeFlushed = false;
    tx = { st: 'idle', timer: null, failTimer: null, line: '', full: '', isCall: null };
    typed = null; announced = null; announcedEnd = null; lastAnimKey = null; logOpen = false;
    trayHistory = []; uiLog = []; uiLedger = []; rtShown = 0;
    if (rtTimer) { clearTimeout(rtTimer); rtTimer = null; }
    if (daily) {
      var d = new Date();
      var seed = d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
      state = E.createGame(DATA, E.seededRng(seed), {});
    } else {
      var opts = loadHist();
      opts.mode = chosenMode();
      state = E.createGame(DATA, Math.random, opts);
    }
    render();
  }

  function favoursAtParade(mode) {
    var h = loadHist();
    var total = E.MODES[mode].favours + (h.favours || 0) +
      (h.flags && h.flags.indexOf('flag_president_grateful') >= 0 ? 1 : 0);
    return Math.min(2, total);
  }

  function favLine(mode) {
    var n = favoursAtParade(mode);
    var carried = n > E.MODES[mode].favours;
    if (n === 0) return 'Nobody owes you a thing tonight.';
    if (n === 2) return 'Two <b>favours</b> are owed to you around the manor' + (carried ? ' — one still on the book from last night' : '') + '. Spend them well.';
    return 'One <b>favour</b> is owed to you around the manor' + (carried ? ', carried on the book from last night' : '') + '. Spend it well.';
  }

  var MODE_COPY = {
    short: { label: 'MINIMUM STRENGTH', sub: '3 PCs · no favours · flu in the section house' },
    standard: { label: 'AS ROSTERED', sub: '4 PCs · one favour owed' },
    full: { label: 'MUTUAL AID', sub: '5 PCs · two favours · best stamp ACCEPTABLE' },
  };
  var MODE_ORDER = ['short', 'standard', 'full'];

  function renderTitle() {
    var wrap = el('div', 'parade');
    var sheet = el('div', 'sheet');
    sheet.appendChild(el('h1', null, 'DUTY GUVNOR'));
    sheet.appendChild(el('div', 'sub',
      'Friday night, November 1975. You are the Duty Inspector at Thorne Street nick, ' +
      'and for the next eight hours everything that goes wrong in this borough is yours.'));
    var rules = el('div', 'rules');
    rules.innerHTML =
      '<b>STREETS</b> is order out there — it rots from the moment you book on, and boils over between midnight and three. ' +
      '<b>BRASS</b> is your standing upstairs. <b>RELIEF</b> is your officers’ patience — after three, it wears thin all on its own. ' +
      'Any of them hits zero, your night is over — and probably your career.<br><br>' +
      'You have <b><span id="pccount">' + E.MODES[chosenMode()].size + ' PCs</span></b> on the board, <b>4 cells</b> to fill — and the van to court ' +
      'doesn’t come until six, so every body you book holds its cell all night. ' +
      'The skipper posts who parades from the divisional strength — each name is chalked ' +
      'with what they’re good for. ' +
      '<span id="favline">' + favLine(chosenMode()) + '</span> Survive until 06:00.<br><br>' +
      'Sending officers out is done on the radio: pick the order, then <b>key the set</b> and the ' +
      'message goes out live. Hit <b>BELAY</b> mid-sentence and Division never heard you.<br><br>' +
      'Some orders are <b>gambles</b>: stage one and you can back it — a spare PC riding along or a favour ' +
      'called in tilts the odds. And you can <b>ring Division</b> for the S.P.G., the dogs, ' +
      'or night-duty C.I.D. — each answers one call a night. Division remembers who asks.';
    sheet.appendChild(rules);

    var career = loadCareer();
    if (career.nights > 0) {
      var rec = el('div', 'record');
      rec.appendChild(el('div', null,
        'SERVICE RECORD · NIGHTS ' + career.nights + ' · SURVIVED ' + career.survived +
        ' · STREAK ' + career.streak + ' (BEST ' + career.bestStreak + ')'));
      var deaths = 'DEATHS — STREETS ' + (career.deaths.streets || 0) +
        ' · BRASS ' + (career.deaths.brass || 0) + ' · RELIEF ' + (career.deaths.relief || 0) +
        (career.deaths.dismissed ? ' · DISMISSED ' + career.deaths.dismissed : '');
      if (career.best) deaths += ' · BEST NIGHT: ' + career.best.title + ' (' + career.best.avg + ')';
      rec.appendChild(el('div', null, deaths));
      rec.appendChild(el('div', null,
        'SAGAS WORKED ' + Object.keys(career.sagaGrades || {}).length + ' OF ' + DATA.storylines.length));
      var cbBtn = el('button', 'quiet-link', 'OPEN THE CASEBOOK');
      var cb = el('div', 'casebook');
      cb.style.display = 'none';
      var grades = career.sagaGrades || {};
      DATA.storylines.forEach(function (sl) {
        var row = el('div', 'cb-row');
        row.appendChild(el('span', 'cb-title', sl.title.toUpperCase()));
        var g = grades[sl.id];
        row.appendChild(el('span', 'cb-grade' + (g ? ' g-' + g : ''), g ? GRADE_TEXT[g] : '— NOT YET WORKED'));
        cb.appendChild(row);
      });
      cbBtn.onclick = function () {
        var showing = cb.style.display !== 'none';
        cb.style.display = showing ? 'none' : '';
        cbBtn.textContent = showing ? 'OPEN THE CASEBOOK' : 'CLOSE THE CASEBOOK';
      };
      rec.appendChild(cbBtn);
      rec.appendChild(cb);
      sheet.appendChild(rec);
    }

    if (avatarsReady) {
      var pick = el('div', 'picker');
      pick.appendChild(el('div', 'picklabel', 'WHO’S GUVNOR TONIGHT?'));
      var row = el('div', 'pickrow');
      AVATARS.forEach(function (a) {
        var pb = el('button', 'pick' + (chosenAvatar() === a.id ? ' sel' : ''));
        pb.setAttribute('aria-label', a.name + (chosenAvatar() === a.id ? ', selected' : ''));
        var im = el('img');
        im.src = avatarSrc(a.id, 'base');
        im.alt = '';
        pb.appendChild(im);
        pb.appendChild(el('span', null, a.name));
        pb.onclick = function () {
          setAvatar(a.id);
          Array.prototype.forEach.call(row.children, function (btn, j) {
            btn.classList.toggle('sel', AVATARS[j].id === a.id);
            btn.setAttribute('aria-label', AVATARS[j].name + (AVATARS[j].id === a.id ? ', selected' : ''));
          });
        };
        row.appendChild(pb);
      });
      pick.appendChild(row);
      sheet.appendChild(pick);
    }

    var mpick = el('div', 'picker modes');
    mpick.appendChild(el('div', 'picklabel', 'TONIGHT’S PARADE'));
    var mrow = el('div', 'pickrow');
    MODE_ORDER.forEach(function (m) {
      var mb = el('button', 'pick mode' + (chosenMode() === m ? ' sel' : ''));
      mb.appendChild(el('span', 'mlabel', MODE_COPY[m].label));
      mb.appendChild(el('span', 'msub', MODE_COPY[m].sub));
      mb.onclick = function () {
        setMode(m);
        S.click();
        Array.prototype.forEach.call(mrow.children, function (btn, j) {
          btn.classList.toggle('sel', MODE_ORDER[j] === m);
        });
        var pc = document.getElementById('pccount');
        if (pc) pc.textContent = E.MODES[m].size + ' PCs';
        var fl = document.getElementById('favline');
        if (fl) fl.innerHTML = favLine(m);
      };
      mrow.appendChild(mb);
    });
    mpick.appendChild(mrow);
    sheet.appendChild(mpick);
    wrap.appendChild(sheet);

    var cta = el('button', 'block-btn', 'BOOK ON DUTY');
    cta.onclick = function () { newGame(false); };
    wrap.appendChild(cta);
    var daily = el('button', 'quiet-link', 'TONIGHT’S SHIFT — THE DAILY');
    daily.title = 'The same night for everyone today, always at rostered strength. Compare your debrief.';
    daily.onclick = function () { newGame(true); };
    wrap.appendChild(daily);
    return wrap;
  }

  function announce() {
    if (!gradeFlushed && state.marquee) {
      var mqNow = state.stories[state.marquee];
      if (mqNow && mqNow.resolved) {
        gradeFlushed = true;
        saveSagaGrade(state.marquee, mqNow.grade);
      }
    }
    if (state.over && state.phase === 'over') {
      if (state.ending === announcedEnd) return;
      announcedEnd = state.ending;
      saveHist();
      saveCareer();
      if (state.ending.kind === 'disaster') S.disaster(state.ending.meter);
      else if (state.ending.kind === 'dismissal') S.disaster('brass'); // the discipline knocks
      else S.debrief(state.ending.avg);
      return;
    }
    if (state.phase !== 'choose' || state.current === announced) return;
    announced = state.current;
    rtShown = 0;
    var mode = presentKind(state.current);
    var card = state.current.card || {};
    var mentionsPhone = /blower|telephone|phone box|phones|rings|ringing/i.test((card.title || '') + ' ' + (card.text || '').slice(0, 200));
    if (state.current.kind === 'story') {
      if (state.current.storyId === state.marquee) S.neenaw();
      else S.saga();
    }
    else if (mode === 'pad') S.quiet();
    else if (mode === 'rt') { S.signal(); setTimeout(function () { S.chatter(); }, 700); }
    else if (mentionsPhone) S.phone(); // the front desk blower goes
    else if (mode === 'telex') S.bell(true);
    if (avatarsReady && mode !== 'pad') setTimeout(mutter, 500);
  }

  function render() {
    if (typer) { clearInterval(typer); typer = null; }
    if (rtTimer) { clearTimeout(rtTimer); rtTimer = null; }
    if (state) announce();
    app.textContent = '';
    app.appendChild(renderHeader());
    if (!state) {
      app.appendChild(renderTitle());
    } else if (state.over && state.phase === 'over') {
      app.appendChild(state.ending.kind === 'debrief' ? renderMemo() : renderDismissal());
    } else {
      var main = el('main');
      main.appendChild(renderBoard());
      main.appendChild(renderIncident());
      var right = el('div');
      right.id = 'rightcol';
      right.appendChild(renderRadio());
      right.appendChild(renderDivision());
      right.appendChild(renderLogPanel());
      right.appendChild(beatMap());
      updateMapPin();
      main.appendChild(right);
      app.appendChild(main);
    }
    var f = el('footer', null, 'DUTY GUVNOR · a Night Duty management entertainment · all characters fictitious' +
      (window.DG_BUILD ? ' · ' + window.DG_BUILD : ''));
    app.appendChild(f);
  }

  render();
})();
