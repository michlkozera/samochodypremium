'use client';

import { useMemo, useState } from 'react';
import { quoteFlowSteps } from '@/data/wycena';

export function QuoteFlow() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeStep = useMemo(() => quoteFlowSteps[activeIndex], [activeIndex]);
  const progress = ((activeIndex + 1) / quoteFlowSteps.length) * 100;

  return (
    <section className="border-b border-zinc-200 bg-zinc-50">
      <div className="site-shell">
        {/* ── Scrollytelling header (like OnasManifest) ── */}
        <div className="py-10 sm:py-12 lg:py-14" data-reveal="up">
          <p className="eyebrow">Mapa procesu</p>
        </div>

        <div className="grid gap-8 pb-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16 xl:gap-24">
          {/* Left — sticky heading + progress */}
          <div className="lg:sticky lg:top-[calc(var(--site-header-h)+2.5rem)] lg:self-start" data-reveal="up">
            <div className="grid gap-6">
              <h2 className="manifest-title text-zinc-950">
                Od briefu do montazu.
              </h2>
              <p className="body-copy max-w-lg">
                Klikaj etapy i sprawdzaj, co realnie dostajesz na kazdym poziomie procesu.
                Zakres, kontrola i horyzont czasowy w jednym widoku.
              </p>

              {/* Progress indicator */}
              <div className="grid gap-3">
                <div className="h-px overflow-hidden bg-zinc-200">
                  <div
                    className="h-full bg-zinc-950 transition-[width] duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-zinc-500">
                    {activeStep.step} / {String(quoteFlowSteps.length).padStart(2, '0')}
                  </span>
                  <span className="eyebrow text-zinc-400">{Math.round(progress)}%</span>
                </div>
              </div>

              {/* Step buttons */}
              <div className="grid gap-2">
                {quoteFlowSteps.map((step, index) => (
                  <button
                    className={[
                      'group grid min-h-[3.5rem] gap-1 border px-4 py-3 text-left transition duration-200 ease-out',
                      activeIndex === index
                        ? 'border-zinc-950 bg-zinc-950 text-white'
                        : 'border-zinc-200 bg-white text-zinc-950 hover:border-zinc-950',
                    ].join(' ')}
                    key={step.step}
                    onClick={() => setActiveIndex(index)}
                    type="button"
                  >
                    <div className="flex items-center gap-3">
                      <span className={[
                        'eyebrow',
                        activeIndex === index ? 'text-zinc-400' : 'text-zinc-300',
                      ].join(' ')}>
                        {step.step}
                      </span>
                      <strong className="text-sm uppercase tracking-[0.12em]">{step.label}</strong>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right — flowing step detail */}
          <div className="grid content-start gap-0">
            {quoteFlowSteps.map((step, index) => (
              <article
                className={[
                  'grid gap-5 border-t border-zinc-200 py-8 transition-opacity duration-300 sm:py-10 lg:py-12',
                  activeIndex === index ? 'opacity-100' : 'opacity-40',
                ].join(' ')}
                data-reveal="up"
                key={step.step}
                onClick={() => setActiveIndex(index)}
                style={{ cursor: 'pointer' }}
              >
                <div className="flex items-baseline gap-4">
                  <span className="text-[0.68rem] font-semibold tabular-nums tracking-[0.24em] text-zinc-300">
                    {step.step}
                  </span>
                  <span className="eyebrow text-zinc-500">{step.eyebrow}</span>
                </div>

                <h3 className="text-[clamp(1.6rem,3.2vw,2.8rem)] font-semibold uppercase leading-[0.92] tracking-[-0.06em] text-zinc-950">
                  {step.title}
                </h3>

                <p className="body-copy max-w-xl">{step.summary}</p>

                {activeIndex === index && (
                  <div className="grid gap-px bg-zinc-200 sm:grid-cols-3">
                    {[
                      ['Deliverable', step.deliverable],
                      ['Kontrola', step.control],
                      ['Horyzont', step.time],
                    ].map(([label, value]) => (
                      <div className="grid gap-2 bg-white p-4 sm:p-5" key={label}>
                        <span className="eyebrow text-zinc-400">{label}</span>
                        <strong className="text-sm leading-7 text-zinc-950">{value}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
