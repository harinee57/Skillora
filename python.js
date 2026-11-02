
const completedModules = JSON.parse(
    localStorage.getItem("pythonCompletedModules") || "[]"
);

function updateProgress() {
    const completed = completedModules.length;
    const percentage = Math.round((completed / 12) * 100);

    document.getElementById("completed-count").textContent =
        `${completed} / 12`;

    document.getElementById("progress-percent").textContent =
        `${percentage}%`;

    document.getElementById("progress-bar").style.width =
        `${percentage}%`;
}

updateProgress();
