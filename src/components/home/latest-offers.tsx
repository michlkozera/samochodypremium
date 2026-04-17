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
              <MotionRevealItem preset="blur-fade" duration={1}>
                <h2 className="section-title font-light">
                  Najnowsze auta
                </h2>
              </MotionRevealItem>
            </div>
            <MotionRevealItem>
              <Link
                href="/oferta"
                className="home-cta hidden text-zinc-950 hover:text-zinc-700 sm:inline-flex"
              >
                Zobacz wszystkie oferty
                <svg className="home-cta-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
                <span className="home-cta-line" />
              </Link>
            </MotionRevealItem>
          </div>
        </MotionReveal>

        <MotionReveal
          amount={0.08}
          className="grid gap-6 sm:grid-cols-2"
          stagger={0.08}
          delay={0.1}
        >
          {latestVehicles.map((vehicle) => (
            <MotionRevealItem key={vehicle.id}>
              <VehicleCard vehicle={vehicle} variant="home" />
            </MotionRevealItem>
          ))}
        </MotionReveal>

        {/* Mobile CTA */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/oferta"
            className="home-cta min-h-12 w-full justify-center border border-zinc-950 bg-zinc-950 px-6 text-white transition-[background-color,color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-white hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
          >
            Zobacz wszystkie oferty
            <svg className="home-cta-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
            </svg>
            <span className="home-cta-line" />
          </Link>
        </div>
      </div>
    </section>
  );
}
