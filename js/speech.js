/**
 * Junior Jarvis — Speech Module
 * Web Speech API wrapper with graceful fallbacks.
 * TTS uses British English voice when available.
 * STT is explicitly acquired/released to avoid holding the mic.
 */
var JJ = window.JJ || {};

JJ.speech = {
  synth: null,
  voice: null,
  recognition: null,
  available: { tts: false, stt: false },
  _listening: false,
  _onListeningChange: null, // callback(bool) — UI uses this for mic indicator

  init: function () {
    // Text-to-Speech
    if ('speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.available.tts = true;

      var self = this;
      var loadVoices = function () {
        var voices = self.synth.getVoices();
        // Priority chain for a deep, authoritative Jarvis voice:
        // 1. Google UK English Male (Chrome) — closest to Jarvis
        // 2. Microsoft George (Edge/Windows) — deep British male
        // 3. Daniel (macOS/Safari) — British male
        // 4. Any en-GB male voice
        // 5. Any en-GB voice
        // 6. Any English voice
        self.voice =
          voices.find(function (v) { return v.name === 'Google UK English Male'; }) ||
          voices.find(function (v) { return v.name.indexOf('George') !== -1 && v.lang === 'en-GB'; }) ||
          voices.find(function (v) { return v.name.indexOf('Daniel') !== -1 && v.lang === 'en-GB'; }) ||
          voices.find(function (v) { return v.lang === 'en-GB' && v.name.toLowerCase().indexOf('male') !== -1; }) ||
          voices.find(function (v) { return v.lang === 'en-GB'; }) ||
          voices.find(function (v) { return v.lang.indexOf('en') === 0; }) ||
          voices[0] || null;
      };

      loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = loadVoices;
      }
    }

    // Speech-to-Text
    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.available.stt = true;
    }
  },

  /**
   * Speak text via TTS. Calls onEnd when finished.
   * Mic is always released before speaking starts.
   */
  speak: function (text, onEnd) {
    // Always release mic before speaking to prevent holding
    this.stopListening();

    if (!this.available.tts || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.synth.cancel();

    var utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) utterance.voice = this.voice;
    utterance.rate = 0.95;   // Measured, deliberate pace — like Jarvis
    utterance.pitch = 0.85;  // Slightly deeper for authoritative male tone

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    this.synth.speak(utterance);
    this._keepAlive();
  },

  _keepAlive: function () {
    var self = this;
    if (this._keepAliveTimer) clearInterval(this._keepAliveTimer);
    this._keepAliveTimer = setInterval(function () {
      if (!self.synth || !self.synth.speaking) {
        clearInterval(self._keepAliveTimer);
        return;
      }
      self.synth.pause();
      self.synth.resume();
    }, 10000);
  },

  /**
   * Start listening for voice input. Acquires mic, calls callback(value) once,
   * then automatically releases mic. Only one session at a time.
   */
  listen: function (callback) {
    if (!this.available.stt) return;

    // Release any existing session first
    this.stopListening();

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var self = this;

    // Small delay to ensure previous session is fully released
    setTimeout(function () {
      var rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;
      rec.lang = 'en-US';
      rec.maxAlternatives = 1;

      rec.onstart = function () {
        self._listening = true;
        if (self._onListeningChange) self._onListeningChange(true);
      };

      rec.onresult = function (e) {
        var transcript = e.results[0][0].transcript.toLowerCase().trim();
        var value;

        if (/\b(probably not|maybe not|not really|i don'?t think so)\b/.test(transcript)) {
          value = 0.25;
        } else if (/\b(yes|yeah|yep|yup|affirmative|sure|correct|absolutely|definitely)\b/.test(transcript)) {
          value = 1;
        } else if (/\b(no|nope|nah|negative|incorrect|never)\b/.test(transcript)) {
          value = 0;
        } else if (/\b(probably|maybe|possibly|i think so|sort of|kind of)\b/.test(transcript)) {
          value = 0.75;
        } else if (/\b(don'?t know|uncertain|unsure|no idea|not sure|skip|pass)\b/.test(transcript)) {
          value = null;
        }

        // Release mic immediately after getting a result
        self.stopListening();

        if (value !== undefined) {
          callback(value);
        }
      };

      rec.onend = function () {
        // Mic released (either by us or naturally after silence)
        self._listening = false;
        self.recognition = null;
        if (self._onListeningChange) self._onListeningChange(false);
      };

      rec.onerror = function () {
        self._listening = false;
        self.recognition = null;
        if (self._onListeningChange) self._onListeningChange(false);
      };

      self.recognition = rec;

      try {
        rec.start();
      } catch (e) {
        self._listening = false;
        self.recognition = null;
      }
    }, 100);
  },

  /**
   * Explicitly release the microphone.
   */
  stopListening: function () {
    if (this.recognition) {
      try { this.recognition.abort(); } catch (e) { /* ignore */ }
      this.recognition = null;
    }
    if (this._listening) {
      this._listening = false;
      if (this._onListeningChange) this._onListeningChange(false);
    }
  },

  isListening: function () {
    return this._listening;
  },

  cancelSpeech: function () {
    this.stopListening();
    if (this.synth) {
      this.synth.cancel();
    }
    if (this._keepAliveTimer) {
      clearInterval(this._keepAliveTimer);
    }
  }
};
