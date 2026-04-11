import type { Metadata } from 'next';
import { SitePage } from '@/components/layout/site-page';
import { OfertaHero } from '@/components/oferta/oferta-hero';
import { KatalogFilters } from '@/components/katalog/katalog-filters';
import { VehicleGrid } from '@/components/katalog/vehicle-grid';
import { CollaborationCTA } from '@/components/oferta/collaboration-cta';
import { getCatalogFilterOptions, getCatalogVehicles } from '@/lib/vehicle-catalog';

export const metadata: Metadata = {
  title: 'Oferta | Samochody Premium',
  description:
    'Przegladaj aktualna oferte wyselekcjonowanych samochodow premium. Mercedes-AMG, Porsche, Audi RS, BMW M - kazdy egzemplarz z pelna historia serwisowa.',
};

export default async function OfertaPage() {
  const [vehicles, filterOptions] = await Promise.all([
    getCatalogVehicles(),
    getCatalogFilterOptions(),
  ]);

  return (
    <SitePage page="oferta" pageClass="page-oferta">
      <main className="flex flex-col">
        <OfertaHero />
        <KatalogFilters options={filterOptions} totalCount={vehicles.length} />
        <VehicleGrid vehicles={vehicles} />
        <CollaborationCTA />
      </main>
    </SitePage>
  );
}
