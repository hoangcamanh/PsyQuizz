import { Locale } from './types';

export const DEFAULT_LOCALE: Locale = 'en';
export const SUPPORTED_LOCALES: Locale[] = ['en', 'vi'];
export const LOCALE_COOKIE_KEY = 'NEXT_LOCALE';
export const LOCALE_STORAGE_KEY = 'psyquizz_locale';

export const LOCALE_LABELS: Record<Locale, { label: string; nativeName: string; flag: string }> = {
  vi: {
    label: 'Vietnamese',
    nativeName: 'Tiếng Việt',
    flag: '🇻🇳',
  },
  en: {
    label: 'English',
    nativeName: 'English',
    flag: '🇬🇧',
  },
};

