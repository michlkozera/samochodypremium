'use client';

import { useEffect } from 'react';

const HASH_SCROLL_RETRIES = 8;

function getHeaderOffset() {
  const header = document.getElementById('hdr');
  const rootStyles = getComputedStyle(document.documentElement);
  const cssHeaderHeight = Number.parseFloat(rootStyles.getPropertyValue('--home-header-h'));
  const headerHeight = header?.getBoundingClientRect().height ?? (Number.isFinite(cssHeaderHeight) ? cssHeaderHeight : 72);

  return headerHeight + 10;
}

function scrollToHash(hash: string, updateHistory: boolean, behavior: ScrollBehavior) {
  const targetId = decodeURIComponent(hash.replace(/^#/, ''));
  const element = document.getElementById(targetId);

  if (!element) {
    return false;
  }

  const top = Math.max(0, window.scrollY + element.getBoundingClientRect().top - getHeaderOffset());

  window.scrollTo({
    top,
    behavior,
  });

  if (updateHistory && window.location.hash !== hash) {
    window.history.pushState(null, '', hash);
  }

  return true;
}

function queueHashScroll(hash: string, updateHistory: boolean, behavior: ScrollBehavior, attempt = 0) {
  if (scrollToHash(hash, updateHistory, behavior) || attempt >= HASH_SCROLL_RETRIES) {
    return;
  }

  window.requestAnimationFrame(() => {
    queueHashScroll(hash, updateHistory, behavior, attempt + 1);
  });
}

export function SectionScrollHandler() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const scrollBehavior: ScrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

    const onDocumentClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest('a[href]');
      if (!(anchor instanceof HTMLAnchorElement) || anchor.target || anchor.hasAttribute('download')) {
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) {
        return;
      }

      const targetId = decodeURIComponent(url.hash.replace(/^#/, ''));
      if (!document.getElementById(targetId)) {
        return;
      }

      event.preventDefault();
      queueHashScroll(url.hash, true, scrollBehavior);
    };

    const onHashChange = () => {
      if (!window.location.hash) return;
      queueHashScroll(window.location.hash, false, scrollBehavior);
    };

    if (window.location.hash) {
      queueHashScroll(window.location.hash, false, 'auto');
    }

    document.addEventListener('click', onDocumentClick);
    window.addEventListener('hashchange', onHashChange);

    return () => {
      document.removeEventListener('click', onDocumentClick);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  return null;
}
