import type { ImageAsset } from './images';

export type PracticeCategory = 'digital' | 'business' | 'property' | 'projects';

export type PracticeLead = {
  name: string;
  role: string;
  slug: string;
  image: string;
};

export type Practice = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  category: string;
  filter: PracticeCategory;
  image: ImageAsset;
  intro: string;
  /** Short copy used on the home page practice list. */
  summary: string;
  /** Title shown on the practice atlas card. */
  cardTitle: string;
  /** Short copy shown on the practice atlas card. */
  cardSummary: string;
  approach: string;
  services: string[];
  team?: PracticeLead;
  featured?: boolean;
};

const technologyLead: PracticeLead = {
  name: 'Galandi Tony Kiire',
  role: 'Head, Technology Law Practice',
  slug: 'galandi',
  image: '/images/team/galandi.png',
};

export const practices: Practice[] = [
  {
    slug: 'tech',
    number: '01',
    title: 'Technology Law',
    shortTitle: 'Tech Law',
    category: 'Digital frontier',
    filter: 'digital',
    featured: true,
    image: {
      src: '/images/practices/tech-law.png',
      width: 2014,
      height: 1063,
      alt: 'Technology keyboard illuminated in red and blue',
    },
    intro:
      'Experienced legal advisers for the technologies, businesses and policy questions shaping what comes next.',
    summary:
      'We blend deep technological knowledge with market-leading legal insight to support every aspect of starting, growing and evolving businesses',
    cardTitle: 'Technology Law',
    cardSummary:
      'Helping progressive businesses navigate the laws, policy and regulation shaping technology.',
    approach:
      'Our award-winning Technology Law Practice team deploys experienced advisers spanning key digital fields to help businesses and organisations navigate the laws and regulations governing the most progressive technologies. We engage with industry groups and policymakers on key issues and maintain strong relationships with regulators and governments globally, helping businesses anticipate and influence evolving public policy and navigate the demanding issues where law and politics meet.',
    services: [
      'Product development and operations',
      'Commercial partnerships',
      'International expansion',
      'Regulatory compliance',
      'Investigations and enforcement',
      'Technology investments and M&A',
      'Capital raising and finance structures',
      'Arbitration and class actions',
    ],
    team: technologyLead,
  },
  {
    slug: 'ai',
    number: '02',
    title: 'AI Law',
    shortTitle: 'AI Law',
    category: 'Emerging intelligence',
    filter: 'digital',
    featured: true,
    image: {
      src: '/images/practices/ai-law.png',
      width: 1920,
      height: 1080,
      alt: 'Artificial intelligence processor on a circuit board',
    },
    intro:
      'Guiding organisations through the legal, regulatory and ethical questions created by artificial intelligence.',
    summary:
      'We help entities navigate the fast-evolving legal and regulatory frameworks governing Artificial Intelligence.',
    cardTitle: 'AI Law',
    cardSummary:
      'Legal, regulatory and ethical guidance where artificial intelligence meets society.',
    approach:
      'Our AI Law Practice brings together experienced advisers at the intersection of law, data and emerging technologies to help organisations navigate the fast-evolving legal and regulatory frameworks governing Artificial Intelligence. We are deeply engaged with global policymakers, regulators and industry leaders, ensuring clients anticipate regulatory shifts, influence the public policy agenda and stay ahead of the legal and ethical challenges where AI, law and society converge.',
    services: [
      'AI governance and regulatory compliance',
      'Data protection and privacy',
      'AI development, licensing and transactions',
      'Intellectual property and ownership',
      'Risk, bias and liability management',
      'M&A, investments and financing',
      'AI disputes, arbitration and litigation',
      'Policy and government engagement',
      'Sector-specific industry guidance',
      'Ethics, fairness and human rights',
    ],
    team: technologyLead,
  },
  {
    slug: 'tax',
    number: '03',
    title: 'Tax Law',
    shortTitle: 'Tax Law',
    category: 'Business and finance',
    filter: 'business',
    image: {
      src: '/images/practices/tax-law.png',
      width: 1024,
      height: 576,
      alt: 'Tax forms, calculator and laptop',
    },
    intro:
      'National and international tax guidance delivered with precision, foresight and commercial awareness.',
    summary:
      'We guide our clients through the complexities of national and international tax regimes with precision and foresight.',
    cardTitle: 'Tax Law',
    cardSummary:
      'National and international tax guidance with precision and foresight.',
    approach:
      'Our Tax Law practice guides corporations, SMEs, investors and individuals through complex national and international tax regimes. We advise across corporate tax planning, VAT, customs and excise, transfer pricing and cross-border structuring. Our lawyers represent clients before tax authorities in audits, investigations and disputes, combining robust advocacy with practical solutions designed to resolve matters efficiently.',
    services: [
      'Corporate tax planning and advisory',
      'VAT, customs and excise',
      'Transfer pricing compliance and documentation',
      'Cross-border and international tax structuring',
      'Tax compliance reviews',
      'Audits, investigations and tax disputes',
      'Tax efficiency and risk management',
      'M&A and restructuring tax advice',
    ],
  },
  {
    slug: 'real-estate',
    number: '04',
    title: 'Real Estate Law',
    shortTitle: 'Real Estate',
    category: 'Property and development',
    filter: 'property',
    image: {
      src: '/images/practices/real-estate-law.png',
      width: 1024,
      height: 540,
      alt: 'Aerial view of developed property and surrounding landscape',
    },
    intro:
      'End-to-end legal support for property acquisition, development, investment and management.',
    summary:
      'Our Real Estate Law practice offers end-to-end legal services for all matters relating to property, land, and real estate development.',
    cardTitle: 'Real Estate',
    cardSummary:
      'End-to-end support for property acquisition, development and investment.',
    approach:
      'Our Real Estate Law practice guides developers, investors and individuals on land development, construction agreements, property financing, mortgage documentation and compliance with zoning, planning and environmental regulations. By combining technical legal expertise with practical commercial insight, we help clients navigate complex transactions, mitigate risk and maximise the value of their real estate investments.',
    services: [
      'Property acquisitions and sales',
      'Leases and land transfers',
      'Due diligence and statutory compliance',
      'Property and mortgage financing',
      'Development and construction agreements',
      'Zoning, planning and environmental matters',
      'Property joint ventures',
      'Landlord, boundary and easement disputes',
    ],
  },
  {
    slug: 'disputes',
    number: '05',
    title: 'Dispute Resolution',
    shortTitle: 'Disputes',
    category: 'Advocacy and resolution',
    filter: 'business',
    image: {
      src: '/images/practices/disputes-law.png',
      width: 2014,
      height: 1063,
      alt: 'Advocate wearing formal court attire',
    },
    intro: 'Strategic, pragmatic representation in litigation and alternative dispute resolution.',
    summary:
      'Strategic litigation and alternative dispute resolution across complex matters.',
    cardTitle: 'Disputes',
    cardSummary:
      'Strategic litigation and alternative dispute resolution across complex matters.',
    approach:
      'We represent individuals, corporate entities and institutions in complex litigation across all levels of the courts and specialised tribunals. Beyond traditional litigation, our team has extensive experience in commercial arbitration, mediation and conciliation. Every strategy is tailored to the circumstances of the dispute to protect our clients’ interests and pursue efficient, cost-effective and favourable outcomes.',
    services: [
      'Commercial litigation',
      'Property and real estate disputes',
      'Corporate and shareholder disputes',
      'Contract and labour disputes',
      'Corporate tax disputes',
      'Technology and IP disputes',
      'Succession matters',
      'Debt recovery and enforcement',
      'Regulatory and administrative disputes',
      'Energy, infrastructure and construction disputes',
    ],
  },
  {
    slug: 'ip',
    number: '06',
    title: 'Intellectual Property Law',
    shortTitle: 'IP Law',
    category: 'Ideas and innovation',
    filter: 'digital',
    image: {
      src: '/images/practices/ip-law.jpg',
      width: 1024,
      height: 559,
      alt: 'Patents, trademarks, copyrights and trade secrets illustration',
    },
    intro:
      'Protecting innovation, structuring intellectual property and turning ideas into commercial value.',
    summary:
      'Protecting and commercialising the ideas that give businesses an advantage.',
    cardTitle: 'IP Law',
    cardSummary:
      'Protecting and commercialising the ideas that give businesses an advantage.',
    approach:
      'Our team helps clients turn innovation into opportunity by safeguarding revenue, structuring intellectual property and driving commercial value. With technical insight and business acumen, we guide organisations through protecting and leveraging their ideas across industries and jurisdictions. Whether navigating high-stakes disputes or transformative transactions, clients trust us to build strategies that secure lasting advantage.',
    services: [
      'IP strategy and portfolio advisory',
      'Trademark and patent protection',
      'Copyright and creative rights',
      'Trade secret protection',
      'Licensing and commercialisation',
      'Technology transfer arrangements',
      'Cross-border portfolio support',
      'Enforcement and IP disputes',
    ],
  },
  {
    slug: 'employment',
    number: '07',
    title: 'Employment Law',
    shortTitle: 'Employment Law',
    category: 'People and workplace',
    filter: 'business',
    image: {
      src: '/images/practices/employment-law.png',
      width: 2048,
      height: 1152,
      alt: 'Employment contract and pen',
    },
    intro:
      'Practical, commercially viable and sustainable solutions for evolving workplace challenges.',
    summary:
      'Practical workplace solutions built for fairness, productivity and compliance.',
    cardTitle: 'Employment Law',
    cardSummary:
      'Practical workplace solutions built for fairness, productivity and compliance.',
    approach:
      'We take a proactive approach, helping employers anticipate and manage risk before it escalates while ensuring compliance with evolving labour laws and regulations. Our team combines technical legal expertise with an understanding of organisational dynamics, advising on policies, contracts and workplace practices that foster fairness, productivity and inclusion.',
    services: [
      'Employment contracts and HR policies',
      'Staff handbooks and workplace procedures',
      'Confidentiality and non-compete agreements',
      'Immigration and work permits',
      'Employee benefits, leave and pensions',
      'Health and safety compliance',
      'Dismissal, redundancy and discrimination claims',
      'Collective bargaining and trade unions',
      'Restructuring and severance',
      'Employment aspects of M&A',
    ],
  },
  {
    slug: 'insurance',
    number: '08',
    title: 'Insurance Law',
    shortTitle: 'Insurance',
    category: 'Risk and regulation',
    filter: 'business',
    image: {
      src: '/images/practices/insurance-law.png',
      width: 2048,
      height: 1152,
      alt: 'Insurance key on a computer keyboard',
    },
    intro: 'Strategic legal support across insurance, reinsurance, claims, products and regulation.',
    summary:
      'Strategic support across insurance, reinsurance, claims and regulatory matters.',
    cardTitle: 'Insurance',
    cardSummary:
      'Strategic support across insurance, reinsurance, claims and regulatory matters.',
    approach:
      'Our Insurance Law practice supports insurers, reinsurers, brokers and policyholders across the full spectrum of insurance and reinsurance matters. With deep industry knowledge, we combine technical legal analysis with practical commercial insight to help clients manage risk, resolve disputes efficiently and remain compliant as regulatory frameworks evolve.',
    services: [
      'Policy drafting and interpretation',
      'Regulatory compliance and licensing',
      'Claims management',
      'Coverage disputes and subrogation',
      'Insurance product structuring',
      'Risk-transfer arrangements',
      'Life, health and property claims',
      'Casualty and liability claims',
      'Litigation and arbitration',
      'Regulatory investigations and disputes',
    ],
  },
  {
    slug: 'energy',
    number: '09',
    title: 'Energy & Infrastructure Law',
    shortTitle: 'Energy & Infrastructure',
    category: 'Projects and investment',
    filter: 'projects',
    image: {
      src: '/images/practices/energy-law.png',
      width: 1024,
      height: 576,
      alt: 'Large energy and infrastructure facility',
    },
    intro: 'Legal support across the full lifecycle of major energy and infrastructure projects.',
    summary: 'Supporting major projects from structuring and finance through operation.',
    cardTitle: 'Energy & Infrastructure',
    cardSummary:
      'Supporting major projects from structuring and finance through operation.',
    approach:
      'Our Energy & Infrastructure practice advises governments, developers, investors, financiers and operators on the development, financing and regulation of major projects across Africa and beyond. We work across oil and gas, renewable energy, power generation, transport, construction, telecommunications and utilities, supporting complex cross-border projects and stakeholder negotiations.',
    services: [
      'Project structuring, development and finance',
      'Public-private partnerships',
      'Power purchase and concession agreements',
      'Construction contracts',
      'Licensing and regulatory compliance',
      'Environmental approvals',
      'Cross-border projects and joint ventures',
      'Project M&A',
      'Negotiation, arbitration and litigation',
      'Renewable energy and climate finance',
    ],
  },
];

/** Short labels used by the header dropdown and mobile menu, in practice order. */
export const practiceNavLinks = practices.map((practice) => ({
  slug: practice.slug,
  label: practice.slug === 'energy' ? 'Energy Law' : practice.shortTitle,
  href: `/practice/${practice.slug}`,
}));

export function getPractice(slug: string): Practice | undefined {
  return practices.find((practice) => practice.slug === slug);
}

/** The practice that follows `slug` in the atlas order, wrapping at the end. */
export function getNextPractice(slug: string): Practice {
  const index = practices.findIndex((practice) => practice.slug === slug);
  return practices[(index + 1) % practices.length];
}
