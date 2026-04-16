'use client';

import Link from 'next/link';
import { PageHero } from '@/components/layout/page-hero';
import { assets } from '@/data/assets';

export function FinansowanieHero() {
  return (
    <PageHero
      imageSrc={assets.heroOferta}
      sectionClassName="!min-h-[58svh] lg:!min-h-[64svh]"
      eyebrow={
        <>
          <Link className="transition-colors duration-200 hover:text-white" href="/">
            Start
          </Link>{' '}
          / Finansowanie
        </>
      }
      title="Elastyczne finansowanie."
      description="Organizujemy leasing i kredyt dla samochodów premium. Jedna rozmowa wystarczy, aby przygotować wariant dopasowany do budżetu i formy zakupu."
      actions={[{ href: '/kontakt', label: 'Skontaktuj się z doradcą' }]}
      titleClassName="text-[clamp(1.8rem,6.2vw,3.6rem)]"
    />
  );
}
