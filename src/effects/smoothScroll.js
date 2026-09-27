import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../lib/device.js';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;

// One Lenis instance per page. It drives GSAP's ticker so ScrollTrigger scenes
// (the 3D scroll world, pinned sections) stay perfectly in sync with the smoothed scroll.
export function startSmoothScroll() {
  if (lenis || prefersReducedMotion()) return () => {};
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: { offset: -90 } });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (t) => lenis && lenis.raf(t * 1000);
  gsap.ticker.add(tick);
  // Keep lag smoothing on: if the page stalls while 3D loads, timelines (like the intro) pause instead of skipping ahead.
  gsap.ticker.lagSmoothing(500, 33);
  return () => {
    gsap.ticker.remove(tick);
    lenis.destroy();
    lenis = null;
  };
}

export const pauseScroll = () => lenis && lenis.stop();
export const resumeScroll = () => lenis && lenis.start();

export { gsap, ScrollTrigger };
