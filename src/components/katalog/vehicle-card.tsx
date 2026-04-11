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
    <article className="offer-surface group flex h-full flex-col" data-interactive="true">
      <Link
        className="relative m-3 block aspect-[16/10] overflow-hidden rounded-[1.35rem] bg-zinc-100"
        href={`/oferta/${vehicle.slug}`}
      >
        {vehicle.image ? (
          <Image
            alt={`${vehicle.make} ${vehicle.model}`}
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            src={vehicle.image}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-zinc-400">
            Brak zdjecia
          </div>
        )}

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,23,42,0.08)_0%,rgba(15,23,42,0.08)_28%,rgba(15,23,42,0.54)_100%)]" />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {vehicle.featured ? (
            <span className="offer-chip border-white/20 bg-white/88 text-zinc-950">
              Wyróznione
            </span>
          ) : null}
          <span className="offer-chip border-white/16 bg-black/45 text-white">
            {vehicle.statusLabel}
          </span>
        </div>

        <div className="absolute inset-x-4 bottom-4">
          <div className="flex items-end justify-between gap-3 rounded-[1.15rem] border border-white/14 bg-black/28 px-4 py-3 text-white backdrop-blur-md">
            <div className="grid gap-1">
              <span className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-white/60">
                Cena brutto
              </span>
              <span className="text-lg font-semibold tracking-[-0.03em] sm:text-[1.3rem]">
                {formatPrice(vehicle.price)} PLN
              </span>
            </div>
            <span className="text-right text-[0.68rem] font-medium uppercase tracking-[0.16em] text-white/70">
              {vehicle.year}
            </span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-5 px-5 pb-5 pt-1 sm:px-6 sm:pb-6">
        <div className="flex flex-wrap gap-2">
          <span className="offer-chip">{vehicle.fuelTypeLabel}</span>
          <span className="offer-chip">{vehicle.transmissionLabel}</span>
        </div>

        <div className="grid gap-2.5">
          <Link className="group/link inline-flex w-fit" href={`/oferta/${vehicle.slug}`}>
            <h3 className="text-[1.02rem] font-semibold leading-tight tracking-[-0.02em] text-zinc-950 transition-colors duration-300 group-hover/link:text-zinc-600 sm:text-[1.08rem]">
              {vehicle.make} {vehicle.model}
            </h3>
          </Link>
          <p className="text-[0.85rem] leading-[1.75] text-zinc-500">
            {vehicle.shortDescription}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2.5">
          {[
            ['Rocznik', String(vehicle.year)],
            ['Przebieg', `${formatMileage(vehicle.mileage)} km`],
            ['Moc', `${vehicle.power} KM`],
            [
              'Silnik',
              vehicle.engineCapacity ? `${(vehicle.engineCapacity / 1000).toFixed(1)} l` : 'EV',
            ],
            ['Paliwo', vehicle.fuelTypeLabel],
            ['Skrzynia', vehicle.transmissionLabel],
          ].map(([label, value]) => (
            <div
              className="rounded-[1.1rem] border border-zinc-100 bg-white/75 px-3 py-3"
              key={label}
            >
              <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {label}
              </span>
              <span className="mt-1 block text-[0.8rem] font-semibold leading-tight text-zinc-900">
                {value}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-1">
          <Link
            className="btn-premium h-11 min-h-0 w-full justify-center px-5 text-[0.64rem]"
            href={`/oferta/${vehicle.slug}`}
          >
            Zobacz szczegoly
          </Link>
        </div>
      </div>
    </article>
  );
}
