'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';

export function OdkupHero() {
  return (
    <PageHero
      imageSrc={assets.heroOdkup}
      eyebrow={
        <>
          <Link href="/" className="transition-colors duration-200 hover:text-white">
            Start
          </Link>{' '}
          / Odkup
        </>
      }
      title="Chcesz sprzedać swój samochód?"
      description="Odkupimy lub pomożemy w sprzedaży Twojego auta — szybko, uczciwie i z pełną transparentnością procesu."
      actions={[{ href: '/kontakt', label: 'Skontaktuj się' }]}
    />
  );
}
