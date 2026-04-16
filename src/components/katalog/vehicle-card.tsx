'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  type CatalogVehicle,
  formatMileage,
  formatPrice,
} from '@/lib/vehicle-catalog';
import {
  contactPhone,
  contactPhoneHref,
  contactEmail,
  contactEmailHref,
  contactAddress,
} from '@/data/site';

type VehicleCardProps = {
  vehicle: CatalogVehicle;
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [shadow, setShadow] = useState('0 8px 30px rgba(0,0,0,0.08)');
  const cardRef = useRef<HTMLElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const dx = (x / rect.width) * 28;
    const dy = (y / rect.height) * 28;
    setShadow(`${dx}px ${dy + 12}px 40px rgba(0,0,0,0.16), 0 4px 12px rgba(0,0,0,0.08)`);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setShadow('0 8px 30px rgba(0,0,0,0.08)');
  }, []);

  const specs = [
    {
      label: 'Rok',
      value: String(vehicle.year),
      icon: <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>,
    },
    {
      label: 'Przebieg',
      value: `${formatMileage(vehicle.mileage)} km`,
      icon: <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      label: 'Moc',
      value: `${vehicle.power} KM`,
      icon: <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
    },
    {
      label: 'Paliwo',
      value: vehicle.fuelTypeLabel,
      icon: <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.623a8.25 8.25 0 013.138-5.04A8.25 8.25 0 0115.362 5.214z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" /></svg>,
    },
    {
      label: 'Skrzynia',
      value: vehicle.transmissionLabel,
      icon: <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>,
    },
    {
      label: 'Nadwozie',
      value: vehicle.bodyTypeLabel !== 'Nie podano' ? vehicle.bodyTypeLabel : '—',
      icon: <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>,
    },
  ];

  return (
    <>
    <article
      ref={cardRef}
      className="group flex h-full flex-col border border-zinc-200 bg-white"
      style={{ boxShadow: shadow, transition: 'box-shadow 0.15s ease' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ── Image ── */}
      <Link
        className="relative block aspect-[16/9] overflow-hidden bg-zinc-100"
        href={`/oferta/${vehicle.slug}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        {vehicle.image ? (
          <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
            <Image
              alt={`${vehicle.make} ${vehicle.model}`}
              className={`h-full w-full object-cover${vehicle.status === 'RESERVED' ? ' grayscale' : ''}`}
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              src={vehicle.image}
            />
          </div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-400">
              Brak zdjęcia
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.04)_50%,rgba(0,0,0,0.58)_100%)]" />

        {/* Bottom-left: year */}
        <div className="absolute left-0 bottom-0 border-r border-t border-white/10 bg-white/10 px-3 py-2 backdrop-blur-md backdrop-saturate-150">
          <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-white drop-shadow-sm">
            {vehicle.year}
          </span>
        </div>

        {/* Bottom-right: status label */}
        <div className="absolute right-0 bottom-0 border-l border-t border-white/10 bg-white/10 px-3 py-2 backdrop-blur-md backdrop-saturate-150">
          <span className={`block text-[0.6rem] font-semibold uppercase tracking-[0.28em] drop-shadow-sm${vehicle.status === 'RESERVED' ? ' text-orange-400' : ' text-white'}`}>
            {vehicle.statusLabel}
          </span>
        </div>

        {/* Hover CTA — slides up from bottom */}
        <div className="absolute inset-x-0 bottom-0 translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 border-t border-white/20 bg-white/15 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md backdrop-saturate-150 transition-colors duration-200 hover:bg-white/25"
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setModalOpen(true); }}
          >
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            Zadzwoń teraz
          </button>
        </div>
      </Link>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col">

        {/* Brand + Model | Description */}
        <div className="grid grid-cols-2 border-b border-zinc-200">
          <Link href={`/oferta/${vehicle.slug}`} className="block px-3.5 py-3">
            <p className="mb-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-zinc-400">
              {vehicle.make}
            </p>
            <h3 className="text-[clamp(0.9rem,1.8vw,1.2rem)] font-semibold uppercase leading-[1.1] tracking-[-0.03em] text-zinc-950">
              {vehicle.model}
            </h3>
          </Link>
          <div className="flex items-center border-l border-zinc-200 px-3.5 py-3">
            {vehicle.shortDescription && (
              <p className="line-clamp-3 text-[0.65rem] leading-[1.6] text-zinc-500">
                {vehicle.shortDescription}
              </p>
            )}
          </div>
        </div>

        {/* Specs grid — 3×2 */}
        <div className="grid grid-cols-3 border-b border-zinc-200">
          {specs.map(({ label, value, icon }, i) => (
            <div
              key={label}
              className={[
                'grid gap-0.5 px-2.5 py-2',
                i % 3 !== 0 ? 'border-l border-zinc-200' : '',
                i >= 3 ? 'border-t border-zinc-200' : '',
              ].join(' ')}
            >
              <span className="mb-0.5 text-zinc-400">{icon}</span>
              <span className="text-[0.45rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {label}
              </span>
              <span className="text-[0.65rem] font-semibold leading-tight text-zinc-900">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Price | CTA */}
        <div className="mt-auto grid grid-cols-2">
          <div className="grid gap-0.5 px-3.5 py-3">
            <span className="text-[0.48rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Cena brutto
            </span>
            <span className="text-[clamp(1rem,2vw,1.3rem)] font-semibold leading-none tracking-[-0.04em] text-zinc-950">
              {formatPrice(vehicle.price)}
              <span className="ml-1 text-[0.6em] font-medium tracking-[0.02em] text-zinc-500">PLN</span>
            </span>
          </div>

          <Link
            href={`/oferta/${vehicle.slug}`}
            className="group/btn flex items-center justify-center gap-1.5 border-l border-zinc-200 bg-white px-3 py-3 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-zinc-950 transition-colors duration-200 hover:bg-zinc-950 hover:text-white"
          >
            Szczegóły
            <svg className="h-3 w-3 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </div>

      </div>

    </article>

      {/* ── Contact Modal ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={() => setModalOpen(false)}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Card */}
          <div
            className="relative z-10 w-full max-w-sm border border-zinc-200 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between border-b border-zinc-200 px-6 py-5">
              <div>
                <p className="text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-zinc-400">
                  {vehicle.make}
                </p>
                <h3 className="mt-0.5 text-[1rem] font-semibold uppercase tracking-[-0.02em] text-zinc-950">
                  {vehicle.model}
                </h3>
              </div>
              <button
                type="button"
                className="ml-4 mt-0.5 p-1 text-zinc-400 transition-colors hover:text-zinc-950"
                onClick={() => setModalOpen(false)}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Contact rows */}
            <div className="divide-y divide-zinc-100 px-6 py-4">
              <div className="flex items-center gap-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-zinc-100 text-zinc-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </span>
                <div className="grid gap-0.5">
                  <span className="text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">Telefon</span>
                  <a href={contactPhoneHref} className="text-[0.9rem] font-semibold tracking-[-0.01em] text-zinc-950 hover:text-zinc-600 transition-colors">
                    {contactPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-zinc-100 text-zinc-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </span>
                <div className="grid gap-0.5">
                  <span className="text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">E-mail</span>
                  <a href={contactEmailHref} className="text-[0.9rem] font-semibold tracking-[-0.01em] text-zinc-950 hover:text-zinc-600 transition-colors">
                    {contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 py-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-zinc-100 text-zinc-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </span>
                <div className="grid gap-0.5">
                  <span className="text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">Adres</span>
                  <span className="text-[0.9rem] font-semibold tracking-[-0.01em] text-zinc-950">{contactAddress}</span>
                </div>
              </div>
            </div>

            {/* Footer CTA */}
            <div className="border-t border-zinc-200 px-6 py-4">
              <a
                href={contactPhoneHref}
                className="flex items-center justify-center gap-2 bg-zinc-950 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:bg-zinc-800"
              >
                <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
                Zadzwoń teraz
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
