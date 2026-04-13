'use client';

import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';
import { HeroSearch } from '@/components/home/hero-search';

export function HomeHero() {
  return (
    <PageHero
      imageSrc={assets.heroMain}
      eyebrow="Warszawa / wyselekcjonowane egzemplarze / bezkompromisowa jakość"
      title="Wyselekcjonowane samochody klasy premium."
      searchComponent={<HeroSearch buttonLabel="Zobacz katalog" buttonHref="/oferta" />}
    />
  );
}
