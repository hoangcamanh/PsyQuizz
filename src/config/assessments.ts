export interface AssessmentData {
  id: 'dass-21' | 'bfi-44' | 'eysenck' | 'adhd';
  title: string;
  subtitle: string;
  description: string;
  ctaText: string;
  destinationUrl?: string;
  isExternal: boolean;
  destinationType: 'tally' | 'internal' | 'external';
  modalContent: {
    title: string;
    about: string;
    purpose: string[];
    instructions: string[];
    notice: string;
  };
}

export const ASSESSMENTS: AssessmentData[] = [
  {
    id: 'dass-21',
    title: 'DASS-21',
    subtitle: 'Depression, Anxiety & Stress',
    description: 'Measure depression, anxiety, and stress levels.',
    ctaText: 'Take the Test',
    destinationUrl: '/assessment/dass-21',
    isExternal: false,
    destinationType: 'internal',
    modalContent: {
      title: 'Before You Begin: DASS-21',
      about:
        'The DASS-21 scale is one of the most widely used psychometric instruments in the world for rapid screening of emotional well-being, specifically symptoms related to depression, anxiety, and stress.',
      purpose: [
        'Gain objective self-awareness regarding your emotional state over the past week.',
        'Distinguish between physical tension (stress), physiological arousal (anxiety), and low mood (depression).',
        'Identify specific indicators to reflect on or discuss with a compassionate mental health professional.',
      ],
      instructions: [
        'Read each statement carefully and select the response that best describes your experience over the past week.',
        'Respond naturally and spontaneously without overthinking any single question.',
        'There are no right or wrong answers; choose the response that feels most honest to you.',
      ],
      notice:
        'Crucial note: DASS-21 is strictly a screening instrument, not a diagnostic test. An accurate clinical diagnosis requires in-depth evaluation and clinical interviews with a mental health professional. A high score does not mean you have a diagnosed depression or anxiety disorder.',
    },
  },
  {
    id: 'bfi-44',
    title: 'Big Five (BFI-44)',
    subtitle: 'Personality Dimensions',
    description: 'Discover your profile across five key personality traits.',
    ctaText: 'Take the Test',
    destinationUrl: '/assessment/bfi-44',
    isExternal: false,
    destinationType: 'internal',
    modalContent: {
      title: 'Before You Begin: Big Five (BFI-44)',
      about:
        'The BFI-44 is an internationally recognized version measuring personality across the Big Five model—one of the most scientifically robust and widely accepted classification frameworks in modern psychology.',
      purpose: [
        'Map your personality profile across 5 foundational dimensions: Extraversion, Agreeableness, Conscientiousness, Neuroticism, and Openness.',
        'Understand your characteristic behavioral tendencies, social interaction styles, and work habits.',
        'Use evidence-based personality psychology to guide personal growth according to your unique aspirations.',
      ],
      instructions: [
        'Please respond based on how you genuinely see yourself in typical everyday life, rather than how you wish to be.',
        'Answer each statement honestly on the 5-point scale (from 1: Disagree strongly to 5: Agree strongly).',
        'Take note that each personality trait carries unique natural superpowers and potential blind spots.',
      ],
      notice:
        'Please note that this assessment evaluates your personality traits—which can evolve and develop over time with fewer innate biological constraints compared to temperament (measured in the Eysenck test). This test helps you understand your current self to orient conscious development according to your needs.',
    },
  },
  {
    id: 'eysenck',
    title: 'Eysenck Personality Test',
    subtitle: 'Biological Temperament (EPI)',
    description: 'Explore core temperament and nervous system dynamics.',
    ctaText: 'Take the Test',
    destinationUrl: '/assessment/eysenck',
    isExternal: false,
    destinationType: 'internal',
    modalContent: {
      title: 'Before You Begin: Eysenck Personality Questionnaire',
      about:
        'Hans Eysenck’s Personality Theory (often translated as Temperament) is one of the most influential frameworks in personality psychology, exploring the biological foundations of human responsiveness.',
      purpose: [
        'Discover your position across foundational dimensions: Extraversion-Introversion and Neuroticism (Emotional Stability).',
        'Identify which of the four classic biological temperaments best characterizes you: Sanguine, Choleric, Melancholic, or Phlegmatic.',
        'Gain clarity on your nervous system’s natural speed of arousal, reaction intensity, and recovery patterns.',
      ],
      instructions: [
        'Answer each question simply with "Yes" or "No".',
        'Respond spontaneously with your first natural reaction without deliberating too long on any question.',
        'Be genuine; the questionnaire includes a built-in scale to measure response authenticity.',
      ],
      notice:
        'A person\'s "temperament" is directly connected to their underlying nervous system processes—its speed and strength (explaining why some people heat up fast but cool down quickly, while others remain calm and steady). Note: If you feel your temperament profile seems to have certain disadvantages, remember that temperament and coping habits can be adapted and developed over time.',
    },
  },
  {
    id: 'adhd',
    title: 'ADHD Screening',
    subtitle: 'Attention & Executive Function',
    description: 'Screen attention, focus, and concentration patterns.',
    ctaText: 'Take the Test',
    destinationUrl: '/assessment/adhd',
    isExternal: false,
    destinationType: 'internal',
    modalContent: {
      title: 'Before You Begin: ADHD Screening Questionnaire',
      about:
        'Developed in conjunction with the World Health Organization (WHO) and Harvard Medical School, this standardized 18-item scale is widely utilized by leading UK clinical organizations and worldwide healthcare providers to screen for adult ADHD.',
      purpose: [
        'Evaluate symptoms of inattention, working memory friction, and task procrastination.',
        'Assess indicators of physical or mental hyperactivity, restlessness, and impulse control.',
        'Generate a structured screening report grounded in WHO clinical threshold criteria.',
      ],
      instructions: [
        'Consider your typical experiences across work, study, and daily activities over recent months.',
        'Select the response that best describes how frequently each stated situation occurs for you (Never to Very Often).',
        'Answer honestly according to your typical patterns rather than isolated exceptional days.',
      ],
      notice:
        'This assessment is a screening instrument, not a medical diagnosis. High screening scores indicate that your attention patterns are consistent with adult ADHD characteristics, which can serve as valuable context for discussion with a qualified psychiatrist or clinical specialist.',
    },
  },
];