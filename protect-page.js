import { auth } from "./firebase.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Hide the page until Firebase checks the login status
document.body.style.visibility = "hidden";

onAuthStateChanged(auth, (user) => {

    if (!user) {
        const currentPage =
            window.location.pathname + window.location.search;

        window.location.href =
            "login.html?next=" + encodeURIComponent(currentPage);

        return;
    }

    // Allow signed-in users to view the page
    document.body.style.visibility = "visible";

});