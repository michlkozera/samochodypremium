'use client';

import { rawMaterials } from '@/data/oferta-page';
import { AppImage } from '@/components/ui/app-image';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

export function RawMaterials() {
  return (
    <section className="section-block border-b border-zinc-200/60 bg-zinc-50">
      <div className="site-shell">
        <MotionReveal className="grid gap-10 lg:gap-14" stagger={0.08} amount={0.15}>
          {/* Header */}
          <MotionRevealItem preset="blur-fade">
            <div className="grid gap-4">
              <p className="eyebrow">Surowa materia</p>
              <h2 className="section-title max-w-[20ch]">
                Materiał wchodzi do projektu po weryfikacji, nie po katalogu.
              </h2>
            </div>
          </MotionRevealItem>

          {/* Cards — horizontal scroll on mobile, grid on sm+ */}
          <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-4 scrollbar-hide sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-px sm:overflow-visible sm:bg-zinc-200/60 sm:px-0 sm:pb-0 lg:grid-cols-3">
            {rawMaterials.map((material, i) => (
              <MotionRevealItem
                key={material.id}
                className="w-[80vw] flex-shrink-0 snap-start sm:w-auto"
                preset="scale-up"
              >
                <article className="flex h-full flex-col overflow-hidden rounded-sm border border-zinc-200/60 bg-white sm:rounded-none sm:border-0">
                  {/* Material image */}
                  <div className="relative aspect-[3/2] w-full overflow-hidden">
                    <AppImage
                      alt={material.title}
                      className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.04]"
                      loading="lazy"
                      sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw"
                      src={material.image}
                    />
                  </div>

                  <div className="flex flex-1 flex-col gap-5 p-6 sm:p-7">
                    <div className="flex items-baseline justify-between">
                      <span className="text-[clamp(1.4rem,2.5vw,1.8rem)] font-semibold leading-none tracking-[-0.04em] text-zinc-300">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[0.65rem] font-medium uppercase tracking-[0.22em] text-zinc-400">
                        {material.category}
                      </span>
                    </div>

                    <div className="grid gap-2">
                      <h3 className="text-[0.82rem] font-semibold uppercase tracking-[0.04em] text-zinc-950">
                        {material.title}
                      </h3>
                      <p className="text-[0.82rem] leading-[1.7] text-zinc-500">
                        {material.description}
                      </p>
                    </div>

                    <div className="mt-auto grid gap-3 border-t border-zinc-200/60 pt-4">
                      {material.params.map((param) => (
                        <div className="flex items-baseline justify-between gap-3 text-[0.72rem]" key={param.label}>
                          <span className="shrink-0 font-medium uppercase tracking-[0.12em] text-zinc-400">
                            {param.label}
                          </span>
                          <span className="h-px min-w-3 flex-1 bg-zinc-200/60" />
                          <span className="text-right font-medium text-zinc-700">
                            {param.value}
                          </span>
                        </div>
                      ))}
                    </div>
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
