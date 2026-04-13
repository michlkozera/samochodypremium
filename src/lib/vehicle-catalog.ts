import {
  BodyType,
  VehicleStatus,
  type Vehicle,
} from '@prisma/client';
import { contactEmail, contactEmailHref, contactPhone, contactPhoneHref } from '@/data/site';
import { prisma } from '@/lib/prisma';
import {
  bodyTypeLabel,
  conditionLabel,
  driveTrainLabel,
  fuelTypeLabel,
  getPrimaryImageUrl,
  statusLabel,
  transmissionLabel,
  vatTypeLabel,
} from '@/lib/vehicle-form';

export type CatalogVehicle = {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  power: number;
  engineCapacity: number | null;
  fuelTypeLabel: string;
  transmissionLabel: string;
  bodyTypeLabel: string;
  price: number;
  image: string | null;
  shortDescription: string;
  featured: boolean;
  status: VehicleStatus;
  statusLabel: string;
};

export type CatalogVehicleDetail = {
  id: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  power: number;
  engineCapacity: number | null;
  fuelTypeLabel: string;
  transmissionLabel: string;
  driveTrainLabel: string;
  price: number;
  monthlyRate: number;
  status: VehicleStatus;
  statusLabel: string;
  shortDescription: string;
  description: string;
  youtubeUrl: string | null;
  youtubeEmbedUrl: string | null;
  images: string[];
  features: string[];
  specs: [string, string][];
  advisor: {
    name: string;
    role: string;
    phone: string;
    phoneHref: string;
    email: string;
    emailHref: string;
  };
};

export type CatalogFilterOptions = {
  brands: string[];
  bodies: string[];
  fuels: string[];
  gearboxes: string[];
};

function formatPrice(value: number) {
  return new Intl.NumberFormat('pl-PL', { maximumFractionDigits: 0 }).format(value);
}

function formatMileage(value: number) {
  return new Intl.NumberFormat('pl-PL').format(value);
}

function formatDate(value: Date | null) {
  if (!value) {
    return 'Nie podano';
  }

  return new Intl.DateTimeFormat('pl-PL').format(value);
}

function toLiters(engineCapacity: number | null) {
  if (engineCapacity === null || engineCapacity === 0) {
    return null;
  }

  return (engineCapacity / 1000).toFixed(1);
}

function buildShortDescription(vehicle: Vehicle) {
  const tokens = [
    toLiters(vehicle.engineCapacity)
      ? `${toLiters(vehicle.engineCapacity)} ${vehicle.fuelType === 'ELECTRIC' ? '' : ''}`.trim()
      : null,
    `${vehicle.power} KM`,
    fuelTypeLabel(vehicle.fuelType),
    transmissionLabel(vehicle.transmission),
    vehicle.accidentFree ? 'Bezwypadkowy' : null,
    vehicle.serviceHistory ? 'Serwis ASO' : null,
  ].filter(Boolean);

  return tokens.join('. ');
}

function estimateMonthlyRate(price: number) {
  return Math.round(price * 0.0125 / 10) * 10;
}

function buildSpecs(vehicle: Vehicle): [string, string][] {
  return [
    ['Marka', vehicle.make],
    ['Model', vehicle.model],
    ['Rok produkcji', String(vehicle.year)],
    ['Przebieg', `${formatMileage(vehicle.mileage)} km`],
    [
      'Pojemność',
      vehicle.engineCapacity ? `${toLiters(vehicle.engineCapacity)} l` : 'Nie dotyczy',
    ],
    ['Moc', `${vehicle.power} KM`],
    ['Paliwo', fuelTypeLabel(vehicle.fuelType)],
    ['Skrzynia biegów', transmissionLabel(vehicle.transmission)],
    ['Napęd', driveTrainLabel(vehicle.driveTrain)],
    ['Nadwozie', bodyTypeLabel(vehicle.bodyType as BodyType | null)],
    ['Kolor nadwozia', vehicle.color ?? 'Nie podano'],
    ['Tapicerka', vehicle.upholstery ?? 'Nie podano'],
    ['Liczba drzwi', vehicle.doors ? String(vehicle.doors) : 'Nie podano'],
    ['Liczba miejsc', vehicle.seats ? String(vehicle.seats) : 'Nie podano'],
    ['Kraj pochodzenia', vehicle.originCountry ?? 'Nie podano'],
    ['Pierwsza rejestracja', formatDate(vehicle.firstRegistration)],
    ['Stan', conditionLabel(vehicle.condition)],
    ['Status oferty', statusLabel(vehicle.status)],
    ['VAT', vatTypeLabel(vehicle.vatType)],
    ['VIN', `...${vehicle.vin.slice(-6)}`],
  ];
}

function buildCatalogVehicle(vehicle: Vehicle): CatalogVehicle {
  const coverImage = getPrimaryImageUrl(vehicle.images, vehicle.primaryImageIndex);

  return {
    id: vehicle.id,
    slug: vehicle.slug,
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    mileage: vehicle.mileage,
    power: vehicle.power,
    engineCapacity: vehicle.engineCapacity,
    fuelTypeLabel: fuelTypeLabel(vehicle.fuelType),
    transmissionLabel: transmissionLabel(vehicle.transmission),
    bodyTypeLabel: bodyTypeLabel(vehicle.bodyType as BodyType | null),
    price: Number(vehicle.price),
    image: coverImage,
    shortDescription: buildShortDescription(vehicle),
    featured: vehicle.status === VehicleStatus.AVAILABLE,
    status: vehicle.status,
    statusLabel: statusLabel(vehicle.status),
  };
}

function extractYouTubeVideoId(value: string | null | undefined) {
  if (!value) {
    return null;
  }

  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase().replace(/^www\./, '');

    if (hostname === 'youtu.be') {
      const shortId = url.pathname.replace(/^\/+/, '').split('/')[0];
      return /^[a-zA-Z0-9_-]{11}$/.test(shortId) ? shortId : null;
    }

    if (
      hostname === 'youtube.com' ||
      hostname.endsWith('.youtube.com') ||
      hostname === 'youtube-nocookie.com' ||
      hostname.endsWith('.youtube-nocookie.com')
    ) {
      const watchId = url.searchParams.get('v');

      if (watchId && /^[a-zA-Z0-9_-]{11}$/.test(watchId)) {
        return watchId;
      }

      const pathParts = url.pathname.split('/').filter(Boolean);
      const markerIndex = pathParts.findIndex((part) => ['embed', 'shorts', 'live'].includes(part));

      if (markerIndex !== -1) {
        const pathId = pathParts[markerIndex + 1] ?? '';
        return /^[a-zA-Z0-9_-]{11}$/.test(pathId) ? pathId : null;
      }
    }
  } catch {
    // Fallback for non-standard but still valid-ish pasted strings.
  }

  const fallbackMatch = value.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})(?:[?&/]|$)/);
  if (fallbackMatch?.[1]) {
    return fallbackMatch[1];
  }

  return null;
}

function toYouTubeEmbedUrl(value: string | null | undefined) {
  const videoId = extractYouTubeVideoId(value);

  if (!videoId) {
    return null;
  }

  return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
}

function sortImagesByPrimary(
  images: string[],
  primaryImageIndex: number | null | undefined,
) {
  if (images.length <= 1) {
    return images;
  }

  const parsedIndex = Number(primaryImageIndex);
  const normalizedIndex =
    Number.isInteger(parsedIndex) && parsedIndex >= 0
      ? Math.min(parsedIndex, images.length - 1)
      : 0;

  if (normalizedIndex === 0) {
    return images;
  }

  const primaryImage = images[normalizedIndex];

  if (!primaryImage) {
    return images;
  }

  return [primaryImage, ...images.filter((_, index) => index !== normalizedIndex)];
}

function buildCatalogVehicleDetail(vehicle: Vehicle): CatalogVehicleDetail {
  return {
    id: vehicle.id,
    slug: vehicle.slug,
    make: vehicle.make,
    model: vehicle.model,
    year: vehicle.year,
    mileage: vehicle.mileage,
    power: vehicle.power,
    engineCapacity: vehicle.engineCapacity,
    fuelTypeLabel: fuelTypeLabel(vehicle.fuelType),
    transmissionLabel: transmissionLabel(vehicle.transmission),
    driveTrainLabel: driveTrainLabel(vehicle.driveTrain),
    price: Number(vehicle.price),
    monthlyRate: estimateMonthlyRate(Number(vehicle.price)),
    status: vehicle.status,
    statusLabel: statusLabel(vehicle.status),
    shortDescription: buildShortDescription(vehicle),
    description:
      vehicle.description ??
      'Skontaktuj się z nami, aby otrzymać pełną specyfikację, historię serwisową i ofertę finansowania dla tego egzemplarza.',
    youtubeUrl: vehicle.youtubeUrl,
    youtubeEmbedUrl: toYouTubeEmbedUrl(vehicle.youtubeUrl),
    images: sortImagesByPrimary(vehicle.images, vehicle.primaryImageIndex),
    features: vehicle.features,
    specs: buildSpecs(vehicle),
    advisor: {
      name: 'Zespół Samochody Premium',
      role: 'Doradca ds. sprzedaży premium',
      phone: contactPhone,
      phoneHref: contactPhoneHref,
      email: contactEmail,
      emailHref: contactEmailHref,
    },
  };
}

export async function getCatalogVehicles() {
  const vehicles = await prisma.vehicle.findMany({
    orderBy: [{ status: 'asc' }, { createdAt: 'desc' }],
  });

  return vehicles.map(buildCatalogVehicle);
}

export async function getCatalogVehicleBySlug(slug: string) {
  const vehicle = await prisma.vehicle.findUnique({
    where: { slug },
  });

  return vehicle ? buildCatalogVehicleDetail(vehicle) : null;
}

export async function getCatalogFilterOptions(): Promise<CatalogFilterOptions> {
  const vehicles = await prisma.vehicle.findMany({
    select: {
      make: true,
      bodyType: true,
      fuelType: true,
      transmission: true,
    },
  });

  const brands = Array.from(new Set(vehicles.map((vehicle) => vehicle.make))).sort();
  const bodies = Array.from(
    new Set(
      vehicles
        .map((vehicle) => bodyTypeLabel(vehicle.bodyType as BodyType | null))
        .filter((body) => body !== 'Nie podano'),
    ),
  ).sort();
  const fuels = Array.from(
    new Set(vehicles.map((vehicle) => fuelTypeLabel(vehicle.fuelType))),
  ).sort();
  const gearboxes = Array.from(
    new Set(vehicles.map((vehicle) => transmissionLabel(vehicle.transmission))),
  ).sort();

  return { brands, bodies, fuels, gearboxes };
}

export { formatMileage, formatPrice };
