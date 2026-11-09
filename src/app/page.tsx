'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PurposeSection from '@/components/PurposeSection';
import ExploreSection from '@/components/ExploreSection';
import TechnologySection from '@/components/TechnologySection';
import AssessmentModal from '@/components/AssessmentModal';
import AuthModal from '@/components/AuthModal';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';
import { getLocalizedAssessments, AssessmentData } from '@/config/assessments';
import { useTranslation } from '@/i18n/I18nContext';

export default function HomePage() {
  const { locale } = useTranslation();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [selectedAssessmentId, setSelectedAssessmentId] = useState<string | null>(null);
  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);

  const localizedAssessments = getLocalizedAssessments(locale);
  const selectedAssessment = selectedAssessmentId
    ? localizedAssessments.find(a => a.id === selectedAssessmentId) || null
    : null;

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSelectAssessment = (assessment: AssessmentData) => {
    setSelectedAssessmentId(assessment.id);
    setAssessmentModalOpen(true);
  };

  const handleOpenTest = () => {
    // When clicking "Take a Test" from Header or Footer, smooth scroll to assessments section
    const el = document.getElementById('assessments');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setSelectedAssessmentId('dass-21');
      setAssessmentModalOpen(true);
    }
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#080314] text-white selection:bg-brand-purple selection:text-white relative">
      
      {/* Top Header */}
      <Header
        onOpenAuth={handleOpenAuth}
        onOpenTest={handleOpenTest}
      />

      {/* Main Content Sections */}
      <main className="flex-1 -mt-20">
        
        {/* Section 1: Hero */}
        <HeroSection
          onOpenTest={handleOpenTest}
          onExploreMore={() => {
            const el = document.getElementById('assessments');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Continuous Pastel Gradient Container for Assessments (1) and Explore World (2) */}
        <div
          className="relative z-20 overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, #c7c0ff 0%, #e2dfff 20%, #ffffff 50%, #fcd6ed 80%, #f6aada 100%)',
          }}
        >
          {/* Subtle ambient light glows */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 right-0 w-96 h-96 bg-pink-300/35 rounded-full blur-3xl pointer-events-none" />

          {/* Section (1): Core Psychological Assessments */}
          <PurposeSection
            onSelectAssessment={handleSelectAssessment}
          />

          {/* Spacing Gap: Giữa (1) và (2) kéo dài background cách nhau một khoảng */}
          <div className="h-10 sm:h-14 md:h-20" />

          {/* Section (2): Explore the World Within You */}
          <ExploreSection />
        </div>

        {/* Section 3: Technology Grid */}
        <TechnologySection />

      </main>

      {/* Footer */}
      <Footer onOpenTest={handleOpenTest} />

      {/* Reusable Pre-Test Modal */}
      <AssessmentModal
        isOpen={assessmentModalOpen}
        assessment={selectedAssessment}
        onClose={() => setAssessmentModalOpen(false)}
      />

      {/* Auth Modal (preserved for authentication workflows) */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => {
          // Success callback
        }}
      />

      {/* Floating Bottom Widgets */}
      <FloatingWidgets />

    </div>
  );
}
