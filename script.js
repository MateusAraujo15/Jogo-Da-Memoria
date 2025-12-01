const board = document.querySelector(".game-board");
const timerTxt = document.getElementById("timer");

const icons = [
    "🍎", "🍎",
    "🔥", "🔥",
    "⭐", "⭐",
    "🎮", "🎮",
    "🐱", "🐱",
    "⚡", "⚡",
    "💀", "💀",
    "🚀", "🚀"
];

icons.sort(() => Math.random() - 0.5);

let firstCard = null;
let secondCard = null;
let lock = false;
let matches = 0;

let time = 0;
let timerStarted = false;
let interval;

// Iniciar timer
function startTimer() {
    timerStarted = true;
    interval = setInterval(() => {
        time++;
        timerTxt.textContent = time;
    }, 1000);
}

// Criar cartas
icons.forEach(icon => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = icon;

    card.addEventListener("click", () => {

        if (!timerStarted) startTimer();

        if (lock || card.classList.contains("flip")) return;

        card.classList.add("flip");

        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            checkMatch();
        }
    });

    board.appendChild(card);
});

// Verificar combinação
function checkMatch() {
    if (firstCard.innerHTML === secondCard.innerHTML) {
        matches++;
        if (matches === icons.length / 2) {
            clearInterval(interval);
            setTimeout(() => {
                alert(`🎉 Parabens. Quero ver passar da proxima! Tempo total: ${time}s`);
            }, 300);
        }
        reset();
    } else {
        lock = true;
        setTimeout(() => {
            firstCard.classList.remove("flip");
            secondCard.classList.remove("flip");
            reset();
        }, 800);
    }
}

function reset() {
    [firstCard, secondCard, lock] = [null, null, false];
}

