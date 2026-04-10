import type { Metadata } from 'next';
import { SitePage } from '@/components/layout/site-page';
import { KontaktHero } from '@/components/kontakt/kontakt-hero';
import { ContactInfo } from '@/components/kontakt/contact-info';
import { ContactForm } from '@/components/kontakt/contact-form';
import { ContactMap } from '@/components/kontakt/contact-map';

export const metadata: Metadata = {
  title: 'Kontakt | Samochody Premium',
  description:
    'Kontakt z Samochody Premium. Napisz do nas w sprawie zakupu, odkupu lub finansowania — przygotujemy spersonalizowaną ofertę.',
};

export default function KontaktPage() {
  return (
    <SitePage page="kontakt" pageClass="page-kontakt">
      <main className="flex flex-col">
        <KontaktHero />

        {/* ── Sekcja 1: Dane kontaktowe ── */}
        <ContactInfo />

        {/* ── Sekcja 2: Formularz kontaktowy ── */}
        <ContactForm />

        {/* ── Sekcja 3: Mapa Google ── */}
        <ContactMap />
      </main>
    </SitePage>
  );
}