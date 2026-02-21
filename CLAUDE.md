# Junior Jarvis — Project-Specific Claude Code Instructions

## Project
Kid-friendly, voice-driven Akinator-style AI guessing game for expo booth.
Pure client-side HTML5/CSS/JS with PWA support. No build tools, no bundler.

## AI-First Design Principle
This project is designed AI-first. The static decision tree engine is the offline fallback.
The architecture supports swapping in an LLM backend (Claude API) for dynamic conversation,
adaptive questioning, and natural language understanding. The `JJ.aiConfig` object in `data.js`
is the configuration point for AI provider integration.

## Stack
- HTML5 + CSS3 + Vanilla JavaScript (ES5 compatible, no transpiler needed)
- Web Speech API (TTS + STT)
- Service Worker for offline PWA
- No external dependencies — fully self-contained

## Architecture
- `js/data.js` — Character data, questions, messages, AI config
- `js/engine.js` — Scoring-based elimination engine (static fallback)
- `js/speech.js` — Web Speech API wrapper with graceful degradation
- `js/ui.js` — DOM manipulation, screen management
- `js/metrics.js` — LocalStorage engagement analytics
- `js/app.js` — Main controller, game flow orchestration

## Conventions
- Global namespace: `JJ` (window.JJ)
- No build step — scripts load via `<script>` tags in order
- Files reference each other through the shared `JJ` namespace
- All DOM manipulation through `JJ.ui` — no direct DOM access elsewhere
- Speech through `JJ.speech` — handles unavailable APIs gracefully

## Key Decisions
- Character properties derived from design doc table (not the sample HTML which had errors)
- CSS emoji-based character cards instead of external stock photos (works offline, no copyright)
- Scoring-based engine (not hard elimination) to handle "probably" and "uncertain" answers
- `tech` property correctly assigned per design doc (not all-true like the sample)

## Testing
Open `index.html` in Chrome or Edge. Works from file:// protocol (no server needed for basic testing).
For PWA/Service Worker testing, serve via local HTTP server (`python -m http.server` or equivalent).
