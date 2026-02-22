# Junior Jarvis – AI Future Mindset Guesser  
**Product Design Document**

**Version:** 1.0  
**Date:** February 21, 2026  
**Prepared for:** Development Team, Architects, Product Owner  
**Status:** Ready for implementation & review  

## 1. Product Overview

**Product Name:** Junior Jarvis – AI Future Guesser  
**Tagline:** "Think like a future AI hero – Junior Jarvis will guess your superpower!"

### Objective
Create a short (1–2 minute), highly interactive, voice-first guessing game inspired by Iron Man's Jarvis.  
The game engages children aged 6–12 at the hometown expo booth while parents discuss:

- Business automation & efficiency solutions  
- AI workforce readiness courses & training programs  

### Business Value
- Increases booth dwell time → more high-quality parent conversations  
- Builds positive brand association with future-ready AI & education  
- Provides subtle, non-salesy exposure to company offerings  

## 2. Core Concept & Inspiration

- **Game Format:** Akinator / 20 Questions style (binary elimination)  
- **Theme:** Kid-friendly version of Jarvis (Iron Man AI assistant)  
- **Personality:** Polite, precise, witty, British-accented AI  
- **Educational Layer:** Questions and outcome facts gently introduce AI concepts  
  - Automation = making things faster/easier  
  - Efficiency = saving time & resources  
  - Future jobs = exciting AI-powered careers  
- **Expo Goal:** Keep children happily occupied → enable meaningful adult conversations  

## 3. Gameplay Flow

1. **Welcome / Start Screen**  
   - Glowing blue holographic orb avatar  
   - TTS: "Greetings, young inventor. Think of an AI superpower or future job. Shall we begin?"  
   - Large "Start / Affirmative" button (voice command also accepted)

2. **Question Phase** (max 10–20 questions)  
   - Jarvis-style TTS question (e.g. "Does it involve automation, sir/madam?")  
   - Voice input priority: "yes", "no", "probably", "don't know", etc.  
   - Fallback: large colorful touch buttons  
   - Cyan progress bar fills gradually  
   - Each interaction designed to take < 15 seconds

3. **Guess Phase**  
   - Displays large character illustration + name + short educational fact  
   - TTS reads guess and fact  
   - Player confirms: Yes (Correct!) / No (Incorrect)

4. **End Screen**  
   - Correct → celebratory animation, sparkling text, company soft-sell message  
   - Incorrect → encouraging retry message  
   - Prominent "New Query!" restart button

## 4. Target Guessing Objects (Initial Dataset)

| # | Role              | Visual Style Suggestion                  | Educational Fact (TTS + screen)                                | Elimination Properties                     |
|---|-------------------|------------------------------------------|----------------------------------------------------------------|--------------------------------------------|
| 1 | Robot Builder     | Kid assembling colorful robot            | Automation at its finest, building helpful machines!           | auto:yes, create:yes, tech:yes            |
| 2 | Smart Farmer      | Kid with tablet + drone over crops       | Efficiency in agriculture through AI innovation.               | auto:yes, nature:yes, food:yes            |
| 3 | Virtual Explorer  | Kid in VR headset exploring digital world| Discovering digital realms with AI guidance.                   | create:yes, tech:yes, explore:yes         |
| 4 | AI Artist         | Kid generating art on tablet             | Creative automation for artistic masterpieces.                 | auto:yes, create:yes, art:yes             |
| 5 | Health Helper     | Kid as future doctor with AI tools       | Streamlining health with AI precision.                         | auto:yes, health:yes                      |
| 6 | Eco Guardian      | Kid using drones to protect nature       | Protecting the environment via efficient AI systems.           | auto:yes, nature:yes, explore:yes         |
| 7 | Game Designer     | Kid coding / designing game world        | Designing immersive worlds with AI creativity.                 | create:yes, tech:yes, art:yes             |
| 8 | Food Inventor     | Kid in smart kitchen with robots         | Innovating nutrition through automated processes.              | auto:yes, create:yes, health:yes, food:yes |

## 5. Question Bank

1. Does it involve automation? (Efficiency boost!)  
2. Does it require creating new inventions?  
3. Involves advanced technology?  
4. Connected to nature or the environment?  
5. Incorporates artistic elements?  
6. Focuses on exploration?  
7. Aims to improve health?  
8. Related to food production?

## 6. Technical Requirements & Constraints

- **Platform**      Pure client-side browser (HTML5 + CSS + JavaScript)  
- **Speech**        Web Speech API  
  - Synthesis: Prefer British male voice (en-GB)  
  - Recognition: English (en-US fallback acceptable)  
- **Algorithm**     Simple decision-tree style: choose most balanced question → eliminate based on answer  
- **Offline**       Fully functional without internet after initial load  
- **Deployment**    Options:
  - Local files on tablets (kiosk mode)  
  - PWA (installable via QR code)  
  - Static hosting (GitHub Pages / Netlify / internal server)

## 7. Visual & UX Design Direction

- **Primary Palette**  
  - Background: Deep navy → bright blue gradient (#001F3F → #007BFF)  
  - Accent: Cyan glow (#00FFFF)  
  - Buttons: Green (yes), Red (no), Yellow/Orange (maybe), Gray (uncertain)

- **Avatar**          Glowing blue holographic orb (pulsing animation)  
- **Typography**      Clean sans-serif (Arial or system default)  
- **Animations**      Subtle: progress fill, image fade-in, win sparkle effect  
- **Touch Targets**   Large buttons suitable for children

## 8. Branding & Messaging

**Correct Guess (Win Screen)**  
"Spot on! You think like an AI hero. 🎊 Ask your parents about our automation services and AI courses for the future!"

**Incorrect Guess**  
"Not quite. Shall we recalibrate? We specialize in AI efficiencies!"

**Optional Additions**  
- QR code linking to company course/landing page  
- Local play counter for booth engagement metrics

## 9. Success Metrics (Expo)

- Games completed per device per hour  
- % of sessions reaching a guess  
- Qualitative parent feedback: "Did the game keep your child engaged?"  
- Observed increase in meaningful booth conversations

## 10. Open Items & Next Steps

- Insert exact company name / branding into win message  
- Final decision on logo / color palette integration  
- Hardware selection (tablet model, stand/mount)  
- Whether to include subtle sound effects (beeps, whooshes)  
- Post-expo roadmap: more characters, difficulty levels, leaderboards?

**Prototype Ready For Testing**  
The current HTML/JS prototype is fully functional offline.  
Copy → save as `index.html` → open in Chrome/Edge for immediate review.

Please provide feedback on messaging, branding elements, or additional features before final hand-off to engineering.