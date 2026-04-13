'use client';

import { useFormStatus } from 'react-dom';

export const inputCls =
  'admin-input';

export const labelCls =
  'admin-label';

export const checkboxCls =
  'h-4 w-4 rounded-none border-zinc-400 bg-white text-zinc-950 accent-zinc-950';

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
      {error ? <p className="mt-1.5 text-xs text-zinc-700">{error}</p> : null}
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
    <fieldset className="admin-surface admin-appear p-5 sm:p-7">
      <legend className="mb-6 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-zinc-500">
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
      ? 'border-zinc-950 bg-white text-zinc-950'
      : 'border-zinc-950 bg-zinc-950 text-white';

  if (messages.length === 0) {
    return null;
  }

  return (
    <div className={`admin-appear border px-4 py-3 text-sm ${className}`}>
      <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em]">{title}</p>
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
      className="admin-btn-primary gap-2 px-7"
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
