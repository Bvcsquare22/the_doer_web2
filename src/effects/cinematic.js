import { gsap, ScrollTrigger } from './smoothScroll.js';
import { prefersReducedMotion } from '../lib/device.js';
import { onReady } from '../components/Preloader.jsx';

/* Wrap every word of a heading in a mask so it can rise into view. Keeps nested spans (gold, outline). */
function splitWords(el) {
  if (el.dataset.split) return;
  el.dataset.split = '1';
  const walk = (node) => {
    [...node.childNodes].forEach((n) => {
      if (n.nodeType === 3) {
        const frag = document.createDocumentFragment();
        n.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(part)); return; }
          const outer = document.createElement('span');
          outer.className = 'w';
          const inner = document.createElement('span');
          inner.className = 'wi';
          inner.textContent = part;
          outer.appendChild(inner);
          frag.appendChild(outer);
        });
        n.replaceWith(frag);
      } else if (n.nodeType === 1 && n.tagName !== 'BR' && !n.classList.contains('w')) {
        walk(n);
      }
    });
  };
  walk(el);
}

const fine = () => window.matchMedia('(pointer: fine)').matches;
const desktop = () => window.matchMedia('(min-width: 900px)').matches;

export function initCinematic() {
  if (prefersReducedMotion()) return () => {};
  const cleanups = [];
  const ctx = gsap.context(() => {
    /* 1. Headlines rise word by word as they enter */
    document.querySelectorAll('.section .h2, .section .h1, .section .h-display, .page-hero .h-display').forEach((h) => {
      splitWords(h);
      const words = h.querySelectorAll('.wi');
      gsap.set(words, { yPercent: 115, rotate: 3 });
      const play = () => gsap.to(words, { yPercent: 0, rotate: 0, duration: 1.15, ease: 'expo.out', stagger: 0.045 });
      if (h.closest('.page-hero')) cleanups.push(onReady(() => gsap.delayedCall(0.15, play)));
      else ScrollTrigger.create({ trigger: h, start: 'top 88%', once: true, onEnter: play });
    });

    /* 2. Dark and gold sections open like a lens as they arrive */
    document.querySelectorAll('.section.dark, .section.gold-bg').forEach((s) => {
      gsap.fromTo(s,
        { clipPath: 'inset(7% 5% 0% 5% round 36px)' },
        { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: s, start: 'top bottom', end: 'top 30%', scrub: true } });
    });

    /* 3. Parallax: anything with data-speed drifts against the scroll */
    document.querySelectorAll('[data-speed]').forEach((el) => {
      const sp = parseFloat(el.dataset.speed);
      gsap.fromTo(el, { yPercent: sp * 12 }, { yPercent: -sp * 12, ease: 'none', scrollTrigger: { trigger: el.closest('section') || el, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    /* 4. Marquee speeds up and leans with scroll velocity */
    const track = document.querySelector('.marquee-track');
    if (track) {
      track.style.animation = 'none';
      const loop = gsap.to(track, { xPercent: -50, duration: 30, ease: 'none', repeat: -1 });
      const skew = gsap.quickTo(track, 'skewX', { duration: 0.4 });
      ScrollTrigger.create({
        onUpdate: (self) => {
          const v = self.getVelocity();
          loop.timeScale(gsap.utils.clamp(-6, 6, 1 + v / 350) || 1);
          skew(gsap.utils.clamp(-8, 8, -v / 250));
          gsap.to(loop, { timeScale: Math.sign(loop.timeScale()) || 1, duration: 1.2, overwrite: true, delay: 0.1 });
        },
      });
    }

    /* 5. Pinned horizontal gallery: scroll down, the phones travel sideways */
    document.querySelectorAll('.gallery').forEach((g) => {
      if (!desktop()) return;
      const row = g.querySelector('.screens');
      row.classList.add('is-pinned');
      const distance = () => Math.max(0, row.scrollWidth - g.querySelector('.wrap').clientWidth);
      const tween = gsap.to(row, {
        x: () => -distance(), ease: 'none',
        scrollTrigger: { trigger: g, pin: true, start: 'top top', end: () => `+=${distance() + 200}`, scrub: 0.8, invalidateOnRefresh: true },
      });
      row.querySelectorAll('figure').forEach((f) => {
        gsap.to(f, {
          ease: 'none',
          keyframes: { scale: [0.88, 1, 0.88], rotateY: [-16, 0, 16] },
          scrollTrigger: { trigger: f, containerAnimation: tween, start: 'left right', end: 'right left', scrub: true },
        });
      });
    });
  });

  /* 6. 3D tilt with a moving glare on cards (mouse only) */
  if (fine()) {
    document.querySelectorAll('.aud-card, .stat, .tier, .step, .contact-card, .battle-stage .phone').forEach((el) => {
      el.classList.add('tilt');
      gsap.set(el, { transformPerspective: 900 });
      const rx = gsap.quickTo(el, 'rotateX', { duration: 0.5, ease: 'power3' });
      const ry = gsap.quickTo(el, 'rotateY', { duration: 0.5, ease: 'power3' });
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
        ry((px - 0.5) * 10); rx(-(py - 0.5) * 10);
        el.style.setProperty('--gx', `${px * 100}%`); el.style.setProperty('--gy', `${py * 100}%`);
      };
      const out = () => { rx(0); ry(0); };
      // CSS transitions on transform would fight GSAP; keep only the fade once the pointer arrives.
      el.addEventListener('pointerenter', () => { el.style.transition = 'opacity .9s, border-color .4s'; }, { once: true });
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerleave', out);
      cleanups.push(() => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', out); });
    });

    /* 7. Magnetic buttons */
    document.querySelectorAll('.btn, .store').forEach((b) => {
      const x = gsap.quickTo(b, 'x', { duration: 0.4, ease: 'power3' });
      const y = gsap.quickTo(b, 'y', { duration: 0.4, ease: 'power3' });
      const move = (e) => { const r = b.getBoundingClientRect(); x((e.clientX - r.left - r.width / 2) * 0.28); y((e.clientY - r.top - r.height / 2) * 0.4); };
      const out = () => { gsap.to(b, { x: 0, y: 0, duration: 0.8, ease: 'elastic.out(1, 0.4)' }); };
      b.style.transition = 'background .25s, color .25s, box-shadow .25s';
      b.addEventListener('pointermove', move);
      b.addEventListener('pointerleave', out);
      cleanups.push(() => { b.removeEventListener('pointermove', move); b.removeEventListener('pointerleave', out); });
    });
  }

  requestAnimationFrame(() => ScrollTrigger.refresh());
  return () => { cleanups.forEach((c) => c()); ctx.revert(); };
}
