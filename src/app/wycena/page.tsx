import type { Metadata } from 'next';
import { SitePage } from '@/components/layout/site-page';
import { WycenaHero } from '@/components/wycena/wycena-hero';

export const metadata: Metadata = {
  title: 'Wycena | Meble Premium',
  description:
    'Interaktywna podstrona wyceny mebli na wymiar. Sprawdz scenariusze kosztowe, poznaj etapy wdrozenia i przejdz do kontaktu.',
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