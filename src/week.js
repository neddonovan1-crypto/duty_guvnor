/* A WEEK FROM HELL (issue #4) — seven consecutive night tours, Friday 14
 * to Thursday 20 November 1975, worked as one posting. Pure logic, no DOM:
 * the UI (src/ui.js) keeps the envelope in the store under dg_week and
 * calls in here; the Node harnesses (test/week.js, test/simulate.js)
 * exercise it directly.
 *
 * The engine knows nothing about weeks. Each night is an ordinary shift —
 * the envelope carries the consequences between them exactly the way the
 * single-night game carries them between careers (dg_hist), but on its own
 * book: a week leaves no tracks on the single-night rotation, and vice
 * versa. Meters reset at every parade; flags, favours, echoes and the
 * deal/saga/notice rotations do not. Death ends the week where it stands.
 * Nights six and seven lean on the small hours a point harder
 * (opts.driftExtra -> engine streetsDriftNow). */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.DGWeek = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var NIGHTS = 7;
  // night N parades on DAYS[N-1]; the calendar in ui.js supplies the dates
  // (nightOff = night - 1 lands squarely on Fri 14 .. Thu 20 Nov 1975)
  var DAYS = ['FRIDAY', 'SATURDAY', 'SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY'];

  function fresh(prev) {
    var env = {
      v: 1,
      night: 1,        // the next night to parade, 1-based
      done: false,
      diedNight: 0,    // 0 while the guvnor lives; else the night the week ended
      // continuity between the week's nights — the same tracks dg_hist
      // keeps for the single-night career, sequestered here
      seen: [], recent: 0,
      flags: [], favours: 0,
      lastMarquee: null, seenMarquees: [],
      lastMini: null, seenMinis: [],
      lastNotice: null, seenNotices: [],
      lastMarqueeGrade: null,
      results: [],     // one row per night worked, in order
    };
    // BEGIN ANOTHER WEEK hands the rotations on: the new week opens clean
    // of consequences — no flags, no favours, no echo — but remembers which
    // stories, minis and notices the last one worked. With fourteen sagas
    // in the pool, two weeks back to back repeat nothing.
    if (prev) {
      env.seen = (prev.seen || []).slice();
      env.recent = prev.recent > 0 ? prev.recent : 0;
      env.lastMarquee = prev.lastMarquee || null;
      env.seenMarquees = (prev.seenMarquees || []).slice();
      env.lastMini = prev.lastMini || null;
      env.seenMinis = (prev.seenMinis || []).slice();
      env.lastNotice = prev.lastNotice || null;
      env.seenNotices = (prev.seenNotices || []).slice();
    }
    return env;
  }

  // mirrors rotateSeen in ui.js: nothing repeats until its pool is spent —
  // and a 7-night week never spends a pool, so the week reads all-fresh
  function rotateSeen(list, id, poolSize) {
    if (list.indexOf(id) < 0) list = list.concat([id]);
    return list.length >= poolSize ? [id] : list;
  }

  // createGame opts for the coming night. STANDARD strength throughout:
  // the week's difficulty arc is consequence and fatigue, not headcount.
  function nightOpts(env) {
    return {
      mode: 'standard',
      seen: env.seen, recent: env.recent,
      flags: env.flags, favours: env.favours,
      lastMarquee: env.lastMarquee, seenMarquees: env.seenMarquees,
      lastMini: env.lastMini, seenMinis: env.seenMinis,
      lastNotice: env.lastNotice, seenNotices: env.seenNotices,
      lastMarqueeGrade: env.lastMarqueeGrade,
      driftExtra: env.night >= 6 ? 1 : 0,
    };
  }

  // Book a finished night onto the envelope: the result row for the
  // review letter, the continuity for the next parade, and the advance
  // (or the end, if the night ended the guvnor).
  function recordNight(env, state, data) {
    var e = state.ending || {};
    var mq = state.stories && state.stories[state.marquee];
    // an EXEMPLARY night is one that took the top debrief tier — the same
    // stamp the memo carries, read off the data so a retitle can't lie
    var tiers = (data.debriefs || []).slice().sort(function (a, b) { return b.minAvg - a.minAvg; });
    env.results.push({
      night: env.night,
      day: DAYS[env.night - 1],
      kind: e.kind || 'disaster',
      title: e.title || '',
      meter: e.meter || null,
      avg: e.kind === 'debrief' ? e.avg : 0,
      exemplary: e.kind === 'debrief' && tiers.length > 0 && e.title === tiers[0].title,
      arrests: state.arrestsTotal || 0,
      sagaTitle: (e.saga && e.saga.title) ||
        (state.activeSagas && state.activeSagas[0] && state.activeSagas[0].title) || '',
      sagaGrade: (e.saga && e.saga.grade) || (mq && mq.resolved ? mq.grade : 'unresolved'),
    });

    env.seen = state.drawn.concat(env.seen).slice(0, 72);
    env.recent = state.drawn.length;
    env.lastMarquee = state.marquee;
    env.seenMarquees = rotateSeen(env.seenMarquees, state.marquee, data.storylines.length);
    if (state.mini) {
      env.lastMini = state.mini;
      env.seenMinis = rotateSeen(env.seenMinis, state.mini, data.minisagas.length);
    }
    if (state.notice) {
      env.lastNotice = state.notice.id;
      env.seenNotices = rotateSeen(env.seenNotices, state.notice.id, data.notices.length);
    }
    env.favours = Math.min(2, state.favours > 0 ? state.favours : 0);
    env.lastMarqueeGrade = mq && mq.started ? (mq.resolved ? mq.grade : 'unresolved') : null;
    env.flags = (state.flagsSet || []).slice();

    if (e.kind !== 'debrief') {
      env.done = true;
      env.diedNight = env.night;
    } else if (env.night >= NIGHTS) {
      env.done = true;
    } else {
      env.night += 1;
    }
    return env;
  }

  var ORDINALS = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh'];
  var WORDS = ['no', 'one', 'two', 'three', 'four', 'five', 'six', 'seven'];

  // The one letter at the end of the week from hell. Three doors out:
  // three EXEMPLARY nights go upstairs for good, anything less survived is
  // retained in post, and a career ended anywhere is dismissed the Force.
  function verdict(env) {
    if (env.diedNight) {
      return {
        tier: 'dismissed',
        title: 'DISMISSED THE FORCE',
        mean: 0,
        exemplary: 0,
        line: 'The week ended on the ' + ORDINALS[env.diedNight - 1] + ' night, and so, in every ' +
          'sense the Regulations recognise, did your command of it. The Commissioner directs that ' +
          'the remaining tours be worked by somebody else.',
      };
    }
    var sum = 0, ex = 0;
    for (var i = 0; i < env.results.length; i++) {
      sum += env.results[i].avg || 0;
      if (env.results[i].exemplary) ex++;
    }
    var mean = env.results.length ? Math.round(sum / env.results.length) : 0;
    if (ex >= 3) {
      return {
        tier: 'promoted', title: 'PROMOTED TO CHIEF INSPECTOR', mean: mean, exemplary: ex,
        line: 'Of the seven nights laid before the Commissioner, ' + (WORDS[ex] || ex) +
          ' carry the Assistant Commissioner’s EXEMPLARY, and the Commissioner has stopped ' +
          'reading the overnights to ask who is doing this. You are promoted Chief Inspector ' +
          'and posted to his Private Office at New Scotland Yard, with effect from Monday the ' +
          '24th. The Private Office keeps day hours, sees every borough’s grief at one remove, ' +
          'and has a window. Hand your torch to whoever draws the short straw.',
      };
    }
    return {
      tier: 'retained', title: 'RETAINED IN POST', mean: mean, exemplary: ex,
      line: 'The week is read, initialled and filed without further remark: seven nights ' +
        'survived, ' + (ex > 0 ? (WORDS[ex] || ex) + ' of them lingered over, the rest' : 'none of them lingered over, all') +
        ' merely endured. You are retained in post. The weekend is your own; day shift parades ' +
        'at six o’clock on Monday the 24th, and the manor will still be there when you walk in. ' +
        'It always is.',
    };
  }

  return {
    NIGHTS: NIGHTS,
    DAYS: DAYS,
    fresh: fresh,
    nightOpts: nightOpts,
    recordNight: recordNight,
    verdict: verdict,
  };
});
