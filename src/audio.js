/* Duty Guvnor — sound. Everything is synthesised with WebAudio (no assets),
 * pitched at "heard from the duty office": quiet, distant, period. Under the
 * one-shot stings sits an ambient bed — rain on the window, the 50Hz mains
 * hum of an old building, and a distant siren every few minutes.
 * Every entry point is defensive — audio failure must never break the game. */
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
      if (ctx.state === 'suspended') ctx.resume();
      startAmbient();
      return ctx;
    } catch (e) { enabled = false; return null; }
  }

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

  // ---------- the ambient bed ----------
  function startAmbient() {
    if (ambient || !ctx) return;
    try {
      var nodes = [];
      // rain on the window: soft looping noise through a low bandpass, gently wavering
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
      // the building: 50Hz mains hum, barely there
      var hum = ctx.createOscillator(); hum.type = 'sine'; hum.frequency.value = 50;
      var hg = ctx.createGain(); hg.gain.value = 0.012;
      hum.connect(hg); hg.connect(master);
      hum.start();
      nodes.push(hum);
      // a distant siren, somewhere that isn't your problem, every few minutes
      var sirenTimer = setInterval(function () {
        if (!enabled || !ctx || ctx.state !== 'running') return;
        if (Math.random() < 0.45) {
          for (var i = 0; i < 6; i++) tone(i % 2 ? 620 : 460, 'sine', 0.5, 0.006, i * 0.5);
        }
      }, 50000);
      ambient = { nodes: nodes, sirenTimer: sirenTimer };
    } catch (e) { /* the rain can fail silently */ }
  }

  function stopAmbient() {
    if (!ambient) return;
    try {
      ambient.nodes.forEach(function (n) { try { n.stop(); } catch (e) { /* already stopped */ } });
      clearInterval(ambient.sirenTimer);
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
    // teleprinter key strike, during the typewriter effect
    tick: safe(function () { noise(0.02, 0.05, 3800 + Math.random() * 800); }),
    // new incident on the wire: telex bell — grief gets a darker double ring
    bell: safe(function (grief) {
      tone(1318, 'sine', 0.35, 0.12, 0);
      if (grief) { tone(659, 'sine', 0.5, 0.09, 0.12); noise(0.3, 0.02, 220, 0.1); }
    }),
    // an ongoing saga returns: distant two-tone, lowpassed by three streets of fog
    saga: safe(function () {
      for (var i = 0; i < 4; i++) tone(i % 2 ? 592 : 790, 'square', 0.22, 0.028, i * 0.24);
    }),
    // an all-stations signal: the night doing something to you — flat, low, twice
    signal: safe(function () {
      tone(196, 'square', 0.18, 0.06, 0);
      tone(196, 'square', 0.28, 0.06, 0.28);
      noise(0.5, 0.02, 300, 0);
    }),
    // choosing: a switchboard key
    click: safe(function () { noise(0.03, 0.06, 1500); tone(180, 'square', 0.04, 0.05, 0); }),
    // carry on: the nick settles
    carry: safe(function () { tone(120, 'sine', 0.09, 0.05, 0); }),
    // quiet half hour: the urn
    quiet: safe(function () { tone(523, 'sine', 0.5, 0.04, 0); tone(659, 'sine', 0.6, 0.03, 0.18); }),
    // disaster: each meter dies its own death
    disaster: safe(function (meter) {
      if (meter === 'brass') {
        // three formal knocks and a long cold tone: the discipline board convenes
        for (var i = 0; i < 3; i++) { noise(0.06, 0.1, 180, i * 0.45, 4); tone(90, 'sine', 0.12, 0.07, i * 0.45); }
        tone(220, 'sine', 1.4, 0.05, 1.5, 196);
      } else if (meter === 'relief') {
        // one door slam, then the nick empties: a fading heartbeat of footsteps
        noise(0.18, 0.14, 240, 0, 2);
        for (var j = 0; j < 5; j++) noise(0.05, 0.05 - j * 0.008, 400, 0.5 + j * 0.4, 3);
        tone(147, 'sine', 1.6, 0.05, 2.4, 131);
      } else {
        // the streets: everything descends into crowd-roar
        tone(392, 'sawtooth', 1.2, 0.09, 0, 65);
        noise(1.6, 0.06, 140, 0.1);
        noise(1.2, 0.03, 700, 0.4, 0.7);
      }
    }),
    // shift survived: a small tired resolution, warmer the better you did
    debrief: safe(function (avg) {
      var notes = avg >= 58 ? [392, 494, 587, 784] : avg >= 45 ? [392, 494, 587] : [392, 370];
      for (var i = 0; i < notes.length; i++) tone(notes[i], 'triangle', 0.5, 0.06, i * 0.22);
    }),
    warm: function () { ensure(); },
  };
})(typeof self !== 'undefined' ? self : this);
