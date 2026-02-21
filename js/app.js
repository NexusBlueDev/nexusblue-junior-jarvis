/**
 * Junior Jarvis — Main Application Controller
 * Orchestrates game flow with push-to-talk mic, sound effects, and emoji reactions.
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
    this.bindMicIndicator();

    var self = this;
    setTimeout(function () {
      JJ.ui.setOrbState('speaking');
      JJ.speech.speak(JJ.messages.welcome, function () {
        JJ.ui.setOrbState('idle');
      });
    }, 600);
  },

  bindMicIndicator: function () {
    JJ.speech._onListeningChange = function (listening) {
      JJ.ui.setMicActive(listening);
      if (listening) {
        JJ.ui.setOrbState('listening');
        JJ.effects.soundMicOn();
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

    // Push-to-talk mic button
    var micBtn = document.getElementById('btn-mic');
    if (micBtn) {
      micBtn.addEventListener('click', function () {
        if (self.state !== 'playing') return;
        if (JJ.speech.isListening()) {
          JJ.speech.stopListening();
        } else {
          JJ.speech.listen(function (value) { self.answer(value); });
        }
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

    if (JJ.engine.shouldGuess()) { this.makeGuess(); return; }
    var qIdx = JJ.engine.selectQuestion();
    if (qIdx < 0) { this.makeGuess(); return; }

    var question = JJ.questions[qIdx];
    JJ.ui.setQuestion(question.text);
    JJ.ui.setQuestionHint(question.hint);
    JJ.ui.updateProgress(JJ.engine.getQuestionsAsked(), JJ.engine.getTotalQuestions());
    JJ.ui.setAnswerButtonsEnabled(true);

    JJ.ui.setOrbState('speaking');
    JJ.speech.speak(question.text, function () {
      // No auto-listen — user taps mic button or answer buttons
      JJ.ui.setOrbState('idle');
    });
  },

  answer: function (value) {
    if (this.state !== 'playing') return;
    JJ.ui.setAnswerButtonsEnabled(false);
    JJ.speech.stopListening();
    JJ.effects.soundTap();
    JJ.effects.answerReaction(value);
    JJ.ui.setOrbState('thinking');
    JJ.engine.processAnswer(value);

    var self = this;
    setTimeout(function () { self.askQuestion(); }, 500);
  },

  makeGuess: function () {
    this.state = 'guessing';
    JJ.speech.stopListening();
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
  window.addEventListener('load', function () { navigator.serviceWorker.register('sw.js').catch(function () {}); });
}
