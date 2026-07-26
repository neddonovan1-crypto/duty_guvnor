/* Achievement definitions and detection. Pure logic, no DOM: the UI
 * (src/ui.js) evaluates these against live shift + career state and fires the
 * unlock through the desktop bridge (window.dgAchieve -> Steam); the Node
 * harness (test/achievements.js) exercises the predicates directly.
 *
 * Each predicate reads a context object and must tolerate a null state (the
 * title screen and the between-shift results carry no live shift):
 *   { state, career, ledgerLen, storylineIds }
 * state       the live game (or null), for mid-shift feats
 * career      the persisted dg_career record, for cross-shift feats
 * ledgerLen   entries in tonight's occurrence book
 * storylineIds  every marquee saga id, for the completionist check
 *
 * Ids are the strings entered in the Steamworks achievement config. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.DGAch = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  function survived(c) {
    return !!(c.state && c.state.over && c.state.ending && c.state.ending.kind === 'debrief');
  }

  var LIST = [
    { id: 'ACH_FIRST_WATCH', name: 'First Watch',
      desc: 'Survive your first night to 06:00.',
      test: function (c) { return (c.career.survived || 0) >= 1; } },
    { id: 'ACH_OLD_SWEAT', name: 'Old Sweat',
      desc: 'Survive five nights in a row.',
      test: function (c) { return (c.career.bestStreak || 0) >= 5; } },
    { id: 'ACH_COMMENDED', name: 'Commended',
      desc: 'Earn an EXEMPLARY from the Assistant Commissioner.',
      test: function (c) { return (c.career.commendations || 0) >= 1; } },
    { id: 'ACH_SHORT_HANDED', name: 'Short-Handed',
      desc: 'Survive a night at MINIMUM STRENGTH.',
      test: function (c) { return survived(c) && c.state.mode === 'short'; } },
    { id: 'ACH_QUIET_NIGHT', name: 'A Quiet Night',
      desc: 'Book off at six with an empty occurrence book.',
      test: function (c) { return survived(c) && c.ledgerLen === 0; } },
    { id: 'ACH_BACKED_HILT', name: 'Backed to the Hilt',
      desc: 'Win a gamble backed to 85% odds or better.',
      test: function (c) { return !!(c.state && c.state.lastGamble === 'won' && (c.state.lastOdds || 0) >= 85); } },
    { id: 'ACH_URGENT_ASSISTANCE', name: 'Urgent Assistance',
      desc: 'Sound the whistle for urgent assistance.',
      test: function (c) { return !!(c.state && c.state.assistUsed); } },
    { id: 'ACH_EVERY_FAVOUR', name: 'Calling in Every Favour',
      desc: 'Ring the S.P.G., the dogs and C.I.D. in one night.',
      test: function (c) { var u = (c.state && c.state.callsUsed) || {}; return !!(u.spg && u.dogs && u.cid); } },
    { id: 'ACH_ALL_SORROWS', name: 'The Full Set of Sorrows',
      desc: 'Lose the streets, your standing and the relief — one disaster of each, across your career.',
      test: function (c) { var d = c.career.deaths || {}; return (d.streets || 0) > 0 && (d.brass || 0) > 0 && (d.relief || 0) > 0; } },
    { id: 'ACH_CASE_CLOSED', name: 'Case Closed',
      desc: 'Work a marquee saga to a good result.',
      test: function (c) { var g = c.career.sagaGrades || {}; for (var k in g) { if (g[k] === 'good') return true; } return false; } },
    { id: 'ACH_WHOLE_CASEBOOK', name: 'The Whole Casebook',
      desc: 'Work every marquee saga to a good result.',
      test: function (c) {
        var g = c.career.sagaGrades || {}, ids = c.storylineIds || [];
        if (!ids.length) return false;
        for (var i = 0; i < ids.length; i++) { if (g[ids[i]] !== 'good') return false; }
        return true;
      } },
    { id: 'ACH_DISMISSED', name: 'Dismissed the Force',
      desc: 'Receive a Notice of Dismissal from the Commissioner.',
      test: function (c) { return !!(c.career.deaths && (c.career.deaths.dismissed || 0) >= 1); } },
  ];

  // Ids newly satisfied by ctx and not already recorded in have.
  function evaluate(ctx, have) {
    have = have || {};
    var out = [];
    for (var i = 0; i < LIST.length; i++) {
      var a = LIST[i];
      if (have[a.id]) continue;
      var pass = false;
      try { pass = !!a.test(ctx); } catch (e) { pass = false; }
      if (pass) out.push(a.id);
    }
    return out;
  }

  return { LIST: LIST, evaluate: evaluate };
});
