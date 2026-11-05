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
        'The Depression, Anxiety and Stress Scale (DASS-21) is a 21-question self-report assessment designed to measure symptoms associated with depression, anxiety, and stress over the past week.',
      purpose: [
        'Reflect on your recent emotional well-being.',
        'Better understand symptoms of depression, anxiety, and stress.',
        'Identify concerns you may wish to discuss with a qualified mental health professional.',
      ],
      instructions: [
        'Read each statement carefully and select the response that best describes how much it applied to you over the past week.',
        'There are no right or wrong answers. Respond honestly and avoid spending too much time on any single question.',
        'You will continue to the designated assessment form to record your responses.',
      ],
      notice:
        'DASS-21 is a screening instrument, not a diagnostic test. It cannot determine whether you have a mental health disorder or predict your future mental health. If you are concerned about your emotional well-being, consider seeking guidance from a qualified mental health professional.',
    },
  },
  {
    id: 'bfi-44',
    title: 'Big Five (BFI-44)',
    subtitle: 'Personality Traits',
    description: 'Discover your profile across five key personality traits.',
    ctaText: 'Take the Test',
    destinationUrl: '/assessment/bfi-44',
    isExternal: false,
    destinationType: 'internal',
    modalContent: {
      title: 'Before You Begin: Big Five (BFI-44)',
      about:
        'The Big Five Inventory (BFI-44) is an established 44-item psychometric questionnaire designed to evaluate personality across five foundational dimensions: Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.',
      purpose: [
        'Gain objective insight into your characteristic patterns of thinking, feeling, and behaving.',
        'Understand your core behavioral tendencies and interpersonal preferences.',
        'Support personal reflection through empirically validated personality psychology.',
      ],
      instructions: [
        'Please respond based on how you generally see yourself in daily life, rather than how you wish or aspire to be.',
        'Answer each statement honestly based on your typical habits and natural reactions.',
        'There are no right or wrong answers. Proceed through the statements at a steady pace.',
      ],
      notice:
        'This inventory describes general personality tendencies and traits. It is not designed to diagnose psychological conditions or evaluate mental pathology.',
    },
  },
  {
    id: 'eysenck',
    title: 'Eysenck Personality Test',
    subtitle: 'Personality & Temperament',
    description: 'Explore core temperament and personality dimensions.',
    ctaText: 'Take the Test',
    destinationUrl:
      process.env.NEXT_PUBLIC_EYSENCK_URL ||
      'https://psy-edu.net/test/eysencks-personality-inventory-epi-extroversionintroversion/',
    isExternal: true,
    destinationType: 'external',
    modalContent: {
      title: 'Before You Begin: Eysenck Personality Questionnaire',
      about:
        'The Eysenck Personality Test evaluates foundational temperament dimensions—primarily Extraversion-Introversion and Neuroticism (Emotional Stability)—grounded in biological and physiological theories of personality.',
      purpose: [
        'Explore your baseline temperament traits and behavioral responsiveness.',
        'Examine how natural arousal patterns relate to your social interactions and coping style.',
        'Provide educational insight into classic dimensional models of personality.',
      ],
      instructions: [
        'Answer each question indicating whether the stated behavior generally applies to you.',
        'Respond spontaneously with your first reaction without overthinking any single question.',
        'You will be redirected to an external assessment provider to complete this questionnaire. Please review its privacy policy before submitting personal information.',
      ],
      notice:
        'This assessment is provided for educational and self-exploration purposes only. It does not constitute a clinical psychiatric evaluation or diagnosis.',
    },
  },
  {
    id: 'adhd',
    title: 'ADHD Screening',
    subtitle: 'Attention & Focus',
    description: 'Screen attention, focus, and concentration patterns.',
    ctaText: 'Take the Test',
    destinationUrl:
      process.env.NEXT_PUBLIC_ADHD_URL ||
      'https://www.careadhd.co.uk/free-online-adhd-screening-test',
    isExternal: true,
    destinationType: 'external',
    modalContent: {
      title: 'Before You Begin: ADHD Screening Questionnaire',
      about:
        'This questionnaire is a standardized self-report screening instrument designed to identify behavioral patterns associated with attention, concentration, and impulse regulation.',
      purpose: [
        'Document personal challenges related to focus, task organization, and sustained attention.',
        'Provide structured observations to help articulate concerns in academic, work, or daily settings.',
        'Assist in preparing relevant information for consultation with a qualified medical professional.',
      ],
      instructions: [
        'Consider your typical experiences across work, study, and daily activities over recent months.',
        'Select the response that best describes how frequently each stated situation occurs for you.',
        'You will be redirected to an external assessment provider to complete this screening. Please review its privacy policy before submitting personal information.',
      ],
      notice:
        'This questionnaire is strictly an informational screening tool and cannot diagnose Attention Deficit Hyperactivity Disorder (ADHD). A formal diagnosis requires comprehensive clinical evaluation by a licensed psychiatrist, neurologist, or clinical psychologist.',
    },
  },
];
