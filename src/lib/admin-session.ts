import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/ukryty-dostep');
  }

  return session;
}
