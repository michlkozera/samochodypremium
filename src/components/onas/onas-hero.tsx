'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { HeroBackground, useHeroScroll } from '@/components/home/hero-background';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

export function OnasHero() {
  const { textRef, bgRef } = useHeroScroll();

  return (
    <section className="relative isolate h-[100svh] min-h-[600px] overflow-hidden bg-black text-white">
      <div className="absolute inset-0 overflow-hidden">
        <HeroBackground src={assets.heroOnas} alt="" bgRef={bgRef} />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.30)_0%,rgba(0,0,0,0.65)_100%)]" />

      <div
        ref={textRef}
        className="site-shell relative z-10 flex h-full w-full flex-col justify-end pb-10 pt-[calc(var(--site-header-h)+1.5rem)] sm:pb-14 lg:pb-16"
        style={{ willChange: 'transform, opacity' }}
      >
        <MotionReveal
          className="grid w-full gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.3fr)] lg:items-end lg:gap-12 xl:gap-16"
          stagger={0.12}
          amount={0.15}
        >
          <div className="grid max-w-4xl gap-5 sm:gap-6">
            <MotionRevealItem>
              <p className="eyebrow text-[0.78rem] text-zinc-400 sm:text-[0.7rem]">
                <Link href="/" className="transition-colors duration-200 hover:text-white">Start</Link>
                {' '}/{' '}
                O nas
              </p>
            </MotionRevealItem>

            <MotionRevealItem>
              <h1 className="max-w-[18ch] text-[clamp(2.9rem,9vw,5.2rem)] font-semibold uppercase leading-[1.03] tracking-[-0.03em] [text-wrap:balance] sm:leading-[1.05]">
                Salon zbudowany na zaufaniu.
              </h1>
            </MotionRevealItem>

            <MotionRevealItem>
              <p className="max-w-xl text-base leading-[1.85] text-zinc-300 sm:text-base sm:leading-[1.85]">
                Zespół ekspertów motoryzacji, który łączy pasję, doświadczenie i transparentność w jeden niepodzielny standard obsługi.
              </p>
            </MotionRevealItem>
          </div>

          <MotionRevealItem className="flex justify-end">
            <Link
              className="btn-premium-ghost min-h-14 w-full border-white/20 px-10 text-[0.75rem] text-white/80 hover:border-white/50 hover:bg-white hover:text-zinc-950 sm:w-fit"
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
