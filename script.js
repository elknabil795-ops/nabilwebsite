
/* =================================
   NABIL HORROR PORTFOLIO
   JavaScript
================================= */

// 1. السنة الحالية
document.getElementById("year").textContent =
  new Date().getFullYear();


// 2. القائمة ديال الهاتف
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
  const opened = navLinks.classList.toggle("open");

  menuBtn.textContent = opened ? "✕" : "☰";
  menuBtn.setAttribute("aria-expanded", String(opened));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuBtn.textContent = "☰";
    menuBtn.setAttribute("aria-expanded", "false");
  });
});


// 3. تبديل الوضع المظلم والفاتح
const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const lightMode =
    document.body.classList.contains("light-theme");

  themeBtn.textContent = lightMode ? "🌙" : "☀️";
});


// 4. الكتابة المتحركة
const typedText = document.getElementById("typedText");

const words = [
  "Programming",
  "Cybersecurity",
  "Web Development",
  "Networking",
  "Robotics"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect() {
  const word = words[wordIndex];

  typedText.textContent =
    word.substring(0, letterIndex);

  if (!deleting) {
    letterIndex++;

    if (letterIndex > word.length) {
      deleting = true;
      setTimeout(typeEffect, 1200);
      return;
    }
  } else {
    letterIndex--;

    if (letterIndex <= 0) {
      letterIndex = 0;
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeEffect, deleting ? 45 : 100);
}

typeEffect();


// 5. إظهار الأقسام ملي توصل ليها
const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(section => {
  revealObserver.observe(section);
});


// 6. إنشاء القطرات الحمراء المتحركة
document.querySelectorAll(".blood-edge").forEach(edge => {
  for (let i = 0; i < 10; i++) {
    const drip = document.createElement("span");

    drip.className = "drip";

    drip.style.setProperty(
      "--x",
      `${Math.random() * 85}%`
    );

    drip.style.setProperty(
      "--h",
      `${30 + Math.random() * 100}px`
    );

    drip.style.setProperty(
      "--speed",
      `${3 + Math.random() * 5}s`
    );

    drip.style.setProperty(
      "--delay",
      `${Math.random() * 6}s`
    );

    edge.appendChild(drip);
  }
});


// 7. تأثير أحمر مع الضغط على الأزرار والروابط
let flashTimeout;

document.addEventListener("click", event => {
  if (!event.target.closest("a, button")) {
    return;
  }

  document.body.classList.remove("horror-click");

  // إعادة تشغيل التأثير
  void document.body.offsetWidth;

  document.body.classList.add("horror-click");

  clearTimeout(flashTimeout);

  flashTimeout = setTimeout(() => {
    document.body.classList.remove("horror-click");
  }, 400);
});


// 8. صوت دقات القلب باستعمال JavaScript
// الصوت كيبدا غير ملي المستخدم يضغط على الزر
const soundBtn = document.getElementById("soundBtn");

let audioContext = null;
let soundEnabled = false;
let heartbeatTimer = null;

function playThump(frequency, startTime, volume) {
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = "sine";

  oscillator.frequency.setValueAtTime(
    frequency,
    startTime
  );

  oscillator.frequency.exponentialRampToValueAtTime(
    frequency * 0.65,
    startTime + 0.12
  );

  gain.gain.setValueAtTime(0.001, startTime);

  gain.gain.exponentialRampToValueAtTime(
    volume,
    startTime + 0.025
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    startTime + 0.18
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + 0.2);
}

function playHeartbeat() {
  if (!audioContext || audioContext.state !== "running") {
    return;
  }

  const now = audioContext.currentTime;

  // دقة أولى وثانية
  playThump(75, now, 0.22);
  playThump(58, now + 0.20, 0.16);
}

soundBtn.addEventListener("click", async () => {
  try {
    if (!audioContext) {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext;

      if (!AudioContextClass) {
        soundBtn.textContent = "Audio not supported";
        return;
      }

      audioContext = new AudioContextClass();
    }

    if (audioContext.state === "suspended") {
      await audioContext.resume();
    }

    soundEnabled = !soundEnabled;

    if (soundEnabled) {
      playHeartbeat();

      heartbeatTimer = setInterval(() => {
        playHeartbeat();
      }, 1500);

      soundBtn.textContent = "🔇 Turn Sound Off";
    } else {
      clearInterval(heartbeatTimer);
      heartbeatTimer = null;

      soundBtn.textContent = "🔊 Enable Heartbeat";
    }
  } catch (error) {
    console.error("Audio error:", error);
    soundBtn.textContent = "Audio unavailable";
  }
});

console.log("👻 Nabil Horror Portfolio loaded successfully!");


