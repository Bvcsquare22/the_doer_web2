import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, Sparkles, Grid, Float } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

import { world, pulse } from './worldState.js';

const GOLD = new THREE.Color('#D4A843');
const GOLD_HOT = new THREE.Color('#FFD77A');
const LIME = new THREE.Color('#A6E22E');
const DIM = new THREE.Color('#2a261d');

function makePath() {
  const pts = [];
  for (let i = 0; i <= 14; i++) {
    const z = -i * 5.2;
    const x = Math.sin(i * 0.85) * 2.4;
    const y = Math.sin(i * 0.45) * 0.35;
    pts.push(new THREE.Vector3(x, y, z));
  }
  return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.5);
}

/* Footsteps: alternating left/right prints along the path. They light up as the walker passes. */
function Footsteps({ curve, count }) {
  const mesh = useRef();
  const glow = useRef(new Float32Array(count));
  const ts = useMemo(() => Array.from({ length: count }, (_, i) => 0.012 + (i / count) * 0.96), [count]);

  const geometry = useMemo(() => {
    const g = new THREE.CapsuleGeometry(0.075, 0.2, 6, 14);
    g.rotateX(Math.PI / 2);
    g.scale(1.25, 0.28, 1);
    return g;
  }, []);

  useLayoutEffect(() => {
    {
      const m = mesh.current;
      if (!m) return;
      const o = new THREE.Object3D();
      const up = new THREE.Vector3(0, 1, 0);
      ts.forEach((t, i) => {
        const p = curve.getPointAt(t);
        const tan = curve.getTangentAt(t);
        const side = new THREE.Vector3().crossVectors(tan, up).normalize();
        o.position.copy(p).addScaledVector(side, i % 2 ? 0.17 : -0.17);
        o.position.y += 0.02;
        o.lookAt(o.position.clone().add(tan));
        o.rotateY(i % 2 ? -0.12 : 0.12);
        o.updateMatrix();
        m.setMatrixAt(i, o.matrix);
        m.setColorAt(i, DIM);
      });
      m.instanceMatrix.needsUpdate = true;
      m.instanceColor.needsUpdate = true;
    }
  }, [curve, ts]);

  const c = useMemo(() => new THREE.Color(), []);
  useFrame((_, dt) => {
    const m = mesh.current;
    if (!m || !m.instanceColor) return;
    const head = 0.03 + world.progress * 0.9 + 0.05;
    const now = performance.now();
    const fronts = world.pulses.map((t) => head - 0.06 + ((now - t) / 1000) * 0.32);
    for (let i = 0; i < count; i++) {
      const target = ts[i] < head ? 1 : 0;
      glow.current[i] = THREE.MathUtils.damp(glow.current[i], target, 6, dt);
      const g = glow.current[i];
      // just lit steps flash hot, older ones settle to gold, the next one ahead hints lime
      const fresh = THREE.MathUtils.clamp(1 - (head - ts[i]) * 30, 0, 1) * g;
      c.copy(DIM).lerp(GOLD, g).lerp(GOLD_HOT, fresh * 0.8);
      if (!target && ts[i] - head < 0.012) c.lerp(LIME, 0.25);
      for (const f of fronts) {
        const d = Math.abs(ts[i] - f);
        if (d < 0.02) c.lerp(i % 2 ? GOLD_HOT : LIME, 1 - d / 0.02);
      }
      m.setColorAt(i, c);
    }
    m.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[geometry, undefined, count]} frustumCulled={false}>
      <meshStandardMaterial toneMapped={false} emissive="#D4A843" emissiveIntensity={0.25} roughness={0.35} metalness={0.2} />
    </instancedMesh>
  );
}

/* Reward coins floating beside the path */
function Coins({ curve, count }) {
  const coins = useMemo(() => {
    const up = new THREE.Vector3(0, 1, 0);
    return Array.from({ length: count }, (_, i) => {
      const t = 0.07 + (i / count) * 0.86;
      const p = curve.getPointAt(t);
      const side = new THREE.Vector3().crossVectors(curve.getTangentAt(t), up).normalize();
      const s = i % 2 ? 1 : -1;
      return { pos: p.clone().addScaledVector(side, s * (1.7 + (i % 3) * 0.45)).add(new THREE.Vector3(0, 0.7 + (i % 4) * 0.25, 0)), speed: 0.6 + (i % 5) * 0.15 };
    });
  }, [curve, count]);

  return coins.map((c, i) => (
    <Float key={i} speed={c.speed * 2} rotationIntensity={0.6} floatIntensity={0.8} position={c.pos}>
      <Coin spin={c.speed} />
    </Float>
  ));
}

const _v = new THREE.Vector3();
function Coin({ spin }) {
  const ref = useRef();
  const state = useRef({ hover: 0, hot: false, pop: 0 });
  // Never let a coin sit in front of the lens: shrink it away as the camera walks past.
  useFrame(({ camera }, dt) => {
    const g = ref.current;
    if (!g) return;
    const st = state.current;
    st.hover = THREE.MathUtils.damp(st.hover, st.hot ? 1 : 0, 8, dt);
    st.pop = Math.max(0, st.pop - dt * 1.4);
    g.rotation.y += dt * (spin + st.hover * 9 + st.pop * 30);
    g.position.y = Math.sin((1 - st.pop) * Math.PI) * st.pop * 1.2;
    const d = g.getWorldPosition(_v).distanceTo(camera.position);
    g.scale.setScalar(THREE.MathUtils.smoothstep(d, 1.2, 2.6) * (1 + st.hover * 0.35));
  });
  const events = {
    onPointerOver: (e) => { e.stopPropagation(); state.current.hot = true; },
    onPointerOut: () => { state.current.hot = false; },
    onClick: (e) => { e.stopPropagation(); state.current.pop = 1; pulse(); },
  };
  return (
    <group ref={ref} {...events}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.24, 0.24, 0.05, 48]} />
        <meshStandardMaterial color="#D4A843" metalness={1} roughness={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.24, 0.018, 12, 48]} />
        <meshStandardMaterial color="#FFE3A0" metalness={1} roughness={0.15} />
      </mesh>
    </group>
  );
}

/* Finish ring at the end of the walk */
function Finish({ curve }) {
  const ref = useRef();
  const end = useMemo(() => curve.getPointAt(0.985), [curve]);
  const tan = useMemo(() => curve.getTangentAt(0.985), [curve]);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = clock.elapsedTime * 0.25;
    const s = 1 + Math.sin(clock.elapsedTime * 2) * 0.03;
    ref.current.scale.setScalar(s);
  });
  return (
    <group position={[end.x, end.y + 1.1, end.z]} rotation={[0, Math.atan2(tan.x, tan.z), 0]}>
      <mesh ref={ref}>
        <torusGeometry args={[1.35, 0.045, 24, 160]} />
        <meshBasicMaterial color={GOLD_HOT} toneMapped={false} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.62, 0.012, 12, 160]} />
        <meshBasicMaterial color={LIME} toneMapped={false} transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

/* The hero copy sits above the canvas, so track the pointer on the window */
function Pointer() {
  useEffect(() => {
    const on = (e) => {
      world.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      world.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', on, { passive: true });
    return () => window.removeEventListener('pointermove', on);
  }, []);
  return null;
}

/* Camera walks the path with the scroll, with a little idle sway and mouse parallax */
function Rig({ curve }) {
  const { camera } = useThree();
  const p = useRef(0);
  const look = useMemo(() => new THREE.Vector3(), []);
  const smoothLook = useRef(new THREE.Vector3(0, 0, -5));
  useFrame(({ clock }, dt) => {
    p.current = THREE.MathUtils.damp(p.current, world.progress, 3.2, dt);
    const t = 0.005 + p.current * 0.9;
    const pos = curve.getPointAt(t);
    const ahead = curve.getPointAt(Math.min(t + 0.06, 1));
    const sway = Math.sin(clock.elapsedTime * 0.6) * 0.08;
    // Fly in: start high and far back, swoop down onto the path once the intro curtain opens.
    const k = world.introAt ? THREE.MathUtils.clamp((performance.now() - world.introAt) / 2800, 0, 1) : 0;
    const lift = Math.pow(1 - k, 3);
    camera.position.set(
      pos.x + world.pointer.x * 0.35 + sway,
      pos.y + 1.25 + world.pointer.y * 0.18 + Math.abs(Math.sin(clock.elapsedTime * 1.6)) * 0.03 + lift * 5.5,
      pos.z + 1.6 + lift * 6
    );
    look.set(ahead.x, ahead.y + 0.35, ahead.z);
    smoothLook.current.lerp(look, 1 - Math.exp(-dt * 5));
    camera.lookAt(smoothLook.current);
  });
  return null;
}

function Scene({ lite }) {
  const curve = useMemo(makePath, []);
  return (
    <>
      <color attach="background" args={['#0D0D0D']} />
      <fog attach="fog" args={['#0D0D0D', 6, 30]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 3]} intensity={1.1} color="#fff1d0" />

      {/* Local studio lighting for the metal coins, no HDR download */}
      <Environment resolution={128} frames={1}>
        <Lightformer form="rect" intensity={3} color="#fff4dc" position={[0, 5, -6]} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={1.6} color="#D4A843" position={[-6, 1, 0]} rotation={[0, Math.PI / 2, 0]} scale={[10, 4, 1]} />
        <Lightformer form="ring" intensity={2} color="#ffffff" position={[5, 3, 2]} scale={3} />
      </Environment>

      <Grid
        position={[0, -0.02, -30]}
        args={[60, 90]}
        cellSize={0.6}
        cellThickness={0.6}
        cellColor="#3a3222"
        sectionSize={3}
        sectionThickness={1}
        sectionColor="#6b5526"
        fadeDistance={34}
        fadeStrength={1.4}
        infiniteGrid
      />

      <Footsteps curve={curve} count={lite ? 90 : 150} />
      <Coins curve={curve} count={lite ? 10 : 18} />
      <Finish curve={curve} />
      <Sparkles count={lite ? 60 : 160} scale={[12, 5, 70]} position={[0, 2, -34]} size={2.2} speed={0.35} color="#E7C46A" opacity={0.7} />
      <Rig curve={curve} />

      {!lite && (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom intensity={1.1} luminanceThreshold={0.55} luminanceSmoothing={0.3} mipmapBlur />
          <Vignette offset={0.25} darkness={0.75} />
        </EffectComposer>
      )}
    </>
  );
}

export default function ScrollWorld({ active = true, lite = false }) {
  return (
    <Canvas
      className="world-canvas"
      frameloop={active ? 'always' : 'never'}
      dpr={lite ? [1, 1.25] : [1, 1.75]}
      gl={{ antialias: !lite, powerPreference: 'high-performance', alpha: false }}
      camera={{ fov: 52, near: 0.1, far: 80, position: [0, 1.25, 1.6] }}
    >
      <Pointer />
      <Scene lite={lite} />
    </Canvas>
  );
}
