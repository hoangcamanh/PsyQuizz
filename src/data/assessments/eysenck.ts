import { AssessmentDefinition, DimensionResult } from './types';

export const EYSENCK_ASSESSMENT: AssessmentDefinition = {
  id: 'eysenck',
  code: 'EPI-57',
  name: 'Eysenck Personality & Temperament (EPI)',
  subtitle: 'Eysenck Personality Inventory (57 items)',
  description: 'A classic psychometric assessment evaluating biological temperament and personality dynamics across Extraversion, Neuroticism, and the Lie (Social Desirability) scale.',
  duration: '5 - 8 mins',
  itemCount: 57,
  license: 'Public Domain (Eysenck & Eysenck, 1964)',
  disclaimer: 'Temperament relates to the underlying speed and strength of your nervous system processes. It is a biological foundation for your habits and can be adapted and developed over time.',
  notebookLmUrl: 'https://notebook.google.com/notebook/51f97a44-cdcb-43bd-9ac5-cee21c64e228',
  notebookLmPrompts: [
    'How does biological temperament relate to nervous system arousal and reactivity according to Hans Eysenck?',
    'What are the unique career and relational strengths of a Phlegmatic vs a Sanguine temperament?',
    'Can someone modify or adapt their innate temperament tendencies over time through neuroplasticity?',
    'How does the balance between Extraversion and Neuroticism shape stress resilience?'
  ],
  options: [
    { value: 1, label: 'Yes', description: 'Yes, this describes me' },
    { value: 0, label: 'No', description: 'No, this does not describe me' }
  ],
  questions: [
    { id: 1, text: 'Do you often long for excitement?', dimension: 'extraversion' },
    { id: 2, text: 'Do you often need understanding friends to cheer you up?', dimension: 'neuroticism' },
    { id: 3, text: 'Are you usually carefree?', dimension: 'extraversion' },
    { id: 4, text: 'Do you find it very hard to take no for an answer?', dimension: 'neuroticism' },
    { id: 5, text: 'Do you stop and think things over before doing anything?', dimension: 'extraversion', isReverse: true },
    { id: 6, text: 'If you say you will do something, do you always keep your promise no matter how inconvenient it might be?', dimension: 'lie' },
    { id: 7, text: 'Do your moods go up and down?', dimension: 'neuroticism' },
    { id: 8, text: 'Do you generally do and say things quickly without stopping to think?', dimension: 'extraversion' },
    { id: 9, text: 'Do you ever feel "just miserable" for no good reason?', dimension: 'neuroticism' },
    { id: 10, text: 'Would you do almost anything for a dare?', dimension: 'extraversion' },
    { id: 11, text: 'Do you suddenly feel shy when you want to talk to an attractive stranger?', dimension: 'neuroticism' },
    { id: 12, text: 'Once in a while do you lose your temper and get angry?', dimension: 'lie', isReverse: true },
    { id: 13, text: 'Do you often do things on the spur of the moment?', dimension: 'extraversion' },
    { id: 14, text: 'Do you often worry about things you should not have done or said?', dimension: 'neuroticism' },
    { id: 15, text: 'Generally do you prefer reading to meeting people?', dimension: 'extraversion', isReverse: true },
    { id: 16, text: 'Are your feelings rather easily hurt?', dimension: 'neuroticism' },
    { id: 17, text: 'Do you like going out a lot?', dimension: 'extraversion' },
    { id: 18, text: 'Do you occasionally have thoughts and ideas that you would not like other people to know about?', dimension: 'lie', isReverse: true },
    { id: 19, text: 'Are you sometimes bubbling over with energy and sometimes very sluggish?', dimension: 'neuroticism' },
    { id: 20, text: 'Do you prefer to have few but special friends?', dimension: 'extraversion', isReverse: true },
    { id: 21, text: 'Do you daydream a lot?', dimension: 'neuroticism' },
    { id: 22, text: 'When people shout at you, do you shout back?', dimension: 'extraversion' },
    { id: 23, text: 'Are you often troubled about feelings of guilt?', dimension: 'neuroticism' },
    { id: 24, text: 'Are all your habits good and desirable ones?', dimension: 'lie' },
    { id: 25, text: 'Can you usually let yourself go and have a good time at a lively party?', dimension: 'extraversion' },
    { id: 26, text: 'Would you call yourself a nervous person?', dimension: 'neuroticism' },
    { id: 27, text: 'Do other people think of you as being very lively?', dimension: 'extraversion' },
    { id: 28, text: 'After you have done something important, do you often come away feeling you could have done it better?', dimension: 'neuroticism' },
    { id: 29, text: 'Are you usually quiet when you are with other people?', dimension: 'extraversion', isReverse: true },
    { id: 30, text: 'Do you sometimes gossip?', dimension: 'lie', isReverse: true },
    { id: 31, text: 'Do ideas run through your head so that you cannot sleep?', dimension: 'neuroticism' },
    { id: 32, text: 'If there is something you want to know about, would you rather look it up in a book than talk to someone about it?', dimension: 'extraversion', isReverse: true },
    { id: 33, text: 'Do you get palpitations or thumping in your heart?', dimension: 'neuroticism' },
    { id: 34, text: 'Do you like the kind of work that you need to pay close attention to?', dimension: 'extraversion', isReverse: true },
    { id: 35, text: 'Do you get attacks of shaking or trembling?', dimension: 'neuroticism' },
    { id: 36, text: 'Would you always declare everything at customs, even if you knew you would not be found out?', dimension: 'lie' },
    { id: 37, text: 'Do you hate being with a crowd who play jokes on one another?', dimension: 'extraversion', isReverse: true },
    { id: 38, text: 'Are you an irritable person?', dimension: 'neuroticism' },
    { id: 39, text: 'Do you like doing things in which you have to act quickly?', dimension: 'extraversion' },
    { id: 40, text: 'Do you worry about awful things that might happen?', dimension: 'neuroticism' },
    { id: 41, text: 'Are you slow and unhurried in the way you move?', dimension: 'extraversion', isReverse: true },
    { id: 42, text: 'Have you ever been late for an appointment or work?', dimension: 'lie', isReverse: true },
    { id: 43, text: 'Do you have many nightmares?', dimension: 'neuroticism' },
    { id: 44, text: 'Do you like talking to people so much that you never miss a chance of talking to a stranger?', dimension: 'extraversion' },
    { id: 45, text: 'Are you troubled by aches and pains?', dimension: 'neuroticism' },
    { id: 46, text: 'Would you be very unhappy if you could not see lots of people most of the time?', dimension: 'extraversion' },
    { id: 47, text: 'Would you call yourself a tense or highly-strung person?', dimension: 'neuroticism' },
    { id: 48, text: 'Of all the people you know, are there some whom you definitely do not like?', dimension: 'lie', isReverse: true },
    { id: 49, text: 'Would you say you are fairly self-confident?', dimension: 'extraversion' },
    { id: 50, text: 'Are you easily hurt when people find fault with you or the work you do?', dimension: 'neuroticism' },
    { id: 51, text: 'Do you find it hard to really enjoy yourself at a lively party?', dimension: 'extraversion', isReverse: true },
    { id: 52, text: 'Are you troubled with feelings of inferiority?', dimension: 'neuroticism' },
    { id: 53, text: 'Can you easily get some life into a rather dull party?', dimension: 'extraversion' },
    { id: 54, text: 'Do you sometimes talk about things you know nothing about?', dimension: 'lie', isReverse: true },
    { id: 55, text: 'Do you worry about your health?', dimension: 'neuroticism' },
    { id: 56, text: 'Do you like playing practical jokes on others?', dimension: 'extraversion' },
    { id: 57, text: 'Do you suffer from sleeplessness?', dimension: 'neuroticism' }
  ],
  calculateResults: (answers: Record<number, number>) => {
    // Standard Eysenck EPI scoring key
    // Extraversion: 24 items (15 'Yes', 9 'No')
    const extYes = [1, 3, 8, 10, 13, 17, 22, 25, 27, 39, 44, 46, 49, 53, 56];
    const extNo = [5, 15, 20, 29, 32, 34, 37, 41, 51];

    let extScore = 0;
    extYes.forEach(id => {
      if (answers[id] === 1) extScore += 1;
    });
    extNo.forEach(id => {
      if (answers[id] === 0) extScore += 1;
    });

    // Neuroticism: 24 items (all 'Yes')
    const neuYes = [2, 4, 7, 9, 11, 14, 16, 19, 21, 23, 26, 28, 31, 33, 35, 38, 40, 43, 45, 47, 50, 52, 55, 57];
    let neuScore = 0;
    neuYes.forEach(id => {
      if (answers[id] === 1) neuScore += 1;
    });

    // Lie Scale: 9 items (3 'Yes', 6 'No')
    const lieYes = [6, 24, 36];
    const lieNo = [12, 18, 30, 42, 48, 54];
    let lieScore = 0;
    lieYes.forEach(id => {
      if (answers[id] === 1) lieScore += 1;
    });
    lieNo.forEach(id => {
      if (answers[id] === 0) lieScore += 1;
    });

    // Determine Quadrant Temperament
    // E median is 12, N median is 12
    const isExt = extScore > 12;
    const isNeu = neuScore > 12;

    let temperamentTitle = '';
    let temperamentBadge = '';
    let temperamentColor = '#8B5CF6';
    let temperamentDesc = '';
    let recommendations: string[] = [];

    if (isExt && isNeu) {
      // Choleric (Nóng nảy / Bold & Dynamic)
      temperamentTitle = 'Choleric Temperament (Bold & Dynamic)';
      temperamentBadge = '🔥 Choleric (Active & Passionate)';
      temperamentColor = '#F59E0B';
      temperamentDesc = 'You have a high-energy nervous system: quick to react, passionate, decisive, and ambitious. You are driven by challenges, though you may occasionally feel quick to react or impatient when obstacles arise.';
      recommendations = [
        'Channel your dynamic passion into goal-driven leadership and creative projects.',
        'Practice brief pauses before reacting in high-stakes conversations to allow your nervous system to regulate.',
        'Incorporate grounding physical movement (martial arts, endurance sports) to productively release excess arousal.'
      ];
    } else if (isExt && !isNeu) {
      // Sanguine (Hoạt bát / Sociable & Outgoing)
      temperamentTitle = 'Sanguine Temperament (Sociable & Outgoing)';
      temperamentBadge = '✨ Sanguine (Lively & Carefree)';
      temperamentColor = '#10B981';
      temperamentDesc = 'You have a balanced and lively nervous system: optimistic, warm, adaptable, and naturally communicative. You build rapport effortlessly, recover quickly from setbacks, and bring positive morale to group settings.';
      recommendations = [
        'Thrive in collaborative environments, communication roles, and community-building initiatives.',
        'Pair your spontaneous enthusiasm with structured planning systems to follow through on long-term goals.',
        'Protect time for deep, quiet focus amidst social engagements to maintain momentum.'
      ];
    } else if (!isExt && isNeu) {
      // Melancholic (U sầu / Thoughtful & Sensitive)
      temperamentTitle = 'Melancholic Temperament (Thoughtful & Sensitive)';
      temperamentBadge = '🌊 Melancholic (Deep & Analytical)';
      temperamentColor = '#8B5CF6';
      temperamentDesc = 'You possess a deeply perceptive, introspective, and detail-attuned nervous system. You feel emotions with profound richness, think deeply about life, and bring immense dedication and care to quality and craft.';
      recommendations = [
        'Honor your rich inner world and sensitivity as a superpower for deep analytical thinking and artistic depth.',
        'Counter self-critical tendencies by intentionally celebrating small daily milestones.',
        'Ensure predictable routines, quiet recharge spaces, and compassionate self-talk when navigating stress.'
      ];
    } else {
      // Phlegmatic (Điềm đạm / Calm & Peaceful)
      temperamentTitle = 'Phlegmatic Temperament (Calm & Peaceful)';
      temperamentBadge = '🌱 Phlegmatic (Steadfast & Serene)';
      temperamentColor = '#3B82F6';
      temperamentDesc = 'You have a stable, tranquil, and highly resilient nervous system: steady, patient, reliable, and unruffled by chaos. You provide calming leadership, observe situations objectively, and excel in maintaining equilibrium.';
      recommendations = [
        'Leverage your remarkable calm and composure as a stabilizing anchor for teams and relationships.',
        'Proactively express your personal desires and opinions rather than always accommodating others.',
        'Introduce small, novel challenges periodically to keep your natural motivation engaged.'
      ];
    }

    const scores: Record<string, DimensionResult> = {
      extraversion: {
        id: 'extraversion',
        name: 'Extraversion (E Scale)',
        score: extScore,
        maxScore: 24,
        levelLabel: extScore > 12 ? 'Extraverted' : 'Introverted',
        levelColor: extScore > 12 ? '#10B981' : '#3B82F6',
        description: extScore > 12 
          ? 'You tend towards an active, outgoing behavioral style, seeking excitement and engaging readily with your external environment.'
          : 'You tend towards an introspective, reserved style, prioritizing quiet reflection and selective social engagements.'
      },
      neuroticism: {
        id: 'neuroticism',
        name: 'Neuroticism (N Scale)',
        score: neuScore,
        maxScore: 24,
        levelLabel: neuScore > 12 ? 'High Reactivity' : 'Emotional Stability',
        levelColor: neuScore > 12 ? '#F59E0B' : '#10B981',
        description: neuScore > 12
          ? 'Your nervous system responds keenly to stress and emotional shifts, reflecting deep sensitivity and vivid responsiveness.'
          : 'Your nervous system maintains consistent stability and even composure under daily pressure.'
      },
      lie: {
        id: 'lie',
        name: 'Lie Scale / Social Desirability (L Scale)',
        score: lieScore,
        maxScore: 9,
        levelLabel: lieScore >= 5 ? 'High Social Bias' : 'Candid & Authentic',
        levelColor: lieScore >= 5 ? '#F59E0B' : '#10B981',
        description: lieScore >= 5
          ? 'Your responses reflect a potential tendency to present an idealized version of yourself. Keep this in mind when reviewing your profile.'
          : 'Your responses indicate frank, candid, and authentic self-evaluation.'
      }
    };

    return {
      title: temperamentTitle,
      summary: temperamentDesc,
      scores,
      actionGuide: {
        levelTitle: 'Temperament Growth & Self-Development',
        levelBadge: temperamentBadge,
        levelColor: temperamentColor,
        recommendations
      }
    };
  }
};