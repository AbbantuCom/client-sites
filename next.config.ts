import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    // Preserve inbound links to the original static pages.
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/practice-areas.html', destination: '/practice-areas', permanent: true },
      { source: '/team.html', destination: '/team', permanent: true },
      { source: '/insights.html', destination: '/insights', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/article.html', destination: '/insights/e-discovery-in-litigation', permanent: true },
      {
        source: '/practice-detail.html',
        has: [{ type: 'query', key: 'practice', value: '(?<practice>.*)' }],
        destination: '/practice/:practice',
        permanent: true,
      },
      { source: '/practice-detail.html', destination: '/practice-areas', permanent: true },
      {
        source: '/team-profile.html',
        has: [{ type: 'query', key: 'person', value: '(?<person>.*)' }],
        destination: '/team/:person',
        permanent: true,
      },
      { source: '/team-profile.html', destination: '/team', permanent: true },
    ];
  },
};

export default nextConfig;
