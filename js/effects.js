/**
 * Junior Jarvis — Visual Effects
 * Floating particles background and confetti celebration.
 */
var JJ = window.JJ || {};

JJ.effects = {

  init: function () {
    this.createParticles(25);
  },

  /**
   * Create floating particle elements in the background.
   * Cyan/blue glowing dots that drift upward continuously.
   */
  createParticles: function (count) {
    var container = document.createElement('div');
    container.className = 'particles';

    for (var i = 0; i < count; i++) {
      var p = document.createElement('div');
      p.className = 'particle';
      p.style.left = (Math.random() * 100) + '%';
      p.style.animationDuration = (6 + Math.random() * 10) + 's';
      p.style.animationDelay = (Math.random() * 10) + 's';

      var size = 2 + Math.random() * 5;
      p.style.width = size + 'px';
      p.style.height = size + 'px';

      // Mix of cyan, blue, and white particles
      var colors = [
        'rgba(0, 255, 255, 0.6)',
        'rgba(0, 191, 255, 0.5)',
        'rgba(100, 200, 255, 0.4)',
        'rgba(255, 255, 255, 0.3)'
      ];
      p.style.background = colors[Math.floor(Math.random() * colors.length)];

      container.appendChild(p);
    }

    document.body.insertBefore(container, document.body.firstChild);
  },

  /**
   * Burst confetti from center of screen for celebration.
   */
  confetti: function () {
    var container = document.createElement('div');
    container.className = 'confetti-container';

    var colors = ['#00FFFF', '#FFD700', '#FF6B6B', '#00FF88', '#FF69B4', '#7B68EE', '#FFA500'];

    for (var i = 0; i < 40; i++) {
      var piece = document.createElement('div');
      piece.className = 'confetti-piece';

      var color = colors[Math.floor(Math.random() * colors.length)];
      piece.style.background = color;
      piece.style.left = (40 + Math.random() * 20) + '%';
      piece.style.animationDelay = (Math.random() * 0.5) + 's';
      piece.style.animationDuration = (1 + Math.random() * 1.5) + 's';

      // Random rotation and direction
      var angle = (Math.random() * 360);
      var dist = 100 + Math.random() * 200;
      piece.style.setProperty('--confetti-x', (Math.cos(angle) * dist) + 'px');
      piece.style.setProperty('--confetti-y', (-50 - Math.random() * 300) + 'px');
      piece.style.setProperty('--confetti-r', (Math.random() * 720 - 360) + 'deg');

      container.appendChild(piece);
    }

    document.body.appendChild(container);

    // Clean up after animation completes
    setTimeout(function () {
      if (container.parentNode) container.parentNode.removeChild(container);
    }, 3000);
  }
};
