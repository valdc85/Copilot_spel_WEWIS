
// Uitdagingen per vakje
const challenges = [
  "Word: Schrijf een projectintroductie met Copilot.",
  "Excel: Maak een grafiek van een dataset via Copilot.",
  "Outlook: Vat een lange e-mail samen met Copilot.",
  "Teams: Genereer een agenda voor een meeting.",
  "PowerPoint: Maak een creatieve titel voor een presentatie.",
  "Word: Genereer een rapportstructuur.",
  "Excel: Analyseer trends in een tabel.",
  "Outlook: Schrijf een follow-up mail na een vergadering.",
  "Teams: Stel een brainstormlijst op.",
  "Word: Vertaal een tekst naar Engels.",
  "Excel: Maak een formule met Copilot.",
  "Outlook: Stel een out-of-office bericht op.",
  "Teams: Vat een chatgesprek samen.",
  "PowerPoint: Genereer een slide met kernpunten.",
  "Word: Maak een samenvatting van een document.",
  "Excel: Bereken KPI’s met Copilot."
];

const board = document.getElementById("board");
const info = document.getElementById("info");
const scoreboard = document.getElementById("scoreboard");
const timerDisplay = document.getElementById("timer");

const startBtn = document.getElementById("startBtn");
const rollBtn = document.getElementById("rollBtn");
const timerBtn = document.getElementById("timerBtn");

const playerCountInput = document.getElementById("playerCount");

const instructionsBtn = document.getElementById("instructionsBtn");
const instructionsModal = document.getElementById("instructionsModal");
const closeModalBtn = document.getElementById("closeModal");

let players = [];
let scores = [];
let currentPlayer = 0;
let timeLeft = 60;
let timerInterval;

// ===== Modal Instructies =====
instructionsBtn.addEventListener("click", () => {
  instructionsModal.setAttribute("aria-hidden", "false");
  // Focus binnen modal (toegankelijkheid)
  closeModalBtn.focus();
});

closeModalBtn.addEventListener("click", () => {
  instructionsModal.setAttribute("aria-hidden", "true");
  instructionsBtn.focus();
});

// Sluit modal bij klik buiten content
instructionsModal.addEventListener("click", (e) => {
  if (e.target === instructionsModal) {
    instructionsModal.setAttribute("aria-hidden", "true");
    instructionsBtn.focus();
  }
});

// Sluit modal met Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && instructionsModal.getAttribute("aria-hidden") === "false") {
    instructionsModal.setAttribute("aria-hidden", "true");
    instructionsBtn.focus();
  }
});

// ===== Spelbord opbouwen =====
function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < challenges.length; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = "Vak " + (i + 1);
    cell.addEventListener("click", () => {
      info.textContent = `🎯 ${players[currentPlayer]}: ${challenges[i]}`;
    });
    board.appendChild(cell);
  }
}

// ===== Spelers instellen =====
function setupPlayers() {
  const count = parseInt(playerCountInput.value, 10);
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

// ===== Dobbelsteen =====
function rollDice() {
  if (players.length === 0) {
    alert("Start eerst het spel door het aantal spelers te kiezen.");
    return;
  }
  const dice = Math.floor(Math.random() * challenges.length);
  info.textContent = `🎲 ${players[currentPlayer]} gooide ${dice + 1}! Uitdaging: ${challenges[dice]}`;
}

// ===== Scorebord =====
function updateScoreboard() {
  scoreboard.innerHTML = "";
  players.forEach((player, index) => {
    const row = document.createElement("div");
    row.className = "row";
    row.innerHTML = `
      <span class="name">${player}</span>
      <span>${scores[index]} punten</span>
      <button aria-label="Geef punt aan ${player}" data-idx="${index}">+1 Punt</button>
    `;
    const btn = row.querySelector("button");
    btn.addEventListener("click", () => addPoint(index));
    scoreboard.appendChild(row);
  });
}

// Punt toevoegen en beurt wisselen
function addPoint(index) {
  scores[index]++;
  updateScoreboard();
  nextPlayer();
}

function nextPlayer() {
  currentPlayer = (currentPlayer + 1) % players.length;
  info.textContent = `Nu is ${players[currentPlayer]} aan de beurt.`;
}

// ===== Timer =====
function startTimer() {
  clearInterval(timerInterval);
  timeLeft = 60;
  timerDisplay.textContent = "⏱ Tijd: " + timeLeft + " seconden";
  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = "⏱ Tijd: " + timeLeft + " seconden";
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      const summary = players.map((p, i) => `${p}: ${scores[i]} punten`).join("\n");
      alert("⏰ Tijd is om! Eindscore:\n" + summary);
    }
  }, 1000);
}

// ===== Event Listeners =====
startBtn.addEventListener("click", setupPlayers);
rollBtn.addEventListener("click", rollDice);
timerBtn.addEventListener("click", startTimer);
