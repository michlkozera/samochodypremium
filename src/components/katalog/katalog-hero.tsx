'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { HeroBackground, useHeroScroll } from '@/components/home/hero-background';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

export function KatalogHero() {
  const { textRef, bgRef } = useHeroScroll();

  return (
    <section className="relative isolate h-[60svh] min-h-[420px] overflow-hidden bg-black text-white">
      {/* Background image with scroll-linked zoom */}
      <div className="absolute inset-0 overflow-hidden">
        <HeroBackground src={assets.heroOferta} alt="" bgRef={bgRef} />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.30)_0%,rgba(0,0,0,0.65)_100%)]" />

      {/* Text content */}
      <div
        ref={textRef}
        className="site-shell relative z-10 flex h-full w-full flex-col justify-end pb-10 pt-[calc(var(--site-header-h)+1.5rem)] sm:pb-14 lg:pb-16"
        style={{ willChange: 'transform, opacity' }}
      >
        <MotionReveal className="grid w-full gap-5 sm:gap-6" stagger={0.12} amount={0.15}>
          <MotionRevealItem>
            <p className="eyebrow text-[0.78rem] text-zinc-400 sm:text-[0.7rem]">
              <Link href="/" className="transition-colors duration-200 hover:text-white">
                Start
              </Link>
              {' '}/{' '}
              Oferta
            </p>
          </MotionRevealItem>

          <MotionRevealItem>
            <h1 className="max-w-[18ch] text-[clamp(2.2rem,7vw,4.2rem)] font-semibold uppercase leading-[1.05] tracking-[-0.03em] [text-wrap:balance]">
              Katalog pojazdów premium.
            </h1>
          </MotionRevealItem>

          <MotionRevealItem>
            <p className="max-w-xl text-base leading-[1.85] text-zinc-300">
              Przeglądaj naszą aktualną ofertę wyselekcjonowanych samochodów. Każdy egzemplarz z pełną historią i gwarancją dealerską.
            </p>
          </MotionRevealItem>
        </MotionReveal>
      </div>
    </section>
  );
}
