
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

const board = document.getElementById("board");
const info = document.getElementById("info");
const scoreboard = document.getElementById("scoreboard");
const timerDisplay = document.getElementById("timer");
const reviewSection = document.getElementById("review");
const currentPlayerNameSpan = document.getElementById("currentPlayerName");

let players = [];
let scores = [];
let currentPlayer = 0;
let timeLeft = 60;
let timerInterval;

// Bord opbouwen
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

function setupPlayers() {
    const count = parseInt(document.getElementById("playerCount").value);
    if (count < 2 || count > 6) {
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

function rollDice() {
    const dice = Math.floor(Math.random() * challenges.length);
    showChallenge(challenges[dice]);
}

function showChallenge(challenge) {
    info.textContent = `🎯 ${players[currentPlayer]}: ${challenge}`;
    reviewSection.style.display = "block";
    currentPlayerNameSpan.textContent = players[currentPlayer];
}

function updateScoreboard() {
    scoreboard.innerHTML = "";
    players.forEach((player, index) => {
        const row = document.createElement("div");
        row.className = "row";
        row.innerHTML = `${player}: ${scores[index]} punten`;
        scoreboard.appendChild(row);
    });
}

function addPoint() {
    scores[currentPlayer]++;
    updateScoreboard();
    nextPlayer();
}

function nextPlayer() {
    currentPlayer = (currentPlayer + 1) % players.length;
    reviewSection.style.display = "none";
    info.textContent = `Nu is ${players[currentPlayer]} aan de beurt.`;
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

// Event listeners
document.getElementById("startBtn").addEventListener("click", setupPlayers);
document.getElementById("rollBtn").addEventListener("click", rollDice);
document.getElementById("timerBtn").addEventListener("click", startTimer);
document.getElementById("goodBtn").addEventListener("click", addPoint);
document.getElementById("badBtn").addEventListener("click", nextPlayer);

// Modal instructies
document.getElementById("instructionsBtn").addEventListener("click", () => {
    document.getElementById("instructionsModal").setAttribute("aria-hidden", "false");
});
document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("instructionsModal").setAttribute("aria-hidden", "true");
});


const knowledgeQuestions = [
    {
        question: "Wat doet Copilot in Outlook?",
        options: ["Maakt automatisch vergaderingen aan", "Vat e-mails samen en stelt antwoorden voor", "Verwijdert spam"],
        correct: 1
    },
    {
        question: "Welke prompt is het meest effectief voor Copilot in Word?",
        options: ["Schrijf iets", "Maak een rapport over Q4-resultaten met een samenvatting en conclusies", "Doe iets met tekst"],
        correct: 1
    },
    {
        question: "Waar vind je Copilot in Excel?",
        options: ["In de lintbalk bij ‘Invoegen’", "In de Copilot-knop rechtsboven", "In de statusbalk"],
        correct: 1
    },
    {
        question: "Wat is een goede tip voor een prompt?",
        options: ["Wees vaag", "Geef context en doel", "Gebruik alleen één woord"],
        correct: 1
    }
];

document.getElementById("knowledgeBtn").addEventListener("click", startKnowledgeRound);

function startKnowledgeRound() {
    const q = knowledgeQuestions[Math.floor(Math.random() * knowledgeQuestions.length)];
    info.innerHTML = `<strong>${players[currentPlayer]}:</strong> ${q.question}<br>
        ${q.options.map((opt, i) => `<button onclick="checkAnswer(${i}, ${q.correct})">${opt}</button>`).join("<br>")}`;
    reviewSection.style.display = "none"; // geen promptbeoordeling hier
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

