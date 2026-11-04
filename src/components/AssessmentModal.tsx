'use client';

import React, { useEffect } from 'react';
import { AssessmentData } from '@/config/assessments';

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
    if (assessment.destinationUrl) {
      window.open(assessment.destinationUrl, '_blank', 'noopener,noreferrer');
    }
    onClose();
  };

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

      {/* Serious, dignified clinical/academic modal container */}
      <div className="relative z-10 w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl bg-[#0d0818] border border-white/15 text-white shadow-2xl shadow-black overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-white/10 bg-[#090512]">
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
        <div className="overflow-y-auto px-6 sm:px-8 py-6 space-y-6 text-sm text-gray-300 leading-relaxed [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          
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

        {/* Dignified Action Buttons: Back | I Understand */}
        <div className="px-6 sm:px-8 py-4 border-t border-white/10 bg-[#090512] flex items-center justify-end gap-3">
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
            className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-gray-200 text-sm font-semibold transition-colors focus:outline-none"
          >
            I Understand
          </button>
        </div>

      </div>
    </div>
  );
}
