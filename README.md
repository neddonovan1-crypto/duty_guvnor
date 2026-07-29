# DUTY GUVNOR

*Friday night, November 1975. You are the Duty Inspector at Thorne Street nick, and for the
next eight hours everything that goes wrong in this borough is yours.*

**Duty Guvnor** is a darkly comic, turn-based night-shift management game. Incidents arrive by
teleprinter, telephone and front desk — each tagged **A GRIEFY ONE** (matters, and brings drama
and paperwork) or **A WEARY ONE** (police shouldn't even be there) — and each one is a trade-off
between three things you can never satisfy at once:

| Meter | What it is | What drains it |
| --- | --- | --- |
| **STREETS** | Public order in the borough | Ignoring crime — and it decays on its own, faster after midnight |
| **BRASS** | Your standing with senior officers | Scandal, shortcuts, embarrassing the Yard |
| **RELIEF** | Your shift's morale and loyalty | Overworking them, selling them out |

If any meter hits zero, the shift ends in disaster. Survive until 06:00 for your debrief.

You manage a **parade of PCs** (dispatched officers stay busy for several turns), **4 cells**
(the van to court doesn't come until six, so every arrest holds its cell for the rest of the
night), and **favours** owed to you around the manor — the good outcomes usually cost
something. The title screen sets **tonight's parade**: as rostered (4 PCs, one favour),
**minimum strength** (3 PCs, no favours — the hard night), or **mutual aid** (5 PCs, two
favours — but a comfortable night is never stamped better than ACCEPTABLE). The skipper
posts **who** parades from a divisional strength of twenty named constables (never more
than two WPCs a night), and each name is chalked with a one-word **trait** that fires only
when that officer is on a crew you send: the steady tilt gambles, the fast come home early,
the kind spare the relief, the green get lost, and the old sweats are never where the
seizing happens. It is a roguelike
night: careless play dies more often than it survives, strong play still loses some nights,
and the COMMENDATION is rare enough to chase.

**Every shift is a run.** Each night features exactly one **marquee saga** — a multi-stage
plotline that escalates if you keep fobbing it off — drawn from a pool of **fourteen**: the
vanished Earl, the minister in the cells, the anarchist trattoria, the bomb-threat codeword,
the dirty-squad ledger, the stranded football special, the escaped safe-cracker, the lights
over the rec, the state visit, the runaway Duke in a Soho spieler, the pea-souper cat burglar,
the docks wildcat, the missing Mounted Branch horse, and the pools winner. A two-stage
**mini-saga**
runs alongside. The sagas **rotate**: no marquee returns until you have worked the whole
pool, incident cards dealt last night never reappear tonight, and no venue hosts two dramas
in one night — once the Pemberton has had its incident, the Pemberton has had its night.

**The night remembers.** Saga outcomes set cross-night flags — let DS Halloran walk out with
the ledger and he comes back a "friend"; do right by Mrs Meakin and Meakin Salvage turns up
when you need them; bring the Duke home well and his Royalty Protection sergeant is seconded
to your next parade — though the manor takes its price in bodies elsewhere that night, and no
Special Constable calls. Follow-up cards keyed to those flags surface on later shifts. Saga
outcomes also weight the debrief: no COMMENDATION was ever won on tidy meters alone.

**Some choices are gambles** — marked with their odds. A gamble is staged, never snapped: you
can **back it** before you roll — a spare PC riding along or a favour called in is +15 on the
odds apiece, the Dog Section standing by is +20, and nothing buys better than 95%. The dice
roll when you commit, the resources are spent either way, and a lost gamble books nobody.

**Every parade opens with a notice** — tonight's weather in the broad sense: fog that slows
every dispatch, the early van that clears the cells at four, an overtime ban, payday on the
docks. And once a night you can **ring Division** for the S.P.G. (streets up, relief sour),
the dogs (your next gamble runs +20), or night-duty C.I.D. (they take the job on the desk off
your hands — no cost, no credit). Division remembers who asks.

**The ending screens keep books.** Every letter — memorandum or dismissal — unfolds the
station's **occurrence book**: every decision, its cost, and how the gambles fell. The Yard's
correspondence is career-aware (a repeat commendation, or a man they have written to before,
is addressed accordingly), and the parade sheet keeps a **casebook** of every marquee saga and
the best you ever made of it.

Incidents respect the clock — closing-time trouble at closing time, prowlers in the small
hours, and a dedicated **dawn rush** in the last hour. The night deals **SIGNAL — ALL
STATIONS** chance events you can only acknowledge. Meters below 20 fester on their own; the
STREETS decay is shown live on its meter. Your **crew is named** — you'll know who went out
and when they're back — and your cells show exactly who's in them.

The title screen keeps your **service record** (nights, deaths by cause, streak, sagas
worked), and **TONIGHT'S SHIFT — THE DAILY** deals the same seeded night to everyone, with a
copyable result line at the debrief. The ending screen prints the full **shift report**.

Sound is synthesised in-browser with WebAudio — teleprinter clatter, telex bells, a distant
two-tone for the sagas, and an ambient bed of rain, mains hum and far-off sirens. **SND**
toggle and volume slider in the header.

All characters and places are fictitious.

## Play

**[dutyguvnor.com](https://dutyguvnor.com)** — or run `node build.js` and open the
`index.html` it writes, in any browser. No install, no dependencies, works offline.
(The built files are not in the repository: they are generated from `src/`.)

## Develop

The game is plain HTML/CSS/JS, no framework, no build dependencies:

```
src/engine.js   pure game logic (runs in browser and Node)
src/data.js     all content: incident cards, storylines, endings, flavour
src/ui.js       DOM rendering (CRT teleprinter aesthetic)
src/audio.js    synthesised WebAudio sound (no assets)
src/style.css   the amber phosphor look
build.js        emits index.html plus content-hashed data-*.js / app-*.js
                and style.css, into the repo root and into public/ (deployed)
desktop/        the Electron shell for the Steam build
test/           content validation, Monte Carlo balance simulation, and
                Playwright runs through the real UI
```

```sh
node test/validate.js   # content invariants (schema, deadlocks, storyline reachability)
node test/simulate.js   # plays 400 seeded shifts, checks the night is losable but fair
node build.js           # regenerate the shipped assets from src/
```

The rest of the chain needs Playwright and drives a real browser:

```sh
node test/week.js  test/achievements.js  test/suspend.js  test/store.js
node test/smoke.js        # five shifts at the desk
node test/mobsmoke.js     # the pocket book at 390x820
node test/weekui.js       # the campaign and the muster room
node test/desktopsave.js  # the save bridge, migration, recovery, feats
node test/sweep.js        # every card, event and saga stage rendered once
```

## Adding content

Add cards to `src/data.js`. Each card is:

```js
{
  id: 'grime_example',
  title: 'DISTURBANCE — DUKE OF CLARENCE PH',
  tone: 'weary', // or 'grief' — shown on the incident's telex header
  text: 'Forty dockers and a darts final...',
  choices: [
    { label: 'Send the van round',
      result: 'Order restored, glasses lost.',
      effects: { streets: 6, relief: -3, dispatchUnits: 2, dispatchTurns: 2, arrests: 1 } },
    // every card needs at least one choice that costs no resources
    { label: 'Let it burn itself out',
      result: 'It does, eventually.',
      effects: { streets: -6 } },
  ],
}
```

Effect keys: `streets`/`brass`/`relief` (deltas, ±15 max), `favours` (±1), `arrests` (0–3),
`dispatchUnits` (1–3) with `dispatchTurns` (1–4). Cards may carry a `window: [firstTurn,
lastTurn]` restricting what hour of the night they can appear (turn 1 = 22:00, half-hour
turns). Chance events live in `DATA.events`: exactly one acknowledgement choice, a required
`window`, and event-only effects `bonusUnits` (the Special) or `seizeCount`/`seizeTurns`
(officers taken off the books). Run `node test/validate.js` after editing — it catches
deadlocks, dangling saga branches, bad windows and out-of-range effects.
