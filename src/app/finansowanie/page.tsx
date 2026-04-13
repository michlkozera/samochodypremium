import type { Metadata } from 'next';
import { FinansowanieHero } from '@/components/finansowanie/finansowanie-hero';
import { SitePage } from '@/components/layout/site-page';

export const metadata: Metadata = {
  title: 'Finansowanie | Samochody Premium',
  description:
    'Leasing, kredyt i elastyczne formy finansowania samochodów premium. Otrzymaj wariant dopasowany do Twojego budżetu i sposobu zakupu.',
};

export default function FinansowaniePage() {
  return (
    <SitePage page="finansowanie" pageClass="page-finansowanie">
      <main className="flex flex-col">
        <FinansowanieHero />
      </main>
    </SitePage>
  );
}
