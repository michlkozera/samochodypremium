'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import {
  FuelType,
  Transmission,
  DriveTrain,
  VehicleStatus,
  BodyType,
  VatType,
  VehicleCondition,
} from '@prisma/client';
import type { Vehicle } from '@prisma/client';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface ActionState {
  success: boolean;
  message?: string;
  error?: string;
}

export type VehicleRow = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  status: string;
  images: string[];
  slug: string;
  mileage: number;
};

export type SerializedVehicle = Omit<Vehicle, 'price' | 'createdAt' | 'updatedAt' | 'firstRegistration'> & {
  price: number;
  createdAt: string;
  updatedAt: string;
  firstRegistration: string | null;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function slugify(make: string, model: string, year: number): string {
  return `${make}-${model}-${year}`
    .toLowerCase()
    .replace(/[ąàáâã]/g, 'a')
    .replace(/[ćčç]/g, 'c')
    .replace(/[ęèéêë]/g, 'e')
    .replace(/[łľ]/g, 'l')
    .replace(/[ńñ]/g, 'n')
    .replace(/[óòôõö]/g, 'o')
    .replace(/[śšş]/g, 's')
    .replace(/[úùûü]/g, 'u')
    .replace(/[żźž]/g, 'z')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function toEnum<T extends Record<string, string>>(
  value: string | null,
  enumObj: T,
): T[keyof T] | undefined {
  if (!value) return undefined;
  return Object.values(enumObj).includes(value)
    ? (value as T[keyof T])
    : undefined;
}

function parseFormData(formData: FormData) {
  const str = (key: string) => formData.get(key)?.toString().trim() || null;
  const req = (key: string) => formData.get(key)?.toString().trim();
  const num = (key: string) => {
    const v = formData.get(key)?.toString().trim();
    return v ? Number(v) : null;
  };
  const bool = (key: string) => formData.get(key) === 'on';
  const csv = (key: string) =>
    (formData.get(key)?.toString().trim() || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

  return {
    make: req('make'),
    model: req('model'),
    generation: str('generation'),
    year: num('year'),
    vin: req('vin'),
    mileage: num('mileage'),
    engineCapacity: num('engineCapacity'),
    power: num('power'),
    fuelType: str('fuelType'),
    transmission: str('transmission'),
    driveTrain: str('driveTrain'),
    bodyType: str('bodyType'),
    color: str('color'),
    upholstery: str('upholstery'),
    doors: num('doors'),
    seats: num('seats'),
    originCountry: str('originCountry'),
    firstRegistration: str('firstRegistration'),
    firstOwner: bool('firstOwner'),
    registeredInPoland: bool('registeredInPoland'),
    registrationNumber: str('registrationNumber'),
    condition: str('condition'),
    accidentFree: bool('accidentFree'),
    serviceHistory: bool('serviceHistory'),
    price: num('price'),
    vatReclaimable: bool('vatReclaimable'),
    vatType: str('vatType'),
    status: str('status'),
    description: str('description'),
    images: (() => {
      const raw = formData.get('images')?.toString().trim() || '[]';
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? (parsed as string[]).filter(Boolean) : [];
      } catch {
        return raw.split(',').map((s: string) => s.trim()).filter(Boolean);
      }
    })(),
    features: csv('features'),
  };
}

function validateAndBuild(raw: ReturnType<typeof parseFormData>) {
  if (!raw.make || !raw.model || !raw.year || !raw.mileage || !raw.power || !raw.vin || !raw.price) {
    return { error: 'Wypełnij wszystkie wymagane pola.' };
  }

  if ([raw.year, raw.mileage, raw.power, raw.price].some((v) => v === null || Number.isNaN(v))) {
    return { error: 'Pola numeryczne muszą zawierać poprawne liczby.' };
  }

  const fuelType = toEnum(raw.fuelType, FuelType);
  const transmission = toEnum(raw.transmission, Transmission);
  const driveTrain = toEnum(raw.driveTrain, DriveTrain);
  const status = toEnum(raw.status, VehicleStatus) ?? VehicleStatus.AVAILABLE;
  const bodyType = toEnum(raw.bodyType, BodyType) ?? null;
  const vatType = toEnum(raw.vatType, VatType) ?? VatType.NONE;
  const condition = toEnum(raw.condition, VehicleCondition) ?? VehicleCondition.USED;

  if (!fuelType || !transmission || !driveTrain) {
    return { error: 'Wybierz poprawne wartości paliwa, skrzyni biegów i napędu.' };
  }

  if (raw.vin.length !== 17) {
    return { error: 'Numer VIN musi mieć dokładnie 17 znaków.' };
  }

  const firstRegistration = raw.firstRegistration ? new Date(raw.firstRegistration) : null;

  return {
    data: {
      make: raw.make,
      model: raw.model,
      generation: raw.generation,
      year: raw.year!,
      mileage: raw.mileage!,
      engineCapacity: raw.engineCapacity,
      power: raw.power!,
      fuelType,
      transmission,
      driveTrain,
      bodyType,
      color: raw.color,
      upholstery: raw.upholstery,
      doors: raw.doors,
      seats: raw.seats,
      originCountry: raw.originCountry,
      firstRegistration,
      firstOwner: raw.firstOwner,
      registeredInPoland: raw.registeredInPoland,
      registrationNumber: raw.registrationNumber,
      condition,
      accidentFree: raw.accidentFree,
      serviceHistory: raw.serviceHistory,
      vin: raw.vin,
      price: raw.price!,
      vatReclaimable: raw.vatReclaimable,
      vatType,
      status,
      description: raw.description,
      images: raw.images,
      features: raw.features,
    },
  };
}

function serializeVehicle(v: Vehicle): SerializedVehicle {
  return {
    ...v,
    firstOwner: Boolean(v.firstOwner),
    registeredInPoland: Boolean(v.registeredInPoland),
    registrationNumber: v.registrationNumber ?? null,
    condition: v.condition as SerializedVehicle['condition'],
    price: Number(v.price),
    createdAt: v.createdAt.toISOString(),
    updatedAt: v.updatedAt.toISOString(),
    firstRegistration: v.firstRegistration?.toISOString() ?? null,
  };
}

function serializeRow(v: Pick<Vehicle, 'id' | 'make' | 'model' | 'year' | 'price' | 'status' | 'images' | 'slug' | 'mileage'>): VehicleRow {
  return { ...v, price: Number(v.price) };
}

async function resolveSlug(make: string, model: string, year: number, excludeId?: string) {
  const baseSlug = slugify(make, model, year);
  const existing = await prisma.vehicle.findUnique({
    where: { slug: baseSlug },
    select: { id: true },
  });
  if (!existing || existing.id === excludeId) return baseSlug;
  return `${baseSlug}-${Math.random().toString(36).slice(2, 7)}`;
}

/* ------------------------------------------------------------------ */
/*  CRUD Actions                                                       */
/* ------------------------------------------------------------------ */

export async function getVehicles(): Promise<VehicleRow[]> {
  const rows = await prisma.vehicle.findMany({
    select: {
      id: true,
      make: true,
      model: true,
      year: true,
      price: true,
      status: true,
      images: true,
      slug: true,
      mileage: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return rows.map(serializeRow);
}

export async function getVehicleById(id: string): Promise<SerializedVehicle | null> {
  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  return vehicle ? serializeVehicle(vehicle) : null;
}

export async function addVehicle(
  _prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const raw = parseFormData(formData);
  const result = validateAndBuild(raw);

  if ('error' in result) return { success: false, error: result.error };

  const { data } = result;

  try {
    const slug = await resolveSlug(data.make, data.model, data.year);
    await prisma.vehicle.create({ data: { ...data, slug } });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Nieznany błąd bazy danych.';
    if (msg.includes('Unique constraint') && msg.includes('vin')) {
      return { success: false, error: 'Pojazd o tym numerze VIN już istnieje.' };
    }
    return { success: false, error: msg };
  }

  revalidatePath('/admin');
  redirect('/admin');
}

export async function updateVehicle(
  _prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const id = formData.get('id')?.toString();
  if (!id) return { success: false, error: 'Brak identyfikatora pojazdu.' };

  const raw = parseFormData(formData);
  const result = validateAndBuild(raw);

  if ('error' in result) return { success: false, error: result.error };

  const { data } = result;

  try {
    const slug = await resolveSlug(data.make, data.model, data.year, id);
    await prisma.vehicle.update({ where: { id }, data: { ...data, slug } });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Nieznany błąd bazy danych.';
    if (msg.includes('Unique constraint') && msg.includes('vin')) {
      return { success: false, error: 'Pojazd o tym numerze VIN już istnieje.' };
    }
    return { success: false, error: msg };
  }

  revalidatePath('/admin');
  redirect('/admin');
}

export async function deleteVehicle(id: string): Promise<ActionState> {
  try {
    await prisma.vehicle.delete({ where: { id } });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Nieznany błąd.';
    return { success: false, error: msg };
  }

  revalidatePath('/admin');
  return { success: true, message: 'Pojazd usunięty.' };
}
