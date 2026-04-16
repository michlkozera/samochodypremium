'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';

export function OnasHero() {
  return (
    <PageHero
      imageSrc={assets.heroOnas}
      sectionClassName="!min-h-[58svh] lg:!min-h-[64svh]"
      eyebrow={
        <>
          <Link href="/" className="transition-colors duration-200 hover:text-white">
            Start
          </Link>{' '}
          / O nas
        </>
      }
      title="Poznaj nasz zespół."
      description="Łączymy doświadczenie, transparentny proces i realne wsparcie przy zakupie samochodów klasy premium."
      actions={[{ href: '/kontakt', label: 'Skontaktuj się z nami' }]}
      titleClassName="text-[clamp(1.8rem,6.2vw,3.6rem)]"
    />
  );
}
