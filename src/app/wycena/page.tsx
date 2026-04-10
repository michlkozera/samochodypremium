import type { Metadata } from 'next';
import { SitePage } from '@/components/layout/site-page';
import { WycenaHero } from '@/components/wycena/wycena-hero';

export const metadata: Metadata = {
  title: 'Odkup | Samochody Premium',
  description:
    'Sprzedaj swój samochód premium. Interaktywny kalkulator odkupu, transparentna wycena i szybka realizacja w ciągu 48 godzin.',
};

export default function WycenaPage() {
  return (
    <SitePage page="wycena" pageClass="page-wycena">
      <main className="flex flex-col">
        <WycenaHero />
      </main>
    </SitePage>
  );
}