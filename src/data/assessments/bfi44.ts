import { AssessmentDefinition, DimensionResult } from './types';

export const BFI44_ASSESSMENT: AssessmentDefinition = {
  id: 'bfi-44',
  code: 'BFI-44',
  name: 'Big Five Inventory (BFI-44)',
  subtitle: 'The Big Five Inventory (44 items)',
  description: 'A globally validated 44-item psychometric instrument evaluating personality across five core dimensions: Extraversion, Agreeableness, Conscientiousness, Neuroticism, and Openness.',
  duration: '5 - 7 mins',
  itemCount: 44,
  license: 'Public Domain (John, Donahue, & Kentle, 1991)',
  disclaimer: 'This inventory describes general personality tendencies and traits. It is an educational tool for self-reflection and not a clinical diagnosis.',
  notebookLmUrl: 'https://notebook.google.com/notebook/3c90b86a-da2a-4861-b906-af66b42f05dd',
  notebookLmPrompts: [
    'Based on this Big Five profile, which work environments and career paths allow me to excel?',
    'What are the core strengths and potential blind spots of high Agreeableness?',
    'How can I channel emotional sensitivity (Neuroticism) into empathy and creative focus?',
    'How can an introverted personality leverage quiet strengths in leadership and team collaboration?'
  ],
  options: [
    { value: 1, label: '1', description: 'Disagree strongly' },
    { value: 2, label: '2', description: 'Disagree a little' },
    { value: 3, label: '3', description: 'Neither agree nor disagree' },
    { value: 4, label: '4', description: 'Agree a little' },
    { value: 5, label: '5', description: 'Agree strongly' }
  ],
  questions: [
    { id: 1, text: 'I see myself as someone who is talkative', dimension: 'extraversion' },
    { id: 2, text: 'I see myself as someone who tends to find fault with others', dimension: 'agreeableness', isReverse: true },
    { id: 3, text: 'I see myself as someone who does a thorough job', dimension: 'conscientiousness' },
    { id: 4, text: 'I see myself as someone who is depressed, blue', dimension: 'neuroticism' },
    { id: 5, text: 'I see myself as someone who is original, comes up with new ideas', dimension: 'openness' },
    { id: 6, text: 'I see myself as someone who is reserved', dimension: 'extraversion', isReverse: true },
    { id: 7, text: 'I see myself as someone who is helpful and unselfish with others', dimension: 'agreeableness' },
    { id: 8, text: 'I see myself as someone who can be somewhat careless', dimension: 'conscientiousness', isReverse: true },
    { id: 9, text: 'I see myself as someone who is relaxed, handles stress well', dimension: 'neuroticism', isReverse: true },
    { id: 10, text: 'I see myself as someone who is curious about many different things', dimension: 'openness' },
    { id: 11, text: 'I see myself as someone who is full of energy', dimension: 'extraversion' },
    { id: 12, text: 'I see myself as someone who starts quarrels with others', dimension: 'agreeableness', isReverse: true },
    { id: 13, text: 'I see myself as someone who is a reliable worker', dimension: 'conscientiousness' },
    { id: 14, text: 'I see myself as someone who can be tense', dimension: 'neuroticism' },
    { id: 15, text: 'I see myself as someone who is ingenious, a deep thinker', dimension: 'openness' },
    { id: 16, text: 'I see myself as someone who generates a lot of enthusiasm', dimension: 'extraversion' },
    { id: 17, text: 'I see myself as someone who has a forgiving nature', dimension: 'agreeableness' },
    { id: 18, text: 'I see myself as someone who tends to be disorganized', dimension: 'conscientiousness', isReverse: true },
    { id: 19, text: 'I see myself as someone who worries a lot', dimension: 'neuroticism' },
    { id: 20, text: 'I see myself as someone who has an active imagination', dimension: 'openness' },
    { id: 21, text: 'I see myself as someone who tends to be quiet', dimension: 'extraversion', isReverse: true },
    { id: 22, text: 'I see myself as someone who is generally trusting', dimension: 'agreeableness' },
    { id: 23, text: 'I see myself as someone who tends to be lazy', dimension: 'conscientiousness', isReverse: true },
    { id: 24, text: 'I see myself as someone who is emotionally stable, not easily upset', dimension: 'neuroticism', isReverse: true },
    { id: 25, text: 'I see myself as someone who is inventive', dimension: 'openness' },
    { id: 26, text: 'I see myself as someone who has an assertive personality', dimension: 'extraversion' },
    { id: 27, text: 'I see myself as someone who can be cold and aloof', dimension: 'agreeableness', isReverse: true },
    { id: 28, text: 'I see myself as someone who perseveres until the task is finished', dimension: 'conscientiousness' },
    { id: 29, text: 'I see myself as someone who can be moody', dimension: 'neuroticism' },
    { id: 30, text: 'I see myself as someone who values artistic, aesthetic experiences', dimension: 'openness' },
    { id: 31, text: 'I see myself as someone who is sometimes shy, inhibited', dimension: 'extraversion', isReverse: true },
    { id: 32, text: 'I see myself as someone who is considerate and kind to almost everyone', dimension: 'agreeableness' },
    { id: 33, text: 'I see myself as someone who does things efficiently', dimension: 'conscientiousness' },
    { id: 34, text: 'I see myself as someone who remains calm in tense situations', dimension: 'neuroticism', isReverse: true },
    { id: 35, text: 'I see myself as someone who prefers work that is routine', dimension: 'openness', isReverse: true },
    { id: 36, text: 'I see myself as someone who is outgoing, sociable', dimension: 'extraversion' },
    { id: 37, text: 'I see myself as someone who is sometimes rude to others', dimension: 'agreeableness', isReverse: true },
    { id: 38, text: 'I see myself as someone who makes plans and follows through with them', dimension: 'conscientiousness' },
    { id: 39, text: 'I see myself as someone who gets nervous easily', dimension: 'neuroticism' },
    { id: 40, text: 'I see myself as someone who likes to reflect, play with ideas', dimension: 'openness' },
    { id: 41, text: 'I see myself as someone who has few artistic interests', dimension: 'openness', isReverse: true },
    { id: 42, text: 'I see myself as someone who likes to cooperate with others', dimension: 'agreeableness' },
    { id: 43, text: 'I see myself as someone who is easily distracted', dimension: 'conscientiousness', isReverse: true },
    { id: 44, text: 'I see myself as someone who is sophisticated in art, music, or literature', dimension: 'openness' }
  ],
  calculateResults: (answers: Record<number, number>) => {
    const getVal = (id: number, isReverse?: boolean) => {
      const val = answers[id] || 3;
      return isReverse ? (6 - val) : val;
    };

    // Extraversion: Q1, 6(R), 11, 16, 21(R), 26, 31(R), 36
    const extItems = [1, 11, 16, 26, 36];
    const extRev = [6, 21, 31];
    let extScore = 0;
    extItems.forEach(i => extScore += getVal(i, false));
    extRev.forEach(i => extScore += getVal(i, true));

    // Agreeableness: Q2(R), 7, 12(R), 17, 22, 27(R), 32, 37(R), 42
    const agrItems = [7, 17, 22, 32, 42];
    const agrRev = [2, 12, 27, 37];
    let agrScore = 0;
    agrItems.forEach(i => agrScore += getVal(i, false));
    agrRev.forEach(i => agrScore += getVal(i, true));

    // Conscientiousness: Q3, 8(R), 13, 18(R), 23(R), 28, 33, 38, 43(R)
    const conItems = [3, 13, 28, 33, 38];
    const conRev = [8, 18, 23, 43];
    let conScore = 0;
    conItems.forEach(i => conScore += getVal(i, false));
    conRev.forEach(i => conScore += getVal(i, true));

    // Neuroticism: Q4, 9(R), 14, 19, 24(R), 29, 34(R), 39
    const neuItems = [4, 14, 19, 29, 39];
    const neuRev = [9, 24, 34];
    let neuScore = 0;
    neuItems.forEach(i => neuScore += getVal(i, false));
    neuRev.forEach(i => neuScore += getVal(i, true));

    // Openness: Q5, 10, 15, 20, 25, 30, 35(R), 40, 41(R), 44
    const opeItems = [5, 10, 15, 20, 25, 30, 40, 44];
    const opeRev = [35, 41];
    let opeScore = 0;
    opeItems.forEach(i => opeScore += getVal(i, false));
    opeRev.forEach(i => opeScore += getVal(i, true));

    const getLevelText = (avg: number) => {
      if (avg >= 3.8) return { label: 'High', color: '#10B981' };
      if (avg >= 2.6) return { label: 'Moderate', color: '#3B82F6' };
      return { label: 'Low', color: '#F59E0B' };
    };

    const extAvg = +(extScore / 8).toFixed(1);
    const agrAvg = +(agrScore / 9).toFixed(1);
    const conAvg = +(conScore / 9).toFixed(1);
    const neuAvg = +(neuScore / 8).toFixed(1);
    const opeAvg = +(opeScore / 10).toFixed(1);

    const scores: Record<string, DimensionResult> = {
      extraversion: {
        id: 'extraversion',
        name: 'Extraversion',
        score: extScore,
        maxScore: 40,
        averageScore: extAvg,
        levelLabel: getLevelText(extAvg).label,
        levelColor: getLevelText(extAvg).color,
        description: extAvg >= 3.5 
          ? 'You are outgoing, talkative, assertive, energetic in social environments, and comfortable taking the lead.' 
          : 'You are calm, reflective, comfortable with independence, and recharge your energy through quiet time.'
      },
      agreeableness: {
        id: 'agreeableness',
        name: 'Agreeableness',
        score: agrScore,
        maxScore: 45,
        averageScore: agrAvg,
        levelLabel: getLevelText(agrAvg).label,
        levelColor: getLevelText(agrAvg).color,
        description: agrAvg >= 3.5 
          ? 'You are empathetic, trustworthy, generous, and place high importance on harmony in interpersonal relationships.' 
          : 'You are independent-minded, direct in communication, comfortable with competition, and naturally challenge assumptions.'
      },
      conscientiousness: {
        id: 'conscientiousness',
        name: 'Conscientiousness',
        score: conScore,
        maxScore: 45,
        averageScore: conAvg,
        levelLabel: getLevelText(conAvg).label,
        levelColor: getLevelText(conAvg).color,
        description: conAvg >= 3.5 
          ? 'You are disciplined, organized, dependable, and systematically persevere until goals are accomplished.' 
          : 'You are flexible, adaptable to spontaneous changes, comfortable with informal workflows, and open to pivoting.'
      },
      neuroticism: {
        id: 'neuroticism',
        name: 'Neuroticism (Emotional Sensitivity)',
        score: neuScore,
        maxScore: 40,
        averageScore: neuAvg,
        levelLabel: getLevelText(neuAvg).label,
        levelColor: getLevelText(neuAvg).color,
        description: neuAvg >= 3.5 
          ? 'You experience emotions vividly, with heightened sensitivity to stressful shifts and changing circumstances.' 
          : 'You are emotionally steady, resilient under pressure, and maintain a composed, calm perspective through challenges.'
      },
      openness: {
        id: 'openness',
        name: 'Openness to Experience',
        score: opeScore,
        maxScore: 50,
        averageScore: opeAvg,
        levelLabel: getLevelText(opeAvg).label,
        levelColor: getLevelText(opeAvg).color,
        description: opeAvg >= 3.5 
          ? 'You are imaginative, intellectually curious, appreciate diverse art and aesthetics, and embrace novel perspectives.' 
          : 'You are practical, grounded, prefer tested methods, value concrete facts, and appreciate structured routines.'
      }
    };

    return {
      title: 'Big Five Personality Profile (BFI-44)',
      summary: 'Distribution across the five foundational dimensions of human personality.',
      scores,
      actionGuide: {
        levelTitle: 'In-Depth Research with NotebookLM',
        levelBadge: '🧠 Big Five Scientific Insights',
        levelColor: '#8B5CF6',
        recommendations: [
          'Click "Open NotebookLM" below to delve deeper into your Big Five dimensions using curated academic literature.',
          'Ask the AI research assistant tailored questions on optimal career environments, interpersonal synergy, and personal growth.'
        ]
      }
    };
  }
};
