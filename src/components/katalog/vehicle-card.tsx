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
  variant?: 'default' | 'home';
};

export function VehicleCard({ vehicle, variant = 'default' }: VehicleCardProps) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const isHomeVariant = variant === 'home';

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
      className="group flex flex-col bg-white"
      style={{
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 48px rgba(0,0,0,0.16), 0 6px 16px rgba(0,0,0,0.08)'
          : '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)',
        transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s cubic-bezier(0.16,1,0.3,1)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ── Image ── */}
      <div className="relative w-full aspect-[16/9] shrink-0 bg-white overflow-hidden">
        <Link
          className="absolute inset-0 outline-none"
          href={`/oferta/${vehicle.slug}`}
          tabIndex={-1}
          aria-hidden="true"
        >
          {vehicle.image ? (
            <div className="absolute inset-0">
              <Image
                alt={`${vehicle.make} ${vehicle.model}`}
                className={`h-full w-full object-cover${isReserved ? ' grayscale' : ''}`}
                fill
                sizes="(max-width: 640px) 100vw, 50vw"
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
        </Link>

        {/* Status badge — top-right flush, blur */}
        <div className="absolute top-0 right-0 z-10 border-b border-l border-white/10 bg-white/10 px-3 py-2 backdrop-blur-md backdrop-saturate-150">
          <span className={`block text-[0.6rem] ${isHomeVariant ? 'font-medium' : 'font-semibold'} uppercase tracking-[0.28em] drop-shadow-sm ${isReserved ? 'text-orange-400' : 'text-white'}`}>
            {isReserved ? 'ZAREZERWOWANY' : 'DOSTĘPNY'}
          </span>
        </div>

        {/* SZCZEGÓŁY — wyjeżdża od dołu przy hover */}
        <Link
          href={`/oferta/${vehicle.slug}`}
          style={{ bottom: '-1px' }}
          className={[
            'absolute left-0 right-0 z-10 translate-y-full group-hover:translate-y-0 bg-white pt-6 pb-5',
            isHomeVariant
              ? 'home-cta justify-center text-zinc-900 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]'
              : 'flex items-center justify-center transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          ].join(' ')}
        >
          <span className={`relative flex items-center gap-2 text-[0.68rem] ${isHomeVariant ? 'font-medium' : 'font-semibold'} uppercase tracking-[0.18em] text-zinc-900`}>
            SZCZEGÓŁY
            <span className={isHomeVariant ? 'home-cta-arrow' : 'transition-transform duration-200 group-hover:translate-x-1'}>→</span>
            {isHomeVariant ? <span className="home-cta-line" /> : null}
          </span>
        </Link>
      </div>

      {/* ── Content (right) ── */}
      <div className="flex flex-1 flex-col -mt-px relative z-10 bg-white">

        {/* Row 1: Make · Model · Pojemność */}
        <Link
          href={`/oferta/${vehicle.slug}`}
          className="flex items-center justify-center p-4 sm:p-5 hover:bg-zinc-50 transition-colors duration-200 text-center"
        >
          <h3 className={`text-3xl ${isHomeVariant ? 'font-light' : 'font-bold'} uppercase tracking-[0.04em] leading-none text-zinc-900`}>
            {vehicle.make}{' '}
            {vehicle.model}
            {vehicle.engineCapacity ? (
              <>{' '}{(vehicle.engineCapacity / 1000).toFixed(1)}</>
            ) : null}
          </h3>
        </Link>

        {/* Row 2–3: Specs Grid (3 × 2) */}
        <div className="grid grid-cols-3">
          {specs.map(({ label, value, icon }, i) => (
            <div
              key={label}
              className={[
                'p-3 sm:p-4 grid gap-1 text-center justify-items-center',
                i % 3 !== 0 ? '' : '',
                i >= 3 ? '' : '',
              ].join(' ')}
            >
              <div className="flex items-center gap-1 text-zinc-400">
                {icon}
                <span className="text-[9px] font-medium uppercase tracking-[0.2em]">{label}</span>
              </div>
              <span className={`text-sm ${isHomeVariant ? 'font-medium' : 'font-semibold'} text-zinc-900`}>{value}</span>
            </div>
          ))}
        </div>

        {/* Row 4: Price */}
        <div className="mt-auto p-4 sm:p-5 flex flex-col items-center gap-2">
          <div className="flex items-baseline gap-1">
            <span className={`text-[clamp(1.4rem,2.8vw,2.25rem)] ${isHomeVariant ? 'font-semibold' : 'font-bold'} tracking-widest text-black leading-none`}>
              {formatPrice(vehicle.price)}
            </span>
            <span className="text-xs font-medium text-zinc-400 ml-0.5">PLN</span>
          </div>
          <p className="text-[9px] font-medium uppercase tracking-[0.2em] text-zinc-400">
            Cena brutto, cena do negocjacji
          </p>
        </div>

      </div>
    </article>
  );
}
