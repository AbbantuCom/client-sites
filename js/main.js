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

      var name = document.getElementById("cName").value.trim();
      var email = document.getElementById("cEmail").value.trim();
      var address = document.getElementById("cAddress") ? document.getElementById("cAddress").value.trim() : "";
      var org = document.getElementById("cOrg").value.trim();
      var topic = document.getElementById("cTopic").value;
      var msg = document.getElementById("cMsg").value.trim();

      var subject = "Email of " + name + " from ACLPIT website";
      var body = "Full Name: " + name +
        "\nEmail: " + email +
        "\nAddress: " + address +
        "\nOrganisation: " + org +
        "\nArea of Interest: " + topic +
        "\nMessage: " + msg;
// 
      var mailto = "mailto:info@aclpit.org" +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);
      window.location.href = mailto;

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

  /* Video modal (Legal Tech Dialogues) */
  var videoModalEl = document.getElementById("videoModal");
  if (videoModalEl && window.bootstrap) {
    var videoFrame = document.getElementById("videoModalFrame");
    var videoTitleEl = document.getElementById("videoModalLabel");
    document.querySelectorAll("[data-yt-id]").forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        var id = trigger.getAttribute("data-yt-id");
        videoFrame.src = "https://www.youtube.com/embed/" + id + "?autoplay=1&rel=0";
        videoTitleEl.textContent = trigger.getAttribute("data-yt-title") || "Video";
      });
    });
    videoModalEl.addEventListener("hidden.bs.modal", function () {
      videoFrame.src = "";
    });
  }

  /* PDF modal (Publications) */
  var pdfModalEl = document.getElementById("pdfModal");
  if (pdfModalEl && window.bootstrap) {
    var pdfFrame = document.getElementById("pdfModalFrame");
    var pdfTitleEl = document.getElementById("pdfModalLabel");
    var pdfDownload = document.getElementById("pdfModalDownload");
    document.querySelectorAll("[data-pdf-id]").forEach(function (trigger) {
      trigger.addEventListener("click", function (e) {
        e.preventDefault();
        var id = trigger.getAttribute("data-pdf-id");
        pdfFrame.src = "https://drive.google.com/file/d/" + id + "/preview";
        pdfTitleEl.textContent = trigger.getAttribute("data-pdf-title") || "Publication";
        pdfDownload.href = "https://drive.google.com/uc?export=download&id=" + id;
      });
    });
    pdfModalEl.addEventListener("hidden.bs.modal", function () {
      pdfFrame.src = "";
    });
  }
});
