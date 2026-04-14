import Link from 'next/link';
import Image from 'next/image';
import { MotionReveal } from '@/components/ui/motion-reveal';
import { type CatalogVehicle, formatPrice, formatMileage } from '@/lib/vehicle-catalog';

type LatestOffersProps = {
  vehicles: CatalogVehicle[];
};

export function LatestOffers({ vehicles }: LatestOffersProps) {
  // Take only first 5 vehicles (already sorted by latest)
  const latestVehicles = vehicles.slice(0, 5);

  return (
    <section className="border-b border-zinc-200 bg-white py-16 sm:py-20 lg:py-24">
      <div className="site-shell">
        {/* Header */}
        <MotionReveal className="mb-10 sm:mb-12">
          <div className="flex items-end justify-between">
            <div>
              <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-zinc-500 mb-3">
                Aktualna kolekcja
              </span>
              <h2 className="text-[1.6rem] font-semibold leading-[1.1] tracking-[-0.02em] text-zinc-950 sm:text-[1.8rem]">
                Najnowsze oferty
              </h2>
            </div>
            <Link
              href="/oferta"
              className="hidden sm:inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-zinc-950 hover:text-zinc-600 transition-colors"
            >
              Zobacz wszystkie
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>
        </MotionReveal>

        {/* Horizontal cards - image left, content right */}
        <MotionReveal stagger={0.08} delay={0.1}>
          <div className="flex flex-col gap-3">
            {latestVehicles.map((vehicle) => (
              <Link
                key={vehicle.id}
                href={`/oferta/${vehicle.slug}`}
                className="group flex flex-row overflow-hidden border border-zinc-200 bg-white hover:border-zinc-300 transition-colors"
              >
                {/* Image - left side, compact height */}
                <div className="relative w-[200px] h-[140px] sm:w-[260px] sm:h-[160px] lg:w-[320px] lg:h-[180px] flex-shrink-0 overflow-hidden bg-zinc-100">
                  {vehicle.image ? (
                    <Image
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                      fill
                      sizes="(max-width: 640px) 200px, (max-width: 1024px) 260px, 320px"
                      src={vehicle.image}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-zinc-400">
                      Brak zdjęcia
                    </div>
                  )}
                  {/* Status badge */}
                  <div className="absolute left-0 top-0">
                    <span className="inline-block border-b border-r border-white/20 bg-black/50 px-2 py-1 text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm">
                      {vehicle.statusLabel}
                    </span>
                  </div>
                </div>

                {/* Content - right side */}
                <div className="flex flex-1 flex-col justify-between p-3 sm:p-4 lg:p-5">
                  {/* Top: Title, tags, description */}
                  <div className="flex flex-col gap-2">
                    {/* Title */}
                    <h3 className="text-[0.9rem] font-semibold uppercase leading-tight tracking-[-0.01em] text-zinc-950 sm:text-[1rem] lg:text-[1.05rem]">
                      {vehicle.make} {vehicle.model}
                    </h3>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {[vehicle.fuelTypeLabel, vehicle.transmissionLabel, vehicle.bodyTypeLabel !== 'Nie podano' ? vehicle.bodyTypeLabel : null]
                        .filter(Boolean)
                        .map((tag) => (
                          <span
                            key={tag}
                            className="border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-zinc-600"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>

                    {/* Description */}
                    <p className="hidden sm:line-clamp-2 text-[0.75rem] leading-[1.6] text-zinc-500">
                      {vehicle.shortDescription}
                    </p>
                  </div>

                  {/* Bottom: Specs, Price and CTA */}
                  <div className="flex items-end justify-between mt-2 sm:mt-3">
                    {/* Specs */}
                    <div className="flex gap-4 text-[0.7rem]">
                      <div>
                        <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-zinc-400">Rok</span>
                        <span className="font-semibold text-zinc-900">{vehicle.year}</span>
                      </div>
                      <div>
                        <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-zinc-400">Przebieg</span>
                        <span className="font-semibold text-zinc-900">{formatMileage(vehicle.mileage)} km</span>
                      </div>
                      <div className="hidden sm:block">
                        <span className="block text-[0.55rem] font-semibold uppercase tracking-[0.14em] text-zinc-400">Moc</span>
                        <span className="font-semibold text-zinc-900">{vehicle.power} KM</span>
                      </div>
                    </div>

                    {/* Price & CTA */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="text-right">
                        <span className="block text-[0.5rem] font-medium uppercase tracking-[0.14em] text-zinc-400">
                          Cena brutto
                        </span>
                        <span className="block text-[0.95rem] font-semibold tracking-[-0.02em] text-zinc-950 sm:text-[1.05rem]">
                          {formatPrice(vehicle.price)} PLN
                        </span>
                      </div>
                      <span className="inline-flex items-center gap-1 text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-zinc-600 group-hover:text-zinc-950 transition-colors">
                        Zobacz szczegóły
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </MotionReveal>

        {/* Mobile CTA */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/oferta"
            className="btn-premium h-12 w-full"
          >
            Zobacz wszystkie oferty
          </Link>
        </div>
      </div>
    </section>
  );
}
