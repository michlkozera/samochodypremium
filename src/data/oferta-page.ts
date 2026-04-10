import { assets } from './assets';

/* ── Filozofia Zakupu ── */

export const philosophyManifest = [
  {
    index: '01',
    label: 'Selekcja',
    text: 'Każdy samochód w naszej ofercie przechodzi rygorystyczny proces selekcji. Sprawdzamy historię, stan techniczny i prawny zanim trafi do sprzedaży.',
  },
  {
    index: '02',
    label: 'Transparentność',
    text: 'Pełna dokumentacja fotograficzna i techniczna. Bez ukrytych wad, retuszowanych zdjęć i cofniętych przebiegów.',
  },
  {
    index: '03',
    label: 'Gwarancja',
    text: 'Każdy pojazd objęty jest gwarancją dealerską. Odpowiadamy za jakość od momentu zakupu do końca okresu ochrony.',
  },
] as const;

/* ── Katalog Kategorii — Bento Grid ── */

export const solutionsCatalog = [
  {
    id: 'sedany-premium',
    tag: '01',
    title: 'Sedany Premium',
    subtitle: 'Mercedes / BMW / Audi / Porsche / Bentley',
    description:
      'Limuzyny i sedany klasy premium — od eleganckiej Klasy E po flagową Klasę S. Egzemplarze z pełną historią ASO.',
    specs: [
      ['Marki', 'Mercedes, BMW, Audi, Porsche, Bentley'],
      ['Moc', 'od 200 do 650+ KM'],
      ['Roczniki', '2020-2025'],
      ['Standard', 'certyfikowany stan / gwarancja'],
    ],
    image: assets.sedan01,
    alt: 'Sedan premium Mercedes w salonie',
    size: 'large' as const,
  },
  {
    id: 'suv-premium',
    tag: '02',
    title: 'SUV-y Premium',
    subtitle: 'Range Rover / GLE / Cayenne / X5 / Defender',
    description:
      'Luksusowe SUV-y łączące przestronność, technologię i prestiż. Idealne dla rodzin i osób ceniących komfort.',
    specs: [
      ['Segment', 'SUV / crossover / terenowy premium'],
      ['Napęd', '4x4 / AWD / zawieszenie pneumatyczne'],
      ['Komfort', 'panorama / masaże / Meridian / Harman Kardon'],
      ['Bezpieczeństwo', 'asystenty L2+ / kamery 360°'],
    ],
    image: assets.suv01,
    alt: 'Range Rover na drodze',
    size: 'medium' as const,
  },
  {
    id: 'sportowe',
    tag: '03',
    title: 'Samochody Sportowe',
    subtitle: 'Porsche 911 / AMG GT / M3 / RS / cabrio / GT',
    description:
      'Coupe, cabrio i GT o wyjątkowych osiągach. Limitowane edycje i egzemplarze kolekcjonerskie.',
    specs: [
      ['Moc', 'od 300 do 800+ KM'],
      ['Skrzynia', 'PDK / DCT / manualna / automat'],
      ['Pakiety', 'Sport Chrono / M Carbon / RS Design'],
      ['Status', 'bezwypadkowe / kolekcjonerskie / limitowane'],
    ],
    image: assets.sport01,
    alt: 'Porsche 911 na drodze',
    size: 'medium' as const,
  },
  {
    id: 'elektryczne',
    tag: '04',
    title: 'Elektryczne i Hybrydowe',
    subtitle: 'Taycan / EQS / i7 / Model S / e-tron GT',
    description:
      'Elektromobilność premium — zeroemisyjne pojazdy z zasięgiem powyżej 400 km i osiągami supercarów.',
    specs: [
      ['Zasięg', '400-700+ km (WLTP)'],
      ['Ładowanie', 'DC fast / 800V architektura'],
      ['Technologia', 'OTA updates / jazda autonomiczna L2+'],
      ['Ekologia', 'zero emisji / ulgi podatkowe'],
    ],
    image: assets.electric01,
    alt: 'Porsche Taycan przy stacji ładowania',
    size: 'wide' as const,
  },
  {
    id: 'odkup-zamiana',
    tag: '05',
    title: 'Odkup i Zamiana',
    subtitle: 'Wycena / skup / trade-in / komisowa sprzedaż',
    description:
      'Sprzedajesz samochód? Oferujemy uczciwe wyceny, szybki odkup za gotówkę lub zamianę na inny egzemplarz z naszej oferty.',
    specs: [
      ['Wycena', 'bezpłatna w 24 godziny'],
      ['Odkup', 'gotówka / przelew w dniu transakcji'],
      ['Trade-in', 'rozliczenie na poczet nowego auta'],
      ['Komis', 'sprzedaż komisowa bez ryzyka'],
    ],
    image: assets.handover,
    alt: 'Przekazanie kluczyków do samochodu',
    size: 'small' as const,
  },
] as const;

/* ── Standardy Jakości ── */

export const rawMaterials = [
  {
    id: 'inspekcja-techniczna',
    title: 'Inspekcja Techniczna',
    category: 'Weryfikacja',
    image: assets.detail02,
    description:
      'Wielopunktowa inspekcja mechaniczna, elektryczna i lakiernicza. Sprawdzamy każdy element pojazdu przed dopuszczeniem do sprzedaży.',
    params: [
      { label: 'Punkty kontroli', value: '150+ elementów' },
      { label: 'Lakier', value: 'pomiar grubości na każdym panelu' },
      { label: 'Mechanika', value: 'pełna diagnostyka komputerowa' },
      { label: 'Dokumentacja', value: 'raport fotograficzny + wideo' },
    ],
  },
  {
    id: 'historia-pojazdu',
    title: 'Historia Pojazdu',
    category: 'Pochodzenie',
    image: assets.interior02,
    description:
      'Weryfikacja VIN, raport Autoteka/Carfax, historia serwisowa z ASO. Zapewniamy pełną transparentność pochodzenia.',
    params: [
      { label: 'Bazy danych', value: 'Autoteka / Carfax / VIN check' },
      { label: 'Serwis', value: 'pełna historia z ASO lub ASS' },
      { label: 'Przebieg', value: 'certyfikowany i zweryfikowany' },
      { label: 'Właściciele', value: 'pełna historia własności' },
    ],
  },
  {
    id: 'detailing-premium',
    title: 'Detailing Premium',
    category: 'Przygotowanie',
    image: assets.service,
    description:
      'Profesjonalne przygotowanie każdego pojazdu: korekta lakieru, powłoka ceramiczna, czyszczenie i impregnacja wnętrza.',
    params: [
      { label: 'Lakier', value: 'korekta / polerowanie / ceramika' },
      { label: 'Wnętrze', value: 'czyszczenie / impregnacja skóry' },
      { label: 'Felgi', value: 'mycie / konserwacja / renowacja' },
      { label: 'Silnik', value: 'mycie komory / konserwacja' },
    ],
  },
  {
    id: 'gwarancja-dealerska',
    title: 'Gwarancja Dealerska',
    category: 'Ochrona',
    image: assets.luxury03,
    description:
      'Każdy samochód w naszej ofercie jest objęty gwarancją dealerską z możliwością przedłużenia do 24 miesięcy.',
    params: [
      { label: 'Okres', value: '12 / 24 miesiące' },
      { label: 'Zakres', value: 'mechanika / elektryka / napęd' },
      { label: 'Assistance', value: '24/7 na terenie Europy' },
      { label: 'Serwis', value: 'naprawa w autoryzowanych punktach' },
    ],
  },
  {
    id: 'finansowanie',
    title: 'Finansowanie',
    category: 'Płatności',
    image: assets.handover,
    description:
      'Współpracujemy z wiodącymi instytucjami finansowymi. Oferujemy leasing, kredyt i inne elastyczne formy finansowania.',
    params: [
      { label: 'Leasing', value: 'operacyjny / finansowy' },
      { label: 'Kredyt', value: 'RRSO od 7,9% / bez wkładu' },
      { label: 'Decyzja', value: 'wstępna w 2 godziny' },
      { label: 'Formalności', value: 'wszystko w jednym miejscu' },
    ],
  },
  {
    id: 'ubezpieczenie',
    title: 'Ubezpieczenie',
    category: 'Polisa',
    image: assets.luxury01,
    description:
      'Pomagamy dobrać optymalne ubezpieczenie OC/AC od wiodących towarzystw. Korzystne stawki dla klientów salonu.',
    params: [
      { label: 'OC/AC', value: 'porównanie ofert top ubezpieczycieli' },
      { label: 'GAP', value: 'ochrona wartości pojazdu' },
      { label: 'Assistance', value: 'pakiety premium / Europa' },
      { label: 'NNW', value: 'dodatkowa ochrona pasażerów' },
    ],
  },
] as const;

/* ── Współpraca — dwie ścieżki ── */

export const collaborationPaths = {
  private: {
    eyebrow: 'Klienci Indywidualni',
    title: 'Zakup samochodu marzeń',
    points: [
      'Bezpłatna konsultacja i pomoc w wyborze modelu',
      'Jazda próbna wybranym egzemplarzem',
      'Elastyczne finansowanie: leasing, kredyt, gotówka',
      'Pełna obsługa: ubezpieczenie, rejestracja, wydanie',
    ],
    cta: 'Umów wizytę w salonie',
    href: '/kontakt',
  },
  architect: {
    eyebrow: 'Klienci Biznesowi i Floty',
    title: 'Rozwiązania dla firm',
    points: [
      'Dedykowane warunki dla zakupów flotowych',
      'Obsługa leasingu i finansowania korporacyjnego',
      'Odkup i zamiana aut z floty firmowej',
      'Indywidualny opiekun klienta biznesowego',
    ],
    cta: 'Zapytaj o ofertę B2B',
    href: '/kontakt',
  },
} as const;
