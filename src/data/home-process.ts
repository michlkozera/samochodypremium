import type { StaticImageData } from 'next/image';
import { assets } from './assets';

export interface HomeProcessStep {
  step: string;
  label: string;
  title: string;
  summary: string;
  detail: string;
  outcome: string;
  image: StaticImageData;
  alt: string;
}

export const homeProcessSteps: readonly HomeProcessStep[] = [
  {
    step: '01',
    label: 'Kontakt',
    title: 'Konsultacja',
    summary: '24 h / telefon lub wizyta',
    detail: 'Ustalamy Twoje oczekiwania, budżet i typ samochodu. Prezentujemy dostępne egzemplarze z naszego portfolio.',
    outcome: 'Rezultat: jasna lista propozycji dopasowanych do Ciebie.',
    image: assets.handover,
    alt: 'Konsultacja z doradcą w salonie samochodów premium',
  },
  {
    step: '02',
    label: 'Weryfikacja',
    title: 'Inspekcja',
    summary: 'Na miejscu / raport techniczny',
    detail: 'Każdy samochód przechodzi wielopunktową inspekcję techniczną, sprawdzenie historii i weryfikację pochodzenia.',
    outcome: 'Rezultat: pełny raport stanu pojazdu bez ukrytych wad.',
    image: assets.service,
    alt: 'Wielopunktowa inspekcja techniczna samochodu premium',
  },
  {
    step: '03',
    label: 'Decyzja',
    title: 'Oferta',
    summary: '1-2 dni / finansowanie i formalności',
    detail: 'Przedstawiamy szczegółową ofertę z opcjami finansowania, leasingu lub kredytu. Wszystkie formalności załatwiamy za Ciebie.',
    outcome: 'Rezultat: przejrzyste warunki zakupu bez ukrytych kosztów.',
    image: assets.interior01,
    alt: 'Prezentacja warunków zakupu samochodu premium',
  },
  {
    step: '04',
    label: 'Odbiór',
    title: 'Wydanie',
    summary: 'Jeden dzień / pełna gotowość',
    detail: 'Samochód wydajemy przygotowany do perfekcji — umyty, zabezpieczony, z pełnym kompletem dokumentów i kluczy.',
    outcome: 'Rezultat: Twoje nowe auto gotowe do jazdy.',
    image: assets.luxury01,
    alt: 'Wydanie samochodu premium klientowi',
  },
] as const;
