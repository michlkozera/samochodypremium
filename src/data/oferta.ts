import { assets } from './assets';

export const ofertaSlides = [
  {
    alt: 'Kuchnia na wymiar z duza wyspa i wysokimi pionami zabudowy',
    copy:
      'Monolityczna wyspa, wysokie piony i techniczne zaplecze ukryte za spokojna elewacja frontow.',
    detail:
      'Material, os podzialu i rytm codziennego uzycia skladamy w jedna, ciezka kompozycje bez przypadkowych gestow.',
    image: assets.kuchnia,
    metrics: [
      ['Os podzialu', 'jedna linia frontow przez caly uklad'],
      ['Tryb pracy', 'pomiar / projekt / produkcja / montaz'],
      ['Dominanta', 'wyspa ustawiona jak blok architektoniczny'],
      ['Front', 'matowy rysunek bez dekoracyjnych przelaman'],
      ['Blat', 'spiek lub kamien prowadzony w jednej geometrii'],
      ['Integracja', 'AGD i przechowywanie zamkniete w bryle'],
    ],
    note: 'Najczesciej wybierane do apartamentow i domow z otwarta strefa dzienna.',
    tag: '01 / Kuchnie',
    title: 'Kuchnie na wymiar',
  },
  {
    alt: 'Garderoba walk-in z liniowymi podzialami i precyzyjnym ukladem modulow',
    copy:
      'Systemy wnekowe i walk-in podporzadkowane realnemu rytmowi korzystania, bez wizualnego nadmiaru.',
    detail:
      'Kazdy modul ma swoja logike: od wysokosci frontow i ukladu drazkow po ukryte szuflady i precyzyjnie ustawione swiatlo.',
    image: assets.szafa,
    metrics: [
      ['Scenariusz', 'ubrania / dodatki / sezonowe magazynowanie'],
      ['Material', 'fornir / szklo / aluminium / lakier mat'],
      ['Rytm', 'moduly szyte pod codzienny nawyk'],
      ['Swiatlo', 'linie LED ustawione pod realne strefy uzycia'],
      ['Wnetrze', 'szuflady, organizery i ukryte podzialy'],
      ['Front', 'spokojna elewacja bez wizualnego nadmiaru'],
    ],
    note: 'Zabudowy dla sypialni premium, garderob walk-in i precyzyjnych wnek.',
    tag: '02 / Garderoby',
    title: 'Garderoby i szafy',
  },
  {
    alt: 'Zabudowa salonowa z bibliotecznym rysunkiem pionow i modulami RTV',
    copy:
      'Biblioteki, sciany RTV i zabudowy dzienne budowane jako jedna kompozycja pionow i poziomow.',
    detail:
      'Pracujemy na duzych plaszczyznach i ostrych podzialach, zeby salon zyskal ciezar architektoniczny.',
    image: assets.salon,
    metrics: [
      ['Zakres', 'RTV / biblioteki / komody / moduly ekspozycyjne'],
      ['Funkcja', 'ukryte przewody i magazynowanie w bryle'],
      ['Efekt', 'zabudowa czytana jak staly element wnetrza'],
      ['Podzial', 'mocne piony i poziomy bez przypadkowych uskokow'],
      ['Akustyka', 'sprzet i przewody ukryte w uporzadkowanym zapleczu'],
      ['Material', 'fornir, lakier mat i detal metalowy w jednym rytmie'],
    ],
    note: 'Dla przestrzeni dziennych, w ktorych mebel ma domykac cala os kompozycyjna.',
    tag: '03 / Salon',
    title: 'Zabudowy salonowe',
  },
  {
    alt: 'Realizacja komercyjna z mocna geometria i odpornymi materialami',
    copy:
      'Recepcje, gabinety, showroomy i zabudowy komercyjne, w ktorych detal musi byc odporny i powtarzalny.',
    detail:
      'Wdrazamy rozwiazania dla pojedynczych wnetrz i wiekszych zakresow, zachowujac ten sam standard geometrii i montazu.',
    image: assets.komercja,
    metrics: [
      ['Standard', 'powtarzalnosc detalu i kontrola wdrozenia'],
      ['Zakres', 'recepcje / gabinety / showroomy / strefy premium'],
      ['Wdrozenie', 'koordynacja wykonawcza i montaz etapowy'],
      ['Odpornosc', 'materialy dobrane do intensywnego uzytkowania'],
      ['Serwis', 'logika dostepu i etapowania prac na obiekcie'],
      ['Wizerunek', 'bryla zgodna z architektura i marka miejsca'],
    ],
    note: 'Dla inwestycji, w ktorych liczy sie material, odpornosc i powtarzalnosc wykonania.',
    tag: '04 / B2B',
    title: 'Przestrzenie B2B',
  },
] as const;

export const ofertaMaterials = [
  {
    alt: 'Profilowane probki drewna i forniru pokazujace rytm uslojenia',
    className: 'offer-material-card offer-material-card--hero',
    details: [
      ['Detal', 'ciaglosc uslojenia / frez zerowy / reczna selekcja rysunku'],
      ['Efekt', 'bryla czytana jak monolit, bez przypadkowych ciec optycznych'],
    ],
    excerpt:
      'Na pierwszym planie tylko spokojna plaszczyzna. Reveal odslania sposob ciecia, kierunek slojow i rygor domkniecia krawedzi.',
    image: assets.materialy01,
    index: '01',
    state: 'Front surowy',
    title: 'Fornir prowadzony jedna linia',
  },
  {
    alt: 'Naturalne probki materialow zestawione w technicznym ukladzie',
    className: 'offer-material-card offer-material-card--tall',
    details: [
      ['Kontrola', 'probki dzienne / test odbicia / porownanie w skali wnetrza'],
      ['Ryzyko', 'eliminacja przypadkowych dominant i falszywych kontrastow'],
    ],
    excerpt:
      'Material nie wchodzi do projektu po katalogu. Wchodzi dopiero po sprawdzeniu tonu, odbicia i pracy w naturalnym swietle.',
    image: assets.materialy02,
    index: '02',
    state: 'Selekcja',
    title: 'Selekcja pod swiatlo',
  },
  {
    alt: 'Zestawienie wykonczen premium dobranych do jednej bryly',
    className: 'offer-material-card offer-material-card--wide',
    details: [
      ['Zestaw', 'spiek / anodowane aluminium / lakier gleboki mat'],
      ['Zastosowanie', 'kuchnie, wysokie piony i ciagi narazone na codzienny kontakt'],
    ],
    excerpt:
      'Asymetria bryly musi zostac zamknieta stabilnym ukladem powierzchni. Tu liczy sie kolejnosc, nie dekoracja.',
    image: assets.materialy03,
    index: '03',
    state: 'Warstwa techniczna',
    title: 'Mat, metal i kamien w jednym rytmie',
  },
  {
    alt: 'Surowa struktura materialu o glebokim rysunku',
    className: 'offer-material-card offer-material-card--square',
    details: [['Balans', 'mikrostruktura / niski refleks / odpornosc na slady uzytkowania']],
    excerpt: 'Faktura ma poglebiac surowosc bryly, ale nie moze przejac nad nia kontroli.',
    image: assets.materialy04,
    index: '04',
    state: 'Struktura',
    title: 'Dotyk bez efekciarstwa',
  },
  {
    alt: 'Probki materialow uzywane podczas ustalania technologii zabudowy',
    className: 'offer-material-card offer-material-card--wide offer-material-card--dark',
    details: [
      ['Uklad', 'podkonstrukcja / dylatacja / kolejnosc montazu / serwisowalnosc'],
      ['Rezultat', 'czysta linia frontu bez kompromisu w trwalosci'],
    ],
    excerpt:
      'Kazda decyzja materialowa uruchamia od razu decyzje o technologii laczenia, grubosci i sposobie montazu.',
    image: assets.wycena02,
    index: '05',
    state: 'Technologia',
    title: 'Detal zaczyna sie w konstrukcji',
  },
  {
    alt: 'Precyzyjny detal wykonczenia o technicznym charakterze',
    className: 'offer-material-card offer-material-card--square',
    details: [['Kontrola koncowa', 'linia styku / spasowanie / tolerancja montazowa / cien podzialu']],
    excerpt:
      'Na koncu liczy sie tylko to, czy detal utrzyma geometrie po wyjsciu z warsztatu i po wejsciu w realne uzytkowanie.',
    image: assets.wycena03,
    index: '06',
    state: 'Montaz finalny',
    title: 'Krawedz, ktora nie moze plywac',
  },
] as const;
