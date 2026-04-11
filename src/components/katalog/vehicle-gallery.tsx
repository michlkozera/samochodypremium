'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type VehicleGalleryProps = {
  images: string[];
  alt: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;
const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Crect width='1600' height='900' fill='%23f4f4f5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2371717a' font-family='Arial' font-size='48'%3EBrak zdjecia%3C/text%3E%3C/svg%3E";

export function VehicleGallery({ images, alt }: VehicleGalleryProps) {
  const rm = useReducedMotion();
  const safeImages = images.length > 0 ? images : [PLACEHOLDER];
  const total = safeImages.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const displayed = Math.min(activeIndex, total - 1);

  /* ── Touch / swipe ── */
  const touch = useRef({ x: 0, y: 0, t: 0 });

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };

  const buildOnTouchEnd = (onNext: () => void, onPrev: () => void) =>
    (e: React.TouchEvent) => {
      const dx = touch.current.x - e.changedTouches[0].clientX;
      const dy = touch.current.y - e.changedTouches[0].clientY;
      const elapsed = Date.now() - touch.current.t;
      if (
        Math.abs(dx) > Math.abs(dy) * 1.5 &&
        Math.abs(dx) > 44 &&
        elapsed < 450
      ) {
        dx > 0 ? onNext() : onPrev();
      }
    };

  /* ── Navigation ── */
  const prev = useCallback(
    () => setActiveIndex((i) => (i - 1 + total) % total),
    [total],
  );
  const next = useCallback(
    () => setActiveIndex((i) => (i + 1) % total),
    [total],
  );

  const onTouchEnd = buildOnTouchEnd(next, prev);
  const onTouchEndFs = buildOnTouchEnd(next, prev);

  /* ── Body scroll lock when fullscreen ── */
  useEffect(() => {
    document.body.classList.toggle('gallery-open', isFullscreen);
    return () => document.body.classList.remove('gallery-open');
  }, [isFullscreen]);

  /* ── Keyboard nav (fullscreen) ── */
  useEffect(() => {
    if (!isFullscreen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsFullscreen(false);
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isFullscreen, next, prev]);

  const src = safeImages[displayed] ?? safeImages[0];
  const imgTransition = rm ? { duration: 0 } : { duration: 0.38, ease: EASE };

  /* ── Shared nav button atoms ── */
  const ArrowBtn = ({
    dir,
    onClick,
    className,
  }: {
    dir: 'left' | 'right';
    onClick: () => void;
    className?: string;
  }) => (
    <button
      aria-label={dir === 'left' ? 'Poprzednie zdjęcie' : 'Następne zdjęcie'}
      className={[
        'flex items-center justify-center border border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/75 active:bg-black/90',
        className ?? '',
      ].join(' ')}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      type="button"
    >
      <svg
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        viewBox="0 0 24 24"
      >
        {dir === 'left' ? (
          <path d="M15.75 19.5 8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="m8.25 4.5 7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );

  /* ── Dot indicators ── */
  const Dots = ({
    dark = false,
    interactive = true,
  }: {
    dark?: boolean;
    interactive?: boolean;
  }) => (
    <div className="flex items-center gap-1.5">
      {safeImages.map((_, i) => {
        const isActive = i === displayed;
        const base = dark ? 'bg-zinc-950' : 'bg-white';
        const dim = dark ? 'bg-zinc-300' : 'bg-white/50';
        return interactive ? (
          <button
            key={i}
            aria-label={`Zdjęcie ${i + 1}`}
            className={[
              'block h-[2px] transition-all duration-300 focus-visible:outline-none',
              isActive ? `w-6 ${base}` : `w-2.5 ${dim}`,
            ].join(' ')}
            onClick={() => setActiveIndex(i)}
            type="button"
          />
        ) : (
          <div
            key={i}
            className={[
              'h-[2px] transition-all duration-300',
              isActive ? `w-6 ${base}` : `w-2.5 ${dim}`,
            ].join(' ')}
          />
        );
      })}
    </div>
  );

  return (
    <>
      {/* ── Main gallery ── */}
      <div className="overflow-hidden border border-zinc-200 bg-white">

        {/* Primary image */}
        <div
          className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-zinc-100 select-none sm:aspect-[16/9]"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={() => setIsFullscreen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setIsFullscreen(true)}
          aria-label="Otwórz galerię pełnoekranową"
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              animate={rm ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              className="absolute inset-0"
              exit={rm ? { opacity: 0 } : { opacity: 0, scale: 1.025 }}
              initial={rm ? { opacity: 0 } : { opacity: 0, scale: 1.015 }}
              key={src}
              transition={imgTransition}
            >
              <Image
                alt={`${alt} – zdjęcie ${displayed + 1}`}
                className="h-full w-full object-cover"
                fill
                priority={displayed === 0}
                sizes="(max-width: 1024px) 100vw, 60vw"
                src={src}
              />
            </motion.div>
          </AnimatePresence>

          {/* Gradient */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.04)_40%,rgba(0,0,0,0.38)_100%)]" />

          {/* Top-left counter */}
          <div className="absolute left-0 top-0 z-10 flex items-stretch">
            <div className="border-b border-r border-white/20 bg-black/55 px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
              {String(displayed + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(total).padStart(2, '0')}
            </div>
            {/* Expand */}
            <button
              aria-label="Powiększ galerię"
              className="border-b border-white/20 bg-black/55 px-3 py-2 text-white/80 backdrop-blur-sm transition-colors duration-200 active:bg-black/80"
              onClick={(e) => { e.stopPropagation(); setIsFullscreen(true); }}
              type="button"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Desktop arrows (hidden on mobile — use swipe) */}
          {total > 1 && (
            <>
              <ArrowBtn
                dir="left"
                onClick={prev}
                className="absolute left-0 top-1/2 z-10 hidden h-14 w-11 -translate-y-1/2 border-y border-r sm:flex"
              />
              <ArrowBtn
                dir="right"
                onClick={next}
                className="absolute right-0 top-1/2 z-10 hidden h-14 w-11 -translate-y-1/2 border-y border-l sm:flex"
              />
            </>
          )}

          {/* Mobile edge-tap zones (invisible) */}
          {total > 1 && (
            <div className="pointer-events-auto absolute inset-0 flex sm:hidden" onClick={(e) => e.stopPropagation()}>
              <button className="h-full w-1/3" onClick={prev} type="button" aria-label="Poprzednie zdjęcie" />
              <div className="h-full flex-1" />
              <button className="h-full w-1/3" onClick={next} type="button" aria-label="Następne zdjęcie" />
            </div>
          )}

          {/* Bottom dots */}
          {total > 1 && (
            <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 pointer-events-none">
              <Dots interactive={false} />
            </div>
          )}

          {/* Swipe hint — mobile only, fades after first image change */}
          {total > 1 && displayed === 0 && (
            <div className="pointer-events-none absolute bottom-8 left-1/2 z-10 -translate-x-1/2 sm:hidden">
              <div className="flex items-center gap-1.5 rounded-full bg-black/40 px-3 py-1 backdrop-blur-sm">
                <svg className="h-3 w-3 text-white/70" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path d="M8 7l4-4m0 0l4 4m-4-4v18" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="text-[0.58rem] font-medium uppercase tracking-[0.18em] text-white/70">przesuń</span>
              </div>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {total > 1 && (
          <div className="scrollbar-hide flex snap-x snap-mandatory gap-1.5 overflow-x-auto p-2 sm:gap-2 sm:p-3">
            {safeImages.map((img, i) => {
              const isAct = i === displayed;
              return (
                <button
                  key={`thumb-${i}`}
                  aria-label={`Pokaż zdjęcie ${i + 1}`}
                  className={[
                    'relative h-[3.25rem] w-[4.5rem] flex-shrink-0 snap-start overflow-hidden border bg-zinc-100 transition-all duration-200 sm:h-16 sm:w-24',
                    isAct
                      ? 'border-zinc-950'
                      : 'border-zinc-200 opacity-55 hover:border-zinc-500 hover:opacity-100',
                  ].join(' ')}
                  onClick={() => setActiveIndex(i)}
                  type="button"
                >
                  <Image
                    alt=""
                    className="h-full w-full object-cover"
                    fill
                    sizes="96px"
                    src={img}
                  />
                  {isAct && (
                    <div className="absolute inset-x-0 bottom-0 h-[2px] bg-zinc-950" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* ── Fullscreen overlay ── */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[70] flex flex-col bg-zinc-950"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            style={{
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
            transition={{ duration: 0.28, ease: EASE }}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEndFs}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-zinc-400 line-clamp-1 max-w-[12rem]">
                  {alt}
                </span>
                <span className="shrink-0 text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-zinc-600">
                  {String(displayed + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(total).padStart(2, '0')}
                </span>
              </div>
              <button
                aria-label="Zamknij galerię"
                className="flex h-10 w-10 items-center justify-center border border-white/20 text-white transition-colors duration-200 hover:border-white hover:bg-white hover:text-zinc-950"
                onClick={() => setIsFullscreen(false)}
                type="button"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                  <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            {/* Main image */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={`fs-${src}`}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.24, ease: EASE }}
                >
                  <Image
                    alt={`${alt} – fullscreen ${displayed + 1}`}
                    className="h-full w-full object-contain"
                    fill
                    priority
                    sizes="100vw"
                    src={src}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Desktop arrows fullscreen */}
              {total > 1 && (
                <>
                  <ArrowBtn
                    dir="left"
                    onClick={prev}
                    className="absolute left-0 top-1/2 z-10 hidden h-16 w-12 -translate-y-1/2 border-y border-r sm:flex"
                  />
                  <ArrowBtn
                    dir="right"
                    onClick={next}
                    className="absolute right-0 top-1/2 z-10 hidden h-16 w-12 -translate-y-1/2 border-y border-l sm:flex"
                  />
                </>
              )}

              {/* Mobile dot row in fullscreen */}
              {total > 1 && (
                <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 sm:hidden">
                  <Dots />
                </div>
              )}
            </div>

            {/* Thumbnails fullscreen */}
            {total > 1 && (
              <div className="scrollbar-hide flex gap-1.5 overflow-x-auto border-t border-white/10 px-4 py-3 sm:px-6">
                {safeImages.map((img, i) => {
                  const isAct = i === displayed;
                  return (
                    <button
                      key={`fs-thumb-${i}`}
                      aria-label={`Pokaż zdjęcie ${i + 1}`}
                      className={[
                        'relative h-12 w-16 flex-shrink-0 overflow-hidden border transition-all duration-200 sm:h-14 sm:w-20',
                        isAct
                          ? 'border-white'
                          : 'border-white/20 opacity-50 hover:opacity-80',
                      ].join(' ')}
                      onClick={() => setActiveIndex(i)}
                      type="button"
                    >
                      <Image
                        alt=""
                        className="h-full w-full object-cover"
                        fill
                        sizes="80px"
                        src={img}
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
