
const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyper Transfer Main Link"
    ],
    correct: 0
  },
  {
    question: "Which language is used to style a website?",
    answers: ["Python", "CSS", "Java", "C++"],
    correct: 1
  },
  {
    question: "Which language makes a website interactive?",
    answers: ["HTML", "CSS", "JavaScript", "SQL"],
    correct: 2
  },
  {
    question: "Which HTML tag creates a link?",
    answers: ["<p>", "<h1>", "<img>", "<a>"],
    correct: 3
  },
  {
    question: "Which symbol starts a CSS class selector?",
    answers: ["#", ".", "@", "&"],
    correct: 1
  },
  {
    question: "Which keyword declares a JavaScript variable?",
    answers: ["let", "style", "color", "body"],
    correct: 0
  },
  {
    question: "Which HTML tag displays an image?",
    answers: ["<image>", "<picture-src>", "<img>", "<photo>"],
    correct: 2
  },
  {
    question: "Which value means a true/false value in JavaScript?",
    answers: ["String", "Boolean", "Number", "Array"],
    correct: 1
  },
  {
    question: "Which CSS property changes text color?",
    answers: ["font-size", "background", "color", "text-style"],
    correct: 2
  },
  {
    question: "Which HTML tag contains the main page content structure?",
    answers: ["<body>", "<title>", "<head>", "<meta>"],
    correct: 0
  }
];

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const progressEl = document.getElementById("progress");
const scoreEl = document.getElementById("score");
const nextBtn = document.getElementById("next-btn");

let currentQuestion = 0;
let score = 0;
let answered = false;

function showQuestion() {
  answered = false;
  const q = questions[currentQuestion];

  questionEl.textContent = q.question;
  answersEl.replaceChildren();
  scoreEl.textContent = "";
  nextBtn.hidden = true;

  progressEl.textContent =
    `Question ${currentQuestion + 1} of ${questions.length}`;

  q.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-btn";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answersEl.appendChild(button);
  });
}

function selectAnswer(index) {
  if (answered) return;
  answered = true;

  const q = questions[currentQuestion];
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach((button, i) => {
    button.disabled = true;

    if (i === q.correct) {
      button.classList.add("correct");
    } else if (i === index) {
      button.classList.add("wrong");
    }
  });

  if (index === q.correct) {
    score++;
    scoreEl.textContent = "Correct! 🎉";
  } else {
    scoreEl.textContent = "Not quite! Keep going 💪";
  }

  nextBtn.textContent =
    currentQuestion === questions.length - 1
      ? "See Results"
      : "Next Question";

  nextBtn.hidden = false;
}

function showResults() {
  questionEl.textContent = "Quiz Completed! 🏆";
  answersEl.replaceChildren();
  progressEl.textContent = "You answered all the questions!";
  scoreEl.textContent = `Your score: ${score} / ${questions.length}`;

  nextBtn.textContent = "Play Again";
  nextBtn.hidden = false;
  nextBtn.onclick = restartQuiz;
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  nextBtn.onclick = nextQuestion;
  showQuestion();
}

function nextQuestion() {
  if (!answered) return;

  currentQuestion++;

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

nextBtn.addEventListener("click", nextQuestion);

showQuestion();
