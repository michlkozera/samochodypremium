'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';

export function KontaktHero() {
  return (
    <PageHero
      imageSrc={assets.heroKontakt}
      eyebrow={
        <>
          <Link href="/" className="transition-colors duration-200 hover:text-white">
            Start
          </Link>{' '}
          / Kontakt
        </>
      }
      title="Rozmowa, której efektem jest Twoje nowe auto."
      description="Zaczynamy od konkretu — Twoich preferencji, budżetu i oczekiwań. Po pierwszym kontakcie otrzymasz spersonalizowaną propozycję."
      actions={[{ href: '/wycena', label: 'Sprawdź wycenę' }]}
    />
  );
}
