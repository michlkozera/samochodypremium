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
          <div className="grid justify-items-center gap-5 text-center">
            <div className="grid gap-4 justify-items-center">
              <MotionRevealItem preset="blur-fade" duration={1}>
                <h2 className="section-title text-center font-light">
                  Najnowsze auta
                </h2>
              </MotionRevealItem>
            </div>
            <MotionRevealItem>
              <Link
                href="/oferta"
                className="home-cta text-zinc-950 hover:text-zinc-700"
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

      </div>
    </section>
  );
}
