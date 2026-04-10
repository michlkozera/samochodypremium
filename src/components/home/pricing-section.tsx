'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { homePricingOptions, homePricingTimeline } from '@/data/home';

type PricingKey = keyof typeof homePricingOptions;

const labels: Record<PricingKey, string> = {
  core: 'Core',
  architect: 'Architect',
  signature: 'Signature',
};

export function PricingSection() {
  const [activeOption, setActiveOption] = useState<PricingKey>('architect');
  const [activeStep, setActiveStep] = useState(0);
  const option = useMemo(() => homePricingOptions[activeOption], [activeOption]);
  const step = useMemo(() => homePricingTimeline[activeStep], [activeStep]);

  return (
    <div className="grid gap-6 bg-zinc-950 py-5 sm:p-6 lg:p-7" data-reveal="up">
      <div className="grid gap-6 xl:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)]">
        <div className="grid gap-4 border border-white/[0.06] p-4 sm:p-5">
          <p className="eyebrow text-zinc-500">Poziom realizacji</p>
          <div className="grid gap-2 sm:grid-cols-3">
            {(Object.keys(homePricingOptions) as PricingKey[]).map((key) => (
              <button
                aria-pressed={activeOption === key}
                className={[
                  'min-h-12 border px-3 text-[0.72rem] font-semibold uppercase tracking-[0.22em] transition-[background-color,color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  activeOption === key
                    ? 'border-white bg-white text-zinc-950'
                    : 'border-white/16 bg-transparent text-white hover:border-white hover:bg-white hover:text-zinc-950',
                ].join(' ')}
                key={key}
                onClick={() => setActiveOption(key)}
                type="button"
              >
                {labels[key]}
              </button>
            ))}
          </div>
          <p className="text-sm leading-7 text-zinc-300">{option.note}</p>
          <dl className="grid gap-4 text-sm leading-7 sm:grid-cols-3 xl:grid-cols-1">
            <div className="grid gap-1 border-t border-white/12 pt-4">
              <dt className="eyebrow text-zinc-500">Budzet orientacyjny</dt>
              <dd className="text-white">{option.range}</dd>
            </div>
            <div className="grid gap-1 border-t border-white/12 pt-4">
              <dt className="eyebrow text-zinc-500">Czas realizacji</dt>
              <dd className="text-white">{option.time}</dd>
            </div>
            <div className="grid gap-1 border-t border-white/12 pt-4">
              <dt className="eyebrow text-zinc-500">Typ inwestycji</dt>
              <dd className="text-white">{option.focus}</dd>
            </div>
          </dl>
        </div>

        <div className="grid gap-4 border border-white/[0.06] p-4 sm:p-5">
          <span aria-hidden="true" className="h-px overflow-hidden bg-white/12">
            <span
              className="block h-full bg-white transition-[width] duration-300 ease-out"
              style={{ width: `${((activeStep + 1) / homePricingTimeline.length) * 100}%` }}
            />
          </span>
          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            {homePricingTimeline.map((item, index) => (
              <button
                aria-pressed={activeStep === index}
                className={[
                  'grid min-h-[4.5rem] gap-2 border px-3 py-3 text-left transition-[background-color,color,border-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
                  activeStep === index
                    ? 'border-white bg-white text-zinc-950'
                    : 'border-white/16 bg-transparent text-white hover:border-white hover:bg-white hover:text-zinc-950',
                ].join(' ')}
                key={item.step}
                onClick={() => setActiveStep(index)}
                type="button"
              >
                <span className="eyebrow text-current/60">{item.step}</span>
                <strong className="text-sm uppercase tracking-[0.14em]">{item.label}</strong>
              </button>
            ))}
          </div>
          <article className="grid gap-3 border border-white/[0.06] p-4 sm:p-5">
            <p className="eyebrow text-zinc-500">{step.eyebrow}</p>
            <h3 className="text-[clamp(1.45rem,2.4vw,2rem)] font-semibold uppercase leading-tight tracking-[-0.05em] text-white">
              {step.title}
            </h3>
            <p className="text-sm leading-7 text-zinc-300">{step.copy}</p>
            <p className="eyebrow text-zinc-300">{step.result}</p>
          </article>
        </div>
      </div>

      <div className="grid gap-3 px-4 sm:px-0">
        <Link className="btn-premium-light w-full justify-center" href="/wycena">
          Otwórz pełną wycenę
        </Link>
        <Link className="btn-premium-ghost w-full justify-center border-white/20 text-white hover:border-white hover:bg-white hover:text-zinc-950" href="/kontakt">
          Porozmawiajmy
        </Link>
      </div>
    </div>
  );
}
