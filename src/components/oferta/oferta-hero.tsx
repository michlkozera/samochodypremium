'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

export function OfertaHero() {
  return (
    <PageHero
      imageSrc={assets.heroOferta}
      sectionClassName="!min-h-[58svh] lg:!min-h-[64svh]"
      disableTextScrollEffect
    >
      <MotionReveal
        className="grid w-full flex-1 place-items-center gap-8 text-center sm:gap-10"
        stagger={0.14}
        amount={0.12}
      >
        <div className="grid min-w-0 justify-items-center gap-4 sm:gap-6">
          <MotionRevealItem duration={1.1}>
            <p className="inline-flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-white/78 sm:text-[0.72rem]">
              <Link
                href="/"
                className="transition-colors duration-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
              >
                Start
              </Link>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              <span>Oferta</span>
            </p>
          </MotionRevealItem>

          <MotionRevealItem duration={1.1}>
            <h1 className="mx-auto max-w-[14ch] text-[clamp(2.7rem,12vw,4.15rem)] font-medium uppercase leading-[1.02] tracking-[-0.03em] [overflow-wrap:anywhere] [text-wrap:balance]">
              Poznaj naszą ofertę
            </h1>
          </MotionRevealItem>

          <MotionRevealItem duration={1.1}>
            <Link
              href="/kontakt"
              className="home-cta text-white hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
            >
              Porozmawiaj z doradcą
              <svg className="home-cta-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
              <span className="home-cta-line" />
            </Link>
          </MotionRevealItem>
        </div>
      </MotionReveal>
    </PageHero>
  );
}
