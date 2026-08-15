'use client';

import { useRef, useState, type FormEvent } from 'react';

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

/**
 * Prototype appointment form: it validates in the browser and never transmits.
 * Wire a server action or form endpoint here during backend integration.
 */
export function AppointmentForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [invalid, setInvalid] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nextInvalid: Record<string, boolean> = {};

    fields.forEach((field) => {
      const control = form.elements.namedItem(field.name) as
        | HTMLInputElement
        | HTMLTextAreaElement
        | null;
      if (!control) return;
      nextInvalid[field.name] = !(control.checkValidity() && control.value.trim() !== '');
    });

    setInvalid(nextInvalid);
    const firstInvalid = fields.find((field) => nextInvalid[field.name]);
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid.name) as HTMLElement | null)?.focus();
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    form.reset();
  };

  const clearError = (name: FieldName) =>
    setInvalid((current) => (current[name] ? { ...current, [name]: false } : current));

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
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
            This prototype does not transmit your information. A privacy notice and secure endpoint
            must be connected before launch.
          </p>
          <button className="btn btn--navy" type="submit">
            Submit request <span>↗</span>
          </button>
          <div className={`form-success${submitted ? ' show' : ''}`} role="status">
            Thank you. Your appointment request has passed the prototype validation. No information
            was transmitted.
          </div>
        </div>
      </div>
    </form>
  );
}
