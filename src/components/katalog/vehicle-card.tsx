'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  type CatalogVehicle,
  formatMileage,
  formatPrice,
} from '@/lib/vehicle-catalog';

type VehicleCardProps = {
  vehicle: CatalogVehicle;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const specs = [
    { label: 'Rok', value: String(vehicle.year) },
    { label: 'Przebieg', value: `${formatMileage(vehicle.mileage)} km` },
    { label: 'Moc', value: `${vehicle.power} KM` },
    { label: 'Paliwo', value: vehicle.fuelTypeLabel },
    { label: 'Skrzynia', value: vehicle.transmissionLabel },
    { label: 'Nadwozie', value: vehicle.bodyTypeLabel !== 'Nie podano' ? vehicle.bodyTypeLabel : '—' },
  ];

  return (
    <motion.article
      className="group relative flex h-full flex-col border border-zinc-200 bg-white transition-colors duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-zinc-950"
      whileHover="hovered"
      initial="idle"
    >
      {/* ── Image ── */}
      <Link
        className="relative block aspect-[4/3] overflow-hidden bg-zinc-100"
        href={`/oferta/${vehicle.slug}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        {vehicle.image ? (
          <motion.div
            className="absolute inset-0"
            variants={{
              idle: { scale: 1 },
              hovered: { scale: 1.045, transition: { duration: 0.9, ease } },
            }}
          >
            <Image
              alt={`${vehicle.make} ${vehicle.model}`}
              className="h-full w-full object-cover grayscale transition-[filter] duration-500 group-hover:grayscale-0"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              src={vehicle.image}
            />
          </motion.div>
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-zinc-400">
              Brak zdjęcia
            </span>
          </div>
        )}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.04)_50%,rgba(0,0,0,0.58)_100%)]" />

        {/* Top-left: index dot */}
        <div className="absolute left-0 top-0 border-b border-r border-white/20 bg-black/60 px-3 py-2 backdrop-blur-sm">
          <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.28em] text-white/70">
            {vehicle.statusLabel}
          </span>
        </div>

        {/* Bottom: year */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-3">
          <span className="text-[clamp(2.4rem,4vw,3.6rem)] font-semibold leading-none tracking-[-0.1em] text-white/20 select-none">
            {vehicle.year}
          </span>
          <motion.div
            className="flex h-9 w-9 items-center justify-center border border-white/30 bg-white/10 text-white backdrop-blur-sm"
            variants={{
              idle: { opacity: 0, y: 4 },
              hovered: { opacity: 1, y: 0, transition: { duration: 0.3, ease } },
            }}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </motion.div>
        </div>
      </Link>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col">

        {/* Brand + Model */}
        <div className="border-b border-zinc-200 px-5 py-5 transition-colors duration-500 group-hover:border-zinc-950/20">
          <Link href={`/oferta/${vehicle.slug}`} className="block">
            <p className="mb-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-zinc-400 transition-colors duration-300 group-hover:text-zinc-500">
              {vehicle.make}
            </p>
            <h3 className="text-[clamp(1.15rem,2.2vw,1.55rem)] font-semibold uppercase leading-[1.1] tracking-[-0.03em] text-zinc-950 transition-colors duration-300 group-hover:text-zinc-700">
              {vehicle.model}
            </h3>
            {vehicle.shortDescription && (
              <p className="mt-2 line-clamp-1 text-[0.78rem] leading-[1.6] text-zinc-500">
                {vehicle.shortDescription}
              </p>
            )}
          </Link>
        </div>

        {/* Specs grid — 3×2 */}
        <div className="grid grid-cols-3 border-b border-zinc-200 transition-colors duration-500 group-hover:border-zinc-950/20">
          {specs.map(({ label, value }, i) => (
            <div
              key={label}
              className={[
                'grid gap-1 px-4 py-3',
                i % 3 !== 0 ? 'border-l border-zinc-200 group-hover:border-zinc-950/20' : '',
                i >= 3 ? 'border-t border-zinc-200 group-hover:border-zinc-950/20' : '',
                'transition-colors duration-500',
              ].join(' ')}
            >
              <span className="text-[0.52rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                {label}
              </span>
              <span className="text-[0.75rem] font-semibold leading-tight text-zinc-900">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between gap-4 px-5 py-4">
          <div className="grid gap-0.5">
            <span className="text-[0.52rem] font-semibold uppercase tracking-[0.22em] text-zinc-400">
              Cena brutto
            </span>
            <span className="text-[clamp(1.25rem,2.5vw,1.65rem)] font-semibold leading-none tracking-[-0.04em] text-zinc-950">
              {formatPrice(vehicle.price)}
              <span className="ml-1 text-[0.6em] font-medium tracking-[0.02em] text-zinc-500">PLN</span>
            </span>
          </div>

          <Link
            href={`/oferta/${vehicle.slug}`}
            className="relative inline-flex h-10 items-center justify-center overflow-hidden border border-zinc-950 bg-zinc-950 px-4 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors duration-300 hover:bg-white hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
          >
            Szczegóły
          </Link>
        </div>

      </div>

      {/* Bottom accent line — appears on hover */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-zinc-950"
        variants={{
          idle: { scaleX: 0, transition: { duration: 0.3, ease: 'easeOut' } },
          hovered: { scaleX: 1, transition: { duration: 0.5, ease } },
        }}
      />
    </motion.article>
  );
}
