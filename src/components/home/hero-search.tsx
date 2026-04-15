'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

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
    <motion.form
      onSubmit={handleSubmit}
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        {/* Search Input */}
        <motion.div 
          className="relative flex-1"
          animate={{ 
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <div 
            className={`
              relative flex items-center overflow-hidden
              border bg-white/10 backdrop-blur-sm
              transition-all duration-300 ease-out
              ${isFocused 
                ? 'border-white/50 bg-white/15 shadow-[0_0_30px_rgba(255,255,255,0.1)]' 
                : 'border-white/20 hover:border-white/30'
              }
            `}
          >
            {/* Search Icon */}
            <motion.svg
              className="ml-4 h-5 w-5 text-zinc-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              animate={{ 
                color: isFocused ? '#ffffff' : '#a1a1aa',
                scale: isFocused ? 1.1 : 1
              }}
              transition={{ duration: 0.2 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </motion.svg>

            <input
              type="text"
              placeholder="Wpisz markę, model lub słowo kluczowe..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="
                w-full bg-transparent px-4 py-4 text-[0.9rem] text-white
                placeholder:text-zinc-400
                outline-none
              "
            />

            {/* Clear Button - visible when typing */}
            <motion.button
              type="button"
              onClick={() => setSearchQuery('')}
              className="mr-2 p-1 text-zinc-400 hover:text-white transition-colors"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: searchQuery ? 1 : 0, 
                scale: searchQuery ? 1 : 0.8,
                pointerEvents: searchQuery ? 'auto' : 'none'
              }}
              transition={{ duration: 0.15 }}
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Focus glow effect */}
          <motion.div
            className="absolute inset-0 -z-10 rounded-sm bg-white/5 blur-xl"
            animate={{ 
              opacity: isFocused ? 1 : 0,
              scale: isFocused ? 1.1 : 1
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="
            group relative overflow-hidden
            min-h-[56px] px-8
            border border-white bg-white
            text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-zinc-950
            transition-all duration-300
            hover:bg-zinc-950 hover:text-white hover:border-white/50
            sm:min-h-[56px] sm:px-10 sm:text-[0.75rem] sm:tracking-[0.24em]
          "
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {buttonLabel}
          </span>
        </motion.button>
      </div>
    </motion.form>
  );
}
