import { NextRequest, NextResponse } from 'next/server';
import { KNOWLEDGE_BASE, queryAssessmentKnowledge } from '@/data/assessments/knowledgeBase';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { assessmentId, question, userResultsSummary, history, locale } = body;

    if (!assessmentId || !question) {
      return NextResponse.json(
        { error: 'assessmentId and question are required' },
        { status: 400 }
      );
    }

    const kb = KNOWLEDGE_BASE[assessmentId];
    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = process.env.GEMINI_MODEL || 'gemini-2.5-flash';
    const isVi = locale === 'vi';

    // If Gemini API key is available, call Gemini with strict grounding prompt
    if (apiKey && apiKey !== 'your-gemini-api-key') {
      try {
        const langDirective = isVi
          ? '3. LANGUAGE: Respond entirely in natural, empathetic, and academically rigorous VIETNAMESE (Tiếng Việt). Do NOT apologize to the user or state rules about language constraints. Answer directly, warmly, and insightfully in Vietnamese.'
          : '3. LANGUAGE: If the user query is in Vietnamese, respond warmly in Vietnamese. Otherwise, write your response naturally in clear, accessible, and compassionate English. Do NOT apologize to the user, lecture them, or state rules about language constraints. Answer directly and insightfully.';

        const systemPrompt = `You are the PsyQuizz In-App Academic Research Assistant.
Your task is to provide compassionate, scientifically rigorous, and strictly grounded psychological answers based on the curated literature of:
Assessment: ${kb?.title || assessmentId}
Foundational Source: ${kb?.canonicalSource || 'Standard Psychometric Framework'}
Academic Citation: ${kb?.academicCitation || 'Curated Psychometric Research'}
Theoretical Foundation: ${kb?.foundationalTheory || 'Established Psychometric Science'}
Neurobiology / Mechanisms: ${kb?.neurobiologyNote || 'Cognitive and psychological science'}

STRICT RULES:
1. DO NOT HALLUCINATE OR INVENT FACTS. Strictly ground your response in the theoretical and empirical literature of this assessment.
2. The user recently took this assessment and their profile summary is: "${userResultsSummary || 'Completed test'}".
${langDirective}
4. NEVER say "I apologize, but as the PsyQuizz Research Assistant, I am required to provide all academic insights in 100% English" or mention any language restrictions.
5. Emphasize that psychometric scores describe current patterns, tendencies, and adaptations—not categorical medical diseases or unalterable flaws.
6. Provide actionable, evidence-based coping or development strategies.
7. FORMATTING: Use clean markdown. Use double newlines before and after headings. Put each bullet point on its own separate line starting with "* **Title:** description". NEVER clump multiple bullet points together on the same line.
8. Always end with a citation on its own line: "[Source: ${kb?.academicCitation || 'Psychological Literature'}]".
9. Keep answers structured, insightful, and under 250 words.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [
                {
                  role: 'user',
                  parts: [
                    {
                      text: `${systemPrompt}\n\nUser Question: ${question}`
                    }
                  ]
                }
              ],
              generationConfig: {
                temperature: 0.2, // Low temperature for high factual accuracy
                maxOutputTokens: 2048
              }
            })
          }
        );

        if (response.ok) {
          const data = await response.json();
          const parts = data.candidates?.[0]?.content?.parts || [];
          const textPart = parts.find((p: any) => p.text && typeof p.text === 'string' && p.text.trim().length > 0);
          const generatedText = textPart?.text;

          if (generatedText) {
            return NextResponse.json({
              answer: generatedText,
              source: kb?.canonicalSource || 'PsyQuizz Research Library',
              citation: kb?.academicCitation || 'Curated Peer-Reviewed Literature',
              isAiGenerated: true
            });
          }
        }
      } catch (err) {
        console.warn('Gemini API call failed, falling back to local knowledge base:', err);
      }
    }

    // Grounded Local Knowledge Synthesizer (Zero-latency, 100% grounded, no hallucinations)
    const result = queryAssessmentKnowledge(assessmentId, question, userResultsSummary, locale);

    return NextResponse.json({
      answer: result.answer,
      source: result.source,
      citation: result.citation,
      isAiGenerated: false
    });
  } catch (error) {
    console.error('Error in /api/notebook:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
