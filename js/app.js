const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0;
let currentQuestion;
let availableQuestions = [];
let availableOptions = [];
let correctAnswers = 0;
let attempt = 0;

// push the question into availableQuestions array
function setAvailableQuestions() {
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    availableQuestions.push(quiz[i]);
  }
}
// set question number and question and options
function getNewQuestion() {
  questionNumber.innerHTML = `Questão ${questionCounter + 1} de ${quiz.length}`;

  const questionIndex =
    availableQuestions[Math.floor(Math.random() * availableQuestions.length)];
  currentQuestion = questionIndex;
  questionText.innerHTML = currentQuestion.q;

  const indexOne = availableQuestions.indexOf(questionIndex);
  availableQuestions.splice(indexOne, 1);

  const optionLen = currentQuestion.options.length;
  for (let i = 0; i < optionLen; i++) {
    availableOptions.push(i);
  }
  optionContainer.innerHTML = "";
  let animationDelay = 0.2;

  //create options in html
  for (let i = 0; i < optionLen; i++) {
    //random option
    const optionIndex =
      availableOptions[Math.floor(Math.random() * availableOptions.length)];
    // get the position of 'optionIndex' from the availableOptions
    const index2 = availableOptions.indexOf(optionIndex);
    availableOptions.splice(index2, 1);
    const option = document.createElement("div");
    option.innerHTML = currentQuestion.options[optionIndex];
    option.id = optionIndex;
    option.style.animationDelay = animationDelay + "s";
    animationDelay = animationDelay + 0.2;
    option.className = "option";
    optionContainer.appendChild(option);
    option.setAttribute("onclick", "getResult(this)");
  }

  questionCounter++;
}
// get the result of current attempt question
function getResult(element) {
  const id = parseInt(element.id);
  // get the answer by comparing the id of clicked option
  if (id === currentQuestion.answer) {
    //set the green color to the correct option
    element.classList.add("correct");
    // add the indicator to correct mark
    updateAnswerIndicatoe("correct");
    correctAnswers++;
  } else {
    //set the red color to the incorrect option
    element.classList.add("wrong");
    // add the indicator to incorrect mark
    updateAnswerIndicatoe("wrong");

    const optionLen = optionContainer.children.length;
    for (let i = 0; i < optionLen; i++) {
      if (parseInt(optionContainer.children[i].id) === currentQuestion.answer) {
        optionContainer.children[i].classList.add("correct");
      }
    }
  }
  attempt++;
  unclickableOptions();
}

function unclickableOptions() {
  const optionLen = optionContainer.children.length;
  for (let i = 0; i < optionLen; i++) {
    optionContainer.children[i].classList.add("already-answered");
  }
}

function answersIndicator() {
  answersIndicatorContainer.innerHTML = "";
  const totalQuestion = quiz.length;
  for (let i = 0; i < totalQuestion; i++) {
    const indicator = document.createElement("div");
    answersIndicatorContainer.appendChild(indicator);
  }
}
function updateAnswerIndicatoe(marktype) {
  answersIndicatorContainer.children[questionCounter - 1].classList.add(
    marktype
  );
}

function next() {
  if (questionCounter === quiz.length) {
    quizOver();
  } else {
    getNewQuestion();
  }
}

function quizOver() {
  // hide quiz quizbox
  quizBox.classList.add("hide");

  resultBox.classList.remove("hide");
  quizResult();
}
// get the quiz result
function quizResult() {
  const percentage = (correctAnswers / quiz.length) * 100;
  resultBox.querySelector(".total-question").innerHTML = quiz.length;
  resultBox.querySelector(".total-attempt").innerHTML = attempt;
  resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
  resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
  resultBox.querySelector(
    ".total-percentage"
  ).innerHTML = `${percentage.toFixed()} %`;
  resultBox.querySelector(
    ".total-score"
  ).innerHTML = `${correctAnswers} / ${quiz.length}`;
}

function resetQuiz() {
  questionCounter = 0;
  correctAnswers = 0;
  attempt = 0;
}
//btn recomecar
function tryAgain() {
  //hide the resulBox
  resultBox.classList.add("hide");
  quizBox.classList.remove("hide");
  resetQuiz();
  startQuiz();
}
//btn voltar ao inicio
function goToHome() {
  resultBox.classList.add("hide");
  homeBox.classList.remove('hide');
  resetQuiz();

}

 function startQuiz() {
   homeBox.classList.add('hide');

   quizBox.classList.remove('hide');
  // first we will set all questions in availableQuestions Array
  setAvailableQuestions();
  // second we will cal getNewQuestion(); function
  getNewQuestion();
  // to create indicator of answers
  answersIndicator();
};

window.onload = () =>{
  homeBox.querySelector('.total-question').innerHTML = quiz.length;
}
