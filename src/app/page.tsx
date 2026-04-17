import type { Metadata } from 'next';
import { SitePage } from '@/components/layout/site-page';
import { HomeHero } from '@/components/home/home-hero';
import { HomeStatsSection } from '@/components/home/home-stats-section';
import { BodyTypeSection } from '@/components/home/body-type-section';
import { LatestOffers } from '@/components/home/latest-offers';
import { getCatalogVehicles } from '@/lib/vehicle-catalog';

export const metadata: Metadata = {
  title: 'Samochody Premium | Wyselekcjonowane auta klasy premium w Warszawie',
  description:
    'Starannie wyselekcjonowane samochody klasy premium z pełną historią serwisową, gwarancją pochodzenia i kompleksową obsługą.',
};

export default async function HomePage() {
  const vehicles = await getCatalogVehicles();

  return (
    <SitePage page="home" pageClass="page-home">
      <main className="flex flex-col">
        {/* ── Hero ── */}
        <HomeHero />

        {/* ── Stats ── */}
        <HomeStatsSection vehicleCount={vehicles.length} />

        <div className="border-b border-zinc-200/60" aria-hidden="true" />

        {/* ── Search by body type ── */}
        <BodyTypeSection />

        {/* ── Latest Offers ── */}
        <LatestOffers vehicles={vehicles} />
      </main>
    </SitePage>
  );
}
