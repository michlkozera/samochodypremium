import Link from 'next/link';
import Image from 'next/image';
import { type Vehicle, formatPrice, formatMileage } from '@/data/vehicles';

type VehicleCardProps = {
  vehicle: Vehicle;
};

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const fuelLabels: Record<string, string> = {
    benzyna: 'Benzyna',
    diesel: 'Diesel',
    elektryczny: 'Elektryczny',
    hybryda: 'Hybryda',
  };

  return (
    <article className="group relative flex flex-col overflow-hidden border border-zinc-200 bg-white transition-shadow duration-300 hover:shadow-[0_18px_60px_rgba(0,0,0,0.08)]">
      {/* ── Image ── */}
      <Link
        className="relative block aspect-[16/10] overflow-hidden bg-zinc-100"
        href={`/oferta/${vehicle.slug}`}
      >
        <Image
          alt={`${vehicle.brand} ${vehicle.model}`}
          className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={vehicle.image}
        />
        {vehicle.featured && (
          <span className="absolute left-3 top-3 inline-flex h-6 items-center bg-zinc-950 px-2.5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-white">
            Wyróżnione
          </span>
        )}
      </Link>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
        {/* Title & description */}
        <div className="grid gap-2">
          <Link className="group/link" href={`/oferta/${vehicle.slug}`}>
            <h3 className="text-[0.95rem] font-semibold leading-tight tracking-[-0.01em] text-zinc-950 transition-colors duration-200 group-hover/link:text-zinc-600 sm:text-base">
              {vehicle.brand} {vehicle.model}
            </h3>
          </Link>
          <p className="text-[0.82rem] leading-relaxed text-zinc-500">
            {vehicle.shortDescription}
          </p>
        </div>

        {/* ── Key specs grid ── */}
        <div className="grid grid-cols-3 gap-x-3 gap-y-2.5 border-t border-zinc-100 pt-4">
          <div className="grid gap-0.5">
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-zinc-400">Rocznik</span>
            <span className="text-[0.82rem] font-semibold text-zinc-800">{vehicle.year}</span>
          </div>
          <div className="grid gap-0.5">
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-zinc-400">Przebieg</span>
            <span className="text-[0.82rem] font-semibold text-zinc-800">{formatMileage(vehicle.mileage)} km</span>
          </div>
          <div className="grid gap-0.5">
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-zinc-400">Moc</span>
            <span className="text-[0.82rem] font-semibold text-zinc-800">{vehicle.power} KM</span>
          </div>
          <div className="grid gap-0.5">
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-zinc-400">Pojemność</span>
            <span className="text-[0.82rem] font-semibold text-zinc-800">{vehicle.displacement} l</span>
          </div>
          <div className="grid gap-0.5">
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-zinc-400">Paliwo</span>
            <span className="text-[0.82rem] font-semibold text-zinc-800">{fuelLabels[vehicle.fuel]}</span>
          </div>
          <div className="grid gap-0.5">
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-zinc-400">Skrzynia</span>
            <span className="text-[0.82rem] font-semibold text-zinc-800 capitalize">{vehicle.gearbox}</span>
          </div>
        </div>

        {/* ── Price & CTA ── */}
        <div className="mt-auto flex items-end justify-between gap-3 border-t border-zinc-100 pt-4">
          <div className="grid gap-0.5">
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-zinc-400">Cena brutto</span>
            <span className="text-lg font-bold tracking-[-0.02em] text-zinc-950 sm:text-xl">
              {formatPrice(vehicle.price)} PLN
            </span>
          </div>
          <Link
            className="btn-premium h-10 min-h-0 shrink-0 px-4 text-[0.62rem] sm:px-5"
            href={`/oferta/${vehicle.slug}`}
          >
            Zobacz szczegóły
          </Link>
        </div>
      </div>
    </article>
  );
}
