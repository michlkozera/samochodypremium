'use client';

import Link from 'next/link';
import { useState } from 'react';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';
import type { CatalogFilterOptions } from '@/lib/vehicle-catalog';

function FilterSelect({
  id,
  label,
  options,
}: {
  id: string;
  label: string;
  options: string[];
}) {
  return (
    <div className="grid gap-2">
      <label
        className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-500"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <select className="offer-select appearance-none pr-11" defaultValue="" id={id}>
          <option value="">Wszystkie</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}

function FilterRange({
  id,
  label,
  min,
  max,
  unit,
}: {
  id: string;
  label: string;
  min: string;
  max: string;
  unit: string;
}) {
  return (
    <div className="grid gap-2">
      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </span>
      <div className="grid grid-cols-2 gap-3">
        <input
          aria-label={`${label} od`}
          className="offer-input"
          id={`${id}-from`}
          placeholder={`od ${min}${unit ? ` ${unit}` : ''}`}
          type="number"
        />
        <input
          aria-label={`${label} do`}
          className="offer-input"
          id={`${id}-to`}
          placeholder={`do ${max}${unit ? ` ${unit}` : ''}`}
          type="number"
        />
      </div>
    </div>
  );
}

type KatalogFiltersProps = {
  options: CatalogFilterOptions;
  totalCount: number;
};

export function KatalogFilters({ options, totalCount }: KatalogFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="border-b border-zinc-200/60 bg-zinc-50/70">
      <div className="site-shell py-6 sm:py-8">
        <MotionReveal amount={0.12} className="offer-surface p-5 sm:p-6 lg:p-7" stagger={0.08}>
          <MotionRevealItem className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="grid gap-3">
              <div className="flex flex-wrap gap-2">
                <span className="offer-chip">Selekcja premium</span>
                <span className="offer-chip">{totalCount} aktywnych ofert</span>
              </div>
              <div className="grid gap-2">
                <p className="eyebrow">Filtry kolekcji</p>
                <h2 className="text-[clamp(1.45rem,3.6vw,2.35rem)] font-semibold uppercase leading-[1.04] tracking-[-0.03em] text-zinc-950">
                  Dopasuj styl, segment i budzet.
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                className="btn-premium-ghost h-11 min-h-0 px-5 text-[0.64rem]"
                onClick={() => setIsExpanded((currentValue) => !currentValue)}
                type="button"
              >
                {isExpanded ? 'Ukryj dodatkowe pola' : 'Pokaz dodatkowe pola'}
              </button>
              <Link className="btn-premium h-11 min-h-0 px-5 text-[0.64rem]" href="/kontakt">
                Porozmawiaj z doradca
              </Link>
            </div>
          </MotionRevealItem>

          <MotionRevealItem className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <FilterSelect id="filter-brand" label="Marka" options={options.brands} />
            <FilterSelect id="filter-body" label="Nadwozie" options={options.bodies} />
            <FilterSelect id="filter-fuel" label="Paliwo" options={options.fuels} />
            <FilterSelect id="filter-gearbox" label="Skrzynia" options={options.gearboxes} />
          </MotionRevealItem>

          <div
            className={`grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isExpanded ? 'mt-4 opacity-100' : 'mt-0 opacity-0'
            }`}
            style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
          >
            <div className="overflow-hidden">
              <div className="grid gap-4 border-t border-zinc-200/70 pt-4 sm:grid-cols-2 xl:grid-cols-3">
                <FilterRange id="filter-year" label="Rok produkcji" min="2015" max="2026" unit="" />
                <FilterRange id="filter-mileage" label="Przebieg" min="0" max="200000" unit="km" />
                <FilterRange id="filter-price" label="Cena" min="100000" max="1000000" unit="PLN" />
              </div>
            </div>
          </div>

          <MotionRevealItem className="mt-5 flex flex-col gap-3 border-t border-zinc-200/70 pt-4 text-[0.78rem] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl leading-[1.75]">
              Karta filtrowania zachowuje ten sam jezyk materialu co reszta oferty: jasne
              powierzchnie, subtelne podswietlenie i jednolite akcje.
            </p>
            <span className="font-medium uppercase tracking-[0.18em] text-zinc-400">
              {totalCount} pozycji w kolekcji
            </span>
          </MotionRevealItem>
        </MotionReveal>
      </div>
    </section>
  );
}
