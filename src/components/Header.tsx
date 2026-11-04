'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenTest: () => void;
}

export default function Header({ onOpenAuth, onOpenTest }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#080314]/90 backdrop-blur-xl border-b border-purple-900/30 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Left: Brand Logo (White Wordmark version) */}
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

        {/* Center-Right Biased Navigation Links (Order: About Us, Take a Test) */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10 ml-auto mr-8">
          <Link
            href="#about"
            className="text-gray-300 hover:text-white font-medium text-sm lg:text-[15px] transition-colors relative py-1 group"
          >
            <span>About Us</span>
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-purple to-brand-teal transition-all duration-300 group-hover:w-full" />
          </Link>

          <button
            onClick={onOpenTest}
            className="text-gray-300 hover:text-white font-medium text-sm lg:text-[15px] transition-colors relative py-1 group flex items-center gap-1.5"
          >
            <span>Take a Test</span>
            <span className="w-1.5 h-1.5 rounded-full bg-brand-teal animate-pulse" />
            <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-brand-purple to-brand-teal transition-all duration-300 group-hover:w-full" />
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => onOpenAuth('login')}
            className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition-colors duration-200"
          >
            Login
          </button>

          <button
            onClick={() => onOpenAuth('signup')}
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-semibold rounded-full group bg-gradient-to-r from-brand-purple via-pink-500 to-brand-teal group-hover:from-purple-600 group-hover:to-teal-500 text-white shadow-lg shadow-purple-900/30 hover:shadow-purple-700/50 hover:scale-[1.03] transition-all duration-300 active:scale-95"
          >
            <span className="relative px-5 py-2 transition-all ease-in duration-200 bg-[#0c051f] rounded-full group-hover:bg-opacity-0 flex items-center gap-1.5">
              <span>Let&apos;s start</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => onOpenAuth('signup')}
            className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gradient-to-r from-brand-purple to-brand-teal text-white"
          >
            Start
          </button>
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
            className="block w-full text-left text-base font-medium text-gray-200 hover:text-brand-teal py-2"
          >
            Take a Test
          </button>
          <div className="pt-4 border-t border-purple-900/40 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('login');
              }}
              className="w-full py-2.5 rounded-full border border-purple-500/40 text-sm font-semibold text-gray-200 hover:bg-purple-950/40"
            >
              Login
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAuth('signup');
              }}
              className="w-full py-2.5 rounded-full bg-gradient-to-r from-brand-purple to-brand-teal text-white text-sm font-semibold shadow-lg shadow-purple-900/40"
            >
              Let&apos;s start
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
