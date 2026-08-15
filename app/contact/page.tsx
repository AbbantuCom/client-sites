import type { Metadata } from 'next';
import Link from 'next/link';

import { AppointmentForm } from '@/components/appointment-form';
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
          <div className="map-placeholder">
            <div>
              <p className="eyebrow">Map placeholder</p>
              <p>Verified map embed for Lourdel Towers required here.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
