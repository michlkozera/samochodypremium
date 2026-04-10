import Link from 'next/link';
import { type Vehicle, formatPrice, formatMileage } from '@/data/vehicles';

type VehicleInfoProps = {
  vehicle: Vehicle;
};

export function VehicleInfo({ vehicle }: VehicleInfoProps) {
  return (
    <div className="grid gap-6">
      {/* ── Breadcrumb ── */}
      <nav className="flex flex-wrap items-center gap-1.5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-zinc-400">
        <Link className="transition-colors duration-200 hover:text-zinc-950" href="/">Start</Link>
        <span>/</span>
        <Link className="transition-colors duration-200 hover:text-zinc-950" href="/oferta">Oferta</Link>
        <span>/</span>
        <span className="text-zinc-600">{vehicle.brand} {vehicle.model}</span>
      </nav>

      {/* ── Title ── */}
      <div className="grid gap-2">
        <h1 className="text-[clamp(1.5rem,4vw,2.4rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-zinc-950">
          {vehicle.brand} {vehicle.model}
        </h1>
        <p className="text-[0.9rem] leading-relaxed text-zinc-500">
          {vehicle.shortDescription}
        </p>
      </div>

      {/* ── Price block ── */}
      <div className="grid gap-3 border-t border-zinc-200/60 pt-5">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-[clamp(1.6rem,4vw,2.2rem)] font-bold tracking-[-0.03em] text-zinc-950">
            {formatPrice(vehicle.price)} PLN
          </span>
          <span className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-zinc-400">
            brutto
          </span>
        </div>
        <div className="inline-flex items-center gap-2 rounded-sm bg-zinc-50 px-3 py-2">
          <svg className="h-4 w-4 text-zinc-400" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[0.82rem] text-zinc-600">
            Rata leasingu od <strong className="font-semibold text-zinc-950">{formatPrice(vehicle.monthlyRate)} PLN</strong> / mies.
          </span>
        </div>
      </div>

      {/* ── Quick specs ── */}
      <div className="grid grid-cols-2 gap-3 border-t border-zinc-200/60 pt-5 sm:grid-cols-3">
        {[
          ['Rok', String(vehicle.year)],
          ['Przebieg', `${formatMileage(vehicle.mileage)} km`],
          ['Moc', `${vehicle.power} KM`],
          ['Paliwo', vehicle.fuel],
          ['Skrzynia', vehicle.gearbox],
          ['Napęd', vehicle.drive],
        ].map(([label, value]) => (
          <div className="grid gap-0.5 border border-zinc-100 px-3 py-2.5" key={label}>
            <span className="text-[0.6rem] font-medium uppercase tracking-[0.18em] text-zinc-400">{label}</span>
            <span className="text-[0.82rem] font-semibold capitalize text-zinc-800">{value}</span>
          </div>
        ))}
      </div>

      {/* ── CTA buttons ── */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <a className="btn-premium w-full sm:w-fit" href="#kontakt-oferta">
          Zapytaj o ten pojazd
        </a>
        <a className="btn-premium-ghost w-full sm:w-fit" href="tel:+48221002000">
          Zadzwoń teraz
        </a>
      </div>
    </div>
  );
}
