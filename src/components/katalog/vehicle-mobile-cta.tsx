'use client';

import { useEffect, useState } from 'react';
import type { CatalogVehicleDetail } from '@/lib/vehicle-catalog';
import { formatPrice } from '@/lib/vehicle-catalog';

type Props = {
  vehicle: CatalogVehicleDetail;
};

export function VehicleMobileCta({ vehicle }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 280);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={[
        'fixed inset-x-0 bottom-0 z-40 border-t border-zinc-200/80 bg-white/95 backdrop-blur-md transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      ].join(' ')}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Mini price */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-zinc-400">
            {vehicle.make} {vehicle.model}
          </p>
          <p className="text-[1rem] font-semibold leading-tight tracking-[-0.04em] text-zinc-950">
            {formatPrice(vehicle.price)}&nbsp;PLN
          </p>
        </div>

        {/* CTA buttons */}
        <a
          className="inline-flex min-h-11 shrink-0 items-center justify-center border border-zinc-950 bg-zinc-950 px-5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white btn-invert-on-hover active:bg-zinc-800"
          href="#kontakt-oferta"
        >
          Zapytaj
        </a>
        <a
          aria-label="Zadzwoń teraz"
          className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-zinc-300 bg-white text-zinc-950 transition-colors duration-200 active:bg-zinc-100"
          href={vehicle.advisor.phoneHref}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.8}
            viewBox="0 0 24 24"
          >
            <path
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 6.75z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  );
}
