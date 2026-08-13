import { useRef, useState } from 'react';

/**
 * ============================================================================
 * TODO — CONNECT THIS FORM BEFORE LAUNCH
 * ============================================================================
 * This form is NOT wired to a backend yet. It validates input and then tells
 * the user plainly that it cannot send, pointing them at email/WhatsApp so the
 * enquiry is not lost.
 *
 * The previous version faked success: it overwrote the button text with
 * "Sent ✓" while sending nothing anywhere, so every enquiry was silently
 * dropped and the sender believed it had gone through.
 *
 * To activate, replace the marked block in handleSubmit() with a real call,
 * e.g. Web3Forms:
 *
 *   const res = await fetch('https://api.web3forms.com/submit', {
 *     method: 'POST',
 *     headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
 *     body: JSON.stringify({
 *       access_key: import.meta.env.VITE_WEB3FORMS_KEY,
 *       name: values.name,
 *       email: values.email,
 *       phone: values.phone,
 *       company: values.company,
 *       budget: values.budget,
 *       message: values.message,
 *     }),
 *   });
 *   setStatus(res.ok ? 'success' : 'error');
 *
 * Keep the access key in .env as VITE_WEB3FORMS_KEY (and .env in .gitignore).
 * Note that any key shipped to the browser is public by nature — use a
 * provider-side domain allowlist so it cannot be reused elsewhere.
 * ============================================================================
 */

const LIMITS = {
  name: 80,
  email: 254,
  phone: 20,
  company: 100,
  message: 2000,
};

// Deliberately permissive: overly strict email regexes reject valid addresses.
// The real check is whether a reply actually arrives.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_PATTERN = /^[+\d][\d\s\-()]{6,19}$/;

const BUDGET_OPTIONS = ['Under ₹50k', '₹50k – ₹2L', '₹2L – ₹5L', '₹5L+'];

/** Declared at module scope so it is not a new component type on every render. */
function FieldError({ name, message }) {
  if (!message) return null;
  return (
    <span className="field-error" id={`${name}-error`}>
      {message}
    </span>
  );
}

function validate(values) {
  const errors = {};

  const name = values.name.trim();
  if (!name) errors.name = 'Please enter your name.';
  else if (name.length < 2) errors.name = 'Please enter at least 2 characters.';
  else if (name.length > LIMITS.name) errors.name = `Please keep this under ${LIMITS.name} characters.`;

  const email = values.email.trim();
  if (!email) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(email)) errors.email = 'Please enter a valid email address.';
  else if (email.length > LIMITS.email) errors.email = 'That email address is too long.';

  const phone = values.phone.trim();
  if (phone && !PHONE_PATTERN.test(phone)) {
    errors.phone = 'Please enter a valid phone number, or leave this blank.';
  }

  if (values.company.trim().length > LIMITS.company) {
    errors.company = `Please keep this under ${LIMITS.company} characters.`;
  }

  const message = values.message.trim();
  if (!message) errors.message = 'Please tell us a little about the project.';
  else if (message.length < 10) errors.message = 'Please add a bit more detail (at least 10 characters).';
  else if (message.length > LIMITS.message) errors.message = `Please keep this under ${LIMITS.message} characters.`;

  return errors;
}

export default function ContactForm() {
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | unconfigured
  const formRef = useRef(null);
  const statusRef = useRef(null);

  const handleSubmit = event => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);

    // Honeypot: hidden from real users, commonly auto-filled by bots.
    // Pretend success so the bot does not learn it was detected.
    if (data.get('website')) {
      setStatus('unconfigured');
      return;
    }

    const values = {
      name: String(data.get('name') ?? ''),
      email: String(data.get('email') ?? ''),
      phone: String(data.get('phone') ?? ''),
      company: String(data.get('company') ?? ''),
      budget: String(data.get('budget') ?? ''),
      message: String(data.get('message') ?? ''),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      // Send focus to the first invalid field so keyboard and screen reader
      // users are not left guessing what failed.
      const firstInvalid = formRef.current?.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }

    // ---------------------------------------------------------------------
    // TODO: replace this with the real submission call (see header comment).
    // Until then we must not imply the message was delivered.
    // ---------------------------------------------------------------------
    setStatus('unconfigured');
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const fieldProps = name => ({
    id: name,
    name,
    maxLength: LIMITS[name],
    'aria-invalid': errors[name] ? 'true' : undefined,
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    onChange: () => {
      // Clear a field's error as soon as the user starts correcting it.
      if (errors[name]) setErrors(prev => ({ ...prev, [name]: undefined }));
    },
  });

  return (
    <form className="contact-form reveal" onSubmit={handleSubmit} ref={formRef} noValidate>
      <div className="form-field">
        <label htmlFor="name">Name</label>
        <input type="text" placeholder="Your name" autoComplete="name" {...fieldProps('name')} />
        <FieldError name="name" message={errors.name} />
      </div>

      <div className="form-field">
        <label htmlFor="email">Email</label>
        <input type="email" placeholder="you@company.com" autoComplete="email" {...fieldProps('email')} />
        <FieldError name="email" message={errors.email} />
      </div>

      <div className="form-field">
        <label htmlFor="phone">Phone <span className="optional">(optional)</span></label>
        <input type="tel" placeholder="+91" autoComplete="tel" {...fieldProps('phone')} />
        <FieldError name="phone" message={errors.phone} />
      </div>

      <div className="form-field">
        <label htmlFor="company">Company <span className="optional">(optional)</span></label>
        <input type="text" placeholder="Company name" autoComplete="organization" {...fieldProps('company')} />
        <FieldError name="company" message={errors.company} />
      </div>

      <div className="form-field full">
        <label htmlFor="budget">Project budget</label>
        <select id="budget" name="budget" defaultValue={BUDGET_OPTIONS[0]}>
          {BUDGET_OPTIONS.map(option => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="form-field full">
        <label htmlFor="message">Message</label>
        <textarea placeholder="What are you building?" rows={5} {...fieldProps('message')} />
        <FieldError name="message" message={errors.message} />
      </div>

      {/* Honeypot. Hidden visually and from assistive tech; only bots fill it. */}
      <div className="hp-field" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <button className="submit-btn" type="submit">Send message</button>

      {/* role=status announces the outcome without stealing focus abruptly. */}
      <div
        className="form-status"
        role="status"
        aria-live="polite"
        tabIndex={-1}
        ref={statusRef}
      >
        {status === 'unconfigured' && (
          <div className="form-notice">
            <strong>This form isn't connected yet.</strong>
            <p>
              Your details have not been sent. Please reach us directly at{' '}
              <a href="mailto:info@techyantra.org">info@techyantra.org</a> or on{' '}
              <a href="https://wa.me/918607492753" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>{' '}
              and we'll reply within one business day.
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
