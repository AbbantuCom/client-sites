export const site = {
  name: 'Diamond Advocates',
  tagline: 'Guided by global vision and grounded in strong legal foundations.',
  description:
    'Diamond Advocates is a sought after Ugandan law firm offering comprehensive legal services across a broad spectrum of practice areas.',
  url: 'https://diamondadvocates.com',
  phone: '0414 671 838',
  phoneHref: 'tel:+256414671838',
  email: 'info@diamondadvocates.com',
  address: {
    street: 'Plot 1 Lourdel Road, 5th Floor Lourdel Towers, Nakasero',
    locality: 'Kampala City',
    country: 'UG',
    full: 'Plot 1 Lourdel Road, 5th Floor Lourdel Towers, Nakasero, Kampala City',
  },
  logo: '/images/logo-diamond-advocates.png',
  partnerLogo: '/images/wone-global-partner.png',
} as const;

export const primaryNav = [
  { label: 'Home', href: '/' },
  { label: 'Our Team', href: '/team' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
] as const;
