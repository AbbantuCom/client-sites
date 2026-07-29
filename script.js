const nav = document.getElementById('site-nav');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const body = document.body;
const revealItems = document.querySelectorAll('.reveal');
const form = document.getElementById('enquiry-form');
const formMessage = document.getElementById('form-message');

function updateNavState() {
  if (window.scrollY > 24) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}

function toggleMenu(forceState) {
  const isOpen = typeof forceState === 'boolean' ? forceState : !navMenu.classList.contains('is-open');
  navMenu.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  menuToggle.innerHTML = `<i data-lucide="${isOpen ? 'x' : 'menu'}" class="h-5 w-5"></i>`;
  if (window.lucide) {
    lucide.createIcons();
  }
  body.classList.toggle('menu-open', isOpen);
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navMenu.classList.contains('is-open')) {
    toggleMenu(false);
    menuToggle.focus();
  }
});

menuToggle.addEventListener('click', () => toggleMenu());

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (window.innerWidth < 768) {
      toggleMenu(false);
    }
  });
});

window.addEventListener('scroll', updateNavState, { passive: true });
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768 && navMenu.classList.contains('is-open')) {
    toggleMenu(false);
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item) => observer.observe(item));

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function buildWhatsAppMessage(data) {
  return [
    'Hello Blue Swan Products Ltd,',
    `I would like to enquire about ${data.product}.`,
    `Full name: ${data.fullName}`,
    `Organisation: ${data.organisation}`,
    `Phone number: ${data.phone}`,
    `Email: ${data.email}`,
    `Estimated quantity: ${data.quantity}`,
    `Customer type: ${data.customerType}`,
    `Message: ${data.message}`,
  ].join('\n');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const requiredFields = ['fullName', 'organisation', 'phone', 'email', 'product', 'quantity', 'customerType', 'message'];
  const missingField = requiredFields.find((field) => !String(data[field] || '').trim());

  if (missingField) {
    formMessage.textContent = 'Please complete all required fields before sending your enquiry.';
    formMessage.className = 'form-status error';
    return;
  }

  if (!validateEmail(data.email)) {
    formMessage.textContent = 'Please enter a valid email address.';
    formMessage.className = 'form-status error';
    return;
  }

  const message = encodeURIComponent(buildWhatsAppMessage(data));
  const whatsappUrl = `https://wa.me/256787475558?text=${message}`;

  formMessage.textContent = 'Your enquiry has been prepared for WhatsApp. You can send it instantly.';
  formMessage.className = 'form-status success';
  window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  form.reset();
});

const whatsappFloat = document.getElementById('wa-float');
if (whatsappFloat) {
  whatsappFloat.addEventListener('click', (event) => {
    event.preventDefault();
    const url = whatsappFloat.getAttribute('href');
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}

updateNavState();
if (window.lucide) {
  lucide.createIcons();
}
