export const quoteFaqItems = [
  {
    question: 'Czy ta wycena jest ostateczna?',
    answer:
      'Nie. To scenariusz orientacyjny, który porządkuje zakres. Finalna wycena jest domykana po decyzjach materiałowych i wykonawczych.',
  },
  {
    question: 'Czy mogę zacząć bez kompletnego projektu architekta?',
    answer: 'Tak. Wystarczy orientacyjny metraż i opis funkcji. Braki doprecyzujemy podczas rozmowy roboczej.',
  },
  {
    question: 'Co najbardziej zmienia koszt realizacji?',
    answer:
      'Najmocniej działa poziom detalu, rodzaj frontów, systemy wewnętrzne i stopień personalizacji całej zabudowy.',
  },
  {
    question: 'Jak szybko mogę dostać odpowiedź?',
    answer: 'Zwykle wracamy z odpowiedzią roboczą do 48h od momentu otrzymania konkretnych danych projektowych.',
  },
] as const;

export const quoteFlowSteps = [
  {
    step: '01',
    label: 'Brief i zakres',
    eyebrow: 'Etap 01 / wejście',
    title: 'Brief i zakres',
    summary:
      'W tym momencie porządkujemy funkcje, metraż, styl i poziom detalu, aby uniknąć chaosu na kolejnych etapach.',
    deliverable: 'checklista projektu + scenariusz kosztu',
    control: 'zakres / priorytety / budżet',
    time: '1-2 dni',
  },
  {
    step: '02',
    label: 'Rysunek i materiał',
    eyebrow: 'Etap 02 / decyzje',
    title: 'Rysunek i materiał',
    summary:
      'Po akceptacji kierunku zamykamy logikę podziałów, materiał i detale, które bezpośrednio wpływają na koszt i termin.',
    deliverable: 'rysunek wykonawczy + konfiguracja materiałowa',
    control: 'linie / okucia / wykończenie',
    time: '3-5 dni',
  },
  {
    step: '03',
    label: 'Produkcja',
    eyebrow: 'Etap 03 / warsztat',
    title: 'Produkcja',
    summary:
      'Elementy są przygotowywane w kolejności montażowej, z kontrolą spasowania przed transportem na inwestycję.',
    deliverable: 'komplet elementów gotowych do montażu',
    control: 'powtarzalność / tolerancje / jakość',
    time: '4-7 tygodni',
  },
  {
    step: '04',
    label: 'Montaż i odbiór',
    eyebrow: 'Etap 04 / finał',
    title: 'Montaż i odbiór',
    summary:
      'Finalny etap domyka geometrię, regulacje i odbiór techniczny. Tu weryfikujemy, czy projekt działa tak, jak został zaplanowany.',
    deliverable: 'montaż finalny + odbiór',
    control: 'spasowanie / piony / regulacje',
    time: '1-3 dni',
  },
] as const;
