import type { ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/base.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-brand-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Meble Premium',
  description:
    'Projektujemy, produkujemy i montujemy surowe, precyzyjne meble na wymiar w architektonicznym standardzie.',
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
    <html className={inter.variable} lang="pl" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
