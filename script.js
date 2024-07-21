// Pomodoro Timer
let timer;
let minutes = 25;
let seconds = 0;
let isRunning = false;

const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
    if (!isRunning) {
        isRunning = true;
        timer = setInterval(updateTimer, 1000);
    }
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    updateDisplay();
}

function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            isRunning = false;
            alert("Time's up!");
            return;
        } else {
            minutes--;
            seconds = 59;
        }
    } else {
        seconds--;
    }
    updateDisplay();
}

function updateDisplay() {
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
}
