import { type CatalogVehicle } from '@/lib/vehicle-catalog';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';
import { VehicleCard } from './vehicle-card';

type VehicleGridProps = {
  vehicles: CatalogVehicle[];
};

export function VehicleGrid({ vehicles }: VehicleGridProps) {
  return (
    <section className="border-b border-zinc-200/60 bg-[linear-gradient(180deg,rgba(250,250,250,0.94)_0%,rgba(255,255,255,1)_100%)]">
      <div className="site-shell py-10 sm:py-12 lg:py-14">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
          <div className="grid gap-2">
            <p className="eyebrow">Aktualna kolekcja</p>
            <h2 className="text-[clamp(1.7rem,4vw,2.8rem)] font-semibold uppercase leading-[1.02] tracking-[-0.03em] text-zinc-950">
              Oferty gotowe do prezentacji.
            </h2>
          </div>
          <div className="offer-chip">
            <span>{vehicles.length}</span>
            <span>ofert</span>
          </div>
        </div>

        {vehicles.length > 0 ? (
          <MotionReveal
            amount={0.08}
            className="grid gap-6 sm:grid-cols-2 lg:gap-7 xl:gap-8"
            stagger={0.08}
          >
            {vehicles.map((vehicle) => (
              <MotionRevealItem key={vehicle.id}>
                <VehicleCard vehicle={vehicle} />
              </MotionRevealItem>
            ))}
          </MotionReveal>
        ) : (
          <div className="offer-surface rounded-[1.75rem] px-6 py-12 text-center text-zinc-500">
            Aktualnie brak pojazdow w ofercie.
          </div>
        )}
      </div>
    </section>
  );
}
