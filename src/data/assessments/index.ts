import { AssessmentDefinition } from './types';
import { DASS21_ASSESSMENT } from './dass21';
import { BFI44_ASSESSMENT } from './bfi44';
import { EYSENCK_ASSESSMENT } from './eysenck';
import { ADHD_ASSESSMENT } from './adhd';

export * from './types';
export * from './dass21';
export * from './bfi44';
export * from './eysenck';
export * from './adhd';

export const ASSESSMENTS_REGISTRY: Record<string, AssessmentDefinition> = {
  'dass-21': DASS21_ASSESSMENT,
  'bfi-44': BFI44_ASSESSMENT,
  'eysenck': EYSENCK_ASSESSMENT,
  'adhd': ADHD_ASSESSMENT,
};

export const ALL_ASSESSMENTS: AssessmentDefinition[] = Object.values(ASSESSMENTS_REGISTRY);

export function getAssessmentById(id: string): AssessmentDefinition | undefined {
  return ASSESSMENTS_REGISTRY[id];
}