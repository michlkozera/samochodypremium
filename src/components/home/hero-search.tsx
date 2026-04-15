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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <div className="relative flex-1">
          <div
            className={[
              'relative flex items-center overflow-hidden border backdrop-blur-sm transition-all duration-300 ease-out',
              isFocused
                ? 'border-white/50 bg-white/15 shadow-[0_0_30px_rgba(255,255,255,0.1)]'
                : 'border-white/20 bg-white/10 hover:border-white/30',
            ].join(' ')}
          >
            {/* Search Icon */}
            <svg
              className={[
                'ml-4 h-5 w-5 transition-colors duration-200',
                isFocused ? 'text-white' : 'text-zinc-400',
              ].join(' ')}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="text"
              placeholder="Wpisz markę, model lub słowo kluczowe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full bg-transparent px-4 py-4 text-[0.9rem] text-white placeholder:text-zinc-400 outline-none"
            />

            {/* Clear Button */}
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className={[
                'mr-2 p-1 text-zinc-400 hover:text-white transition-all duration-200',
                searchQuery ? 'opacity-100 scale-100' : 'opacity-0 scale-75 pointer-events-none',
              ].join(' ')}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="
            group relative overflow-hidden
            min-h-[56px] px-8
            border border-white bg-white
            text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-zinc-950
            transition-all duration-300
            hover:bg-zinc-950 hover:text-white hover:border-white/50
            active:scale-[0.98]
            sm:min-h-[56px] sm:px-10 sm:text-[0.75rem] sm:tracking-[0.24em]
          "
        >
          {buttonLabel}
        </button>
      </div>
    </form>
  );
}
