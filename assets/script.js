var state = 'start';

var startEl = document.querySelector('#start');
var quizEl = document.querySelector('#quiz');
var resultsE1 = document.querySelector('#results');

var startBtn = document.querySelector('#start button');
var submitScoreBtn = document.querySelector('#submit button');
var quizTitle = document.querySelector('#results title');
var questionEl = document.querySelector('#questions');

var timeEl = document.querySelector(".timer")
var mainEl = document.getElementById("main");
var secondsLeft = 30;

function displaySecondsLeft(){
    var secondsText = secondsLeft === 1 ? 'second' : 'seconds';
    timeEl.textContent = secondsLeft + " " + secondsText + " left till quiz ends."
}

function setTimer() {
    displaySecondsLeft();
}
    var timerInterval = setInterval(function() {
        secondsLeft--;
        displaySecondsLeft();

        if(secondsLeft === 0) {
            clearInterval(timerInterval);
            sendMessage();
        }
    }, 1000);

function sendMessage() {
    timeEl.textContent = " ";
}

var questions = ["First", "Second", "Third", "Fourth"];

function displayState() {
    if (state === 'start') {
        startEl.style.display = 'block';
        quizEl.style.display = 'none';
        resultsEl.style.display = 'none';
    }
    if (state === 'quiz') {
        startEl.style.display = 'none';
        quizEl.style.display = 'block';
        resultsEl.style.display = 'none';
        displayQuestion();
    }
    if (state === 'results') {
        startEl.style.display = 'none';
        quizEl.style.display = 'none';
        resultsEl.style.display = 'block';
    }
};

function init() {
    displayState();
};

function reset() {
    state = 'start';
    cursor = 0;
    init();
};

function displayQuestion() {
    state = 'quiz';
    var titleText = questions[cursor];
    quizTitle.textContent = titleText;
};

submitScoreBtn.addEventListener('click', function () {
});

setTimer();
