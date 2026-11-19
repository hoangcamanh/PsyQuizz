'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, Crown } from 'lucide-react';
import { useTranslation } from '@/i18n/I18nContext';
import { useAnonymous } from '@/context/AnonymousContext';
import LanguageSwitcher from './LanguageSwitcher';
import AnonymousKeyBadge from './AnonymousKeyBadge';
import PremiumUpgradeModal from './PremiumUpgradeModal';

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

        {/* Right Navigation Links: Anonymous Key, Get Premium, Language Switcher, About Us & Take a Test */}
        <nav className="hidden md:flex items-center gap-3 lg:gap-5">
          {/* Anonymous Key Badge */}
          <div className="shrink-0 flex items-center">
            <AnonymousKeyBadge />
          </div>

          {/* Get Premium Button */}
          <div className="shrink-0 flex items-center">
            {isPlus ? (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>PLUS VIP</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setShowUpgradeModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-purple-600/30 to-amber-500/20 hover:from-amber-500/30 hover:to-purple-600/40 border border-amber-500/40 hover:border-amber-400 text-amber-300 hover:text-amber-200 text-xs font-bold shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all active:scale-95 cursor-pointer"
              >
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                <span>{locale === 'vi' ? 'Nâng Cấp Premium' : 'Get Premium'}</span>
              </button>
            )}
          </div>

          {/* Flag Switcher placed to the LEFT of About Us */}
          <div className="shrink-0 flex items-center">
            <LanguageSwitcher />
          </div>

          {/* About Us / Về chúng tôi: Fixed slot width with left alignment so the text start position & flag switcher NEVER shift */}
          <div className="w-[102px] lg:w-[112px] flex items-center justify-start shrink-0">
            <Link
              href="#about"
              className="text-gray-300 hover:text-white font-medium text-sm lg:text-[15px] transition-colors relative py-1 group inline-block"
            >
              <span className="relative inline-block text-left whitespace-nowrap">
                {t('common.header.aboutUs')}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-purple to-brand-teal transition-all duration-300 group-hover:w-full" />
              </span>
            </Link>
          </div>

          {/* Take a Test / Làm bài kiểm tra: Fixed width button so width never changes between EN and VI */}
          <div className="w-[180px] lg:w-[196px] flex items-center justify-center shrink-0">
            <button
              onClick={onOpenTest}
              className="w-full h-11 px-4 rounded-full border border-purple-500/50 hover:border-purple-400 text-white font-medium text-sm lg:text-[15px] bg-purple-950/40 hover:bg-purple-900/50 transition-all duration-300 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] active:scale-95 whitespace-nowrap"
            >
              <span>{t('common.header.takeTest')}</span>
            </button>
          </div>
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
            <AnonymousKeyBadge isMobile />
            <LanguageSwitcher isMobile />
          </div>

          {!isPlus && (
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setShowUpgradeModal(true);
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500/20 via-purple-600/30 to-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center justify-center gap-2"
            >
              <Crown className="w-4 h-4 text-amber-400" />
              <span>{locale === 'vi' ? 'Nâng Cấp Premium' : 'Get Premium'}</span>
            </button>
          )}
          
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-gray-200 hover:text-brand-teal py-2"
          >
            {t('common.header.aboutUs')}
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTest();
            }}
            className="block w-full text-left text-base font-medium text-brand-teal py-2"
          >
            {t('common.header.takeTest')}
          </button>
        </div>
      )}

      {/* Reusable Premium Modal */}
      <PremiumUpgradeModal 
        isOpen={showUpgradeModal} 
        onClose={() => setShowUpgradeModal(false)} 
      />
    </header>
  );
}
