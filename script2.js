// Object Containers for the questions
let questions = [{
        question: "Commonly used data types DO NOT include: ",
            choiceA: "string",
            choiceB: "boolean",
            choiceC: "alerts",
            choiceD: "numbers",
            correctAnswer: "c"},
    {
        question: "The conditions in an if/else statement is encolsed with:",
            choiceA: "quotes",
            choiceB: "curly brackets",
            choiceC: "paretheseses",
            choiceD: "square bracekts",
            correctAnswer: "c"},
    {
        question: "An array in JavaScript can be used to store:",
            choiceA: "numbers & strings",
            choiceB: "other arrays",
            choiceC: "booleans",
            choiceD: "all of the above",
            correctAnswer: "d"},
    {
        question: "String values must be enclosed within ____ when being assigned to variables",
            choiceA: "commas",
            choiceB: "curly brackets",
            choiceC: "quotes",
            choiceD: "parethesis",
            correctAnswer: "a"},
    {
        question: "A very useful tool during development and debugging for printing content to the dubugger is:",
            choiceA: "JavaScript",
            choiceB: "terminal/bash",
            choiceC: "for loop",
            choiceD: "console.log",
            correctAnswer: "d"},
];

var quizIntroEl = document.getElementById("quizIntro");
var startButton = document.getElementById("startButton");

var quizStartMenuEl = document.getElementById("quizStartMenu");
var timerEl = document.getElementById("timer");
var questionBox = document.getElementById("questionBox");
var askQuestionEl = document.getElementById("askQuestion");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");

var gameOver = document.getElementById("gameOver");
var scoreListEl = document.getElementById("scoreList")
var initialsEl = document.getElementById("initials");
var submitButton = document.getElementById("submitButton");

var highScoresContainer = document.getElementById("highScoresContainer");
var highScorePage = document.getElementById("highScorePage");
var highScoreHeader = document.getElementById("highScoreHeader");
var highScoreInitials = document.getElementById("highScoreInitials");
var highScoreScore = document.getElementById("highScoreScore");

var endGame = document.getElementById("endGame");
var playAgain = document.getElementById("playAgain");
var clearHighScore = document.getElementById("clearHighScore");

var finalQuestionIndex = questions.length;
var initialquestionIndiex = 0;
var timeleft = 61;
var timerInterval;
var score = 0;
var correctAnswerEl;
var currentQuestion = questions[initialquestionIndiex];

function quizQuestions() {
    if (initialquestionIndiex === finalQuestionIndex) {
        return showScore();
    }
    currentQuestion;
    askQuestionEl.innerHTML = currentQuestion.question;
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
}

function startQuiz() {
    quizIntroEl.classList.add("hide");
    startButton.classList.add("hide");
    questionBox.classList.remove("hide");
    quizQuestions();

    timerInterval = setInterval(function(){
        timeleft--;
        timerEl.textContent = "Time: " + timeleft;

        if(timeleft === 0) {
            clearInterval(timerInterval);
            showScore();
        }
    }, 1000)
    // quizIntroEl.style.display = "block";
}

function showScore() {
    quizIntroEl.classList.add("hide");
    gameOver.style.display = "flex";
    scoreListEl.classList.remove("hide");
    clearInterval(timerInterval);
    highScoreInitials.value = "";
    scoreListEl.innerHTML = "Your score is: " + timeleft;
}

function correctAnswer(answer) {
    correctAnswerEl = currentQuestion.correctAnswer;

    if (answer === correctAnswerEl && initialquestionIndiex !== finalQuestionIndex) {
        alert("Correct!");
        initialquestionIndiex++;
        quizQuestions();
    } else if (answer !== correctAnswerEl && initialquestionIndiex !== finalQuestionIndex) {
        alert("Wrong!")
        timeleft = timeleft - 10;
        initialquestionIndiex++;
        quizQuestions();
    } else {
        showScore();
    }
}

startButton.addEventListener("click",startQuiz);