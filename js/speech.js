/**
 * Junior Jarvis — Speech Module
 * Always-on mic with auto-restart. Male JARVIS-style voice.
 */
var JJ = window.JJ || {};

JJ.speech = {
  synth: null,
  voice: null,
  recognition: null,
  available: { tts: false, stt: false },
  _listening: false,
  _micTimeout: null,
  _onListeningChange: null,
  _answerCallback: null,

  init: function () {
    if ('speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.available.tts = true;

      var self = this;
      var loadVoices = function () {
        var voices = self.synth.getVoices();
        // Priority: Natural/Neural male voices (Edge) > Google UK Male (Chrome) > Desktop fallbacks
        // "Online (Natural)" voices in Edge sound human. Desktop voices are robotic.
        var isNatural = function (v) { return v.name.indexOf('Natural') !== -1; };
        var isEnMale = function (v) { return v.lang.indexOf('en') === 0 && v.name.toLowerCase().indexOf('male') !== -1; };
        self.voice =
          // Tier 1: Edge Natural male voices (sound human)
          voices.find(function (v) { return isNatural(v) && v.name.indexOf('Guy') !== -1; }) ||
          voices.find(function (v) { return isNatural(v) && v.name.indexOf('Andrew') !== -1; }) ||
          voices.find(function (v) { return isNatural(v) && v.name.indexOf('Eric') !== -1; }) ||
          voices.find(function (v) { return isNatural(v) && v.name.indexOf('Davis') !== -1; }) ||
          voices.find(function (v) { return isNatural(v) && v.name.indexOf('Christopher') !== -1; }) ||
          voices.find(function (v) { return isNatural(v) && v.name.indexOf('Brian') !== -1; }) ||
          // Tier 2: Any Natural English voice (still sounds human)
          voices.find(function (v) { return isNatural(v) && v.lang.indexOf('en') === 0; }) ||
          // Tier 3: Chrome's best male option
          voices.find(function (v) { return v.name === 'Google UK English Male'; }) ||
          // Tier 4: Any explicitly male English voice
          voices.find(function (v) { return isEnMale(v); }) ||
          // Tier 5: Named male voices (Desktop quality, robotic but male)
          voices.find(function (v) { return v.name.indexOf('David') !== -1 && v.lang === 'en-US'; }) ||
          voices.find(function (v) { return v.name.indexOf('Mark') !== -1 && v.lang === 'en-US'; }) ||
          voices.find(function (v) { return v.name.indexOf('Daniel') !== -1 && v.lang.indexOf('en') === 0; }) ||
          voices.find(function (v) { return v.name.indexOf('James') !== -1 && v.lang.indexOf('en') === 0; }) ||
          // Tier 6: Any English voice
          voices.find(function (v) { return v.lang === 'en-US'; }) ||
          voices.find(function (v) { return v.lang.indexOf('en') === 0; }) ||
          voices[0] || null;
        // Log selected voice for debugging
        if (self.voice) console.log('JJ Voice:', self.voice.name, self.voice.lang);
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
    u.rate = 1.0;
    u.pitch = 1.0;
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
   * Always-on listening: starts mic, auto-restarts after silence/timeout.
   * Calls callback when a recognized answer is detected.
   * Keeps restarting until explicitly stopped via stopListening().
   */
  listen: function (callback) {
    if (!this.available.stt) return;
    this._answerCallback = callback;
    this._startRecognition();
  },

  _startRecognition: function () {
    if (!this.available.stt || !this._answerCallback) return;

    // Clean up any existing session
    if (this.recognition) { try { this.recognition.abort(); } catch (e) {} this.recognition = null; }
    if (this._micTimeout) { clearTimeout(this._micTimeout); this._micTimeout = null; }

    var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    var self = this;
    var answered = false;
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
      if (v !== undefined && self._answerCallback) {
        var cb = self._answerCallback;
        self.stopListening();
        cb(v);
      }
    };

    rec.onend = function () {
      self._listening = false;
      self.recognition = null;
      if (self._onListeningChange) self._onListeningChange(false);
      // Auto-restart if we haven't answered and callback is still set
      if (!answered && self._answerCallback) {
        setTimeout(function () { self._startRecognition(); }, 200);
      }
    };

    rec.onerror = function (e) {
      self._listening = false;
      self.recognition = null;
      if (self._onListeningChange) self._onListeningChange(false);
      // Restart on recoverable errors (no-speech, aborted, network)
      if (!answered && self._answerCallback && e.error !== 'not-allowed') {
        setTimeout(function () { self._startRecognition(); }, 500);
      }
    };

    this.recognition = rec;
    try { rec.start(); } catch (e) { this._listening = false; this.recognition = null; return; }

    // Safety timeout: restart after 8 seconds of silence
    this._micTimeout = setTimeout(function () {
      self._micTimeout = null;
      if (!answered && self.recognition) {
        try { self.recognition.stop(); } catch (e) {}
      }
    }, 8000);
  },

  stopListening: function () {
    this._answerCallback = null;
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
