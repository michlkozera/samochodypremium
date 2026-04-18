'use client';

import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import type { CatalogVehicle, CatalogFilterOptions } from '@/lib/vehicle-catalog';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';
import { VehicleCard } from './vehicle-card';
import {
  Car,
  Fuel,
  RotateCw,
  Box,
  Calendar,
  TrendingUp,
  Wallet,
  Search,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
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
          className="h-11 w-full appearance-none bg-white pr-10 pl-3 text-[0.82rem] text-zinc-950 shadow-[0_12px_28px_rgba(15,23,42,0.08)] outline-none transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:translate-y-[-1px] focus:shadow-[0_20px_44px_rgba(15,23,42,0.14)]"
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
          className="h-11 bg-white px-3 text-[0.82rem] text-zinc-950 shadow-[0_12px_28px_rgba(15,23,42,0.08)] outline-none transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] placeholder:text-zinc-400 focus:translate-y-[-1px] focus:shadow-[0_20px_44px_rgba(15,23,42,0.14)]"
          id={`${id}-from`}
          placeholder={minPlaceholder}
          type="number"
          value={valueFrom}
          onChange={(e) => onChangeFrom(e.target.value)}
        />
        <input
          aria-label={`${label} do`}
          className="h-11 bg-white px-3 text-[0.82rem] text-zinc-950 shadow-[0_12px_28px_rgba(15,23,42,0.08)] outline-none transition-[box-shadow,transform] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] placeholder:text-zinc-400 focus:translate-y-[-1px] focus:shadow-[0_20px_44px_rgba(15,23,42,0.14)]"
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
        Pokazano {startItem}–{endItem} z {totalItems} ogłoszeń
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
  '': 'Polecane',
  'price-asc': 'Cena: rosnąco',
  'price-desc': 'Cena: malejąco',
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
      {/* Filters */}
      <section className="bg-[linear-gradient(180deg,rgba(250,250,250,0.9)_0%,rgba(255,255,255,1)_100%)]">
        <div className="site-shell py-8 sm:py-10 lg:py-12">
          <div className="mx-auto max-w-6xl bg-white/96 p-5 shadow-[0_30px_70px_rgba(15,23,42,0.11)] sm:p-6 lg:p-7">
            {/* Search - always visible first */}
            <div className="group bg-white px-4 py-4 shadow-[0_14px_34px_rgba(15,23,42,0.1)] sm:px-5">
              <div className="relative flex min-h-11 items-center gap-3">
                <Search className="pointer-events-none h-4 w-4 shrink-0 text-zinc-400" />
                <input
                  type="text"
                  placeholder="Wyszukaj samochód"
                  value={filters.search}
                  onChange={(e) => setFilter('search', e.target.value)}
                  className="sm:hidden h-11 w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-500"
                />
                <input
                  type="text"
                  placeholder="Wyszukaj markę, model, rocznik lub typ nadwozia..."
                  value={filters.search}
                  onChange={(e) => setFilter('search', e.target.value)}
                  className="hidden sm:block h-11 w-full bg-transparent text-[0.88rem] text-zinc-950 outline-none placeholder:text-zinc-500"
                />
                {filters.search && (
                  <button
                    type="button"
                    onClick={() => setFilter('search', '')}
                    className="shrink-0 p-1 text-zinc-400 transition-colors hover:text-zinc-950"
                    aria-label="Wyczyść wyszukiwarkę"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Basic filters */}
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                icon={<Box className="h-3.5 w-3.5" />}
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
                icon={<RotateCw className="h-3.5 w-3.5" />}
              />
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <button
                className="home-cta text-zinc-950 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
                onClick={() => setIsExpanded((v) => !v)}
                type="button"
              >
                {isExpanded ? 'Ukryj dodatkowe filtry' : 'Zobacz więcej filtrów'}
                <svg className="home-cta-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
                <span className="home-cta-line" />
              </button>

              {hasActiveFilters && (
                <button
                  className="home-cta text-zinc-950 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
                  onClick={resetFilters}
                  type="button"
                >
                  Wyczyść filtry
                  <svg className="home-cta-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                  </svg>
                  <span className="home-cta-line" />
                </button>
              )}
            </div>

            {/* Extended filters */}
            <div
              className="overflow-hidden transition-[max-height,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ maxHeight: isExpanded ? '900px' : '0px', opacity: isExpanded ? 1 : 0 }}
            >
              <div className="mt-6 grid gap-4 pb-1 sm:grid-cols-2 lg:grid-cols-3">
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
      </section>

      {/* Vehicle Grid */}
      <section
        ref={vehicleGridRef}
        className="border-b border-zinc-200 bg-[linear-gradient(180deg,rgba(250,250,250,0.94)_0%,rgba(255,255,255,1)_100%)] scroll-mt-20"
      >
        <div className="site-shell py-10 sm:py-12 lg:py-14">

          {/* Grid header */}
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-zinc-200 pb-6 sm:mb-10">
            <div className="grid gap-2">
              <p className="eyebrow">Aktualna kolekcja</p>
              <h2 className="text-[clamp(1.5rem,3.4vw,2.25rem)] font-bold uppercase leading-[1.06] tracking-[-0.02em] text-zinc-950">
                {hasActiveFilters
                  ? `Znaleziono ${filteredVehicles.length} ${filteredVehicles.length === 1 ? 'pojazd' : filteredVehicles.length < 5 ? 'pojazdy' : 'pojazdów'}.`
                  : 'Oferty gotowe do obejrzenia.'}
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
                className="grid gap-6 sm:grid-cols-2"
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
                Zmień zakres filtrów albo wyczyść wszystkie parametry.
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
