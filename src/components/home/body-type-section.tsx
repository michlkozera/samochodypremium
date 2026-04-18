import Link from 'next/link';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

const BODY_TYPES = [
  { label: 'SUV', value: 'SUV' },
  { label: 'Sedan', value: 'Sedan' },
  { label: 'Coupe', value: 'Coupe' },
  { label: 'Kombi', value: 'Kombi' },
  { label: 'Hatchback', value: 'Hatchback' },
  { label: 'Kabriolet', value: 'Kabriolet' },
] as const;

export function BodyTypeSection() {
  return (
    <section className="section-block border-b border-zinc-200/60 bg-white">
      <div className="site-shell">
        {/* Header */}
        <MotionReveal className="mb-10 sm:mb-12" stagger={0.14} amount={0.12}>
          <div className="grid justify-items-center text-center">
            <MotionRevealItem duration={1.1}>
              <h2 className="section-title text-center !font-medium">Wybierz typ nadwozia</h2>
            </MotionRevealItem>
          </div>
        </MotionReveal>

        {/* Body type tiles */}
        <MotionReveal stagger={0.14} delay={0.08} amount={0.12}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6">
            {BODY_TYPES.map((type) => (
              <MotionRevealItem key={type.value} duration={1.1}>
                <Link
                  href={`/oferta?body=${encodeURIComponent(type.value)}`}
                  data-shadow-hover="true"
                  className="premium-card-shadow group flex flex-col items-center justify-center border border-zinc-200 bg-zinc-50/50 p-6 transition-all duration-300 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white sm:p-8"
                >
                  <span className="text-[0.72rem] font-medium uppercase tracking-[0.18em] text-zinc-700 transition-colors duration-300 group-hover:text-white">
                    {type.label}
                  </span>
                </Link>
              </MotionRevealItem>
            ))}
          </div>
        </MotionReveal>

        {/* CTA under tiles */}
        <MotionReveal className="mt-10 flex justify-center sm:mt-12" stagger={0.14} amount={0.12}>
          <MotionRevealItem duration={1.1}>
            <Link
              href="/oferta"
              className="home-cta text-zinc-950 hover:text-zinc-700"
            >
              Zobacz pełną ofertę
              <svg className="home-cta-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
              <span className="home-cta-line" />
            </Link>
          </MotionRevealItem>
        </MotionReveal>
      </div>
    </section>
  );
}
