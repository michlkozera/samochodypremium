'use client';

import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

const reasons = [
  {
    index: '01',
    title: 'Szukasz auta premium z potwierdzonym stanem technicznym',
    description:
      'Każdy egzemplarz przechodzi wieloetapową inspekcję. Kupujesz auto z udokumentowanym stanem, nie obietnicę.',
  },
  {
    index: '02',
    title: 'Oczekujesz transparentnej historii pojazdu',
    description:
      'Udostępniamy dokumentację serwisową, raport VIN i wyniki weryfikacji. Bez ukrytych niespodzianek po zakupie.',
  },
  {
    index: '03',
    title: 'Cenisz kompleksową obsługę w jednym miejscu',
    description:
      'Od doboru auta, przez finansowanie i ubezpieczenie, po rejestrację. Jeden opiekun i jeden spójny proces.',
  },
  {
    index: '04',
    title: 'Prowadzisz firmę i budujesz flotę premium',
    description:
      'Obsługujemy klientów biznesowych z dedykowanym opiekunem. Leasing, wynajem długoterminowy i wsparcie flotowe.',
  },
  {
    index: '05',
    title: 'Chcesz szybko i uczciwie sprzedać obecne auto',
    description:
      'Program odkupu to wycena w 24h, uczciwa oferta i sprawna realizacja. Bez przeciągających się negocjacji.',
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
                <h2 className="section-title">
                  Salon dla wymagających kierowców.
                </h2>
              </div>
            </MotionRevealItem>
            <MotionRevealItem preset="slide-right">
              <p className="body-copy max-w-xl lg:text-right">
                Pracujemy dla osób, które oczekują jakości, przewidywalnego procesu
                i bezpiecznej decyzji zakupowej.
              </p>
            </MotionRevealItem>
          </div>

          {/* Cards — horizontal scroll on mobile, grid on sm+ */}
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-px sm:overflow-visible sm:bg-zinc-200/60 sm:px-0 sm:pb-0 lg:grid-cols-3">
            {reasons.map((reason) => (
              <MotionRevealItem key={reason.index} className="w-[80vw] flex-shrink-0 snap-start sm:w-auto" preset="scale-up">
                <article className="flex h-full flex-col gap-4 rounded-sm border border-zinc-200/60 bg-white p-6 sm:rounded-none sm:border-0 sm:p-8">
                  <span className="text-[clamp(1.35rem,2.2vw,1.85rem)] font-bold leading-none tracking-[-0.03em] text-zinc-300">
                    {reason.index}
                  </span>
                  <h3 className="text-[0.76rem] font-bold uppercase leading-6 tracking-[0.03em] text-zinc-950">
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
