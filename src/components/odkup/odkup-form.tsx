'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  CAR_BRANDS,
  COUNTRIES,
  VEHICLE_TYPES,
  VEHICLE_CONDITIONS,
} from '@/data/odkup-data';

/* ── Zod schema ── */

const currentYear = new Date().getFullYear();

const odkupSchema = z.object({
  firstName: z.string().min(1, 'Imię jest wymagane'),
  lastName: z.string().min(1, 'Nazwisko jest wymagane'),
  email: z.string().min(1, 'E-mail jest wymagany').email('Nieprawidłowy adres e-mail'),
  phone: z
    .string()
    .min(1, 'Telefon jest wymagany')
    .regex(/^[+]?[\d\s()-]{7,}$/, 'Nieprawidłowy numer telefonu'),

  vehicleType: z.string().optional(),
  brand: z.string().optional(),
  model: z.string().optional(),
  trim: z.string().optional(),
  year: z.string().optional().refine(
    (val) => {
      if (!val) return true;
      const n = Number(val);
      return !isNaN(n) && n >= 1900 && n <= currentYear;
    },
    { message: `Rok musi być między 1900 a ${currentYear}` },
  ),
  country: z.string().optional(),
  condition: z.string().optional(),
  mileage: z.string().min(1, 'Przebieg jest wymagany').refine(
    (val) => {
      const n = Number(val);
      return !isNaN(n) && n >= 0;
    },
    { message: 'Przebieg musi być liczbą nieujemną' },
  ),
  price: z.string().optional(),
  vin: z.string().optional().refine((val) => !val || val.length === 17, {
    message: 'Numer VIN musi mieć dokładnie 17 znaków',
  }),

  photo1: z.any().optional(),
  photo2: z.any().optional(),
  photo3: z.any().optional(),
  photo4: z.any().optional(),
  vatInvoice: z.boolean().optional(),
  bodyRepairs: z.boolean().optional(),
  message: z.string().optional(),

  consent: z.literal(true, 'Musisz zaakceptować regulamin i politykę prywatności'),
});

type OdkupFormValues = z.infer<typeof odkupSchema>;

/* ── Stagger-reveal hook (reused from contact-form) ── */

function useStaggerReveal(count: number, baseDelay = 100) {
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
      { threshold: 0.05 },
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

/* ── Animated form-field wrapper (same pattern as contact-form) ── */

function FormField({
  id,
  label,
  index,
  visible,
  delay,
  className: extraCls,
  error,
  children,
}: {
  id: string;
  label: string;
  index: string;
  visible: boolean;
  delay: React.CSSProperties;
  className?: string;
  error?: string;
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
      {error && (
        <p className="mt-1.5 text-[0.72rem] font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}

/* ── Section heading ── */

function SectionHeading({
  number,
  title,
  visible,
  delay,
}: {
  number: string;
  title: string;
  visible: boolean;
  delay: React.CSSProperties;
}) {
  return (
    <div
      className={`contact-field border-b border-zinc-200 pb-4 pt-10 sm:pt-12 lg:pt-14 ${visible ? 'is-visible' : ''}`}
      style={delay}
    >
      <div className="flex items-center gap-3">
        <span className="flex h-7 w-7 items-center justify-center border border-zinc-950 bg-zinc-950 text-[0.6rem] font-bold text-white">
          {number}
        </span>
        <h3 className="text-[0.74rem] font-semibold uppercase tracking-[0.22em] text-zinc-950">
          {title}
        </h3>
      </div>
    </div>
  );
}

/* ── Main form component ── */

export function OdkupForm() {
  const { ref, visible, getDelay } = useStaggerReveal(30);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<OdkupFormValues>({
    resolver: zodResolver(odkupSchema),
    defaultValues: {
      vatInvoice: false,
      bodyRepairs: false,
      consent: undefined,
    },
  });

  const [serverError, setServerError] = useState('');

  const onSubmit = async (data: OdkupFormValues) => {
    try {
      setServerError('');

      const formData = new FormData();

      // Text fields
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      formData.append('phone', data.phone);
      if (data.vehicleType) formData.append('vehicleType', data.vehicleType);
      if (data.brand) formData.append('brand', data.brand);
      if (data.model) formData.append('model', data.model);
      if (data.trim) formData.append('trim', data.trim);
      if (data.year) formData.append('year', data.year);
      if (data.country) formData.append('country', data.country);
      if (data.condition) formData.append('condition', data.condition);
      formData.append('mileage', data.mileage);
      if (data.price) formData.append('price', data.price);
      if (data.vin) formData.append('vin', data.vin);
      formData.append('vatInvoice', String(!!data.vatInvoice));
      formData.append('bodyRepairs', String(!!data.bodyRepairs));
      if (data.message) formData.append('message', data.message);

      // Photo files
      for (const key of ['photo1', 'photo2', 'photo3', 'photo4'] as const) {
        const fileList = data[key] as FileList | undefined;
        if (fileList && fileList.length > 0 && fileList[0]) {
          formData.append(key, fileList[0]);
        }
      }

      const res = await fetch('/api/odkup', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'Nie udało się wysłać formularza.');
      }

      setSubmitStatus('success');
    } catch (err) {
      setServerError(
        err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd.',
      );
      setSubmitStatus('error');
    }
  };

  let fieldIdx = 0;
  const nextIdx = () => {
    fieldIdx += 1;
    return String(fieldIdx).padStart(2, '0');
  };

  let sectionDelay = 0;
  const nextDelay = () => {
    sectionDelay += 1;
    return getDelay(sectionDelay);
  };

  return (
    <section className="border-b border-zinc-200 bg-white">
      {/* ── Dark section header (matches ContactForm) ── */}
      <div className="border-b border-zinc-200/60 bg-zinc-950 text-white">
        <div className="site-shell grid gap-8 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16 lg:py-20 xl:py-24">
          <div
            className={`contact-field grid gap-5 ${visible ? 'is-visible' : ''}`}
            style={getDelay(0)}
          >
            <p className="eyebrow border-zinc-600">Formularz odkupu</p>
            <h2 className="section-title text-white">
              Chcesz sprzedać swój samochód?
            </h2>
          </div>
          <div
            className={`contact-field grid gap-6 ${visible ? 'is-visible' : ''}`}
            style={getDelay(1)}
          >
            <div className="max-w-md text-[0.94rem] leading-[1.8] text-zinc-400">
              <p>
                Z przyjemnością odkupimy lub pomożemy w sprzedaży Państwa samochodu.
                Jesteśmy zainteresowani odkupem samochodów:
              </p>
              <ul className="mt-3 grid gap-1.5 pl-1">
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-white/60" />
                  <span>pochodzących z polskiego lub japońskiego rynku</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-white/60" />
                  <span>z udokumentowanym przebiegiem do 100.000 km</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1.5 block h-1.5 w-1.5 shrink-0 bg-white/60" />
                  <span>z bezwypadkową oraz bezkolizyjną przeszłością</span>
                </li>
              </ul>
              <p className="mt-4 text-zinc-500">
                Nie odkupujemy samochodów bez jasnej, klarownej przeszłości, poszkodowych,
                w złym stanie.
              </p>
              <p className="mt-4">
                Jeżeli posiadacie Państwo samochód spełniający powyższe kryteria,
                serdecznie zapraszamy do kontaktu. Odpowiadamy na każde zapytanie i żaden
                pozostawiony kontakt nie pozostaje bez odpowiedzi.
              </p>
              <p className="mt-4 text-zinc-500 text-[0.82rem]">
                W razie problemów z wypełnieniem formularza prosimy o przesłanie wiadomości
                bezpośrednio na maila:{' '}
                <a
                  href="mailto:kontakt@samochodypremium.pl"
                  className="font-semibold text-white transition-colors duration-200 hover:text-zinc-300"
                >
                  kontakt@samochodypremium.pl
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Form area ── */}
      <div ref={ref} className="site-shell py-12 sm:py-16 lg:py-20 xl:py-24">
        {submitStatus === 'success' ? (
          <div className="mx-auto max-w-5xl border border-zinc-200 px-6 py-16 text-center">
            <p className="eyebrow mx-auto w-fit">Wysłano</p>
            <p className="mt-4 text-[0.95rem] font-semibold uppercase tracking-[-0.02em] text-zinc-950">
              Dziękujemy za przesłanie formularza.
            </p>
            <p className="mt-2 text-sm leading-7 text-zinc-500">
              Skontaktujemy się z Państwem najszybciej jak to możliwe.
            </p>
          </div>
        ) : (
          <form
            className="mx-auto grid max-w-5xl gap-0"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            {/* ══════════════════════════════════════════════
                SEKCJA 1 — Dane kontaktowe
               ══════════════════════════════════════════════ */}
            <SectionHeading
              number="1"
              title="Dane kontaktowe"
              visible={visible}
              delay={nextDelay()}
            />

            <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <FormField
                id="od-firstName"
                index={nextIdx()}
                label="Imię"
                visible={visible}
                delay={nextDelay()}
                error={errors.firstName?.message}
              >
                <input
                  autoComplete="given-name"
                  className="contact-input contact-input--lg"
                  id="od-firstName"
                  placeholder="Jan"
                  type="text"
                  {...register('firstName')}
                />
              </FormField>

              <FormField
                id="od-lastName"
                index={nextIdx()}
                label="Nazwisko"
                visible={visible}
                delay={nextDelay()}
                error={errors.lastName?.message}
              >
                <input
                  autoComplete="family-name"
                  className="contact-input contact-input--lg"
                  id="od-lastName"
                  placeholder="Kowalski"
                  type="text"
                  {...register('lastName')}
                />
              </FormField>
            </div>

            <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <FormField
                id="od-email"
                index={nextIdx()}
                label="E-mail"
                visible={visible}
                delay={nextDelay()}
                error={errors.email?.message}
              >
                <input
                  autoComplete="email"
                  className="contact-input contact-input--lg"
                  id="od-email"
                  placeholder="adres@firma.pl"
                  type="email"
                  {...register('email')}
                />
              </FormField>

              <FormField
                id="od-phone"
                index={nextIdx()}
                label="Telefon"
                visible={visible}
                delay={nextDelay()}
                error={errors.phone?.message}
              >
                <input
                  autoComplete="tel"
                  className="contact-input contact-input--lg"
                  id="od-phone"
                  placeholder="+48 123 456 789"
                  type="tel"
                  {...register('phone')}
                />
              </FormField>
            </div>

            {/* ══════════════════════════════════════════════
                SEKCJA 2 — Dane samochodu
               ══════════════════════════════════════════════ */}
            <SectionHeading
              number="2"
              title="Dane samochodu"
              visible={visible}
              delay={nextDelay()}
            />

            <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <FormField
                id="od-vehicleType"
                index={nextIdx()}
                label="Rodzaj pojazdu"
                visible={visible}
                delay={nextDelay()}
                error={errors.vehicleType?.message}
              >
                <select
                  className="contact-input contact-input--lg"
                  id="od-vehicleType"
                  {...register('vehicleType')}
                >
                  <option value="">— Wybierz —</option>
                  {VEHICLE_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                id="od-brand"
                index={nextIdx()}
                label="Marka"
                visible={visible}
                delay={nextDelay()}
                error={errors.brand?.message}
              >
                <select
                  className="contact-input contact-input--lg"
                  id="od-brand"
                  {...register('brand')}
                >
                  <option value="">— Wybierz markę —</option>
                  {CAR_BRANDS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <FormField
                id="od-model"
                index={nextIdx()}
                label="Model"
                visible={visible}
                delay={nextDelay()}
                error={errors.model?.message}
              >
                <input
                  className="contact-input contact-input--lg"
                  id="od-model"
                  placeholder="np. A4, 911, GLC"
                  type="text"
                  {...register('model')}
                />
              </FormField>

              <FormField
                id="od-trim"
                index={nextIdx()}
                label="Wersja wyposażenia"
                visible={visible}
                delay={nextDelay()}
                error={errors.trim?.message}
              >
                <input
                  className="contact-input contact-input--lg"
                  id="od-trim"
                  placeholder="np. S-Line, AMG, M Sport"
                  type="text"
                  {...register('trim')}
                />
              </FormField>
            </div>

            <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <FormField
                id="od-year"
                index={nextIdx()}
                label="Rok produkcji"
                visible={visible}
                delay={nextDelay()}
                error={errors.year?.message}
              >
                <input
                  className="contact-input contact-input--lg"
                  id="od-year"
                  placeholder={`np. ${currentYear - 2}`}
                  type="number"
                  min={1900}
                  max={currentYear}
                  {...register('year')}
                />
              </FormField>

              <FormField
                id="od-country"
                index={nextIdx()}
                label="Kraj pochodzenia"
                visible={visible}
                delay={nextDelay()}
                error={errors.country?.message}
              >
                <select
                  className="contact-input contact-input--lg"
                  id="od-country"
                  {...register('country')}
                >
                  <option value="">— Wybierz kraj —</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </FormField>
            </div>

            <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <FormField
                id="od-condition"
                index={nextIdx()}
                label="Stan pojazdu"
                visible={visible}
                delay={nextDelay()}
                error={errors.condition?.message}
              >
                <select
                  className="contact-input contact-input--lg"
                  id="od-condition"
                  {...register('condition')}
                >
                  <option value="">— Wybierz —</option>
                  {VEHICLE_CONDITIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </FormField>

              <FormField
                id="od-mileage"
                index={nextIdx()}
                label="Przebieg [km]"
                visible={visible}
                delay={nextDelay()}
                error={errors.mileage?.message}
              >
                <input
                  className="contact-input contact-input--lg"
                  id="od-mileage"
                  placeholder="np. 45000"
                  type="number"
                  min={0}
                  {...register('mileage')}
                />
              </FormField>
            </div>

            <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <FormField
                id="od-price"
                index={nextIdx()}
                label="Proponowana cena"
                visible={visible}
                delay={nextDelay()}
                error={errors.price?.message}
              >
                <input
                  className="contact-input contact-input--lg"
                  id="od-price"
                  placeholder="np. 150000"
                  type="number"
                  min={0}
                  {...register('price')}
                />
              </FormField>

              <FormField
                id="od-vin"
                index={nextIdx()}
                label="Numer VIN"
                visible={visible}
                delay={nextDelay()}
                error={errors.vin?.message}
              >
                <input
                  className="contact-input contact-input--lg"
                  id="od-vin"
                  placeholder="17-znakowy numer VIN"
                  type="text"
                  maxLength={17}
                  {...register('vin')}
                />
              </FormField>
            </div>

            {/* ══════════════════════════════════════════════
                SEKCJA 3 — Status i Pliki
               ══════════════════════════════════════════════ */}
            <SectionHeading
              number="3"
              title="Status i pliki"
              visible={visible}
              delay={nextDelay()}
            />

            <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <FormField
                id="od-photo1"
                index={nextIdx()}
                label="Zdjęcie samochodu 1"
                visible={visible}
                delay={nextDelay()}
                error={errors.photo1?.message as string | undefined}
              >
                <input
                  className="contact-input contact-input--lg file:mr-4 file:border-0 file:bg-zinc-950 file:px-4 file:py-2 file:text-[0.7rem] file:font-semibold file:uppercase file:tracking-[0.16em] file:text-white hover:file:bg-zinc-800"
                  id="od-photo1"
                  type="file"
                  accept="image/*"
                  {...register('photo1')}
                />
              </FormField>

              <FormField
                id="od-photo2"
                index={nextIdx()}
                label="Zdjęcie samochodu 2"
                visible={visible}
                delay={nextDelay()}
                error={errors.photo2?.message as string | undefined}
              >
                <input
                  className="contact-input contact-input--lg file:mr-4 file:border-0 file:bg-zinc-950 file:px-4 file:py-2 file:text-[0.7rem] file:font-semibold file:uppercase file:tracking-[0.16em] file:text-white hover:file:bg-zinc-800"
                  id="od-photo2"
                  type="file"
                  accept="image/*"
                  {...register('photo2')}
                />
              </FormField>
            </div>

            <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <FormField
                id="od-photo3"
                index={nextIdx()}
                label="Zdjęcie samochodu 3"
                visible={visible}
                delay={nextDelay()}
                error={errors.photo3?.message as string | undefined}
              >
                <input
                  className="contact-input contact-input--lg file:mr-4 file:border-0 file:bg-zinc-950 file:px-4 file:py-2 file:text-[0.7rem] file:font-semibold file:uppercase file:tracking-[0.16em] file:text-white hover:file:bg-zinc-800"
                  id="od-photo3"
                  type="file"
                  accept="image/*"
                  {...register('photo3')}
                />
              </FormField>

              <FormField
                id="od-photo4"
                index={nextIdx()}
                label="Zdjęcie samochodu 4"
                visible={visible}
                delay={nextDelay()}
                error={errors.photo4?.message as string | undefined}
              >
                <input
                  className="contact-input contact-input--lg file:mr-4 file:border-0 file:bg-zinc-950 file:px-4 file:py-2 file:text-[0.7rem] file:font-semibold file:uppercase file:tracking-[0.16em] file:text-white hover:file:bg-zinc-800"
                  id="od-photo4"
                  type="file"
                  accept="image/*"
                  {...register('photo4')}
                />
              </FormField>
            </div>

            {/* Checkboxes */}
            <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
              <div
                className={`contact-field group flex items-center gap-3 py-5 sm:py-6 lg:py-7 ${visible ? 'is-visible' : ''}`}
                style={nextDelay()}
              >
                <input
                  className="h-5 w-5 shrink-0 cursor-pointer appearance-none border border-zinc-300 bg-white transition-colors checked:border-zinc-950 checked:bg-zinc-950"
                  id="od-vatInvoice"
                  type="checkbox"
                  {...register('vatInvoice')}
                />
                <label
                  className="cursor-pointer text-[0.82rem] font-medium text-zinc-700"
                  htmlFor="od-vatInvoice"
                >
                  Faktura VAT
                </label>
              </div>

              <div
                className={`contact-field group flex items-center gap-3 py-5 sm:py-6 lg:py-7 ${visible ? 'is-visible' : ''}`}
                style={nextDelay()}
              >
                <input
                  className="h-5 w-5 shrink-0 cursor-pointer appearance-none border border-zinc-300 bg-white transition-colors checked:border-zinc-950 checked:bg-zinc-950"
                  id="od-bodyRepairs"
                  type="checkbox"
                  {...register('bodyRepairs')}
                />
                <label
                  className="cursor-pointer text-[0.82rem] font-medium text-zinc-700"
                  htmlFor="od-bodyRepairs"
                >
                  Po naprawach blacharsko-lakierniczych
                </label>
              </div>
            </div>

            {/* Message textarea */}
            <FormField
              id="od-message"
              index={nextIdx()}
              label="Wiadomość"
              visible={visible}
              delay={nextDelay()}
              error={errors.message?.message}
            >
              <textarea
                className="contact-input contact-input--lg min-h-44 py-3 sm:min-h-52"
                id="od-message"
                placeholder="Dodatkowe informacje o samochodzie, jego historii, wyposażeniu lub oczekiwaniach cenowych…"
                {...register('message')}
              />
            </FormField>

            {/* ══════════════════════════════════════════════
                SEKCJA 4 — Zgody prawne
               ══════════════════════════════════════════════ */}
            <SectionHeading
              number="4"
              title="Zgody prawne"
              visible={visible}
              delay={nextDelay()}
            />

            {/* Consent checkbox */}
            <div
              className={`contact-field group py-5 sm:py-6 lg:py-7 ${visible ? 'is-visible' : ''}`}
              style={nextDelay()}
            >
              <div className="flex items-start gap-3">
                <input
                  className="mt-0.5 h-5 w-5 shrink-0 cursor-pointer appearance-none border border-zinc-300 bg-white transition-colors checked:border-zinc-950 checked:bg-zinc-950"
                  id="od-consent"
                  type="checkbox"
                  {...register('consent')}
                />
                <label
                  className="cursor-pointer text-[0.82rem] font-medium leading-6 text-zinc-700"
                  htmlFor="od-consent"
                >
                  Potwierdzam zapoznanie się z treścią i akceptację regulaminu oraz
                  polityki prywatności.
                </label>
              </div>
              {errors.consent?.message && (
                <p className="mt-1.5 pl-8 text-[0.72rem] font-medium text-red-600">
                  {errors.consent.message}
                </p>
              )}
            </div>

            {/* RODO legal text */}
            <div
              className={`contact-field py-4 ${visible ? 'is-visible' : ''}`}
              style={nextDelay()}
            >
              <div className="max-w-4xl space-y-3 text-xs leading-5 text-zinc-500">
                <p>
                  Administratorem Pani/Pana danych osobowych jest SAMOCHODY PREMIUM SPÓŁKA
                  Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ (dalej: „Administrator"),
                  z siedzibą przy ul. podanej w danych rejestrowych spółki. Z Administratorem
                  można się kontaktować pisemnie, za pomocą poczty tradycyjnej na adres
                  siedziby lub drogą e-mailową pod adresem: kontakt@samochodypremium.pl.
                </p>
                <p>
                  Pani/Pana dane osobowe są przetwarzane na podstawie art. 6 ust. 1 lit. a)
                  i lit. f) Rozporządzenia Parlamentu Europejskiego i Rady (UE) 2016/679
                  z dnia 27 kwietnia 2016 r. w sprawie ochrony osób fizycznych w związku
                  z przetwarzaniem danych osobowych i w sprawie swobodnego przepływu takich
                  danych oraz uchylenia dyrektywy 95/46/WE (ogólne rozporządzenie o ochronie
                  danych), tj. na podstawie zgody oraz prawnie uzasadnionego interesu
                  Administratora — w celu odpowiedzi na zapytanie, przedstawienia oferty
                  odkupu pojazdu oraz kontaktu w sprawie realizacji usługi.
                </p>
                <p>
                  Podanie danych osobowych jest dobrowolne, jednakże ich niepodanie
                  uniemożliwi realizację ww. celów. Pani/Pana dane będą przechowywane
                  przez okres niezbędny do realizacji celów, dla których zostały zebrane,
                  nie dłużej niż przez okres przedawnienia roszczeń.
                </p>
                <p>
                  Przysługuje Pani/Panu prawo dostępu do treści danych oraz ich
                  sprostowania, usunięcia lub ograniczenia przetwarzania, a także prawo
                  sprzeciwu, żądania zaprzestania przetwarzania i przenoszenia danych,
                  jak również prawo do cofnięcia zgody w dowolnym momencie oraz prawo
                  do wniesienia skargi do organu nadzorczego — Prezesa Urzędu Ochrony
                  Danych Osobowych.
                </p>
                <p>
                  Dane osobowe nie będą przekazywane do państw trzecich ani organizacji
                  międzynarodowych. Administrator nie podejmuje decyzji w sposób
                  zautomatyzowany, w tym nie stosuje profilowania.
                </p>
              </div>
            </div>

            {/* ── Submit row (matches ContactForm) ── */}
            <div
              className={`contact-field flex flex-col gap-6 pt-10 sm:flex-row sm:items-center sm:justify-between lg:pt-12 ${visible ? 'is-visible' : ''}`}
              style={nextDelay()}
            >
              <p className="max-w-sm text-[0.82rem] leading-7 text-zinc-400">
                Odpowiadamy na każde zapytanie — żaden pozostawiony kontakt nie pozostaje
                bez odpowiedzi.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  className="button-primary min-h-14 w-full px-10 sm:w-fit"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Wysyłanie…' : 'Wyślij formularz'}
                </button>
                <a
                  className="button-secondary min-h-14 w-full px-10 sm:w-fit"
                  href="mailto:kontakt@samochodypremium.pl"
                >
                  Napisz e-mail
                </a>
              </div>
            </div>

            {submitStatus === 'error' && (
              <p className="mt-4 text-[0.82rem] font-medium text-red-600">
                {serverError || 'Wystąpił błąd podczas wysyłania formularza.'}{' '}
                Spróbuj ponownie lub napisz bezpośrednio na adres{' '}
                <a href="mailto:kontakt@samochodypremium.pl" className="underline">
                  kontakt@samochodypremium.pl
                </a>.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
