'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useTranslation } from '@/i18n/I18nContext';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void;
  onOpenTest: () => void;
  onLogoClick?: () => void;
  logoHref?: string;
}

export default function Header({ onOpenTest, onLogoClick, logoHref = '/' }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useTranslation();

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

        {/* Right Navigation Links: Language Switcher, About Us & Take a Test (fixed-width slots to prevent shift) */}
        <nav className="hidden md:flex items-center gap-5 lg:gap-7">
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
          <LanguageSwitcher isMobile />
          
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
    </header>
  );
}
