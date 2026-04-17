'use client';

import { useState, type FormEvent } from 'react';

interface HeroSearchProps {
  buttonLabel?: string;
  buttonHref?: string;
}

export function HeroSearch({ buttonLabel = 'Zobacz katalog', buttonHref = '/oferta' }: HeroSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `${buttonHref}?search=${encodeURIComponent(searchQuery.trim())}`;
    } else {
      window.location.href = buttonHref;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex items-center gap-4">
        <div
          className={[
            'flex min-w-0 flex-1 items-center gap-3 px-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]',
            isFocused
              ? 'bg-white px-4 shadow-[0_14px_36px_rgba(0,0,0,0.2)]'
              : 'bg-white/10 backdrop-blur-xl backdrop-saturate-150 hover:bg-white/15',
          ].join(' ')}
        >
          <svg
            className={[
              'h-4 w-4 shrink-0 transition-colors duration-300',
              isFocused ? 'text-zinc-900' : 'text-white/40',
            ].join(' ')}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            type="text"
            placeholder=""
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={[
              'min-h-[3.5rem] w-full bg-transparent pl-2 text-[0.95rem] outline-none transition-colors duration-300 sm:pl-3',
              isFocused ? 'text-zinc-950 placeholder:text-zinc-500' : 'text-white/82 placeholder:text-white/40',
            ].join(' ')}
          />

          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className={[
              'shrink-0 p-1 transition-all duration-200',
              isFocused ? 'text-zinc-500 hover:text-zinc-900' : 'text-white/30 hover:text-white/60',
              searchQuery ? 'opacity-100' : 'pointer-events-none opacity-0',
            ].join(' ')}
          >
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <button
          type="submit"
          className="home-cta shrink-0 whitespace-nowrap text-white hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <span>{buttonLabel}</span>
          <svg className="home-cta-arrow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
          </svg>
          <span className="home-cta-line" />
        </button>
      </div>
    </form>
  );
}
