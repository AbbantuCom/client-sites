document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const primaryNav = document.getElementById("primary-nav");
  const backToTop = document.getElementById("back-to-top");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  document.querySelectorAll("#current-year").forEach((year) => {
    year.textContent = new Date().getFullYear();
  });

  const closeMenu = () => {
    primaryNav?.classList.remove("open");
    menuToggle?.classList.remove("active");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-open");
  };

  menuToggle?.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    document.body.classList.toggle("menu-open", isOpen);
  });

  primaryNav?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const handleScroll = () => {
    const offset = window.scrollY;
    header?.classList.toggle("scrolled", offset > 24);
    backToTop?.classList.toggle("visible", offset > 500);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  backToTop?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });

  const staggeredItems = document.querySelectorAll(".publication-preview-card, .dialogue-card");
  staggeredItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 90}ms`);
  });

  const reveals = document.querySelectorAll(".reveal");
  if (reducedMotion) {
    reveals.forEach((item) => item.classList.add("revealed"));
  } else {
    const observer = new IntersectionObserver(
      (entries, revealObserver) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -35px" }
    );
    reveals.forEach((item) => observer.observe(item));
  }

  const publicationFilters = [...document.querySelectorAll(".publication-filter")];
  const publicationGrid = document.getElementById("publication-preview-grid");
  const publicationCards = [...document.querySelectorAll(".publication-preview-card")];

  publicationFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      publicationFilters.forEach((item) => {
        const selected = item === filter;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });

      publicationCards.forEach((card) => {
        const type = filter.dataset.publicationFilter;
        card.hidden = type !== "all" && card.dataset.publicationType !== type;
      });

      publicationGrid?.classList.remove("filtering");
      if (publicationGrid) {
        void publicationGrid.offsetWidth;
        publicationGrid.classList.add("filtering");
      }
    });
  });

  const dialogueFilters = [...document.querySelectorAll(".dialogue-filter")];
  const dialogueGrid = document.getElementById("dialogue-card-grid");
  const dialogueCards = [...document.querySelectorAll(".dialogue-card")];

  dialogueFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      dialogueFilters.forEach((item) => {
        const selected = item === filter;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });

      dialogueCards.forEach((card) => {
        const type = filter.dataset.dialogueFilter;
        card.hidden = type !== "all" && card.dataset.dialogueType !== type;
      });

      dialogueGrid?.classList.remove("filtering");
      if (dialogueGrid) {
        void dialogueGrid.offsetWidth;
        dialogueGrid.classList.add("filtering");
      }
    });
  });
});
