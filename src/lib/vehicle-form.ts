import {
  BodyType,
  DriveTrain,
  FuelType,
  Transmission,
  VatType,
  VehicleCondition,
  VehicleStatus,
  type Vehicle,
} from '@prisma/client';
import { z } from 'zod';

export type UploadedVehicleImage = {
  url: string;
  publicId: string;
};

export type VehicleFieldErrors = Partial<Record<string, string[]>>;

export type SerializedVehicle = Omit<
  Vehicle,
  'price' | 'createdAt' | 'updatedAt' | 'firstRegistration'
> & {
  price: number;
  createdAt: string;
  updatedAt: string;
  firstRegistration: string | null;
};

type RawVehicleFormValues = {
  make: string;
  model: string;
  generation: string;
  year: number | null;
  vin: string;
  mileage: number | null;
  engineCapacity: number | null;
  power: number | null;
  fuelType: string;
  transmission: string;
  driveTrain: string;
  bodyType: string;
  color: string;
  upholstery: string;
  doors: number | null;
  seats: number | null;
  originCountry: string;
  firstRegistration: string;
  firstOwner: boolean;
  registeredInPoland: boolean;
  registrationNumber: string;
  condition: string;
  accidentFree: boolean;
  serviceHistory: boolean;
  price: number | null;
  vatReclaimable: boolean;
  vatType: string;
  status: string;
  description: string;
  images: UploadedVehicleImage[];
  primaryImageIndex: number | null;
  features: string[];
};

const currentYear = new Date().getFullYear();

const uploadedVehicleImageSchema = z.object({
  url: z.url({ message: 'Każde zdjęcie musi mieć poprawny adres URL.' }),
  publicId: z.string().trim().min(1, 'Brak identyfikatora zdjęcia w Cloudinary.'),
});

const vehicleFormSchema = z
  .object({
    make: z.string().trim().min(1, 'Podaj markę.').max(60, 'Marka jest zbyt długa.'),
    model: z.string().trim().min(1, 'Podaj model.').max(80, 'Model jest zbyt długi.'),
    generation: z.string().trim().max(80, 'Generacja jest zbyt długa.').transform(emptyToNull),
    year: z.number({ error: 'Podaj rok produkcji.' }).int().min(1900).max(currentYear + 1),
    vin: z
      .string()
      .trim()
      .toUpperCase()
      .regex(/^[A-HJ-NPR-Z0-9]{17}$/, 'Numer VIN musi mieć dokładnie 17 poprawnych znaków.'),
    mileage: z.number({ error: 'Podaj przebieg.' }).int().min(0).max(2_000_000),
    engineCapacity: nullableInteger(0, 10_000, 'Pojemność silnika'),
    power: z.number({ error: 'Podaj moc.' }).int().min(1).max(5_000),
    fuelType: z.nativeEnum(FuelType, { error: 'Wybierz rodzaj paliwa.' }),
    transmission: z.nativeEnum(Transmission, { error: 'Wybierz skrzynię biegów.' }),
    driveTrain: z.nativeEnum(DriveTrain, { error: 'Wybierz napęd.' }),
    bodyType: z
      .union([z.nativeEnum(BodyType), z.literal('')])
      .transform((value) => (value === '' ? null : value)),
    color: z.string().trim().max(60, 'Kolor jest zbyt długi.').transform(emptyToNull),
    upholstery: z.string().trim().max(80, 'Tapicerka jest zbyt długa.').transform(emptyToNull),
    doors: nullableInteger(1, 6, 'Liczba drzwi'),
    seats: nullableInteger(1, 9, 'Liczba miejsc'),
    originCountry: z
      .string()
      .trim()
      .max(60, 'Kraj pochodzenia jest zbyt długi.')
      .transform(emptyToNull),
    firstRegistration: z
      .union([z.string().trim(), z.literal('')])
      .transform((value) => {
        if (!value) return null;
        const parsed = new Date(`${value}T00:00:00`);
        return Number.isNaN(parsed.getTime()) ? value : parsed;
      }),
    firstOwner: z.boolean(),
    registeredInPoland: z.boolean(),
    registrationNumber: z
      .string()
      .trim()
      .max(24, 'Numer rejestracyjny jest zbyt długi.')
      .transform(emptyToNull),
    condition: z.nativeEnum(VehicleCondition),
    accidentFree: z.boolean(),
    serviceHistory: z.boolean(),
    price: z.number({ error: 'Podaj cenę.' }).min(0).max(100_000_000),
    vatReclaimable: z.boolean(),
    vatType: z.nativeEnum(VatType),
    status: z.nativeEnum(VehicleStatus),
    description: z.string().trim().max(20_000, 'Opis jest zbyt długi.').transform(emptyToNull),
    images: z
      .array(uploadedVehicleImageSchema)
      .max(30, 'Możesz dodać maksymalnie 30 zdjęć.')
      .transform((images) => dedupeImages(images)),
    primaryImageIndex: z.number().int().min(0).nullable(),
    features: z
      .array(z.string().trim().min(1).max(120))
      .max(120, 'Lista wyposażenia jest zbyt długa.'),
  })
  .superRefine((value, ctx) => {
    if (value.firstRegistration && !(value.firstRegistration instanceof Date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['firstRegistration'],
        message: 'Podaj poprawną datę pierwszej rejestracji.',
      });
    }

    if (
      value.firstRegistration instanceof Date &&
      value.firstRegistration.getFullYear() < value.year - 1
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['firstRegistration'],
        message: 'Data pierwszej rejestracji nie może być dużo wcześniejsza niż rok produkcji.',
      });
    }

    if (
      value.firstRegistration instanceof Date &&
      value.firstRegistration.getTime() > Date.now()
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['firstRegistration'],
        message: 'Data pierwszej rejestracji nie może być z przyszłości.',
      });
    }

    if (value.primaryImageIndex !== null && value.images.length > 0 && value.primaryImageIndex >= value.images.length) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['primaryImageIndex'],
        message: 'Zdjęcie główne wskazuje na nieistniejący element galerii.',
      });
    }

    if (value.images.length === 0 && (value.primaryImageIndex ?? 0) > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['primaryImageIndex'],
        message: 'Bez zdjęć nie można ustawić zdjęcia głównego.',
      });
    }

    if (value.fuelType === FuelType.ELECTRIC && value.engineCapacity !== null) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['engineCapacity'],
        message: 'Dla pojazdu elektrycznego pozostaw pojemność silnika pustą.',
      });
    }
  });

function emptyToNull(value: string) {
  return value.length === 0 ? null : value;
}

function nullableInteger(min: number, max: number, label: string) {
  return z
    .union([z.number().int().min(min).max(max), z.null()])
    .refine((value) => value === null || Number.isInteger(value), {
      message: `${label} musi być poprawną liczbą całkowitą.`,
    });
}

function parseNumber(value: FormDataEntryValue | null) {
  const normalized = value?.toString().trim() ?? '';

  if (!normalized) {
    return null;
  }

  const parsed = Number(normalized.replace(',', '.'));
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function parseBoolean(value: FormDataEntryValue | null) {
  return value === 'on';
}

function parseText(value: FormDataEntryValue | null) {
  return value?.toString().trim() ?? '';
}

function parseFeatures(value: FormDataEntryValue | null) {
  return parseText(value)
    .split(/[\n,]/)
    .map((feature) => feature.trim())
    .filter(Boolean);
}

function parseImages(value: FormDataEntryValue | null) {
  const raw = value?.toString().trim() ?? '[]';

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => {
        if (typeof item === 'string') {
          const publicId = extractCloudinaryPublicId(item);
          return publicId ? { url: item, publicId } : null;
        }

        if (
          typeof item === 'object' &&
          item !== null &&
          'url' in item &&
          typeof item.url === 'string'
        ) {
          const explicitPublicId =
            'publicId' in item && typeof item.publicId === 'string'
              ? item.publicId
              : extractCloudinaryPublicId(item.url);

          return explicitPublicId
            ? {
                url: item.url,
                publicId: explicitPublicId,
              }
            : null;
        }

        return null;
      })
      .filter((item): item is UploadedVehicleImage => item !== null);
  } catch {
    return [];
  }
}

function dedupeImages(images: UploadedVehicleImage[]) {
  const seen = new Set<string>();

  return images.filter((image) => {
    const key = `${image.publicId}::${image.url}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export function extractCloudinaryPublicId(url: string) {
  const marker = '/upload/';
  const markerIndex = url.indexOf(marker);

  if (markerIndex === -1) {
    return null;
  }

  const tail = url.slice(markerIndex + marker.length);
  const withoutVersion = tail.replace(/^v\d+\//, '');
  const withoutExtension = withoutVersion.replace(/\.[^./]+$/, '');

  return withoutExtension || null;
}

export function zipVehicleImages(urls: string[], publicIds: string[]) {
  return urls
    .map((url, index) => {
      const publicId = publicIds[index] ?? extractCloudinaryPublicId(url);

      if (!publicId) {
        return null;
      }

      return { url, publicId };
    })
    .filter((image): image is UploadedVehicleImage => image !== null);
}

export function normalizePrimaryImageIndex(index: number | null | undefined, imageCount: number) {
  if (imageCount === 0) {
    return 0;
  }

  if (index === null || index === undefined || Number.isNaN(index)) {
    return 0;
  }

  return Math.min(Math.max(index, 0), imageCount - 1);
}

export function buildVehicleFormValues(formData: FormData): RawVehicleFormValues {
  return {
    make: parseText(formData.get('make')),
    model: parseText(formData.get('model')),
    generation: parseText(formData.get('generation')),
    year: parseNumber(formData.get('year')),
    vin: parseText(formData.get('vin')),
    mileage: parseNumber(formData.get('mileage')),
    engineCapacity: parseNumber(formData.get('engineCapacity')),
    power: parseNumber(formData.get('power')),
    fuelType: parseText(formData.get('fuelType')),
    transmission: parseText(formData.get('transmission')),
    driveTrain: parseText(formData.get('driveTrain')),
    bodyType: parseText(formData.get('bodyType')),
    color: parseText(formData.get('color')),
    upholstery: parseText(formData.get('upholstery')),
    doors: parseNumber(formData.get('doors')),
    seats: parseNumber(formData.get('seats')),
    originCountry: parseText(formData.get('originCountry')),
    firstRegistration: parseText(formData.get('firstRegistration')),
    firstOwner: parseBoolean(formData.get('firstOwner')),
    registeredInPoland: parseBoolean(formData.get('registeredInPoland')),
    registrationNumber: parseText(formData.get('registrationNumber')),
    condition: parseText(formData.get('condition')),
    accidentFree: parseBoolean(formData.get('accidentFree')),
    serviceHistory: parseBoolean(formData.get('serviceHistory')),
    price: parseNumber(formData.get('price')),
    vatReclaimable: parseBoolean(formData.get('vatReclaimable')),
    vatType: parseText(formData.get('vatType')),
    status: parseText(formData.get('status')),
    description: parseText(formData.get('description')),
    images: parseImages(formData.get('images')),
    primaryImageIndex: parseNumber(formData.get('primaryImageIndex')),
    features: parseFeatures(formData.get('features')),
  };
}

export function validateVehicleForm(formData: FormData) {
  return vehicleFormSchema.safeParse(buildVehicleFormValues(formData));
}

export function flattenVehicleFieldErrors(error: z.ZodError) {
  const flattened = error.flatten().fieldErrors;
  const filteredEntries = Object.entries(flattened).filter(([, messages]) =>
    Array.isArray(messages) && messages.length > 0,
  );

  return Object.fromEntries(filteredEntries) as VehicleFieldErrors;
}

export function buildVehiclePersistenceData(parsed: z.infer<typeof vehicleFormSchema>) {
  const primaryImageIndex = normalizePrimaryImageIndex(parsed.primaryImageIndex, parsed.images.length);

  return {
    make: parsed.make,
    model: parsed.model,
    generation: parsed.generation,
    year: parsed.year,
    vin: parsed.vin,
    mileage: parsed.mileage,
    engineCapacity: parsed.engineCapacity,
    power: parsed.power,
    fuelType: parsed.fuelType,
    transmission: parsed.transmission,
    driveTrain: parsed.driveTrain,
    bodyType: parsed.bodyType,
    color: parsed.color,
    upholstery: parsed.upholstery,
    doors: parsed.doors,
    seats: parsed.seats,
    originCountry: parsed.originCountry,
    firstRegistration:
      parsed.firstRegistration instanceof Date ? parsed.firstRegistration : null,
    firstOwner: parsed.firstOwner,
    registeredInPoland: parsed.registeredInPoland,
    registrationNumber: parsed.registrationNumber,
    condition: parsed.condition,
    accidentFree: parsed.accidentFree,
    serviceHistory: parsed.serviceHistory,
    price: parsed.price,
    vatReclaimable: parsed.vatReclaimable,
    vatType: parsed.vatType,
    status: parsed.status,
    description: parsed.description,
    images: parsed.images.map((image) => image.url),
    imagePublicIds: parsed.images.map((image) => image.publicId),
    primaryImageIndex,
    features: parsed.features,
  };
}

export function getPrimaryImageUrl(
  images: string[],
  primaryImageIndex: number | null | undefined,
) {
  if (images.length === 0) {
    return null;
  }

  return images[normalizePrimaryImageIndex(primaryImageIndex, images.length)] ?? images[0] ?? null;
}

export function serializeVehicle(vehicle: Vehicle): SerializedVehicle {
  return {
    ...vehicle,
    price: Number(vehicle.price),
    createdAt: vehicle.createdAt.toISOString(),
    updatedAt: vehicle.updatedAt.toISOString(),
    firstRegistration: vehicle.firstRegistration?.toISOString() ?? null,
  };
}

export const FUEL_OPTIONS = [
  { value: FuelType.PETROL, label: 'Benzyna' },
  { value: FuelType.DIESEL, label: 'Diesel' },
  { value: FuelType.HYBRID, label: 'Hybryda' },
  { value: FuelType.ELECTRIC, label: 'Elektryk' },
  { value: FuelType.LPG, label: 'LPG' },
] as const;

export const TRANSMISSION_OPTIONS = [
  { value: Transmission.AUTOMATIC, label: 'Automatyczna' },
  { value: Transmission.MANUAL, label: 'Manualna' },
] as const;

export const DRIVE_OPTIONS = [
  { value: DriveTrain.AWD, label: '4x4 (AWD)' },
  { value: DriveTrain.RWD, label: 'Tylny (RWD)' },
  { value: DriveTrain.FWD, label: 'Przedni (FWD)' },
] as const;

export const BODY_OPTIONS = [
  { value: BodyType.SEDAN, label: 'Sedan' },
  { value: BodyType.SUV, label: 'SUV' },
  { value: BodyType.COUPE, label: 'Coupe' },
  { value: BodyType.CONVERTIBLE, label: 'Kabriolet' },
  { value: BodyType.HATCHBACK, label: 'Hatchback' },
  { value: BodyType.ESTATE, label: 'Kombi' },
  { value: BodyType.LIFTBACK, label: 'Liftback' },
  { value: BodyType.PICKUP, label: 'Pickup' },
  { value: BodyType.VAN, label: 'Van' },
] as const;

export const STATUS_OPTIONS = [
  { value: VehicleStatus.AVAILABLE, label: 'Dostępny' },
  { value: VehicleStatus.RESERVED, label: 'Zarezerwowany' },
  { value: VehicleStatus.SOLD, label: 'Sprzedany' },
] as const;

export const VAT_OPTIONS = [
  { value: VatType.NONE, label: 'Brak faktury (os. prywatna)' },
  { value: VatType.VAT_23, label: 'Faktura VAT 23%' },
  { value: VatType.VAT_MARGIN, label: 'VAT marża' },
] as const;

export const CONDITION_OPTIONS = [
  { value: VehicleCondition.USED, label: 'Używany' },
  { value: VehicleCondition.NEW, label: 'Nowy' },
] as const;

export function fuelTypeLabel(value: FuelType) {
  return FUEL_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function transmissionLabel(value: Transmission) {
  return TRANSMISSION_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function driveTrainLabel(value: DriveTrain) {
  return DRIVE_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function bodyTypeLabel(value: BodyType | null) {
  if (!value) {
    return 'Nie podano';
  }

  return BODY_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function statusLabel(value: VehicleStatus) {
  return STATUS_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function conditionLabel(value: VehicleCondition) {
  return CONDITION_OPTIONS.find((option) => option.value === value)?.label ?? value;
}

export function vatTypeLabel(value: VatType) {
  return VAT_OPTIONS.find((option) => option.value === value)?.label ?? value;
}
