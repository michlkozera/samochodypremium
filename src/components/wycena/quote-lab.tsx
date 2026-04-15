'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type CarSegment = 'sedan' | 'suv' | 'sport' | 'electric';
type CarCondition = 'ideal' | 'very-good' | 'good' | 'fair';

const segmentLabels: Record<CarSegment, string> = {
  sedan: 'Sedan',
  suv: 'SUV',
  sport: 'Sportowy',
  electric: 'Elektryczny',
};

const conditionLabels: Record<CarCondition, string> = {
  ideal: 'Idealny',
  'very-good': 'Bardzo dobry',
  good: 'Dobry',
  fair: 'Do poprawy',
};

const conditionCards: Record<CarCondition, { title: string; subtitle: string; copy: string; list: string[] }> = {
  ideal: {
    title: 'Idealny',
    subtitle: 'Najwyższa wycena',
    copy: 'Pojazd w stanie kolekcjonerskim, pełna historia serwisowa, bez śladów użytkowania.',
    list: ['pełna dokumentacja', 'lakier oryginalny', 'komplet kluczy i akcesoriów'],
  },
  'very-good': {
    title: 'Bardzo dobry',
    subtitle: 'Najczęściej spotykany',
    copy: 'Zadbany samochód z regularnym serwisem, minimalne ślady standardowego użytkowania.',
    list: ['serwisowany w ASO', 'drobne ślady eksploatacji', 'kompletna dokumentacja'],
  },
  good: {
    title: 'Dobry',
    subtitle: 'Solidna baza',
    copy: 'Samochód sprawny technicznie, z widocznymi śladami codziennego użytkowania.',
    list: ['stan techniczny OK', 'kosmetyka do odświeżenia', 'historia częściowa'],
  },
  fair: {
    title: 'Do poprawy',
    subtitle: 'Wymaga nakładów',
    copy: 'Pojazd wymagający inwestycji w detailing lub drobne naprawy przed sprzedażą.',
    list: ['wymaga renowacji', 'naprawy kosmetyczne', 'obniżony współczynnik'],
  },
};

export function QuoteLab() {
  const [segment, setSegment] = useState<CarSegment>('sedan');
  const [condition, setCondition] = useState<CarCondition>('very-good');
  const [year, setYear] = useState(2020);
  const [mileage, setMileage] = useState(60);

  const result = useMemo(() => {
    const formatter = new Intl.NumberFormat('pl-PL');

    const segmentBase: Record<CarSegment, number> = { sedan: 180000, suv: 220000, sport: 320000, electric: 250000 };
    const conditionFactor: Record<CarCondition, number> = { ideal: 1.15, 'very-good': 1.0, good: 0.85, fair: 0.68 };

    const currentYear = new Date().getFullYear();
    const ageFactor = Math.max(0.4, 1 - (currentYear - year) * 0.06);
    const mileageFactor = Math.max(0.5, 1 - (mileage / 1000) * 0.28);

    const round = (value: number) => Math.round(value / 1000) * 1000;
    const base = segmentBase[segment] * ageFactor * mileageFactor * conditionFactor[condition];

    const min = round(base * 0.92);
    const max = round(base * 1.08);

    const inspectionDays = condition === 'ideal' ? '1 dzień' : condition === 'very-good' ? '1-2 dni' : '2-3 dni';
    const payoutDays = '24-48h od akceptacji';

    let recommendation = 'Standardowy proces odkupu — wycena i realizacja w ciągu tygodnia.';
    if (condition === 'ideal') recommendation = 'Pojazd premium w idealnym stanie — ekspresowa ścieżka odkupu.';
    if (condition === 'fair') recommendation = 'Zalecamy wcześniejszą wycenę stacjonarną dla precyzyjnej oferty.';
    if (year <= 2016) recommendation = 'Starszy rocznik — wycena końcowa może wymagać dodatkowej inspekcji.';

    return {
      range: `${formatter.format(min)} – ${formatter.format(max)} PLN`,
      inspection: inspectionDays,
      payout: payoutDays,
      mode: `${segmentLabels[segment]} / ${conditionLabels[condition]}`,
      recommendation,
    };
  }, [segment, condition, year, mileage]);

  const activeCondition = conditionCards[condition];

  const copyScenario = async () => {
    const summary = [
      'Wycena odkupu / Samochody Premium',
      `Segment: ${segmentLabels[segment]}`,
      `Rocznik: ${year}`,
      `Przebieg: ${mileage} tys. km`,
      `Stan: ${conditionLabels[condition]}`,
      `Wycena orientacyjna: ${result.range}`,
      `Inspekcja: ${result.inspection}`,
      `Wypłata: ${result.payout}`,
    ].join('\n');

    try {
      await navigator.clipboard.writeText(summary);
    } catch {
      const temp = document.createElement('textarea');
      temp.value = summary;
      temp.style.position = 'absolute';
      temp.style.left = '-9999px';
      document.body.appendChild(temp);
      temp.select();
      document.execCommand('copy');
      document.body.removeChild(temp);
    }
  };

  return (
    <section
      className="border-b border-zinc-200 bg-white"
      style={{ ['--range-progress' as string]: `${((year - 2014) / 11) * 100}%` }}
    >
      <div className="site-shell">
        {/* Header */}
        <div className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-start lg:gap-16 lg:py-14">
          <div className="grid gap-6" data-reveal="up">
            <p className="eyebrow">Kalkulator odkupu</p>
            <h2 className="text-[clamp(2.4rem,6.5vw,5.2rem)] font-bold uppercase leading-[0.86] tracking-[-0.07em] text-zinc-950 [text-wrap:balance]">
              Sprawdź wartość{' '}
              <span className="text-zinc-400">swojego auta.</span>
            </h2>
          </div>
          <div className="grid gap-8 lg:pt-4" data-reveal="up">
            <div className="h-px w-16 bg-zinc-950" />
            <p className="text-sm leading-7 text-zinc-600 sm:text-[0.97rem] sm:leading-7 lg:text-base">
              Zmieniaj parametry i obserwuj orientacyjną wycenę odkupu.
              Końcowa oferta zostanie przygotowana po inspekcji stacjonarnej.
            </p>
          </div>
        </div>

        {/* Main lab grid */}
        <div className="grid gap-0 pb-10 sm:pb-12 lg:pb-14 xl:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.92fr)]">
          {/* Left: Controls */}
          <div className="grid content-start gap-0 border border-zinc-200 bg-white" data-reveal="up">
            {/* Segment selector */}
            <div className="grid gap-4 border-b border-zinc-200 p-5 sm:p-6">
              <span className="eyebrow text-zinc-400">01 / Segment pojazdu</span>
              <div className="grid gap-2 sm:grid-cols-4">
                {(Object.keys(segmentLabels) as CarSegment[]).map((item) => (
                  <button
                    aria-pressed={segment === item}
                    className={[
                      'min-h-11 border px-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition duration-200 ease-out',
                      segment === item
                        ? 'border-zinc-950 bg-zinc-950 text-white'
                        : 'border-zinc-200 bg-white text-zinc-950 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white',
                    ].join(' ')}
                    key={item}
                    onClick={() => setSegment(item)}
                    type="button"
                  >
                    {segmentLabels[item]}
                  </button>
                ))}
              </div>
            </div>

            {/* Year range */}
            <div className="grid gap-4 border-b border-zinc-200 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="eyebrow text-zinc-400">02 / Rocznik</span>
                <strong className="text-2xl font-semibold tracking-[-0.06em] text-zinc-950">{year}</strong>
              </div>
              <input
                max="2025"
                min="2014"
                onInput={(event) => setYear(Number(event.currentTarget.value))}
                step="1"
                type="range"
                value={year}
              />
            </div>

            {/* Mileage range */}
            <div className="grid gap-4 border-b border-zinc-200 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="eyebrow text-zinc-400">03 / Przebieg</span>
                <strong className="text-2xl font-semibold tracking-[-0.06em] text-zinc-950">{mileage} tys. km</strong>
              </div>
              <input
                max="300"
                min="5"
                onInput={(event) => setMileage(Number(event.currentTarget.value))}
                step="5"
                type="range"
                value={mileage}
              />
            </div>

            {/* Condition selector */}
            <div className="grid gap-4 border-b border-zinc-200 p-5 sm:p-6 xl:border-b-0">
              <span className="eyebrow text-zinc-400">04 / Stan pojazdu</span>
              <div className="grid gap-2 sm:grid-cols-4">
                {(Object.keys(conditionLabels) as CarCondition[]).map((item) => (
                  <button
                    aria-pressed={condition === item}
                    className={[
                      'min-h-11 border px-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition duration-200 ease-out',
                      condition === item
                        ? 'border-zinc-950 bg-zinc-950 text-white'
                        : 'border-zinc-200 bg-white text-zinc-950 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white',
                    ].join(' ')}
                    key={item}
                    onClick={() => setCondition(item)}
                    type="button"
                  >
                    {conditionLabels[item]}
                  </button>
                ))}
              </div>

              {/* Condition detail card */}
              <div
                className={[
                  'grid gap-3 border p-4 transition-colors duration-300 sm:p-5',
                  condition === 'ideal' ? 'border-zinc-950 bg-zinc-950 text-white' : 'border-zinc-200 bg-zinc-50 text-zinc-950',
                ].join(' ')}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="grid gap-1">
                    <strong className="text-sm uppercase tracking-[0.18em]">{activeCondition.title}</strong>
                    <span className="eyebrow text-current/60">{activeCondition.subtitle}</span>
                  </div>
                </div>
                <p className="text-sm leading-7 text-current/80">{activeCondition.copy}</p>
                <ul className="grid gap-2 sm:grid-cols-3">
                  {activeCondition.list.map((entry) => (
                    <li className="border-l border-current/20 pl-3 text-sm leading-6 text-current/80" key={`${condition}-${entry}`}>
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Result panel */}
          <div className="xl:sticky xl:top-[calc(var(--site-header-h)+1.5rem)] xl:self-start" data-reveal="up">
            <div className="grid gap-0 border border-zinc-800 bg-zinc-950 text-white">
              {/* Price */}
              <div className="grid gap-3 p-5 sm:p-6">
                <span className="eyebrow text-zinc-500">Orientacyjna wycena odkupu</span>
                <strong className="text-[clamp(1.9rem,4vw,3.2rem)] font-semibold leading-none tracking-[-0.08em] text-white">
                  {result.range}
                </strong>
                <span className="eyebrow text-zinc-400">Inspekcja: {result.inspection}</span>
              </div>

              {/* Details */}
              <div className="grid gap-px border-t border-white/10 bg-white/10">
                {[
                  ['Segment / Stan', result.mode],
                  ['Czas inspekcji', result.inspection],
                  ['Wypłata środków', result.payout],
                  ['Rekomendacja', result.recommendation],
                ].map(([label, value]) => (
                  <div className="grid gap-2 bg-zinc-950 p-4 sm:px-6" key={label}>
                    <dt className="eyebrow text-zinc-500">{label}</dt>
                    <dd className="text-sm leading-7 text-zinc-100">{value}</dd>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="grid gap-3 border-t border-white/10 p-5 sm:p-6">
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Link className="button-primary w-full sm:w-fit" href="/kontakt">
                    Umów inspekcję
                  </Link>
                  <button
                    className="inline-flex min-h-12 w-full items-center justify-center border border-white/20 bg-transparent px-5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white transition duration-200 ease-out hover:border-white hover:bg-white hover:text-zinc-950 sm:w-fit"
                    onClick={copyScenario}
                    type="button"
                  >
                    Kopiuj wycenę
                  </button>
                </div>
                <p className="eyebrow text-zinc-500">Wycena orientacyjna. Przejdź dalej i umów wizytę w salonie.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
