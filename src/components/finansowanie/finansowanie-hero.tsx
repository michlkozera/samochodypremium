'use client';

import Link from 'next/link';
import { PageHero } from '@/components/layout/page-hero';
import { assets } from '@/data/assets';

export function FinansowanieHero() {
  return (
    <PageHero
      imageSrc={assets.heroOferta}
      eyebrow={
        <>
          <Link className="transition-colors duration-200 hover:text-white" href="/">
            Start
          </Link>{' '}
          / Finansowanie
        </>
      }
      title="Elastyczne finansowanie."
      description="Organizujemy leasing, kredyt i indywidualne scenariusze finansowania dla samochodów premium. Jedna rozmowa wystarczy, żeby przygotować wariant dopasowany do budżetu, firmy albo zakupu prywatnego."
      actions={[{ href: '/kontakt', label: 'Skontaktuj się z doradcą' }]}
    />
  );
}
