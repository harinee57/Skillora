
import { auth, googleProvider, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const form = document.getElementById("auth-form");
const nameField = document.getElementById("name-field");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

const title = document.getElementById("auth-title");
const description = document.getElementById("auth-description");
const submitButton = document.getElementById("submit-btn");
const switchButton = document.getElementById("switch-btn");
const switchText = document.getElementById("switch-text");
const googleButton = document.getElementById("google-btn");
const message = document.getElementById("auth-message");

let isSignup = false;

function showMessage(text) {
    message.textContent = text;
}

function updatePage() {
    nameField.hidden = !isSignup;

    title.innerHTML = isSignup
        ? 'Create your <span>account.</span>'
        : 'Welcome <span>back.</span>';

    description.textContent = isSignup
        ? 'Create an account and start your learning journey.'
        : 'Sign in to continue learning where you left off.';

    submitButton.textContent = isSignup
        ? 'Create Account →'
        : 'Sign In →';

    switchText.textContent = isSignup
        ? 'Already have an account?'
        : 'New to Skillora?';

    switchButton.textContent = isSignup
        ? 'Sign in'
        : 'Create account';

    nameInput.required = isSignup;
    showMessage("");
}

switchButton.addEventListener("click", () => {
    isSignup = !isSignup;
    updatePage();
});

async function saveUserProfile(user, name = "") {
    await setDoc(doc(db, "users", user.uid), {
        name: name || user.displayName || "",
        email: user.email,
        updatedAt: serverTimestamp()
    }, { merge: true });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    submitButton.disabled = true;
    showMessage("Please wait...");

    try {
        if (isSignup) {
            const name = nameInput.value.trim();

            const result = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            await updateProfile(result.user, {
                displayName: name
            });

            await saveUserProfile(result.user, name);

        } else {
            const result = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            await saveUserProfile(result.user);
        }

        window.location.href = "index.html";

    } catch (error) {
        showMessage(error.message);
    } finally {
        submitButton.disabled = false;
    }
});

googleButton.addEventListener("click", async () => {
    googleButton.disabled = true;
    showMessage("Connecting to Google...");

    try {
        const result = await signInWithPopup(auth, googleProvider);

        await saveUserProfile(result.user);

        window.location.href = "index.html";

    } catch (error) {
        showMessage(error.message);
    } finally {
        googleButton.disabled = false;
    }
});

updatePage();
