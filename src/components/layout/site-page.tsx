import type { ReactNode } from 'react';
import { type PageKey } from '@/data/site';
import { BackToTopButton } from '@/components/ui/back-to-top-button';
import { RevealObserver } from '@/components/ui/reveal-observer';
import { SiteFooter } from './site-footer';
import { SiteHeader, type SiteHeaderMode } from './site-header';

type SitePageProps = {
  children: ReactNode;
  page: PageKey;
  pageClass: string;
  headerMode?: SiteHeaderMode;
};

export function SitePage({ children, page, pageClass, headerMode = 'hero' }: SitePageProps) {
  return (
    <div className={`relative isolate overflow-x-clip bg-white ${pageClass}`}>
      <RevealObserver />
      <SiteHeader mode={headerMode} page={page} />
      <div className="flex min-h-screen min-h-dvh flex-col">{children}</div>
      <SiteFooter page={page} />
      <BackToTopButton />
    </div>
  );
}
