
import { auth, db } from "./firebase.js";

import { onAuthStateChanged } from
"https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

// ======================================
// SKILLORA - PYTHON MODULE 01
// ======================================

const lessons = [

    // ======================================
    // ARTICLE 01 — INTRODUCTION TO PYTHON
    // ======================================

    {
        title: "Introduction to Python",

        description: "Discover Python, the language that makes programming easier to understand.",

        caption: "Let's explore what Python is and how it communicates with computers.",

        message: "Every amazing application starts with instructions!",

        explanation: `



What is Python?

Python is a high-level, general-purpose programming language that uses readable, English-like syntax to let humans write instructions for computers to execute. Created by **Guido van Rossum** in **1991**, it emphasizes code readability and simplicity, making it ideal for everything from beginner scripts to massive real-world applications in web development, data science, and AI/ML.


Why is Python Special?

  - Simple syntax: Easy for beginners to learn and read.
  - Versatile: Used across many different fields and real-world applications.
  - Core purpose: Turns human ideas into executable computer instructions.

        `,

        stages: [
            [
                "Our Idea",
                "💡",
                "Everything begins with an idea. We decide what we want the computer to do."
            ],
            [
                "Python Instructions",
                "🐍",
                "We translate our idea into instructions using the Python programming language."
            ],
            [
                "Python Interpreter",
                "⚙️",
                "Python processes our instructions and prepares them for execution."
            ],
            [
                "Computer Output",
                "💻",
                "The computer performs the task and produces a result."
            ]
        ],

        codeExplanation: [
    {
        part: 'print()',
        meaning: 'Main character energy! This function tells Python: "Bro, show this on the screen right now!" 📣'
    },
    {
        part: '"..."',
        meaning: 'The quotes tell Python to treat the content as text. No overthinking! 🤐'
    },
    {
        part: 'Chin tapak dum dum.',
        meaning: 'The legendary text we want Python to display!'
    }
],
        
        code: 'print("Chin tapak dum dum.")',



output: 'Chin tapak dum dum.',

        challenge: {
            question: "Who created the Python programming language?",

            options: [
                "James Gosling",
                "Guido van Rossum",
                "Dennis Ritchie"
            ],

            answer: 1,

            explanation: "Guido van Rossum created Python. Its first release was in 1991."
        }
    },

    // ======================================
    // ARTICLE 02 — YOUR FIRST PYTHON PROGRAM
    // ======================================

    {
        title: "Your First Python Program",

        description: "Discover how to display a message using your first Python instruction.",

        caption: "Let's write and run your first Python program!",

        message: "Your first instruction starts here! 🚀",

        explanation: `
MEET YOUR FIRST PYTHON INSTRUCTION

Python provides a simple instruction called print().

WHAT DOES print() DO?

It displays information on the screen.

HOW DOES IT WORK?

The message is placed inside quotation marks and parentheses.

You can change the message and run the program again.
        `,

        stages: [
            [
                "Write an instruction",
                "⌨️",
                "We write an instruction that tells Python what to display."
            ],
            [
                "Python reads it",
                "🐍",
                "Python understands the instruction."
            ],
            [
                "The message appears",
                "💬",
                "The computer displays the message on the screen."
            ]
        ],

        code: 'print("Hello, World!")',

        challenge: {
            question: "Which Python instruction displays a message?",

            options: [
                "show()",
                "print()",
                "display()"
            ],

            answer: 1,

            explanation: "print() displays information on the screen."
        }
    }

];
let completedArticles = [];
let currentUser = null;
let pyodide = null;
let pyodideLoading = null;

const quizQuestions = [
    {
        question: "What is Python?",
        options: [
            "A programming language",
            "A web browser",
            "A computer"
        ],
        answer: 0
    },
    {
        question: "Why do computers need instructions?",
        options: [
            "To become heavier",
            "To perform tasks",
            "To change colour"
        ],
        answer: 1
    },
    {
        question: "Where is Python used?",
        options: [
            "Only in games",
            "Only in websites",
            "AI, websites, data science and more"
        ],
        answer: 2
    },
    {
        question: "Which instruction displays a message in Python?",
        options: [
            "print()",
            "input()",
            "start()"
        ],
        answer: 0
    },
    {
        question: "What is the purpose of quotation marks in our first example?",
        options: [
            "To store a text message",
            "To close the computer",
            "To create a number"
        ],
        answer: 0
    }

    
];

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

// ======================================
// FIREBASE PROGRESS
// ======================================

function progressReference() {
    if (!currentUser) return null;

    return doc(
        db,
        "users",
        currentUser.uid,
        "progress",
        "python_module_1"
    );
}

async function loadProgress() {
    const reference = progressReference();

    if (!reference) return;

    try {
        const snapshot = await getDoc(reference);

        if (snapshot.exists()) {
            const data = snapshot.data();

            completedArticles = Array.isArray(data.completedArticles)
                ? data.completedArticles
                : [];
        }
    } catch (error) {
        console.error("Could not load progress:", error);
    }

    updateDashboard();
    renderArticles();
}

async function saveProgress() {
    const reference = progressReference();

    if (!reference) return;

    try {
        await setDoc(reference, {
            completedArticles,
            totalArticles: lessons.length,
            updatedAt: serverTimestamp()
        }, { merge: true });

    } catch (error) {
        console.error("Could not save progress:", error);
        alert("Progress could not be saved. Please try again.");
    }
}

// ======================================
// DASHBOARD
// ======================================


function updateDashboard() {
    const completed = completedArticles.length;
    const total = lessons.length;
    const percentage = Math.round((completed / total) * 100);

    const progressText = document.getElementById("progress-text");
    const progressFill = document.getElementById("progress-fill");
    const completedCount = document.getElementById("completed-count");
    const progressPercent = document.getElementById("progress-percent");
    const totalArticles = document.getElementById("total-articles");

    // Article progress text
    if (progressText) {
        progressText.textContent =
            `${completed} of ${total} articles completed`;
    }

    // Progress bar
    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }

    // Completed articles count
    if (completedCount) {
        completedCount.textContent = `${completed} / ${total}`;
    }

    // Progress percentage
    if (progressPercent) {
        progressPercent.textContent = `${percentage}%`;
    }

    if (totalArticles) {
        totalArticles.textContent = total;
    }

    // Quiz status
    const quizStatus = document.getElementById("quiz-status");
    const quizLockStatus = document.getElementById("quiz-lock-status");

    if (quizStatus) {
        quizStatus.textContent =
            completed === total ? "Unlocked" : "Locked";
    }

    if (quizLockStatus) {
        quizLockStatus.textContent =
            completed === total
                ? "You can now attempt the quiz!"
                : `Complete all ${total} articles to unlock the quiz. ${completed}/${total} completed.`;
    }

    // Enable or disable quiz tab
    const quizTab = document.querySelector('[data-tab="quiz"]');

    if (quizTab) {
        quizTab.disabled = completed !== total;
    }

    // NEXT MODULE BUTTON
    const nextModuleBtn = document.getElementById("next-module-btn");

    if (nextModuleBtn) {
        nextModuleBtn.style.display =
            completed === total ? "inline-block" : "none";
    }
}

// ======================================
// ARTICLE CARDS
// ======================================

function renderArticles() {
    const articleList = document.getElementById("article-list");

    if (!articleList) return;

    articleList.innerHTML = "";

    lessons.forEach((lesson, index) => {
        const isCompleted = completedArticles.includes(index);

        const card = document.createElement("div");
        card.className = "article-card";

        card.innerHTML = `
            <div class="article-number">
                ${String(index + 1).padStart(2, "0")}
            </div>

            <div class="article-info">
                <h3>${escapeHTML(lesson.title)}</h3>
                <p>${escapeHTML(lesson.description)}</p>
            </div>

            <span class="article-status">
                ${isCompleted ? "Completed ✓" : "Not started"}
            </span>

            <button class="article-open" type="button">
    Start Learning →
</button>
        `;

        card.querySelector(".article-open").addEventListener("click", () => {
            openArticle(index);
        });

        articleList.appendChild(card);
    });

    updateDashboard();
}

// ======================================
// FORMAT ARTICLE NOTES
// ======================================

function formatNotes(text) {
    return text.trim().split("\n").map(line => {
        const value = line.trim();

        if (!value) return "";

        if (value.startsWith("•")) {
            return `<div class="lesson-note-item">${escapeHTML(value)}</div>`;
        }

        if (
            value.endsWith("?") ||
            value.endsWith(":") ||
            value === value.toUpperCase()
        ) {
            return `<h3>${escapeHTML(value)}</h3>`;
        }

        return `<p>${escapeHTML(value)}</p>`;
    }).join("");
}

// ======================================
// OPEN ARTICLE
// ======================================

// Complete article


 // ======================================
 // OPEN ARTICLE
 // ======================================



 // ======================================
 // OPEN ARTICLE
 // ======================================


function openArticle(index) {
    const lesson = lessons[index];

    if (!lesson) return;

    let modal = document.getElementById("python-lesson-modal");

    if (!modal) {
        modal = document.createElement("div");
        modal.id = "python-lesson-modal";
        modal.className = "python-lesson-modal";
        document.body.appendChild(modal);
    }

    const hasCode = Boolean(lesson.code);

    modal.innerHTML = `
        <div class="lesson-modal-content">

            <button class="lesson-close" id="lesson-close" type="button">
                ×
            </button>

            <div class="lesson-modal-label">
                ARTICLE ${String(index + 1).padStart(2, "0")} / ${lessons.length}
            </div>

            <h2>${escapeHTML(lesson.title)}</h2>

            <p class="lesson-caption">
                ${escapeHTML(lesson.caption)}
            </p>

            <div class="lesson-message">
                ${escapeHTML(lesson.message)}
            </div>

            <div class="lesson-explanation">
                ${formatNotes(lesson.explanation)}
            </div>

            <div class="lesson-animation">

                <h3>Explore how it works</h3>

                <div id="stage-number">
                    01 / ${lesson.stages.length}
                </div>

                <h3 id="stage-title">
                    ${escapeHTML(lesson.stages[0][0])}
                </h3>

                <div class="stage-visual" id="stage-visual">
                    ${escapeHTML(lesson.stages[0][1])}
                </div>

                <p id="stage-description">
                    ${escapeHTML(lesson.stages[0][2])}
                </p>

                <div class="stage-controls">
                    <button id="previous-stage" type="button">← Previous</button>
                    <button id="next-stage" type="button">Next →</button>
                </div>

            </div>

            ${hasCode ? `
                <div class="python-editor-section">

                    <h3>Try it yourself</h3>

                    <textarea id="python-code-editor" spellcheck="false">${escapeHTML(lesson.code)}</textarea>

                    <div class="editor-buttons">
                        <button id="run-python" type="button">▶ Run Code</button>
                        <button id="reset-python" type="button">Reset</button>
                    </div>

                    <div class="python-output">
                        <h4>Output</h4>
                        <pre id="python-output">Your output will appear here.</pre>
                    </div>

                </div>
            ` : ""}

            ${lesson.codeExplanation?.length ? `
                <div class="code-explanation">

                    <h3>Let's Break Down the Code </h3>

                    ${lesson.codeExplanation.map(item => `
                        <div class="code-explanation-item">
                            <h4>${escapeHTML(item.part)}</h4>
                            <p>${escapeHTML(item.meaning)}</p>
                        </div>
                    `).join("")}

                </div>
            ` : ""}

            <div class="lesson-challenge">

                <h3>Quick Challenge</h3>

                <p>${escapeHTML(lesson.challenge.question)}</p>

                <div id="challenge-options">
                    ${lesson.challenge.options.map((option, i) => `
                        <button class="challenge-option"
                            data-answer="${i}" type="button">
                            ${escapeHTML(option)}
                        </button>
                    `).join("")}
                </div>

                <p id="challenge-feedback"></p>

            </div>

            <button id="complete-article" class="complete-article-btn">
                ${completedArticles.includes(index)
                    ? "Completed ✓"
                    : "Complete Article ✓"}
            </button>

        </div>
    `;

    modal.style.display = "flex";

    // Close article
    document.getElementById("lesson-close").onclick = () => {
        modal.style.display = "none";
    };

    // Animation controls
    let currentStage = 0;

    function updateStage() {
        const stage = lesson.stages[currentStage];

        document.getElementById("stage-number").textContent =
            `${String(currentStage + 1).padStart(2, "0")} / ${lesson.stages.length}`;

        document.getElementById("stage-title").textContent = stage[0];
        document.getElementById("stage-visual").textContent = stage[1];
        document.getElementById("stage-description").textContent = stage[2];
    }

    document.getElementById("previous-stage").onclick = () => {
        currentStage = Math.max(0, currentStage - 1);
        updateStage();
    };

    document.getElementById("next-stage").onclick = () => {
        currentStage = Math.min(
            lesson.stages.length - 1,
            currentStage + 1
        );
        updateStage();
    };

    // Challenge
    document.querySelectorAll(".challenge-option").forEach(button => {
        button.onclick = () => {
            const selected = Number(button.dataset.answer);
            const feedback = document.getElementById("challenge-feedback");

            if (selected === lesson.challenge.answer) {
                feedback.textContent =
                    "Correct! " + lesson.challenge.explanation;
                feedback.style.color = "green";
            } else {
                feedback.textContent = "Not quite. Try again!";
                feedback.style.color = "crimson";
            }
        };
    });

    // Python compiler
    if (hasCode) {
        document.getElementById("run-python").onclick = runPython;

        document.getElementById("reset-python").onclick = () => {
            document.getElementById("python-code-editor").value = lesson.code;

            document.getElementById("python-output").textContent =
                "Your output will appear here.";
        };
    }

    // Complete article and save progress
    document.getElementById("complete-article").onclick = async () => {

        if (!completedArticles.includes(index)) {
            completedArticles.push(index);
        }

        updateDashboard();
        renderArticles();

        await saveProgress();

        modal.style.display = "none";

        if (completedArticles.length === lessons.length) {
            const nextModuleBtn =
                document.getElementById("next-module-btn");

            if (nextModuleBtn) {
                nextModuleBtn.style.display = "inline-block";
            }
        }
    };
}


// ======================================
// PYTHON COMPILER
// ======================================

async function loadPython() {
    if (pyodide) return pyodide;
    if (pyodideLoading) return pyodideLoading;

    pyodideLoading = (async () => {
        if (!window.loadPyodide) {
            await new Promise((resolve, reject) => {
                const script = document.createElement("script");

                script.src =
                    "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js";

                script.onload = resolve;
                script.onerror = reject;

                document.head.appendChild(script);
            });
        }

        return await window.loadPyodide();
    })();

    try {
        pyodide = await pyodideLoading;
        return pyodide;
    } finally {
        pyodideLoading = null;
    }
}

async function runPython() {
    const editor = document.getElementById("python-code-editor");
    const output = document.getElementById("python-output");
    const button = document.getElementById("run-python");

    if (!editor || !output || !button) return;

    button.disabled = true;
    button.textContent = "Running...";
    output.textContent = "Starting Python...";

    try {
        const python = await loadPython();

        let result = "";

        python.setStdout({
            batched: text => result += text + "\n"
        });

        python.setStderr({
            batched: text => result += text + "\n"
        });

        await python.runPythonAsync(editor.value);

        output.textContent = result.trim() ||
            "Program executed successfully. No output.";

    } catch (error) {
        output.textContent = "Python Error:\n" + error.message;

    } finally {
        button.disabled = false;
        button.textContent = "▶ Run Code";
    }
}

// ======================================
// QUIZ
// ======================================

function renderQuiz() {
    const container = document.getElementById("quiz-container");

    if (!container) return;

    if (completedArticles.length < lessons.length) {
        container.innerHTML = `
            <h3>Quiz Locked 🔒</h3>
            <p>Complete both articles to unlock the quiz.</p>
        `;
        return;
    }

    let currentQuestion = 0;
    let score = 0;

    function showQuestion() {
        const question = quizQuestions[currentQuestion];

        container.innerHTML = `
            <h3>Question ${currentQuestion + 1} of ${quizQuestions.length}</h3>

            <p>${escapeHTML(question.question)}</p>

            <div class="quiz-options">
                ${question.options.map((option, index) => `
                    <button class="quiz-option"
                        data-answer="${index}" type="button">
                        ${escapeHTML(option)}
                    </button>
                `).join("")}
            </div>

            <p id="quiz-feedback"></p>
        `;

        container.querySelectorAll(".quiz-option").forEach(button => {
            button.onclick = () => {
                const selected = Number(button.dataset.answer);
                const feedback = document.getElementById("quiz-feedback");

                container.querySelectorAll(".quiz-option").forEach(b => {
                    b.disabled = true;
                });

                if (selected === question.answer) {
                    score++;
                    feedback.textContent = "Correct! 🎉";
                } else {
                    feedback.textContent =
                        "Incorrect. Correct answer: " +
                        question.options[question.answer];
                }

                const nextButton = document.createElement("button");
                nextButton.textContent =
                    currentQuestion === quizQuestions.length - 1
                        ? "See Results"
                        : "Next Question →";

                nextButton.onclick = () => {
                    currentQuestion++;

                    if (currentQuestion < quizQuestions.length) {
                        showQuestion();
                    } else {
                        showResult();
                    }
                };

                container.appendChild(nextButton);
            };
        });
    }

    function showResult() {
        container.innerHTML = `
            <h2>Quiz Completed! 🎉</h2>
            <h3>Your Score: ${score} / ${quizQuestions.length}</h3>
            <p>${score >= 3 ? "Great work! Keep learning." : "Keep practising. You can do better!"}</p>
            <button id="retry-quiz" type="button">Try Again</button>
        `;

        document.getElementById("retry-quiz").onclick = () => {
            currentQuestion = 0;
            score = 0;
            showQuestion();
        };
    }

    showQuestion();
}

// ======================================
// TABS
// ======================================

function setupTabs() {
    const tabs = document.querySelectorAll("[data-tab]");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            const selected = tab.dataset.tab;

            if (selected === "quiz" &&
                completedArticles.length < lessons.length) {
                return;
            }

            tabs.forEach(item => item.classList.remove("active"));
            tab.classList.add("active");

            document.querySelectorAll(
                "#articles-section, #problems-section, #quiz-section"
            ).forEach(section => {
                section.style.display = "none";
            });

            if (selected === "all" || selected === "articles") {
                document.getElementById("articles-section").style.display = "block";
                document.getElementById("problems-section").style.display = "block";
            }

            if (selected === "problems") {
                document.getElementById("problems-section").style.display = "block";
            }

            if (selected === "quiz") {
                document.getElementById("quiz-section").style.display = "block";
                renderQuiz();
            }
        });
    });
}

// ======================================
// START MODULE
// ======================================

onAuthStateChanged(auth, async user => {
    if (!user) {
        window.location.href =
            "login.html?next=python-module-1.html";
        return;
    }

    currentUser = user;

    await loadProgress();

    setupTabs();
    renderQuiz();

    // Open Article 1 directly instead of showing the article list
    openArticle(0);
});
