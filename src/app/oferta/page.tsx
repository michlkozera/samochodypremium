import type { Metadata } from 'next';
import { SitePage } from '@/components/layout/site-page';
import { OfertaHero } from '@/components/oferta/oferta-hero';
import { CollaborationCTA } from '@/components/oferta/collaboration-cta';
import { CatalogClient } from '@/components/katalog/catalog-client';
import { getCatalogFilterOptions, getCatalogVehicles } from '@/lib/vehicle-catalog';

export const metadata: Metadata = {
  title: 'Oferta | Samochody Premium',
  description:
    'Aktualna oferta wyselekcjonowanych samochodów premium. Każdy egzemplarz po weryfikacji technicznej i z udokumentowaną historią serwisową.',
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
  const initialBody = typeof params.body === 'string' ? params.body : '';

  return (
    <SitePage page="oferta" pageClass="page-oferta">
      <main className="flex flex-col">
        <OfertaHero />
        <CatalogClient 
          vehicles={vehicles} 
          filterOptions={filterOptions} 
          initialSearch={initialSearch}
          initialBody={initialBody}
        />
        <CollaborationCTA />
      </main>
    </SitePage>
  );
}
