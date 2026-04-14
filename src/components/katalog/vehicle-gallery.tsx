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

  const touch = useRef({ x: 0, y: 0, t: 0 });

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };

  const buildOnTouchEnd =
    (onNext: () => void, onPrev: () => void) => (e: React.TouchEvent) => {
      const dx = touch.current.x - e.changedTouches[0].clientX;
      const dy = touch.current.y - e.changedTouches[0].clientY;
      const elapsed = Date.now() - touch.current.t;

      if (Math.abs(dx) > Math.abs(dy) * 1.5 && Math.abs(dx) > 44 && elapsed < 450) {
        dx > 0 ? onNext() : onPrev();
      }
    };

  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % total), [total]);

  const onTouchEnd = buildOnTouchEnd(next, prev);
  const onTouchEndFs = buildOnTouchEnd(next, prev);

  useEffect(() => {
    document.body.classList.toggle('gallery-open', isFullscreen);
    return () => document.body.classList.remove('gallery-open');
  }, [isFullscreen]);

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

  const thumbsRef = useRef<HTMLDivElement | null>(null);
  const pointer = useRef({ down: false, startX: 0, scrollLeft: 0 });

  const scrollThumbsTo = (index: number) => {
    setActiveIndex(index);
    const el = thumbsRef.current;
    if (!el) return;
    const child = el.children[index] as HTMLElement | undefined;
    if (!child) return;
    const target = child.offsetLeft - el.clientWidth / 2 + child.clientWidth / 2;
    el.scrollTo({ left: target, behavior: 'smooth' });
  };

  const onPointerDown = (e: React.PointerEvent) => {
    const el = thumbsRef.current;
    if (!el) return;
    pointer.current.down = true;
    pointer.current.startX = e.clientX;
    pointer.current.scrollLeft = el.scrollLeft;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = thumbsRef.current;
    if (!el || !pointer.current.down) return;
    const dx = e.clientX - pointer.current.startX;
    el.scrollLeft = pointer.current.scrollLeft - dx;
  };

  const onPointerUp = (e: React.PointerEvent) => {
    pointer.current.down = false;
    try {
      (e.target as Element).releasePointerCapture?.(e.pointerId);
    } catch (err) {
      // ignore
    }
  };

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
      <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
        {dir === 'left' ? (
          <path d="M15.75 19.5 8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="m8.25 4.5 7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );

  return (
    <>
      <div className="overflow-hidden border border-zinc-200 bg-white">
        <div
          aria-label="Otwórz galerię pełnoekranową"
          className="relative aspect-[4/3] cursor-pointer overflow-hidden bg-zinc-100 select-none sm:aspect-[16/9]"
          onClick={() => setIsFullscreen(true)}
          onKeyDown={(e) => e.key === 'Enter' && setIsFullscreen(true)}
          onTouchEnd={onTouchEnd}
          onTouchStart={onTouchStart}
          role="button"
          tabIndex={0}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={src}
              animate={rm ? { opacity: 1 } : { opacity: 1, scale: 1 }}
              className="absolute inset-0"
              exit={rm ? { opacity: 0 } : { opacity: 0, scale: 1.025 }}
              initial={rm ? { opacity: 0 } : { opacity: 0, scale: 1.015 }}
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

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.04)_40%,rgba(0,0,0,0.38)_100%)]" />

          <div className="absolute left-0 top-0 z-10 flex items-stretch">
            <div className="border-b border-r border-white/20 bg-black/55 px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm">
              {String(displayed + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(total).padStart(2, '0')}
            </div>
            <button
              aria-label="Powiększ galerię"
              className="border-b border-white/20 bg-black/55 px-3 py-2 text-white/80 backdrop-blur-sm transition-colors duration-200 active:bg-black/80"
              onClick={(e) => {
                e.stopPropagation();
                setIsFullscreen(true);
              }}
              type="button"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                <path
                  d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {total > 1 && (
            <>
              <ArrowBtn
                className="absolute left-0 top-1/2 z-10 flex h-12 w-10 -translate-y-1/2 border-y border-r sm:h-14 sm:w-11"
                dir="left"
                onClick={prev}
              />
              <ArrowBtn
                className="absolute right-0 top-1/2 z-10 flex h-12 w-10 -translate-y-1/2 border-y border-l sm:h-14 sm:w-11"
                dir="right"
                onClick={next}
              />
            </>
          )}
        </div>
      </div>
      {/* Thumbnail strip with navigation arrows */}
      {total > 1 && (
        <div className="mt-3 flex items-center gap-2">
          {/* Left arrow */}
          <button
            type="button"
            aria-label="Przewiń miniaturki w lewo"
            onClick={() => {
              const el = thumbsRef.current;
              if (el) {
                el.scrollBy({ left: -200, behavior: 'smooth' });
              }
            }}
            className="flex-shrink-0 flex h-12 w-10 items-center justify-center border border-zinc-200 bg-white text-zinc-600 transition-colors duration-200 hover:border-zinc-400 hover:text-zinc-950"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="M15.75 19.5 8.25 12l7.5-7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Thumbnails container */}
          <div
            ref={thumbsRef}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            role="list"
            className="flex-1 min-w-0 overflow-x-auto py-2 no-scrollbar"
          >
            <div className="flex gap-2">
              {safeImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  role="listitem"
                  aria-label={`Pokaż zdjęcie ${i + 1}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    scrollThumbsTo(i);
                  }}
                  className={`flex-shrink-0 focus:outline-none transition-all duration-200 ${
                    i === displayed
                      ? 'ring-2 ring-zinc-950 ring-offset-2'
                      : 'hover:ring-1 hover:ring-zinc-300 hover:ring-offset-1'
                  }`}
                >
                  <div className={`relative w-20 h-14 sm:w-24 sm:h-16 md:w-28 md:h-18 ${i === displayed ? '' : 'opacity-70 hover:opacity-100'}`}>
                    <Image src={img} alt={`${alt} ${i + 1}`} fill className="object-cover" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            type="button"
            aria-label="Przewiń miniaturki w prawo"
            onClick={() => {
              const el = thumbsRef.current;
              if (el) {
                el.scrollBy({ left: 200, behavior: 'smooth' });
              }
            }}
            className="flex-shrink-0 flex h-12 w-10 items-center justify-center border border-zinc-200 bg-white text-zinc-600 transition-colors duration-200 hover:border-zinc-400 hover:text-zinc-950"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
              <path d="m8.25 4.5 7.5 7.5-7.5 7.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      )}

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[70] flex flex-col bg-zinc-950"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onTouchEnd={onTouchEndFs}
            onTouchStart={onTouchStart}
            style={{
              paddingTop: 'env(safe-area-inset-top)',
              paddingBottom: 'env(safe-area-inset-bottom)',
            }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center gap-3">
                <span className="line-clamp-1 max-w-[12rem] text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-zinc-400">
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

              {total > 1 && (
                <>
                  <ArrowBtn
                    className="absolute left-0 top-1/2 z-10 flex h-14 w-10 -translate-y-1/2 border-y border-r sm:h-16 sm:w-12"
                    dir="left"
                    onClick={prev}
                  />
                  <ArrowBtn
                    className="absolute right-0 top-1/2 z-10 flex h-14 w-10 -translate-y-1/2 border-y border-l sm:h-16 sm:w-12"
                    dir="right"
                    onClick={next}
                  />
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
