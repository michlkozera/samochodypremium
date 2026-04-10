'use client';

import { useEffect, useState } from 'react';

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <button
      aria-label="Wroc na gore"
      className={[
        'fixed bottom-5 right-4 z-50 inline-flex h-12 w-12 items-center justify-center border border-zinc-950 bg-zinc-950 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-white shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition duration-200 ease-out sm:bottom-6 sm:right-6',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0',
        'hover:-translate-y-1 hover:bg-white hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 active:translate-y-0',
      ].join(' ')}
      onClick={handleClick}
      type="button"
    >
      Top
    </button>
  );
}
