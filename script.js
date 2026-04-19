// ============ PAGE NAVIGATION ============
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  const btns = document.querySelectorAll('.nav-btn');
  const order = ['info', 'flashcards', 'practice'];
  btns[order.indexOf(name)].classList.add('active');
 
  if (name === 'flashcards' && currentTopic === null) setTopic('all');
  if (name === 'practice' && !practiceStarted) startPractice();
}
 
// ============ FLASHCARD DATA ============
const allCards = {
  renaissance: [
    { q: "Vad betyder 'Renässansen'?", a: "Pånyttfödelse – återupplivning av antikens idéer" },
    { q: "Var började Renässansen?", a: "I Italien, specifikt i Florens" },
    { q: "Vilken rik familj stöttade Renässansen?", a: "Medici-familjen" },
    { q: "Nämn tre kända renässanskonstnärer", a: "Leonardo da Vinci, Michelangelo, Rafael" },
    { q: "Vad kännetecknar renässansens konst?", a: "Realism, perspektiv och fokus på individen" },
    { q: "Vilken musikkompositör är känd från Renässansen?", a: "Palestrina – känd för flerstämmig musik" },
    { q: "Vilka tre värden stod Renässansen för?", a: "Individualism, livsglädje, människan i centrum" },
  ],
  humanism: [
    { q: "Vad är humanism?", a: "Filosofi som sätter människan i centrum – hon kan tänka och förstå världen själv" },
    { q: "Vad skrev Machiavelli och vad handlar det om?", a: "'Fursten' – om hur en ledare ska behålla makten" },
    { q: "Vad är Erasmus känd för?", a: "Tron på människans grundläggande godhet" },
    { q: "Vad är 'Utopia' och vem skrev det?", a: "Thomas More – en bok om ett idealsamhälle" },
    { q: "Vilken antik filosof inspirerade humanisterna?", a: "Platon" },
  ],
  resor: [
    { q: "Vilket år seglade Columbus till Amerika?", a: "1492" },
    { q: "Vad heter den sjöfarare som seglade till Indien?", a: "Vasco da Gama" },
    { q: "Vem seglade runt jorden?", a: "Magellan" },
    { q: "Varför startade Europas upptäcktsresor?", a: "Nya handelsvägar, bättre teknik (kompass, båtar) och pengar (kapitalism)" },
    { q: "Nämn tre negativa konsekvenser av kolonialismen", a: "Slaveri, sjukdomar som dödade urbefolkning, och kolonisering" },
    { q: "Vad är merkantilism?", a: "Ekonomisk idé: exportera mer än du importerar, tullar för att skydda produktionen" },
  ],
  vetenskap: [
    { q: "Vad är geocentrisk världsbild?", a: "Jorden i centrum av universum (Ptolemaios)" },
    { q: "Vad är heliocentrisk världsbild?", a: "Solen i centrum av solsystemet (Kopernikus)" },
    { q: "Varför brändes Giordano Bruno?", a: "Han hävdade att universum är oändligt – kyrkan dömde honom" },
    { q: "Vad är Tycho Brahes modell?", a: "En blandmodell (geo-heliocentrisk) – planeter kretsar kring solen, men solen kretsar kring jorden" },
    { q: "Vad bevisade Kepler om planeternas banor?", a: "Att de rör sig i ellipser, inte cirklar" },
    { q: "Vad är Galileo Galilei känd för?", a: "Teleskopet och bevis för heliocentrism – dömdes av kyrkan" },
    { q: "Vad upptäckte Isaac Newton?", a: "Gravitationslagen – förklarade varför planeter rör sig som de gör" },
  ],
  religion: [
    { q: "Vad gjorde Martin Luther 1517?", a: "Satte upp sina 95 teser och kritiserade kyrkans avlatsbrev" },
    { q: "Vad är ett avlatsbrev?", a: "Ett brev från kyrkan som man kunde köpa för att 'slippa synder'" },
    { q: "Vad menade Luther med 'tro → frälsning'?", a: "Att man inte behöver köpa sig frälsning, bara tro på Gud räcker" },
    { q: "Vad är predestination (Calvin)?", a: "Tanken att Gud redan bestämt vem som ska räddas" },
    { q: "Vad är Motreformationen?", a: "Katolska kyrkans svar på Luther – de försvarade sin lära" },
    { q: "Vad var Jesuitorden?", a: "En katolsk orden som spred kyrkans budskap under motreformationen" },
    { q: "Vad handlade 30-åriga kriget om?", a: "Krig 1618–1648 mellan katoliker och protestanter, också maktkamp" },
    { q: "Vilken fred avslutade 30-åriga kriget?", a: "Westfaliska freden – Sverige fick nya områden" },
    { q: "Vem ledde Sverige i 30-åriga kriget?", a: "Gustav II Adolf" },
  ],
  politik: [
    { q: "Vad är absolutism?", a: "Styrelseform där kungen har all makt – 'av guds nåd'" },
    { q: "Vem är ett känt exempel på absolutism?", a: "Ludvig XIV av Frankrike (stark absolutism)" },
    { q: "Vad är parlamentarism?", a: "Makt delas mellan kung och parlament" },
    { q: "Vad var Ärorika revolutionen (1688)?", a: "England fick konstitutionell monarki – parlamentet fick mer makt" },
    { q: "Vad hände i Englands inbördeskrig?", a: "Parlamentet besegrade kungen – kungen avrättades" },
  ],
};
 
// ============ FLASHCARD LOGIC ============
let currentTopic = null;
let currentDeck = [];
let cardIndex = 0;
 
function setTopic(topic) {
  document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
  event.target.classList.add('active');
 
  currentTopic = topic;
  if (topic === 'all') {
    currentDeck = Object.entries(allCards).flatMap(([key, cards]) =>
      cards.map(c => ({ ...c, topic: key }))
    );
  } else {
    currentDeck = (allCards[topic] || []).map(c => ({ ...c, topic }));
  }
  currentDeck = shuffle(currentDeck);
  cardIndex = 0;
  renderCard();
}
 
function renderCard() {
  const inner = document.getElementById('cardInner');
  inner.classList.remove('flipped');
  if (currentDeck.length === 0) {
    document.getElementById('cardQuestion').textContent = 'Inga kort hittades.';
    document.getElementById('cardAnswer').textContent = '';
    document.getElementById('cardCounter').textContent = '–';
    document.getElementById('cardTopic').textContent = '';
    return;
  }
  const card = currentDeck[cardIndex];
  document.getElementById('cardQuestion').textContent = card.q;
  document.getElementById('cardAnswer').textContent = card.a;
  document.getElementById('cardTopic').textContent = topicLabel(card.topic);
  document.getElementById('cardCounter').textContent = `${cardIndex + 1} / ${currentDeck.length}`;
}
 
function flipCard() {
  document.getElementById('cardInner').classList.toggle('flipped');
}
 
function nextCard() {
  if (currentDeck.length === 0) return;
  cardIndex = (cardIndex + 1) % currentDeck.length;
  renderCard();
}
 
function prevCard() {
  if (currentDeck.length === 0) return;
  cardIndex = (cardIndex - 1 + currentDeck.length) % currentDeck.length;
  renderCard();
}
 
function topicLabel(t) {
  const map = {
    renaissance: '🌍 Renässansen',
    humanism: '🎭 Humanism',
    resor: '🚢 Upptäcktsresor',
    vetenskap: '🔬 Vetenskap',
    religion: '⛪ Religion & Krig',
    politik: '👑 Politik',
  };
  return map[t] || t;
}
 
// ============ PRACTICE LOGIC ============
const practiceQuestions = [
  { topic: "Renässansen", q: "Vad betyder ordet Renässansen?", hint1: "Det handlar om att 'föda om' något...", hint2: "Det är ett franskt ord som betyder pånyttfödelse av antikens idéer.", keywords: ["pånyttfödelse", "återupplivning", "antiken", "återfödelse"] },
  { topic: "Renässansen", q: "I vilken stad startade Renässansen?", hint1: "Det är en stad i norra Italien.", hint2: "Staden är känd för Medici-familjen och konst.", keywords: ["florens", "florence"] },
  { topic: "Humanism", q: "Nämn en känd humanist och vad hen är känd för.", hint1: "Tänk på Machiavelli, Erasmus eller Thomas More.", hint2: "Machiavelli → 'Fursten'. Erasmus → godhet. Thomas More → 'Utopia'.", keywords: ["machiavelli", "erasmus", "more", "fursten", "utopia"] },
  { topic: "Humanism", q: "Vad är kärntanken i humanismen?", hint1: "Det handlar om vem som är viktig i världen...", hint2: "Människan är i centrum – hon kan tänka och förstå världen själv.", keywords: ["människa", "centrum", "tänka", "förnuft", "individ"] },
  { topic: "Uppfinningar", q: "Vad uppfann Gutenberg och varför var det viktigt?", hint1: "Det hade med spridning av information att göra.", hint2: "Boktryckarkonsten – spred kunskap och böcker snabbt till många.", keywords: ["boktryckarkonst", "tryckpress", "tryck", "böcker", "kunskap"] },
  { topic: "Upptäcktsresor", q: "Vilket år och vem seglade till Amerika?", hint1: "Det var på 1400-talet...", hint2: "1492 – Christofer Columbus.", keywords: ["1492", "columbus"] },
  { topic: "Upptäcktsresor", q: "Nämn en negativ konsekvens av européernas kolonisering.", hint1: "Tänk på vad som hände med ursprungsbefolkningen...", hint2: "Slaveri, sjukdomar som dödade urbefolkning, och tvångskolonisering.", keywords: ["slaveri", "sjukdom", "urbefolkning", "kolonier", "dog"] },
  { topic: "Ekonomi", q: "Vad innebär merkantilism?", hint1: "Det handlar om handel och vem som ska tjäna pengar...", hint2: "Export > import. Staten ska bli rik genom tullar och produktion.", keywords: ["export", "import", "staten", "rik", "tullar"] },
  { topic: "Absolutism", q: "Vad menas med att kungen regerar 'av guds nåd'?", hint1: "Det handlar om vem som gett kungen rätten att styra...", hint2: "Kungen hävdade att Gud hade gett honom rätten att ha all makt.", keywords: ["gud", "guds nåd", "gudomlig", "rätt", "makt"] },
  { topic: "Absolutism", q: "Vem är det viktigaste exemplet på absolutism?", hint1: "Han var kung av Frankrike...", hint2: "Ludvig XIV – 'Solkungen' – hade extrem makt i Frankrike.", keywords: ["ludvig", "frankrike", "solkungen"] },
  { topic: "Parlamentarism", q: "Vad hände i England 1688?", hint1: "Det är ett berömdt namn på en revolution...", hint2: "Ärorika revolutionen – kungen tvingades dela makt med parlamentet → konstitutionell monarki.", keywords: ["ärorika", "revolution", "parlament", "monarki", "maktdelning"] },
  { topic: "Vetenskap", q: "Vad är skillnaden mellan geocentrisk och heliocentrisk världsbild?", hint1: "Geo = jord, helio = sol. Vad är i centrum i respektive?", hint2: "Geocentrisk: Jorden i centrum (Ptolemaios). Heliocentrisk: Solen i centrum (Kopernikus).", keywords: ["jord", "sol", "centrum", "solen", "jorden"] },
  { topic: "Vetenskap", q: "Varför dömdes Galileo Galilei av kyrkan?", hint1: "Det hade med planeternas rörelser att göra...", hint2: "Han bevisade med teleskop att solen var i centrum – det gick emot kyrkans lära.", keywords: ["heliocentrisk", "solen", "centrum", "kyrkan", "teleskop"] },
  { topic: "Vetenskap", q: "Vad är Newton känd för?", hint1: "Tänk på ett äpple som faller...", hint2: "Gravitationslagen – förklarar varför planeter rör sig och varför saker faller.", keywords: ["gravitation", "gravitationslagen", "äpple", "planeter"] },
  { topic: "Reformationen", q: "Vad kritiserade Martin Luther med sina 95 teser?", hint1: "Det hade med pengar och kyrkan att göra...", hint2: "Avlatsbreven – folk betalade till kyrkan för att 'köpa bort' synder.", keywords: ["avlats", "avlatsbrev", "synder", "pengar", "köpa"] },
  { topic: "Reformationen", q: "Vad är Calvins idé om predestination?", hint1: "Det handlar om om framtiden är bestämd...", hint2: "Gud har redan bestämt vem som ska räddas – vi kan inte påverka det.", keywords: ["bestämt", "förutbestämt", "gud", "räddas", "förutbestämd"] },
  { topic: "30-åriga kriget", q: "Vilken fred avslutade 30-åriga kriget och vad fick Sverige?", hint1: "Tänk på platsen för fredsförhandlingarna...", hint2: "Westfaliska freden 1648 – Sverige fick nya territorier.", keywords: ["westfaliska", "westfalen", "fred", "sverige", "territorier", "områden"] },
  { topic: "30-åriga kriget", q: "Vilka stred mot varandra i 30-åriga kriget?", hint1: "Det handlade om religion...", hint2: "Katoliker mot protestanter – med inslag av politisk maktkamp.", keywords: ["katoliker", "protestanter", "religion", "katolsk", "protestant"] },
];
 
let practiceStarted = false;
let practiceQueue = [];
let currentQ = null;
let score = 0;
let total = 0;
const TARGET = 10;
 
function startPractice() {
  practiceStarted = true;
  practiceQueue = shuffle([...practiceQuestions]);
  score = 0;
  total = 0;
  nextQuestion();
}
 
function restartPractice() {
  document.getElementById('practiceWin').style.display = 'none';
  document.getElementById('practiceBox').style.display = 'block';
  startPractice();
}
 
function nextQuestion() {
  if (practiceQueue.length === 0) practiceQueue = shuffle([...practiceQuestions]);
  currentQ = practiceQueue.pop();
 
  document.getElementById('qTopic').textContent = currentQ.topic;
  document.getElementById('questionText').textContent = currentQ.q;
  document.getElementById('hintBox').style.display = 'none';
  document.getElementById('hintBox').textContent = '';
  document.getElementById('hint1Btn').disabled = false;
  document.getElementById('hint2Btn').disabled = false;
  document.getElementById('answerInput').value = '';
  document.getElementById('feedbackBox').className = 'feedback-box';
  document.getElementById('feedbackBox').textContent = '';
  document.getElementById('answerInput').focus();
}
 
function showHint(level) {
  const box = document.getElementById('hintBox');
  box.style.display = 'block';
  if (level === 1) {
    box.textContent = '💡 ' + currentQ.hint1;
    document.getElementById('hint1Btn').disabled = true;
  } else {
    box.textContent = '🔦 ' + currentQ.hint2;
    document.getElementById('hint1Btn').disabled = true;
    document.getElementById('hint2Btn').disabled = true;
  }
}
 
function submitAnswer() {
  const input = document.getElementById('answerInput').value.trim().toLowerCase();
  if (!input) return;
 
  total++;
  const correct = currentQ.keywords.some(kw => input.includes(kw.toLowerCase()));
 
  const fb = document.getElementById('feedbackBox');
  if (correct) {
    score++;
    fb.className = 'feedback-box correct';
    fb.textContent = '✅ Rätt! ' + currentQ.hint2;
  } else {
    fb.className = 'feedback-box wrong';
    fb.textContent = '❌ Inte riktigt. Svaret: ' + currentQ.hint2;
  }
 
  updateScoreDisplay();
 
  if (total >= TARGET) {
    const pct = Math.round((score / total) * 100);
    if (pct >= 80) {
      setTimeout(() => showWin(pct), 1200);
      return;
    }
  }
 
  setTimeout(() => nextQuestion(), 1800);
}
 
function updateScoreDisplay() {
  const pct = total === 0 ? 0 : Math.round((score / total) * 100);
  document.getElementById('scoreText').textContent = `${score} rätt av ${total}`;
  document.getElementById('percentText').textContent = total > 0 ? pct + '%' : '–';
  document.getElementById('progressBar').style.width = (total / TARGET * 100) + '%';
}
 
function showWin(pct) {
  document.getElementById('practiceBox').style.display = 'none';
  const win = document.getElementById('practiceWin');
  win.style.display = 'block';
  const stars = pct >= 90 ? '🌟🌟🌟' : pct >= 80 ? '🌟🌟' : '🌟';
  document.getElementById('winText').textContent =
    `Du fick ${score} rätt av ${total} = ${pct}%. ${stars} Du klarade 80%-gränsen!`;
}
 
// Enter-tangent för att svara
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('answerInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') submitAnswer();
  });
});
 
// ============ UTILS ============
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
