'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';

type VehicleGalleryProps = {
  images: StaticImageData[];
  alt: string;
};

export function VehicleGallery({ images, alt }: VehicleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex];

  return (
    <div className="grid gap-3">
      {/* ── Main image ── */}
      <div className="relative aspect-[16/10] overflow-hidden bg-zinc-100 sm:aspect-[16/9]">
        <Image
          alt={`${alt} — zdjęcie ${activeIndex + 1}`}
          className="h-full w-full object-cover"
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 1024px) 100vw, 60vw"
          src={activeImage}
        />
        {/* Image counter */}
        <span className="absolute bottom-3 right-3 inline-flex h-7 items-center bg-black/60 px-2.5 text-[0.68rem] font-semibold tabular-nums text-white backdrop-blur-sm">
          {activeIndex + 1} / {images.length}
        </span>
      </div>

      {/* ── Thumbnails ── */}
      <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            aria-label={`Pokaż zdjęcie ${i + 1}`}
            className={`relative h-16 w-24 shrink-0 overflow-hidden transition-all duration-200 sm:h-20 sm:w-28 ${
              i === activeIndex
                ? 'ring-2 ring-zinc-950 ring-offset-1'
                : 'opacity-60 hover:opacity-100'
            }`}
            key={i}
            onClick={() => setActiveIndex(i)}
            type="button"
          >
            <Image
              alt={`${alt} — miniatura ${i + 1}`}
              className="h-full w-full object-cover"
              fill
              sizes="120px"
              src={img}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
