import { assets } from './assets';

export const homeProcessSteps = [
  {
    step: '01',
    title: 'Pomiar i układ',
    eyebrow: 'Etap 01 / Inwentaryzacja',
    summary:
      'Analizujemy ściany, piony, światło, ciągi komunikacyjne i faktyczny rytm korzystania z zabudowy, zanim cokolwiek trafi do rysunku wykonawczego.',
    deliverable: ['Inwentaryzacja', 'Osie podziału', 'Mapa kolizji'],
    control: ['Ściany i piony', 'Światło dzienne', 'Ergonomia'],
    horizon: ['2-4 dni robocze'],
  },
  {
    step: '02',
    title: 'Rysunek i materiał',
    eyebrow: 'Etap 02 / Decyzje wykonawcze',
    summary:
      'Domykamy podziały frontów, spoiny, grubości, okucia i logikę materiałową. Dopiero po tej fazie projekt przestaje być ogólną ideą i przechodzi w tryb wdrożenia.',
    deliverable: ['Rysunek wykonawczy', 'Pakiet materiałowy'],
    control: ['Spoiny i podziały', 'Grubości', 'Okucia', 'Kolejność decyzji'],
    horizon: ['3-6 dni roboczych'],
  },
  {
    step: '03',
    title: 'Produkcja i montaż',
    eyebrow: 'Etap 03 / Wdrożenie',
    summary:
      'Własna produkcja i ten sam zespół montażowy domykają spasowanie, ustawienie linii i odbiór inwestycji. To etap, w którym projekt musi potwierdzić się w realnej skali.',
    deliverable: ['Produkcja seryjna', 'Montaż', 'Finalna regulacja'],
    control: ['Spasowanie', 'Piony', 'Szczeliny', 'Odbiór końcowy'],
    horizon: ['Według harmonogramu inwestycji'],
  },
] as const;

export const homeOfferItems = [
  {
    title: 'Kuchnie na wymiar',
    meta: 'Wyspy . wysokie piony . techniczne wnętrza',
    copy: 'Monolityczne wyspy, wysokie piony, techniczne wnętrza szafek i fronty budujące spójną elewację wnętrza.',
    list: [
      'układ stref roboczych i ergonomia',
      'spieki, forniry, lakiery i zabudowy do sufitu',
      'detal wykonawczy podporządkowany architekturze wnętrza',
    ],
  },
  {
    title: 'Garderoby i szafy',
    meta: 'Moduły . podziały . wnętrza porządkujące',
    copy: 'Precyzyjny podział modułów, czyste linie frontów i wnętrza podporządkowane konkretnemu scenariuszowi użycia.',
    list: [
      'zabudowy wnękowe i walk-in',
      'strefy przechowywania szyte pod rytm codzienny',
      'aluminium, drewno, szkło i ukryte oświetlenie',
    ],
  },
  {
    title: 'Salon i biblioteki',
    meta: 'RTV . regały . ściany meblowe',
    copy: 'Zabudowy RTV, regały i ściany meblowe z wyraźnym rytmem pionów, bez wizualnego hałasu.',
    list: [
      'biblioteki i ukryte magazynowanie',
      'kompozycje porządkujące całą strefę dzienną',
      'detal meblowy spinający salon z architekturą wnętrza',
    ],
  },
  {
    title: 'Łazienki i B2B',
    meta: 'Odporność . powtarzalność . większe zakresy',
    copy: 'Odporne materiały, powtarzalny detal oraz produkcja przygotowana pod większe zakresy inwestycyjne.',
    list: [
      'zabudowy łazienkowe i techniczne strefy mokre',
      'recepcje, gabinety, showroomy i realizacje komercyjne',
      'wdrożenia indywidualne i serie pod jeden standard wykonania',
    ],
  },
  {
    title: 'Materiały i próbki',
    meta: 'Forniry . lakiery . spieki . systemy okuć',
    copy: 'Forniry, lakiery, spieki i systemy okuć zestawiane pod konkretną architekturę wnętrza i sposób użytkowania.',
    list: [
      'dobór materiału do światła, proporcji i obciążenia',
      'porównanie wariantów w jednym, czytelnym standardzie',
      'próbki omawiane na etapie projektu i wyceny',
    ],
  },
] as const;

export const homeRealizations = [
  {
    category: 'kuchnie',
    tag: 'Kuchnia / Apartament Mokotów',
    title: 'Apartament z czarną linią podziału i fornirem orzechowym.',
    description: 'Matowe fronty, gruba pozioma fuga i wyspa ustawiona jak blok architektoniczny w centrum strefy dziennej.',
    eyebrow: 'Mokotów / kuchnia',
    panelCopy: 'Monolityczna wyspa i jedna, czysta linia podziału prowadzona przez cały układ.',
    specs: [
      ['Zakres', 'Kuchnia + wysoki pion AGD'],
      ['Materiał', 'Fornir orzech / spiek / lakier mat'],
      ['Tryb', 'Projekt + produkcja + montaż'],
    ],
    image: assets.realizacje01,
    alt: 'Realizacja kuchni premium w apartamencie na Mokotowie',
  },
  {
    category: 'garderoby',
    tag: 'Garderoba / Rezydencja Konstancin',
    title: 'Walk-in z ciężkim rytmem pionów i ciemnym drewnem.',
    description:
      'Wnętrze garderoby zostało podporządkowane prostemu modułowi, z ukrytym oświetleniem i czytelnymi liniami odkładczymi.',
    eyebrow: 'Konstancin / garderoba',
    panelCopy: 'Ciemne drewno, aluminium i ukryte światło podporządkowane prostemu modułowi.',
    specs: [
      ['Zakres', 'Garderoba walk-in'],
      ['Materiał', 'Dąb wędzony / aluminium / LED'],
      ['Tryb', 'Pomiar + projekt + montaż'],
    ],
    image: assets.realizacje02,
    alt: 'Garderoba premium w rezydencji pod Warszawą',
  },
  {
    category: 'salon',
    tag: 'Salon / Penthouse Śródmieście',
    title: 'Zabudowa ściany dziennej z bibliotecznym rysunkiem.',
    description:
      'Poziome blaty i pionowe podziały zostały ustawione jak elewacja. Sprzęt RTV i magazynowanie schowano za czystą linią frontów.',
    eyebrow: 'Śródmieście / salon',
    panelCopy: 'Biblioteczny rysunek pionów i poziomów porządkujący całą ścianę dzienną.',
    specs: [
      ['Zakres', 'Biblioteka + RTV + barek'],
      ['Materiał', 'Fornir dębowy / stal / lakier'],
      ['Tryb', 'Projekt wykonawczy + realizacja'],
    ],
    image: assets.realizacje03,
    alt: 'Zabudowa salonowa w penthousie',
  },
  {
    category: 'salon',
    tag: 'Biuro / Kancelaria Wilanów',
    title: 'Gabinetowa realizacja oparta na mocnym kontraście czerni i dębu.',
    description:
      'Zaprojektowaliśmy zabudowę roboczą, recepcyjną i archiwizującą tak, aby porządkowała przestrzeń bez dekoracyjnego nadmiaru.',
    eyebrow: 'Wilanów / biuro',
    panelCopy: 'Mocny kontrast materiałów i zabudowa ustawiona jak techniczna elewacja wnętrza.',
    specs: [
      ['Zakres', 'Recepcja + gabinety + archiwum'],
      ['Materiał', 'Dąb / stal / laminat HPL'],
      ['Tryb', 'Produkcja seryjna + montaż etapowy'],
    ],
    image: assets.realizacje04,
    alt: 'Surowa zabudowa biurowa w kancelarii',
  },
  {
    category: 'kuchnie',
    tag: 'Kuchnia / Willa Żoliborz',
    title: 'Jasna kompozycja oparta na monolitycznej wyspie i pionach do sufitu.',
    description:
      'Fronty bez uchwytów, grube płaszczyzny blatu i mocny porządek zabudowy pozwoliły wyczyścić całą strefę dzienną.',
    eyebrow: 'Żoliborz / kuchnia',
    panelCopy: 'Jasna bryła wyspy i wysokie piony spinające strefę gotowania z architekturą salonu.',
    specs: [
      ['Zakres', 'Kuchnia + ukryte cargo'],
      ['Materiał', 'Lakier mat / spiek / fornir'],
      ['Tryb', 'Od pomiaru do odbioru'],
    ],
    image: assets.realizacje05,
    alt: 'Realizacja kuchni premium w willi na Żoliborzu',
  },
  {
    category: 'garderoby',
    tag: 'Garderoba / Loft Powiśle',
    title: 'Stalowa rama i dębowe wnętrze podporządkowane sypialni.',
    description:
      'Połączyliśmy otwartą garderobę, wnękę na łóżko i moduły przechowywania w jedną techniczną kompozycję bez zbędnych gestów formalnych.',
    eyebrow: 'Powiśle / loft',
    panelCopy: 'Stalowa rama i dębowe wnętrze garderoby spięte z niszą sypialnianą.',
    specs: [
      ['Zakres', 'Sypialnia + garderoba'],
      ['Materiał', 'Stal malowana / dąb / szkło'],
      ['Tryb', 'Projekt indywidualny'],
    ],
    image: assets.realizacje06,
    alt: 'Loftowa zabudowa sypialni i garderoby',
  },
] as const;

export const homePricingOptions = {
  core: {
    note: 'Wariant dla inwestycji, które mają być szybkie, czyste i bez ryzyka przekombinowania.',
    range: '34 000 - 46 000 PLN',
    time: '6-8 tygodni',
    focus: 'Mieszkanie inwestycyjne lub pierwszy dom',
  },
  architect: {
    note: 'Najczęściej wybierany standard do spójnych realizacji premium.',
    range: '46 000 - 58 000 PLN',
    time: '7-9 tygodni',
    focus: 'Apartament lub dom prywatny',
  },
  signature: {
    note: 'Poziom dla projektów indywidualnych, w których detal ma być elementem charakteru całego wnętrza.',
    range: '62 000 - 88 000 PLN',
    time: '9-12 tygodni',
    focus: 'Realizacje autorskie i wnętrza top-tier',
  },
} as const;

export const homePricingTimeline = [
  {
    eyebrow: 'Etap 01 / wejście',
    title: 'Rozmowa startowa 15 minut',
    copy: 'W jednym telefonie ustalamy zakres, termin i poziom wykończenia bez przesyłania długich formularzy.',
    result: 'Rezultat: jasny kierunek i wstępny scenariusz.',
    label: 'Start',
    step: '01',
  },
  {
    eyebrow: 'Etap 02 / warianty',
    title: 'Dwa warianty decyzji',
    copy: 'Pokazujemy dwie czytelne opcje: wariant bezpieczny i wariant docelowy, z różnicą kosztu i czasu.',
    result: 'Rezultat: porównanie, które ułatwia decyzję.',
    label: 'Warianty',
    step: '02',
  },
  {
    eyebrow: 'Etap 03 / domknięcie',
    title: 'Domknięcie materiału i detalu',
    copy: 'Przechodzimy przez krytyczne punkty projektu: podziały frontów, oświetlenie i detale techniczne.',
    result: 'Rezultat: stabilny koszt i realny harmonogram.',
    label: 'Decyzja',
    step: '03',
  },
  {
    eyebrow: 'Etap 04 / produkcja',
    title: 'Rezerwacja terminu realizacji',
    copy: 'Po akceptacji blokujemy termin i przechodzimy do finalnego przygotowania wdrożenia.',
    result: 'Rezultat: gotowy plan od projektu do montażu.',
    label: 'Rezerwacja',
    step: '04',
  },
] as const;

export const homeStudioPillars = [
  {
    index: '01',
    title: 'Projekt z kontekstem wnętrza',
    copy: 'Zabudowa ma domykać architekturę pomieszczenia, a nie funkcjonować jako osobny obiekt dekoracyjny.',
  },
  {
    index: '02',
    title: 'Produkcja bez gotowych schematów',
    copy: 'Dobieramy fronty, okucia, grubości i materiały do konkretnej inwestycji, nie do katalogowego szablonu.',
  },
  {
    index: '03',
    title: 'Montaż z pełnym domknięciem detalu',
    copy: 'Odpowiadamy za spasowanie, korekty na miejscu i odbiór całości w jednym standardzie pracy.',
  },
] as const;
