// Data structure for 10 questions: Identify the rule and predict the next element
const questions = [
    {
        id: 1,
        sequence: "5, 10, 15, 20, ?",
        rule: "Rule: Add five to the previous number.",
        options: ["21", "25", "30", "40"],
        correctAnswerIndex: 1 
    },
    {
        id: 2,
        sequence: "2, 4, 8, 16, ?",
        rule: "Rule: Multiply the previous number by two (twice).",
        options: ["24", "30", "32", "34"],
        correctAnswerIndex: 2
    },
    {
        id: 3,
        sequence: "50, 47, 44, 41, ?",
        rule: "Rule: Subtract three from the previous number (three less).",
        options: ["39", "38", "37", "35"],
        correctAnswerIndex: 1
    },
    {
        id: 4,
        sequence: "1, 3, 5, 7, ?",
        rule: "Rule: Add two to the previous number (two more).",
        options: ["9", "10", "11", "12"],
        correctAnswerIndex: 0
    },
    {
        id: 5,
        sequence: "1, 4, 9, 16, ?",
        rule: "Rule: The next term is the square of the term's position (1x1, 2x2, 3x3, 4x4, 5x5).",
        options: ["20", "22", "25", "36"],
        correctAnswerIndex: 2
    },
    {
        id: 6,
        sequence: "A, C, E, G, ?",
        rule: "Rule: Skip one letter in the alphabet (two letters more).",
        options: ["H", "I", "J", "K"],
        correctAnswerIndex: 1
    },
    {
        id: 7,
        sequence: "20, 19, 17, 14, 10, ?",
        rule: "Rule: Subtract one less each time (-1, -2, -3, -4, then -5).",
        options: ["6", "5", "4", "3"],
        correctAnswerIndex: 1
    },
    {
        id: 8,
        sequence: "1, 2, 4, 7, 11, ?",
        rule: "Rule: Add one more each time (+1, +2, +3, +4, then +5).",
        options: ["15", "16", "17", "18"],
        correctAnswerIndex: 1
    },
    {
        id: 9,
        sequence: "90, 80, 70, 60, ?",
        rule: "Rule: Subtract ten from the previous number (ten less).",
        options: ["40", "45", "50", "55"],
        correctAnswerIndex: 2
    },
    {
        id: 10,
        sequence: "8, 16, 24, 32, ?",
        rule: "Rule: Add eight to the previous number.",
        options: ["36", "40", "48", "56"],
        correctAnswerIndex: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const startScreen = document.getElementById('start-screen');
const quizBox = document.getElementById('quiz-box');
const nextBtn = document.getElementById('next-btn');
const resultsScreen = document.getElementById('results');

// 🔊 SOUND HELPER FUNCTION
function playSound(soundId) {
    const sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0;
        sound.play().catch(() => {
            // Ignore autoplay errors (safe after user interaction)
        });
    }
}

// --- Game Control Functions ---

/**
 * Initializes the game by hiding the start screen and showing the quiz.
 */
function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    startScreen.classList.add('hidden');
    quizBox.classList.remove('hidden');
    nextBtn.classList.remove('hidden');
    displayQuestion();
}

/**
 * Renders the current question to the DOM.
 */
function displayQuestion() {
    answered = false;
    nextBtn.disabled = true;
    nextBtn.textContent = 'Select an Answer';
    
    if (currentQuestionIndex < questions.length) {
        const q = questions[currentQuestionIndex];
        
        let questionHTML = `
            <h3>Question ${q.id} of 10</h3>
            <p>Identify the rule and predict the next element in this sequence:</p>
            <div class="sequence">${q.sequence}</div>
            <p>Which option is the next element?</p>
            <div class="options">
        `;

        q.options.forEach((option, index) => {
            questionHTML += `
                <button onclick="checkAnswer(${index})" data-index="${index}">
                    ${String.fromCharCode(65 + index)}. ${option}
                </button>
            `;
        });
        
        questionHTML += `</div>`;
        quizBox.innerHTML = questionHTML;
    } else {
        showResults();
    }
}

/**
 * Checks the selected answer and provides feedback.
 */
function checkAnswer(selectedIndex) {
    if (answered) return; 

    answered = true;
    nextBtn.disabled = false;
    nextBtn.textContent = 'Next Question';
    
    const q = questions[currentQuestionIndex];
    const optionButtons = quizBox.querySelectorAll('.options button');
    const isCorrect = selectedIndex === q.correctAnswerIndex;

    // Update score and play sound
    if (isCorrect) {
        score++;
        playSound('correct-sound'); // ✅
    } else {
        playSound('wrong-sound'); // ❌
    }

    // Visual feedback
    optionButtons.forEach((btn, index) => {
        btn.disabled = true;
        if (index === selectedIndex) {
            btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
        if (index === q.correctAnswerIndex) {
            btn.classList.add('correct-answer');
        }
    });

    // Show rule
    const ruleDisplay = document.createElement('p');
    ruleDisplay.innerHTML = `<strong>Rule:</strong> ${q.rule}`;
    quizBox.appendChild(ruleDisplay);
}

/**
 * Moves to the next question or ends the quiz.
 */
function nextQuestion() {
    if (!answered) return; 
    
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResults();
    }
}

/**
 * Displays the final score and results screen.
 */
function showResults() {
    quizBox.classList.add('hidden');
    nextBtn.classList.add('hidden');
    document.getElementById('score-display').textContent = score;
    resultsScreen.classList.remove('hidden');
}