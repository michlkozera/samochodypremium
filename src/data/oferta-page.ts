import { assets } from './assets';

/* ── Filozofia Precyzji ── */

export const philosophyManifest = [
  {
    index: '01',
    label: 'Geometria',
    text: 'Każda zabudowa zaczyna się od ścian, nie od katalogu. Wymiar, pion i oś dzielimy zanim pojawi się pierwszy front.',
  },
  {
    index: '02',
    label: 'Materiał',
    text: 'Fornir, spiek, lakier mat — dobieramy pod światło i dotyk, nie pod trend. Próbki sprawdzamy w skali wnętrza.',
  },
  {
    index: '03',
    label: 'Montaż',
    text: 'Jeden zespół prowadzi realizację od pomiaru po finalne spasowanie. Odpowiedzialność nie przechodzi między rękami.',
  },
] as const;

/* ── Katalog Rozwiązań — Bento Grid ── */

export const solutionsCatalog = [
  {
    id: 'zabudowy-wielkoformatowe',
    tag: '01',
    title: 'Zabudowy Wielkoformatowe',
    subtitle: 'Kuchnie / wyspy / wysokie piony / sciany zabudow',
    description:
      'Monolityczne uklady budowane od podlogi do sufitu. Kuchnie z wyspami, wysokie piony i sciany zabudow traktujemy jak elewacje wnetrza.',
    specs: [
      ['Wysokosc', 'do 320 cm bez widocznych lacznikow'],
      ['Fronty', 'fornir / lakier mat / spiek ceramiczny'],
      ['Integracja', 'AGD, oswietlenie i wentylacja w bryle'],
      ['Tolerancja', '< 0.5 mm na calej dlugosci zabudowy'],
    ],
    image: assets.kuchnia,
    alt: 'Wielkoformatowa zabudowa kuchenna z wyspa',
    size: 'large' as const,
  },
  {
    id: 'systemy-ukryte',
    tag: '02',
    title: 'Systemy Ukryte',
    subtitle: 'Garderoby / walk-in / wneki / schowki techniczne',
    description:
      'Zabudowy bezuchwytowe i systemy push-to-open, w ktorych front jest spokojna plaszczyzna bez widocznej mechaniki.',
    specs: [
      ['System', 'push-to-open / tip-on / servo-drive'],
      ['Front', 'ciaglosc plaszczyzny bez uchwytu i widocznej przerwy'],
      ['Organizacja', 'szuflady, organizery, drążki i podzialy wewnetrzne'],
      ['Cichy domyk', 'pelna integracja w kazdym module'],
    ],
    image: assets.szafa,
    alt: 'Ukryty system garderobowy walk-in',
    size: 'medium' as const,
  },
  {
    id: 'zaawansowane-oswietlenie',
    tag: '03',
    title: 'Zaawansowane Oswietlenie',
    subtitle: 'LED liniowe / profile wpuszczane / scenografie swiatla',
    description:
      'Swiatlo projektujemy jako integralna czesc zabudowy, nie jako dodatek. Profile wpuszczane, linie LED i scenografie swiatla.',
    specs: [
      ['Typ', 'profile LED wpuszczane / nakładane / cienkie linie'],
      ['Temperatura', '2700K-4000K / mozliwosc regulacji'],
      ['Sterowanie', 'DALI / Casambi / integracja z systemem domu'],
      ['Montaz', 'ukryty w bryle zabudowy, bez widocznych zrodel'],
    ],
    image: assets.materialy03,
    alt: 'Zaawansowany system oswietlenia LED w zabudowie',
    size: 'medium' as const,
  },
  {
    id: 'zabudowy-salonowe',
    tag: '04',
    title: 'Zabudowy Salonowe',
    subtitle: 'Biblioteki / RTV / komody / moduly ekspozycyjne',
    description:
      'Sciany dzienne, biblioteki i strefy RTV budowane jako jeden uklad pionow i poziomow z ukrytym zapleczem technicznym.',
    specs: [
      ['Zakres', 'RTV / biblioteki / komody / sciany zabudow'],
      ['Akustyka', 'sprzet i przewody ukryte w uporzadkowanym zapleczu'],
      ['Material', 'fornir, lakier mat, metal i kamien w jednym ukladzie'],
      ['Efekt', 'mebel czytany jako staly element architektury'],
    ],
    image: assets.salon,
    alt: 'Zabudowa salonowa z biblioteka i modulem RTV',
    size: 'wide' as const,
  },
  {
    id: 'przestrzenie-komercyjne',
    tag: '05',
    title: 'Przestrzenie B2B',
    subtitle: 'Recepcje / gabinety / showroomy / strefy premium',
    description:
      'Realizacje komercyjne, w ktorych liczy sie powtarzalnosc detalu, odpornosc materialu i koordynacja montazu na obiekcie.',
    specs: [
      ['Standard', 'powtarzalnosc detalu i kontrola wdrozenia'],
      ['Odpornosc', 'materialy do intensywnego uzytkowania'],
      ['Wdrozenie', 'koordynacja wykonawcza i montaz etapowy'],
      ['Serwis', 'logika dostepu i etapowania prac na obiekcie'],
    ],
    image: assets.komercja,
    alt: 'Realizacja komercyjna z mocna geometria',
    size: 'small' as const,
  },
] as const;

/* ── Surowa Materia i Standardy ── */

export const rawMaterials = [
  {
    id: 'fornir-naturalny',
    title: 'Fornir Naturalny',
    category: 'Okladzina',
    image: assets.fornirNaturalny,
    description:
      'Reczna selekcja rysunku uslojenia. Ciaglosc slojow prowadzona przez cala zabudowe bez przypadkowych ciec optycznych.',
    params: [
      { label: 'Grubosc', value: '0.6 — 3.0 mm' },
      { label: 'Selekcja', value: 'reczna / match po rysunku' },
      { label: 'Wykonczenie', value: 'olej mat / lakier otwartoporowy' },
      { label: 'Zastosowanie', value: 'fronty / boki / wnetrza szuflad' },
    ],
  },
  {
    id: 'spiek-ceramiczny',
    title: 'Spiek Ceramiczny',
    category: 'Powierzchnia',
    image: assets.spiekCeramiczny,
    description:
      'Wysoka odpornosc termiczna i mechaniczna. Stosujemy jako blaty, fronty i okladziny o ekstremalnej trwalosci.',
    params: [
      { label: 'Grubosc', value: '6 / 12 / 20 mm' },
      { label: 'Odpornosc', value: 'termiczna do 900°C' },
      { label: 'Struktura', value: 'mat / soft-touch / naturalny kamien' },
      { label: 'Format', value: 'do 320 × 160 cm — wielkoformatowe plyty' },
    ],
  },
  {
    id: 'lakier-mat',
    title: 'Lakier Gleboki Mat',
    category: 'Wykonczenie',
    image: assets.lakierGlebokiMat,
    description:
      'Powierzchnia pozbawiona refleksu. Antyfingerprint i soft-touch dla frontow, ktore majā pracowac cicho wizualnie.',
    params: [
      { label: 'Polysk', value: '< 5 GU (gleboki mat)' },
      { label: 'Technologia', value: 'natrysk / utwardzanie UV' },
      { label: 'Ochrona', value: 'powloka antyfingerprint' },
      { label: 'Kolor', value: 'RAL / NCS / dedykowana receptura' },
    ],
  },
  {
    id: 'aluminium-anodowane',
    title: 'Aluminium Anodowane',
    category: 'Detal',
    image: assets.aluminiumAnodowane,
    description:
      'Profile, uchwyty i detale konstrukcyjne w anodowanym aluminium. Precyzja ciecia i eloksalowane wykonczenie.',
    params: [
      { label: 'Proces', value: 'anodowanie / eloksalowanie' },
      { label: 'Kolor', value: 'natural / black / champagne / bronze' },
      { label: 'Tolerancja', value: '< 0.1 mm na profil' },
      { label: 'Zastosowanie', value: 'profile LED / ramki / uchwyty' },
    ],
  },
  {
    id: 'szklo-techniczne',
    title: 'Szklo Techniczne',
    category: 'Powierzchnia',
    image: assets.szkloTechniczne,
    description:
      'Szklo lacobel, satynowane i transparentne w zabudowach wymagajacych lekkosci bez utraty precyzji podzialu.',
    params: [
      { label: 'Typ', value: 'lacobel / satyna / transparentne' },
      { label: 'Grubosc', value: '4 / 6 / 8 mm' },
      { label: 'Bezpieczenstwo', value: 'hartowanie / laminowanie' },
      { label: 'Montaz', value: 'profil aluminiowy / klejenie UV' },
    ],
  },
  {
    id: 'kamien-naturalny',
    title: 'Kamien Naturalny',
    category: 'Blat',
    image: assets.kamienNaturalny,
    description:
      'Granit, kwarcyt i marmur stosowane jako blaty robocze i okladziny o unikatowym, niepowtarzalnym rysunku.',
    params: [
      { label: 'Material', value: 'granit / kwarcyt / marmur' },
      { label: 'Grubosc', value: '20 / 30 mm' },
      { label: 'Obrobka', value: 'CNC / waterjet / reczne szlifowanie' },
      { label: 'Impregnacja', value: 'hydroizolacja powierzchniowa' },
    ],
  },
] as const;

/* ── Współpraca — dwie ścieżki ── */

export const collaborationPaths = {
  private: {
    eyebrow: 'Inwestorzy Prywatni',
    title: 'Apartamenty i domy',
    points: [
      'Bezplatna konsultacja wstepna i analiza rzutow',
      'Projekt techniczny oparty na realnych wymiarach',
      'Produkcja w naszym warsztacie pod jednym nadzorem',
      'Montaz i serwis gwarancyjny w jednej odpowiedzialnosci',
    ],
    cta: 'Zaplanuj realizacje',
    href: '/wycena',
  },
  architect: {
    eyebrow: 'Architekci i Biura Projektowe',
    title: 'Wspolpraca techniczna',
    points: [
      'Koordynacja na rzutach i dokumentacji wykonawczej',
      'Prototypowanie materialow i detali w skali 1:1',
      'Elastyczny harmonogram dostosowany do faz budowy',
      'Dedykowany opiekun projektu od briefu do odbioru',
    ],
    cta: 'Nawiaz wspolprace',
    href: '/kontakt',
  },
} as const;
