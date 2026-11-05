import { AssessmentDefinition, DimensionResult } from './types';

export const ADHD_ASSESSMENT: AssessmentDefinition = {
  id: 'adhd',
  code: 'ASRS-18',
  name: 'Adult ADHD Screening Scale (ASRS v1.1)',
  subtitle: 'WHO Adult ADHD Self-Report Scale (18 items)',
  description: 'An internationally validated 18-item screening questionnaire developed in conjunction with the World Health Organization (WHO) and Harvard Medical School to assess adult attention patterns, executive functioning, and hyperactivity.',
  duration: '4 - 6 mins',
  itemCount: 18,
  license: 'Public Domain (World Health Organization & Harvard Medical School)',
  disclaimer: 'This assessment is a scientifically validated screening instrument for educational self-awareness. It cannot replace a comprehensive clinical consultation with a qualified psychiatrist or clinical psychologist.',
  notebookLmUrl: 'https://notebook.google.com/notebook/a3405fea-e381-4b2d-b50d-b30cff62b7bb',
  notebookLmPrompts: [
    'What are the core differences between Inattentive and Hyperactive-Impulsive presentations of adult ADHD?',
    'What evidence-based executive functioning strategies help adults manage procrastination and time blindness?',
    'How do dopamine regulation and interest-based nervous systems influence ADHD focus?',
    'What lifestyle adaptations (exercise, sleep, environment design) best support ADHD brains?'
  ],
  options: [
    { value: 0, label: '0', description: 'Never' },
    { value: 1, label: '1', description: 'Rarely' },
    { value: 2, label: '2', description: 'Sometimes' },
    { value: 3, label: '3', description: 'Often' },
    { value: 4, label: '4', description: 'Very Often' }
  ],
  questions: [
    // Part A: Core 6 screening questions
    { id: 1, text: 'How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?', dimension: 'inattention' },
    { id: 2, text: 'How often do you have difficulty getting things in order when you have to do a task that requires organization?', dimension: 'inattention' },
    { id: 3, text: 'How often do you have problems remembering appointments or obligations?', dimension: 'inattention' },
    { id: 4, text: 'When you have a task that requires a lot of thought, how often do you avoid or delay getting started?', dimension: 'inattention' },
    { id: 5, text: 'How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?', dimension: 'hyperactivity' },
    { id: 6, text: 'How often do you feel overly active and compelled to do things, like you were driven by a motor?', dimension: 'hyperactivity' },
    // Part B: Additional 12 symptom severity questions
    { id: 7, text: 'How often do you make careless mistakes when you have to work on a boring or difficult project?', dimension: 'inattention' },
    { id: 8, text: 'How often do you have difficulty keeping your attention when you are doing boring or repetitive work?', dimension: 'inattention' },
    { id: 9, text: 'How often do you have difficulty concentrating on what people say to you, even when they are speaking to you directly?', dimension: 'inattention' },
    { id: 10, text: 'How often do you misplace or have difficulty finding things at home or at work?', dimension: 'inattention' },
    { id: 11, text: 'How often are you distracted by activity or noise around you?', dimension: 'inattention' },
    { id: 12, text: 'How often do you leave your seat in meetings or other situations in which you are expected to remain seated?', dimension: 'hyperactivity' },
    { id: 13, text: 'How often do you feel restless or squirmy?', dimension: 'hyperactivity' },
    { id: 14, text: 'How often do you have difficulty unwinding and relaxing when you have time to yourself?', dimension: 'hyperactivity' },
    { id: 15, text: 'How often do you find yourself talking too much when you are in social situations?', dimension: 'hyperactivity' },
    { id: 16, text: 'When you are in a conversation, how often do you find yourself finishing the sentences of the people you are talking to before they can finish them?', dimension: 'hyperactivity' },
    { id: 17, text: 'How often do you have difficulty waiting your turn in situations when turn-taking is required?', dimension: 'hyperactivity' },
    { id: 18, text: 'How often do you interrupt others when they are busy?', dimension: 'hyperactivity' }
  ],
  calculateResults: (answers: Record<number, number>) => {
    // Official WHO ASRS v1.1 Scoring Algorithm
    // Part A: Questions 1-6. Thresholds:
    // Q1, Q2, Q3: Positive if score >= 2 (Sometimes, Often, Very Often)
    // Q4, Q5, Q6: Positive if score >= 3 (Often, Very Often)
    let partAPositiveCount = 0;
    if ((answers[1] || 0) >= 2) partAPositiveCount += 1;
    if ((answers[2] || 0) >= 2) partAPositiveCount += 1;
    if ((answers[3] || 0) >= 2) partAPositiveCount += 1;
    if ((answers[4] || 0) >= 3) partAPositiveCount += 1;
    if ((answers[5] || 0) >= 3) partAPositiveCount += 1;
    if ((answers[6] || 0) >= 3) partAPositiveCount += 1;

    // Subscales:
    // Inattention items: 1, 2, 3, 4, 7, 8, 9, 10, 11 (9 items, max 36)
    const inattItems = [1, 2, 3, 4, 7, 8, 9, 10, 11];
    let inattScore = 0;
    inattItems.forEach(id => {
      inattScore += answers[id] || 0;
    });

    // Hyperactivity / Impulsivity items: 5, 6, 12, 13, 14, 15, 16, 17, 18 (9 items, max 36)
    const hyperItems = [5, 6, 12, 13, 14, 15, 16, 17, 18];
    let hyperScore = 0;
    hyperItems.forEach(id => {
      hyperScore += answers[id] || 0;
    });

    const totalRawScore = inattScore + hyperScore; // Max 72

    // Clinical Interpretation of Part A
    const isHighProbability = partAPositiveCount >= 4;
    const isModerateProbability = partAPositiveCount >= 2 && partAPositiveCount <= 3;

    let overallBadge = '🌱 Typical Executive Function';
    let overallColor = '#10B981';
    let summaryText = 'Your responses reflect typical attention and executive functioning patterns, with few significant disruptions to everyday routines.';
    let recommendations = [
      'Maintain your current organizational habits, calendars, and routines that support sustained focus.',
      'Incorporate structured work intervals (such as 25-minute Pomodoro sessions) during complex tasks.'
    ];

    if (isHighProbability) {
      overallBadge = '⚡ High Consistency with ADHD Traits';
      overallColor = '#F59E0B';
      summaryText = 'Your Part A screening score indicates a notable presence of symptoms consistent with adult ADHD. This suggests your brain may operate on an interest-based nervous system that thrives on novelty and specialized organizational strategies.';
      recommendations = [
        'Explore body doubling, visual cues, and external timers to bridge executive function gaps.',
        'Consider sharing this report with a qualified healthcare provider or ADHD specialist for formal clinical evaluation.',
        'Design your environment to minimize friction: keep high-priority tools in plain sight and automate repetitive logistics.'
      ];
    } else if (isModerateProbability) {
      overallBadge = '🌤️ Moderate Attention Fluctuations';
      overallColor = '#3B82F6';
      summaryText = 'You experience occasional challenges with focus, procrastination, or restlessness, which may fluctuate depending on stress levels, sleep, and interest in current tasks.';
      recommendations = [
        'Notice what environments trigger mental drift and proactively reduce auditory and visual distractions.',
        'Break larger, ambiguous obligations into concrete 10-minute micro-steps.',
        'Prioritize consistent sleep and regular cardiovascular exercise to naturally boost baseline dopamine.'
      ];
    }

    const scores: Record<string, DimensionResult> = {
      screeningPartA: {
        id: 'screeningPartA',
        name: 'WHO Part A Core Screening',
        score: partAPositiveCount,
        maxScore: 6,
        levelLabel: isHighProbability ? 'Positive Screen (>= 4)' : isModerateProbability ? 'Moderate (2-3)' : 'Low (0-1)',
        levelColor: isHighProbability ? '#F59E0B' : isModerateProbability ? '#3B82F6' : '#10B981',
        description: isHighProbability
          ? 'You endorsed 4 or more core symptoms exceeding clinical threshold. In clinical research, this strongly correlates with adult ADHD characteristics.'
          : 'You endorsed fewer than 4 symptoms above clinical threshold, indicating fewer core disruptions in primary executive tasks.'
      },
      inattention: {
        id: 'inattention',
        name: 'Inattention & Working Memory',
        score: inattScore,
        maxScore: 36,
        averageScore: +(inattScore / 9).toFixed(1),
        levelLabel: inattScore >= 20 ? 'Elevated Inattention' : inattScore >= 12 ? 'Moderate Inattention' : 'Mild / Low',
        levelColor: inattScore >= 20 ? '#F59E0B' : '#3B82F6',
        description: inattScore >= 18 
          ? 'You experience frequent wandering attention, task-switching friction, forgetfulness, or difficulty sustaining focus on routine obligations.' 
          : 'You generally sustain adequate attention on tasks and maintain functional day-to-day organization.'
      },
      hyperactivity: {
        id: 'hyperactivity',
        name: 'Hyperactivity & Impulsivity',
        score: hyperScore,
        maxScore: 36,
        averageScore: +(hyperScore / 9).toFixed(1),
        levelLabel: hyperScore >= 20 ? 'Elevated Hyperactivity' : hyperScore >= 12 ? 'Moderate Restlessness' : 'Mild / Low',
        levelColor: hyperScore >= 20 ? '#F59E0B' : '#3B82F6',
        description: hyperScore >= 18 
          ? 'You experience physical or mental restlessness, internal urgency, rapid verbal flow, or difficulty unwinding quietly.' 
          : 'You experience comfortable physical composure, smooth turn-taking, and ease in relaxing when stationary.'
      }
    };

    return {
      title: 'Adult ADHD Screening Profile (ASRS v1.1)',
      summary: summaryText,
      scores,
      actionGuide: {
        levelTitle: 'Executive Function & Neurodiversity Support',
        levelBadge: overallBadge,
        levelColor: overallColor,
        recommendations
      }
    };
  }
};