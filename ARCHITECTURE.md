# Architecture — Junior Jarvis

## Design Philosophy

**AI-First:** The game is architected to support AI-powered dynamic conversation as the primary experience, with a static decision tree as the always-available offline fallback. This dual-mode approach ensures the game works everywhere (expo booths with spotty WiFi) while being ready for intelligent, adaptive gameplay when connected.

## System Overview

```
┌─────────────────────────────────────────────┐
│                  index.html                  │
│              (Entry Point + Layout)          │
├─────────────────────────────────────────────┤
│                   app.js                     │
│            (Game Flow Controller)            │
│  welcome → questions → guess → result → loop │
├──────────┬──────────┬──────────┬────────────┤
│ engine.js│speech.js │  ui.js   │ metrics.js │
│ Scoring &│ TTS +    │ DOM &    │ LocalStore │
│ Questions│ STT      │ Screens  │ Analytics  │
├──────────┴──────────┴──────────┴────────────┤
│                  data.js                     │
│     Characters, Questions, Messages, Config  │
└─────────────────────────────────────────────┘
```

## Module Responsibilities

### data.js — Content Layer
- Character definitions (8 roles with properties, emoji, gradient colors, educational facts)
- Question bank (8 binary-property questions with kid-friendly hints)
- UI messages (welcome, guess, correct, incorrect)
- AI provider configuration (`JJ.aiConfig`)

### engine.js — Logic Layer
- Scoring-based elimination (not hard binary — handles "probably" and "uncertain")
- Intelligent question selection (picks the question that best splits remaining candidates)
- Confidence-based guessing (guesses early when one character clearly leads)
- Interface: `reset()` → `selectQuestion()` → `processAnswer()` → `shouldGuess()` → `getGuess()`

### speech.js — Voice Layer
- Web Speech API wrapper with full graceful degradation
- TTS: Prefers British English voice (Jarvis personality)
- STT: Natural language pattern matching for yes/no/maybe responses
- Chrome long-speech bug workaround (pause/resume keepalive)

### ui.js — View Layer
- Four screens: welcome, game (questions), guess, result
- All DOM manipulation centralized here
- Screen transitions with CSS fade-in animations
- Answer button enable/disable to prevent double-tap

### metrics.js — Analytics Layer
- LocalStorage-based engagement tracking
- Games started, completed, correct guesses, session timestamp
- `getSummary()` for booth operators to check engagement
- No external dependencies or network calls

### app.js — Controller
- Orchestrates the game state machine: `welcome → playing → guessing → result`
- Binds all UI events to game actions
- Coordinates speech, engine, UI, and metrics
- Registers the Service Worker for PWA support

## Scoring Algorithm

The engine uses a weighted scoring system instead of hard elimination:

| Answer | Has Property | Lacks Property |
|--------|-------------|----------------|
| Yes (1.0) | +2 | -2 |
| No (0.0) | -2 | +2 |
| Probably (0.75) | +1 | -0.5 |
| Probably Not (0.25) | -0.5 | +1 |
| Don't Know (null) | 0 | 0 |

**Why scoring over elimination:** Kids answer inconsistently. A "probably" shouldn't completely remove characters from consideration. The scoring approach gracefully handles uncertain responses and still converges to the correct guess within 3-5 questions.

**Question Selection:** At each step, the engine picks the unasked question that produces the most balanced yes/no split among non-eliminated characters (score > -3). This maximizes information gain per question.

**Guess Trigger:** The engine guesses when:
- All 8 questions have been asked, OR
- The top-scoring character leads by 4+ points, OR
- After 3+ questions, the leader has a 3+ point margin

## AI-First Upgrade Path

The `JJ.aiConfig` object in `data.js` is the integration point:

```
Static Mode (current):
  app.js → engine.js → data.js (local character matching)

AI Mode (future):
  app.js → ai-engine.js → Claude API (dynamic conversation)
           ↓ fallback
           engine.js → data.js
```

When AI mode is enabled, the question phase would:
1. Send conversation context to Claude API
2. Receive a natural-language question (not limited to the 8 predefined ones)
3. Accept free-form voice/text responses (not just yes/no)
4. Use the LLM to evaluate answers and determine confidence

The static engine remains the fallback for offline play, ensuring the game always works.

## Character Property Matrix

```
                 auto create tech nature art explore health food
Robot Builder      ✓    ✓     ✓
Smart Farmer       ✓                ✓                       ✓
Virtual Explorer        ✓     ✓                 ✓
AI Artist          ✓    ✓                 ✓
Health Helper      ✓                                  ✓
Eco Guardian       ✓                ✓           ✓
Game Designer           ✓     ✓           ✓
Food Inventor      ✓    ✓                            ✓     ✓
```

Each character has a unique binary fingerprint across the 8 properties, ensuring the engine can distinguish all 8 characters with sufficient questions.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| No build tools | Vanilla JS, `<script>` tags | Works from file://, zero setup, expo-proof |
| CSS emoji cards | No external images | Offline-first, no copyright issues, always renders |
| Scoring over elimination | Weighted point system | Handles uncertain kid answers gracefully |
| Property data from design doc | Not from sample HTML | Sample HTML had `tech: true` for all characters (bug) |
| Global namespace (JJ) | Not ES modules | ES modules don't work from file:// protocol |
| PWA optional | Works without Service Worker | Core game works everywhere; PWA adds installability |
