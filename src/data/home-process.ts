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
    label: 'Kierunek',
    title: 'Brief',
    summary: '48 h / zakres i budzet',
    detail: 'Porzadkujemy priorytety, ograniczenia i realny scenariusz realizacji bez zbednych rund mailowych.',
    outcome: 'Rezultat: jasny start i kolejny ruch.',
    image: assets.wycena01,
    alt: 'Wizualizacja etapu briefu i ustalen projektu',
  },
  {
    step: '02',
    label: 'Pomiar',
    title: 'Inwentaryzacja',
    summary: 'Na miejscu / osie i kolizje',
    detail: 'Sprawdzamy piony, swiatlo i krytyczne punkty zabudowy, zanim detal trafi do rysunku.',
    outcome: 'Rezultat: baza pod projekt bez zgadywania.',
    image: assets.wycena02,
    alt: 'Pomiar i analiza przestrzeni przed realizacja',
  },
  {
    step: '03',
    label: 'Decyzje',
    title: 'Projekt',
    summary: '3-5 dni / material i rysunki',
    detail: 'Domykamy podzialy, material i proporcje w jednym pakiecie gotowym do akceptacji.',
    outcome: 'Rezultat: stabilny koszt i finalny rysunek.',
    image: assets.materialy01,
    alt: 'Probki materialow i rysunek wykonawczy',
  },
  {
    step: '04',
    label: 'Wdrozenie',
    title: 'Montaz',
    summary: 'Jedna ekipa / warsztat i odbior',
    detail: 'Ten sam standard prowadzi produkcje, montaz i finalne spasowanie na miejscu inwestycji.',
    outcome: 'Rezultat: odbior bez przekazywania odpowiedzialnosci.',
    image: assets.warsztat,
    alt: 'Warsztat i finalny montaz zabudowy',
  },
] as const;
