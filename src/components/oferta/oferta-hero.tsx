'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { HeroBackground, useHeroScroll } from '@/components/home/hero-background';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

export function OfertaHero() {
  const { textRef, bgRef } = useHeroScroll();

  return (
    <section className="relative isolate h-[82svh] min-h-[520px] overflow-hidden bg-black text-white sm:h-[92svh] lg:h-[100svh] lg:min-h-[600px]">
      {/* Background image with scroll-linked zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <HeroBackground src={assets.heroOferta} alt="" bgRef={bgRef} />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.28)_0%,rgba(0,0,0,0.62)_100%)]" />

      {/* Text content */}
      <div
        ref={textRef}
        className="site-shell relative z-10 flex h-full w-full flex-col justify-end pb-8 pt-[calc(var(--site-header-h)+1rem)] sm:pb-12 lg:pb-16"
        style={{ willChange: 'transform, opacity' }}
      >
        <MotionReveal
          amount={0.15}
          className="grid w-full gap-5 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.3fr)] lg:items-end lg:gap-12 xl:gap-16"
          stagger={0.12}
        >
          <div className="grid gap-4 sm:gap-5 sm:max-w-4xl">
            <MotionRevealItem>
              <p className="eyebrow text-[0.7rem] text-zinc-400">
                <Link href="/" className="transition-colors duration-200 hover:text-white">
                  Start
                </Link>
                {' '}/{' '}
                Oferta
              </p>
            </MotionRevealItem>

            <MotionRevealItem>
              <h1 className="max-w-[16ch] text-[clamp(2.2rem,8vw,5.2rem)] font-semibold uppercase leading-[1.04] tracking-[-0.03em] [text-wrap:balance]">
                Samochody wyselekcjonowane z precyzją.
              </h1>
            </MotionRevealItem>

            <MotionRevealItem>
              <p className="max-w-lg text-[0.9rem] leading-[1.8] text-zinc-300 sm:text-base sm:leading-[1.85]">
                Sedany, SUV-y, sportowe i elektryczne — każdy pojazd przechodzi wieloetapową weryfikację.
              </p>
            </MotionRevealItem>
          </div>

          <MotionRevealItem className="flex sm:justify-end">
            <Link
              className="btn-premium-ghost min-h-12 w-full border-white/20 text-[0.72rem] text-white/80 hover:border-white/50 hover:bg-white hover:text-zinc-950 sm:w-fit sm:min-h-14 sm:px-10"
              href="/kontakt"
            >
              Skontaktuj się
            </Link>
          </MotionRevealItem>
        </MotionReveal>
      </div>
    </section>
  );
}
