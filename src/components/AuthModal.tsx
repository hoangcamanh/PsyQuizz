'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Lock, ArrowRight, Check } from 'lucide-react';
import { useTranslation } from '@/i18n/I18nContext';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: () => void;
}

export default function AuthModal({
  isOpen,
  initialMode,
  onClose,
  onSuccess,
}: AuthModalProps) {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'anonymous' | 'login' | 'signup'>('anonymous');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState('');

  if (!isOpen) return null;

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmittedMessage(
        activeTab === 'anonymous'
          ? t('common.authModal.successAnonymous')
          : t('common.authModal.successAccount')
      );
      setTimeout(() => {
        onSuccess();
        onClose();
        setSubmittedMessage('');
      }, 1200);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#0e0622] border border-purple-800/60 rounded-[32px] p-6 sm:p-8 text-white shadow-2xl shadow-purple-950/80"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-gray-400 hover:text-white bg-purple-950/40 hover:bg-purple-900/60 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Title */}
        <div className="text-center space-y-2 mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-teal-300 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Privacy-First Access</span>
          </div>
          <h3 className="text-2xl font-extrabold text-white">
            {activeTab === 'anonymous'
              ? t('common.authModal.anonymousTitle')
              : activeTab === 'signup'
              ? t('common.authModal.signupTitle')
              : t('common.authModal.loginTitle')}
          </h3>
          <p className="text-xs sm:text-sm text-gray-300">
            {activeTab === 'anonymous'
              ? t('common.authModal.anonymousSubtitle')
              : t('common.authModal.accountSubtitle')}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex p-1 rounded-xl bg-purple-950/60 border border-purple-900/60 mb-6">
          <button
            onClick={() => setActiveTab('anonymous')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'anonymous'
                ? 'bg-gradient-to-r from-brand-purple to-brand-teal text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t('common.authModal.tabAnonymous')}
          </button>
          <button
            onClick={() => setActiveTab('signup')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'signup'
                ? 'bg-gradient-to-r from-brand-purple to-pink-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t('common.authModal.tabSignup')}
          </button>
          <button
            onClick={() => setActiveTab('login')}
            className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-lg transition-all ${
              activeTab === 'login'
                ? 'bg-gradient-to-r from-brand-purple to-pink-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {t('common.authModal.tabLogin')}
          </button>
        </div>

        {submittedMessage ? (
          <div className="p-6 rounded-2xl bg-teal-950/40 border border-teal-500/50 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-teal-200">{submittedMessage}</p>
          </div>
        ) : (
          <form onSubmit={handleAction} className="space-y-4">
            {activeTab === 'anonymous' ? (
              <div className="space-y-4 py-2">
                <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-900/50 space-y-2 text-xs text-gray-300">
                  <div className="flex items-center gap-2 text-brand-teal font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    <span>{t('common.authModal.securityCommitmentTitle')}</span>
                  </div>
                  <ul className="space-y-1 pl-4 list-disc text-gray-300">
                    <li>{t('common.authModal.bullet1')}</li>
                    <li>{t('common.authModal.bullet2')}</li>
                    <li>{t('common.authModal.bullet3')}</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-brand-purple via-pink-600 to-brand-teal text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  {loading ? (
                    <span className="animate-pulse">{t('common.authModal.preparingSession')}</span>
                  ) : (
                    <>
                      <span>{t('common.authModal.btnStartAnonymous')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">{t('common.authModal.emailLabel')}</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-purple-950/40 border border-purple-800/60 focus:border-brand-purple focus:outline-none text-sm text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">{t('common.authModal.passwordLabel')}</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-purple-950/40 border border-purple-800/60 focus:border-brand-purple focus:outline-none text-sm text-white placeholder-gray-500"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-full bg-gradient-to-r from-brand-purple via-pink-600 to-brand-teal text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-purple-900/50 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  {loading ? (
                    <span className="animate-pulse">{t('common.authModal.processing')}</span>
                  ) : (
                    <>
                      <span>{activeTab === 'signup' ? t('common.authModal.btnSignup') : t('common.authModal.btnLogin')}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </form>
        )}

      </div>
    </div>
  );
}
