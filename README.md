# Junior Jarvis — AI Future Guesser

> "Think like a future AI hero — Junior Jarvis will guess your superpower!"

A kid-friendly, voice-driven Akinator-style guessing game designed for expo booth engagement. Children think of an AI-related future job or superpower, and Junior Jarvis asks yes/no questions to guess their choice.

## Purpose

Built for the NexusBlue hometown expo booth. Engages children aged 6–12 while parents discuss:
- Business automation & efficiency solutions
- AI workforce readiness courses & training programs

## Quick Start

1. Open `index.html` in Chrome or Edge
2. Allow microphone access when prompted (optional — touch buttons work without it)
3. Think of an AI superpower or future job
4. Answer Jarvis's questions — voice or touch
5. See if Jarvis guesses correctly!

## AI-First Design

This game is architected AI-first:
- **Current:** Static decision tree engine for reliable offline play
- **Future-ready:** `JJ.aiConfig` in `js/data.js` provides the hook for LLM integration (Claude API) to enable dynamic conversation, adaptive questioning, and natural language understanding
- **Fallback:** The static engine always works — even without internet

## Characters

| Role | Emoji | Key Traits |
|------|-------|------------|
| Robot Builder | 🤖 | Automation, Creation, Technology |
| Smart Farmer | 🌾 | Automation, Nature, Food |
| Virtual Explorer | 🚀 | Creation, Technology, Exploration |
| AI Artist | 🎨 | Automation, Creation, Art |
| Health Helper | 🩺 | Automation, Health |
| Eco Guardian | 🌍 | Automation, Nature, Exploration |
| Game Designer | 🎮 | Creation, Technology, Art |
| Food Inventor | 🍎 | Automation, Creation, Health, Food |

## Tech Stack

- Pure HTML5 + CSS3 + JavaScript (no dependencies, no build step)
- Web Speech API (TTS + voice recognition)
- PWA with Service Worker (offline-capable, installable)
- LocalStorage metrics for booth engagement tracking

## Deployment Options

1. **Local files** — Open `index.html` directly in a browser (kiosk mode on tablets)
2. **PWA** — Serve via HTTP, install via browser prompt or QR code
3. **GitHub Pages** — Push to repo, enable Pages in settings
4. **Any static host** — Netlify, Vercel, or internal server

## Project Structure

```
├── index.html          Main entry point
├── manifest.json       PWA manifest
├── sw.js               Service Worker (offline cache)
├── css/
│   └── styles.css      Jarvis theme, responsive layout
├── js/
│   ├── data.js         Characters, questions, messages, AI config
│   ├── engine.js       Decision tree / scoring engine
│   ├── speech.js       TTS + voice recognition wrapper
│   ├── ui.js           Screen and DOM management
│   ├── metrics.js      LocalStorage engagement analytics
│   └── app.js          Main game controller
├── assets/
│   ├── icon-192.svg    PWA icon (small)
│   └── icon-512.svg    PWA icon (large)
└── docs/
    ├── Junior-Jarvis-Design-Document.md
    └── junior-javis-sample-html.md
```

## Booth Metrics

The game tracks engagement in localStorage:
- Games started / completed
- Correct guess rate
- Available via `JJ.metrics.getSummary()` in the browser console

## License

Internal NexusBlue project. All rights reserved.
