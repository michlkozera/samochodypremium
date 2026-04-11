'use client';

import { MotionReveal, MotionRevealItem } from '@/components/ui/motion-reveal';
import { type CatalogVehicleDetail } from '@/lib/vehicle-catalog';

type VehicleContactProps = {
  vehicle: CatalogVehicleDetail;
};

export function VehicleContact({ vehicle }: VehicleContactProps) {
  const { advisor } = vehicle;

  return (
    <section className="bg-[linear-gradient(180deg,rgba(250,250,250,1)_0%,rgba(244,244,245,0.82)_100%)]" id="kontakt-oferta">
      <div className="border-b border-zinc-200/60 bg-zinc-950 text-white">
        <div className="site-shell grid gap-8 py-14 sm:py-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16 lg:py-20 xl:py-24">
          <div className="grid gap-5">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-zinc-500">
              Kontakt / zapytanie
            </p>
            <h2 className="max-w-[14ch] text-[clamp(2rem,5.5vw,3.8rem)] font-semibold uppercase leading-[0.95] tracking-[-0.04em] text-white">
              Zainteresowany tym autem?
            </h2>
          </div>
          <div className="grid gap-6">
            <p className="max-w-md text-[0.94rem] leading-[1.8] text-zinc-400">
              Napisz do nas lub zadzwonimy do Ciebie z pelna oferta, historia serwisowa i
              mozliwosciami finansowania dla tego egzemplarza.
            </p>
            <div className="flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/6 text-[0.8rem] font-bold text-zinc-300">
                {advisor.name
                  .split(' ')
                  .map((part) => part[0])
                  .join('')}
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-semibold text-white">{advisor.name}</span>
                <span className="text-[0.72rem] text-zinc-500">{advisor.role}</span>
              </div>
              <div className="flex flex-wrap gap-5 sm:ml-auto">
                <div className="grid gap-0.5">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-zinc-600">
                    Telefon
                  </span>
                  <a
                    className="text-sm font-semibold text-white transition-colors duration-200 hover:text-zinc-300"
                    href={advisor.phoneHref}
                  >
                    {advisor.phone}
                  </a>
                </div>
                <div className="grid gap-0.5">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-zinc-600">
                    Email
                  </span>
                  <a
                    className="text-sm font-semibold text-white transition-colors duration-200 hover:text-zinc-300"
                    href={advisor.emailHref}
                  >
                    {advisor.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-shell py-12 sm:py-16 lg:py-20 xl:py-24">
        <MotionReveal
          amount={0.12}
          className="offer-surface mx-auto grid max-w-5xl gap-8 p-6 sm:p-8 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:p-10"
          stagger={0.08}
        >
          <MotionRevealItem className="grid gap-5 self-start">
            <div className="flex flex-wrap gap-2">
              <span className="offer-chip">Dedykowana obsluga</span>
              <span className="offer-chip">{vehicle.make} {vehicle.model}</span>
            </div>
            <div className="grid gap-3">
              <p className="eyebrow">Formularz kontaktowy</p>
              <h3 className="text-[clamp(1.6rem,4vw,2.5rem)] font-semibold uppercase leading-[1.02] tracking-[-0.04em] text-zinc-950">
                Umow prezentacje, telefon lub oferte finansowania.
              </h3>
              <p className="text-[0.9rem] leading-[1.8] text-zinc-500">
                Ten sam standard, co w kafelkach i galerii: jasna struktura, delikatne
                podswietlenie i wyrazne akcje bez przypadkowych stylow.
              </p>
            </div>
          </MotionRevealItem>

          <MotionRevealItem>
            <form className="grid gap-4">
              <input name="vehicle_slug" type="hidden" value={vehicle.slug} />
              <input name="vehicle_name" type="hidden" value={`${vehicle.make} ${vehicle.model}`} />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label
                    className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-500"
                    htmlFor="vf-name"
                  >
                    Imie i nazwisko
                  </label>
                  <input
                    autoComplete="name"
                    className="offer-input"
                    id="vf-name"
                    name="name"
                    placeholder="Jan Kowalski"
                    required
                    type="text"
                  />
                </div>

                <div className="grid gap-2">
                  <label
                    className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-500"
                    htmlFor="vf-email"
                  >
                    Adres e-mail
                  </label>
                  <input
                    autoComplete="email"
                    className="offer-input"
                    id="vf-email"
                    name="email"
                    placeholder="adres@firma.pl"
                    required
                    type="email"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2">
                  <label
                    className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-500"
                    htmlFor="vf-phone"
                  >
                    Telefon
                  </label>
                  <input
                    autoComplete="tel"
                    className="offer-input"
                    id="vf-phone"
                    name="phone"
                    placeholder="+48 123 456 789"
                    type="tel"
                  />
                </div>

                <div className="grid gap-2">
                  <span className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                    Zakres rozmowy
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {['Prezentacja', 'Jazda probna', 'Finansowanie', 'Trade-in', 'Inne'].map(
                      (option) => (
                        <label className="cursor-pointer" key={option}>
                          <input
                            className="peer sr-only"
                            name="interest"
                            type="checkbox"
                            value={option.toLowerCase()}
                          />
                          <span className="inline-flex h-11 items-center rounded-full border border-zinc-200 bg-white/80 px-4 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-zinc-500 transition-all duration-300 peer-checked:border-zinc-950 peer-checked:bg-zinc-950 peer-checked:text-white hover:border-zinc-400 hover:text-zinc-900">
                            {option}
                          </span>
                        </label>
                      ),
                    )}
                  </div>
                </div>
              </div>

              <div className="grid gap-2">
                <label
                  className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-zinc-500"
                  htmlFor="vf-message"
                >
                  Wiadomosc
                </label>
                <textarea
                  className="offer-textarea"
                  id="vf-message"
                  name="message"
                  placeholder={`Interesuje mnie ${vehicle.make} ${vehicle.model}. Prosze o kontakt.`}
                />
              </div>

              <div className="flex flex-col gap-4 border-t border-zinc-200/70 pt-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="max-w-sm text-[0.76rem] leading-[1.7] text-zinc-500">
                  Wysylajac formularz akceptujesz polityke prywatnosci. Odpowiadamy zwykle w
                  ciagu 1h w godzinach pracy.
                </p>
                <button className="btn-premium min-h-12 w-full px-8 sm:w-fit" type="submit">
                  Wyslij zapytanie
                </button>
              </div>
            </form>
          </MotionRevealItem>
        </MotionReveal>
      </div>
    </section>
  );
}
