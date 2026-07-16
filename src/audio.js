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
      // the city underneath: a low rumble passing every minute or two
      var rumbleTimer = setInterval(function () {
        if (!enabled || !ctx || ctx.state !== 'running') return;
        if (Math.random() < 0.6) {
          tone(52, 'sine', 2.6, 0.02, 0, 36);
          noise(2.2, 0.012, 90, 0.2, 0.8);
        }
      }, 85000);
      // somewhere in the building, a door; occasionally, the urn
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
    // teleprinter key strike: 30ms square blip, randomised 1300-2200Hz (per the desk spec)
    tick: safe(function () { tone(1300 + Math.random() * 900, 'square', 0.03, 0.035, 0); }),
    // paper slap into the pigeonhole: a dead thunk, sine falling 150->48Hz
    thunk: safe(function () { tone(150, 'sine', 0.11, 0.35, 0, 48); }),
    // R/T static between lines: a short decaying noise burst
    hiss: safe(function () { noise(0.16, 0.08, 900, 0, 0.6); }),
    // muffled radio chatter: a voice on the net you can't quite make out
    chatter: safe(function () {
      var t0 = ctx.currentTime;
      var o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(135, t0);
      // a sentence's worth of wandering pitch
      var steps = 9;
      for (var i = 1; i <= steps; i++) {
        o.frequency.linearRampToValueAtTime(105 + Math.random() * 85, t0 + i * 0.18);
      }
      var f = ctx.createBiquadFilter();
      f.type = 'bandpass'; f.frequency.value = 700; f.Q.value = 2.2;
      var g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t0);
      // syllables: the gain stutters like speech
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
    // the two-tones coming across the manor: something big has kicked off
    neenaw: safe(function () {
      for (var i = 0; i < 8; i++) {
        var g = 0.06 + (i < 4 ? i : 8 - i) * 0.016; // swells close, then passes
        tone(i % 2 ? 466 : 622, 'triangle', 0.42, g, i * 0.45);
        tone(i % 2 ? 233 : 311, 'triangle', 0.42, g * 0.45, i * 0.45); // horn body
      }
    }),
    // keying the set: squelch crack, then carrier under the message
    squelch: safe(function () { noise(0.05, 0.14, 1800, 0, 2.5); tone(320, 'square', 0.03, 0.05, 0); }),
    carrier: safe(function (dur) { noise(Math.min(dur || 1, 6), 0.028, 1000, 0, 0.4); }),
    // the cell door: a body goes in the book
    clang: safe(function () {
      noise(0.06, 0.18, 2400, 0, 3);
      tone(181, 'square', 0.55, 0.1, 0.02, 178);
      tone(242, 'square', 0.4, 0.06, 0.02, 239);
      tone(90, 'sine', 0.7, 0.09, 0.03, 70);
    }),
    // the front-desk telephone: a proper GPO bell — a striker hammering two
    // brass gongs, ring-ring ... ring-ring
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
