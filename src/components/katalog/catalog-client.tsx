'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import type { CatalogVehicle, CatalogFilterOptions } from '@/lib/vehicle-catalog';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';
import { VehicleCard } from './vehicle-card';
import Link from 'next/link';
import {
  Car,
  Fuel,
  Gauge,
  Settings2,
  Calendar,
  TrendingUp,
  Wallet,
  Search,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';

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
  search: string;
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
  search: '',
};

type SelectFieldProps = {
  id: string;
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  icon?: React.ReactNode;
};

function SelectField({ id, label, options, value, onChange, icon }: SelectFieldProps) {
  return (
    <div className="grid gap-2">
      <label
        className="flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-500"
        htmlFor={id}
      >
        {icon && <span className="text-zinc-400">{icon}</span>}
        {label}
      </label>
      <div className="relative">
        <select
          className="h-11 w-full appearance-none border border-zinc-200 bg-white pr-10 pl-3 text-[0.82rem] text-zinc-950 outline-none transition-colors duration-200 focus:border-zinc-950"
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
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
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
  icon?: React.ReactNode;
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
  icon,
}: RangeFieldProps) {
  return (
    <div className="grid gap-2">
      <span className="flex items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
        {icon && <span className="text-zinc-400">{icon}</span>}
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

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
};

function Pagination({ currentPage, totalPages, totalItems, itemsPerPage, onPageChange }: PaginationProps) {
  const getVisiblePages = () => {
    const pages: (number | string)[] = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="mt-10 flex flex-col items-center gap-4 sm:mt-12">
      <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-zinc-400">
        Pokazano {startItem}–{endItem} z {totalItems} ofert
      </p>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex h-10 w-10 items-center justify-center border border-zinc-200 bg-white text-zinc-700 transition-all duration-200 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-zinc-200 disabled:hover:bg-white disabled:hover:text-zinc-700"
          aria-label="Poprzednia strona"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === '...' ? (
              <span className="flex h-10 w-10 items-center justify-center text-[0.72rem] text-zinc-400">
                …
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className={[
                  'flex h-10 w-10 items-center justify-center border text-[0.72rem] font-semibold uppercase tracking-[0.12em] transition-all duration-200',
                  currentPage === page
                    ? 'border-zinc-950 bg-zinc-950 text-white'
                    : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white',
                ].join(' ')}
              >
                {page}
              </button>
            )}
          </div>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex h-10 w-10 items-center justify-center border border-zinc-200 bg-white text-zinc-700 transition-all duration-200 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:border-zinc-200 disabled:hover:bg-white disabled:hover:text-zinc-700"
          aria-label="Następna strona"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

type CatalogClientProps = {
  vehicles: CatalogVehicle[];
  filterOptions: CatalogFilterOptions;
  initialSearch?: string;
  initialBody?: string;
};

type SortOption = 'price-asc' | 'price-desc' | 'year-desc' | 'mileage-asc' | '';

const SORT_LABELS: Record<SortOption, string> = {
  '': 'Domyślne',
  'price-asc': 'Cena: od najniższej',
  'price-desc': 'Cena: od najwyższej',
  'year-desc': 'Najnowsze',
  'mileage-asc': 'Najniższy przebieg',
};

export function CatalogClient({ vehicles, filterOptions, initialSearch = '', initialBody = '' }: CatalogClientProps) {
  const [filters, setFilters] = useState<FilterState>({
    ...INITIAL_FILTERS,
    search: initialSearch,
    body: initialBody,
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [sortBy, setSortBy] = useState<SortOption>('');
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const vehicleGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentPage(1);
  }, [filters, sortBy]);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    vehicleGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

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
    let result = vehicles.filter((vehicle) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const searchFields = [
          vehicle.make,
          vehicle.model,
          vehicle.bodyTypeLabel,
          vehicle.fuelTypeLabel,
          vehicle.transmissionLabel,
          vehicle.year.toString(),
        ].filter(Boolean).map(f => f.toLowerCase());
        if (!searchFields.some(field => field.includes(searchLower))) return false;
      }
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

    if (sortBy) {
      result = [...result].sort((a, b) => {
        switch (sortBy) {
          case 'price-asc': return a.price - b.price;
          case 'price-desc': return b.price - a.price;
          case 'year-desc': return b.year - a.year;
          case 'mileage-asc': return a.mileage - b.mileage;
          default: return 0;
        }
      });
    }
    return result;
  }, [vehicles, filters, sortBy]);

  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);
  const paginatedVehicles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredVehicles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredVehicles, currentPage]);

  const gridKey = paginatedVehicles.map((v) => v.id).join(',');

  return (
    <>
      {/* ── Filters ── */}
      <section className="border-b border-zinc-200 bg-zinc-50">
        <div className="site-shell py-8 sm:py-10 lg:py-12" data-reveal="up">
          <div className="border border-zinc-200 bg-white">

            {/* ── Panel header ── */}
            <div className="grid gap-6 border-b border-zinc-200 p-5 sm:p-6 lg:p-8">
              {/* Top row: eyebrow + meta chips */}
              <div className="flex flex-wrap items-center gap-2">
                <p className="eyebrow">Filtry kolekcji</p>
                <span className="inline-flex items-center border border-zinc-200 bg-white px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {vehicles.length} pojazdów
                </span>
                {hasActiveFilters && (
                  <span className="inline-flex items-center border border-zinc-950 bg-zinc-950 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-white">
                    Filtr aktywny — {filteredVehicles.length} wyników
                  </span>
                )}
              </div>

              {/* Title + actions */}
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <h2 className="text-[clamp(1.45rem,3.2vw,2.2rem)] font-semibold uppercase leading-[1.06] tracking-[-0.03em] text-zinc-950">
                  Dopasuj styl, segment i budżet.
                </h2>

                <div className="flex flex-wrap items-center gap-2">
                  {hasActiveFilters && (
                    <button
                      className="btn-premium-ghost h-11 min-h-0 px-5 text-[0.64rem]"
                      onClick={resetFilters}
                      type="button"
                    >
                      Wyczyść filtry
                    </button>
                  )}
                  <Link
                    className="btn-premium h-11 min-h-0 px-5 text-[0.64rem]"
                    href="/kontakt"
                  >
                    Porozmawiaj z doradcą
                  </Link>
                </div>
              </div>
            </div>

            {/* ── Search ── */}
            <div className="border-b border-zinc-200 px-5 sm:px-6 lg:px-8">
              <div className="relative flex items-center gap-3">
                <Search className="pointer-events-none h-4 w-4 shrink-0 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Wyszukaj markę, model, rok lub typ nadwozia..."
                  value={filters.search}
                  onChange={(e) => setFilter('search', e.target.value)}
                  className="h-12 w-full bg-transparent text-[0.88rem] text-zinc-950 outline-none placeholder:text-zinc-400"
                />
                {filters.search && (
                  <button
                    type="button"
                    onClick={() => setFilter('search', '')}
                    className="shrink-0 p-1 text-zinc-400 transition-colors hover:text-zinc-950"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* ── Main selects ── */}
            <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-4 lg:p-8">
              <SelectField
                id="filter-brand"
                label="Marka"
                options={filterOptions.brands}
                value={filters.brand}
                onChange={(v) => setFilter('brand', v)}
                icon={<Car className="h-3.5 w-3.5" />}
              />
              <SelectField
                id="filter-body"
                label="Nadwozie"
                options={filterOptions.bodies}
                value={filters.body}
                onChange={(v) => setFilter('body', v)}
                icon={<Settings2 className="h-3.5 w-3.5" />}
              />
              <SelectField
                id="filter-fuel"
                label="Paliwo"
                options={filterOptions.fuels}
                value={filters.fuel}
                onChange={(v) => setFilter('fuel', v)}
                icon={<Fuel className="h-3.5 w-3.5" />}
              />
              <SelectField
                id="filter-gearbox"
                label="Skrzynia"
                options={filterOptions.gearboxes}
                value={filters.gearbox}
                onChange={(v) => setFilter('gearbox', v)}
                icon={<Gauge className="h-3.5 w-3.5" />}
              />
            </div>

            {/* ── Toggle extended filters ── */}
            <div className="border-t border-zinc-200">
              <button
                className={[
                  'flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200 sm:px-6 lg:px-8',
                  isExpanded ? 'bg-zinc-950 text-white' : 'bg-white text-zinc-950 hover:bg-zinc-50',
                ].join(' ')}
                onClick={() => setIsExpanded((v) => !v)}
                type="button"
              >
                <span className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.22em]">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  {isExpanded ? 'Ukryj dodatkowe filtry' : 'Zaawansowane filtry — rok, przebieg, cena'}
                </span>
                <ChevronDown
                  className={[
                    'h-4 w-4 shrink-0 transition-transform duration-300',
                    isExpanded ? 'rotate-180' : '',
                  ].join(' ')}
                />
              </button>

              {/* Extended filters panel */}
              <div
                className="grid overflow-hidden transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                style={{ gridTemplateRows: isExpanded ? '1fr' : '0fr' }}
              >
                <div className="overflow-hidden">
                  <div className="grid gap-4 border-t border-zinc-200 p-5 sm:grid-cols-2 sm:p-6 lg:grid-cols-3 lg:p-8 xl:grid-cols-3">
                    <RangeField
                      id="filter-year"
                      label="Rok produkcji"
                      minPlaceholder="od 2015"
                      maxPlaceholder="do 2025"
                      valueFrom={filters.yearFrom}
                      valueTo={filters.yearTo}
                      onChangeFrom={(v) => setFilter('yearFrom', v)}
                      onChangeTo={(v) => setFilter('yearTo', v)}
                      icon={<Calendar className="h-3.5 w-3.5" />}
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
                      icon={<TrendingUp className="h-3.5 w-3.5" />}
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
                      icon={<Wallet className="h-3.5 w-3.5" />}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* ── Panel footer ── */}
            <div className="flex flex-col gap-3 border-t border-zinc-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
              <p className="text-[0.78rem] leading-[1.75] text-zinc-400">
                Wyniki aktualizują się w czasie rzeczywistym po każdej zmianie parametru.
              </p>
              <span className="shrink-0 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-zinc-400">
                {filteredVehicles.length}&thinsp;/&thinsp;{vehicles.length} pojazdów
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Vehicle Grid ── */}
      <section
        ref={vehicleGridRef}
        className="border-b border-zinc-200 bg-[linear-gradient(180deg,rgba(250,250,250,0.94)_0%,rgba(255,255,255,1)_100%)] scroll-mt-20"
      >
        <div className="site-shell py-10 sm:py-12 lg:py-14">

          {/* Grid header */}
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200 pb-6 sm:mb-10">
            <div className="grid gap-2">
              <p className="eyebrow">Aktualna kolekcja</p>
              <h2 className="text-[clamp(1.7rem,4vw,2.6rem)] font-semibold uppercase leading-[1.04] tracking-[-0.03em] text-zinc-950">
                {hasActiveFilters
                  ? `Znaleziono ${filteredVehicles.length} ${filteredVehicles.length === 1 ? 'pojazd' : filteredVehicles.length < 5 ? 'pojazdy' : 'pojazdów'}.`
                  : 'Oferty gotowe do prezentacji.'}
              </h2>
            </div>

            {/* Sort + count row */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="h-11 appearance-none border border-zinc-200 bg-white pl-4 pr-10 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-zinc-700 outline-none transition-colors duration-200 hover:border-zinc-950 focus:border-zinc-950 cursor-pointer"
                >
                  {Object.entries(SORT_LABELS).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              </div>
              <span className="inline-flex h-11 items-center gap-1.5 border border-zinc-200 bg-white px-4 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                <Car className="h-3.5 w-3.5" />
                {filteredVehicles.length} ofert
              </span>
            </div>
          </div>

          {paginatedVehicles.length > 0 ? (
            <>
              <MotionReveal
                key={gridKey}
                amount={0.08}
                className="grid gap-12 sm:grid-cols-2 lg:gap-16 xl:gap-20"
                stagger={0.08}
              >
                {paginatedVehicles.map((vehicle) => (
                  <MotionRevealItem key={vehicle.id}>
                    <VehicleCard vehicle={vehicle} />
                  </MotionRevealItem>
                ))}
              </MotionReveal>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredVehicles.length}
                  itemsPerPage={ITEMS_PER_PAGE}
                  onPageChange={handlePageChange}
                />
              )}
            </>
          ) : (
            <div className="border border-zinc-200 bg-white px-6 py-16 text-center">
              <p className="eyebrow mx-auto w-fit text-zinc-400">Brak wyników</p>
              <p className="mt-4 text-[0.95rem] font-semibold uppercase tracking-[-0.02em] text-zinc-950">
                Brak pojazdów spełniających kryteria.
              </p>
              <p className="mt-2 text-sm leading-7 text-zinc-500">
                Zmień parametry filtrowania lub wyczyść wszystkie filtry.
              </p>
              <button
                className="btn-premium mt-6"
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
