import { assets } from './assets';

export const ofertaSlides = [
  {
    alt: 'Luksusowy sedan premium na tle nowoczesnego salonu',
    copy:
      'Limuzyny i sedany klasy premium od najlepszych producentow — z pelna historia serwisowa i gwarancja.',
    detail:
      'Kazdy egzemplarz przechodzi wielopunktowa inspekcje, weryfikacje historii i profesjonalny detailing przed prezentacja.',
    image: assets.sedan01,
    metrics: [
      ['Marki', 'Mercedes, BMW, Audi, Porsche, Bentley'],
      ['Gwarancja', 'do 24 miesiecy / mozliwosc przedluzenia'],
      ['Finansowanie', 'leasing / kredyt / gotowka / zamiana'],
      ['Historia', 'potwierdzona Autoteka / Carfax / ASO'],
      ['Przebieg', 'weryfikowany i certyfikowany'],
      ['Przygotowanie', 'detailing premium / inspekcja mechaniczna'],
    ],
    note: 'Sedany i limuzyny stanowia podstawe naszej oferty — od klasy E po Klase S.',
    tag: '01 / Sedany',
    title: 'Sedany premium',
  },
  {
    alt: 'Luksusowy SUV na drodze otoczonej natura',
    copy:
      'SUV-y i crossovery premium laczace przestronnosc, elegancje i zaawansowane technologie.',
    detail:
      'Range Rover, Mercedes GLE, Porsche Cayenne i inne — pojazdy idealne dla tych, ktorzy cenia komfort i prestige.',
    image: assets.suv01,
    metrics: [
      ['Segment', 'SUV / crossover / terenowy'],
      ['Naped', '4x4 / AWD / adaptacyjne zawieszenie'],
      ['Bezpieczenstwo', 'asystenty jazdy / kamery 360 / radar'],
      ['Komfort', 'pneumatyka / masaze / panorama / Meridian'],
      ['Dostepnosc', 'stale odnawiana oferta'],
      ['Inspekcja', 'mechaniczna + lakiernicza + elektroniczna'],
    ],
    note: 'Segment SUV premium to najszybciej rosnaca kategoria w naszej ofercie.',
    tag: '02 / SUV-y',
    title: 'SUV-y i crossovery',
  },
  {
    alt: 'Sportowy samochod premium na torze',
    copy:
      'Samochody sportowe i GT o wyjatkowych osiagach, limitowane edycje i egzemplarze kolekcjonerskie.',
    detail:
      'Porsche 911, Mercedes AMG GT, BMW M — dla tych, ktorzy cenia emocje za kierownica i bezkompromisowa dynamike.',
    image: assets.sport01,
    metrics: [
      ['Segment', 'coupe / cabrio / GT / supercar'],
      ['Osiagi', 'od 300 do 800+ KM'],
      ['Skrzynia', 'PDK / DCT / manualna / automatyczna'],
      ['Pakiety', 'Sport Chrono / M Carbon / RS Design'],
      ['Prowadzenie', 'aktywne differentialy / PASM / ceramika'],
      ['Status', 'egzemplarze bezwypadkowe / kolekcjonerskie'],
    ],
    note: 'Samochody sportowe dla entuzjastow i kolekcjonerow.',
    tag: '03 / Sportowe',
    title: 'Samochody sportowe',
  },
  {
    alt: 'Elektryczny samochod premium ladowany w nowoczesnej stacji',
    copy:
      'Przyszlosc motoryzacji premium — zeroemisyjne pojazdy z zasiegiem i komfortem na najwyzszym poziomie.',
    detail:
      'Porsche Taycan, Mercedes EQS, BMW i7 — elektromobilnosc premium bez kompromisow w osiagach i lukusie.',
    image: assets.electric01,
    metrics: [
      ['Segment', 'elektryczne / plug-in hybrid'],
      ['Zasieg', 'od 400 do 700+ km (WLTP)'],
      ['Ladowanie', 'DC fast charging / 800V architektura'],
      ['Osiagi', 'natychmiastowy moment obrotowy'],
      ['Technologia', 'OTA updates / autonomiczna jazda L2+'],
      ['Ekologia', 'zero emisji / ulgi podatkowe'],
    ],
    note: 'Rosnaca kategoria dla swiadomych klientow premium.',
    tag: '04 / Elektryczne',
    title: 'Elektryczne i hybrydowe',
  },
] as const;

export const ofertaMaterials = [
  {
    alt: 'Certyfikat jakosci samochodu premium',
    className: 'offer-material-card offer-material-card--hero',
    details: [
      ['Standard', 'wielopunktowa inspekcja / raport fotograficzny / test drogowy'],
      ['Efekt', 'pewnosc zakupu bez ukrytych wad i niespodzianek'],
    ],
    excerpt:
      'Kazdy samochod w naszej ofercie przechodzi certyfikacje jakosci. Sprawdzamy historie, stan techniczny i prawny.',
    image: assets.detail02,
    index: '01',
    state: 'Certyfikacja',
    title: 'Wielopunktowa inspekcja jakosci',
  },
  {
    alt: 'Profesjonalny detailing samochodu premium',
    className: 'offer-material-card offer-material-card--tall',
    details: [
      ['Zakres', 'korekta lakieru / ceramika / czyszczenie wnetrza / impregnacja'],
      ['Standard', 'kazdy pojazd prezentowany w kondycji salonowej'],
    ],
    excerpt:
      'Przed prezentacja kazdy egzemplarz przechodzi profesjonalny detailing — od korekty lakieru po impregnacje skory.',
    image: assets.service,
    index: '02',
    state: 'Detailing',
    title: 'Przygotowanie premium',
  },
  {
    alt: 'Dokumentacja serwisowa samochodu',
    className: 'offer-material-card offer-material-card--wide',
    details: [
      ['Weryfikacja', 'Autoteka / Carfax / historia ASO / zdjecia z serwisu'],
      ['Gwarancja', 'potwierdzona autentycznosc przebiegu i pochodzenia'],
    ],
    excerpt:
      'Pelna transparentnosc historii pojazdu. Udostepniamy kompletna dokumentacje serwisowa i raporty z inspekcji.',
    image: assets.interior02,
    index: '03',
    state: 'Dokumentacja',
    title: 'Historia i pochodzenie bez tajemnic',
  },
  {
    alt: 'Wnetrze luksusowego samochodu premium',
    className: 'offer-material-card offer-material-card--square',
    details: [['Standard', 'skora Nappa / Alcantara / drewno / carbon / aluminium']],
    excerpt: 'Wnetrza naszych samochodow to kwintesencja luksusu — najwyzszej jakosci materialy i wykonczenie.',
    image: assets.interior01,
    index: '04',
    state: 'Wnetrze',
    title: 'Luksus w kazdym detalu',
  },
  {
    alt: 'Finansowanie samochodu premium — leasing i kredyt',
    className: 'offer-material-card offer-material-card--wide offer-material-card--dark',
    details: [
      ['Opcje', 'leasing operacyjny / finansowy / kredyt / gotowka / zamiana'],
      ['Decyzja', 'wstepna akceptacja w 2 godziny'],
    ],
    excerpt:
      'Wspolpracujemy z wiodacymi instytucjami finansowymi. Dobieramy optymalna forme finansowania do Twoich potrzeb.',
    image: assets.handover,
    index: '05',
    state: 'Finansowanie',
    title: 'Elastyczne formy platnosci',
  },
  {
    alt: 'Gwarancja na samochod premium',
    className: 'offer-material-card offer-material-card--square',
    details: [['Ochrona', 'gwarancja mechaniczna / elektryczna / lakiernicza / assistance 24/7']],
    excerpt:
      'Kazdy pojazd jest objety gwarancja dealerska z mozliwoscia przedluzenia. Spokojny zakup i bezpieczna eksploatacja.',
    image: assets.luxury03,
    index: '06',
    state: 'Gwarancja',
    title: 'Gwarancja i ochrona po zakupie',
  },
] as const;
