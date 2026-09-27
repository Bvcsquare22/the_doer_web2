import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';

// Animated 3D shader gradient backgrounds in Doer colors.
// lightType "3d" keeps everything local, no HDR files fetched from a CDN.
const PRESETS = {
  gold: { color1: '#D4A843', color2: '#E9D39A', color3: '#8A6420', brightness: 1.0 },
  ink: { color1: '#D4A843', color2: '#0D0D0D', color3: '#2B2417', brightness: 1.0 },
  night: { color1: '#0D0D0D', color2: '#5a4418', color3: '#1a1610', brightness: 0.85 },
};

export default function Gradient({ preset = 'gold', speed = 0.3 }) {
  const c = PRESETS[preset];
  return (
    <ShaderGradientCanvas
      className="shader-bg"
      style={{ position: 'absolute', inset: 0 }}
      pixelDensity={1}
      fov={45}
      pointerEvents="none"
      lazyLoad
      rootMargin="200px"
      powerPreference="high-performance"
    >
      <ShaderGradient
        control="props"
        type="plane"
        animate="on"
        uSpeed={speed}
        uStrength={4}
        uDensity={1.3}
        uFrequency={5.5}
        uAmplitude={1}
        positionX={-1.4}
        positionY={0}
        positionZ={0}
        rotationX={0}
        rotationY={10}
        rotationZ={50}
        cAzimuthAngle={180}
        cPolarAngle={90}
        cDistance={3.6}
        cameraZoom={1}
        lightType="3d"
        brightness={c.brightness}
        reflection={0.1}
        grain="off"
        color1={c.color1}
        color2={c.color2}
        color3={c.color3}
      />
    </ShaderGradientCanvas>
  );
}
