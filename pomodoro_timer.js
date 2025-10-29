

let timer;
let minutes = 25;
let seconds = 0;
let isPaused = true;
let enteredTime = null;
let lastWasShortBreak;
let timerOnPomodoro = true;
let pomodoroStreak = 0;

function startTimer() {
    timer = setInterval(updateTimer, 1000)
    isStarted = true
}

function updateTimer() {
    const timerElement = document.getElementById("timer");
    timerElement.textContent = formatTime(minutes, seconds);

    if (minutes === 0 && seconds === 0) {
        timerGoingOffNoise();
        clearInterval(timer);
        timerElement.textContent = formatTime(0, 0);

        if (timerOnPomodoro) {
            updatePomodoroStreak();
            if (pomodoroStreak % 4 === 0) {
                setPomodoroBreak(longBreak=true);
            } else {
                setPomodoroBreak(longBreak=false);
            }
        } else {
            setPomodoroTimer();
        }

    } else if (!isPaused) {
        if (seconds > 0) {
            seconds --;
        } else {
            seconds = 59;
            minutes --;
        }
    }
}

function formatTime(minutes, seconds) {
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function togglePauseOrResume() {
    const pauseResumeButton = document.querySelector(".buttons button");
    isPaused = !isPaused;

    if (isPaused) {
        clearInterval(timer);
        pauseResumeButton.textContent = "Start";
    } else {
        startTimer();
        pauseResumeButton.textContent = "Pause";
    }
}

function setPomodoroTimer() {
    clearInterval(timer);
    minutes = enteredTime || 25;
    seconds = 0;
    timerOnPomodoro = true;
    isPaused = true;
    const timerElement = document.getElementById("timer");
    timerElement.textContent = formatTime(minutes, seconds);
    resetResumeButton();
}

function setPomodoroBreak(longBreak=false) {
    clearInterval(timer);

    if (longBreak) {
        minutes = 10;
    } else {
        minutes = 5;
    }
    seconds = 0;
    timerOnPomodoro = false;
    isPaused = true;
    const timerElement = document.getElementById("timer");
    timerElement.textContent = formatTime(minutes, seconds);
    resetResumeButton();
}

function chooseTime() {
    const newTime = prompt("Enter new time in minutes:");
    if (!isNaN(newTime) && newTime > 0) {
        enteredTime = parseInt(newTime);
        minutes = enteredTime;
        seconds = 0
        isPaused = false;
        const timerElement = document.getElementById("timer");
        timerElement.textContent = formatTime(minutes, seconds);
        clearInterval(timer)
        resetResumeButton();
    } else {
        alert("Enter a valid greater than 0.");
    }
}


function fastForward() {

    if (isPaused) {
        return
    }

    minutes = 0;
    seconds = 0;
    const timerElement = document.getElementById("timer");
    timerElement.textContent = formatTime(minutes, seconds);

}

function resetResumeButton () {
    const pauseResumeButton = document.querySelector(".buttons button");
    pauseResumeButton.textContent = "Start";
}

function buttonClickNoise () {
    const buttonClick = new Audio("buttonclick.mp3");
    buttonClick.play();
}

function buttonPressListener () {
    const buttons = document.querySelectorAll(".buttons button");
    buttons.forEach(button => {
        button.addEventListener('click', buttonClickNoise)
    })
}

buttonPressListener();

function timerGoingOffNoise() {
    const timerNoise = new Audio("pomodorotimer.mp3");
    timerNoise.play();
}

function updatePomodoroStreak() {
    pomodoroStreak ++;
    streak = document.getElementById("Pomodoro Streak");
    streak.textContent = `Pomodoro Streak of ${pomodoroStreak} `
}

function openSettingsMenu() {

}

function closeSettingsMenu () {

}
