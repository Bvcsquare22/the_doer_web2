import { LiquidMetal } from '@paper-design/shaders-react';

// The real Doer striped "D", rendered as flowing liquid gold (Paper Design LiquidMetal shader).
export default function LiquidLogo({ size = 260, tint = '#D4A843', className = '' }) {
  return (
    <LiquidMetal
      className={`liquid-logo ${className}`}
      style={{ width: size, height: size }}
      image="/brand/doer-mark.png"
      colorBack="#00000000"
      colorTint={tint}
      repetition={3}
      softness={0.28}
      shiftRed={0.08}
      shiftBlue={0.08}
      distortion={0.12}
      contour={0.5}
      angle={70}
      speed={0.7}
      scale={0.9}
      fit="contain"
    />
  );
}
