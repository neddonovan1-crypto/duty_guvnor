/* Duty Guvnor — browser UI. Drives src/engine.js and renders into #app. */
(function () {
  'use strict';

  var E = window.Engine;
  var DATA = window.DATA;
  var app = document.getElementById('app');
  var state = null;
  var typer = null;
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function typewrite(node, text, done) {
    if (typer) { clearInterval(typer); typer = null; }
    if (reduceMotion) { node.textContent = text; done(); return; }
    var i = 0;
    node.textContent = '';
    var cur = el('span', 'cursor', '█');
    node.appendChild(cur);
    function finish() {
      clearInterval(typer); typer = null;
      node.textContent = text;
      node.onclick = null;
      done();
    }
    node.onclick = finish;
    typer = setInterval(function () {
      i += 2;
      if (i >= text.length) { finish(); return; }
      node.textContent = text.slice(0, i);
      node.appendChild(cur);
    }, 24);
  }

  function reqText(effects) {
    var e = effects || {}, parts = [];
    if (e.dispatchUnits > 0) parts.push(e.dispatchUnits + ' PC' + (e.dispatchUnits > 1 ? 's' : ''));
    if (e.arrests > 0) parts.push(e.arrests + ' CELL' + (e.arrests > 1 ? 'S' : ''));
    if (e.favours < 0) parts.push('FAVOUR');
    return parts.join(' + ');
  }

  function meterRow(name, key) {
    var v = state.meters[key];
    var m = el('div', 'meter' + (v <= 25 ? ' low' : ''));
    var lab = el('div', 'label');
    lab.appendChild(el('span', null, name));
    lab.appendChild(el('span', null, String(v)));
    var bar = el('div', 'bar');
    var fill = el('div', 'fill');
    fill.style.width = v + '%';
    bar.appendChild(fill);
    m.appendChild(lab);
    m.appendChild(bar);
    return m;
  }

  function pipRow(label, free, total, glyphFree, glyphUsed) {
    var d = el('div', 'pips');
    d.appendChild(el('span', 'label', label));
    var used = total - free;
    d.appendChild(el('span', 'free', new Array(free + 1).join(glyphFree)));
    d.appendChild(el('span', 'used', new Array(used + 1).join(glyphUsed)));
    return d;
  }

  function renderHeader() {
    var h = el('header');
    h.appendChild(el('span', 'force', 'METROPOLITAN POLICE · THORNE STREET · B RELIEF'));
    var right = el('span');
    right.appendChild(el('span', 'date', 'FRI 14 NOV 1975 '));
    right.appendChild(el('span', 'clock', state && !state.over && state.turn <= E.TURNS ? E.turnClock(state.turn) : '--:--'));
    h.appendChild(right);
    return h;
  }

  function renderStatus() {
    var s = el('div');
    s.id = 'status';
    s.appendChild(el('h2', null, 'STATE OF PLAY'));
    s.appendChild(meterRow('STREETS', 'streets'));
    s.appendChild(meterRow('BRASS', 'brass'));
    s.appendChild(meterRow('RELIEF', 'relief'));
    s.appendChild(pipRow('PCs AVAILABLE', E.freeUnits(state), E.UNITS_TOTAL, '●', '○'));
    s.appendChild(pipRow('CELLS FREE', E.freeCells(state), E.CELLS_TOTAL, '■', '□'));
    var f = el('div', 'pips');
    f.appendChild(el('span', 'label', 'FAVOURS OWED'));
    f.appendChild(el('span', 'free', state.favours > 0 ? new Array(state.favours + 1).join('★') : '—'));
    s.appendChild(f);
    var t = el('div', 'pips');
    t.appendChild(el('span', 'label', 'TURN'));
    t.appendChild(el('span', 'free', Math.min(state.turn, E.TURNS) + ' / ' + E.TURNS));
    s.appendChild(t);
    return s;
  }

  function renderCard() {
    var c = el('div');
    c.id = 'card';
    var cur = state.current;
    c.appendChild(el('h2', null, cur.kind === 'story' ? 'ONGOING SAGA' : cur.kind === 'quiet' ? 'STATION' : 'INCIDENT'));
    c.appendChild(el('div', 'title', cur.card.title));
    var body = el('div', 'body');
    c.appendChild(body);

    if (state.phase === 'result') {
      body.textContent = cur.card.text;
      var r = el('div', 'result', state.lastResult);
      c.appendChild(r);
      var cont = el('div', 'continue');
      var b = el('button', null, state.over ? '— SO IT ENDS —' : '— CARRY ON —');
      b.onclick = function () { E.proceed(state); render(); };
      cont.appendChild(b);
      c.appendChild(cont);
    } else {
      var choices = el('div', 'choices');
      choices.style.visibility = 'hidden';
      typewrite(body, cur.card.text, function () { choices.style.visibility = 'visible'; });
      cur.card.choices.forEach(function (choice, idx) {
        var st = E.choiceStatus(state, choice);
        var b = el('button');
        b.appendChild(el('span', null, '> ' + choice.label));
        var req = st.enabled ? reqText(choice.effects) : st.reason;
        if (req) b.appendChild(el('span', 'req', req));
        b.disabled = !st.enabled;
        b.onclick = function () { E.choose(state, idx); render(); };
        choices.appendChild(b);
      });
      c.appendChild(choices);
    }
    return c;
  }

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

  function renderTitle() {
    var s = el('div', 'screen');
    s.appendChild(el('h1', null, 'DUTY GUVNOR'));
    s.appendChild(el('div', 'sub',
      'Friday night, November 1975. You are the Duty Inspector at Thorne Street nick, ' +
      'and for the next eight hours everything that goes wrong in this borough is yours.'));
    var rules = el('div', 'rules');
    rules.innerHTML =
      '<b>STREETS</b> is order out there. <b>BRASS</b> is your standing upstairs. ' +
      '<b>RELIEF</b> is your officers’ patience with you.<br>' +
      'Any of them hits zero, your night is over — and probably your career.<br><br>' +
      'You have <b>6 PCs</b> to send out, <b>6 cells</b> to fill, and a couple of ' +
      '<b>favours</b> owed to you around the manor. Spend them well. Survive until 06:00.';
    s.appendChild(rules);
    var b = el('button', null, 'BOOK ON DUTY');
    b.onclick = function () { state = E.createGame(DATA); render(); };
    s.appendChild(b);
    return s;
  }

  function renderEnding() {
    var end = state.ending;
    var s = el('div', 'screen' + (end.kind === 'disaster' ? ' disaster' : ''));
    s.appendChild(el('h1', null, end.title));
    s.appendChild(el('div', 'endtext', end.text));
    if (end.kind === 'debrief') {
      if (end.outcomes && end.outcomes.length) {
        var o = el('div', 'outcomes');
        o.appendChild(el('b', null, 'THE NIGHT’S SAGAS:'));
        end.outcomes.forEach(function (line) { o.appendChild(el('div', null, '• ' + line)); });
        s.appendChild(o);
      }
      s.appendChild(el('div', 'stats',
        'AVERAGE STANDING ' + end.avg + ' · BODIES IN THE BOOK ' + end.stats.arrests +
        ' · FAVOURS SPENT ' + end.stats.favoursSpent));
    }
    var b = el('button', null, 'WORK ANOTHER SHIFT');
    b.onclick = function () { state = E.createGame(DATA); render(); };
    s.appendChild(b);
    return s;
  }

  function render() {
    if (typer) { clearInterval(typer); typer = null; }
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
    var f = el('footer', null, 'DUTY GUVNOR · a night-shift management entertainment · all characters fictitious');
    app.appendChild(f);
  }

  render();
})();
