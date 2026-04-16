'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';

export function KontaktHero() {
  return (
    <PageHero
      imageSrc={assets.heroKontakt}
      sectionClassName="!min-h-[58svh] lg:!min-h-[64svh]"
      eyebrow={
        <>
          <Link href="/" className="transition-colors duration-200 hover:text-white">
            Start
          </Link>{' '}
          / Kontakt
        </>
      }
      title="Skontaktuj się z nami."
      description="Preferencje, budżet, oczekiwania — napisz, a przygotujemy spersonalizowaną propozycję."
      actions={[{ href: '/oferta', label: 'Przeglądaj ofertę' }]}
      titleClassName="text-[clamp(2rem,7vw,4.6rem)]"
    />
  );
}
