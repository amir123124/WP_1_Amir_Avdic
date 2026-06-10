const quizData = [
    {
        question: "Šta znači skraćenica HTML?",
        options: [
            "Hyper Text Markup Language",
            "High Tech Markup Language",
            "Hyper Tabular Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Koji CSS selektor se koristi za označavanje elementa sa jedinstvenim ID-jem?",
        options: [
            "Tačka (.)",
            "Znak taraba (#)",
            "Zvijezdica (*)",
            "Kosa crta (/)"
        ],
        correct: 1
    },
    {
        question: "Koja JavaScript metoda se koristi za trajno spašavanje ključ-vrijednost parova u pretraživaču?",
        options: [
            "sessionStorage.setItem()",
            "content.save()",
            "localStorage.setItem()",
            "cache.store()"
        ],
        correct: 2
    },
    {
        question: "Koji HTML5 element obezbjeđuje površinu na kojoj možemo crtati grafiku u JavaScriptu?",
        options: [
            "<svg-art>",
            "<canvas>",
            "<paint>",
            "<board>"
        ],
        correct: 1
    },
    {
        question: "Unutar kojeg HTML elementa ugrađujemo eksterni JavaScript fajl?",
        options: [
            "<script>",
            "<javascript>",
            "<js>",
            "<link>"
        ],
        correct: 0
    }
];

const LETTERS = ["A", "B", "C", "D"];

let currentQuestion = 0;
let score = 0;

const quizBox = document.getElementById("quizBox");
const resultBox = document.getElementById("resultBox");
const questionNumberText = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const scoreLive = document.getElementById("scoreLive");
const scorePercent = document.getElementById("scorePercent");
const resultText = document.getElementById("resultText");
const restartBtn = document.getElementById("restartBtn");

document.addEventListener("DOMContentLoaded", loadQuestion);

nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    scoreLive.innerText = 0;
    resultBox.style.display = "none";
    quizBox.style.display = "block";
    loadQuestion();
});

function loadQuestion() {
    nextBtn.disabled = true;
    optionsContainer.innerHTML = "";

    questionNumberText.innerText = `Pitanje ${currentQuestion + 1} od ${quizData.length}`;
    questionText.innerText = quizData[currentQuestion].question;

    const progressPercent = (currentQuestion / quizData.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    quizData[currentQuestion].options.forEach((option, index) => {
        const optionCard = document.createElement("div");
        optionCard.className = "option-card";
        optionCard.setAttribute("data-letter", LETTERS[index]);
        optionCard.innerText = option;
        optionCard.addEventListener("click", () => selectOption(optionCard, index));
        optionsContainer.appendChild(optionCard);
    });
}

function selectOption(selectedCard, index) {
    const correctIndex = quizData[currentQuestion].correct;
    const allOptions = document.querySelectorAll(".option-card");

    if (index === correctIndex) {
        selectedCard.classList.add("correct");
        score++;
        scoreLive.innerText = score;
    } else {
        selectedCard.classList.add("incorrect");
        allOptions[correctIndex].classList.add("correct");
    }

    allOptions.forEach(card => card.classList.add("disabled"));
    nextBtn.disabled = false;
}

function showResults() {
    progressBar.style.width = "100%";
    quizBox.style.display = "none";
    resultBox.style.display = "block";

    const percentage = Math.round((score / quizData.length) * 100);
    scorePercent.innerText = percentage;
    resultText.innerText = `Odgovorili ste tačno na ${score} od ukupno ${quizData.length} pitanja.`;
}
