/* Duty Guvnor — the desk UI. Drives src/engine.js and renders into #app.
 * Layout and behaviour per the 1975 Desk design handoff: three materials
 * (phosphor / paper / marks), teleprinter and pigeonhole arrivals, R/T
 * squawk for signals, press-to-transmit commits, and the Yard memorandum. */
(function () {
  'use strict';

  var E = window.Engine;
  var DATA = window.DATA;
  var S = window.Sound;
  var WEEK = window.DGWeek;
  var app = document.getElementById('app');
  var state = null;
  var dailyMode = false;
  var weekMode = false;   // tonight is a night of THE WEEK (the desktop campaign)
  var reviewWeek = null;  // a finished week's envelope being read instead of the parade sheet
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // presentation state (per shift)
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

  // every card was written around four canonical names; tonight's parade
  // recasts them, so all displayed copy runs through the shift's name map
  function L(text) {
    return state && text ? E.localiseText(state, text) : text;
  }

  function shortTitle(card) {
    var t = card.title || '';
    var dash = t.indexOf(' — ');
    return dash > 0 ? t.slice(dash + 3) : t;
  }

  // long single blocks of typewritten copy are hard on the eyes: break them
  // into short paragraphs at sentence boundaries (presentation only)
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

  // ---------- persistent store: localStorage on the web, files on the desktop ----------
  // The desktop shell (desktop/preload.js) exposes window.dgStore: a
  // synchronous get/set backed by JSON files in the Electron user-data
  // directory — durable across reinstalls and mappable by Steam Cloud. On the
  // web there is no dgStore and we use localStorage exactly as before. Both
  // back ends honour localStorage's string-in/string-out contract, so every
  // save site below is unchanged bar the object it addresses.
  var store = (function () {
    var desk = window.dgStore;
    if (desk && typeof desk.get === 'function' && typeof desk.set === 'function') {
      // first desktop run adopts whatever the web build left in this profile,
      // so a career started in the browser is not orphaned by the download
      try {
        if (desk.get('dg_migrated') !== '1') {
          ['dg_hist', 'dg_career', 'dg_avatar', 'dg_mode'].forEach(function (k) {
            var had = window.localStorage.getItem(k);
            if (had != null && desk.get(k) == null) desk.set(k, had);
          });
          desk.set('dg_migrated', '1');
        }
      } catch (e) { /* no localStorage to adopt from */ }
      return desk;
    }
    return {
      get: function (k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } },
      set: function (k, v) { try { window.localStorage.setItem(k, v); } catch (e) { /* private mode */ } },
    };
  })();

  // ---------- cross-shift memory ----------
  function loadHist() {
    try {
      var h = JSON.parse(store.get('dg_hist') || 'null');
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

  // the sagas rotate: a marquee never comes round again until every one has
  // been worked, and only then does the cycle restart
  function rotateSeen(list, id, poolSize) {
    if (list.indexOf(id) < 0) list = list.concat([id]);
    return list.length >= poolSize ? [id] : list;
  }

  function saveHist() {
    // the daily is everyone's same night and leaves no tracks; a week night
    // books its consequences onto the week's own envelope (dg_week), never
    // onto the single-night history
    if (dailyMode || weekMode) return;
    try {
      var prev = loadHist();
      // ~6 nights of deal memory: recently seen cards sink in the deck until
      // most of a saga rotation has passed, so a full career reads fresh
      var seen = state.drawn.concat(prev.seen).slice(0, 72);
      store.set('dg_hist', JSON.stringify({
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
        // how the marquee ended feeds tomorrow's morning-after word
        lastMarqueeGrade: (function () {
          var mq = state.stories[state.marquee];
          return mq && mq.started ? (mq.resolved ? mq.grade : 'unresolved') : null;
        })(),
        flags: state.flagsSet,
      }));
    } catch (e) { /* private mode */ }
  }

  // ---------- the station calendar ----------
  // The nights run consecutively: one calendar day per marquee saga worked,
  // starting Friday 14 November 1975. The saga rotation is the clock — when
  // the whole pool has been seen and the rotation resets, the calendar
  // swings back to the top of the month with it. The daily shift is
  // everyone's same canonical Friday the 14th.
  var nightOff = -1; // tonight's page of the calendar; -1 = not yet read

  function histNightOff() {
    var pool = (DATA.storylines && DATA.storylines.length) || 1;
    return loadHist().seenMarquees.length % pool;
  }

  function curNightOff() {
    if (nightOff < 0) nightOff = histNightOff();
    return nightOff;
  }

  // dayShift 1 = the morning after: the tour runs over midnight, so the
  // paperwork it generates is dated the day the guvnor books off
  function nightDate(dayShift) {
    return new Date(1975, 10, 14 + curNightOff() + (dayShift || 0));
  }

  var DAY_SHORT = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  var DAY_LONG = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var MONTH_SHORT = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
  var MONTH_LONG = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

  function headerDate(withYear) {
    var d = nightDate(0);
    return DAY_SHORT[d.getDay()] + ' ' + d.getDate() + ' ' + MONTH_SHORT[d.getMonth()] +
      (withYear ? ' ' + d.getFullYear() : '');
  }

  // 'NIGHT OF 14/15 NOVEMBER' — both dates named if the tour straddles a month end
  function nightOfLabel() {
    var a = nightDate(0), b = nightDate(1);
    if (a.getMonth() === b.getMonth()) return a.getDate() + '/' + b.getDate() + ' ' + MONTH_LONG[a.getMonth()];
    return a.getDate() + ' ' + MONTH_LONG[a.getMonth()] + '/' + b.getDate() + ' ' + MONTH_LONG[b.getMonth()];
  }

  function morningDateline() {
    var b = nightDate(1);
    return b.getDate() + ' ' + MONTH_LONG[b.getMonth()] + ' ' + b.getFullYear();
  }

  // ---------- achievements ----------
  // Detection lives in src/achievements.js (pure, testable). The record of
  // what's been earned persists like any save (dg_ach through the store), so
  // nothing fires twice; on the desktop the unlock also goes to Steam via
  // the wrapper bridge (window.dgAchieve). On the web the record just sits
  // quietly until a desktop career adopts it.
  var ACH = window.DGAch;

  function loadAch() {
    try {
      var a = JSON.parse(store.get('dg_ach') || 'null');
      if (a && typeof a === 'object') return a;
    } catch (e) { /* private mode */ }
    return {};
  }

  function checkAchievements() {
    if (!ACH) return;
    try {
      var have = loadAch();
      var fresh = ACH.evaluate({
        state: state,
        career: loadCareer(),
        ledgerLen: uiLedger.length,
        storylineIds: DATA.storylines.map(function (s) { return s.id; }),
      }, have);
      if (!fresh.length) return;
      for (var i = 0; i < fresh.length; i++) {
        have[fresh[i]] = true;
        if (window.dgAchieve && typeof window.dgAchieve.unlock === 'function') {
          window.dgAchieve.unlock(fresh[i]);
        }
      }
      store.set('dg_ach', JSON.stringify(have));
    } catch (e) { /* achievements must never take the desk down */ }
  }

  // ---------- career record ----------
  function loadCareer() {
    try {
      var c = JSON.parse(store.get('dg_career') || 'null');
      if (c && typeof c === 'object') return c;
    } catch (e) { /* private mode */ }
    return { nights: 0, survived: 0, deaths: { streets: 0, brass: 0, relief: 0 }, best: null, streak: 0, bestStreak: 0, sagas: [] };
  }

  var GRADE_RANK = { good: 3, mixed: 2, poor: 1, unresolved: 0 };

  // The casebook is written the moment a case closes, not at 06:00 — a
  // night abandoned mid-shift (phones get pocketed) must not lose the case.
  function saveSagaGrade(id, grade) {
    try {
      var c = loadCareer();
      c.sagaGrades = c.sagaGrades || {};
      var prev = c.sagaGrades[id];
      if (prev === undefined || GRADE_RANK[grade] > GRADE_RANK[prev]) {
        c.sagaGrades[id] = grade;
        store.set('dg_career', JSON.stringify(c));
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
      // the casebook: best grade ever taken on each marquee saga
      var mq = state.stories[state.marquee];
      if (mq && mq.started) {
        c.sagaGrades = c.sagaGrades || {};
        var g = mq.resolved ? mq.grade : 'unresolved';
        var prev = c.sagaGrades[state.marquee];
        if (prev === undefined || GRADE_RANK[g] > GRADE_RANK[prev]) c.sagaGrades[state.marquee] = g;
      }
      store.set('dg_career', JSON.stringify(c));
    } catch (e) { /* private mode */ }
  }

  // ---------- avatars (the guvnor's polaroid — constant) ----------
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
      // don't tear down a running arrival animation if the probe resolves
      // after the player has already booked on — the photo upgrades on the
      // next natural render anyway
      if (!typer) render();
    };
    probe.src = avatarSrc('1', 'base');
  })();

  function chosenAvatar() {
    try {
      var v = store.get('dg_avatar');
      if (v && AVATARS.some(function (a) { return a.id === v; })) return v;
    } catch (e) { /* private mode */ }
    return '1';
  }
  function setAvatar(id) {
    store.set('dg_avatar', id);
  }

  // ---------- the strength of the parade (named difficulty) ----------
  function chosenMode() {
    try {
      var v = store.get('dg_mode');
      if (v && E.MODES[v]) return v;
    } catch (e) { /* private mode */ }
    return 'standard';
  }
  function setMode(m) {
    store.set('dg_mode', m);
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

  // ---------- log ----------
  // uiLog text is stored DISPLAY-READY: callers pass already-localised strings
  // (the R/T lines localise via L() or tx.full; the fixed voice lines name no
  // canonical parts). Only the engine's raw state.log needs recasting, and it
  // is tagged raw below so the render localises those — and only those —
  // once. The smoke's phantom scan is the net if a caller ever forgets.
  function pushUiLog(text, kind, time) {
    uiLog.push({ time: time || E.turnClock(Math.min(state.turn, E.TURNS)), text: text, kind: kind || 'entry' });
  }

  function mergedLog() {
    // engine entries (raw, need recasting) + UI voice lines (display-ready), newest first
    var all = state.log.map(function (l) { return { time: l.time, text: l.text, kind: 'entry', raw: true }; }).concat(uiLog);
    return all.reverse();
  }

  // ---------- arrivals ----------
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

  // ---------- choice helpers ----------
  var LETTERS = ['a', 'b', 'c', 'd'];

  // the guvnor's biro verdict on a weary job — rotates per card
  var WEARY_NOTES = [
    'A weary one — nobody’s dying, but it won’t file itself.',
    'Paperwork with a pulse. Just.',
    'The night’s idea of a joke.',
    'Not worth a siren. Still worth ink.',
    'One for the book, not the blood pressure.',
    'Early Turn would leave it. Early Turn leaves everything.',
    'Late Turn swore the manor was quiet. Late Turn swears a lot.',
  ];

  // handwriting reads as handwriting in mixed case; all-caps Caveat reads as type
  function cap(s) { return s.charAt(0) + s.slice(1).toLowerCase(); }

  function vetoText(reason) {
    if (reason === 'NO UNITS SPARE') return 'No one left to send.';
    if (reason === 'CELLS FULL') return 'Nowhere to put him.';
    if (reason === 'NO FAVOURS OWED') return 'No markers left to call in.';
    return 'Not tonight.';
  }

  function sendsNames(choice) {
    // mirror the engine exactly: the order binds first, then whoever the
    // card copy stars, then the top of the board
    var e = choice.effects || {};
    var card = state.current && state.current.card;
    var extra = card ? E.choiceExtraCopy(card, choice) : '';
    return E.crewToSend(state, e.dispatchUnits || 0, choice.label, extra).map(function (pc) {
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

  // ---------- transmit state machine ----------
  function txMessage(card, choice) {
    var order = choice.label.replace(/[.…]+$/, '').toUpperCase();
    return L('THORNE ST TO TANGO TWO — ' + shortTitle(card).toUpperCase() + '. ' + order + '. OVER.');
  }

  // The printed directive that quotes the key is itself a key: testers press
  // the words, so the words press the set. Only ever transmits — BELAY
  // stays on the set itself.
  function txPointChip(withArrows) {
    var chip = el('button', 'tx-point');
    chip.appendChild(document.createTextNode('▣ PRESS TO TRANSMIT'));
    if (withArrows) {
      chip.appendChild(el('span', 'tx-arr r', '→'));
      chip.appendChild(el('span', 'tx-arr d', '▼'));
    }
    chip.onclick = function () { if (tx.st === 'armed') txStart(); };
    return chip;
  }

  function txArm() { tx.st = 'armed'; tx.line = ''; S.hiss(); renderRadio(); }
  function txDisarm() { tx.st = 'idle'; tx.line = ''; renderRadio(); }

  // press once and the message goes out live; press again to belay it mid-sentence.
  // a staged call to Division takes the channel first; the order waits its turn
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
      // stale timers must never touch a set that has moved on: only a set
      // still showing SAY AGAIN goes back to armed
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
    // the message has gone: let it sit on the net a beat before the desk moves on
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

  // ---------- commit ----------
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

    // the occurrence book keeps every decision as the desk saw it
    uiLedger.push({
      time: E.turnClock(Math.min(state.turn, E.TURNS)),
      title: L(shortTitle(card)),
      label: L(choice.label),
      deltas: state.lastDeltas,
      gamble: state.lastGamble,
      backed: !!(state.lastBoost && (state.lastBoost.extraUnit || state.lastBoost.favour || state.lastBoost.dogs)),
    });

    if (wasDispatch) {
      // capture now: by the time the ack lands the player may have carried on
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

  // the old sheet leaves the desk, the blotter sits empty a beat,
  // then the next one settles in
  function transitionRender(gapMs) {
    var card = document.getElementById('card');
    if (reduceMotion || !card) { render(); return; }
    card.classList.remove('in');
    card.classList.add('out'); // pointer-events off while it goes
    setTimeout(render, gapMs || 850);
  }

  // ---------- board (left column) ----------
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

  // The warrant card is built once and the same node re-used across renders —
  // recreating its <img>s made the guvnor's photo blink on every decision.
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
    // presentational: a selected option earmarks empty cells as held
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

  // Nelson, taken in as a material witness, sits the shift out on the rule
  // under THE CELLS — feet on the line like it was the shop wire. Tap him
  // and he does the whistle. He is not booked into a cell; he is a guest.
  function nelsonPerch() {
    var perch = el('span', 'nelson');
    perch.title = 'NELSON — MATERIAL WITNESS';
    perch.setAttribute('role', 'img');
    perch.setAttribute('aria-label', 'Nelson the mynah bird, assisting with enquiries');
    perch.innerHTML =
      '<svg viewBox="0 0 26 22" xmlns="http://www.w3.org/2000/svg">' +
      '<path fill="currentColor" d="M2.2,8.6 L6.1,6.5 C6.7,4.3 8.9,3.2 11,4.1 ' +
      'C13.2,5 14.1,7.4 13.8,9.8 C16.4,11.4 19.4,14.8 21.4,19.6 L19.7,20.4 ' +
      'C18.2,17.2 16,14.6 13.3,13.2 C12.4,14.4 10.9,15.1 9.4,15 ' +
      'C7.3,14.8 5.7,13.3 5.4,11.2 C5.2,9.9 5.6,8.9 6.1,8.3 Z"/>' +
      '<rect fill="currentColor" x="8.4" y="14.6" width="1" height="3.4"/>' +
      '<rect fill="currentColor" x="10.7" y="14.6" width="1" height="3.4"/>' +
      '<circle class="n-eye" cx="9.7" cy="6.3" r="0.9"/>' +
      '</svg>';
    perch.onclick = function () { S.whistle(); };
    return perch;
  }

  function nelsonInResidence() {
    return state && state.flagsSet && state.flagsSet.indexOf('flag_nelson_nicked') >= 0;
  }

  // ---------- ring Division: one call per unit a night, made on the air ----------
  // A call is staged, never snapped: pick the unit, see what it buys, then
  // key the set — the request goes out live like any other transmission,
  // and BELAY works on it too.
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
    spg: {
      unit: 'SPECIAL PATROL GROUP',
      what: 'The Yard’s flying mob — two Transit vans of coppers with no ground of their own, lent to whichever manor is losing the night. Their sweep claws the streets back; the relief resent needing it.',
      effect: 'STREETS +10 · RELIEF −2',
    },
    dogs: {
      unit: 'DOG SECTION',
      what: 'A dog van and handler standing by on the ground: whatever chancy job you back next, the dog goes in first.',
      effect: 'YOUR NEXT GAMBLE +20',
    },
    cid: {
      unit: 'CRIMINAL INVESTIGATION DEPT',
      what: 'The night-duty detectives come down and take the job on the desk away entirely. Their case now — their paperwork, their glory.',
      effect: 'TAKES THE JOB ON THE DESK',
    },
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

  // the request has gone out and Division has answered: apply the call
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
        // CID took the card off the desk: nothing left to have selected
        selected = -1;
        boostSel = { extraUnit: false, favour: false };
      } else if (selected >= 0 && state.current) {
        // spg/dogs leave the desk as it stands — a staged gamble stays staged,
        // and a half-armed order goes back on the air
        var c = state.current.card.choices[selected];
        if (c && needsTransmit(c)) tx.st = 'armed';
      }
    }
    render();
  }

  // The panel is built once and kept, like the set it sits under.
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
    // streets in the red with the S.P.G. still in hand: Division can fix
    // that, and the player should hear about it — once from Bream, and
    // standing from the panel until it's dealt with
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
      st.appendChild(el('span', 'd-what', CALL_DESC[divSel].what));
      st.appendChild(el('span', 'd-effect', CALL_DESC[divSel].effect));
      var hint = el('span', 'd-hint');
      hint.appendChild(document.createTextNode('To make the call: '));
      hint.appendChild(txPointChip(false));
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

    // tonight's parade notice: a duty slip pinned to the board, opening to
    // the full wording and the plain effect underneath
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
        // the trait rides on the tag: one biro word, the rule on hover
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
        // the label stays on its hook: a red line through the name, chalk beside
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
      // the last resort only exists while there is nobody left to send
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
    if (nelsonInResidence()) cellHead.appendChild(nelsonPerch());
    s.appendChild(cellHead);
    s.appendChild(buildCellRow());
    var occCount = state.cells.length + (state.mpInCell ? 1 : 0);
    var lockCount = (state.lockedCells || []).length;
    var inline = el('div', 'cells-inline',
      new Array(occCount + 1).join('■') +
      new Array(lockCount + 1).join('▨') +
      new Array(Math.max(0, E.CELLS_TOTAL - occCount - lockCount) + 1).join('□'));
    // the pocket book gets him too: the heading is folded away on a phone,
    // so he perches at the end of the cells line instead
    if (nelsonInResidence()) inline.appendChild(nelsonPerch());
    s.appendChild(inline);

    // the night can be put down and picked up from the parade sheet later —
    // career shifts only; the daily is everyone's same night
    if (!dailyMode && state && !state.over) {
      var susp = el('button', 'suspend-link', 'SUSPEND THE NIGHT');
      susp.title = 'Books the night down as it stands. Pick it up again from the parade sheet — one slot, no rewinding.';
      susp.onclick = suspendNight;
      s.appendChild(susp);
    }

    // favours and the turn share a foot row: the board stays above the fold
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

  // ---------- incident (centre column) ----------
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
          // a gamble is staged, never snapped: weigh it, back it, then chance it —
          // and a set left armed OR mid-belay by an abandoned call folds shut
          // (the failTimer's own failed-state guard then no-ops safely)
          if (tx.st === 'armed' || tx.st === 'failed') { tx.st = 'idle'; renderRadio(); }
          syncSelection(box, card, container);
        } else {
          // an instant commit may be abandoning an armed selection: move the
          // biro to THIS choice (and drop any stale txnote) before the card
          // leaves the desk, or the old circle lingers through the transition
          syncSelection(box, card, container);
          commit(idx);
        }
      };
      box.appendChild(b);
    });
    container.appendChild(box);
    syncSelection(box, card, container, true);
  }

  // reflect the current selection without tearing the whole desk down
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
        // the biro scribble stays in character; the printed chip quotes the
        // key on the set verbatim and points at it (right on the desk,
        // down to the dock on a phone)
        var note = el('div', 'margin-note txnote');
        note.appendChild(document.createTextNode(going + ' to go — say it on the air: '));
        note.appendChild(txPointChip(true));
        container.appendChild(note);
      }
    }
    if (!initial) refreshCells();
  }

  // ---------- the gamble panel (preparation tilts the odds) ----------
  // A staged gamble can be backed before it's rolled: a spare PC riding
  // along or a favour called in is worth +15 apiece; the Dog Section
  // standing by (the Dog Section's one call) is worth +20. Nothing buys certainty.
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

  // Slips still unread on the desk: last night's consequences, presented
  // before the first card and costing nothing off the clock.
  function openersPending() {
    return !!(state && !state.over && state.openers && state.openers.length &&
      state.turn <= 1 && state.phase === 'choose');
  }

  function renderIncident() {
    var wrap = el('div');
    wrap.id = 'card';
    if (openersPending()) {
      var op = state.openers[0];
      var oKey = 'opener:' + state.openers.length;
      if (oKey !== lastAnimKey && !reduceMotion) wrap.classList.add('in');
      lastAnimKey = oKey;
      var slip = el('div', 'paper opener');
      slip.appendChild(el('h2', 'kicker', 'OVERNIGHT CORRESPONDENCE — BEFORE THE BOOK OPENS'));
      slip.appendChild(el('div', 'title', L(op.title)));
      var ob = el('div', 'body');
      ob.textContent = L(op.text);
      slip.appendChild(ob);
      var obox = el('div', 'choices');
      var okBtn = el('button', null, 'A) Noted — carry on.');
      okBtn.onclick = function () {
        S.click();
        state.openers.shift();
        render();
      };
      obox.appendChild(okBtn);
      slip.appendChild(obox);
      wrap.appendChild(slip);
      wrap.appendChild(renderTray());
      return wrap;
    }
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
      // the night speaks on the machine: paced lines on a phosphor panel
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

    // paper modes: telex (typed) / weary (slapped) / pad (quiet)
    if (mode === 'telex') {
      var bar = el('div', 'headbar');
      bar.appendChild(el('span', null, 'TELEPRINTER — THORNE ST'));
      wrap.appendChild(bar);
    }
    // the slap animation plays once, on arrival — not on every re-render
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
      // the one card where nothing is happening says so, plainly
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

  // ---------- result ----------
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
    // the ledger: what the night just did to the scores
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

  // ---------- radio + log (right column) ----------
  function radioStatus() {
    if (tx.st === 'transmitting') return { cls: 'live', text: 'TRANSMITTING — DIVISION HEARS YOU' };
    if (tx.st === 'complete') return { cls: 'live', text: 'MESSAGE PASSED — WAIT ONE' };
    if (tx.st === 'failed') return { cls: 'fail', text: '…THORNE ST, SAY AGAIN?' };
    if (tx.st === 'armed') return { cls: 'live', text: 'CHANNEL OPEN — KEY THE SET' };
    if (state.phase === 'result' && lastAir) return { cls: 'live', text: 'RECEIVING — TANGO TWO' };
    return { cls: '', text: '…CARRIER ONLY. ALL UNITS OFF AIR.' };
  }

  // The set is built once and kept: dormant (folded shut, carrier hiss only)
  // until a dispatch is selected — then it wakes, expands, and wants the key.
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
    // on the small screen the ticker opens into the full log on a tap
    p.onclick = function (ev) {
      if (!isMobile()) return;
      logOpen = !logOpen;
      renderLogPanel();
    };
    if (old) old.replaceWith(p);
    return p;
  }

  // ---------- the beat map (pinned below the log, desktop only) ----------
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

  // The map works for a living: the current job gets a pin. Named places pin
  // where they are — the TITLE is believed before the body copy, so a card
  // set at the Gresham never pins to the nick just because its text mentions
  // the front desk. The nick itself is the last resort, not the first.
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

  // returns [x, y, matchedByName]
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
    // a signal only pins when it names somewhere real: gale warnings and
    // all-stations chatter have no address to stick a pin in
    if (cur.kind === 'event' && !s[2]) return;
    var pin = el('div', 'map-pin');
    pin.style.left = s[0] + '%';
    pin.style.top = s[1] + '%';
    pin.title = L(cur.card.title) || '';
    beatMapEl.appendChild(pin);
  }

  // ---------- the Yard memorandum (1d) ----------
  // Survivors get one of two stamps; every other ending is the dismissal letter.
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
    // the marquee saga answers for itself; the mini is a side matter
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
    // the file remembers: the career reads back into the correspondence
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
    var when = 'NIGHT DUTY';
    if (dailyMode) when = 'THE DAILY ' + new Date().toISOString().slice(0, 10);
    else if (weekMode) {
      // the night just booked is the last row on the week's envelope
      var wsl = loadWeekEnv();
      var wn = wsl && wsl.results.length ? wsl.results[wsl.results.length - 1].night : 1;
      when = 'THE WEEK — NIGHT ' + wn + ' OF ' + WEEK.NIGHTS;
    }
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

  // ---------- the occurrence book (every decision as the desk kept it) ----------
  function renderLedger() {
    var sheet = el('div', 'ledger');
    sheet.appendChild(el('div', 'ledger-head', 'OCCURRENCE BOOK — THORNE STREET · NIGHT OF ' + nightOfLabel()));
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

  // the rail link that unfolds the occurrence book under the letter
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

  // The rail beside the letter answers to the mode: a week night marches on
  // to the next parade — or to the reckoning — where an ordinary night just
  // re-books. Null means the ordinary rail.
  function endRailSpec() {
    if (!weekMode || !WEEK) return null;
    var env = loadWeekEnv();
    if (env && !env.done) {
      return {
        label: 'PARADE FOR NIGHT ' + env.night + ' — ' + WEEK.DAYS[env.night - 1],
        act: beginWeekNight,
        teaser: 'NIGHT ' + numWord(env.night - 1).toUpperCase() + ' OF SEVEN IS ON THE FILE. THE WEEK GOES ON.',
      };
    }
    return {
      label: 'THE WEEK IN REVIEW',
      act: openWeekReview,
      teaser: env && env.diedNight
        ? 'THE WEEK ENDED EARLY. THE YARD IS TOTTING IT UP ANYWAY.'
        : 'SEVEN NIGHTS WORKED. THE YARD HAS TOTTED THEM UP.',
    };
  }

  // ---------- dismissal without notice (any game over: no memo, a letter) ----------
  function renderDismissal() {
    var end = state.ending;
    var isDisaster = end.kind === 'disaster';
    var reLine = isDisaster
      ? ({
        streets: 'THE LOSS OF THE BOROUGH — NIGHT OF ' + nightOfLabel(),
        brass: 'YOUR CONDUCT — NIGHT OF ' + nightOfLabel(),
        relief: 'THE COLLAPSE OF B RELIEF — NIGHT OF ' + nightOfLabel(),
      }[end.meter] || ('THE NIGHT OF ' + nightOfLabel()))
      : (end.title || ('THE NIGHT OF ' + nightOfLabel()));
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
    refrow.appendChild(el('span', null, morningDateline()));
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

    // the Commissioner's own register: flint, no ornament, one true thing said plainly
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
    // the file remembers: a man who has been written to before is written to differently
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
    var spec = endRailSpec();
    var cta = el('button', 'block-btn', spec ? spec.label : 'WORK ANOTHER SHIFT');
    cta.onclick = spec ? spec.act : function () { newGame(false); };
    rail.appendChild(cta);
    rail.appendChild(el('div', 'teaser', spec ? spec.teaser : 'SOMEBODY ELSE PARADES B RELIEF TOMORROW.'));
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
    refrow.appendChild(el('span', null, morningDateline()));
    memo.appendChild(refrow);
    memo.appendChild(el('div', 'memotitle', 'MEMORANDUM'));

    var toblock = el('div', 'toblock');
    var tofrom = el('div', 'tofrom');
    tofrom.textContent =
      'TO:      INSPECTOR — THORNE STREET (B RELIEF)\n' +
      'FROM:  OFFICE OF THE ASSISTANT COMMISSIONER "C"\n' +
      'RE:      YOUR CONDUCT OF THE NIGHT OF ' + nightOfLabel();
    toblock.appendChild(tofrom);
    var grade = STAMP_FOR[end.title] || 'ACCEPTABLE';
    toblock.appendChild(el('div', 'stamp-verdict', grade));
    memo.appendChild(toblock);

    var paras = el('div', 'paras');
    memoParagraphs().forEach(function (t) { paras.appendChild(el('p', null, t)); });
    memo.appendChild(paras);

    // Bream annotates the carbon before it's filed.
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

    // the duty rail sits beside the memo so WORK ANOTHER SHIFT never needs a scroll
    var rail = el('div', 'memo-rail');
    var spec = endRailSpec();
    var cta = el('button', 'block-btn', spec ? spec.label : 'WORK ANOTHER SHIFT');
    cta.onclick = spec ? spec.act : function () { newGame(false); };
    rail.appendChild(cta);
    rail.appendChild(el('div', 'teaser', spec ? spec.teaser :
      DAY_LONG[new Date(1975, 10, 14 + histNightOff()).getDay()].toUpperCase() +
      '. B RELIEF PARADES FOR NIGHT DUTY AT 2245.'));
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

  // ---------- THE WEEK IN REVIEW (the one letter at the end of it) ----------
  function renderWeekReview() {
    var env = reviewWeek;
    var v = WEEK.verdict(env);
    var died = env.diedNight > 0;
    var lastNight = env.diedNight ||
      (env.results.length ? env.results[env.results.length - 1].night : WEEK.NIGHTS);
    var md = new Date(1975, 10, 14 + lastNight); // the morning after the last night worked

    var wrap = el('div', 'memo-wrap');
    var memo = el('div', 'memo weekreview' + (died ? ' dismissal' : ''));
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
    refrow.appendChild(el('span', null, 'OUR REF: N.D. 14/75 — SEVEN NIGHTS'));
    refrow.appendChild(el('span', null,
      md.getDate() + ' ' + MONTH_LONG[md.getMonth()] + ' ' + md.getFullYear()));
    memo.appendChild(refrow);
    memo.appendChild(el('div', 'memotitle', 'THE WEEK IN REVIEW'));

    var toblock = el('div', 'toblock');
    var tofrom = el('div', 'tofrom');
    tofrom.textContent =
      'TO:      INSPECTOR — THORNE STREET (B RELIEF)\n' +
      'FROM:  THE COMMISSIONER\n' +
      'RE:      NIGHT DUTY, 14 TO 20 NOVEMBER 1975 — THE WHOLE WEEK OF IT';
    toblock.appendChild(tofrom);
    toblock.appendChild(el('div', 'stamp-verdict', v.title));
    memo.appendChild(toblock);

    // the ledger of nights: one line each, the way the office actually reads them
    var rows = el('div', 'wk-rows');
    var METER_LOST = {
      streets: 'THE BOROUGH WAS LOST', brass: 'YOUR STANDING COLLAPSED', relief: 'THE RELIEF WALKED OUT',
    };
    env.results.forEach(function (r) {
      var row = el('div', 'wk-row');
      row.appendChild(el('span', 'wk-night', 'NIGHT ' + r.night + ' — ' + r.day));
      var word;
      if (r.kind === 'debrief') {
        word = (r.sagaTitle ? r.sagaTitle.toUpperCase() + ' · ' + (GRADE_TEXT[r.sagaGrade] || 'LEFT OPEN') + ' · ' : '') +
          'AVG ' + r.avg;
      } else if (r.kind === 'dismissal') {
        word = 'DISMISSED WITHOUT NOTICE';
      } else {
        word = METER_LOST[r.meter] || 'THE NIGHT WAS LOST';
      }
      row.appendChild(el('span', 'wk-word' + (r.kind === 'debrief' ? '' : ' wk-lost'), word));
      rows.appendChild(row);
    });
    for (var un = lastNight + 1; un <= WEEK.NIGHTS; un++) {
      var urow = el('div', 'wk-row wk-unworked');
      urow.appendChild(el('span', 'wk-night', 'NIGHT ' + un + ' — ' + WEEK.DAYS[un - 1]));
      urow.appendChild(el('span', 'wk-word', 'WORKED BY SOMEBODY ELSE'));
      rows.appendChild(urow);
    }
    memo.appendChild(rows);

    var arrests = 0;
    env.results.forEach(function (r) { arrests += r.arrests || 0; });
    var paras = el('div', 'paras');
    paras.appendChild(el('p', null, '1.  ' + v.line));
    paras.appendChild(el('p', null,
      '2.  The papers before the Commissioner record ' +
      numWord(env.results.length) + ' night' + (env.results.length === 1 ? '' : 's') + ' worked, ' +
      numWord(arrests) + ' arrest' + (arrests === 1 ? '' : 's') + ' entered in the books' +
      (died ? ', and one command that did not reach Thursday.'
        : ', and a nightly average the office puts at ' + v.mean + '.')));
    memo.appendChild(paras);

    // Bream reads the carbon before it's filed, as ever
    memo.appendChild(el('div', 'memo-biro', died
      ? 'They counted the nights you didn’t work. Typical of upstairs. — B.'
      : 'Seven nights and the kettle came through every one. — B.'));

    var foot = el('div', 'footrow');
    var cc = el('div', 'cc');
    cc.appendChild(el('div', null, 'cc: COMMANDER, No. 3 DISTRICT'));
    cc.appendChild(el('div', null, 'FILE: THORNE ST / NIGHTS / 1975 — THE WEEK'));
    foot.appendChild(cc);
    var sig = el('div', 'sig');
    sig.appendChild(el('div', 'hand', 'Robert Mark'));
    sig.appendChild(el('div', 'role', 'COMMISSIONER OF POLICE OF THE METROPOLIS'));
    foot.appendChild(sig);
    memo.appendChild(foot);

    var rail = el('div', 'memo-rail');
    var cta = el('button', 'block-btn', 'BEGIN ANOTHER WEEK');
    cta.onclick = function () { clearWeekEnv(); beginWeekNight(); };
    rail.appendChild(cta);
    rail.appendChild(el('div', 'teaser', 'FRIDAY THE FOURTEENTH COMES ROUND AGAIN. IT ALWAYS DOES.'));
    var back = el('button', 'quiet-link', 'BACK TO THE PARADE SHEET');
    back.onclick = backToParade;
    rail.appendChild(back);

    var grid = el('div', 'memo-grid');
    grid.appendChild(memo);
    grid.appendChild(rail);
    wrap.appendChild(grid);
    return wrap;
  }

  // ---------- header ----------
  function renderHeader() {
    var h = el('header');
    // the small screen gets the short form of everything
    h.appendChild(el('span', 'force', isMobile() ? 'THORNE ST · B RELIEF' : 'METROPOLITAN POLICE · THORNE STREET · B RELIEF'));
    var right = el('div', 'right');
    right.appendChild(el('span', 'date', headerDate(!isMobile())));
    right.appendChild(el('span', 'clock', state && !state.over && state.turn <= E.TURNS ? E.turnClock(state.turn) : '--:--'));
    h.appendChild(right);
    return h;
  }

  // Everything presentational goes back to a clean desk: shared by a fresh
  // parade, a suspended night going down, and one coming back up.
  function resetPresentation() {
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
  }

  // ---------- the suspended night (issue #12) ----------
  // One slot, guvnor's decision on the issue: suspending walks you back to
  // the parade sheet; resuming consumes the slot (no rewinding a bad night);
  // any shift ending clears it; booking on fresh scraps it; the daily is
  // everyone's same night and cannot be put down.
  function loadSuspendedEnv() {
    try {
      var env = JSON.parse(store.get('dg_shift') || 'null');
      if (env && env.v === 1 && env.snap && env.snap.crew) return env;
    } catch (e) { /* no night on the hook */ }
    return null;
  }

  function clearSuspended() { store.set('dg_shift', ''); }

  function suspendNight() {
    if (!state || state.over || dailyMode) return;
    if (tx.st === 'transmitting' || tx.st === 'complete') return; // let the air clear first
    try {
      store.set('dg_shift', JSON.stringify({
        v: 1,
        nightOff: curNightOff(),
        week: weekMode, // a suspended week night resumes as one
        snap: E.snapshot(state),
        ui: {
          trayHistory: trayHistory, uiLog: uiLog, uiLedger: uiLedger,
          spgNudged: spgNudged, gradeFlushed: gradeFlushed,
        },
      }));
    } catch (e) { return; } // if it can't be kept, don't lose the live night
    S.click();
    state = null;
    resetPresentation();
    render();
  }

  function resumeNight() {
    var env = loadSuspendedEnv();
    if (!env) return;
    clearSuspended(); // consumed on pick-up: the dice stay honest
    S.warm();
    dailyMode = false;
    // the night goes back up as what it was — but a week abandoned while
    // its night hung suspended leaves an ordinary night, not a ghost week
    weekMode = !!(env.week && loadWeekEnv());
    reviewWeek = null;
    resetPresentation();
    nightOff = env.nightOff >= 0 ? env.nightOff : histNightOff();
    state = E.restore(DATA, env.snap);
    var u = env.ui || {};
    trayHistory = u.trayHistory || [];
    uiLog = u.uiLog || [];
    uiLedger = u.uiLedger || [];
    spgNudged = !!u.spgNudged;
    gradeFlushed = !!u.gradeFlushed;
    render();
  }

  // ---------- THE WEEK (issue #4 — the desktop campaign) ----------
  // Seven consecutive nights, Friday 14 to Thursday 20 November, worked as
  // one posting. The envelope (dg_week) is the week's own dg_hist: flags,
  // favours, echoes and rotations carry night to night, sequestered from
  // the single-night book. Parades only where the desktop shell flies the
  // flag (window.dgDesktop) — the web never sees it.
  function weekAvailable() { return !!(window.dgDesktop && WEEK); }

  function loadWeekEnv() {
    try {
      var w = JSON.parse(store.get('dg_week') || 'null');
      if (w && w.v === 1 && w.night >= 1 && w.results) return w;
    } catch (e) { /* no week on the go */ }
    return null;
  }

  function saveWeekEnv(env) { store.set('dg_week', JSON.stringify(env)); }
  function clearWeekEnv() { store.set('dg_week', ''); }

  function beginWeekNight() {
    if (!weekAvailable()) return;
    var env = loadWeekEnv();
    if (!env || env.done) { env = WEEK.fresh(); saveWeekEnv(env); }
    S.warm();
    dailyMode = false;
    weekMode = true;
    reviewWeek = null;
    clearSuspended(); // booking on scraps any night on the hook, week or not
    resetPresentation();
    nightOff = env.night - 1; // the week owns its dates: Fri 14 .. Thu 20
    state = E.createGame(DATA, Math.random, WEEK.nightOpts(env));
    render();
  }

  function openWeekReview() {
    var env = loadWeekEnv();
    if (!env) { backToParade(); return; }
    S.click();
    reviewWeek = env;
    weekMode = false;
    state = null;
    nightOff = (env.diedNight || WEEK.NIGHTS) - 1; // the header reads the final night
    resetPresentation();
    render();
  }

  function backToParade() {
    reviewWeek = null;
    weekMode = false;
    state = null;
    nightOff = -1; // the sheet reads the single-night calendar afresh
    resetPresentation();
    render();
  }

  // ---------- title screen (the parade sheet) ----------
  function newGame(daily) {
    S.warm();
    dailyMode = !!daily;
    weekMode = false;
    reviewWeek = null;
    resetPresentation();
    if (daily) {
      // the daily is everyone's same night: the standard parade, no house rules
      nightOff = 0;
      var d = new Date();
      var seed = d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
      state = E.createGame(DATA, E.seededRng(seed), {});
    } else {
      clearSuspended(); // booking on fresh scraps any night on the hook
      nightOff = histNightOff(); // tonight's page of the calendar, fixed at parade
      var opts = loadHist();
      opts.mode = chosenMode();
      state = E.createGame(DATA, Math.random, opts);
    }
    render();
  }

  // What the book will actually open owing: the parade strength's allowance,
  // plus anything banked from last night and a grateful President's marker,
  // never more than two. Mirrors the engine's arithmetic exactly.
  function favoursAtParade(mode) {
    var h = loadHist();
    var total = E.MODES[mode].favours + (h.favours || 0) +
      (h.flags && h.flags.indexOf('flag_president_grateful') >= 0 ? 1 : 0);
    return Math.min(2, total);
  }

  // how the favours read on the parade sheet, by what's actually owed
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
      DAY_LONG[nightDate(0).getDay()] + ' night, November 1975. You are the Duty Inspector at Thorne Street nick, ' +
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
      // the casebook: every marquee saga, and the best you ever made of it
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
          // in place: a full re-render recreates every portrait and they all flash
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

    // the strength of tonight's parade (named difficulty, worn diegetically)
    var mpick = el('div', 'picker modes');
    mpick.appendChild(el('div', 'picklabel', 'TONIGHT’S PARADE'));
    var mrow = el('div', 'pickrow');
    MODE_ORDER.forEach(function (m) {
      var mb = el('button', 'pick mode' + (chosenMode() === m ? ' sel' : ''));
      mb.appendChild(el('span', 'mlabel', MODE_COPY[m].label));
      mb.appendChild(el('span', 'msub', MODE_COPY[m].sub));
      mb.onclick = function () {
        // in place, like the portraits: a full re-render flashes
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

    // a suspended night waits at the top of the sheet: pick it up, or book
    // on fresh and scrap it — said plainly, since fresh is destructive
    var env = loadSuspendedEnv();
    if (env) {
      var res = el('div', 'resume-block');
      var turnNo = Math.min((env.snap && env.snap.turn) || 1, E.TURNS);
      res.appendChild(el('div', 'resume-note',
        (env.week && loadWeekEnv() ? 'A night of THE WEEK' : 'A night') +
        ' stands suspended at ' + E.turnClock(turnNo) + ' — turn ' +
        turnNo + ' of ' + E.TURNS + '. Booking on fresh scraps it.'));
      var rb = el('button', 'block-btn resume-btn', 'RESUME THE NIGHT');
      rb.onclick = resumeNight;
      res.appendChild(rb);
      wrap.appendChild(res);
    }

    // THE WEEK parades above the single night, desktop only: seven
    // consecutive tours worked as one posting, one letter at the end
    if (weekAvailable()) {
      var wk = el('div', 'week-block');
      wk.appendChild(el('div', 'week-head', 'THE WEEK'));
      var wenv = loadWeekEnv();
      if (wenv && !wenv.done) {
        var wdate = 13 + wenv.night;
        wk.appendChild(el('div', 'week-note',
          'Seven consecutive nights, worked as one posting. ' +
          cap(numWord(wenv.night - 1).toUpperCase()) + ' night' + (wenv.night === 2 ? '' : 's') +
          ' on the file; what ' + (wenv.night === 2 ? 'it' : 'they') + ' left undone parades with you. ' +
          'From Wednesday the small hours lean harder.'));
        var wcta = el('button', 'block-btn week-btn',
          'PARADE FOR NIGHT ' + wenv.night + ' — ' + WEEK.DAYS[wenv.night - 1] + ' ' + wdate + ' NOVEMBER');
        wcta.onclick = beginWeekNight;
        wk.appendChild(wcta);
        var ab = el('button', 'quiet-link week-abandon', 'ABANDON THE WEEK');
        var abArmed = false;
        ab.onclick = function () {
          if (!abArmed) { abArmed = true; ab.textContent = 'SCRAP THE WEEK AND ALL ITS NIGHTS — CERTAIN?'; return; }
          clearWeekEnv();
          var senv = loadSuspendedEnv();
          if (senv && senv.week) clearSuspended(); // the week's hanging night goes with it
          S.click();
          render();
        };
        wk.appendChild(ab);
      } else if (wenv && wenv.done) {
        wk.appendChild(el('div', 'week-note',
          'The week is worked' + (wenv.diedNight ? ' — as much of it as there was' : ', all seven nights of it') +
          '. The Commissioner’s letter waits.'));
        var rcta = el('button', 'block-btn week-btn', 'THE WEEK IN REVIEW');
        rcta.onclick = openWeekReview;
        wk.appendChild(rcta);
      } else {
        wk.appendChild(el('div', 'week-note',
          'Seven consecutive nights, Friday 14 to Thursday 20 November, worked as one posting. ' +
          'Favours, grudges and unfinished business follow you from parade to parade, the small hours ' +
          'lean harder as the week wears on, and a career ended anywhere in it ends the week. ' +
          'One letter from the Commissioner at the end of it all.'));
        var bcta = el('button', 'block-btn week-btn', 'BEGIN THE WEEK — FRIDAY 14 NOVEMBER');
        bcta.onclick = beginWeekNight;
        wk.appendChild(bcta);
      }
      wrap.appendChild(wk);
      wrap.appendChild(el('div', 'single-head', 'A SINGLE NIGHT'));
    }

    var cta = el('button', 'block-btn', 'BOOK ON DUTY');
    cta.onclick = function () { newGame(false); };
    wrap.appendChild(cta);
    // the daily parades on the desktop only, alongside THE WEEK — the web
    // sheet keeps to the single night
    if (window.dgDesktop) {
      var daily = el('button', 'quiet-link', 'TONIGHT’S SHIFT — THE DAILY');
      daily.title = 'The same night for everyone today, always at rostered strength. Compare your debrief.';
      daily.onclick = function () { newGame(true); };
      wrap.appendChild(daily);
    }
    return wrap;
  }

  // ---------- sound-per-arrival ----------
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
      // the career night ended: nothing left on the hook. A daily ending
      // leaves any suspended career night exactly where it hangs.
      if (!dailyMode) clearSuspended();
      // a week night books its result and its baggage onto the envelope —
      // the service record (dg_career) still takes the night like any other
      if (weekMode && WEEK) {
        var wenv = loadWeekEnv();
        if (wenv && !wenv.done) saveWeekEnv(WEEK.recordNight(wenv, state, DATA));
      }
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
      // the marquee arriving is the big one: distant two-tones converge on the manor
      if (state.current.storyId === state.marquee) S.neenaw();
      else S.saga();
    }
    else if (mode === 'pad') S.quiet();
    else if (mode === 'rt') { S.signal(); setTimeout(function () { S.chatter(); }, 700); }
    else if (mentionsPhone) S.phone(); // the front desk blower goes
    else if (mode === 'telex') S.bell(true);
    // weary announces itself with the thunk on landing
    if (avatarsReady && mode !== 'pad') setTimeout(mutter, 500);
  }

  // ---------- render ----------
  function render() {
    if (typer) { clearInterval(typer); typer = null; }
    if (rtTimer) { clearTimeout(rtTimer); rtTimer = null; }
    // the first card holds its announcement until the correspondence is read
    if (state && !openersPending()) announce();
    app.textContent = '';
    app.appendChild(renderHeader());
    if (!state) {
      // a finished week's letter is read in place of the parade sheet
      app.appendChild(reviewWeek ? renderWeekReview() : renderTitle());
    } else if (state.over && state.phase === 'over') {
      // a survived night earns the memorandum; every game over is the letter
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
    // the front desk takes enquiries on the web; the desktop build routes
    // support through the Steam page instead of navigating the shell away
    if (!window.dgDesktop) {
      f.appendChild(document.createTextNode(' · '));
      var sup = el('a', null, 'SUPPORT');
      sup.href = 'support/';
      sup.target = '_blank';
      sup.rel = 'noopener';
      f.appendChild(sup);
    }
    app.appendChild(f);
    // after the frame settles: by now announce() has filed the career, so
    // shift feats and career feats alike read their true state
    checkAchievements();
  }

  render();
})();
