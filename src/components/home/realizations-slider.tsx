'use client';

import { useState } from 'react';
import { homeRealizations } from '@/data/home';
import { AppImage } from '@/components/ui/app-image';
import { ShowcaseSlider } from '@/components/ui/showcase-slider';

const filters = [
  { key: 'all', label: 'Wszystkie' },
  { key: 'sedany', label: 'Sedany' },
  { key: 'suv', label: 'SUV' },
  { key: 'sportowe', label: 'Sportowe' },
] as const;

type FilterKey = (typeof filters)[number]['key'];

export function RealizationsSlider() {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [index, setIndex] = useState(0);

  const slides = filter === 'all' ? homeRealizations : homeRealizations.filter((item) => item.category === filter);
  const activeIndex = Math.min(index, Math.max(slides.length - 1, 0));

  return (
    <ShowcaseSlider
      ariaLabel="Wybrane realizacje"
      className="gap-6"
      controlsClassName="xl:flex-nowrap xl:items-center"
      controlsExtra={
        <div aria-label="Filtr realizacji" className="flex flex-wrap gap-2">
          {filters.map((item) => (
            <button
              aria-pressed={filter === item.key}
              className={[
                'button-secondary border-zinc-200/60',
                filter === item.key
                  ? 'border-zinc-950 bg-zinc-950 text-white hover:border-zinc-950 hover:bg-zinc-950 hover:text-white'
                  : 'bg-white text-zinc-950',
              ].join(' ')}
              key={item.key}
              onClick={() => {
                setFilter(item.key);
                setIndex(0);
              }}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      }
      controlsPosition="top"
      countClassName="order-first sm:order-none"
      footerClassName="gap-5"
      formatCount={(current, total) => `${String(current).padStart(2, '0')} / ${String(total).padStart(2, '0')}`}
      getSlideKey={(slide) => slide.title}
      index={activeIndex}
      nextLabel="Nastepna realizacja"
      onIndexChange={setIndex}
      prevLabel="Poprzednia realizacja"
      renderSlide={(slide, slideIndex, isActive) => (
        <article
          aria-hidden={!isActive}
          className="grid min-w-0 overflow-hidden border border-zinc-200/60 bg-white lg:h-[30rem] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] xl:h-[28rem]"
          data-slide-index={slideIndex}
        >
          <div className="group relative h-[14rem] overflow-hidden bg-zinc-100 sm:h-[16rem] lg:h-full">
            <AppImage
              alt={slide.alt}
              className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.03]"
              loading="lazy"
              src={slide.image}
            />
            <div className="absolute inset-x-0 bottom-0 grid gap-2 bg-gradient-to-t from-black via-black/70 to-transparent p-4 text-white sm:p-5">
              <span className="eyebrow text-zinc-400">{slide.eyebrow}</span>
              <p className="max-w-xl text-sm leading-7 text-zinc-200 line-clamp-2">{slide.panelCopy}</p>
            </div>
          </div>

          <div className="grid min-h-0 grid-rows-[auto_auto_1fr] gap-3 p-4 sm:p-5 lg:p-6">
            <div className="grid gap-2">
              <p className="eyebrow">{slide.tag}</p>
              <h3 className="text-[clamp(1.15rem,2.4vw,2rem)] font-semibold uppercase leading-[1.1] tracking-[-0.03em] text-zinc-950">
                {slide.title}
              </h3>
            </div>
            <p className="text-sm leading-6 text-zinc-600 sm:text-[0.95rem] sm:leading-7 line-clamp-3">{slide.description}</p>
            <dl className="mt-auto grid gap-2 self-end">
              {slide.specs.map(([label, value]) => (
                <div className="grid gap-1 border-t border-zinc-200/60 pt-2" key={`${slide.title}-${label}`}>
                  <dt className="eyebrow text-zinc-400">{label}</dt>
                  <dd className="text-sm leading-6 text-zinc-950">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </article>
      )}
      slides={slides}
    />
  );
}
