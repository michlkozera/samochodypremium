'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';

export function KatalogHero() {
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
      title="Katalog pojazdów premium."
      description="Przeglądaj naszą aktualną ofertę wyselekcjonowanych samochodów. Każdy egzemplarz z pełną historią i gwarancją dealerską."
      sectionClassName="min-h-[520px]"
      titleClassName="text-[clamp(2.4rem,8vw,5rem)]"
    />
  );
}
