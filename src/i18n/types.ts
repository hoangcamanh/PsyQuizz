export type Locale = 'en' | 'vi';

export interface TranslationDictionary {
  [key: string]: string | TranslationDictionary;
}

export interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

