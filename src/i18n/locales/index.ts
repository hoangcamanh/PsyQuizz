import { Locale } from '../types';
import { commonEn } from './en/common';
import { commonVi } from './vi/common';
import { landingEn } from './en/landing';
import { landingVi } from './vi/landing';

export const dictionaries = {
  en: {
    common: commonEn,
    landing: landingEn,
  },
  vi: {
    common: commonVi,
    landing: landingVi,
  },
};

export function getNestedTranslation(
  dict: any,
  path: string,
  params?: Record<string, string | number>
): string {
  const keys = path.split('.');
  let current: any = dict;

  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = current[key];
    } else {
      return path; // Fallback to key if not found
    }
  }

  if (typeof current !== 'string') {
    return path;
  }

  let text = current;
  if (params) {
    Object.entries(params).forEach(([paramKey, paramVal]) => {
      text = text.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), String(paramVal));
    });
  }

  return text;
}

