import type { Metadata } from 'next';

import { BackToTop } from '@/components/back-to-top';
import { ScrollEffects } from '@/components/scroll-effects';
import { SiteFooter } from '@/components/site-footer';
import { SiteHeader } from '@/components/site-header';
import { SmoothScroll } from '@/components/smooth-scroll';
import { site } from '@/lib/site';

import '@/styles/styles.css';
import '@/styles/responsive.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Award Winning Tech Law Firm`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.tagline,
    type: 'website',
    siteName: site.name,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <BackToTop />
        <SmoothScroll />
        <ScrollEffects />
      </body>
    </html>
  );
}
