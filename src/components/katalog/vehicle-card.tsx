'use client';

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
  const specs = [
    { label: 'Rok', value: String(vehicle.year) },
    { label: 'Przebieg', value: `${formatMileage(vehicle.mileage)} km` },
    { label: 'Moc', value: `${vehicle.power} KM` },
    { label: 'Paliwo', value: vehicle.fuelTypeLabel },
    { label: 'Skrzynia', value: vehicle.transmissionLabel },
    { label: 'Nadwozie', value: vehicle.bodyTypeLabel !== 'Nie podano' ? vehicle.bodyTypeLabel : '—' },
  ];

  return (
    <article className="group flex h-full flex-col border border-zinc-200 bg-white">
      {/* ── Image ── */}
      <Link
        className="relative block aspect-[16/10] overflow-hidden bg-zinc-100"
        href={`/oferta/${vehicle.slug}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        {vehicle.image ? (
          <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]">
            <Image
              alt={`${vehicle.make} ${vehicle.model}`}
              className="h-full w-full object-cover"
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
        <div className="absolute left-0 bottom-0 border-r border-t border-white/20 bg-black/60 px-3 py-2 backdrop-blur-sm">
          <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-white/80">
            {vehicle.year}
          </span>
        </div>

        {/* Bottom-right: status label */}
        <div className="absolute right-0 bottom-0 border-l border-t border-white/20 bg-black/60 px-3 py-2 backdrop-blur-sm">
          <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-white/80">
            {vehicle.statusLabel}
          </span>
        </div>
      </Link>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col">

        {/* Brand + Model */}
        <div className="border-b border-zinc-200 px-4 py-4">
          <Link href={`/oferta/${vehicle.slug}`} className="block">
            <p className="mb-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-zinc-400">
              {vehicle.make}
            </p>
            <h3 className="text-[clamp(1.15rem,2.2vw,1.55rem)] font-semibold uppercase leading-[1.1] tracking-[-0.03em] text-zinc-950">
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
        <div className="grid grid-cols-3 border-b border-zinc-200">
          {specs.map(({ label, value }, i) => (
            <div
              key={label}
              className={[
                'grid gap-0.5 px-3 py-2.5',
                i % 3 !== 0 ? 'border-l border-zinc-200' : '',
                i >= 3 ? 'border-t border-zinc-200' : '',
              ].join(' ')}
            >
              <span className="text-[0.5rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">
                {label}
              </span>
              <span className="text-[0.7rem] font-semibold leading-tight text-zinc-900">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="mt-auto flex items-center justify-between gap-4 px-4 py-3">
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

    </article>
  );
}
