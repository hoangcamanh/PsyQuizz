'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Crown, History } from 'lucide-react';
import { useTranslation } from '@/i18n/I18nContext';
import { useAnonymous } from '@/context/AnonymousContext';
import LanguageSwitcher from './LanguageSwitcher';
import AnonymousKeyBadge from './AnonymousKeyBadge';
import PremiumUpgradeModal from './PremiumUpgradeModal';
import AssessmentHistoryModal from './AssessmentHistoryModal';

interface HeaderProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void;
  onOpenTest: () => void;
  onLogoClick?: () => void;
  logoHref?: string;
}

export default function Header({ onOpenTest, onLogoClick, logoHref = '/' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const { t, locale } = useTranslation();
  const { isPlus } = useAnonymous();

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    if (onLogoClick) {
      e.preventDefault();
      onLogoClick();
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#080314]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40'
          : 'bg-[#080314]/30 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-24 sm:h-[96px] flex items-center justify-between">
        
        {/* Left: Brand Logo (enlarged & spacious) */}
        <Link 
          href={logoHref} 
          onClick={handleLogoClick}
          className="flex items-center gap-2 group transition-transform duration-300 hover:scale-[1.02]"
        >
          <div className="relative h-13 sm:h-16 w-52 sm:w-64">
            <Image
              src="/logo-white.png"
              alt="PsyQuizz Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Right Navigation Links: Take a Test, History, Language Switcher, Anonymous Key, Crown Icon */}
        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          {/* 1. Take a Test (Text link format like About Us) */}
          <div className="flex items-center justify-start shrink-0 mr-3 lg:mr-5">
            <button
              type="button"
              onClick={onOpenTest}
              className="text-gray-300 hover:text-white font-medium text-sm lg:text-[15px] transition-colors relative py-1 group inline-block cursor-pointer"
            >
              <span className="relative inline-block text-left whitespace-nowrap">
                {t('common.header.takeTest')}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-purple to-brand-teal transition-all duration-300 group-hover:w-full" />
              </span>
            </button>
          </div>

          {/* 2. History (Text link format like About Us, replacing About Us) */}
          <div className="flex items-center justify-start shrink-0">
            <button
              type="button"
              onClick={() => setShowHistoryModal(true)}
              className="text-gray-300 hover:text-white font-medium text-sm lg:text-[15px] transition-colors relative py-1 group inline-block cursor-pointer"
            >
              <span className="relative inline-block text-left whitespace-nowrap">
                {locale === 'vi' ? 'Lịch Sử' : 'History'}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-purple to-brand-teal transition-all duration-300 group-hover:w-full" />
              </span>
            </button>
          </div>

          {/* 3. Flag Switcher (Tiếng Việt / English) */}
          <div className="shrink-0 flex items-center">
            <LanguageSwitcher />
          </div>

          {/* 4. Anonymous Account Key Badge */}
          <div className="shrink-0 flex items-center">
            <AnonymousKeyBadge />
          </div>

          {/* 5. Crown Icon Button (Only shown if user is NOT yet Premium) */}
          {!isPlus && (
            <div className="shrink-0 flex items-center">
              <button
                type="button"
                onClick={() => setShowUpgradeModal(true)}
                className="p-2 rounded-full bg-gradient-to-r from-amber-500/20 via-purple-600/30 to-amber-500/20 hover:from-amber-500/30 hover:to-purple-600/40 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.25)] transition-all active:scale-90 cursor-pointer flex items-center justify-center shrink-0 group"
                title={locale === 'vi' ? 'Nâng Cấp Premium' : 'Get Premium'}
                aria-label={locale === 'vi' ? 'Nâng Cấp Premium' : 'Get Premium'}
              >
                <Crown className="w-4 h-4 fill-amber-400 text-amber-300 group-hover:scale-115 transition-transform" />
              </button>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-gray-400 hover:text-white focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c061d]/98 backdrop-blur-2xl border-b border-purple-900/40 px-6 py-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="pb-2 border-b border-white/10 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <AnonymousKeyBadge isMobile />
              {!isPlus && (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setShowUpgradeModal(true);
                  }}
                  className="p-2.5 rounded-full bg-gradient-to-r from-amber-500/20 via-purple-600/30 to-amber-500/20 border border-amber-500/40 text-amber-300 shrink-0"
                  title={locale === 'vi' ? 'Nâng Cấp Premium' : 'Get Premium'}
                >
                  <Crown className="w-4 h-4 fill-amber-400 text-amber-300" />
                </button>
              )}
            </div>
            <LanguageSwitcher isMobile />
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTest();
            }}
            className="block w-full text-left text-base font-medium text-gray-200 hover:text-brand-teal py-2"
          >
            {t('common.header.takeTest')}
          </button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              setShowHistoryModal(true);
            }}
            className="block w-full text-left text-base font-medium text-gray-200 hover:text-brand-teal py-2"
          >
            {locale === 'vi' ? 'Lịch Sử' : 'History'}
          </button>
        </div>
      )}

      {/* Reusable Premium Modal */}
      <PremiumUpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
      />

      {/* Reusable Assessment History Modal */}
      <AssessmentHistoryModal
        isOpen={showHistoryModal}
        onClose={() => setShowHistoryModal(false)}
      />
    </header>
  );
}
