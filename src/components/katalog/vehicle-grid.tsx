import { vehicles } from '@/data/vehicles';
import { VehicleCard } from './vehicle-card';

export function VehicleGrid() {
  return (
    <section className="border-b border-zinc-200/60 bg-white">
      <div className="site-shell py-8 sm:py-10 lg:py-12">
        {/* ── Sort bar ── */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8">
          <p className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
            Dostępne pojazdy
          </p>
          <div className="flex items-center gap-2">
            <label
              className="text-[0.65rem] font-medium uppercase tracking-[0.18em] text-zinc-400"
              htmlFor="sort-select"
            >
              Sortuj:
            </label>
            <select
              className="h-9 appearance-none border border-zinc-200 bg-white px-3 pr-7 text-[0.8rem] text-zinc-700 outline-none transition-colors duration-200 focus:border-zinc-950"
              defaultValue="price-asc"
              id="sort-select"
            >
              <option value="price-asc">Cena: rosnąco</option>
              <option value="price-desc">Cena: malejąco</option>
              <option value="year-desc">Rok: najnowsze</option>
              <option value="mileage-asc">Przebieg: najniższy</option>
              <option value="power-desc">Moc: najwyższa</option>
            </select>
          </div>
        </div>

        {/* ── Vehicle grid ── */}
        <div className="grid gap-6 sm:grid-cols-2 lg:gap-7 xl:gap-8">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.slug} vehicle={vehicle} />
          ))}
        </div>
      </div>
    </section>
  );
}
