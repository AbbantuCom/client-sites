document.documentElement.classList.add("js");

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const primaryNav = document.getElementById("primary-nav");
  const navLinks = [...document.querySelectorAll(".nav-link")];
  const backToTop = document.getElementById("back-to-top");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  document.getElementById("current-year").textContent = new Date().getFullYear();

  const closeMenu = () => {
    primaryNav.classList.remove("open");
    menuToggle.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-open");
  };

  menuToggle.addEventListener("click", () => {
    const isOpen = primaryNav.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
    document.body.classList.toggle("menu-open", isOpen);
  });

  navLinks.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      primaryNav.classList.contains("open") &&
      !primaryNav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  const handleScroll = () => {
    const offset = window.scrollY;
    header.classList.toggle("scrolled", offset > 24);
    backToTop.classList.toggle("visible", offset > 650);
  };

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
  });

  const publicationFilters = [...document.querySelectorAll(".publication-filter")];
  const publicationPreviewGrid = document.getElementById("publication-preview-grid");
  const publicationPreviewCards = [...document.querySelectorAll(".publication-preview-card")];

  publicationFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      publicationFilters.forEach((item) => {
        const selected = item === filter;
        item.classList.toggle("active", selected);
        item.setAttribute("aria-pressed", String(selected));
      });

      const selectedType = filter.dataset.publicationFilter;
      publicationPreviewCards.forEach((card) => {
        card.hidden = selectedType !== "all" && card.dataset.publicationType !== selectedType;
      });

      publicationPreviewGrid.classList.remove("filtering");
      void publicationPreviewGrid.offsetWidth;
      publicationPreviewGrid.classList.add("filtering");
    });
  });

  const privacyModal = document.getElementById("privacy-modal");
  const privacyDialog = privacyModal.querySelector(".privacy-dialog");
  const privacyOpeners = [...document.querySelectorAll("[data-privacy-open]")];
  const privacyClosers = [...document.querySelectorAll("[data-privacy-close]")];
  let privacyReturnFocus = null;

  const openPrivacy = (trigger) => {
    privacyReturnFocus = trigger;
    privacyModal.classList.add("open");
    privacyModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("privacy-open");
    privacyDialog.focus();
  };

  const closePrivacy = () => {
    if (!privacyModal.classList.contains("open")) return;
    privacyModal.classList.remove("open");
    privacyModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("privacy-open");
    privacyReturnFocus?.focus();
  };

  privacyOpeners.forEach((opener) => {
    opener.addEventListener("click", () => openPrivacy(opener));
  });

  privacyClosers.forEach((closer) => {
    closer.addEventListener("click", closePrivacy);
  });

  privacyModal.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closePrivacy();
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = [...privacyDialog.querySelectorAll("a[href], button:not([disabled]), [tabindex]:not([tabindex='-1'])")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const observedSections = navLinks
    .map((link) => {
      const target = link.getAttribute("href");
      return target?.startsWith("#") ? document.querySelector(target) : null;
    })
    .filter(Boolean);

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-32% 0px -60% 0px", threshold: 0 }
  );

  observedSections.forEach((section) => sectionObserver.observe(section));

  const staggerGroups = [
    ".focus-item",
    ".impact-statements > div",
    ".stakeholder-grid article",
    ".publication-preview-card",
    ".africa-principles span",
    ".mission-tags span",
    ".footer-column"
  ];

  staggerGroups.forEach((selector) => {
    document.querySelectorAll(selector).forEach((item, index) => {
      item.classList.add("reveal");
      item.style.setProperty("--reveal-delay", `${Math.min(index, 5) * 90}ms`);
    });
  });

  const reveals = document.querySelectorAll(".reveal");
  if (reducedMotion) {
    reveals.forEach((item) => item.classList.add("revealed"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -45px" }
    );

    reveals.forEach((item) => revealObserver.observe(item));
  }

  const workContent = {
    research: {
      label: "Evidence / 01",
      kicker: "Building the evidence base",
      title: "Research and Publications",
      description:
        "Independent, rigorous research that brings African contexts into the global conversation on technology law and policy.",
      image: "assets/images/work-research-publications.png",
      imageAlt: "Research and publication workspace with books, reports and digital analysis",
      imagePosition: "center"
    },
    advisory: {
      label: "Policy / 02",
      kicker: "Turning evidence into action",
      title: "Policy and Regulatory Advisory",
      description:
        "Practical, rights-respecting advice that helps governments, regulators and public institutions respond to technological change.",
      image: "assets/images/work-policy-regulatory.jpeg",
      imageAlt: "Policy and regulatory documents arranged for legal review",
      imagePosition: "center"
    },
    training: {
      label: "Capacity / 03",
      kicker: "Equipping decision-makers",
      title: "Training and Capacity Building",
      description:
        "Purpose-built learning for judges, lawyers, regulators, policymakers and technologists navigating complex digital questions.",
      image: "assets/images/work-training-capacity.jpeg",
      imageAlt: "Capacity-building concepts developed collaboratively around a table",
      imagePosition: "center"
    },
    convenings: {
      label: "Dialogue / 04",
      kicker: "Connecting perspectives",
      title: "Multi-stakeholder Convenings",
      description:
        "Trusted spaces where government, industry, academia, civil society and affected communities can build shared understanding.",
      image: "assets/images/work-multistakeholder-convenings.jpeg",
      imageAlt: "A multi-stakeholder group collaborating around a shared table",
      imagePosition: "center"
    },
    litigation: {
      label: "Rights / 05",
      kicker: "Pursuing accountability",
      title: "Public Interest Litigation and Advocacy",
      description:
        "Strategic legal action and public advocacy where technology threatens fundamental rights, justice or the public interest.",
      image: "assets/images/aclpit-policy-professionals.png",
      imageAlt: "African legal professionals reviewing case and policy documents together",
      imagePosition: "center 48%"
    }
  };

  Object.values(workContent).forEach((item) => {
    const image = new Image();
    image.src = item.image;
  });

  const workTabs = [...document.querySelectorAll(".work-tab")];
  const workPanel = document.getElementById("work-panel");
  const workGraphic = document.getElementById("work-graphic");
  const workImage = document.getElementById("work-image");
  const workLabel = workPanel.querySelector(".graphic-label");
  const workKicker = document.getElementById("work-kicker");
  const workTitle = document.getElementById("work-panel-title");
  const workDescription = document.getElementById("work-panel-description");
  let imageSwapTimer;

  const selectWork = (tab) => {
    const content = workContent[tab.dataset.work];
    if (!content) return;

    workTabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle("active", selected);
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
    });

    workPanel.animate(
      [
        { opacity: 0.2, transform: "translateY(8px)" },
        { opacity: 1, transform: "translateY(0)" }
      ],
      { duration: reducedMotion ? 1 : 360, easing: "ease-out" }
    );

    workLabel.textContent = content.label;
    workKicker.textContent = content.kicker;
    workTitle.textContent = content.title;
    workDescription.textContent = content.description;

    if (workImage.getAttribute("src") !== content.image) {
      clearTimeout(imageSwapTimer);
      workGraphic.classList.add("is-switching");
      imageSwapTimer = setTimeout(() => {
        workImage.src = content.image;
        workImage.alt = content.imageAlt;
        workImage.style.objectPosition = content.imagePosition;
        requestAnimationFrame(() => workGraphic.classList.remove("is-switching"));
      }, reducedMotion ? 0 : 180);
    }
  };

  workTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectWork(tab));
    tab.addEventListener("mouseenter", () => {
      if (window.matchMedia("(hover: hover)").matches) selectWork(tab);
    });
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      let nextIndex = index;
      if (event.key === "ArrowDown") nextIndex = (index + 1) % workTabs.length;
      if (event.key === "ArrowUp") nextIndex = (index - 1 + workTabs.length) % workTabs.length;
      if (event.key === "Home") nextIndex = 0;
      if (event.key === "End") nextIndex = workTabs.length - 1;
      workTabs[nextIndex].focus();
      selectWork(workTabs[nextIndex]);
    });
  });

  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");

  contactForm.querySelectorAll("input, select, textarea").forEach((field) => {
    field.addEventListener("input", () => {
      field.closest(".field").classList.remove("invalid");
      field.removeAttribute("aria-invalid");
    });
  });

  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const requiredFields = [...contactForm.querySelectorAll("[required]")];
    let firstInvalid = null;

    requiredFields.forEach((field) => {
      const fieldWrap = field.closest(".field");
      const invalid = !field.checkValidity();
      fieldWrap.classList.toggle("invalid", invalid);
      field.setAttribute("aria-invalid", String(invalid));
      if (invalid && !firstInvalid) firstInvalid = field;
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    contactForm.classList.add("submitted");
    formSuccess.classList.add("visible");
    formSuccess.focus();
  });
});
