import { AssessmentDefinition, DimensionResult } from './types';

export const DASS21_ASSESSMENT: AssessmentDefinition = {
  id: 'dass-21',
  code: 'DASS-21',
  name: 'DASS-21: Emotional Well-Being',
  subtitle: 'Depression, Anxiety & Stress Scales (21 items)',
  description: 'A 21-item standardized self-reflection instrument measuring recent emotional states across three foundational dimensions: Depression, Anxiety, and Stress.',
  duration: '3 - 5 mins',
  itemCount: 21,
  license: 'Public Domain (Lovibond & Lovibond, 1995)',
  disclaimer: 'DASS-21 is an educational screening instrument designed for self-reflection and personal awareness. It is not a clinical diagnostic tool.',
  options: [
    { value: 0, label: '0', description: 'Did not apply to me at all' },
    { value: 1, label: '1', description: 'Applied to me to some degree, or some of the time' },
    { value: 2, label: '2', description: 'Applied to me to a considerable degree, or a good part of time' },
    { value: 3, label: '3', description: 'Applied to me very much, or most of the time' }
  ],
  questions: [
    { id: 1, text: 'I found it hard to wind down', dimension: 'stress' },
    { id: 2, text: 'I was aware of dryness of my mouth', dimension: 'anxiety' },
    { id: 3, text: 'I couldn\'t seem to experience any positive feeling at all', dimension: 'depression' },
    { id: 4, text: 'I experienced breathing difficulty (e.g. excessively rapid breathing, breathlessness in the absence of physical exertion)', dimension: 'anxiety' },
    { id: 5, text: 'I found it difficult to work up the initiative to do things', dimension: 'depression' },
    { id: 6, text: 'I tended to over-react to situations', dimension: 'stress' },
    { id: 7, text: 'I experienced trembling (e.g. in the hands)', dimension: 'anxiety' },
    { id: 8, text: 'I felt that I was using a lot of nervous energy', dimension: 'stress' },
    { id: 9, text: 'I was worried about situations in which I might panic and make a fool of myself', dimension: 'anxiety' },
    { id: 10, text: 'I felt that I had nothing to look forward to', dimension: 'depression' },
    { id: 11, text: 'I found myself getting agitated', dimension: 'stress' },
    { id: 12, text: 'I found it difficult to relax', dimension: 'stress' },
    { id: 13, text: 'I felt down-hearted and blue', dimension: 'depression' },
    { id: 14, text: 'I was intolerant of anything that kept me from getting on with what I was doing', dimension: 'stress' },
    { id: 15, text: 'I felt I was close to panic', dimension: 'anxiety' },
    { id: 16, text: 'I was unable to become enthusiastic about anything', dimension: 'depression' },
    { id: 17, text: 'I felt I wasn\'t worth much as a person', dimension: 'depression' },
    { id: 18, text: 'I felt that I was rather touchy', dimension: 'stress' },
    { id: 19, text: 'I was aware of the action of my heart in the absence of physical exertion', dimension: 'anxiety' },
    { id: 20, text: 'I felt scared without any good reason', dimension: 'anxiety' },
    { id: 21, text: 'I felt that life was meaningless', dimension: 'depression' }
  ],
  calculateResults: (answers: Record<number, number>) => {
    let rawDepression = 0;
    let rawAnxiety = 0;
    let rawStress = 0;

    // Item mappings according to Lovibond DASS-21
    const depressionItems = [3, 5, 10, 13, 16, 17, 21];
    const anxietyItems = [2, 4, 7, 9, 15, 19, 20];
    const stressItems = [1, 6, 8, 11, 12, 14, 18];

    depressionItems.forEach(id => {
      rawDepression += answers[id] || 0;
    });

    anxietyItems.forEach(id => {
      rawAnxiety += answers[id] || 0;
    });

    stressItems.forEach(id => {
      rawStress += answers[id] || 0;
    });

    // Standard DASS-21: multiply raw sum by 2 to align with full 42-item scale
    const finalDepression = rawDepression * 2;
    const finalAnxiety = rawAnxiety * 2;
    const finalStress = rawStress * 2;

    const getDepInfo = (score: number) => {
      if (score <= 9) return { 
        label: 'Normal', 
        color: '#2dd4bf', 
        weight: 1, 
        desc: 'You report healthy enthusiasm, active interest in everyday experiences, and steady positive engagement.' 
      };
      if (score <= 13) return { 
        label: 'Mild', 
        color: '#60a5fa', 
        weight: 2, 
        desc: 'You may be encountering mild situational fatigue or brief dips in spirit, which are natural responses to daily life.' 
      };
      if (score <= 20) return { 
        label: 'Moderate', 
        color: '#fbbf24', 
        weight: 3, 
        desc: 'You might feel dampened motivation or emotional exhaustion. Taking gentle pauses and connecting with loved ones will help restore your natural spark.' 
      };
      if (score <= 27) return { 
        label: 'Severe', 
        color: '#c084fc', 
        weight: 4, 
        desc: 'You appear to be experiencing noticeable emotional weight and fatigue. Prioritize self-compassion, unburden your schedule, and confide in someone you trust.' 
      };
      return { 
        label: 'Extremely Severe', 
        color: '#f472b6', 
        weight: 5, 
        desc: 'You are carrying significant emotional weight right now. Treat yourself with profound kindness, allow ample rest, and consider reaching out to a compassionate mental health professional.' 
      };
    };

    const getAnxInfo = (score: number) => {
      if (score <= 7) return { 
        label: 'Normal', 
        color: '#2dd4bf', 
        weight: 1, 
        desc: 'You manage everyday uncertainties with steady composure and maintain physical and emotional equilibrium.' 
      };
      if (score <= 9) return { 
        label: 'Mild', 
        color: '#60a5fa', 
        weight: 2, 
        desc: 'Occasional brief restlessness or overthinking may occur, but your natural coping mechanisms quickly restore balance.' 
      };
      if (score <= 14) return { 
        label: 'Moderate', 
        color: '#fbbf24', 
        weight: 3, 
        desc: 'You might occasionally notice physical nervousness or anticipatory tension. Slow diaphragmatic breathing (4-7-8) or grounding exercises can bring swift relief.' 
      };
      if (score <= 19) return { 
        label: 'Severe', 
        color: '#c084fc', 
        weight: 4, 
        desc: 'Your nervous system feels heightened and sensitive to external pressure. Moderate caffeine intake and ensure you have quiet, unpressured personal space.' 
      };
      return { 
        label: 'Extremely Severe', 
        color: '#f472b6', 
        weight: 5, 
        desc: 'Persistent nervous tension and worry are prominent. Your body is reminding you to step back, exhale deeply, and seek warm, stabilizing guidance.' 
      };
    };

    const getStrInfo = (score: number) => {
      if (score <= 14) return { 
        label: 'Normal', 
        color: '#2dd4bf', 
        weight: 1, 
        desc: 'You have solid emotional stamina, adapt smoothly to demands, and quickly decompress after challenging moments.' 
      };
      if (score <= 18) return { 
        label: 'Mild', 
        color: '#60a5fa', 
        weight: 2, 
        desc: 'Occasional end-of-day fatigue is present, but healthy sleep routines and relaxing walks swiftly replenish your energy.' 
      };
      if (score <= 25) return { 
        label: 'Moderate', 
        color: '#fbbf24', 
        weight: 3, 
        desc: 'Your workload or personal responsibilities may be pushing your bandwidth. Try chunking tasks into 15-minute intervals and taking frequent mindful breathers.' 
      };
      if (score <= 33) return { 
        label: 'Severe', 
        color: '#c084fc', 
        weight: 4, 
        desc: 'You are experiencing sustained tension and may feel easily impatient or depleted. This is a timely signal to postpone non-urgent tasks and protect your sleep.' 
      };
      return { 
        label: 'Extremely Severe', 
        color: '#f472b6', 
        weight: 5, 
        desc: 'Cumulative pressure is notably high. Grant yourself permission to take a mental pause, disconnect from obligations, and engage in activities that bring genuine peace.' 
      };
    };

    const dep = getDepInfo(finalDepression);
    const anx = getAnxInfo(finalAnxiety);
    const str = getStrInfo(finalStress);

    const maxWeight = Math.max(dep.weight, anx.weight, str.weight);
    let overallBadge = '🌱 Balanced & Centered';
    let overallColor = '#2dd4bf';
    let recommendations = [
      'Maintain your healthy routines: regular restful sleep, balanced nutrition, and positive connections.',
      'Dedicate 5–10 minutes each day to slow diaphragmatic breathing, mindful walks, or quiet reflection.'
    ];

    if (maxWeight === 2) {
      overallBadge = '🌤️ Mild Fatigue — Gentle Restoration';
      overallColor = '#60a5fa';
      recommendations = [
        'Aim for 7–9 hours of sleep nightly and disconnect from bright screens before bed.',
        'Jot down a quick evening journal to release lingering daily thoughts.',
        'Treat yourself to a relaxing break with a good friend or calming hobby.'
      ];
    } else if (maxWeight === 3) {
      overallBadge = '⛅ Moderate Strain — Prioritize Rest';
      overallColor = '#fbbf24';
      recommendations = [
        'Proactively postpone non-urgent tasks to give your mind breathing room.',
        'Practice calming breathwork or light physical movement (yoga, walking, muscle relaxation).',
        'Share your feelings with someone you trust rather than carrying pressures in silence.'
      ];
    } else {
      overallBadge = '🌸 High Strain — Be Gentle With Yourself';
      overallColor = '#c084fc';
      recommendations = [
        'Your mind and body are signaling a need for recovery after prolonged periods of pressure.',
        'Avoid making major life decisions when feeling emotionally strained; prioritize sleep and calm.',
        'Talk openly with supportive loved ones or consult a professional counselor for warm, structured guidance.',
        'Remember: Feeling overwhelmed at times is a natural human experience, and you do not have to carry it alone.'
      ];
    }

    const scores: Record<string, DimensionResult> = {
      depression: {
        id: 'depression',
        name: 'Depression',
        score: finalDepression,
        maxScore: 42,
        levelLabel: dep.label,
        levelColor: dep.color,
        description: dep.desc
      },
      anxiety: {
        id: 'anxiety',
        name: 'Anxiety',
        score: finalAnxiety,
        maxScore: 42,
        levelLabel: anx.label,
        levelColor: anx.color,
        description: anx.desc
      },
      stress: {
        id: 'stress',
        name: 'Stress',
        score: finalStress,
        maxScore: 42,
        levelLabel: str.label,
        levelColor: str.color,
        description: str.desc
      }
    };

    return {
      title: 'DASS-21 Emotional Well-Being Profile',
      summary: 'Standardized assessment across Depression, Anxiety, and Stress dimensions over the past week.',
      scores,
      actionGuide: {
        levelTitle: 'Supportive Well-Being Guidance',
        levelBadge: overallBadge,
        levelColor: overallColor,
        recommendations
      }
    };
  }
};