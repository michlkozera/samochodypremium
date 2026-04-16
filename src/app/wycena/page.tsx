import type { Metadata } from 'next';
import { SitePage } from '@/components/layout/site-page';
import { WycenaHero } from '@/components/wycena/wycena-hero';

export const metadata: Metadata = {
  title: 'Wycena odkupu | Samochody Premium',
  description:
    'Sprawdź orientacyjną wartość odkupu samochodu premium. Transparentna wycena i szybkie przejście do procesu sprzedaży.',
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
