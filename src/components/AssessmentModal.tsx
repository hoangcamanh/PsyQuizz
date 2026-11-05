'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { AssessmentData } from '@/config/assessments';
import { getAssessmentById } from '@/data/assessments';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  ExternalLink, 
  BookOpen, 
  Copy, 
  Check, 
  Sparkles,
  Heart
} from 'lucide-react';

interface AssessmentModalProps {
  isOpen: boolean;
  assessment: AssessmentData | null;
  onClose: () => void;
}

export default function AssessmentModal({
  isOpen,
  assessment,
  onClose,
}: AssessmentModalProps) {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'notice' | 'quiz' | 'result'>('notice');
  const [isAcknowledged, setIsAcknowledged] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);

  // Load definition if available in registry (DASS-21, BFI-44)
  const definition = useMemo(() => {
    if (!assessment) return undefined;
    return getAssessmentById(assessment.id);
  }, [assessment]);

  const results = useMemo(() => {
    if (viewMode !== 'result' || !definition) return null;
    return definition.calculateResults(answers);
  }, [viewMode, definition, answers]);

  // Reset state whenever modal opens or assessment changes
  useEffect(() => {
    if (!isOpen) {
      setViewMode('notice');
      setIsAcknowledged(false);
      setAnswers({});
      setCurrentIndex(0);
      setCopiedPrompt(null);
    }
  }, [isOpen, assessment]);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !assessment) return null;

  const content = assessment.modalContent;

  const handleContinue = () => {
    if (!isAcknowledged) return;

    // Dedicated full-page route for native assessments (DASS-21, BFI-44)
    if (definition) {
      onClose();
      router.push(`/assessment/${assessment.id}`);
      return;
    }

    // External assessments (Eysenck, ADHD) open in a new tab
    if (assessment.destinationUrl) {
      window.open(assessment.destinationUrl, '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

  const handleSelectOption = (questionId: number, val: number) => {
    const updatedAnswers = {
      ...answers,
      [questionId]: val,
    };
    setAnswers(updatedAnswers);

    if (definition) {
      const total = definition.questions.length;
      const isComplete = Object.keys(updatedAnswers).length >= total;

      if (isComplete) {
        setTimeout(() => {
          setViewMode('result');
        }, 240);
        return;
      }

      // Find NEXT unanswered question forward from currentIndex + 1
      let nextUnansweredIndex = -1;
      for (let i = currentIndex + 1; i < total; i++) {
        if (updatedAnswers[definition.questions[i].id] === undefined) {
          nextUnansweredIndex = i;
          break;
        }
      }

      // If none found ahead, wrap around from 0 to currentIndex - 1
      if (nextUnansweredIndex === -1) {
        for (let i = 0; i < currentIndex; i++) {
          if (updatedAnswers[definition.questions[i].id] === undefined) {
            nextUnansweredIndex = i;
            break;
          }
        }
      }

      if (nextUnansweredIndex !== -1) {
        setTimeout(() => {
          setCurrentIndex(nextUnansweredIndex);
        }, 180);
      } else {
        setTimeout(() => {
          setViewMode('result');
        }, 240);
      }
    }
  };

  const handleFinishQuiz = () => {
    setViewMode('result');
  };

  const handleRetake = () => {
    setAnswers({});
    setCurrentIndex(0);
    setViewMode('quiz');
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(text);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const totalQuestions = definition?.questions.length || 0;
  const answeredCount = Object.keys(answers).length;
  const currentQuestion = definition?.questions[currentIndex];
  const progressPercent = totalQuestions > 0 ? Math.round((answeredCount / totalQuestions) * 100) : 0;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden"
    >
      {/* 75% dark tint overlay allowing subtle animated wave background to remain visible */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/75 backdrop-blur-[2px] transition-opacity duration-200"
      />

      {/* Stable fixed-height modal container to prevent any jumping or sizing wobbles */}
      <div className="relative z-10 w-full max-w-2xl h-[660px] max-h-[92vh] flex flex-col rounded-2xl bg-[#0d0818] border border-white/15 text-white shadow-2xl shadow-black overflow-hidden">
        
        {/* ================= STAGE 1: NOTICE / BEFORE YOU BEGIN (100% ENGLISH) ================= */}
        {viewMode === 'notice' && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#090512] shrink-0">
              <h3 id="modal-title" className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {content.title}
              </h3>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-gray-400 hover:text-white text-lg px-2 py-1 rounded transition-colors focus:outline-none"
              >
                ✕
              </button>
            </div>

            {/* Scrollable Document Body with hidden scrollbar */}
            <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6 text-sm text-gray-300 leading-relaxed flex-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              
              {/* About this assessment */}
              <div>
                <h4 className="font-semibold text-white text-base mb-2">
                  About this assessment
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {content.about}
                </p>
              </div>

              {/* What is it for? */}
              <div>
                <h4 className="font-semibold text-white text-base mb-2">
                  What is it for?
                </h4>
                <ul className="list-disc list-outside pl-5 space-y-1.5 text-gray-300">
                  {content.purpose.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to complete the assessment */}
              <div>
                <h4 className="font-semibold text-white text-base mb-2">
                  How to complete the assessment
                </h4>
                <ul className="list-disc list-outside pl-5 space-y-1.5 text-gray-300">
                  {content.instructions.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Important Notice */}
              <div className="pt-3 border-t border-white/10">
                <h4 className="font-semibold text-white text-base mb-2">
                  Important Notice
                </h4>
                <p className="text-gray-300 leading-relaxed">
                  {content.notice}
                </p>
              </div>

            </div>

            {/* Mandatory Acknowledgment Checkbox (100% English) */}
            <div className="px-6 sm:px-8 py-3.5 bg-[#090512] border-t border-white/10 shrink-0">
              <label className="flex items-start gap-3 cursor-pointer group select-none">
                <input
                  type="checkbox"
                  id="acknowledge-checkbox"
                  checked={isAcknowledged}
                  onChange={(e) => setIsAcknowledged(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-white/30 bg-white/10 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 cursor-pointer accent-purple-600"
                />
                <span className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors leading-relaxed">
                  I understand that this assessment cannot determine whether I have a mental health disorder or predict my future mental health.
                </span>
              </label>
            </div>

            {/* Action Buttons: Back | I Understand */}
            <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-[#090512] flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 text-sm font-medium transition-colors focus:outline-none"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleContinue}
                disabled={!isAcknowledged}
                className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all focus:outline-none ${
                  isAcknowledged
                    ? 'bg-white text-black hover:bg-gray-200 cursor-pointer shadow-md active:scale-95'
                    : 'bg-white/15 text-gray-500 cursor-not-allowed pointer-events-none'
                }`}
              >
                I Understand
              </button>
            </div>
          </>
        )}

        {/* ================= STAGE 2: IN-MODAL QUIZ RUNNER (100% ENGLISH) ================= */}
        {viewMode === 'quiz' && definition && currentQuestion && (
          <>
            {/* Quiz Header with progress */}
            <div className="px-6 sm:px-8 py-4 border-b border-white/10 bg-[#090512] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewMode('notice')}
                  className="text-gray-400 hover:text-white text-xs flex items-center gap-1 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Notice
                </button>
                <span className="text-white/20">|</span>
                <span className="text-sm font-bold text-white tracking-tight">
                  {definition.code}
                </span>
                <span className="text-xs text-purple-300 bg-purple-950/60 border border-purple-800/40 px-2.5 py-0.5 rounded-full font-mono">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
              </div>

              <button
                onClick={onClose}
                aria-label="Close"
                className="text-gray-400 hover:text-white text-lg px-2 py-1 rounded transition-colors focus:outline-none"
              >
                ✕
              </button>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-white/10 shrink-0">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-teal-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Quiz Body with fixed-height question frame to prevent jumping */}
            <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6 flex-1 flex flex-col justify-between [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              
              <div className="space-y-4">
                {/* Statement Number */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Statement #{currentQuestion.id}
                  </span>
                  <span className="text-xs text-brand-teal font-medium font-mono">
                    {progressPercent}% Completed
                  </span>
                </div>

                {/* Fixed-height question frame (min-h-[110px]) so short and long questions never resize the box */}
                <div className="min-h-[110px] sm:min-h-[120px] p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-center">
                  <h3 className="text-base sm:text-lg font-medium text-white leading-relaxed max-w-xl">
                    &ldquo;{currentQuestion.text}&rdquo;
                  </h3>
                </div>

                {/* Options with stable fixed heights */}
                <div className={`grid gap-2.5 pt-1 ${
                  definition.options.length <= 4 
                    ? 'grid-cols-1 sm:grid-cols-2' 
                    : 'grid-cols-1 sm:grid-cols-5'
                }`}>
                  {definition.options.map((opt) => {
                    const isSelected = answers[currentQuestion.id] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelectOption(currentQuestion.id, opt.value)}
                        className={`text-left p-3 rounded-xl border transition-all flex sm:flex-col sm:items-center sm:text-center items-start gap-2 min-h-[64px] sm:min-h-[72px] justify-center ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-lg scale-[1.01]'
                            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-gray-200'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-md text-xs font-bold flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'bg-black text-white'
                              : 'bg-white/10 text-gray-300'
                          }`}
                        >
                          {opt.label}
                        </div>
                        <span className={`text-xs ${isSelected ? 'font-bold text-black' : 'text-gray-300'} leading-tight`}>
                          {opt.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Jump Dots */}
              <div className="pt-3 flex flex-wrap gap-1 justify-center max-h-20 overflow-y-auto border-t border-white/5">
                {definition.questions.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-6 h-6 rounded text-[11px] font-semibold transition-all ${
                        isCurrent
                          ? 'bg-white text-black font-bold ring-1 ring-white'
                          : isAnswered
                          ? 'bg-purple-900/60 border border-purple-500/50 text-purple-200'
                          : 'bg-white/5 text-gray-500 hover:text-gray-300'
                      }`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quiz Footer Controls */}
            <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-[#090512] flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 rounded-xl border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>

              {answeredCount === totalQuestions ? (
                <button
                  type="button"
                  onClick={handleFinishQuiz}
                  className="px-6 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> View Results
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setCurrentIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                  disabled={currentIndex === totalQuestions - 1}
                  className="px-4 py-2 rounded-xl bg-white/10 text-white hover:bg-white/20 text-xs font-medium transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
                >
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </>
        )}

        {/* ================= STAGE 3: IN-MODAL RESULTS DASHBOARD (TIẾNG VIỆT & DỊU DÀNG, CÓ NOTEBOOKLM) ================= */}
        {viewMode === 'result' && results && definition && (
          <>
            {/* Result Header */}
            <div className="px-6 sm:px-8 py-5 border-b border-white/10 bg-[#090512] flex items-center justify-between shrink-0">
              <div>
                <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider block">
                  Assessment Report: {definition.code}
                </span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {results.title}
                </h3>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="text-gray-400 hover:text-white text-lg px-2 py-1 rounded transition-colors focus:outline-none"
              >
                ✕
              </button>
            </div>

            {/* Result Body (Smooth, non-alarmist, gentle self-care) */}
            <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6 flex-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              
              {/* Summary banner */}
              <div className="p-4 rounded-xl bg-purple-950/30 border border-purple-800/30 flex items-center gap-3">
                <Heart className="w-5 h-5 text-purple-400 shrink-0" />
                <p className="text-xs sm:text-sm text-gray-200 leading-relaxed">
                  {results.summary}
                </p>
              </div>

              {/* Dimension Score Cards */}
              <div className={`grid gap-3.5 ${
                Object.keys(results.scores).length === 3 
                  ? 'grid-cols-1 sm:grid-cols-3' 
                  : 'grid-cols-1 sm:grid-cols-2'
              }`}>
                {Object.values(results.scores).map((dim) => {
                  const percent = Math.min(100, Math.round((dim.score / dim.maxScore) * 100));
                  return (
                    <div
                      key={dim.id}
                      className="p-4 rounded-xl bg-[#140b26] border border-white/10 space-y-2.5 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-start">
                          <h4 className="text-xs font-bold text-white">{dim.name}</h4>
                          {dim.levelLabel && (
                            <span 
                              className="px-2 py-0.5 rounded-full text-[10px] font-bold border"
                              style={{
                                color: dim.levelColor || '#c084fc',
                                borderColor: `${dim.levelColor || '#c084fc'}40`,
                                backgroundColor: `${dim.levelColor || '#c084fc'}15`
                              }}
                            >
                              {dim.levelLabel}
                            </span>
                          )}
                        </div>

                        <div className="flex items-baseline gap-1.5">
                          <span className="text-2xl font-extrabold text-white">{dim.score}</span>
                          <span className="text-[11px] text-gray-400">/ {dim.maxScore}</span>
                          {dim.averageScore !== undefined && (
                            <span className="text-[11px] text-brand-teal ml-auto font-mono">
                              Avg: {dim.averageScore}/5.0
                            </span>
                          )}
                        </div>

                        {/* Progress Bar with soft theme color */}
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${percent}%`,
                              backgroundColor: dim.levelColor || '#c084fc'
                            }}
                          />
                        </div>
                      </div>

                      <p className="text-[11px] text-gray-300 leading-relaxed pt-2 border-t border-white/5">
                        {dim.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Dedicated NotebookLM Section (Now available for BOTH DASS-21 and BFI-44!) */}
              {definition.notebookLmUrl && (
                <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/60 to-brand-purple/20 border border-purple-500/40 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 rounded-xl bg-purple-900/50 text-brand-purple-light border border-purple-700/50">
                        <BookOpen className="w-5 h-5 text-teal-300" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                          NotebookLM Research Companion (Google)
                        </h4>
                        <p className="text-[11px] text-gray-300">
                          Ask in-depth questions grounded in curated scientific literature about {definition.code}.
                        </p>
                      </div>
                    </div>

                    <a
                      href={definition.notebookLmUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black hover:bg-gray-200 text-xs font-bold transition-all whitespace-nowrap shadow"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>Open NotebookLM</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                  {definition.notebookLmPrompts && (
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <span className="text-[10px] font-semibold text-purple-300 uppercase tracking-wider block">
                        Suggested questions to explore (Click to copy):
                      </span>
                      <div className="space-y-1.5">
                        {definition.notebookLmPrompts.map((prompt, i) => (
                          <div
                            key={i}
                            onClick={() => handleCopyPrompt(prompt)}
                            className="p-2.5 rounded-lg bg-white/5 border border-white/10 hover:border-purple-400 cursor-pointer transition-all flex items-center justify-between gap-2 text-xs text-gray-200 hover:text-white"
                          >
                            <span>&ldquo;{prompt}&rdquo;</span>
                            <span className="shrink-0 text-gray-400">
                              {copiedPrompt === prompt ? (
                                <Check className="w-3.5 h-3.5 text-emerald-400" />
                              ) : (
                                <Copy className="w-3.5 h-3.5" />
                              )}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Gentle Self-Care Guidance (Soothing, uplifting, non-alarmist) */}
              {results.actionGuide && (
                <div className="p-4 sm:p-5 rounded-xl bg-[#130926] border border-purple-900/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <h4 className="text-xs sm:text-sm font-bold text-white">
                      {results.actionGuide.levelTitle}
                    </h4>
                  </div>
                  <ul className="space-y-2 text-xs text-gray-300 list-disc list-inside leading-relaxed">
                    {results.actionGuide.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Result Footer */}
            <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-[#090512] flex items-center justify-between shrink-0">
              <button
                type="button"
                onClick={handleRetake}
                className="px-5 py-2.5 rounded-xl border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Retake Assessment
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
