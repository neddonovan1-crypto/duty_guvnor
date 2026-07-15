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

You manage **6 PCs** (dispatched officers stay busy for several turns), **6 cells** (each
arrest occupies one until the morning van), and **favours** owed to you around the manor —
you start with exactly one, and the good outcomes usually cost something.

Three scripted sagas escalate across the night if you don't get on top of them: a junior
minister the early relief banged up after an incident in a public convenience; an Italian
anarchist collective that has liberated the Trattoria Bella Ferrovia (the diners refuse to be
rescued; the food has improved); and, in the small hours, the night's griefiest grief — a
muffled voice, a codeword, and the Alhambra Bingo Hall mid-Snowball.

Sound is synthesised in-browser with WebAudio (teleprinter clatter, telex bells, a distant
two-tone for the sagas) — toggle it with the **SND** switch in the header.

All characters and places are fictitious.

## Play

Open **`index.html`** in any browser. No install, no dependencies, works offline.

## Develop

The game is plain HTML/CSS/JS, no framework, no build dependencies:

```
src/engine.js   pure game logic (runs in browser and Node)
src/data.js     all content: incident cards, storylines, endings, flavour
src/ui.js       DOM rendering (CRT teleprinter aesthetic)
src/audio.js    synthesised WebAudio sound (no assets)
src/style.css   the amber phosphor look
build.js        inlines everything into the single-file index.html
test/           content validation + Monte Carlo balance simulation
```

```sh
node test/validate.js   # content invariants (schema, deadlocks, storyline reachability)
node test/simulate.js   # plays 800 seeded shifts, checks the night is losable but fair
node build.js           # regenerate index.html from src/
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
`dispatchUnits` (1–3) with `dispatchTurns` (1–4). Run `node test/validate.js` after editing —
it catches deadlocks, dangling storyline branches and out-of-range effects.
