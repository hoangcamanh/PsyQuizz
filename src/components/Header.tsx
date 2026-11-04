'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  onOpenAuth?: (mode: 'login' | 'signup') => void;
  onOpenTest: () => void;
}

export default function Header({ onOpenTest }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#080314]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40'
          : 'bg-[#080314]/30 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <Link href="#top" className="flex items-center gap-2 group transition-transform duration-300 hover:scale-[1.02]">
          <div className="relative h-11 w-44 sm:w-48">
            <Image
              src="/logo-white.png"
              alt="PsyQuizz Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Right Navigation Links: Keep ONLY About Us & Take a Test */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          <Link
            href="#about"
            className="text-gray-300 hover:text-white font-medium text-sm lg:text-[15px] transition-colors relative py-1 group"
          >
            <span>About Us</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-purple to-brand-teal transition-all duration-300 group-hover:w-full" />
          </Link>

          <button
            onClick={onOpenTest}
            className="px-5 py-2.5 rounded-full border border-purple-500/50 hover:border-purple-400 text-white font-medium text-sm lg:text-[15px] bg-purple-950/40 hover:bg-purple-900/50 transition-all duration-300 flex items-center gap-2 shadow-[0_0_20px_rgba(168,85,247,0.25)] hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] active:scale-95"
          >
            <span>Take a Test</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
          </button>
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
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-base font-medium text-gray-200 hover:text-brand-teal py-2"
          >
            About Us
          </Link>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenTest();
            }}
            className="block w-full text-left text-base font-medium text-brand-teal py-2"
          >
            Take a Test
          </button>
        </div>
      )}
    </header>
  );
}
