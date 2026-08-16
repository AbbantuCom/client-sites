import Image from 'next/image';
import Link from 'next/link';

import { site } from '@/lib/site';

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Image
              className="footer-brand"
              src={site.logo}
              alt={site.name}
              width={1900}
              height={717}
            />
            <p>
              Guided by global vision and grounded in strong legal foundations, we create the
              solutions of tomorrow, today.
            </p>
            <Image
              className="partner-logo"
              src={site.partnerLogo}
              alt={`${site.name}, partner of WONE Global`}
              width={1024}
              height={386}
            />
          </div>
          <div>
            <h2 className="footer-title">Explore</h2>
            <ul className="footer-links">
              <li>
                <Link href="/practice-areas">Our Practice</Link>
              </li>
              <li>
                <Link href="/team">Our Team</Link>
              </li>
              <li>
                <Link href="/insights">Insights</Link>
              </li>
              <li>
                <Link href="/blogs">Blogs</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Practices</h2>
            <ul className="footer-links">
              <li>
                <Link href="/practice/tech">Tech Law</Link>
              </li>
              <li>
                <Link href="/practice/ai">AI Law</Link>
              </li>
              <li>
                <Link href="/practice/tax">Tax Law</Link>
              </li>
              <li>
                <Link href="/practice-areas">View all</Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="footer-title">Contact</h2>
            <ul className="footer-links">
              <li>
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>{site.address.full}</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {site.name}. All rights reserved.</span>
          <span>
            <Link href="/cookie-policy">Cookie Policy</Link> · Privacy Policy · Legal Disclaimer
            (pages to be supplied)
          </span>
        </div>
      </div>
    </footer>
  );
}
