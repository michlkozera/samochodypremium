'use client';

import { useEffect, useRef, useCallback } from 'react';
import { assets } from '@/data/assets';
import { AppImage } from '@/components/ui/app-image';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';
import { philosophyManifest } from '@/data/oferta-page';

/** Scroll-linked zoom: image scales 1 → 1.18 as the section scrolls through the viewport */
function useScrollZoom() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  const tick = useCallback(() => {
    const el = containerRef.current;
    const img = imgRef.current;
    if (!el || !img) return;

    const rect = el.getBoundingClientRect();
    const vh = window.innerHeight;
    // 0 when bottom edge enters viewport, 1 when top edge leaves
    const raw = 1 - rect.bottom / (vh + rect.height);
    const progress = Math.max(0, Math.min(raw, 1));
    const scale = 1 + progress * 0.18;
    img.style.transform = `scale(${scale})`;
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

  return { containerRef, imgRef };
}

export function PrecisionPhilosophy() {
  const { containerRef, imgRef } = useScrollZoom();

  return (
    <section className="section-block overflow-hidden border-b border-zinc-200/60 bg-zinc-50">
      <div className="site-shell">
        <MotionReveal
          className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-0"
          stagger={0.12}
          amount={0.2}
        >
          {/* Image column */}
          <MotionRevealItem className="relative min-h-[50vw] overflow-hidden lg:min-h-[560px]" preset="clip-up" duration={1.2}>
            <div ref={containerRef} className="absolute inset-0 overflow-hidden">
              <div
                ref={imgRef}
                className="h-full w-full origin-center will-change-transform"
                style={{ transform: 'scale(1)' }}
              >
                <AppImage
                  alt="Inspekcja techniczna pojazdu premium"
                  className="h-full w-full object-cover"
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  src={assets.detail01}
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </MotionRevealItem>

          {/* Text column */}
          <div className="flex flex-col gap-8 lg:pl-14 xl:pl-20">
            <MotionRevealItem preset="slide-right">
              <p className="eyebrow text-zinc-500">Filozofia</p>
            </MotionRevealItem>

            <MotionRevealItem preset="blur-fade" duration={1}>
              <h2 className="max-w-[18ch] text-[clamp(1.85rem,5vw,3.4rem)] font-semibold uppercase leading-[1.05] tracking-[-0.02em] [text-wrap:balance]">
                Trzy zasady, które definiują każdy samochód w ofercie.
              </h2>
            </MotionRevealItem>

            <div className="grid gap-0">
              {philosophyManifest.map((item) => (
                <MotionRevealItem key={item.index} preset="slide-right">
                  <article className="grid gap-2 border-t border-zinc-200/60 py-6">
                    <div className="flex items-baseline gap-4">
                      <span className="text-[clamp(1.2rem,2vw,1.6rem)] font-semibold leading-none tracking-[-0.04em] text-zinc-300">
                        {item.index}
                      </span>
                      <h3 className="text-[0.82rem] font-semibold uppercase tracking-[0.04em] text-zinc-950">
                        {item.label}
                      </h3>
                    </div>
                    <p className="pl-0 text-[0.86rem] leading-[1.75] text-zinc-500 sm:pl-10">
                      {item.text}
                    </p>
                  </article>
                </MotionRevealItem>
              ))}
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
