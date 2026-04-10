import { redirect, notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getVehicleById } from '@/app/actions/vehicle';
import Link from 'next/link';
import VehicleForm from '@/app/admin/_components/vehicle-form';

interface EditVehiclePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditVehiclePage({ params }: EditVehiclePageProps) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/ukryty-dostep');

  const { id } = await params;
  const vehicle = await getVehicleById(id);
  if (!vehicle) notFound();

  return (
    <div className="min-h-dvh bg-graphite-950 text-white">
      <header className="border-b border-white/[0.06] bg-white/[0.02] backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.04] text-graphite-400 transition hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
              </svg>
            </Link>
            <span className="text-sm font-semibold tracking-tight">Edycja pojazdu</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">
          {vehicle.make} {vehicle.model} ({vehicle.year})
        </h1>
        <p className="mt-2 text-graphite-500">Edytuj dane pojazdu i zapisz zmiany.</p>
        <VehicleForm vehicle={vehicle} />
      </main>
    </div>
  );
}
