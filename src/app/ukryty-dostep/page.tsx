'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { type FormEvent, useState, Suspense } from 'react';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get('callbackUrl') ?? '/admin';

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
      setError('Nieprawidłowy login lub hasło.');
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-graphite-950 px-4">
      {/* subtle ambient glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-amber-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-[400px] w-[400px] rounded-full bg-amber-400/5 blur-[100px]" />

      <div className="relative z-10 w-full max-w-md">
        {/* glass card */}
        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-8 shadow-2xl backdrop-blur-xl sm:p-10">
          {/* logo / branding */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-amber-500/20 bg-amber-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="h-5 w-5 text-amber-400"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>
            <h1 className="text-lg font-semibold tracking-tight text-white">
              Panel Administracyjny
            </h1>
            <p className="mt-1 text-sm text-graphite-500">
              Zaloguj się, aby kontynuować
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-graphite-500"
              >
                Login
              </label>
              <input
                id="username"
                type="text"
                autoComplete="username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-graphite-600 outline-none transition focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20"
                placeholder="Nazwa użytkownika"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-graphite-500"
              >
                Hasło
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-graphite-600 outline-none transition focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-md bg-red-500/10 px-3 py-2 text-center text-sm text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-3 text-sm font-semibold text-graphite-950 shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Logowanie…' : 'Zaloguj się'}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-graphite-700">
          Samochody Premium &mdash; Dostęp zastrzeżony
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
