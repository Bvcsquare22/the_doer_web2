// Shared between the hero (DOM, GSAP) and the 3D scene, read every frame.
// progress: 0 to 1 through the hero scroll. introAt: when the camera fly in starts.
// pulses: timestamps of taps, each sends a wave of light down the footsteps.
export const world = { progress: 0, pointer: { x: 0, y: 0 }, introAt: 0, pulses: [] };

export function pulse() {
  const now = performance.now();
  world.pulses = world.pulses.filter((t) => now - t < 4000).concat(now);
}
