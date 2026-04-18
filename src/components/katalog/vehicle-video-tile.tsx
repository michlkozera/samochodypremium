'use client';

import Link from 'next/link';
import { useState } from 'react';

const SHADOW = '0 4px 24px rgba(0,0,0,0.08), 0 1px 4px rgba(0,0,0,0.04)';

type VehicleVideoTileProps = {
  title: string;
  embedUrl?: string | null;
  watchUrl: string;
};

export function VehicleVideoTile({ title, embedUrl, watchUrl }: VehicleVideoTileProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="w-full bg-white" style={{ boxShadow: SHADOW }}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-zinc-500">
          Prezentacja wideo
        </p>
        <div className="flex items-center gap-5">
          <button
            type="button"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((current) => !current)}
            className="home-cta text-zinc-950 hover:text-zinc-500"
          >
            {isExpanded ? 'Zwiń film' : 'Rozwiń film'}
            <svg
              className={`home-cta-arrow transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            <span className="home-cta-line" />
          </button>
          {watchUrl ? (
            <Link
              href={watchUrl}
              target="_blank"
              rel="noreferrer"
              className="home-cta text-zinc-950 hover:text-zinc-500"
            >
              YouTube
              <svg className="home-cta-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-7.5 3L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
              <span className="home-cta-line" />
            </Link>
          ) : null}
        </div>
      </div>
      {isExpanded && embedUrl ? (
        <div className="relative aspect-video w-full border-t border-zinc-100 bg-zinc-100">
          <iframe
            src={embedUrl}
            title={`Prezentacja samochodu ${title}`}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
      ) : null}
      {isExpanded && !embedUrl ? (
        <div className="border-t border-zinc-100 px-5 py-5 text-[0.86rem] leading-relaxed text-zinc-600 sm:px-6">
          Nie udało się osadzić filmu dla tego linku. Otwórz materiał przez link YouTube.
        </div>
      ) : null}
    </section>
  );
}
