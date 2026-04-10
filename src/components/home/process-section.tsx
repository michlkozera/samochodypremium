'use client';

import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { useState } from 'react';
import { homeProcessSteps } from '@/data/home-process';
import { AppImage } from '@/components/ui/app-image';

const DEFAULT_ACTIVE_INDEX = 1;
const ease = [0.22, 1, 0.36, 1] as const;
const softEase = [0.16, 1, 0.3, 1] as const;

const headerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const deckVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 36,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease,
    },
  },
};

const lineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease,
    },
  },
};

const mobileDetailVariants: Variants = {
  hidden: {
    opacity: 0,
    height: 0,
  },
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      height: { duration: 0.4, ease },
      opacity: { duration: 0.3, ease, delay: 0.06 },
    },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: { duration: 0.35, ease: [0.4, 0, 1, 1], delay: 0.05 },
      opacity: { duration: 0.2, ease: 'easeOut' },
    },
  },
};

const desktopDetailVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 18,
    x: -8,
    filter: 'blur(6px)',
    clipPath: 'inset(0 0 100% 0)',
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: 'blur(0px)',
    clipPath: 'inset(0 0 0% 0)',
    transition: {
      duration: 0.52,
      ease: softEase,
      delayChildren: 0.06,
      staggerChildren: 0.07,
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    x: -4,
    filter: 'blur(2px)',
    clipPath: 'inset(0 0 100% 0)',
    transition: {
      duration: 0.38,
      ease: 'easeOut',
      opacity: {
        duration: 0.3,
        ease: 'easeOut',
        delay: 0.04,
      },
      y: {
        duration: 0.34,
        ease: 'easeOut',
      },
      filter: {
        duration: 0.3,
        ease: 'easeOut',
      },
      clipPath: {
        duration: 0.32,
        ease: [0.4, 0, 1, 1],
      },
    },
  },
};

const desktopDetailLineVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 14,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.42,
      ease: softEase,
    },
  },
  exit: {
    opacity: 0,
    y: 8,
    filter: 'blur(2px)',
    transition: {
      duration: 0.22,
      ease: 'easeOut',
    },
  },
};

export function ProcessSection() {
  const shouldReduceMotion = useReducedMotion();
  const [desktopActiveIndex, setDesktopActiveIndex] = useState(DEFAULT_ACTIVE_INDEX);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number | null>(null);
  const initialState = shouldReduceMotion ? false : 'hidden';

  return (
    <section className="section-block border-b border-zinc-200/60 bg-white">
      <div className="site-shell grid gap-8 lg:gap-10">
        <motion.div
          className="grid gap-5 sm:gap-6 lg:grid-cols-[minmax(0,1fr)_auto]"
          initial={initialState}
          variants={headerVariants}
          viewport={{ once: true, amount: 0.45 }}
          whileInView="visible"
        >
          <div className="grid gap-4">
            <motion.p className="eyebrow" variants={lineVariants}>
              Jak pracujemy
            </motion.p>
            <motion.h2
              className="section-title"
              variants={lineVariants}
            >
              04 etapy.
              <br />
              Jeden standard.
            </motion.h2>
            <motion.p className="body-copy max-w-2xl" variants={lineVariants}>
              Referencyjny uklad pionowych paneli, ale dopiety do naszej strony: czern, biel, cienkie linie i konkretny detal
              ujawniany dopiero przy kontakcie.
            </motion.p>
          </div>

          <motion.div className="flex items-end" variants={lineVariants}>
            <Link className="btn-premium w-full sm:w-fit" href="/wycena">
              Rozpocznij wycenę
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="border-y border-zinc-200/60 lg:flex lg:min-h-[32rem]"
          initial={initialState}
          variants={deckVariants}
          viewport={{ once: true, amount: 0.2 }}
          whileInView="visible"
        >
          {homeProcessSteps.map((step, index) => {
            const isDesktopActive = index === desktopActiveIndex;
            const isMobileActive = index === mobileActiveIndex;

            return (
              <motion.div
                className="w-full transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] lg:min-h-[32rem]"
                key={step.step}
                style={{ flexGrow: isDesktopActive ? 1.65 : 1 }}
                variants={cardVariants}
              >
                {/* ── MOBILE ACCORDION ── */}
                <div className="border-b border-zinc-200/60 lg:hidden">
                  <div className="px-4 py-4 sm:px-5 sm:py-5">
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={[
                          'inline-flex w-fit items-center border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] transition-colors duration-300 ease-out',
                          isMobileActive ? 'border-zinc-950 bg-zinc-950 text-white' : 'border-zinc-950 text-zinc-950',
                        ].join(' ')}
                      >
                        {step.label}
                      </span>
                    </div>

                    <div className="mt-3 flex items-end gap-3">
                      <span className="shrink-0 text-[clamp(3.6rem,18vw,5.4rem)] font-normal leading-[0.8] tracking-[-0.12em] text-zinc-950">
                        {step.step}
                      </span>
                      <div className="grid gap-0.5 pb-1">
                        <p className="eyebrow text-zinc-500">{step.summary}</p>
                        <h3 className="text-[clamp(1.25rem,5vw,2rem)] font-semibold uppercase leading-[1.1] tracking-[-0.04em] text-zinc-950">
                          {step.title}
                        </h3>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isMobileActive ? (
                        <motion.div
                          animate="visible"
                          className="overflow-hidden"
                          exit="exit"
                          initial="hidden"
                          variants={mobileDetailVariants}
                        >
                          <div className="grid gap-3 pt-3">
                            <figure className="overflow-hidden border border-zinc-200/60">
                              <AppImage
                                alt={step.alt}
                                className="aspect-[16/10] h-full w-full object-cover grayscale"
                                loading="lazy"
                                sizes="100vw"
                                src={step.image}
                              />
                            </figure>
                            <div className="grid gap-1.5">
                              <p className="text-sm leading-6 text-zinc-700">{step.detail}</p>
                              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">{step.outcome}</p>
                            </div>
                          </div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>

                    <button
                      className="mt-3 text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-zinc-500 transition-[color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
                      onClick={() => setMobileActiveIndex(prev => prev === index ? null : index)}
                      type="button"
                      aria-expanded={isMobileActive}
                    >
                      {isMobileActive ? 'Zobacz mniej' : 'Zobacz więcej'}
                    </button>
                  </div>
                </div>

                {/* ── DESKTOP BUTTON ── */}
                <motion.button
                  layout
                  aria-expanded={isDesktopActive}
                  aria-pressed={isDesktopActive}
                  className="group relative hidden h-full w-full flex-col overflow-hidden bg-white text-left lg:flex lg:min-h-[32rem] lg:border-r last:lg:border-r-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-inset"
                  onClick={() => setDesktopActiveIndex(index)}
                  onFocus={() => setDesktopActiveIndex(index)}
                  onMouseEnter={() => setDesktopActiveIndex(index)}
                  transition={{ layout: { duration: 0.6, ease } }}
                  type="button"
                >
                  <motion.div
                    animate={
                      shouldReduceMotion
                        ? { opacity: isDesktopActive ? 1 : 0 }
                        : {
                            opacity: isDesktopActive ? 1 : 0,
                            scale: isDesktopActive ? 1 : 1.045,
                          }
                    }
                    className="absolute inset-0"
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.6, ease }}
                  >
                    <div className="h-full w-full">
                      <AppImage
                        alt={step.alt}
                        className="h-full w-full object-cover grayscale"
                        loading="lazy"
                        sizes="(min-width: 1024px) 32vw, 100vw"
                        src={step.image}
                      />
                    </div>
                    <div
                      className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.64)_56%,rgba(0,0,0,0.88)_100%)]"
                    />
                  </motion.div>

                  <motion.div layout className="relative z-10 flex h-full flex-col px-5 py-5"
                    transition={{ layout: { duration: 0.6, ease } }}
                  >
                    <motion.div className="mt-auto grid gap-3" layout
                      transition={{ layout: { duration: 0.6, ease } }}
                    >
                      <motion.span
                        layout
                        animate={shouldReduceMotion ? undefined : {
                          borderColor: isDesktopActive ? 'rgba(255,255,255,0.88)' : 'rgb(9,9,11)',
                          color: isDesktopActive ? 'rgb(255,255,255)' : 'rgb(9,9,11)',
                        }}
                        transition={{
                          layout: { duration: 0.55, ease: softEase },
                          borderColor: { duration: 0.38, ease: softEase },
                          color: { duration: 0.38, ease: softEase },
                        }}
                        className="inline-flex w-fit items-center border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em]"
                      >
                        {step.label}
                      </motion.span>

                      <motion.span
                        layout
                        animate={shouldReduceMotion ? undefined : {
                          color: isDesktopActive ? 'rgb(255,255,255)' : 'rgb(9,9,11)',
                        }}
                        transition={{
                          layout: { duration: 0.6, ease: softEase },
                          color: { duration: 0.45, ease: softEase },
                        }}
                        className="block text-[clamp(5.25rem,7.5vw,9.5rem)] font-normal leading-[0.76] tracking-[-0.14em]"
                      >
                        {step.step}
                      </motion.span>

                      <motion.div layout className="grid gap-1"
                        transition={{ layout: { duration: 0.55, ease: softEase } }}
                      >
                        <motion.p
                          layout
                          animate={shouldReduceMotion ? undefined : {
                            color: isDesktopActive ? 'rgba(255,255,255,0.68)' : 'rgb(113,113,122)',
                          }}
                          transition={{
                            layout: { duration: 0.55, ease: softEase },
                            color: { duration: 0.38, ease: softEase },
                          }}
                          className="eyebrow"
                        >
                          {step.summary}
                        </motion.p>
                        <motion.h3
                          layout
                          animate={shouldReduceMotion ? undefined : {
                            color: isDesktopActive ? 'rgb(255,255,255)' : 'rgb(9,9,11)',
                          }}
                          transition={{
                            layout: { duration: 0.58, ease: softEase },
                            color: { duration: 0.42, ease: softEase },
                          }}
                          className="text-[clamp(1.15rem,1.8vw,1.7rem)] font-semibold uppercase leading-[1.15] tracking-[-0.03em]"
                        >
                          {step.title}
                        </motion.h3>
                      </motion.div>

                      <AnimatePresence initial={false} mode="popLayout">
                        {isDesktopActive ? (
                          <motion.div
                            layout
                            animate={shouldReduceMotion ? { opacity: 1, y: 0 } : 'visible'}
                            className="grid max-w-[15rem] gap-3 overflow-hidden"
                            exit={shouldReduceMotion ? { opacity: 0, y: 0 } : 'exit'}
                            initial={shouldReduceMotion ? { opacity: 0, y: 0 } : 'hidden'}
                            variants={desktopDetailVariants}
                          >
                            <motion.p className="text-sm leading-6 text-white/86" variants={desktopDetailLineVariants}>
                              {step.detail}
                            </motion.p>
                            <motion.p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-white/72" variants={desktopDetailLineVariants}>
                              {step.outcome}
                            </motion.p>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
