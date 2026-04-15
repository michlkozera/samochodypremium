'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';
import { HeroSearch } from '@/components/home/hero-search';
import { CountUp } from '@/components/ui/count-up';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

type HomeHeroProps = {
  vehicleCount: number;
};

export function HomeHero({ vehicleCount }: HomeHeroProps) {
  return (
    <PageHero
      imageSrc={assets.heroMain}
      sectionClassName="!h-[82svh] !min-h-[540px]"
    >
      <MotionReveal
        className="grid w-full gap-10 lg:grid-cols-2 lg:items-end lg:gap-16 xl:gap-20"
        stagger={0.12}
        amount={0.1}
      >
        {/* ── Left column ── */}
        <div className="grid min-w-0 gap-5 sm:gap-6">
          <MotionRevealItem>
            <div className="eyebrow border-zinc-500 text-[0.78rem] text-zinc-400 backdrop-blur-sm bg-white/5 sm:text-[0.7rem]">
              Warszawa / wyselekcjonowane egzemplarze / bezkompromisowa jakość
            </div>
          </MotionRevealItem>

          <MotionRevealItem>
            <h1 className="max-w-[14ch] text-[clamp(2rem,8vw,4.4rem)] font-bold uppercase leading-[1.03] tracking-[-0.03em] [overflow-wrap:anywhere] [text-wrap:balance] sm:leading-[1.05]">
              Dealer samochodów klasy premium.
            </h1>
          </MotionRevealItem>

          <MotionRevealItem>
            <Link
              href="/oferta"
              className="hero-btn-secondary inline-flex w-fit gap-2 px-8 backdrop-blur-sm bg-white/5 sm:px-10"
            >
              Zobacz katalog
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </MotionRevealItem>
        </div>

        {/* ── Right column ── */}
        <div className="grid min-w-0 gap-6">
          <MotionRevealItem>
            <p className="text-[1.05rem] font-medium leading-[1.5] text-white/80 sm:text-[1.15rem]">
              Wyszukaj swój wymarzony samochód
            </p>
          </MotionRevealItem>

          <MotionRevealItem>
            <HeroSearch buttonLabel="Szukaj" buttonHref="/oferta" />
          </MotionRevealItem>

          <MotionRevealItem>
            <div className="flex flex-wrap gap-6 sm:gap-10">
              <div className="grid gap-1">
                <span className="text-[1.5rem] font-bold tracking-[-0.02em] text-white sm:text-[1.75rem]">
                  <CountUp value={vehicleCount} />+
                </span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  samochodów w ofercie
                </span>
              </div>
              <div className="grid gap-1">
                <span className="text-[1.5rem] font-bold tracking-[-0.02em] text-white sm:text-[1.75rem]">
                  <CountUp value={600} />+
                </span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  zadowolonych klientów
                </span>
              </div>
            </div>
          </MotionRevealItem>
        </div>
      </MotionReveal>
    </PageHero>
  );
}
