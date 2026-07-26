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
  var CREW_MAX = 7;

  // Named difficulties, worn as the strength of the parade. Minimum strength
  // is flu in the section house and nobody owing you a thing; mutual aid is
  // a borrowed fifth body and a comfortable night — and comfort never won
  // a commendation.
  var MODES = {
    short: { size: 3, favours: 0 },
    standard: { size: 4, favours: 1 },
    full: { size: 5, favours: 2 },
  };

  // The divisional strength: twenty names the skipper can post to B Relief.
  // Each carries one trait — a single visible rule that fires only when that
  // officer is on the crew you send. Never more than two WPCs parade at once.
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

  // The skipper posts the parade: a random draw from the divisional pool,
  // capped at two WPCs a night.
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

  // The written content was authored around four canonical names. Tonight's
  // parade recasts them: every 'Doyle' in a card reads as tonight's first
  // man, every 'WPC Hartle' as tonight's WPC, and so on — one consistent
  // mapping per shift, in the copy and in the crew-matching alike.
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
    // Casting rules, in order: an officer rostered under their own canonical
    // name always plays themselves; every part keeps its written gender
    // (Hartle only ever a WPC, the male parts only PCs); and a part the
    // parade can't fill stays its written self — off the board, pronouns
    // intact, no two parts ever sharing a surname. The actual dispatch for
    // an off-board name simply falls to whoever is free.
    var isW = function (pc) { return pc.name.indexOf('WPC') === 0; };
    var notW = function (pc) { return !isW(pc); };
    var self = function (nm) { return function (pc) { return pc.name === nm; }; };
    // pass one: everyone rostered under a canonical name is reserved for
    // their own part, so a later part can never steal them
    var d = take(self('PC DOYLE'));
    var w = take(self('PC WHITTLE'));
    var u = take(self('PC DUFFIN'));
    var h = take(self('WPC HARTLE'));
    // pass two: unfilled parts take from what's left, gender held
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
    return turn >= 5 && turn <= 12 ? 4 : 2; // steady rot, harder through the small hours
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

  // The drift as it actually lands tonight: base decay, a festering saga,
  // and whatever the parade notice added to the weather.
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

  // Eligibility: time-of-night window, cells-full gating, cross-night flags —
  // and one visit per venue per night: once the Pemberton has had its
  // incident, the Pemberton has had its night.
  function eligible(state, card) {
    if (card.window && (state.turn < card.window[0] || state.turn > card.window[1])) return false;
    if (card.maxFreeCells !== undefined && freeCells(state) > card.maxFreeCells) return false;
    if (card.minFreeCells !== undefined && freeCells(state) < card.minFreeCells) return false;
    if (card.requiresFlag && state.flags.indexOf(card.requiresFlag) < 0) return false;
    if (card.venue && state.venuesTonight.indexOf(card.venue) >= 0) return false;
    if (card.requiresWPC && !state.crew.some(function (pc) { return pc.name.indexOf('WPC') === 0; })) return false;
    // a night that already carries a seconded sergeant never also gains the
    // Special Constable: one windfall of manpower per shift
    if (state.seconded && card.choices && card.choices[0] &&
        (card.choices[0].effects || {}).bonusUnits > 0) return false;
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

  // On a seconded night the seizure signals rise to the top of the event
  // pool: the manor collects its price for the borrowed sergeant early.
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

  // Sagas rotate through the whole pool before any repeats: a night's marquee
  // is drawn from the sagas this career hasn't worked this cycle, and only
  // when every one has been seen does the cycle start again (never with an
  // immediate repeat).
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
      // a mini never shares its venue with the marquee: two dramas at the
      // Alhambra in one night is one drama too many
      var miniPool = data.minisagas.filter(function (m) {
        return !m.venue || !marquee.venue || m.venue !== marquee.venue;
      });
      if (!miniPool.length) miniPool = data.minisagas;
      // if the venue filter leaves only minis already seen this rotation,
      // freshness beats exclusivity: repeating a drama is worse than two
      // dramas sharing a postcode once in a blue moon
      var seenM = opts.seenMinis || [];
      if (!miniPool.some(function (m) { return seenM.indexOf(m.id) < 0; })) {
        var freshAll = data.minisagas.filter(function (m) { return seenM.indexOf(m.id) < 0; });
        if (freshAll.length) miniPool = freshAll;
      }
      mini = pickRotating(miniPool, rng, opts.lastMini || null, opts.seenMinis);
    }
    // A man lost to the lights over the rec is a man short at parade: the
    // Yard has ruled it a matter for local management, and local management
    // is you. One night's shortage; the pool covers him after that.
    var paradeSize = MODES[mode].size;
    if (flags.indexOf('flag_pc_abducted') >= 0) paradeSize = Math.max(2, paradeSize - 1);
    var state = {
      data: data,
      rng: rng,
      turn: 0,
      mode: mode,
      meters: { streets: 55, brass: 55, relief: 55 },
      // Unspent favours bank across nights, but the book never opens owing
      // more than two: the manor remembers what it owes, within reason.
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
      openers: [],         // overnight correspondence: read before the book opens, costs no turn
      log: [],
      over: false,
      ending: null,
    };
    state.nameMap = buildNameMap(state.crew);
    // Bring the Duke home well and his protection officer arrives at your
    // next parade, seconded for the night while His Grace is in Barbados.
    // The sergeant is built after the name map: the cards never recast HIM.
    // The manor takes its price elsewhere — seizure signals rise in the deck
    // and hold their man longer, and no Special Constable calls tonight.
    // Last night's consequences arrive as slips on the desk — the overnight
    // correspondence, read and acknowledged before the first card is dealt,
    // at no cost to the clock. The log carries the same word at 2245 so the
    // occurrence book stays a complete record.
    if (flags.indexOf('flag_duke_grateful') >= 0) {
      state.crew.push({ name: 'DS PALGRAVE', trait: 'steady', turns: 0, seconded: true });
      state.seconded = true;
      state.log.push({
        time: '2245',
        text: 'SECONDED FOR THE NIGHT — DS PALGRAVE, ROYALTY PROTECTION, BY THE DUKE OF THORNBURY’S ARRANGEMENT (POSTMARKED BARBADOS). THE SERGEANT IS NOT THRILLED.',
      });
      state.openers.push({
        title: 'SECONDED — DS PALGRAVE',
        text: 'A note under the Duke of Thornbury’s crest, postmarked Barbados: while His Grace winters abroad, his protection officer is lent to the nick that looked after him. DS Palgrave attends your parade tonight — steady, Royal Household manners, and on nobody’s strength but yours. The sergeant is not thrilled.',
      });
    }
    if (flags.indexOf('flag_pc_abducted') >= 0) {
      state.log.push({
        time: '2245',
        text: 'ONE SHORT ON PARADE — THE MAN WHO WENT UP THE RECREATION GROUND HAS NOT COME BACK. THE YARD RULES IT A MATTER FOR LOCAL MANAGEMENT, AND DECLINES TO DEFINE THE MATTER.',
      });
      state.openers.push({
        title: 'ONE SHORT ON PARADE',
        text: 'The man who went up the recreation ground has not come back, and the board parades one short tonight. The Yard has ruled it a matter for local management, and declines to define the matter. His locker stands exactly as he left it, apart from the sandwiches.',
      });
    }
    // Send the President home singing and the morning after arrives at the
    // next parade: standing upstairs, and a favour the manor intends to spend.
    // Every saga leaves its mark on the next parade, whatever the ending:
    // one line of morning-after word in the log. The mechanical payoffs
    // (a seconded sergeant, an embassy favour, a short board) ride on
    // flags separately — this is just the manor talking.
    if (opts.lastMarquee && opts.lastMarqueeGrade) {
      for (var ec = 0; ec < data.storylines.length; ec++) {
        var echoSaga = data.storylines[ec];
        if (echoSaga.id === opts.lastMarquee) {
          var echoLine = echoSaga.echoes && echoSaga.echoes[opts.lastMarqueeGrade];
          if (echoLine) {
            state.log.push({ time: '2245', text: echoLine });
            // the slip carries the word without the prefix: the title says it
            state.openers.push({
              title: 'THE MORNING AFTER',
              text: echoLine.indexOf('THE MORNING AFTER — ') === 0 ? echoLine.slice(20) : echoLine,
            });
          }
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
      state.openers.push({
        title: 'STILL ON THE BOOK',
        text: (carried > 1 ? 'Two favours' : 'A favour') + ' owed around the manor last night went uncollected, and the manor has a memory: ' +
          (carried > 1 ? 'they stand' : 'it stands') + ' on the book tonight. Spend ' +
          (carried > 1 ? 'them' : 'it') + ' before the manor decides you weren’t serious.',
      });
    }
    if (flags.indexOf('flag_president_grateful') >= 0) {
      state.meters.brass = clamp(state.meters.brass + 8);
      state.favours = Math.min(2, state.favours + 1); // the cap holds even for presidents
      state.log.push({
        time: '2245',
        text: 'THE ZUBROVIAN EMBASSY CAR CALLS AT PARADE — PLUM BRANDY FOR THE RELIEF, AND A LETTER FROM NO 10 THE COMMANDER HAS ALREADY FRAMED. THE MANOR IS OWED A FAVOUR, AND KNOWS IT.',
      });
      state.openers.push({
        title: 'THE ZUBROVIAN EMBASSY CAR',
        text: 'The embassy car calls at parade: plum brandy for the relief, and a letter from No 10 the Commander has already framed. Your standing upstairs opens eight points the better, and the manor owes you a favour — and knows it.',
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
    // Every parade gets one notice: tonight's weather, in the broad sense.
    // Notices rotate like the sagas — nothing repeats until the whole
    // board of them has been posted once.
    if (data.notices && data.notices.length) {
      var notice = pickRotating(data.notices, rng, opts.lastNotice || null, opts.seenNotices);
      state.notice = notice;
      var nm = notice.mods || {};
      if (nm.reliefStart) state.meters.relief = clamp(state.meters.relief + nm.reliefStart);
      if (nm.streetsStart) state.meters.streets = clamp(state.meters.streets + nm.streetsStart);
      if (nm.seizeOne && state.crew.length) state.crew[0].turns = nm.seizeOne;
      state.log.push({ time: '2245', text: 'PARADE NOTICE — ' + notice.title.toUpperCase() });
    }
    // Now and then a man parades unfit through drink: breathed on the skipper
    // and sent home before the book opens, gone for the night. Only a parade
    // of four or more can spare the body — or absorb the embarrassment.
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
    // Earliest-due unresolved saga whose stage is scheduled for now or earlier —
    // except that a HOT stage (the immediate continuation of a choice the
    // player just made) always jumps the queue: what you set in motion arrives
    // before anything that was merely waiting its turn.
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
    // A borrowed body goes home the moment his turn is done (or the moment
    // he gets back from wherever it took him).
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
    // A parade notice can put the van on early: bodies away, cells back.
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

  // The rest of what the player reads about a choice, beyond its label: the
  // ways it can come out, and the card copy it sits in. Dispatch casting
  // reads all of it, so the officer the prose stars is the officer whose
  // peg empties — provided they're free.
  function choiceExtraCopy(card, choice) {
    return (choice.result || '') + ' ' +
      ((choice.risk && choice.risk.failResult) || '') + ' ' +
      (card.title || '') + ' ' + (card.text || '');
  }

  // If the order names an officer ("Put WPC Hartle on it"), that officer goes —
  // provided they're free. Then anyone the surrounding copy stars, then the
  // rest is made up from the top of the board. Copy is read through tonight's
  // name map first, so a card written for Hartle sends whoever is playing her
  // part this shift. Surnames match on word boundaries only: Pring must not
  // answer to 'spring', nor Fenn to 'fennel'.
  function crewToSend(state, count, label, extra) {
    var picked = [];
    var i;
    function scan(copy) {
      if (!copy) return;
      var lower = localiseText(state, copy).toLowerCase();
      for (var s = 0; s < state.crew.length && picked.length < count; s++) {
        var pc = state.crew[s];
        if (pc.turns > 0 || picked.indexOf(pc) >= 0) continue;
        var surname = pc.name.replace(/^(PC|WPC|DS|S\.C\.)\s+/, '').toLowerCase();
        if (new RegExp('\\b' + surname + '\\b').test(lower)) picked.push(pc);
      }
    }
    scan(label); // the order binds first
    scan(extra); // then whoever the rest of the copy stars
    // Rotate the fallback start so the same free officer isn't perpetually
    // first out of the door. Turn and deal count don't move between a card's
    // render and its commit, so the pick is stable within a card; an
    // avalanche hash of the two (xorshift, not a linear step — a linear step
    // aliases to a stall when it's a multiple of the crew length) walks the
    // rail across the night for any parade size. No rng: renders call this
    // often and it must stay pure.
    var h = ((state.turn * 374761393) + (state.drawn.length * 668265263)) >>> 0;
    h = ((h ^ (h >>> 13)) * 1274126177) >>> 0;
    var off = ((h ^ (h >>> 16)) >>> 0) % state.crew.length;
    for (i = 0; i < state.crew.length && picked.length < count; i++) {
      var pc = state.crew[(i + off) % state.crew.length];
      if (pc.turns <= 0 && picked.indexOf(pc) < 0) picked.push(pc);
    }
    return picked;
  }

  function dispatchCrew(state, count, turns, label, extra) {
    return crewToSend(state, count, label, extra).map(function (pc) {
      // the trait rides with the officer: the fast come home early,
      // the green get lost on the way back
      var t = turns;
      if (pc.trait === 'fast') t = Math.max(1, t - 1);
      if (pc.trait === 'green') t = t + 1;
      pc.turns = t;
      return pc.name;
    });
  }

  // The best gamble-tilting trait on the crew that would ride this choice.
  function crewGambleBonus(state, choice) {
    var e = choice.effects || {};
    if (!choice.risk || !(e.dispatchUnits > 0)) return null;
    var card = state.current && state.current.card;
    var crew = crewToSend(state, e.dispatchUnits, choice.label, card ? choiceExtraCopy(card, choice) : '');
    var best = null;
    for (var i = 0; i < crew.length; i++) {
      var b = crew[i].trait === 'steady' ? 10 : crew[i].trait === 'jammy' ? 5 : 0;
      if (b && (!best || b > best.bonus)) {
        best = { bonus: b, name: crew[i].name, word: TRAIT_INFO[crew[i].trait].word };
      }
    }
    return best;
  }

  // Preparation tilts a gamble. A spare PC sent along to back it, a favour
  // called in on the way — each is worth +15 on the odds; the Dog Section
  // standing by is worth +20. No amount of preparation buys a certainty.
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
    // Boosts only mean anything on a gamble, and only ones you can afford.
    var applied = { extraUnit: false, favour: false, dogs: false };
    if (choice.risk && boost) {
      var avail = boostAvail(state, choice);
      applied.extraUnit = !!boost.extraUnit && avail.extraUnit;
      applied.favour = !!boost.favour && avail.favour;
    }
    if (choice.risk && state.gambleBoost > 0) applied.dogs = true;

    var gambleLost = false;
    var rolledOdds = choice.risk ? effectiveOdds(state, choice, applied) : null;
    if (choice.risk && state.rng() * 100 >= rolledOdds) gambleLost = true;
    if (choice.risk) state.gambleBoost = 0; // the dogs get one run, win or lose
    state.lastGamble = choice.risk ? (gambleLost ? 'lost' : 'won') : null;
    state.lastOdds = rolledOdds; // what the dice were actually rolled at
    state.lastBoost = choice.risk ? applied : null;

    // Meter deltas: the success effects, or the failure branch of a lost gamble.
    // The crew's traits ride along: a kind officer softens what a job costs
    // the relief, a sharp one what it costs the streets, a thorough one adds
    // to what it earns upstairs — win or lose, if they went, it counts.
    var riding = {};
    if (e.dispatchUnits > 0) {
      crewToSend(state, e.dispatchUnits, choice.label, choiceExtraCopy(card, choice)).forEach(function (pc) {
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
    // Preparation is paid for up front: the favour is called in and the spare
    // body goes along whichever way the dice land.
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
    // Officers stay out longer than the job's nominal length: a body sent to
    // a call is gone the round trip and the paperwork, not a snap of the
    // fingers. This keeps the board genuinely scarce. Fog on the manor
    // (a parade notice) slows every journey further still.
    var fogExtra = (state.notice && state.notice.mods && state.notice.mods.dispatchExtra) || 0;
    var outFor = Math.max(1, e.dispatchTurns || 1) + 1 + fogExtra;
    if (e.dispatchUnits > 0) {
      names = dispatchCrew(state, e.dispatchUnits, outFor, choice.label, choiceExtraCopy(card, choice));
    }
    if (applied.extraUnit) {
      // the spare body rides along to back the gamble, and is gone as long
      names = names.concat(dispatchCrew(state, 1, outFor, ''));
    }
    if (e.bonusUnits > 0 && state.crew.length < CREW_MAX) {
      state.crew.push({ name: 'S.C. PRING', turns: 0 });
    }
    if (e.seizeCount > 0) {
      // The night takes officers off the books with no say; it can only take
      // officers who are actually spare. Named officers go first here too —
      // except the old sweats, who are never where the seizing happens.
      var sweats = [];
      for (var sw = 0; sw < state.crew.length; sw++) {
        if (state.crew[sw].trait === 'oldsweat' && state.crew[sw].turns <= 0) sweats.push(state.crew[sw]);
      }
      sweats.forEach(function (pc) { pc.turns = 0.4; }); // briefly invisible to the draft
      // on a seconded night the draft holds its man half an hour... an hour longer
      var seizeFor = Math.max(1, e.seizeTurns || 2) + (state.seconded ? 2 : 0);
      dispatchCrew(state, Math.min(e.seizeCount, freeUnits(state)), seizeFor,
        choice.label, (card.title || '') + ' ' + (card.text || ''));
      sweats.forEach(function (pc) { if (pc.turns === 0.4) pc.turns = 0; });
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

    // some jobs spend the Dog Section themselves: a van full of greyhound
    // is not standing by for anybody's gamble tonight — so any standing
    // dog boost from an earlier call goes out of the door with the van
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
        // delay-1 transitions are things kicking off RIGHT NOW: they arrive
        // as the very next card, ahead of any other saga waiting its turn
        st.pending = { stageId: goto_, dueTurn: due, hot: due === state.turn + 1 };
      } else {
        st.resolved = true;
        st.outcome = outcome || null;
        st.grade = grade || 'mixed';
        // a saga can leave a flag behind that depends on HOW it ended —
        // gratitude for a good night, a grudge for a botched one
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

  // Each unit answers one call a night — and Division remembers who asks.
  //  spg:  the Special Patrol Group sweeps the manor (streets up, relief sour)
  //  dogs: a dog and handler stand by — the next gamble runs at +20
  //  cid:  night-duty CID take the job on the desk off your hands, no cost
  var CID_RESULT = 'Two night-duty C.I.D. men arrive wearing one overcoat’s worth of ' +
    'goodwill between them, take the papers, the witnesses and the grief off the front desk, ' +
    'and leave without saying thank you. The matter is theirs now, and so is whatever credit ' +
    'it carries. Division makes a note that Thorne Street rang for help.';

  // Urgent assistance: the last-resort whistle when every hand is out.
  // A neighbouring division lends one body for the turn — and both the
  // relief and the Yard remember being whistled for.
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
      // CID will take an ordinary incident, not a signal and never your saga.
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
    // Mutual aid is the comfortable night, and comfort is its own reward:
    // nobody is commended for winning with five PCs and two markers in hand.
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
    choiceExtraCopy: choiceExtraCopy,
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
