'use client';

import Link from 'next/link';
import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';

export function OnasHero() {
  return (
    <PageHero
      imageSrc={assets.heroOnas}
      eyebrow={
        <>
          <Link href="/" className="transition-colors duration-200 hover:text-white">
            Start
          </Link>{' '}
          / O nas
        </>
      }
      title="Salon zbudowany na zaufaniu."
      description="Zespół ekspertów motoryzacji, który łączy pasję, doświadczenie i transparentność w jeden niepodzielny standard obsługi."
      actions={[{ href: '/kontakt', label: 'Skontaktuj się' }]}
    />
  );
}
