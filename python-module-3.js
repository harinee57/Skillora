
import { auth, db } from "./firebase.js";

import {
    doc,
    getDoc,
    setDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const lessons = [
    {
        title: "Arithmetic Operators",
        description: "Perform mathematical calculations using Python.",
        tag: "LESSON 01",
        notes: `
            <h3>What are Arithmetic Operators?</h3>
            <p>Arithmetic operators are used to perform mathematical calculations in Python.</p>

            <h3>Common Arithmetic Operators</h3>
            <ul>
                <li><strong>+</strong> Addition</li>
                <li><strong>-</strong> Subtraction</li>
                <li><strong>*</strong> Multiplication</li>
                <li><strong>/</strong> Division</li>
                <li><strong>//</strong> Floor Division</li>
                <li><strong>%</strong> Modulus (remainder)</li>
                <li><strong>**</strong> Exponentiation (power)</li>
            </ul>

            <p>For example, <code>10 % 3</code> returns <code>1</code> because 1 is the remainder.</p>
        `,
        stages: [
            {
                left: "10 + 5",
                operator: "+",
                right: "15",
                explanation: "Addition combines two values."
            },
            {
                left: "10 - 5",
                operator: "-",
                right: "5",
                explanation: "Subtraction finds the difference."
            },
            {
                left: "10 * 5",
                operator: "*",
                right: "50",
                explanation: "Multiplication calculates the product."
            },
            {
                left: "10 / 3",
                operator: "/",
                right: "3.333...",
                explanation: "Division returns a decimal result."
            },
            {
                left: "10 // 3",
                operator: "//",
                right: "3",
                explanation: "Floor division returns the whole-number quotient."
            },
            {
                left: "10 % 3",
                operator: "%",
                right: "1",
                explanation: "Modulus returns the remainder."
            },
            {
                left: "2 ** 3",
                operator: "**",
                right: "8",
                explanation: "Exponentiation means 2 raised to the power of 3."
            }
        ],
        code: `a = 10
b = 3

print(a + b)
print(a - b)
print(a * b)
print(a / b)
print(a // b)
print(a % b)
print(a ** b)`,
        challenge: {
            question: "What is the output of 17 % 5?",
            options: ["2", "3", "5", "12"],
            answer: 1
        }
    },
    {
        title: "Comparison Operators",
        description: "Compare values and get True or False results.",
        tag: "LESSON 02",
        notes: `
            <h3>What are Comparison Operators?</h3>
            <p>Comparison operators compare two values. The result is always either <code>True</code> or <code>False</code>.</p>

            <ul>
                <li><code>==</code> Equal to</li>
                <li><code>!=</code> Not equal to</li>
                <li><code>&gt;</code> Greater than</li>
                <li><code>&lt;</code> Less than</li>
                <li><code>&gt;=</code> Greater than or equal to</li>
                <li><code>&lt;=</code> Less than or equal to</li>
            </ul>

            <p>Remember: <code>=</code> assigns a value, while <code>==</code> compares two values.</p>
        `,
        stages: [
            {
                left: "10 == 10",
                operator: "==",
                right: "True",
                explanation: "Both values are equal."
            },
            {
                left: "10 != 5",
                operator: "!=",
                right: "True",
                explanation: "The values are different."
            },
            {
                left: "10 > 5",
                operator: ">",
                right: "True",
                explanation: "10 is greater than 5."
            },
            {
                left: "10 < 5",
                operator: "<",
                right: "False",
                explanation: "10 is not less than 5."
            },
            {
                left: "10 >= 10",
                operator: ">=",
                right: "True",
                explanation: "10 is equal to 10."
            },
            {
                left: "5 <= 3",
                operator: "<=",
                right: "False",
                explanation: "5 is not less than or equal to 3."
            }
        ],
        code: `a = 10
b = 5

print(a == b)
print(a != b)
print(a > b)
print(a < b)
print(a >= b)
print(a <= b)`,
        challenge: {
            question: "What is the result of 8 > 12?",
            options: ["True", "False", "8", "12"],
            answer: 1
        }
    },
    {
        title: "Logical Operators",
        description: "Combine conditions using and, or, and not.",
        tag: "LESSON 03",
        notes: `
            <h3>What are Logical Operators?</h3>
            <p>Logical operators combine or modify conditions. They return a Boolean result.</p>

            <ul>
                <li><code>and</code> — True when both conditions are True.</li>
                <li><code>or</code> — True when at least one condition is True.</li>
                <li><code>not</code> — Reverses the Boolean result.</li>
            </ul>

            <p>Example: <code>age &gt;= 18 and age &lt;= 60</code> checks whether age is between 18 and 60.</p>
        `,
        stages: [
            {
                left: "True and False",
                operator: "and",
                right: "False",
                explanation: "Both conditions must be True."
            },
            {
                left: "True or False",
                operator: "or",
                right: "True",
                explanation: "At least one condition must be True."
            },
            {
                left: "not True",
                operator: "not",
                right: "False",
                explanation: "The not operator reverses the result."
            }
        ],
        code: `age = 20

print(age >= 18 and age <= 60)
print(age < 18 or age > 60)
print(not age < 18)`,
        challenge: {
            question: "What is the result of True and True?",
            options: ["False", "True", "None", "0"],
            answer: 1
        }
    },
    {
        title: "Assignment Operators",
        description: "Update variables using shorthand operators.",
        tag: "LESSON 04",
        notes: `
            <h3>What are Assignment Operators?</h3>
            <p>Assignment operators assign values to variables or update their existing values.</p>

            <ul>
                <li><code>=</code> Assign a value</li>
                <li><code>+=</code> Add and assign</li>
                <li><code>-=</code> Subtract and assign</li>
                <li><code>*=</code> Multiply and assign</li>
                <li><code>/=</code> Divide and assign</li>
                <li><code>//=</code> Floor divide and assign</li>
                <li><code>%=</code> Modulus and assign</li>
                <li><code>**=</code> Power and assign</li>
            </ul>
        `,
        stages: [
            {
                left: "x = 10",
                operator: "+= 5",
                right: "15",
                explanation: "x += 5 is the same as x = x + 5."
            },
            {
                left: "x = 10",
                operator: "-= 3",
                right: "7",
                explanation: "x -= 3 is the same as x = x - 3."
            },
            {
                left: "x = 4",
                operator: "*= 2",
                right: "8",
                explanation: "x *= 2 is the same as x = x * 2."
            }
        ],
        code: `score = 10

score += 5
print(score)

score -= 3
print(score)

score *= 2
print(score)`,
        challenge: {
            question: "If x = 10, what is x after x += 4?",
            options: ["4", "10", "14", "40"],
            answer: 2
        }
    },
    {
        title: "Operator Precedence",
        description: "Understand the order in which Python evaluates expressions.",
        tag: "LESSON 05",
        notes: `
            <h3>What is Operator Precedence?</h3>
            <p>Operator precedence determines which operation Python performs first in an expression.</p>

            <h3>Basic Order</h3>
            <ol>
                <li>Parentheses <code>()</code></li>
                <li>Exponentiation <code>**</code></li>
                <li>Multiplication, division, floor division, modulus</li>
                <li>Addition and subtraction</li>
                <li>Comparison operators</li>
                <li><code>not</code></li>
                <li><code>and</code></li>
                <li><code>or</code></li>
            </ol>

            <p>Use parentheses to make expressions clearer and control the order of calculations.</p>
        `,
        stages: [
            {
                left: "2 + 3 * 4",
                operator: "* first",
                right: "14",
                explanation: "Multiplication happens before addition."
            },
            {
                left: "(2 + 3) * 4",
                operator: "() first",
                right: "20",
                explanation: "Parentheses make addition happen first."
            },
            {
                left: "2 ** 3 * 2",
                operator: "** first",
                right: "16",
                explanation: "Exponentiation happens before multiplication."
            }
        ],
        code: `print(2 + 3 * 4)
print((2 + 3) * 4)
print(2 ** 3 * 2)

# Use parentheses for clarity
result = (10 + 5) / 3
print(result)`,
        challenge: {
            question: "What is the output of 2 + 3 * 4?",
            options: ["20", "14", "24", "9"],
            answer: 1
        }
    }
];

const quizQuestions = [
    {
        question: "Which operator is used for exponentiation in Python?",
        options: ["^", "**", "*", "//"],
        answer: 1
    },
    {
        question: "What is the result of 15 // 4?",
        options: ["3.75", "4", "3", "1"],
        answer: 2
    },
    {
        question: "Which operator checks whether two values are equal?",
        options: ["=", "==", "!=", "==="],
        answer: 1
    },
    {
        question: "What is the result of True or False?",
        options: ["False", "True", "None", "0"],
        answer: 1
    },
    {
        question: "What is the result of 10 % 3?",
        options: ["3", "1", "0", "10"],
        answer: 1
    },
    {
        question: "Which operator reverses a Boolean value?",
        options: ["and", "or", "not", "=="],
        answer: 2
    },
    {
        question: "What is the output of 5 + 2 * 3?",
        options: ["21", "11", "15", "13"],
        answer: 1
    },
    {
        question: "If x = 5, what is x after x *= 3?",
        options: ["8", "15", "3", "53"],
        answer: 1
    }
];

let completedLessons = [];
let quizCompleted = false;
let selectedAnswers = {};
let quizSubmitted = false;

const progressReference = () => {
    const user = auth.currentUser;

    if (!user) return null;

    return doc(
        db,
        "users",
        user.uid,
        "progress",
        "python_module_3"
    );
};

async function loadProgress() {
    const reference = progressReference();

    if (!reference) return;

    try {
        const snapshot = await getDoc(reference);

        if (snapshot.exists()) {
            const data = snapshot.data();

            completedLessons = data.completedLessons || [];
            quizCompleted = data.quizCompleted || false;
        }

        updateDashboard();
        renderArticles();
        updateQuizLock();

    } catch (error) {
        console.error("Error loading progress:", error);
    }
}

async function saveProgress() {
    const reference = progressReference();

    if (!reference) return;

    try {
        await setDoc(reference, {
            completedLessons,
            quizCompleted,
            updatedAt: new Date()
        }, {
            merge: true
        });

    } catch (error) {
        console.error("Error saving progress:", error);
    }
}

function updateDashboard() {
    const completedCount = completedLessons.length;
    const totalLessons = lessons.length;
    const percentage = Math.round(
        (completedCount / totalLessons) * 100
    );

    document.getElementById("completed-count").textContent =
        `${completedCount} / ${totalLessons}`;

    document.getElementById("progress-percent").textContent =
        `${percentage}%`;

    document.getElementById("progress-fill").style.width =
        `${percentage}%`;

    document.getElementById("progress-text").textContent =
        `${completedCount} of ${totalLessons} articles completed`;

    document.getElementById("quiz-status").textContent =
        quizCompleted ? "Completed" :
        completedCount === totalLessons ? "Unlocked" : "Locked";
}

function renderArticles() {
    const container = document.getElementById("article-list");

    container.innerHTML = lessons.map((lesson, index) => {
        const completed = completedLessons.includes(index);

        return `
            <div class="article-card">
                <span class="article-tag">${lesson.tag}</span>
                <h3>${lesson.title}</h3>
                <p>${lesson.description}</p>

                <button class="card-btn" data-lesson="${index}">
                    ${completed ? "Review Article" : "Start Learning"}
                </button>
            </div>
        `;
    }).join("");

    container.querySelectorAll("[data-lesson]").forEach(button => {
        button.addEventListener("click", () => {
            openArticle(Number(button.dataset.lesson));
        });
    });
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function openArticle(index) {
    const lesson = lessons[index];

    if (!lesson) return;

    const modal = document.getElementById("lesson-modal");
    const body = document.getElementById("lesson-body");

    let currentStage = 0;

    body.innerHTML = `
        <span class="article-tag">${lesson.tag}</span>
        <h2>${lesson.title}</h2>

        <div class="lesson-notes">
            ${lesson.notes}
        </div>

        <div class="animation-box">
            <h3>Interactive Example</h3>

            <div class="animation-stage" id="animation-stage">
                <div class="operator-box" id="stage-left"></div>
                <div class="operator-box" id="stage-operator"></div>
                <div class="operator-result" id="stage-right"></div>
            </div>

            <p id="stage-explanation" style="text-align:center;"></p>

            <div style="display:flex; justify-content:center; gap:10px; margin-top:20px;">
                <button class="card-btn" id="previous-stage">← Previous</button>
                <button class="card-btn" id="next-stage">Next Example →</button>
            </div>
        </div>

        <h3>Try Python Yourself</h3>

        <p>Edit the code and click Run Code to see the output.</p>

        <textarea class="python-editor" id="python-editor">${escapeHTML(lesson.code)}</textarea>

        <div style="margin-top:15px;">
            <button class="run-code-btn" id="run-code">▶ Run Code</button>
        </div>

        <div class="output-box" id="python-output">Output will appear here...</div>

        <div class="challenge-box">
            <h3>Quick Challenge</h3>
            <p>${lesson.challenge.question}</p>

            <div class="challenge-options">
                ${lesson.challenge.options.map((option, optionIndex) => `
                    <button class="challenge-option" data-option="${optionIndex}">
                        ${escapeHTML(option)}
                    </button>
                `).join("")}
            </div>

            <p id="challenge-feedback"></p>
        </div>

        <button class="complete-article-btn" id="complete-article">
            ${completedLessons.includes(index) ? "✓ Article Completed" : "Complete Article"}
        </button>
    `;

    modal.classList.add("active");
    document.body.style.overflow = "hidden";

    function renderStage() {
        const stage = lesson.stages[currentStage];

        document.getElementById("stage-left").textContent = stage.left;
        document.getElementById("stage-operator").textContent = stage.operator;
        document.getElementById("stage-right").textContent = stage.right;

        document.getElementById("stage-explanation").textContent =
            stage.explanation;

        if (window.gsap) {
            window.gsap.fromTo(
                "#animation-stage .operator-box, #animation-stage .operator-result",
                {
                    opacity: 0,
                    y: 15
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.1
                }
            );
        }
    }

    renderStage();

    document.getElementById("previous-stage").addEventListener("click", () => {
        currentStage =
            (currentStage - 1 + lesson.stages.length) %
            lesson.stages.length;

        renderStage();
    });

    document.getElementById("next-stage").addEventListener("click", () => {
        currentStage = (currentStage + 1) % lesson.stages.length;
        renderStage();
    });

    document.getElementById("run-code").addEventListener("click", async () => {
        const code = document.getElementById("python-editor").value;
        const output = document.getElementById("python-output");

        output.textContent = "Running Python...";

        try {
            await loadPython();

            const result = await runPython(code);

            output.textContent = result || "Code executed successfully.";

        } catch (error) {
            output.textContent = error.message;
        }
    });

    lesson.challenge.options.forEach((option, optionIndex) => {
        const button = body.querySelector(
            `[data-option="${optionIndex}"]`
        );

        button.addEventListener("click", () => {
            const feedback =
                document.getElementById("challenge-feedback");

            body.querySelectorAll(".challenge-option").forEach(optionButton => {
                optionButton.classList.remove("correct", "wrong");
            });

            if (optionIndex === lesson.challenge.answer) {
                button.classList.add("correct");
                feedback.textContent = "Correct! Great job.";
            } else {
                button.classList.add("wrong");
                feedback.textContent = "Not quite. Try again!";
            }
        });
    });

    document.getElementById("complete-article").addEventListener("click", async () => {
        if (!completedLessons.includes(index)) {
            completedLessons.push(index);
        }

        updateDashboard();
        renderArticles();
        updateQuizLock();

        await saveProgress();

        document.getElementById("complete-article").textContent =
            "✓ Article Completed";
    });
}

let pyodideInstance = null;

async function loadPython() {
    if (pyodideInstance) return;

    if (!window.loadPyodide) {
        const script = document.createElement("script");

        script.src =
            "https://cdn.jsdelivr.net/pyodide/v0.27.7/full/pyodide.js";

        document.head.appendChild(script);

        await new Promise((resolve, reject) => {
            script.onload = resolve;
            script.onerror = reject;
        });
    }

    pyodideInstance = await window.loadPyodide();
}

async function runPython(code) {
    await loadPython();

    let output = "";

    pyodideInstance.setStdout({
        batched: text => {
            output += text;
        }
    });

    pyodideInstance.setStderr({
        batched: text => {
            output += text;
        }
    });

    try {
        await pyodideInstance.runPythonAsync(code);
    } catch (error) {
        output += error.message;
    }

    return output;
}

function updateQuizLock() {
    const allCompleted =
        completedLessons.length === lessons.length;

    const quizTab = document.querySelector('[data-tab="quiz"]');

    quizTab.disabled = !allCompleted;

    quizTab.textContent =
        allCompleted ? "Module Quiz" : "Module Quiz 🔒";

    const container = document.getElementById("quiz-container");

    if (!allCompleted) {
        container.innerHTML = `
            <div class="quiz-locked">
                <h3>🔒 Quiz Locked</h3>
                <p>Complete all five articles to unlock the module quiz.</p>
            </div>
        `;
    } else {
        renderQuiz();
    }

    const nextModuleButton =
        document.getElementById("next-module-btn");

    if (quizCompleted) {
        nextModuleButton.style.display = "inline-block";
    } else {
        nextModuleButton.style.display = "none";
    }
}

function renderQuiz() {
    const container = document.getElementById("quiz-container");

    container.innerHTML = `
        <div id="quiz-questions">
            ${quizQuestions.map((question, index) => `
                <div class="quiz-question">
                    <h3>${index + 1}. ${question.question}</h3>

                    <div class="quiz-options">
                        ${question.options.map((option, optionIndex) => `
                            <button
                                class="quiz-option"
                                data-question="${index}"
                                data-answer="${optionIndex}"
                            >
                                ${escapeHTML(option)}
                            </button>
                        `).join("")}
                    </div>
                </div>
            `).join("")}
        </div>

        <button class="submit-quiz-btn" id="submit-quiz">
            Submit Quiz
        </button>

        <div id="quiz-result"></div>
    `;

    container.querySelectorAll(".quiz-option").forEach(button => {
        button.addEventListener("click", () => {
            if (quizSubmitted) return;

            const questionIndex = Number(button.dataset.question);
            const answerIndex = Number(button.dataset.answer);

            selectedAnswers[questionIndex] = answerIndex;

            container.querySelectorAll(
                `[data-question="${questionIndex}"]`
            ).forEach(option => {
                option.classList.remove("selected");
            });

            button.classList.add("selected");
        });
    });

    document.getElementById("submit-quiz").addEventListener("click", async () => {
        if (quizSubmitted) return;

        let score = 0;

        quizQuestions.forEach((question, index) => {
            const selected = selectedAnswers[index];

            const options = container.querySelectorAll(
                `[data-question="${index}"]`
            );

            options.forEach((option, optionIndex) => {
                if (optionIndex === question.answer) {
                    option.classList.add("correct");
                }

                if (
                    optionIndex === selected &&
                    selected !== question.answer
                ) {
                    option.classList.add("wrong");
                }
            });

            if (selected === question.answer) {
                score++;
            }
        });

        quizSubmitted = true;

        const percentage = Math.round(
            (score / quizQuestions.length) * 100
        );

        const result = document.getElementById("quiz-result");

        result.className = "quiz-result";

        result.textContent =
            `You scored ${score} out of ${quizQuestions.length} (${percentage}%).`;

        if (percentage >= 70) {
            quizCompleted = true;

            result.textContent +=
                " Congratulations! Module 03 completed.";

            updateDashboard();
            updateQuizLock();

            await saveProgress();

        } else {
            result.textContent +=
                " You need 70% to pass. Review the articles and try again.";
        }
    });
}

function setupTabs() {
    const tabs = document.querySelectorAll(".tab-btn");

    const articlesSection =
        document.getElementById("articles-section");

    const problemsSection =
        document.getElementById("problems-section");

    const quizSection =
        document.getElementById("quiz-section");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            if (tab.disabled) return;

            tabs.forEach(item => item.classList.remove("active"));
            tab.classList.add("active");

            const selectedTab = tab.dataset.tab;

            articlesSection.style.display =
                selectedTab === "all" || selectedTab === "articles"
                    ? "block"
                    : "none";

            problemsSection.hidden = false;
            problemsSection.style.display =
                selectedTab === "all" || selectedTab === "problems"
                    ? "block"
                    : "none";

            quizSection.hidden = false;
            quizSection.style.display =
                selectedTab === "quiz" ? "block" : "none";
        });
    });
}

function setupModal() {
    const modal = document.getElementById("lesson-modal");

    document.getElementById("close-modal").addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "";
    });

    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.classList.remove("active");
            document.body.style.overflow = "";
        }
    });
}

auth.onAuthStateChanged(auth, async user => {
    if (!user) {
        window.location.href = "login.html";
        return;
    }

    await loadProgress();
});

setupTabs();
setupModal();
