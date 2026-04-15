'use client';

import Link from 'next/link';
import { collaborationPaths } from '@/data/oferta-page';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

export function CollaborationCTA() {
  const paths = [collaborationPaths.private, collaborationPaths.architect];

  return (
    <section className="section-block border-b border-zinc-200/60 bg-white">
      <div className="site-shell">
        <MotionReveal
          className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-16"
          stagger={0.12}
          amount={0.2}
        >
          {/* Left — header + CTA */}
          <div className="flex flex-col gap-8 lg:sticky lg:top-32 lg:self-start">
            <MotionRevealItem preset="slide-left">
              <p className="eyebrow text-zinc-500">Współpraca</p>
            </MotionRevealItem>

            <MotionRevealItem preset="blur-fade" duration={1}>
              <h2 className="max-w-[14ch] text-[clamp(1.85rem,5vw,3.4rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] [text-wrap:balance]">
                Dwie ścieżki. Jeden standard realizacji.
              </h2>
            </MotionRevealItem>

            <MotionRevealItem preset="fade-up">
              <p className="body-copy max-w-md">
                Niezależnie od ścieżki — realizacja zaczyna się od jednej rozmowy
                i kończy w jednym standardzie odpowiedzialności.
              </p>
            </MotionRevealItem>

            <MotionRevealItem>
              <Link className="btn-premium w-full sm:w-fit" href="/wycena">
                Zainicjuj projekt
              </Link>
            </MotionRevealItem>
          </div>

          {/* Right — two path cards: horizontal scroll on mobile, stacked on sm+ */}
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide sm:mx-0 sm:grid sm:gap-px sm:overflow-visible sm:bg-zinc-200/60 sm:px-0 sm:pb-0">
            {paths.map((path) => (
              <MotionRevealItem key={path.eyebrow} className="w-[85vw] flex-shrink-0 snap-start sm:w-auto" preset="slide-right">
                <div className="grid content-start gap-6 rounded-sm border border-zinc-200/60 bg-white p-6 sm:rounded-none sm:border-0 sm:p-8 lg:p-10">
                  <div className="grid gap-3">
                    <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-zinc-400">
                      {path.eyebrow}
                    </span>
                    <h3 className="text-xl font-semibold uppercase leading-[1.1] tracking-[-0.02em] text-zinc-950 sm:text-2xl">
                      {path.title}
                    </h3>
                    <div className="h-px w-10 bg-zinc-950" />
                  </div>

                  <ul className="grid gap-3">
                    {path.points.map((point) => (
                      <li
                        className="flex items-start gap-3 text-[0.86rem] leading-[1.75] text-zinc-500"
                        key={point}
                      >
                        <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <Link
                    className="btn-premium-ghost w-full sm:w-fit"
                    href={path.href}
                  >
                    {path.cta}
                  </Link>
                </div>
              </MotionRevealItem>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
