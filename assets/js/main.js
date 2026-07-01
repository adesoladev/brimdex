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

/* ============================================================
   SELECTED WORK — touch fallback
   Hover states don't exist on touch devices. This gives touch
   users the same "preview" moment: first tap reveals the overlay/
   zoom (adds .is-active, matches :hover in selected-work.css),
   a second tap on the same card follows the link as normal.
============================================================ */
(function () {
  var isTouch = matchMedia("(hover: none)").matches;
  if (!isTouch) return;

  var cards = document.querySelectorAll(".work-card");

  cards.forEach(function (card) {
    card.addEventListener("click", function (e) {
      if (!card.classList.contains("is-active")) {
        e.preventDefault();
        cards.forEach(function (c) {
          if (c !== card) c.classList.remove("is-active");
        });
        card.classList.add("is-active");
      }
      // second tap: already active, let the click through (navigates)
    });
  });

  // Tapping outside any card clears the active preview state
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".work-card")) {
      cards.forEach(function (c) {
        c.classList.remove("is-active");
      });
    }
  });
})();
