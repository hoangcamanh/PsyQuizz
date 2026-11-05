export interface AssessmentOption {
  value: number;
  label: string;
  description?: string;
}

export interface AssessmentQuestion {
  id: number;
  text: string;
  dimension: string;
  isReverse?: boolean;
}

export interface DimensionResult {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  averageScore?: number;
  levelLabel?: string;
  levelColor?: string;
  description: string;
}

export interface AssessmentDefinition {
  id: string;
  code: string;
  name: string;
  subtitle: string;
  description: string;
  duration: string;
  itemCount: number;
  license: string;
  disclaimer: string;
  options: AssessmentOption[];
  questions: AssessmentQuestion[];
  notebookLmUrl?: string;
  notebookLmPrompts?: string[];
  calculateResults: (answers: Record<number, number>) => {
    title: string;
    summary: string;
    scores: Record<string, DimensionResult>;
    actionGuide?: {
      levelTitle: string;
      levelBadge: string;
      levelColor: string;
      recommendations: string[];
      emergencyNote?: string;
    };
  };
}
