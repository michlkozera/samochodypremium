import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { vehicles, getVehicleBySlug } from '@/data/vehicles';
import { SitePage } from '@/components/layout/site-page';
import { VehicleGallery } from '@/components/katalog/vehicle-gallery';
import { VehicleInfo } from '@/components/katalog/vehicle-info';
import { VehicleSpecs } from '@/components/katalog/vehicle-specs';
import { VehicleEquipment } from '@/components/katalog/vehicle-equipment';
import { VehicleContact } from '@/components/katalog/vehicle-contact';

/* ── Static params for SSG ── */
export function generateStaticParams() {
  return vehicles.map((v) => ({ slug: v.slug }));
}

/* ── Dynamic metadata ── */
type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) return { title: 'Nie znaleziono | Samochody Premium' };

  return {
    title: `${vehicle.brand} ${vehicle.model} ${vehicle.year} | Samochody Premium`,
    description: vehicle.shortDescription,
  };
}

/* ── Page component ── */
export default async function VehicleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const vehicle = getVehicleBySlug(slug);
  if (!vehicle) notFound();

  return (
    <SitePage page="oferta" pageClass="page-oferta-detail">
      <main className="flex flex-col">
        {/* ── Top section: gallery + key info ── */}
        <section className="border-b border-zinc-200/60 bg-white pt-[calc(var(--site-header-h)+1rem)]">
          <div className="site-shell py-6 sm:py-8 lg:py-10">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 xl:gap-14">
              <VehicleGallery
                alt={`${vehicle.brand} ${vehicle.model}`}
                images={vehicle.gallery}
              />
              <VehicleInfo vehicle={vehicle} />
            </div>
          </div>
        </section>

        {/* ── Technical specifications ── */}
        <VehicleSpecs specs={vehicle.specs} />

        {/* ── Description & equipment ── */}
        <VehicleEquipment
          description={vehicle.fullDescription}
          equipment={vehicle.equipment}
        />

        {/* ── CTA: contact form + advisor ── */}
        <VehicleContact vehicle={vehicle} />
      </main>
    </SitePage>
  );
}
