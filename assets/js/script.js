var startBtn = document.getElementById('start-btn');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('questions');
var answerBtn = document.getElementById('answer-btn');
var submitBtn = document.getElementById('submitBtn');
var endQuiz = document.getElementById('end-quiz');
var quizContainerEl = document.getElementById('quiz-container');
var score = document.getElementById('score');
var userInitials = document.getElementById('initials');

let shuffledQuestions, currentQuestionIndex;

startBtn.addEventListener('click', startQuiz);

function nextFunction () {
    currentQuestionIndex++;
    if (currentQuestionIndex >= questions.length) {
        setState('end-quiz');
        return;
    }
    setNextQuestion();
}

function startQuiz () {
    setState('quiz');
    startBtn.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
}
var timeLeft = 30;
var downloadTimer = null;
startBtn.addEventListener("click", function() {
        document.getElementById('count').innerHTML = 'Time: ' + '' + timeLeft;
        timeLeft = 30;
        downloadTimer = setInterval(function() {
        document.getElementById('count').innerHTML = 'Time: ' + '' + timeLeft;

        timeLeft--;
        if(timeLeft <= 0) {
            clearInterval(downloadTimer);
            document.getElementById('count').innerHTML = "Time is up!"
        }
    }, 1000);
});

function setNextQuestion () {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion (question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button');
        button.innerText = answer.text
        button.classList.add('btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', chooseAnswer);
        answerBtn.appendChild(button);
    })
}

function resetState() {
    clearStatusClass(document.body);
    while (answerBtn.firstChild) {
        answerBtn.removeChild (answerBtn.firstChild);
    }
}

function chooseAnswer(e) {
    nextFunction();
    var answerBtn = e.target
    var correct = answerBtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtn.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
    } else {
        startBtn.innerText = 'Restart';
        startBtn.classList.remove('hide');
    }
};

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
    element.classList.add('correct');
    } else {
    element.classList.add('wrong');
    timeLeft = timeLeft- 10;
    }
};

function clearStatusClass (element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}


var questions = [
    {
        question: 'JavaScript is an ______ language?',
        answers: [
            { text: 'Object-Oriented', correct: true},
            { text: 'Object-Based', correct: false},
            { text: 'Procedural', correct: false},
            { text: 'None of the Above', correct: false},
        ]
    },
    {
        question: 'Which of the following keywords is used to define a variable in Javascript?',
        answers: [
            { text: 'var', correct: false },
            { text: 'let', correct: false},
            { text: 'Both A and B', correct: true},
            { text: 'None of the Above', correct: false},
        ]
    },
    {
        question: 'How can a data type be declared to be a constant type?',
        answers: [
            { text: 'constant', correct: false},
            { text: 'var', correct: false},
            { text: 'let', correct: false},
            { text: 'const', correct: true},
        ]
    },
    {
        question: 'Which of the following is used to access HTML elements using JavaScript?',
        answers: [
            { text: 'getElementbyId()', correct: false},
            { text: 'getElementByClassName()', correct: false},
            { text: 'Both A and B', correct: true},
            { text: 'None of the Above', correct: false},
        ]
    }
]

submitBtn.addEventListener("click", function() {
    let userInitials = userInitials.value.trim();
    if (userInitials) {
        userInitials.value = '';
        highScore = JSON.parse(localStorage.getItem("timeLeft")) || [];
        localStorage.setItem("timeLeft", JSON.stringify(highScore));
        renderHighScores();
        reset();
    }
})

var state = '';
function setState(newState) {
    state = newState;
    start.setAttribute("style", "display:none");
    quizContainerEl.setAttribute("style", "display:none");
    endQuiz.setAttribute("style", "display:none");
    score.setAttribute("style", "display:none");
    if (state === 'start') {
        start.setAttribute("style", "display: block");
    }
    if (state === 'quiz') {
        quizContainerEl.setAttribute("style", "display: block");
    }
    if (state === 'end-quiz') {
        endQuiz.setAttribute("style", "display: block");
    }
    if (state === 'score') {
        score.setAttribute("style", "display: block");
    }
}
    setState("start");

