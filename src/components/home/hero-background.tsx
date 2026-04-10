'use client';

import { useEffect, useRef, useCallback } from 'react';
import type { StaticImageData } from 'next/image';
import { AppImage } from '@/components/ui/app-image';

type HeroBackgroundProps = {
  src: string | StaticImageData;
  alt: string;
};

/**
 * Scroll-linked hero background:
 * - Image zooms in (scale) as user scrolls down
 * - Exported hook lets the hero text layer read scrollProgress for parallax/fade
 */
export function useHeroScroll() {
  const progressRef = useRef(0);
  const textRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const tick = useCallback(() => {
    const vh = window.innerHeight;
    const raw = Math.min(window.scrollY / vh, 1);
    progressRef.current = raw;

    if (bgRef.current) {
      const scale = 1 + raw * 0.18;
      bgRef.current.style.transform = `scale(${scale})`;
    }

    if (textRef.current) {
      const translateY = raw * -60;
      const opacity = 1 - raw * 1.1;
      textRef.current.style.transform = `translate3d(0,${translateY}px,0)`;
      textRef.current.style.opacity = `${Math.max(opacity, 0)}`;
    }
  }, []);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let raf: number;
    const onScroll = () => {
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    tick();

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [tick]);

  return { textRef, bgRef };
}

export function HeroBackground({ src, alt, bgRef }: HeroBackgroundProps & { bgRef?: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={bgRef}
      className="absolute inset-0 origin-center will-change-transform"
      style={{ transform: 'scale(1)' }}
    >
      <AppImage alt={alt} className="h-full w-full object-cover" priority src={src} />
    </div>
  );
}
