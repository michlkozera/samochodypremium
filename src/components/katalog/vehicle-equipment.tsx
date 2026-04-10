import { type Vehicle } from '@/data/vehicles';

type VehicleEquipmentProps = {
  description: string;
  equipment: Vehicle['equipment'];
};

export function VehicleEquipment({ description, equipment }: VehicleEquipmentProps) {
  return (
    <section className="border-b border-zinc-200/60 bg-zinc-50">
      <div className="site-shell section-block">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-16">
          {/* ── Left: description ── */}
          <div className="grid gap-4 self-start">
            <p className="eyebrow" data-reveal="up">Opis i wyposażenie</p>
            <h2 className="section-title max-w-[14ch]" data-reveal="up">
              Szczegóły oferty.
            </h2>
            <p className="body-copy" data-reveal="up">
              {description}
            </p>
          </div>

          {/* ── Right: equipment categories ── */}
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-5">
            {equipment.map((cat) => (
              <div className="grid gap-3 self-start" key={cat.category}>
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-950">
                  {cat.category}
                </h3>
                <ul className="grid gap-2">
                  {cat.items.map((item) => (
                    <li
                      className="flex items-start gap-2.5 text-[0.84rem] leading-relaxed text-zinc-600"
                      key={item}
                    >
                      <svg
                        className="mt-1 h-3.5 w-3.5 shrink-0 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
