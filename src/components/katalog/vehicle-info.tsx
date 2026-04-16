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
  const specs = [
    {
      label: 'Rok',
      value: String(vehicle.year),
      icon: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" /></svg>,
    },
    {
      label: 'Przebieg',
      value: `${formatMileage(vehicle.mileage)} km`,
      icon: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      label: 'Moc',
      value: `${vehicle.power} KM`,
      icon: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" /></svg>,
    },
    {
      label: 'Paliwo',
      value: vehicle.fuelTypeLabel,
      icon: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.623a8.25 8.25 0 013.138-5.04A8.25 8.25 0 0115.362 5.214z" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" /></svg>,
    },
    {
      label: 'Skrzynia',
      value: vehicle.transmissionLabel,
      icon: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg>,
    },
    {
      label: 'Napęd',
      value: vehicle.driveTrainLabel,
      icon: <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" /></svg>,
    },
  ];

  return (
    <div className="grid gap-5 lg:gap-6">
      {/* Breadcrumb */}
      <nav className="hidden items-center gap-1.5 border border-zinc-300 px-4 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-400 sm:flex sm:flex-wrap">
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

      {/* ── Card container ── */}
      <div className="border border-zinc-200 bg-white">

        {/* Brand + Model | Description */}
        <div className="grid grid-cols-1 border-b border-zinc-200 sm:grid-cols-2">
          <div className="px-4 py-5 sm:px-5 sm:py-6">
            <p className="mb-1 text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-zinc-400">
              {vehicle.make}
            </p>
            <h1 className="section-title">
              {vehicle.model}
            </h1>
          </div>
          <div className="flex items-center border-t border-zinc-200 px-4 py-5 sm:border-t-0 sm:border-l sm:px-5 sm:py-6">
            {vehicle.shortDescription && (
              <p className="text-[0.82rem] leading-[1.8] text-zinc-500">
                {vehicle.shortDescription}
              </p>
            )}
          </div>
        </div>

        {/* Specs grid — 3×2 with icons */}
        <div className="grid grid-cols-3 border-b border-zinc-200">
          {specs.map(({ label, value, icon }, i) => (
            <div
              key={label}
              className={[
                'grid gap-1 px-3 py-3 sm:px-4 sm:py-4',
                i % 3 !== 0 ? 'border-l border-zinc-200' : '',
                i >= 3 ? 'border-t border-zinc-200' : '',
              ].join(' ')}
            >
              <span className="mb-0.5 text-zinc-400">{icon}</span>
              <span className="text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {label}
              </span>
              <span className="text-[0.75rem] font-semibold leading-tight text-zinc-900 sm:text-[0.88rem]">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Price | CTA */}
        <div className="grid grid-cols-1 sm:grid-cols-2">
          <div className="grid gap-1.5 px-4 py-5 sm:px-5 sm:py-6">
            <span className="text-[0.52rem] font-semibold uppercase tracking-[0.2em] text-zinc-400">
              Cena brutto
            </span>
            <span className="text-[clamp(1.5rem,4.5vw,2.2rem)] font-semibold leading-none tracking-[-0.04em] text-zinc-950">
              {formatPrice(vehicle.price)}
              <span className="ml-1.5 text-[0.55em] font-medium tracking-[0.02em] text-zinc-500">PLN</span>
            </span>
          </div>

          <a
            href="#kontakt-oferta"
            className="group/btn flex items-center justify-center gap-2 border-t border-zinc-200 bg-white px-4 py-5 text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-zinc-950 transition-colors duration-200 hover:bg-zinc-950 hover:text-white sm:border-t-0 sm:border-l sm:py-6"
          >
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
            </svg>
            Umów jazdę
          </a>
        </div>

      </div>

      {/* ── Leasing note — separate bordered panel ── */}
      <div className="border border-zinc-200 bg-white">
        <div className="flex items-start gap-3 px-4 py-4 sm:px-5">
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
    </div>
  );
}
