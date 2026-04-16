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
      title="Katalog samochodów."
      description="Sedany, SUV-y, auta sportowe i elektryczne. Każdy pojazd przechodzi pełną weryfikację przed publikacją oferty."
      actions={[{ href: '/kontakt', label: 'Skontaktuj się z doradcą' }]}
      titleClassName="text-[clamp(1.8rem,6.2vw,3.6rem)]"
    />
  );
}
