import type { MetadataRoute } from 'next';

import { publishedInsights } from '@/lib/insights';
import { practices } from '@/lib/practices';
import { site } from '@/lib/site';
import { team } from '@/lib/team';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/practice-areas',
    '/team',
    '/insights',
    '/contact',
    ...practices.map((practice) => `/practice/${practice.slug}`),
    ...team.map((person) => `/team/${person.slug}`),
    ...publishedInsights.map((insight) => `/insights/${insight.slug}`),
  ];

  return routes.map((route) => ({
    url: new URL(route, site.url).toString(),
    lastModified: new Date(),
  }));
}
