import type { ReactNode } from 'react';
import { type PageKey } from '@/data/site';
import { BackToTopButton } from '@/components/ui/back-to-top-button';
import { RevealObserver } from '@/components/ui/reveal-observer';
import { SiteFooter } from './site-footer';
import { SiteHeader } from './site-header';

type SitePageProps = {
  children: ReactNode;
  page: PageKey;
  pageClass: string;
};

export function SitePage({ children, page, pageClass }: SitePageProps) {
  return (
    <div className={`relative isolate overflow-x-clip bg-white ${pageClass}`}>
      <RevealObserver />
      <SiteHeader page={page} />
      <div className="flex min-h-screen min-h-dvh flex-col">{children}</div>
      <SiteFooter page={page} />
      <BackToTopButton />
    </div>
  );
}
