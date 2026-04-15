'use client';

import { useRef, useEffect, useState, useCallback } from 'react';

/* ── Stagger-reveal hook for sequential field animation ── */
function useStaggerReveal(count: number, baseDelay = 140) {
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
      { threshold: 0.1 },
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

  return { ref, visible, getDelay, count };
}

/* ── Animated underline input ── */
function FormField({
  id,
  label,
  index,
  visible,
  delay,
  className: extraCls,
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
      className={`contact-field group py-5 sm:py-6 lg:py-7 ${visible ? 'is-visible' : ''} ${extraCls ?? ''}`}
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

export function ContactForm() {
  const { ref, visible, getDelay } = useStaggerReveal(7);

  return (
    <section className="border-b border-zinc-200 bg-white">
      {/* ── Full-width section header ── */}
      <div className="border-b border-zinc-200/60 bg-zinc-950 text-white">
        <div className="site-shell grid gap-8 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16 lg:py-20 xl:py-24">
          <div
            className={`contact-field grid gap-5 ${visible ? 'is-visible' : ''}`}
            style={getDelay(0)}
          >
            <p className="eyebrow border-zinc-600">
              Formularz / 02
            </p>
            <h2 className="section-title text-white">
            Twój samochód zaczyna się tutaj.
            </h2>
          </div>
          <div
            className={`contact-field grid gap-6 ${visible ? 'is-visible' : ''}`}
            style={getDelay(1)}
          >
            <p className="max-w-md text-[0.94rem] leading-[1.8] text-zinc-400">
              Skontaktuj się w sprawie zakupu lub odkupu — napisz do nas,
              a odpowiemy z konkretnym planem rozmowy i dalszego procesu.
            </p>
            <div className="flex flex-wrap gap-8">
              <div className="grid gap-1">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-zinc-500">Telefon</span>
                <a
                  className="text-sm font-semibold tracking-[-0.02em] text-white transition-colors duration-200 hover:text-zinc-300"
                  href="tel:+48221002000"
                >
                  +48 22 100 20 00
                </a>
              </div>
              <div className="grid gap-1">
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.24em] text-zinc-500">Email</span>
                <a
                  className="text-sm font-semibold tracking-[-0.02em] text-white transition-colors duration-200 hover:text-zinc-300"
                  href="mailto:kontakt@samochodypremium.pl"
                >
                  kontakt@samochodypremium.pl
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Form area — open & spacious ── */}
      <div ref={ref} className="site-shell py-12 sm:py-16 lg:py-20 xl:py-24">
        <form className="mx-auto grid max-w-5xl gap-0">

          {/* Two-column row: name + email */}
          <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <FormField id="cf-name" index="01" label="Imie i nazwisko" visible={visible} delay={getDelay(1)}>
              <input
                autoComplete="name"
                className="contact-input contact-input--lg"
                id="cf-name"
                name="name"
                placeholder="Jan Kowalski"
                required
                type="text"
              />
            </FormField>

            <FormField id="cf-email" index="02" label="Adres e-mail" visible={visible} delay={getDelay(2)}>
              <input
                autoComplete="email"
                className="contact-input contact-input--lg"
                id="cf-email"
                name="email"
                placeholder="adres@firma.pl"
                required
                type="email"
              />
            </FormField>
          </div>

          {/* Two-column row: phone + scope */}
          <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
            <FormField id="cf-phone" index="03" label="Telefon" visible={visible} delay={getDelay(3)}>
              <input
                autoComplete="tel"
                className="contact-input contact-input--lg"
                id="cf-phone"
                name="phone"
                placeholder="+48 123 456 789"
                type="tel"
              />
            </FormField>

            <FormField id="cf-scope" index="04" label="Zainteresowanie" visible={visible} delay={getDelay(4)}>
              <div className="grid grid-cols-3 gap-2.5 py-2 sm:gap-3">
                {['Sedan', 'SUV', 'Sportowy', 'Elektryczny', 'Odkup', 'Inne'].map((scope) => (
                  <label className="contact-chip" key={scope}>
                    <input className="peer sr-only" name="scope" type="checkbox" value={scope.toLowerCase()} />
                    <span className="contact-chip-label contact-chip-label--lg">{scope}</span>
                  </label>
                ))}
              </div>
            </FormField>
          </div>

          {/* Full-width textarea */}
          <FormField id="cf-details" index="05" label="Szczegoly" visible={visible} delay={getDelay(5)}>
            <textarea
              className="contact-input contact-input--lg min-h-44 py-3 sm:min-h-52"
              id="cf-details"
              name="details"
              placeholder="Marka, model, rocznik, budżet, forma finansowania — im więcej szczegółów, tym szybciej przygotujemy propozycję."
              required
            />
          </FormField>

          {/* ── Submit row ── */}
          <div
            className={`contact-field flex flex-col gap-6 pt-10 sm:flex-row sm:items-center sm:justify-between lg:pt-12 ${visible ? 'is-visible' : ''}`}
            style={getDelay(6)}
          >
            <p className="max-w-sm text-[0.82rem] leading-7 text-zinc-400">
              Im bardziej konkretny opis, tym szybciej przygotujemy roboczy scenariusz.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button className="button-primary min-h-14 w-full px-10 sm:w-fit" type="submit">
                Wyslij zapytanie
              </button>
              <a className="button-secondary min-h-14 w-full px-10 sm:w-fit" href="tel:+48221002000">
                Zadzwon teraz
              </a>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
