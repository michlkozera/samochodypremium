'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function collectRevealElements() {
  return Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
}

export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const elements = collectRevealElements();

    if (elements.length === 0) {
      return;
    }

    if (reducedMotion) {
      elements.forEach((element) => element.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: '0px 0px -48px 0px' },
    );

    const observePendingElements = () => {
      collectRevealElements().forEach((element) => {
        if (!element.classList.contains('is-visible')) {
          observer.observe(element);
        }
      });
    };

    const frame = window.requestAnimationFrame(observePendingElements);
    const mutationObserver = new MutationObserver(() => {
      observePendingElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      window.cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
