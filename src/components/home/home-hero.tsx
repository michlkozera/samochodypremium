'use client';

import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';
import { HeroSearch } from '@/components/home/hero-search';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

export function HomeHero() {
  return (
    <PageHero imageSrc={assets.heroMain} sectionClassName="lg:!min-h-[82svh]">
      <MotionReveal
        className="grid w-full gap-8 sm:gap-10 lg:grid-cols-2 lg:items-end lg:gap-16 xl:gap-20"
        stagger={0.12}
        amount={0.1}
      >
        <div className="grid min-w-0 gap-4 sm:gap-6">
          <MotionRevealItem>
            <h1 className="max-w-[14ch] text-[clamp(2.7rem,12vw,4.15rem)] font-light uppercase leading-[1.02] tracking-[-0.03em] [overflow-wrap:anywhere] [text-wrap:balance]">
              Dealer samochodów klasy premium
            </h1>
          </MotionRevealItem>
        </div>

        <div className="grid min-w-0 gap-4 sm:gap-6">
          <MotionRevealItem>
            <p className="text-[0.92rem] font-medium uppercase tracking-[0.14em] text-white">
              Wyszukaj swój wymarzony samochód
            </p>
          </MotionRevealItem>

          <MotionRevealItem>
            <HeroSearch buttonLabel="Szukaj" buttonHref="/oferta" />
          </MotionRevealItem>
        </div>
      </MotionReveal>
    </PageHero>
  );
}
