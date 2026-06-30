/* ── Brimdex | main.js ── */

/* ─────────────────────────────────────────
   Component loader — fetches HTML fragments
   and injects them into placeholder divs
───────────────────────────────────────── */
async function loadComponent(id, path) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Failed to load ${path}: ${res.status}`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error(err);
  }
}

/* ─────────────────────────────────────────
   Navbar behaviour — runs AFTER the navbar
   HTML has been injected into the DOM
───────────────────────────────────────── */
function initNavbar() {
  const nav = document.getElementById("main-nav");
  const btn = document.getElementById("menu-btn");
  const menu = document.getElementById("mobile-menu");

  if (!nav || !btn || !menu) return;

  /* — Mobile toggle — */
  btn.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");

    if (isOpen) {
      menu.classList.add("hidden");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    } else {
      menu.classList.remove("hidden");
      btn.classList.add("open");
      btn.setAttribute("aria-expanded", "true");
    }
  });

  /* — Close on resize to desktop — */
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      menu.classList.add("hidden");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }
  });

  /* — Scroll: transparent → frosted glass — */
  const onScroll = () => {
    if (window.scrollY > 10) {
      nav.classList.remove("bg-transparent", "border-transparent");
      nav.classList.add(
        "bg-white/70",
        "backdrop-blur-lg",
        "border-b",
        "border-white/30",
        "shadow-sm",
      );
    } else {
      nav.classList.add("bg-transparent", "border-transparent");
      nav.classList.remove(
        "bg-white/70",
        "backdrop-blur-lg",
        "border-b",
        "border-white/30",
        "shadow-sm",
      );
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // apply correct state on load

  /* — Mark active link — */
  const path = window.location.pathname;
  nav.querySelectorAll("a.nav-link").forEach((link) => {
    const href = link.getAttribute("href");
    if (href === path || (href !== "/" && path.startsWith(href))) {
      link.classList.add("active");
    }
  });
}

/* ─────────────────────────────────────────
   Bootstrap — load components then init
───────────────────────────────────────── */
document.addEventListener("DOMContentLoaded", async () => {
  // Adjust paths to match your project structure
  await loadComponent("navbar", "/components/navbar.html");
  await loadComponent("footer", "/components/footer.html");

  initNavbar();
});

// STRATEGIC THINKING SECTION
const strategicBlock = document.querySelector(".strategic-block");

const strategicObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        strategicBlock.classList.add("is-visible");
        strategicObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

strategicObserver.observe(strategicBlock);

// SERVICES SECTION
const header = document.querySelector(".services-header");

const headerObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        header.classList.add("is-visible");
        headerObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

headerObserver.observe(header);

const grid = document.querySelector(".services-grid");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        grid.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

observer.observe(grid);

// PROCESS SECTION
const processHeader = document.querySelector(".process-header");

const processObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        processHeader.classList.add("is-visible");
        processObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

processObserver.observe(processHeader);
