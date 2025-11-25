
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

let players = ["Speler 1", "Speler 2", "Speler 3"];
let scores = [0, 0, 0];
let currentPlayer = 0;
let timeLeft = 60;
let timerInterval;

// Maak het bord
for (let i = 0; i < challenges.length; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.textContent = "Vak " + (i + 1);
    cell.onclick = () => {
        info.textContent = `🎯 ${players[currentPlayer]}: ${challenges[i]}`;
    };
    board.appendChild(cell);
}

function rollDice() {
    const dice = Math.floor(Math.random() * challenges.length);
    info.textContent = `🎲 ${players[currentPlayer]} gooide ${dice + 1}! Uitdaging: ${challenges[dice]}`;
}

function updateScoreboard() {
    scoreboard.innerHTML = "";
    players.forEach((player, index) => {
        const playerRow = document.createElement("div");
        playerRow.innerHTML = `${player}: ${scores[index]} punten 
        <button onclick="addPoint(${index})">+1 Punt</button>`;
        scoreboard.appendChild(playerRow);
    });
}

function addPoint(index) {
    scores[index]++;
    updateScoreboard();
    nextPlayer();
}

function nextPlayer() {
    currentPlayer = (currentPlayer + 1) % players.length;
}

function startTimer() {
    clearInterval(timerInterval);
    timeLeft = 60;
    timerDisplay.textContent = "⏱ Tijd: " + timeLeft + " seconden";
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = "⏱ Tijd: " + timeLeft + " seconden";
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("⏰ Tijd is om! Eindscore:\n" + players.map((p, i) => `${p}: ${scores[i]} punten`).join("\n"));
        }
    }, 1000);
}

updateScoreboard();
