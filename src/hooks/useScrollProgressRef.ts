import { useEffect, useRef, type MutableRefObject } from 'react';

/**
 * Tracks scroll progress (0..1 across the whole document) in a ref instead of
 * React state, so consumers (like a Three.js render loop) can read the latest
 * value every frame without triggering re-renders on every scroll event.
 */
export function useScrollProgressRef(): MutableRefObject<number> {
  const progressRef = useRef(0);

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      progressRef.current = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return progressRef;
}
