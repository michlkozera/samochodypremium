'use server';

import { Prisma, VehicleStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { deleteCloudinaryImages } from '@/lib/cloudinary';
import { requireAdminSession } from '@/lib/admin-session';
import {
  buildVehiclePersistenceData,
  flattenVehicleFieldErrors,
  getPrimaryImageUrl,
  serializeVehicle,
  validateVehicleForm,
  type SerializedVehicle,
  type VehicleFieldErrors,
} from '@/lib/vehicle-form';

export interface ActionState {
  success: boolean;
  message?: string;
  error?: string;
  fieldErrors?: VehicleFieldErrors;
}

export type AdminVehicleStatusFilter = 'ALL' | VehicleStatus;

export type VehicleRow = {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  status: VehicleStatus;
  primaryImageUrl: string | null;
  slug: string;
  mileage: number;
  vinSuffix: string;
  updatedAt: string;
  imageCount: number;
};

export type AdminVehicleListResult = {
  vehicles: VehicleRow[];
  totalItems: number;
  page: number;
  pageSize: number;
  totalPages: number;
  query: string;
  status: AdminVehicleStatusFilter;
  counts: {
    all: number;
    available: number;
    reserved: number;
    sold: number;
  };
};

type AdminVehicleListParams = {
  page?: number;
  pageSize?: number;
  query?: string;
  status?: AdminVehicleStatusFilter;
};

function slugify(make: string, model: string, year: number) {
  return `${make}-${model}-${year}`
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function resolveUniqueSlug(make: string, model: string, year: number, excludeId?: string) {
  const baseSlug = slugify(make, model, year);

  for (let attempt = 0; attempt < 50; attempt += 1) {
    const candidate = attempt === 0 ? baseSlug : `${baseSlug}-${attempt + 1}`;
    const existing = await prisma.vehicle.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing || existing.id === excludeId) {
      return candidate;
    }
  }

  return `${baseSlug}-${crypto.randomUUID().slice(0, 8)}`;
}

function buildAdminVehicleWhere({
  query,
  status,
}: Pick<AdminVehicleListParams, 'query' | 'status'>): Prisma.VehicleWhereInput {
  const trimmedQuery = query?.trim() ?? '';
  const filters: Prisma.VehicleWhereInput[] = [];

  if (status && status !== 'ALL') {
    filters.push({ status });
  }

  if (trimmedQuery) {
    filters.push({
      OR: [
        { make: { contains: trimmedQuery, mode: 'insensitive' } },
        { model: { contains: trimmedQuery, mode: 'insensitive' } },
        { vin: { contains: trimmedQuery.toUpperCase(), mode: 'insensitive' } },
      ],
    });
  }

  return filters.length > 0 ? { AND: filters } : {};
}

function toActionError(error: unknown): ActionState {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      const targets = Array.isArray(error.meta?.target)
        ? error.meta.target.map(String)
        : [String(error.meta?.target ?? '')];

      if (targets.includes('vin')) {
        return {
          success: false,
          error: 'Pojazd o tym numerze VIN juz istnieje.',
          fieldErrors: {
            vin: ['Pojazd o tym numerze VIN juz istnieje.'],
          },
        };
      }

      if (targets.includes('slug')) {
        return {
          success: false,
          error: 'Wystal konflikt adresu URL oferty. Sprobuj zapisac ponownie.',
        };
      }
    }

    if (error.code === 'P2025') {
      return {
        success: false,
        error: 'Nie znaleziono wskazanego pojazdu.',
      };
    }
  }

  if (error instanceof Error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: false,
    error: 'Wystapil nieznany blad.',
  };
}

function revalidateVehiclePaths(currentSlug?: string, previousSlug?: string) {
  revalidatePath('/admin');
  revalidatePath('/oferta');

  if (previousSlug) {
    revalidatePath(`/oferta/${previousSlug}`);
  }

  if (currentSlug) {
    revalidatePath(`/oferta/${currentSlug}`);
  }
}

export async function getVehicles(params: AdminVehicleListParams = {}): Promise<AdminVehicleListResult> {
  await requireAdminSession();

  const pageSize = Math.min(Math.max(params.pageSize ?? 12, 1), 50);
  const requestedPage = Math.max(params.page ?? 1, 1);
  const query = params.query?.trim() ?? '';
  const status = params.status ?? 'ALL';
  const where = buildAdminVehicleWhere({ query, status });

  const [totalItems, availableCount, reservedCount, soldCount] = await prisma.$transaction([
    prisma.vehicle.count({ where }),
    prisma.vehicle.count({ where: { status: VehicleStatus.AVAILABLE } }),
    prisma.vehicle.count({ where: { status: VehicleStatus.RESERVED } }),
    prisma.vehicle.count({ where: { status: VehicleStatus.SOLD } }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const page = Math.min(requestedPage, totalPages);

  const rows = await prisma.vehicle.findMany({
    where,
    select: {
      id: true,
      make: true,
      model: true,
      year: true,
      price: true,
      status: true,
      images: true,
      primaryImageIndex: true,
      slug: true,
      mileage: true,
      vin: true,
      updatedAt: true,
    },
    orderBy: [{ status: 'asc' }, { updatedAt: 'desc' }],
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return {
    vehicles: rows.map((vehicle) => ({
      id: vehicle.id,
      make: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      price: Number(vehicle.price),
      status: vehicle.status,
      primaryImageUrl: getPrimaryImageUrl(vehicle.images, vehicle.primaryImageIndex),
      slug: vehicle.slug,
      mileage: vehicle.mileage,
      vinSuffix: vehicle.vin.slice(-5),
      updatedAt: vehicle.updatedAt.toISOString(),
      imageCount: vehicle.images.length,
    })),
    totalItems,
    page,
    pageSize,
    totalPages,
    query,
    status,
    counts: {
      all: availableCount + reservedCount + soldCount,
      available: availableCount,
      reserved: reservedCount,
      sold: soldCount,
    },
  };
}

export async function getVehicleById(id: string): Promise<SerializedVehicle | null> {
  await requireAdminSession();

  const vehicle = await prisma.vehicle.findUnique({ where: { id } });
  return vehicle ? serializeVehicle(vehicle) : null;
}

export async function addVehicle(
  _prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  await requireAdminSession();

  const validation = validateVehicleForm(formData);

  if (!validation.success) {
    return {
      success: false,
      error: 'Popraw oznaczone pola i sprobuj ponownie.',
      fieldErrors: flattenVehicleFieldErrors(validation.error),
    };
  }

  const data = buildVehiclePersistenceData(validation.data);

  try {
    const slug = await resolveUniqueSlug(data.make, data.model, data.year);
    const createdVehicle = await prisma.vehicle.create({
      data: { ...data, slug },
      select: { slug: true },
    });

    revalidateVehiclePaths(createdVehicle.slug);
  } catch (error) {
    return toActionError(error);
  }

  redirect('/admin?saved=1');
}

export async function updateVehicle(
  _prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  await requireAdminSession();

  const id = formData.get('id')?.toString();

  if (!id) {
    return { success: false, error: 'Brak identyfikatora pojazdu.' };
  }

  const validation = validateVehicleForm(formData);

  if (!validation.success) {
    return {
      success: false,
      error: 'Popraw oznaczone pola i sprobuj ponownie.',
      fieldErrors: flattenVehicleFieldErrors(validation.error),
    };
  }

  const existingVehicle = await prisma.vehicle.findUnique({
    where: { id },
    select: {
      slug: true,
      imagePublicIds: true,
    },
  });

  if (!existingVehicle) {
    return { success: false, error: 'Nie znaleziono pojazdu do edycji.' };
  }

  const data = buildVehiclePersistenceData(validation.data);
  const removedImagePublicIds = existingVehicle.imagePublicIds.filter(
    (publicId) => !data.imagePublicIds.includes(publicId),
  );

  try {
    const slug = await resolveUniqueSlug(data.make, data.model, data.year, id);
    const updatedVehicle = await prisma.vehicle.update({
      where: { id },
      data: { ...data, slug },
      select: { slug: true },
    });

    await deleteCloudinaryImages(removedImagePublicIds);
    revalidateVehiclePaths(updatedVehicle.slug, existingVehicle.slug);
  } catch (error) {
    return toActionError(error);
  }

  redirect('/admin?saved=1');
}

export async function deleteVehicle(id: string): Promise<ActionState> {
  await requireAdminSession();

  const existingVehicle = await prisma.vehicle.findUnique({
    where: { id },
    select: {
      slug: true,
      imagePublicIds: true,
    },
  });

  if (!existingVehicle) {
    return { success: false, error: 'Nie znaleziono pojazdu do usuniecia.' };
  }

  try {
    await prisma.vehicle.delete({ where: { id } });
    const cleanupResult = await deleteCloudinaryImages(existingVehicle.imagePublicIds);
    revalidateVehiclePaths(undefined, existingVehicle.slug);

    return {
      success: true,
      message:
        cleanupResult.skipped.length > 0
          ? 'Pojazd usuniety, ale czesc zdjec wymaga recznego sprawdzenia w Cloudinary.'
          : 'Pojazd usuniety.',
    };
  } catch (error) {
    return toActionError(error);
  }
}

export async function deleteTemporaryVehicleImage(publicId: string): Promise<ActionState> {
  await requireAdminSession();

  if (!publicId.trim()) {
    return { success: false, error: 'Brak identyfikatora zdjecia.' };
  }

  const cleanupResult = await deleteCloudinaryImages([publicId]);

  if (cleanupResult.deleted.length === 0 && cleanupResult.skipped.length > 0) {
    return {
      success: false,
      error: 'Nie udalo sie usunac tymczasowego zdjecia z Cloudinary.',
    };
  }

  return {
    success: true,
    message: 'Zdjecie tymczasowe usuniete.',
  };
}
