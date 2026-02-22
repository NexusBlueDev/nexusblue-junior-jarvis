/**
 * Junior Jarvis — UI Module
 * DOM manipulation, screen management, orb states, character gallery.
 */
var JJ = window.JJ || {};

JJ.ui = {
  screens: {},
  answerBtns: [],
  orbEls: [],

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
    this.orbEls = document.querySelectorAll('.orb-wrapper');

    this.buildCharacterGallery();
    this.buildProgressDots();
  },

  /**
   * Build the character preview gallery on the welcome screen.
   * Tap a card to see its fact in a modal overlay.
   */
  buildCharacterGallery: function () {
    var container = document.getElementById('character-gallery');
    if (!container) return;
    var self = this;
    JJ.characters.forEach(function (c) {
      var item = document.createElement('div');
      item.className = 'gallery-item';
      item.style.background = 'linear-gradient(135deg, ' + c.gradient[0] + ', ' + c.gradient[1] + ')';
      item.innerHTML = '<span class="gallery-emoji">' + c.emoji + '</span>' +
                       '<span class="gallery-name">' + c.name + '</span>' +
                       '<span class="gallery-click">(click me)</span>';
      item.addEventListener('click', function () { self.showCharacterPreview(c); });
      container.appendChild(item);
    });
  },

  /**
   * Show a modal overlay with character details.
   */
  showCharacterPreview: function (character) {
    var existing = document.getElementById('character-preview-overlay');
    if (existing) existing.remove();

    var overlay = document.createElement('div');
    overlay.id = 'character-preview-overlay';
    overlay.className = 'character-preview-overlay';

    var card = document.createElement('div');
    card.className = 'character-card glass-card';
    card.style.background = 'linear-gradient(135deg, ' + character.gradient[0] + ', ' + character.gradient[1] + ')';

    var emoji = document.createElement('div');
    emoji.className = 'character-emoji';
    emoji.textContent = character.emoji;

    var name = document.createElement('h2');
    name.className = 'character-name';
    name.textContent = character.name;

    var fact = document.createElement('p');
    fact.className = 'character-fact';
    fact.textContent = character.fact;

    var close = document.createElement('button');
    close.className = 'btn preview-close';
    close.textContent = 'Got it!';

    card.appendChild(emoji);
    card.appendChild(name);
    card.appendChild(fact);
    card.appendChild(close);
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    var dismiss = function () { JJ.speech.cancelSpeech(); overlay.remove(); };
    close.addEventListener('click', dismiss);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) dismiss();
    });

    JJ.speech.speak(character.name + '. ' + character.fact);
  },

  /**
   * Build Instagram-style progress dots.
   */
  buildProgressDots: function () {
    var container = document.getElementById('progress-dots');
    if (!container) return;
    for (var i = 0; i < JJ.questions.length; i++) {
      var dot = document.createElement('div');
      dot.className = 'progress-dot';
      container.appendChild(dot);
    }
  },

  showScreen: function (name) {
    var screens = this.screens;
    Object.keys(screens).forEach(function (key) {
      if (screens[key]) {
        screens[key].classList.toggle('hidden', key !== name);
        if (key === name) screens[key].classList.add('fade-in');
      }
    });
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
    // Update dots
    var dots = document.querySelectorAll('.progress-dot');
    for (var i = 0; i < dots.length; i++) {
      dots[i].classList.toggle('filled', i < current);
    }
    // Update counter
    var counter = document.getElementById('question-counter');
    if (counter && current > 0) {
      counter.textContent = 'Question ' + current + ' of ' + total;
    } else if (counter) {
      counter.textContent = '';
    }
  },

  setAnswerButtonsEnabled: function (enabled) {
    this.answerBtns.forEach(function (btn) { if (btn) btn.disabled = !enabled; });
  },

  showGuess: function (character) {
    var emoji = document.getElementById('guess-emoji');
    var name = document.getElementById('guess-name');
    var fact = document.getElementById('guess-fact');
    var card = document.getElementById('guess-card');
    if (emoji) emoji.textContent = character.emoji;
    if (name) name.textContent = character.name;
    if (fact) fact.textContent = character.fact;
    if (card) card.style.background = 'linear-gradient(135deg, ' + character.gradient[0] + ', ' + character.gradient[1] + ')';
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
      JJ.effects.confetti();
      JJ.effects.soundCorrect();
    } else {
      if (icon) icon.textContent = '🔄';
      if (msg) msg.textContent = JJ.messages.incorrect;
      if (detail) detail.textContent = JJ.messages.encourageRetry;
      if (screen) screen.classList.remove('celebration');
      JJ.effects.soundWrong();
    }
  },

  updateMetrics: function (count) {
    var el = document.getElementById('play-count');
    if (el) el.textContent = count;
  },

  setOrbState: function (state) {
    var states = ['idle', 'speaking', 'thinking', 'celebrating'];
    for (var i = 0; i < this.orbEls.length; i++) {
      var el = this.orbEls[i];
      for (var j = 0; j < states.length; j++) {
        el.classList.toggle('orb-' + states[j], states[j] === state);
      }
    }
  }
};
