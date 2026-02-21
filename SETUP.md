# Setup — Junior Jarvis

## Prerequisites

- A modern browser: Chrome 90+ or Edge 90+ (required for Web Speech API)
- Microphone access (optional — game works with touch-only)
- No Node.js, no build tools, no dependencies needed

## Local Development

```bash
# Clone the repo
git clone https://github.com/NexusBlueDev/nexusblue-junior-jarvis.git
cd nexusblue-junior-jarvis

# Option 1: Open directly (basic testing, no PWA)
# Just open index.html in your browser

# Option 2: Local HTTP server (full PWA + Service Worker)
python -m http.server 8080
# Then open http://localhost:8080
```

## Expo Booth Setup (Kiosk Mode)

### Chrome Kiosk on Windows
```bash
chrome.exe --kiosk --disable-infobars "file:///C:/path/to/index.html"
```

### Chrome Kiosk on Android Tablet
1. Open Chrome → navigate to the hosted URL
2. Tap "Add to Home Screen" when prompted (or three-dot menu → Install)
3. Open the installed app — runs in fullscreen

### iPad
1. Open Safari → navigate to the hosted URL
2. Tap Share → Add to Home Screen
3. Open from home screen — runs without browser chrome

## PWA Installation

When served over HTTPS (or localhost), the browser will prompt to install.
Alternatively, generate a QR code pointing to the hosted URL for booth visitors.

## Configuration

### Company Branding
Edit `js/data.js` → `JJ.messages` to customize:
- Win/lose messages
- Company name references
- Taglines and calls to action

### AI Provider (Future)
Edit `js/data.js` → `JJ.aiConfig` to enable LLM-powered dynamic conversation:
```javascript
JJ.aiConfig = {
  enabled: true,
  provider: 'claude',
  endpoint: 'https://api.anthropic.com/v1/messages',
  apiKey: null,  // Set via runtime config, never hardcode
  model: 'claude-haiku-4-5-20251001'
};
```

### Metrics Reset
Open browser console and run:
```javascript
JJ.metrics.reset();
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| No voice output | Check browser supports Web Speech API. Try Chrome. |
| Voice recognition not working | Allow microphone permission. Use touch buttons as fallback. |
| Service Worker not caching | Must serve over HTTPS or localhost, not file:// |
| Buttons unresponsive | Check browser console for JS errors |
