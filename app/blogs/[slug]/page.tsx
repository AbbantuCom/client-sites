import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { BlogCard } from '@/components/blog-card';
import { ConsentGate } from '@/components/consent-gate';
import {
  blogDownloadUrl,
  blogPreviewUrl,
  blogs,
  getBlog,
  getRelatedBlogs,
  isLocalPdf,
} from '@/lib/blogs';
import { site } from '@/lib/site';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) return {};
  return {
    title: blog.title,
    description: blog.description[0],
    openGraph: {
      title: blog.title,
      description: blog.description[0],
      type: 'article',
      authors: blog.authors,
      images: [{ url: blog.image.src }],
    },
  };
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) notFound();
  const related = getRelatedBlogs(blog.slug);
  const downloadUrl = blogDownloadUrl(blog.pdf);
  // A local PDF saves in place; a Drive file has to open in its own tab.
  const localPdf = isLocalPdf(blog.pdf);
  const downloadProps = localPdf
    ? { href: downloadUrl, download: blog.pdf.fileName }
    : { href: downloadUrl, target: '_blank', rel: 'noopener noreferrer' };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.description[0],
    author: blog.authors.map((name) => ({ '@type': 'Person', name })),
    publisher: { '@type': 'Organization', name: site.name },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <section className="inner-hero blog-hero">
        <div className="container" data-reveal="hero">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/blogs">Blogs</Link>
            <span>/</span>
            <span className="breadcrumb-current">{blog.title}</span>
          </nav>
          <p className="eyebrow">{blog.series}</p>
          <h1>{blog.title}</h1>
          <p className="blog-authors">By {blog.authors.join(' and ')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container detail-layout detail-layout--editorial">
          <aside>
            <div className="blog-aside">
              <span className="section-nav-label">The full brief</span>
              <p className="blog-file">{blog.pdf.fileName}</p>
              <a className="btn btn--navy" {...downloadProps}>
                Download PDF <span>↓</span>
              </a>
              <div className="rule"></div>
              <p className="blog-aside-note">
                Have a question about what this means for your business?
              </p>
              <Link className="text-link" href="/contact">
                Book appointment <span>→</span>
              </Link>
            </div>
          </aside>

          <div>
            <section className="detail-section" data-reveal>
              <p className="eyebrow">In this brief</p>
              {blog.description.map((paragraph, index) =>
                index === 0 ? (
                  <p key={paragraph.slice(0, 48)} className="lead">
                    {paragraph}
                  </p>
                ) : (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ),
              )}

              {blog.highlights ? (
                <>
                  <h2 className="blog-subhead">{blog.highlights.title}</h2>
                  <ul className="blog-highlights">
                    {blog.highlights.items.map((item) => (
                      <li key={item.slice(0, 48)}>{item}</li>
                    ))}
                  </ul>
                </>
              ) : null}

              {blog.closing?.map((paragraph) => <p key={paragraph.slice(0, 48)}>{paragraph}</p>)}
            </section>

            <section className="detail-section blog-reader-section" id="read" data-reveal>
              <div className="section-head">
                <div>
                  <p className="eyebrow">Read the brief</p>
                  <h2>The full document.</h2>
                </div>
                <a className="text-link" {...downloadProps}>
                  Download PDF <span>↓</span>
                </a>
              </div>
              <ConsentGate
                label="the PDF reader"
                provider="Google Drive"
                fallback={{ href: downloadUrl, label: 'Download the PDF instead' }}
                skip={localPdf}
              >
                <div className="blog-reader">
                  <iframe
                    title={`${blog.title} (PDF)`}
                    src={blogPreviewUrl(blog.pdf)}
                    loading="lazy"
                    allow="autoplay"
                  />
                </div>
              </ConsentGate>
              <p className="form-note">
                Scroll inside the reader to page through the brief. If it does not load,{' '}
                <a className="blog-inline-link" {...downloadProps}>
                  open the PDF directly
                </a>
                .
              </p>
            </section>
          </div>
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container">
          <div className="section-head" data-reveal>
            <div>
              <p className="eyebrow">Related briefs</p>
              <h2>More from the series.</h2>
            </div>
            <Link className="text-link" href="/blogs">
              All blogs <span>→</span>
            </Link>
          </div>
          <div className="blog-grid" data-reveal="stagger">
            {related.map((item) => (
              <BlogCard key={item.slug} blog={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--navy cta">
        <div className="container" data-reveal>
          <p className="eyebrow">Talk to our team</p>
          <h2>Guided by global vision and grounded in strong legal foundations.</h2>
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
