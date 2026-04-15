'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { solutionsCatalog } from '@/data/oferta-page';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

const ease = [0.22, 1, 0.36, 1] as const;
const softEase = [0.16, 1, 0.3, 1] as const;

const panelVariants: Variants = {
  hidden: { height: 0, opacity: 0 },
  visible: {
    height: 'auto',
    opacity: 1,
    transition: {
      height: { duration: 0.54, ease },
      opacity: { duration: 0.26, delay: 0.12, ease: softEase },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      opacity: { duration: 0.16, ease: 'easeOut' },
      height: { duration: 0.36, delay: 0.05, ease: [0.4, 0, 1, 1] },
    },
  },
};

const contentVariants: Variants = {
  hidden: { opacity: 0, y: 18, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { delayChildren: 0.04, staggerChildren: 0.08, duration: 0.42, ease: softEase },
  },
  exit: {
    opacity: 0,
    y: 10,
    filter: 'blur(2px)',
    transition: { duration: 0.22, ease: 'easeOut' },
  },
};

const lineVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: softEase } },
  exit: { opacity: 0, y: 8, transition: { duration: 0.18, ease: 'easeOut' } },
};

export function SolutionsCatalog() {
  const [openIndex, setOpenIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="section-block border-b border-zinc-200/60 bg-white">
      <div className="site-shell">
        <MotionReveal className="grid gap-10 lg:gap-14" stagger={0.1} amount={0.15}>
          {/* Header */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:items-end lg:gap-16">
            <MotionRevealItem preset="slide-left">
              <div className="grid gap-4">
                <p className="eyebrow">Katalog rozwiązań</p>
                <h2 className="text-[clamp(1.85rem,5vw,3.4rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] [text-wrap:balance]">
                  Pięć filarów jednego systemu zabudów.
                </h2>
              </div>
            </MotionRevealItem>
            <MotionRevealItem preset="slide-right">
              <p className="body-copy max-w-xl lg:text-right">
                Każdy filar oferty prowadzony jest tym samym rygorystycznym standardem — od
                pomiarów, przez projekt i produkcję, po montaż finalny.
              </p>
            </MotionRevealItem>
          </div>

          {/* Accordion */}
          <MotionRevealItem preset="fade-up">
            <div className="grid gap-3">
              {solutionsCatalog.map((item, index) => {
                const isOpen = index === openIndex;
                const panelId = `solutions-panel-${index}`;

                return (
                  <motion.article
                    animate={{
                      backgroundColor: isOpen ? '#09090b' : '#fafafa',
                      borderColor: isOpen ? '#09090b' : '#d4d4d8',
                    }}
                    className="overflow-hidden border"
                    key={item.id}
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
                          {item.tag} / {item.subtitle}
                        </motion.span>
                        <motion.h3
                          animate={{ color: isOpen ? '#ffffff' : '#09090b', y: isOpen ? 0 : 2 }}
                          className="max-w-[20ch] text-[clamp(1.2rem,3vw,2rem)] font-semibold leading-[1.1] tracking-[-0.02em]"
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
                            className="grid gap-5 border-t border-white/10 px-4 pb-5 pt-5 sm:px-5 sm:pb-6 lg:px-6 lg:pb-7"
                            exit="exit"
                            initial="hidden"
                            variants={contentVariants}
                            animate="visible"
                          >
                            <motion.p
                              className="max-w-[56ch] text-sm leading-7 text-zinc-200 sm:text-[0.97rem]"
                              variants={lineVariants}
                            >
                              {item.description}
                            </motion.p>

                            {/* Specs grid */}
                            <motion.div
                              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
                              variants={lineVariants}
                            >
                              {item.specs.map(([label, value]) => (
                                <div
                                  className="grid gap-1.5 border-t border-white/[0.06] pt-3"
                                  key={label}
                                >
                                  <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-zinc-500">
                                    {label}
                                  </span>
                                  <span className="text-sm font-medium leading-[1.6] text-zinc-300">
                                    {value}
                                  </span>
                                </div>
                              ))}
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      ) : null}
                    </AnimatePresence>
                  </motion.article>
                );
              })}
            </div>
          </MotionRevealItem>
        </MotionReveal>
      </div>
    </section>
  );
}
