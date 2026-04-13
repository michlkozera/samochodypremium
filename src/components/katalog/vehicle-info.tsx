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
    <div className="grid gap-6 lg:gap-7">
      <nav className="hidden items-center gap-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-400 sm:flex sm:flex-wrap">
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
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center border border-zinc-950 bg-zinc-950 px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white">
            {vehicle.statusLabel}
          </span>
          <span className="inline-flex items-center border border-zinc-200 bg-white px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-zinc-600">
            {vehicle.fuelTypeLabel}
          </span>
          <span className="inline-flex items-center border border-zinc-200 bg-white px-2.5 py-1 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-zinc-600">
            {vehicle.transmissionLabel}
          </span>
        </div>

        <h1 className="text-[clamp(1.55rem,5vw,2.6rem)] font-semibold uppercase leading-[1.06] tracking-[-0.03em] text-zinc-950">
          {vehicle.make} {vehicle.model}
        </h1>
        <p className="text-[0.85rem] leading-[1.8] text-zinc-500 sm:max-w-xl">
          {vehicle.shortDescription}
        </p>
      </div>

      <div className="border border-zinc-200 bg-white">
        <div className="flex flex-wrap items-end justify-between gap-3 border-b border-zinc-200 p-4 sm:p-5">
          <div className="grid gap-1">
            <span className="eyebrow text-zinc-400">Cena brutto</span>
            <span className="text-[clamp(1.6rem,5vw,2.3rem)] font-semibold tracking-[-0.04em] text-zinc-950">
              {formatPrice(vehicle.price)}&nbsp;PLN
            </span>
          </div>
          <span className="border border-zinc-200 px-2.5 py-1.5 text-[0.58rem] font-semibold uppercase tracking-[0.16em] text-zinc-500">
            Leasing od {formatPrice(vehicle.monthlyRate)}&nbsp;PLN / mies.
          </span>
        </div>
        <div className="flex items-start gap-3 p-4 sm:p-5">
          <svg
            className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400"
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
          <p className="text-[0.78rem] leading-[1.75] text-zinc-500">
            Szacunkowa rata leasingu od{' '}
            <strong className="font-semibold text-zinc-950">
              {formatPrice(vehicle.monthlyRate)}&nbsp;PLN
            </strong>{' '}
            miesięcznie.{' '}
            <Link
              className="font-semibold text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition-colors duration-200 hover:text-zinc-600 hover:decoration-zinc-500"
              href="/finansowanie"
            >
              Zobacz szczegóły finansowania
            </Link>
            .
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-px bg-zinc-200 sm:grid-cols-3">
        {[
          ['Rok', String(vehicle.year)],
          ['Przebieg', `${formatMileage(vehicle.mileage)} km`],
          ['Moc', `${vehicle.power} KM`],
          ['Paliwo', vehicle.fuelTypeLabel],
          ['Skrzynia', vehicle.transmissionLabel],
          ['Napęd', vehicle.driveTrainLabel],
        ].map(([label, value]) => (
          <div className="bg-white px-3 py-3 sm:px-4 sm:py-4" key={label}>
            <span className="block text-[0.54rem] font-semibold uppercase tracking-[0.16em] text-zinc-400">
              {label}
            </span>
            <span className="mt-1 block text-[0.78rem] font-semibold leading-tight text-zinc-950 sm:text-[0.88rem]">
              {value}
            </span>
          </div>
        ))}
      </div>

      <div className="hidden flex-col gap-3 sm:flex sm:flex-row">
        <a className="btn-premium w-full sm:w-fit" href="#kontakt-oferta">
          Zapytaj o ten pojazd
        </a>
        <a className="btn-premium-ghost w-full sm:w-fit" href={vehicle.advisor.phoneHref}>
          Zadzwoń teraz
        </a>
      </div>

      <div className="flex flex-col gap-3 sm:hidden">
        <a className="btn-premium w-full justify-center" href="#kontakt-oferta">
          Zapytaj o ten pojazd
        </a>
        <a className="btn-premium-ghost w-full justify-center" href={vehicle.advisor.phoneHref}>
          Zadzwoń teraz
        </a>
      </div>
    </div>
  );
}
