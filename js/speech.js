/**
 * Junior Jarvis — Speech Module
 * Push-to-talk mic. Smooth JARVIS-style voice. Auto-release after 6s.
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
        // Smooth, warm, JARVIS-like voice — polished American male preferred
        self.voice =
          voices.find(function (v) { return v.name === 'Google US English'; }) ||
          voices.find(function (v) { return v.name.indexOf('David') !== -1 && v.lang === 'en-US'; }) ||
          voices.find(function (v) { return v.name.indexOf('Mark') !== -1 && v.lang === 'en-US'; }) ||
          voices.find(function (v) { return v.name.indexOf('Guy') !== -1 && v.lang === 'en-US'; }) ||
          voices.find(function (v) { return v.lang === 'en-US' && v.name.toLowerCase().indexOf('male') !== -1; }) ||
          voices.find(function (v) { return v.lang === 'en-US'; }) ||
          voices.find(function (v) { return v.lang.indexOf('en') === 0; }) ||
          voices[0] || null;
      };
      loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = loadVoices;
      }
    }

    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SR) this.available.stt = true;
  },

  speak: function (text, onEnd) {
    this.stopListening();
    if (!this.available.tts || !this.synth) { if (onEnd) onEnd(); return; }

    this.synth.cancel();
    var u = new SpeechSynthesisUtterance(text);
    if (this.voice) u.voice = this.voice;
    u.rate = 0.95;
    u.pitch = 1.05;
    if (onEnd) { u.onend = onEnd; u.onerror = onEnd; }
    this.synth.speak(u);
    this._keepAlive();
  },

  _keepAlive: function () {
    var self = this;
    if (this._keepAliveTimer) clearInterval(this._keepAliveTimer);
    this._keepAliveTimer = setInterval(function () {
      if (!self.synth || !self.synth.speaking) { clearInterval(self._keepAliveTimer); return; }
      self.synth.pause(); self.synth.resume();
    }, 10000);
  },

  /**
   * Push-to-talk: start listening, auto-stop after 6s or on result.
   * Called explicitly by mic button, NOT auto-started after TTS.
   */
  listen: function (callback) {
    if (!this.available.stt) return;
    this.stopListening();

    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    var self = this;
    var answered = false;

    this._listenTimer = setTimeout(function () {
      self._listenTimer = null;
      var rec = new SR();
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
        var t = e.results[0][0].transcript.toLowerCase().trim();
        var v;
        if (/\b(probably not|maybe not|not really|i don'?t think so)\b/.test(t)) v = 0.25;
        else if (/\b(yes|yeah|yep|yup|affirmative|sure|correct|absolutely|definitely|uh huh)\b/.test(t)) v = 1;
        else if (/\b(no|nope|nah|negative|incorrect|never|uh uh)\b/.test(t)) v = 0;
        else if (/\b(probably|maybe|possibly|i think so|sort of|kind of)\b/.test(t)) v = 0.75;
        else if (/\b(don'?t know|uncertain|unsure|no idea|not sure|skip|pass)\b/.test(t)) v = null;
        self.stopListening();
        if (v !== undefined) callback(v);
      };

      rec.onend = function () {
        self._listening = false; self.recognition = null;
        if (self._onListeningChange) self._onListeningChange(false);
      };
      rec.onerror = function () {
        self._listening = false; self.recognition = null;
        if (self._onListeningChange) self._onListeningChange(false);
      };

      self.recognition = rec;
      try { rec.start(); } catch (e) { self._listening = false; self.recognition = null; return; }

      self._micTimeout = setTimeout(function () {
        self._micTimeout = null;
        if (!answered) self.stopListening();
      }, 6000);
    }, 120);
  },

  stopListening: function () {
    if (this._listenTimer) { clearTimeout(this._listenTimer); this._listenTimer = null; }
    if (this._micTimeout) { clearTimeout(this._micTimeout); this._micTimeout = null; }
    if (this.recognition) { try { this.recognition.abort(); } catch (e) {} this.recognition = null; }
    if (this._listening) { this._listening = false; if (this._onListeningChange) this._onListeningChange(false); }
  },

  isListening: function () { return this._listening; },

  cancelSpeech: function () {
    this.stopListening();
    if (this.synth) this.synth.cancel();
    if (this._keepAliveTimer) clearInterval(this._keepAliveTimer);
  }
};
