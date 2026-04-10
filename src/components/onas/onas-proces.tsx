'use client';

import { assets } from '@/data/assets';
import { AppImage } from '@/components/ui/app-image';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';
import type { StaticImageData } from 'next/image';

type Step = {
  index: string;
  title: string;
  description: string;
  image?: StaticImageData;
};

const steps: Step[] = [
  {
    index: '01',
    title: 'Rozmowa i weryfikacja potrzeb',
    description:
      'Analizujemy rzuty, zdjęcia i wytyczne. Określamy zakres, budżet ramowy oraz harmonogram, zanim przejdziemy do projektowania.',
  },
  {
    index: '02',
    title: 'Pomiar i dokumentacja techniczna',
    description:
      'Nasz technolog wykonuje pomiar laserowy na miejscu. Dokumentacja trafia do działu projektowego jako punkt zero dla całej realizacji.',
    image: assets.wycena01,
  },
  {
    index: '03',
    title: 'Projekt koncepcyjny i dobór materiałów',
    description:
      'Przygotowujemy wizualizacje i specyfikację materiałową. Każdy fornir, okucie i profil jest konsultowany przed zatwierdzeniem.',
  },
  {
    index: '04',
    title: 'Produkcja w manufakturze',
    description:
      'Elementy powstają na maszynach CNC i przechodzą ręczne wykończenie. Kontrola jakości na każdym etapie — od rozkroju po lakierowanie.',
    image: assets.materialy01,
  },
  {
    index: '05',
    title: 'Logistyka i transport',
    description:
      'Gotowe elementy pakujemy w dedykowane zabezpieczenia. Koordynujemy dostawę z harmonogramem budowy — bez przestojów.',
  },
  {
    index: '06',
    title: 'Montaż i odbiór końcowy',
    description:
      'Montaż prowadzi ten sam zespół, który projektował i produkował. Odbiór kończymy wspólną inspekcją i protokołem jakości.',
    image: assets.realizacje03,
  },
];

export function OnasProces() {
  return (
    <section className="section-block border-b border-zinc-200/60 bg-white">
      <div className="site-shell">
        <MotionReveal className="grid gap-10 lg:gap-14" stagger={0.08} amount={0.1}>
          {/* Header */}
          <MotionRevealItem preset="blur-fade">
            <div className="grid gap-4">
              <p className="eyebrow">Proces</p>
              <h2 className="section-title">
                Jak prowadzimy realizację od A do Z.
              </h2>
            </div>
          </MotionRevealItem>

          {/* Steps — horizontal scroll on mobile, grid on sm+ */}
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-px sm:overflow-visible sm:bg-zinc-200/60 sm:px-0 sm:pb-0 lg:grid-cols-3">
            {steps.map((step) => (
              <MotionRevealItem key={step.index} className="w-[80vw] flex-shrink-0 snap-start sm:w-auto" preset="scale-up">
                <article className="flex h-full flex-col overflow-hidden rounded-sm border border-zinc-200/60 bg-white sm:rounded-none sm:border-0">
                  {step.image ? (
                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      <AppImage
                        alt={step.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.03]"
                        loading="lazy"
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                        src={step.image}
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] w-full bg-zinc-50" />
                  )}

                  <div className="flex flex-1 flex-col gap-3 p-6 sm:p-7">
                    <span className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-semibold leading-none tracking-[-0.04em] text-zinc-300">
                      {step.index}
                    </span>
                    <h3 className="text-[0.8rem] font-semibold uppercase leading-6 tracking-[0.03em] text-zinc-950">
                      {step.title}
                    </h3>
                    <p className="mt-auto text-[0.82rem] leading-[1.7] text-zinc-500">
                      {step.description}
                    </p>
                  </div>
                </article>
              </MotionRevealItem>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
