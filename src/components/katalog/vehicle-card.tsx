'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  type CatalogVehicle,
  formatMileage,
  formatPrice,
} from '@/lib/vehicle-catalog';

type VehicleCardProps = {
  vehicle: CatalogVehicle;
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  const specs = [
    {
      label: 'Rok',
      value: String(vehicle.year),
      icon: <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>,
    },
    {
      label: 'Przebieg',
      value: `${formatMileage(vehicle.mileage)} km`,
      icon: <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      label: 'Moc',
      value: `${vehicle.power} KM`,
      icon: <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
    },
    {
      label: 'Paliwo',
      value: vehicle.fuelTypeLabel,
      icon: <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.623a8.25 8.25 0 013.138-5.04A8.25 8.25 0 0115.362 5.214z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" /></svg>,
    },
    {
      label: 'Skrzynia',
      value: vehicle.transmissionLabel,
      icon: <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>,
    },
    {
      label: 'Nadwozie',
      value: vehicle.bodyTypeLabel !== 'Nie podano' ? vehicle.bodyTypeLabel : '—',
      icon: <svg className="h-3 w-3 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>,
    },
  ];

  const isReserved = vehicle.status === 'RESERVED';

  return (
    <article
      ref={cardRef}
      className="group flex flex-col sm:flex-row border border-zinc-200 bg-white"
      style={{
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow: hovered ? '6px 6px 0 rgba(9,9,11,0.10)' : 'none',
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image (left) ── */}
      <Link
        className="relative block w-full aspect-[3/2] sm:aspect-auto sm:w-[48%] sm:min-h-[16rem] shrink-0 overflow-hidden bg-zinc-100"
        href={`/oferta/${vehicle.slug}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        {vehicle.image ? (
          <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
            <Image
              alt={`${vehicle.make} ${vehicle.model}`}
              className={`h-full w-full object-cover${isReserved ? ' grayscale' : ''}`}
              fill
              sizes="(max-width: 640px) 100vw, 40vw"
              src={vehicle.image}
            />
          </div>
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-zinc-400">
              Brak zdjęcia
            </span>
          </div>
        )}

        {/* Status badge — top-left */}
        <div className={`absolute top-0 left-0 px-3 py-1.5 ${isReserved ? 'bg-orange-500' : 'bg-emerald-500'}`}>
          <span className="block text-[0.6rem] font-medium uppercase tracking-[0.22em] text-white">
            {isReserved ? 'ZAREZERWOWANY' : 'DOSTĘPNY'}
          </span>
        </div>
      </Link>

      {/* ── Content (right) ── */}
      <div className="flex flex-1 flex-col border-t border-zinc-200 sm:border-t-0 sm:border-l">

        {/* Row 1: Make/Model | Trust Badges */}
        <div className="grid grid-cols-2 border-b border-zinc-200">
          <Link
            href={`/oferta/${vehicle.slug}`}
            className="block p-4 sm:p-5 hover:bg-zinc-50 transition-colors duration-200 flex flex-col justify-center"
          >
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-zinc-500 mb-1">
              {vehicle.make}
            </p>
            <h3 className="text-3xl font-semibold tracking-tight leading-tight text-zinc-900">
              {vehicle.model}
            </h3>
          </Link>
          <div className="border-l border-zinc-200 p-4 sm:p-5 flex items-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500 leading-relaxed">
              {vehicle.shortDescription}
            </p>
          </div>
        </div>

        {/* Row 2–3: Specs Grid (3 × 2) */}
        <div className="grid grid-cols-3 border-b border-zinc-200">
          {specs.map(({ label, value, icon }, i) => (
            <div
              key={label}
              className={[
                'p-3 sm:p-4 grid gap-1',
                i % 3 !== 0 ? 'border-l border-zinc-200' : '',
                i >= 3 ? 'border-t border-zinc-200' : '',
              ].join(' ')}
            >
              <div className="flex items-center gap-1 text-zinc-400">
                {icon}
                <span className="text-[9px] font-medium uppercase tracking-[0.2em]">{label}</span>
              </div>
              <span className="text-sm font-semibold text-zinc-900">{value}</span>
            </div>
          ))}
        </div>

        {/* Row 4: Price | Action */}
        <div className="grid grid-cols-2 mt-auto">
          <div className="p-4 sm:p-5 flex flex-col justify-center">
            <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-400 mb-1">Cena brutto</p>
            <div className="flex items-baseline gap-1">
              <span className="text-[clamp(1.4rem,2.8vw,2.25rem)] font-bold tracking-tighter text-black leading-none">
                {formatPrice(vehicle.price)}
              </span>
              <span className="text-xs font-medium text-zinc-400 ml-0.5">PLN</span>
            </div>
            <p className="text-[9px] font-normal uppercase tracking-[0.18em] text-zinc-400 mt-1.5">Cena do negocjacji</p>
          </div>
          <Link
            href={`/oferta/${vehicle.slug}`}
            className="group/btn border-l border-zinc-200 p-4 sm:p-5 flex flex-col items-center justify-center hover:bg-zinc-50 transition-colors duration-200"
          >
            <span className="flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-zinc-900">
              SZCZEGÓŁY
              <span className="transition-transform duration-200 group-hover/btn:translate-x-1">→</span>
            </span>
          </Link>
        </div>

      </div>
    </article>
  );
}
