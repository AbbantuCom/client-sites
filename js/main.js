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

  /* Cookie consent banner */
  var CONSENT_COOKIE = "aclpit_cookie_consent";
  var CONSENT_MAX_AGE_DAYS = 180;

  function setCookie(name, value, days) {
    var expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + "; expires=" + expires + "; path=/; SameSite=Lax";
  }
  function getCookie(name) {
    var match = document.cookie.match(new RegExp("(?:^|; )" + name + "=([^;]*)"));
    return match ? decodeURIComponent(match[1]) : null;
  }

  var banner = document.createElement("div");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "region");
  banner.setAttribute("aria-label", "Cookie consent");
  banner.innerHTML =
    '<div class="cookie-banner__inner">' +
      '<div class="cookie-banner__text">' +
        "<p>We use a cookie to remember your cookie preference. Accept or reject cookies, and change your choice anytime. Read our <a href=\"cookies.html\">Cookie Policy</a>.</p>" +
      "</div>" +
      '<div class="cookie-banner__actions">' +
        '<button type="button" class="btn btn-outline-ivory" data-cookie-reject>Reject</button>' +
        '<button type="button" class="btn btn-ivory" data-cookie-accept>Accept</button>' +
      "</div>" +
    "</div>";
  document.body.appendChild(banner);

  var acceptBtn = banner.querySelector("[data-cookie-accept]");
  var rejectBtn = banner.querySelector("[data-cookie-reject]");

  function hideBanner() {
    banner.classList.remove("is-visible");
  }
  function showBanner() {
    banner.classList.add("is-visible");
  }
  function setConsent(value) {
    setCookie(CONSENT_COOKIE, value, CONSENT_MAX_AGE_DAYS);
    hideBanner();
  }

  acceptBtn.addEventListener("click", function () { setConsent("accepted"); });
  rejectBtn.addEventListener("click", function () { setConsent("rejected"); });

  if (!getCookie(CONSENT_COOKIE)) {
    showBanner();
  }

  document.querySelectorAll("[data-cookie-preferences]").forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      showBanner();
    });
  });
});
