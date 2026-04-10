import type { Metadata } from 'next';
import { SitePage } from '@/components/layout/site-page';
import { OfertaHero } from '@/components/oferta/oferta-hero';
import { PrecisionPhilosophy } from '@/components/oferta/precision-philosophy';
import { SolutionsCatalog } from '@/components/oferta/solutions-catalog';
import { RawMaterials } from '@/components/oferta/raw-materials';
import { CollaborationCTA } from '@/components/oferta/collaboration-cta';

export const metadata: Metadata = {
  title: 'Oferta | Meble Premium',
  description:
    'Zabudowy na wymiar w technicznym reżimie. Kuchnie, garderoby, zabudowy salonowe i realizacje B2B projektowane jako część architektury wnętrza.',
};

export default function OfertaPage() {
  return (
    <SitePage page="oferta" pageClass="page-oferta">
      <main className="flex flex-col">
        {/* ── Hero ── */}
        <OfertaHero />

        {/* ── Filozofia Precyzji ── */}
        <PrecisionPhilosophy />

        {/* ── Katalog Rozwiązań ── */}
        <SolutionsCatalog />

        {/* ── Surowa Materia i Standardy ── */}
        <RawMaterials />

        {/* ── Współpraca + CTA ── */}
        <CollaborationCTA />
      </main>
    </SitePage>
  );
}
