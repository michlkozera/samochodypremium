import Link from 'next/link';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

const BODY_TYPES = [
  { label: 'SUV', value: 'SUV', icon: SuvIcon },
  { label: 'Sedan', value: 'Sedan', icon: SedanIcon },
  { label: 'Coupe', value: 'Coupe', icon: CoupeIcon },
  { label: 'Kombi', value: 'Kombi', icon: KombiIcon },
  { label: 'Hatchback', value: 'Hatchback', icon: HatchbackIcon },
  { label: 'Kabriolet', value: 'Kabriolet', icon: KabrioletIcon },
] as const;

export function BodyTypeSection() {
  return (
    <section className="border-b border-zinc-200 bg-white py-14 sm:py-16 lg:py-20">
      <div className="site-shell">
        {/* Header row */}
        <MotionReveal className="mb-10 sm:mb-12">
          <div className="flex items-end justify-between">
            <div>
              <span className="block text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-zinc-500 mb-3">
                Typ nadwozia
              </span>
              <h2 className="text-[1.6rem] font-semibold leading-[1.1] tracking-[-0.02em] text-zinc-950 sm:text-[1.8rem]">
                Szukaj według typu nadwozia
              </h2>
            </div>
            <Link
              href="/oferta"
              className="hidden sm:inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-zinc-950 hover:text-zinc-600 transition-colors"
            >
              Zobacz całą ofertę
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </Link>
          </div>
        </MotionReveal>

        {/* Body type tiles */}
        <MotionReveal stagger={0.06} delay={0.1}>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4">
            {BODY_TYPES.map((type) => (
              <MotionRevealItem key={type.value}>
                <Link
                  href={`/oferta?body=${encodeURIComponent(type.value)}`}
                  className="group flex flex-col items-center gap-4 border border-zinc-200 bg-zinc-50/50 p-6 sm:p-8 transition-all duration-300 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white"
                >
                  <type.icon className="h-10 w-10 text-zinc-400 transition-colors duration-300 group-hover:text-white sm:h-12 sm:w-12" />
                  <span className="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-zinc-700 transition-colors duration-300 group-hover:text-white">
                    {type.label}
                  </span>
                </Link>
              </MotionRevealItem>
            ))}
          </div>
        </MotionReveal>

        {/* Mobile CTA */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/oferta"
            className="btn-premium h-12 w-full"
          >
            Zobacz całą ofertę
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ── Minimalist car silhouette icons ── */

function SuvIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 24h4m48 0h4M12 24a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm32 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0z" />
      <path d="M8 24h4m40 0h-4M20 24h24" />
      <path d="M6 24v-8l4-6h12l10-4h18l8 10v8" />
    </svg>
  );
}

function SedanIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 24h4m48 0h4M12 24a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm32 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0z" />
      <path d="M8 24h4m40 0h-4M20 24h24" />
      <path d="M4 24v-6h8l6-8h20l8-2h12l2 4v12" />
    </svg>
  );
}

function CoupeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 24h4m48 0h4M12 24a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm32 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0z" />
      <path d="M8 24h4m40 0h-4M20 24h24" />
      <path d="M4 24v-5h6l8-10h24l12-1h6v16" />
    </svg>
  );
}

function KombiIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 24h4m48 0h4M12 24a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm32 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0z" />
      <path d="M8 24h4m40 0h-4M20 24h24" />
      <path d="M4 24v-6h8l6-8h22v-2h18l2 4v12" />
    </svg>
  );
}

function HatchbackIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 24h4m48 0h4M12 24a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm32 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0z" />
      <path d="M8 24h4m40 0h-4M20 24h24" />
      <path d="M4 24v-5h6l6-9h20l14-2h8l2 4v12" />
    </svg>
  );
}

function KabrioletIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 32" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 24h4m48 0h4M12 24a4 4 0 1 0 8 0 4 4 0 0 0-8 0zm32 0a4 4 0 1 0 8 0 4 4 0 0 0-8 0z" />
      <path d="M8 24h4m40 0h-4M20 24h24" />
      <path d="M4 24v-5h6l6-7h14M46 12h12l2 4v8" />
      <path d="M30 12c4-2 10-2 16 0" strokeDasharray="2 3" />
    </svg>
  );
}
