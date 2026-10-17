
"use strict";

// ===== MOBILE MENU =====

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        const isOpen = navLinks.classList.toggle("open");

        menuBtn.setAttribute("aria-expanded", String(isOpen));
        menuBtn.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });

    navLinks.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("open");
            menuBtn.setAttribute("aria-expanded", "false");
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
}

// ===== DARK / LIGHT THEME =====

const themeBtn = document.getElementById("themeBtn");
const themeIcon = themeBtn?.querySelector("i");

function applyTheme(isLight) {
    document.body.classList.toggle("light-theme", isLight);

    if (themeIcon) {
        themeIcon.className = isLight
            ? "fa-solid fa-moon"
            : "fa-solid fa-sun";
    }

    if (themeBtn) {
        themeBtn.setAttribute(
            "aria-label",
            isLight ? "Switch to dark theme" : "Switch to light theme"
        );
    }

    const themeColor = document.querySelector(
        'meta[name="theme-color"]'
    );

    if (themeColor) {
        themeColor.setAttribute(
            "content",
            isLight ? "#f5f5f8" : "#09090d"
        );
    }
}

let savedTheme = null;

try {
    savedTheme = localStorage.getItem("nabil-theme");
} catch (error) {
    // Theme switching still works if storage is unavailable.
}

applyTheme(savedTheme === "light");

themeBtn?.addEventListener("click", () => {
    const isLight = !document.body.classList.contains("light-theme");

    applyTheme(isLight);

    try {
        localStorage.setItem("nabil-theme", isLight ? "light" : "dark");
    } catch (error) {
        // The selected theme remains active until the page is refreshed.
    }
});

// ===== ANIMATED TYPING =====

const typedText = document.getElementById("typedText");

const roles = [
    "Python",
    "Web Development",
    "Cybersecurity",
    "Networking",
    "Robotics"
];

let roleIndex = 0;
let charIndex = 0;
let deleting = false;

function typeRole() {
    if (!typedText) return;

    const currentRole = roles[roleIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typedText.textContent = currentRole.substring(0, charIndex);

    let delay = deleting ? 45 : 90;

    if (!deleting && charIndex === currentRole.length) {
        deleting = true;
        delay = 1300;
    } else if (deleting && charIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        delay = 350;
    }

    setTimeout(typeRole, delay);
}

if (typedText) {
    typeRole();
}

// ===== REVEAL SECTIONS ON SCROLL =====

const revealSections = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.08
    });

    revealSections.forEach((section) => observer.observe(section));
} else {
    revealSections.forEach((section) => {
        section.classList.add("visible");
    });
}

// ===== AUTOMATIC COPYRIGHT YEAR =====

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}

/* ===== HAUNTED GHOST EFFECT ===== */

(() => {
    if (document.querySelector(".ghost-layer")) return;

    const layer = document.createElement("div");
    layer.className = "ghost-layer";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);

    for (let i = 0; i < 4; i++) {
        const ghost = document.createElement("div");
        ghost.className = "ghost";

        ghost.style.left = `${12 + i * 23}%`;
        ghost.style.top = `${25 + (i % 3) * 20}%`;
        ghost.style.animationDelay = `${i * -4.5}s`;
        ghost.style.animationDuration = `${17 + i * 3}s`;
        ghost.style.transform = `scale(${0.7 + i * 0.12})`;

        layer.appendChild(ghost);
    }
})();

document.addEventListener("click", function (event) {
    const button = event.target.closest("a, button");

    if (!button) return;

    const drop = document.createElement("span");
    drop.className = "blood-drop";

    drop.style.setProperty(
        "--drop-position",
        `${15 + Math.random() * 70}%`
    );

    button.classList.add("blood-click");
    button.appendChild(drop);

    setTimeout(() => drop.remove(), 1300);
});

/* ===== HAUNTED GHOST EFFECT ===== */

(() => {
    if (document.querySelector(".ghost-layer")) return;

    const layer = document.createElement("div");
    layer.className = "ghost-layer";
    layer.setAttribute("aria-hidden", "true");
    document.body.appendChild(layer);

    for (let i = 0; i < 4; i++) {
        const ghost = document.createElement("div");
        ghost.className = "ghost";

        ghost.style.left = `${12 + i * 23}%`;
        ghost.style.top = `${25 + (i % 3) * 20}%`;
        ghost.style.animationDelay = `${i * -4.5}s`;
        ghost.style.animationDuration = `${17 + i * 3}s`;
        ghost.style.transform = `scale(${0.7 + i * 0.12})`;

        layer.appendChild(ghost);
    }
})();

/* ===== HORROR HEARTBEAT SOUND ===== */

(() => {
    let audioContext = null;
    let heartbeatTimer = null;
    let soundStarted = false;

    function playThump(startTime, volume = 0.7) {
        if (!audioContext) return;

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.setValueAtTime(90, startTime);
        oscillator.frequency.exponentialRampToValueAtTime(
            38, startTime + 0.16
        );

        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(
            volume, startTime + 0.025
        );
        gain.gain.exponentialRampToValueAtTime(
            0.001, startTime + 0.2
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + 0.22);
    }

    function playHeartbeat() {
        if (!audioContext || audioContext.state !== "running") return;

        const now = audioContext.currentTime;

        // Two soft heartbeats: lub-dub
        playThump(now, 0.55);
        playThump(now + 0.19, 0.35);
    }

    async function startSound() {
        if (!audioContext) {
            const AudioContextClass =
                window.AudioContext || window.webkitAudioContext;

            if (!AudioContextClass) return;

            audioContext = new AudioContextClass();
        }

        if (audioContext.state === "suspended") {
            await audioContext.resume();
        }

        if (soundStarted) return;

        soundStarted = true;

        // Start background heartbeat
        playHeartbeat();

        heartbeatTimer = setInterval(() => {
            playHeartbeat();
        }, 1200);
    }

    document.addEventListener("click", async (event) => {
        const clicked = event.target.closest(
            "a, button, input[type='button'], input[type='submit']"
        );

        if (!clicked) return;

        try {
            await startSound();

            // Extra heartbeat on every click
            if (audioContext && audioContext.state === "running") {
                playHeartbeat();
            }
        } catch (error) {
            console.warn("Audio could not start:", error);
        }
    });
})();

