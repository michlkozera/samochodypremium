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
    <section className="border-b border-zinc-200">
      {/* Header Bar */}
      <div className="site-shell">
        <div className="grid gap-4 py-6 sm:py-8 px-0">
          <p className="eyebrow">Filtry kolekcji</p>
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[clamp(1.5rem,3.4vw,2.25rem)] font-bold uppercase leading-[1.06] tracking-[-0.02em] text-zinc-950">
              Dopasuj styl, segment i budżet.
            </h2>
            <div className="flex items-end gap-3">
              <button
                className="btn-premium h-11 min-h-0 px-5 text-[0.64rem]"
                onClick={() => setIsExpanded((currentValue) => !currentValue)}
                type="button"
              >
                {isExpanded ? 'Ukryj' : 'Zobacz filtry'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Expandable Filters Container */}
      <div
        className="overflow-hidden transition-[max-height,opacity] duration-600 ease-out"
        style={{ maxHeight: isExpanded ? '1200px' : '0px', opacity: isExpanded ? 1 : 0 }}
      >
        <div className="site-shell bg-white py-8 sm:py-10 lg:py-12">
          <MotionReveal amount={0.12} stagger={0.08}>
            <MotionRevealItem className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <FilterSelect id="filter-brand" label="Marka" options={options.brands} />
              <FilterSelect id="filter-body" label="Nadwozie" options={options.bodies} />
              <FilterSelect id="filter-fuel" label="Paliwo" options={options.fuels} />
              <FilterSelect id="filter-gearbox" label="Skrzynia" options={options.gearboxes} />
            </MotionRevealItem>

            <div className="mt-4 grid gap-4 border-t border-zinc-200 pt-4 sm:grid-cols-2 xl:grid-cols-3">
              <FilterRange id="filter-year" label="Rok produkcji" min="2015" max="2026" unit="" />
              <FilterRange id="filter-mileage" label="Przebieg" min="0" max="200000" unit="km" />
              <FilterRange id="filter-price" label="Cena" min="100000" max="1000000" unit="PLN" />
            </div>

            <MotionRevealItem className="mt-5 flex flex-col gap-3 border-t border-zinc-200 pt-4 text-[0.78rem] text-zinc-500">
              <p className="max-w-2xl leading-[1.75]">
                Karta filtrowania zachowuje ten sam jezyk materialu co reszta oferty: jasne
                powierzchnie, subtelne podswietlenie i jednolite akcje.
              </p>
            </MotionRevealItem>
          </MotionReveal>
        </div>
      </div>
    </section>
  );
}
