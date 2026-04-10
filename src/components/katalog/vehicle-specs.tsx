import { type Vehicle } from '@/data/vehicles';

type VehicleSpecsProps = {
  specs: Vehicle['specs'];
};

export function VehicleSpecs({ specs }: VehicleSpecsProps) {
  return (
    <section className="border-b border-zinc-200/60 bg-white">
      <div className="site-shell section-block">
        <div className="grid gap-8 lg:gap-10">
          {/* ── Section header ── */}
          <div className="grid gap-3">
            <p className="eyebrow" data-reveal="up">Specyfikacja</p>
            <h2 className="section-title max-w-[14ch]" data-reveal="up">
              Parametry techniczne.
            </h2>
          </div>

          {/* ── Specs grid ── */}
          <div className="grid gap-px bg-zinc-200 sm:grid-cols-2">
            {specs.map(([label, value], i) => (
              <div
                className="flex items-baseline justify-between gap-4 bg-white px-4 py-3.5 sm:px-5 sm:py-4"
                key={i}
              >
                <span className="text-[0.78rem] text-zinc-500">{label}</span>
                <span className="text-right text-[0.85rem] font-semibold text-zinc-900">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
