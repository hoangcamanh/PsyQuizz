import { AssessmentDefinition } from './types';
import { Locale } from '@/i18n/types';
import { createDass21Definition } from './content/dass21';
import { createBfi44Definition } from './content/bfi44';
import { createEysenckDefinition } from './content/eysenck';
import { createAdhdDefinition } from './content/adhd';

export * from './types';
export * from './content/dass21';
export * from './content/bfi44';
export * from './content/eysenck';
export * from './content/adhd';

// Backwards-compatible static definitions (default EN)
export const DASS21_ASSESSMENT = createDass21Definition('en');
export const BFI44_ASSESSMENT = createBfi44Definition('en');
export const EYSENCK_ASSESSMENT = createEysenckDefinition('en');
export const ADHD_ASSESSMENT = createAdhdDefinition('en');

export const ASSESSMENTS_REGISTRY: Record<string, AssessmentDefinition> = {
  'dass-21': DASS21_ASSESSMENT,
  'bfi-44': BFI44_ASSESSMENT,
  'eysenck': EYSENCK_ASSESSMENT,
  'adhd': ADHD_ASSESSMENT,
};

export const ALL_ASSESSMENTS: AssessmentDefinition[] = Object.values(ASSESSMENTS_REGISTRY);

export function getAssessmentById(id: string, locale: Locale = 'en'): AssessmentDefinition | undefined {
  switch (id) {
    case 'dass-21':
      return createDass21Definition(locale);
    case 'bfi-44':
      return createBfi44Definition(locale);
    case 'eysenck':
      return createEysenckDefinition(locale);
    case 'adhd':
      return createAdhdDefinition(locale);
    default:
      return undefined;
  }
}
