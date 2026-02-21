<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Junior Jarvis - AI Future Guesser!</title>
    <style>
        body { font-family: 'Arial', sans-serif; background: linear-gradient(to bottom, #001F3F, #007BFF); color: #fff; text-align: center; margin: 0; padding: 20px; }
        #avatar { width: 200px; height: 200px; border-radius: 50%; margin: 20px auto; background: #007BFF; border: 5px solid #00FFFF; animation: glow 2s infinite; }
        @keyframes glow { 0%, 100% { box-shadow: 0 0 20px #00FFFF; } 50% { box-shadow: 0 0 40px #00FFFF; } }
        #question { font-size: 2em; margin: 20px; text-shadow: 2px 2px 4px #000; }
        .buttons { display: flex; justify-content: center; gap: 10px; flex-wrap: wrap; }
        button { padding: 15px 20px; font-size: 1.5em; border: none; border-radius: 50px; cursor: pointer; transition: transform 0.2s; background: #007BFF; color: white; }
        #yes { background: #28A745; } #no { background: #DC3545; } #prob { background: #FFC107; }
        #probn { background: #FD7E14; } #dk { background: #6C757D; }
        button:active { transform: scale(0.95); }
        #guess-img { width: 300px; height: 300px; border-radius: 20px; margin: 20px; box-shadow: 0 0 20px #00FFFF; animation: fadeIn 1s; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        #progress { width: 80%; height: 20px; background: #ddd; margin: 10px auto; border-radius: 10px; }
        #progress-bar { height: 100%; background: #00FFFF; border-radius: 10px; transition: width 0.3s; }
        .hidden { display: none; }
        #win { font-size: 3em; color: #00FFFF; animation: sparkle 1s infinite; }
        @keyframes sparkle { 0%, 100% { text-shadow: 0 0 20px #00FFFF; } 50% { text-shadow: 0 0 40px #00BFFF; } }
    </style>
</head>
<body>
    <h1>🔵 Junior Jarvis 🔵</h1>
    <img id="avatar" src="https://thumbs.dreamstime.com/b/futuristic-ai-assistant-hologram-blue-glowing-orb-representing-advanced-technology-virtual-helper-digital-interface-320147123.jpg" alt="Jarvis Orb">
    <div id="progress"><div id="progress-bar" style="width:0%"></div></div>
    <div id="question">Think of an AI superpower or future job and press Start!</div>
    <div class="buttons">
        <button id="start" onclick="startGame()">Start / Affirmative</button>
    </div>
    <div id="buttons" class="buttons hidden">
        <button id="yes" onclick="answer(1)">Yes 👍</button>
        <button id="no" onclick="answer(0)">No 👎</button>
        <button id="prob" onclick="answer(0.5)">Probably 🤔</button>
        <button id="probn" onclick="answer(-0.5)">Probably Not</button>
        <button id="dk" onclick="answer(null)">Uncertain ❓</button>
    </div>
    <div id="guess" class="hidden">
        <img id="guess-img">
        <div id="guess-text" style="font-size:2em;"></div>
        <div id="fact" style="font-size:1.5em; margin:10px;"></div>
        <button onclick="feedback(true)">Correct! 🎉</button>
        <button onclick="feedback(false)">Incorrect 😔</button>
    </div>
    <button id="restart" class="hidden" onclick="restart()">New Query!</button>

    <script>
        // Data
        const characters = [
            {name: 'Robot Builder 🤖', image: 'https://thumbs.dreamstime.com/b/cartoon-kid-building-robot-fun-illustration-young-child-assembling-colorful-futuristic-playful-learning-concept-322806516.jpg', fact: 'Automation at its finest, building helpful machines!', props: {auto: true, create: true, tech: true, nature: false, art: false, explore: false, health: false, food: false}},
            {name: 'Smart Farmer 🌾', image: 'https://thumbs.dreamstime.com/b/cartoon-smart-farmer-using-ai-tech-farm-illustration-young-holding-tablet-drone-flying-over-crops-321907841.jpg', fact: 'Efficiency in agriculture through AI innovation.', props: {auto: true, create: false, tech: true, nature: true, art: false, explore: false, health: false, food: true}},
            {name: 'Virtual Explorer 🚀', image: 'https://thumbs.dreamstime.com/b/cartoon-kid-virtual-reality-exploring-digital-world-illustration-child-vr-headset-adventuring-futuristic-landscape-322806517.jpg', fact: 'Discovering digital realms with AI guidance.', props: {auto: false, create: true, tech: true, nature: false, art: false, explore: true, health: false, food: false}},
            {name: 'AI Artist 🎨', image: 'https://thumbs.dreamstime.com/b/cartoon-kid-using-ai-to-create-art-illustration-young-child-tablet-generating-colorful-digital-playful-creative-322806518.jpg', fact: 'Creative automation for artistic masterpieces.', props: {auto: true, create: true, tech: true, nature: false, art: true, explore: false, health: false, food: false}},
            {name: 'Health Helper 🩺', image: 'https://thumbs.dreamstime.com/b/cartoon-kid-as-future-doctor-with-ai-tools-illustration-young-child-stethoscope-tablet-medical-robots-playful-322806519.jpg', fact: 'Streamlining health with AI precision.', props: {auto: true, create: false, tech: true, nature: false, art: false, explore: false, health: true, food: false}},
            {name: 'Eco Guardian 🌍', image: 'https://thumbs.dreamstime.com/b/cartoon-kid-as-eco-guardian-with-ai-illustration-young-child-using-tech-protect-nature-drones-monitoring-forests-322806520.jpg', fact: 'Protecting the environment via efficient AI systems.', props: {auto: true, create: false, tech: true, nature: true, art: false, explore: true, health: false, food: false}},
            {name: 'Game Designer 🎮', image: 'https://thumbs.dreamstime.com/b/cartoon-kid-designing-games-with-ai-illustration-young-child-computer-creating-virtual-worlds-playful-gaming-322806521.jpg', fact: 'Designing immersive worlds with AI creativity.', props: {auto: false, create: true, tech: true, nature: false, art: true, explore: true, health: false, food: false}},
            {name: 'Food Inventor 🍎', image: 'https://thumbs.dreamstime.com/b/cartoon-kid-as-food-inventor-with-ai-illustration-young-child-kitchen-using-tech-create-healthy-meals-robots-322806522.jpg', fact: 'Innovating nutrition through automated processes.', props: {auto: true, create: true, tech: true, nature: false, art: false, explore: false, health: true, food: true}}
        ];
        const questions = [
            {q: 'Does it involve automation? (Efficiency boost!)', prop: 'auto'},
            {q: 'Does it require creating new inventions?', prop: 'create'},
            {q: 'Involves advanced technology?', prop: 'tech'},
            {q: 'Connected to nature or the environment?', prop: 'nature'},
            {q: 'Incorporates artistic elements?', prop: 'art'},
            {q: 'Focuses on exploration?', prop: 'explore'},
            {q: 'Aims to improve health?', prop: 'health'},
            {q: 'Related to food production?', prop: 'food'}
        ];

        let possibles = [...characters];
        let currentQ = 0;
        let recognition, synth, voice;
        let gameActive = false;

        // Init
        function initSpeech() {
            synth = window.speechSynthesis;
            speechSynthesis.onvoiceschanged = () => {
                const voices = synth.getVoices();
                voice = voices.find(v => v.lang === 'en-GB' && v.name.toLowerCase().includes('male')) || voices.find(v => v.lang.startsWith('en-'));
            };
            speechSynthesis.getVoices(); // Load voices
        }

        function speak(text) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.voice = voice;
            utterance.rate = 1.1; // Crisp pace
            utterance.pitch = 1.0;
            synth.speak(utterance);
        }

        function startRecognition() {
            recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            recognition.onresult = (e) => {
                const cmd = e.results[0][0].transcript.toLowerCase();
                if (cmd.includes('yes') || cmd.includes('affirmative')) answer(1);
                else if (cmd.includes('no') || cmd.includes('negative')) answer(0);
                else if (cmd.includes('maybe') || cmd.includes('probably')) answer(0.5);
                else if (cmd.includes('dont') || cmd.includes('don\'t') || cmd.includes('uncertain')) answer(null);
            };
            recognition.start();
        }

        function bestQuestion() {
            let best = {split: Infinity, idx: 0};
            questions.forEach((_, i) => {
                const prop = questions[i].prop;
                const yes = possibles.filter(c => c.props[prop]).length;
                const split = Math.abs(yes - (possibles.length - yes));
                if (split < best.split) { best = {split, idx: i}; }
            });
            return best.idx;
        }

        function ask() {
            if (possibles.length <= 1 || currentQ > 20) {
                guess();
                return;
            }
            const qIdx = bestQuestion();
            const q = questions[qIdx].q;
            document.getElementById('question').textContent = q;
            speak(q);
            startRecognition();
            currentQ++;
            document.getElementById('progress-bar').style.width = (currentQ / 20 * 100) + '%';
        }

        function answer(val) {
            recognition.stop();
            let newPoss = possibles;
            if (val === 1 || val === 0) {
                const prop = questions[bestQuestion()].prop;
                newPoss = possibles.filter(c => (c.props[prop] === !!val));
            }
            possibles = newPoss;
            setTimeout(ask, 500);
        }

        function guess() {
            gameActive = false;
            const guessChar = possibles[0] || characters[0]; // Fallback
            document.getElementById('question').classList.add('hidden');
            document.getElementById('buttons').classList.add('hidden');
            document.getElementById('guess-img').src = guessChar.image;
            document.getElementById('guess-text').textContent = `I deduce it's the ${guessChar.name}.`;
            document.getElementById('fact').textContent = guessChar.fact;
            document.getElementById('guess').classList.remove('hidden');
            speak(`I believe it's the ${guessChar.name}. ${guessChar.fact}`);
        }

        function feedback(correct) {
            if (correct) {
                document.getElementById('win').textContent = 'Spot on! You think like an AI hero. 🎊 Ask your parents about our automation services and AI courses for the future!';
                document.body.style.background = 'linear-gradient(to bottom, #00FFFF, #007BFF)';
            } else {
                document.getElementById('win').textContent = 'Not quite. Shall we recalibrate? We specialize in AI efficiencies!';
            }
            document.getElementById('guess').innerHTML += `<div id="win" class="win"></div>`;
            speak(correct ? 'Excellent deduction! Like Jarvis, our company automates businesses and prepares you for AI workplaces.' : 'Adjustment needed. Enhancing protocols!');
            document.getElementById('restart').classList.remove('hidden');
        }

        function startGame() {
            possibles = [...characters];
            currentQ = 0;
            gameActive = true;
            document.getElementById('question').classList.remove('hidden');
            document.getElementById('buttons').classList.remove('hidden');
            document.getElementById('start').classList.add('hidden');
            document.getElementById('progress-bar').style.width = '0%';
            document.getElementById('guess').classList.add('hidden');
            document.getElementById('restart').classList.add('hidden');
            speak("Very well. Initial query incoming...");
            setTimeout(ask, 1500);
        }

        function restart() {
            location.reload();
        }

        initSpeech();
    </script>
</body>
</html>