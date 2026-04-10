'use client';

import { useState } from 'react';
import { filterBrands, filterFuels, filterGearboxes, filterBodies } from '@/data/vehicles';

/* ── Visual-only filter panel — ready for future logic ── */

function FilterSelect({ id, label, options }: { id: string; label: string; options: readonly string[] }) {
  return (
    <div className="grid gap-1.5">
      <label
        className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-500"
        htmlFor={id}
      >
        {label}
      </label>
      <select
        className="h-11 w-full appearance-none border border-zinc-200 bg-white px-3 text-[0.85rem] text-zinc-800 outline-none transition-colors duration-200 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
        id={id}
        defaultValue=""
      >
        <option value="">Wszystkie</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function FilterRange({ id, label, min, max, unit }: { id: string; label: string; min: string; max: string; unit: string }) {
  return (
    <div className="grid gap-1.5">
      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </span>
      <div className="grid grid-cols-2 gap-2">
        <input
          aria-label={`${label} od`}
          className="h-11 w-full border border-zinc-200 bg-white px-3 text-[0.85rem] text-zinc-800 outline-none transition-colors duration-200 placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
          id={`${id}-from`}
          placeholder={`od ${min} ${unit}`}
          type="number"
        />
        <input
          aria-label={`${label} do`}
          className="h-11 w-full border border-zinc-200 bg-white px-3 text-[0.85rem] text-zinc-800 outline-none transition-colors duration-200 placeholder:text-zinc-400 focus:border-zinc-950 focus:ring-1 focus:ring-zinc-950"
          id={`${id}-to`}
          placeholder={`do ${max} ${unit}`}
          type="number"
        />
      </div>
    </div>
  );
}

export function KatalogFilters() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="border-b border-zinc-200/60 bg-zinc-50">
      <div className="site-shell py-6 sm:py-8">
        {/* ── Filter header with toggle ── */}
        <div className="flex items-center justify-between gap-4 pb-5">
          <div className="flex items-center gap-3">
            {/* Filter icon */}
            <svg
              className="h-4 w-4 text-zinc-500"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-600">
              Filtry wyszukiwania
            </span>
          </div>
          <button
            className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-zinc-500 transition-colors duration-200 hover:text-zinc-950"
            onClick={() => setIsExpanded((prev) => !prev)}
            type="button"
          >
            {isExpanded ? 'Zwiń' : 'Rozwiń'}
            <svg
              className={`h-3.5 w-3.5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* ── Always visible: top row (brand, model, fuel, gearbox) ── */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <FilterSelect id="filter-brand" label="Marka" options={filterBrands} />
          <FilterSelect id="filter-body" label="Nadwozie" options={filterBodies} />
          <FilterSelect id="filter-fuel" label="Paliwo" options={filterFuels} />
          <FilterSelect id="filter-gearbox" label="Skrzynia biegów" options={filterGearboxes} />
        </div>

        {/* ── Expandable: range filters ── */}
        <div
          className={`grid overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isExpanded ? 'mt-4 max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FilterRange id="filter-year" label="Rok produkcji" min="2015" max="2025" unit="" />
            <FilterRange id="filter-mileage" label="Przebieg (km)" min="0" max="200 000" unit="km" />
            <FilterRange id="filter-price" label="Cena (PLN)" min="100 000" max="1 000 000" unit="PLN" />
          </div>
        </div>

        {/* ── Action buttons ── */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <button className="btn-premium h-10 min-h-0 px-5 text-[0.65rem]" type="button">
            Szukaj
          </button>
          <button className="btn-premium-ghost h-10 min-h-0 px-5 text-[0.65rem]" type="button">
            Wyczyść filtry
          </button>
          <span className="ml-auto text-[0.75rem] text-zinc-500">
            Znaleziono: <strong className="font-semibold text-zinc-800">4</strong> pojazdy
          </span>
        </div>
      </div>
    </section>
  );
}
