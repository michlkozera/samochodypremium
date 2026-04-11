'use client';

import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import {
  deleteVehicle,
  type AdminVehicleListResult,
  type VehicleRow,
} from '@/app/actions/vehicle';

const STATUS_LABEL: Record<
  VehicleRow['status'],
  { text: string; cls: string }
> = {
  AVAILABLE: { text: 'Dostepny', cls: 'bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/20' },
  RESERVED: { text: 'Zarezerwowany', cls: 'bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/20' },
  SOLD: { text: 'Sprzedany', cls: 'bg-zinc-500/10 text-zinc-300 ring-1 ring-zinc-500/20' },
};

function formatPrice(price: number) {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    maximumFractionDigits: 0,
  }).format(price);
}

function formatMileage(km: number) {
  return `${new Intl.NumberFormat('pl-PL').format(km)} km`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value));
}

function buildPageHref(
  page: number,
  query: string,
  status: AdminVehicleListResult['status'],
) {
  const params = new URLSearchParams();

  if (query) {
    params.set('q', query);
  }

  if (status !== 'ALL') {
    params.set('status', status);
  }

  if (page > 1) {
    params.set('page', String(page));
  }

  const queryString = params.toString();
  return queryString ? `/admin?${queryString}` : '/admin';
}

function DeleteButton({
  id,
  label,
  onResult,
}: {
  id: string;
  label: string;
  onResult: (message: string, tone: 'success' | 'error') => void;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => {
        if (!confirm(`Na pewno usunac pojazd ${label}?`)) return;

        startTransition(async () => {
          const result = await deleteVehicle(id);

          if (result.success) {
            onResult(result.message ?? 'Pojazd usuniety.', 'success');
            router.refresh();
            return;
          }

          onResult(result.error ?? 'Nie udalo sie usunac pojazdu.', 'error');
        });
      }}
      className="rounded-md px-2.5 py-1.5 text-xs text-red-400 transition hover:bg-red-500/10 disabled:opacity-50"
    >
      {isPending ? 'Usuwanie...' : 'Usun'}
    </button>
  );
}

function SummaryCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent: string;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
      <p className="text-xs uppercase tracking-[0.18em] text-graphite-500">{label}</p>
      <p className={`mt-2 text-2xl font-semibold tracking-tight ${accent}`}>{value}</p>
    </div>
  );
}

interface AdminDashboardProps {
  userName: string;
  data: AdminVehicleListResult;
  showSavedNotice?: boolean;
}

export default function AdminDashboard({
  userName,
  data,
  showSavedNotice = false,
}: AdminDashboardProps) {
  const [flash, setFlash] = useState<{
    message: string;
    tone: 'success' | 'error';
  } | null>(
    showSavedNotice
      ? { message: 'Zmiany zostaly zapisane.', tone: 'success' }
      : null,
  );

  const flashClassName =
    flash?.tone === 'error'
      ? 'bg-red-500/10 text-red-400'
      : 'bg-emerald-500/10 text-emerald-400';

  return (
    <div className="min-h-dvh bg-graphite-950 text-white">
      <header className="border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/10 text-amber-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A.75.75 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
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

      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Pojazdy</h1>
            <p className="mt-1 text-graphite-500">
              {data.totalItems === 0
                ? 'Brak pojazdow w bazie.'
                : `${data.totalItems} wynikow, strona ${data.page} z ${data.totalPages}`}
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

        {flash ? (
          <div className={`mt-6 rounded-lg px-4 py-3 text-sm ${flashClassName}`}>
            {flash.message}
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Wszystkie" value={data.counts.all} accent="text-white" />
          <SummaryCard label="Dostepne" value={data.counts.available} accent="text-emerald-300" />
          <SummaryCard label="Rezerwacje" value={data.counts.reserved} accent="text-amber-300" />
          <SummaryCard label="Sprzedane" value={data.counts.sold} accent="text-zinc-300" />
        </div>

        <form
          action="/admin"
          method="get"
          className="mt-8 grid gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 md:grid-cols-[minmax(0,1fr)_220px_auto]"
        >
          <div>
            <label htmlFor="admin-q" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-graphite-500">
              Wyszukaj
            </label>
            <input
              id="admin-q"
              name="q"
              defaultValue={data.query}
              placeholder="Marka, model lub ostatnie 5 znakow VIN"
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-graphite-600 outline-none transition focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20"
            />
          </div>

          <div>
            <label htmlFor="admin-status" className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-graphite-500">
              Status
            </label>
            <select
              id="admin-status"
              name="status"
              defaultValue={data.status}
              className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20"
            >
              <option value="ALL">Wszystkie</option>
              <option value="AVAILABLE">Dostepne</option>
              <option value="RESERVED">Zarezerwowane</option>
              <option value="SOLD">Sprzedane</option>
            </select>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <button
              type="submit"
              className="inline-flex h-[46px] items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-graphite-950 transition hover:bg-amber-400"
            >
              Filtruj
            </button>
            <Link
              href="/admin"
              className="inline-flex h-[46px] items-center justify-center rounded-lg border border-white/[0.08] px-5 text-sm text-graphite-300 transition hover:bg-white/[0.06] hover:text-white"
            >
              Wyczyść
            </Link>
          </div>
        </form>

        {data.vehicles.length > 0 ? (
          <div className="mt-8 overflow-x-auto rounded-xl border border-white/[0.06]">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                  <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-graphite-500">Pojazd</th>
                  <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-graphite-500">Cena</th>
                  <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-graphite-500">Status</th>
                  <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-graphite-500">Zdjecia</th>
                  <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-graphite-500">Aktualizacja</th>
                  <th className="px-5 py-3.5 text-xs font-medium uppercase tracking-wider text-graphite-500 text-right">Akcje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04]">
                {data.vehicles.map((vehicle) => {
                  const status = STATUS_LABEL[vehicle.status];

                  return (
                    <tr key={vehicle.id} className="transition hover:bg-white/[0.02]">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {vehicle.primaryImageUrl ? (
                            <div className="relative h-12 w-16 overflow-hidden rounded-md">
                              <Image
                                src={vehicle.primaryImageUrl}
                                alt=""
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                          ) : (
                            <div className="flex h-12 w-16 items-center justify-center rounded-md bg-white/[0.04] text-graphite-600">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                <path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 013.25 3h13.5A2.25 2.25 0 0119 5.25v9.5A2.25 2.25 0 0116.75 17H3.25A2.25 2.25 0 011 14.75v-9.5zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 00.75-.75v-2.69l-2.22-2.219a.75.75 0 00-1.06 0l-1.91 1.909-4.969-4.969a.75.75 0 00-1.06 0L2.5 11.06z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-medium text-white">{vehicle.make} {vehicle.model}</p>
                            <p className="mt-1 text-xs text-graphite-500">
                              {vehicle.year} · {formatMileage(vehicle.mileage)} · VIN ...{vehicle.vinSuffix}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-white">
                        {formatPrice(vehicle.price)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${status.cls}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-graphite-400">
                        {vehicle.imageCount}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-graphite-400">
                        {formatDate(vehicle.updatedAt)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <Link
                            href={`/admin/edytuj/${vehicle.id}`}
                            className="rounded-md px-2.5 py-1.5 text-xs text-amber-400 transition hover:bg-amber-500/10"
                          >
                            Edytuj
                          </Link>
                          <Link
                            href={`/oferta/${vehicle.slug}`}
                            className="rounded-md px-2.5 py-1.5 text-xs text-graphite-300 transition hover:bg-white/[0.06] hover:text-white"
                          >
                            Podglad
                          </Link>
                          <DeleteButton
                            id={vehicle.id}
                            label={`${vehicle.make} ${vehicle.model}`}
                            onResult={(message, tone) => setFlash({ message, tone })}
                          />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 py-12 text-center text-graphite-400">
            Nie znaleziono pojazdow dla wybranych filtrow.
          </div>
        )}

        {data.totalPages > 1 ? (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-graphite-500">
              Strona {data.page} z {data.totalPages}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={buildPageHref(Math.max(1, data.page - 1), data.query, data.status)}
                aria-disabled={data.page === 1}
                className={`rounded-lg px-4 py-2 text-sm transition ${
                  data.page === 1
                    ? 'pointer-events-none border border-white/[0.06] text-graphite-700'
                    : 'border border-white/[0.08] text-graphite-300 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                Poprzednia
              </Link>
              {Array.from({ length: data.totalPages }, (_, index) => index + 1)
                .slice(Math.max(0, data.page - 3), Math.min(data.totalPages, data.page + 2))
                .map((page) => (
                  <Link
                    key={page}
                    href={buildPageHref(page, data.query, data.status)}
                    className={`rounded-lg px-4 py-2 text-sm transition ${
                      page === data.page
                        ? 'bg-white text-graphite-950'
                        : 'border border-white/[0.08] text-graphite-300 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    {page}
                  </Link>
                ))}
              <Link
                href={buildPageHref(Math.min(data.totalPages, data.page + 1), data.query, data.status)}
                aria-disabled={data.page === data.totalPages}
                className={`rounded-lg px-4 py-2 text-sm transition ${
                  data.page === data.totalPages
                    ? 'pointer-events-none border border-white/[0.06] text-graphite-700'
                    : 'border border-white/[0.08] text-graphite-300 hover:bg-white/[0.06] hover:text-white'
                }`}
              >
                Nastepna
              </Link>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
