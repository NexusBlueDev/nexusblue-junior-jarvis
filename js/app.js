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
    JJ.effects.init();
    JJ.ui.updateMetrics(JJ.metrics.getPlayCount());
    JJ.ui.showScreen('welcome');
    JJ.ui.setOrbState('idle');

    this.bindEvents();
    this.bindSpeechIndicator();

    // Speak welcome after voices have time to load
    var self = this;
    setTimeout(function () {
      JJ.ui.setOrbState('speaking');
      JJ.speech.speak(JJ.messages.welcome, function () {
        JJ.ui.setOrbState('idle');
      });
    }, 600);
  },

  /**
   * Wire up speech mic state to orb + mic badge visuals.
   */
  bindSpeechIndicator: function () {
    JJ.speech._onListeningChange = function (listening) {
      JJ.ui.setMicActive(listening);
      if (listening) {
        JJ.ui.setOrbState('listening');
      }
    };
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
    JJ.engine.reset();
    JJ.metrics.recordGameStart();
    JJ.ui.updateMetrics(JJ.metrics.getPlayCount());
    JJ.ui.showScreen('game');
    JJ.ui.updateProgress(0, JJ.engine.getTotalQuestions());

    var self = this;
    JJ.ui.setOrbState('speaking');
    JJ.speech.speak(JJ.messages.start, function () {
      JJ.ui.setOrbState('thinking');
      setTimeout(function () { self.askQuestion(); }, 400);
    });
  },

  askQuestion: function () {
    if (this.state !== 'playing') return;

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
    JJ.ui.setOrbState('speaking');
    JJ.speech.speak(question.text, function () {
      // Orb transitions to listening state via _onListeningChange callback
      JJ.speech.listen(function (value) { self.answer(value); });
    });
  },

  answer: function (value) {
    if (this.state !== 'playing') return;

    JJ.ui.setAnswerButtonsEnabled(false);
    JJ.speech.stopListening();
    JJ.ui.setOrbState('thinking');
    JJ.engine.processAnswer(value);

    var self = this;
    setTimeout(function () {
      self.askQuestion();
    }, 350);
  },

  makeGuess: function () {
    this.state = 'guessing';
    JJ.speech.stopListening();
    var character = JJ.engine.getGuess();

    JJ.ui.showScreen('guess');
    JJ.ui.showGuess(character);

    JJ.ui.setOrbState('speaking');
    var guessText = JJ.messages.guessPrefix + character.name + '. ' + character.fact;
    JJ.speech.speak(guessText, function () {
      JJ.ui.setOrbState('idle');
    });
  },

  feedback: function (correct) {
    this.state = 'result';
    JJ.metrics.recordGameEnd(correct);

    JJ.ui.showScreen('result');
    JJ.ui.showResult(correct);

    if (correct) {
      JJ.ui.setOrbState('celebrating');
    } else {
      JJ.ui.setOrbState('idle');
    }

    var msg = correct ? JJ.messages.correct : JJ.messages.incorrect;
    JJ.speech.speak(msg);
  },

  restart: function () {
    this.state = 'welcome';
    JJ.speech.cancelSpeech();
    JJ.ui.showScreen('welcome');
    JJ.ui.updateProgress(0, JJ.engine.getTotalQuestions());
    JJ.ui.updateMetrics(JJ.metrics.getPlayCount());
    JJ.ui.setOrbState('idle');

    setTimeout(function () {
      JJ.ui.setOrbState('speaking');
      JJ.speech.speak(JJ.messages.welcome, function () {
        JJ.ui.setOrbState('idle');
      });
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
    navigator.serviceWorker.register('sw.js').catch(function () {});
  });
}
