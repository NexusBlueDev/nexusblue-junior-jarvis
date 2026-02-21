/**
 * Junior Jarvis — Character & Question Data
 * Source of truth for all game content.
 *
 * AI-First Design: This static dataset serves as the offline fallback.
 * When an AI provider is configured, the engine can dynamically generate
 * questions and evaluate answers using natural language understanding.
 *
 * v4 — Forward-thinking AI roles: strategy, manufacturing, creation, exploration.
 * Each character has a unique property combination (min 2 diffs between any pair).
 *
 * Property matrix:
 *   strategy create robots nature art people physical explore
 * 1    T       F      F      F     F     T      F       F     AI Strategist
 * 2    F       T      T      F     F     F      T       F     Smart Factory Creator
 * 3    F       T      F      F     T     F      F       F     AI Artist
 * 4    T       F      T      T     F     F      F       T     Space Pioneer
 * 5    F       T      T      F     F     T      F       F     Bio-Tech Healer
 * 6    T       F      F      T     F     T      F       T     Planet Guardian
 * 7    F       T      T      F     T     F      F       T     Virtual World Builder
 * 8    T       T      T      F     F     F      T       T     Quantum Inventor
 */
var JJ = window.JJ || {};

JJ.characters = [
  {
    id: 'ai-strategist',
    name: 'AI Strategist',
    emoji: '🧠',
    fact: 'AI Strategists are the masterminds who figure out how AI can change the world! They make big plans, solve impossible puzzles, and help everyone use AI wisely.',
    gradient: ['#7C4DFF', '#311B92'],
    props: { strategy: true, create: false, robots: false, nature: false, art: false, people: true, physical: false, explore: false }
  },
  {
    id: 'smart-factory-creator',
    name: 'Smart Factory Creator',
    emoji: '🏭',
    fact: 'Smart Factory Creators build the factories of the future! Imagine a place where robots, 3D printers, and AI work together to build anything — from flying cars to space stations.',
    gradient: ['#546E7A', '#263238'],
    props: { strategy: false, create: true, robots: true, nature: false, art: false, people: false, physical: true, explore: false }
  },
  {
    id: 'ai-artist',
    name: 'AI Artist',
    emoji: '🎨',
    fact: 'AI Artists create mind-blowing art, music, and movies that nobody has ever seen! They team up with AI to imagine and create things beyond anyone\'s wildest dreams.',
    gradient: ['#EF5350', '#F9A825'],
    props: { strategy: false, create: true, robots: false, nature: false, art: true, people: false, physical: false, explore: false }
  },
  {
    id: 'space-pioneer',
    name: 'Space Pioneer',
    emoji: '🚀',
    fact: 'Space Pioneers use AI robots to explore the universe! They send smart rovers to Mars, plan missions to distant stars, and dream up humanity\'s future among the galaxies.',
    gradient: ['#AB47BC', '#4A148C'],
    props: { strategy: true, create: false, robots: true, nature: true, art: false, people: false, physical: false, explore: true }
  },
  {
    id: 'biotech-healer',
    name: 'Bio-Tech Healer',
    emoji: '🧬',
    fact: 'Bio-Tech Healers use tiny AI-powered nano-robots to cure diseases! Imagine robots smaller than a cell fixing your body from the inside — that\'s the future of medicine!',
    gradient: ['#42A5F5', '#1565C0'],
    props: { strategy: false, create: true, robots: true, nature: false, art: false, people: true, physical: false, explore: false }
  },
  {
    id: 'planet-guardian',
    name: 'Planet Guardian',
    emoji: '🌍',
    fact: 'Planet Guardians protect Earth using AI! They track endangered animals with smart drones, clean up oceans with robot ships, and plan clever strategies to fight climate change.',
    gradient: ['#26A69A', '#00695C'],
    props: { strategy: true, create: false, robots: false, nature: true, art: false, people: true, physical: false, explore: true }
  },
  {
    id: 'virtual-world-builder',
    name: 'Virtual World Builder',
    emoji: '🌌',
    fact: 'Virtual World Builders create entire digital universes you can step into! Using VR headsets and AI, they design worlds so real you can\'t tell the difference — and you explore them with friends.',
    gradient: ['#5C6BC0', '#1A237E'],
    props: { strategy: false, create: true, robots: true, nature: false, art: true, people: false, physical: false, explore: true }
  },
  {
    id: 'quantum-inventor',
    name: 'Quantum Inventor',
    emoji: '⚡',
    fact: 'Quantum Inventors build tomorrow\'s technology today! Quantum computers, teleportation devices, and gadgets straight out of science fiction — they turn the impossible into reality.',
    gradient: ['#FFA726', '#E65100'],
    props: { strategy: true, create: true, robots: true, nature: false, art: false, people: false, physical: true, explore: true }
  }
];

JJ.questions = [
  { id: 'strategy', text: 'Does your AI superpower involve making big plans and strategies?',    hint: 'Like planning how to change the world!',            prop: 'strategy' },
  { id: 'create',   text: 'Does it involve building or creating brand new things?',              hint: 'Making or inventing something totally new!',         prop: 'create' },
  { id: 'robots',   text: 'Does it involve working with robots?',                                hint: 'Robots helping do cool and amazing tasks!',          prop: 'robots' },
  { id: 'nature',   text: 'Is it connected to nature, the planet, or outer space?',              hint: 'The Earth, animals, oceans, or the stars!',          prop: 'nature' },
  { id: 'art',      text: 'Does it involve art, design, or being super creative?',               hint: 'Drawing, designing, or making beautiful things!',    prop: 'art' },
  { id: 'people',   text: 'Does it directly help or take care of people?',                       hint: 'Making sure people are healthy, happy, or safe!',    prop: 'people' },
  { id: 'physical', text: 'Does it make real physical things you can touch?',                     hint: 'Things you can actually hold in your hands!',        prop: 'physical' },
  { id: 'explore',  text: 'Is it about exploring or discovering new places?',                     hint: 'Going on adventures and discovering the unknown!',   prop: 'explore' }
];

JJ.messages = {
  welcome:       'Hey there, future superstar! I\'m Junior Jarvis, your friendly AI buddy! ' +
                 'Pick one of these amazing AI superpowers in your head. ' +
                 'I\'ll ask you some yes or no questions, and try to guess what you\'re thinking! ' +
                 'Just tap the buttons to answer. Ready? Let\'s go!',
  start:         'Awesome! Let me put on my thinking cap. Here comes my first question!',
  guessPrefix:   'I think I know! Is it... ',
  correct:       'I knew it! High five — you\'re a natural AI thinker!',
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
