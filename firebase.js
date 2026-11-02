
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";

import {
    getAuth,
    GoogleAuthProvider
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

import {
    getFirestore
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyB1ysXTUZEGgVi0sON9UilwZ2cqGJDej_s",
    authDomain: "skillora-23d40.firebaseapp.com",
    projectId: "skillora-23d40",
    storageBucket: "skillora-23d40.firebasestorage.app",
    messagingSenderId: "226949055748",
    appId: "1:226949055748:web:2e393d84620a8b297abc51",
    measurementId: "G-L2ZHQ9ZP33"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
