import Link from 'next/link';
import {
  contactAddress,
  contactEmail,
  contactEmailHref,
  contactPhone,
  contactPhoneHref,
  contactSchedule,
  footerNavigation,
  type PageKey,
} from '@/data/site';

type SiteFooterProps = {
  page: PageKey;
};

export function SiteFooter({ page }: SiteFooterProps) {
  return (
    <footer className="border-t border-zinc-200 bg-white text-zinc-950">
      <div className="site-shell grid gap-10 py-14 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]">
        <div className="grid gap-5">
          <Link
            aria-label="Samochody Premium - strona główna"
            className="inline-flex w-fit items-center border border-zinc-200 px-4 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-zinc-950 transition duration-200 ease-out hover:-translate-y-0.5 hover:border-zinc-950"
            href="/"
          >
            Samochody Premium
          </Link>
          <p className="max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">
            Warszawski salon samochodów klasy premium. Wyselekcjonowane egzemplarze, pełna historia serwisowa
            i wysoki standard obsługi na każdym etapie zakupu.
          </p>
        </div>

        <div className="grid gap-4">
          <p className="eyebrow border-0 px-0 py-0 text-zinc-500">Nawigacja</p>
          <ul className="grid gap-3 text-sm text-zinc-600">
            {footerNavigation[page].map((link) => (
              <li key={`${page}-${link.href}`}>
                <Link className="transition-colors duration-200 hover:text-zinc-950" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4">
          <p className="eyebrow border-0 px-0 py-0 text-zinc-500">Kontakt</p>
          <ul className="grid gap-3 text-sm text-zinc-600">
            <li>
              <a className="transition-colors duration-200 hover:text-zinc-950" href={contactPhoneHref}>
                {contactPhone}
              </a>
            </li>
            <li>
              <a className="transition-colors duration-200 hover:text-zinc-950" href={contactEmailHref}>
                {contactEmail}
              </a>
            </li>
            <li>
              <Link className="transition-colors duration-200 hover:text-zinc-950" href="/kontakt">
                {contactAddress}
              </Link>
            </li>
            <li>
              <Link className="transition-colors duration-200 hover:text-zinc-950" href="/kontakt">
                {contactSchedule}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-shell grid gap-4 border-t border-zinc-200 py-5 text-xs uppercase tracking-[0.2em] text-zinc-500 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <p>&copy; 2026 Samochody Premium. Wszelkie prawa zastrzeżone.</p>
        <div className="flex flex-wrap gap-5">
          <Link className="transition-colors duration-200 hover:text-zinc-950" href="/">
            Powrót na start
          </Link>
          <Link className="transition-colors duration-200 hover:text-zinc-950" href="/kontakt">
            Kontakt
          </Link>
        </div>
      </div>
    </footer>
  );
}
