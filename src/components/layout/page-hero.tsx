'use client';

import type { ReactNode } from 'react';
import type { StaticImageData } from 'next/image';
import Link from 'next/link';
import { HeroBackground, useHeroScroll } from '@/components/home/hero-background';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

type PageHeroAction = {
  href: string;
  label: string;
};

type PageHeroProps = {
  imageSrc: string | StaticImageData;
  eyebrow?: ReactNode;
  title?: ReactNode;
  description?: ReactNode;
  actions?: PageHeroAction[];
  searchComponent?: ReactNode;
  children?: ReactNode;
  sectionClassName?: string;
  contentClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

const baseSectionClassName =
  'relative isolate h-[100svh] min-h-[600px] overflow-hidden bg-black text-white';
const baseContentClassName = 'grid min-w-0 max-w-4xl gap-5 sm:gap-6';
const baseTitleClassName =
  'max-w-[18ch] text-[clamp(2rem,10vw,5.2rem)] font-bold uppercase leading-[1.03] tracking-[-0.03em] [overflow-wrap:anywhere] [text-wrap:balance] sm:leading-[1.05]';
const baseDescriptionClassName =
  'max-w-xl text-[0.95rem] leading-[1.78] text-zinc-300 sm:text-base sm:leading-[1.85]';

export function PageHero({
  imageSrc,
  eyebrow,
  title,
  description,
  actions = [],
  searchComponent,
  children,
  sectionClassName,
  contentClassName,
  titleClassName,
  descriptionClassName,
}: PageHeroProps) {
  const { textRef, bgRef } = useHeroScroll();

  return (
    <section className={[baseSectionClassName, sectionClassName].filter(Boolean).join(' ')}>
      <div className="absolute inset-0 overflow-hidden">
        <HeroBackground src={imageSrc} alt="" bgRef={bgRef} />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.25)_0%,rgba(0,0,0,0.55)_50%,rgba(0,0,0,0.82)_100%)]" />

      <div
        ref={textRef}
        className="site-shell relative z-10 flex h-full w-full flex-col justify-end pb-10 pt-[calc(var(--site-header-h)+1.5rem)] sm:pb-14 lg:pb-16"
        style={{ willChange: 'transform, opacity' }}
      >
        {children ? (
          children
        ) : (
          <MotionReveal
            className="grid w-full gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(14rem,0.3fr)] lg:items-end lg:gap-12 xl:gap-16"
            stagger={0.12}
            amount={0.15}
          >
            <div className={[baseContentClassName, contentClassName].filter(Boolean).join(' ')}>
              {eyebrow ? (
                <MotionRevealItem>
                  <div className="eyebrow border-zinc-500 text-[0.78rem] text-zinc-400 sm:text-[0.7rem]">{eyebrow}</div>
                </MotionRevealItem>
              ) : null}

              {title ? (
                <MotionRevealItem>
                  <h1 className={[baseTitleClassName, titleClassName].filter(Boolean).join(' ')}>{title}</h1>
                </MotionRevealItem>
              ) : null}

              {description ? (
                <MotionRevealItem>
                  <p className={[baseDescriptionClassName, descriptionClassName].filter(Boolean).join(' ')}>
                    {description}
                  </p>
                </MotionRevealItem>
              ) : null}

              {searchComponent ? (
                <MotionRevealItem>
                  <div className="mt-2 sm:mt-4 max-w-2xl">
                    {searchComponent}
                  </div>
                </MotionRevealItem>
              ) : null}
            </div>

            {actions.length ? (
              <MotionRevealItem className="flex min-w-0 justify-end">
                <div className="flex min-w-0 w-full flex-col gap-3 sm:w-fit">
                  {actions.map((action) => (
                    <Link
                      key={action.href}
                      className="btn-premium-ghost min-h-14 w-full border-white/20 px-6 text-center text-[0.68rem] tracking-[0.18em] text-white/80 hover:border-white/50 hover:bg-white hover:text-zinc-950 sm:w-fit sm:px-10 sm:text-[0.75rem] sm:tracking-[0.24em]"
                      href={action.href}
                    >
                      {action.label}
                    </Link>
                  ))}
                </div>
              </MotionRevealItem>
            ) : null}
          </MotionReveal>
        )}
      </div>
    </section>
  );
}
