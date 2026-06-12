const poolOfTerms = [
    "HTML", "CSS", "JavaScript", "SQL", "Git",
    "Java", "Python", "PHP", "Bootstrap", "Linux",
    "API", "JSON", "Canvas", "Local Storage", "HTTP",
    "GitHub", "Database", "Node.js", "DOM", "Array",
    "Variable", "Loop", "Function", "Button", "iframe"
];

const quizQuestions = [
    { q: "Koji jezik se koristi za definisanje osnovne strukture i skeleta web stranice?", a: "HTML" },
    { q: "Koji tehnološki jezik koristimo za stilizovanje, dizajn i izgled elemenata?", a: "CSS" },
    { q: "Koji skriptni jezik omogućava interaktivnost i dinamiku na klijentskoj strani?", a: "JavaScript" },
    { q: "Koji se upitni jezik najčešće koristi za rad sa relacionim bazama podataka?", a: "SQL" },
    { q: "Koji je najpopularniji sistem za kontrolu verzija koda (Version Control)?", a: "Git" },
    { q: "Koji operativni sistem otvorenog koda programeri najčešće koriste za servere?", a: "Linux" },
    { q: "Kako se naziva skraćenica za Application Programming Interface?", a: "API" },
    { q: "Koji lagani format za razmjenu podataka se bazira na JavaScript objektima?", a: "JSON" },
    { q: "Koji HTML5 element koristimo za crtanje grafike i whiteboard ploče pomoću skripti?", a: "Canvas" },
    { q: "Koji mehanizam u pretraživaču koristimo da trajno spasimo podatke na klijentu bez isteka?", a: "Local Storage" },
    { q: "Koji se protokol koristi za prenos hipertekstualnih dokumenata na webu?", a: "HTTP" },
    { q: "Koji HTML element koristimo za ugradnju jedne web stranice unutar druge?", a: "iframe" },
    { q: "Kako se skraćeno naziva Document Object Model koji predstavlja strukturu stranice kao stablo?", a: "DOM" },
    { q: "Struktura podataka koja skladišti kolekciju elemenata na uzastopnim indeksima je...?", a: "Array" },
    { q: "Koji se pojam koristi za imenovanu memorijsku lokaciju u koju skladištimo podatke?", a: "Variable" }
];

let boardState = Array(25).fill(false);
let cellTerms = [];
let currentQuestionIndex = 0;
let score = 0;
let activeQuestions = [];

const bingoBoard = document.getElementById("bingoBoard");
const currentQuestionText = document.getElementById("currentQuestion");
const questionBox = document.getElementById("questionBox");
const startBtn = document.getElementById("startBtn");
const scoreValue = document.getElementById("scoreValue");
const remainingValue = document.getElementById("remainingValue");
const winOverlay = document.getElementById("winOverlay");
const restartBtn = document.getElementById("restartBtn");

startBtn.addEventListener("click", initGame);
restartBtn.addEventListener("click", () => {
    winOverlay.classList.remove("visible");
    initGame();
});

function initGame() {
    startBtn.style.display = "none";
    score = 0;
    scoreValue.innerText = score;
    boardState = Array(25).fill(false);
    boardState[12] = true;

    cellTerms = [...poolOfTerms].sort(() => Math.random() - 0.5);
    cellTerms[12] = "FREE SPACE";

    activeQuestions = [...quizQuestions].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;

    questionBox.classList.remove("idle");
    renderBoard();
    nextQuestion();
}

function renderBoard() {
    bingoBoard.innerHTML = "";
    for (let i = 0; i < 25; i++) {
        const cell = document.createElement("div");
        cell.className = "bingo-cell";
        cell.innerText = cellTerms[i];
        cell.dataset.index = i;
        if (i === 12) {
            cell.classList.add("free-space", "matched");
        }
        cell.addEventListener("click", handleCellClick);
        bingoBoard.appendChild(cell);
    }
}

function nextQuestion() {
    remainingValue.innerText = activeQuestions.length - currentQuestionIndex;
    if (currentQuestionIndex < activeQuestions.length) {
        currentQuestionText.innerText = activeQuestions[currentQuestionIndex].q;
    } else {
        currentQuestionText.innerText = "Nestalo je pitanja. Kliknite 'Igraj ponovo' za novu partiju.";
        questionBox.classList.add("idle");
    }
}

function handleCellClick(e) {
    const clickedCell = e.target;
    const index = parseInt(clickedCell.dataset.index);

    if (boardState[index] || activeQuestions.length === 0 || currentQuestionIndex >= activeQuestions.length) return;

    const currentAnswer = activeQuestions[currentQuestionIndex].a;
    const clickedTerm = cellTerms[index];

    if (clickedTerm === currentAnswer) {
        boardState[index] = true;
        clickedCell.classList.add("matched");
        score++;
        scoreValue.innerText = score;
        currentQuestionIndex++;

        if (checkBingo()) {
            winOverlay.classList.add("visible");
            currentQuestionText.innerText = "Pobijedili ste — BRAVO!";
            return;
        }
        nextQuestion();
    } else {
        clickedCell.classList.add("wrong-flash");
        setTimeout(() => {
            if (!boardState[index]) clickedCell.classList.remove("wrong-flash");
        }, 350);
    }
}

function checkBingo() {
    const winningLines = [
        [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24],
        [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24],
        [0,6,12,18,24],[4,8,12,16,20]
    ];
    return winningLines.some(line => line.every(i => boardState[i]));
}
