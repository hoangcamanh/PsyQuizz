'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Locale, I18nContextType } from './types';
import { DEFAULT_LOCALE, LOCALE_COOKIE_KEY, LOCALE_STORAGE_KEY, SUPPORTED_LOCALES } from './config';
import { dictionaries, getNestedTranslation } from './locales';

const I18nContext = createContext<I18nContextType | null>(null);

function getSavedLocale(): Locale {
  if (typeof window === 'undefined') return DEFAULT_LOCALE;

  try {
    // 1. Check localStorage
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale | null;
    if (stored && SUPPORTED_LOCALES.includes(stored)) {
      return stored;
    }

    // 2. Check Cookie
    const match = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE_KEY}=([^;]*)`));
    const cookieVal = match ? (decodeURIComponent(match[1]) as Locale) : null;
    if (cookieVal && SUPPORTED_LOCALES.includes(cookieVal)) {
      return cookieVal;
    }
  } catch (e) {
    // Ignore storage errors
  }

  return DEFAULT_LOCALE;
}

function persistLocale(newLocale: Locale) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    document.cookie = `${LOCALE_COOKIE_KEY}=${encodeURIComponent(newLocale)}; path=/; max-age=31536000; SameSite=Lax`;
    document.documentElement.lang = newLocale;
  } catch (e) {
    // Ignore storage errors
  }
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const saved = getSavedLocale();
    setLocaleState(saved);
    persistLocale(saved);
    setIsInitialized(true);
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    if (!SUPPORTED_LOCALES.includes(newLocale)) return;
    setLocaleState(newLocale);
    persistLocale(newLocale);
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>): string => {
      const activeDict = dictionaries[locale] || dictionaries[DEFAULT_LOCALE];
      const translated = getNestedTranslation(activeDict, key, params);
      
      // Fallback to English dictionary if key missing in active locale
      if (translated === key && locale !== DEFAULT_LOCALE) {
        return getNestedTranslation(dictionaries[DEFAULT_LOCALE], key, params);
      }
      return translated;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider');
  }
  return context;
}

