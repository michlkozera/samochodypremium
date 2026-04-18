import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

const SHADOW = '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)';

type VehicleEquipmentProps = {
  description: string;
  features: string[];
};

export function VehicleEquipment({ description, features }: VehicleEquipmentProps) {
  return (
    <section className="bg-[linear-gradient(180deg,rgba(250,250,250,0.94)_0%,rgba(255,255,255,1)_100%)]">
      <div className="site-shell section-block">
        <MotionReveal className="grid gap-10 lg:gap-14" stagger={0.1} amount={0.15}>
          {/* Header */}
          <MotionRevealItem preset="blur-fade">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-start lg:gap-16">
              <h2 className="section-title !max-w-none !font-medium self-start">
                Szczegóły oferty.
              </h2>
              <p className="body-copy max-w-xl self-start">{description}</p>
            </div>
          </MotionRevealItem>

          {/* Features list — shadow container */}
          {features.length > 0 && (
            <MotionRevealItem preset="fade-up">
              <ul className="bg-white" style={{ boxShadow: SHADOW }}>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3">
                  {features.map((feature) => (
                    <li
                      className="flex items-start gap-3 border-b border-zinc-100 px-5 py-4 text-[0.86rem] leading-relaxed text-zinc-700 sm:px-6"
                      key={feature}
                    >
                      <svg
                        className="mt-[3px] h-3.5 w-3.5 shrink-0 text-zinc-950"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M4.5 12.75l6 6 9-13.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </div>
              </ul>
            </MotionRevealItem>
          )}

          {features.length === 0 && (
            <MotionRevealItem preset="fade-up">
              <div className="bg-white px-6 py-6 sm:px-8 sm:py-8" style={{ boxShadow: SHADOW }}>
                <p className="body-copy max-w-xl">
                  Pełną listę wyposażenia przygotujemy indywidualnie. Skontaktuj się z doradcą — odpowiemy z kompletną specyfikacją egzemplarza.
                </p>
              </div>
            </MotionRevealItem>
          )}
        </MotionReveal>
      </div>
    </section>
  );
}
