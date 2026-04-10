import type { StaticImageData } from 'next/image';
import { assets } from './assets';

/* ── Vehicle type definitions ── */

export type FuelType = 'benzyna' | 'diesel' | 'elektryczny' | 'hybryda';
export type GearboxType = 'automatyczna' | 'manualna';
export type BodyType = 'sedan' | 'SUV' | 'coupe' | 'kombi' | 'cabrio';

export type VehicleEquipmentCategory = {
  category: string;
  items: string[];
};

export type VehicleAdvisor = {
  name: string;
  role: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
};

export type Vehicle = {
  /** URL-friendly identifier */
  slug: string;
  /** Brand name */
  brand: string;
  /** Model name */
  model: string;
  /** Short description for listing card */
  shortDescription: string;
  /** Full description for detail page */
  fullDescription: string;
  /** Year of production */
  year: number;
  /** Mileage in km */
  mileage: number;
  /** Engine power in KM */
  power: number;
  /** Engine displacement in liters */
  displacement: number;
  /** Fuel type */
  fuel: FuelType;
  /** Gearbox type */
  gearbox: GearboxType;
  /** Body type */
  body: BodyType;
  /** Drive type */
  drive: string;
  /** Color */
  color: string;
  /** Number of doors */
  doors: number;
  /** Number of seats */
  seats: number;
  /** VIN (last 6 chars) */
  vinSuffix: string;
  /** Price in PLN (gross) */
  price: number;
  /** Estimated monthly rate */
  monthlyRate: number;
  /** Main (hero) image */
  image: StaticImageData;
  /** Gallery images for detail page */
  gallery: StaticImageData[];
  /** Equipment list grouped by category */
  equipment: VehicleEquipmentCategory[];
  /** Assigned advisor */
  advisor: VehicleAdvisor;
  /** Technical specs key-value pairs */
  specs: [string, string][];
  /** Whether vehicle is featured/promoted */
  featured: boolean;
};

/* ── Advisors pool ── */

const advisorMarcin: VehicleAdvisor = {
  name: 'Marcin Kowalski',
  role: 'Doradca ds. pojazdów premium',
  phone: '+48 22 100 20 01',
  phoneHref: 'tel:+48221002001',
  email: 'm.kowalski@samochodypremium.pl',
  emailHref: 'mailto:m.kowalski@samochodypremium.pl',
};

const advisorAnna: VehicleAdvisor = {
  name: 'Anna Wiśniewska',
  role: 'Doradca ds. pojazdów sportowych',
  phone: '+48 22 100 20 02',
  phoneHref: 'tel:+48221002002',
  email: 'a.wisniewska@samochodypremium.pl',
  emailHref: 'mailto:a.wisniewska@samochodypremium.pl',
};

/* ── Mock vehicle data — 4 premium cars ── */

export const vehicles: Vehicle[] = [
  {
    slug: 'mercedes-amg-gt-63-s-2023',
    brand: 'Mercedes-AMG',
    model: 'GT 63 S 4MATIC+',
    shortDescription: '4.0 V8 Biturbo 639 KM. Salon PL. Bezwypadkowy. Pełne ASO.',
    fullDescription:
      'Mercedes-AMG GT 63 S 4MATIC+ w topowej specyfikacji. Samochód pochodzi z polskiego salonu, posiada pełną historię serwisową w ASO Mercedes-Benz. Stan wizualny i techniczny perfekcyjny. Wyposażony w pakiet AMG Dynamic Plus, ceramiczne hamulce, aktywny wydech Performance i adaptacyjne zawieszenie AMG RIDE CONTROL+. Wnętrze w skórze Nappa z czerwonymi przeszyciami.',
    year: 2023,
    mileage: 18500,
    power: 639,
    displacement: 4.0,
    fuel: 'benzyna',
    gearbox: 'automatyczna',
    body: 'coupe',
    drive: '4MATIC+ (4x4)',
    color: 'Selenitgrau Metallic',
    doors: 4,
    seats: 4,
    vinSuffix: 'KR639S',
    price: 689000,
    monthlyRate: 8450,
    image: assets.sedan01,
    gallery: [assets.sedan01, assets.sedan02, assets.interior01, assets.interior02, assets.detail01, assets.detail02],
    equipment: [
      {
        category: 'Bezpieczeństwo',
        items: [
          'Ceramiczne hamulce kompozytowe',
          'Asystent utrzymania pasa ruchu',
          'Aktywny asystent hamowania',
          'Kamery 360°',
          'Czujniki parkowania przód/tył',
          'System PRE-SAFE',
          'Poduszki powietrzne (8 szt.)',
          'Adaptacyjny tempomat DISTRONIC',
        ],
      },
      {
        category: 'Komfort',
        items: [
          'Skóra Nappa z czerwonymi przeszyciami',
          'Fotele AMG Performance z pamięcią',
          'Masaż foteli przednich',
          'Klimatyzacja 3-strefowa',
          'Szyberdach panoramiczny',
          'Podgrzewanie foteli przód/tył',
          'Wentylacja foteli przednich',
          'Ambientowe oświetlenie 64 kolory',
        ],
      },
      {
        category: 'Multimedia',
        items: [
          'MBUX z wyświetlaczem 12.3"',
          'System Burmester High-End 3D',
          'Apple CarPlay / Android Auto',
          'Head-Up Display',
          'Nawigacja z AR',
          'Ładowanie indukcyjne smartfona',
          'Cyfrowe zegary AMG',
        ],
      },
      {
        category: 'Osiągi',
        items: [
          'Pakiet AMG Dynamic Plus',
          'Aktywny wydech Performance',
          'AMG RIDE CONTROL+',
          'Tylna oś skrętna',
          'Tryby jazdy (Comfort/Sport/Sport+/Race)',
          'Launch Control',
          'Elektroniczny dyferencjał',
        ],
      },
    ],
    advisor: advisorMarcin,
    specs: [
      ['Marka', 'Mercedes-AMG'],
      ['Model', 'GT 63 S 4MATIC+'],
      ['Rok produkcji', '2023'],
      ['Przebieg', '18 500 km'],
      ['Pojemność', '4.0 l (V8 Biturbo)'],
      ['Moc', '639 KM (470 kW)'],
      ['Moment obrotowy', '900 Nm'],
      ['Skrzynia biegów', 'AMG SPEEDSHIFT MCT 9G'],
      ['Napęd', '4MATIC+ (4x4)'],
      ['Paliwo', 'Benzyna'],
      ['0-100 km/h', '3.2 s'],
      ['Prędkość maks.', '315 km/h'],
      ['Spalanie (miasto)', '13.8 l/100km'],
      ['Spalanie (trasa)', '8.9 l/100km'],
      ['Kolor nadwozia', 'Selenitgrau Metallic'],
      ['Tapicerka', 'Skóra Nappa czarna / czerwone przeszycia'],
      ['Nadwozie', 'Coupé 4-drzwiowe'],
      ['Liczba miejsc', '4'],
      ['Kraj pochodzenia', 'Polska / salon PL'],
      ['Stan', 'Bezwypadkowy'],
    ],
    featured: true,
  },
  {
    slug: 'porsche-911-carrera-s-2022',
    brand: 'Porsche',
    model: '911 Carrera S (992)',
    shortDescription: '3.0 Boxer 450 KM. PDK. Sport Chrono. PASM. Bezwypadkowy.',
    fullDescription:
      'Porsche 911 Carrera S generacji 992 w kolorze GT Silver Metallic. Samochód wyposażony w pakiet Sport Chrono, PASM, sportowy wydech, ceramiczne hamulce PCCB i 20/21" felgi RS Spyder Design. Wnętrze w skórze naturalnej z pakietem GTS Interior. Pełna historia serwisowa Porsche Centrum. Pierwszy właściciel, bezwypadkowy.',
    year: 2022,
    mileage: 24800,
    power: 450,
    displacement: 3.0,
    fuel: 'benzyna',
    gearbox: 'automatyczna',
    body: 'coupe',
    drive: 'Tylny (RWD)',
    color: 'GT Silver Metallic',
    doors: 2,
    seats: 4,
    vinSuffix: 'PS992C',
    price: 579000,
    monthlyRate: 7120,
    image: assets.sport01,
    gallery: [assets.sport01, assets.sport02, assets.detail01, assets.interior01, assets.luxury01, assets.luxury02],
    equipment: [
      {
        category: 'Bezpieczeństwo',
        items: [
          'Hamulce ceramiczne PCCB',
          'Porsche Stability Management (PSM)',
          'Poduszki powietrzne (6 szt.)',
          'Asystent pasa ruchu',
          'Czujniki parkowania przód/tył',
          'Kamera cofania',
          'System ISOFIX',
        ],
      },
      {
        category: 'Komfort',
        items: [
          'Skóra naturalna GTS Interior',
          'Fotele sportowe 14-kierunkowe',
          'Klimatyzacja 2-strefowa',
          'Podgrzewanie foteli',
          'Podgrzewana kierownica GT Sport',
          'Bezkluczykowy dostęp',
          'Elektryczna regulacja kolumny kierownicy',
        ],
      },
      {
        category: 'Multimedia',
        items: [
          'Porsche Communication Management (PCM)',
          'System BOSE Surround Sound',
          'Apple CarPlay',
          'Nawigacja online',
          'Porsche Connect Plus',
          'Wyświetlacz 10.9"',
        ],
      },
      {
        category: 'Osiągi',
        items: [
          'Pakiet Sport Chrono',
          'PASM (adaptacyjne zawieszenie)',
          'Sportowy układ wydechowy',
          'Tryb Sport Response',
          'Launch Control',
          'PDK 8-biegowe',
          'Tylny dyferencjał z blokadą',
        ],
      },
    ],
    advisor: advisorAnna,
    specs: [
      ['Marka', 'Porsche'],
      ['Model', '911 Carrera S (992)'],
      ['Rok produkcji', '2022'],
      ['Przebieg', '24 800 km'],
      ['Pojemność', '3.0 l (6-cyl. Boxer Twin-Turbo)'],
      ['Moc', '450 KM (331 kW)'],
      ['Moment obrotowy', '530 Nm'],
      ['Skrzynia biegów', 'PDK 8-biegowe'],
      ['Napęd', 'Tylny (RWD)'],
      ['Paliwo', 'Benzyna'],
      ['0-100 km/h', '3.5 s (Sport Chrono)'],
      ['Prędkość maks.', '308 km/h'],
      ['Spalanie (miasto)', '11.2 l/100km'],
      ['Spalanie (trasa)', '7.8 l/100km'],
      ['Kolor nadwozia', 'GT Silver Metallic'],
      ['Tapicerka', 'Skóra naturalna czarna / GTS Interior'],
      ['Nadwozie', 'Coupé 2-drzwiowe'],
      ['Liczba miejsc', '4'],
      ['Kraj pochodzenia', 'Niemcy / Porsche Centrum'],
      ['Stan', 'Bezwypadkowy, 1. właściciel'],
    ],
    featured: true,
  },
  {
    slug: 'audi-rs6-avant-2023',
    brand: 'Audi',
    model: 'RS6 Avant (C8)',
    shortDescription: '4.0 TFSI V8 600 KM. Quattro. B&O. Matrix LED. Panorama.',
    fullDescription:
      'Audi RS6 Avant Performance w kolorze Nardo Grey. Limitowana wersja z mocą 630 KM i momentem 850 Nm. Wyposażone w ceramiczne hamulce, zawieszenie pneumatyczne RS adaptive air, pakiet dynamiki RS plus i sportowy dyferencjał. System audio Bang & Olufsen 3D, reflektory Matrix LED z laserem, szyberdach panoramiczny. Stan kolekcjonerski, garażowany, serwisowany w ASO Audi Sport.',
    year: 2023,
    mileage: 12300,
    power: 630,
    displacement: 4.0,
    fuel: 'benzyna',
    gearbox: 'automatyczna',
    body: 'kombi',
    drive: 'Quattro (4x4)',
    color: 'Nardo Grey',
    doors: 5,
    seats: 5,
    vinSuffix: 'RS6AV3',
    price: 649000,
    monthlyRate: 7980,
    image: assets.luxury01,
    gallery: [assets.luxury01, assets.luxury02, assets.luxury03, assets.interior01, assets.detail02, assets.service],
    equipment: [
      {
        category: 'Bezpieczeństwo',
        items: [
          'Ceramiczne hamulce RS',
          'Asystent jazdy Tour',
          'Asystent skrętny',
          'Night Vision',
          'Kamery 360° z widokiem 3D',
          'Czujniki parkowania Plus',
          'Head-Up Display',
          'Asystent boczny',
        ],
      },
      {
        category: 'Komfort',
        items: [
          'Skóra Valcona perforowana',
          'Fotele RS z pamięcią i wentylacją',
          'Masaż przednich foteli',
          'Klimatyzacja 4-strefowa',
          'Szyberdach panoramiczny',
          'Elektryczna klapa bagażnika',
          'Podgrzewane siedzenia przód/tył',
          'Ambientowe oświetlenie wielokolorowe',
        ],
      },
      {
        category: 'Multimedia',
        items: [
          'MMI Navigation Plus',
          'Bang & Olufsen 3D Advanced Sound',
          'Audi Virtual Cockpit Plus',
          'Audi Connect',
          'Apple CarPlay / Android Auto',
          'Ładowanie indukcyjne',
          'Wyświetlacze MMI 10.1" + 8.6"',
        ],
      },
      {
        category: 'Osiągi',
        items: [
          'RS Adaptive Air Suspension',
          'Sportowy dyferencjał RS',
          'Pakiet dynamiki RS Plus',
          'RS Exhaust (aktywny wydech)',
          'Tiptronic 8-biegowe',
          'Launch Control',
          'Tryby RS1 / RS2 na kierownicy',
          'Quattro sport z torque vectoring',
        ],
      },
    ],
    advisor: advisorMarcin,
    specs: [
      ['Marka', 'Audi'],
      ['Model', 'RS6 Avant Performance (C8)'],
      ['Rok produkcji', '2023'],
      ['Przebieg', '12 300 km'],
      ['Pojemność', '4.0 l (V8 TFSI Biturbo)'],
      ['Moc', '630 KM (463 kW)'],
      ['Moment obrotowy', '850 Nm'],
      ['Skrzynia biegów', 'Tiptronic 8-biegowe'],
      ['Napęd', 'Quattro (stały 4x4)'],
      ['Paliwo', 'Benzyna'],
      ['0-100 km/h', '3.4 s'],
      ['Prędkość maks.', '305 km/h (odblokowana)'],
      ['Spalanie (miasto)', '14.5 l/100km'],
      ['Spalanie (trasa)', '9.2 l/100km'],
      ['Kolor nadwozia', 'Nardo Grey (mat)'],
      ['Tapicerka', 'Skóra Valcona czarna / szare przeszycia'],
      ['Nadwozie', 'Kombi (Avant) 5-drzwiowe'],
      ['Liczba miejsc', '5'],
      ['Kraj pochodzenia', 'Niemcy / ASO Audi Sport'],
      ['Stan', 'Bezwypadkowy, kolekcjonerski'],
    ],
    featured: false,
  },
  {
    slug: 'bmw-m5-competition-2022',
    brand: 'BMW',
    model: 'M5 Competition (F90)',
    shortDescription: '4.4 V8 625 KM. xDrive. Harman Kardon. Laser. Salon PL.',
    fullDescription:
      'BMW M5 Competition w kolorze Brands Hatch Grey Metallic z pakietem M Carbon Exterior. Silnik S63B44T4 o mocy 625 KM i momencie 750 Nm. Samochód wyposażony w adaptacyjne zawieszenie M, hamulce M Compound z niebieskimi zaciskami, M Differential i układ kierowniczy M Servotronic. Wnętrze w skórze Merino z pełnym pakietem M Interior. Serwisowany wyłącznie w ASO BMW M.',
    year: 2022,
    mileage: 31500,
    power: 625,
    displacement: 4.4,
    fuel: 'benzyna',
    gearbox: 'automatyczna',
    body: 'sedan',
    drive: 'M xDrive (4x4)',
    color: 'Brands Hatch Grey Metallic',
    doors: 4,
    seats: 5,
    vinSuffix: 'BM5CPL',
    price: 459000,
    monthlyRate: 5640,
    image: assets.handover,
    gallery: [assets.handover, assets.showroom, assets.interior02, assets.detail01, assets.luxury03, assets.service],
    equipment: [
      {
        category: 'Bezpieczeństwo',
        items: [
          'Hamulce M Compound (niebieskie zaciski)',
          'Driving Assistant Professional',
          'Asystent parkowania Plus',
          'Kamery 360°',
          'Night Vision',
          'Aktywna ochrona pieszych',
          'Asystent utrzymania pasa',
          'System eCall',
        ],
      },
      {
        category: 'Komfort',
        items: [
          'Skóra BMW Merino (Extended)',
          'Fotele M wielofunkcyjne z pamięcią',
          'Masaż i wentylacja przednich foteli',
          'Klimatyzacja 4-strefowa',
          'Elektryczne rolety tylne',
          'Bezkluczykowy dostęp Comfort Access',
          'Podgrzewana kierownica M',
          'Ambientowe oświetlenie',
        ],
      },
      {
        category: 'Multimedia',
        items: [
          'BMW Live Cockpit Professional',
          'Harman Kardon Surround Sound',
          'BMW Connected Drive',
          'Apple CarPlay / Android Auto',
          'Head-Up Display',
          'Nawigacja Professional z AR',
          'Ładowanie indukcyjne Qi',
          'Cyfrowy kluczyk',
        ],
      },
      {
        category: 'Osiągi',
        items: [
          'M xDrive z trybem 2WD',
          'M Compound Brakes',
          'Adaptacyjne zawieszenie M',
          'M Sport Differential',
          'M Servotronic (układ kier.)',
          'M Drive Professional',
          'Launch Control',
          'Tryby jazdy (Comfort/Sport/Sport+)',
        ],
      },
    ],
    advisor: advisorAnna,
    specs: [
      ['Marka', 'BMW'],
      ['Model', 'M5 Competition (F90 LCI)'],
      ['Rok produkcji', '2022'],
      ['Przebieg', '31 500 km'],
      ['Pojemność', '4.4 l (V8 Twin-Turbo)'],
      ['Moc', '625 KM (460 kW)'],
      ['Moment obrotowy', '750 Nm'],
      ['Skrzynia biegów', 'M Steptronic 8-biegowe'],
      ['Napęd', 'M xDrive (4x4 / tryb 2WD)'],
      ['Paliwo', 'Benzyna'],
      ['0-100 km/h', '3.3 s'],
      ['Prędkość maks.', '305 km/h (M Driver\'s Package)'],
      ['Spalanie (miasto)', '13.2 l/100km'],
      ['Spalanie (trasa)', '8.5 l/100km'],
      ['Kolor nadwozia', 'Brands Hatch Grey Metallic'],
      ['Tapicerka', 'Skóra Merino czarna / M przeszycia'],
      ['Nadwozie', 'Sedan 4-drzwiowy'],
      ['Liczba miejsc', '5'],
      ['Kraj pochodzenia', 'Polska / salon PL'],
      ['Stan', 'Bezwypadkowy, serwis ASO BMW M'],
    ],
    featured: true,
  },
];

/* ── Helpers ── */

export function getVehicleBySlug(slug: string): Vehicle | undefined {
  return vehicles.find((v) => v.slug === slug);
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pl-PL', { style: 'decimal' }).format(price);
}

export function formatMileage(km: number): string {
  return new Intl.NumberFormat('pl-PL', { style: 'decimal' }).format(km);
}

/* ── Filter option constants (for UI rendering) ── */

export const filterBrands = ['Mercedes-AMG', 'Porsche', 'Audi', 'BMW', 'Bentley', 'Land Rover'] as const;
export const filterFuels: FuelType[] = ['benzyna', 'diesel', 'elektryczny', 'hybryda'];
export const filterGearboxes: GearboxType[] = ['automatyczna', 'manualna'];
export const filterBodies: BodyType[] = ['sedan', 'SUV', 'coupe', 'kombi', 'cabrio'];
