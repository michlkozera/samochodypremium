'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { useRef, useState } from 'react';
import { ofertaSlides } from '@/data/oferta';
import { AppImage } from '@/components/ui/app-image';

const ease = [0.22, 1, 0.36, 1] as const;
const softEase = [0.16, 1, 0.3, 1] as const;

const imgVariants: Variants = {
  hidden: { opacity: 0, scale: 1.06, filter: 'blur(12px)' },
  visible: {
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.78, ease },
  },
  exit: {
    opacity: 0, scale: 0.975, filter: 'blur(6px)',
    transition: { duration: 0.34, ease: 'easeOut' },
  },
};

const numVariants: Variants = {
  hidden: { opacity: 0, y: 48, filter: 'blur(10px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease },
  },
  exit: {
    opacity: 0, y: -28, filter: 'blur(5px)',
    transition: { duration: 0.28, ease: 'easeOut' },
  },
};

const panelVariants: Variants = {
  hidden: { opacity: 0, x: 22, filter: 'blur(6px)' },
  visible: {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: 0.52, ease: softEase, staggerChildren: 0.06, delayChildren: 0.05 },
  },
  exit: {
    opacity: 0, x: -14, filter: 'blur(3px)',
    transition: { duration: 0.24, ease: 'easeOut' },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: softEase } },
};

const TAB_LABELS = ['Kuchnie', 'Garderoby', 'Salon i biblioteki', 'B2B'] as const;
const TAB_SHORT = ['Kuch.', 'Gard.', 'Salon', 'B2B'] as const;

export function OfferSlider() {
  const [index, setIndex] = useState(0);
  const rm = useReducedMotion();
  const slide = ofertaSlides[index];
  const total = ofertaSlides.length;
  const touchStartX = useRef(0);

  const goTo = (n: number) => setIndex(Math.max(0, Math.min(n, total - 1)));

  return (
    <div
      className="w-full overflow-hidden border border-white/[0.06]"
      aria-label="Kategorie oferty"
      aria-roledescription="carousel"
    >
      {/* ── Tab navigation ── */}
      <nav
        className="grid border-b border-white/[0.06]"
        style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 1fr))` }}
        role="tablist"
        aria-label="Kategorie oferty"
      >
        {TAB_LABELS.map((label, i) => {
          const isActive = i === index;
          return (
            <button
              key={label}
              role="tab"
              aria-selected={isActive}
              onClick={() => setIndex(i)}
              type="button"
              className={[
                'relative grid gap-1 border-r border-white/[0.06] px-3 py-3 text-left transition-colors duration-300 last:border-r-0',
                'sm:px-4 sm:py-4 lg:px-6 lg:py-5',
                isActive
                  ? 'bg-white text-zinc-950'
                  : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-200',
              ].join(' ')}
            >
              <span
                className={[
                  'text-[0.5rem] font-semibold uppercase tracking-[0.34em]',
                  isActive ? 'text-zinc-400' : 'text-current/40',
                ].join(' ')}
              >
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="hidden text-[0.62rem] font-semibold uppercase leading-tight tracking-[0.18em] sm:block lg:text-[0.68rem]">
                {label}
              </span>
              <span className="text-[0.58rem] font-semibold uppercase leading-tight tracking-[0.18em] sm:hidden">
                {TAB_SHORT[i]}
              </span>
              {isActive && (
                <motion.span
                  layoutId="offer-tab-indicator"
                  className="absolute inset-x-0 bottom-0 h-[2px] bg-zinc-950"
                  transition={{ duration: 0.38, ease }}
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* ── Main slide area ── */}
      <div
        className="grid lg:grid-cols-[minmax(0,1.15fr)_minmax(22rem,0.85fr)] lg:h-[48rem]"
        onTouchStart={(e) => { touchStartX.current = e.changedTouches[0].clientX; }}
        onTouchEnd={(e) => {
          const delta = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 48) goTo(delta > 0 ? index + 1 : index - 1);
        }}
      >
        {/* ── Image column ── */}
        <div className="relative min-h-[22rem] overflow-hidden border-b border-white/[0.06] sm:min-h-[28rem] lg:min-h-0 lg:border-b-0 lg:border-r lg:border-white/[0.06]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`img-${index}`}
              className="absolute inset-0"
              variants={rm ? undefined : imgVariants}
              initial={rm ? { opacity: 0 } : 'hidden'}
              animate={rm ? { opacity: 1 } : 'visible'}
              exit={rm ? { opacity: 0 } : 'exit'}
            >
              <AppImage
                alt={slide.alt}
                className="h-full w-full object-cover grayscale"
                loading="lazy"
                sizes="(min-width: 1024px) 58vw, 100vw"
                src={slide.image}
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(9,9,11,0.15)_0%,rgba(9,9,11,0.42)_50%,rgba(9,9,11,0.9)_100%)]" />
            </motion.div>
          </AnimatePresence>

          {/* Image overlay */}
          <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6 lg:p-7">
            {/* Top row */}
            <div className="flex items-start justify-between gap-4">
              <span className="eyebrow text-zinc-300">{slide.tag}</span>
              <span className="eyebrow text-zinc-500">
                {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
              </span>
            </div>

            {/* Large decorative number */}
            <div className="overflow-hidden">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={`num-${index}`}
                  className="block select-none font-semibold leading-none tracking-[-0.18em] text-white/[0.07]"
                  style={{ fontSize: 'clamp(7.5rem, 18vw, 18rem)' }}
                  variants={rm ? undefined : numVariants}
                  initial={rm ? { opacity: 0 } : 'hidden'}
                  animate={rm ? { opacity: 1 } : 'visible'}
                  exit={rm ? { opacity: 0 } : 'exit'}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* ── Content column ── */}
        <div className="overflow-y-auto bg-zinc-950">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`content-${index}`}
              className="divide-y divide-white/[0.07]"
              variants={rm ? undefined : panelVariants}
              initial={rm ? { opacity: 0 } : 'hidden'}
              animate={rm ? { opacity: 1 } : 'visible'}
              exit={rm ? { opacity: 0 } : 'exit'}
            >
              {/* Title & copy */}
              <motion.div className="grid gap-4 p-5 sm:p-6" variants={itemVariants}>
                <h3
                  className="font-semibold uppercase leading-[0.88] tracking-[-0.07em] text-white"
                  style={{ fontSize: 'clamp(1.75rem, 2.8vw, 3rem)' }}
                >
                  {slide.title}
                </h3>
                <p className="text-sm leading-7 text-zinc-300 sm:text-[0.95rem]">{slide.copy}</p>
              </motion.div>

              {/* Detailed description */}
              <motion.div className="grid gap-2 p-5 sm:p-6" variants={itemVariants}>
                <span className="eyebrow text-zinc-500">Realizacja / detal</span>
                <p className="text-sm leading-7 text-zinc-400">{slide.detail}</p>
              </motion.div>

              {/* Metrics grid */}
              <motion.div
                className="grid grid-cols-2 gap-px bg-white/[0.06]"
                variants={itemVariants}
              >
                {slide.metrics.map(([label, value]) => (
                  <div key={label} className="grid gap-2 bg-zinc-950 p-4">
                    <span className="eyebrow text-zinc-500">{label}</span>
                    <strong className="text-[0.7rem] uppercase leading-5 tracking-[0.06em] text-white">
                      {value}
                    </strong>
                  </div>
                ))}
              </motion.div>

              {/* Note */}
              <motion.div className="p-5 sm:p-6" variants={itemVariants}>
                <p className="text-[0.68rem] uppercase leading-6 tracking-[0.18em] text-zinc-500">
                  {slide.note}
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-col gap-2.5 p-5 sm:flex-row sm:p-6"
                variants={itemVariants}
              >
                <Link
                  href="/kontakt"
                  className="btn-premium-light w-full sm:w-auto"
                >
                  Zapytaj o realizację
                </Link>
                <Link
                  href="/wycena"
                  className="btn-premium-ghost w-full border-white/20 text-white/80 hover:border-white/50 hover:text-white sm:w-auto"
                >
                  Sprawdź wycenę
                </Link>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom navigation bar ── */}
      <div className="flex items-center justify-between border-t border-white/[0.06] bg-zinc-950/60 px-5 py-3 backdrop-blur-sm">
        {/* Progress dots */}
        <div className="flex items-center gap-2">
          {ofertaSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              type="button"
              aria-label={`${TAB_LABELS[i]} – zakres ${i + 1}`}
              className={[
                'block h-[3px] transition-all duration-400 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60',
                i === index ? 'w-8 bg-white' : 'w-2.5 bg-white/20 hover:bg-white/45',
              ].join(' ')}
            />
          ))}
        </div>

        {/* Arrow navigation */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            type="button"
            aria-label="Poprzednia kategoria"
            className="inline-flex h-9 w-9 items-center justify-center border border-white/14 text-base text-white transition duration-200 hover:border-white hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
          >
            ←
          </button>
          <button
            onClick={() => goTo(index + 1)}
            disabled={index === total - 1}
            type="button"
            aria-label="Nastepna kategoria"
            className="inline-flex h-9 w-9 items-center justify-center border border-white/14 text-base text-white transition duration-200 hover:border-white hover:bg-white/8 disabled:cursor-not-allowed disabled:opacity-20 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/60"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
