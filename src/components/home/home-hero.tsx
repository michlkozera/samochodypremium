'use client';

import { assets } from '@/data/assets';
import { PageHero } from '@/components/layout/page-hero';

export function HomeHero() {
  return (
    <PageHero
      imageSrc={assets.heroMain}
      eyebrow="Warszawa / wyselekcjonowane egzemplarze / bezkompromisowa jakość"
      title="Wyselekcjonowane samochody klasy premium."
      description="Starannie wybrane auta z pełną historią, transparentną selekcją i wsparciem od pierwszej rozmowy po odbiór kluczyków."
      actions={[
        { href: '/oferta', label: 'Zobacz ofertę' },
        { href: '/kontakt', label: 'Skontaktuj się' },
      ]}
    />
  );
}
