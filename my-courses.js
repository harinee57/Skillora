import { getCourse, readProgress } from "./content-loader.js";

const list = document.getElementById("my-courses-list");
const COURSE_IDS = ["python", "java", "c", "cpp", "javascript", "datascience", "gamedevelopment", "webdevelopment"];

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[character]);
}

async function render() {
    const courses = await Promise.all(COURSE_IDS.map(async (id) => [id, await getCourse(id)]));
    list.innerHTML = courses.filter(([, course]) => course).map(([id, course]) => {
        const completed = readProgress(id).length;
        const total = course.modules.length + (id === "python" ? 3 : 0);
        const percent = total ? Math.round((completed / total) * 100) : 0;
        const link = id === "python" ? "python.html" : `course.html?course=${encodeURIComponent(id)}`;
        return `<article class="saved-note-card">
            <div class="path-module-number">${String(percent).padStart(2, "0")}%</div>
            <div class="path-module-info">
                <h2>${escapeHTML(course.title)}</h2>
                <p>${escapeHTML(course.description || "A guided learning path with practical examples and notes.")}</p>
                <span class="path-module-status">${completed} modules tracked · ${total} modules</span>
                <div class="path-progress-track" role="progressbar" aria-label="${escapeHTML(course.title)} progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><div class="path-progress-fill" style="width:${percent}%"></div></div>
            </div>
            <div class="saved-note-actions"><a href="${link}">Continue →</a></div>
        </article>`;
    }).join("");
}

render().catch((error) => {
    list.innerHTML = `<p class="path-error">${escapeHTML(error.message)} Try refreshing the page.</p>`;
});
