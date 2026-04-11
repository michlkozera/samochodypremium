import { VehicleStatus } from '@prisma/client';
import { getVehicles } from '@/app/actions/vehicle';
import { requireAdminSession } from '@/lib/admin-session';
import AdminDashboard from './admin-dashboard';

type AdminPageProps = {
  searchParams: Promise<{
    q?: string;
    status?: string;
    page?: string;
    saved?: string;
  }>;
};

function parseStatus(status?: string) {
  if (!status || status === 'ALL') {
    return 'ALL' as const;
  }

  return Object.values(VehicleStatus).includes(status as VehicleStatus)
    ? (status as VehicleStatus)
    : 'ALL';
}

function parsePage(page?: string) {
  const parsed = Number(page ?? '1');
  return Number.isFinite(parsed) && parsed > 0 ? Math.floor(parsed) : 1;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const session = await requireAdminSession();
  const filters = await searchParams;
  const data = await getVehicles({
    query: filters.q ?? '',
    status: parseStatus(filters.status),
    page: parsePage(filters.page),
  });

  return (
    <AdminDashboard
      userName={session.user?.name ?? 'Administrator'}
      data={data}
      showSavedNotice={filters.saved === '1'}
    />
  );
}
