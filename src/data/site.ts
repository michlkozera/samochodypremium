export type PageKey = 'home' | 'oferta' | 'onas' | 'kontakt' | 'wycena';

export type NavLink = {
  href: string;
  label: string;
  current?: boolean;
};

export type FooterLink = {
  href: string;
  label: string;
};

export const contactPhone = '+48 123 456 789';
export const contactPhoneHref = 'tel:+48123456789';
export const contactEmail = 'kontakt@meblepremium.pl';
export const contactEmailHref = 'mailto:kontakt@meblepremium.pl';
export const contactAddress = 'ul. Rzemieślnicza 12, Warszawa';
export const contactSchedule = 'Pon-Pt / 9:00-18:00';

export const mobileMenuContent = {
  home: {
    label: 'Warszawa / projekt + produkcja + montaż',
    copy: 'Prowadzimy realizacje od pierwszego pomiaru po finalne spasowanie zabudowy.',
    ctaHref: '/wycena',
    ctaLabel: 'Przejdź do briefu',
  },
  oferta: {
    label: 'Warszawa / projekt + produkcja + montaż',
    copy: 'Projektujemy i wdrażamy zabudowy jako część architektury wnętrza, w jednym reżimie decyzji wykonawczych.',
    ctaHref: '/wycena',
    ctaLabel: 'Przejdź do wyceny',
  },
  onas: {
    label: 'Warszawa / warsztat / projekt / montaż',
    copy: 'Nie opowiadamy o rzemiośle w oderwaniu od wykonania. Każda decyzja wraca do materiału, geometrii i montażu.',
    ctaHref: '/kontakt',
    ctaLabel: 'Umów rozmowę',
  },
  kontakt: {
    label: 'Warszawa / projekt + produkcja + montaż',
    copy: 'Pracujemy na rzutach, wymiarach i realnych założeniach wykonawczych, bez rozmytego briefu.',
    ctaHref: '/wycena',
    ctaLabel: 'Zobacz wycenę',
  },
  wycena: {
    label: 'Warszawa / projekt + produkcja + montaż',
    copy: 'Pracujemy bez przypadkowych wycen. Najpierw decyzje techniczne, potem realny koszt i harmonogram.',
    ctaHref: '/kontakt',
    ctaLabel: 'Przejdź do kontaktu',
  },
} as const;

export const footerNavigation: Record<PageKey, FooterLink[]> = {
  home: [
    { href: '/', label: 'Start' },
    { href: '/oferta', label: 'Oferta' },
    { href: '/onas', label: 'O nas' },
    { href: '/wycena', label: 'Wycena' },
    { href: '/kontakt', label: 'Kontakt' },
  ],
  oferta: [
    { href: '/', label: 'Start' },
    { href: '/oferta', label: 'Oferta' },
    { href: '/onas', label: 'O nas' },
    { href: '/wycena', label: 'Wycena' },
    { href: '/kontakt', label: 'Kontakt' },
  ],
  onas: [
    { href: '/', label: 'Start' },
    { href: '/oferta', label: 'Oferta' },
    { href: '/onas', label: 'O nas' },
    { href: '/wycena', label: 'Wycena' },
    { href: '/kontakt', label: 'Kontakt' },
  ],
  kontakt: [
    { href: '/', label: 'Start' },
    { href: '/oferta', label: 'Oferta' },
    { href: '/onas', label: 'O nas' },
    { href: '/wycena', label: 'Wycena' },
    { href: '/kontakt', label: 'Kontakt' },
  ],
  wycena: [
    { href: '/', label: 'Start' },
    { href: '/oferta', label: 'Oferta' },
    { href: '/onas', label: 'O nas' },
    { href: '/wycena', label: 'Wycena' },
    { href: '/kontakt', label: 'Kontakt' },
  ],
};

export function getHeaderLinks(page: PageKey): NavLink[] {
  return [
    { href: '/', label: 'Start', current: page === 'home' },
    { href: '/oferta', label: 'Oferta', current: page === 'oferta' },
    { href: '/onas', label: 'O nas', current: page === 'onas' },
    { href: '/wycena', label: 'Wycena', current: page === 'wycena' },
    { href: '/kontakt', label: 'Kontakt', current: page === 'kontakt' },
  ];
}
