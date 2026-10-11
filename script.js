

const questions = [
  {
    question: "Hasil dari 3² + 4² adalah ...",
    answers: ["12", "25", "49", "14"],
    correct: 1
  },
  {
    question: "Jika 2x + 6 = 16, nilai x adalah ...",
    answers: ["3", "4", "5", "6"],
    correct: 2
  },
  {
    question: "Organ tubuh manusia yang memompa darah adalah ...",
    answers: ["Paru-paru", "Ginjal", "Jantung", "Hati"],
    correct: 2
  },
  {
    question: "Proses tumbuhan membuat makanan sendiri disebut ...",
    answers: [
      "Respirasi",
      "Fotosintesis",
      "Evaporasi",
      "Adaptasi"
    ],
    correct: 1
  },
  {
    question: "Zat yang memiliki bentuk dan volume tetap adalah ...",
    answers: ["Gas", "Cair", "Padat", "Uap"],
    correct: 2
  },
  {
    question: "Kegiatan membeli barang dari luar negeri disebut ...",
    answers: ["Ekspor", "Impor", "Produksi", "Distribusi"],
    correct: 1
  },
  {
    question: "ASEAN merupakan organisasi negara-negara di kawasan ...",
    answers: [
      "Asia Tenggara",
      "Asia Timur",
      "Eropa Barat",
      "Afrika Utara"
    ],
    correct: 0
  },
  {
    question: "Gagasan utama dalam sebuah paragraf disebut ...",
    answers: [
      "Kalimat penutup",
      "Ide pokok",
      "Kata penghubung",
      "Kalimat tanya"
    ],
    correct: 1
  },
  {
    question: "Sinonim kata 'cermat' adalah ...",
    answers: ["Ceroboh", "Teliti", "Lambat", "Ragu"],
    correct: 1
  },
  {
    question: "What is the past form of 'go'?",
    answers: ["Goed", "Gone", "Went", "Going"],
    correct: 2
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
