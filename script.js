
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
