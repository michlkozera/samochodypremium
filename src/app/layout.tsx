import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Barlow } from 'next/font/google';
import '@/styles/base.css';

const barlow = Barlow({
  subsets: ['latin', 'latin-ext'],
  weight: ['200', '300', '400', '500', '600', '700'],
  variable: '--font-brand-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Samochody Premium',
  description:
    'Wyselekcjonowane samochody klasy premium w Warszawie. Pełna historia serwisowa, gwarancja pochodzenia i profesjonalna obsługa.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html className={barlow.variable} lang="pl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
