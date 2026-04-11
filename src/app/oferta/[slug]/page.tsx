import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SitePage } from '@/components/layout/site-page';
import { VehicleGallery } from '@/components/katalog/vehicle-gallery';
import { VehicleInfo } from '@/components/katalog/vehicle-info';
import { VehicleSpecs } from '@/components/katalog/vehicle-specs';
import { VehicleEquipment } from '@/components/katalog/vehicle-equipment';
import { VehicleContact } from '@/components/katalog/vehicle-contact';
import { VehicleMobileCta } from '@/components/katalog/vehicle-mobile-cta';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';
import { getCatalogVehicleBySlug } from '@/lib/vehicle-catalog';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = await getCatalogVehicleBySlug(slug);

  if (!vehicle) {
    return { title: 'Nie znaleziono | Samochody Premium' };
  }

  return {
    title: `${vehicle.make} ${vehicle.model} ${vehicle.year} | Samochody Premium`,
    description: vehicle.shortDescription,
  };
}

export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = await getCatalogVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  return (
    <SitePage headerMode="solid" page="oferta" pageClass="page-oferta-detail">
      {/* Sticky mobile CTA (fixed bar) */}
      <VehicleMobileCta vehicle={vehicle} />

      <main className="flex flex-col pb-[4.5rem] lg:pb-0">

        {/* ── Hero: gallery + info ── */}
        <section className="border-b border-zinc-200/60 bg-white pt-[var(--site-header-h)]">
          {/* Mobile: gallery full-width, no side padding */}
          <div className="lg:hidden">
            <VehicleGallery
              alt={`${vehicle.make} ${vehicle.model}`}
              images={vehicle.images}
            />
            <div className="px-4 py-6 sm:px-6">
              <VehicleInfo vehicle={vehicle} />
            </div>
          </div>

          {/* Desktop: side-by-side */}
          <div className="hidden lg:block">
            <div className="site-shell py-10 xl:py-12">
              <MotionReveal
                amount={0.12}
                className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] xl:gap-14"
                stagger={0.14}
              >
                <MotionRevealItem preset="slide-left" duration={0.9}>
                  <VehicleGallery
                    alt={`${vehicle.make} ${vehicle.model}`}
                    images={vehicle.images}
                  />
                </MotionRevealItem>

                <MotionRevealItem preset="slide-right" duration={0.9}>
                  <VehicleInfo vehicle={vehicle} />
                </MotionRevealItem>
              </MotionReveal>
            </div>
          </div>
        </section>

        {/* ── Specs ── */}
        <VehicleSpecs specs={vehicle.specs} />

        {/* ── Equipment ── */}
        <VehicleEquipment
          description={vehicle.description}
          features={vehicle.features}
        />

        {/* ── Contact form ── */}
        <VehicleContact vehicle={vehicle} />

        {/* ── Back to catalog ── */}
        <section className="border-b border-zinc-200/60 bg-zinc-950 py-10 sm:py-12">
          <div className="site-shell flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="grid gap-2">
              <p className="eyebrow text-zinc-500">Przeglądaj dalej</p>
              <p className="text-[0.94rem] font-semibold uppercase tracking-[-0.02em] text-white">
                Wróć do katalogu i odkryj więcej pojazdów.
              </p>
            </div>
            <Link
              className="btn-premium-light w-full sm:w-fit"
              href="/oferta"
            >
              Cały katalog
            </Link>
          </div>
        </section>

      </main>
    </SitePage>
  );
}
