'use client';

import React from 'react';
import { useTranslation } from '@/i18n/I18nContext';
import { Locale } from '@/i18n/types';

// Crisp, high-definition SVG flag for Vietnam (🇻🇳)
export function VietnamFlagIcon({ className = 'w-6 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 30 20"
      className={`inline-block rounded-[3px] shadow-sm overflow-hidden shrink-0 ${className}`}
      aria-hidden="true"
    >
      {/* Red Background */}
      <rect width="30" height="20" fill="#DA251D" />
      {/* Centered Gold Star */}
      <polygon
        fill="#FFFF00"
        points="15,4 16.47,8.53 21.23,8.53 17.38,11.33 18.85,15.86 15,13.06 11.15,15.86 12.62,11.33 8.77,8.53 13.53,8.53"
      />
    </svg>
  );
}

// Crisp, high-definition SVG flag for the United Kingdom (🇬🇧)
export function UkFlagIcon({ className = 'w-6 h-4' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={`inline-block rounded-[3px] shadow-sm overflow-hidden shrink-0 ${className}`}
      aria-hidden="true"
    >
      <clipPath id="uk-clip">
        <rect width="60" height="30" rx="3" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        {/* Navy Blue Field */}
        <rect width="60" height="30" fill="#012169" />
        {/* White Diagonals */}
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#FFFFFF" strokeWidth="6" />
        {/* Red Diagonals (Counterchanged) */}
        <path d="M0,0 L30,15 M60,0 L30,15 M60,30 L30,15 M0,30 L30,15" stroke="#C8102E" strokeWidth="2" />
        {/* White Central Cross */}
        <path d="M30,0 v30 M0,15 h60" stroke="#FFFFFF" strokeWidth="10" />
        {/* Red Central Cross */}
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

interface LanguageSwitcherProps {
  className?: string;
  isMobile?: boolean;
}

export default function LanguageSwitcher({ className = '', isMobile = false }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useTranslation();

  const handleSelect = (newLocale: Locale) => {
    if (newLocale !== locale) {
      setLocale(newLocale);
    }
  };

  if (isMobile) {
    return (
      <div className={`flex items-center gap-2 pt-2 pb-1 ${className}`}>
        <span className="text-xs text-gray-400 font-medium mr-1">
          {t('common.header.langToggleAria')}:
        </span>
        <div className="inline-flex p-1 rounded-xl bg-purple-950/60 border border-purple-800/40 gap-1.5">
          <button
            type="button"
            onClick={() => handleSelect('vi')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              locale === 'vi'
                ? 'bg-purple-600/90 text-white shadow-md ring-1 ring-purple-400'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
            aria-label="Chọn Tiếng Việt"
            aria-pressed={locale === 'vi'}
          >
            <VietnamFlagIcon className="w-5 h-3.5" />
            <span>Tiếng Việt</span>
          </button>

          <button
            type="button"
            onClick={() => handleSelect('en')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              locale === 'en'
                ? 'bg-purple-600/90 text-white shadow-md ring-1 ring-purple-400'
                : 'text-gray-300 hover:text-white hover:bg-white/5'
            }`}
            aria-label="Select English"
            aria-pressed={locale === 'en'}
          >
            <UkFlagIcon className="w-5 h-3.5" />
            <span>English</span>
          </button>
        </div>
      </div>
    );
  }

  // Desktop Header Switcher: Compact two-flag button as shown in user's image
  return (
    <div
      role="radiogroup"
      aria-label={t('common.header.langToggleAria')}
      className={`inline-flex items-center p-1 rounded-xl bg-[#0f0724]/80 border border-purple-500/30 hover:border-purple-400/50 backdrop-blur-md transition-all gap-1 shadow-[0_0_15px_rgba(168,85,247,0.15)] shrink-0 select-none ${className}`}
    >
      {/* Vietnam Flag Button */}
      <button
        type="button"
        role="radio"
        aria-checked={locale === 'vi'}
        aria-label="Chuyển sang Tiếng Việt"
        title="Tiếng Việt (Vietnamese)"
        onClick={() => handleSelect('vi')}
        className={`group relative p-1.5 rounded-lg transition-all flex items-center justify-center cursor-pointer ${
          locale === 'vi'
            ? 'bg-purple-600/60 ring-2 ring-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.5)] scale-105'
            : 'opacity-65 hover:opacity-100 hover:bg-white/10'
        }`}
      >
        <VietnamFlagIcon className="w-6 h-4" />
      </button>

      {/* UK Flag Button */}
      <button
        type="button"
        role="radio"
        aria-checked={locale === 'en'}
        aria-label="Switch to English"
        title="English"
        onClick={() => handleSelect('en')}
        className={`group relative p-1.5 rounded-lg transition-all flex items-center justify-center cursor-pointer ${
          locale === 'en'
            ? 'bg-purple-600/60 ring-2 ring-purple-400 shadow-[0_0_12px_rgba(168,85,247,0.5)] scale-105'
            : 'opacity-65 hover:opacity-100 hover:bg-white/10'
        }`}
      >
        <UkFlagIcon className="w-6 h-4" />
      </button>
    </div>
  );
}

