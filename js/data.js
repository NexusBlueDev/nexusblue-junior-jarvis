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
    fact: 'Automation at its finest — building helpful machines that work alongside humans!',
    gradient: ['#78909C', '#455A64'],
    props: { auto: true, create: true, tech: true, nature: false, art: false, explore: false, health: false, food: false }
  },
  {
    id: 'smart-farmer',
    name: 'Smart Farmer',
    emoji: '🌾',
    fact: 'Efficiency in agriculture — AI drones and sensors help grow more food with less waste!',
    gradient: ['#66BB6A', '#2E7D32'],
    props: { auto: true, create: false, tech: false, nature: true, art: false, explore: false, health: false, food: true }
  },
  {
    id: 'virtual-explorer',
    name: 'Virtual Explorer',
    emoji: '🚀',
    fact: 'Discovering digital realms — VR and AI open worlds we could never visit before!',
    gradient: ['#AB47BC', '#4A148C'],
    props: { auto: false, create: true, tech: true, nature: false, art: false, explore: true, health: false, food: false }
  },
  {
    id: 'ai-artist',
    name: 'AI Artist',
    emoji: '🎨',
    fact: 'Creative automation — AI helps artists imagine and create things never seen before!',
    gradient: ['#EF5350', '#F9A825'],
    props: { auto: true, create: true, tech: false, nature: false, art: true, explore: false, health: false, food: false }
  },
  {
    id: 'health-helper',
    name: 'Health Helper',
    emoji: '🩺',
    fact: 'Streamlining health — AI spots patterns that help doctors keep everyone healthy!',
    gradient: ['#42A5F5', '#1565C0'],
    props: { auto: true, create: false, tech: false, nature: false, art: false, explore: false, health: true, food: false }
  },
  {
    id: 'eco-guardian',
    name: 'Eco Guardian',
    emoji: '🌍',
    fact: 'Protecting the planet — AI monitors forests, oceans, and wildlife to keep Earth safe!',
    gradient: ['#26A69A', '#00695C'],
    props: { auto: true, create: false, tech: false, nature: true, art: false, explore: true, health: false, food: false }
  },
  {
    id: 'game-designer',
    name: 'Game Designer',
    emoji: '🎮',
    fact: 'Designing immersive worlds — AI helps create games that adapt to every player!',
    gradient: ['#EC407A', '#7B1FA2'],
    props: { auto: false, create: true, tech: true, nature: false, art: true, explore: false, health: false, food: false }
  },
  {
    id: 'food-inventor',
    name: 'Food Inventor',
    emoji: '🍎',
    fact: 'Innovating nutrition — AI recipes and smart kitchens make healthy eating easy and fun!',
    gradient: ['#FFA726', '#E65100'],
    props: { auto: true, create: true, tech: false, nature: false, art: false, explore: false, health: true, food: true }
  }
];

JJ.questions = [
  { id: 'auto',    text: 'Does it involve automation?',            hint: 'Making things work by themselves!', prop: 'auto' },
  { id: 'create',  text: 'Does it require creating new things?',   hint: 'Inventing or building something new!', prop: 'create' },
  { id: 'tech',    text: 'Does it use advanced technology?',       hint: 'Computers, robots, or gadgets!', prop: 'tech' },
  { id: 'nature',  text: 'Is it connected to nature?',             hint: 'Plants, animals, or the outdoors!', prop: 'nature' },
  { id: 'art',     text: 'Does it involve art or creativity?',     hint: 'Drawing, music, or design!', prop: 'art' },
  { id: 'explore', text: 'Does it focus on exploring new places?', hint: 'Adventures and discovery!', prop: 'explore' },
  { id: 'health',  text: 'Does it help people stay healthy?',      hint: 'Doctors, medicine, or fitness!', prop: 'health' },
  { id: 'food',    text: 'Is it related to food?',                 hint: 'Growing, cooking, or inventing food!', prop: 'food' }
];

JJ.messages = {
  welcome:       'Greetings, young inventor. Think of an AI superpower or future job — and I shall deduce your choice. Shall we begin?',
  start:         'Very well. Initial query incoming.',
  guessPrefix:   'Analyzing data... I believe your answer is: ',
  correct:       'Spot on! You think like a true AI hero!',
  correctDetail: 'Ask your parents about NexusBlue\'s automation services and AI-readiness courses for the future!',
  incorrect:     'Hmm, not quite right. Shall we recalibrate and try again?',
  encourageRetry:'My circuits are warming up — I\'ll get it next time!',
  thinking:      'Processing... one moment please.'
};

/**
 * AI Provider Configuration (AI-First Design)
 * When configured, the engine uses AI for dynamic questioning.
 * Falls back to static decision tree when offline or unconfigured.
 */
JJ.aiConfig = {
  enabled: false,
  provider: null,   // 'claude' | 'openai' | null
  endpoint: null,
  apiKey: null,      // Set via environment, never hardcoded
  model: null,
  systemPrompt: 'You are Junior Jarvis, a friendly AI assistant helping children guess AI-related future jobs. Ask yes/no questions to narrow down which role they are thinking of. Be encouraging, witty, and educational. Keep responses under 2 sentences.'
};
