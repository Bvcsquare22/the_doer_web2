import { useEffect, useRef, useState } from 'react';
import { FORMSPREE, EMAIL } from '../config.js';
import { Close, Check } from './Icons.jsx';
import { pauseScroll, resumeScroll } from '../effects/smoothScroll.js';

/* Partnership inquiry modal, posts to the same Formspree endpoint the old site used.
   Open it from anywhere with a button carrying data-open-form. */
export default function PartnerForm({ kind }) {
  const isOrg = kind === 'organization';
  const [open, setOpen] = useState(false);
  const [state, setState] = useState('idle'); // idle | sending | sent | error
  const [bad, setBad] = useState({});
  const formRef = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    const onClick = (e) => {
      const t = e.target.closest('[data-open-form]');
      if (!t) return;
      e.preventDefault();
      lastFocus.current = t;
      setOpen(true);
    };
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('click', onClick); document.removeEventListener('keydown', onKey); };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) { pauseScroll(); setTimeout(() => formRef.current?.querySelector('input')?.focus(), 200); }
    else { resumeScroll(); lastFocus.current?.focus?.(); }
  }, [open]);

  const submit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(formRef.current));
    const b = {};
    ['org', 'name', 'phone', 'size'].forEach((k) => { if (!String(data[k] || '').trim()) b[k] = true; });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email || '')) b.email = true;
    setBad(b);
    if (Object.keys(b).length) return;
    setState('sending');
    try {
      const r = await fetch(FORMSPREE, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          _subject: isOrg ? 'Organization Partnership Inquiry, Doer' : 'Brand Sponsorship Inquiry, Doer',
          _replyto: data.email,
          [isOrg ? 'organization' : 'brand']: data.org,
          name: data.name,
          email: data.email,
          phone: data.phone,
          [isOrg ? 'organizationSize' : 'challengeType']: data.size,
          message: data.message || 'No additional message provided.',
        }),
      });
      if (!r.ok) throw new Error(String(r.status));
      setState('sent');
    } catch {
      setState('error');
    }
  };

  const field = (k, label, props, err = 'Required') => (
    <div className={`field ${bad[k] ? 'bad' : ''}`}>
      <label htmlFor={`f-${k}`}>{label}</label>
      <input id={`f-${k}`} name={k} {...props} />
      <span className="err">{err}</span>
    </div>
  );

  return (
    <div className={`modal ${open ? 'open' : ''}`} aria-hidden={!open} role="dialog" aria-modal="true" aria-labelledby="form-title"
      onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
      <div className={`modal-card ${state === 'sent' ? 'sent' : ''}`}>
        <button className="modal-close" aria-label="Close" onClick={() => setOpen(false)}><Close /></button>
        <div className="form-intro">
          <span className="eyebrow">{isOrg ? 'Organization partnerships' : 'Brand partnerships'}</span>
          <h3 className="h3" id="form-title" style={{ marginTop: 10 }}>{isOrg ? 'Book fifteen minutes' : 'Sponsor a challenge'}</h3>
          <p className="body" style={{ marginTop: 8 }}>
            {isOrg
              ? 'Tell us about your organization. We reply within 48 hours with what a first month would look like for you.'
              : 'Tell us about your brand and campaign. We reply within 48 hours with a challenge built around your goal.'}
          </p>
        </div>
        <form className="form" ref={formRef} onSubmit={submit} noValidate>
          <div className="two">
            {field('org', isOrg ? 'Organization name' : 'Brand name', { type: 'text', autoComplete: 'organization' })}
            {field('name', 'Your name', { type: 'text', autoComplete: 'name' })}
          </div>
          <div className="two">
            {field('email', 'Work email', { type: 'email', autoComplete: 'email' }, 'Enter a valid email')}
            {field('phone', 'Phone or WhatsApp', { type: 'tel', autoComplete: 'tel' })}
          </div>
          <div className={`field ${bad.size ? 'bad' : ''}`}>
            <label htmlFor="f-size">{isOrg ? 'Number of staff' : 'Challenge format'}</label>
            <select id="f-size" name="size" defaultValue="">
              <option value="" disabled>{isOrg ? 'Select organization size' : 'Select a format'}</option>
              {(isOrg
                ? ['1 to 50 people', '51 to 200 people', '201 to 1,000 people', '1,000+ people', 'Not sure yet']
                : ['7 Day Challenge', '14 Day Challenge', '30 Day Challenge', 'Team Battle Sponsorship', 'Sponsor a company battle', 'Not sure yet']
              ).map((o) => <option key={o}>{o}</option>)}
            </select>
            <span className="err">Please choose one</span>
          </div>
          <div className="field">
            <label htmlFor="f-message">{isOrg ? 'Branches, departments, anything we should know' : 'Your campaign goal'}</label>
            <textarea id="f-message" name="message" />
          </div>
          <button type="submit" className="btn btn-ink" disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending...' : state === 'error' ? 'Something went wrong. Try again.' : 'Send inquiry'}
          </button>
          <p className="body" style={{ fontSize: 13 }}>Or email <a href={`mailto:${EMAIL.partnerships}`}>{EMAIL.partnerships}</a></p>
        </form>
        <div className="form-success">
          <div className="ok"><Check /></div>
          <h3 className="h3">Inquiry received.</h3>
          <p className="body" style={{ marginTop: 10 }}>We will be in touch within 48 hours at the email you gave us.</p>
        </div>
      </div>
    </div>
  );
}
