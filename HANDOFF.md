# HANDOFF — Junior Jarvis

## Last Updated
2026-02-21 — Initial build complete. Full game functional, ready for testing.

## Project State
Junior Jarvis v1.0 is built and functional. The game runs as a pure client-side web app with voice input/output, scoring-based character guessing, and PWA offline support. Ready for QA testing and branding review.

## Completed
- Project scaffolding and architecture design
- Game engine with scoring-based elimination (8 characters, 8 questions)
- Web Speech API integration (TTS British voice + STT voice recognition)
- Four-screen UI flow: Welcome → Questions → Guess → Result
- CSS Jarvis theme (navy/blue gradient, cyan accents, glowing orb)
- Responsive layout for tablets and phones
- PWA manifest + Service Worker for offline capability
- SVG app icons
- LocalStorage engagement metrics
- Full documentation (README, SETUP, ARCHITECTURE, HANDOFF)
- Property data corrected from design doc (sample HTML had bugs)
- AI-first architecture with `JJ.aiConfig` for future LLM integration

## In Progress
- Nothing currently in progress

## Next Up
1. **QA Testing** — Play through all 8 characters, verify correct guesses
2. **Branding** — Insert NexusBlue company name/logo into win message and branding
3. **Voice tuning** — Test TTS voice across Chrome, Edge, tablet browsers
4. **Kiosk testing** — Test on actual expo tablet hardware in Chrome kiosk mode
5. **AI integration** — Connect `JJ.aiConfig` to Claude API for dynamic conversation mode
6. **QR code** — Add QR code to win screen linking to NexusBlue course page
7. **Sound effects** — Optional beep/whoosh via Web Audio API (design doc open item)
8. **More characters** — Expand beyond 8 for replayability (design doc open item)

## Active Stack
- HTML5 + CSS3 + Vanilla JavaScript (ES5 compatible)
- Web Speech API (browser-native)
- Service Worker (offline PWA)
- LocalStorage (metrics)
- GitHub (version control)

## Known Issues / Tech Debt
- SVG icons work for most PWA installs but some Android versions prefer PNG — may need to generate PNGs
- Chrome has a known bug where TTS pauses after ~15s on long text — workaround implemented in speech.js
- Voice recognition accuracy varies by device/environment — touch buttons are the reliable fallback
- No automated tests yet (manual QA is sufficient for expo prototype)

## How to Resume
> Project: Junior Jarvis — AI Future Guesser
> State: v1.0 complete, ready for QA and branding
> Next action: Test all 8 character paths, then insert NexusBlue branding
> Start by reading: ARCHITECTURE.md for system overview, then CLAUDE.md for project conventions
