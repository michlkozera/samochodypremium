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

function IconCalendar() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function IconGauge() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 12 8.5 8.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <path strokeLinecap="round" d="M6.3 17a7 7 0 0 1 0-10" />
    </svg>
  );
}

function IconBolt() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 2 4.5 13.5H12L11 22l8.5-11.5H12L13 2Z" />
    </svg>
  );
}

function IconFuel() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 22V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 22h12" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 8h2a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h0a1 1 0 0 0 1-1V9l-3-3" />
      <line x1="6" y1="10" x2="9" y2="10" />
    </svg>
  );
}

function IconGear() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <circle cx="12" cy="12" r="3" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
    </svg>
  );
}

function IconCar() {
  return (
    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 17H3a1 1 0 0 1-1-1v-4l2.5-6h13L20 12v4a1 1 0 0 1-1 1h-2" />
      <circle cx="7.5" cy="17.5" r="1.5" />
      <circle cx="16.5" cy="17.5" r="1.5" />
      <line x1="10" y1="17" x2="14" y2="17" />
      <path strokeLinecap="round" d="M4.5 12h15" />
    </svg>
  );
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const specs = [
    { label: 'Paliwo', value: vehicle.fuelTypeLabel, icon: <IconFuel /> },
    { label: 'Skrzynia', value: vehicle.transmissionLabel, icon: <IconGear /> },
    { label: 'Nadwozie', value: vehicle.bodyTypeLabel !== 'Nie podano' ? vehicle.bodyTypeLabel : '—', icon: <IconCar /> },
    { label: 'Rocznik', value: String(vehicle.year), icon: <IconCalendar /> },
    { label: 'Przebieg', value: `${formatMileage(vehicle.mileage)} km`, icon: <IconGauge /> },
    { label: 'Moc', value: `${vehicle.power} KM`, icon: <IconBolt /> },
  ];

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

        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.06)_0%,rgba(0,0,0,0.06)_28%,rgba(0,0,0,0.52)_100%)]" />

        {/* Bottom overlay: status badge left + year right */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-4 pb-4">
          <div className="border border-white/20 bg-black/50 px-3 py-2 backdrop-blur-sm">
            <span className="block text-[0.58rem] font-semibold uppercase tracking-[0.2em] text-white">
              {vehicle.statusLabel}
            </span>
          </div>
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/70">
            {vehicle.year}
          </span>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        {/* Title + description */}
        <div className="grid gap-2">
          <Link href={`/oferta/${vehicle.slug}`}>
            <h3 className="text-[1.1rem] font-bold uppercase leading-tight tracking-[-0.02em] text-zinc-950 transition-colors group-hover:text-zinc-700 sm:text-[1.2rem]">
              {vehicle.make} {vehicle.model}
            </h3>
          </Link>
          <p className="line-clamp-2 text-[0.88rem] leading-[1.7] text-zinc-500">
            {vehicle.shortDescription}
          </p>
        </div>

        {/* 6-item specs grid */}
        <div className="grid grid-cols-3 gap-px bg-zinc-200">
          {specs.map(({ label, value, icon }) => (
            <div className="flex flex-col gap-1 bg-white px-2.5 py-2.5" key={label}>
              <span className="text-zinc-400">{icon}</span>
              <span className="block text-[0.54rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
                {label}
              </span>
              <span className="block text-[0.78rem] font-semibold leading-tight text-zinc-900">
                {value}
              </span>
            </div>
          ))}
        </div>

        {/* Bottom: price tile + CTA */}
        <div className="mt-auto flex items-stretch">
          <div className="flex flex-1 flex-col justify-center bg-zinc-950 px-4 py-3 transition-colors duration-200 hover:bg-zinc-700">
            <span className="block text-[0.52rem] font-medium uppercase tracking-[0.18em] text-white/50">
              Cena brutto
            </span>
            <span className="block text-[0.92rem] font-semibold tracking-[-0.02em] text-white sm:text-[1rem]">
              {formatPrice(vehicle.price)} PLN
            </span>
          </div>
          <Link
            className="inline-flex shrink-0 items-center gap-2 border-l border-zinc-800 bg-zinc-950 px-4 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-200 hover:bg-zinc-700"
            href={`/oferta/${vehicle.slug}`}
          >
            Szczegóły oferty
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
