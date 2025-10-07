// ✅ quiz.js — Cordova version with offline detection
let allQuestions = window.quizQuestions || [];  // loaded galing sa quiz1.js ... quiz10.js
let currentQuestion = 0;
let score = 0;
let wrongQuestions = [];
let mode = "all";

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const scoreEl = document.getElementById("score");
const modeSelect = document.getElementById("modeSelect");
const quizEl = document.getElementById("quiz");
const statusEl = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");
const shuffleBtn = document.getElementById("shuffleBtn");
const backBtn = document.getElementById("backBtn");

function getActiveQuestions() {
  return mode === "all" ? allQuestions : wrongQuestions;
}

function loadQuestion() {
  const active = getActiveQuestions();
  if (active.length === 0) {
    questionEl.textContent = "No questions to show in this mode.";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
    return;
  }
  const q = active[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(i, btn);
    optionsEl.appendChild(btn);
  });
}

function checkAnswer(selected) {
  const active = getActiveQuestions();
  const correct = active[currentQuestion].answer;
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach((b, i) => {
    if (i === correct) b.classList.add("correct");
    if (i === selected && i !== correct) b.classList.add("wrong");
    b.disabled = true;
  });
  if (selected === correct) {
    score++;
  } else {
    if (!wrongQuestions.includes(active[currentQuestion])) {
      wrongQuestions.push(active[currentQuestion]);
    }
  }
  scoreEl.textContent = `Score: ${score} / ${allQuestions.length}`;
  nextBtn.style.display = "block";
}

nextBtn.onclick = () => {
  const active = getActiveQuestions();
  currentQuestion++;
  if (currentQuestion < active.length) {
    loadQuestion();
    nextBtn.style.display = "none";
  } else {
    questionEl.textContent = "Review Finished!";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
  }
};

modeSelect.addEventListener("change", () => {
  mode = modeSelect.value;
  currentQuestion = 0;
  loadQuestion();
  nextBtn.style.display = "none";
});

resetBtn.onclick = () => {
  currentQuestion = 0;
  score = 0;
  wrongQuestions = [];
  scoreEl.textContent = "";
  loadQuestion();
  nextBtn.style.display = "none";
};

shuffleBtn.onclick = () => {
  allQuestions = allQuestions.sort(() => Math.random() - 0.5);
  resetBtn.click();
};

backBtn.onclick = () => {
  window.location.href = "quiz-menu.html"; // balik sa main menu kung meron
};

// ==========================================================
// ✅ OFFLINE/ONLINE DETECTION (CORDOVA VERSION)
// ==========================================================

function updateOnlineStatus() {
  // Gumamit ng Cordova network information kung available
  let isOffline = false;

  if (window.cordova && navigator.connection) {
    const networkState = navigator.connection.type;
    isOffline = (networkState === Connection.NONE || networkState === "none");
  } else {
    // fallback sa browser
    isOffline = !navigator.onLine;
  }

  if (isOffline) {
    // OFFLINE MODE
    statusEl.textContent = "⚠️ You are offline. Please connect to the internet to start the quiz.";
    quizEl.style.display = "none";
    modeSelect.disabled = true;
  } else {
    // ONLINE MODE
    statusEl.textContent = "";
    quizEl.style.display = "block";
    modeSelect.disabled = false;
    loadQuestion();
  }
}

// ✅ Cordova events
document.addEventListener("deviceready", function () {
  updateOnlineStatus();
  document.addEventListener("online", updateOnlineStatus, false);
  document.addEventListener("offline", updateOnlineStatus, false);
});

// ✅ Fallback for browser testing (optional)
if (!window.cordova) {
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  updateOnlineStatus();
}