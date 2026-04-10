import type { Metadata } from 'next';
import { SitePage } from '@/components/layout/site-page';
import { OfertaHero } from '@/components/oferta/oferta-hero';
import { KatalogFilters } from '@/components/katalog/katalog-filters';
import { VehicleGrid } from '@/components/katalog/vehicle-grid';
import { CollaborationCTA } from '@/components/oferta/collaboration-cta';

export const metadata: Metadata = {
  title: 'Oferta | Samochody Premium',
  description:
    'Przeglądaj aktualną ofertę wyselekcjonowanych samochodów premium. Mercedes-AMG, Porsche, Audi RS, BMW M — każdy egzemplarz z pełną historią serwisową.',
};

export default function OfertaPage() {
  return (
    <SitePage page="oferta" pageClass="page-oferta">
      <main className="flex flex-col">
        <OfertaHero />
        <KatalogFilters />
        <VehicleGrid />
        <CollaborationCTA />
      </main>
    </SitePage>
  );
}
