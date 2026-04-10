'use client';

import { useEffect, useRef, useState } from 'react';

type CountUpProps = {
  className?: string;
  value: number;
};

export function CountUp({ className, value }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            setDisplayValue(value);
            observer.unobserve(entry.target);
          });
        },
        { threshold: 0.6 }
      );

      observer.observe(element);
      return () => observer.disconnect();
    }

    let animationFrame = 0;
    let hasAnimated = false;

    const animate = () => {
      const start = performance.now();
      const duration = 1400;

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.round(value * eased));
        if (progress < 1) {
          animationFrame = window.requestAnimationFrame(step);
        }
      };

      animationFrame = window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || hasAnimated) return;
          hasAnimated = true;
          animate();
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <span className={className} ref={ref}>
      {displayValue}
    </span>
  );
}
