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

const STATUS_LABEL: Record<VehicleRow['status'], { text: string; cls: string }> = {
  AVAILABLE: {
    text: 'Dostepny',
    cls: 'border border-zinc-950 bg-zinc-950 text-white',
  },
  RESERVED: {
    text: 'Zarezerwowany',
    cls: 'border border-zinc-300 bg-zinc-100 text-zinc-950',
  },
  SOLD: {
    text: 'Sprzedany',
    cls: 'border border-zinc-300 bg-white text-zinc-500',
  },
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
      className="inline-flex items-center border border-zinc-300 bg-white px-2.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-zinc-700 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isPending ? 'Usuwanie...' : 'Usun'}
    </button>
  );
}

function SummaryCard({
  label,
  value,
  inverted = false,
}: {
  label: string;
  value: number;
  inverted?: boolean;
}) {
  return (
    <div
      className={`admin-surface-soft admin-appear p-4 ${
        inverted ? 'border-zinc-950 bg-zinc-950 text-white' : ''
      }`}
      data-interactive="true"
    >
      <p
        className={`text-[0.64rem] font-semibold uppercase tracking-[0.2em] ${
          inverted ? 'text-zinc-300' : 'text-zinc-500'
        }`}
      >
        {label}
      </p>
      <p className="mt-2 text-[1.9rem] font-semibold leading-none tracking-[-0.04em]">{value}</p>
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
      ? 'border-zinc-950 bg-white text-zinc-950'
      : 'border-zinc-950 bg-zinc-950 text-white';

  return (
    <div className="admin-shell min-h-dvh">
      <header className="admin-header-bar sticky top-0 z-20">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <div className="admin-appear flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center border border-zinc-950 bg-zinc-950 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6Zm0 9.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6Zm0 9.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z"
                />
              </svg>
            </div>
            <span className="truncate text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Panel administratora
            </span>
          </div>

          <div className="admin-appear admin-appear-delay-1 flex items-center gap-3">
            <span className="hidden text-xs uppercase tracking-[0.14em] text-zinc-500 sm:block">
              {userName}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="admin-btn-secondary px-4"
            >
              Wyloguj
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="admin-appear grid gap-1">
            <h1 className="text-[clamp(1.8rem,4.8vw,3rem)] font-semibold uppercase leading-[1.05] tracking-[-0.03em]">
              Pojazdy
            </h1>
            <p className="text-sm text-zinc-600">
              {data.totalItems === 0
                ? 'Brak pojazdow w bazie.'
                : `${data.totalItems} wynikow | strona ${data.page} z ${data.totalPages}`}
            </p>
          </div>
          <Link href="/admin/dodaj" className="admin-btn-primary admin-appear admin-appear-delay-1 gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z" />
            </svg>
            Dodaj pojazd
          </Link>
        </div>

        {flash ? (
          <div className={`admin-appear admin-appear-delay-2 mt-6 border px-4 py-3 text-sm ${flashClassName}`}>
            {flash.message}
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <SummaryCard label="Wszystkie" value={data.counts.all} inverted />
          <SummaryCard label="Dostepne" value={data.counts.available} />
          <SummaryCard label="Rezerwacje" value={data.counts.reserved} />
          <SummaryCard label="Sprzedane" value={data.counts.sold} />
        </div>

        <form
          action="/admin"
          method="get"
          className="admin-surface admin-appear admin-appear-delay-1 mt-8 grid gap-4 p-5 md:grid-cols-[minmax(0,1fr)_220px_auto]"
        >
          <div>
            <label htmlFor="admin-q" className="admin-label">
              Wyszukaj
            </label>
            <input
              id="admin-q"
              name="q"
              defaultValue={data.query}
              placeholder="Marka, model lub ostatnie 5 znakow VIN"
              className="admin-input"
            />
          </div>

          <div>
            <label htmlFor="admin-status" className="admin-label">
              Status
            </label>
            <select
              id="admin-status"
              name="status"
              defaultValue={data.status}
              className="admin-input"
            >
              <option value="ALL">Wszystkie</option>
              <option value="AVAILABLE">Dostepne</option>
              <option value="RESERVED">Zarezerwowane</option>
              <option value="SOLD">Sprzedane</option>
            </select>
          </div>

          <div className="flex flex-wrap items-end gap-3">
            <button type="submit" className="admin-btn-primary">
              Filtruj
            </button>
            <Link href="/admin" className="admin-btn-secondary">
              Wyczysc
            </Link>
          </div>
        </form>

        {data.vehicles.length > 0 ? (
          <div className="admin-surface admin-appear admin-appear-delay-2 mt-8 overflow-x-auto">
            <table className="w-full min-w-[880px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-zinc-950 bg-zinc-950 text-white">
                  <th className="px-5 py-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em]">Pojazd</th>
                  <th className="px-5 py-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em]">Cena</th>
                  <th className="px-5 py-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em]">Status</th>
                  <th className="px-5 py-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em]">Zdjecia</th>
                  <th className="px-5 py-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em]">Aktualizacja</th>
                  <th className="px-5 py-3.5 text-right text-[0.62rem] font-semibold uppercase tracking-[0.18em]">Akcje</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {data.vehicles.map((vehicle) => {
                  const status = STATUS_LABEL[vehicle.status];

                  return (
                    <tr key={vehicle.id} className="group transition hover:bg-zinc-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {vehicle.primaryImageUrl ? (
                            <div className="relative h-14 w-20 overflow-hidden border border-zinc-200 bg-zinc-100">
                              <Image
                                src={vehicle.primaryImageUrl}
                                alt=""
                                fill
                                className="object-cover saturate-110 transition duration-500 group-hover:scale-[1.04]"
                                sizes="80px"
                              />
                            </div>
                          ) : (
                            <div className="flex h-14 w-20 items-center justify-center border border-zinc-200 bg-zinc-100 text-zinc-500">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                                <path
                                  fillRule="evenodd"
                                  d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909-4.969-4.969a.75.75 0 0 0-1.06 0L2.5 11.06Z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="font-semibold text-zinc-950">
                              {vehicle.make} {vehicle.model}
                            </p>
                            <p className="mt-1 text-xs text-zinc-600">
                              {vehicle.year} | {formatMileage(vehicle.mileage)} | VIN ...{vehicle.vinSuffix}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 font-semibold text-zinc-950">
                        {formatPrice(vehicle.price)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4">
                        <span className={`inline-flex px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${status.cls}`}>
                          {status.text}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-zinc-600">
                        {vehicle.imageCount}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-zinc-600">
                        {formatDate(vehicle.updatedAt)}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          <Link
                            href={`/admin/edytuj/${vehicle.id}`}
                            className="inline-flex items-center border border-zinc-950 bg-zinc-950 px-2.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-zinc-950"
                          >
                            Edytuj
                          </Link>
                          <Link
                            href={`/oferta/${vehicle.slug}`}
                            className="inline-flex items-center border border-zinc-300 bg-white px-2.5 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-zinc-700 transition hover:border-zinc-950 hover:bg-zinc-950 hover:text-white"
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
          <div className="admin-surface admin-appear admin-appear-delay-2 mt-8 px-6 py-12 text-center text-zinc-600">
            Nie znaleziono pojazdow dla wybranych filtrow.
          </div>
        )}

        {data.totalPages > 1 ? (
          <div className="admin-appear admin-appear-delay-3 mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-zinc-600">
              Strona {data.page} z {data.totalPages}
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={buildPageHref(Math.max(1, data.page - 1), data.query, data.status)}
                aria-disabled={data.page === 1}
                className={`inline-flex min-h-10 items-center justify-center border px-4 text-[0.66rem] font-semibold uppercase tracking-[0.18em] transition ${
                  data.page === 1
                    ? 'pointer-events-none border-zinc-200 bg-zinc-100 text-zinc-400'
                    : 'border-zinc-300 bg-white text-zinc-800 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white'
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
                    className={`inline-flex min-h-10 min-w-10 items-center justify-center border px-3 text-[0.66rem] font-semibold uppercase tracking-[0.16em] transition ${
                      page === data.page
                        ? 'border-zinc-950 bg-zinc-950 text-white'
                        : 'border-zinc-300 bg-white text-zinc-800 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white'
                    }`}
                  >
                    {page}
                  </Link>
                ))}
              <Link
                href={buildPageHref(Math.min(data.totalPages, data.page + 1), data.query, data.status)}
                aria-disabled={data.page === data.totalPages}
                className={`inline-flex min-h-10 items-center justify-center border px-4 text-[0.66rem] font-semibold uppercase tracking-[0.18em] transition ${
                  data.page === data.totalPages
                    ? 'pointer-events-none border-zinc-200 bg-zinc-100 text-zinc-400'
                    : 'border-zinc-300 bg-white text-zinc-800 hover:border-zinc-950 hover:bg-zinc-950 hover:text-white'
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
