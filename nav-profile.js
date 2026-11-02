
import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const photo = document.getElementById("nav-profile-photo");
const initial = document.getElementById("nav-profile-initial");

onAuthStateChanged(auth, async (user) => {

    if (!photo || !initial) return;

    if (user) {
        const name = user.displayName || user.email || "Learner";

        initial.textContent = name.charAt(0).toUpperCase();

        if (user.photoURL) {
            photo.src = user.photoURL;
            photo.classList.add("visible");
            initial.style.display = "none";

            photo.onerror = () => {
                photo.classList.remove("visible");
                initial.style.display = "block";
            };
        } else {
            photo.classList.remove("visible");
            initial.style.display = "block";
        }

        try {
            await setDoc(doc(db, "users", user.uid), {
                name: user.displayName || "",
                email: user.email || "",
                photoURL: user.photoURL || "",
                updatedAt: serverTimestamp()
            }, { merge: true });
        } catch (error) {
            console.error("Profile sync error:", error);
        }

    } else {
        photo.classList.remove("visible");
        initial.textContent = "U";
        initial.style.display = "block";
    }
});
