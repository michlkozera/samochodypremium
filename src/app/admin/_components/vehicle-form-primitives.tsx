'use client';

import { useFormStatus } from 'react-dom';

export const inputCls =
  'w-full rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-graphite-600 outline-none transition focus:border-amber-500/40 focus:ring-1 focus:ring-amber-500/20 disabled:cursor-not-allowed disabled:opacity-60';

export const labelCls =
  'mb-1.5 block text-xs font-medium uppercase tracking-wider text-graphite-500';

export const checkboxCls =
  'h-4 w-4 rounded border-white/[0.15] bg-white/[0.04] text-amber-500 accent-amber-500';

export function Field({
  label,
  htmlFor,
  error,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className={labelCls}>
        {label}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-xs text-red-400">{error}</p> : null}
    </div>
  );
}

export function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <fieldset className="rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 backdrop-blur-xl sm:p-8">
      <legend className="mb-6 text-sm font-semibold tracking-tight text-amber-400">
        {title}
      </legend>
      {children}
    </fieldset>
  );
}

export function ValidationSummary({
  title,
  messages,
  tone = 'error',
}: {
  title: string;
  messages: string[];
  tone?: 'error' | 'info';
}) {
  const className =
    tone === 'error'
      ? 'bg-red-500/10 text-red-400'
      : 'bg-emerald-500/10 text-emerald-400';

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className={`rounded-lg px-4 py-3 text-sm ${className}`}>
      <p className="font-medium">{title}</p>
      <ul className="mt-2 grid gap-1 text-xs sm:text-sm">
        {messages.map((message) => (
          <li key={message}>{message}</li>
        ))}
      </ul>
    </div>
  );
}

export function SubmitButton({
  editMode,
  locked,
}: {
  editMode: boolean;
  locked?: boolean;
}) {
  const { pending } = useFormStatus();
  const disabled = pending || locked;

  return (
    <button
      type="submit"
      disabled={disabled}
      className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-amber-500 to-amber-600 px-8 py-3 text-sm font-semibold text-graphite-950 shadow-lg shadow-amber-500/20 transition hover:from-amber-400 hover:to-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {disabled ? (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      {disabled ? 'Zapisywanie...' : editMode ? 'Zapisz zmiany' : 'Dodaj pojazd'}
    </button>
  );
}
