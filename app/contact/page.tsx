import type { Metadata } from 'next';
import Link from 'next/link';

import { AppointmentForm } from '@/components/appointment-form';
import { ConsentGate } from '@/components/consent-gate';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact & Appointment',
  description: 'Contact Diamond Advocates or book an appointment.',
};

export default function ContactPage() {
  return (
    <>
      <section className="inner-hero">
        <div className="container">
          <nav className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Contact</span>
          </nav>
          <p className="eyebrow">Start a conversation</p>
          <h1>Book an Appointment</h1>
        </div>
      </section>

      <section className="section">
        <div className="container form-layout">
          <div data-reveal>
            <p className="eyebrow">Contact information</p>
            <h2>How can we help?</h2>
            <p className="lead">
              Email us for legal service or send appointment details using the form.
            </p>
            <ul className="contact-list">
              <li>
                <small>Telephone</small>
                <a href={site.phoneHref}>{site.phone}</a>
              </li>
              <li>
                <small>Email</small>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <small>Office</small>
                {site.address.full}
              </li>
              <li>
                <small>Business hours</small>
                Original Diamond Advocates business hours required here.
              </li>
            </ul>
          </div>
          <div data-reveal>
            <AppointmentForm />
          </div>
        </div>
        <div className="container">
          <ConsentGate
            label="the office map"
            provider="Google Maps"
            fallback={{
              href: 'https://www.google.com/maps/place/Lourdel+Towers,+Lourdel+Rd,+Kampala',
              label: 'Open in Google Maps',
            }}
          >
            <div className="map-embed">
              <iframe
                title={`${site.name} office at Lourdel Towers on Google Maps`}
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.751607501047!2d32.5768209!3d0.33133429999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x177dbb73562d7a5b%3A0x36e3ce70d42d48fd!2sLourdel%20Towers%2C%20Lourdel%20Rd%2C%20Kampala!5e0!3m2!1sen!2sug!4v1786897151224!5m2!1sen!2sug"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </ConsentGate>
        </div>
      </section>
    </>
  );
}
