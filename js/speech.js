/**
 * Junior Jarvis — Speech Module
 * Web Speech API wrapper with graceful fallbacks.
 * TTS uses British English voice when available.
 * STT listens for natural yes/no/maybe responses.
 */
var JJ = window.JJ || {};

JJ.speech = {
  synth: null,
  voice: null,
  recognition: null,
  available: { tts: false, stt: false },

  init: function () {
    // Text-to-Speech
    if ('speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.available.tts = true;

      var self = this;
      var loadVoices = function () {
        var voices = self.synth.getVoices();
        // Priority: British male → any British → any English → first available
        self.voice =
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
   * Speak text via TTS. Calls onEnd when finished (or immediately if TTS unavailable).
   */
  speak: function (text, onEnd) {
    if (!this.available.tts || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    // Cancel pending speech
    this.synth.cancel();

    var utterance = new SpeechSynthesisUtterance(text);
    if (this.voice) utterance.voice = this.voice;
    utterance.rate = 1.05;
    utterance.pitch = 1.0;

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    this.synth.speak(utterance);

    // Chrome bug workaround: synthesis can pause on long text
    this._keepAlive();
  },

  /**
   * Chrome pauses speechSynthesis after ~15s. This keeps it alive.
   */
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
   * Listen for voice input. Calls callback(value) with:
   * 1 = yes, 0 = no, 0.75 = probably, 0.25 = probably not, null = don't know
   */
  listen: function (callback) {
    if (!this.available.stt) return;

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-US';
    this.recognition.maxAlternatives = 1;

    this.recognition.onresult = function (e) {
      var transcript = e.results[0][0].transcript.toLowerCase().trim();
      var value;

      // Order matters: check multi-word phrases before single words
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

      if (value !== undefined) {
        callback(value);
      }
    };

    this.recognition.onerror = function () {
      // Silent fail — touch buttons are the primary fallback
    };

    try {
      this.recognition.start();
    } catch (e) {
      // Recognition may already be active or unavailable
    }
  },

  stopListening: function () {
    if (this.recognition) {
      try { this.recognition.abort(); } catch (e) { /* ignore */ }
      this.recognition = null;
    }
  },

  cancelSpeech: function () {
    if (this.synth) {
      this.synth.cancel();
    }
    if (this._keepAliveTimer) {
      clearInterval(this._keepAliveTimer);
    }
  }
};
