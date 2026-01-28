// ✅ quiz.js — Cordova version with strict online check
let allQuestions = window.quizQuestions || [];  // loaded from quiz1.js ... quiz10.js
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

// ==========================================================
// ✅ QUIZ CORE FUNCTIONS
// ==========================================================
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
    btn.onclick = () => checkAnswer(i);
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
// ✅ STRICT INTERNET CHECK (CORDOVA + FETCH)
// ==========================================================

// Function to actually verify internet access
async function hasInternetAccess() {
  try {
    const response = await fetch("https://www.google.com/favicon.ico", {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store",
    });
    return true; // if fetch didn’t throw, assume connected
  } catch (err) {
    return false;
  }
}

async function updateOnlineStatus() {
  let connected = false;

  // Check network adapter status (Cordova plugin)
  if (window.cordova && navigator.connection) {
    const type = navigator.connection.type;
    if (type && type !== Connection.NONE && type !== "none") {
      // may adapter, pero check natin kung may totoong internet
      connected = await hasInternetAccess();
    }
  } else {
    // fallback sa browser
    connected = navigator.onLine && await hasInternetAccess();
  }

  if (!connected) {
    // OFFLINE
    statusEl.textContent = "⚠️ You are offline. Please connect to the internet to start the quiz.";
    quizEl.style.display = "none";
    modeSelect.disabled = true;
  } else {
    // ONLINE
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

// ✅ Fallback for browser testing
if (!window.cordova) {
  window.addEventListener("online", updateOnlineStatus);
  window.addEventListener("offline", updateOnlineStatus);
  updateOnlineStatus();
}