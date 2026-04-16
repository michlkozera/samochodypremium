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
      description="Doświadczenie, transparentność i pasja do motoryzacji premium — to fundamenty, na których działamy."
      actions={[{ href: '/kontakt', label: 'Skontaktuj się z nami' }]}
      titleClassName="text-[clamp(2rem,7vw,4.6rem)]"
    />
  );
}
