import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

const SHADOW = '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)';

type VehicleSpecsProps = {
  specs: [string, string][];
};

export function VehicleSpecs({ specs }: VehicleSpecsProps) {
  return (
    <section className="bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,250,250,0.94)_100%)]">
      <div className="site-shell section-block">
        <MotionReveal className="grid gap-10 lg:gap-12" stagger={0.1} amount={0.15}>
          {/* Header */}
          <MotionRevealItem preset="blur-fade">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-start lg:gap-16">
              <h2 className="section-title !max-w-none !font-medium">
                Parametry techniczne.
              </h2>
              <p className="body-copy max-w-xl">
                Kompletne dane pojazdu zweryfikowane w oparciu o dokumentację i historię serwisową. Bez uproszczeń, bez domysłów.
              </p>
            </div>
          </MotionRevealItem>

          {/* Specs — shadow container */}
          <MotionRevealItem preset="fade-up">
            <div className="bg-white" style={{ boxShadow: SHADOW }}>
              <div className="grid sm:grid-cols-2">
                {specs.map(([label, value]) => (
                  <div
                    className="flex items-baseline justify-between gap-4 border-b border-zinc-100 px-5 py-4 last:border-b-0 sm:px-6 sm:py-5"
                    key={label}
                  >
                    <span className="shrink-0 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-zinc-500">{label}</span>
                    <span className="break-all text-right text-[0.88rem] font-medium tracking-[-0.01em] text-zinc-950">{value}</span>
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
