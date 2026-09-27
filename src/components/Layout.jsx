import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import LiquidGlass from 'liquid-glass-react';
import { startSmoothScroll, pauseScroll, resumeScroll, ScrollTrigger } from '../effects/smoothScroll.js';
import { prefersReducedMotion, canRun3D } from '../lib/device.js';
import { EMAIL } from '../config.js';
import { Menu, Close } from './Icons.jsx';
import InView from './InView.jsx';
import Preloader from './Preloader.jsx';
import Cursor from './Cursor.jsx';
import { initCinematic } from '../effects/cinematic.js';

const LiquidLogo = lazy(() => import('../effects/LiquidLogo.jsx'));

/* ---------- The frame: a fixed mat around the whole site with live corner readouts ---------- */
function Frame({ sideLeft, sideRight }) {
  const [readout, setReadout] = useState({ i: 1, n: 1, label: 'START' });
  const frameRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      frameRef.current?.style.setProperty('--progress', max > 0 ? (window.scrollY / max).toFixed(4) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const sections = [...document.querySelectorAll('[data-label]')];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setReadout({ i: sections.indexOf(e.target) + 1, n: sections.length, label: e.target.dataset.label });
      }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    setReadout((r) => ({ ...r, n: sections.length }));
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect(); };
  }, []);

  const pad = (x) => String(x).padStart(2, '0');
  return (
    <>
      <div className="frame" ref={frameRef} aria-hidden="true">
        <i className="frame-corner tl" /><i className="frame-corner tr" /><i className="frame-corner bl" /><i className="frame-corner br" />
        <i className="frame-progress" />
      </div>
      <div className="frame-side left" aria-hidden="true">{sideLeft}</div>
      <div className="frame-side right" aria-hidden="true">{sideRight}</div>
      <div className="frame-meta left" aria-hidden="true"><span className="dot" />Live on iOS &amp; Android</div>
      <div className="frame-meta right" aria-hidden="true">
        <span className="idx">{pad(readout.i)}</span>&nbsp;/ {pad(readout.n)}&nbsp;&nbsp;{readout.label}
      </div>
    </>
  );
}

/* ---------- Nav: liquid glass on desktop, frosted on mobile, text color follows the section below ---------- */
const LINKS = {
  home: [
    { href: '#battles', label: 'Battles' },
    { href: '#how', label: 'How it works' },
    { href: '/organizations.html', label: 'For Organizations' },
    { href: '/brands.html', label: 'For Brands' },
  ],
  organizations: [
    { href: '/', label: 'Doer app' },
    { href: '#how', label: 'How it works' },
    { href: '#proof', label: 'Proof' },
    { href: '/brands.html', label: 'For Brands' },
  ],
  brands: [
    { href: '/', label: 'Doer app' },
    { href: '#formats', label: 'Formats' },
    { href: '#data', label: 'What you get' },
    { href: '/organizations.html', label: 'For Organizations' },
  ],
};

function useNavTheme() {
  const [theme, setTheme] = useState('dark');
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const y = 60;
      const secs = document.querySelectorAll('[data-theme]');
      for (const s of secs) {
        const r = s.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) { setTheme(s.dataset.theme); return; }
      }
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    check();
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
  return theme;
}

function useDesktop() {
  const q = '(min-width: 960px)';
  const [d, setD] = useState(() => window.matchMedia(q).matches);
  useEffect(() => {
    const m = window.matchMedia(q);
    const on = () => setD(m.matches);
    m.addEventListener('change', on);
    return () => m.removeEventListener('change', on);
  }, []);
  return d;
}

function NavContent({ page, cta, onMenu, menuOpen }) {
  return (
    <div className="nav-inner">
      <a href="/" className="brand" aria-label="Doer home"><img src="/logo.png" alt="" /><span>DOER</span></a>
      <ul className="nav-links">
        {LINKS[page].map((l) => (
          <li key={l.href}><a href={l.href}>{l.label}</a></li>
        ))}
      </ul>
      <div className="nav-cta">
        {cta}
        <button className="nav-toggle" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={onMenu}>
          {menuOpen ? <Close /> : <Menu />}
        </button>
      </div>
    </div>
  );
}

function Nav({ page, cta }) {
  const theme = useNavTheme();
  const desktop = useDesktop();
  const [open, setOpen] = useState(false);
  const glass = desktop && !prefersReducedMotion();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    open ? pauseScroll() : resumeScroll();
  }, [open]);

  // liquid-glass-react measures itself once; re-measure after web fonts land.
  useEffect(() => {
    document.fonts?.ready.then(() => window.dispatchEvent(new Event('resize')));
  }, []);

  const content = <NavContent page={page} cta={cta} menuOpen={open} onMenu={() => setOpen((o) => !o)} />;

  return (
    <>
      <nav className={`nav nav-${theme} ${glass ? 'is-glass' : 'is-frost'}`} aria-label="Main">
        {glass ? (
          <div className="lg-scope">
            <LiquidGlass
              displacementScale={48}
              blurAmount={0.08}
              saturation={150}
              aberrationIntensity={1.5}
              elasticity={0.04}
              cornerRadius={999}
              padding="0"
              overLight={theme === 'light'}
              style={{ position: 'fixed', top: 'calc(var(--frame) + 42px)', left: '50%', zIndex: 58 }}
            >
              {content}
            </LiquidGlass>
          </div>
        ) : content}
      </nav>
      <div className={`mobile-menu ${open ? 'open' : ''}`} onClick={(e) => e.target.tagName === 'A' && setOpen(false)}>
        {LINKS[page].map((l, i) => (
          <a key={l.href} href={l.href}><small>{String(i + 1).padStart(2, '0')}</small>{l.label}</a>
        ))}
        <div className="mobile-cta">{cta}</div>
      </div>
    </>
  );
}

/* ---------- Footer with the liquid metal Doer mark ---------- */
function Footer() {
  const rich = canRun3D();
  return (
    <footer className="footer" data-theme="dark">
      <div className="footer-grid">
        <div>
          <a href="/" className="brand"><img src="/logo.png" alt="" /><span>DOER</span></a>
          <p>We make walking worth it, for people, organizations and brands. Built in Abuja by De Doers Limited.</p>
        </div>
        <div><h5>Product</h5><ul>
          <li><a href="/#battles">Battles</a></li><li><a href="/#how">How it works</a></li><li><a href="/#faq">FAQ</a></li><li><a href="/#download">Download</a></li>
        </ul></div>
        <div><h5>Company</h5><ul>
          <li><a href="/organizations.html">For Organizations</a></li><li><a href="/brands.html">For Brands</a></li>
          <li><a href={`mailto:${EMAIL.partnerships}`}>Partnerships</a></li><li><a href={`mailto:${EMAIL.hello}`}>Contact</a></li>
        </ul></div>
        <div><h5>Legal &amp; Social</h5><ul>
          <li><a href="/privacy.html">Privacy Policy</a></li><li><a href="/delete-account.html">Delete Account</a></li>
          <li><a href="https://instagram.com/doers.app" target="_blank" rel="noopener">Instagram</a></li>
        </ul></div>
      </div>
      <div className="footer-mark">
        <div className="footer-word" aria-hidden="true">DO</div>
        <div className="footer-logo">
          {rich ? (
            <InView rootMargin="200px">
              <Suspense fallback={<img className="mark-static" src="/brand/doer-mark.png" alt="" />}>
                <LiquidLogo size={260} />
              </Suspense>
            </InView>
          ) : <img className="mark-static" src="/brand/doer-mark.png" alt="" />}
        </div>
        <div className="footer-word" aria-hidden="true">ER</div>
      </div>
      <div className="footer-bottom"><span>© 2026 De Doers Limited. All rights reserved.</span><span>Abuja · Lagos</span></div>
    </footer>
  );
}

/* ---------- Page effects: reveal on scroll, count ups, bar fills ---------- */
function usePageEffects() {
  useEffect(() => {
    document.documentElement.classList.add('js');
    const stop = startSmoothScroll();
    const stopCinematic = initCinematic();
    const reduce = prefersReducedMotion();

    const countUp = (el) => {
      const raw = el.dataset.count;
      const to = parseFloat(raw);
      const dec = (raw.split('.')[1] || '').length;
      const suffix = el.dataset.suffix || '';
      const fmt = (v) => v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + suffix;
      if (reduce) { el.textContent = fmt(to); return; }
      let start;
      const tick = (t) => {
        start ??= t;
        const p = Math.min((t - start) / 1600, 1);
        el.textContent = fmt(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const activate = (el) => {
      el.classList.add('in');
      if (el.dataset.count && !el.dataset.done) { el.dataset.done = 1; countUp(el); }
      if (el.dataset.fill) el.style.width = el.dataset.fill;
      if (el.dataset.h) el.style.height = el.dataset.h;
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { activate(e.target); io.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal, [data-count], [data-fill], [data-h]').forEach((t) => io.observe(t));

    // Fonts change layout; make sure pinned scroll scenes measure the final page.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => { io.disconnect(); stopCinematic(); stop(); };
  }, []);
}

export default function Layout({ page, cta, sideLeft, sideRight, children, modal }) {
  usePageEffects();
  return (
    <>
      <Preloader />
      <Cursor />
      <Frame sideLeft={sideLeft} sideRight={sideRight} />
      <Nav page={page} cta={cta} />
      <main>{children}</main>
      <Footer />
      {modal}
    </>
  );
}
