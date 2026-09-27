import { useEffect, useRef, useState } from 'react';
import { gsap } from '../effects/smoothScroll.js';
import { prefersReducedMotion } from '../lib/device.js';

const KEY = 'doer-intro-seen';

// The page is "ready" once the intro has played (or was skipped). Other animations wait for it.
export function onReady(cb) {
  if (!document.documentElement.classList.contains('is-loading')) { cb(); return () => {}; }
  window.addEventListener('doer:ready', cb, { once: true });
  return () => window.removeEventListener('doer:ready', cb);
}

function finish() {
  document.documentElement.classList.remove('is-loading');
  window.dispatchEvent(new Event('doer:ready'));
}

function seen() {
  try { return sessionStorage.getItem(KEY) === '1'; } catch { return false; }
}

/* Cinematic intro, once per visit: DOER rises, a gold line counts to 100, the curtain splits open. */
export default function Preloader() {
  const [show] = useState(() => {
    const s = !prefersReducedMotion() && !seen();
    if (s) document.documentElement.classList.add('is-loading');
    return s;
  });
  const root = useRef(null);

  useEffect(() => {
    if (!show) { finish(); return; }
    try { sessionStorage.setItem(KEY, '1'); } catch { /* private mode */ }
    document.documentElement.classList.add('is-loading');
    const el = root.current;
    const count = el.querySelector('.pl-count');
    const n = { v: 0 };
    const fonts = document.fonts ? Promise.race([document.fonts.ready, new Promise((r) => setTimeout(r, 2500))]) : Promise.resolve();

    const intro = gsap.timeline();
    intro.from('.pl-letter', { yPercent: 120, duration: 1, ease: 'expo.out', stagger: 0.07 }, 0)
      .to(n, { v: 100, duration: 1.5, ease: 'power2.inOut', onUpdate: () => { count.textContent = String(Math.round(n.v)).padStart(3, '0'); } }, 0.1)
      .fromTo('.pl-line i', { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: 'power2.inOut' }, 0.1);

    const exit = gsap.timeline({ paused: true });
    exit.to('.pl-letter', { yPercent: -120, duration: 0.7, ease: 'expo.in', stagger: 0.04 })
      .to('.pl-meta', { autoAlpha: 0, duration: 0.3 }, '<')
      .add(finish, '-=0.1')
      .to('.pl-top', { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, '-=0.1')
      .to('.pl-bottom', { yPercent: 100, duration: 1.1, ease: 'expo.inOut' }, '<')
      .set(el, { display: 'none' });

    // Hold the curtain until both the intro and the web fonts are done, so text never flashes.
    let alive = true;
    Promise.all([intro.then(), fonts]).then(() => alive && exit.play());
    return () => { alive = false; intro.kill(); exit.kill(); finish(); };
  }, [show]);

  if (!show) return null;
  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="pl-top" />
      <div className="pl-bottom" />
      <div className="pl-center">
        <div className="pl-word">{'DOER'.split('').map((c, i) => <span key={i} className="pl-mask"><span className="pl-letter">{c}</span></span>)}</div>
        <div className="pl-meta">
          <span>We make walking worth it</span>
          <span className="pl-count">000</span>
        </div>
        <div className="pl-line pl-meta"><i /></div>
      </div>
    </div>
  );
}
