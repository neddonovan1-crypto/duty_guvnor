/* Duty Guvnor — the desk UI. Drives src/engine.js and renders into #app.
 * Layout and behaviour per the 1975 Desk design handoff: three materials
 * (phosphor / paper / marks), teleprinter and pigeonhole arrivals, R/T
 * squawk for signals, press-to-transmit commits, and the Yard memorandum. */
(function () {
  'use strict';

  var E = window.Engine;
  var DATA = window.DATA;
  var S = window.Sound;
  var app = document.getElementById('app');
  var state = null;
  var dailyMode = false;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // presentation state (per shift)
  var typer = null;        // typewriter interval
  var typed = null;        // card object whose arrival presentation finished
  var announced = null;    // card object a sound was played for
  var announcedEnd = null;
  var selected = -1;       // selected choice index (dispatch choices arm the TX key)
  var tx = { st: 'idle', timer: null, failTimer: null, line: '', full: '' }; // idle|armed|transmitting|complete
  var rtShown = 0;         // paced R/T lines revealed
  var rtTimer = null;
  var trayHistory = [];    // resolved weary slips: {ref, title, turn}
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

  // ---------- cross-shift memory ----------
  function loadHist() {
    try {
      var h = JSON.parse(window.localStorage.getItem('dg_hist') || 'null');
      if (h && typeof h === 'object') {
        return {
          seen: h.seen || [], recent: h.recent || 0,
          lastMarquee: h.lastMarquee || null, lastMini: h.lastMini || null,
          flags: h.flags || [],
        };
      }
    } catch (e) { /* private mode */ }
    return { seen: [], recent: 0, lastMarquee: null, lastMini: null, flags: [] };
  }

  function saveHist() {
    if (dailyMode) return; // the daily shift is everyone's same night; it leaves no tracks
    try {
      var seen = state.drawn.concat(loadHist().seen).slice(0, 24);
      window.localStorage.setItem('dg_hist', JSON.stringify({
        seen: seen, recent: state.drawn.length,
        lastMarquee: state.marquee, lastMini: state.mini,
        flags: state.flagsSet,
      }));
    } catch (e) { /* private mode */ }
  }

  // ---------- career record ----------
  function loadCareer() {
    try {
      var c = JSON.parse(window.localStorage.getItem('dg_career') || 'null');
      if (c && typeof c === 'object') return c;
    } catch (e) { /* private mode */ }
    return { nights: 0, survived: 0, deaths: { streets: 0, brass: 0, relief: 0 }, best: null, streak: 0, bestStreak: 0, sagas: [] };
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
      } else if (state.ending.kind === 'dismissal') {
        c.deaths.dismissed = (c.deaths.dismissed || 0) + 1;
        c.streak = 0;
      } else {
        c.deaths[state.ending.meter] = (c.deaths[state.ending.meter] || 0) + 1;
        c.streak = 0;
      }
      if (c.sagas.indexOf(state.marquee) < 0) c.sagas.push(state.marquee);
      window.localStorage.setItem('dg_career', JSON.stringify(c));
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
      render();
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
  function pushUiLog(text, kind, time) {
    uiLog.push({ time: time || E.turnClock(Math.min(state.turn, E.TURNS)), text: text, kind: kind || 'entry' });
  }

  function mergedLog() {
    // engine entries + UI voice lines, newest first
    var all = state.log.map(function (l) { return { time: l.time, text: l.text, kind: 'entry' }; }).concat(uiLog);
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
    // mirror the engine exactly: officers named in the order go first
    var e = choice.effects || {};
    return E.crewToSend(state, e.dispatchUnits || 0, choice.label).map(function (pc) {
      return pc.name.replace(/^(PC|WPC|S\.C\.) /, '');
    });
  }

  function metaSpan(choice) {
    var e = choice.effects || {}, parts = [];
    if (e.dispatchUnits > 0) parts.push(['−' + e.dispatchUnits + ' PC' + (e.dispatchUnits > 1 ? 's' : '') + ' (' + sendsNames(choice).join(' + ') + ')', 'neg']);
    if (e.arrests > 0) parts.push(['−' + e.arrests + ' CELL' + (e.arrests > 1 ? 'S' : ''), 'neg']);
    if (e.favours < 0) parts.push(['−' + (-e.favours) + ' FAVOUR', 'neg']);
    if (e.seizeCount > 0) parts.push(['−' + e.seizeCount + ' PCs FOR ' + (e.seizeTurns || 2) + ' TURNS', 'neg']);
    if (e.bonusUnits > 0) parts.push(['+1 PC TONIGHT', 'pos']);
    if (e.releaseCells > 0) parts.push(['+' + e.releaseCells + ' CELL' + (e.releaseCells > 1 ? 'S' : '') + ' FREED', 'pos']);
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
    return 'THORNE ST TO TANGO TWO — ' + shortTitle(card).toUpperCase() + '. ' + order + '. OVER.';
  }

  function txArm() { tx.st = 'armed'; tx.line = ''; S.hiss(); renderRadio(); }
  function txDisarm() { tx.st = 'idle'; tx.line = ''; renderRadio(); }

  // press once and the message goes out live; press again to belay it mid-sentence
  function txStart() {
    if (tx.st !== 'armed' || selected < 0) return;
    var choice = state.current.card.choices[selected];
    tx.st = 'transmitting';
    tx.full = txMessage(state.current.card, choice);
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
    renderLogPanel(); // belayed: the half-said line vanishes, READY comes back
    tx.failTimer = setTimeout(function () {
      tx.st = selected >= 0 ? 'armed' : 'idle';
      renderRadio();
    }, 1700);
  }

  function txComplete() {
    // the message has gone: let it sit on the net a beat before the desk moves on
    tx.st = 'complete';
    pushUiLog('TX: ' + tx.full, 'tx');
    renderRadio();
    renderLogPanel();
    setTimeout(function () { commit(selected); }, reduceMotion ? 0 : 1500);
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
    var wasWeary = cur.kind === 'incident' && card.tone === 'weary';
    var cellsBefore = state.cells.length + (state.mpInCell ? 1 : 0);

    E.choose(state, idx);

    var cellsAfter = state.cells.length + (state.mpInCell ? 1 : 0);
    if (cellsAfter > cellsBefore) setTimeout(function () { S.clang(); }, reduceMotion ? 0 : 400);
    if (wasWeary) trayHistory.push({ ref: refFor(card), title: shortTitle(card).slice(0, 26), turn: state.turn });

    if (wasDispatch) {
      // capture now: by the time the ack lands the player may have carried on
      var first = (state.lastResult || '').split(/(?<=[.!?])\s/)[0] || '';
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
    tx.st = 'idle';
    if (avatarsReady && state.lastGamble === 'lost') setTimeout(mutter, 300);
    transitionRender(1000);
  }

  function proceed() {
    S.carry();
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
    if (key === 'streets' && !state.over) driftN += E.streetsDrift(state.turn);
    if (key === 'relief' && !state.over) driftN += E.reliefDrift(state.turn);
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
    wleft.appendChild(el('div', 'name', who.name.toUpperCase()));
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

  function renderBoard() {
    var s = el('div');
    s.id = 'status';

    s.appendChild(warrantCard());

    var meters = el('div', 'meters-row');
    meters.appendChild(meterRow('STREETS', 'streets'));
    meters.appendChild(meterRow('BRASS', 'brass'));
    meters.appendChild(meterRow('RELIEF', 'relief'));
    s.appendChild(meters);

    s.appendChild(el('div', 'board-head', 'ON THE BOARD'));
    var rail = el('div', 'board-rail');
    var anyFree = false;
    state.crew.forEach(function (pc, i) {
      var row = el('div', 'hookrow');
      row.appendChild(el('div', 'hook'));
      var m = pc.name.match(/^(PC|WPC|S\.C\.)\s+(.+)$/);
      var rank = m ? m[1].replace(/\./g, '') : '';
      var surname = m ? m[2] : pc.name;
      var tag = el('div', 'tag', (rank ? rank + ' ' : '') + surname);
      tag.style.transform = 'rotate(' + (i % 2 ? 0.4 : -0.6) + 'deg)';
      if (pc.turns <= 0) {
        anyFree = true;
      } else {
        // the label stays on its hook: a red line through the name, chalk beside
        tag.classList.add('out');
        var backTurn = state.turn + pc.turns;
        row.appendChild(tag);
        row.appendChild(el('div', 'chalkline back' + (backTurn > 16 ? ' overdue' : ''),
          'Back ' + (backTurn > 16 ? 'past six' : E.turnClock(Math.min(backTurn, 16)))));
        rail.appendChild(row);
        return;
      }
      row.appendChild(tag);
      rail.appendChild(row);
    });
    s.appendChild(rail);
    if (!anyFree) s.appendChild(el('div', 'board-empty', 'THE BOARD IS EMPTY'));

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

    s.appendChild(el('div', 'board-head bare', 'FAVOURS OWED'));
    var fav = el('div', 'favours');
    if (state.favours > 0) {
      for (var fi = 0; fi < state.favours; fi++) fav.appendChild(el('div', 'favour-chit', 'IOU'));
    } else {
      fav.appendChild(el('div', 'none', 'All called in.'));
    }
    s.appendChild(fav);

    var turnrow = el('div', 'turnrow');
    turnrow.appendChild(el('span', 'tlabel', 'TURN' + (dailyMode ? ' · DAILY' : '')));
    turnrow.appendChild(el('span', 'tval',
      String(Math.min(state.turn, E.TURNS)).padStart(2, '0') + ' of 16'));
    s.appendChild(turnrow);
    return s;
  }

  // ---------- incident (centre column) ----------
  function renderChoices(card, container) {
    var box = el('div', 'choices');
    card.choices.forEach(function (choice, idx) {
      var st = E.choiceStatus(state, choice);
      var b = el('button');
      var lbl = LETTERS[idx] + ') ' + choice.label + (/[.!?…]$/.test(choice.label) ? '' : '.');
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
        selected = idx;
        if (needsTransmit(choice)) {
          txArm();
          syncSelection(box, card, container); // in place: a full re-render flashes
        } else {
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
    if (selected >= 0 && state.phase === 'choose') {
      var c = card.choices[selected];
      if (c && needsTransmit(c)) {
        var going = sendsNames(c).map(cap).join(' and ');
        container.appendChild(el('div', 'margin-note txnote', 'Key the set and say it — ' + going + ' to go.'));
      }
    }
    if (!initial) refreshCells();
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
      var parts = cur.card.text.split(/(?<=[.!?…])\s+/).filter(Boolean);
      parts.unshift('…THORNE ST FROM DIVISION — ' + cur.card.title);
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
    paper.appendChild(el('div', 'title', cur.card.title));
    var body = el('div', 'body');
    paper.appendChild(body);
    var choicesHome = el('div');
    paper.appendChild(choicesHome);
    wrap.appendChild(paper);
    wrap.appendChild(renderTray());

    var bodyText = paraSplit(cur.card.text);
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
    paper.appendChild(el('h2', 'kicker', shortTitle(cur.card).toUpperCase() + ' — RESULT' + (cur.kind === 'story' ? ' · ONGOING GRIEF' : '')));
    var q = el('div', 'result-quote' + (state.lastGamble === 'lost' ? ' lost' : ''));
    q.setAttribute('aria-live', 'polite');
    if (state.lastGamble === 'lost') {
      q.appendChild(el('span', 'fail-tag', '✗ THE GAMBLE GOES WRONG — '));
    } else if (state.lastGamble === 'won') {
      q.appendChild(el('span', 'win-tag', '✓ THE GAMBLE COMES OFF — '));
    }
    q.appendChild(document.createTextNode(state.lastResult || ''));
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
    if (state.phase === 'result') return { cls: 'live', text: 'RECEIVING — TANGO TWO' };
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
      (state && !state.over && state.phase === 'result');
    radioEl.classList.toggle('awake', awake);
    radioEl.classList.toggle('dormant', !awake);
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
      row.appendChild(document.createTextNode(' ' + l.text));
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
  // where they are; everything else lands somewhere plausible on its beat.
  var MAP_SPOTS = [
    [/thorne street|front desk|the nick|charge room|cell/i, 58, 56],
    [/ropemakers/i, 30, 33],
    [/keller/i, 43, 38],
    [/chapel y(ar)?d/i, 60, 23],
    [/marsh lane/i, 79, 28],
    [/milford/i, 27, 57],
    [/shadwell|foreshore|the river|tide/i, 82, 60],
    [/halkin/i, 56, 67],
    [/wandle|allotment/i, 18, 75],
    [/high street|wimpy|alhambra|feathers|duke of clarence/i, 52, 46],
    [/gresham|barkers/i, 66, 41],
    [/st mark/i, 70, 49],
  ];
  var BEAT_CENTRES = [[28, 26], [54, 24], [72, 27], [22, 50], [50, 48], [70, 47], [34, 71], [62, 69]];

  function mapSpot(card) {
    var hay = (card.title || '') + ' ' + (card.text || '');
    for (var i = 0; i < MAP_SPOTS.length; i++) {
      if (MAP_SPOTS[i][0].test(hay)) return [MAP_SPOTS[i][1], MAP_SPOTS[i][2]];
    }
    var h = refFor(card);
    var b = BEAT_CENTRES[h % 8];
    return [b[0] + (h % 9) - 4, b[1] + (h % 5) - 2];
  }

  function updateMapPin() {
    if (!beatMapEl) return;
    var old = beatMapEl.querySelector('.map-pin');
    if (old) old.remove();
    var cur = state && !state.over && state.current;
    if (!cur || !cur.card || cur.kind === 'quiet' || cur.kind === 'event') return;
    var s = mapSpot(cur.card);
    var pin = el('div', 'map-pin');
    pin.style.left = s[0] + '%';
    pin.style.top = s[1] + '%';
    pin.title = cur.card.title || '';
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
    var mqLine = (mq && mq.outcome) || (mqStory && mqStory.unresolvedOutcome) || null;
    var para2 = mqLine
      ? '2.  As to ' + marqueeTitle + ': ' + mqLine
      : '2.  As to ' + marqueeTitle + ': the matter was still open at first light, which the Assistant Commissioner regards as an answer of its own.';
    var mini = state.mini ? state.stories[state.mini] : null;
    if (mini && mini.outcome) {
      var miniTitle = '';
      for (var j = 0; j < DATA.minisagas.length; j++) {
        if (DATA.minisagas[j].id === state.mini) miniTitle = DATA.minisagas[j].title;
      }
      para2 += ' As to the side matter' + (miniTitle ? ' (' + miniTitle.toUpperCase() + ')' : '') + ': ' + mini.outcome;
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

  // ---------- dismissal without notice (any game over: no memo, a letter) ----------
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
    return wrap;
  }

  // ---------- header ----------
  function renderHeader() {
    var h = el('header');
    // the small screen gets the short form of everything
    h.appendChild(el('span', 'force', isMobile() ? 'THORNE ST · B RELIEF' : 'METROPOLITAN POLICE · THORNE STREET · B RELIEF'));
    var right = el('div', 'right');
    right.appendChild(el('span', 'date', isMobile() ? 'FRI 14 NOV' : 'FRI 14 NOV 1975'));
    right.appendChild(el('span', 'clock', state && !state.over && state.turn <= E.TURNS ? E.turnClock(state.turn) : '--:--'));
    h.appendChild(right);
    return h;
  }

  // ---------- title screen (the parade sheet) ----------
  function newGame(daily) {
    S.warm();
    dailyMode = !!daily;
    selected = -1;
    tx = { st: 'idle', timer: null, failTimer: null, line: '', full: '' };
    typed = null; announced = null; announcedEnd = null; lastAnimKey = null; logOpen = false;
    trayHistory = []; uiLog = []; rtShown = 0;
    if (rtTimer) { clearTimeout(rtTimer); rtTimer = null; }
    if (daily) {
      var d = new Date();
      var seed = d.getUTCFullYear() * 10000 + (d.getUTCMonth() + 1) * 100 + d.getUTCDate();
      state = E.createGame(DATA, E.seededRng(seed), {});
    } else {
      state = E.createGame(DATA, Math.random, loadHist());
    }
    render();
  }

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
      'You have <b>5 PCs</b> on the board, <b>4 cells</b> to fill — and the van to court ' +
      'doesn’t come until six, so every body you book holds its cell all night. ' +
      'One <b>favour</b> is owed to you around the manor. Spend it well. Survive until 06:00.<br><br>' +
      'Sending officers out is done on the radio: pick the order, then <b>key the set</b> and the ' +
      'message goes out live. Hit <b>BELAY</b> mid-sentence and Division never heard you.';
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
      rec.appendChild(el('div', null, 'SAGAS WORKED ' + career.sagas.length + ' OF ' + DATA.storylines.length));
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
    wrap.appendChild(sheet);

    var cta = el('button', 'block-btn', 'BOOK ON DUTY');
    cta.onclick = function () { newGame(false); };
    wrap.appendChild(cta);
    var daily = el('button', 'quiet-link', 'TONIGHT’S SHIFT — THE DAILY');
    daily.title = 'The same night for everyone today. Compare your debrief.';
    daily.onclick = function () { newGame(true); };
    wrap.appendChild(daily);
    return wrap;
  }

  // ---------- sound-per-arrival ----------
  function announce() {
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
    if (state) announce();
    app.textContent = '';
    app.appendChild(renderHeader());
    if (!state) {
      app.appendChild(renderTitle());
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
