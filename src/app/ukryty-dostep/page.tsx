'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, Suspense, useState } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const callbackUrl = toSafeInternalPath(searchParams.get('callbackUrl'));

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      username,
      password,
      redirect: false,
      callbackUrl,
    });

    setLoading(false);

    if (result?.error) {
      setError('Nieprawidlowy login lub haslo.');
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="admin-shell relative flex min-h-dvh items-center justify-center px-4 py-8">
      <div className="relative z-10 w-full max-w-md">
        <div className="admin-surface admin-appear p-8 sm:p-10">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center border border-zinc-950 bg-zinc-950 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <h1 className="text-lg font-semibold uppercase tracking-[0.14em] text-zinc-950">
              Panel administracyjny
            </h1>
            <p className="mt-2 text-sm text-zinc-600">
              Zaloguj sie, aby kontynuowac.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="username" className="admin-label">
                Login
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="admin-input"
                placeholder="Nazwa uzytkownika"
              />
            </div>

            <div>
              <label htmlFor="password" className="admin-label">
                Haslo
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="admin-input"
                placeholder="********"
              />
            </div>

            {error && (
              <p className="border border-zinc-950 px-3 py-2 text-center text-sm text-zinc-950">
                {error}
              </p>
            )}

            <button type="submit" disabled={loading} className="admin-btn-primary w-full">
              {loading ? 'Logowanie...' : 'Zaloguj sie'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs uppercase tracking-[0.14em] text-zinc-500">
          Samochody Premium | Dostep zastrzezony
        </p>
      </div>
    </div>
  );
}

export default function HiddenLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function toSafeInternalPath(value: string | null) {
  if (!value) {
    return '/admin';
  }

  try {
    const url = new URL(value, 'http://localhost:3000');
    return url.origin === 'http://localhost:3000'
      ? `${url.pathname}${url.search}${url.hash}`
      : '/admin';
  } catch {
    return value.startsWith('/') ? value : '/admin';
  }
}
