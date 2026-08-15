'use client';

import { useState, type FormEvent } from 'react';

import { site } from '@/lib/site';

type FieldName = 'name' | 'email' | 'phone' | 'details';

const fields: {
  name: FieldName;
  label: string;
  error: string;
  type?: string;
  autoComplete?: string;
  multiline?: boolean;
  full?: boolean;
}[] = [
  { name: 'name', label: 'Name', error: 'Please enter your name.', autoComplete: 'name' },
  {
    name: 'email',
    label: 'Email Address',
    error: 'Please enter a valid email address.',
    type: 'email',
    autoComplete: 'email',
  },
  {
    name: 'phone',
    label: 'Phone Number',
    error: 'Please enter your phone number.',
    type: 'tel',
    autoComplete: 'tel',
    full: true,
  },
  {
    name: 'details',
    label: 'Details',
    error: 'Please tell us how we can assist.',
    multiline: true,
    full: true,
  },
];

type Enquiry = Record<FieldName, string>;

/** Builds the `mailto:` link that carries the enquiry to the firm's inbox. */
export function buildMailtoHref(enquiry: Enquiry) {
  const subject = `Appointment request from ${enquiry.name}`;
  const body = [
    `Name: ${enquiry.name}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone}`,
    '',
    'Details:',
    // Mail clients are happiest with CRLF throughout the body.
    enquiry.details.replace(/\r?\n/g, '\r\n'),
    '',
    `Sent from the appointment form at ${new URL(site.url).host}`,
  ].join('\r\n');

  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Appointment form: it validates in the browser, then hands the enquiry to the
 * visitor's email application addressed to the firm. Nothing is posted to a server,
 * so no enquiry data leaves the visitor's device until they press send themselves.
 */
export function AppointmentForm() {
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nextInvalid: Record<string, boolean> = {};
    const values = {} as Enquiry;

    fields.forEach((field) => {
      const control = form.elements.namedItem(field.name) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;
      if (!control) return;
      values[field.name] = control.value.trim();
      nextInvalid[field.name] = !(control.checkValidity() && control.value.trim() !== '');
    });

    setInvalid(nextInvalid);
    const firstInvalid = fields.find((field) => nextInvalid[field.name]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid.name) as HTMLElement | null)?.focus();
      setMailtoHref(null);
      return;
    }

    // The fields stay filled so the fallback link still works if no mail client opens.
    const href = buildMailtoHref(values);
    setMailtoHref(href);
    window.location.href = href;
  };

  const clearError = (name: FieldName) =>
    setInvalid((current) => (current[name] ? { ...current, [name]: false } : current));

  return (
    <form onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        {fields.map((field) => (
          <div
            key={field.name}
            className={`field${field.full ? ' full' : ''}${invalid[field.name] ? ' invalid' : ''}`}
          >
            <label htmlFor={field.name}>
              {field.label} <span aria-hidden="true">*</span>
            </label>
            {field.multiline ? (
              <textarea
                id={field.name}
                name={field.name}
                required
                aria-invalid={invalid[field.name] ? 'true' : undefined}
                aria-describedby={invalid[field.name] ? `${field.name}-error` : undefined}
                onInput={() => clearError(field.name)}
              />
            ) : (
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                autoComplete={field.autoComplete}
                required
                aria-invalid={invalid[field.name] ? 'true' : undefined}
                aria-describedby={invalid[field.name] ? `${field.name}-error` : undefined}
                onInput={() => clearError(field.name)}
              />
            )}
            <span className="error" id={`${field.name}-error`}>
              {field.error}
            </span>
          </div>
        ))}
        <div className="field full">
          <p className="form-note">
            Submitting opens your email application with this request addressed to {site.email}.
            Your details are not sent anywhere until you press send there.
          </p>
          <button className="btn btn--navy" type="submit">
            Submit request <span>↗</span>
          </button>
          <div className={`form-success${mailtoHref ? ' show' : ''}`} role="status">
            Thank you. Your email application should now be open with your request addressed to{' '}
            {site.email} — press send there to reach us. If nothing opened,{' '}
            <a href={mailtoHref ?? `mailto:${site.email}`}>open the message manually</a>.
          </div>
        </div>
      </div>
    </form>
  );
}
