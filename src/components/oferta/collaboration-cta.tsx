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
            <MotionRevealItem preset="blur-fade" duration={1}>
              <h2 className="section-title max-w-[14ch] !font-medium">
                Poznaj dwie ścieżki współpracy.
              </h2>
            </MotionRevealItem>

            <MotionRevealItem preset="fade-up">
              <p className="max-w-md text-[0.95rem] leading-[1.8] text-zinc-600">
                Wybierz tę sieżkę, która najlepiej odpowiada Twoim potrzebom. A my postaramy się, by współpraca była dla Ciebie jak najbardziej satysfakcjonująca.
              </p>
            </MotionRevealItem>

            <MotionRevealItem>
              <Link className="home-cta w-full justify-center text-zinc-950 hover:text-zinc-700 sm:w-fit sm:justify-start" href="/wycena">
                Skontaktuj się z nami
                <svg className="home-cta-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
                <span className="home-cta-line" />
              </Link>
            </MotionRevealItem>
          </div>

          {/* Right — two path cards: horizontal scroll on mobile, stacked on sm+ */}
          <div className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide sm:mx-0 sm:grid sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0">
            {paths.map((path) => (
              <MotionRevealItem key={path.eyebrow} className="w-[85vw] flex-shrink-0 snap-start sm:w-auto" preset="slide-right">
                <div
                  data-shadow-hover="true"
                  className="premium-card-shadow grid content-start gap-7 bg-white p-6 sm:p-8 lg:p-10"
                >
                  <div className="grid gap-3">
                    <span className="text-[0.66rem] font-medium uppercase tracking-[0.2em] text-zinc-500">
                      {path.eyebrow}
                    </span>
                    <h3 className="text-[clamp(1.2rem,2.2vw,1.7rem)] font-medium uppercase leading-[1.12] tracking-[-0.02em] text-zinc-950">
                      {path.title}
                    </h3>
                    <div className="h-px w-10 bg-zinc-950" />
                  </div>

                  <ul className="grid gap-3">
                    {path.points.map((point) => (
                      <li
                        className="flex items-start gap-3 text-[0.92rem] leading-[1.75] text-zinc-600"
                        key={point}
                      >
                        <span className="mt-2.5 block h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-400" />
                        {point}
                      </li>
                    ))}
                  </ul>

                  <Link
                    className="home-cta w-full justify-center text-zinc-950 hover:text-zinc-700 sm:w-fit sm:justify-start"
                    href={path.href}
                  >
                    {path.cta}
                    <svg className="home-cta-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                    </svg>
                    <span className="home-cta-line" />
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
