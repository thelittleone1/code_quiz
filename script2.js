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

// Creating Elements for DOM manipulation 
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

//Global Variables
var finalQuestionIndex = questions.length;
var initialquestionIndex = 0;
var timeleft = 61;
var timerInterval;
var score = 0;
var correctAnswerEl;
// var currentQuestion = questions[initialquestionIndex];

// Function to generate the quizQuestions
function quizQuestions() {
    if (initialquestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = questions[initialquestionIndex];
    askQuestionEl.innerHTML = currentQuestion.question;
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
}

// Function to start the quiz
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

// Function to display the score at the end of the quiz
function showScore() {
    quizIntroEl.classList.add("hide");
    gameOver.style.display = "flex";
    scoreListEl.classList.remove("hide");
    clearInterval(timerInterval);
    highScoreInitials.value = "";
    scoreListEl.innerHTML = "Your score is: " + score + " of " + questions.length;
}

// this hands the submit button for the users in put of their score and name
// also handles the storage of that content in localStorage
submitButton.addEventListener("click", function highScore(){
    if(highScoreInitials.value === "") {
        alert("Initials cannot be blank");
        return false;
    } else {
        var saveHighScore = JSON.parse(localStorage.getItem("saveHighScore")) || [];
        var currentUser = highScoreInitials.value.trim();
        var userHighScore = {
            name: currentUser,
            score: timeleft
        };
        // gameOver.style.display = "none";

        highscoreContainer.classList.remove("hide")
        highscoreContainer.style.display = "flex";
        highScorePage.style.display = "block";

        endGame.classList.remove("hide");
        endGame.style.display = "flex";

        saveHighScore.push(userHighScore);
        localStorage.setItem("saveHighScore", JSON.stringify(saveHighScore));

        generateScores();
    }
})

// This displays the highscores stored in LocalStorage
function generateScores() {
    highScoreInitials.innerHTML = "";
    highScoreScore.innerHTML = "";
    var displayHighScores = JSON.parse(localStorage.getItem("saveHighScore")) || [];

    for ( var i = 0; i < displayHighScores.length; i++ ) {
        var enteredUserName = document.createElement("li");
        var enteredUserScore = document.createElement("li");
        enteredUserName.textContent = displayHighScores[i].name;
        enteredUserScore.textContent = displayHighScores[i].score;
        highScoreInitials.appendChild(enteredUserName);
        highScoreScore.appendChild(enteredUserScore);
    }
}

// Displays the high score play while hiding the the start page
function scoreDisplay() {
    // startQuiz.classList.remove("hide");
    // gameOver.classList.remove("hide");
    highScoresContainer.style.display = "flex";
    highScorePage.style.display = "block";
    endGame.style.display = "flex";
    generateScores();
}

// Clears the high scores from localStorage
function clearScore() {
    window.localStorage.clear();
    highScoreInitials.textContent = "";
    highScoreScore.textContent = "";
}

// Function to allow you to replay the quiz
function replayQuiz() {
    // highScoresContainer.style.display = "none";
    //gameOver.style.direction = "none";
    startQuiz.classList.remove("hide");
    startQuiz.style.display = "flex";
    timeleft = 61;
    score = 0;
    initialquestionIndex = 0;
}

// This function checks that user selects the wrong or right answer
function correctAnswer(answer) {
    correctAnswerEl = questions[initialquestionIndex].correctAnswer;

    if (answer === correctAnswerEl && initialquestionIndex !== finalQuestionIndex) {
        alert("Correct!");
        initialquestionIndex++;
        currentQuestion = questions[initialquestionIndex]
        quizQuestions();
    } else if (answer !== correctAnswerEl && initialquestionIndex !== finalQuestionIndex) {
        alert("Wrong!")
        timeleft = timeleft - 10;
        initialquestionIndex++;
        currentQuestion = questions[initialquestionIndex];
        quizQuestions();
    } else {
        showScore();
    }
}

// Start button for the quiz
startButton.addEventListener("click",startQuiz);