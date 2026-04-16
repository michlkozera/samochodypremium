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
      title="Odkup samochodu."
      description="Szybka wycena, jasne warunki i sprawna realizacja. Sprzedaj auto bez zbędnych formalności."
      actions={[{ href: '/kontakt', label: 'Skontaktuj się z doradcą' }]}
      titleClassName="text-[clamp(1.8rem,6.2vw,3.6rem)]"
    />
  );
}
