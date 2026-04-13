import Link from 'next/link';
import VehicleForm from '@/app/admin/_components/vehicle-form';
import { requireAdminSession } from '@/lib/admin-session';

export default async function AddVehiclePage() {
  await requireAdminSession();

  return (
    <div className="admin-shell min-h-dvh">
      <header className="admin-header-bar">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="admin-appear flex items-center gap-3">
            <Link
              href="/admin"
              className="admin-btn-secondary h-9 min-h-0 w-9 px-0"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
            </Link>
            <span className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">Nowy pojazd</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="admin-appear text-[clamp(1.8rem,4.8vw,2.8rem)] font-semibold uppercase tracking-[-0.02em]">
          Dodaj pojazd do oferty
        </h1>
        <p className="admin-appear admin-appear-delay-1 mt-2 text-sm text-zinc-600">
          Uzupelnij dane ponizej. Pola oznaczone * sa wymagane.
        </p>
        <VehicleForm />
      </main>
    </div>
  );
}
