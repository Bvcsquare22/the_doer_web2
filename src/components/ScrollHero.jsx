import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { prefersReducedMotion } from '../lib/device.js';
import { gsap, ScrollTrigger } from '../effects/smoothScroll.js';
import { canRun3D, isMobile } from '../lib/device.js';
import { SPLINE_SCENE } from '../config.js';
import { world, pulse } from '../effects/worldState.js';
import { onReady } from './Preloader.jsx';
import { ChallengePhone } from './Mockups.jsx';
import { Arrow, ArrowUpRight, Gift, Flame, Shield } from './Icons.jsx';

const ScrollWorld = lazy(() => import('../effects/ScrollWorld.jsx'));
const Spline = lazy(() => import('@splinetool/react-spline'));

const WHO = [
  { n: '01', href: '#download', b: 'Walkers', em: 'earn airtime, food and cashback for steps' },
  { n: '02', href: '/organizations.html', b: 'Organizations', em: 'run monthly step battles for staff' },
  { n: '03', href: '/brands.html', b: 'Brands', em: 'fund the prize, own the moment' },
];

const CHAPTERS = [
  { k: '01 · WALK', h: <>Every step<br /><span className="gold">counted.</span></>, p: 'Your phone already counts your steps. Doer reads them from Apple Health or Health Connect in the background. No smartwatch, no logging, no gym.' },
  { k: '02 · COMPETE', h: <>Every team<br /><span className="gold">ranked.</span></>, p: 'Branch vs branch. Department vs department. Friends vs friends. Scored on average steps per person, so any team can win.' },
  { k: '03 · WIN', h: <>Every win<br /><span className="gold">paid.</span></>, p: 'Airtime. Mobile money. Food vouchers. Cashback. A paid day off. Real rewards from real brands and employers. Never points, never tokens.' },
];

const REWARDS = ['airtime.', 'free food.', 'cashback.', 'vouchers.', 'a day off.'];

/* The reward word in the headline keeps changing: airtime, free food, cashback... */
function RewardWord() {
  const [i, setI] = useState(0);
  const [out, setOut] = useState(false);
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const id = setInterval(() => {
      setOut(true);
      setTimeout(() => { setI((n) => (n + 1) % REWARDS.length); setOut(false); }, 420);
    }, 2400);
    return () => clearInterval(id);
  }, []);
  return <span className={`gold reward-word ${out ? 'out' : ''}`}>{REWARDS[i]}</span>;
}

function Intro({ static: isStatic }) {
  return (
    <div className="hero-copy">
      <span className="hero-tag"><span className="pill">Free</span> On iOS &amp; Android · Live inside a federal agency</span>
      <h1 className="h-display" aria-label="Walk. Earn airtime, free food, cashback, vouchers, a day off.">
        <span className="line"><span>Walk.</span></span>
        <span className="line"><span>Earn</span></span>
        <span className="line"><span><RewardWord /></span></span>
      </h1>
      <p className="lede">Doer is the free app that rewards the steps you already take. Join a challenge, walk with your team, hit the goal, and collect airtime, mobile money, food vouchers or cashback from the brands and employers behind it.</p>
      <div className="hero-actions">
        <a href="#download" className="btn btn-gold">Start walking, it's free <Arrow /></a>
        <a href="/organizations.html" className={`btn btn-ghost ${isStatic ? '' : 'on-dark'}`}>Doer for your staff</a>
      </div>
      <nav className="hero-who" aria-label="Who Doer serves">
        {WHO.map((w) => (
          <a key={w.n} href={w.href}><span className="n">{w.n}</span><span>{w.b} <em>{w.em}</em></span><ArrowUpRight /></a>
        ))}
      </nav>
    </div>
  );
}

/* No WebGL, reduced motion or a weak device: a still hero with the live phone mockup */
function StaticHero() {
  return (
    <header className="hero" data-label="START" data-theme="light">
      <div className="hero-grid">
        <Intro static />
        <div className="stage">
          <span className="stage-label">DOER <b>/</b> LIVE CHALLENGE</span>
          <div className="stage-fallback">
            <i className="orbit o2" /><i className="orbit o1" />
            <ChallengePhone className="center" />
            <div className="float-chip c1"><span className="ic"><Gift /></span><div>Reward unlocked<small>Airtime, straight to your line</small></div></div>
            <div className="float-chip c2"><span className="ic"><Flame /></span><div>17 day streak<small>No gaps. Keep it going.</small></div></div>
            <div className="float-chip c3"><span className="ic"><Shield /></span><div>Steps verified<small>Apple Health &amp; Health Connect</small></div></div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function ScrollHero() {
  const [rich] = useState(() => canRun3D());
  const [lite] = useState(() => isMobile());
  const [active, setActive] = useState(true);
  const section = useRef(null);

  useEffect(() => {
    if (!rich) return;
    const el = section.current;
    const hero = el.querySelector('.hero-copy');
    requestAnimationFrame(() => el.classList.add('in'));
    const stopReady = onReady(() => { world.introAt = performance.now(); });

    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting));
    io.observe(el);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el, start: 'top top', end: 'bottom bottom', scrub: true,
        onUpdate: (s) => { world.progress = s.progress; },
      });
      const chapters = gsap.utils.toArray('.chapter', el);
      gsap.set(chapters, { autoAlpha: 0, y: 70 });
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top top', end: 'bottom bottom', scrub: 0.7 } });
      tl.to(hero, { autoAlpha: 0, y: -80, duration: 1 }, 0.6);
      chapters.forEach((c, i) => {
        const at = 1.4 + i * 2.2;
        tl.to(c, { autoAlpha: 1, y: 0, duration: 0.9 }, at);
        if (i < chapters.length - 1) tl.to(c, { autoAlpha: 0, y: -70, duration: 0.9 }, at + 1.5);
      });
      tl.to({}, { duration: 0.6 });
      gsap.to('.scroll-hint', { autoAlpha: 0, scrollTrigger: { trigger: el, start: 'top top', end: '+=200', scrub: true } });
    }, el);
    return () => { stopReady(); io.disconnect(); ctx.revert(); };
  }, [rich]);

  if (!rich) return <StaticHero />;

  return (
    <header className={`world ${lite ? 'is-lite' : ''}`} ref={section} data-label="START" data-theme="dark">
      <div className="world-sticky">
        <div className="world-bg" data-cursor="Tap" onClick={pulse}>
          <Suspense fallback={<div className="world-loading" />}>
            {SPLINE_SCENE ? <Spline scene={SPLINE_SCENE} /> : <ScrollWorld active={active} lite={lite} />}
          </Suspense>
        </div>
        <div className="world-scrim" />
        <div className="world-content">
          <Intro />
          {CHAPTERS.map((c) => (
            <div className="chapter" key={c.k}>
              <span className="eyebrow">{c.k}</span>
              <h2 className="h-display">{c.h}</h2>
              <p className="lede">{c.p}</p>
            </div>
          ))}
        </div>
        <div className="scroll-hint" aria-hidden="true"><span>Scroll to walk · Tap to pulse</span><i /></div>
      </div>
    </header>
  );
}
