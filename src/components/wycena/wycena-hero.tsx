'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';

export function WycenaHero() {
  return (
    <PageHero
      imageSrc={assets.heroOdkup}
      sectionClassName="!min-h-[58svh] lg:!min-h-[64svh]"
      eyebrow={
        <>
          <Link href="/" className="transition-colors duration-200 hover:text-white">
            Start
          </Link>{' '}
          / Wycena
        </>
      }
      title="Wycena bez domysłów."
      description="Sprawdź orientacyjną wartość odkupu i przejdź do procesu sprzedaży auta na jasnych warunkach."
      actions={[{ href: '/kontakt', label: 'Skontaktuj się' }]}
      titleClassName="text-[clamp(1.8rem,6.2vw,3.6rem)]"
    />
  );
}
