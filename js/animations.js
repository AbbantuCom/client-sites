(() => {
  'use strict';

  const elements = document.querySelectorAll('[data-reveal]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-reveal="stagger"]').forEach((group) => {
    [...group.children].forEach((child, index) => {
      child.style.transitionDelay = `${Math.min(index * 80, 480)}ms`;
    });
  });

  const setFinalCounts = () => document.querySelectorAll('[data-count]').forEach((counter) => {
    counter.textContent = `${counter.dataset.count}${counter.dataset.suffix || ''}`;
  });

  if (!('IntersectionObserver' in window) || reducedMotion) {
    elements.forEach((element) => element.classList.add('revealed'));
    setFinalCounts();
    return;
  }

  const animateCount = (counter) => {
    if (counter.dataset.counted) return;
    counter.dataset.counted = 'true';
    const target = Number(counter.dataset.count);
    const suffix = counter.dataset.suffix || '';
    const start = performance.now();
    const duration = 1400;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        entry.target.querySelectorAll('[data-count]').forEach(animateCount);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -35px' });
  elements.forEach((element) => observer.observe(element));

  const parallaxItems = document.querySelectorAll('[data-parallax]');
  let ticking = false;
  const updateParallax = () => {
    parallaxItems.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return;
      const progress = (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight;
      item.style.setProperty('--parallax-y', `${progress * -34}px`);
    });
    ticking = false;
  };
  addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
  updateParallax();

  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.transform = `perspective(900px) rotateX(${y * -5}deg) rotateY(${x * 7}deg) translateY(-3px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });

  const heroSlides = [...document.querySelectorAll('.hero-slide')];
  const heroIndexEl = document.querySelector('.hero-index');
  const heroBar = document.querySelector('.hero-bar');
  if (heroSlides.length > 1 && heroIndexEl) {
    const DURATION = 4500;
    let current = Math.max(0, heroSlides.findIndex((slide) => slide.classList.contains('is-active')));
    let start = performance.now();

    const buttons = heroSlides.map((slide) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = slide.dataset.word || '';
      heroIndexEl.appendChild(button);
      return button;
    });

    const goToSlide = (index) => {
      heroSlides[current].classList.remove('is-active');
      buttons[current].classList.remove('active');
      current = (index + heroSlides.length) % heroSlides.length;
      heroSlides[current].classList.add('is-active');
      buttons[current].classList.add('active');
      start = performance.now();
    };

    buttons.forEach((button, index) => button.addEventListener('click', () => goToSlide(index)));
    buttons[current].classList.add('active');

    if (reducedMotion) {
      if (heroBar) heroBar.style.display = 'none';
    } else {
      const tick = (now) => {
        const progress = Math.min((now - start) / DURATION, 1);
        if (heroBar) heroBar.style.width = `${progress * 100}%`;
        if (progress >= 1) goToSlide(current + 1);
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }

  document.querySelectorAll('.team-grid--animated .person-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      if (event.pointerType === 'touch') return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      card.style.transform = `perspective(1000px) rotateX(${y * -4}deg) rotateY(${x * 6}deg) translateY(-5px)`;
      card.style.setProperty('--photo-x', `${x * -10}px`);
      card.style.setProperty('--photo-y', `${y * -8}px`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
      card.style.removeProperty('--photo-x');
      card.style.removeProperty('--photo-y');
    });
  });
})();
