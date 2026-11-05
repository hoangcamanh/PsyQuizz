'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WaveBackground from '@/components/WaveBackground';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  RotateCcw, 
  ShieldAlert, 
  Sparkles, 
  ExternalLink,
  BookOpen, 
  Copy, 
  Check, 
  Heart 
} from 'lucide-react';
import { getAssessmentById } from '@/data/assessments';
import { PsyQuizzNotebook } from '@/components/PsyQuizzNotebook';

export default function AssessmentRunnerPage() {
  const params = useParams();
  const router = useRouter();
  const assessmentId = params?.id as string;
  const assessment = useMemo(() => getAssessmentById(assessmentId), [assessmentId]);

  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState<string | null>(null);
  const [showExitModal, setShowExitModal] = useState(false);

  // Warn before browser unload/refresh if test is in progress
  React.useEffect(() => {
    if (isCompleted || Object.keys(answers).length === 0) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [isCompleted, answers]);

  const handleAttemptExit = () => {
    if (!isCompleted && Object.keys(answers).length > 0) {
      setShowExitModal(true);
    } else {
      router.push('/');
    }
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    router.push('/');
  };

  if (!assessment) {
    return (
      <div className="min-h-screen bg-[#080314] text-white flex flex-col justify-between selection:bg-brand-purple selection:text-white relative">
        <Header onOpenAuth={() => {}} onOpenTest={() => router.push('/')} />
        <main className="flex-1 flex items-center justify-center p-6 text-center z-10">
          <div className="p-8 rounded-2xl bg-[#0d0818] border border-white/15 max-w-md space-y-4 shadow-2xl">
            <ShieldAlert className="w-12 h-12 text-amber-400 mx-auto" />
            <h2 className="text-xl font-bold text-white">Assessment Not Found</h2>
            <p className="text-gray-400 text-sm">
              The requested assessment with code &ldquo;{assessmentId}&rdquo; is not available in our registry.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 font-semibold text-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Homepage
            </Link>
          </div>
        </main>
        <Footer onOpenTest={() => router.push('/')} />
      </div>
    );
  }

  const questions = assessment.questions;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(answers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (value: number) => {
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: value
    };
    setAnswers(updatedAnswers);

    const isAllComplete = Object.keys(updatedAnswers).length >= totalQuestions;

    if (isAllComplete) {
      setTimeout(() => {
        setIsCompleted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 240);
      return;
    }

    // Find the NEXT unanswered question forward from currentIndex + 1
    let nextUnansweredIndex = -1;
    for (let i = currentIndex + 1; i < totalQuestions; i++) {
      if (updatedAnswers[questions[i].id] === undefined) {
        nextUnansweredIndex = i;
        break;
      }
    }

    // If none found ahead, wrap around from 0 up to currentIndex - 1
    if (nextUnansweredIndex === -1) {
      for (let i = 0; i < currentIndex; i++) {
        if (updatedAnswers[questions[i].id] === undefined) {
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
        setIsCompleted(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 240);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) setCurrentIndex(prev => prev + 1);
  };

  const handleFinish = () => {
    setIsCompleted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentIndex(0);
    setIsCompleted(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCopyPrompt = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrompt(text);
    setTimeout(() => setCopiedPrompt(null), 2000);
  };

  const results = useMemo(() => {
    if (!isCompleted) return null;
    return assessment.calculateResults(answers);
  }, [assessment, answers, isCompleted]);

  return (
    <div className="min-h-screen bg-[#080314] text-white flex flex-col justify-between selection:bg-brand-purple selection:text-white relative overflow-hidden">
      
      {/* 1:1 Silky Wave WebGL Background */}
      <WaveBackground />

      {/* Dark overlay & ambient cosmic glows */}
      <div className="absolute inset-0 pointer-events-none z-[1] bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        <div className="absolute -top-40 -left-40 w-[650px] h-[650px] bg-purple-600/25 rounded-full blur-[140px] animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-pink-500/20 rounded-full blur-[130px] animate-pulse" style={{ animationDuration: '6s' }} />
      </div>

      {/* Navigation Header */}
      <div className="relative z-20">
        <Header 
          onOpenAuth={() => {}} 
          onOpenTest={handleAttemptExit} 
          onLogoClick={handleAttemptExit}
          logoHref="/"
        />
      </div>

      {/* Dedicated Questionnaire Runner Container with expansive max-w-4xl width */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 relative z-10 flex flex-col justify-center">
        {!isCompleted ? (
          /* ================= QUESTIONNAIRE CARD ================= */
          <div className="w-full rounded-3xl bg-[#0d0818]/90 backdrop-blur-xl border border-white/15 text-white shadow-2xl shadow-black overflow-hidden flex flex-col">
            
            {/* Header */}
            <div className="px-6 sm:px-10 py-5 border-b border-white/10 bg-[#090512]/90 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleAttemptExit}
                  className="text-gray-400 hover:text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <span className="text-white/20">|</span>
                <div>
                  <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider block">
                    {assessment.code} • Scientific Psychometrics
                  </span>
                  <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                    {assessment.name}
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-purple-300 bg-purple-950/70 border border-purple-800/40 px-3 py-1 rounded-full font-mono font-bold">
                  {currentIndex + 1} of {totalQuestions}
                </span>
                <button
                  onClick={handleReset}
                  title="Reset quiz"
                  className="p-2 rounded-xl text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1 bg-white/10">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-teal-400 transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Body with ample breathing room */}
            <div className="p-6 sm:p-10 space-y-8">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    Statement #{currentQuestion.id}
                  </span>
                  <span className="text-xs text-brand-teal font-medium font-mono">
                    {progressPercent}% Completed
                  </span>
                </div>

                <div className="min-h-[90px] p-6 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-center">
                  <h2 className="text-xl sm:text-2xl font-medium text-white leading-relaxed max-w-2xl">
                    &ldquo;{currentQuestion.text}&rdquo;
                  </h2>
                </div>
              </div>

              {/* Options */}
              <div className={`grid gap-3.5 pt-1 ${
                assessment.options.length <= 4 
                  ? 'grid-cols-1 sm:grid-cols-2' 
                  : 'grid-cols-1 sm:grid-cols-5'
              }`}>
                {assessment.options.map((opt) => {
                  const isSelected = answers[currentQuestion.id] === opt.value;
                  return (
                    <button
                      key={opt.value}
                      onClick={() => handleSelectOption(opt.value)}
                      className={`text-left p-4 sm:p-5 rounded-2xl border transition-all flex sm:flex-col sm:items-center sm:text-center items-start gap-3 min-h-[72px] sm:min-h-[88px] justify-center ${
                        isSelected
                          ? 'bg-white text-black border-white shadow-xl scale-[1.02]'
                          : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/30 text-gray-200'
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-black text-white'
                            : 'bg-white/10 text-gray-300'
                        }`}
                      >
                        {opt.label}
                      </div>
                      <span className={`text-xs sm:text-sm ${isSelected ? 'font-bold text-black' : 'text-gray-300'} leading-tight`}>
                        {opt.description}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Quick Jump Dots */}
              <div className="pt-4 flex flex-wrap gap-1.5 justify-center max-h-24 overflow-y-auto border-t border-white/5">
                {questions.map((q, idx) => {
                  const isAnswered = answers[q.id] !== undefined;
                  const isCurrent = idx === currentIndex;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all ${
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

            {/* Footer Controls */}
            <div className="px-6 sm:px-10 py-5 border-t border-white/10 bg-[#090512]/90 flex items-center justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="px-5 py-2.5 rounded-xl border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Previous
              </button>

              {answeredCount === totalQuestions ? (
                <button
                  type="button"
                  onClick={handleFinish}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center gap-1.5 animate-pulse"
                >
                  <CheckCircle2 className="w-4 h-4" /> View Analysis Results
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentIndex === totalQuestions - 1}
                  className="px-5 py-2.5 rounded-xl bg-white/10 text-white hover:bg-white/20 text-xs font-medium transition-colors disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1.5"
                >
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>
        ) : (
          /* ================= RESULTS DASHBOARD (100% ENGLISH) ================= */
          results && (
            <div className="w-full rounded-3xl bg-[#0d0818]/90 backdrop-blur-xl border border-white/15 text-white shadow-2xl shadow-black overflow-hidden flex flex-col space-y-8 p-6 sm:p-10 animate-in fade-in duration-300">
              
              {/* Header: Stacked layout so description doesn't wrap unnecessarily and badge has its own line */}
              <div className="border-b border-white/10 pb-6 space-y-3">
                <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider block">
                  Assessment Report: {assessment.code}
                </span>

                <div className="space-y-1.5">
                  <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                    {results.title}
                  </h1>
                  <p className="text-sm text-gray-300 leading-relaxed w-full">
                    {results.summary}
                  </p>
                </div>

                {results.actionGuide?.levelBadge && (
                  <div className="pt-1.5">
                    <span className="inline-flex items-center px-4 py-2 rounded-xl bg-purple-950/60 border border-purple-500/30 text-xs sm:text-sm font-semibold text-white shadow-sm">
                      {results.actionGuide.levelBadge}
                    </span>
                  </div>
                )}
              </div>

              {/* Dimension Score Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(results.scores).map((dim) => {
                  const percent = Math.min(100, Math.round((dim.score / dim.maxScore) * 100));
                  return (
                    <div
                      key={dim.id}
                      className="p-5 rounded-2xl bg-[#140b26]/80 border border-white/10 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="text-xs font-bold text-white">{dim.name}</h3>
                          {dim.levelLabel && (
                            <span 
                              className="px-2.5 py-0.5 rounded-full text-[10px] font-bold border"
                              style={{
                                color: dim.levelColor || '#a855f7',
                                borderColor: `${dim.levelColor || '#a855f7'}40`,
                                backgroundColor: `${dim.levelColor || '#a855f7'}15`
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

                        {/* Progress Bar */}
                        <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${percent}%`,
                              backgroundColor: dim.levelColor || '#a855f7'
                            }}
                          />
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed pt-2 border-t border-white/5">
                        {dim.description}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* PsyQuizz In-App Research Notebook & Academic Companion */}
              <PsyQuizzNotebook 
                assessment={assessment} 
                resultsSummary={`${results.title}: ${results.summary}`} 
              />

              {/* Action Guidance Card */}
              {results.actionGuide && (
                <div className="p-6 rounded-2xl bg-[#140b26]/90 border border-purple-900/40 space-y-3">
                  <div className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-pink-400" />
                    <h3 className="text-sm font-bold text-white">
                      {results.actionGuide.levelTitle}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-gray-300 list-disc list-inside leading-relaxed">
                    {results.actionGuide.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Bottom Buttons */}
              <div className="flex justify-between items-center pt-2">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl border border-white/20 text-gray-300 hover:text-white hover:bg-white/5 text-xs font-medium transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake Assessment
                </button>

                <Link
                  href="/"
                  className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 text-xs font-semibold transition-colors"
                >
                  Back to Homepage
                </Link>
              </div>

            </div>
          )
        )}
      </main>

      {/* Footer */}
      <div className="relative z-20">
        <Footer onOpenTest={() => router.push('/')} />
      </div>

      {/* Exit Confirmation Dialog when user tries to leave mid-test */}
      {showExitModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
        >
          <div className="w-full max-w-md rounded-2xl bg-[#0e071e] border border-white/20 p-6 sm:p-7 shadow-2xl text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto">
              <ShieldAlert className="w-6 h-6" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg font-bold text-white">
                Leave Assessment?
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                You haven&apos;t finished your test yet. If you leave now, your current answers will be lost and won&apos;t be saved.
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowExitModal(false)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 text-xs font-bold transition-all shadow"
              >
                Continue Test
              </button>
              <button
                type="button"
                onClick={handleConfirmExit}
                className="flex-1 px-4 py-2.5 rounded-xl border border-white/20 text-gray-300 hover:text-white hover:bg-white/10 text-xs font-semibold transition-all"
              >
                Leave
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}