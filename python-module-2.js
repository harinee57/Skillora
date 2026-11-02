
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
// SKILLORA - PYTHON MODULE 02
// VARIABLES & DATA TYPES
// ======================================

const lessons = [
    {
        title: "Understanding Variables",
        description: "Discover how Python stores and remembers information.",
        caption: "Imagine giving a name to a box that stores something.",
        message: "A variable is like a labelled storage box! 📦",

        explanation: `
WHAT IS A VARIABLE?

Think of a variable as a labeled storage box.

When you want Python to remember something, you create a box, stick a label on it, and put your data inside using =.

EXAMPLE:

my_hero = "Harinee"

Here, my_hero is the variable name and "Harinee" is the value stored inside it.

PYTHON IS DIFFERENT!

In languages like C++ or Java, you have to declare what kind of variable you are creating.

But Python? Python looks at what you put inside and automatically understands its data type.

Say no more, Python gotchu! 🧠✨

REMEMBER:

• A variable stores information.
• A variable has a name.
• The = symbol assigns a value.
• The stored value can be changed.
        `,

        stages: [
            [
                "Create a box",
                "📦",
                "Imagine an empty storage box. We need a place to keep information."
            ],
            [
                "Give it a name",
                "🏷️ age",
                "We label the box age so we can identify it."
            ],
            [
                "Store information",
                "📦 20",
                "We place the number 20 inside our labelled box."
            ],
            [
                "Use the information",
                "🔍 20",
                "Whenever we need the value, we can use the variable name age."
            ]
        ],

        code: 'name = "Harinee"\nscore = 99\nis_winning = True\n\nprint(name)\nprint(score)\nprint(is_winning)',

        codeExplanation: `
1. name = "Harinee"

We're putting text into the name box. Python sees the quotes and automatically identifies it as a str (string). Smooth, zero hassle.

2. score = 99

We drop a whole number into score. Python tags it as an int (integer) right away — pure stonks 📈.

3. is_winning = True

A quick binary check. is_winning gets set to True. No cap, just straight facts 🗿.

4. print(...)

This tells Python: "Open up those boxes and flex the contents on screen." 📣
        `,

        stages: [
            [
                "Create a box",
                "📦",
                "Imagine an empty storage box. We need a place to keep information."
            ],
            [
                "Give it a name",
                "🏷️ age",
                "We label the box age so we can identify it."
            ],
            [
                "Store information",
                "📦 20",
                "We place the number 20 inside our labelled box."
            ],
            [
                "Use the information",
                "🔍 20",
                "Whenever we need the value, we can use the variable name age."
            ]
        ],

        challenge: {
            question: "What is a variable used for?",
            options: [
                "To store information",
                "To switch off a computer",
                "To delete Python"
            ],
            answer: 0,
            explanation: "A variable stores information using a name."
        }
    },

    {
        title: "Python Data Types",
        description: "Explore integers, floats, strings and boolean values.",
        caption: "Not all information is the same. Let's discover the different types!",
        message: "Numbers, text and true-or-false values have different data types.",

        explanation: `
🎨 PYTHON'S MAIN DATA TYPES (MEET THE SQUAD)

Whenever you store data, Python automatically assigns it to one of these core types.

1. INTEGER (int)

Whole numbers only. No decimals, no drama.

EXAMPLE:
aura_points = 9999


2. FLOAT (float)

Decimals for when precision actually matters.

EXAMPLE:
cgpa = 9.8


3. STRING (str)

Any text wrapped inside quotes "" or ''. The quotes act like a shield. Anything inside them is treated purely as plain text.
EXAMPLE:
dialogue = "Chin tapak dum dum"


4. BOOLEAN (bool)
Strictly binary. Zero cap. Only accepts two values:
True or False

EXAMPLE:
is_coding_fun = True

⚠️ THE #1 BEGINNER MISTAKE

Look at these two lines carefully:

x = 10
y = "10"

x is an int (number).

y is a str (text in quotes!).

WHAT'S THE DIFFERENCE?

• x is a number you can do math with.
• x + 5 gives 15.
• y is just plain text.
• Trying to do math with y gives a TypeError.

EMOTIONAL DAMAGE 💔

WHY ARE DATA TYPES IMPORTANT?

They help Python understand the kind of information it is working with.
        `,

        stages: [
            [
                "Integer (int)",
                "🔢 9999",
                "Whole numbers only. No decimals, no drama. Example: aura_points = 9999"
            ],
            [
                "Float (float)",
                "🔢 9.8",
                "A float represents a decimal number. Example: cgpa = 9.8"
            ],
            [
                "String (str)",
                '💬 "Hello"',
                "Text wrapped inside quotation marks is a string."
            ],
            [
                "Boolean (bool)",
                "✅ True",
                "A boolean accepts only True or False."
            ]
        ],

        code: 'aura_points = 9999\ncgpa = 9.8\ndialogue = "Chin tapak dum dum"\nis_coding_fun = True\n\nprint(type(aura_points))\nprint(type(cgpa))\nprint(type(dialogue))\nprint(type(is_coding_fun))',

        challenge: {
            question: 'Which data type is used for the value "Hello"?',
            options: [
                "Integer",
                "String",
                "Boolean"
            ],
            answer: 1,
            explanation: "Text enclosed in quotation marks is a string."
        }
    },

    {
        title: "Number vs Text",
        description: "Understand the difference between numbers and strings.",
        caption: "Same characters, different data types. Let's see what happens!",
        message: "Quotation marks change how Python understands a value.",

        explanation: `
⚠️ NUMBERS VS TEXT

Look at these two lines carefully:

x = 10
y = "10"

They look almost identical, but Python sees them differently.

x = 10

This is an integer (int).

You can perform mathematical operations on it.

EXAMPLE:

x + 5

OUTPUT:

15

y = "10"

This is a string (str).

It is plain text because it is inside quotation marks.

If you try:

y + 5

Python will raise a TypeError because it cannot directly add a string and an integer.

REMEMBER:

• Numbers without quotes can be used for calculations.
• Values inside quotes are treated as text.
• Always check your quotation marks!
        `,

        stages: [
            [
                "Store a number",
                "x = 10",
                "Python recognizes 10 as an integer."
            ],
            [
                "Store text",
                'y = "10"',
                "Quotation marks make 10 a string."
            ],
            [
                "Perform math",
                "x + 5 = 15",
                "Because x is an integer, Python can perform arithmetic."
            ],
            [
                "Try mixing types",
                'y + 5 = Error',
                "A string and an integer cannot be directly added together."
            ]
        ],

        code: 'x = 10\ny = "10"\n\nprint(type(x))\nprint(type(y))\n\nprint(x + 5)\nprint(y + "5")',

        challenge: {
            question: 'What is the data type of y in y = "10"?',
            options: [
                "Integer (int)",
                "Float (float)",
                "String (str)"
            ],
            answer: 2,
            explanation: "Quotation marks make the value a string."
        }
    }
];

// ======================================
// VARIABLES
// ======================================

let completedArticles = [];
let currentUser = null;
let pyodide = null;
let pyodideLoading = null;

const quizQuestions = [
    {
        question: "What is a variable?",
        options: [
            "A named place to store information",
            "A computer screen",
            "A Python error"
        ],
        answer: 0
    },
    {
        question: "Which symbol is used to assign a value?",
        options: ["+", "=", "*"],
        answer: 1
    },
    {
        question: "Which is an integer?",
        options: ["3.14", '"Hello"', "25"],
        answer: 2
    },
    {
        question: "Which data type represents decimal numbers?",
        options: ["String", "Float", "Boolean"],
        answer: 1
    },
    {
        question: 'What is the data type of "Python"?',
        options: ["Integer", "String", "Boolean"],
        answer: 1
    },
    {
        question: "Which values belong to the Boolean data type?",
        options: [
            "True and False",
            "10 and 20",
            '"Yes" and "No"'
        ],
        answer: 0
    },
    {
        question: 'What is the data type of x in x = 10?',
        options: ["String", "Integer", "Boolean"],
        answer: 1
    },
    {
        question: 'What happens when you execute y = "10"?',
        options: [
            "Python creates an integer",
            "Python creates a string",
            "Python creates a boolean"
        ],
        answer: 1
    }
];

// ======================================
// HELPER FUNCTIONS
// ======================================

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    })[char]);
}

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
            (value === value.toUpperCase() && value.length > 3)
        ) {
            return `<h3>${escapeHTML(value)}</h3>`;
        }

        return `<p>${escapeHTML(value)}</p>`;
    }).join("");
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
        "python_module_2"
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
        console.error("Could not load Module 02 progress:", error);
    }

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
        console.error("Could not save Module 02 progress:", error);
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

    if (progressText) {
        progressText.textContent =
            `${completed} of ${total} articles completed`;
    }

    if (progressFill) {
        progressFill.style.width = `${percentage}%`;
    }

    if (completedCount) {
        completedCount.textContent = completed;
    }

    if (progressPercent) {
        progressPercent.textContent = `${percentage}%`;
    }

    if (totalArticles) {
        totalArticles.textContent = total;
    }

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

    const quizTab = document.querySelector('[data-tab="quiz"]');

    if (quizTab) {
        quizTab.disabled = completed !== total;
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
                ${isCompleted ? "Continue" : "Start learning →"}
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

    modal.innerHTML = `
        <div class="lesson-modal-content">

            <button class="lesson-close" id="lesson-close" type="button">×</button>

            <div class="lesson-modal-label">
                ARTICLE ${String(index + 1).padStart(2, "0")} / ${String(lessons.length).padStart(2, "0")}
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

            <!-- INTERACTIVE ANIMATION -->

            <div class="lesson-animation">

                <h3>Explore how it works</h3>

                <div id="stage-number">
                    01 / ${lesson.stages.length}
                </div>

                <h3 id="stage-title">
                    ${escapeHTML(lesson.stages[0][0])}
                </h3>

                <div class="stage-visual" id="stage-visual"></div>

                <p id="stage-description">
                    ${escapeHTML(lesson.stages[0][2])}
                </p>

                <div class="stage-controls">
                    <button id="previous-stage" type="button">← Previous</button>
                    <button id="next-stage" type="button">Next →</button>
                </div>

            </div>

            <!-- PYTHON EDITOR -->

            <div class="python-editor-section">

                <h3>Try it yourself</h3>

                <p>Change the values and run the Python code.</p>

                <textarea id="python-code-editor" spellcheck="false">${escapeHTML(lesson.code)}</textarea>

                <div class="editor-buttons">
                    <button id="run-python" type="button">▶ Run Code</button>
                    <button id="reset-python" type="button">Reset</button>
                </div>

                <!-- PYTHON OUTPUT -->

                <div class="python-output">
                <div class="code-explanation">
    <h3> Code Explanation</h3>

    <p><strong>1. name = "Hari"</strong></p>
    <p>We are storing the text "Hari" in a variable called name.
    Python recognizes this as a String (str) because it is inside quotes.</p>

    <p><strong>2. score = 99</strong></p>
    <p>We are storing the number 99 in the variable score.
    Python recognizes this as an Integer (int).</p>

    <p><strong>3. is_winning = True</strong></p>
    <p>We are storing True in the variable is_winning.
    Python recognizes this as a Boolean (bool).</p>

    <p><strong>4. print(name), print(score), print(is_winning)</strong></p>
    <p>The print() function displays the values of these variables in the output.</p>
</div>
                    <h4>Output</h4>
                    <pre id="python-output">Your output will appear here.</pre>
                </div>

                <!-- CODE EXPLANATION: ONLY ARTICLE 1 -->

                ${lesson.codeExplanation ? `
                    <div class="code-explanation">
                        <h3>💡 Let's break down the code</h3>

                        <p><strong>1. <code>name = "Harinee"</code></strong></p>
                        <p>We're putting text into the <code>name</code> box. Python sees the quotes and automatically locks it in as a <code>str</code> (string). Smooth, zero hassle.</p>

                        <p><strong>2. <code>score = 99</code></strong></p>
                        <p>We drop a whole number into <code>score</code>. Python tags it as an <code>int</code> (integer) right away — pure stonks 📈.</p>

                        <p><strong>3. <code>is_winning = True</code></strong></p>
                        <p>A quick binary check. <code>is_winning</code> gets set to <code>True</code>. No cap, just straight facts 🗿.</p>

                        <p><strong>4. <code>print(...)</code></strong></p>
                        <p>This tells Python: <em>"Open up those boxes and flex the contents on screen."</em> 📣</p>
                    </div>
                ` : ""}

            </div>

            <!-- QUICK CHALLENGE -->

            <div class="lesson-challenge">

                <h3>Quick Challenge</h3>

                <p>${escapeHTML(lesson.challenge.question)}</p>

                <div id="challenge-options">
                    ${lesson.challenge.options.map((option, i) => `
                        <button
                            class="challenge-option"
                            data-answer="${i}"
                            type="button">
                            ${escapeHTML(option)}
                        </button>
                    `).join("")}
                </div>

                <p id="challenge-feedback"></p>

            </div>

            <button id="complete-article" class="complete-article-btn" type="button">
                Complete Article
            </button>

        </div>
    `;

    modal.style.display = "flex";

    // ======================================
    // FORCE BLACK OUTPUT BOX
    // ======================================

    const pythonOutput = document.getElementById("python-output");
    const outputContainer = document.querySelector(".python-output");

    if (outputContainer) {
        outputContainer.style.backgroundColor = "#000000";
        outputContainer.style.color = "#ffffff";
        outputContainer.style.padding = "16px";
        outputContainer.style.borderRadius = "8px";
    }

    if (pythonOutput) {
        pythonOutput.style.backgroundColor = "#000000";
        pythonOutput.style.color = "#ffffff";
        pythonOutput.style.display = "block";
        pythonOutput.style.width = "100%";
        pythonOutput.style.minHeight = "70px";
        pythonOutput.style.padding = "12px";
        pythonOutput.style.boxSizing = "border-box";
        pythonOutput.style.whiteSpace = "pre-wrap";
        pythonOutput.style.overflowX = "auto";
        pythonOutput.style.fontFamily = "monospace";
        pythonOutput.style.fontSize = "14px";
        pythonOutput.style.border = "1px solid #333333";
        pythonOutput.style.borderRadius = "6px";
    }

    // ======================================
    // CLOSE MODAL
    // ======================================

    document.getElementById("lesson-close").onclick = () => {
        modal.style.display = "none";

        if (window.gsap) {
            window.gsap.killTweensOf(modal);
        }
    };

    // ======================================
    // INTERACTIVE GSAP ANIMATION
    // ======================================

    let currentStage = 0;

    function getStageVisual() {

        // ARTICLE 1: UNDERSTANDING VARIABLES

        if (index === 0) {

            const visuals = [

                `<div class="variable-box empty-box">
                    <span class="box-icon">📦</span>
                    <span class="box-label">Empty Box</span>
                </div>`,

                `<div class="variable-box">
                    <span class="box-icon">📦</span>
                    <span class="box-label">age</span>
                </div>`,

                `<div class="variable-box filled-box">
                    <span class="box-label">age</span>
                    <span class="box-value">20</span>
                </div>`,

                `<div class="variable-box retrieved-box">
                    <span class="box-label">age</span>
                    <span class="box-value">20</span>
                    <span class="retrieve-label">Retrieved value!</span>
                </div>`
            ];

            return visuals[currentStage];
        }

        // ARTICLE 2: PYTHON DATA TYPES

        if (index === 1) {

            const visuals = [

                `<div class="data-type-card int-card">
                    <span class="type-name">int</span>
                    <span class="type-value">9999</span>
                    <span class="type-description">Whole number</span>
                </div>`,

                `<div class="data-type-card float-card">
                    <span class="type-name">float</span>
                    <span class="type-value">9.8</span>
                    <span class="type-description">Decimal number</span>
                </div>`,

                `<div class="data-type-card str-card">
                    <span class="type-name">str</span>
                    <span class="type-value">"Hello"</span>
                    <span class="type-description">Text</span>
                </div>`,

                `<div class="data-type-card bool-card">
                    <span class="type-name">bool</span>
                    <span class="type-value">True</span>
                    <span class="type-description">Boolean value</span>
                </div>`
            ];

            return visuals[currentStage];
        }

        // ARTICLE 3: NUMBER VS TEXT

        if (index === 2) {

            const visuals = [

                `<div class="data-type-card int-card">
                    <span class="type-name">int</span>
                    <span class="type-value">10</span>
                    <span class="type-description">Number without quotes</span>
                </div>`,

                `<div class="data-type-card str-card">
                    <span class="type-name">str</span>
                    <span class="type-value">"10"</span>
                    <span class="type-description">Text inside quotes</span>
                </div>`,

                `<div class="variable-box filled-box">
                    <span class="box-value">10 + 5 = 15</span>
                    <span class="box-label">Math works!</span>
                </div>`,

                `<div class="variable-box retrieved-box">
                    <span class="box-value">"10" + 5</span>
                    <span class="retrieve-label">TypeError!</span>
                </div>`
            ];

            return visuals[currentStage];
        }

        return `
            <div class="variable-box">
                ${escapeHTML(lesson.stages[currentStage][1])}
            </div>`;
    }

    // ======================================
    // UPDATE ANIMATION STAGE
    // ======================================

    function updateStage(animate = true) {

        const stage = lesson.stages[currentStage];

        const stageNumber = document.getElementById("stage-number");
        const stageTitle = document.getElementById("stage-title");
        const stageVisual = document.getElementById("stage-visual");
        const stageDescription = document.getElementById("stage-description");

        stageNumber.textContent =
            `${String(currentStage + 1).padStart(2, "0")} / ${lesson.stages.length}`;

        stageTitle.textContent = stage[0];

        stageVisual.innerHTML = getStageVisual();

        stageDescription.textContent = stage[2];

        const previousButton = document.getElementById("previous-stage");
        const nextButton = document.getElementById("next-stage");

        previousButton.disabled = currentStage === 0;

        nextButton.disabled =
            currentStage === lesson.stages.length - 1;

        if (animate && window.gsap) {

            window.gsap.fromTo(
                stageVisual.children,
                {
                    opacity: 0,
                    scale: 0.6,
                    y: 35,
                    rotation: -5
                },
                {
                    opacity: 1,
                    scale: 1,
                    y: 0,
                    rotation: 0,
                    duration: 0.7,
                    ease: "back.out(1.7)"
                }
            );

            window.gsap.fromTo(
                stageDescription,
                {
                    opacity: 0,
                    y: 12
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    delay: 0.2
                }
            );

            window.gsap.fromTo(
                stageTitle,
                {
                    opacity: 0,
                    x: -15
                },
                {
                    opacity: 1,
                    x: 0,
                    duration: 0.4,
                    ease: "power2.out"
                }
            );
        }
    }

    updateStage();

    document.getElementById("previous-stage").onclick = () => {

        if (currentStage > 0) {
            currentStage--;
            updateStage();
        }
    };

    document.getElementById("next-stage").onclick = () => {

        if (currentStage < lesson.stages.length - 1) {
            currentStage++;
            updateStage();
        }
    };

    // ======================================
    // PYTHON COMPILER
    // ======================================

    document.getElementById("run-python").onclick = runPython;

    document.getElementById("reset-python").onclick = () => {

        document.getElementById("python-code-editor").value =
            lesson.code;

        document.getElementById("python-output").textContent =
            "Your output will appear here.";
    };

    // ======================================
    // QUICK CHALLENGE
    // ======================================

    document.querySelectorAll(".challenge-option").forEach(button => {

        button.onclick = () => {

            const selected = Number(button.dataset.answer);

            const feedback =
                document.getElementById("challenge-feedback");

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

    // ======================================
    // COMPLETE ARTICLE
    // ======================================

    document.getElementById("complete-article").onclick = async () => {

        if (!completedArticles.includes(index)) {
            completedArticles.push(index);
        }

        await saveProgress();

        renderArticles();

        modal.style.display = "none";
    };
}

// ======================================
// PYTHON COMPILER - PYODIDE
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

    output.style.backgroundColor = "#000000";
    output.style.color = "#ffffff";
    output.textContent = "Starting Python...";

    try {

        const python = await loadPython();

        let result = "";

        python.setStdout({
            batched: text => {
                result += text + "\n";
            }
        });

        python.setStderr({
            batched: text => {
                result += text + "\n";
            }
        });

        await python.runPythonAsync(editor.value);

        output.textContent =
            result.trim() || "Program executed successfully. No output.";

    } catch (error) {

        output.textContent = "Python Error:\n" + error.message;

    } finally {

        output.style.backgroundColor = "#000000";
        output.style.color = "#ffffff";

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
            <p>Complete all three articles to unlock the quiz.</p>
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
                    <button
                        class="quiz-option"
                        data-answer="${index}"
                        type="button">
                        ${escapeHTML(option)}
                    </button>
                `).join("")}

            </div>

            <p id="quiz-feedback"></p>
        `;

        container.querySelectorAll(".quiz-option").forEach(button => {

            button.onclick = () => {

                const selected = Number(button.dataset.answer);

                const feedback =
                    document.getElementById("quiz-feedback");

                container.querySelectorAll(".quiz-option").forEach(option => {
                    option.disabled = true;
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

                nextButton.type = "button";

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

            <p>
                ${score >= 5
                    ? "Excellent work! Keep learning."
                    : "Keep practising. You can improve!"}
            </p>

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

            if (
                selected === "quiz" &&
                completedArticles.length < lessons.length
            ) {
                return;
            }

            tabs.forEach(item => {
                item.classList.remove("active");
            });

            tab.classList.add("active");

            document.querySelectorAll(
                "#articles-section, #problems-section, #quiz-section"
            ).forEach(section => {
                section.style.display = "none";
            });

            if (selected === "all" || selected === "articles") {

                const articlesSection =
                    document.getElementById("articles-section");

                const problemsSection =
                    document.getElementById("problems-section");

                if (articlesSection) {
                    articlesSection.style.display = "block";
                }

                if (problemsSection) {
                    problemsSection.style.display = "block";
                }
            }

            if (selected === "problems") {

                const problemsSection =
                    document.getElementById("problems-section");

                if (problemsSection) {
                    problemsSection.style.display = "block";
                }
            }

            if (selected === "quiz") {

                const quizSection =
                    document.getElementById("quiz-section");

                if (quizSection) {
                    quizSection.style.display = "block";
                }

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
            "login.html?next=python-module-2.html";

        return;
    }

    currentUser = user;

    await loadProgress();

    setupTabs();

    renderQuiz();
});
