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
  {question:"Wat doet Copilot in Outlook?",options:["Maakt vergaderingen","Vat e-mails samen","Verwijdert spam"],correct:1},
  {question:"Wat is een goede tip voor een prompt?",options:["Wees vaag","Geef context en doel","Gebruik één woord"],correct:1},
  {question:"Waar vind je Copilot in Excel?",options:["Lintbalk","Copilot-knop rechtsboven","Statusbalk"],correct:1}
];

let players=[],scores=[],currentPlayer=0,timeLeft=60,timerInterval;

const board=document.getElementById("board"),info=document.getElementById("info"),scoreboard=document.getElementById("scoreboard"),review=document.getElementById("review"),currentPlayerName=document.getElementById("currentPlayerName");

function createBoard(){
  board.innerHTML="";
  for(let i=0;i<challenges.length;i++){
    const cell=document.createElement("div");
    cell.className="cell";cell.textContent="Vak "+(i+1);
    cell.onclick=()=>showChallenge(challenges[i]);
    board.appendChild(cell);
  }
}

function setupPlayers(){
  const count=parseInt(document.getElementById("playerCount").value);
  if(count<2||count>6){alert("Kies tussen 2 en 6 spelers.");return;}
  players=[];scores=[];
  for(let i=1;i<=count;i++){players.push("Speler "+i);scores.push(0);}
  currentPlayer=0;updateScoreboard();createBoard();
  info.textContent=`Spel gestart met ${count} spelers! ${players[0]} begint.`;
}

function showChallenge(challenge){
  info.textContent=`🎯 ${players[currentPlayer]}: ${challenge}`;
  review.style.display="block";currentPlayerName.textContent=players[currentPlayer];
}

function rollDice(){
  const dice=Math.floor(Math.random()*challenges.length);
  showChallenge(challenges[dice]);
}

function updateScoreboard(){
  scoreboard.innerHTML="";
  players.forEach((p,i)=>{
    const row=document.createElement("div");
    row.className="row";row.textContent=`${p}: ${scores[i]} punten`;
    scoreboard.appendChild(row);
  });
}

function addPoint(){scores[currentPlayer]++;updateScoreboard();nextPlayer();}
function nextPlayer(){currentPlayer=(currentPlayer+1)%players.length;review.style.display="none";info.textContent=`Nu is ${players[currentPlayer]} aan de beurt.`;}

function startTimer(){
  clearInterval(timerInterval);timeLeft=60;
  document.getElementById("timer").textContent="⏱ Tijd: "+timeLeft+" seconden";
  timerInterval=setInterval(()=>{
    timeLeft--;document.getElementById("timer").textContent="⏱ Tijd: "+timeLeft+" seconden";
    if(timeLeft<=0){clearInterval(timerInterval);alert("⏰ Tijd om! Eindscore:\n"+players.map((p,i)=>`${p}: ${scores[i]} punten`).join("\n"));}},1000);
}

function startKnowledgeRound(){
  const q=knowledgeQuestions[Math.floor(Math.random()*knowledgeQuestions.length)];
  info.innerHTML=`<strong>${players[currentPlayer]}:</strong> ${q.question}<br>`+
  q.options.map((opt,i)=>`<button onclick="checkAnswer(${i},${q.correct})">${opt}</button>`).join("<br>");
  review.style.display="none";
}

function checkAnswer(sel,correct){
  if(sel===correct){alert("✅ Goed antwoord!");scores[currentPlayer]++;}else{alert("❌ Fout antwoord!");}
  updateScoreboard();nextPlayer();
}

// Event listeners
document.getElementById("startBtn").onclick=setupPlayers;
document.getElementById("rollBtn").onclick=rollDice;
document.getElementById("timerBtn").onclick=startTimer;
document.getElementById("knowledgeBtn").onclick=startKnowledgeRound;
document.getElementById("goodBtn").onclick=addPoint;
document.getElementById("badBtn").onclick=nextPlayer;
document.getElementById("instructionsBtn").onclick=()=>document.getElementById("instructionsModal").setAttribute("aria-hidden","false");
document.getElementById("closeModal").onclick=()=>document.getElementById("instructionsModal").setAttribute("aria-hidden","true");
