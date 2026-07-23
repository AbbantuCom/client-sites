/* ACLPIT shared interactions */

document.addEventListener("DOMContentLoaded", function () {

  /* Navbar shadow on scroll */
  var nav = document.querySelector(".navbar-aclpit");
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 24) { nav.classList.add("scrolled"); }
    else { nav.classList.remove("scrolled"); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Scroll reveal */
  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (el) { observer.observe(el); });
  } else {
    revealItems.forEach(function (el) { el.classList.add("visible"); });
  }

  /* Image fallback: swap broken remote photos for the brand placeholder */
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    img.addEventListener("error", function () {
      if (img.dataset.done) return;
      img.dataset.done = "1";
      img.src = img.dataset.fallback;
      img.style.objectFit = "contain";
      img.style.padding = "18%";
      img.style.background = "#EFE5D6";
    });
  });

  /* Contact form */
  var form = document.getElementById("contactForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }
      var success = document.getElementById("formSuccess");
      if (success) {
        success.classList.remove("d-none");
        success.setAttribute("tabindex", "-1");
        success.focus();
      }
      form.reset();
      form.classList.remove("was-validated");
    });
  }

  /* Current year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
});
