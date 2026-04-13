'use client';

import Link from 'next/link';
import { useState } from 'react';

type VehicleVideoTileProps = {
  title: string;
  embedUrl?: string | null;
  watchUrl: string;
};

export function VehicleVideoTile({ title, embedUrl, watchUrl }: VehicleVideoTileProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="mt-4 w-full max-w-xl border border-zinc-200 bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-zinc-200 px-4 py-3">
        <p className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Prezentacja video
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-expanded={isExpanded}
            onClick={() => setIsExpanded((current) => !current)}
            className="inline-flex items-center border border-zinc-950 bg-zinc-950 px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-zinc-950"
          >
            {isExpanded ? 'Zwin film' : 'Rozwin film'}
          </button>
          {watchUrl ? (
            <Link
              href={watchUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center border border-zinc-300 px-2.5 py-1 text-[0.56rem] font-semibold uppercase tracking-[0.16em] text-zinc-700 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white"
            >
              YouTube
            </Link>
          ) : null}
        </div>
      </div>
      {isExpanded && embedUrl ? (
        <div className="relative aspect-video w-full bg-zinc-100">
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
        <div className="border-t border-zinc-200 px-4 py-4 text-sm text-zinc-600">
          Nie udalo sie osadzic filmu w tym formacie linku. Otworz film przez przycisk YouTube.
        </div>
      ) : null}
    </section>
  );
}
