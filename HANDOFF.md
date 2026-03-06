# HANDOFF — Junior Jarvis

## Last Updated
2026-03-06 — Visual overhaul: Cyberpunk Arcade theme with mono amber palette and vertical button layout.

## Project State
Junior Jarvis v3 is built with a completely new visual identity — Cyberpunk Arcade theme. Deep indigo base, single amber accent color, angular clip-path UI elements, hex gallery tiles, CRT scanlines, glitch text, vertical stacked answer buttons. Ready for QA testing on expo hardware.

## Environment Status
> **Branch:** main
> **Production:** https://nexusbluedev.github.io/nexusblue-junior-jarvis/ — READY
> **Human Action Required:** Hard refresh (Ctrl+Shift+R) needed to bust service worker cache and see new design

## Completed

### 2026-03-06 — Visual Overhaul (3 commits)
1. **Neon color palette** — Replaced original blue/orange brand colors with neon magenta/green/cyan
2. **Cyberpunk Arcade theme** — Complete CSS rewrite: deep indigo base (#0b0620), angular clip-path buttons and cards, hex-grid gallery tiles, CRT scanline overlay, glitch title animation with data-text shadow, holographic progress bar with shine sweep, all typography uppercased with letter-spacing
3. **Mono amber + vertical buttons** — Stripped all multi-color (pink, blue, purple) to single amber (#ffb432) accent. All answer buttons identical ghost style, stacked vertically in scrollable column. Start button is solid amber. Particles and confetti amber-only.

### 2026-02-22 — Claude Governance
- **CLAUDE.md converted to project-specific v3.0 format** — Removed embedded global copilot prompt; project-specific rules only
- **Global Claude standards centralized** — `~/.claude/CLAUDE.md` (v3.0 master) applies to all NexusBlue projects automatically
- **Master template stored** at `NexusBlueDev/nexusblue-application-templates/claude/CLAUDE.md` (source of truth)
- **HANDOFF.md is now the governing document** — Claude reads this first each session to understand project state

### v1-v3 (Product)
- Project scaffolding and architecture design
- Game engine with scoring-based elimination (8 characters, 12 questions)
- Web Speech API integration (TTS friendly British male voice + STT push-to-talk)
- Four-screen UI flow: Welcome -> Questions -> Guess -> Result
- **v2:** Interactive orb avatar with 5 animated states (idle, speaking, listening, thinking, celebrating)
- **v2:** Floating background particles
- **v2:** Kid-friendly messaging and "How to Play" guide
- **v3:** Push-to-talk mic button (replaced broken auto-listen)
- **v3:** Web Audio API sound effects (tap, correct, wrong, reveal, mic-on)
- **v3:** Floating emoji reactions on answers
- **v3:** Character gallery on welcome screen (hex grid previews)
- **v3:** Segmented progress bar + question counter
- **v3:** Confetti celebration on correct guess
- Responsive layout for tablets and phones
- PWA manifest + Service Worker for offline capability
- SVG app icons
- LocalStorage engagement metrics
- Full documentation (README, SETUP, ARCHITECTURE, HANDOFF)
- AI-first architecture with `JJ.aiConfig` for future LLM integration

## In Progress
- Nothing currently in progress

## Next Up
1. **QA Testing** — Play through all 8 characters on target devices
2. **Branding** — Insert NexusBlue company name/logo and QR code
3. **Voice tuning** — Test TTS voice across Chrome, Edge, tablet browsers
4. **Kiosk testing** — Test on actual expo tablet hardware in Chrome kiosk mode
5. **AI integration** — Connect `JJ.aiConfig` to Claude API for dynamic conversation mode
6. **More characters** — Expand beyond 8 for replayability

## Active Stack
- HTML5 + CSS3 + Vanilla JavaScript (ES5 compatible)
- Web Speech API (browser-native TTS + STT)
- Web Audio API (sound effects)
- Service Worker (offline PWA)
- LocalStorage (metrics)
- GitHub Pages (hosting, auto-deploy on push to main)

## Known Issues / Tech Debt
- SVG icons work for most PWA installs but some Android versions prefer PNG
- Chrome TTS pause bug workaround implemented in speech.js
- Voice recognition accuracy varies by device — touch buttons are the reliable fallback
- No automated tests (manual QA sufficient for expo prototype)
- `clip-path` not supported on very old browsers — falls back to rectangular shapes
- Service worker cache requires hard refresh after visual updates

## How to Resume
> Project: Junior Jarvis — AI Future Guesser
> Live: https://nexusbluedev.github.io/nexusblue-junior-jarvis/
> Repo: https://github.com/NexusBlueDev/nexusblue-junior-jarvis
> State: Cyberpunk Arcade theme (mono amber) complete, ready for QA and branding
> Next action: Test all 8 character paths on iPad, then add NexusBlue branding + QR code
> Start by reading: This HANDOFF.md first, then CLAUDE.md for project-specific execution rules
