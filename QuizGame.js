const questionsData = [
    { q: "Which language runs in a web browser?", a: "JavaScript", o: ["Java", "C", "Python", "JavaScript"] },
    { q: "What does CSS stand for?", a: "Cascading Style Sheets", o: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"] },
    { q: "What is 10 + 5?", a: "15", o: ["12", "15", "20", "25"] },
    { q: "Which is a JS framework?", a: "React", o: ["React", "Django", "Laravel", "Flask"] },
    { q: "Symbol for Constant in JS?", a: "const", o: ["var", "let", "const", "define"] }
];

let currentQuestions = [];
let currentIndex = 0;
let score = { correct: 0, wrong: 0, unanswered: 0 };
let timer;
let timeLeft = 10;

// Helper: Shuffle Array (Fisher-Yates)
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const startQuiz = () => {
    score = { correct: 0, wrong: 0, unanswered: 0 };
    currentIndex = 0;
    currentQuestions = shuffle([...questionsData]).map(item => ({
        ...item,
        o: shuffle([...item.o])
    }));
    showScreen('quiz-screen');
    loadQuestion();
};

const loadQuestion = () => {
    if (currentIndex >= currentQuestions.length) return showResults();
    
    const data = currentQuestions[currentIndex];
    document.getElementById('question-text').innerText = data.q;
    document.getElementById('progress').innerText = `Question ${currentIndex + 1} of ${currentQuestions.length}`;
    
    const container = document.getElementById('options-container');
    container.innerHTML = '';
    
    data.o.forEach(opt => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(opt, handleFeedback);
        container.appendChild(btn);
    });

    startTimer();
};

const startTimer = () => {
    timeLeft = 10;
    document.getElementById('timer').innerText = `${timeLeft}s`;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = `${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(null, handleFeedback); // Timeout case
        }
    }, 1000);
};

// Core Logic: Callback handles the display logic
const checkAnswer = (selected, callback) => {
    clearInterval(timer);
    const correctAns = currentQuestions[currentIndex].a;
    const buttons = document.querySelectorAll('#options-container button');
    buttons.forEach(b => b.disabled = true); // Prevent multiple clicks

    let status = "wrong";
    if (selected === correctAns) {
        status = "correct";
        score.correct++;
    } else if (selected === null) {
        status = "unanswered";
        score.unanswered++;
    } else {
        score.wrong++;
    }

    callback(status, selected, correctAns);
};

const handleFeedback = (status, selected, correctAns) => {
    const feedback = document.getElementById('feedback');
    feedback.classList.remove('hidden');
    
    if (status === "correct") {
        feedback.innerHTML = `<span class="correct">Correct!</span>`;
        findBtn(selected).classList.add('correct');
    } else if (status === "unanswered") {
        feedback.innerHTML = `<span class="unanswered">Time's up! The answer was ${correctAns}</span>`;
    } else {
        feedback.innerHTML = `<span class="wrong">Wrong! It was ${correctAns}</span>`;
        findBtn(selected).classList.add('wrong');
    }

    setTimeout(() => {
        feedback.classList.add('hidden');
        currentIndex++;
        loadQuestion();
    }, 2000);
};

const findBtn = (text) => [...document.querySelectorAll('#options-container button')].find(b => b.innerText === text);

const showResults = () => {
    showScreen('result-screen');
    document.getElementById('score-summary').innerHTML = `
        Correct: ${score.correct} <br>
        Wrong: ${score.wrong} <br>
        Unanswered: ${score.unanswered}
    `;
};

const showScreen = (id) => {
    ['start-screen', 'quiz-screen', 'result-screen'].forEach(s => 
        document.getElementById(s).classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');
};

document.getElementById('start-btn').onclick = startQuiz;
document.getElementById('restart-btn').onclick = startQuiz;