import { useEffect } from 'react';

export function useKeyboardNav(onNext, onPrev) {
  useEffect(() => {
    const handler = (e) => {
      // Ignore when user is typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') onNext?.();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   onPrev?.();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onNext, onPrev]);
}
