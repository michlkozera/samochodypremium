import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

const SHADOW = '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)';

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
                Pełna dokumentacja techniczna pojazdu. Dane zweryfikowane na podstawie dokumentów i historii serwisowej.
              </p>
            </div>
          </MotionRevealItem>

          {/* Specs — shadow container */}
          <MotionRevealItem preset="fade-up">
            <div className="bg-white" style={{ boxShadow: SHADOW }}>
              <div className="grid sm:grid-cols-2">
                {specs.map(([label, value]) => (
                  <div
                    className="flex items-baseline justify-between gap-4 border-b border-zinc-100 px-5 py-4 sm:px-6"
                    key={label}
                  >
                    <span className="shrink-0 text-[0.52rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">{label}</span>
                    <span className="break-all text-right text-[0.85rem] font-semibold text-zinc-900">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </MotionRevealItem>
        </MotionReveal>
      </div>
    </section>
  );
}
