# HANDOFF — Junior Jarvis

## Last Updated
2026-02-22 — Governance: CLAUDE.md converted to project-specific v3.0 format. Global Claude standards now centralized.

## Project State
Junior Jarvis v3 is built and ready for testing. The game features a modern glassmorphism UI with push-to-talk mic, Web Audio sound effects, floating emoji reactions, character gallery, and Instagram-style progress dots. The mic auto-listen issue has been replaced with an explicit push-to-talk button.

## Completed

### 2026-02-22 — Claude Governance
- **CLAUDE.md converted to project-specific v3.0 format** — Removed embedded global copilot prompt; project-specific rules only
- **Global Claude standards centralized** — `~/.claude/CLAUDE.md` (v3.0 master) applies to all NexusBlue projects automatically
- **Master template stored** at `NexusBlueDev/nexusblue-application-templates/claude/CLAUDE.md` (source of truth)
- **HANDOFF.md is now the governing document** — Claude reads this first each session to understand project state

### v1–v3 (Product)
- Project scaffolding and architecture design
- Game engine with scoring-based elimination (8 characters, 8 questions)
- Web Speech API integration (TTS friendly British male voice + STT push-to-talk)
- Four-screen UI flow: Welcome → Questions → Guess → Result
- **v2:** Interactive orb avatar with 5 animated states (idle, speaking, listening, thinking, celebrating)
- **v2:** Floating background particles (cyan/blue)
- **v2:** Kid-friendly messaging and "How to Play" guide
- **v3:** Push-to-talk mic button (replaced broken auto-listen)
- **v3:** Web Audio API sound effects (tap, correct, wrong, reveal, mic-on)
- **v3:** Floating emoji reactions on answers (👍👎🤔😕❓)
- **v3:** Character gallery on welcome screen (horizontal scroll previews)
- **v3:** Glassmorphism UI (frosted glass cards, gradient text, modern animations)
- **v3:** Instagram-style segmented progress dots + question counter
- **v3:** Confetti celebration on correct guess
- **2026-03-06:** Switched to darker neon color palette with bursts of light (magenta/green/cyan theme) per user request
- **2026-03-06:** Major visual overhaul — Cyberpunk Arcade theme: deep indigo base, electric amber/hot pink/ice blue palette, angular clip-path buttons and cards, hex-grid gallery tiles, scanline CRT overlay, glitch text animations, holographic progress bar with shine sweep, all typography uppercased with letter-spacing
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
- GitHub (version control)

## Known Issues / Tech Debt
- SVG icons work for most PWA installs but some Android versions prefer PNG
- Chrome TTS pause bug workaround implemented in speech.js
- Voice recognition accuracy varies by device — touch buttons are the reliable fallback
- No automated tests (manual QA sufficient for expo prototype)
- `backdrop-filter` (glassmorphism) not supported in older browsers — falls back to semi-transparent background

## How to Resume
> Project: Junior Jarvis — AI Future Guesser
> State: v3 complete, ready for QA and branding
> Next action: Test all 8 character paths with push-to-talk mic, then insert NexusBlue branding
> Start by reading: This HANDOFF.md first, then CLAUDE.md for project-specific execution rules (global rules auto-loaded from ~/.claude/CLAUDE.md)
