/**
 * Junior Jarvis — Main Application Controller
 * Orchestrates game flow: welcome → questions → guess → result.
 *
 * AI-First Design: When JJ.aiConfig.enabled is true, the question
 * phase routes through an AI provider for dynamic conversation.
 * The static engine serves as the always-available offline fallback.
 */
var JJ = window.JJ || {};

JJ.app = {
  state: 'welcome',

  init: function () {
    JJ.speech.init();
    JJ.ui.init();
    JJ.ui.updateMetrics(JJ.metrics.getPlayCount());
    JJ.ui.showScreen('welcome');

    this.bindEvents();

    // Speak welcome after voices have time to load
    var self = this;
    setTimeout(function () {
      JJ.speech.speak(JJ.messages.welcome);
    }, 600);
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

    // Allow Start via voice on welcome screen
    if (JJ.speech.available.stt) {
      document.getElementById('btn-start').addEventListener('focus', function () {
        JJ.speech.listen(function () { self.startGame(); });
      });
    }
  },

  startGame: function () {
    if (this.state === 'playing') return;

    this.state = 'playing';
    JJ.engine.reset();
    JJ.metrics.recordGameStart();
    JJ.ui.updateMetrics(JJ.metrics.getPlayCount());
    JJ.ui.showScreen('game');
    JJ.ui.updateProgress(0, JJ.engine.getTotalQuestions());

    var self = this;
    JJ.speech.speak(JJ.messages.start, function () {
      setTimeout(function () { self.askQuestion(); }, 400);
    });
  },

  askQuestion: function () {
    if (this.state !== 'playing') return;

    // Check if we should guess now
    if (JJ.engine.shouldGuess()) {
      this.makeGuess();
      return;
    }

    var qIdx = JJ.engine.selectQuestion();
    if (qIdx < 0) {
      this.makeGuess();
      return;
    }

    var question = JJ.questions[qIdx];
    JJ.ui.setQuestion(question.text);
    JJ.ui.setQuestionHint(question.hint);
    JJ.ui.updateProgress(JJ.engine.getQuestionsAsked(), JJ.engine.getTotalQuestions());
    JJ.ui.setAnswerButtonsEnabled(true);

    var self = this;
    JJ.speech.speak(question.text, function () {
      JJ.speech.listen(function (value) { self.answer(value); });
    });
  },

  answer: function (value) {
    if (this.state !== 'playing') return;

    // Prevent double-tap
    JJ.ui.setAnswerButtonsEnabled(false);
    JJ.speech.stopListening();
    JJ.engine.processAnswer(value);

    var self = this;
    setTimeout(function () {
      self.askQuestion();
    }, 350);
  },

  makeGuess: function () {
    this.state = 'guessing';
    var character = JJ.engine.getGuess();

    JJ.ui.showScreen('guess');
    JJ.ui.showGuess(character);

    var guessText = JJ.messages.guessPrefix + character.name + '. ' + character.fact;
    JJ.speech.speak(guessText);
  },

  feedback: function (correct) {
    this.state = 'result';
    JJ.metrics.recordGameEnd(correct);

    JJ.ui.showScreen('result');
    JJ.ui.showResult(correct);

    var msg = correct ? JJ.messages.correct : JJ.messages.incorrect;
    JJ.speech.speak(msg);
  },

  restart: function () {
    this.state = 'welcome';
    JJ.speech.cancelSpeech();
    JJ.speech.stopListening();
    JJ.ui.showScreen('welcome');
    JJ.ui.updateProgress(0, JJ.engine.getTotalQuestions());
    JJ.ui.updateMetrics(JJ.metrics.getPlayCount());

    setTimeout(function () {
      JJ.speech.speak(JJ.messages.welcome);
    }, 300);
  }
};

// Boot
document.addEventListener('DOMContentLoaded', function () {
  JJ.app.init();
});

// Register Service Worker for offline PWA support
if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('sw.js').catch(function () {
      // SW registration failed — app still works, just not offline-installable
    });
  });
}
