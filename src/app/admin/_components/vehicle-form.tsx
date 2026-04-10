'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { addVehicle, updateVehicle, type ActionState, type SerializedVehicle } from '@/app/actions/vehicle';

/* ------------------------------------------------------------------ */
/*  Opcje selectów                                                     */
/* ------------------------------------------------------------------ */

const FUEL_OPTIONS = [
  { value: 'PETROL', label: 'Benzyna' },
  { value: 'DIESEL', label: 'Diesel' },
  { value: 'HYBRID', label: 'Hybryda' },
  { value: 'ELECTRIC', label: 'Elektryk' },
  { value: 'LPG', label: 'LPG' },
] as const;

const TRANSMISSION_OPTIONS = [
  { value: 'AUTOMATIC', label: 'Automatyczna' },
  { value: 'MANUAL', label: 'Manualna' },
] as const;

const DRIVE_OPTIONS = [
  { value: 'AWD', label: '4x4 (AWD)' },
  { value: 'RWD', label: 'Tylny (RWD)' },
  { value: 'FWD', label: 'Przedni (FWD)' },
] as const;

const BODY_OPTIONS = [
  { value: 'SEDAN', label: 'Sedan' },
  { value: 'SUV', label: 'SUV' },
  { value: 'COUPE', label: 'Coupé' },
  { value: 'CONVERTIBLE', label: 'Kabriolet' },
  { value: 'HATCHBACK', label: 'Hatchback' },
  { value: 'ESTATE', label: 'Kombi' },
  { value: 'LIFTBACK', label: 'Liftback' },
  { value: 'PICKUP', label: 'Pickup' },
  { value: 'VAN', label: 'Van' },
] as const;

const STATUS_OPTIONS = [
  { value: 'AVAILABLE', label: 'Dostępny' },
  { value: 'RESERVED', label: 'Zarezerwowany' },
  { value: 'SOLD', label: 'Sprzedany' },
] as const;

const VAT_OPTIONS = [
  { value: 'NONE', label: 'Brak faktury (os. prywatna)' },
  { value: 'VAT_23', label: 'Faktura VAT 23%' },
  { value: 'VAT_MARGIN', label: 'VAT marża' },
] as const;

/* ------------------------------------------------------------------ */
/*  Styled primitives                                                  */
/* ------------------------------------------------------------------ */

const inputCls =
  'w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-graphite-600 outline-none transition focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20';

const labelCls =
  'mb-1.5 block text-xs font-medium uppercase tracking-wider text-graphite-500';

function Field({
  label,
  htmlFor,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
      </label>
      {children}
    </div>
  );
}

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
      <legend className="mb-6 text-sm font-semibold tracking-tight text-amber-400">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

function SubmitButton({ editMode }: { editMode: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3 text-sm font-semibold text-graphite-950 shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending && (
        <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {pending ? 'Zapisywanie…' : editMode ? 'Zapisz zmiany' : 'Dodaj pojazd'}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  VehicleForm                                                        */
/* ------------------------------------------------------------------ */

interface VehicleFormProps {
  vehicle?: SerializedVehicle | null;
}

export default function VehicleForm({ vehicle }: VehicleFormProps) {
  const editMode = !!vehicle;
  const action = editMode ? updateVehicle : addVehicle;

  const [state, formAction] = useActionState<ActionState | null, FormData>(action, null);

  const d = vehicle; // shorthand for defaults
  const fmtDate = (v: Date | string | null | undefined) => {
    if (!v) return '';
    const dt = typeof v === 'string' ? new Date(v) : v;
    return dt.toISOString().slice(0, 10);
  };

  return (
    <>
      {state?.error && (
        <div className="mt-6 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-400">
          {state.error}
        </div>
      )}
      {state?.success && (
        <div className="mt-6 rounded-lg bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
          {state.message}
        </div>
      )}

      <form action={formAction} className="mt-8 space-y-8">
        {editMode && <input type="hidden" name="id" value={d!.id} />}

        {/* ---- Podstawowe informacje ---- */}
        <SectionCard title="Podstawowe informacje">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Marka *" htmlFor="make">
              <input id="make" name="make" type="text" required placeholder="np. Porsche" defaultValue={d?.make ?? ''} className={inputCls} />
            </Field>
            <Field label="Model *" htmlFor="model">
              <input id="model" name="model" type="text" required placeholder="np. 911 Carrera S" defaultValue={d?.model ?? ''} className={inputCls} />
            </Field>
            <Field label="Generacja / wersja" htmlFor="generation">
              <input id="generation" name="generation" type="text" placeholder="np. 992" defaultValue={d?.generation ?? ''} className={inputCls} />
            </Field>
            <Field label="Rok produkcji *" htmlFor="year">
              <input id="year" name="year" type="number" required min={1900} max={2100} placeholder="np. 2024" defaultValue={d?.year ?? ''} className={inputCls} />
            </Field>
            <Field label="Numer VIN *" htmlFor="vin" className="sm:col-span-2">
              <input id="vin" name="vin" type="text" required minLength={17} maxLength={17} placeholder="17-znakowy numer VIN" defaultValue={d?.vin ?? ''} className={inputCls} />
            </Field>
          </div>
        </SectionCard>

        {/* ---- Silnik i napęd ---- */}
        <SectionCard title="Silnik i napęd">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Przebieg (km) *" htmlFor="mileage">
              <input id="mileage" name="mileage" type="number" required min={0} placeholder="np. 24500" defaultValue={d?.mileage ?? ''} className={inputCls} />
            </Field>
            <Field label="Pojemność silnika (cm³)" htmlFor="engineCapacity">
              <input id="engineCapacity" name="engineCapacity" type="number" min={0} placeholder="np. 2998" defaultValue={d?.engineCapacity ?? ''} className={inputCls} />
            </Field>
            <Field label="Moc (KM) *" htmlFor="power">
              <input id="power" name="power" type="number" required min={1} placeholder="np. 450" defaultValue={d?.power ?? ''} className={inputCls} />
            </Field>
            <Field label="Rodzaj paliwa *" htmlFor="fuelType">
              <select id="fuelType" name="fuelType" required className={inputCls} defaultValue={d?.fuelType ?? ''}>
                <option value="">Wybierz…</option>
                {FUEL_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Skrzynia biegów *" htmlFor="transmission">
              <select id="transmission" name="transmission" required className={inputCls} defaultValue={d?.transmission ?? ''}>
                <option value="">Wybierz…</option>
                {TRANSMISSION_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Napęd *" htmlFor="driveTrain">
              <select id="driveTrain" name="driveTrain" required className={inputCls} defaultValue={d?.driveTrain ?? ''}>
                <option value="">Wybierz…</option>
                {DRIVE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
          </div>
        </SectionCard>

        {/* ---- Wygląd i wnętrze ---- */}
        <SectionCard title="Wygląd i wnętrze">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Typ nadwozia" htmlFor="bodyType">
              <select id="bodyType" name="bodyType" className={inputCls} defaultValue={d?.bodyType ?? ''}>
                <option value="">Wybierz…</option>
                {BODY_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Kolor" htmlFor="color">
              <input id="color" name="color" type="text" placeholder="np. Czarny metalik" defaultValue={d?.color ?? ''} className={inputCls} />
            </Field>
            <Field label="Tapicerka" htmlFor="upholstery">
              <input id="upholstery" name="upholstery" type="text" placeholder="np. Skóra Merino czarna" defaultValue={d?.upholstery ?? ''} className={inputCls} />
            </Field>
            <Field label="Liczba drzwi" htmlFor="doors">
              <input id="doors" name="doors" type="number" min={1} max={6} placeholder="np. 4" defaultValue={d?.doors ?? ''} className={inputCls} />
            </Field>
            <Field label="Liczba miejsc" htmlFor="seats">
              <input id="seats" name="seats" type="number" min={1} max={9} placeholder="np. 5" defaultValue={d?.seats ?? ''} className={inputCls} />
            </Field>
          </div>
        </SectionCard>

        {/* ---- Historia i pochodzenie ---- */}
        <SectionCard title="Historia i pochodzenie">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Kraj pochodzenia" htmlFor="originCountry">
              <input id="originCountry" name="originCountry" type="text" placeholder="np. Niemcy" defaultValue={d?.originCountry ?? ''} className={inputCls} />
            </Field>
            <Field label="Data pierwszej rejestracji" htmlFor="firstRegistration">
              <input id="firstRegistration" name="firstRegistration" type="date" defaultValue={fmtDate(d?.firstRegistration)} className={inputCls} />
            </Field>
            <div className="flex items-center gap-6 sm:col-span-2">
              <div className="flex items-center gap-3">
                <input id="accidentFree" name="accidentFree" type="checkbox" defaultChecked={d?.accidentFree ?? false} className="h-4 w-4 rounded border-white/[0.15] bg-white/[0.04] text-amber-500 accent-amber-500" />
                <label htmlFor="accidentFree" className="text-sm text-graphite-300">Bezwypadkowy</label>
              </div>
              <div className="flex items-center gap-3">
                <input id="serviceHistory" name="serviceHistory" type="checkbox" defaultChecked={d?.serviceHistory ?? false} className="h-4 w-4 rounded border-white/[0.15] bg-white/[0.04] text-amber-500 accent-amber-500" />
                <label htmlFor="serviceHistory" className="text-sm text-graphite-300">Serwisowany w ASO</label>
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ---- Cena i sprzedaż ---- */}
        <SectionCard title="Cena i sprzedaż">
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Cena (PLN) *" htmlFor="price">
              <input id="price" name="price" type="number" required min={0} step="0.01" placeholder="np. 589000" defaultValue={d?.price ? String(d.price) : ''} className={inputCls} />
            </Field>
            <Field label="Status" htmlFor="status">
              <select id="status" name="status" className={inputCls} defaultValue={d?.status ?? 'AVAILABLE'}>
                {STATUS_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Rodzaj faktury" htmlFor="vatType">
              <select id="vatType" name="vatType" className={inputCls} defaultValue={d?.vatType ?? 'NONE'}>
                {VAT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </Field>
            <div className="flex items-center gap-3 self-end pb-1">
              <input id="vatReclaimable" name="vatReclaimable" type="checkbox" defaultChecked={d?.vatReclaimable ?? false} className="h-4 w-4 rounded border-white/[0.15] bg-white/[0.04] text-amber-500 accent-amber-500" />
              <label htmlFor="vatReclaimable" className="text-sm text-graphite-300">Możliwość odliczenia VAT 23%</label>
            </div>
          </div>
        </SectionCard>

        {/* ---- Media i wyposażenie ---- */}
        <SectionCard title="Media i wyposażenie">
          <div className="space-y-5">
            <Field label="Opis" htmlFor="description">
              <textarea id="description" name="description" rows={5} placeholder="Szczegółowy opis pojazdu…" defaultValue={d?.description ?? ''} className={inputCls} />
            </Field>
            <Field label="Zdjęcia (URL-e oddzielone przecinkiem)" htmlFor="images">
              <textarea id="images" name="images" rows={3} placeholder="https://example.com/foto1.jpg, https://example.com/foto2.jpg" defaultValue={d?.images?.join(', ') ?? ''} className={inputCls} />
            </Field>
            <Field label="Wyposażenie (oddzielone przecinkiem)" htmlFor="features">
              <textarea id="features" name="features" rows={3} placeholder="Ceramiczne hamulce, Pakiet Sport Chrono, Skóra Merino" defaultValue={d?.features?.join(', ') ?? ''} className={inputCls} />
            </Field>
          </div>
        </SectionCard>

        {/* ---- Akcje ---- */}
        <div className="flex items-center gap-4 pt-2">
          <SubmitButton editMode={editMode} />
          <Link href="/admin" className="text-sm text-graphite-500 transition hover:text-white">
            Anuluj
          </Link>
        </div>
      </form>
    </>
  );
}
