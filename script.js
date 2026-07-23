/* =========================================================
   1. CUSTOM CURSOR & GLOW EFFECT
========================================================= */
const cursorDot = document.querySelector(".cursor-dot");
const cursorGlow = document.querySelector(".cursor-glow");

window.addEventListener("mousemove", (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  cursorGlow.animate(
    { left: `${posX}px`, top: `${posY}px` },
    { duration: 500, fill: "forwards" }
  );
});

/* =========================================================
   2. FLOATING BACKGROUND PARTICLES CANVAS
========================================================= */
const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1 - 0.5;
    this.speedY = Math.random() * 1 - 0.5;
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x > canvas.width) this.x = 0;
    if (this.x < 0) this.x = canvas.width;
    if (this.y > canvas.height) this.y = 0;
    if (this.y < 0) this.y = canvas.height;
  }
  draw() {
    ctx.fillStyle = "rgba(56, 189, 248, 0.4)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < 60; i++) {
    particlesArray.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach((particle) => {
    particle.update();
    particle.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

/* =========================================================
   3. 3D TILT CARD EFFECT ON MOUSEMOVE
========================================================= */
const tiltCards = document.querySelectorAll(".tilt-card");

tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
  });
});

/* =========================================================
   4. SCROLL REVEAL ANIMATIONS
========================================================= */
const revealElements = document.querySelectorAll(".scroll-reveal");
const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

/* =========================================================
   5. PROJECT INTERACTIVE MODALS
========================================================= */
const projectDetails = {
  project1: {
    title: "Console Tic-Tac-Toe Game",
    description:
      "A feature-rich C/C++ terminal game logic featuring multi-player modes, 2D array matrix state evaluation, algorithmic win/draw detectors, and input sanitization.",
    tags: ["C++", "C", "Algorithms", "Matrix Math"],
  },
  project2: {
    title: "Social Media Video & Reels",
    description:
      "High-converting visual content edited using professional timeline techniques, keyframe motion graphics, audio waveform synchronization, and glowing overlay edits.",
    tags: ["Video Editing", "Motion Graphics", "Color Grading", "Beat Sync"],
  },
  project3: {
    title: "Brand Graphic Banners & Ads",
    description:
      "Custom brand identities, social media posters, typography banners, and marketing creatives crafted for academic and local business promotion.",
    tags: ["Graphic Design", "Photoshop", "Branding", "Typography"],
  },
};

function openModal(projectId) {
  const modal = document.getElementById("projectModal");
  const modalBody = document.getElementById("modalBody");
  const data = projectDetails[projectId];

  modalBody.innerHTML = `
    <h2 style="color: #38bdf8; margin-bottom: 1rem;">${data.title}</h2>
    <p style="color: #cbd5e1; line-height: 1.6; margin-bottom: 1.5rem;">${
      data.description
    }</p>
    <div style="display:flex; gap: 0.5rem; flex-wrap:wrap;">
      ${data.tags
        .map(
          (tag) =>
            `<span style="background:rgba(56,189,248,0.2); color:#38bdf8; padding:0.4rem 0.8rem; border-radius:12px; font-size:0.85rem;">${tag}</span>`
        )
        .join("")}
    </div>
  `;
  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

window.onclick = function (event) {
  const modal = document.getElementById("projectModal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
};