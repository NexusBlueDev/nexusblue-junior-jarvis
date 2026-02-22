/**
 * Junior Jarvis — Character & Question Data
 * Source of truth for all game content.
 *
 * AI-First Design: This static dataset serves as the offline fallback.
 * When an AI provider is configured, the engine can dynamically generate
 * questions and evaluate answers using natural language understanding.
 *
 * v7 — Conversational questions, fun facts. 12 questions (not 8).
 * Skewed properties (nature, art, physical, people) get 2 questions
 * from different angles for better signal. Min 5 questions before guess.
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
    fact: 'AI Planners are the big idea people! They figure out how to use AI to make life better for everyone.',
    gradient: ['#7C4DFF', '#311B92'],
    props: { strategy: true, create: false, robots: false, nature: false, art: false, people: true, physical: false, explore: false }
  },
  {
    id: 'smart-factory-creator',
    name: 'The Robot Maker',
    emoji: '🏭',
    fact: 'Robot Makers bring robots to life! They build the coolest machines — robot arms, drones, things you can actually hold.',
    gradient: ['#546E7A', '#263238'],
    props: { strategy: false, create: true, robots: true, nature: false, art: false, people: false, physical: true, explore: false }
  },
  {
    id: 'ai-artist',
    name: 'The AI Artist',
    emoji: '🎨',
    fact: 'AI Artists make the wildest art, music, and movies you\'ve ever seen — all with a little help from AI!',
    gradient: ['#EF5350', '#F9A825'],
    props: { strategy: false, create: true, robots: false, nature: false, art: true, people: false, physical: false, explore: false }
  },
  {
    id: 'space-pioneer',
    name: 'The Space Explorer',
    emoji: '🚀',
    fact: 'Space Explorers are on a mission! They send robots to Mars, plan trips to the stars, and discover what\'s out there.',
    gradient: ['#AB47BC', '#4A148C'],
    props: { strategy: true, create: false, robots: true, nature: true, art: false, people: false, physical: false, explore: true }
  },
  {
    id: 'biotech-healer',
    name: 'The Robot Doctor',
    emoji: '🧬',
    fact: 'Robot Doctors are like science wizards! They build teeny tiny robots that sneak into your body and help you feel better.',
    gradient: ['#42A5F5', '#1565C0'],
    props: { strategy: false, create: true, robots: true, nature: false, art: false, people: true, physical: false, explore: false }
  },
  {
    id: 'planet-guardian',
    name: 'The Earth Saver',
    emoji: '🌍',
    fact: 'Earth Savers are nature\'s heroes! They come up with big plans, travel to wild places, and keep our planet and people safe.',
    gradient: ['#26A69A', '#00695C'],
    props: { strategy: true, create: false, robots: false, nature: true, art: false, people: true, physical: false, explore: true }
  },
  {
    id: 'virtual-world-builder',
    name: 'The World Builder',
    emoji: '🌌',
    fact: 'World Builders are the ultimate creators! They use robots, art, and AI to build whole new worlds you can jump into and explore.',
    gradient: ['#5C6BC0', '#1A237E'],
    props: { strategy: false, create: true, robots: true, nature: false, art: true, people: false, physical: false, explore: true }
  },
  {
    id: 'quantum-inventor',
    name: 'The Super Inventor',
    emoji: '⚡',
    fact: 'Super Inventors do it ALL! They dream up big ideas, build robots and gadgets, and go on adventures to test what they make.',
    gradient: ['#FFA726', '#E65100'],
    props: { strategy: true, create: true, robots: true, nature: false, art: false, people: false, physical: true, explore: true }
  }
];

JJ.questions = [
  { id: 'strategy',   text: 'Does it boss other people or robots around?',              hint: 'Like telling everyone what to do!',              prop: 'strategy' },
  { id: 'create',     text: 'Does it make stuff that never existed before?',             hint: 'Inventing something totally brand new!',          prop: 'create' },
  { id: 'robots',     text: 'Are robots a big part of it?',                              hint: 'Machines doing the heavy lifting!',               prop: 'robots' },
  { id: 'nature_a',   text: 'Does it spend a lot of time outside or in space?',          hint: 'Not stuck inside all day!',                       prop: 'nature' },
  { id: 'nature_b',   text: 'Would it care about saving the planet or the stars?',       hint: 'The environment or outer space!',                 prop: 'nature' },
  { id: 'art_a',      text: 'Could it make a song or a painting?',                       hint: 'Like music, art, or movies!',                     prop: 'art' },
  { id: 'art_b',      text: 'Would it feel at home in an art class?',                    hint: 'Creative stuff, not just math and science!',       prop: 'art' },
  { id: 'people_a',   text: 'Is helping people its main thing?',                         hint: 'Like a helper or a doctor!',                      prop: 'people' },
  { id: 'people_b',   text: 'Does it work with people all day?',                         hint: 'Listening and solving problems for someone!',      prop: 'people' },
  { id: 'physical_a', text: 'Could you pick up what it makes and take it home?',         hint: 'Real stuff you can touch and hold!',               prop: 'physical' },
  { id: 'physical_b', text: 'Does it build real things, not just stuff on a screen?',    hint: 'Like a gadget you could break if you dropped it!', prop: 'physical' },
  { id: 'explore',    text: 'Is going somewhere new part of the adventure?',              hint: 'Exploring somewhere nobody has been!',             prop: 'explore' }
];

JJ.messages = {
  welcome:       'Hi! I\'m Junior Jarvis! ' +
                 'Pick one of these cool AI jobs in your head. ' +
                 'Click a card if you want to learn more! ' +
                 'I\'ll ask you some questions and try to guess which one you picked. Ready?',
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
