import { useEffect } from 'react';

export const MouseAura = () => {
  useEffect(() => {
    const root = document.documentElement;

    const handleMove = (event: MouseEvent) => {
      root.style.setProperty('--mx', `${event.clientX}px`);
      root.style.setProperty('--my', `${event.clientY}px`);
    };

    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return <div aria-hidden className="mouse-aura" />;
};