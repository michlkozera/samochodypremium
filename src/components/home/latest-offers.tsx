import Link from 'next/link';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';
import { type CatalogVehicle } from '@/lib/vehicle-catalog';
import { VehicleCard } from '@/components/katalog/vehicle-card';

type LatestOffersProps = {
  vehicles: CatalogVehicle[];
};

export function LatestOffers({ vehicles }: LatestOffersProps) {
  const latestVehicles = vehicles.slice(0, 4);

  return (
    <section className="section-block border-b border-zinc-200/60 bg-white">
      <div className="site-shell">
        {/* Header */}
        <MotionReveal className="mb-10 sm:mb-12" stagger={0.1}>
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
            <div className="grid gap-4">
              <MotionRevealItem>
                <p className="eyebrow">Aktualna kolekcja</p>
              </MotionRevealItem>
              <MotionRevealItem preset="blur-fade" duration={1}>
                <h2 className="section-title">
                  Najnowsze auta
                </h2>
              </MotionRevealItem>
            </div>
            <MotionRevealItem>
              <Link
                href="/oferta"
                className="hidden sm:inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-zinc-950 hover:text-zinc-600 transition-colors"
              >
                Zobacz wszystkie oferty
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
            </MotionRevealItem>
          </div>
        </MotionReveal>

        <MotionReveal
          amount={0.08}
          className="grid gap-4"
          stagger={0.08}
          delay={0.1}
        >
          {latestVehicles.map((vehicle) => (
            <MotionRevealItem key={vehicle.id}>
              <VehicleCard vehicle={vehicle} />
            </MotionRevealItem>
          ))}
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
