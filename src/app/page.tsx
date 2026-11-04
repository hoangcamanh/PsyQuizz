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

export default function HomePage() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [testModalOpen, setTestModalOpen] = useState(false);

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const handleOpenTest = () => {
    setTestModalOpen(true);
  };

  const handleStartFullTest = () => {
    // In Phase 2 this will route to /assessment/ipip-big-five
    // For now it confirms the session and starts
    setTestModalOpen(false);
    alert('Phiên làm bài IPIP Big Five đã được khởi tạo thành công trên thiết bị của bạn!');
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#080314] text-white selection:bg-brand-purple selection:text-white relative">
      
      {/* Top Header */}
      <Header
        onOpenAuth={handleOpenAuth}
        onOpenTest={handleOpenTest}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        
        {/* Section 1: Hero (Matching Screenshot 1) */}
        <HeroSection
          onOpenTest={handleOpenTest}
          onExploreMore={() => {
            const el = document.getElementById('about');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section 2: Purpose Contrast Card (Matching Screenshot 2) */}
        <PurposeSection
          onLearnMore={() => {
            const el = document.getElementById('technology');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Section 3: Technology Grid (Matching Screenshot 3) */}
        <TechnologySection
          onStartAssessment={handleOpenTest}
        />

      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      <AssessmentModal
        isOpen={testModalOpen}
        onClose={() => setTestModalOpen(false)}
        onStartFullTest={handleStartFullTest}
      />

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
