/**
 * Junior Jarvis — UI Module
 * All DOM manipulation and screen management.
 */
var JJ = window.JJ || {};

JJ.ui = {
  screens: {},
  answerBtns: [],

  init: function () {
    this.screens = {
      welcome: document.getElementById('screen-welcome'),
      game:    document.getElementById('screen-game'),
      guess:   document.getElementById('screen-guess'),
      result:  document.getElementById('screen-result')
    };

    this.answerBtns = [
      document.getElementById('btn-yes'),
      document.getElementById('btn-no'),
      document.getElementById('btn-probably'),
      document.getElementById('btn-probably-not'),
      document.getElementById('btn-uncertain')
    ];
  },

  showScreen: function (name) {
    var screens = this.screens;
    Object.keys(screens).forEach(function (key) {
      if (screens[key]) {
        screens[key].classList.toggle('hidden', key !== name);
        if (key === name) {
          screens[key].classList.add('fade-in');
        }
      }
    });

    // Remove celebration class when leaving result screen
    if (name !== 'result' && this.screens.result) {
      this.screens.result.classList.remove('celebration');
    }
  },

  setQuestion: function (text) {
    var el = document.getElementById('question-text');
    if (el) el.textContent = text;
  },

  setQuestionHint: function (text) {
    var el = document.getElementById('question-hint');
    if (el) el.textContent = text;
  },

  updateProgress: function (current, total) {
    var pct = total > 0 ? Math.min((current / total) * 100, 100) : 0;
    var bar = document.getElementById('progress-bar');
    if (bar) bar.style.width = pct + '%';
  },

  setAnswerButtonsEnabled: function (enabled) {
    this.answerBtns.forEach(function (btn) {
      if (btn) btn.disabled = !enabled;
    });
  },

  showGuess: function (character) {
    var emoji = document.getElementById('guess-emoji');
    var name = document.getElementById('guess-name');
    var fact = document.getElementById('guess-fact');
    var card = document.getElementById('guess-card');

    if (emoji) emoji.textContent = character.emoji;
    if (name) name.textContent = character.name;
    if (fact) fact.textContent = character.fact;
    if (card) {
      card.style.background = 'linear-gradient(135deg, ' + character.gradient[0] + ', ' + character.gradient[1] + ')';
    }
  },

  showResult: function (correct) {
    var icon = document.getElementById('result-icon');
    var msg = document.getElementById('result-message');
    var detail = document.getElementById('result-detail');
    var screen = this.screens.result;

    if (correct) {
      if (icon) icon.textContent = '🎊';
      if (msg) msg.textContent = JJ.messages.correct;
      if (detail) detail.textContent = JJ.messages.correctDetail;
      if (screen) screen.classList.add('celebration');
    } else {
      if (icon) icon.textContent = '🔄';
      if (msg) msg.textContent = JJ.messages.incorrect;
      if (detail) detail.textContent = JJ.messages.encourageRetry;
      if (screen) screen.classList.remove('celebration');
    }
  },

  updateMetrics: function (count) {
    var el = document.getElementById('play-count');
    if (el) el.textContent = count;
  }
};
