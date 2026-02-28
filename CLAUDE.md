# Junior Jarvis — Project-Specific Claude Code Instructions

**Global template version:** v3.0
**Based on:** `application-templates/claude/CLAUDE.md`

---

## Project Type
**Type:** Static PWA — GitHub Pages
No Supabase. No auth. No seed accounts. HTML5 + Vanilla JS (ES5), GitHub Pages hosted.

## Project Identity

```
What:    Kid-friendly, voice-driven Akinator-style AI guessing game for expo booth.
         8 AI job personas — player thinks of one, Jarvis asks yes/no questions to guess it.
Mode:    HTML5 PWA (pure client-side — no build tools, no bundler)
Repo:    https://github.com/NexusBlueDev/nexusblue-junior-jarvis
Live:    https://nexusbluedev.github.io/nexusblue-junior-jarvis/
Stack:   HTML5 + CSS3 + Vanilla JS (ES5), Web Speech API (TTS + STT), Service Worker
```

---

## Workflow Rules

- **Always commit and push before any task is complete.** No exceptions.
- When bumping versions: update `?v=N` on ALL `<script>`/`<link>` tags in `index.html` AND bump `CACHE_NAME` in `sw.js` together.

---

## Architecture

**Key files:**
- `js/data.js` — Character data, questions, messages, AI config
- `js/engine.js` — Scoring-based elimination engine (static fallback)
- `js/speech.js` — Web Speech API wrapper with graceful degradation
- `js/ui.js` — DOM manipulation, screen management
- `js/metrics.js` — LocalStorage engagement analytics (key: `jj_metrics`)
- `js/app.js` — Main controller, game flow orchestration

**Conventions:**
- Global namespace: `JJ` (window.JJ) — all modules attach to this
- ES5 only — no arrow functions, no `let`/`const`, no template literals, no modules
- No build step — scripts load via `<script>` tags in order in `index.html`
- All DOM manipulation through `JJ.ui` — never direct DOM access in `app.js`
- Speech through `JJ.speech` — handles unavailable APIs gracefully

**Game flow:** Welcome → "I'm thinking of one!" → Questions (yes/no/maybe) → Guess Screen → Player confirms YES/NO → Result → Play Again

**Character data structure:**
```javascript
{ id, name, emoji, fact, gradient[], props{} }
```

**Property matrix:** `tech`, `creative`, `physical`, `social`, `analytical`, `builds`, `leads`, `explores`

---

## Stack Specifics

```
Language:       HTML5 + CSS3 + Vanilla JS (ES5)
Hosting:        GitHub Pages (auto-deploy on push to main)
Service Worker: junior-jarvis-vN (bump together with script tags)
Storage key:    jj_metrics
Current version: v3
```

---

## AI-First Design Note

Static decision tree engine is the offline fallback.
`JJ.aiConfig` in `data.js` is the configuration point for future Claude API integration.
Character properties were derived from the design doc table — not the sample HTML (which had errors).
