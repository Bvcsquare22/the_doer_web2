import { useEffect, useRef, useState } from 'react';

// Mounts children only once they come near the viewport, so WebGL work
// (shaders, 3D) never starts for sections the visitor has not reached.
export default function InView({ children, rootMargin = '300px', className, style, placeholder = null }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);
  return <div ref={ref} className={className} style={style}>{seen ? children : placeholder}</div>;
}
