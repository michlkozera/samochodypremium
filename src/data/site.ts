export type PageKey = 'home' | 'oferta' | 'onas' | 'kontakt' | 'wycena' | 'finansowanie' | 'odkup';

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
export const contactSchedule = 'Pon.-Pt. / 9:00-18:00 · Sob. / 10:00-14:00';

export const mobileMenuContent = {
  home: {
    label: 'Warszawa / samochody klasy premium',
    copy: 'Wyselekcjonowane egzemplarze z pełną historią serwisową i gwarancją pochodzenia.',
    ctaHref: '/oferta',
    ctaLabel: 'Przeglądaj katalog',
  },
  oferta: {
    label: 'Warszawa / samochody klasy premium',
    copy: 'Sedany, SUV-y, modele sportowe i elektryczne po pełnej weryfikacji technicznej.',
    ctaHref: '/kontakt',
    ctaLabel: 'Umów jazdę próbną',
  },
  onas: {
    label: 'Warszawa / salon i serwis',
    copy: 'Ponad dekada doświadczenia, transparentny proces i wysoka jakość obsługi.',
    ctaHref: '/kontakt',
    ctaLabel: 'Umów wizytę',
  },
  kontakt: {
    label: 'Warszawa / salon samochodów premium',
    copy: 'Doradzimy w wyborze auta, finansowaniu i formalnościach. Odpowiadamy szybko i konkretnie.',
    ctaHref: '/oferta',
    ctaLabel: 'Zobacz ofertę',
  },
  wycena: {
    label: 'Warszawa / skup i odkup aut premium',
    copy: 'Sprzedajesz samochód? Otrzymasz uczciwą wycenę i jasne warunki odkupu.',
    ctaHref: '/kontakt',
    ctaLabel: 'Skontaktuj się',
  },
  finansowanie: {
    label: 'Warszawa / leasing i kredyt premium',
    copy: 'Leasing i kredyt dopasowane do auta, budżetu i formy zakupu.',
    ctaHref: '/kontakt',
    ctaLabel: 'Porozmawiaj z doradcą',
  },
  odkup: {
    label: 'Warszawa / odkup samochodów premium',
    copy: 'Odkupimy auto lub poprowadzimy sprzedaż komisową w bezpiecznym modelu rozliczenia.',
    ctaHref: '/kontakt',
    ctaLabel: 'Skontaktuj się',
  },
} as const;

const defaultFooterLinks: FooterLink[] = [
  { href: '/', label: 'Start' },
  { href: '/oferta', label: 'Oferta' },
  { href: '/onas', label: 'O nas' },
  { href: '/odkup', label: 'Odkup' },
  { href: '/kontakt', label: 'Kontakt' },
];

export const footerNavigation: Record<PageKey, FooterLink[]> = {
  home: defaultFooterLinks,
  oferta: defaultFooterLinks,
  onas: defaultFooterLinks,
  kontakt: defaultFooterLinks,
  wycena: defaultFooterLinks,
  finansowanie: defaultFooterLinks,
  odkup: defaultFooterLinks,
};

export function getHeaderLinks(page: PageKey): NavLink[] {
  return [
    { href: '/', label: 'Start', current: page === 'home' },
    { href: '/oferta', label: 'Oferta', current: page === 'oferta' },
    { href: '/onas', label: 'O nas', current: page === 'onas' },
    { href: '/odkup', label: 'Odkup', current: page === 'odkup' },
    { href: '/kontakt', label: 'Kontakt', current: page === 'kontakt' },
  ];
}
