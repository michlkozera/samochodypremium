import type { Metadata } from 'next';
import { SitePage } from '@/components/layout/site-page';
import { HomeHero } from '@/components/home/home-hero';
import { LatestOffers } from '@/components/home/latest-offers';
import { getCatalogVehicles } from '@/lib/vehicle-catalog';

export const metadata: Metadata = {
  title: 'Samochody Premium | Wyselekcjonowane auta klasy premium w Warszawie',
  description:
    'Oferujemy starannie wyselekcjonowane samochody klasy premium. Każdy egzemplarz z pełną historią serwisową, gwarancją pochodzenia i bezkompromisową jakością.',
};

export default async function HomePage() {
  const vehicles = await getCatalogVehicles();

  return (
    <SitePage page="home" pageClass="page-home">
      <main className="flex flex-col">
        {/* ── Hero ── */}
        <HomeHero />

        {/* ── Latest Offers ── */}
        <LatestOffers vehicles={vehicles} />
      </main>
    </SitePage>
  );
}
