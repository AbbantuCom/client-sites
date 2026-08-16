import type { MetadataRoute } from 'next';

import { blogs } from '@/lib/blogs';
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
    '/blogs',
    '/contact',
    '/cookie-policy',
    '/privacy-policy',
    ...practices.map((practice) => `/practice/${practice.slug}`),
    ...team.map((person) => `/team/${person.slug}`),
    ...publishedInsights.map((insight) => `/insights/${insight.slug}`),
    ...blogs.map((blog) => `/blogs/${blog.slug}`),
  ];

  return routes.map((route) => ({
    url: new URL(route, site.url).toString(),
    lastModified: new Date(),
  }));
}
