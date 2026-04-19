// ============ PAGE NAVIGATION ============
function showPage(name) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('page-' + name).classList.add('active');
  const order = ['info', 'flashcards', 'practice'];
  document.querySelectorAll('.nav-btn')[order.indexOf(name)].classList.add('active');
  if (name === 'flashcards' && currentTopic === null) setTopic('all', { target: document.querySelectorAll('.topic-btn')[0] });
  if (name === 'practice' && !practiceStarted) startPractice();
}

// ============ FLASHCARD DATA ============
const allCards = {
  resor: [
    { q: "Varför kallas ursprungsbefolkningen i Amerika 'indianer'?", a: "Columbus trodde han nått Indien 1492 och kallade invånarna indios – namnet fastnade trots att det var fel." },
    { q: "Vad var den ekonomiska drivkraften bakom de europeiska upptäcktsresorna?", a: "Man ville hitta billigare sjövägar till Asiens kryddor och lyxvaror – den gamla landruten kontrollerades av osmaner och arabiska köpmän." },
    { q: "Nämn två förbättringar i navigationskonsten som möjliggjorde resorna.", a: "Kompassen (riktning på öppet hav) och astrolabiet (mätte latitud). Också bättre kartor och karavellskeppet." },
    { q: "På vilka områden var européerna respektive asiaterna framstående?", a: "Europa: militär teknik, skjutvapen, sjöfart. Asien: hantverk, kryddor, siden, porslin, matematik och astronomi." },
    { q: "Vad betydde den nya sjövägen för handelskostnaderna?", a: "Enormt billigare – man slapp betala tullar och mellanhänder längs landruten. Europas handelscentra skiftade från Medelhavet till Atlanten." },
    { q: "Varför var mötet med européerna mer ödesdigert i Amerika än i Asien?", a: "Amerikanerna saknade immunitet mot europeiska sjukdomar. Upp till 90% dog. I Asien hade folk viss immunitet via tidigare kontakt." },
    { q: "Nämn tre amerikanska grödor som spred sig till Europa.", a: "Potatis, majs och tomat (även kakao och tobak)." },
    { q: "Vilka viktiga komponenter saknades i de amerikanska högkulturerna?", a: "Hjulet i praktiken, dragdjur (hästar/oxar), järnteknik och utbredd skriftkultur." },
    { q: "Hur kunde amerikanska civilisationer ändå bli så avancerade utan dessa?", a: "Avancerat jordbruk med terrasser och bevattning, stark organisation (Inca, Aztec), sofistikerad matematik och astronomi." },
    { q: "Vilka resurser i Amerika var intressanta för européerna?", a: "Guld och silver (Peru, Mexiko), nya grödor (potatis, majs, tobak), bördig mark för socker och bomull." },
  ],
  ekonomi: [
    { q: "Varför var den långväga handeln ett genombrott för kapitalismen?", a: "Krävde stora investeringar i förväg. Investerare tog risk men fick enorm vinst. Ledde till handelskompanjier, aktier och riskdelning." },
    { q: "Vad innebar förlagssystemet?", a: "En köpman köpte råmaterial och förlade det till hemarbetare som tillverkade varor hemma. Köpmannen sålde sedan varorna – tidig industriproduktion." },
    { q: "Varför steg priserna under 1500- och 1600-talen?", a: "Massiva mängder silver och guld från Amerika → mer pengar i omlopp utan fler varor → inflation. Också befolkningstillväxt ökade efterfrågan." },
    { q: "Hur försörjde sig de flesta människor vid den här tiden?", a: "Som bönder i subsistensjordbruk – de odlade det de åt och sålde lite överskott på lokala marknader." },
  ],
  vetenskap: [
    { q: "Sammanfatta kyrkans världsbild under medeltiden.", a: "Geocentrisk – Jorden i centrum, skapad av Gud, oföränderlig. Stjärnor fästa i kristallsfärer. Stämde ej: planeter rörde sig konstigt, observationer matchade inte modellen." },
    { q: "Hur bidrog Copernicus till den nya världsbilden?", a: "Lade fram heliocentrisk modell – solen i centrum av solsystemet. Väntade med att publicera tills han låg för döden av rädsla för kyrkan." },
    { q: "Hur bidrog Kepler till den nya världsbilden?", a: "Bevisade matematiskt att planeter rör sig i ellipser, inte perfekta cirklar." },
    { q: "Hur bidrog Galilei till den nya världsbilden?", a: "Använde teleskop och observerade Jupiters månar – bevisade att inte allt kretsar kring Jorden. Dömdes och husarresterades av kyrkan." },
    { q: "Hur bidrog Newton till den nya världsbilden?", a: "Gravitationslagen förklarade varför planeterna rör sig – band samman himmelska och jordiska rörelser i en teori." },
    { q: "Hur ställde sig kyrkan till den vetenskapliga revolutionen?", a: "Motstod idéer som hotade Bibelns auktoritet. Bruno brändes, Galilei dömdes. Kopernikus väntade med att publicera." },
    { q: "Hur förhöll sig renässansen till medeltidens världsbild?", a: "Renässansen bröt med medeltidens gudcentrerade bild och satte människan i centrum. Återvände till antiken och kombinerade det med kristendomen." },
  ],
  reformation: [
    { q: "Vad var ett avlatsbrev?", a: "Ett brev som kyrkan sålde för att garantera förlåtelse av synder. Luther ansåg det vara korruption – man kan inte köpa frälsning." },
    { q: "Hur kunde man nå frälsning enligt Luther?", a: "Genom tro allena (sola fide) – inte via gärningar, pengar eller präster. Direkt relation med Gud. Bibeln = högsta auktoritet." },
    { q: "Hur skiljde sig Luthers syn från den katolska kyrkans?", a: "Katolska kyrkan: frälsning via kyrkan, sakrament och goda gärningar. Luther: tro räcker, ingen mellanhand behövs." },
    { q: "Hur lockades bönder av Luthers lära?", a: "Hoppades att Luthers frihetstankar ledde till social frihet och lättnad från skatter och feodala plikter." },
    { q: "Hur lockades furstar av Luthers lära?", a: "Ville ta kyrkans mark och rikedomar, slippa betala till påven i Rom och stärka sin makt mot kejsaren." },
    { q: "Vilka likheter finns det mellan renässansen och Luthers budskap?", a: "Båda betonade individens förmåga att tänka och förstå. Båda ifrågasatte kyrkans monopol på sanningen." },
    { q: "Nämn två skillnader mellan kalvinism och lutheranism.", a: "1) Predestination: Calvin – Gud bestämt vem som räddas. Luther – fri vilja. 2) Nattvarden: Calvin = symbolisk. Luther = Kristus verkligen närvarande." },
    { q: "Vad var motreformationen?", a: "Katolska kyrkans svar på protestantismen: Jesuitorden spred tron, Tridentinska mötet definierade läran, inkvisitionen stärktes." },
  ],
  krig: [
    { q: "Vilka grupper stöttade kungarna när de stärkte sin makt?", a: "Borgerskapet (ville ha stabilitet och lagar) och kyrkan. I utbyte: borgarna fick handelsprivilegier, kyrkan fick beskydd." },
    { q: "Varför blev krigföringen mer storskalig under 1500–1600-talen?", a: "Nya vapen (krut, kanoner, musketer) kräver fler soldater. Starka stater hade råd med legosoldatarméer. Religionskrigen mobiliserade folkmassor." },
    { q: "Hur påverkades civilbefolkningen av krigen på 1600-talet?", a: "Legosoldater plundrade byar. Svält och sjukdomar tog fler liv än striderna. Stora delar av tyska länder avfolkades." },
    { q: "Vad var Habsburg mål i 30-åriga kriget? Lyckades de?", a: "Mål: Återkatolicera riket och stärka makten över furstarna. Nej – Westfaliska freden 1648 stoppade dem, furstarna behöll makt och religion." },
    { q: "Vilka var Habsburgs motståndare och vad ville de?", a: "Protestantiska furstar (behålla religion/självstyre), Frankrike (försvaga Habsburg – maktpolitik), Sverige (stödde protestanter + expanderade)." },
    { q: "Nämn länder där centralmakten INTE stärktes.", a: "Polen (adelsvälde), Nederlanderna (republik), England (parlamentet avrättade kungen), Tysk-romerska riket (furstarna vann mot kejsaren)." },
    { q: "Hur stämmer 1500–1600-talens trender in på Sverige?", a: "Ja på alla: erövringar (Östersjön), reformationen (Gustav Vasa 1527), stärkt centralmakt, och fler/större krig (stormakt 1600-tal)." },
    { q: "Vilka var orsakerna till Spaniens stormakts tillbakagång?", a: "Dyra krig tömde kassan, silverinflation, utvisning av moriska/judiska köpmän, Nederländerna revolterade och bröt sig loss." },
    { q: "Vilka religiösa grupper fanns i Habsburgs områden? Hur behandlades de?", a: "Spanien: protestanter och judar förföljdes av inkvisitionen. Österrike: protestanter tvångskatolicerades." },
    { q: "Vad var det tysk-romerska riket och vilken makt hade Habsburg?", a: "Löst samarbete av hundratals tyska furstendömen. Habsburg var kejsare men hade svag kontroll – kejsaren valdes, furstarna var mäktiga." },
  ],
};

// ============ FLASHCARD LOGIC ============
let currentTopic = null;
let currentDeck = [];
let cardIndex = 0;

function setTopic(topic, event) {
  document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
  if (event && event.target) event.target.classList.add('active');
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
  const map = { resor: '🚢 Upptäckter', ekonomi: '💰 Ekonomi', vetenskap: '🔬 Vetenskap', reformation: '⛪ Reformation', krig: '💣 Krig & Makt' };
  return map[t] || t;
}

// ============ PRACTICE QUESTIONS ============
const practiceQuestions = [
  { topic: "Upptäckter", q: "Varför kallas ursprungsbefolkningen i Amerika 'indianer'?", hint1: "Tänk på vart Columbus trodde att han for...", hint2: "Columbus trodde han nått Indien och kallade dem indios – namnet fastnade.", keywords: ["indien", "indios", "columbus", "trodde"] },
  { topic: "Upptäckter", q: "Vad var den ekonomiska drivkraften bakom upptäcktsresorna?", hint1: "Det handlade om handel med ett specifikt världsdel...", hint2: "Man ville hitta billigare sjövägar till Asiens kryddor och lyxvaror, förbi osmanska mellanhänder.", keywords: ["handel", "kryddor", "asien", "handelsväg", "sjöväg"] },
  { topic: "Upptäckter", q: "Nämn en navigationsförbättring som möjliggjorde resorna.", hint1: "Ett redskap som visar riktning...", hint2: "Kompassen (riktning), astrolabiet (latitud) eller karavellskeppet.", keywords: ["kompass", "astrolabe", "astrolabiet", "karavel", "karta"] },
  { topic: "Upptäckter", q: "Varför var mötet med européerna så mycket mer dödligt i Amerika än i Asien?", hint1: "Det handlar om kroppens försvar mot sjukdomar...", hint2: "Amerikanerna saknade immunitet mot europeiska sjukdomar. I Asien hade folk viss immunitet via tidigare kontakt.", keywords: ["immunitet", "sjukdom", "smittkoppor", "immunförsvar", "90"] },
  { topic: "Upptäckter", q: "Nämn två amerikanska grödor som spred sig till Europa.", hint1: "Tänk på vanliga maträtter – vad innehåller de?", hint2: "Potatis, majs, tomat, kakao eller tobak.", keywords: ["potatis", "majs", "tomat", "kakao", "tobak"] },
  { topic: "Ekonomi", q: "Varför var den långväga handeln ett genombrott för kapitalismen?", hint1: "Tänk på pengar, risk och investeringar...", hint2: "Krävde stora investeringar i förväg. Risk → möjlig stor vinst. Ledde till handelskompanjier och aktier.", keywords: ["investering", "risk", "vinst", "kapital", "aktier", "kompanj"] },
  { topic: "Ekonomi", q: "Vad innebar förlagssystemet?", hint1: "Hur tillverkades varor innan fabriker fanns?", hint2: "En köpman förlade råmaterial till hemarbetare som tillverkade varor hemma. Köpmannen sålde sedan varorna.", keywords: ["hem", "hemarbetare", "råmaterial", "köpman", "förlägga", "förläggare"] },
  { topic: "Ekonomi", q: "Varför steg priserna under 1500–1600-talen?", hint1: "Tänk på vad som hände med silver från Amerika...", hint2: "Massivt silverinflöde från Amerika → mer pengar men inte fler varor → inflation.", keywords: ["silver", "inflation", "guld", "pengar", "amerika"] },
  { topic: "Vetenskap", q: "Vad är skillnaden mellan geocentrisk och heliocentrisk världsbild?", hint1: "Geo = jord, helio = sol. Vad är i centrum?", hint2: "Geocentrisk: Jorden i centrum (Ptolemaios). Heliocentrisk: Solen i centrum (Kopernikus).", keywords: ["jord", "sol", "centrum", "solen", "geocentrisk", "heliocentrisk"] },
  { topic: "Vetenskap", q: "Vad bevisade Kepler om planeternas rörelser?", hint1: "Det handlar om planetbanornas form...", hint2: "Att planeterna rör sig i ellipser, inte perfekta cirklar.", keywords: ["ellips", "ellipser", "cirkel", "banor"] },
  { topic: "Vetenskap", q: "Varför dömdes Galilei av kyrkan?", hint1: "Det handlar om vad han hävdade om solsystemet...", hint2: "Han bevisade med teleskop att solen är i centrum – det gick emot kyrkans geocentriska lära.", keywords: ["teleskop", "solen", "centrum", "heliocentrisk", "kyrkan"] },
  { topic: "Vetenskap", q: "Vad är Newton känd för inom astronomin?", hint1: "Tänk på ett äpple som faller...", hint2: "Gravitationslagen – förklarar varför planeter rör sig och band samman himmelska och jordiska rörelser.", keywords: ["gravitation", "gravitationslagen", "planeter", "äpple"] },
  { topic: "Reformation", q: "Vad var ett avlatsbrev?", hint1: "Det hade med pengar och synder att göra...", hint2: "Ett brev som kyrkan sålde för att garantera förlåtelse av synder – Luther ansåg det korrupt.", keywords: ["synder", "förlåtelse", "köpa", "kyrkan", "pengar"] },
  { topic: "Reformation", q: "Hur kunde man nå frälsning enligt Luther?", hint1: "Tänk på ett enda ord – det räcker...", hint2: "Tro allena (sola fide) – inte via gärningar, pengar eller präster. Direkt relation med Gud.", keywords: ["tro", "tro allena", "sola fide", "direkt", "gud"] },
  { topic: "Reformation", q: "Varför lockades furstar av Luthers lära?", hint1: "Det handlar om mark, pengar och makt...", hint2: "De ville ta kyrkans mark och rikedomar, slippa betala till påven och stärka sin makt mot kejsaren.", keywords: ["mark", "rikedomar", "påven", "makt", "pengar"] },
  { topic: "Reformation", q: "Nämn en skillnad mellan kalvinism och lutheranism.", hint1: "Tänk antingen på predestination eller nattvarden...", hint2: "Predestination: Calvin = Gud bestämt vem som räddas. Nattvarden: Calvin = symbolisk, Luther = Kristus verkligen närvarande.", keywords: ["predestination", "nattvard", "symbolisk", "kristus", "bestämt"] },
  { topic: "Krig & Makt", q: "Vad var motreformationen?", hint1: "Det var kyrkan som svarade på något...", hint2: "Katolska kyrkans svar på protestantismen: Jesuitorden, Tridentinska mötet, stärkt inkvisition.", keywords: ["jesuitorden", "tridentinska", "inkvisition", "katolska", "svar"] },
  { topic: "Krig & Makt", q: "Varför lyckades inte Habsburg uppnå sina mål i 30-åriga kriget?", hint1: "Tänk på vad Westfaliska freden innebar...", hint2: "Westfaliska freden 1648 stoppade dem – furstarna behöll sin makt och religion. Frankrike och Sverige motarbetade dem.", keywords: ["westfaliska", "freden", "furstarna", "makt", "religion"] },
  { topic: "Krig & Makt", q: "Nämn ett land där centralmakten INTE stärktes under 1500–1600-talen.", hint1: "Tänk på länder med stark adel, parlament eller republiker...", hint2: "Polen (adelsvälde), Nederlanderna (republik), England (parlament avrättade kungen), Tysk-romerska riket (furstarna vann).", keywords: ["polen", "nederländerna", "england", "tysk-romerska", "parlament", "republic"] },
  { topic: "Krig & Makt", q: "Hur stämmer 1500–1600-talens trender in på Sverige?", hint1: "Tänk erövringar, reformation, centralmakt och krig...", hint2: "Ja på alla: Östersjöexpansion, Gustav Vasa bröt med Rom 1527, centralisering, stormakt under 1600-tal.", keywords: ["gustav vasa", "östersjö", "stormakt", "reformation", "centralisering", "1527"] },
];

// ============ PRACTICE LOGIC ============
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
  updateScoreDisplay();
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
    if (pct >= 80) { setTimeout(() => showWin(pct), 1400); return; }
  }
  setTimeout(() => nextQuestion(), 1800);
}

function updateScoreDisplay() {
  const pct = total === 0 ? 0 : Math.round((score / total) * 100);
  document.getElementById('scoreText').textContent = `${score} rätt av ${total}`;
  document.getElementById('percentText').textContent = total > 0 ? pct + '%' : '–';
  document.getElementById('progressBar').style.width = (Math.min(total, TARGET) / TARGET * 100) + '%';
}

function showWin(pct) {
  document.getElementById('practiceBox').style.display = 'none';
  document.getElementById('practiceWin').style.display = 'block';
  const stars = pct >= 90 ? '🌟🌟🌟' : '🌟🌟';
  document.getElementById('winText').textContent = `Du fick ${score} rätt av ${total} = ${pct}%. ${stars} Du klarade 80%-gränsen!`;
}

// Enter-tangent
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('answerInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') submitAnswer();
  });
});

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
