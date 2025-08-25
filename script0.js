let startTime = 0,
    elapsedTime = 0,
    timerInterval = null,
    laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapList = document.getElementById('lapList');

function formatTime(ms) {
    let date = new Date(ms);
    let min = String(date.getUTCMinutes()).padStart(2, '0');
    let sec = String(date.getUTCSeconds()).padStart(2, '0');
    let cs = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
    let hr = String(date.getUTCHours()).padStart(2, '0');
    return `${hr}:${min}:${sec}.${cs}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

function startTimer() {
    if (timerInterval) return;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
}

function pauseTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
}

function resetTimer() {
    pauseTimer();
    elapsedTime = 0;
    updateDisplay();
    laps = [];
    updateLaps();
}

function recordLap() {
    if (timerInterval) {
        laps.push(formatTime(elapsedTime));
        updateLaps();
    }
}

function updateLaps() {
    lapList.innerHTML = '';
    laps.forEach((lap, i) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${i + 1}: ${lap}`;
        lapList.appendChild(li);
    });
}

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

updateDisplay();
