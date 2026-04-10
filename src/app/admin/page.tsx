import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getVehicles } from '@/app/actions/vehicle';
import AdminDashboard from './admin-dashboard';

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/ukryty-dostep');
  }

  const vehicles = await getVehicles();

  return (
    <AdminDashboard
      userName={session.user?.name ?? 'Administrator'}
      vehicles={vehicles}
    />
  );
}
