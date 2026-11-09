export interface KnowledgeArticle {
  title: string;
  category: string;
  content: string;
  keyTakeaways: string[];
}

export interface CuratedAssessmentKnowledge {
  assessmentId: string;
  title: string;
  canonicalSource: string;
  academicCitation: string;
  foundationalTheory: string;
  articles: KnowledgeArticle[];
  faq: { question: string; answer: string; citation: string; keywords: string[] }[];
  neurobiologyNote?: string;
  strengthsAndCautions: { dimension: string; strengths: string[]; cautions: string[]; recommendations: string[] }[];
  careerAlignment?: { profile: string; suitableRoles: string[]; workCulture: string; advice: string }[];
  developmentStrategies?: { title: string; strategy: string; scienceNote: string }[];
}

export const KNOWLEDGE_BASE: Record<string, CuratedAssessmentKnowledge> = {
  adhd: {
    assessmentId: 'adhd',
    title: 'Adult ADHD Self-Report Scale (WHO ASRS v1.1) Literature',
    canonicalSource: 'World Health Organization (WHO) & Harvard Medical School Workgroup on Adult ADHD',
    academicCitation: 'Kessler, R. C., et al. (2005). The World Health Organization Adult ADHD Self-Report Scale (ASRS). Psychological Medicine, 35(2), 245-256.',
    foundationalTheory: 'Barkley Executive Function Model & Dopaminergic Reward Deficiency Syndrome. Adult ADHD is characterized not by an absence of attention, but by dysregulation in executive inhibition, working memory persistence, and tonic dopaminergic signaling in prefrontal-striatal circuits.',
    neurobiologyNote: 'Neuroimaging reveals lower basal dopamine transporter (DAT) activity and reduced tonic dopamine firing in the prefrontal cortex. This produces an interest-based nervous system that struggles with low-salience routine tasks but exhibits intense focus on high-urgency or intrinsically fascinating tasks.',
    articles: [
      {
        title: 'Executive Function Regulation & The Interest-Based Nervous System',
        category: 'Neurobiology',
        content: 'Individuals with ADHD traits experience significant fluctuations in executive control depending on stimulation level. Routine or repetitive tasks generate insufficient tonic dopamine, causing severe task-initiation inertia (procrastination), whereas high-novelty or high-urgency tasks can trigger hyperfocus.',
        keyTakeaways: [
          'Attention is not absent; it is inconsistently regulated across interest contexts.',
          'Boredom causes genuine cognitive lethargy due to lower baseline dopamine firing.',
          'Urgency, novelty, and passion temporarily elevate catecholamines, enabling burst productivity.'
        ]
      },
      {
        title: 'Evidence-Based Environmental & Behavioral Scaffolding',
        category: 'Interventions',
        content: 'Clinical guidelines (including UK NICE NG87) recommend externalizing executive functions: using visual timers (Time Timer), body doubling (working alongside others), breaking obligations into 10-minute micro-intervals, and redesigning physical environments to make desirable cues salient.',
        keyTakeaways: [
          'Externalize working memory: never rely on mental tracking for tasks.',
          'Use body doubling and structured accountability for low-stimulation tasks.',
          'Implement physical friction for distractions (phone lockboxes, app blockers).'
        ]
      }
    ],
    faq: [
      {
        question: 'What does a positive WHO Part A score (>= 4) mean?',
        answer: 'Endorsing 4 or more items above the clinical threshold in Part A has demonstrated a sensitivity of 68.7% and specificity of 99.5% in predicting adult ADHD in clinical calibration studies. It strongly indicates the value of discussing your profile with a clinical psychologist or psychiatrist for formal clinical evaluation.',
        citation: 'Kessler et al., 2005 (Psychological Medicine)',
        keywords: ['part a', 'score', 'positive', 'threshold', 'mean', 'result', '4']
      },
      {
        question: 'What evidence-based executive functioning strategies help manage procrastination?',
        answer: 'Research emphasizes: 1) The 10-minute rule (commit to just 10 minutes of low-stakes engagement); 2) Body doubling (working in the visual presence of a colleague or virtual accountability partner); 3) External visual countdown timers (to counteract time blindness); and 4) Pairing boring tasks with dopamine-elevating stimuli (e.g., lo-fi beats, walking treadmills).',
        citation: 'Barkley, R. A. (2006). Executive Functions: What They Are and How They Work',
        keywords: ['procrastinat', 'manage', 'executive', 'strateg', 'delay', 'start', 'inertia', 'tips']
      },
      {
        question: 'What are the differences between Inattentive and Hyperactive presentations?',
        answer: 'Predominantly Inattentive presentation features mental drifting, task disorganization, working memory lapses, and time blindness without noticeable physical restlessness. Predominantly Hyperactive-Impulsive presentation features inner motor restlessness, rapid conversational flow, fidgeting, and difficulty sitting still in stationary settings.',
        citation: 'American Psychiatric Association (DSM-5)',
        keywords: ['difference', 'inattentive', 'hyperactive', 'type', 'presentation', 'compare']
      },
      {
        question: 'How do dopamine regulation and lifestyle factors affect ADHD focus?',
        answer: 'Cardiovascular exercise acutely elevates baseline dopamine and norepinephrine in the prefrontal cortex, acting as an endogenous cognitive primer. Irregular sleep worsens executive dysfunction, often mimicking or intensifying attention deficits.',
        citation: 'NICE Clinical Guideline [NG87], UK NHS',
        keywords: ['dopamine', 'lifestyle', 'sleep', 'exercise', 'diet', 'nervous system']
      },
      {
        question: 'Which careers and work environments suit an ADHD brain?',
        answer: 'ADHD brains typically thrive in fast-paced, high-novelty, or project-based fields with immediate feedback loops, such as entrepreneurship, software engineering, investigative journalism, emergency medicine, creative design, and consulting. Monotonous, bureaucratic, highly procedural roles without autonomy usually cause rapid burnout.',
        citation: 'Barkley (2006); Ratey & Johnson (2021)',
        keywords: ['career', 'job', 'work', 'profession', 'environment', 'suit', 'best']
      }
    ],
    strengthsAndCautions: [
      {
        dimension: 'inattention',
        strengths: ['Lateral creative thinking', 'Spontaneous ideation', 'Ability to hyperfocus when intrinsically fascinated'],
        cautions: ['Time blindness', 'Task-switching exhaustion', 'Difficulty finishing the last 15% of projects'],
        recommendations: [
          'Use external visual timers rather than mental time estimations.',
          'Pair unstimulating tasks with sensory stimulation (lo-fi music, walking desk).',
          'Break large projects into granular micro-checklists.'
        ]
      },
      {
        dimension: 'hyperactivity',
        strengths: ['High energy and drive', 'Rapid conversational banter', 'Decisiveness under fast-moving conditions'],
        cautions: ['Physical restlessness', 'Interrupting others in conversations', 'Burnout from constant urgency'],
        recommendations: [
          'Incorporate standing desks, walking meetings, or deliberate movement pauses.',
          'Practice a 3-second pause before speaking in structured meetings.',
          'Establish a predictable decompression routine before sleep.'
        ]
      }
    ]
  },

  eysenck: {
    assessmentId: 'eysenck',
    title: 'Eysenck Personality Inventory (EPI) Literature',
    canonicalSource: 'Hans J. Eysenck & Sybil B. G. Eysenck (University of London, Maudsley Hospital)',
    academicCitation: 'Eysenck, H. J., & Eysenck, S. B. G. (1964). Manual of the Eysenck Personality Inventory. University of London Press.',
    foundationalTheory: 'Biological Temperament & Cortical Arousal Theory. Extraversion is grounded in the Ascending Reticular Activating System (ARAS); introverts have higher baseline cortical arousal and seek quietude, whereas extraverts have lower baseline arousal and seek external stimulation. Neuroticism is linked to the limbic system and sympathetic autonomic reactivity.',
    neurobiologyNote: 'Temperament reflects the constitutional speed, strength, and balance of fundamental nervous system excitation and inhibition processes (Pavlovian and Maudsley neurophysiology).',
    articles: [
      {
        title: 'The Four Classical Temperaments in Eysenckian Dimensional Space',
        category: 'Typology',
        content: 'By crossing Extraversion (E) and Neuroticism (N), Eysenck mapped the ancient Galen-Hippocrates temperaments onto modern psychometrics: Sanguine (High E, Low N - stable, outgoing), Choleric (High E, High N - active, easily excitable), Phlegmatic (Low E, Low N - calm, steady), and Melancholic (Low E, High N - sensitive, conscientious).',
        keyTakeaways: [
          'No temperament is objectively superior; each has unique evolutionary adaptations.',
          'High Neuroticism provides heightened vigilance and sensitivity to errors.',
          'High Extraversion provides rapid social lubrication and energetic initiative.'
        ]
      },
      {
        title: 'Neuroplasticity & Temperament Development',
        category: 'Personal Development',
        content: 'While baseline temperament has strong biological roots (heritability ~40-50%), human adults can develop behavioral coping strategies, cognitive appraisal habits, and emotional regulation techniques through neuroplasticity, altering everyday functional outcomes.',
        keyTakeaways: [
          'Temperament is an innate biological tendency, not a deterministic destiny.',
          'Targeted stress resilience practices buffer high neuroticism reactivity.',
          'Introverts can thrive in leadership by leveraging listening and deep strategic focus.'
        ]
      }
    ],
    faq: [
      {
        question: 'Does a high Neuroticism score mean I have a mental health disorder?',
        answer: 'No. Neuroticism in the Eysenck model is a normal personality dimension measuring autonomic emotional reactivity and sensitivity to environmental threats. It reflects how quickly your nervous system responds to stress, not a clinical psychiatric diagnosis.',
        citation: 'Eysenck & Eysenck (1964)',
        keywords: ['disorder', 'sick', 'neuroticism', 'mental health', 'illness', 'high n']
      },
      {
        question: 'How do biological temperament and nervous system arousal interact?',
        answer: 'Eysenck established that Extraversion is regulated by the Ascending Reticular Activating System (ARAS): introverts possess high baseline cortical arousal and thus seek calm environments, while extraverts possess lower baseline arousal and seek external stimulation. Neuroticism reflects limbic system reactivity to emotional stressors.',
        citation: 'Eysenck, H. J. (1967). The Biological Basis of Personality',
        keywords: ['arousal', 'nervous system', 'biological', 'aras', 'limbic', 'temperament']
      },
      {
        question: 'What are the strengths of Sanguine, Choleric, Phlegmatic, and Melancholic types?',
        answer: 'Sanguine (High E, Low N): charismatic, optimistic, adaptable. Choleric (High E, High N): dynamic, goal-driven, decisive leader under pressure. Phlegmatic (Low E, Low N): reliable, even-tempered, peaceful mediator. Melancholic (Low E, High N): analytical, deeply reflective, highly conscientious, and meticulous.',
        citation: 'Eysenck (1964, 1967)',
        keywords: ['sanguine', 'choleric', 'phlegmatic', 'melancholic', 'four', 'temperament', 'strengths']
      },
      {
        question: 'Can someone modify or adapt their innate temperament tendencies over time?',
        answer: 'Yes. While constitutional temperament has notable biological stability (~40-50% heritability), neuroplasticity allows adults to rewire cognitive appraisal patterns and emotional habits. Through mindfulness, stress reframing, and intentional environmental design, individuals can substantially regulate their baseline tendencies.',
        citation: 'Eysenck & Eysenck (1964); Davidson & McEwen (2012)',
        keywords: ['change', 'modify', 'adapt', 'improve', 'neuroplasticity', 'over time']
      },
      {
        question: 'What is the function of the Lie (L) scale in the EPI?',
        answer: 'The Lie scale detects social desirability bias—the tendency to present oneself in an unrealistically favorable light. An L score above 4 or 5 suggests answers may have been subtly filtered through social expectations rather than complete spontaneity.',
        citation: 'Eysenck & Eysenck (1964)',
        keywords: ['lie', 'lie scale', 'social desirability', 'l scale', 'validity']
      }
    ],
    strengthsAndCautions: [
      {
        dimension: 'extraversion',
        strengths: ['Outgoing charisma', 'Quick rapport building', 'Thriving in collaborative, fast-paced teams'],
        cautions: ['Boredom in solitary deep work', 'Impulsive decision-making', 'Vulnerability to superficial multitasking'],
        recommendations: [
          'Structure scheduled collaborative brainstorms alongside solitary focus blocks.',
          'Practice slowing down decisions before committing to obligations.'
        ]
      },
      {
        dimension: 'neuroticism',
        strengths: ['High situational awareness', 'Deep empathy and emotional perceptiveness', 'Thorough risk mitigation'],
        cautions: ['Catastrophic overthinking', 'Prolonged emotional recovery after friction', 'Physical tension'],
        recommendations: [
          'Adopt physiological sighing and vagal nerve down-regulation exercises.',
          'Externalize anxieties onto paper using cognitive reframing.'
        ]
      }
    ]
  },

  'bfi-44': {
    assessmentId: 'bfi-44',
    title: 'The Big Five Inventory (BFI-44) Research Literature',
    canonicalSource: 'Oliver P. John, E. M. Donahue, & R. L. Kentle (UC Berkeley Personality Lab)',
    academicCitation: 'John, O. P., & Srivastava, S. (1999). The Big-Five trait taxonomy: History, measurement, and theoretical perspectives. Handbook of Personality: Theory and Research, 2, 102-138.',
    foundationalTheory: 'Five-Factor Model (FFM) of Personality. Personality variation across cultures and languages can be universally summarized into five broad, orthogonal trait dimensions: Openness to Experience, Conscientiousness, Extraversion, Agreeableness, and Neuroticism (OCEAN).',
    neurobiologyNote: 'Traits reflect stable neurobiological systems: Dopaminergic incentive salience correlates with Extraversion and Openness; Serotonergic stabilization correlates with Conscientiousness, Agreeableness, and emotional stability.',
    articles: [
      {
        title: 'The Maturity Principle Across The Lifespan',
        category: 'Developmental Psychology',
        content: 'Longitudinal studies spanning decades show that while personality has notable genetic continuity, adults typically exhibit the "Maturity Principle": Conscientiousness and Agreeableness gradually rise with age, while Neuroticism tends to decline as emotional regulatory skills mature.',
        keyTakeaways: [
          'Personality traits are not rigid; they evolve predictably across adulthood.',
          'Deliberate habit formation gradually shifts trait expression.',
          'Life experiences, relationships, and professional roles reshape characteristic adaptations.'
        ]
      },
      {
        title: 'Vocational Alignment & The Big Five Traits',
        category: 'Organizational Psychology',
        content: 'Research consistently reveals that High Conscientiousness is the single most universal predictor of professional performance across diverse jobs. High Openness aligns with creative problem-solving and scientific research, while High Agreeableness predicts exceptional success in service, mentoring, and team harmony.',
        keyTakeaways: [
          'Conscientiousness predicts reliable execution and goal attainment.',
          'Openness fuels adaptability and cross-disciplinary innovation.',
          'High Agreeableness fosters trust, though requires deliberate boundary setting.'
        ]
      }
    ],
    faq: [
      {
        question: 'Which work environments and career paths allow this profile to excel?',
        answer: 'Vocational psychology shows: High Conscientiousness aligns with project leadership, law, finance, and engineering; High Openness flourishes in design, R&D, creative writing, and academia; High Extraversion thrives in marketing, business development, and public speaking; High Agreeableness excels in counselling, healthcare, and education.',
        citation: 'Barrick & Mount (1991); John & Srivastava (1999)',
        keywords: ['career', 'job', 'work', 'vocation', 'profession', 'excel', 'paths', 'workplace']
      },
      {
        question: 'What are the core strengths and potential blind spots of high Agreeableness?',
        answer: 'Strengths: Exceptional empathy, trustworthiness, interpersonal diplomacy, and psychological safety creation. Blind spots: Tendency to avoid constructive conflict, saying yes out of guilt, self-neglect, and difficulty negotiating compensation or personal boundaries.',
        citation: 'Graziano & Eisenberg (1997)',
        keywords: ['agreeableness', 'blind spots', 'strengths', 'conflict', 'people pleaser']
      },
      {
        question: 'Can someone deliberately increase their Conscientiousness or change traits?',
        answer: 'Yes. Research on volitional personality change (Roberts et al., 2017) confirms that implementing external scaffolding—such as daily time-blocking, checklist systems, and habit stacking—progressively increases self-reported Conscientiousness over 3-6 months.',
        citation: 'Roberts, B. W., et al. (2017). Psychological Bulletin',
        keywords: ['conscientiousness', 'increase', 'change', 'habits', 'volitional', 'improve']
      },
      {
        question: 'How can an introverted personality leverage quiet strengths in leadership?',
        answer: 'Introverted leaders excel because they listen attentively to team suggestions, allow proactive employees to shine, remain calm under crisis, and make thoughtful, deliberate decisions rather than impulsive, ego-driven moves.',
        citation: 'Grant, Gino, & Hofmann (2011). Academy of Management Journal',
        keywords: ['introvert', 'introversion', 'leadership', 'quiet strengths', 'leader']
      },
      {
        question: 'How can I channel emotional sensitivity (Neuroticism) into empathy and creativity?',
        answer: 'High Neuroticism reflects a brain acutely attuned to subtleties and discrepancies. When paired with healthy emotional grounding, this heightened sensory awareness fuels deep artistic expression, poignant writing, and compassionate understanding of others\' struggles.',
        citation: 'Nettle, D. (2006). Evolution and Human Behavior',
        keywords: ['neuroticism', 'sensitivity', 'creativity', 'empathy', 'channel', 'high n']
      }
    ],
    strengthsAndCautions: [
      {
        dimension: 'conscientiousness',
        strengths: ['Diligence', 'Organized execution', 'Long-term reliability'],
        cautions: ['Perfectionistic paralysis', 'Frustration with ambiguous tasks', 'Difficulty relaxing'],
        recommendations: [
          'Define explicit "good enough" criteria for lower-stakes tasks.',
          'Schedule deliberate unstructured leisure time.'
        ]
      },
      {
        dimension: 'openness',
        strengths: ['Intellectual curiosity', 'Aesthetic appreciation', 'Out-of-the-box problem solving'],
        cautions: ['Starting too many projects without finishing', 'Impatience with routine maintenance'],
        recommendations: [
          'Partner with high-conscientiousness collaborators to bridge concept to reality.',
          'Maintain an "idea parking lot" to avoid derailing current tasks.'
        ]
      }
    ]
  },

  'dass-21': {
    assessmentId: 'dass-21',
    title: 'DASS-21 (Depression, Anxiety, Stress Scales) Literature',
    canonicalSource: 'Peter F. Lovibond & Sydney H. Lovibond (University of New South Wales, Australia)',
    academicCitation: 'Lovibond, P. F., & Lovibond, S. H. (1995). The structure of negative emotional states: Comparison of the Depression Anxiety Stress Scales (DASS) with the Beck Depression and Anxiety Inventories. Behaviour Research and Therapy, 33(3), 335-343.',
    foundationalTheory: 'Tripartite Model of Negative Affectivity. Clark and Watson established that while anxiety and depression share a general distress component (negative affect), Depression is characterized by low positive affect (anhedonia, loss of initiative), Anxiety by physiological hyperarousal (tremors, palpitations), and Stress by persistent non-specific tension and irritability.',
    neurobiologyNote: 'Stress engages the hypothalamic-pituitary-adrenal (HPA) axis; anxiety stimulates acute sympathetic adrenergic surges; depression reflects down-regulated dopaminergic and serotonergic reward response pathways.',
    articles: [
      {
        title: 'Differentiating Stress, Anxiety, and Depression',
        category: 'Clinical Psychometrics',
        content: 'A central contribution of the Lovibond scales is clarifying that Stress (nervous tension, difficulty relaxing, irritability) is distinct from Anxiety (autonomic arousal, situational panic, somatic response) and Depression (hopelessness, anhedonia, self-deprecation).',
        keyTakeaways: [
          'Stress measures chronic activation without necessarily experiencing somatic panic.',
          'Anxiety focuses on fight-or-flight sympathetic nervous system symptoms.',
          'Depression assesses anhedonia and diminished motivation over the past week.'
        ]
      },
      {
        title: 'Non-Clinical Screening & Longitudinal Tracking',
        category: 'Practical Application',
        content: 'DASS-21 is designed as a dimensional screening tool, not a categorical diagnostic manual. An elevated score reflects state emotional load over the prior 7 days and provides an objective benchmark for monitoring recovery or evaluating the efficacy of stress-reduction interventions.',
        keyTakeaways: [
          'Scores reflect state strain over the past 7 days, not a permanent diagnosis.',
          'Regular re-assessment reveals trends before burnout develops.',
          'High scores warrant self-compassion and professional exploration.'
        ]
      }
    ],
    faq: [
      {
        question: 'Why does DASS-21 double raw scores?',
        answer: 'The DASS-21 is a short-form version of the original 42-item DASS. Multiplying each 7-item subscale score by 2 aligns the results directly with the established normative percentile cutoffs of the full 42-item scale.',
        citation: 'Lovibond & Lovibond (1995)',
        keywords: ['double', 'multiply', 'score', 'raw', '42', 'scale']
      },
      {
        question: 'What immediate steps help calm elevated physiological anxiety?',
        answer: 'Activating the parasympathetic nervous system via the physiological sigh (two quick nasal inhalations followed by a long, slow oral exhalation) rapidly slows heart rate by engaging vagal nerve braking mechanisms within 60 to 90 seconds.',
        citation: 'Huberman et al. (2023), Cell Reports Medicine',
        keywords: ['calm', 'anxiety', 'panic', 'heart', 'physiological', 'breathe', 'sigh']
      },
      {
        question: 'When should someone seek a professional clinical assessment?',
        answer: 'If your scores consistently fall in the Severe or Extremely Severe bands for more than two consecutive weeks, or if feelings of despair or panic impair work, relationships, or daily basic needs, consulting a licensed clinical psychologist or medical doctor is strongly advised.',
        citation: 'Australian Psychological Society Guidelines',
        keywords: ['doctor', 'therapist', 'professional', 'clinical', 'hospital', 'severe']
      }
    ],
    strengthsAndCautions: [
      {
        dimension: 'stress',
        strengths: ['Drive to resolve obstacles', 'High responsiveness to external demands'],
        cautions: ['Physical fatigue', 'Short emotional fuse with loved ones', 'Sleep onset latency'],
        recommendations: [
          'Build clear transition rituals between work and rest (e.g. 15-minute walks).',
          'Practice daily progressive muscle relaxation or warm evening baths.'
        ]
      },
      {
        dimension: 'anxiety',
        strengths: ['Rapid threat awareness', 'Thorough preparation for unexpected scenarios'],
        cautions: ['Somatic tension', 'Anticipatory panic', 'Avoidance of triggering tasks'],
        recommendations: [
          'Grounding 5-4-3-2-1 sensory technique when heart rate rises.',
          'Limit caffeine and stimulant intake after midday.'
        ]
      }
    ]
  }
};

/**
 * Intelligent semantic knowledge matcher and response synthesizer.
 * Resolves questions accurately based on peer-reviewed literature.
 */
export function queryAssessmentKnowledge(
  assessmentId: string,
  userQuestion: string,
  userResultsSummary?: string,
  locale: 'en' | 'vi' = 'en'
): { answer: string; source: string; citation: string; tags: string[] } {
  const kb = KNOWLEDGE_BASE[assessmentId] || KNOWLEDGE_BASE['adhd'];
  const qLower = userQuestion.toLowerCase().trim();

  // Keyword intent mapping (supports both English and Vietnamese query terms)
  const matchesAny = (words: string[]) => words.some(w => qLower.includes(w));

  // 1. Direct FAQ match check
  for (const item of kb.faq) {
    if (item.keywords && item.keywords.some(k => qLower.includes(k))) {
      let personalizedNote = '';
      if (userResultsSummary) {
        personalizedNote = `\n\n📌 **Context for your score:** Applying this literature framework is particularly relevant given your current result (${userResultsSummary}).`;
      }
      return {
        answer: `### Academic Research Analysis\n\n${item.answer}${personalizedNote}`,
        source: kb.canonicalSource,
        citation: item.citation,
        tags: ['Grounded Q&A', 'Curated Research']
      };
    }
  }

  // 2. Career / Vocational Questions
  if (matchesAny(['career', 'job', 'work', 'profession', 'nghề', 'công việc', 'phù hợp'])) {
    if (assessmentId === 'bfi-44') {
      if (locale === 'vi') {
        return {
          answer: `### Định hướng Nghề nghiệp & Môi trường Làm việc (Mô hình Big Five)\n\n` +
            `Theo các nghiên cứu tâm lý học tổ chức (*Barrick & Mount, 1991; John & Srivastava, 1999*):\n\n` +
            `• **Tính Tận tâm (Conscientiousness):** Chỉ số dự báo đáng tin cậy nhất về hiệu quả công việc dài hạn ở hầu hết các ngành nghề (tài chính, quản trị, y dược, pháp lý).\n` +
            `• **Tính Cởi mở (Openness):** Phù hợp nhất với môi trường năng động, linh hoạt đòi hỏi sự đổi mới sáng tạo (nghệ thuật, R&D, thiết kế, tư vấn chiến lược).\n` +
            `• **Tính Hướng ngoại (Extraversion):** Tỏa sáng trong các vai trò tương tác cao, đàm phán và thuyết phục (kinh doanh, truyền thông, đối ngoại, quản trị nhân sự).\n` +
            `• **Tính Dễ chịu (Agreeableness):** Xuất sắc trong các môi trường hướng tới con người và dịch vụ (tư vấn tâm lý, chăm sóc khách hàng, gắn kết cộng đồng).\n\n` +
            `💡 **Lời khuyên thực tiễn:** Hãy lựa chọn môi trường làm việc phát huy đúng các nét nhân cách tự nhiên thay vì liên tục ép bản thân vào các khuôn mẫu gượng ép.`,
          source: kb.canonicalSource,
          citation: 'Barrick & Mount (1991); John & Srivastava (1999)',
          tags: ['Định hướng nghề nghiệp', 'Tâm lý học tổ chức']
        };
      }
      return {
        answer: `### Career & Workplace Alignment (Five-Factor Model)\n\n` +
          `According to organizational psychology research (*Barrick & Mount, 1991; John & Srivastava, 1999*):\n\n` +
          `• **Conscientiousness:** The single most reliable predictor of long-term job performance across virtually all professions (finance, management, medicine, legal).\n` +
          `• **Openness to Experience:** Best aligns with dynamic, ambiguous environments requiring innovation (creative industries, R&D, product design, strategic consulting).\n` +
          `• **Extraversion:** Flourishes in high-interaction roles requiring spontaneous persuasion (sales, marketing, leadership, talent acquisition).\n` +
          `• **Agreeableness:** Excels in relational and service environments (counseling, customer success, team mediation, non-profit).\n\n` +
          `💡 **Actionable Workplace Takeaway:** Choose roles that align with your natural trait inclinations rather than forcing yourself into environments that demand constant contrary suppression.`,
        source: kb.canonicalSource,
        citation: 'Barrick & Mount (1991); John & Srivastava (1999)',
        tags: ['Career Alignment', 'Organizational Psychology']
      };
    }
    if (assessmentId === 'eysenck') {
      if (locale === 'vi') {
        return {
          answer: `### Môi trường Nghề nghiệp theo Khí chất Sinh học\n\n` +
            `Theo thuyết khí chất của Hans Eysenck (*Eysenck & Eysenck, 1964*):\n\n` +
            `• **Khí chất Hoạt bát (Sanguine):** Thích hợp trong các công việc đối ngoại, truyền cảm hứng và giao tiếp xã hội phong phú (truyền thông, dịch vụ, khởi nghiệp, quan hệ công chúng).\n` +
            `• **Khí chất Nóng nảy (Choleric):** Thể hiện năng lực vượt trội trong các môi trường cạnh tranh, đòi hỏi quyết đoán và ứng phó dưới áp lực cao (xử lý khủng hoảng, quản lý tiến độ, lãnh đạo mục tiêu).\n` +
            `• **Khí chất Điềm đạm (Phlegmatic):** Rất đáng tin cậy trong các công việc cần sự kiên nhẫn, điềm tĩnh và có tính hệ thống cao (nghiên cứu khoa học, lập trình, kế toán - tài chính, kiểm toán).\n` +
            `• **Khí chất U sầu (Melancholic):** Có thế mạnh đặc biệt trong các lĩnh vực đòi hỏi sự tinh tế, tập trung sâu và chất lượng hoàn hảo (nghệ thuật sáng tác, phân tích dữ liệu, viết lách, học thuật).`,
          source: kb.canonicalSource,
          citation: kb.academicCitation,
          tags: ['Khí chất & Nghề nghiệp', 'Mô hình EPI']
        };
      }
      return {
        answer: `### Vocational Fit Based on Biological Temperament\n\n` +
          `According to Eysenck's temperament typology (*Eysenck & Eysenck, 1964*):\n\n` +
          `• **Sanguine (High E, Low N):** Excels in public-facing, energetic, and highly social settings (hospitality, entrepreneurship, team leadership, media).\n` +
          `• **Choleric (High E, High N):** Highly effective in competitive, fast-moving environments requiring decisive action under stress (crisis management, emergency services, high-stakes sales).\n` +
          `• **Phlegmatic (Low E, Low N):** Exceptional in methodical, high-trust roles requiring calm consistency (software architecture, research, administration, financial auditing).\n` +
          `• **Melancholic (Low E, High N):** Outstanding in detail-oriented, reflective fields requiring high quality and depth (creative arts, academic research, programming, writing).`,
        source: kb.canonicalSource,
        citation: kb.academicCitation,
        tags: ['Temperament & Career', 'EPI Typology']
      };
    }
    if (assessmentId === 'adhd') {
      if (locale === 'vi') {
        return {
          answer: `### Môi trường Làm việc Phù hợp cho Bộ não ADHD\n\n` +
            `Nghiên cứu (*Barkley, 2006; Ratey & Johnson, 2021*) chỉ ra rằng người có đặc điểm ADHD phát huy thế mạnh tốt nhất trong môi trường có **tính mới lạ, tính cấp bách, sự đam mê và quyền tự chủ cao**:\n\n` +
            `• **Công việc kích thích cao, năng động:** Kỹ thuật phần mềm, thiết kế sáng tạo, y học cấp cứu, khởi nghiệp, phóng viên điều tra.\n` +
            `• **Môi trường dễ gây cản trở:** Các công việc hành chính lặp đi lặp lại với sự kiểm soát vi mô gắt gao thường dễ dẫn đến sự trì hoãn và kiệt sức nhận thức.\n\n` +
            `💡 **Chiến lược:** Thiết lập quy trình làm việc với các cột mốc ngắn, phản hồi liên tục và áp dụng kỹ thuật "body doubling" (làm việc cùng người khác).`,
          source: kb.canonicalSource,
          citation: 'Barkley, R. A. (2006)',
          tags: ['Nghề nghiệp ADHD', 'Hỗ trợ môi trường làm việc']
        };
      }
      return {
        answer: `### Career Environments for ADHD Brains\n\n` +
          `Research (*Barkley, 2006; Ratey & Johnson, 2021*) highlights that ADHD minds thrive when environments provide **novelty, urgency, interest, and autonomy**:\n\n` +
          `• **High-stimulation / Dynamic roles:** Emergency medicine, software development, entrepreneurship, creative design, investigative reporting.\n` +
          `• **High friction environments:** Highly repetitive administrative roles with rigid micromanagement typically induce extreme task-initiation paralysis.\n\n` +
          `💡 **Strategy:** Structure work with external checkpoints, short feedback sprints, and body-doubling partners rather than open-ended solitary deadlines.`,
        source: kb.canonicalSource,
        citation: 'Barkley, R. A. (2006)',
        tags: ['ADHD Careers', 'Workplace Scaffolding']
      };
    }
  }

  // 3. Questions about changing / improving / neuroplasticity
  if (matchesAny(['change', 'improve', 'cải thiện', 'thay đổi', 'rèn luyện', 'modify', 'growth', 'neuroplasticity'])) {
    if (locale === 'vi') {
      return {
        answer: `### Liệu các Nét Tính cách & Khí chất có thể Thay đổi? (Tính Mềm dẻo Não bộ & Nguyên tắc Trưởng thành)\n\n` +
          `Có. Các nghiên cứu tâm lý học theo chiều dọc (*Roberts và cs., 2017; Davidson & McEwen, 2012*) khẳng định:\n\n` +
          `1. **Tính di truyền sinh học và biểu hiện thực tế:** Mặc dù nền tảng thần kinh có khoảng 40–50% do di truyền, biểu hiện hành vi hàng ngày được định hình mạnh mẽ bởi môi trường và thói quen rèn luyện.\n` +
          `2. **Nguyên tắc trưởng thành (Maturity Principle):** Khi trưởng thành, mức độ Tận tâm và Dễ chịu có xu hướng tăng lên, trong khi tính Bất ổn cảm xúc giảm dần nhờ sự tích lũy các kỹ năng điều hòa cảm xúc.\n` +
          `3. **Can thiệp có chủ đích:** Thực hành tái cấu trúc nhận thức, xây dựng chuỗi thói quen và sắp xếp môi trường sống mang lại sự cải thiện rõ rệt cho các chỉ số tâm lý sau 3 đến 6 tháng.\n\n` +
          `*Kết luận:* Điểm số trắc nghiệm phản ánh trạng thái hiện tại của bạn, không phải là một số phận bất biến.`,
        source: kb.canonicalSource,
        citation: 'Roberts, B. W., et al. (2017). Psychological Bulletin',
        tags: ['Tính mềm dẻo não bộ', 'Phát triển bản thân']
      };
    }
    return {
      answer: `### Can Traits & Temperament Change? (Neuroplasticity & The Maturity Principle)\n\n` +
        `Yes. Longitudinal personality research (*Roberts et al., 2017; Davidson & McEwen, 2012*) demonstrates:\n\n` +
        `1. **Baseline Heritability vs. Phenotype:** While baseline neurobiology is roughly 40-50% heritable, everyday trait expression is heavily shaped by behavioral adaptations and habit structures.\n` +
        `2. **The Maturity Principle:** As adults age, Conscientiousness and Agreeableness reliably trend upward, while Neuroticism tends to decrease through acquired emotional regulation skills.\n` +
        `3. **Volitional Interventions:** Implementing deliberate cognitive reframing, habit stacking, and environment design produces measurable shifts in personality scores within 3 to 6 months.\n\n` +
        `*Conclusion:* Psychometric scores represent your current baseline, not an unchangeable fate.`,
      source: kb.canonicalSource,
      citation: 'Roberts, B. W., et al. (2017). Psychological Bulletin',
      tags: ['Neuroplasticity', 'Trait Development']
    };
  }

  // 4. Clinical diagnosis vs educational screening
  if (matchesAny(['diagnosis', 'bệnh', 'disorder', 'chẩn đoán', 'sick', 'illness', 'doctor', 'bác sĩ'])) {
    if (locale === 'vi') {
      return {
        answer: `### Sàng lọc Tâm lý Giáo dục so với Chẩn đoán Bệnh học Lâm sàng\n\n` +
          `Một nguyên tắc khoa học cốt lõi trong tâm lý học thực chứng:\n\n` +
          `• **Thang đo sàng lọc:** Bài kiểm tra này là một công cụ tự đánh giá chuẩn hóa nhằm phản ánh các xu hướng nhận thức, hành vi và trạng thái cảm xúc của bạn.\n` +
          `• **Không phải chẩn đoán y khoa:** Điểm số cao **không đồng nghĩa** với việc bạn bị rối loạn tâm thần hay bệnh lý lâm sàng. Chẩn đoán y khoa chính thức đòi hỏi quy trình thăm khám trực tiếp, phỏng vấn lâm sàng sâu và đánh giá lịch sử phát triển bởi bác sĩ tâm thần hoặc chuyên gia tâm lý có chứng chỉ hành nghề.\n\n` +
          `*Khuyến nghị:* Hãy xem báo cáo này như tài liệu tham khảo có cấu trúc giúp bạn trao đổi cởi mở, hiệu quả hơn với chuyên gia y tế hoặc tâm lý nếu bạn gặp cản trở trong cuộc sống.`,
        source: kb.canonicalSource,
        citation: kb.academicCitation,
        tags: ['Khuyến nghị lâm sàng', 'Quy chuẩn sàng lọc']
      };
    }
    return {
      answer: `### Clinical Screening vs. Diagnostic Assessment\n\n` +
        `An essential scientific principle across psychometric literature:\n\n` +
        `• **Screening Scale:** This assessment is a validated self-report screening instrument designed to illuminate tendencies, cognitive patterns, and emotional states.\n` +
        `• **Not a Diagnosis:** High scores do **not** constitute a medical or clinical psychiatric diagnosis. Formal diagnosis requires comprehensive clinical interviews, longitudinal history review, and developmental evaluation by a licensed psychiatrist or clinical psychologist.\n\n` +
        `*Recommendation:* Use your assessment report as structured personal context to facilitate an informed, proactive conversation with a healthcare professional if you experience functional impairment.`,
      source: kb.canonicalSource,
      citation: kb.academicCitation,
      tags: ['Clinical Guidance', 'Screening Protocol']
    };
  }

  // 5. Dimension specific matches
  for (const sc of kb.strengthsAndCautions) {
    if (qLower.includes(sc.dimension) || (sc.dimension === 'inattention' && matchesAny(['focus', 'concentrat', 'chú ý', 'tập trung']))) {
      return {
        answer: `### Evidence-Based Breakdown: ${sc.dimension.toUpperCase()}\n\n` +
          `According to **${kb.canonicalSource}**:\n\n` +
          `**Core Strengths to Leverage:**\n` +
          sc.strengths.map(s => `• ${s}`).join('\n') + `\n\n` +
          `**Vulnerabilities to Monitor:**\n` +
          sc.cautions.map(c => `• ${c}`).join('\n') + `\n\n` +
          `**Recommended Evidence-Based Strategies:**\n` +
          sc.recommendations.map((r, i) => `${i + 1}. ${r}`).join('\n') +
          (userResultsSummary ? `\n\n*Note on your score:* Keep your recent result (${userResultsSummary}) in mind as you apply these practices.` : ''),
        source: kb.canonicalSource,
        citation: kb.academicCitation,
        tags: ['Dimension Breakdown', sc.dimension]
      };
    }
  }

  // 6. Topic matches in articles
  for (const art of kb.articles) {
    const artWords = art.title.toLowerCase().split(/\s+/).filter(w => w.length > 3);
    if (artWords.some(w => qLower.includes(w)) || qLower.includes(art.category.toLowerCase())) {
      return {
        answer: `### ${art.title} (${art.category})\n\n` +
          `${art.content}\n\n` +
          `**Key Scientific Takeaways:**\n` +
          art.keyTakeaways.map(t => `• ${t}`).join('\n') +
          (userResultsSummary ? `\n\n*Connection to your score:* Understanding this mechanism helps explain why your profile reflects ${userResultsSummary}.` : ''),
        source: kb.canonicalSource,
        citation: kb.academicCitation,
        tags: [art.category, 'Research Literature']
      };
    }
  }

  // 7. General synthesized answer grounded in foundational theory
  let responseText = `### Psychological Insight & Literature Guidance\n\n` +
    `Grounded in **${kb.canonicalSource}** (*${kb.academicCitation}*):\n\n` +
    `**Core Theoretical Framework:**\n${kb.foundationalTheory}\n\n`;

  if (kb.neurobiologyNote) {
    responseText += `**Biological & Nervous System Dynamics:**\n${kb.neurobiologyNote}\n\n`;
  }

  responseText += `**Practical Evidence-Based Recommendations:**\n` +
    `• **Self-Compassion:** Understand your psychometric tendencies as adaptations rather than defects.\n` +
    `• **Environment Design:** Modify your physical and social conditions to complement your baseline nervous system.\n` +
    `• **Longitudinal Perspective:** Human personality and cognitive regulation develop continuously through neuroplasticity and habit formation.\n\n` +
    `*Always consult a qualified mental health clinician for clinical diagnosis or specialized medical care.*`;

  return {
    answer: responseText,
    source: kb.canonicalSource,
    citation: kb.academicCitation,
    tags: ['Academic Synthesis', 'Peer-Reviewed Framework']
  };
}
