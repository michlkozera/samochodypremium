import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

type VehicleEquipmentProps = {
  description: string;
  features: string[];
};

export function VehicleEquipment({ description, features }: VehicleEquipmentProps) {
  return (
    <section className="border-b border-zinc-200/60 bg-zinc-50">
      <div className="site-shell section-block">
        <MotionReveal className="grid gap-10 lg:gap-16" stagger={0.1} amount={0.15}>
          {/* Header */}
          <MotionRevealItem preset="blur-fade">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:gap-16">
              <div className="grid gap-4 self-start">
                <p className="eyebrow">Opis i wyposażenie</p>
                <h2 className="section-title max-w-[14ch]">
                  Szczegóły oferty.
                </h2>
              </div>
              <p className="body-copy max-w-2xl self-start">{description}</p>
            </div>
          </MotionRevealItem>

          {/* Features list — bordered card-style cells */}
          {features.length > 0 && (
            <MotionRevealItem preset="fade-up">
              <div className="grid gap-6">
                <h3 className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-950">
                  Lista wyposażenia
                </h3>
                <ul className="grid border-l border-t border-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature) => (
                      <li
                        className="flex items-start gap-2.5 border-b border-r border-zinc-200 bg-white px-4 py-3 text-[0.84rem] leading-relaxed text-zinc-600"
                        key={feature}
                      >
                        <svg
                          className="mt-[3px] h-3.5 w-3.5 shrink-0 text-zinc-400"
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
                </ul>
              </div>
            </MotionRevealItem>
          )}

          {features.length === 0 && (
            <MotionRevealItem preset="fade-up">
              <div className="border border-zinc-200 bg-white px-5 py-5 sm:px-6 sm:py-6">
                <p className="text-[0.84rem] text-zinc-500">
                  Szczegółowa lista wyposażenia dostępna na życzenie. Skontaktuj się z naszym doradcą.
                </p>
              </div>
            </MotionRevealItem>
          )}
        </MotionReveal>
      </div>
    </section>
  );
}
