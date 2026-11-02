import { getCourse, readProgress, setModuleComplete } from "./content-loader.js";

const params = new URLSearchParams(window.location.search);
const courseId = params.get("course");
const requestedNumber = Number.parseInt(params.get("module"), 10);
const main = document.getElementById("lesson-content");
const notesKey = "skilloraSavedNotes";

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[character]);
}

function readSavedNotes() {
    try {
        const saved = JSON.parse(localStorage.getItem(notesKey) || "[]");
        return Array.isArray(saved) ? saved : [];
    } catch {
        return [];
    }
}

function lessonUrl(id, number) {
    if (id === "python" && number <= 3) return `python-module-${number}.html`;
    return `lesson.html?course=${encodeURIComponent(id)}&module=${number}`;
}

function pythonModuleTitle(number) {
    return ["", "Introduction to Python", "Variables & Data Types", "Input, Output & Operators"][number] || `Module ${number}`;
}

async function render() {
    if (!courseId || !Number.isInteger(requestedNumber) || requestedNumber < 1) {
        throw new Error("This lesson link is incomplete.");
    }
    if (courseId === "python" && requestedNumber <= 3) {
        window.location.replace(lessonUrl(courseId, requestedNumber));
        return;
    }

    const course = await getCourse(courseId);
    if (!course) throw new Error("This course could not be found.");
    const module = course.modules.find((item) => item.number === requestedNumber);
    if (!module) throw new Error("These lesson notes are not available.");

    const courseTitle = course.title || courseId;
    const completed = new Set(readProgress(courseId));
    const isComplete = completed.has(module.number);
    const saved = readSavedNotes().some((item) => item.id === `${courseId}-${module.number}`);
    const list = course.modules;
    const moduleIndex = list.findIndex((item) => item.number === module.number);
    const previous = moduleIndex > 0
        ? list[moduleIndex - 1]
        : (courseId === "python" ? { number: 3, title: pythonModuleTitle(3) } : null);
    const next = moduleIndex >= 0 && moduleIndex < list.length - 1 ? list[moduleIndex + 1] : null;
    const backHref = courseId === "python" ? "python.html" : `course.html?course=${encodeURIComponent(courseId)}`;

    document.title = `${module.title} Notes | Skillora`;
    document.getElementById("course-back").href = backHref;
    document.getElementById("course-back").textContent = `← ${courseTitle} course`;

    main.innerHTML = `
        <header class="lesson-hero">
            <p class="path-eyebrow">✦ ${escapeHTML(courseTitle)} · MODULE ${String(module.number).padStart(2, "0")}</p>
            <h1>${escapeHTML(module.title)}</h1>
            <p>${escapeHTML(module.description || "Review the key ideas, study the example, and save notes for later.")}</p>
            <div class="lesson-actions">
                <button class="lesson-action primary" id="complete-toggle" type="button" aria-pressed="${isComplete}">${isComplete ? "Completed ✓" : "Mark complete"}</button>
                <button class="lesson-action" id="save-note-toggle" type="button" aria-pressed="${saved}">${saved ? "Saved to My Notes ✓" : "Save to My Notes"}</button>
            </div>
        </header>
        <section class="lesson-panel" aria-labelledby="notes-title">
            <h2 id="notes-title">Lesson notes</h2>
            <ul class="lesson-notes-list">${module.notes.map((note) => `<li>${escapeHTML(note)}</li>`).join("")}</ul>
        </section>
        <section class="lesson-panel" aria-labelledby="example-title">
            <h2 id="example-title">Worked example</h2>
            <pre class="lesson-code"><code>${escapeHTML(module.code || "")}</code></pre>
            <p class="lesson-output-label">Expected result</p>
            <pre class="lesson-output">${escapeHTML(module.output || "See the example above.")}</pre>
        </section>
        <section class="lesson-panel" aria-labelledby="takeaways-title">
            <h2 id="takeaways-title">Remember these</h2>
            <ul class="lesson-takeaways">${module.takeaways.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
        </section>
        <nav class="lesson-nav" aria-label="Lesson navigation">
            ${previous ? `<a href="${lessonUrl(courseId, previous.number)}">← Previous: ${escapeHTML(previous.title)}</a>` : `<a href="${backHref}">← Back to course outline</a>`}
            ${next ? `<a href="${lessonUrl(courseId, next.number)}">Next: ${escapeHTML(next.title)} →</a>` : `<a href="${backHref}">Course complete · back to outline →</a>`}
        </nav>`;

    document.getElementById("complete-toggle").addEventListener("click", (event) => {
        const button = event.currentTarget;
        const nowComplete = button.getAttribute("aria-pressed") !== "true";
        setModuleComplete(courseId, module.number, nowComplete);
        button.setAttribute("aria-pressed", String(nowComplete));
        button.textContent = nowComplete ? "Completed ✓" : "Mark complete";
    });

    document.getElementById("save-note-toggle").addEventListener("click", (event) => {
        const button = event.currentTarget;
        let items = readSavedNotes();
        const id = `${courseId}-${module.number}`;
        const exists = items.some((item) => item.id === id);
        if (exists) items = items.filter((item) => item.id !== id);
        else items.unshift({
            id,
            courseId,
            courseTitle,
            moduleNumber: module.number,
            title: module.title,
            description: module.description || "",
            notes: module.notes,
            code: module.code || "",
            output: module.output || "",
            takeaways: module.takeaways,
            savedAt: new Date().toISOString()
        });
        localStorage.setItem(notesKey, JSON.stringify(items));
        const nowSaved = !exists;
        button.setAttribute("aria-pressed", String(nowSaved));
        button.textContent = nowSaved ? "Saved to My Notes ✓" : "Save to My Notes";
    });
}

render().catch((error) => {
    main.innerHTML = `<p class="path-error">${escapeHTML(error.message)} <a href="index.html#courses">Browse courses</a></p>`;
});
