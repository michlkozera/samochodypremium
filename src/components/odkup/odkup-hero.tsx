'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';

export function OdkupHero() {
  return (
    <PageHero
      imageSrc={assets.heroOdkup}
      sectionClassName="!min-h-[58svh] lg:!min-h-[64svh]"
      eyebrow={
        <>
          <Link href="/" className="transition-colors duration-200 hover:text-white">
            Start
          </Link>{' '}
          / Odkup
        </>
      }
      title="Odkup pojazdu."
      description="Szybka wycena, uczciwa oferta i sprawna realizacja — sprzedaj swoje auto bez zbędnych formalności."
      actions={[{ href: '/kontakt', label: 'Skontaktuj się z doradcą' }]}
      titleClassName="text-[clamp(2rem,7vw,4.6rem)]"
    />
  );
}
