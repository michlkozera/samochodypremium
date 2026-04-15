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
      sectionClassName="lg:!min-h-[82svh]"
    >
      <MotionReveal
        className="grid w-full gap-8 sm:gap-10 lg:grid-cols-2 lg:items-end lg:gap-16 xl:gap-20"
        stagger={0.12}
        amount={0.1}
      >
        {/* ── Left column ── */}
        <div className="grid min-w-0 gap-4 sm:gap-6">
          <MotionRevealItem>
            <h1 className="max-w-[14ch] text-[clamp(1.75rem,8vw,4.4rem)] font-bold uppercase leading-[1.03] tracking-[-0.03em] [overflow-wrap:anywhere] [text-wrap:balance] sm:leading-[1.05]">
              Dealer samochodów klasy premium.
            </h1>
          </MotionRevealItem>

          <MotionRevealItem>
            <Link
              href="/oferta"
              className="inline-flex min-h-12 w-fit items-center justify-center gap-2 border border-white/50 bg-black/20 px-8 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-md transition-[background-color,color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white hover:bg-white hover:text-zinc-950 sm:px-10"
            >
              Zobacz katalog
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </MotionRevealItem>
        </div>

        {/* ── Right column ── */}
        <div className="grid min-w-0 gap-4 sm:gap-6">
          <MotionRevealItem>
            <p className="text-[0.95rem] font-medium leading-[1.5] text-white/70 sm:text-[1.15rem] sm:text-white/80">
              Wyszukaj swój wymarzony samochód
            </p>
          </MotionRevealItem>

          <MotionRevealItem>
            <HeroSearch buttonLabel="Szukaj" buttonHref="/oferta" />
          </MotionRevealItem>

          <MotionRevealItem>
            <div className="flex flex-wrap gap-6 pb-2 sm:gap-10 sm:pb-0">
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
