import type { Metadata } from 'next';
import { SitePage } from '@/components/layout/site-page';
import { OnasHero } from '@/components/onas/onas-hero';
import { OnasDlaKogo } from '@/components/onas/onas-dla-kogo';
import { OnasLiczniki } from '@/components/onas/onas-liczniki';
import { OnasManufaktura } from '@/components/onas/onas-manufaktura';
import { OnasProces } from '@/components/onas/onas-proces';

export const metadata: Metadata = {
  title: 'O nas | Samochody Premium',
  description:
    'Poznaj zespół Samochody Premium. Łączymy doświadczenie, transparentny proces i realne wsparcie na każdym etapie zakupu auta.',
};

export default function OnasPage() {
  return (
    <SitePage page="onas" pageClass="page-onas">
      <main className="flex flex-col">
        <OnasHero />
        <OnasDlaKogo />
        <OnasLiczniki />
        <OnasManufaktura />
        <OnasProces />
      </main>
    </SitePage>
  );
}
