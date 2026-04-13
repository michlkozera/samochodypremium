'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';

export function WycenaHero() {
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
      title="Odkup w trybie decyzji, nie domysłów."
      description="Wycena Twojego auta, transparentna oferta i szybka realizacja — wszystko w ciągu 48 godzin od pierwszego kontaktu."
      actions={[{ href: '/kontakt', label: 'Skontaktuj się' }]}
    />
  );
}
