// ===== 공부 타이머 =====

let seconds = Number(localStorage.getItem("studySeconds")) || 0;
let timer = null;

const timerDisplay = document.getElementById("timer");

function updateTimer() {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    timerDisplay.innerText =
        String(h).padStart(2, "0") + ":" +
        String(m).padStart(2, "0") + ":" +
        String(s).padStart(2, "0");
}

updateTimer();

document.getElementById("startBtn").onclick = () => {
    if (timer) return;

    timer = setInterval(() => {
        seconds++;
        localStorage.setItem("studySeconds", seconds);
        updateTimer();
    }, 1000);
};

document.getElementById("pauseBtn").onclick = () => {
    clearInterval(timer);
    timer = null;
};

document.getElementById("resetBtn").onclick = () => {
    clearInterval(timer);
    timer = null;
    seconds = 0;
    localStorage.setItem("studySeconds", 0);
    updateTimer();
};

// ===== 목표 시간 =====

const goalInput = document.getElementById("goalInput");
const goalStatus = document.getElementById("goalStatus");

const savedGoal = localStorage.getItem("goalHours");

if (savedGoal) {
    goalStatus.innerText = `목표 ${savedGoal}시간`;
}

document.getElementById("saveGoal").onclick = () => {
    const goal = goalInput.value;

    localStorage.setItem("goalHours", goal);

    goalStatus.innerText =
        `목표 ${goal}시간 저장 완료`;
};

// ===== 다크 모드 =====

document.getElementById("darkModeBtn").onclick = () => {
    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    localStorage.setItem("darkMode", dark);
};

if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark");
}

// ===== 포모도로 =====

let pomoSeconds = 1500;
let pomoRunning = false;
let pomoTimer = null;

const pomoDisplay =
    document.getElementById("pomodoroDisplay");

function updatePomodoro() {
    const m = Math.floor(pomoSeconds / 60);
    const s = pomoSeconds % 60;

    pomoDisplay.innerText =
        String(m).padStart(2, "0") +
        ":" +
        String(s).padStart(2, "0");
}

updatePomodoro();

document.getElementById("pomodoroStart").onclick =
() => {

    if (pomoRunning) return;

    pomoRunning = true;

    pomoTimer = setInterval(() => {

        pomoSeconds--;

        updatePomodoro();

        if (pomoSeconds <= 0) {

            clearInterval(pomoTimer);

            alert("🍅 공부 시간 종료!");

            pomoRunning = false;

            pomoSeconds = 1500;

            updatePomodoro();
        }

    }, 1000);
};

// ===== 과목 저장 =====

const subjectSelect =
document.getElementById("subjectSelect");

subjectSelect.value =
localStorage.getItem("subject") || "수학";

subjectSelect.onchange = () => {

    localStorage.setItem(
        "subject",
        subjectSelect.value
    );

};

// ===== 그래프 =====

const ctx =
document.getElementById("subjectChart");

new Chart(ctx, {
    type: "pie",
    data: {
        labels: [
            "수학",
            "영어",
            "국어",
            "과학"
        ],
        datasets: [{
            data: [4, 2, 1, 3],
        }]
    }
});
