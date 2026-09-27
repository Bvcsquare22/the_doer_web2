// Capability checks so heavy WebGL only runs where it will be smooth.
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

let webgl;
export function hasWebGL() {
  if (webgl !== undefined) return webgl;
  try {
    const c = document.createElement('canvas');
    webgl = !!(window.WebGL2RenderingContext && c.getContext('webgl2')) || !!c.getContext('webgl');
  } catch {
    webgl = false;
  }
  return webgl;
}

export function isLowPower() {
  const n = navigator;
  return !!(n.connection && n.connection.saveData) || (n.hardwareConcurrency && n.hardwareConcurrency <= 2);
}

export const isMobile = () => window.matchMedia('(max-width: 760px)').matches;

// Full 3D is on unless the visitor asked for less motion, has no WebGL, or is on a weak device.
export const canRun3D = () => hasWebGL() && !prefersReducedMotion() && !isLowPower();
