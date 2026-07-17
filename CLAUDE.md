# Duty Guvnor — ways of working

This file belongs to the guvnor (the human). Agents follow it; only the
human edits it.

## What this is

A darkly comic, turn-based 1975 Metropolitan Police Night Duty roguelike.
One HTML page, no framework, no backend. Pushes to the default branch
deploy to dutyguvnor.com via Cloudflare (`public/` is what's served).

## Layout

- `src/engine.js` — pure game logic (UMD, no DOM). `src/data.js` — all
  story content (UMD JSON). `src/ui.js` — DOM. `src/audio.js` — WebAudio
  synth (no sound assets). `src/style.css`.
- `node build.js` emits `index.html` (small shell) plus content-hashed
  `data-*.js` / `app-*.js` and `style.css` into the repo root (for file://
  test harnesses) and `public/` (deployed). The build strips comments from
  shipped assets; source keeps them.

## The verify chain — run all of it before every push

1. `node test/validate.js` — content validator. New content must pass its
   shape rules (choices 2–4 with a zero-resource option, risk odds 25–80,
   notice mods in range, venue groups ≥2, prose officer-name guard, pool
   floors: 15 mini-sagas, 20 notices).
2. `node test/simulate.js` — 400-shift balance sim. Guardrails: random
   survival 25–70% (aim 28–32%), greedy 85–99.5%. It also asserts saga /
   mini / notice rotation and venue exclusivity; a throw is a failure.
3. `node build.js`
4. `NODE_PATH=/opt/node22/lib/node_modules node test/smoke.js` — desktop
   Playwright smoke (5 shifts through the real UI).
5. `NODE_PATH=/opt/node22/lib/node_modules node test/mobsmoke.js` — mobile
   smoke (3 shifts, overflow checks).

Anything user-visible also gets a screenshot check (doctored preview if
the state is hard to reach organically). Bugs that only show with
animations on must be tested with animations on — reduced motion collapses
the transition windows.

## Content rules

- The roster is randomised nightly. Prose may only name the four canonical
  casting parts — PC Doyle, PC Whittle, PC Duffin, WPC Hartle — which
  `localiseText` recasts to whoever paraded. Station fixtures (Bream,
  Corcoran, Gosling, Latch, Purbright, Hartree, Warlow, Dodds, Naismith,
  Pring, Palgrave, Halloran…) stay themselves, and their cards must explain
  why they're not on tonight's board. The validator enforces this.
- A choice label that names an officer binds the dispatch to that officer —
  keep label and result naming the same person.
- Venue-tagged pieces (`pemberton`, `washerama`, `alhambra`, `greek_court`,
  `paddock_lane`) never stage twice in one night; a venue group needs at
  least two members.
- Marquees, minis and notices rotate: nothing repeats until its whole pool
  has been seen. Cross-night memory lives in localStorage (`dg_hist`,
  `dg_career`).
- Voice: period-correct, darkly comic, legible. Slang that stops a reader
  cold gets rewritten. Quiet turns must read as downtime, not incidents.

## Conventions

- Commit messages are descriptive and in the game's voice. Model
  identifiers never appear in commits, code, or shipped assets.
- Comments in `src/` explain constraints and decisions — never narrate
  requirements or prompts. The build strips all comments from shipped
  files regardless.
- No PRs on this repo: work lands on the default branch and deploys.
- Backlog lives in GitHub issues: `bug` / `enhancement` labels. When an
  issue is picked up, write the technical plan into the issue first.
- Planning and code-review skills: when skill files are added under
  `.claude/skills/`, use them — after tests pass, run the code-review
  skill and fix high/medium findings before hand-off; convert low findings
  to issues.
