import Link from 'next/link';
import {
  type CatalogVehicleDetail,
  formatMileage,
  formatPrice,
} from '@/lib/vehicle-catalog';

type VehicleInfoProps = {
  vehicle: CatalogVehicleDetail;
};

export function VehicleInfo({ vehicle }: VehicleInfoProps) {
  return (
    <div className="grid gap-6">
      <nav className="flex flex-wrap items-center gap-1.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-zinc-400">
        <Link className="transition-colors duration-200 hover:text-zinc-950" href="/">
          Start
        </Link>
        <span>/</span>
        <Link className="transition-colors duration-200 hover:text-zinc-950" href="/oferta">
          Oferta
        </Link>
        <span>/</span>
        <span className="text-zinc-600">
          {vehicle.make} {vehicle.model}
        </span>
      </nav>

      <div className="grid gap-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="offer-chip">{vehicle.statusLabel}</span>
          <span className="offer-chip">{vehicle.fuelTypeLabel}</span>
          <span className="offer-chip">{vehicle.transmissionLabel}</span>
        </div>

        <div className="grid gap-2">
          <h1 className="text-[clamp(1.9rem,4vw,3.15rem)] font-semibold uppercase leading-[1.02] tracking-[-0.04em] text-zinc-950">
            {vehicle.make} {vehicle.model}
          </h1>
          <p className="max-w-2xl text-[0.95rem] leading-[1.8] text-zinc-500">
            {vehicle.shortDescription}
          </p>
        </div>
      </div>

      <div className="offer-surface grid gap-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="grid gap-1">
            <span className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              Cena brutto
            </span>
            <span className="text-[clamp(2rem,4vw,2.8rem)] font-semibold tracking-[-0.04em] text-zinc-950">
              {formatPrice(vehicle.price)} PLN
            </span>
          </div>
          <div className="offer-chip">
            Leasing od {formatPrice(vehicle.monthlyRate)} PLN / mies.
          </div>
        </div>

        <div className="rounded-[1.35rem] border border-zinc-200/70 bg-white/78 px-4 py-3.5">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 shrink-0 text-zinc-400"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              viewBox="0 0 24 24"
            >
              <path
                d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-[0.84rem] leading-[1.75] text-zinc-600">
              Szacunkowa rata leasingu od{' '}
              <strong className="font-semibold text-zinc-950">
                {formatPrice(vehicle.monthlyRate)} PLN
              </strong>{' '}
              miesiecznie.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          ['Rok', String(vehicle.year)],
          ['Przebieg', `${formatMileage(vehicle.mileage)} km`],
          ['Moc', `${vehicle.power} KM`],
          ['Paliwo', vehicle.fuelTypeLabel],
          ['Skrzynia', vehicle.transmissionLabel],
          ['Naped', vehicle.driveTrainLabel],
        ].map(([label, value]) => (
          <div className="offer-surface rounded-[1.35rem] px-4 py-4" key={label}>
            <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
              {label}
            </span>
            <span className="mt-2 block text-[0.88rem] font-semibold leading-tight text-zinc-900">
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <a className="btn-premium w-full sm:w-fit" href="#kontakt-oferta">
          Zapytaj o ten pojazd
        </a>
        <a className="btn-premium-ghost w-full sm:w-fit" href={vehicle.advisor.phoneHref}>
          Zadzwon teraz
        </a>
      </div>
    </div>
  );
}
