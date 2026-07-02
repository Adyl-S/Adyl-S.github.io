// ── Typed role rotation ──────────────────────────────────────
const ROLES = [
  "Multi-Agent Systems",
  "Voice AI Pipelines",
  "GTM Automation",
  "LLM Orchestration",
  "RAG & Knowledge Systems",
];
const typedEl = document.getElementById("typed");
let roleIdx = 0, charIdx = 0, deleting = false;

function typeLoop() {
  const word = ROLES[roleIdx];
  typedEl.textContent = word.slice(0, charIdx);
  let delay;
  if (!deleting) {
    charIdx++;
    delay = 65;
    if (charIdx > word.length) { deleting = true; delay = 1900; }
  } else {
    charIdx--;
    delay = 32;
    if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % ROLES.length; delay = 350; }
  }
  setTimeout(typeLoop, delay);
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reducedMotion) {
  typedEl.textContent = ROLES[0];
} else {
  typeLoop();
}

// ── Scroll reveal ────────────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add("visible");
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

// Fallback: if the observer hasn't revealed anything shortly after load
// (unsupported API, throttled embedded webview), show everything.
setTimeout(() => {
  if (document.querySelectorAll(".reveal.visible").length === 0) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
  }
}, 1500);

// ── Animated stat counters ───────────────────────────────────
const statObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      statObserver.unobserve(e.target);
      const el = e.target;
      const target = parseInt(el.dataset.count, 10);
      const prefix = el.dataset.prefix ? "<" : "";
      const suffix = el.dataset.suffix || "";
      if (reducedMotion) { el.textContent = prefix + target + suffix; return; }
      const dur = 1400, start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + Math.round(target * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    });
  },
  { threshold: 0.4 }
);
document.querySelectorAll(".stat-num").forEach((el) => statObserver.observe(el));

// ── Particle network background ──────────────────────────────
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const count = Math.min(90, Math.floor((canvas.width * canvas.height) / 22000));
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.6 + 0.5,
  }));
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const LINK = 130;
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(34, 211, 238, 0.35)";
    ctx.fill();

    for (let j = i + 1; j < particles.length; j++) {
      const q = particles[j];
      const dx = p.x - q.x, dy = p.y - q.y;
      const dist = Math.hypot(dx, dy);
      if (dist < LINK) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(q.x, q.y);
        ctx.strokeStyle = `rgba(94, 234, 212, ${0.09 * (1 - dist / LINK)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);
if (!reducedMotion) drawParticles();

// ── Nav behavior ─────────────────────────────────────────────
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 20);
});

const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navLinks.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ── Footer year ──────────────────────────────────────────────
document.getElementById("year").textContent = new Date().getFullYear();
