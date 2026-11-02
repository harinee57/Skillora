import { getCourse, readProgress } from "./content-loader.js";

const params = new URLSearchParams(window.location.search);
const courseId = params.get("course");
const main = document.getElementById("course-content");

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[character]);
}

function moduleHref(courseId, number) {
    if (courseId === "python" && number <= 3) return `python-module-${number}.html`;
    return `lesson.html?course=${encodeURIComponent(courseId)}&module=${number}`;
}

async function render() {
    if (!courseId) throw new Error("Choose a course from the course catalog.");
    const course = await getCourse(courseId);
    if (!course) throw new Error("This course could not be found.");

    const modules = courseId === "python" ? [
        { number: 1, title: "Introduction to Python", description: "Discover Python, how it runs, and write your first program." },
        { number: 2, title: "Variables & Data Types", description: "Understand variables, values, and Python's built-in data types." },
        { number: 3, title: "Input, Output & Operators", description: "Receive input, display output, and work with Python operators." },
        ...course.modules
    ] : course.modules;
    const completed = new Set(readProgress(courseId));
    const percent = modules.length ? Math.round((completed.size / modules.length) * 100) : 0;
    const title = course.title || courseId;

    document.title = `${title} Course | Skillora`;
    main.innerHTML = `
        <section class="path-hero">
            <p class="path-eyebrow">✦ Skillora learning path</p>
            <h1>${escapeHTML(title)}</h1>
            <p>${escapeHTML(course.description || "A step-by-step course with practical examples and study notes.")}</p>
            <div class="path-progress">
                <div class="path-progress-label"><span>Your progress</span><span>${completed.size} of ${modules.length} modules · ${percent}%</span></div>
                <div class="path-progress-track" role="progressbar" aria-label="Course progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${percent}"><div class="path-progress-fill" style="width:${percent}%"></div></div>
            </div>
        </section>
        <section aria-labelledby="module-list-title">
            <p class="path-eyebrow">✦ Course outline</p>
            <h2 id="module-list-title">Choose a module</h2>
            <div class="path-module-list">
                ${modules.map((module, index) => {
                    const done = completed.has(module.number);
                    return `<article class="path-module-card">
                        <div class="path-module-number">${String(module.number).padStart(2, "0")}</div>
                        <div class="path-module-info"><h2>${escapeHTML(module.title)}</h2><p>${escapeHTML(module.description || "Read the notes and work through a practical example.")}</p><span class="path-module-status">${done ? "Completed ✓" : `Module ${index + 1} of ${modules.length}`}</span></div>
                        <a class="path-link" href="${moduleHref(courseId, module.number)}">${done ? "Review notes" : "Open notes"} →</a>
                    </article>`;
                }).join("")}
            </div>
        </section>`;
}

render().catch((error) => {
    main.innerHTML = `<p class="path-error">${escapeHTML(error.message)} <a href="index.html#courses">Browse courses</a></p>`;
});
