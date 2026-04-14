import Link from 'next/link';
import { VehicleCard } from '@/components/katalog/vehicle-card';
import { MotionReveal } from '@/components/ui/motion-reveal';
import { type CatalogVehicle } from '@/lib/vehicle-catalog';

type LatestOffersProps = {
  vehicles: CatalogVehicle[];
};

export function LatestOffers({ vehicles }: LatestOffersProps) {
  // Take only first 5 vehicles (already sorted by latest)
  const latestVehicles = vehicles.slice(0, 5);

  return (
    <section className="border-b border-zinc-200 bg-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Vertical stack - wider cards */}
        <MotionReveal stagger={0.08} delay={0.1}>
          <div className="flex flex-col gap-4 lg:gap-5">
            {latestVehicles.map((vehicle) => (
              <div key={vehicle.id} className="w-full max-w-none">
                <VehicleCard vehicle={vehicle} />
              </div>
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
