import type { Metadata } from 'next';
import { SitePage } from '@/components/layout/site-page';
import { OdkupHero } from '@/components/odkup/odkup-hero';
import { OdkupForm } from '@/components/odkup/odkup-form';

export const metadata: Metadata = {
  title: 'Odkup samochodu | Samochody Premium',
  description:
    'Chcesz sprzedać swój samochód? Odkupimy lub pomożemy w sprzedaży — szybko, uczciwie i z pełną transparentnością. Wypełnij formularz zgłoszeniowy.',
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
