'use client';

import { motion, useReducedMotion, type Variants, type Transition } from 'framer-motion';
import type { ReactNode, CSSProperties } from 'react';

const EASE = [0.16, 1, 0.3, 1] as const;

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

/* ── Variant presets ── */

const variantPresets = {
  'fade-up': {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-down': {
    hidden: { opacity: 0, y: -28 },
    visible: { opacity: 1, y: 0 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-up': {
    hidden: { opacity: 0, scale: 0.92 },
    visible: { opacity: 1, scale: 1 },
  },
  'blur-fade': {
    hidden: { opacity: 0, filter: 'blur(8px)', y: 16 },
    visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
  },
  'clip-up': {
    hidden: { opacity: 0, clipPath: 'inset(100% 0 0 0)' },
    visible: { opacity: 1, clipPath: 'inset(0% 0 0 0)' },
  },
} as const satisfies Record<string, Variants>;

export type MotionPreset = keyof typeof variantPresets;

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  amount?: number;
  style?: CSSProperties;
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  stagger = 0,
  once = true,
  amount = 0.25,
  style,
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      style={style}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger || 0.1,
            delayChildren: delay,
          },
        },
      }}
      viewport={{ once, amount }}
      whileInView="visible"
    >
      {children}
    </motion.div>
  );
}

type MotionRevealItemProps = {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  preset?: MotionPreset;
  duration?: number;
};

export function MotionRevealItem({
  children,
  className,
  style,
  preset = 'fade-up',
  duration = 0.8,
}: MotionRevealItemProps) {
  const v = variantPresets[preset];
  return (
    <motion.div
      className={className}
      style={style}
      variants={{
        hidden: v.hidden,
        visible: {
          ...v.visible,
          transition: { duration, ease: EASE } as Transition,
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function MotionFadeUp({
  children,
  className,
  delay = 0,
  once = true,
  amount = 0.25,
  style,
}: MotionRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      style={style}
      variants={fadeUpVariants}
      viewport={{ once, amount }}
      whileInView="visible"
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
