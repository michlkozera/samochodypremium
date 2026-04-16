'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';

export function OfertaHero() {
  return (
    <PageHero
      imageSrc={assets.heroOferta}
      sectionClassName="!min-h-[58svh] lg:!min-h-[64svh]"
      eyebrow={
        <>
          <Link href="/" className="transition-colors duration-200 hover:text-white">
            Start
          </Link>{' '}
          / Oferta
        </>
      }
      title="Katalog oferty."
      description="Sedany, SUV-y, sportowe i elektryczne — każdy pojazd przechodzi wieloetapową weryfikację przed włączeniem do oferty."
      actions={[{ href: '/kontakt', label: 'Skontaktuj się z doradcą' }]}
      titleClassName="text-[clamp(2rem,7vw,4.6rem)]"
    />
  );
}
