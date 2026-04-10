'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useTransition } from 'react';
import { deleteVehicle, type VehicleRow } from '@/app/actions/vehicle';

/* price is already number after serialization */

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const STATUS_LABEL: Record<string, { text: string; cls: string }> = {
  AVAILABLE: { text: 'Dostępny', cls: 'bg-emerald-500/10 text-emerald-400' },
  RESERVED: { text: 'Zarezerwowany', cls: 'bg-amber-500/10 text-amber-400' },
  SOLD: { text: 'Sprzedany', cls: 'bg-graphite-700/30 text-graphite-400' },
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('pl-PL', { style: 'currency', currency: 'PLN', maximumFractionDigits: 0 }).format(price);
}

function formatMileage(km: number) {
  return new Intl.NumberFormat('pl-PL').format(km) + ' km';
}

/* ------------------------------------------------------------------ */
/*  Delete button                                                      */
/* ------------------------------------------------------------------ */

function DeleteButton({ id }: { id: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (!confirm('Na pewno usunąć ten pojazd?')) return;
        startTransition(async () => {
          await deleteVehicle(id);
        });
      }}
      className="rounded-md px-2.5 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
    >
      {isPending ? '…' : 'Usuń'}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface AdminDashboardProps {
  userName: string;
  vehicles: VehicleRow[];
}

export default function AdminDashboard({ userName, vehicles }: AdminDashboardProps) {
  return (
    <div className="min-h-dvh bg-graphite-950 text-white">
      {/* top bar */}
      <header className="border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
              </svg>
            </div>
            <span className="text-sm font-semibold tracking-tight">Panel Administratora</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-graphite-500">
              Witaj, <span className="text-white">{userName}</span>
            </span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm text-graphite-300 transition hover:bg-white/[0.08] hover:text-white"
            >
              Wyloguj
            </button>
          </div>
        </div>
      </header>

      {/* main content */}
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Pojazdy</h1>
            <p className="mt-1 text-graphite-500">
              {vehicles.length === 0
                ? 'Brak pojazdów w bazie.'
                : `${vehicles.length} ${vehicles.length === 1 ? 'pojazd' : vehicles.length < 5 ? 'pojazdy' : 'pojazdów'} w ofercie`}
            </p>
          </div>
          <Link
            href="/admin/dodaj"
            className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-5 py-2.5 text-sm font-semibold text-graphite-950 shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-amber-500"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Dodaj pojazd
          </Link>
        </div>

        {/* Vehicle table */}
        {vehicles.length > 0 && (
          <div className="mt-8 overflow-x-auto rounded-xl border border-white/[0.06]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-graphite-500">Pojazd</th>
                  <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-graphite-500">Rok</th>
                  <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-graphite-500">Przebieg</th>
                  <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-graphite-500">Cena</th>
                  <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-graphite-500">Status</th>
                  <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-graphite-500 text-right">Akcje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {vehicles.map((v) => {
                  const st = STATUS_LABEL[v.status] ?? STATUS_LABEL.AVAILABLE;
                  return (
                    <tr key={v.id} className="transition hover:bg-white/[0.02]">
                      <td className="whitespace-nowrap px-5 py-4">
                        <div className="flex items-center gap-3">
                          {v.images[0] ? (
                            <img src={v.images[0]} alt="" className="h-10 w-14 rounded-md object-cover" />
                          ) : (
                            <div className="flex h-10 w-14 items-center justify-center rounded-md bg-white/[0.04] text-graphite-600">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909-4.969-4.969a.75.75 0 00-1.06 0L2.5 11.06z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                          <span className="font-medium text-white">{v.make} {v.model}</span>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-graphite-400">{v.year}</td>
                      <td className="whitespace-nowrap px-5 py-4 text-graphite-400">{formatMileage(v.mileage)}</td>
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-white">{formatPrice(v.price)}</td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${st.cls}`}>{st.text}</span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <Link
                            href={`/admin/edytuj/${v.id}`}
                            className="rounded-md px-2.5 py-1.5 text-xs text-amber-400 transition hover:bg-amber-500/10"
                          >
                            Edytuj
                          </Link>
                          <DeleteButton id={v.id} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
