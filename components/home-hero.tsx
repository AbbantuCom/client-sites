'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const slides = [
  { src: '/images/hero/tech.jpg', word: 'Tech', width: 1920, height: 2560 },
  { src: '/images/hero/ai.jpg', word: 'AI', width: 1920, height: 2880 },
  { src: '/images/hero/tax.jpg', word: 'Tax', width: 1920, height: 2880 },
  { src: '/images/hero/real-estate.jpg', word: 'Real Estate', width: 1920, height: 2880 },
  { src: '/images/hero/insurance.jpg', word: 'Insurance', width: 1920, height: 2876 },
];

const SLIDE_DURATION = 4500;

export function HomeHero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setActive((index) => (index + 1) % slides.length), SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero">
      <div className="hero-media" data-parallax aria-hidden="true">
        {slides.map((slide, index) => (
          <div key={slide.src} className={`hero-slide${index === active ? ' is-active' : ''}`}>
            <Image
              src={slide.src}
              alt=""
              width={slide.width}
              height={slide.height}
              priority={index === 0}
              sizes="(max-width: 820px) 100vw, 60vw"
            />
          </div>
        ))}
        <span className="hero-media-scan"></span>
      </div>
      <div className="hero-orbit hero-orbit--one" aria-hidden="true"></div>
      <div className="hero-orbit hero-orbit--two" aria-hidden="true"></div>
      <div className="container hero-content" data-reveal="hero">
        <p className="hero-kicker">
          {slides.map((slide, index) => (
            <span key={slide.word}>
              {index > 0 ? <span aria-hidden="true"> · </span> : null}
              <span className={`hero-kicker-word${index === active ? ' is-active' : ''}`}>
                {slide.word}
              </span>
            </span>
          ))}
        </p>
        <h1>
          Award Winning <em>Tech Law</em> Firm
        </h1>
        <p className="hero-practices">
          Guided by global vision. Grounded in strong legal foundations.
        </p>
        <div className="button-row">
          <Link className="btn btn--gold" href="/practice-areas">
            Explore our practice <span>↗</span>
          </Link>
          <Link className="btn btn--outline" href="/contact">
            Book appointment
          </Link>
          <Link className="btn btn--outline" href="/team">
            Meet our team
          </Link>
        </div>
      </div>
      <span className="hero-line"></span>
      <span className="scroll-cue">Scroll</span>
    </section>
  );
}
