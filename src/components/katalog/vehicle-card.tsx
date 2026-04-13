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
  return (
    <article className="group flex h-full flex-col border border-zinc-200 bg-white">
      {/* Image */}
      <Link
        className="relative block aspect-[16/10] overflow-hidden bg-zinc-100"
        href={`/oferta/${vehicle.slug}`}
      >
        {vehicle.image ? (
          <Image
            alt={`${vehicle.make} ${vehicle.model}`}
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            src={vehicle.image}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            Brak zdjęcia
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.06)_28%,rgba(0,0,0,0.48)_100%)]" />

        {/* Status badge */}
        <div className="absolute left-0 top-0">
          <span className="inline-block border-b border-r border-white/20 bg-black/50 px-2.5 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm">
            {vehicle.statusLabel}
          </span>
        </div>

        {/* Price overlay */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-4">
          <div className="border border-white/20 bg-black/45 px-3 py-2 backdrop-blur-sm">
            <span className="block text-[0.56rem] font-medium uppercase tracking-[0.18em] text-white/60">
              Cena brutto
            </span>
            <span className="block text-base font-semibold tracking-[-0.02em] text-white sm:text-[1.15rem]">
              {formatPrice(vehicle.price)} PLN
            </span>
          </div>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/70">
            {vehicle.year}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {[vehicle.fuelTypeLabel, vehicle.transmissionLabel, vehicle.bodyTypeLabel !== 'Nie podano' ? vehicle.bodyTypeLabel : null]
            .filter(Boolean)
            .map((tag) => (
              <span
                key={tag}
                className="border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-zinc-600"
              >
                {tag}
              </span>
            ))}
        </div>

        {/* Title */}
        <div className="grid gap-2">
          <Link href={`/oferta/${vehicle.slug}`}>
            <h3 className="text-[0.95rem] font-semibold uppercase leading-tight tracking-[-0.01em] text-zinc-950 sm:text-[1rem]">
              {vehicle.make} {vehicle.model}
            </h3>
          </Link>
          <p className="line-clamp-2 text-[0.82rem] leading-[1.7] text-zinc-500">
            {vehicle.shortDescription}
          </p>
        </div>

        {/* Specs grid */}
        <div className="grid grid-cols-3 gap-px bg-zinc-200">
          {[
            ['Rocznik', String(vehicle.year)],
            ['Przebieg', `${formatMileage(vehicle.mileage)} km`],
            ['Moc', `${vehicle.power} KM`],
          ].map(([label, value]) => (
            <div className="bg-white px-2.5 py-2.5" key={label}>
              <span className="block text-[0.56rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {label}
              </span>
              <span className="mt-1 block text-[0.78rem] font-semibold leading-tight text-zinc-900">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-auto">
          <Link
            className="btn-premium h-10 min-h-10 w-full px-5 text-[0.64rem]"
            href={`/oferta/${vehicle.slug}`}
          >
            Zobacz szczegóły
          </Link>
        </div>
      </div>
    </article>
  );
}
