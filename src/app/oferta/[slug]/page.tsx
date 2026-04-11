import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { SitePage } from '@/components/layout/site-page';
import { VehicleGallery } from '@/components/katalog/vehicle-gallery';
import { VehicleInfo } from '@/components/katalog/vehicle-info';
import { VehicleSpecs } from '@/components/katalog/vehicle-specs';
import { VehicleEquipment } from '@/components/katalog/vehicle-equipment';
import { VehicleContact } from '@/components/katalog/vehicle-contact';
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
      <main className="flex flex-col">
        <section className="border-b border-zinc-200/60 bg-[radial-gradient(circle_at_top_left,rgba(244,244,245,0.95),rgba(255,255,255,0.98)_48%,rgba(250,250,250,0.95)_100%)] pt-[calc(var(--site-header-h)+1.25rem)]">
          <div className="site-shell py-6 sm:py-8 lg:py-10">
            <MotionReveal
              amount={0.15}
              className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-10 xl:gap-14"
              stagger={0.12}
            >
              <MotionRevealItem preset="slide-left">
                <VehicleGallery
                  alt={`${vehicle.make} ${vehicle.model}`}
                  images={vehicle.images}
                />
              </MotionRevealItem>
              <MotionRevealItem preset="slide-right">
                <VehicleInfo vehicle={vehicle} />
              </MotionRevealItem>
            </MotionReveal>
          </div>
        </section>

        <VehicleSpecs specs={vehicle.specs} />

        <VehicleEquipment
          description={vehicle.description}
          features={vehicle.features}
        />

        <VehicleContact vehicle={vehicle} />
      </main>
    </SitePage>
  );
}
