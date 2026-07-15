/* Duty Guvnor — sound. Everything is synthesised with WebAudio (no assets),
 * pitched at "heard from the duty office": quiet, distant, period.
 * Every entry point is defensive — audio failure must never break the game. */
(function (root) {
  'use strict';

  var ctx = null, master = null, noiseBuf = null;
  var enabled = true;
  try { enabled = (root.localStorage && root.localStorage.getItem('dg_sound')) !== 'off'; } catch (e) { /* private mode */ }

  function ensure() {
    if (!enabled) return null;
    try {
      if (!ctx) {
        var AC = root.AudioContext || root.webkitAudioContext;
        if (!AC) { enabled = false; return null; }
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.16;
        master.connect(ctx.destination);
        var len = Math.floor(ctx.sampleRate * 0.1);
        noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
        var d = noiseBuf.getChannelData(0);
        for (var i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      }
      if (ctx.state === 'suspended') ctx.resume();
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

  function noise(dur, gain, freq, when) {
    var t0 = ctx.currentTime + (when || 0);
    var s = ctx.createBufferSource();
    s.buffer = noiseBuf; s.loop = true;
    var f = ctx.createBiquadFilter();
    f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = 1.2;
    var g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(gain, t0 + 0.005);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    s.connect(f); f.connect(g); g.connect(master);
    s.start(t0); s.stop(t0 + dur + 0.05);
  }

  function safe(fn) {
    return function () {
      if (!enabled || !ensure()) return;
      try { fn.apply(null, arguments); } catch (e) { /* never break the game */ }
    };
  }

  root.Sound = {
    get on() { return enabled; },
    toggle: function () {
      enabled = !enabled;
      try { root.localStorage && root.localStorage.setItem('dg_sound', enabled ? 'on' : 'off'); } catch (e) { /* ignore */ }
      if (enabled) ensure();
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
    // disaster: everything descends
    disaster: safe(function () {
      tone(392, 'sawtooth', 1.2, 0.09, 0, 65);
      noise(1.1, 0.05, 140, 0.1);
    }),
    // shift survived: a small tired resolution, warmer the better you did
    debrief: safe(function (avg) {
      var notes = avg >= 65 ? [392, 494, 587, 784] : avg >= 50 ? [392, 494, 587] : [392, 370];
      for (var i = 0; i < notes.length; i++) tone(notes[i], 'triangle', 0.5, 0.06, i * 0.22);
    }),
    warm: function () { ensure(); },
  };
})(typeof self !== 'undefined' ? self : this);
