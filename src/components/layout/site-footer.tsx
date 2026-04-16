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
    <footer className="border-t border-zinc-200 bg-zinc-950 text-white">
      <div className="site-shell grid gap-10 py-14 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)_minmax(0,0.8fr)]">
        <div className="grid gap-5">
          <Link
            aria-label="Samochody Premium - strona główna"
            className="inline-flex w-fit items-center border border-white/16 px-4 py-3 text-[0.76rem] font-semibold uppercase tracking-[0.24em] text-white transition duration-200 ease-out hover:-translate-y-0.5 hover:border-white/40"
            href="/"
          >
            Samochody Premium
          </Link>
          <p className="max-w-xl text-sm leading-7 text-zinc-400 sm:text-base">
            Warszawski salon samochodów klasy premium. Wyselekcjonowane egzemplarze, pełna historia serwisowa
            i wysoki standard obsługi na każdym etapie zakupu.
          </p>
        </div>

        <div className="grid gap-4">
          <p className="eyebrow border-0 px-0 py-0 text-zinc-500">Nawigacja</p>
          <ul className="grid gap-3 text-sm text-zinc-300">
            {footerNavigation[page].map((link) => (
              <li key={`${page}-${link.href}`}>
                <Link className="transition-colors duration-200 hover:text-white" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4">
          <p className="eyebrow border-0 px-0 py-0 text-zinc-500">Kontakt</p>
          <ul className="grid gap-3 text-sm text-zinc-300">
            <li>
              <a className="transition-colors duration-200 hover:text-white" href={contactPhoneHref}>
                {contactPhone}
              </a>
            </li>
            <li>
              <a className="transition-colors duration-200 hover:text-white" href={contactEmailHref}>
                {contactEmail}
              </a>
            </li>
            <li>
              <Link className="transition-colors duration-200 hover:text-white" href="/kontakt">
                {contactAddress}
              </Link>
            </li>
            <li>
              <Link className="transition-colors duration-200 hover:text-white" href="/kontakt">
                {contactSchedule}
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="site-shell grid gap-4 border-t border-white/10 py-5 text-xs uppercase tracking-[0.2em] text-zinc-500 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
        <p>&copy; 2026 Samochody Premium. Wszelkie prawa zastrzeżone.</p>
        <div className="flex flex-wrap gap-5">
          <Link className="transition-colors duration-200 hover:text-white" href="/">
            Powrót na start
          </Link>
          <Link className="transition-colors duration-200 hover:text-white" href="/kontakt">
            Kontakt
          </Link>
        </div>
      </div>
    </footer>
  );
}
