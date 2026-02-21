/**
 * Junior Jarvis — Character & Question Data
 * Source of truth for all game content.
 *
 * AI-First Design: This static dataset serves as the offline fallback.
 * When an AI provider is configured, the engine can dynamically generate
 * questions and evaluate answers using natural language understanding.
 */
var JJ = window.JJ || {};

JJ.characters = [
  {
    id: 'robot-builder',
    name: 'Robot Builder',
    emoji: '🤖',
    fact: 'Robot Builders design and build helpful machines! They teach robots to do amazing things like assembling cars, exploring space, and even helping around the house.',
    gradient: ['#78909C', '#455A64'],
    props: { auto: true, create: true, tech: true, nature: false, art: false, explore: false, health: false, food: false }
  },
  {
    id: 'smart-farmer',
    name: 'Smart Farmer',
    emoji: '🌾',
    fact: 'Smart Farmers use drones and sensors to grow food more efficiently! AI helps them know exactly when to water plants and keep crops healthy.',
    gradient: ['#66BB6A', '#2E7D32'],
    props: { auto: true, create: false, tech: false, nature: true, art: false, explore: false, health: false, food: true }
  },
  {
    id: 'virtual-explorer',
    name: 'Virtual Explorer',
    emoji: '🚀',
    fact: 'Virtual Explorers travel to incredible digital worlds using VR headsets! AI creates amazing places to discover — from the bottom of the ocean to the surface of Mars.',
    gradient: ['#AB47BC', '#4A148C'],
    props: { auto: false, create: true, tech: true, nature: false, art: false, explore: true, health: false, food: false }
  },
  {
    id: 'ai-artist',
    name: 'AI Artist',
    emoji: '🎨',
    fact: 'AI Artists use computers to create incredible artwork! They combine their imagination with AI tools to make paintings, animations, and designs nobody has ever seen before.',
    gradient: ['#EF5350', '#F9A825'],
    props: { auto: true, create: true, tech: false, nature: false, art: true, explore: false, health: false, food: false }
  },
  {
    id: 'health-helper',
    name: 'Health Helper',
    emoji: '🩺',
    fact: 'Health Helpers use AI to keep people healthy! Smart computers can spot problems early, help doctors find cures, and make sure everyone gets the best care possible.',
    gradient: ['#42A5F5', '#1565C0'],
    props: { auto: true, create: false, tech: false, nature: false, art: false, explore: false, health: true, food: false }
  },
  {
    id: 'eco-guardian',
    name: 'Eco Guardian',
    emoji: '🌍',
    fact: 'Eco Guardians protect our planet with AI! They use smart drones and sensors to watch over forests, track endangered animals, and keep our oceans clean.',
    gradient: ['#26A69A', '#00695C'],
    props: { auto: true, create: false, tech: false, nature: true, art: false, explore: true, health: false, food: false }
  },
  {
    id: 'game-designer',
    name: 'Game Designer',
    emoji: '🎮',
    fact: 'Game Designers create the video games you love to play! With AI, they can build worlds that change and react to every player differently. How cool is that?',
    gradient: ['#EC407A', '#7B1FA2'],
    props: { auto: false, create: true, tech: true, nature: false, art: true, explore: false, health: false, food: false }
  },
  {
    id: 'food-inventor',
    name: 'Food Inventor',
    emoji: '🍎',
    fact: 'Food Inventors use AI to create yummy new recipes and healthy meals! Smart kitchens with robot helpers can cook food that is both delicious and good for you.',
    gradient: ['#FFA726', '#E65100'],
    props: { auto: true, create: true, tech: false, nature: false, art: false, explore: false, health: true, food: true }
  }
];

JJ.questions = [
  { id: 'auto',    text: 'Does your superpower make things work automatically?', hint: 'Like machines doing jobs on their own!', prop: 'auto' },
  { id: 'create',  text: 'Does it involve building or creating new things?',      hint: 'Inventing or making something brand new!', prop: 'create' },
  { id: 'tech',    text: 'Does it use computers, robots, or cool gadgets?',       hint: 'Technology and high-tech tools!', prop: 'tech' },
  { id: 'nature',  text: 'Is it connected to nature or the outdoors?',            hint: 'Plants, animals, forests, or the sky!', prop: 'nature' },
  { id: 'art',     text: 'Does it involve art, music, or being creative?',        hint: 'Drawing, designing, or making things look awesome!', prop: 'art' },
  { id: 'explore', text: 'Is it about going on adventures and exploring?',        hint: 'Discovering new places and exciting things!', prop: 'explore' },
  { id: 'health',  text: 'Does it help people stay healthy and feel good?',       hint: 'Helping doctors or keeping people strong!', prop: 'health' },
  { id: 'food',    text: 'Is it about food — growing it, cooking it, or inventing new meals?', hint: 'Yummy food and smart kitchens!', prop: 'food' }
];

JJ.messages = {
  welcome:       'Hey there, future superstar! I\'m Junior Jarvis, your friendly AI buddy! ' +
                 'Here\'s how we play: think of a cool AI superpower or a future job that uses artificial intelligence. ' +
                 'I\'ll ask you some yes or no questions, and try to guess what you\'re thinking! ' +
                 'You can say your answer out loud, or just tap the buttons. Ready? Let\'s go!',
  start:         'Awesome! Let me put on my thinking cap. Here comes my first question!',
  guessPrefix:   'Oh oh oh, I think I know! Is it... ',
  correct:       'Woohoo, I got it! High five — you\'re a natural AI thinker!',
  correctDetail: 'That was so much fun! Ask your parents about NexusBlue\'s awesome AI courses — you could learn to build cool stuff like this!',
  incorrect:     'Aw, I didn\'t get it this time! But that\'s okay — even the best AI learns from its mistakes!',
  encourageRetry:'Want to play again? I bet I\'ll figure it out next round!',
  thinking:      'Hmm, let me think about that...'
};

/**
 * AI Provider Configuration (AI-First Design)
 * When configured, the engine uses AI for dynamic questioning.
 * Falls back to static decision tree when offline or unconfigured.
 */
JJ.aiConfig = {
  enabled: false,
  provider: null,
  endpoint: null,
  apiKey: null,
  model: null,
  systemPrompt: 'You are Junior Jarvis, a friendly AI buddy helping children aged 6-12 guess AI-related future jobs. Ask yes/no questions to narrow down which role they are thinking of. Be warm, encouraging, and fun. Use simple words. Keep responses under 2 sentences.'
};
