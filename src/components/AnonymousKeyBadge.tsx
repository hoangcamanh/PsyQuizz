'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  ShieldCheck, 
  Key, 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  X, 
  RotateCcw,
  ExternalLink,
  Crown,
  User,
  UserCheck,
  Lock,
  ArrowRight,
  Shield,
  Unlink
} from 'lucide-react';
import { useAnonymous } from '@/context/AnonymousContext';
import { useTranslation } from '@/i18n/I18nContext';

export default function AnonymousKeyBadge({ isMobile = false }: { isMobile?: boolean }) {
  const { 
    anonymousKey, 
    isPlus, 
    remainingAiQuestions, 
    maxFreeAiQuestions, 
    accountInfo,
    restoreKey, 
    exportKeyText,
    bindAccount,
    loginWithAccount,
    unlinkAccount
  } = useAnonymous();
  const { locale } = useTranslation();
  const language = locale;

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  const [activeTab, setActiveTab] = useState<'key' | 'account'>('key');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Tab 1: Restore Key state
  const [restoreInput, setRestoreInput] = useState('');
  const [restoreMessage, setRestoreMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Tab 2: Account Binding & Login state
  const [accountSubMode, setAccountSubMode] = useState<'create' | 'login'>('create');
  const [regUsername, setRegUsername] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPasswordConfirm, setRegPasswordConfirm] = useState('');
  const [regMessage, setRegMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Close modal when pressing Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(anonymousKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      const url = `${window.location.origin}/?key=${anonymousKey}`;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleRestore = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restoreInput.trim()) return;

    const ok = restoreKey(restoreInput);
    if (ok) {
      setRestoreMessage({
        type: 'success',
        text: language === 'vi' ? 'Đã khôi phục mã phiên thành công!' : 'Session key restored successfully!'
      });
      setRestoreInput('');
      setTimeout(() => setRestoreMessage(null), 3000);
    } else {
      setRestoreMessage({
        type: 'error',
        text: language === 'vi' ? 'Mã không đúng định dạng (Ví dụ: PQ-XXXX-XXXX)' : 'Invalid key format (e.g. PQ-XXXX-XXXX)'
      });
    }
  };

  const handleBindAccount = (e: React.FormEvent) => {
    e.preventDefault();
    if (regPassword !== regPasswordConfirm) {
      setRegMessage({
        type: 'error',
        text: language === 'vi' ? 'Mật khẩu xác nhận không khớp!' : 'Passwords do not match!'
      });
      return;
    }

    const res = bindAccount(regUsername, regPassword);
    setRegMessage({
      type: res.success ? 'success' : 'error',
      text: res.message
    });

    if (res.success) {
      setRegUsername('');
      setRegPassword('');
      setRegPasswordConfirm('');
      setTimeout(() => setRegMessage(null), 3500);
    }
  };

  const handleLoginAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginWithAccount(loginUsername, loginPassword);
    setLoginMessage({
      type: res.success ? 'success' : 'error',
      text: res.message
    });

    if (res.success) {
      setLoginUsername('');
      setLoginPassword('');
      setTimeout(() => setLoginMessage(null), 3500);
    }
  };

  return (
    <>
      {/* 1. Header Trigger Pill */}
      <button
        onClick={() => setIsOpen(true)}
        className={`group flex items-center gap-2 rounded-full border transition-all duration-300 ${
          isMobile
            ? 'w-full px-4 py-2.5 bg-purple-950/40 border-purple-500/40 text-sm justify-between'
            : 'px-3 py-1.5 bg-[#140b2b]/90 hover:bg-purple-950/90 border-purple-500/30 hover:border-purple-400/60 shadow-sm'
        }`}
        title={language === 'vi' ? 'Xem mã bảo mật ẩn danh & tài khoản' : 'View anonymous identity key & account'}
      >
        <div className="flex items-center gap-1.5">
          {isPlus ? (
            <Crown className="w-3.5 h-3.5 text-amber-400 shrink-0 animate-pulse" />
          ) : accountInfo ? (
            <UserCheck className="w-3.5 h-3.5 text-brand-teal shrink-0" />
          ) : (
            <ShieldCheck className="w-3.5 h-3.5 text-brand-teal shrink-0" />
          )}
          <span className="font-mono text-xs font-semibold text-gray-200 group-hover:text-white">
            {accountInfo ? `@${accountInfo.username}` : anonymousKey}
          </span>
        </div>

        <span 
          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
            isPlus
              ? 'bg-amber-500/15 text-amber-300 border-amber-500/40'
              : 'bg-brand-purple/20 text-purple-300 border-purple-500/30'
          }`}
        >
          {isPlus 
            ? 'PLUS' 
            : `${remainingAiQuestions}/${maxFreeAiQuestions} AI`}
        </span>
      </button>

      {/* 2. Anonymous Key Details & Dual-Auth Modal rendered via Portal to escape parent header stacking context */}
      {isOpen && mounted && createPortal(
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[99999] flex justify-center items-center overflow-y-auto p-4 sm:p-6 py-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div 
            className="w-full max-w-lg my-auto rounded-3xl bg-[#0f0920] border border-purple-500/40 text-white shadow-2xl p-6 sm:p-7 space-y-4 sm:space-y-5 relative max-h-[88vh] overflow-y-auto [scrollbar-width:thin] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button: Prominent, clear, rounded-full with border & hover glow */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label={language === 'vi' ? 'Đóng' : 'Close'}
              className="absolute top-5 right-5 p-2.5 rounded-full text-gray-200 hover:text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all shadow-lg active:scale-95 z-20 flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 pr-12 pt-1">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-600/30 to-brand-teal/20 border border-purple-400/40 text-brand-teal shrink-0">
                <Key className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-white">
                  {language === 'vi' ? 'Bảo Mật & Định Danh Cá Nhân' : 'Identity & Privacy Access'}
                </h3>
                <p className="text-xs text-gray-400">
                  {language === 'vi' ? 'Linh hoạt giữa Khóa Ẩn Danh và Tài Khoản Tự Chọn' : 'Dual-Auth: Anonymous Key or Custom Account'}
                </p>
              </div>
            </div>

            {/* 2-Option Tabs: Khóa Ẩn Danh vs Tài Khoản Cá Nhân */}
            <div className="grid grid-cols-2 p-1 rounded-2xl bg-black/50 border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab('key')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'key'
                    ? 'bg-purple-900/70 text-white border border-purple-400/40 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Key className="w-3.5 h-3.5 text-brand-teal" />
                <span>{language === 'vi' ? 'Khóa Ẩn Danh' : 'Anonymous Key'}</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('account')}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'account'
                    ? 'bg-purple-900/70 text-white border border-purple-400/40 shadow-sm'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <User className="w-3.5 h-3.5 text-purple-300" />
                <span>
                  {accountInfo 
                    ? `@${accountInfo.username}` 
                    : (language === 'vi' ? 'Tạo Tài Khoản' : 'Custom Account')}
                </span>
                {accountInfo && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              </button>
            </div>

            {/* TAB 1: ANONYMOUS KEY CONTENT */}
            {activeTab === 'key' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {/* Privacy Promise Notice */}
                <p className="text-xs text-gray-300 leading-relaxed bg-[#160c30] p-3.5 rounded-2xl border border-purple-500/20">
                  {language === 'vi'
                    ? 'PsyQuizz không bao giờ thu thập Họ tên, Email hay Số điện thoại. Mã khóa dưới đây là định danh mật duy nhất kết nối với lịch sử bài test và gói PsyQuizz Plus của bạn.'
                    : 'PsyQuizz never collects your Name, Email, or Phone number. The secret key below is your unique cryptographic identifier binding all assessment results and Plus subscription perks.'}
                </p>

                {/* Key Display Card */}
                <div className="p-4 rounded-2xl bg-black/60 border border-purple-500/40 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-gray-400">
                    <span>{language === 'vi' ? 'Khóa bảo mật cá nhân' : 'Personal Secret Key'}</span>
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {isPlus ? 'PsyQuizz Plus Active' : `${remainingAiQuestions}/${maxFreeAiQuestions} Free AI Turns`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-teal-300 tracking-wider">
                      {anonymousKey}
                    </span>
                    <button
                      onClick={handleCopyKey}
                      className="px-3 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shrink-0"
                    >
                      {copiedKey ? <Check className="w-3.5 h-3.5 text-emerald-300" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedKey ? (language === 'vi' ? 'Đã sao chép' : 'Copied') : (language === 'vi' ? 'Sao chép' : 'Copy Key')}</span>
                    </button>
                  </div>
                </div>

                {/* Linked Account Callout (if linked) */}
                {accountInfo && (
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span>{language === 'vi' ? 'Đã liên kết với tài khoản:' : 'Linked with account:'} <strong className="text-white">@{accountInfo.username}</strong></span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setActiveTab('account')}
                      className="text-purple-300 hover:text-white underline text-[11px]"
                    >
                      {language === 'vi' ? 'Quản lý' : 'Manage'}
                    </button>
                  </div>
                )}

                {/* Quick Actions (Download file, Magic link) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <button
                    onClick={exportKeyText}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5 text-purple-400" />
                    <span>{language === 'vi' ? 'Tải file khóa (.txt)' : 'Download Key File (.txt)'}</span>
                  </button>

                  <button
                    onClick={handleCopyLink}
                    className="p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-brand-teal" />
                    <span>{copiedLink ? (language === 'vi' ? 'Đã chép link!' : 'Link copied!') : (language === 'vi' ? 'Chép link khôi phục' : 'Copy Recovery Link')}</span>
                  </button>
                </div>

                {/* Restore Old Key Section */}
                <div className="pt-3 border-t border-white/10 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-gray-300 uppercase tracking-wider">
                    <RotateCcw className="w-3.5 h-3.5 text-purple-400" />
                    <span>{language === 'vi' ? 'Đổi máy hoặc khôi phục mã cũ' : 'Switch Device or Restore Old Key'}</span>
                  </div>
                  
                  <form onSubmit={handleRestore} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={restoreInput}
                      onChange={(e) => setRestoreInput(e.target.value)}
                      placeholder="Ví dụ: PQ-88A7-91C2"
                      className="flex-1 bg-black/50 border border-white/15 focus:border-purple-400 rounded-xl px-4 py-2 text-xs text-white placeholder-gray-500 font-mono focus:outline-none transition-all uppercase"
                    />
                    <button
                      type="submit"
                      disabled={!restoreInput.trim()}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition-all disabled:opacity-40"
                    >
                      {language === 'vi' ? 'Khôi phục' : 'Restore'}
                    </button>
                  </form>

                  {restoreMessage && (
                    <p 
                      className={`text-[11px] font-medium ${
                        restoreMessage.type === 'success' ? 'text-emerald-400' : 'text-red-400'
                      }`}
                    >
                      {restoreMessage.text}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: CUSTOM ACCOUNT (USERNAME & PASSWORD) */}
            {activeTab === 'account' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {accountInfo ? (
                  /* ALREADY LINKED VIEW */
                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-purple-950/40 border border-emerald-500/40 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
                          <UserCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider block">
                            {language === 'vi' ? 'Đã liên kết thành công' : 'Successfully Linked'}
                          </span>
                          <h4 className="text-base font-bold text-white">
                            @{accountInfo.username}
                          </h4>
                        </div>
                      </div>

                      <p className="text-xs text-gray-300 leading-relaxed pt-1">
                        {language === 'vi'
                          ? `Khóa bí mật ${anonymousKey} của bạn đã được gắn liền với tài khoản @${accountInfo.username}. Trên bất kỳ thiết bị nào, bạn có thể đăng nhập bằng Tên & Mật khẩu này HOẶC nhập mã ${anonymousKey} để mở khóa toàn bộ hồ sơ.`
                          : `Your secret key ${anonymousKey} is permanently bound to @${accountInfo.username}. You can log in anywhere using this username/password OR by entering key ${anonymousKey}.`}
                      </p>
                    </div>

                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-gray-400">
                      <span>{language === 'vi' ? 'Muốn quay về trạng thái ẩn danh thuần túy?' : 'Return to pure anonymous state?'}</span>
                      <button
                        type="button"
                        onClick={unlinkAccount}
                        className="text-rose-400 hover:text-rose-300 font-semibold underline flex items-center gap-1"
                      >
                        <Unlink className="w-3.5 h-3.5" />
                        <span>{language === 'vi' ? 'Hủy liên kết' : 'Unlink'}</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* NOT LINKED: FORM VIEW */
                  <div className="space-y-3.5">
                    {/* Submode Switcher: Create vs Login */}
                    <div className="flex gap-2 p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
                      <button
                        type="button"
                        onClick={() => {
                          setAccountSubMode('create');
                          setRegMessage(null);
                        }}
                        className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                          accountSubMode === 'create'
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {language === 'vi' ? 'Tạo tài khoản mới' : 'Create New Account'}
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setAccountSubMode('login');
                          setLoginMessage(null);
                        }}
                        className={`flex-1 py-1.5 rounded-lg font-semibold transition-all ${
                          accountSubMode === 'login'
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'text-gray-400 hover:text-white'
                        }`}
                      >
                        {language === 'vi' ? 'Đã có tài khoản' : 'Existing Account'}
                      </button>
                    </div>

                    {accountSubMode === 'create' ? (
                      /* FORM 1: CREATE & BIND */
                      <form onSubmit={handleBindAccount} className="space-y-3">
                        <p className="text-xs text-gray-300 leading-relaxed bg-[#160c30] p-3 rounded-xl border border-purple-500/20">
                          {language === 'vi'
                            ? `Đặt tên đăng nhập & mật khẩu để gắn với mã ${anonymousKey}. Không bắt buộc khai báo Email hay SĐT.`
                            : `Set a username & password to protect key ${anonymousKey}. No Email or Phone required.`}
                        </p>

                        <div className="space-y-2">
                          <input
                            type="text"
                            value={regUsername}
                            onChange={(e) => setRegUsername(e.target.value)}
                            placeholder={language === 'vi' ? 'Tên đăng nhập (ví dụ: minh_tri99)' : 'Username (e.g. alex_psy99)'}
                            required
                            className="w-full bg-black/50 border border-white/15 focus:border-purple-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
                          />

                          <input
                            type="password"
                            value={regPassword}
                            onChange={(e) => setRegPassword(e.target.value)}
                            placeholder={language === 'vi' ? 'Mật khẩu (tối thiểu 6 ký tự)' : 'Password (min 6 characters)'}
                            required
                            className="w-full bg-black/50 border border-white/15 focus:border-purple-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
                          />

                          <input
                            type="password"
                            value={regPasswordConfirm}
                            onChange={(e) => setRegPasswordConfirm(e.target.value)}
                            placeholder={language === 'vi' ? 'Xác nhận lại mật khẩu' : 'Confirm password'}
                            required
                            className="w-full bg-black/50 border border-white/15 focus:border-purple-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                        >
                          <Lock className="w-3.5 h-3.5" />
                          <span>{language === 'vi' ? 'Liên kết tài khoản vào Mã này' : 'Bind Account to this Key'}</span>
                        </button>

                        {regMessage && (
                          <p className={`text-xs ${regMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {regMessage.text}
                          </p>
                        )}
                      </form>
                    ) : (
                      /* FORM 2: LOGIN TO RESTORE KEY */
                      <form onSubmit={handleLoginAccount} className="space-y-3">
                        <p className="text-xs text-gray-300 leading-relaxed bg-[#160c30] p-3 rounded-xl border border-purple-500/20">
                          {language === 'vi'
                            ? 'Đăng nhập bằng tài khoản bạn đã tạo trước đây để kéo mã phiên và toàn bộ dữ liệu về thiết bị này.'
                            : 'Sign in with your previously bound account to restore its anonymous key and benefits to this device.'}
                        </p>

                        <div className="space-y-2">
                          <input
                            type="text"
                            value={loginUsername}
                            onChange={(e) => setLoginUsername(e.target.value)}
                            placeholder={language === 'vi' ? 'Tên đăng nhập đã tạo' : 'Registered username'}
                            required
                            className="w-full bg-black/50 border border-white/15 focus:border-purple-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
                          />

                          <input
                            type="password"
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            placeholder={language === 'vi' ? 'Mật khẩu của bạn' : 'Your password'}
                            required
                            className="w-full bg-black/50 border border-white/15 focus:border-purple-400 rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition-all"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
                        >
                          <UserCheck className="w-3.5 h-3.5" />
                          <span>{language === 'vi' ? 'Đăng nhập & Đồng bộ mã' : 'Sign in & Sync Key'}</span>
                        </button>

                        {loginMessage && (
                          <p className={`text-xs ${loginMessage.type === 'success' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {loginMessage.text}
                          </p>
                        )}
                      </form>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Footer tip & Bottom Close Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/10">
              <span className="text-[11px] text-gray-500 text-center sm:text-left">
                {language === 'vi'
                  ? '🔒 Nhấn ESC hoặc bấm ra ngoài để đóng'
                  : '🔒 Press ESC or click outside to close'}
              </span>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="w-full sm:w-auto px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-semibold transition-all text-center cursor-pointer active:scale-95"
              >
                {language === 'vi' ? 'Đóng' : 'Close'}
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
