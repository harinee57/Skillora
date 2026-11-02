const STORAGE_KEY = "skilloraSavedNotes";
const list = document.getElementById("saved-notes-list");

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, (character) => ({
        "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
    })[character]);
}

function readNotes() {
    try {
        const notes = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
        return Array.isArray(notes) ? notes : [];
    } catch {
        return [];
    }
}

function render() {
    const notes = readNotes();
    if (!notes.length) {
        list.innerHTML = '<p class="path-empty">No saved notes yet. Open a course lesson and choose “Save to My Notes” to build your study shelf.</p>';
        return;
    }

    list.innerHTML = notes.map((note) => `
        <article class="saved-note-card" data-note-id="${escapeHTML(note.id)}">
            <div class="path-module-number">${String(note.moduleNumber || 0).padStart(2, "0")}</div>
            <div class="path-module-info">
                <h2>${escapeHTML(note.title)}</h2>
                <p>${escapeHTML(note.courseTitle)}${note.description ? ` · ${escapeHTML(note.description)}` : ""}</p>
                <span class="path-module-status">${Array.isArray(note.notes) ? note.notes.length : 0} study points saved</span>
            </div>
            <div class="saved-note-actions">
                <a href="lesson.html?course=${encodeURIComponent(note.courseId)}&module=${Number(note.moduleNumber)}">Review lesson</a>
                <button class="notes-remove" type="button" data-remove="${escapeHTML(note.id)}" aria-label="Remove ${escapeHTML(note.title)} from My Notes">Remove</button>
            </div>
            <details class="saved-note-detail">
                <summary>Read saved notes</summary>
                <ul class="lesson-notes-list">${(Array.isArray(note.notes) ? note.notes : []).map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
                ${note.code ? `<h3>Worked example</h3><pre class="lesson-code"><code>${escapeHTML(note.code)}</code></pre>` : ""}
                ${note.output ? `<p class="lesson-output-label">Expected result</p><pre class="lesson-output">${escapeHTML(note.output)}</pre>` : ""}
                ${Array.isArray(note.takeaways) && note.takeaways.length ? `<h3>Key takeaways</h3><ul class="lesson-takeaways">${note.takeaways.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>` : ""}
            </details>
        </article>`).join("");

    list.querySelectorAll("[data-remove]").forEach((button) => {
        button.addEventListener("click", () => {
            const id = button.getAttribute("data-remove");
            const remaining = readNotes().filter((note) => note.id !== id);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
            render();
        });
    });
}

render();
