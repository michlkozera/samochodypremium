'use client';

import { useState, useMemo, useCallback } from 'react';
import type { CatalogVehicle, CatalogFilterOptions } from '@/lib/vehicle-catalog';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';
import { VehicleCard } from './vehicle-card';
import Link from 'next/link';

export type FilterState = {
  brand: string;
  body: string;
  fuel: string;
  gearbox: string;
  yearFrom: string;
  yearTo: string;
  mileageFrom: string;
  mileageTo: string;
  priceFrom: string;
  priceTo: string;
};

const INITIAL_FILTERS: FilterState = {
  brand: '',
  body: '',
  fuel: '',
  gearbox: '',
  yearFrom: '',
  yearTo: '',
  mileageFrom: '',
  mileageTo: '',
  priceFrom: '',
  priceTo: '',
};

type SelectFieldProps = {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

function SelectField({ id, label, options, value, onChange }: SelectFieldProps) {
  return (
    <div className="grid gap-2">
      <label
        className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-500"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <select
          className="h-11 w-full appearance-none border border-zinc-200 bg-white pr-10 pl-3 text-[0.82rem] text-zinc-950 outline-none transition-colors duration-200 focus:border-zinc-950 focus:ring-0"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option value="">Wszystkie</option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400"
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

type RangeFieldProps = {
  id: string;
  label: string;
  minPlaceholder: string;
  maxPlaceholder: string;
  valueFrom: string;
  valueTo: string;
  onChangeFrom: (value: string) => void;
  onChangeTo: (value: string) => void;
};

function RangeField({
  id,
  label,
  minPlaceholder,
  maxPlaceholder,
  valueFrom,
  valueTo,
  onChangeFrom,
  onChangeTo,
}: RangeFieldProps) {
  return (
    <div className="grid gap-2">
      <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </span>
      <div className="grid grid-cols-2 gap-2">
        <input
          aria-label={`${label} od`}
          className="h-11 border border-zinc-200 bg-white px-3 text-[0.82rem] text-zinc-950 outline-none transition-colors duration-200 placeholder:text-zinc-400 focus:border-zinc-950"
          id={`${id}-from`}
          placeholder={minPlaceholder}
          type="number"
          value={valueFrom}
          onChange={(e) => onChangeFrom(e.target.value)}
        />
        <input
          aria-label={`${label} do`}
          className="h-11 border border-zinc-200 bg-white px-3 text-[0.82rem] text-zinc-950 outline-none transition-colors duration-200 placeholder:text-zinc-400 focus:border-zinc-950"
          id={`${id}-to`}
          placeholder={maxPlaceholder}
          type="number"
          value={valueTo}
          onChange={(e) => onChangeTo(e.target.value)}
        />
      </div>
    </div>
  );
}

type CatalogClientProps = {
  vehicles: CatalogVehicle[];
  filterOptions: CatalogFilterOptions;
};

export function CatalogClient({ vehicles, filterOptions }: CatalogClientProps) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [isExpanded, setIsExpanded] = useState(false);

  const setFilter = useCallback(<K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  }, []);

  const resetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some((v) => v !== '');
  }, [filters]);

  const filteredVehicles = useMemo(() => {
    return vehicles.filter((vehicle) => {
      if (filters.brand && vehicle.make !== filters.brand) return false;
      if (filters.body && vehicle.bodyTypeLabel !== filters.body) return false;
      if (filters.fuel && vehicle.fuelTypeLabel !== filters.fuel) return false;
      if (filters.gearbox && vehicle.transmissionLabel !== filters.gearbox) return false;
      if (filters.yearFrom && vehicle.year < Number(filters.yearFrom)) return false;
      if (filters.yearTo && vehicle.year > Number(filters.yearTo)) return false;
      if (filters.mileageFrom && vehicle.mileage < Number(filters.mileageFrom)) return false;
      if (filters.mileageTo && vehicle.mileage > Number(filters.mileageTo)) return false;
      if (filters.priceFrom && vehicle.price < Number(filters.priceFrom)) return false;
      if (filters.priceTo && vehicle.price > Number(filters.priceTo)) return false;
      return true;
    });
  }, [vehicles, filters]);

  // Key changes when filtered set changes — forces MotionReveal remount
  // so newly revealed items animate correctly after filter reset
  const gridKey = filteredVehicles.map((v) => v.id).join(',');

  return (
    <>
      {/* ── Filters ── */}
      <section className="border-b border-zinc-200 bg-zinc-50/70">
        <div className="site-shell py-6 sm:py-8">
          <div className="border border-zinc-200 bg-white p-5 sm:p-6 lg:p-7" data-reveal="up">
            {/* Header row */}
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="grid gap-3">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center border border-zinc-200 bg-white px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                    Selekcja premium
                  </span>
                  <span className="inline-flex items-center border border-zinc-200 bg-white px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-zinc-700">
                    {filteredVehicles.length} z {vehicles.length} aktywnych ofert
                  </span>
                  {hasActiveFilters && (
                    <span className="inline-flex items-center border border-zinc-950 bg-zinc-950 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white">
                      Filtry aktywne
                    </span>
                  )}
                </div>
                <div className="grid gap-2">
                  <p className="eyebrow">Filtry kolekcji</p>
                  <h2 className="text-[clamp(1.45rem,3.6vw,2.35rem)] font-semibold uppercase leading-[1.04] tracking-[-0.03em] text-zinc-950">
                    Dopasuj styl, segment i budżet.
                  </h2>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {hasActiveFilters && (
                  <button
                    className="inline-flex min-h-11 items-center justify-center border border-zinc-300 bg-transparent px-5 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-zinc-950 transition-colors duration-200 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white"
                    onClick={resetFilters}
                    type="button"
                  >
                    Wyczyść filtry
                  </button>
                )}
                <button
                  className="inline-flex min-h-11 items-center justify-center border border-zinc-300 bg-transparent px-5 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-zinc-950 transition-colors duration-200 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white"
                  onClick={() => setIsExpanded((v) => !v)}
                  type="button"
                >
                  {isExpanded ? 'Ukryj dodatkowe' : 'Więcej filtrów'}
                </button>
                <Link
                  className="inline-flex min-h-11 items-center justify-center border border-zinc-950 bg-zinc-950 px-5 text-[0.64rem] font-semibold uppercase tracking-[0.24em] text-white transition-colors duration-200 hover:bg-white hover:text-zinc-950"
                  href="/kontakt"
                >
                  Porozmawiaj z doradcą
                </Link>
              </div>
            </div>

            {/* Main filters */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <SelectField
                id="filter-brand"
                label="Marka"
                options={filterOptions.brands}
                value={filters.brand}
                onChange={(v) => setFilter('brand', v)}
              />
              <SelectField
                id="filter-body"
                label="Nadwozie"
                options={filterOptions.bodies}
                value={filters.body}
                onChange={(v) => setFilter('body', v)}
              />
              <SelectField
                id="filter-fuel"
                label="Paliwo"
                options={filterOptions.fuels}
                value={filters.fuel}
                onChange={(v) => setFilter('fuel', v)}
              />
              <SelectField
                id="filter-gearbox"
                label="Skrzynia"
                options={filterOptions.gearboxes}
                value={filters.gearbox}
                onChange={(v) => setFilter('gearbox', v)}
              />
            </div>

            {/* Extended filters */}
            <div
              className="grid overflow-hidden transition-[grid-template-rows,opacity,margin] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                gridTemplateRows: isExpanded ? '1fr' : '0fr',
                opacity: isExpanded ? 1 : 0,
                marginTop: isExpanded ? '1rem' : '0',
              }}
            >
              <div className="overflow-hidden">
                <div className="grid gap-4 border-t border-zinc-200 pt-4 sm:grid-cols-2 xl:grid-cols-3">
                  <RangeField
                    id="filter-year"
                    label="Rok produkcji"
                    minPlaceholder="od 2015"
                    maxPlaceholder="do 2025"
                    valueFrom={filters.yearFrom}
                    valueTo={filters.yearTo}
                    onChangeFrom={(v) => setFilter('yearFrom', v)}
                    onChangeTo={(v) => setFilter('yearTo', v)}
                  />
                  <RangeField
                    id="filter-mileage"
                    label="Przebieg (km)"
                    minPlaceholder="od 0"
                    maxPlaceholder="do 200 000"
                    valueFrom={filters.mileageFrom}
                    valueTo={filters.mileageTo}
                    onChangeFrom={(v) => setFilter('mileageFrom', v)}
                    onChangeTo={(v) => setFilter('mileageTo', v)}
                  />
                  <RangeField
                    id="filter-price"
                    label="Cena (PLN)"
                    minPlaceholder="od 100 000"
                    maxPlaceholder="do 2 000 000"
                    valueFrom={filters.priceFrom}
                    valueTo={filters.priceTo}
                    onChangeFrom={(v) => setFilter('priceFrom', v)}
                    onChangeTo={(v) => setFilter('priceTo', v)}
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 flex flex-col gap-3 border-t border-zinc-200 pt-4 text-[0.78rem] text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-2xl leading-[1.75]">
                Filtry działają w czasie rzeczywistym — wyniki aktualizują się natychmiast po zmianie parametrów.
              </p>
              <span className="whitespace-nowrap font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {filteredVehicles.length} / {vehicles.length} pojazdów
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vehicle Grid ── */}
      <section className="border-b border-zinc-200 bg-[linear-gradient(180deg,rgba(250,250,250,0.94)_0%,rgba(255,255,255,1)_100%)]">
        <div className="site-shell py-10 sm:py-12 lg:py-14">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
            <div className="grid gap-2">
              <p className="eyebrow">Aktualna kolekcja</p>
              <h2 className="text-[clamp(1.7rem,4vw,2.8rem)] font-semibold uppercase leading-[1.02] tracking-[-0.03em] text-zinc-950">
                {hasActiveFilters
                  ? `Znaleziono ${filteredVehicles.length} ${filteredVehicles.length === 1 ? 'pojazd' : filteredVehicles.length < 5 ? 'pojazdy' : 'pojazdów'}.`
                  : 'Oferty gotowe do prezentacji.'}
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 border border-zinc-200 bg-white px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-zinc-700">
              <span>{filteredVehicles.length}</span>
              <span>ofert</span>
            </div>
          </div>

          {filteredVehicles.length > 0 ? (
            <MotionReveal
              key={gridKey}
              amount={0.08}
              className="grid gap-px bg-zinc-200 sm:grid-cols-2"
              stagger={0.08}
            >
              {filteredVehicles.map((vehicle) => (
                <MotionRevealItem key={vehicle.id}>
                  <VehicleCard vehicle={vehicle} />
                </MotionRevealItem>
              ))}
            </MotionReveal>
          ) : (
            <div className="border border-zinc-200 bg-white px-6 py-16 text-center">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-zinc-400">
                Brak wyników
              </p>
              <p className="mt-3 text-[0.95rem] font-semibold uppercase tracking-[-0.02em] text-zinc-950">
                Brak pojazdów spełniających kryteria.
              </p>
              <p className="mt-2 text-sm leading-7 text-zinc-500">
                Zmień parametry filtrowania lub wyczyść filtry, aby zobaczyć wszystkie oferty.
              </p>
              <button
                className="mt-6 inline-flex min-h-11 items-center justify-center border border-zinc-950 bg-zinc-950 px-6 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-white transition-colors duration-200 hover:bg-white hover:text-zinc-950"
                onClick={resetFilters}
                type="button"
              >
                Wyczyść filtry
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
