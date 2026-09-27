import { lazy, Suspense, useState } from 'react';
import { canRun3D } from '../lib/device.js';
import { STORE } from '../config.js';
import { Apple, Play } from './Icons.jsx';
import InView from './InView.jsx';

const Gradient = lazy(() => import('../effects/Gradient.jsx'));

export function StoreButtons({ tone = 'dark' }) {
  return (
    <div className="cta-row">
      <a className={`store ${tone}`} href={STORE.ios} target="_blank" rel="noopener">
        <Apple /><span><small>Download on the</small><strong>App Store</strong></span>
      </a>
      <a className={`store ${tone}`} href={STORE.android} target="_blank" rel="noopener">
        <Play /><span><small>Get it on</small><strong>Google Play</strong></span>
      </a>
    </div>
  );
}

// Animated ShaderGradient behind a section; a CSS gradient stands in when WebGL is off.
export function ShaderBackdrop({ preset = 'gold', speed }) {
  const [rich] = useState(() => canRun3D());
  const fallback = <div className={`shader-fallback-${preset === 'gold' ? 'gold' : 'ink'}`} />;
  return (
    <div className="shader-wrap" aria-hidden="true">
      {fallback}
      {rich && (
        <InView rootMargin="300px" style={{ position: 'absolute', inset: 0 }}>
          <Suspense fallback={null}><Gradient preset={preset} speed={speed} /></Suspense>
        </InView>
      )}
    </div>
  );
}

export function Head({ eyebrow, children, lede, center, className = '' }) {
  return (
    <div className={`head reveal ${center ? 'center' : ''} ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <h2 className="h2">{children}</h2>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}
