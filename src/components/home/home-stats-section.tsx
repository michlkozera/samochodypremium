import { CountUp } from '@/components/ui/count-up';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

type HomeStatsSectionProps = {
  vehicleCount: number;
  clientsCount?: number;
  satisfactionRate?: number;
};

export function HomeStatsSection({
  vehicleCount,
  clientsCount = 600,
  satisfactionRate = 100,
}: HomeStatsSectionProps) {
  const stats = [
    {
      key: 'vehicles',
      value: vehicleCount,
      suffix: '+',
      label: 'Samochodów w ofercie',
      icon: VehicleIcon,
    },
    {
      key: 'clients',
      value: clientsCount,
      suffix: '+',
      label: 'Zadowolonych klientów',
      icon: ClientsIcon,
    },
    {
      key: 'satisfaction',
      value: satisfactionRate,
      suffix: '%',
      label: 'Satysfakcji klientów',
      icon: SatisfactionIcon,
    },
  ] as const;

  return (
    <section className="bg-white py-10 sm:py-12 lg:py-14">
      <div className="site-shell">
        <MotionReveal
          className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-6"
          stagger={0.14}
          amount={0.12}
        >
          {stats.map((item, index) => (
            <MotionRevealItem key={item.key} duration={1.1}>
              <article className="premium-card-shadow grid justify-items-center gap-3 bg-zinc-50/60 p-6 text-center sm:p-7">
                <span className="inline-flex h-12 w-12 items-center justify-center text-zinc-700">
                  <item.icon className="h-5 w-5" />
                </span>
                <p className="text-[clamp(1.7rem,4vw,2.5rem)] font-medium leading-none tracking-[-0.02em] text-zinc-950">
                  <CountUp value={item.value} delay={index * 0.18} />
                  {item.suffix}
                </p>
                <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-zinc-500">
                  {item.label}
                </p>
              </article>
            </MotionRevealItem>
          ))}
        </MotionReveal>
      </div>
    </section>
  );
}

function VehicleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 14.25h18M5.25 14.25l1.2-4.2A2.25 2.25 0 018.61 8.5h6.78a2.25 2.25 0 012.16 1.55l1.2 4.2M6 18.75a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm12 0a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM4.5 14.25v2.25c0 .62.5 1.12 1.12 1.12H6m12 0h.38c.62 0 1.12-.5 1.12-1.12v-2.25" />
    </svg>
  );
}

function ClientsIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 7.5a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zM9 9a2.25 2.25 0 11-4.5 0A2.25 2.25 0 019 9zM19.5 9a2.25 2.25 0 11-2.25 2.25M3.75 18a4.5 4.5 0 019 0M10.5 18a5.25 5.25 0 0110.5 0" />
    </svg>
  );
}

function SatisfactionIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M12 3l7.2 3.6v5.4c0 4.2-2.9 8-7.2 9-4.3-1-7.2-4.8-7.2-9V6.6L12 3z" />
    </svg>
  );
}
