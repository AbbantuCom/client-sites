import Image from 'next/image';
import Link from 'next/link';

import { HomeHero } from '@/components/home-hero';
import { portrait } from '@/lib/images';
import { practices } from '@/lib/practices';
import { site } from '@/lib/site';
import { featuredTeam } from '@/lib/team';
import { publishedInsights } from '@/lib/insights';

const legalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'LegalService',
  name: site.name,
  telephone: site.phone,
  email: site.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.street,
    addressLocality: site.address.locality,
    addressCountry: site.address.country,
  },
};

const homeRows = ['tech', 'ai', 'tax', 'real-estate']
  .map((slug) => practices.find((practice) => practice.slug === slug))
  .filter((practice): practice is (typeof practices)[number] => Boolean(practice));

const frontierPractices = [
  { slug: 'tech', code: '01 / INNOVATE', eyebrow: 'Frontier practice 01' },
  { slug: 'ai', code: '02 / INTELLIGENCE', eyebrow: 'Frontier practice 02' },
];

export default function HomePage() {
  const featuredArticle = publishedInsights[0];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(legalServiceSchema) }}
      />
      <HomeHero />

      <section className="section" id="about">
        <div className="container grid-2">
          <div data-reveal>
            <p className="eyebrow">Our blueprint</p>
            <p className="intro-statement">
              The solutions of tomorrow, <span className="gold">today.</span>
            </p>
          </div>
          <div data-reveal>
            <p className="lead">{site.description}</p>
            <p>
              We are a partner of WONE GLOBAL, a unified, international firm having an elite network
              of over 100 senior partners across more than 30 countries dealing in Law, Banking
              &amp; Finance, Tax, Audit, Accounting, and Business Advisory.
            </p>
            <Link className="text-link" href="/practice-areas">
              Discover our practice <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section--compact section--navy recognition-section">
        <div className="container">
          <div className="award-panel" data-reveal>
            <div className="award-mark" aria-hidden="true">
              ✦
            </div>
            <div>
              <p className="eyebrow">Recognition</p>
              <h2>
                We won a Digital Excellence Award in 2025 by the Uganda Law Society for being a
                market leader in legal tech practice!
              </h2>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Our areas of practice</p>
              <h2>Legal clarity across a changing world.</h2>
            </div>
            <Link className="text-link" href="/practice-areas">
              View all practices <span>→</span>
            </Link>
          </div>
          <div className="practice-list" data-reveal="stagger">
            {homeRows.map((practice) => (
              <Link
                key={practice.slug}
                className="practice-row"
                data-reveal
                href={`/practice/${practice.slug}`}
              >
                <span className="practice-number">{practice.number}</span>
                <h3>{practice.shortTitle}</h3>
                <p>{practice.summary}</p>
                <span className="practice-arrow">→</span>
              </Link>
            ))}
            <Link className="practice-row" data-reveal href="/practice-areas">
              <span className="practice-number">05—09</span>
              <h3>More practices</h3>
              <p>Disputes, IP Law, Employment Law, Insurance and Energy Law.</p>
              <span className="practice-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container grid-2">
          {frontierPractices.map(({ slug, code, eyebrow }) => {
            const practice = practices.find((item) => item.slug === slug);
            if (!practice) return null;
            return (
              <article key={slug} className="tech-panel" data-reveal data-tilt>
                <span className="tech-panel-code" aria-hidden="true">
                  {code}
                </span>
                <p className="eyebrow">{eyebrow}</p>
                <h2>{practice.shortTitle}</h2>
                <p>{practice.summary}</p>
                <Link className="text-link" href={`/practice/${practice.slug}`}>
                  Explore {practice.shortTitle} <span>→</span>
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Our people</p>
              <h2>One team. Tailored, results-driven legal support.</h2>
            </div>
            <Link className="text-link" href="/team">
              View full team <span>→</span>
            </Link>
          </div>
          <div className="team-grid">
            {featuredTeam.map((person) => (
              <Link
                key={person.slug}
                className="person-card"
                data-reveal
                href={`/team/${person.slug}`}
              >
                <Image
                  className="person-photo"
                  src={person.image}
                  alt={person.name}
                  width={portrait.width}
                  height={portrait.height}
                  sizes="(max-width: 600px) 100vw, (max-width: 1100px) 50vw, 25vw"
                />
                <div className="person-info">
                  <h3>{person.name}</h3>
                  <p>{person.role}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Insights</p>
              <h2>Thinking for what comes next.</h2>
            </div>
            <Link className="text-link" href="/insights">
              All insights <span>→</span>
            </Link>
          </div>
          <div className="insights-grid">
            {featuredArticle ? (
              <Link
                className="insight-card featured"
                data-reveal
                href={`/insights/${featuredArticle.slug}`}
              >
                <span className="article-meta">Diamond Brief Series · 22 April 2026</span>
                <div>
                  <h3>{featuredArticle.title}</h3>
                  <span className="text-link">
                    Read article <span>→</span>
                  </span>
                </div>
              </Link>
            ) : null}
            <div className="insight-stack">
              <article className="insight-card" data-reveal>
                <span className="article-meta">Original archive</span>
                <div>
                  <h3>More Diamond Advocates insights</h3>
                  <p>Verified article content is required from the original website.</p>
                </div>
              </article>
              <article className="insight-card" data-reveal>
                <span className="article-meta">Newsletters</span>
                <div>
                  <h3>Legal thinking, clearly presented.</h3>
                  <p>Original Diamond Advocates content required here.</p>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--navy cta">
        <div className="container" data-reveal>
          <p className="eyebrow">Talk to our team</p>
          <h2>Guided by global vision and grounded in strong legal foundations.</h2>
          <p className="lead" style={{ marginInline: 'auto' }}>
            Tell us how we can support you.
          </p>
          <div className="button-row" style={{ justifyContent: 'center' }}>
            <Link className="btn btn--gold" href="/contact">
              Book appointment <span>↗</span>
            </Link>
            <a className="btn btn--outline" href={site.phoneHref}>
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
