'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import PurposeSection from '@/components/PurposeSection';
import TechnologySection from '@/components/TechnologySection';
import AssessmentModal from '@/components/AssessmentModal';
import AuthModal from '@/components/AuthModal';
import FloatingWidgets from '@/components/FloatingWidgets';
import Footer from '@/components/Footer';
import { ASSESSMENTS, AssessmentData } from '@/config/assessments';

export default function HomePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [selectedAssessment, setSelectedAssessment] = useState<AssessmentData | null>(null);
  const [assessmentModalOpen, setAssessmentModalOpen] = useState(false);

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleSelectAssessment = (assessment: AssessmentData) => {
    setSelectedAssessment(assessment);
    setAssessmentModalOpen(true);
  };

  const handleOpenTest = () => {
    // When clicking "Take a Test" from Header or Footer, smooth scroll to assessments section
    const el = document.getElementById('assessments');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setSelectedAssessment(ASSESSMENTS[0]);
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

        {/* Section 2: Core Psychological Assessments */}
        <PurposeSection
          onSelectAssessment={handleSelectAssessment}
        />

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
