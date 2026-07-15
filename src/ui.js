/* Duty Guvnor — browser UI. Drives src/engine.js and renders into #app. */
(function () {
  'use strict';

  var E = window.Engine;
  var DATA = window.DATA;
  var S = window.Sound;
  var app = document.getElementById('app');
  var state = null;
  var dailyMode = false;
  var typer = null;
  var announced = null;   // last card object a sound was played for
  var announcedEnd = null;
  var typed = null;       // last card object whose text finished typing
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
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
      } else {
        c.deaths[state.ending.meter] = (c.deaths[state.ending.meter] || 0) + 1;
        c.streak = 0;
      }
      if (c.sagas.indexOf(state.marquee) < 0) c.sagas.push(state.marquee);
      window.localStorage.setItem('dg_career', JSON.stringify(c));
    } catch (e) { /* private mode */ }
  }

  // ---------- typewriter ----------
  function typewrite(node, text, done) {
    if (typer) { clearInterval(typer); typer = null; }
    if (reduceMotion) { node.textContent = text; done(); return; }
    var i = 0;
    node.classList.add('typing');
    node.textContent = '';
    var cur = el('span', 'cursor', '█');
    node.appendChild(cur);
    function finish() {
      clearInterval(typer); typer = null;
      node.classList.remove('typing');
      node.textContent = text;
      node.onclick = null;
      done();
    }
    node.onclick = finish;
    var beat = 0;
    typer = setInterval(function () {
      i += 2;
      if (i >= text.length) { finish(); return; }
      node.textContent = text.slice(0, i);
      node.appendChild(cur);
      if (++beat % 3 === 0) S.tick();
    }, 24);
  }

  // ---------- labels ----------
  function reqText(choice) {
    var e = choice.effects || {}, parts = [];
    if (e.dispatchUnits > 0) parts.push(e.dispatchUnits + ' PC' + (e.dispatchUnits > 1 ? 's' : ''));
    if (e.arrests > 0) parts.push(e.arrests + ' CELL' + (e.arrests > 1 ? 'S' : ''));
    if (e.favours < 0) parts.push('FAVOUR');
    var s = parts.join(' + ');
    if (choice.risk) s = (s ? s + ' · ' : '') + 'GAMBLE ' + choice.risk.odds + '%';
    return s;
  }

  // SIGNAL events give the player no say, so the full toll is stamped on the
  // acknowledgement — unlike incident choices, whose consequences you weigh blind.
  function tollText(effects) {
    var e = effects || {}, parts = [];
    if (e.seizeCount > 0) parts.push('-' + e.seizeCount + ' PC' + (e.seizeCount > 1 ? 's' : '') + ' FOR ' + (e.seizeTurns || 2) + ' TURNS');
    if (e.bonusUnits > 0) parts.push('+' + e.bonusUnits + ' PC TONIGHT');
    if (e.releaseCells > 0) parts.push('+' + e.releaseCells + ' CELL' + (e.releaseCells > 1 ? 'S' : '') + ' FREED');
    ['streets', 'brass', 'relief'].forEach(function (k) {
      if (e[k]) parts.push(k.toUpperCase() + (e[k] > 0 ? ' +' : ' ') + e[k]);
    });
    return parts.join(' · ');
  }

  // ---------- status panel ----------
  function meterRow(name, key) {
    var v = state.meters[key];
    var m = el('div', 'meter' + (v <= 25 ? ' low' : ''));
    m.setAttribute('role', 'img');
    var lab = el('div', 'label');
    var left = el('span', null, name);
    // The borough rots on its own: show the current decay on STREETS, and the
    // festering on any meter low enough to bleed.
    var drift = key === 'streets' && !state.over ? E.streetsDrift(state.turn) : 0;
    var bleeding = v > 0 && v < E.BLEED_BELOW;
    if (drift || bleeding) {
      left.appendChild(el('span', 'drift', ' ▼' + ((drift || 0) + (bleeding ? 2 : 0)) + '/½HR'));
    }
    lab.appendChild(left);
    var right = el('span', null, String(v));
    if (state.phase === 'result' && state.lastDeltas && state.lastDeltas[key]) {
      var d = state.lastDeltas[key];
      right.appendChild(el('span', d > 0 ? 'delta up' : 'delta down', (d > 0 ? ' +' : ' ') + d));
    }
    lab.appendChild(right);
    m.setAttribute('aria-label', name + ' ' + v + ' of 100' + (drift ? ', decaying ' + drift + ' per half hour' : ''));
    var bar = el('div', 'bar');
    var fill = el('div', 'fill');
    fill.style.width = v + '%';
    bar.appendChild(fill);
    m.appendChild(lab);
    m.appendChild(bar);
    return m;
  }

  function crewRows() {
    var d = el('div', 'crewlist');
    d.appendChild(el('span', 'label', 'THE RELIEF'));
    state.crew.forEach(function (pc) {
      var free = pc.turns <= 0;
      var row = el('div', 'crew ' + (free ? 'free' : 'out'));
      row.appendChild(el('span', null, (free ? '● ' : '○ ') + pc.name));
      if (!free) {
        row.appendChild(el('span', 'until', 'BACK ' + E.turnClock(Math.min(state.turn + pc.turns, 16))));
      }
      d.appendChild(row);
    });
    d.setAttribute('aria-label', E.freeUnits(state) + ' of ' + state.crew.length + ' officers available');
    return d;
  }

  function cellRows() {
    var d = el('div', 'crewlist');
    d.appendChild(el('span', 'label', 'THE CELLS'));
    var occupied = [];
    if (state.mpInCell) occupied.push('THE MEMBER');
    state.cells.forEach(function (c) { occupied.push(c.label || 'PRISONER'); });
    for (var i = 0; i < E.CELLS_TOTAL; i++) {
      var row = el('div', 'crew ' + (i < occupied.length ? 'out' : 'free'));
      row.appendChild(el('span', null, (i < occupied.length ? '■ ' : '□ ') + (occupied[i] || 'EMPTY')));
      d.appendChild(row);
    }
    d.setAttribute('aria-label', E.freeCells(state) + ' of ' + E.CELLS_TOTAL + ' cells free');
    return d;
  }

  function renderStatus() {
    var s = el('div');
    s.id = 'status';
    s.appendChild(el('h2', null, 'STATE OF PLAY'));
    s.appendChild(meterRow('STREETS', 'streets'));
    s.appendChild(meterRow('BRASS', 'brass'));
    s.appendChild(meterRow('RELIEF', 'relief'));
    s.appendChild(crewRows());
    s.appendChild(cellRows());
    var f = el('div', 'pips');
    f.appendChild(el('span', 'label', 'FAVOURS OWED'));
    f.appendChild(el('span', 'free', state.favours > 0 ? new Array(state.favours + 1).join('★') : '—'));
    s.appendChild(f);
    var t = el('div', 'pips');
    t.appendChild(el('span', 'label', 'TURN'));
    t.appendChild(el('span', 'free', Math.min(state.turn, E.TURNS) + ' / ' + E.TURNS + (dailyMode ? ' · DAILY' : '')));
    s.appendChild(t);
    return s;
  }

  // ---------- header ----------
  function renderHeader() {
    var h = el('header');
    h.appendChild(el('span', 'force', 'METROPOLITAN POLICE · THORNE STREET · B RELIEF'));
    var right = el('span');
    right.appendChild(el('span', 'date', 'FRI 14 NOV 1975 '));
    right.appendChild(el('span', 'clock', state && !state.over && state.turn <= E.TURNS ? E.turnClock(state.turn) : '--:--'));
    var snd = el('button', 'sound', S.on ? 'SND ◉' : 'SND ○');
    snd.title = 'sound on/off';
    snd.setAttribute('aria-label', 'sound ' + (S.on ? 'on' : 'off'));
    snd.onclick = function () { S.toggle(); render(); };
    right.appendChild(snd);
    var vol = el('input', 'vol');
    vol.type = 'range'; vol.min = 0; vol.max = 100; vol.value = Math.round(S.volume * 100);
    vol.title = 'volume';
    vol.setAttribute('aria-label', 'volume');
    vol.oninput = function () { S.setVolume(this.value / 100); };
    right.appendChild(vol);
    h.appendChild(right);
    return h;
  }

  function cardHeading(cur) {
    if (cur.kind === 'story') return 'ONGOING GRIEF';
    if (cur.kind === 'quiet') return 'STATION';
    if (cur.kind === 'event') return 'SIGNAL — ALL STATIONS';
    if (cur.card.tone === 'grief') return 'INCIDENT — A GRIEFY ONE';
    if (cur.card.tone === 'weary') return 'INCIDENT — A WEARY ONE';
    return 'INCIDENT';
  }

  function announce() {
    // one sound per new card / ending, however many times render() runs
    if (state.over && state.phase === 'over') {
      if (state.ending === announcedEnd) return;
      announcedEnd = state.ending;
      saveHist();
      saveCareer();
      if (state.ending.kind === 'disaster') S.disaster(state.ending.meter);
      else S.debrief(state.ending.avg);
      return;
    }
    if (state.phase !== 'choose' || state.current === announced) return;
    announced = state.current;
    if (state.current.kind === 'story') S.saga();
    else if (state.current.kind === 'quiet') S.quiet();
    else if (state.current.kind === 'event') S.signal();
    else S.bell(state.current.card.tone === 'grief');
  }

  // ---------- card ----------
  function renderCard() {
    var c = el('div');
    c.id = 'card';
    var cur = state.current;
    c.appendChild(el('h2', null, cardHeading(cur)));
    c.appendChild(el('div', 'title', cur.card.title));
    var body = el('div', 'body');
    c.appendChild(body);

    if (state.phase === 'result') {
      body.textContent = cur.card.text;
      var r = el('div', 'result' + (state.lastGamble === 'lost' ? ' lost' : ''));
      r.setAttribute('aria-live', 'polite');
      if (state.lastGamble) r.appendChild(el('div', 'gamble', state.lastGamble === 'lost' ? '✗ THE GAMBLE GOES WRONG' : '✓ THE GAMBLE COMES OFF'));
      r.appendChild(el('div', null, state.lastResult));
      c.appendChild(r);
      var cont = el('div', 'continue');
      var b = el('button', null, state.over ? '— SO IT ENDS —' : '— CARRY ON —');
      b.onclick = function () { S.carry(); E.proceed(state); render(); };
      cont.appendChild(b);
      c.appendChild(cont);
    } else {
      var choices = el('div', 'choices');
      if (state.current === typed) {
        // already typed once; a re-render (e.g. the SND toggle) must not replay it
        body.textContent = cur.card.text;
      } else {
        choices.style.visibility = 'hidden';
        typewrite(body, cur.card.text, function () {
          typed = state.current;
          choices.style.visibility = 'visible';
        });
      }
      cur.card.choices.forEach(function (choice, idx) {
        var st = E.choiceStatus(state, choice);
        var b = el('button');
        b.appendChild(el('span', null, '> ' + choice.label));
        var req = !st.enabled ? st.reason
          : cur.kind === 'event' ? tollText(choice.effects)
          : reqText(choice);
        if (req) b.appendChild(el('span', 'req', req));
        b.disabled = !st.enabled;
        b.onclick = function () { S.click(); E.choose(state, idx); render(); };
        choices.appendChild(b);
      });
      c.appendChild(choices);
    }
    return c;
  }

  // ---------- log ----------
  function renderLog() {
    var p = el('div');
    p.id = 'logpanel';
    p.appendChild(el('h2', null, 'STATION LOG'));
    var log = el('div');
    log.id = 'log';
    for (var i = state.log.length - 1; i >= 0; i--) {
      var row = el('div');
      row.appendChild(el('span', 't', state.log[i].time));
      row.appendChild(el('span', null, state.log[i].text));
      log.appendChild(row);
    }
    p.appendChild(log);
    return p;
  }

  // ---------- screens ----------
  function newGame(daily) {
    S.warm();
    dailyMode = !!daily;
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
    var s = el('div', 'screen');
    s.appendChild(el('h1', null, 'DUTY GUVNOR'));
    s.appendChild(el('div', 'sub',
      'Friday night, November 1975. You are the Duty Inspector at Thorne Street nick, ' +
      'and for the next eight hours everything that goes wrong in this borough is yours.'));
    var rules = el('div', 'rules');
    rules.innerHTML =
      '<b>STREETS</b> is order out there — and it rots on its own, faster after midnight. ' +
      '<b>BRASS</b> is your standing upstairs. <b>RELIEF</b> is your officers’ patience with you.<br>' +
      'Any of them hits zero, your night is over — and probably your career.<br><br>' +
      'You have <b>5 PCs</b> to send out, <b>4 cells</b> to fill — and the van to court ' +
      'doesn’t come until six, so every body you book holds its cell all night. ' +
      'One <b>favour</b> is owed to you around the manor. Spend it well. Survive until 06:00.';
    s.appendChild(rules);

    var career = loadCareer();
    if (career.nights > 0) {
      var rec = el('div', 'record');
      rec.appendChild(el('div', null,
        'SERVICE RECORD · NIGHTS ' + career.nights + ' · SURVIVED ' + career.survived +
        ' · STREAK ' + career.streak + ' (BEST ' + career.bestStreak + ')'));
      var deaths = 'DEATHS — STREETS ' + (career.deaths.streets || 0) +
        ' · BRASS ' + (career.deaths.brass || 0) + ' · RELIEF ' + (career.deaths.relief || 0);
      if (career.best) deaths += ' · BEST NIGHT: ' + career.best.title + ' (' + career.best.avg + ')';
      rec.appendChild(el('div', null, deaths));
      rec.appendChild(el('div', null, 'SAGAS WORKED ' + career.sagas.length + ' OF ' + DATA.storylines.length));
      s.appendChild(rec);
    }

    var b = el('button', null, 'BOOK ON DUTY');
    b.onclick = function () { newGame(false); };
    s.appendChild(b);
    var daily = el('button', 'secondary', 'TONIGHT’S SHIFT — THE DAILY');
    daily.title = 'The same night for everyone today. Compare your debrief.';
    daily.onclick = function () { newGame(true); };
    s.appendChild(daily);
    return s;
  }

  var GRADE_TEXT = {
    good: 'HANDLED WELL', mixed: 'SURVIVED, WITH A STAIN', poor: 'BOTCHED', unresolved: 'LEFT OPEN',
  };

  function shareLine() {
    var end = state.ending;
    var when = dailyMode ? 'THE DAILY ' + new Date().toISOString().slice(0, 10) : 'NIGHT SHIFT';
    if (end.kind === 'disaster') {
      return 'DUTY GUVNOR · ' + when + ' · SHIFT ABANDONED (' + end.meter.toUpperCase() + ' HIT ZERO) · DUTYGUVNOR.COM';
    }
    return 'DUTY GUVNOR · ' + when + ' · ' + end.title + ' (' + end.avg + ') · ' +
      end.stats.arrests + ' IN THE BOOK · ' + end.stats.cellsHeld + ' STILL IN THE CELLS AT SIX · ' +
      (end.saga.title || 'THE NIGHT') + ': ' + (GRADE_TEXT[end.saga.grade] || '—') + ' · DUTYGUVNOR.COM';
  }

  function renderEnding() {
    var end = state.ending;
    var s = el('div', 'screen' + (end.kind === 'disaster' ? ' disaster' : ''));
    s.appendChild(el('h1', null, end.title));
    s.appendChild(el('div', 'endtext', end.text));
    if (end.kind === 'debrief') {
      s.appendChild(el('div', 'stats',
        'THE MARQUEE — ' + (end.saga.title || '—') + ': ' + (GRADE_TEXT[end.saga.grade] || '—')));
      if (end.outcomes && end.outcomes.length) {
        var o = el('div', 'outcomes');
        o.appendChild(el('b', null, 'THE NIGHT’S SAGAS:'));
        end.outcomes.forEach(function (line) { o.appendChild(el('div', null, '• ' + line)); });
        s.appendChild(o);
      }
      s.appendChild(el('div', 'stats',
        'AVERAGE STANDING ' + end.avg + ' · BODIES IN THE BOOK ' + end.stats.arrests +
        ' · STILL IN THE CELLS AT SIX ' + end.stats.cellsHeld +
        ' · FAVOURS SPENT ' + end.stats.favoursSpent));
    }
    // The shift report: the whole night, fit to screenshot.
    if (state.log.length) {
      var rep = el('div', 'report');
      rep.appendChild(el('b', null, 'THE SHIFT REPORT — B RELIEF, FRI 14 NOV 1975:'));
      state.log.forEach(function (line) {
        var row = el('div');
        row.appendChild(el('span', 't', line.time));
        row.appendChild(el('span', null, line.text));
        rep.appendChild(row);
      });
      s.appendChild(rep);
    }
    var copy = el('button', 'secondary', 'COPY RESULT');
    copy.onclick = function () {
      var text = shareLine();
      try {
        navigator.clipboard.writeText(text).then(function () { copy.textContent = 'COPIED'; });
      } catch (e) { copy.textContent = text; }
    };
    s.appendChild(copy);
    var b = el('button', null, 'WORK ANOTHER SHIFT');
    b.onclick = function () { newGame(false); };
    s.appendChild(b);
    return s;
  }

  function render() {
    if (typer) { clearInterval(typer); typer = null; }
    if (state) announce();
    app.textContent = '';
    app.appendChild(renderHeader());
    if (!state) {
      app.appendChild(renderTitle());
    } else if (state.over && state.phase === 'over') {
      app.appendChild(renderEnding());
    } else {
      var main = el('main');
      main.appendChild(renderStatus());
      main.appendChild(renderCard());
      main.appendChild(renderLog());
      app.appendChild(main);
    }
    var f = el('footer', null, 'DUTY GUVNOR · a night-shift management entertainment · all characters fictitious' +
      (window.DG_BUILD ? ' · ' + window.DG_BUILD : ''));
    app.appendChild(f);
  }

  render();
})();
