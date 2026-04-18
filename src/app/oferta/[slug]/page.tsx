import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SitePage } from '@/components/layout/site-page';
import { VehicleGallery } from '@/components/katalog/vehicle-gallery';
import { VehicleVideoTile } from '@/components/katalog/vehicle-video-tile';
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
        <section className="bg-white pt-[var(--site-header-h)]">
          {/* Mobile: gallery full-width, no side padding */}
          <div className="lg:hidden">
            <VehicleGallery
              alt={`${vehicle.make} ${vehicle.model}`}
              images={vehicle.images}
              statusLabel={vehicle.statusLabel}
              status={vehicle.status}
            />
            {vehicle.youtubeUrl ? (
              <VehicleVideoTile
                title={`${vehicle.make} ${vehicle.model}`}
                embedUrl={vehicle.youtubeEmbedUrl}
                watchUrl={vehicle.youtubeUrl}
              />
            ) : null}
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
                  <div className="grid gap-4">
                    <VehicleGallery
                      alt={`${vehicle.make} ${vehicle.model}`}
                      images={vehicle.images}
                      statusLabel={vehicle.statusLabel}
                      status={vehicle.status}
                    />
                    {vehicle.youtubeUrl ? (
                      <VehicleVideoTile
                        title={`${vehicle.make} ${vehicle.model}`}
                        embedUrl={vehicle.youtubeEmbedUrl}
                        watchUrl={vehicle.youtubeUrl}
                      />
                    ) : null}
                  </div>
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
        <section className="bg-[linear-gradient(180deg,rgba(250,250,250,0.94)_0%,rgba(255,255,255,1)_100%)] py-14 sm:py-16 lg:py-20">
          <div className="site-shell grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end sm:gap-10">
            <div className="grid gap-3">
              <p className="text-[0.68rem] font-medium uppercase tracking-[0.22em] text-zinc-500">
                Przeglądaj dalej
              </p>
              <h2 className="section-title !max-w-none !font-medium">
                Zobacz pozostałe oferty.
              </h2>
            </div>
            <Link
              className="home-cta self-start text-zinc-950 hover:text-zinc-500 sm:self-end"
              href="/oferta"
            >
              Wróć do katalogu
              <svg className="home-cta-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
              <span className="home-cta-line" />
            </Link>
          </div>
        </section>

      </main>
    </SitePage>
  );
}
