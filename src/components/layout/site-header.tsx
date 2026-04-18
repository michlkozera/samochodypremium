'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getHeaderLinks, type PageKey } from '@/data/site';

export type SiteHeaderMode = 'hero' | 'solid';

type SiteHeaderProps = {
  page: PageKey;
  mode?: SiteHeaderMode;
};

export function SiteHeader({ page, mode = 'hero' }: SiteHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const links = getHeaderLinks(page);
  const hasHero = mode === 'hero';
  const isTransparent = hasHero && !isScrolled && !isMenuOpen;

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('menu-open', isMenuOpen);
    return () => document.body.classList.remove('menu-open');
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = event.target;

      if (!(target instanceof HTMLElement)) {
        return;
      }

      if (target.closest('#mobnav') || target.closest('#burg')) {
        return;
      }

      setIsMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClick);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClick);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const linkClass = (isCurrent: boolean) =>
    [
      'nav-link-line inline-flex items-center px-3 py-2 text-[0.72rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ease-out',
      isTransparent
        ? isCurrent
          ? 'text-white'
          : 'text-white/60 hover:text-white'
        : isCurrent
          ? 'text-zinc-950'
          : 'text-zinc-400 hover:text-zinc-950',
      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2',
    ].join(' ');

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 border-b transition duration-200 ease-out',
          isMenuOpen
            ? 'border-transparent bg-zinc-950'
            : isScrolled
              ? 'border-zinc-200/60 bg-white/95 shadow-[0_12px_32px_rgba(0,0,0,0.04)] backdrop-blur-md'
              : hasHero
                ? 'border-b-0 bg-transparent'
                : 'border-zinc-200/60 bg-white/92 shadow-[0_10px_28px_rgba(0,0,0,0.04)] backdrop-blur-md',
        ].join(' ')}
        id="hdr"
      >
        <div className="site-shell">
          <div className="grid h-16 grid-cols-[auto_1fr_auto] items-center gap-3 sm:h-20">
            <Link
              aria-label="Samochody Premium - strona główna"
              className={[
                'inline-flex items-center border-0 text-[1.1rem] font-semibold uppercase tracking-[0.28em] transition-colors duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2',
                isTransparent || isMenuOpen
                  ? 'text-white hover:text-white/70'
                  : 'text-zinc-950 hover:text-zinc-500',
              ].join(' ')}
              href="/"
            >
              Samochody Premium
            </Link>

            <nav
              aria-label="Nawigacja główna"
              className="hidden md:col-span-2 md:flex md:flex-wrap md:items-center md:justify-end md:gap-2 md:-mr-3"
            >
              {links.map((link) => (
                <Link
                  aria-current={link.current ? 'page' : undefined}
                  className={linkClass(Boolean(link.current))}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <button
              aria-controls="mobnav"
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
              className={[
                'relative col-end-4 ml-auto inline-flex h-10 w-10 items-center justify-center transition duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 md:hidden',
                isTransparent || isMenuOpen
                  ? 'bg-transparent text-white hover:bg-white hover:text-zinc-950'
                  : 'bg-transparent text-zinc-950 hover:bg-zinc-950 hover:text-white',
              ].join(' ')}
              id="burg"
              onClick={() => setIsMenuOpen((open) => !open)}
              type="button"
            >
              <span className="sr-only">Menu</span>
              <span
                aria-hidden="true"
                className={[
                  'absolute h-0.5 w-5 bg-current transition duration-200 ease-out',
                  isMenuOpen ? 'translate-y-0 rotate-45' : '-translate-y-1.5',
                ].join(' ')}
              />
              <span
                aria-hidden="true"
                className={[
                  'absolute h-0.5 w-5 bg-current transition duration-200 ease-out',
                  isMenuOpen ? 'opacity-0' : 'opacity-100',
                ].join(' ')}
              />
              <span
                aria-hidden="true"
                className={[
                  'absolute h-0.5 w-5 bg-current transition duration-200 ease-out',
                  isMenuOpen ? 'translate-y-0 -rotate-45' : 'translate-y-1.5',
                ].join(' ')}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        aria-hidden={!isMenuOpen}
        className={[
          'fixed inset-0 z-40 flex flex-col bg-zinc-950 px-4 pb-10 pt-24 text-white transition duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden',
          isMenuOpen ? 'visible opacity-100' : 'pointer-events-none invisible opacity-0',
        ].join(' ')}
        id="mobnav"
      >
        <div className="site-shell flex flex-1 flex-col justify-between">
          <nav className="grid">
            {links.map((link) => (
              <Link
                aria-current={link.current ? 'page' : undefined}
                className={[
                  'border-b border-white/10 px-0 py-5 text-[clamp(1.15rem,5vw,1.8rem)] font-semibold uppercase tracking-[-0.03em] transition-colors duration-200 ease-out',
                  link.current ? 'text-white/40' : 'text-white hover:text-white/60',
                ].join(' ')}
                href={link.href}
                key={`mobile-${link.href}`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto grid gap-3 border-t border-white/10 pt-6">
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-white/40">
              Samochody Premium - Warszawa
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
