// Game Data
const INITIAL_STATE = {
    scene: 'intro',
    clientConfidence: 50,
    clientRage: 20,
    evidence: [],
    dialogueIndex: 0
};

const CHARACTERS = {
    host: {
        name: "You (The Host)", color: "text-pink-400", avatar: "🕵️‍♀️", expressions: {
            default: "🕵️‍♀️",
            judging: "😒",
            snarky: "🤨",
            sassy: "💅",
            shocked: "😱",
            royal: "👑",
            tea: "☕",
            sideeye: "👀",
            done: "😑"
        }
    },
    client: { name: "Jessica", color: "text-cyan-300", avatar: "👩🏽" },
    pi: { name: "Rico (P.I.)", color: "text-green-400", avatar: "🕶️" },
    cheater: { name: "Marcus", color: "text-red-400", avatar: "👨🏾" },
    lover: { name: "The Assistant", color: "text-yellow-400", avatar: "👱‍♀️" }
};

const STORY = {
    intro: {
        bg: "bg-slate-900",
        lines: [
            { speaker: "host", text: "Another night, another broken heart in the city.", expression: "default" },
            { speaker: "host", text: "Welcome to The War Room. We don't serve coffee here. We serve the truth.", expression: "tea" },
            { speaker: "host", text: "My 9:00 PM appointment is here. Jessica. Says her husband starts acting weird every time the rent is due.", expression: "sideeye" }
        ],
        next: 'interview_start'
    },
    interview_start: {
        bg: "bg-slate-800",
        lines: [
            { speaker: "client", text: "Thanks for seeing me. I feel crazy. Maybe I am crazy?" },
            { speaker: "host", text: "You're not crazy until the evidence says you are. Tell me about Marcus.", expression: "default" },
            { speaker: "client", text: "He's a 'consultant'. Lately, he has these late-night strategy meetings. But when he comes home, he smells like... cupcakes. Cheap vanilla cupcakes." }
        ],
        choices: [
            { text: "Valid suspicion. Men don't smell like baked goods by accident.", effect: { rage: 10, conf: 10 }, next: 'interview_details' },
            { text: "Let's not jump to conclusions. Does he work at a bakery?", effect: { rage: -10, conf: -5 }, next: 'interview_doubt' }
        ]
    },
    interview_doubt: {
        lines: [
            { speaker: "client", text: "No! He works in finance! Why would a finance guy smell like frosting at 2 AM?" },
            { speaker: "host", text: "Okay, look at me. I needed to see your conviction. Stop crying, fix your mascara. Let's work.", expression: "sassy" }
        ],
        next: 'investigation_brief'
    },
    interview_details: {
        lines: [
            { speaker: "client", text: "Exactly! And he hid his phone in the bread box yesterday. Who does that?" },
            { speaker: "host", text: "Someone with crumbs to hide. We're going to catch him.", expression: "snarky" }
        ],
        next: 'investigation_brief'
    },
    investigation_brief: {
        bg: "bg-gray-900",
        lines: [
            { speaker: "pi", text: "Alright boss. I'm on the field. Marcus just left the house. He's in his black sedan." },
            { speaker: "host", text: "Jessica, we have limited resources tonight. How do you want Rico to play this?", expression: "default" }
        ],
        choices: [
            { text: "Tail him closely. I want to know where he goes.", type: 'risk_low', next: 'investigation_location' },
            { text: "Clone his phone signal first. I want to see his texts.", type: 'risk_high', next: 'investigation_digital' }
        ]
    },
    investigation_location: {
        lines: [
            { speaker: "pi", text: "I'm on him. He's pulling into... 'The Velvet Lounge'. Classy place." },
            { speaker: "pi", text: "Wait. He's not going inside. He's meeting someone in the parking lot." },
            { speaker: "host", text: "Get the long lens, Rico. Zoom in on the audacity.", expression: "done" }
        ],
        evidence: "Photo of Parking Lot Hug",
        next: 'investigation_action'
    },
    investigation_digital: {
        lines: [
            { speaker: "pi", text: "Got into his cloud. Oof. Boss, you gotta see this text thread." },
            { speaker: "pi", text: "Contact name is 'State Farm Agent'. Message says: 'Wear the blue boxers ;)'. " },
            { speaker: "client", text: "We don't even have State Farm!!" },
            { speaker: "host", text: "Since when does insurance care about your underwear? Please.", expression: "judging" }
        ],
        evidence: "Text Log: 'State Farm Agent'",
        next: 'investigation_action'
    },
    investigation_action: {
        lines: [
            { speaker: "pi", text: "Target is moving. They are heading to a 24-hour diner downtown." },
            { speaker: "host", text: "The classic spot. Okay Jessica, we have enough to know he's lying. But do we want the kill shot?", expression: "default" }
        ],
        choices: [
            { text: "Send Rico inside with a hidden camera.", effect: { rage: 20 }, next: 'investigation_result_aggressive' },
            { text: "Just document their arrival and exit. Play it safe.", effect: { conf: 10 }, next: 'investigation_result_passive' }
        ]
    },
    investigation_result_aggressive: {
        lines: [
            { speaker: "pi", text: "I'm in the booth behind them. Audio is crystal clear. He's telling her he's 'separated' and his wife is 'hard to live with'." },
            { speaker: "client", text: "HARD TO LIVE WITH? I PAID FOR HIS CAR!" },
            { speaker: "host", text: "The audacity level is critical. Deep breaths.", expression: "shocked" }
        ],
        evidence: "Audio Recording: 'She's crazy'",
        next: 'the_reveal'
    },
    investigation_result_passive: {
        lines: [
            { speaker: "pi", text: "Got video of them holding hands walking in. A kiss on the cheek. Definitive proof of intimacy." },
            { speaker: "client", text: "Look at his smile. He hasn't smiled at me like that in years." },
            { speaker: "host", text: "Don't let him break you. Let this fuel you.", expression: "default" }
        ],
        evidence: "Video: Hand holding",
        next: 'the_reveal'
    },
    the_reveal: {
        bg: "bg-black",
        lines: [
            { speaker: "host", text: "Jessica. It's time to review the evidence.", expression: "default" },
            { speaker: "host", text: "We have photos. We have logs. We know who she is. It's his 22-year-old intern, Becky.", expression: "judging" },
            { speaker: "client", text: "Becky? The one who brought us vegan lasagna when I was sick??" },
            { speaker: "host", text: "Always the ones with the lasagna.", expression: "tea" }
        ],
        next: 'the_reveal_choice'
    },
    the_reveal_choice: {
        lines: [
            { speaker: "host", text: "Now comes the most important question I will ask you tonight.", expression: "default" },
            { speaker: "host", text: "You have the proof. What do you want to do?", expression: "royal" }
        ],
        choices: [
            { text: "I want to go home and change the locks. Ghost him.", next: 'ending_ghost' },
            { text: "I want to pull up on them right now. THE TAKEDOWN.", next: 'takedown_start' }
        ]
    },
    takedown_start: {
        bg: "bg-red-900",
        lines: [
            { speaker: "host", text: "Rico, keep eyes on them. We are en route.", expression: "default" },
            { speaker: "host", text: "(20 Minutes Later - Outside the Diner)", expression: "default" },
            { speaker: "host", text: "Jessica, take a deep breath. You are a Queen. Fix your crown. Let's go.", expression: "royal" }
        ],
        next: 'takedown_action'
    },
    takedown_action: {
        lines: [
            { speaker: "cheater", text: "...so anyway, that's why I need my own space--" },
            { speaker: "client", text: "Is this enough space for you, Marcus??" },
            { speaker: "lover", text: "Oh my god! You said she was in Europe!" },
            { speaker: "cheater", text: "Jess! Baby! It's not what it looks like! We're discussing... spreadsheets!" },
            { speaker: "host", text: "Spreadsheets? Really? At midnight?", expression: "judging" }
        ],
        choices: [
            { text: "(To Client) Throw the evidence on the table!", next: 'takedown_climax_evidence' },
            { text: "(To Client) Let him lie. Let him dig the hole deeper.", next: 'takedown_climax_quiet' }
        ]
    },
    takedown_climax_evidence: {
        lines: [
            { speaker: "client", text: "Spreadsheets? Is this text message a spreadsheet? Is this photo a pivot table?" },
            { speaker: "client", text: "Becky, he's not separated. He's driving the car I paid for. And you verify his expenses!" },
            { speaker: "lover", text: "Marcus! You told me she was your aunt!" },
            { speaker: "host", text: "Aunt?? Oh, he's dead.", expression: "shocked" }
        ],
        next: 'ending_takedown_success'
    },
    takedown_climax_quiet: {
        lines: [
            { speaker: "client", text: "Go on, Marcus. Tell us about the spreadsheets." },
            { speaker: "cheater", text: "Well, the Q3 projections... look, honey, can we talk outside?" },
            { speaker: "client", text: "No. I'm done talking. Becky, girl to girl? He's broke. Good luck." },
            { speaker: "host", text: "Mic drop.", expression: "sassy" }
        ],
        next: 'ending_takedown_cold'
    },
    ending_ghost: {
        bg: "bg-slate-900",
        lines: [
            { speaker: "host", text: "Jessica chose peace. She changed the locks, moved his stuff to a storage unit, and text him the code.", expression: "royal" },
            { speaker: "host", text: "Sometimes the best takedown is total silence. Marcus is still crying in voicemails to this day.", expression: "tea" },
            { speaker: "host", text: "Case Closed.", expression: "default" }
        ],
        next: null
    },
    ending_takedown_success: {
        bg: "bg-purple-900",
        lines: [
            { speaker: "host", text: "The whole diner applauded. Becky threw her milkshake at him. Jessica walked out with her head held high.", expression: "royal" },
            { speaker: "host", text: "Marcus is currently sleeping on a blow-up mattress at his mom's house.", expression: "snarky" },
            { speaker: "host", text: "Caught in the Act: Confirmed.", expression: "default" }
        ],
        next: null
    },
    ending_takedown_cold: {
        bg: "bg-blue-900",
        lines: [
            { speaker: "host", text: "Ice cold. Jessica didn't even raise her voice. She destroyed his ego with three sentences.", expression: "shocked" },
            { speaker: "host", text: "Sometimes, indifference hurts more than hate. Marcus lost his wife and his girlfriend in the same night.", expression: "tea" },
            { speaker: "host", text: "Case Closed.", expression: "default" }
        ],
        next: null
    }
};

// State
let gameState = { ...INITIAL_STATE };
let isTyping = false;
let typingInterval = null;

// DOM Elements
const app = document.getElementById('app');
const confidenceBar = document.getElementById('confidence-bar');
const rageBar = document.getElementById('rage-bar');
const evidenceBoard = document.getElementById('evidence-board');
const evidenceList = document.getElementById('evidence-list');
const characterAvatar = document.getElementById('character-avatar');
const speakerContainer = document.getElementById('speaker-container');
const speakerName = document.getElementById('speaker-name');
const speakerIcon = document.getElementById('speaker-icon');
const dialogueContainer = document.getElementById('dialogue-container');
const dialogueText = document.getElementById('dialogue-text');
const typingCursor = document.getElementById('typing-cursor');
const controlsContainer = document.getElementById('controls-container');
const gameOverScreen = document.getElementById('game-over-screen');
const restartBtn = document.getElementById('restart-btn');

// Initialization
function init() {
    lucide.createIcons();
    restartBtn.addEventListener('click', restartGame);
    dialogueContainer.addEventListener('click', handleNext);
    render();
}

function restartGame() {
    gameState = { ...INITIAL_STATE, evidence: [] }; // Reset evidence too
    gameOverScreen.classList.add('hidden');
    gameOverScreen.classList.remove('flex');
    app.classList.remove('hidden');
    render();
}

function getCharData(speaker, expression) {
    if (!speaker) return { name: "???", color: "text-white", avatar: "?" };
    const char = CHARACTERS[speaker];
    let avatar = char.avatar;
    if (speaker === 'host' && expression && char.expressions[expression]) {
        avatar = char.expressions[expression];
    }
    return { ...char, avatar };
}

function updateStats() {
    confidenceBar.style.width = `${gameState.clientConfidence}%`;
    rageBar.style.width = `${gameState.clientRage}%`;
}

function updateEvidence() {
    if (gameState.evidence.length > 0) {
        evidenceBoard.classList.remove('hidden');
        evidenceList.innerHTML = gameState.evidence.map(item => `
            <li class="text-[9px] bg-white/10 p-1 rounded text-green-300 flex items-start gap-1">
                <i data-lucide="file-text" class="w-2.5 h-2.5 mt-0.5 flex-shrink-0"></i>
                <span class="truncate leading-tight">${item}</span>
            </li>
        `).join('');
        lucide.createIcons();
    } else {
        evidenceBoard.classList.add('hidden');
    }
}

function typeText(text) {
    isTyping = true;
    typingCursor.classList.remove('opacity-0');
    typingCursor.classList.add('animate-pulse');

    let charIndex = 0;
    dialogueText.textContent = "";

    if (typingInterval) clearInterval(typingInterval);

    typingInterval = setInterval(() => {
        charIndex++;
        dialogueText.textContent = text.slice(0, charIndex);

        if (charIndex >= text.length) {
            clearInterval(typingInterval);
            isTyping = false;
            typingCursor.classList.remove('animate-pulse');
            typingCursor.classList.add('opacity-0');
            renderControls(); // Show controls after typing finishes
        }
    }, 25);
}

function handleNext() {
    const currentSceneData = STORY[gameState.scene];
    const currentLine = currentSceneData.lines ? currentSceneData.lines[gameState.dialogueIndex] : null;

    if (isTyping) {
        clearInterval(typingInterval);
        isTyping = false;
        dialogueText.textContent = currentLine.text;
        typingCursor.classList.remove('animate-pulse');
        typingCursor.classList.add('opacity-0');
        renderControls();
        return;
    }

    if (gameState.dialogueIndex < currentSceneData.lines.length - 1) {
        gameState.dialogueIndex++;
        render();
    } else if (currentSceneData.choices) {
        // Wait for choice
    } else if (currentSceneData.next) {
        gameState.scene = currentSceneData.next;
        gameState.dialogueIndex = 0;
        render();
    } else {
        // Game Over
        showGameOver();
    }
}

function handleChoice(choiceIndex) {
    const currentSceneData = STORY[gameState.scene];
    const choice = currentSceneData.choices[choiceIndex];

    if (choice.effect) {
        if (choice.effect.rage) gameState.clientRage += choice.effect.rage;
        if (choice.effect.conf) gameState.clientConfidence += choice.effect.conf;
    }

    if (currentSceneData.evidence && !gameState.evidence.includes(currentSceneData.evidence)) {
        gameState.evidence.push(currentSceneData.evidence);
    }

    gameState.scene = choice.next;
    gameState.dialogueIndex = 0;
    render();
}

function showGameOver() {
    app.classList.add('hidden');
    gameOverScreen.classList.remove('hidden');
    gameOverScreen.classList.add('flex');
}

function renderControls() {
    const currentSceneData = STORY[gameState.scene];
    const showChoices = !isTyping && gameState.dialogueIndex === currentSceneData.lines.length - 1 && currentSceneData.choices;

    controlsContainer.innerHTML = '';

    if (showChoices) {
        const choicesGrid = document.createElement('div');
        choicesGrid.className = "grid grid-cols-1 gap-3 animate-slide-up w-full";

        currentSceneData.choices.forEach((choice, idx) => {
            const btn = document.createElement('button');
            btn.className = "group relative w-full p-3 bg-slate-800 border border-slate-600 hover:border-pink-500 hover:bg-slate-700 text-left rounded-lg transition-all active:scale-95 touch-manipulation shadow-lg";
            btn.innerHTML = `
                <div class="absolute left-0 top-0 bottom-0 w-1 bg-gray-600 group-hover:bg-pink-500 rounded-l-lg transition-colors"></div>
                <span class="font-semibold text-sm text-white group-hover:text-pink-300 transition-colors block pr-2">
                    ${choice.text}
                </span>
            `;
            btn.onclick = (e) => {
                e.stopPropagation(); // Prevent bubbling to dialogue container
                handleChoice(idx);
            };
            choicesGrid.appendChild(btn);
        });
        controlsContainer.appendChild(choicesGrid);
    } else {
        const nextBtn = document.createElement('button');
        nextBtn.className = "flex items-center justify-center gap-2 text-white bg-slate-800/90 hover:bg-slate-700 w-full py-4 rounded-lg transition-all uppercase text-sm font-bold tracking-widest border border-slate-700 shadow-xl active:scale-95 touch-manipulation";
        nextBtn.innerHTML = `
            ${isTyping ? "Skip" : "Next"} <i data-lucide="arrow-right" class="w-4 h-4"></i>
        `;
        nextBtn.onclick = (e) => {
            e.stopPropagation();
            handleNext();
        };
        controlsContainer.appendChild(nextBtn);
        lucide.createIcons();
    }
}

function render() {
    const currentSceneData = STORY[gameState.scene];

    if (!currentSceneData) {
        showGameOver();
        return;
    }

    // Update Background
    // Remove all bg- classes and add the current one
    app.className = app.className.replace(/bg-\w+-\d+/g, '').trim();
    app.classList.add(currentSceneData.bg || 'bg-slate-900');
    // Ensure base classes are kept
    if (!app.classList.contains('flex')) app.classList.add('flex', 'flex-col', 'h-[100dvh]', 'w-full', 'transition-colors', 'duration-1000');

    const currentLine = currentSceneData.lines ? currentSceneData.lines[gameState.dialogueIndex] : null;

    if (currentLine) {
        const charData = getCharData(currentLine.speaker, currentLine.expression);

        // Update Speaker
        speakerName.textContent = charData.name;
        speakerContainer.className = `text-xs font-bold tracking-widest uppercase ${charData.color} flex items-center gap-2 mb-1`;

        // Update Avatar
        characterAvatar.textContent = charData.avatar;
        characterAvatar.className = `text-[6rem] md:text-[10rem] drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)] transition-transform duration-300 ${isTyping ? 'scale-105' : 'scale-100'}`;

        // Type Text
        typeText(currentLine.text);
    }

    updateStats();
    updateEvidence();
}

// Start the game
init();
