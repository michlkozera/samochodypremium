import type { Metadata } from 'next';
import { assets } from '@/data/assets';
import { homeStudioPillars } from '@/data/home';
import { SitePage } from '@/components/layout/site-page';
import { OfferAccordion } from '@/components/home/offer-accordion';
import { PricingSection } from '@/components/home/pricing-section';
import { ProcessSection } from '@/components/home/process-section';
import { RealizationsSlider } from '@/components/home/realizations-slider';
import { AppImage } from '@/components/ui/app-image';
import { HomeHero } from '@/components/home/home-hero';

export const metadata: Metadata = {
  title: 'Samochody Premium | Wyselekcjonowane auta klasy premium w Warszawie',
  description:
    'Oferujemy starannie wyselekcjonowane samochody klasy premium. Każdy egzemplarz z pełną historią serwisową, gwarancją pochodzenia i bezkompromisową jakością.',
};

export default function HomePage() {
  return (
    <SitePage page="home" pageClass="page-home">
      <main className="flex flex-col">
        {/* ── Hero ── */}
        <HomeHero />

        {/* ── Process ── */}
        <ProcessSection />

        {/* ── Realizacje ── */}
        <section className="section-block border-b border-zinc-200/60 bg-white">
          <div className="site-shell grid gap-8 lg:gap-10">
            <div className="grid gap-4">
              <p className="eyebrow" data-reveal="up">
                Nasze realizacje
              </p>
              <h2 className="section-title" data-reveal="up">
                Wyselekcjonowane egzemplarze z naszego portfolio.
              </h2>
            </div>

            <RealizationsSlider />
          </div>
        </section>

        {/* ── Oferta ── */}
        <section className="section-block border-b border-zinc-200/60 bg-zinc-50">
          <div className="site-shell grid gap-8 xl:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] xl:items-center xl:gap-10">
            <div className="grid max-w-xl gap-5" data-reveal="up">
              <p className="eyebrow">Oferta</p>
              <h2 className="section-title max-w-[8ch]">Cztery kategorie aut premium w jednym salonie.</h2>
              <p className="body-copy max-w-lg">
                Sedany, SUV-y, sportowe i elektryczne — każdy pojazd przechodzi naszą wielopunktową inspekcję,
                ma potwierdzoną historię i jest objęty gwarancją dealerską.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a className="btn-premium w-full sm:w-fit" href="/kontakt">
                  Kontakt
                </a>
                <a className="btn-premium-ghost w-full sm:w-fit" href="/oferta">
                  Przejdź do oferty
                </a>
              </div>
              <div className="grid gap-px sm:grid-cols-2">
                <div className="grid gap-2 py-4 sm:py-5 sm:pr-5">
                  <span className="eyebrow text-zinc-400">Kategorie</span>
                  <p className="text-sm leading-7 text-zinc-600">Sedany, SUV-y, sportowe, elektryczne — cztery główne segmenty naszej oferty.</p>
                </div>
                <div className="grid gap-2 border-t border-zinc-200/60 py-4 sm:border-l sm:border-t-0 sm:py-5 sm:pl-5">
                  <span className="eyebrow text-zinc-400">Standard</span>
                  <p className="text-sm leading-7 text-zinc-600">Każdy pojazd z pełną historią, gwarancją i profesjonalnym przygotowaniem.</p>
                </div>
              </div>
            </div>

            <OfferAccordion />
          </div>
        </section>

        {/* ── O nas ── */}
        <section className="section-block bg-zinc-50">
          <div className="site-shell grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">

            <figure className="onas-image-wrap group relative hidden overflow-hidden lg:block lg:min-h-0" data-reveal="up">
              <AppImage
                alt="Salon samochodowy Samochody Premium w Warszawie"
                className="onas-image h-full w-full object-cover"
                loading="lazy"
                src={assets.showroom}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 hidden p-5 sm:block sm:p-6 lg:p-8">
                <span className="eyebrow text-zinc-400">O salonie</span>
              </figcaption>
            </figure>

            <div className="flex flex-col justify-between gap-8 py-6 sm:p-8 lg:p-10 xl:p-12">
              <div className="grid gap-5 pt-2">
                <p className="eyebrow" data-reveal="up" style={{ transitionDelay: '100ms' }}>O nas</p>
                <h2 className="section-title tracking-tight" data-reveal="up" style={{ transitionDelay: '200ms' }}>
                  Dealer premium zamknięty w jednym standardzie jakości.
                </h2>
                <p className="body-copy max-w-2xl" data-reveal="up" style={{ transitionDelay: '300ms' }}>
                  Ponad dekada doświadczenia w obrocie samochodami premium pozwala nam utrzymać najwyższy standard
                  selekcji, pełną transparentność historii i bezkompromisową jakość obsługi.
                </p>
              </div>

              <div className="grid gap-0 sm:grid-cols-3" data-reveal="up" style={{ transitionDelay: '420ms' }}>
                {homeStudioPillars.map((pillar, index) => (
                  <article
                    className="grid gap-3 border-t border-zinc-200/60 py-5 pr-5 first:sm:border-t sm:py-6"
                    key={pillar.index}
                  >
                    {index === 0 ? (
                      <figure className="relative overflow-hidden lg:hidden">
                        <AppImage
                          alt="Salon samochodowy Samochody Premium"
                          className="aspect-[16/10] w-full object-cover"
                          loading="lazy"
                          src={assets.showroom}
                        />
                      </figure>
                    ) : null}
                    <span className="eyebrow text-zinc-400">{pillar.index}</span>
                    <h3 className="text-[0.8rem] font-semibold uppercase leading-5 tracking-[0.04em] text-zinc-950">
                      {pillar.title}
                    </h3>
                    <p className="text-xs leading-6 text-zinc-500">{pillar.copy}</p>
                  </article>
                ))}
              </div>

              <div className="grid gap-6" data-reveal="up" style={{ transitionDelay: '540ms' }}>
                <div className="border-t border-zinc-200/60 pt-5" />
                <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 sm:gap-6">
                  {[
                    ['12', 'lat na rynku'],
                    ['800+', 'sprzedanych aut'],
                    ['100%', 'zweryfikowanych'],
                  ].map(([num, label]) => (
                    <div key={label} className="grid min-w-0 gap-1">
                      <span className="text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-none tracking-[-0.04em] text-zinc-950">
                        {num}
                      </span>
                      <span className="eyebrow text-zinc-400 [overflow-wrap:anywhere]">{label}</span>
                    </div>
                  ))}
                </div>
                <a className="btn-premium w-full sm:w-fit" href="/onas">
                  Poznaj nasz salon
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── Wycena ── */}
        <section className="section-block border-b border-zinc-200/60 bg-zinc-950 text-white">
          <div className="site-shell grid gap-8 lg:gap-10">
            <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <div className="grid gap-4">
                <p className="eyebrow text-zinc-500" data-reveal="up">
                  Finansowanie
                </p>
                <h2 className="section-title text-white" data-reveal="up">
                  Cztery kroki do Twojego nowego auta.
                </h2>
              </div>
              <a
                className="btn-premium-ghost w-full border-white/20 text-white hover:bg-white hover:text-zinc-950 sm:w-fit"
                data-reveal="up"
                href="/wycena"
              >
                Sprzedaj swoje auto
              </a>
            </div>

            <PricingSection />
          </div>
        </section>
      </main>
    </SitePage>
  );
}
