var startBtn = document.getElementById('start-btn');
var questionContainerEl = document.getElementById('question-container');
var questionEl = document.getElementById('questions');
var answerBtn = document.getElementById('answer-btn');
var nextBtn = document.getElementById('next-btn');

let shuffledQuestions, currentQuestionIndex;

startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startQuiz () {
    startBtn.classList.add('hide');
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerEl.classList.remove('hide');
    setNextQuestion();
}

function setNextQuestion () {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion (question) {
    questionEl.innerText = question.question
    question.answers.forEach(answer => {
        var button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', chooseAnswer)
        answerBtn.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextBtn.classList.add('hide')
    while (answerBtn.firstChild) {
        answerBtn.removeChild (answerBtn.firstChild)
    }
}

function chooseAnswer(e) {
    var answerBtn = e.target
    var correct = answerBtn.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerBtn.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextBtn.classList.remove('hide')
    } else {
        startBtn.innerText = 'Restart'
        startBtn.classList.remove('hide')
    }
};

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
    element.classList.add('correct')
    } else {
    element.classList.add('wrong')
    }
};

function clearStatusClass (element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
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
            { text: 'var', correct: false},
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
