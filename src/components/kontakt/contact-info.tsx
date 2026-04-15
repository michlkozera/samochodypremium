'use client';

import {
  contactPhone,
  contactPhoneHref,
  contactEmail,
  contactEmailHref,
  contactAddress,
  contactSchedule,
} from '@/data/site';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

const contactCards = [
  {
    index: '01',
    label: 'Telefon',
    value: contactPhone,
    href: contactPhoneHref,
  },
  {
    index: '02',
    label: 'E-mail',
    value: contactEmail,
    href: contactEmailHref,
  },
  {
    index: '03',
    label: 'Adres',
    value: contactAddress,
    href: undefined,
  },
  {
    index: '04',
    label: 'Godziny pracy',
    value: contactSchedule,
    href: undefined,
  },
] as const;

export function ContactInfo() {
  return (
    <section className="section-block border-b border-zinc-200/60 bg-white">
      <div className="site-shell">
        <MotionReveal className="grid gap-10 lg:gap-14" stagger={0.1} amount={0.15}>
          {/* Header */}
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <div className="grid gap-4">
              <MotionRevealItem>
                <p className="eyebrow">Dane kontaktowe / 01</p>
              </MotionRevealItem>
              <MotionRevealItem preset="blur-fade" duration={1}>
                <h2 className="section-title">
                  Masz pytania? Skontaktuj się z nami.
                </h2>
              </MotionRevealItem>
            </div>
            <MotionRevealItem>
              <p className="body-copy max-w-md lg:ml-auto">
                Chętnie doradzimy i odpowiemy na każde zapytanie.
                Skontaktuj się z nami w wygodny dla Ciebie sposób — jesteśmy
                do dyspozycji w godzinach pracy.
              </p>
            </MotionRevealItem>
          </div>

          {/* Cards grid */}
          <div className="grid gap-px bg-zinc-200/60 sm:grid-cols-2 lg:grid-cols-4">
            {contactCards.map((card) => (
              <MotionRevealItem key={card.index} preset="fade-up">
                <div className="group/card grid content-between gap-8 bg-white p-6 sm:p-8 lg:min-h-[14rem] transition-colors duration-[400ms] ease-in-out hover:bg-zinc-950">
                  <div className="grid gap-3">
                    <span className="text-[0.62rem] font-semibold tabular-nums tracking-[0.24em] text-zinc-300 transition-colors duration-[400ms] ease-in-out group-hover/card:text-zinc-500">
                      {card.index}
                    </span>
                    <span className="text-[0.68rem] font-semibold uppercase tracking-[0.24em] text-zinc-400 transition-colors duration-[400ms] ease-in-out group-hover/card:text-zinc-500">
                      {card.label}
                    </span>
                  </div>

                  {card.href ? (
                    <a
                      className="text-[0.95rem] font-semibold leading-7 tracking-[-0.01em] text-zinc-950 transition-colors duration-[400ms] ease-in-out group-hover/card:text-white"
                      href={card.href}
                    >
                      {card.value}
                    </a>
                  ) : (
                    <p className="text-[0.95rem] font-semibold leading-7 tracking-[-0.01em] text-zinc-950 transition-colors duration-[400ms] ease-in-out group-hover/card:text-white">
                      {card.value}
                    </p>
                  )}
                </div>
              </MotionRevealItem>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
