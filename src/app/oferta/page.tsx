import type { Metadata } from 'next';
import { SitePage } from '@/components/layout/site-page';
import { OfertaHero } from '@/components/oferta/oferta-hero';
import { CollaborationCTA } from '@/components/oferta/collaboration-cta';
import { CatalogClient } from '@/components/katalog/catalog-client';
import { getCatalogFilterOptions, getCatalogVehicles } from '@/lib/vehicle-catalog';

export const metadata: Metadata = {
  title: 'Oferta | Samochody Premium',
  description:
    'Przeglądaj aktualną ofertę wyselekcjonowanych samochodów premium. Mercedes-AMG, Porsche, Audi RS, BMW M — każdy egzemplarz z pełną historią serwisową.',
};

export default async function OfertaPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const [vehicles, filterOptions, params] = await Promise.all([
    getCatalogVehicles(),
    getCatalogFilterOptions(),
    searchParams,
  ]);

  const initialSearch = typeof params.search === 'string' ? params.search : '';

  return (
    <SitePage page="oferta" pageClass="page-oferta">
      <main className="flex flex-col">
        <OfertaHero />
        <CatalogClient 
          vehicles={vehicles} 
          filterOptions={filterOptions} 
          initialSearch={initialSearch}
        />
        <CollaborationCTA />
      </main>
    </SitePage>
  );
}
