'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { ofertaSlides } from '@/data/oferta';
import { AppImage } from '@/components/ui/app-image';

const ease = [0.22, 1, 0.36, 1] as const;
const softEase = [0.16, 1, 0.3, 1] as const;

export function MinimalistOfferSlider() {
  const [index, setIndex] = useState(0);
  const rm = useReducedMotion();
  const touchStartX = useRef(0);
  const slide = ofertaSlides[index];
  const total = ofertaSlides.length;

  const goTo = useCallback(
    (n: number) => setIndex(Math.max(0, Math.min(n, total - 1))),
    [total],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  return (
    <div
      className="relative w-full overflow-hidden bg-white"
      aria-roledescription="carousel"
      aria-label="Zakres usług"
    >
      {/* ── Engineering grid ── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(90deg, transparent calc(100% - 1px), #e4e4e7 calc(100% - 1px)),' +
            'linear-gradient(0deg, transparent calc(100% - 1px), #e4e4e7 calc(100% - 1px))',
          backgroundSize: '80px 80px',
        }}
      />

      {/* ── Main layout ── */}
      <div
        className="relative z-10 grid min-h-[100svh] lg:grid-cols-[1fr_1fr]"
        onTouchStart={(e) => {
          touchStartX.current = e.changedTouches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const delta = touchStartX.current - e.changedTouches[0].clientX;
          if (Math.abs(delta) > 48) goTo(delta > 0 ? index + 1 : index - 1);
        }}
      >
        {/* ── Image column ── */}
        <div className="relative min-h-[44vh] overflow-hidden border-b border-zinc-200/60 lg:min-h-0 lg:border-b-0 lg:border-r">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`img-${index}`}
              className="absolute inset-0"
              initial={rm ? { opacity: 0 } : { opacity: 0, scale: 1.04 }}
              animate={rm ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              exit={rm ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.7, ease }}
            >
              <AppImage
                alt={slide.alt}
                src={slide.image}
                className="h-full w-full object-cover grayscale"
                sizes="(min-width: 1024px) 50vw, 100vw"
                loading={index === 0 ? 'eager' : 'lazy'}
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/18 to-transparent" />
            </motion.div>
          </AnimatePresence>

          {/* Counter badge */}
          <div className="absolute right-0 top-0 z-10 border-b border-l border-zinc-200 bg-white px-4 py-3">
            <span className="eyebrow text-zinc-400">
              {String(index + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(total).padStart(2, '0')}
            </span>
          </div>

          {/* Large title overlay */}
          <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6 lg:p-8">
            <AnimatePresence mode="wait" initial={false}>
              <motion.h3
                key={`t-${index}`}
                className="font-semibold uppercase leading-[0.88] tracking-[-0.07em] text-white"
                style={{ fontSize: 'clamp(2rem, 5.5vw, 4rem)' }}
                initial={rm ? { opacity: 0 } : { opacity: 0, y: 16 }}
                animate={rm ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={rm ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: softEase }}
              >
                {slide.title}
              </motion.h3>
            </AnimatePresence>
          </div>

          {/* Decorative number */}
          <div className="pointer-events-none absolute bottom-6 right-6 z-10 hidden select-none lg:block">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={`n-${index}`}
                className="block font-semibold leading-none tracking-[-0.14em] text-white/[0.06]"
                style={{ fontSize: 'clamp(8rem, 14vw, 16rem)' }}
                initial={rm ? { opacity: 0 } : { opacity: 0, y: 30 }}
                animate={rm ? { opacity: 1 } : { opacity: 1, y: 0 }}
                exit={rm ? { opacity: 0 } : { opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease }}
              >
                {String(index + 1).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Content column ── */}
        <div className="relative flex flex-col overflow-y-auto bg-white">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`c-${index}`}
              className="flex flex-1 flex-col divide-y divide-zinc-200"
              initial={rm ? { opacity: 0 } : { opacity: 0, x: 18 }}
              animate={rm ? { opacity: 1 } : { opacity: 1, x: 0 }}
              exit={rm ? { opacity: 0 } : { opacity: 0, x: -12 }}
              transition={{ duration: 0.48, ease: softEase }}
            >
              {/* Tag + copy */}
              <div className="grid gap-4 p-5 sm:p-6 lg:p-8">
                <span className="eyebrow text-zinc-400">{slide.tag}</span>
                <p className="text-sm leading-7 text-zinc-700 sm:text-[0.95rem]">
                  {slide.copy}
                </p>
              </div>

              {/* Detail */}
              <div className="grid gap-2 p-5 sm:p-6 lg:p-8">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-zinc-400">
                  Realizacja / detal
                </span>
                <p className="text-sm leading-7 text-zinc-500">{slide.detail}</p>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-px bg-zinc-200">
                {slide.metrics.map(([label, value]) => (
                  <div key={label} className="grid gap-1.5 bg-white p-4 lg:p-5">
                    <span className="text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                      {label}
                    </span>
                    <strong className="text-[0.7rem] font-medium uppercase leading-5 tracking-[0.04em] text-zinc-800">
                      {value}
                    </strong>
                  </div>
                ))}
              </div>

              {/* Note */}
              <div className="p-5 sm:p-6 lg:p-8">
                <p className="text-[0.66rem] uppercase leading-6 tracking-[0.16em] text-zinc-400">
                  {slide.note}
                </p>
              </div>

              {/* CTAs */}
              <div className="mt-auto flex flex-col gap-2.5 border-t border-zinc-200/60 p-5 sm:flex-row sm:p-6 lg:p-8">
                <Link
                  href="/kontakt"
                  className="btn-premium w-full sm:w-auto"
                >
                  Zapytaj o realizację
                </Link>
                <Link
                  href="/wycena"
                  className="btn-premium-ghost w-full sm:w-auto"
                >
                  Sprawdź wycenę
                </Link>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Left arrow ── */}
      <button
        onClick={prev}
        disabled={index === 0}
        type="button"
        aria-label="Poprzednia kategoria"
        className="absolute left-0 top-1/2 z-20 flex h-20 w-10 -translate-y-1/2 items-center justify-center border-y border-r border-zinc-200/60 bg-white/80 disabled:pointer-events-none disabled:opacity-0 sm:h-28 sm:w-12 lg:h-36 lg:w-14"
      >
        <svg
          width="20"
          height="40"
          viewBox="0 0 20 40"
          fill="none"
          className="stroke-zinc-950"
          strokeWidth="1"
          aria-hidden="true"
        >
          <line x1="16" y1="4" x2="4" y2="20" vectorEffect="non-scaling-stroke" />
          <line x1="4" y1="20" x2="16" y2="36" vectorEffect="non-scaling-stroke" />
        </svg>
      </button>

      {/* ── Right arrow ── */}
      <button
        onClick={next}
        disabled={index === total - 1}
        type="button"
        aria-label="Nastepna kategoria"
        className="absolute right-0 top-1/2 z-20 flex h-20 w-10 -translate-y-1/2 items-center justify-center border-y border-l border-zinc-200/60 bg-white/80 disabled:pointer-events-none disabled:opacity-0 sm:h-28 sm:w-12 lg:h-36 lg:w-14"
      >
        <svg
          width="20"
          height="40"
          viewBox="0 0 20 40"
          fill="none"
          className="stroke-zinc-950"
          strokeWidth="1"
          aria-hidden="true"
        >
          <line x1="4" y1="4" x2="16" y2="20" vectorEffect="non-scaling-stroke" />
          <line x1="16" y1="20" x2="4" y2="36" vectorEffect="non-scaling-stroke" />
        </svg>
      </button>

      {/* ── Bottom dot navigation ── */}
      <nav
        className="absolute bottom-0 left-0 right-0 z-20 flex items-center justify-center gap-2.5 border-t border-zinc-200/60 bg-white/80 px-5 py-3.5 backdrop-blur-sm lg:left-auto lg:right-0 lg:w-1/2 lg:border-l"
        aria-label="Nawigacja slajdow"
      >
        {ofertaSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            type="button"
            aria-label={`Przejdz do zakresu ${i + 1}`}
            className={[
              'block h-[2px] transition-all duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-950',
              i === index ? 'w-8 bg-zinc-950' : 'w-3 bg-zinc-300',
            ].join(' ')}
          />
        ))}
      </nav>
    </div>
  );
}
