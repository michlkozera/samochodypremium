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
    const details = (fd.get('details') as string)?.trim() ?? '';

    if (!name || !email || !details) {
      setServerError('Wypełnij wymagane pola: imię i nazwisko, e-mail oraz szczegóły.');
      setStatus('error');
      return;
    }

    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, scopes, details }),
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
              Twoja rozmowa zaczyna się tutaj.
            </h2>
          </div>
          <div
            className={`contact-field grid gap-6 ${visible ? 'is-visible' : ''}`}
            style={getDelay(1)}
          >
            <p className="max-w-md text-[0.94rem] leading-[1.8] text-zinc-400">
              Napisz do nas w sprawie zakupu, odkupu lub finansowania.
              Otrzymasz konkretną odpowiedź i jasny plan kolejnych kroków.
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
        {status === 'success' ? (
          <div className="mx-auto max-w-5xl border border-zinc-200 px-6 py-16 text-center">
            <p className="eyebrow mx-auto w-fit">Wysłano</p>
            <p className="mt-4 text-[0.95rem] font-semibold uppercase tracking-[-0.02em] text-zinc-950">
              Dziękujemy za wiadomość.
            </p>
            <p className="mt-2 text-sm leading-7 text-zinc-500">
              Odpowiemy najszybciej jak to możliwe, zwykle w ciągu godziny w godzinach pracy salonu.
            </p>
          </div>
        ) : (
          <form ref={formRef} className="mx-auto grid max-w-5xl gap-0" onSubmit={handleSubmit} noValidate>

            {/* Two-column row: name + email */}
            <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <FormField id="cf-name" index="01" label="Imię i nazwisko" visible={visible} delay={getDelay(1)}>
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
            <FormField id="cf-details" index="05" label="Szczegóły" visible={visible} delay={getDelay(5)}>
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
                <button className="button-primary min-h-14 w-full px-10 sm:w-fit" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Wysyłanie…' : 'Wyślij zapytanie'}
                </button>
                <a className="button-secondary min-h-14 w-full px-10 sm:w-fit" href="tel:+48221002000">
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
