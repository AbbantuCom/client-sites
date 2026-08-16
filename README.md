# Diamond Advocates

The Diamond Advocates website as a Next.js 16 App Router application in TypeScript, ready to deploy
on Vercel. It is a conversion of the original static HTML site (kept in [legacy/](legacy/) for
reference) with the design, layout, copy and motion preserved.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
npm run typecheck
```

## Deploying to Vercel

Vercel auto-detects Next.js: import the repository and deploy, no configuration needed. Set the
production domain in [lib/site.ts](lib/site.ts) (`site.url`) so canonical URLs, Open Graph tags,
`sitemap.xml` and `robots.txt` point at the live host.

## Structure

| Path | Contents |
| --- | --- |
| `app/` | Routes, metadata and page composition |
| `components/` | Header, footer and the interactive pieces (`'use client'`) |
| `lib/` | Content and site data: practices, team, insights, site details |
| `styles/` | `styles.css` and `responsive.css`, carried over from the original build |
| `public/images/` | Brand, hero, practice and portrait images |
| `legacy/` | The original static site, kept for reference |
| `content/` | Source copy documents supplied by the client |
| `scripts/` | One-off asset tooling, not part of the build |

The browser and home-screen icons (`app/favicon.ico`, `app/icon.png`,
`app/apple-icon.png`) are the DA monogram in white on brand navy. They are committed, and
`python3 scripts/make-icons.py` regenerates all three from `public/images/logo-diamond-advocates.png`
if the logo ever changes.

### Routes

| Route | Original page |
| --- | --- |
| `/` | `index.html` |
| `/practice-areas` | `practice-areas.html` |
| `/practice/[slug]` | `practice-detail.html?practice=…` |
| `/team` | `team.html` |
| `/team/[slug]` | `team-profile.html?person=…` |
| `/insights` | `insights.html` |
| `/insights/[slug]` | `article.html` |
| `/blogs` | new: the Diamond Brief Series |
| `/blogs/[slug]` | new: one brief, with PDF reader |
| `/contact` | `contact.html` |
| `/cookie-policy` | new: cookie policy and consent controls |
| `/privacy-policy` | new: privacy policy |

Every page is statically prerendered at build time. The old `.html` URLs (including their query
strings) are 301-redirected to the new routes in [next.config.ts](next.config.ts), so existing
inbound links keep working.

## How the conversion maps over

- **Content is data.** Practices, lawyer profiles and insights moved out of inline page scripts into
  typed modules in `lib/`, so each page renders on the server instead of assembling itself in the
  browser. Adding a practice or a lawyer means adding one entry to the relevant array.
- **Styling is unchanged.** Both original stylesheets are imported by the root layout and are still
  the single source of truth for the design. The only edit is `height: auto` on the base `img` rule,
  which keeps the intrinsic aspect ratio now that `next/image` emits `width`/`height` attributes.
- **Motion is preserved.** Reveal-on-scroll, parallax, pointer tilt and Lenis smooth scrolling run
  from `components/scroll-effects.tsx` and `components/smooth-scroll.tsx`, driven by the same
  `data-reveal` / `data-parallax` / `data-tilt` attributes the markup already used. All of it honours
  `prefers-reduced-motion`.
- **Interactive UI is React.** The practice dropdown, mobile menu, practice/team/insight filters,
  section navigation, reading progress and back-to-top are client components; everything else is a
  server component.
- **Images go through `next/image`,** so they are resized and served as AVIF/WebP instead of the
  original multi-megabyte PNGs. File names were normalised (`images/Practices/energy  law.png` →
  `public/images/practices/energy-law.png`).

## Blogs

`/blogs` lists every Diamond Brief; `/blogs/[slug]` gives one brief its summary, a scrollable PDF
reader, a download, related briefs and a booking link. Everything comes from
[lib/blogs.ts](lib/blogs.ts) — adding a brief means adding one entry to the `blogs` array, newest
first.

Each brief points at its PDF through one of two sources, and `blogPreviewUrl` / `blogDownloadUrl`
pick the right URLs for whichever is set:

- `path` — a PDF in `public/`, e.g. `/blogs/borderless-identity.pdf`. **Preferred.** It reads in the
  browser's own PDF viewer, downloads in place, loads faster and involves no third party.
- `driveId` — a Google Drive file id, used when there is no local copy. The file must be shared as
  **"Anyone with the link"**, or visitors get a Google sign-in screen instead of the brief. All six
  current briefs use this.

To move a brief off Google Drive, drop the PDF into `public/blogs/` and set `path` on its entry; the
reader, the download button and the fallback link all follow automatically.

Cover images currently reuse the practice-area photography, chosen per topic. Swap the `image` field
on any entry for a real cover when artwork is available.

## Cookies and consent

The site sets no analytics or advertising cookies of its own. The only third parties involved are
the Google Maps embed on the contact page and the Google Drive PDF reader on each brief, and both
are wrapped in [`ConsentGate`](components/consent-gate.tsx): until the visitor accepts, the iframe is
never rendered, so **no request reaches Google at all**. The placeholder offers to load that one
embed, or to open the map or PDF directly in a new tab.

- The banner ([components/cookie-banner.tsx](components/cookie-banner.tsx)) appears until a choice is
  made, and the choice is stored under `da-cookie-consent` in local storage, never sent anywhere.
- [/cookie-policy](app/cookie-policy/page.tsx) explains what is set and repeats the accept/reject
  controls, including clearing the choice so the banner returns.
- [lib/consent.ts](lib/consent.ts) is the shared store. `useHydrated()` keeps consent-dependent UI
  out of server-rendered markup, so a returning visitor never sees the banner flash.

If you add another third party later (analytics, a chat widget, embedded video), wrap it in
`ConsentGate` too and add a line to the policy page, or the reject button stops telling the truth.

## Privacy policy

[/privacy-policy](app/privacy-policy/page.tsx) describes what the site actually does: no analytics
or tracking, a mailto-only appointment form, the consent choice in local storage, and technical
request data held by the host. It is written against Uganda's Data Protection and Privacy Act, 2019.

**It is a draft for the firm to review and approve before launch.** Two dashed
`.content-placeholder` blocks mark the facts only the firm can supply — response times, who handles
data protection requests, whether the firm is registered with the Personal Data Protection Office,
and real retention periods. Update `lastUpdated` in the page whenever the text changes.

Keep the policy true as the site grows: adding a form endpoint, analytics or any new third party
changes what this page has to say.

## The appointment form

The form in [components/appointment-form.tsx](components/appointment-form.tsx) validates in the
browser and then opens the visitor's own email application with the enquiry pre-composed and
addressed to `site.email`:

```
To:      info@diamondadvocates.com
Subject: Appointment request from <name>
Body:    Name / Email / Phone, then the details, then the sending domain
```

Nothing is posted to a server, so no enquiry data leaves the visitor's device until they press send
in their mail client, which also means no privacy notice or spam protection is required for it. The
fields stay filled after submitting and the confirmation panel carries the same `mailto:` link, so
the visitor can still reach us if no mail client is configured.

To switch to server-side delivery later (a transactional email provider, a CRM, an inbox
integration), replace the `window.location.href = href` line with a server action or route handler.
`buildMailtoHref` shows exactly which fields the firm expects to receive.

## Known gaps carried over from the original

These were placeholders in the static site and remain placeholders here: insights beyond the
E-Discovery brief, the downloadable Diamond Brief document, business hours, the office map embed,
and the Legal Disclaimer page all still need real content.
