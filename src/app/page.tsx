import type { Metadata } from 'next';
import { assets } from '@/data/assets';
import { homeStudioPillars } from '@/data/home';
import { SitePage } from '@/components/layout/site-page';
import { OfferAccordion } from '@/components/home/offer-accordion';
import { PricingSection } from '@/components/home/pricing-section';
import { ProcessSection } from '@/components/home/process-section';
import { RealizationsSlider } from '@/components/home/realizations-slider';
import { AppImage } from '@/components/ui/app-image';
import { HomeHero } from '@/components/home/home-hero';

export const metadata: Metadata = {
  title: 'Samochody Premium | Wyselekcjonowane auta klasy premium w Warszawie',
  description:
    'Oferujemy starannie wyselekcjonowane samochody klasy premium. Każdy egzemplarz z pełną historią serwisową, gwarancją pochodzenia i bezkompromisową jakością.',
};

export default function HomePage() {
  return (
    <SitePage page="home" pageClass="page-home">
      <main className="flex flex-col">
        {/* ── Hero ── */}
        <HomeHero />
      </main>
    </SitePage>
  );
}
