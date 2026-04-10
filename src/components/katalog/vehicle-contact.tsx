'use client';

import { type Vehicle } from '@/data/vehicles';

type VehicleContactProps = {
  vehicle: Vehicle;
};

export function VehicleContact({ vehicle }: VehicleContactProps) {
  const { advisor } = vehicle;

  return (
    <section className="bg-white" id="kontakt-oferta">
      {/* ── Dark header ── */}
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
              Napisz do nas lub zadzwoń — odpowiemy w ciągu godziny w godzinach
              pracy salonu. Umówimy prezentację i jazdę próbną.
            </p>
            {/* Advisor card */}
            <div className="flex flex-wrap items-center gap-6 border-t border-white/10 pt-6">
              {/* Advisor avatar placeholder */}
              <div className="flex h-14 w-14 items-center justify-center bg-zinc-800 text-[0.8rem] font-bold text-zinc-400">
                {advisor.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div className="grid gap-1">
                <span className="text-sm font-semibold text-white">{advisor.name}</span>
                <span className="text-[0.72rem] text-zinc-500">{advisor.role}</span>
              </div>
              <div className="flex flex-wrap gap-5 sm:ml-auto">
                <div className="grid gap-0.5">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-zinc-600">Telefon</span>
                  <a className="text-sm font-semibold text-white transition-colors duration-200 hover:text-zinc-300" href={advisor.phoneHref}>
                    {advisor.phone}
                  </a>
                </div>
                <div className="grid gap-0.5">
                  <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-zinc-600">Email</span>
                  <a className="text-sm font-semibold text-white transition-colors duration-200 hover:text-zinc-300" href={advisor.emailHref}>
                    {advisor.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Contact form ── */}
      <div className="site-shell py-12 sm:py-16 lg:py-20 xl:py-24">
        <form className="mx-auto grid max-w-4xl gap-0">
          {/* Hidden: vehicle info for backend */}
          <input name="vehicle_slug" type="hidden" value={vehicle.slug} />
          <input name="vehicle_name" type="hidden" value={`${vehicle.brand} ${vehicle.model}`} />

          {/* Name + Email */}
          <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12">
            <div className="group border-b border-zinc-200 py-5 sm:py-6">
              <div className="flex items-baseline gap-3 pb-3">
                <span className="text-[0.65rem] font-semibold tabular-nums tracking-[0.24em] text-zinc-300 transition-colors duration-300 group-focus-within:text-zinc-950">01</span>
                <label className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-400 transition-colors duration-300 group-focus-within:text-zinc-950" htmlFor="vf-name">
                  Imię i nazwisko
                </label>
              </div>
              <input
                autoComplete="name"
                className="w-full border-0 bg-transparent px-0 text-[0.95rem] font-medium text-zinc-950 outline-none placeholder:text-zinc-400"
                id="vf-name"
                name="name"
                placeholder="Jan Kowalski"
                required
                type="text"
              />
            </div>

            <div className="group border-b border-zinc-200 py-5 sm:py-6">
              <div className="flex items-baseline gap-3 pb-3">
                <span className="text-[0.65rem] font-semibold tabular-nums tracking-[0.24em] text-zinc-300 transition-colors duration-300 group-focus-within:text-zinc-950">02</span>
                <label className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-400 transition-colors duration-300 group-focus-within:text-zinc-950" htmlFor="vf-email">
                  Adres e-mail
                </label>
              </div>
              <input
                autoComplete="email"
                className="w-full border-0 bg-transparent px-0 text-[0.95rem] font-medium text-zinc-950 outline-none placeholder:text-zinc-400"
                id="vf-email"
                name="email"
                placeholder="adres@firma.pl"
                required
                type="email"
              />
            </div>
          </div>

          {/* Phone + Interest */}
          <div className="grid gap-0 lg:grid-cols-2 lg:gap-x-12">
            <div className="group border-b border-zinc-200 py-5 sm:py-6">
              <div className="flex items-baseline gap-3 pb-3">
                <span className="text-[0.65rem] font-semibold tabular-nums tracking-[0.24em] text-zinc-300 transition-colors duration-300 group-focus-within:text-zinc-950">03</span>
                <label className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-400 transition-colors duration-300 group-focus-within:text-zinc-950" htmlFor="vf-phone">
                  Telefon
                </label>
              </div>
              <input
                autoComplete="tel"
                className="w-full border-0 bg-transparent px-0 text-[0.95rem] font-medium text-zinc-950 outline-none placeholder:text-zinc-400"
                id="vf-phone"
                name="phone"
                placeholder="+48 123 456 789"
                type="tel"
              />
            </div>

            <div className="group border-b border-zinc-200 py-5 sm:py-6">
              <div className="flex items-baseline gap-3 pb-3">
                <span className="text-[0.65rem] font-semibold tabular-nums tracking-[0.24em] text-zinc-300 transition-colors duration-300 group-focus-within:text-zinc-950">04</span>
                <span className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-400">
                  Zainteresowanie
                </span>
              </div>
              <div className="flex flex-wrap gap-2 py-1">
                {['Prezentacja', 'Jazda próbna', 'Finansowanie', 'Trade-in', 'Inne'].map((opt) => (
                  <label className="cursor-pointer" key={opt}>
                    <input className="peer sr-only" name="interest" type="checkbox" value={opt.toLowerCase()} />
                    <span className="inline-flex h-8 items-center border border-zinc-200 px-3 text-[0.72rem] font-medium text-zinc-500 transition-all duration-200 peer-checked:border-zinc-950 peer-checked:bg-zinc-950 peer-checked:text-white hover:border-zinc-400">
                      {opt}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="group border-b border-zinc-200 py-5 sm:py-6">
            <div className="flex items-baseline gap-3 pb-3">
              <span className="text-[0.65rem] font-semibold tabular-nums tracking-[0.24em] text-zinc-300 transition-colors duration-300 group-focus-within:text-zinc-950">05</span>
              <label className="text-[0.72rem] font-semibold uppercase tracking-[0.22em] text-zinc-400 transition-colors duration-300 group-focus-within:text-zinc-950" htmlFor="vf-message">
                Wiadomość
              </label>
            </div>
            <textarea
              className="min-h-28 w-full border-0 bg-transparent px-0 text-[0.95rem] font-medium text-zinc-950 outline-none placeholder:text-zinc-400 sm:min-h-36"
              id="vf-message"
              name="message"
              placeholder="Opisz swoje oczekiwania — preferowany termin prezentacji, forma finansowania, pytania dotyczące pojazdu..."
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col gap-4 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-sm text-[0.72rem] leading-relaxed text-zinc-400">
              Wysyłając formularz akceptujesz naszą politykę prywatności. Odpowiadamy w ciągu 1h w godzinach pracy.
            </p>
            <button className="btn-premium min-h-12 w-full px-8 sm:w-fit" type="submit">
              Wyślij zapytanie
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
