import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

type VehicleSpecsProps = {
  specs: [string, string][];
};

export function VehicleSpecs({ specs }: VehicleSpecsProps) {
  return (
    <section className="border-b border-zinc-200/60 bg-white">
      <div className="site-shell section-block">
        <MotionReveal className="grid gap-8 lg:gap-10" stagger={0.1} amount={0.15}>
          {/* Header */}
          <MotionRevealItem preset="blur-fade">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-end lg:gap-16">
              <div className="grid gap-3">
                <p className="eyebrow">Specyfikacja</p>
                <h2 className="section-title max-w-[14ch]">
                  Parametry techniczne.
                </h2>
              </div>
              <p className="body-copy max-w-md">
                Pełna dokumentacja techniczna pojazdu. Wszystkie dane zweryfikowane na podstawie dokumentów fabrycznych i historii serwisowej.
              </p>
            </div>
          </MotionRevealItem>

          {/* Specs table */}
          <MotionRevealItem preset="fade-up">
            <div className="grid gap-px bg-zinc-200 sm:grid-cols-2">
              {specs.map(([label, value]) => (
                <div
                  className="flex items-baseline justify-between gap-4 bg-white px-4 py-3.5 sm:px-5 sm:py-4"
                  key={label}
                >
                  <span className="text-[0.78rem] text-zinc-500">{label}</span>
                  <span className="text-right text-[0.85rem] font-semibold text-zinc-900">
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </MotionRevealItem>
        </MotionReveal>
      </div>
    </section>
  );
}
