import type { ImageAsset } from './images';

export type BlogPdf = {
  /** File name as supplied by the firm, shown next to the download button. */
  fileName: string;
  /**
   * Path to the PDF inside `public/`, e.g. "/blogs/borderless-identity.pdf".
   * Preferred when present: it reads in the browser's own PDF viewer and
   * downloads directly, with no third party involved.
   */
  path?: string;
  /**
   * Google Drive file id, used when there is no local copy. The file must be
   * shared as "Anyone with the link", otherwise visitors get a sign-in screen.
   */
  driveId?: string;
};

export type Blog = {
  slug: string;
  title: string;
  /** Series line shown above the title, e.g. "Diamond Brief Series · Vol.1 Issue 3". */
  series: string;
  authors: string[];
  /** Lead paragraphs of the summary. */
  description: string[];
  /** Optional bulleted section inside the summary. */
  highlights?: { title: string; items: string[] };
  /** Optional closing paragraphs after the bullets. */
  closing?: string[];
  pdf: BlogPdf;
  image: ImageAsset;
};

function requireSource(pdf: BlogPdf) {
  if (!pdf.path && !pdf.driveId) {
    // Fails the build rather than shipping a dead reader and download button.
    throw new Error(`Blog PDF "${pdf.fileName}" needs either a path or a driveId.`);
  }
}

/** Scrollable reader: the browser's PDF viewer locally, Google's viewer on Drive. */
export function blogPreviewUrl(pdf: BlogPdf) {
  requireSource(pdf);
  if (pdf.path) return `${pdf.path}#view=FitH`;
  return `https://drive.google.com/file/d/${pdf.driveId}/preview`;
}

/** Direct download of the original PDF. */
export function blogDownloadUrl(pdf: BlogPdf) {
  requireSource(pdf);
  if (pdf.path) return pdf.path;
  return `https://drive.google.com/uc?export=download&id=${pdf.driveId}`;
}

/** Local files download in place; Drive files have to open in a new tab. */
export function isLocalPdf(pdf: BlogPdf) {
  return Boolean(pdf.path);
}

const practiceImages = {
  ip: {
    src: '/images/practices/ip-law.jpg',
    width: 1024,
    height: 559,
    alt: 'Patents, trademarks, copyrights and trade secrets illustration',
  },
  disputes: {
    src: '/images/practices/disputes-law.png',
    width: 2014,
    height: 1063,
    alt: 'Advocate wearing formal court attire',
  },
  ai: {
    src: '/images/practices/ai-law.png',
    width: 1920,
    height: 1080,
    alt: 'Artificial intelligence processor on a circuit board',
  },
  tax: {
    src: '/images/practices/tax-law.png',
    width: 1024,
    height: 576,
    alt: 'Tax forms, calculator and laptop',
  },
  tech: {
    src: '/images/practices/tech-law.png',
    width: 2014,
    height: 1063,
    alt: 'Technology keyboard illuminated in red and blue',
  },
  insurance: {
    src: '/images/practices/insurance-law.png',
    width: 2048,
    height: 1152,
    alt: 'Insurance key on a computer keyboard',
  },
} satisfies Record<string, ImageAsset>;

/** Newest first. */
export const blogs: Blog[] = [
  {
    slug: 'copyright-protection-for-fintech-innovators',
    title:
      'Even David Can Defeat Goliath: What Kenya’s Landmark Copyright Judgment Means for Ugandan Fintech Innovators',
    series: 'Diamond Brief Series',
    authors: ['Priscilla Nayiga', 'Vera Kabasiita Nakatumba'],
    description: [
      'In this week’s Diamond Brief Series, Priscilla Nayiga and Vera Kabasiita Nakatumba discuss the dilemma of financial innovators in East Africa and the role of law in protecting small fintech innovators in Uganda, and the effectiveness of Uganda’s intellectual property law.',
      'They argue that while Uganda’s fintech ecosystem may have outpaced the development of dedicated legal frameworks, existing intellectual property doctrines apply with equal force to fintech products and their underlying expressions.',
      'The case of Muoki v. Safaricom should matter to Ugandan founders for a reason beyond its obvious encouragement. It demonstrates that copyright registration, meticulous documentation, and early legal counsel are not luxury expenses for well-funded startups. They are survival tools for any founder whose innovation might one day attract the attention of a larger player.',
    ],
    pdf: {
      fileName: 'INTELLECTUAL-PROPERTY-PROTECTION-FOR-FINANCIAL-INNOVATORS.pdf',
      driveId: '1i3qSKFIqYDjKYYaKz2qU-qqB8t6erRdd',
    },
    image: practiceImages.ip,
  },
  {
    slug: 'e-discovery-in-litigation',
    title: 'E-Discovery in Litigation: An Overview of Electronic Evidence and Discovery',
    series: 'Diamond Brief Series · Vol.1 Issue 5',
    authors: ['Vera Nakatumba'],
    description: [
      'As digital communications continue to replace paper records, the legal profession can no longer afford to treat electronic discovery as an afterthought.',
      'In our latest Diamond Brief, Vera Nakatumba explores E-Discovery in Litigation, a practical overview of how electronically stored information (ESI) is identified, preserved, collected, and produced in legal proceedings, and what this means for litigants and legal practitioners in Uganda.',
    ],
    highlights: {
      title: 'Key takeaways from the brief',
      items: [
        'What qualifies as ESI, from emails and spreadsheets to deleted files and cloud storage',
        'The four conditions digital evidence must meet to be admissible in court',
        'Uganda’s legal framework: the Electronic Transactions Act, the Data Protection and Privacy Act, and the Evidence Act',
        'The 7-stage Electronic Discovery Reference Model (EDRM)',
        'How courts balance data protection principles with the evidentiary demands of litigation',
      ],
    },
    closing: [
      'E-Discovery is no longer a concern exclusive to large, multinational disputes. As Ugandan courts and businesses become increasingly digital, understanding the rules around electronic evidence is essential for anyone involved in litigation.',
    ],
    pdf: {
      fileName: 'E-DISCOVERY-AND-LITIGATION.pdf',
      driveId: '1eYF-7Ja2eXsW2NmBAoUahaygIS9CAcvQ',
    },
    image: practiceImages.disputes,
  },
  {
    slug: 'borderless-identity-afcfta-digital-trade-protocol',
    title: 'Borderless Identity: The Implementation Gaps in AfCFTA’s Digital Trade Protocol',
    series: 'Diamond Brief Series · Vol.1 Issue 4',
    authors: ['Galandi Tony Kiire', 'Priscilla Nayiga'],
    description: [
      'AfCFTA is building Africa’s single market. But a digital market cannot function without trusted digital identity.',
      'In Volume 1, Issue 4 of the Diamond Brief Series, Galandi Tony Kiire and Priscilla Nayiga explore Borderless Identity and the legal architecture emerging from the AfCFTA Digital Trade Protocol and its Annex on Digital Identities.',
      'The Protocol answers an important question: digital identity now formally belongs within Africa’s trade framework. The real challenge now is implementation.',
    ],
    highlights: {
      title: 'This brief examines',
      items: [
        'How the Digital Trade Protocol embeds digital identity within Africa’s digital trade ecosystem',
        'The role of interoperability, mutual recognition, and cross-border authentication',
        'Why digital identity is becoming the trust infrastructure for cross-border payments, e-commerce, and digital services',
        'The implementation gaps that could reproduce regulatory fragmentation if left unaddressed',
      ],
    },
    closing: [
      'AfCFTA’s digital market will not be built by tariffs alone. It will depend on whether Africa can develop trusted, interoperable identity systems that work across borders while respecting sovereignty and data protection.',
      'The law now points clearly toward integration. The question is whether implementation will follow.',
    ],
    pdf: {
      fileName: 'BORDERLESS-IDENTITY.pdf',
      driveId: '1ETxbAR7mN_rK2Xhq5qiS7gTpZp1Gszap',
    },
    image: practiceImages.ai,
  },
  {
    slug: 'bank-downgrades-and-minimum-capital-reforms',
    title:
      'Bank Downgrades and Minimum Capital Reforms: How Higher Capital Thresholds Are Reshaping Uganda’s Banking Sector',
    series: 'Diamond Brief Series · Vol.1 Issue 3',
    authors: ['Idembe David Baluku'],
    description: [
      'In this week’s Diamond Brief, Idembe David Baluku explains that Uganda’s revised minimum capital requirements are actively reshaping the structure of the banking market.',
      'The recent transition of Finance Trust Bank from Tier I to Tier II is part of a broader shift driven by higher capital thresholds, strengthened buffers, and evolving global regulatory standards.',
      'What does this mean? Capital is increasingly becoming the price of remaining in the top tier of Uganda’s banking market.',
    ],
    pdf: {
      fileName: 'BANK-DOWNGRADES-IN-UGANDA-3.pdf',
      driveId: '17sW1P-4sbwUIfrA5oytKM42Siq7teqHb',
    },
    image: practiceImages.tax,
  },
  {
    slug: 'abuse-of-dominance-in-digital-markets',
    title:
      'The New Forms of Abuse of Dominance in Digital Markets: Why platform power is being re-examined',
    series: 'Diamond Brief Series',
    authors: ['Priscilla Nayiga', 'Galandi Tony Kiire'],
    description: [
      'This week, Priscilla Nayiga and Galandi Tony Kiire discuss the emerging forms of abuse of dominance in digital markets. As digital markets continue to evolve, the central compliance challenge is uncertainty. Conduct that appears lawful today may become high-risk tomorrow.',
      'The authors make an important observation: whereas Uganda’s competition enforcement in digital markets is still developing, it will not start from zero. Regulators will borrow heavily from international precedent.',
    ],
    pdf: {
      fileName: 'EMERGING-FORMS-OF-ABUSE-OF-DOMINANCE-IN-DIGITAL-MARKETS.pdf',
      driveId: '1PMDjzQ4mQTx79MroIdbspspYk-jqMym9',
    },
    image: practiceImages.tech,
  },
  {
    slug: 'data-privacy-banking-and-innovation-in-uganda',
    title: 'Striking the Balance Between Data Privacy, Banking, and Innovation in Uganda',
    series: 'Diamond Brief Series · Vol.1 Issue 1',
    authors: ['Priscilla Nayiga', 'Galandi Tony Kiire'],
    description: [
      'Our first issue of the Diamond Brief Series features strong insights on the delicate balance between data privacy and financial innovation in the banking sector.',
      'Priscilla Nayiga and Galandi Tony Kiire call for coordinated regulation, modernized legal frameworks, and strengthened compliance practices across the financial sector. They conclude that with targeted reforms and collaborative regulatory oversight, Uganda can build a safer, more inclusive, and innovation-friendly digital financial environment.',
    ],
    pdf: {
      fileName: 'STRIKING-THE-BALANCE-BETWEEN-DATA-PRIVACY-AND-BANKING.pdf',
      driveId: '1BYId4EqilJ4NIxMd-gcUG61PkJMRGIgt',
    },
    image: practiceImages.insurance,
  },
];

export function getBlog(slug: string): Blog | undefined {
  return blogs.find((blog) => blog.slug === slug);
}

/** The briefs that follow `slug` in publication order, wrapping at the end. */
export function getRelatedBlogs(slug: string, count = 3): Blog[] {
  const index = blogs.findIndex((blog) => blog.slug === slug);
  if (index < 0) return blogs.slice(0, count);
  return Array.from({ length: Math.min(count, blogs.length - 1) }, (_, offset) => {
    return blogs[(index + offset + 1) % blogs.length];
  });
}
