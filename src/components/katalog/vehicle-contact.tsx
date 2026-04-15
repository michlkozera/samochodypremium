'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { type CatalogVehicleDetail } from '@/lib/vehicle-catalog';

/* ── Stagger-reveal hook ── */
function useStaggerReveal(baseDelay = 130) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getDelay = useCallback(
    (index: number) => ({
      transitionDelay: visible ? `${index * baseDelay}ms` : '0ms',
    }),
    [visible, baseDelay],
  );

  return { ref, visible, getDelay };
}

/* ── Underline field (matches contact-form.tsx) ── */
function FormField({
  id,
  label,
  index,
  visible,
  delay,
  className,
  children,
}: {
  id: string;
  label: string;
  index: string;
  visible: boolean;
  delay: React.CSSProperties;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`contact-field group py-5 sm:py-6 lg:py-7 ${visible ? 'is-visible' : ''} ${className ?? ''}`}
      style={delay}
    >
      <div className="flex items-baseline gap-3 pb-3">
        <span className="text-[0.65rem] font-semibold tabular-nums tracking-[0.24em] text-zinc-300 transition-colors duration-300 group-focus-within:text-zinc-950">
          {index}
        </span>
        <label
          className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-400 transition-colors duration-300 group-focus-within:text-zinc-950"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
      {children}
      <div className="contact-field-line mt-1" />
    </div>
  );
}

type VehicleContactProps = {
  vehicle: CatalogVehicleDetail;
};

export function VehicleContact({ vehicle }: VehicleContactProps) {
  const { advisor } = vehicle;
  const { ref, visible, getDelay } = useStaggerReveal();

  return (
    <section className="border-b border-zinc-200/60 bg-white" id="kontakt-oferta">
      {/* ── Dark header — matches ContactForm header style ── */}
      <div className="border-b border-zinc-200/60 bg-zinc-950 text-white">
        <div className="site-shell grid gap-8 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16 lg:py-20 xl:py-24">
          <div
            className={`contact-field grid gap-5 ${visible ? 'is-visible' : ''}`}
            style={getDelay(0)}
          >
            <p className="eyebrow border-zinc-600">
              Formularz / zapytanie
            </p>
            <h2 className="section-title text-white">
              Zainteresowany tym autem?
            </h2>
          </div>
          <div
            className={`contact-field grid gap-6 ${visible ? 'is-visible' : ''}`}
            style={getDelay(1)}
          >
            <p className="max-w-md text-[0.94rem] leading-[1.8] text-zinc-400">
              Napisz do nas w sprawie{' '}
              <span className="font-semibold text-white">
                {vehicle.make} {vehicle.model}
              </span>
              . Odpowiemy z konkretną propozycją, historią serwisową i opcjami finansowania.
            </p>
            <div className="flex flex-wrap gap-8 border-t border-white/10 pt-6">
              <div className="grid gap-1">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  Telefon
                </span>
                <a
                  className="text-sm font-semibold tracking-[-0.02em] text-white transition-colors duration-200 hover:text-zinc-300"
                  href={advisor.phoneHref}
                >
                  {advisor.phone}
                </a>
              </div>
              <div className="grid gap-1">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                  Email
                </span>
                <a
                  className="text-sm font-semibold tracking-[-0.02em] text-white transition-colors duration-200 hover:text-zinc-300"
                  href={advisor.emailHref}
                >
                  {advisor.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Form area — matches ContactForm form area ── */}
      <div ref={ref} className="site-shell py-12 sm:py-16 lg:py-20 xl:py-24">
        <form className="mx-auto grid max-w-5xl gap-0">
          <input type="hidden" name="vehicle_slug" value={vehicle.slug} />
          <input
            type="hidden"
            name="vehicle_name"
            value={`${vehicle.make} ${vehicle.model}`}
          />

          {/* Row 1: name + email */}
          <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <FormField
              id="vf-name"
              index="01"
              label="Imię i nazwisko"
              visible={visible}
              delay={getDelay(1)}
            >
              <input
                autoComplete="name"
                className="contact-input contact-input--lg"
                id="vf-name"
                name="name"
                placeholder="Jan Kowalski"
                required
                type="text"
              />
            </FormField>

            <FormField
              id="vf-email"
              index="02"
              label="Adres e-mail"
              visible={visible}
              delay={getDelay(2)}
            >
              <input
                autoComplete="email"
                className="contact-input contact-input--lg"
                id="vf-email"
                name="email"
                placeholder="adres@firma.pl"
                required
                type="email"
              />
            </FormField>
          </div>

          {/* Row 2: phone + scope chips */}
          <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <FormField
              id="vf-phone"
              index="03"
              label="Telefon"
              visible={visible}
              delay={getDelay(3)}
            >
              <input
                autoComplete="tel"
                className="contact-input contact-input--lg"
                id="vf-phone"
                name="phone"
                placeholder="+48 123 456 789"
                type="tel"
              />
            </FormField>

            <FormField
              id="vf-scope"
              index="04"
              label="Zakres rozmowy"
              visible={visible}
              delay={getDelay(4)}
            >
              <div className="grid grid-cols-3 gap-2.5 py-2 sm:gap-3">
                {['Prezentacja', 'Jazda próbna', 'Finansowanie', 'Trade-in', 'Wycena', 'Inne'].map(
                  (scope) => (
                    <label className="contact-chip" key={scope}>
                      <input
                        className="peer sr-only"
                        name="scope"
                        type="checkbox"
                        value={scope.toLowerCase()}
                      />
                      <span className="contact-chip-label contact-chip-label--lg">
                        {scope}
                      </span>
                    </label>
                  ),
                )}
              </div>
            </FormField>
          </div>

          {/* Message */}
          <FormField
            id="vf-message"
            index="05"
            label="Wiadomość"
            visible={visible}
            delay={getDelay(5)}
          >
            <textarea
              className="contact-input contact-input--lg min-h-44 py-3 sm:min-h-48"
              id="vf-message"
              name="message"
              placeholder={`Interesuje mnie ${vehicle.make} ${vehicle.model}. Proszę o kontakt w sprawie…`}
            />
          </FormField>

          {/* Submit row */}
          <div
            className={`contact-field flex flex-col gap-6 pt-10 sm:flex-row sm:items-center sm:justify-between lg:pt-12 ${visible ? 'is-visible' : ''}`}
            style={getDelay(6)}
          >
            <p className="max-w-sm text-[0.82rem] leading-7 text-zinc-400">
              Odpowiadamy zwykle w ciągu godziny w godzinach pracy salonu.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                className="button-primary min-h-14 w-full px-10 sm:w-fit"
                type="submit"
              >
                Wyślij zapytanie
              </button>
              <a
                className="button-secondary min-h-14 w-full px-10 sm:w-fit"
                href={advisor.phoneHref}
              >
                Zadzwoń teraz
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
