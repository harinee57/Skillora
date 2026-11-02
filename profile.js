
import { auth, db } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const profileName = document.getElementById("profile-name");
const profileEmail = document.getElementById("profile-email");
const profileAvatar = document.getElementById("profile-avatar");
const logoutButton = document.getElementById("logout-btn");
const editButton = document.getElementById("edit-profile-btn");

onAuthStateChanged(auth, async (user) => {

    if (!user) {
        window.location.href = "login.html";
        return;
    }

    try {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);

        const savedName = userSnapshot.exists()
            ? userSnapshot.data().name
            : "";

        const name = savedName || user.displayName || "Learner";

        profileName.textContent = name;
        profileEmail.textContent = user.email || "";

        profileAvatar.innerHTML = "";

        const initial = document.createElement("span");
        initial.textContent = name.charAt(0).toUpperCase();

        profileAvatar.appendChild(initial);

    } catch (error) {
        console.error("Profile loading error:", error);
        profileName.textContent = user.displayName || "Learner";
        profileEmail.textContent = user.email || "";
    }

});

logoutButton.addEventListener("click", async () => {

    try {
        await signOut(auth);
        window.location.href = "index.html";

    } catch (error) {
        alert("Unable to log out. Please try again.");
        console.error(error);
    }

});

editButton.addEventListener("click", async () => {

    const user = auth.currentUser;

    if (!user) return;

    const newName = prompt(
        "Enter your new display name:",
        user.displayName || ""
    );

    if (!newName || !newName.trim()) return;

    try {
        await updateProfile(user, {
            displayName: newName.trim()
        });

        await import("https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js")
            .then(async ({ setDoc, serverTimestamp }) => {
                await setDoc(doc(db, "users", user.uid), {
                    name: newName.trim(),
                    updatedAt: serverTimestamp()
                }, { merge: true });
            });

        profileName.textContent = newName.trim();
        profileAvatar.querySelector("span").textContent =
            newName.trim().charAt(0).toUpperCase();

        alert("Profile updated successfully!");

    } catch (error) {
        console.error(error);
        alert("Could not update your profile.");
    }

});
