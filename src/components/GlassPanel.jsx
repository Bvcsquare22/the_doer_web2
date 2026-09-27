import { useState } from 'react';
import LiquidGlass from 'liquid-glass-react';
import { prefersReducedMotion } from '../lib/device.js';

// A stat panel that refracts the shader gradient behind it (liquid glass on desktop Chrome/Edge,
// frosted glass everywhere else).
export default function GlassPanel({ children }) {
  const [glass] = useState(() => window.matchMedia('(min-width: 960px)').matches && !prefersReducedMotion());
  if (!glass) return <div className="glass-panel frost">{children}</div>;
  return (
    <div className="lg-scope">
      <LiquidGlass
        displacementScale={70}
        blurAmount={0.1}
        saturation={140}
        aberrationIntensity={2}
        elasticity={0.12}
        cornerRadius={28}
        padding="0"
        style={{ position: 'absolute', top: '50%', left: '50%' }}
      >
        <div className="glass-panel">{children}</div>
      </LiquidGlass>
    </div>
  );
}
