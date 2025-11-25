
const challenges = [
    // Mix van oude en nieuwe uitdagingen
    // "Word: Schrijf een projectintroductie met Copilot.",
    // "Excel: Maak een grafiek van een dataset via Copilot.",
    // "Outlook: Vat een lange e-mail samen met Copilot.",
    // "Teams: Genereer een agenda voor een meeting.",
    “Vraag Copilot om een grappige titel voor een PowerPoint over deze community”,
  "Je wil een grafiek in Excel. Welke prompt gebruik je?",
    "Je wil een samenvatting van een document in Word. Schrijf een goede prompt.",
    "Je wil een e-mail herschrijven in een vriendelijke toon. Hoe vraag je dat?",
    "Je wil een brainstormlijst in Teams. Formuleer een duidelijke prompt.",
    "Je wil een PowerPoint-slide met 3 kernpunten. Welke prompt geef je?",
    "Je wil een KPI-overzicht in Excel. Hoe vraag je dat aan Copilot?",
    "Je wil een agenda voor een projectmeeting. Schrijf een voorbeeldprompt.",
  "Gebruik Copilot om een lijst te maken van 5 redenen waarom Copilot beter is dan koffie.”,
    "Je wil een titel voor een rapport in Word. Hoe formuleer je dat?",
    "Je wil een follow-up mail na een vergadering. Geef een goede prompt.",
    "Je wil een tekst vertalen naar Engels. Hoe vraag je dat aan Copilot?"
  “Vraag Copilot om een slogan voor jouw team, alsof het een rockband is.”
    “Laat Copilot een gedicht maken over deadlines.”
];

const knowledgeQuestions = [
  {
    question: "Wat doet Copilot in Outlook?",
    options: ["Maakt vergaderingen", "Vat e-mails samen en stelt antwoorden voor", "Verwijdert spam"],
    correct: 1
  },
  {
    question: "Wat is een goede tip voor een prompt?",
    options: ["Wees vaag", "Geef context en doel", "Gebruik één woord"],
    correct: 1
  },
  {
    question: "Waar vind je Copilot in Excel?",
    options: ["In de lintbalk bij ‘Invoegen’", "In de Copilot-knop rechtsboven", "In de statusbalk"],
    correct: 1
  },
  {
    question: "Welke prompt is het meest effectief voor Word?",
    options: ["Schrijf iets", "Maak een rapport over Q4-resultaten met samenvatting en conclusies", "Doe iets met tekst"],
    correct: 1
  }
];

// ====== Elementen ======
const board = document.getElementById("board");
const info = document.getElementById("info");
const scoreboard = document.getElementById("scoreboard");
const review = document.getElementById("review");
const currentPlayerName = document.getElementById("currentPlayerName");
const timerEl = document.getElementById("timer");

// Knoppen
const startBtn = document.getElementById("startBtn");
const rollBtn = document.getElementById("rollBtn");
const timerBtn = document.getElementById("timerBtn");
const knowledgeBtn = document.getElementById("knowledgeBtn");
const instructionsBtn = document.getElementById("instructionsBtn");
const closeModalBtn = document.getElementById("closeModal");

// Modal
const instructionsModal = document.getElementById("instructionsModal");

// ====== State ======
let players = [];
let scores = [];
let currentPlayer = 0;
let timeLeft = 60;
let timerInterval = null;

// ====== Bord ======
function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < challenges.length; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = "Vak " + (i + 1);
    cell.addEventListener("click", () => showChallenge(challenges[i]));
    board.appendChild(cell);
  }
}

// ====== Spelers ======
function setupPlayers() {
  const count = parseInt(document.getElementById("playerCount").value, 10);
  if (Number.isNaN(count) || count < 2 || count > 6) {
    alert("Kies tussen 2 en 6 spelers.");
    return;
  }
  players = [];
  scores = [];
  for (let i = 1; i <= count; i++) {
    players.push("Speler " + i);
    scores.push(0);
  }
  currentPlayer = 0;
  updateScoreboard();
  createBoard();
  info.textContent = `Spel gestart met ${count} spelers! ${players[0]} begint.`;
}

// ====== Uitdaging + review ======
function showChallenge(challenge) {
  info.textContent = `🎯 ${players[currentPlayer]}: ${challenge}`;
  review.setAttribute("aria-hidden", "false");
  currentPlayerName.textContent = players[currentPlayer];
}

function rollDice() {
  const dice = Math.floor(Math.random() * challenges.length);
  showChallenge(challenges[dice]);
}

// ====== Scorebord ======
function updateScoreboard() {
  scoreboard.innerHTML = "";
  players.forEach((p, i) => {
    const row = document.createElement("div");
    row.className = "row";
    row.textContent = `${p}: ${scores[i]} punten`;
    scoreboard.appendChild(row);
  });
}

// ====== Punten en beurt ======
function addPoint() {
  scores[currentPlayer]++;
  updateScoreboard();
  nextPlayer();
}

function nextPlayer() {
  currentPlayer = (currentPlayer + 1) % players.length;
  review.setAttribute("aria-hidden", "true");
  info.textContent = `Nu is ${players[currentPlayer]} aan de beurt.`;
}

// ====== Timer ======
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 60;
  timerEl.textContent = "⏱ Tijd: " + timeLeft + " seconden";
  timerInterval = setInterval(() => {
    timeLeft--;
    timerEl.textContent = "⏱ Tijd: " + timeLeft + " seconden";
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      const summary = players.map((p, i) => `${p}: ${scores[i]} punten`).join("\n");
      alert("⏰ Tijd is om! Eindscore:\n" + summary);
    }
  }, 1000);
}

// ====== Kennisronde ======
function startKnowledgeRound() {
  if (players.length === 0) {
    alert("Start eerst het spel door het aantal spelers te kiezen.");
    return;
  }
  const q = knowledgeQuestions[Math.floor(Math.random() * knowledgeQuestions.length)];
  info.innerHTML = `<strong>${players[currentPlayer]}:</strong> ${q.question}<br>` +
    q.options
      .map((opt, i) => `<button class="secondary" data-idx="${i}">${opt}</button>`)
      .join(" ");
  review.setAttribute("aria-hidden", "true");

  // Bind eenmalige click handlers op opties
  const buttons = info.querySelectorAll("button[data-idx]");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const sel = parseInt(btn.getAttribute("data-idx"), 10);
      checkAnswer(sel, q.correct);
    }, { once: true });
  });
}

function checkAnswer(selected, correct) {
  if (selected === correct) {
    alert("✅ Goed antwoord!");
    scores[currentPlayer]++;
  } else {
    alert("❌ Fout antwoord!");
  }
  updateScoreboard();
  nextPlayer();
}

// ====== Modal Instructies ======
instructionsBtn.addEventListener("click", () => {
  instructionsModal.setAttribute("aria-hidden", "false");
  closeModalBtn.focus();
});
closeModalBtn.addEventListener("click", () => {
  instructionsModal.setAttribute("aria-hidden", "true");
});
instructionsModal.addEventListener("click", (e) => {
  if (e.target === instructionsModal) {
    instructionsModal.setAttribute("aria-hidden", "true");
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && instructionsModal.getAttribute("aria-hidden") === "false") {
    instructionsModal.setAttribute("aria-hidden", "true");
  }
});

// ====== Event listeners ======
startBtn.addEventListener("click", setupPlayers);
rollBtn.addEventListener("click", rollDice);
timerBtn.addEventListener("click", startTimer);
knowledgeBtn.addEventListener("click", startKnowledgeRound);
document.getElementById("goodBtn").addEventListener("click", addPoint);
document.getElementById("badBtn").addEventListener("click", nextPlayer);
