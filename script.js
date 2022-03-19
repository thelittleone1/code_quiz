// Object Containers for the questions
let questions = [
{
    question: "Commonly used data types DO NOT include: ",
    answers: {
    answer1: "string",
    answer2: "boolean",
    answer3: "alerts",
    answer4: "numbers"
    },
    correctAnswer: "answer3"
},

{
    question: "The conditions in an if/else statement is encolsed with:",
    answers: {
    answer1: "quotes",
    answer2: "curly brackets",
    answer3: "paretheseses",
    answer4: "square bracekts"
    },
    correctAnswer: "answer3"
},

{
    question: "An array in JavaScript can be used to store:",
    answers: {
    answer1: "numbers & strings",
    answer2: "other arrays",
    answer3: "booleans",
    answer4: "all of the above"
    },
    correctAnswer: "answer4"
},

{
    question: "String values must be enclosed within ____ when being assigned to variables",
    answers: {
    answer1: "commas",
    answer2: "curly brackets",
    answer3: "quotes",
    answer4: "parethesis"
    }, 
    correctAnswer: "answer1"
},

{
    question: "A very useful tool during development and debugging for printing content to the dubugger is:", 
    answers: {
    answer1: "JavaScript",
    answer2: "terminal/bash",
    answer3: "for loop",
    answer4: "console.log"
    },
    correctAnswer: "answer4"
}
];

// Setting my varaibles
let nav = document.getElementById("nav");
let highScores = document.getElementById("highScores");
let timer = document.getElementById("timer")

let questionBox = document.getElementById("questionBox");
let askQuestion = document.getElementById("askQuestion");
let answerChoice = document.getElementById("answerChoice");
let quizIntro = document.getElementById("quizIntro");

let recordedHighScores = document.getElementById("recordedHighScores");
let scoresList = document.getElementById("scoresList");
let userScore = document.getElementById("userScore");
let submitButton = document.getElementById("submitButton");
let listOfScores = document.getElementById("listOfScores");

let startButton = document.getElementById("startButton");

let startQuiz = true;
let randomQuestion;

// Event Listener to start timer
startButton.addEventListener("click", timeStart)

function timeStart() {
    if(startQuiz) {
        timeStart = setInterval(function() {
        timeSet--;
        timer.textContent = "Time: " + timeSet;

        if (timeSet == 0 && confirm("Eeeek, you're out of time, wanna try again") == true) {
            clearInterval(timerStarts);
        }
        }, 1000)
    }
}

// Event Listener to Start Quiz
startButton.addEventListener("click", beginQuiz);

function beginQuiz() {
    startButton.addClass("hide");
    randomQuestion = Math.floor(Math.random() * questions.length);
    qustionsArrayIndex = 0;
    quizIntro.addClass("hide");
    askQuestion.classList.remove("hide");

    nextIndex();
}

// Displaying the next question after the previous one is answered
function nextIndex() {
    resetQuestion();
    nextQuestion(randomQuestion[questionArrayIndex]);
}


// Re-Setting the Buttons once Question is Answered
function resetQuestion() {
    while(answerChoice.firstChild) {
        answerChoice.removeChild(answerChoice.firstChild)
    }
}

// Getting buttons to display for the questions
function nextQuestion(question) {
    askQuestion.innerText = question.question;
    question.answers.forEach(function (answer) {
        let ansButton = document.createElement("button");
        ansButton.innerText = answer.text;
        ansButton.addClass("button");
        if (answer == correctAnswer) {
            ansButton.textContent("Correct!");
        } else {
            ansButton.textContent("Wrong!");
        }
        ansButton.addEventListener("click", selectedAnswer);
    });
}

// Resetting the timer 10 seconds if the question is answered wrong
function selectedAnswer(event) {
    let selectedAnswer = event.target;
    let rightChoice = selectedAnswer.dataset.correctAnswer;
    if (!rightChoice) {
        timeSet = timeSet - 10;
    }

    Array.from(answerChoice.childElementCount).forEach(function (ansButton) {
        buttonPush(ansButton, ansButton.dataset.rightChoice);
    });

    if( randomQuestion.length > questionArrayIndex +1) {
        questionArrayIndex++;
        setTimeout(() => {
            nextIndex();
        }, 1000);
    } else if (confirm("Game Over, wanna try again?") == true)
{   
    clearInterval(timerStarts);
}}

// Functino to promopt user to record their score
function recordScore() {
submitButton.addEventListener("click", function(event){
event.preventDefault();
recordedHighScores.classList.remove("hide");
scoresList.addClass("hide");
nav.addClass("hide");

let finalScore = {
    player: userScore.value()
}

if( finalScore == "") {
    prompt("Please enter your name")
}
})}

// Storing the final scores in an array and displaying them while allowing one to restart the quiz
function finalScoreArray() {
    let scoreArray = [];
    let scoreDiplay;
    scoreArray = JSON.parse(localStorage.getItem("finalScore"));
    scoreArray.push(finalScore);
    localStorage.setItem("finalScore"), JSON.stringify("finalScore");

    scoreDiplay = JSON.parse(localStorage.getItem("finalScore"));
    let listCreator = function(scoreArray) {
    li = document.createElement("li");
    li.textContent = scoreArray.player + scoreArray;
    highScores.appendChild(li);
    }
    {
        listCreator(scoreArray);
    }

    let resetQuiz = document.createElement("button");
    resetQuiz.textContent = "Take Quiz Again";
    resetQuiz.addEventListener("click", function() {
        location.reload("index.html");
    });

}