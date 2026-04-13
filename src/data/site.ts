export type PageKey = 'home' | 'oferta' | 'onas' | 'kontakt' | 'wycena' | 'finansowanie';

export type NavLink = {
  href: string;
  label: string;
  current?: boolean;
};

export type FooterLink = {
  href: string;
  label: string;
};

export const contactPhone = '+48 22 100 20 00';
export const contactPhoneHref = 'tel:+48221002000';
export const contactEmail = 'kontakt@samochodypremium.pl';
export const contactEmailHref = 'mailto:kontakt@samochodypremium.pl';
export const contactAddress = 'Al. Jerozolimskie 200, Warszawa';
export const contactSchedule = 'Pon-Pt / 9:00-18:00 · Sob / 10:00-14:00';

export const mobileMenuContent = {
  home: {
    label: 'Warszawa / samochody klasy premium',
    copy: 'Wyselekcjonowane egzemplarze z pełną historią serwisową, gwarancją pochodzenia i bezkompromisową jakością.',
    ctaHref: '/oferta',
    ctaLabel: 'Przeglądaj ofertę',
  },
  oferta: {
    label: 'Warszawa / samochody klasy premium',
    copy: 'Sedany, SUV-y, sportowe i elektryczne — każdy pojazd w naszej ofercie przeszedł wielopunktową inspekcję.',
    ctaHref: '/kontakt',
    ctaLabel: 'Umów jazdę próbną',
  },
  onas: {
    label: 'Warszawa / salon i serwis',
    copy: 'Ponad dekada doświadczenia w obrocie samochodami premium. Jakość, zaufanie i transparentność.',
    ctaHref: '/kontakt',
    ctaLabel: 'Umów wizytę',
  },
  kontakt: {
    label: 'Warszawa / salon samochodów premium',
    copy: 'Odwiedź nasz salon lub skontaktuj się online. Doradzimy w wyborze auta i pomożemy w finansowaniu.',
    ctaHref: '/oferta',
    ctaLabel: 'Zobacz ofertę',
  },
  wycena: {
    label: 'Warszawa / skup i odkup aut premium',
    copy: 'Sprzedajesz samochód? Otrzymasz uczciwą wycenę i szybką realizację transakcji.',
    ctaHref: '/kontakt',
    ctaLabel: 'Skontaktuj się',
  },
  finansowanie: {
    label: 'Warszawa / leasing i kredyt premium',
    copy: 'Przygotowujemy finansowanie skrojone pod samochody klasy premium, z szybką decyzją i wsparciem na każdym etapie.',
    ctaHref: '/kontakt',
    ctaLabel: 'Porozmawiaj z doradcą',
  },
} as const;

const defaultFooterLinks: FooterLink[] = [
  { href: '/', label: 'Start' },
  { href: '/oferta', label: 'Oferta' },
  { href: '/onas', label: 'O nas' },
  { href: '/wycena', label: 'Odkup' },
  { href: '/kontakt', label: 'Kontakt' },
];

export const footerNavigation: Record<PageKey, FooterLink[]> = {
  home: defaultFooterLinks,
  oferta: defaultFooterLinks,
  onas: defaultFooterLinks,
  kontakt: defaultFooterLinks,
  wycena: defaultFooterLinks,
  finansowanie: defaultFooterLinks,
};

export function getHeaderLinks(page: PageKey): NavLink[] {
  return [
    { href: '/', label: 'Start', current: page === 'home' },
    { href: '/oferta', label: 'Oferta', current: page === 'oferta' },
    { href: '/onas', label: 'O nas', current: page === 'onas' },
    { href: '/wycena', label: 'Odkup', current: page === 'wycena' },
    { href: '/kontakt', label: 'Kontakt', current: page === 'kontakt' },
  ];
}
