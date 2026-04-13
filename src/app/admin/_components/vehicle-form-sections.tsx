'use client';

import {
  BODY_OPTIONS,
  CONDITION_OPTIONS,
  DRIVE_OPTIONS,
  FUEL_OPTIONS,
  STATUS_OPTIONS,
  TRANSMISSION_OPTIONS,
  VAT_OPTIONS,
  type SerializedVehicle,
  type VehicleFieldErrors,
} from '@/lib/vehicle-form';
import { Field, SectionCard, checkboxCls, inputCls } from './vehicle-form-primitives';

type SectionProps = {
  vehicle?: SerializedVehicle | null;
  errors: VehicleFieldErrors;
};

function getError(errors: VehicleFieldErrors, field: string) {
  return errors[field]?.[0];
}

function formatDate(value: string | null | undefined) {
  if (!value) {
    return '';
  }

  return new Date(value).toISOString().slice(0, 10);
}

export function VehicleBasicsSection({ vehicle, errors }: SectionProps) {
  return (
    <SectionCard title="Podstawowe informacje">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Marka *" htmlFor="make" error={getError(errors, 'make')}>
          <input id="make" name="make" type="text" required placeholder="np. Porsche" defaultValue={vehicle?.make ?? ''} className={inputCls} />
        </Field>
        <Field label="Model *" htmlFor="model" error={getError(errors, 'model')}>
          <input id="model" name="model" type="text" required placeholder="np. 911 Carrera S" defaultValue={vehicle?.model ?? ''} className={inputCls} />
        </Field>
        <Field label="Generacja / wersja" htmlFor="generation" error={getError(errors, 'generation')}>
          <input id="generation" name="generation" type="text" placeholder="np. 992" defaultValue={vehicle?.generation ?? ''} className={inputCls} />
        </Field>
        <Field label="Rok produkcji *" htmlFor="year" error={getError(errors, 'year')}>
          <input id="year" name="year" type="number" required min={1900} max={2100} placeholder="np. 2024" defaultValue={vehicle?.year ?? ''} className={inputCls} />
        </Field>
        <Field label="Numer VIN *" htmlFor="vin" className="sm:col-span-2" error={getError(errors, 'vin')}>
          <input id="vin" name="vin" type="text" required minLength={17} maxLength={17} placeholder="17-znakowy numer VIN" defaultValue={vehicle?.vin ?? ''} className={inputCls} />
        </Field>
      </div>
    </SectionCard>
  );
}

export function VehicleEngineSection({ vehicle, errors }: SectionProps) {
  return (
    <SectionCard title="Silnik i naped">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Przebieg (km) *" htmlFor="mileage" error={getError(errors, 'mileage')}>
          <input id="mileage" name="mileage" type="number" required min={0} placeholder="np. 24500" defaultValue={vehicle?.mileage ?? ''} className={inputCls} />
        </Field>
        <Field label="Pojemnosc silnika (cm3)" htmlFor="engineCapacity" error={getError(errors, 'engineCapacity')}>
          <input id="engineCapacity" name="engineCapacity" type="number" min={0} placeholder="np. 2998" defaultValue={vehicle?.engineCapacity ?? ''} className={inputCls} />
        </Field>
        <Field label="Moc (KM) *" htmlFor="power" error={getError(errors, 'power')}>
          <input id="power" name="power" type="number" required min={1} placeholder="np. 450" defaultValue={vehicle?.power ?? ''} className={inputCls} />
        </Field>
        <Field label="Rodzaj paliwa *" htmlFor="fuelType" error={getError(errors, 'fuelType')}>
          <select id="fuelType" name="fuelType" required className={inputCls} defaultValue={vehicle?.fuelType ?? ''}>
            <option value="">Wybierz...</option>
            {FUEL_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Skrzynia biegow *" htmlFor="transmission" error={getError(errors, 'transmission')}>
          <select id="transmission" name="transmission" required className={inputCls} defaultValue={vehicle?.transmission ?? ''}>
            <option value="">Wybierz...</option>
            {TRANSMISSION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Naped *" htmlFor="driveTrain" error={getError(errors, 'driveTrain')}>
          <select id="driveTrain" name="driveTrain" required className={inputCls} defaultValue={vehicle?.driveTrain ?? ''}>
            <option value="">Wybierz...</option>
            {DRIVE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
      </div>
    </SectionCard>
  );
}

export function VehicleAppearanceSection({ vehicle, errors }: SectionProps) {
  return (
    <SectionCard title="Wyglad i wnetrze">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Typ nadwozia" htmlFor="bodyType" error={getError(errors, 'bodyType')}>
          <select id="bodyType" name="bodyType" className={inputCls} defaultValue={vehicle?.bodyType ?? ''}>
            <option value="">Wybierz...</option>
            {BODY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Kolor" htmlFor="color" error={getError(errors, 'color')}>
          <input id="color" name="color" type="text" placeholder="np. Czarny metalik" defaultValue={vehicle?.color ?? ''} className={inputCls} />
        </Field>
        <Field label="Tapicerka" htmlFor="upholstery" error={getError(errors, 'upholstery')}>
          <input id="upholstery" name="upholstery" type="text" placeholder="np. Skora Merino czarna" defaultValue={vehicle?.upholstery ?? ''} className={inputCls} />
        </Field>
        <Field label="Liczba drzwi" htmlFor="doors" error={getError(errors, 'doors')}>
          <input id="doors" name="doors" type="number" min={1} max={6} placeholder="np. 4" defaultValue={vehicle?.doors ?? ''} className={inputCls} />
        </Field>
        <Field label="Liczba miejsc" htmlFor="seats" error={getError(errors, 'seats')}>
          <input id="seats" name="seats" type="number" min={1} max={9} placeholder="np. 5" defaultValue={vehicle?.seats ?? ''} className={inputCls} />
        </Field>
      </div>
    </SectionCard>
  );
}

export function VehicleHistorySection({ vehicle, errors }: SectionProps) {
  return (
    <SectionCard title="Historia i status">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field label="Kraj pochodzenia" htmlFor="originCountry" error={getError(errors, 'originCountry')}>
          <input id="originCountry" name="originCountry" type="text" placeholder="np. Niemcy" defaultValue={vehicle?.originCountry ?? ''} className={inputCls} />
        </Field>
        <Field label="Data pierwszej rejestracji" htmlFor="firstRegistration" error={getError(errors, 'firstRegistration')}>
          <input id="firstRegistration" name="firstRegistration" type="date" defaultValue={formatDate(vehicle?.firstRegistration)} className={inputCls} />
        </Field>
        <Field label="Numer rejestracyjny" htmlFor="registrationNumber" error={getError(errors, 'registrationNumber')}>
          <input id="registrationNumber" name="registrationNumber" type="text" placeholder="np. WI 1234A" defaultValue={vehicle?.registrationNumber ?? ''} className={inputCls} />
        </Field>
        <Field label="Stan pojazdu" htmlFor="condition" error={getError(errors, 'condition')}>
          <select id="condition" name="condition" className={inputCls} defaultValue={vehicle?.condition ?? 'USED'}>
            {CONDITION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Status" htmlFor="status" error={getError(errors, 'status')}>
          <select id="status" name="status" className={inputCls} defaultValue={vehicle?.status ?? 'AVAILABLE'}>
            {STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="flex flex-wrap items-center gap-6 sm:col-span-2 lg:col-span-3">
          {([
            ['firstOwner', 'Pierwszy wlasciciel', vehicle?.firstOwner ?? false],
            ['registeredInPoland', 'Zarejestrowany w Polsce', vehicle?.registeredInPoland ?? false],
            ['accidentFree', 'Bezwypadkowy', vehicle?.accidentFree ?? false],
            ['serviceHistory', 'Serwisowany w ASO', vehicle?.serviceHistory ?? false],
          ] as Array<[string, string, boolean]>).map(([name, label, checked]) => (
            <div key={name} className="flex items-center gap-3">
              <input id={name} name={name} type="checkbox" defaultChecked={Boolean(checked)} className={checkboxCls} />
              <label htmlFor={name} className="text-sm text-zinc-700">
                {label}
              </label>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

export function VehicleSalesSection({ vehicle, errors }: SectionProps) {
  return (
    <SectionCard title="Cena i sprzedaz">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Cena (PLN) *" htmlFor="price" error={getError(errors, 'price')}>
          <input id="price" name="price" type="number" required min={0} step="0.01" placeholder="np. 589000" defaultValue={vehicle?.price ? String(vehicle.price) : ''} className={inputCls} />
        </Field>
        <Field label="Rodzaj faktury" htmlFor="vatType" error={getError(errors, 'vatType')}>
          <select id="vatType" name="vatType" className={inputCls} defaultValue={vehicle?.vatType ?? 'NONE'}>
            {VAT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </Field>
        <div className="flex items-center gap-3 self-end pb-1">
          <input id="vatReclaimable" name="vatReclaimable" type="checkbox" defaultChecked={vehicle?.vatReclaimable ?? false} className={checkboxCls} />
          <label htmlFor="vatReclaimable" className="text-sm text-zinc-700">
            Mozliwosc odliczenia VAT 23%
          </label>
        </div>
      </div>
    </SectionCard>
  );
}

export function VehicleDescriptionSection({
  vehicle,
  errors,
  imagesSlot,
}: SectionProps & { imagesSlot: React.ReactNode }) {
  return (
    <SectionCard title="Media i wyposazenie">
      <div className="space-y-5">
        <Field label="Opis" htmlFor="description" error={getError(errors, 'description')}>
          <textarea id="description" name="description" rows={5} placeholder="Szczegolowy opis pojazdu..." defaultValue={vehicle?.description ?? ''} className={inputCls} />
        </Field>

        {imagesSlot}

        <Field label="Wyposazenie (oddzielone przecinkiem)" htmlFor="features" error={getError(errors, 'features')}>
          <textarea id="features" name="features" rows={3} placeholder="Ceramiczne hamulce, Pakiet Sport Chrono, Skora Merino" defaultValue={vehicle?.features?.join(', ') ?? ''} className={inputCls} />
        </Field>
      </div>
    </SectionCard>
  );
}
