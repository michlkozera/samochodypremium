'use client';

import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

const reasons = [
  {
    index: '01',
    title: 'Szukasz samochodu premium z gwarancją stanu technicznego',
    description:
      'Każdy pojazd w naszej ofercie przechodzi wieloetapową inspekcję. Nie sprzedajemy aut — sprzedajemy pewność.',
  },
  {
    index: '02',
    title: 'Zależy Ci na transparentnej historii pojazdu',
    description:
      'Pełna dokumentacja serwisowa, raport z bazy VIN i niezależna weryfikacja — bez ukrytych niespodzianek po zakupie.',
  },
  {
    index: '03',
    title: 'Cenisz kompleksową obsługę od A do Z',
    description:
      'Od doboru auta, przez finansowanie i ubezpieczenie, po rejestrację — cały proces zamykamy w jednym punkcie kontaktu.',
  },
  {
    index: '04',
    title: 'Prowadzisz firmę i potrzebujesz floty premium',
    description:
      'Obsługujemy klientów biznesowych z dedykowanym opiekunem. Leasing, wynajem długoterminowy, obsługa flotowa.',
  },
  {
    index: '05',
    title: 'Chcesz sprzedać swoje auto szybko i uczciwie',
    description:
      'Nasz program odkupu to wycena w 24h, uczciwa oferta i błyskawiczna realizacja. Bez targowania, bez stresu.',
  },
];

export function OnasDlaKogo() {
  return (
    <section className="section-block border-b border-zinc-200/60 bg-white">
      <div className="site-shell">
        <MotionReveal className="grid gap-10 lg:gap-14" stagger={0.1} amount={0.15}>
          {/* Header row */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-end lg:gap-16">
            <MotionRevealItem preset="slide-left">
              <div className="grid gap-4">
                <p className="eyebrow">Dla kogo</p>
                <h2 className="text-[clamp(1.85rem,5vw,3.4rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] [text-wrap:balance]">
                  Salon dla wymagających kierowców.
                </h2>
              </div>
            </MotionRevealItem>
            <MotionRevealItem preset="slide-right">
              <p className="body-copy max-w-xl lg:text-right">
                Nie pracujemy dla wszystkich. Pracujemy dla tych, którzy traktują samochód
                jak długoterminową inwestycję w jakość i komfort.
              </p>
            </MotionRevealItem>
          </div>

          {/* Cards — horizontal scroll on mobile, grid on sm+ */}
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-px sm:overflow-visible sm:bg-zinc-200/60 sm:px-0 sm:pb-0 lg:grid-cols-3">
            {reasons.map((reason) => (
              <MotionRevealItem key={reason.index} className="w-[80vw] flex-shrink-0 snap-start sm:w-auto" preset="scale-up">
                <article className="flex h-full flex-col gap-4 rounded-sm border border-zinc-200/60 bg-white p-6 sm:rounded-none sm:border-0 sm:p-8">
                  <span className="text-[clamp(1.6rem,3vw,2.2rem)] font-semibold leading-none tracking-[-0.04em] text-zinc-300">
                    {reason.index}
                  </span>
                  <h3 className="text-[0.8rem] font-semibold uppercase leading-6 tracking-[0.03em] text-zinc-950">
                    {reason.title}
                  </h3>
                  <p className="mt-auto text-[0.82rem] leading-[1.7] text-zinc-500">
                    {reason.description}
                  </p>
                </article>
              </MotionRevealItem>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
