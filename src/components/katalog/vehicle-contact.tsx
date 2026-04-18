'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { type CatalogVehicleDetail } from '@/lib/vehicle-catalog';

const SHADOW = '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)';

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
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    setStatus('sending');
    setServerError('');

    const fd = new FormData(form);
    const name = (fd.get('name') as string)?.trim() ?? '';
    const email = (fd.get('email') as string)?.trim() ?? '';
    const phone = (fd.get('phone') as string)?.trim() ?? '';
    const scopes = fd.getAll('scope').map(String);
    const message = (fd.get('message') as string)?.trim() ?? '';
    const vehicleName = (fd.get('vehicle_name') as string) ?? '';
    const vehicleSlug = (fd.get('vehicle_slug') as string) ?? '';

    if (!name || !email) {
      setServerError('Wypełnij wymagane pola: imię i nazwisko oraz e-mail.');
      setStatus('error');
      return;
    }

    try {
      const res = await fetch('/api/vehicle-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, scopes, message, vehicleName, vehicleSlug }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Nie udało się wysłać formularza.');
      }

      setStatus('success');
    } catch (err) {
      setServerError(err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd.');
      setStatus('error');
    }
  };

  return (
    <section className="bg-[linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,250,250,0.94)_100%)]" id="kontakt-oferta">
      {/* ── Light header — matches page design language ── */}
      <div className="site-shell pt-14 sm:pt-16 lg:pt-20 xl:pt-24">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
          <div
            className={`contact-field ${visible ? 'is-visible' : ''}`}
            style={getDelay(0)}
          >
            <h2 className="section-title !max-w-none !font-medium">
              Zainteresowany tym modelem?
            </h2>
          </div>
          <div
            className={`contact-field grid gap-6 ${visible ? 'is-visible' : ''}`}
            style={getDelay(1)}
          >
            <p className="body-copy max-w-xl">
              Napisz w sprawie{' '}
              <span className="font-semibold text-zinc-950">
                {vehicle.make} {vehicle.model}
              </span>
              . Odpowiemy z konkretną propozycją, historią serwisową i wariantami finansowania.
            </p>
            <div
              className="grid grid-cols-1 bg-white sm:grid-cols-2"
              style={{ boxShadow: SHADOW }}
            >
              <div className="grid gap-1.5 px-5 py-4 sm:px-6 sm:py-5">
                <span className="text-[0.6rem] font-medium uppercase tracking-[0.22em] text-zinc-500">
                  Telefon
                </span>
                <a
                  className="text-[0.95rem] font-medium tracking-[-0.02em] text-zinc-950 transition-colors duration-200 hover:text-zinc-500"
                  href={advisor.phoneHref}
                >
                  {advisor.phone}
                </a>
              </div>
              <div className="grid gap-1.5 border-t border-zinc-100 px-5 py-4 sm:border-l sm:border-t-0 sm:px-6 sm:py-5">
                <span className="text-[0.6rem] font-medium uppercase tracking-[0.22em] text-zinc-500">
                  Email
                </span>
                <a
                  className="text-[0.95rem] font-medium tracking-[-0.02em] text-zinc-950 transition-colors duration-200 hover:text-zinc-500"
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
        {status === 'success' ? (
          <div
            className="mx-auto max-w-5xl bg-white px-6 py-16 text-center"
            style={{ boxShadow: SHADOW }}
          >
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-zinc-500">
              Wysłano
            </p>
            <p className="mt-4 text-[clamp(1.05rem,2.1vw,1.35rem)] font-medium uppercase tracking-[-0.01em] text-zinc-950">
              Dziękujemy za zapytanie o {vehicle.make} {vehicle.model}.
            </p>
            <p className="body-copy mx-auto mt-3 max-w-md">
              Odpowiemy najszybciej jak to możliwe, zwykle w ciągu godziny w godzinach pracy salonu.
            </p>
          </div>
        ) : (
          <form ref={formRef} className="mx-auto grid max-w-5xl gap-0" onSubmit={handleSubmit} noValidate>
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
                  {['Prezentacja', 'Jazda testowa', 'Finansowanie', 'Trade-in', 'Wycena', 'Inne'].map(
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
                placeholder={`Interesuje mnie ${vehicle.make} ${vehicle.model}. Proszę o kontakt w sprawie szczegółów oferty…`}
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
                  disabled={status === 'sending'}
                >
                  {status === 'sending' ? 'Wysyłanie…' : 'Wyślij zapytanie'}
                </button>
                <a
                  className="button-secondary min-h-14 w-full px-10 sm:w-fit"
                  href={advisor.phoneHref}
                >
                  Zadzwoń teraz
                </a>
              </div>
            </div>

            {status === 'error' && (
              <p className="mt-4 text-[0.82rem] font-medium text-red-600">
                {serverError || 'Wystąpił błąd podczas wysyłania.'}{' '}
                Spróbuj ponownie lub napisz na{' '}
                <a href="mailto:kontakt@samochodypremium.pl" className="underline">kontakt@samochodypremium.pl</a>.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
