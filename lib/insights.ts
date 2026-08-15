export type InsightCategory = 'diamond-brief' | 'newsletters' | 'press';

export type Insight = {
  slug: string;
  category: InsightCategory;
  /** Meta line shown above the card title. */
  meta: string;
  title: string;
  /** Body copy for placeholder cards that do not link to an article. */
  excerpt?: string;
  /** Only published articles have a body; placeholders do not link anywhere. */
  article?: {
    headline: string;
    metaLine: string;
    datePublished: string;
    standfirst: string;
    intro: string[];
    takeawaysTitle: string;
    takeaways: string[];
    closing: string[];
    note: string;
  };
};

export const insights: Insight[] = [
  {
    slug: 'e-discovery-in-litigation',
    category: 'diamond-brief',
    meta: 'Diamond Brief Series, Vol.1 Issue 5 · 22 April 2026',
    title: 'E-Discovery in Litigation: An Overview of Electronic Evidence and Discovery',
    article: {
      headline:
        'E-DISCOVERY IN LITIGATION: An Overview of Electronic Evidence and Discovery',
      metaLine: 'Diamond Brief Series, Vol.1 Issue 5 · April 22, 2026',
      datePublished: '2026-04-22',
      standfirst:
        'In our latest Diamond Brief, Vera Nakatumba explores E-Discovery in Litigation and what it means for litigants and legal practitioners in Uganda.',
      intro: [
        'As digital communications continue to replace paper records, the legal profession can no longer afford to treat electronic discovery as an afterthought.',
        'In our latest Diamond Brief, Vera Nakatumba explores E-Discovery in Litigation, a practical overview of how electronically stored information (ESI) is identified, preserved, collected, and produced in legal proceedings, and what this means for litigants and legal practitioners in Uganda.',
      ],
      takeawaysTitle: 'Key takeaways from the brief',
      takeaways: [
        'What qualifies as ESI, from emails and spreadsheets to deleted files and cloud storage',
        'The four conditions digital evidence must meet to be admissible in court',
        'Uganda’s legal framework: the Electronic Transactions Act, the Data Protection and Privacy Act, and the Evidence Act',
        'The 7-stage Electronic Discovery Reference Model (EDRM)',
        'How courts balance data protection principles with the evidentiary demands of litigation',
      ],
      closing: [
        'E-Discovery is no longer a concern exclusive to large, multinational disputes. As Ugandan courts and businesses become increasingly digital, understanding the rules around electronic evidence is essential for anyone involved in litigation.',
      ],
      note: 'The downloadable original Diamond Brief document and any remaining article content must be supplied from the original website.',
    },
  },
  {
    slug: 'newsletter-archive',
    category: 'newsletters',
    meta: 'Original content required',
    title: 'Newsletter archive',
    excerpt: 'Original Diamond Advocates article title, date and image required here.',
  },
  {
    slug: 'in-the-press',
    category: 'press',
    meta: 'Original content required',
    title: 'Diamond Advocates in the Press',
    excerpt: 'Original Diamond Advocates article title, date and image required here.',
  },
];

export const insightFilters = [
  { value: 'all', label: 'All' },
  { value: 'diamond-brief', label: 'Diamond Brief Series' },
  { value: 'newsletters', label: 'Newsletters' },
  { value: 'press', label: 'In the Press' },
] as const;

export const publishedInsights = insights.filter((insight) => insight.article);

export function getInsight(slug: string): Insight | undefined {
  return insights.find((insight) => insight.slug === slug);
}
