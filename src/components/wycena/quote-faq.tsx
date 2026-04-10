'use client';

import { useState } from 'react';
import { quoteFaqItems } from '@/data/wycena';

export function QuoteFaq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="grid gap-0" data-reveal="up">
      {quoteFaqItems.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${String(index + 1).padStart(2, '0')}`;

        return (
          <article className="group grid border-t border-zinc-200 last:border-b" key={item.question}>
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 text-left transition duration-200 ease-out sm:py-6"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              type="button"
            >
              <span className={[
                'text-[0.68rem] font-semibold tabular-nums tracking-[0.24em] transition-colors duration-200',
                isOpen ? 'text-zinc-950' : 'text-zinc-300',
              ].join(' ')}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="text-base font-semibold uppercase leading-tight tracking-[-0.04em] text-zinc-950 sm:text-lg lg:text-xl">
                {item.question}
              </span>
              <span
                aria-hidden="true"
                className={[
                  'relative h-10 w-10 border transition duration-200 ease-out',
                  isOpen ? 'border-zinc-950 bg-zinc-950 text-white' : 'border-zinc-200 bg-white text-zinc-950',
                ].join(' ')}
              >
                <span className="absolute inset-x-2.5 top-1/2 h-px -translate-y-1/2 bg-current" />
                <span
                  className={[
                    'absolute bottom-2.5 left-1/2 top-2.5 w-px -translate-x-1/2 bg-current transition duration-200 ease-out',
                    isOpen ? 'scale-y-0' : 'scale-y-100',
                  ].join(' ')}
                />
              </span>
            </button>
            <div
              aria-hidden={!isOpen}
              className={[
                'grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              ].join(' ')}
              id={panelId}
            >
              <div className="min-h-0 overflow-hidden">
                <div className="grid gap-0 pb-6 pl-[calc(2ch+1rem)]">
                  <p className="body-copy max-w-3xl">{item.answer}</p>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
