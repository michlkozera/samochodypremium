import { assets } from './assets';

export const homeProcessSteps = [
  {
    step: '01',
    title: 'Weryfikacja i selekcja',
    eyebrow: 'Etap 01 / Pozyskanie',
    summary:
      'Każdy samochód w naszej ofercie przechodzi wieloetapową weryfikację: historia serwisowa, oryginalność przebiegu, stan techniczny i prawny. Tylko egzemplarze spełniające nasze standardy trafiają do sprzedaży.',
    deliverable: ['Raport Carfax/Autoteka', 'Weryfikacja VIN', 'Historia serwisowa'],
    control: ['Stan techniczny', 'Pochodzenie', 'Legalność'],
    horizon: ['Ciągła selekcja rynku'],
  },
  {
    step: '02',
    title: 'Przygotowanie i detailing',
    eyebrow: 'Etap 02 / Prezentacja',
    summary:
      'Każdy pojazd przechodzi profesjonalny detailing, inspekcję mechaniczną i uzupełnienie wszystkich płynów eksploatacyjnych. Prezentujemy go w standardzie salonowym.',
    deliverable: ['Detailing premium', 'Inspekcja mechaniczna'],
    control: ['Lakier', 'Wnętrze', 'Mechanika', 'Dokumentacja'],
    horizon: ['2-3 dni robocze'],
  },
  {
    step: '03',
    title: 'Sprzedaż i finansowanie',
    eyebrow: 'Etap 03 / Transakcja',
    summary:
      'Oferujemy elastyczne formy finansowania: leasing, kredyt, gotówka. Wszystkie formalności realizujemy w jednym miejscu, bez zbędnych wizyt w urzędach.',
    deliverable: ['Umowa sprzedaży', 'Finansowanie', 'Ubezpieczenie'],
    control: ['Leasing', 'Kredyt', 'Gotówka', 'Zamiana'],
    horizon: ['Realizacja w 24-48h'],
  },
] as const;

export const homeOfferItems = [
  {
    title: 'Sedany premium',
    meta: 'Mercedes . BMW . Audi . Porsche',
    copy: 'Limuzyny i sedany klasy premium — elegancja, komfort i prestiż w każdym detalu.',
    list: [
      'Mercedes Klasy S, E, C AMG',
      'BMW serii 7, 5, M5',
      'Audi A8, A6, RS6',
    ],
  },
  {
    title: 'SUV-y i crossovery',
    meta: 'Range Rover . GLE . Cayenne . X5',
    copy: 'Luksusowe SUV-y łączące przestronność, moc i najnowsze technologie bezpieczeństwa.',
    list: [
      'Range Rover, Defender, Velar',
      'Mercedes GLE, GLS, G-Klasa',
      'Porsche Cayenne, Macan',
    ],
  },
  {
    title: 'Samochody sportowe',
    meta: 'AMG . M Power . RS . GT',
    copy: 'Auta o wyjątkowych osiągach i bezkompromisowym charakterze — dla tych, którzy cenią emocje za kierownicą.',
    list: [
      'Porsche 911, Cayman, Boxster',
      'Mercedes AMG GT, C63, E63',
      'BMW M3, M4, M8',
    ],
  },
  {
    title: 'Elektryczne i hybrydowe',
    meta: 'Tesla . Taycan . EQS . i7',
    copy: 'Przyszłość motoryzacji premium — zeroemisyjne pojazdy z zasięgiem i osiągami na najwyższym poziomie.',
    list: [
      'Porsche Taycan',
      'Mercedes EQS, EQE',
      'BMW i7, iX',
    ],
  },
  {
    title: 'Odkup i zamiana',
    meta: 'Wycena . skup . trade-in',
    copy: 'Chcesz sprzedać lub zamienić swój samochód? Oferujemy uczciwe wyceny i szybkie transakcje.',
    list: [
      'bezpłatna wycena w 24 godziny',
      'odkup za gotówkę bez ukrytych kosztów',
      'możliwość zamiany na inny egzemplarz z oferty',
    ],
  },
] as const;

export const homeRealizations = [
  {
    category: 'sedany',
    tag: 'Sedan / Mercedes-AMG',
    title: 'Mercedes-AMG GT 63 S — 639 KM czystej mocy.',
    description: 'Bezwypadkowy egzemplarz z polskiego salonu. Pełna historia serwisowa ASO.',
    eyebrow: 'Mercedes / AMG GT',
    panelCopy: 'Czterodrzwiowe coupe w topowej specyfikacji z pakietem AMG Dynamic Plus.',
    specs: [
      ['Rocznik', '2022'],
      ['Przebieg', '18 500 km'],
      ['Silnik', '4.0 V8 Biturbo / 639 KM'],
    ],
    image: assets.sedan01,
    alt: 'Mercedes-AMG GT 63 S w kolorze srebrnym',
  },
  {
    category: 'sportowe',
    tag: 'Sportowy / BMW M4',
    title: 'BMW M4 Competition — precyzja w każdym zakręcie.',
    description: 'Limitowana edycja z pakietem M Carbon i adaptacyjnym zawieszeniem.',
    eyebrow: 'BMW / M4 Competition',
    panelCopy: 'Idealny balans mocy i kontroli w codziennym użytkowaniu.',
    specs: [
      ['Rocznik', '2023'],
      ['Przebieg', '12 000 km'],
      ['Silnik', '3.0 R6 Biturbo / 510 KM'],
    ],
    image: assets.sedan02,
    alt: 'BMW M4 Competition w kolorze niebieskim',
  },
  {
    category: 'suv',
    tag: 'SUV / Range Rover',
    title: 'Range Rover Autobiography — kwintesencja luksusu.',
    description: 'Pełne wyposażenie, masaże, panorama, system Meridian Signature.',
    eyebrow: 'Land Rover / Range Rover',
    panelCopy: 'Ikona segmentu SUV premium w najwyższej linii wykończenia.',
    specs: [
      ['Rocznik', '2023'],
      ['Przebieg', '22 000 km'],
      ['Silnik', '4.4 V8 / 530 KM'],
    ],
    image: assets.suv01,
    alt: 'Range Rover Autobiography na drodze',
  },
  {
    category: 'sportowe',
    tag: 'Sportowy / Porsche 911',
    title: 'Porsche 911 Turbo S — legenda w czystej formie.',
    description: 'Sport Chrono, ceramiczne hamulce, PCCB, lift przedniej osi.',
    eyebrow: 'Porsche / 911 Turbo S',
    panelCopy: 'Flagowy model 911 z pełnym pakietem osiągów.',
    specs: [
      ['Rocznik', '2022'],
      ['Przebieg', '9 800 km'],
      ['Silnik', '3.8 Boxer Biturbo / 650 KM'],
    ],
    image: assets.sport02,
    alt: 'Porsche 911 Turbo S biały',
  },
  {
    category: 'suv',
    tag: 'SUV / Mercedes GLE',
    title: 'Mercedes-AMG GLE 63 S Coupe — SUV o duszy sportowca.',
    description: 'Pakiet Night, carbon, aktywna stabilizacja, Head-Up Display.',
    eyebrow: 'Mercedes / GLE 63 S',
    panelCopy: 'Połączenie przestronności SUV-a z osiągami samochodu sportowego.',
    specs: [
      ['Rocznik', '2023'],
      ['Przebieg', '15 200 km'],
      ['Silnik', '4.0 V8 Biturbo / 612 KM'],
    ],
    image: assets.suv02,
    alt: 'Mercedes-AMG GLE 63 S Coupe',
  },
  {
    category: 'sedany',
    tag: 'Sedan / Porsche Panamera',
    title: 'Porsche Panamera Turbo — grand tourer bez kompromisów.',
    description: 'Adaptacyjne zawieszenie pneumatyczne, 4-strefowa klimatyzacja, Burmester 3D.',
    eyebrow: 'Porsche / Panamera',
    panelCopy: 'Najszybsza limuzyna w ofercie Porsche z luksusowym wnętrzem.',
    specs: [
      ['Rocznik', '2023'],
      ['Przebieg', '11 000 km'],
      ['Silnik', '4.0 V8 Biturbo / 550 KM'],
    ],
    image: assets.sport01,
    alt: 'Porsche Panamera Turbo w kolorze czerwonym',
  },
] as const;

export const homePricingOptions = {
  core: {
    note: 'Gotówka lub przelew — najprostsza i najszybsza forma zakupu.',
    range: 'Płatność jednorazowa',
    time: 'Realizacja w 24h',
    focus: 'Dla klientów preferujących szybką transakcję',
  },
  architect: {
    note: 'Leasing operacyjny lub finansowy — optymalne rozwiązanie dla firm.',
    range: 'Raty od 2 500 PLN/mies.',
    time: 'Decyzja w 2h',
    focus: 'Najpopularniejsza forma dla klientów biznesowych',
  },
  signature: {
    note: 'Kredyt samochodowy na atrakcyjnych warunkach — minimum formalności.',
    range: 'RRSO od 7,9%',
    time: 'Decyzja w 24h',
    focus: 'Elastyczne warunki bez wkładu własnego',
  },
} as const;

export const homePricingTimeline = [
  {
    eyebrow: 'Etap 01 / pierwszy kontakt',
    title: 'Wybierz auto lub umów wizytę',
    copy: 'Przeglądaj naszą ofertę online lub odwiedź salon. Doradca pomoże Ci wybrać samochód dopasowany do potrzeb.',
    result: 'Rezultat: lista propozycji i termin jazdy próbnej.',
    label: 'Wybór',
    step: '01',
  },
  {
    eyebrow: 'Etap 02 / jazda próbna',
    title: 'Przetestuj samochód na drodze',
    copy: 'Zapewniamy pełną jazdę próbną wybranym egzemplarzem. Sprawdź komfort, osiągi i wyposażenie w realnych warunkach.',
    result: 'Rezultat: pewność, że to właściwy wybór.',
    label: 'Test',
    step: '02',
  },
  {
    eyebrow: 'Etap 03 / finansowanie',
    title: 'Wybierz formę płatności',
    copy: 'Gotówka, leasing, kredyt lub zamiana — dobieramy najkorzystniejsze rozwiązanie finansowe.',
    result: 'Rezultat: przejrzyste warunki bez ukrytych kosztów.',
    label: 'Finanse',
    step: '03',
  },
  {
    eyebrow: 'Etap 04 / odbiór',
    title: 'Odbierz swoje nowe auto',
    copy: 'Realizujemy formalności, przygotowujemy pojazd i przekazujemy go w standardzie premium z pełnym kompletem dokumentów.',
    result: 'Rezultat: kluczyki w Twojej dłoni.',
    label: 'Odbiór',
    step: '04',
  },
] as const;

export const homeStudioPillars = [
  {
    index: '01',
    title: 'Wyselekcjonowane egzemplarze',
    copy: 'Do oferty trafiają wyłącznie samochody z potwierdzoną historią, niskim przebiegiem i bezbłędną dokumentacją.',
  },
  {
    index: '02',
    title: 'Gwarancja i transparentność',
    copy: 'Każdy pojazd objęty jest gwarancją dealerską. Udostępniamy pełną dokumentację techniczną i fotograficzną.',
  },
  {
    index: '03',
    title: 'Kompleksowa obsługa',
    copy: 'Od finansowania, przez ubezpieczenie, po rejestrację — załatwiamy wszystko w jednym miejscu.',
  },
] as const;
