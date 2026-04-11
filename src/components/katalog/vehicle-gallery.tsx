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

function ArrowIcon({ direction }: { direction: 'left' | 'right' }) {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      {direction === 'left' ? (
        <path d="M15.75 19.5 8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="m8.25 4.5 7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function ExpandIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path
        d="M8.25 3.75H4.5v3.75M15.75 3.75h3.75v3.75M8.25 20.25H4.5V16.5M19.5 16.5v3.75h-3.75M8.25 3.75 3.75 8.25M20.25 8.25l-4.5-4.5M3.75 15.75l4.5 4.5M15.75 20.25l4.5-4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      viewBox="0 0 24 24"
    >
      <path d="M6 18 18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

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
    if (!isFullscreen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsFullscreen(false);
      }

      if (event.key === 'ArrowLeft') {
        goToPrevious();
      }

      if (event.key === 'ArrowRight') {
        goToNext();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [goToNext, goToPrevious, isFullscreen]);

  const activeImage = safeImages[displayedIndex] ?? safeImages[0];
  const imageTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.45, ease: EASE };

  return (
    <>
      <div className="offer-surface overflow-visible p-3 sm:p-4">
        <div
          aria-label={`${alt} - otworz galerie`}
          className="relative aspect-[16/10] overflow-hidden rounded-[1.45rem] bg-zinc-100 sm:aspect-[16/9]"
          onClick={() => setIsFullscreen(true)}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              setIsFullscreen(true);
            }
          }}
          role="button"
          tabIndex={0}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              animate={{ opacity: 1, scale: 1 }}
              className="absolute inset-0"
              exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.03 }}
              initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.02 }}
              key={activeImage}
              transition={imageTransition}
            >
              <Image
                alt={`${alt} - zdjecie ${displayedIndex + 1}`}
                className="h-full w-full object-cover"
                fill
                priority={displayedIndex === 0}
                sizes="(max-width: 1024px) 100vw, 60vw"
                src={activeImage}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.1)_0%,rgba(15,23,42,0.14)_38%,rgba(15,23,42,0.5)_100%)]" />

          <div className="absolute left-4 top-4 flex flex-wrap gap-2">
            <span className="offer-chip border-white/16 bg-black/35 text-white">
              {displayedIndex + 1} / {safeImages.length}
            </span>
            <span className="offer-chip border-white/16 bg-black/35 text-white">
              Kliknij, aby powiekszyc
            </span>
          </div>

          <button
            aria-label="Powieksz zdjecie"
            className="offer-control absolute right-4 top-4"
            onClick={(event) => {
              event.stopPropagation();
              setIsFullscreen(true);
            }}
            type="button"
          >
            <ExpandIcon />
          </button>

          {safeImages.length > 1 ? (
            <>
              <button
                aria-label="Poprzednie zdjecie"
                className="offer-control absolute left-4 top-1/2 -translate-y-1/2"
                onClick={(event) => {
                  event.stopPropagation();
                  goToPrevious();
                }}
                type="button"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                aria-label="Nastepne zdjecie"
                className="offer-control absolute right-4 top-1/2 -translate-y-1/2"
                onClick={(event) => {
                  event.stopPropagation();
                  goToNext();
                }}
                type="button"
              >
                <ArrowIcon direction="right" />
              </button>
            </>
          ) : null}
        </div>

        <div className="scrollbar-hide mt-3 flex gap-3 overflow-x-auto pb-1">
          {safeImages.map((image, index) => {
            const isActive = index === displayedIndex;

            return (
              <motion.button
                aria-label={`Pokaz zdjecie ${index + 1}`}
                className={[
                  'relative h-20 w-28 shrink-0 overflow-hidden rounded-[1.15rem] border bg-zinc-100 sm:h-24 sm:w-36',
                  isActive
                    ? 'border-zinc-950 shadow-[0_14px_34px_rgba(15,23,42,0.16)]'
                    : 'border-zinc-200/80 opacity-[0.72] hover:border-zinc-400 hover:opacity-100',
                ].join(' ')}
                key={`${image}-${index}`}
                onClick={() => setActiveIndex(index)}
                transition={{ duration: 0.3, ease: EASE }}
                type="button"
                whileHover={shouldReduceMotion ? undefined : { y: -2 }}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              >
                <Image
                  alt={`${alt} - miniatura ${index + 1}`}
                  className="h-full w-full object-cover"
                  fill
                  sizes="144px"
                  src={image}
                />
                <div
                  className={[
                    'absolute inset-0 transition-colors duration-300',
                    isActive ? 'bg-transparent' : 'bg-zinc-950/18',
                  ].join(' ')}
                />
                <div className="absolute inset-x-2 bottom-2">
                  <span
                    className={[
                      'inline-flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-[0.62rem] font-semibold',
                      isActive
                        ? 'bg-white text-zinc-950'
                        : 'bg-black/45 text-white backdrop-blur-sm',
                    ].join(' ')}
                  >
                    {index + 1}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isFullscreen ? (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[70] bg-black/88 p-4 backdrop-blur-xl sm:p-6"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
            transition={imageTransition}
          >
            <div className="flex h-full flex-col gap-4" onClick={(event) => event.stopPropagation()}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <span className="offer-chip border-white/12 bg-white/10 text-white">
                    {alt}
                  </span>
                  <span className="offer-chip border-white/12 bg-white/10 text-white">
                    {displayedIndex + 1} / {safeImages.length}
                  </span>
                </div>
                <button
                  aria-label="Zamknij galerie"
                  className="offer-control"
                  onClick={() => setIsFullscreen(false)}
                  type="button"
                >
                  <CloseIcon />
                </button>
              </div>

              <div className="relative flex-1 overflow-hidden rounded-[1.8rem] border border-white/10 bg-white/6">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0"
                    exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.02 }}
                    initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.985 }}
                    key={`fullscreen-${activeImage}`}
                    transition={imageTransition}
                  >
                    <Image
                      alt={`${alt} - powiekszenie ${displayedIndex + 1}`}
                      className="h-full w-full object-contain"
                      fill
                      priority
                      sizes="100vw"
                      src={activeImage}
                    />
                  </motion.div>
                </AnimatePresence>

                {safeImages.length > 1 ? (
                  <>
                    <button
                      aria-label="Poprzednie zdjecie"
                      className="offer-control absolute left-4 top-1/2 -translate-y-1/2"
                      onClick={goToPrevious}
                      type="button"
                    >
                      <ArrowIcon direction="left" />
                    </button>
                    <button
                      aria-label="Nastepne zdjecie"
                      className="offer-control absolute right-4 top-1/2 -translate-y-1/2"
                      onClick={goToNext}
                      type="button"
                    >
                      <ArrowIcon direction="right" />
                    </button>
                  </>
                ) : null}
              </div>

              {safeImages.length > 1 ? (
                <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-1">
                  {safeImages.map((image, index) => {
                    const isActive = index === displayedIndex;

                    return (
                      <button
                        aria-label={`Pokaz zdjecie ${index + 1} w galerii`}
                        className={[
                          'relative h-16 w-24 shrink-0 overflow-hidden rounded-[1rem] border sm:h-20 sm:w-32',
                          isActive
                            ? 'border-white shadow-[0_12px_30px_rgba(0,0,0,0.22)]'
                            : 'border-white/12 opacity-70 hover:opacity-100',
                        ].join(' ')}
                        key={`fullscreen-thumb-${image}-${index}`}
                        onClick={() => setActiveIndex(index)}
                        type="button"
                      >
                        <Image
                          alt={`${alt} - miniatura fullscreen ${index + 1}`}
                          className="h-full w-full object-cover"
                          fill
                          sizes="128px"
                          src={image}
                        />
                        <div
                          className={[
                            'absolute inset-0 transition-colors duration-300',
                            isActive ? 'bg-transparent' : 'bg-black/30',
                          ].join(' ')}
                        />
                      </button>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
