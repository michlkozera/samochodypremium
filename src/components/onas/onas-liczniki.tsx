'use client';

import { assets } from '@/data/assets';
import { AppImage } from '@/components/ui/app-image';
import { CountUp } from '@/components/ui/count-up';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

export function OnasLiczniki() {
  return (
    <section className="section-block border-b border-zinc-200/60 bg-white">
      <div className="site-shell">
        <MotionReveal className="grid gap-10 lg:gap-14" stagger={0.08} amount={0.15}>
          {/* Header */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <MotionRevealItem preset="blur-fade">
              <div className="grid gap-4">
                <p className="eyebrow">O salonie</p>
                <h2 className="section-title">
                  Liczby, które mówią za nas.
                </h2>
              </div>
            </MotionRevealItem>
            <MotionRevealItem preset="blur-fade">
              <p className="body-copy max-w-lg lg:ml-auto lg:text-right">
                Każda cyfra potwierdza konsekwencję działania, jakość selekcji
                i standard obsługi, który utrzymujemy od lat.
              </p>
            </MotionRevealItem>
          </div>

          {/* Bento grid */}
          <div className="grid grid-cols-2 gap-px bg-zinc-200/60 lg:grid-cols-4">
            {/* Row 1 */}
            <MotionRevealItem className="relative col-span-1 aspect-[4/3] overflow-hidden" preset="clip-up" duration={1}>
              <AppImage
                alt="Samochód premium w salonie"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                loading="lazy"
                sizes="(max-width: 1024px) 50vw, 25vw"
                src={assets.sedan01}
              />
            </MotionRevealItem>

            <MotionRevealItem preset="scale-up">
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-white p-5">
                <span className="text-[clamp(1.9rem,3.6vw,3.1rem)] font-bold leading-none tracking-[-0.03em] text-zinc-950">
                  <CountUp value={12} />
                </span>
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-zinc-400">
                  lat na rynku
                </span>
              </div>
            </MotionRevealItem>

            <MotionRevealItem preset="scale-up">
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-white p-5">
                <span className="text-[clamp(1.9rem,3.6vw,3.1rem)] font-bold leading-none tracking-[-0.03em] text-zinc-950">
                  <CountUp value={800} />+
                </span>
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-zinc-400">
                  sprzedanych aut
                </span>
              </div>
            </MotionRevealItem>

            <MotionRevealItem className="relative col-span-1 aspect-[4/3] overflow-hidden" preset="clip-up" duration={1}>
              <AppImage
                alt="Showroom Samochody Premium"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                loading="lazy"
                sizes="(max-width: 1024px) 50vw, 25vw"
                src={assets.showroom}
              />
            </MotionRevealItem>

            {/* Row 2 */}
            <MotionRevealItem preset="scale-up">
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-white p-5">
                <span className="text-[clamp(1.9rem,3.6vw,3.1rem)] font-bold leading-none tracking-[-0.03em] text-zinc-950">
                  1500 m²
                </span>
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-zinc-400">
                  powierzchni ekspozycyjnej
                </span>
              </div>
            </MotionRevealItem>

            <MotionRevealItem className="relative col-span-1 aspect-[4/3] overflow-hidden" preset="clip-up" duration={1}>
              <AppImage
                alt="Wnętrze salonu"
                className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                loading="lazy"
                sizes="(max-width: 1024px) 50vw, 25vw"
                src={assets.interior01}
              />
            </MotionRevealItem>

            <MotionRevealItem preset="scale-up">
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-white p-5">
                <span className="text-[clamp(1.9rem,3.6vw,3.1rem)] font-bold leading-none tracking-[-0.03em] text-zinc-950">
                  <CountUp value={98} />%
                </span>
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-zinc-400">
                  zadowolonych klientów
                </span>
              </div>
            </MotionRevealItem>

            <MotionRevealItem preset="scale-up">
              <div className="flex aspect-[4/3] flex-col items-center justify-center gap-2 bg-white p-5">
                <span className="text-[clamp(1.9rem,3.6vw,3.1rem)] font-bold leading-none tracking-[-0.03em] text-zinc-950">
                  <CountUp value={2} />
                </span>
                <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-zinc-400">
                  lata gwarancji
                </span>
              </div>
            </MotionRevealItem>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
