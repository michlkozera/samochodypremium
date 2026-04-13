'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';

export function OfertaHero() {
  return (
    <PageHero
      imageSrc={assets.heroOferta}
      eyebrow={
        <>
          <Link href="/" className="transition-colors duration-200 hover:text-white">
            Start
          </Link>{' '}
          / Oferta
        </>
      }
      title="Samochody wyselekcjonowane z precyzją."
      description="Sedany, SUV-y, sportowe i elektryczne — każdy pojazd przechodzi wieloetapową weryfikację."
      actions={[{ href: '/kontakt', label: 'Skontaktuj się' }]}
    />
  );
}
