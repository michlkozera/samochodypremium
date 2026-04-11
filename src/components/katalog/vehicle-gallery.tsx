'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

type VehicleGalleryProps = {
  images: string[];
  alt: string;
};

const EASE = [0.16, 1, 0.3, 1] as const;
const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Crect width='1600' height='900' fill='%23f4f4f5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%2371717a' font-family='Arial' font-size='48'%3EBrak zdjecia%3C/text%3E%3C/svg%3E";

export function VehicleGallery({ images, alt }: VehicleGalleryProps) {
  const shouldReduceMotion = useReducedMotion();
  const safeImages = images.length > 0 ? images : [PLACEHOLDER_IMAGE];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const displayedIndex = Math.min(activeIndex, safeImages.length - 1);

  const goToPrevious = useCallback(() => {
    setActiveIndex((current) => (current - 1 + safeImages.length) % safeImages.length);
  }, [safeImages.length]);

  const goToNext = useCallback(() => {
    setActiveIndex((current) => (current + 1) % safeImages.length);
  }, [safeImages.length]);

  useEffect(() => {
    document.body.classList.toggle('gallery-open', isFullscreen);
    return () => document.body.classList.remove('gallery-open');
  }, [isFullscreen]);

  useEffect(() => {
    if (!isFullscreen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsFullscreen(false);
      if (event.key === 'ArrowLeft') goToPrevious();
      if (event.key === 'ArrowRight') goToNext();
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [goToNext, goToPrevious, isFullscreen]);

  const activeImage = safeImages[displayedIndex] ?? safeImages[0];
  const imageTransition = shouldReduceMotion ? { duration: 0 } : { duration: 0.42, ease: EASE };

  return (
    <>
      {/* ── Main gallery ── */}
      <div className="border border-zinc-200 bg-white p-3 sm:p-4">

        {/* Primary image */}
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 sm:aspect-[16/9]">
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0"
              exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.02 }}
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.015 }}
              key={activeImage}
              transition={imageTransition}
            >
              <Image
                alt={`${alt} – zdjęcie ${displayedIndex + 1}`}
                className="h-full w-full object-cover"
                fill
                priority={displayedIndex === 0}
                sizes="(max-width: 1024px) 100vw, 60vw"
                src={activeImage}
              />
            </motion.div>
          </AnimatePresence>

          {/* Dark gradient overlay */}
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.06)_38%,rgba(0,0,0,0.38)_100%)]" />

          {/* Top-left: counter + expand */}
          <div className="absolute left-0 top-0 z-10 flex items-stretch">
            <div className="border-b border-r border-white/20 bg-black/50 px-3 py-2 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
              {String(displayedIndex + 1).padStart(2, '0')} / {String(safeImages.length).padStart(2, '0')}
            </div>
            <button
              aria-label="Powiększ galerię"
              className="border-b border-white/20 bg-black/50 px-3 py-2 text-white/80 backdrop-blur-sm transition-colors duration-200 hover:bg-black/70 hover:text-white"
              onClick={() => setIsFullscreen(true)}
              type="button"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Navigation arrows — always visible when multiple images */}
          {safeImages.length > 1 && (
            <>
              <button
                aria-label="Poprzednie zdjęcie"
                className="absolute left-0 top-1/2 z-10 flex h-14 w-10 -translate-y-1/2 items-center justify-center border-y border-r border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/75 sm:h-16 sm:w-12"
                onClick={goToPrevious}
                type="button"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path d="M15.75 19.5 8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                aria-label="Następne zdjęcie"
                className="absolute right-0 top-1/2 z-10 flex h-14 w-10 -translate-y-1/2 items-center justify-center border-y border-l border-white/20 bg-black/50 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/75 sm:h-16 sm:w-12"
                onClick={goToNext}
                type="button"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path d="m8.25 4.5 7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          {/* Bottom dot progress */}
          {safeImages.length > 1 && (
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1.5">
              {safeImages.map((_, i) => (
                <button
                  key={i}
                  aria-label={`Przejdź do zdjęcia ${i + 1}`}
                  className={[
                    'block h-[2px] transition-all duration-300 focus-visible:outline-none',
                    i === displayedIndex ? 'w-6 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80',
                  ].join(' ')}
                  onClick={() => setActiveIndex(i)}
                  type="button"
                />
              ))}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {safeImages.length > 1 && (
          <div className="scrollbar-hide mt-3 flex gap-2 overflow-x-auto">
            {safeImages.map((image, index) => {
              const isActive = index === displayedIndex;
              return (
                <button
                  aria-label={`Pokaż zdjęcie ${index + 1}`}
                  className={[
                    'relative h-16 w-24 flex-shrink-0 overflow-hidden border bg-zinc-100 transition-all duration-200 sm:h-20 sm:w-32',
                    isActive
                      ? 'border-zinc-950'
                      : 'border-zinc-200 opacity-60 hover:border-zinc-500 hover:opacity-100',
                  ].join(' ')}
                  key={`${image}-${index}`}
                  onClick={() => setActiveIndex(index)}
                  type="button"
                >
                  <Image
                    alt={`${alt} – miniatura ${index + 1}`}
                    className="h-full w-full object-cover"
                    fill
                    sizes="128px"
                    src={image}
                  />
                  {isActive && (
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
            className="fixed inset-0 z-[70] flex flex-col bg-zinc-950 p-4 sm:p-6"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-4">
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-zinc-400">
                  {alt}
                </span>
                <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  {String(displayedIndex + 1).padStart(2, '0')} / {String(safeImages.length).padStart(2, '0')}
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

            {/* Image */}
            <div className="relative flex-1 overflow-hidden">
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  animate={{ opacity: 1 }}
                  className="absolute inset-0"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                  key={`fullscreen-${activeImage}`}
                  transition={{ duration: 0.28, ease: EASE }}
                >
                  <Image
                    alt={`${alt} – fullscreen ${displayedIndex + 1}`}
                    className="h-full w-full object-contain"
                    fill
                    priority
                    sizes="100vw"
                    src={activeImage}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Fullscreen navigation */}
              {safeImages.length > 1 && (
                <>
                  <button
                    aria-label="Poprzednie zdjęcie"
                    className="absolute left-0 top-1/2 z-10 flex h-16 w-12 -translate-y-1/2 items-center justify-center border-y border-r border-white/20 bg-black/50 text-white transition-colors duration-200 hover:bg-black/80"
                    onClick={goToPrevious}
                    type="button"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="M15.75 19.5 8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  <button
                    aria-label="Następne zdjęcie"
                    className="absolute right-0 top-1/2 z-10 flex h-16 w-12 -translate-y-1/2 items-center justify-center border-y border-l border-white/20 bg-black/50 text-white transition-colors duration-200 hover:bg-black/80"
                    onClick={goToNext}
                    type="button"
                  >
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                      <path d="m8.25 4.5 7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Fullscreen thumbnails */}
            {safeImages.length > 1 && (
              <div className="scrollbar-hide flex gap-2 overflow-x-auto border-t border-white/10 pt-4">
                {safeImages.map((image, index) => {
                  const isActive = index === displayedIndex;
                  return (
                    <button
                      aria-label={`Pokaż zdjęcie ${index + 1}`}
                      className={[
                        'relative h-14 w-20 flex-shrink-0 overflow-hidden border transition-all duration-200 sm:h-16 sm:w-24',
                        isActive ? 'border-white' : 'border-white/20 opacity-50 hover:opacity-80',
                      ].join(' ')}
                      key={`fs-thumb-${image}-${index}`}
                      onClick={() => setActiveIndex(index)}
                      type="button"
                    >
                      <Image
                        alt={`miniatura ${index + 1}`}
                        className="h-full w-full object-cover"
                        fill
                        sizes="96px"
                        src={image}
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
