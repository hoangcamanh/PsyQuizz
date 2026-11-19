'use client';

import React from 'react';
import { DimensionResult } from '@/data/assessments/types';
import RadarSpiderChart from './RadarSpiderChart';
import QuadrantPlaneChart from './QuadrantPlaneChart';
import GaugeMeterChart from './GaugeMeterChart';

interface AssessmentVisualizerProps {
  assessmentId: string;
  scores: Record<string, DimensionResult>;
  locale?: string;
  className?: string;
}

export default function AssessmentVisualizer({
  assessmentId,
  scores,
  locale = 'vi',
  className = ''
}: AssessmentVisualizerProps) {
  if (assessmentId === 'bfi-44') {
    return <RadarSpiderChart scores={scores} locale={locale} className={className} />;
  }

  if (assessmentId === 'eysenck') {
    return <QuadrantPlaneChart scores={scores} locale={locale} className={className} />;
  }

  if (assessmentId === 'dass-21' || assessmentId === 'adhd') {
    return <GaugeMeterChart assessmentId={assessmentId} scores={scores} locale={locale} className={className} />;
  }

  return null;
}
