/**
 * Junior Jarvis — Character & Question Data
 * Source of truth for all game content.
 *
 * AI-First Design: This static dataset serves as the offline fallback.
 * When an AI provider is configured, the engine can dynamically generate
 * questions and evaluate answers using natural language understanding.
 *
 * v6 — 3rd-grade hardened. Concrete questions, keyword-matched facts.
 * Each fact uses the EXACT trigger words from the questions so kids
 * who read the card know how to answer. Names telegraph top properties.
 *
 * Property matrix (min 2 diffs between any pair):
 *   strategy create robots nature art people physical explore
 * 1    T       F      F      F     F     T      F       F     The AI Planner
 * 2    F       T      T      F     F     F      T       F     The Robot Maker
 * 3    F       T      F      F     T     F      F       F     The AI Artist
 * 4    T       F      T      T     F     F      F       T     The Space Explorer
 * 5    F       T      T      F     F     T      F       F     The Robot Doctor
 * 6    T       F      F      T     F     T      F       T     The Earth Saver
 * 7    F       T      T      F     T     F      F       T     The World Builder
 * 8    T       T      T      F     F     F      T       T     The Super Inventor
 */
var JJ = window.JJ || {};

JJ.characters = [
  {
    id: 'ai-strategist',
    name: 'The AI Planner',
    emoji: '🧠',
    fact: 'AI Planners make plans to help people do things better! They use AI to solve big problems for everyone.',
    gradient: ['#7C4DFF', '#311B92'],
    props: { strategy: true, create: false, robots: false, nature: false, art: false, people: true, physical: false, explore: false }
  },
  {
    id: 'smart-factory-creator',
    name: 'The Robot Maker',
    emoji: '🏭',
    fact: 'Robot Makers build new robots and gadgets you can hold! They make real machines like robot arms and drones.',
    gradient: ['#546E7A', '#263238'],
    props: { strategy: false, create: true, robots: true, nature: false, art: false, people: false, physical: true, explore: false }
  },
  {
    id: 'ai-artist',
    name: 'The AI Artist',
    emoji: '🎨',
    fact: 'AI Artists build new art, music, and movies with AI! They dream up things nobody has ever seen before.',
    gradient: ['#EF5350', '#F9A825'],
    props: { strategy: false, create: true, robots: false, nature: false, art: true, people: false, physical: false, explore: false }
  },
  {
    id: 'space-pioneer',
    name: 'The Space Explorer',
    emoji: '🚀',
    fact: 'Space Explorers make plans and send robots to outer space! They explore new places like Mars and the stars.',
    gradient: ['#AB47BC', '#4A148C'],
    props: { strategy: true, create: false, robots: true, nature: true, art: false, people: false, physical: false, explore: true }
  },
  {
    id: 'biotech-healer',
    name: 'The Robot Doctor',
    emoji: '🧬',
    fact: 'Robot Doctors build new tiny robots that help people feel better! It\'s like magic medicine from the future.',
    gradient: ['#42A5F5', '#1565C0'],
    props: { strategy: false, create: true, robots: true, nature: false, art: false, people: true, physical: false, explore: false }
  },
  {
    id: 'planet-guardian',
    name: 'The Earth Saver',
    emoji: '🌍',
    fact: 'Earth Savers make plans to help people and protect our planet! They explore new places like forests and oceans.',
    gradient: ['#26A69A', '#00695C'],
    props: { strategy: true, create: false, robots: false, nature: true, art: false, people: true, physical: false, explore: true }
  },
  {
    id: 'virtual-world-builder',
    name: 'The World Builder',
    emoji: '🌌',
    fact: 'World Builders use robots and art to build new places you can explore! Put on goggles and jump into a new world.',
    gradient: ['#5C6BC0', '#1A237E'],
    props: { strategy: false, create: true, robots: true, nature: false, art: true, people: false, physical: false, explore: true }
  },
  {
    id: 'quantum-inventor',
    name: 'The Super Inventor',
    emoji: '⚡',
    fact: 'Super Inventors make plans and build new robots and gadgets you can hold! They explore new places to test what they make.',
    gradient: ['#FFA726', '#E65100'],
    props: { strategy: true, create: true, robots: true, nature: false, art: false, people: false, physical: true, explore: true }
  }
];

JJ.questions = [
  { id: 'strategy', text: 'Does it make plans?',                              hint: 'Like planning what to do!',                   prop: 'strategy' },
  { id: 'create',   text: 'Does it build new things?',                        hint: 'Like making something brand new!',             prop: 'create' },
  { id: 'robots',   text: 'Does it use robots?',                              hint: 'Robots that help with the work!',              prop: 'robots' },
  { id: 'nature',   text: 'Does it help the Earth or go to outer space?',     hint: 'The planet, animals, or the stars!',           prop: 'nature' },
  { id: 'art',      text: 'Does it make art, music, or movies?',              hint: 'Like painting, drawing, or songs!',            prop: 'art' },
  { id: 'people',   text: 'Does it help people?',                             hint: 'Like keeping people safe or healthy!',          prop: 'people' },
  { id: 'physical', text: 'Does it make gadgets you can hold in your hands?',  hint: 'Real stuff like machines or tools!',           prop: 'physical' },
  { id: 'explore',  text: 'Does it explore new places?',                      hint: 'Like going somewhere far away!',                prop: 'explore' }
];

JJ.messages = {
  welcome:       'Hi! I\'m Junior Jarvis! ' +
                 'Pick one of these cool AI jobs in your head. ' +
                 'I\'ll ask you some questions and try to guess which one you picked! ' +
                 'Just tap the buttons to answer. Ready?',
  start:         'OK, here we go! Here\'s my first question!',
  guessPrefix:   'I think I know! Is it... ',
  correct:       'Yay! I got it! High five!',
  correctDetail: 'That was fun! Ask your mom or dad about NexusBlue — you can learn more cool AI stuff!',
  incorrect:     'Oops! I didn\'t get it. But that\'s OK — even AI makes mistakes!',
  encourageRetry:'Want to play again? I bet I can get it next time!',
  thinking:      'Hmm, let me think...'
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
  systemPrompt: 'You are Junior Jarvis, a friendly AI buddy helping kids guess AI jobs at a NexusBlue booth. Ask yes/no questions to figure out which one they picked. Be nice and fun. Use easy words a 3rd grader would know. Keep answers to 1-2 short sentences. The jobs are all about how AI helps people, businesses, and the world.'
};
