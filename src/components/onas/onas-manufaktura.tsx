'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { AppImage } from '@/components/ui/app-image';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

export function OnasManufaktura() {
  return (
    <section className="section-block overflow-hidden border-b border-zinc-200/60 bg-zinc-50">
      <div className="site-shell">
        <MotionReveal
          className="grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
          stagger={0.14}
          amount={0.2}
        >
          {/* Text column */}
          <div className="flex flex-col justify-center gap-8 py-4 pr-0 lg:py-10 lg:pr-14 xl:pr-20">
            <MotionRevealItem preset="slide-left">
              <p className="eyebrow text-zinc-500">Salon</p>
            </MotionRevealItem>

            <MotionRevealItem preset="blur-fade" duration={1}>
              <h2 className="section-title max-w-[14ch]">
                Jeden standard obsługi na każdym etapie.
              </h2>
            </MotionRevealItem>

            <MotionRevealItem preset="fade-up">
              <p className="body-copy max-w-lg">
                Każdy samochód przechodzi pełną weryfikację w naszym centrum w Warszawie.
                Nadzorujemy cały proces: od historii pojazdu i inspekcji technicznej
                po detailing i przygotowanie dokumentacji.
              </p>
            </MotionRevealItem>

            <MotionRevealItem preset="slide-left">
              <div className="grid gap-px sm:grid-cols-3">
                {[
                  { value: '1500 m²', label: 'powierzchni ekspozycyjnej' },
                  { value: '150+', label: 'punktów inspekcji' },
                  { value: '100%', label: 'weryfikowanych pojazdów' },
                ].map((stat) => (
                  <div
                    className="grid gap-2 border-t border-zinc-200/60 py-5 pr-5 sm:first:border-t"
                    key={stat.label}
                  >
                    <span className="text-[clamp(1.2rem,2vw,1.55rem)] font-bold leading-none tracking-[-0.03em] text-zinc-950">
                      {stat.value}
                    </span>
                    <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-zinc-400">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </MotionRevealItem>

            <MotionRevealItem>
              <Link className="btn-premium w-full sm:w-fit" href="/kontakt">
                Umów wizytę w salonie
              </Link>
            </MotionRevealItem>
          </div>

          {/* Image column */}
          <MotionRevealItem className="relative min-h-[50vw] overflow-hidden lg:min-h-[540px]" preset="clip-up" duration={1.2}>
            <AppImage
              alt="Wnętrze salonu Samochody Premium"
              className="h-full w-full object-cover"
              loading="lazy"
              sizes="(max-width: 1024px) 100vw, 50vw"
              src={assets.showroom}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </MotionRevealItem>
        </MotionReveal>
      </div>
    </section>
  );
}
