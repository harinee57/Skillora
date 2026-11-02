
// ===============================
// SKILLORA INTERACTIVE ANIMATIONS
// ===============================


// 1. SCROLL REVEAL ANIMATION

const revealElements = document.querySelectorAll(
    ".section-heading, .course-card, .about"
);

revealElements.forEach((element) => {
    element.classList.add("reveal");
});

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach((entry) => {

        if (entry.isIntersecting) {

            entry.target.classList.add("visible");

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach((element) => {
    revealObserver.observe(element);
});


// 2. COURSE CARD 3D TILT

const cards = document.querySelectorAll(".course-card");

cards.forEach((card) => {

    card.addEventListener("mousemove", (event) => {

        const rect = card.getBoundingClientRect();

        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (centerY - y) / 15;
        const rotateY = (x - centerX) / 15;

        card.style.transform =
            `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;

    });

    card.addEventListener("mouseleave", () => {

        card.style.transform = "";

    });

});


// 3. NAVBAR SCROLL EFFECT

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


// 4. HERO BUTTON INTERACTION

const primaryButton = document.querySelector(".primary-button");

primaryButton.addEventListener("mouseenter", () => {

    primaryButton.style.letterSpacing = "0.5px";

});

primaryButton.addEventListener("mouseleave", () => {

    primaryButton.style.letterSpacing = "0px";

});


// 5. HERO VISUAL MOUSE MOVEMENT

const heroVisual = document.querySelector(".hero-visual");

heroVisual.addEventListener("mousemove", (event) => {

    const rect = heroVisual.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const moveX = (x - rect.width / 2) / 30;
    const moveY = (y - rect.height / 2) / 30;

    heroVisual.style.setProperty("--move-x", `${moveX}px`);
    heroVisual.style.setProperty("--move-y", `${moveY}px`);

});

heroVisual.addEventListener("mouseleave", () => {

    heroVisual.style.setProperty("--move-x", "0px");
    heroVisual.style.setProperty("--move-y", "0px");

});
