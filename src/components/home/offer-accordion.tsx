'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { useState } from 'react';

const ease = [0.22, 1, 0.36, 1] as const;
const softEase = [0.16, 1, 0.3, 1] as const;
const DEFAULT_OPEN_INDEX = 1;

const offerCards = [
  {
    detail:
      'Klasa, komfort i prestiż w każdym detalu. Sedany premium wyselekcjonowane pod kątem stanu technicznego, historii i wyposażenia.',
    href: '/oferta',
    hrefLabel: 'Zobacz sedany',
    meta: '01 / Sedany',
    note: 'Mercedes, BMW, Audi i inne marki premium.',
    title: 'Sedany premium',
  },
  {
    detail:
      'Przestronność, moc i wszechstronność. SUV-y i crossovery z segmentu premium, gotowe na każdą drogę i każdy styl życia.',
    href: '/oferta',
    hrefLabel: 'Poznaj SUV-y',
    meta: '02 / SUV',
    note: 'Range Rover, Porsche Cayenne, Mercedes GLE.',
    title: 'SUV-y i crossovery',
  },
  {
    detail:
      'Emocje za kierownicą na najwyższym poziomie. Samochody sportowe z potwierdzoną historią i bezkompromisowymi osiągami.',
    href: '/oferta',
    hrefLabel: 'Sprawdź sportowe',
    meta: '03 / Sportowe',
    note: 'Porsche 911, BMW M, Mercedes AMG.',
    title: 'Samochody sportowe',
  },
  {
    detail:
      'Przyszłość motoryzacji dostępna już dziś. Pojazdy elektryczne i hybrydowe od najlepszych producentów, z gwarancją baterii.',
    href: '/oferta',
    hrefLabel: 'Otwórz pełną ofertę',
    meta: '04 / Elektryczne',
    note: 'Tesla, Porsche Taycan, Mercedes EQ, BMW i.',
    title: 'Elektryczne i hybrydy',
  },
] as const;

const panelVariants: Variants = {
  hidden: {
    height: 0,
    opacity: 0,
  },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: {
        duration: 0.54,
        ease,
      },
      opacity: {
        duration: 0.26,
        delay: 0.12,
        ease: softEase,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      opacity: {
        duration: 0.16,
        ease: 'easeOut',
      },
      height: {
        duration: 0.36,
        delay: 0.05,
        ease: [0.4, 0, 1, 1],
      },
    },
  },
};

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    filter: 'blur(6px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.08,
      duration: 0.42,
      ease: softEase,
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    filter: 'blur(2px)',
    transition: {
      duration: 0.22,
      ease: 'easeOut',
    },
  },
};

const lineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.38,
      ease: softEase,
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    transition: {
      duration: 0.18,
      ease: 'easeOut',
    },
  },
};

export function OfferAccordion() {
  const [openIndex, setOpenIndex] = useState(DEFAULT_OPEN_INDEX);
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid gap-3" data-reveal="up">
      {offerCards.map((item, index) => {
        const isOpen = index === openIndex;
        const panelId = `home-offer-panel-${index}`;

        return (
          <motion.article
            animate={{
              backgroundColor: isOpen ? '#09090b' : '#f5f5f5',
              borderColor: isOpen ? '#09090b' : '#d4d4d8',
            }}
            className="overflow-hidden border"
            key={item.title}
            layout
            transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.48, ease: softEase }}
          >
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              className="grid w-full grid-cols-[minmax(0,1fr)_3rem] items-start gap-4 px-4 py-4 text-left sm:px-5 sm:py-4 lg:px-6 lg:py-5"
              onClick={() => setOpenIndex(index)}
              type="button"
            >
              <div className="grid gap-1.5">
                <motion.span
                  animate={{ color: isOpen ? 'rgba(255,255,255,0.68)' : '#71717a' }}
                  className="eyebrow"
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.32, ease: softEase }}
                >
                  {item.meta}
                </motion.span>
                <motion.h3
                  animate={{
                    color: isOpen ? '#ffffff' : '#09090b',
                    y: isOpen ? 0 : 2,
                  }}
                  className="max-w-[16ch] text-[clamp(1.2rem,3vw,2rem)] font-semibold leading-[1.1] tracking-[-0.02em]"
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.42, ease: softEase }}
                >
                  {item.title}
                </motion.h3>
              </div>

              <motion.span
                animate={{
                  backgroundColor: isOpen ? '#ffffff' : 'transparent',
                  borderColor: isOpen ? '#ffffff' : '#a1a1aa',
                  color: '#09090b',
                }}
                className="relative mt-0.5 flex h-12 w-12 items-center justify-center border"
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.32, ease: softEase }}
              >
                <span className="absolute left-3 right-3 h-px bg-current" />
                <motion.span
                  animate={{ scaleY: isOpen ? 0 : 1 }}
                  className="absolute bottom-3 top-3 w-px bg-current"
                  transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.24, ease: softEase }}
                />
              </motion.span>
            </button>

            <AnimatePresence initial={false} mode="wait">
              {isOpen ? (
                <motion.div
                  animate={shouldReduceMotion ? { height: 'auto', opacity: 1 } : 'visible'}
                  className="overflow-hidden"
                  exit={shouldReduceMotion ? { height: 0, opacity: 0 } : 'exit'}
                  id={panelId}
                  initial={shouldReduceMotion ? { height: 0, opacity: 0 } : 'hidden'}
                  variants={panelVariants}
                >
                  <motion.div
                    className="grid gap-4 border-t border-white/10 px-4 pb-4 pt-4 sm:px-5 sm:pb-5 lg:px-6 lg:pb-6"
                    exit="exit"
                    initial="hidden"
                    variants={contentVariants}
                    animate="visible"
                  >
                    <motion.p className="max-w-[46ch] text-sm leading-7 text-zinc-300" variants={lineVariants}>
                      {item.note}
                    </motion.p>
                    <motion.p className="max-w-[52ch] text-sm leading-7 text-zinc-200 sm:text-[0.97rem]" variants={lineVariants}>
                      {item.detail}
                    </motion.p>
                    <motion.div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between" variants={lineVariants}>
                      <Link
                        className="btn-premium-ghost w-full border-white/[0.12] text-white hover:border-white hover:bg-white hover:text-zinc-950 sm:w-fit"
                        href={item.href}
                      >
                        {item.hrefLabel}
                      </Link>
                      <span className="eyebrow text-zinc-500">Projekt / produkcja / montaż</span>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </motion.article>
        );
      })}
    </div>
  );
}
