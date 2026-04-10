'use client';

import type { ReactNode } from 'react';
import { useRef } from 'react';

type ShowcaseSliderProps<TSlide> = {
  ariaLabel: string;
  className: string;
  controlsClassName?: string;
  controlsExtra?: ReactNode;
  controlsExtraClassName?: string;
  controlsPosition?: 'top' | 'bottom';
  countClassName?: string;
  dotLabel?: (slide: TSlide, index: number) => string;
  footerClassName: string;
  headerExtra?: ReactNode;
  footerExtra?: ReactNode;
  formatCount?: (current: number, total: number) => string;
  getSlideKey: (slide: TSlide, index: number) => string;
  index: number;
  nextLabel: string;
  onIndexChange: (index: number) => void;
  prevLabel: string;
  renderSlide: (slide: TSlide, index: number, isActive: boolean) => ReactNode;
  slides: readonly TSlide[];
};

export function ShowcaseSlider<TSlide>({
  ariaLabel,
  className,
  controlsClassName = '',
  controlsExtra,
  controlsExtraClassName = '',
  controlsPosition = 'bottom',
  countClassName = '',
  footerClassName,
  headerExtra,
  footerExtra,
  formatCount,
  getSlideKey,
  index,
  nextLabel,
  onIndexChange,
  prevLabel,
  renderSlide,
  slides,
}: ShowcaseSliderProps<TSlide>) {
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  if (!slides.length) {
    return null;
  }

  const lastIndex = slides.length - 1;
  const goTo = (nextIndex: number) => onIndexChange(Math.max(0, Math.min(nextIndex, lastIndex)));

  const navigationBlock = (
    <div className={['grid gap-4', footerClassName].join(' ').trim()}>
      <span aria-hidden="true" className="block h-px overflow-hidden bg-zinc-200">
        <span
          className="block h-full bg-zinc-950 transition-[width] duration-300 ease-out"
          style={{ width: `${((index + 1) / slides.length) * 100}%` }}
        />
      </span>

      <div className={['flex flex-wrap items-center gap-4', controlsClassName].join(' ').trim()}>
        {controlsExtra ? (
          <div className={['flex flex-wrap gap-2', controlsExtraClassName].join(' ').trim()}>
            {controlsExtra}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-4 sm:ml-auto">
          {formatCount ? (
            <span aria-live="polite" className={['eyebrow text-zinc-500', countClassName].join(' ').trim()}>
              {formatCount(index + 1, slides.length)}
            </span>
          ) : null}

          <div className="flex flex-wrap gap-2">
            <button
              aria-label={prevLabel}
              className="button-secondary disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-zinc-100 disabled:text-zinc-400"
              disabled={index === 0}
              onClick={() => goTo(index - 1)}
              type="button"
            >
              Wstecz
            </button>
            <button
              aria-label={nextLabel}
              className="button-primary disabled:cursor-not-allowed disabled:border-zinc-200 disabled:bg-zinc-300 disabled:text-zinc-500"
              disabled={index === lastIndex}
              onClick={() => goTo(index + 1)}
              type="button"
            >
              Dalej
            </button>
          </div>
        </div>
      </div>

      {footerExtra}
    </div>
  );

  return (
    <div
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      className={['grid gap-6', className].join(' ').trim()}
    >
      {headerExtra}
      {controlsPosition === 'top' ? navigationBlock : null}

      <div
        className="overflow-hidden"
        onTouchEnd={(event) => {
          const deltaX = touchStartX.current - event.changedTouches[0].clientX;
          const deltaY = touchStartY.current - event.changedTouches[0].clientY;

          if (Math.abs(deltaX) < 40 || Math.abs(deltaX) <= Math.abs(deltaY)) {
            return;
          }

          if (deltaX > 0) {
            goTo(index + 1);
            return;
          }

          goTo(index - 1);
        }}
        onTouchStart={(event) => {
          touchStartX.current = event.changedTouches[0].clientX;
          touchStartY.current = event.changedTouches[0].clientY;
        }}
      >
        <div
          className="flex items-stretch transition-transform duration-500 ease-out"
          style={{ transform: `translate3d(${-index * 100}%, 0, 0)` }}
        >
          {slides.map((slide, slideIndex) => (
            <div className="min-w-0 shrink-0 basis-full" key={getSlideKey(slide, slideIndex)}>
              {renderSlide(slide, slideIndex, slideIndex === index)}
            </div>
          ))}
        </div>
      </div>

      {controlsPosition === 'bottom' ? navigationBlock : null}
    </div>
  );
}
