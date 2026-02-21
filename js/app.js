/**
 * Junior Jarvis — Main Application Controller
 * Orchestrates game flow with sound effects and emoji reactions. Button-only input.
 */
var JJ = window.JJ || {};

JJ.app = {
  state: 'welcome',
  _answerLock: false,

  init: function () {
    JJ.speech.init();
    JJ.ui.init();
    JJ.effects.init();
    JJ.ui.updateMetrics(JJ.metrics.getPlayCount());
    JJ.ui.showScreen('welcome');
    JJ.ui.setOrbState('idle');

    this.bindEvents();
    this._setupTapOverlay();
  },

  _setupTapOverlay: function () {
    var overlay = document.getElementById('tap-overlay');
    if (!overlay) return;
    var self = this;
    var handler = function () {
      overlay.classList.add('hidden');
      overlay.removeEventListener('click', handler);
      // User gesture unlocks speech — now play welcome
      JJ.ui.setOrbState('speaking');
      JJ.speech.speak(JJ.messages.welcome, function () {
        JJ.ui.setOrbState('idle');
      });
    };
    overlay.addEventListener('click', handler);
  },

  bindEvents: function () {
    var self = this;

    document.getElementById('btn-start').addEventListener('click', function () { self.startGame(); });
    document.getElementById('btn-yes').addEventListener('click', function () { self.answer(1); });
    document.getElementById('btn-no').addEventListener('click', function () { self.answer(0); });
    document.getElementById('btn-probably').addEventListener('click', function () { self.answer(0.75); });
    document.getElementById('btn-probably-not').addEventListener('click', function () { self.answer(0.25); });
    document.getElementById('btn-uncertain').addEventListener('click', function () { self.answer(null); });
    document.getElementById('btn-correct').addEventListener('click', function () { self.feedback(true); });
    document.getElementById('btn-incorrect').addEventListener('click', function () { self.feedback(false); });
    document.getElementById('btn-restart').addEventListener('click', function () { self.restart(); });
  },

  startGame: function () {
    if (this.state === 'playing') return;
    this.state = 'playing';
    this._answerLock = false;
    JJ.engine.reset();
    JJ.metrics.recordGameStart();
    JJ.ui.updateMetrics(JJ.metrics.getPlayCount());
    JJ.ui.showScreen('game');
    JJ.ui.updateProgress(0, JJ.engine.getTotalQuestions());
    JJ.effects.soundTap();

    var self = this;
    JJ.ui.setOrbState('speaking');
    JJ.speech.speak(JJ.messages.start, function () {
      JJ.ui.setOrbState('thinking');
      setTimeout(function () { self.askQuestion(); }, 400);
    });
  },

  askQuestion: function () {
    if (this.state !== 'playing') return;
    this._answerLock = false;

    if (JJ.engine.shouldGuess()) { this.makeGuess(); return; }
    var qIdx = JJ.engine.selectQuestion();
    if (qIdx < 0) { this.makeGuess(); return; }

    var question = JJ.questions[qIdx];
    JJ.ui.setQuestion(question.text);
    JJ.ui.setQuestionHint(question.hint);
    JJ.ui.updateProgress(JJ.engine.getQuestionsAsked(), JJ.engine.getTotalQuestions());
    JJ.ui.setAnswerButtonsEnabled(true);

    var self = this;
    JJ.ui.setOrbState('speaking');
    JJ.speech.cancelSpeech();
    JJ.speech.speak(question.text, function () {
      if (self._answerLock) return;
      JJ.ui.setOrbState('idle');
    });
  },

  answer: function (value) {
    if (this.state !== 'playing') return;
    if (this._answerLock) return;
    this._answerLock = true;

    JJ.ui.setAnswerButtonsEnabled(false);
    JJ.speech.cancelSpeech();
    JJ.effects.soundTap();
    JJ.effects.answerReaction(value);
    JJ.ui.setOrbState('thinking');
    JJ.engine.processAnswer(value);

    var self = this;
    setTimeout(function () { self.askQuestion(); }, 600);
  },

  makeGuess: function () {
    this.state = 'guessing';
    this._answerLock = false;
    JJ.speech.cancelSpeech();
    var character = JJ.engine.getGuess();

    JJ.effects.soundReveal();
    JJ.ui.showScreen('guess');
    JJ.ui.showGuess(character);

    JJ.ui.setOrbState('speaking');
    var text = JJ.messages.guessPrefix + character.name + '. ' + character.fact;
    JJ.speech.speak(text, function () { JJ.ui.setOrbState('idle'); });
  },

  feedback: function (correct) {
    this.state = 'result';
    JJ.metrics.recordGameEnd(correct);
    JJ.effects.soundTap();
    JJ.ui.showScreen('result');
    JJ.ui.showResult(correct);
    JJ.ui.setOrbState(correct ? 'celebrating' : 'idle');
    JJ.speech.speak(correct ? JJ.messages.correct : JJ.messages.incorrect);
  },

  restart: function () {
    this.state = 'welcome';
    this._answerLock = false;
    JJ.speech.cancelSpeech();
    JJ.effects.soundTap();
    JJ.ui.showScreen('welcome');
    JJ.ui.updateProgress(0, JJ.engine.getTotalQuestions());
    JJ.ui.updateMetrics(JJ.metrics.getPlayCount());
    JJ.ui.setOrbState('idle');

    setTimeout(function () {
      JJ.ui.setOrbState('speaking');
      JJ.speech.speak(JJ.messages.welcome, function () { JJ.ui.setOrbState('idle'); });
    }, 300);
  }
};

document.addEventListener('DOMContentLoaded', function () { JJ.app.init(); });
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    // Force old service workers to update immediately
    navigator.serviceWorker.getRegistrations().then(function (regs) {
      regs.forEach(function (reg) { reg.update(); });
    });
    navigator.serviceWorker.register('sw.js').catch(function () {});
  });
}
