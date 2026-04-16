import type { Metadata } from 'next';
import { SitePage } from '@/components/layout/site-page';
import { OdkupHero } from '@/components/odkup/odkup-hero';
import { OdkupForm } from '@/components/odkup/odkup-form';

export const metadata: Metadata = {
  title: 'Odkup samochodu | Samochody Premium',
  description:
    'Sprzedaj samochód bez stresu. Oferujemy uczciwą wycenę, jasne warunki i sprawną realizację odkupu lub sprzedaży komisowej.',
};

export default function OdkupPage() {
  return (
    <SitePage page="odkup" pageClass="page-odkup">
      <main className="flex flex-col">
        <OdkupHero />
        <OdkupForm />
      </main>
    </SitePage>
  );
}
