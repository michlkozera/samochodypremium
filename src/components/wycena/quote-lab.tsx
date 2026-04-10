'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

type QuoteType = 'kuchnia' | 'garderoba' | 'salon' | 'b2b';
type QuoteStandard = 'core' | 'architect' | 'signature';
type QuoteAddon = 'led' | 'stone' | 'storage' | 'express';

const typeLabels: Record<QuoteType, string> = {
  kuchnia: 'Kuchnia',
  garderoba: 'Garderoba',
  salon: 'Salon',
  b2b: 'B2B',
};

const standardLabels: Record<QuoteStandard, string> = {
  core: 'Core',
  architect: 'Architect',
  signature: 'Signature',
};

const addonLabels: Record<QuoteAddon, string> = {
  led: 'Linie LED',
  stone: 'Elementy kamienne',
  storage: 'Wnetrza premium',
  express: 'Tryb ekspresowy',
};

const standardCards = {
  core: {
    title: 'Core',
    subtitle: 'Solidna baza',
    copy: 'Efektywny kosztowo wariant dla projektow, gdzie liczy sie trwalosc, funkcjonalnosc i czysta forma.',
    list: ['fronty i korpusy klasy premium', 'sprawdzone okucia i ergonomia', 'optymalny balans budzet / jakosc'],
  },
  architect: {
    title: 'Architect',
    subtitle: 'Najczesciej wybierany',
    copy: 'Rozszerzony standard dla wnetrz premium, gdzie mebel ma byc integralna czescia architektury.',
    list: ['forniry i lakiery mat', 'dopracowane linie i zlicowania', 'najlepszy balans estetyka / koszt'],
  },
  signature: {
    title: 'Signature',
    subtitle: 'Pelna personalizacja',
    copy: 'Wariant dla najbardziej wymagajacych realizacji indywidualnych, z naciskiem na unikat i topowe materialy.',
    list: ['kamien, spieki i stal', 'zaawansowane mechanizmy', 'maksymalna swoboda projektowa'],
  },
} as const;

export function QuoteLab() {
  const [type, setType] = useState<QuoteType>('kuchnia');
  const [standard, setStandard] = useState<QuoteStandard>('architect');
  const [meters, setMeters] = useState(16);
  const [addons, setAddons] = useState<Set<QuoteAddon>>(new Set(['led', 'storage']));

  const result = useMemo(() => {
    const formatter = new Intl.NumberFormat('pl-PL');
    const standardRates: Record<QuoteStandard, number> = { core: 1700, architect: 2350, signature: 3250 };
    const typeFactors: Record<QuoteType, number> = { kuchnia: 1.08, garderoba: 0.9, salon: 0.96, b2b: 1.16 };
    const addonRates: Record<Exclude<QuoteAddon, 'express'>, number> = { led: 120, stone: 360, storage: 150 };
    const round = (value: number) => Math.round(value / 500) * 500;

    let subtotal = (8500 + meters * standardRates[standard]) * typeFactors[type];

    addons.forEach((addon) => {
      if (addon === 'express') return;
      subtotal += addonRates[addon] * meters;
    });

    if (addons.has('express')) subtotal *= 1.1;

    const min = round(subtotal * 0.93);
    const max = round(subtotal * 1.08);
    const meetings = meters > 20 ? '3 sesje' : '2 sesje';
    const install = (meters > 24 ? 3 : 2) + (addons.has('stone') ? 1 : 0);
    const leadBase = standard === 'signature' ? 9 : standard === 'architect' ? 8 : 7;
    const lead = Math.max(5, leadBase + (addons.has('stone') ? 1 : 0) + (type === 'b2b' ? 1 : 0) - (addons.has('express') ? 1 : 0));

    let recommendation = 'Domknij material i os podzialu przed startem produkcji.';
    if (standard === 'signature') recommendation = 'Przed startem zalecamy probe materialowa 1:1 i test detalu.';
    if (type === 'b2b') recommendation = 'Dla B2B warto od razu ustalic standard powtarzalnosci i harmonogram etapowy.';

    return {
      range: `${formatter.format(min)} - ${formatter.format(max)} PLN`,
      time: `${lead - 1}-${lead + 1} tygodni`,
      mode: `${standardLabels[standard]} / ${typeLabels[type]}`,
      meetings,
      install: `${install} dni`,
      recommendation,
    };
  }, [addons, meters, standard, type]);

  const activeStandard = standardCards[standard];

  const toggleAddon = (addon: QuoteAddon) => {
    setAddons((current) => {
      const next = new Set(current);
      if (next.has(addon)) next.delete(addon);
      else next.add(addon);
      return next;
    });
  };

  const copyScenario = async () => {
    const summary = [
      'Scenariusz wyceny / Meble Premium',
      `Typ: ${typeLabels[type]}`,
      `Metraz: ${meters} mb`,
      `Standard: ${standardLabels[standard]}`,
      `Dodatki: ${Array.from(addons).map((item) => addonLabels[item]).join(', ') || 'brak'}`,
      `Zakres orientacyjny: ${result.range}`,
      `Timeline: ${result.time}`,
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
      style={{ ['--range-progress' as string]: `${((meters - 6) / 34) * 100}%` }}
    >
      <div className="site-shell">
        {/* ── Asymmetric header (like PrecisionPhilosophy) ── */}
        <div className="grid gap-10 py-10 sm:py-12 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] lg:items-start lg:gap-16 lg:py-14">
          <div className="grid gap-6" data-reveal="up">
            <p className="eyebrow">Laboratorium wyceny</p>
            <h2 className="text-[clamp(2.4rem,6.5vw,5.2rem)] font-semibold uppercase leading-[0.86] tracking-[-0.07em] text-zinc-950 [text-wrap:balance]">
              Zbuduj swoj{' '}
              <span className="text-zinc-400">scenariusz kosztowy.</span>
            </h2>
          </div>
          <div className="grid gap-8 lg:pt-4" data-reveal="up">
            <div className="h-px w-16 bg-zinc-950" />
            <p className="text-sm leading-7 text-zinc-600 sm:text-[0.97rem] sm:leading-7 lg:text-base">
              Zmieniaj parametry i obserwuj, jak przesuwa sie koszt, czas i rekomendowany tryb realizacji.
              Modul jest interaktywny i czytelny w jednym ekranie roboczym.
            </p>
          </div>
        </div>

        {/* ── Main lab grid ── */}
        <div className="grid gap-0 pb-10 sm:pb-12 lg:pb-14 xl:grid-cols-[minmax(0,1.08fr)_minmax(19rem,0.92fr)]">
          {/* ── Left: Controls ── */}
          <div className="grid content-start gap-0 border border-zinc-200 bg-white" data-reveal="up">
            {/* Type selector */}
            <div className="grid gap-4 border-b border-zinc-200 p-5 sm:p-6">
              <span className="eyebrow text-zinc-400">01 / Typ realizacji</span>
              <div className="grid gap-2 sm:grid-cols-4">
                {(Object.keys(typeLabels) as QuoteType[]).map((item) => (
                  <button
                    aria-pressed={type === item}
                    className={[
                      'min-h-11 border px-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition duration-200 ease-out',
                      type === item
                        ? 'border-zinc-950 bg-zinc-950 text-white'
                        : 'border-zinc-200 bg-white text-zinc-950 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white',
                    ].join(' ')}
                    key={item}
                    onClick={() => setType(item)}
                    type="button"
                  >
                    {typeLabels[item]}
                  </button>
                ))}
              </div>
            </div>

            {/* Meter range */}
            <div className="grid gap-4 border-b border-zinc-200 p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="eyebrow text-zinc-400">02 / Metraz zabudowy</span>
                <strong className="text-2xl font-semibold tracking-[-0.06em] text-zinc-950">{meters} mb</strong>
              </div>
              <input
                max="40"
                min="6"
                onInput={(event) => setMeters(Number(event.currentTarget.value))}
                step="1"
                type="range"
                value={meters}
              />
            </div>

            {/* Standard selector */}
            <div className="grid gap-4 border-b border-zinc-200 p-5 sm:p-6">
              <span className="eyebrow text-zinc-400">03 / Poziom standardu</span>
              <div className="grid gap-2 sm:grid-cols-3">
                {(Object.keys(standardLabels) as QuoteStandard[]).map((item) => (
                  <button
                    aria-pressed={standard === item}
                    className={[
                      'min-h-11 border px-4 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition duration-200 ease-out',
                      standard === item
                        ? 'border-zinc-950 bg-zinc-950 text-white'
                        : 'border-zinc-200 bg-white text-zinc-950 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white',
                    ].join(' ')}
                    key={item}
                    onClick={() => setStandard(item)}
                    type="button"
                  >
                    {standardLabels[item]}
                  </button>
                ))}
              </div>

              {/* Standard detail card */}
              <div
                className={[
                  'grid gap-3 border p-4 transition-colors duration-300 sm:p-5',
                  standard === 'signature' ? 'border-zinc-950 bg-zinc-950 text-white' : 'border-zinc-200 bg-zinc-50 text-zinc-950',
                ].join(' ')}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="grid gap-1">
                    <strong className="text-sm uppercase tracking-[0.18em]">{activeStandard.title}</strong>
                    <span className="eyebrow text-current/60">{activeStandard.subtitle}</span>
                  </div>
                </div>
                <p className="text-sm leading-7 text-current/80">{activeStandard.copy}</p>
                <ul className="grid gap-2 sm:grid-cols-3">
                  {activeStandard.list.map((entry) => (
                    <li className="border-l border-current/20 pl-3 text-sm leading-6 text-current/80" key={`${standard}-${entry}`}>
                      {entry}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Addons */}
            <div className="grid gap-4 border-b border-zinc-200 p-5 sm:p-6 xl:border-b-0">
              <span className="eyebrow text-zinc-400">04 / Rozszerzenia</span>
              <div className="grid gap-2 sm:grid-cols-2">
                {(Object.keys(addonLabels) as QuoteAddon[]).map((item) => (
                  <button
                    aria-pressed={addons.has(item)}
                    className={[
                      'min-h-11 border px-4 text-left text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition duration-200 ease-out',
                      addons.has(item)
                        ? 'border-zinc-950 bg-zinc-950 text-white'
                        : 'border-zinc-200 bg-white text-zinc-950 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white',
                    ].join(' ')}
                    key={item}
                    onClick={() => toggleAddon(item)}
                    type="button"
                  >
                    {addonLabels[item]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Result panel (dark, sticky) ── */}
          <div className="xl:sticky xl:top-[calc(var(--site-header-h)+1.5rem)] xl:self-start" data-reveal="up">
            <div className="grid gap-0 border border-zinc-800 bg-zinc-950 text-white">
              {/* Price */}
              <div className="grid gap-3 p-5 sm:p-6">
                <span className="eyebrow text-zinc-500">Wynik orientacyjny</span>
                <strong className="text-[clamp(1.9rem,4vw,3.2rem)] font-semibold leading-none tracking-[-0.08em] text-white">
                  {result.range}
                </strong>
                <span className="eyebrow text-zinc-400">Horyzont: {result.time}</span>
              </div>

              {/* Details */}
              <div className="grid gap-px border-t border-white/10 bg-white/10">
                {[
                  ['Tryb projektu', result.mode],
                  ['Spotkania robocze', result.meetings],
                  ['Montaz', result.install],
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
                    Przejdz do kontaktu
                  </Link>
                  <button
                    className="inline-flex min-h-12 w-full items-center justify-center border border-white/20 bg-transparent px-5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-white transition duration-200 ease-out hover:border-white hover:bg-white hover:text-zinc-950 sm:w-fit"
                    onClick={copyScenario}
                    type="button"
                  >
                    Kopiuj scenariusz
                  </button>
                </div>
                <p className="eyebrow text-zinc-500">Scenariusz gotowy. Przejdz dalej i uruchom rozmowe robocza.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
