import { useEffect, useRef } from 'react';
import { gsap } from '../effects/smoothScroll.js';
import { prefersReducedMotion } from '../lib/device.js';

const HOVER = 'a, button, summary, [data-cursor], .aud-card, .store';

/* Gold dot + trailing ring. Grows over anything clickable and shows a label from data-cursor.
   Mouse and trackpad only; touch devices keep their normal behaviour. */
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches || prefersReducedMotion()) return;
    document.documentElement.classList.add('has-cursor');
    const d = dot.current, r = ring.current;
    const dx = gsap.quickTo(d, 'x', { duration: 0.08 }), dy = gsap.quickTo(d, 'y', { duration: 0.08 });
    const rx = gsap.quickTo(r, 'x', { duration: 0.45, ease: 'power3' }), ry = gsap.quickTo(r, 'y', { duration: 0.45, ease: 'power3' });

    const move = (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); };
    const over = (e) => {
      const t = e.target.closest?.(HOVER);
      const text = t?.closest('[data-cursor]')?.dataset.cursor || '';
      r.classList.toggle('is-hover', !!t);
      r.classList.toggle('has-label', !!text);
      label.current.textContent = text;
    };
    const down = () => r.classList.add('is-down');
    const up = () => r.classList.remove('is-down');
    const leave = () => { d.style.opacity = r.style.opacity = 0; };
    const enter = () => { d.style.opacity = r.style.opacity = 1; };

    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerover', over);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.addEventListener('mouseleave', leave);
    document.addEventListener('mouseenter', enter);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('mouseleave', leave);
      document.removeEventListener('mouseenter', enter);
    };
  }, []);

  return (
    <>
      <div className="cursor-dot" ref={dot} aria-hidden="true" />
      <div className="cursor-ring" ref={ring} aria-hidden="true"><span ref={label} /></div>
    </>
  );
}
