/**
 * Junior Jarvis — Speech Module
 * Web Speech API wrapper with graceful fallbacks.
 * Friendly British voice. Mic auto-releases after 6 seconds max.
 */
var JJ = window.JJ || {};

JJ.speech = {
  synth: null,
  voice: null,
  recognition: null,
  available: { tts: false, stt: false },
  _listening: false,
  _listenTimer: null,
  _micTimeout: null,
  _onListeningChange: null,

  init: function () {
    if ('speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.available.tts = true;

      var self = this;
      var loadVoices = function () {
        var voices = self.synth.getVoices();
        // Friendly British male voice priority:
        // Google UK Male (Chrome), Microsoft George (Edge), Daniel (macOS)
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

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.available.stt = true;
    }
  },

  speak: function (text, onEnd) {
    this.stopListening();

    if (!this.available.tts || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.synth.cancel();

    var utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) utterance.voice = this.voice;
    utterance.rate = 1.0;    // Natural conversational pace
    utterance.pitch = 0.95;  // Warm male tone, not too deep

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
   * Listen for voice input with a hard 6-second timeout.
   * Mic is acquired, held for up to 6s, then always released.
   * Touch buttons work in parallel as the primary input method.
   */
  listen: function (callback) {
    if (!this.available.stt) return;

    this.stopListening();

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    var self = this;
    var answered = false;

    // 150ms gap ensures previous mic session is fully closed
    this._listenTimer = setTimeout(function () {
      self._listenTimer = null;

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
        if (answered) return;
        answered = true;

        var transcript = e.results[0][0].transcript.toLowerCase().trim();
        var value;

        if (/\b(probably not|maybe not|not really|i don'?t think so)\b/.test(transcript)) {
          value = 0.25;
        } else if (/\b(yes|yeah|yep|yup|affirmative|sure|correct|absolutely|definitely|uh huh)\b/.test(transcript)) {
          value = 1;
        } else if (/\b(no|nope|nah|negative|incorrect|never|uh uh)\b/.test(transcript)) {
          value = 0;
        } else if (/\b(probably|maybe|possibly|i think so|sort of|kind of)\b/.test(transcript)) {
          value = 0.75;
        } else if (/\b(don'?t know|uncertain|unsure|no idea|not sure|skip|pass)\b/.test(transcript)) {
          value = null;
        }

        self.stopListening();
        if (value !== undefined) {
          callback(value);
        }
      };

      rec.onend = function () {
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
        return;
      }

      // Hard timeout: always release mic after 6 seconds
      self._micTimeout = setTimeout(function () {
        self._micTimeout = null;
        if (!answered) {
          self.stopListening();
        }
      }, 6000);

    }, 150);
  },

  stopListening: function () {
    if (this._listenTimer) {
      clearTimeout(this._listenTimer);
      this._listenTimer = null;
    }
    if (this._micTimeout) {
      clearTimeout(this._micTimeout);
      this._micTimeout = null;
    }
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
    if (this.synth) this.synth.cancel();
    if (this._keepAliveTimer) clearInterval(this._keepAliveTimer);
  }
};
