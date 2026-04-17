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
            <h1 className="max-w-[14ch] text-[clamp(1.8rem,6.8vw,3.85rem)] font-extralight uppercase leading-[1.05] tracking-[-0.03em] [overflow-wrap:anywhere] [text-wrap:balance]">
              Dealer samochodów klasy premium
            </h1>
          </MotionRevealItem>
        </div>

        {/* ── Right column ── */}
        <div className="grid min-w-0 gap-4 sm:gap-6">
          <MotionRevealItem>
            <p className="text-[0.95rem] font-medium leading-[1.5] text-white/75 sm:text-[1.05rem]">
              Znajdź model dopasowany do Twoich oczekiwań
            </p>
          </MotionRevealItem>

          <MotionRevealItem>
            <HeroSearch buttonLabel="Szukaj" buttonHref="/oferta" />
          </MotionRevealItem>

          <MotionRevealItem>
            <div className="flex flex-wrap gap-x-8 gap-y-4 sm:gap-x-10">
              <div className="grid gap-1">
                <span className="text-[1.5rem] font-bold tracking-[-0.02em] text-white sm:text-[1.75rem]">
                  <CountUp value={vehicleCount} delay={0} />+
                </span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  samochodów w ofercie
                </span>
              </div>
              <div className="grid gap-1">
                <span className="text-[1.5rem] font-bold tracking-[-0.02em] text-white sm:text-[1.75rem]">
                  <CountUp value={600} delay={0.2} />+
                </span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  zadowolonych klientów
                </span>
              </div>
              <div className="grid gap-1">
                <span className="text-[1.5rem] font-bold tracking-[-0.02em] text-white sm:text-[1.75rem]">
                  <CountUp value={100} delay={0.4} />%
                </span>
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                  satysfakcji klientów
                </span>
              </div>
            </div>
          </MotionRevealItem>
        </div>
      </MotionReveal>
    </PageHero>
  );
}
