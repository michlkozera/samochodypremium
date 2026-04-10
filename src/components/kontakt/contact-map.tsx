'use client';

import { contactAddress } from '@/data/site';
import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';

export function ContactMap() {
  const query = encodeURIComponent(contactAddress);

  return (
    <section className="border-b border-zinc-200/60 bg-zinc-50">
      <MotionReveal className="grid" stagger={0.12} amount={0.1}>
        {/* Header */}
        <div className="site-shell py-12 sm:py-16 lg:py-20">
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
            <div className="grid gap-4">
              <MotionRevealItem>
                <p className="eyebrow">Lokalizacja / 03</p>
              </MotionRevealItem>
              <MotionRevealItem preset="blur-fade" duration={1}>
                <h2 className="section-title">
                  Znajdź nas na mapie.
                </h2>
              </MotionRevealItem>
            </div>
            <MotionRevealItem>
              <p className="body-copy max-w-md lg:ml-auto">
                Nasz warsztat i biuro projektowe znajdziesz pod adresem{' '}
                <span className="font-semibold text-zinc-950">{contactAddress}</span>.
                Zapraszamy po wcześniejszym umówieniu wizyty.
              </p>
            </MotionRevealItem>
          </div>
        </div>

        {/* Map embed */}
        <MotionRevealItem preset="fade-up" duration={1}>
          <div className="relative h-[28rem] w-full overflow-hidden sm:h-[32rem] lg:h-[36rem]">
            <iframe
              allowFullScreen
              className="absolute inset-0 h-full w-full grayscale transition-[filter] duration-500 hover:grayscale-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${query}&zoom=15`}
              title="Lokalizacja Meble Premium"
            />
          </div>
        </MotionRevealItem>
      </MotionReveal>
    </section>
  );
}
