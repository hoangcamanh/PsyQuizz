'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/i18n/I18nContext';
import { 
  ShieldCheck, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  CreditCard, 
  ShoppingBag, 
  Activity, 
  Settings, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  RefreshCw, 
  ArrowUpRight, 
  LogOut, 
  Lock, 
  Key, 
  QrCode, 
  ExternalLink, 
  Zap, 
  Plus, 
  Filter, 
  Database,
  Building2,
  Sliders,
  Sparkles,
  ChevronRight,
  Eye,
  Check,
  X
} from 'lucide-react';
import { 
  BankTransaction, 
  SubscriberRecord, 
  AffiliateClickRecord, 
  TrafficMetric, 
  BankingGatewayConfig,
  INITIAL_BANK_CONFIG,
  INITIAL_TRANSACTIONS,
  INITIAL_SUBSCRIBERS,
  INITIAL_AFFILIATE_PRODUCTS,
  INITIAL_TRAFFIC_METRICS
} from '@/lib/adminData';
import { 
  getLiveAnalytics, 
  saveLiveAnalytics,
  resetAllSystemTelemetry,
  RealtimeAnalyticsData 
} from '@/lib/realtimeAnalytics';
import { getPricingConfig, savePricingConfig } from '@/config/pricing';

export default function AdminDashboardPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminPin, setAdminPin] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');

  // Language State from global i18n
  const { locale } = useTranslation();
  const adminLang = locale;

  // Active Tab State
  const [activeTab, setActiveTab] = useState<'financial' | 'transactions' | 'subscribers' | 'affiliate' | 'traffic' | 'settings'>('financial');

  // Operational Outflow Costs (Admin editable, default 0 clean slate)
  const [aiTokensCost, setAiTokensCost] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('psyquizz_admin_outflow_ai');
      if (saved !== null) return Number(saved) || 0;
    }
    return 0;
  });

  const [hostingCost, setHostingCost] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('psyquizz_admin_outflow_hosting');
      if (saved !== null) return Number(saved) || 0;
    }
    return 0;
  });

  // Live Telemetry & Persistence State
  const [liveData, setLiveData] = useState<RealtimeAnalyticsData>(() => getLiveAnalytics());
  const [bankConfig, setBankConfig] = useState<BankingGatewayConfig>(INITIAL_BANK_CONFIG);
  const [transactions, setTransactions] = useState<BankTransaction[]>(INITIAL_TRANSACTIONS);
  const [subscribers, setSubscribers] = useState<SubscriberRecord[]>(INITIAL_SUBSCRIBERS);
  const [affiliateProducts, setAffiliateProducts] = useState<AffiliateClickRecord[]>(INITIAL_AFFILIATE_PRODUCTS);
  const [trafficMetrics] = useState<TrafficMetric[]>(INITIAL_TRAFFIC_METRICS);

  // Simulation & Quick Manual Action State
  const [showSimulateModal, setShowSimulateModal] = useState<boolean>(false);
  const [simKey, setSimKey] = useState<string>('PQ-D4HT-CEP9');
  const [simAmount, setSimAmount] = useState<number>(99000);
  const [simGateway, setSimGateway] = useState<'VPBank' | 'MBBank' | 'Vietcombank'>('VPBank');

  // Quick Manual Activation State
  const [manualKeyInput, setManualKeyInput] = useState<string>('');
  const [manualKeyPlan, setManualKeyPlan] = useState<'monthly' | 'yearly' | 'lifetime'>('monthly');

  // Search & Filter States
  const [searchTxn, setSearchTxn] = useState<string>('');
  const [searchSub, setSearchSub] = useState<string>('');
  const [filterTxnStatus, setFilterTxnStatus] = useState<'all' | 'matched' | 'manual_review'>('all');

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Check session on load
  useEffect(() => {
    const session = sessionStorage.getItem('psyquizz_admin_session');
    if (session === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  // Sync with live real-time telemetry from user interactions
  useEffect(() => {
    const sync = () => {
      const data = getLiveAnalytics();
      setLiveData(data);
      if (data.transactions && data.transactions.length > 0) {
        setTransactions((prev) => {
          const ids = new Set(prev.map((t) => t.id));
          const newTxns = (data.transactions as any[]).filter((t) => !ids.has(t.id));
          return [...newTxns, ...prev];
        });
      }
      if (data.subscribers && data.subscribers.length > 0) {
        setSubscribers((prev) => {
          const ids = new Set(prev.map((s) => s.id));
          const newSubs = (data.subscribers as any[]).filter((s) => !ids.has(s.id));
          return [...newSubs, ...prev];
        });
      }
    };
    sync();
    const interval = setInterval(sync, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default master key is 'psyadmin2026' or 'admin123'
    if (adminPin === 'psyadmin2026' || adminPin === 'admin123' || adminPin === 'psyquizz') {
      setIsAuthenticated(true);
      sessionStorage.setItem('psyquizz_admin_session', 'authenticated');
      setLoginError('');
    } else {
      setLoginError('Mật mã quản trị viên không chính xác. (Mặc định: psyadmin2026)');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('psyquizz_admin_session');
  };

  // -------------------------------------------------------------
  // FINANCIAL CALCULATIONS & OPERATIONAL BREAKDOWN
  // -------------------------------------------------------------
  const financialSummary = useMemo(() => {
    const grossInflow = transactions
      .filter((t) => t.status === 'matched')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalAffiliateCommission = affiliateProducts
      .reduce((sum, p) => sum + p.estimatedCommission, 0);

    const totalRevenue = grossInflow + totalAffiliateCommission;

    // Operational Outflows: AI tokens & Hosting editable, Gateway fees calculated automatically (1.5%)
    const bankingGatewayFees = Math.round(grossInflow * 0.015);
    const totalOutflow = aiTokensCost + hostingCost + bankingGatewayFees;

    const netProfit = totalRevenue - totalOutflow;
    const profitMargin = totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0;

    return {
      grossInflow,
      totalAffiliateCommission,
      totalRevenue,
      totalAiTokensCost: aiTokensCost,
      hostingVercelCost: hostingCost,
      bankingGatewayFees,
      totalOutflow,
      netProfit,
      profitMargin
    };
  }, [transactions, affiliateProducts, aiTokensCost, hostingCost]);

  // Dynamic breakdown per premium plan
  const monthlyTxns = useMemo(() => transactions.filter((t) => t.status === 'matched' && t.plan === 'monthly'), [transactions]);
  const yearlyTxns = useMemo(() => transactions.filter((t) => t.status === 'matched' && t.plan === 'yearly'), [transactions]);
  const lifetimeTxns = useMemo(() => transactions.filter((t) => t.status === 'matched' && t.plan === 'lifetime'), [transactions]);

  const monthlyCount = monthlyTxns.length;
  const monthlyAmount = monthlyTxns.reduce((sum, t) => sum + t.amount, 0);

  const yearlyCount = yearlyTxns.length;
  const yearlyAmount = yearlyTxns.reduce((sum, t) => sum + t.amount, 0);

  const lifetimeCount = lifetimeTxns.length;
  const lifetimeAmount = lifetimeTxns.reduce((sum, t) => sum + t.amount, 0);

  // Handle Simulate Bank Webhook Event
  const handleSimulatePayment = () => {
    if (!simKey.trim()) return;

    let plan: 'monthly' | 'yearly' | 'lifetime' = 'monthly';
    if (simAmount >= 699000) plan = 'lifetime';
    else if (simAmount >= 299000) plan = 'yearly';

    const newTxn: BankTransaction = {
      id: `TXN-${Date.now().toString().slice(-4)}`,
      gateway: simGateway,
      accountNumber: bankConfig.accountNumber,
      amount: simAmount,
      description: `${simKey.trim().toUpperCase()} NANG CAP PREMIUM`,
      anonymousKey: simKey.trim().toUpperCase(),
      plan,
      status: 'matched',
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      transactionRef: `FT${Math.floor(1000000000 + Math.random() * 9000000000)}`
    };

    // Update transactions
    setTransactions([newTxn, ...transactions]);

    // Check if subscriber exists or create new
    const existingIndex = subscribers.findIndex((s) => s.anonymousKey === newTxn.anonymousKey);
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + (plan === 'lifetime' ? 36500 : plan === 'yearly' ? 365 : 30));

    if (existingIndex >= 0) {
      const updated = [...subscribers];
      updated[existingIndex] = {
        ...updated[existingIndex],
        status: 'active',
        plan,
        amountPaid: updated[existingIndex].amountPaid + simAmount,
        expiresAt: expireDate.toISOString().split('T')[0]
      };
      setSubscribers(updated);
    } else {
      const newSub: SubscriberRecord = {
        id: `SUB-0${subscribers.length + 1}`,
        anonymousKey: newTxn.anonymousKey,
        plan,
        amountPaid: simAmount,
        registeredAt: new Date().toISOString().split('T')[0],
        expiresAt: expireDate.toISOString().split('T')[0],
        status: 'active',
        aiTurnsUsed: 0,
        paymentMethod: 'vietqr'
      };
      setSubscribers([newSub, ...subscribers]);
    }

    // Persist to local storage if user is testing in same browser
    if (typeof window !== 'undefined') {
      localStorage.setItem(`psyquizz_plus_status_${newTxn.anonymousKey}`, 'true');
    }

    setShowSimulateModal(false);
    showToast(`Đã nhận tiền ${simAmount.toLocaleString()}đ và kích hoạt thành công cho ${newTxn.anonymousKey}!`);
  };

  // Manual Approve Transaction
  const handleApproveManual = (txnId: string, assignedKey: string) => {
    const updated = transactions.map((t) => {
      if (t.id === txnId) {
        return {
          ...t,
          status: 'matched' as const,
          anonymousKey: assignedKey
        };
      }
      return t;
    });
    setTransactions(updated);

    // Also activate subscriber
    const expireDate = new Date();
    expireDate.setDate(expireDate.getDate() + 30);
    const newSub: SubscriberRecord = {
      id: `SUB-0${subscribers.length + 1}`,
      anonymousKey: assignedKey,
      plan: 'monthly',
      amountPaid: 99000,
      registeredAt: new Date().toISOString().split('T')[0],
      expiresAt: expireDate.toISOString().split('T')[0],
      status: 'active',
      aiTurnsUsed: 0,
      paymentMethod: 'manual_admin'
    };
    setSubscribers([newSub, ...subscribers]);

    if (typeof window !== 'undefined') {
      localStorage.setItem(`psyquizz_plus_status_${assignedKey}`, 'true');
    }

    showToast(`Đã duyệt thủ công và kích hoạt Plus cho ${assignedKey}!`);
  };

  // -------------------------------------------------------------
  // VIEW: LOGIN SCREEN IF NOT AUTHENTICATED
  // -------------------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#070311] text-white flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="w-full max-w-md rounded-3xl bg-[#0f0722]/90 border border-purple-500/30 p-8 shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex p-3 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <ShieldCheck className="w-8 h-8 text-brand-teal" />
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">PsyQuizz Master Admin</h1>
            <p className="text-xs text-gray-400">
              Cổng quản trị dòng tiền, thuê bao Premium & đối soát tự động VietQR
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-purple-400" />
                <span>Mật mã Quản trị viên (Master PIN)</span>
              </label>
              <input
                type="password"
                value={adminPin}
                onChange={(e) => setAdminPin(e.target.value)}
                placeholder="Nhập mã truy cập..."
                className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 transition-colors text-sm font-mono"
                autoFocus
              />
              <p className="text-[11px] text-gray-500 font-mono">Gợi ý mặc định: psyadmin2026</p>
            </div>

            {loginError && (
              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-teal-500 hover:from-purple-500 hover:to-teal-400 text-white font-bold text-sm shadow-lg shadow-purple-600/30 transition-all flex items-center justify-center gap-2 active:scale-98"
            >
              <Key className="w-4 h-4" />
              <span>Đăng Nhập Quản Trị</span>
            </button>
          </form>

          <div className="pt-2 text-center border-t border-white/5">
            <Link href="/" className="text-xs text-gray-400 hover:text-white transition-colors">
              ← Quay về Trang chủ PsyQuizz
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // VIEW: MAIN DASHBOARD
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen bg-[#070311] text-gray-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[99999] px-4 py-3 rounded-2xl bg-emerald-500 text-white text-xs font-bold shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header className="sticky top-0 z-40 w-full bg-[#080314]/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/40">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-4">
          {/* Left Side: Logo + Navigation Tabs (1 hàng duy nhất thẳng tắp, không cuộn ngang) */}
          <div className="flex items-center gap-5 sm:gap-6 lg:gap-8 shrink-0">
            <Link href="/" className="flex items-center shrink-0 transition-transform hover:scale-[1.02]" title="PsyQuizz">
              <div className="relative h-9 sm:h-10 w-36 sm:w-40">
                <Image
                  src="/logo-white.png"
                  alt="PsyQuizz Logo"
                  fill
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            {/* Navigation Tabs (Thẳng hàng với các nút bên phải, khoảng cách thoáng vừa đủ, không cuộn) */}
            <nav className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 text-xs lg:text-[13px] font-medium shrink-0">
              {[
                { id: 'financial', labelVi: 'Doanh Thu', labelEn: 'Revenue' },
                { id: 'transactions', labelVi: 'Giao Dịch', labelEn: 'Transactions' },
                { id: 'subscribers', labelVi: 'Tài Khoản', labelEn: 'Accounts' },
                { id: 'affiliate', labelVi: 'Affiliate', labelEn: 'Affiliate' },
                { id: 'traffic', labelVi: 'Lưu Lượng', labelEn: 'Traffic Analytics' },
                { id: 'settings', labelVi: 'Ngân Hàng Thụ Hưởng', labelEn: 'Bank Management' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-1.5 rounded-xl border-b-2 transition-all whitespace-nowrap cursor-pointer flex items-center ${
                    activeTab === tab.id
                      ? 'border-brand-teal text-brand-teal font-bold bg-brand-teal/10 shadow-sm'
                      : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {adminLang === 'vi' ? tab.labelVi : tab.labelEn}
                </button>
              ))}
            </nav>
          </div>

          {/* Right Side: Language Switcher + Admin Account Badge + Logout (Thẳng hàng tuyệt đối với Left Side) */}
          <div className="flex items-center gap-3 sm:gap-3.5 shrink-0 ml-auto">
            {/* Standard LanguageSwitcher Component */}
            <div className="flex items-center">
              <LanguageSwitcher />
            </div>

            {/* Admin Account Badge (Giữ lại @admin) */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-purple-500/40 bg-[#140b2b]/90 text-xs shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-teal shrink-0" />
              <span className="font-mono text-xs font-semibold text-gray-200">
                @admin
              </span>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors cursor-pointer flex items-center justify-center"
              title={adminLang === 'vi' ? 'Đăng xuất' : 'Log out'}
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout Body */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-8">
        {/* ============================================================== */}
        {/* TAB 1: FINANCIAL OVERVIEW & CASHFLOW */}
        {/* ============================================================== */}
        {activeTab === 'financial' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* 4 Primary Financial KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Card 1: Gross Inflow */}
              <div className="p-5 rounded-3xl bg-[#12082b] border border-emerald-500/30 relative overflow-hidden space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-semibold">
                    {adminLang === 'vi' ? 'Doanh Thu Thuần (Inflow)' : 'Gross Inflow'}
                  </span>
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">
                    {financialSummary.grossInflow.toLocaleString()} đ
                  </div>
                  <span className="text-[11px] text-emerald-400 font-mono">
                    {adminLang === 'vi'
                      ? `Từ ${transactions.filter((t) => t.status === 'matched').length} đơn VietQR đã khớp`
                      : `From ${transactions.filter((t) => t.status === 'matched').length} matched VietQR orders`}
                  </span>
                </div>
              </div>

              {/* Card 2: Affiliate Commission */}
              <div className="p-5 rounded-3xl bg-[#12082b] border border-purple-500/30 relative overflow-hidden space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-semibold">
                    {adminLang === 'vi' ? 'Hoa Hồng Affiliate' : 'Affiliate Commission'}
                  </span>
                  <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-purple-300">
                    {financialSummary.totalAffiliateCommission.toLocaleString()} đ
                  </div>
                  <span className="text-[11px] text-purple-400 font-mono">
                    {adminLang === 'vi' ? 'Ước tính từ Shopee/Tiki' : 'Estimated Shopee/Tiki'}
                  </span>
                </div>
              </div>

              {/* Card 3: Outflows / Costs */}
              <div className="p-5 rounded-3xl bg-[#12082b] border border-rose-500/30 relative overflow-hidden space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-semibold">
                    {adminLang === 'vi' ? 'Chi Phí Vận Hành (Outflow)' : 'Operational Costs'}
                  </span>
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
                    <TrendingDown className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-white">
                    {financialSummary.totalOutflow.toLocaleString()} đ
                  </div>
                  <span className="text-[11px] text-rose-400 font-mono">
                    {adminLang === 'vi' ? 'AI API + Server + Phí cổng' : 'AI API + Server + Gateway fee'}
                  </span>
                </div>
              </div>

              {/* Card 4: Net Profit */}
              <div className="p-5 rounded-3xl bg-[#12082b] border border-teal-500/30 relative overflow-hidden space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400 font-semibold">
                    {adminLang === 'vi' ? 'Lợi Nhuận Ròng (Net Profit)' : 'Net Profit'}
                  </span>
                  <div className="p-2 rounded-xl bg-teal-500/20 text-teal-300">
                    <DollarSign className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-teal-300">
                    {financialSummary.netProfit.toLocaleString()} đ
                  </div>
                  <span className="text-[11px] text-teal-400 font-mono">
                    {adminLang === 'vi'
                      ? `Biên lợi nhuận: ${financialSummary.profitMargin}%`
                      : `Profit margin: ${financialSummary.profitMargin}%`}
                  </span>
                </div>
              </div>
            </div>

            {/* Inflow vs Outflow Detailed Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left: Dòng Tiền Vào (Inflows) */}
              <div className="p-6 rounded-3xl bg-[#0e0722] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span>{adminLang === 'vi' ? 'Dòng Tiền Vào Chi Tiết (Inflows)' : 'Detailed Inflows'}</span>
                  </h3>
                  <span className="text-xs font-mono text-emerald-400 font-bold">
                    +{financialSummary.totalRevenue.toLocaleString()} đ
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">
                        {adminLang === 'vi' ? `Gói Premium Tháng (${(bankConfig.monthlyPrice / 1000).toFixed(0)}k)` : 'Monthly Premium Plan'}
                      </span>
                      <span className="text-gray-400 text-[11px]">
                        {monthlyCount} {adminLang === 'vi' ? 'giao dịch' : 'transactions'}
                      </span>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold">{monthlyAmount.toLocaleString()} đ</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">
                        {adminLang === 'vi' ? `Gói Premium 1 Năm (${(bankConfig.yearlyPrice / 1000).toFixed(0)}k)` : '1-Year Premium Plan'}
                      </span>
                      <span className="text-gray-400 text-[11px]">
                        {yearlyCount} {adminLang === 'vi' ? 'giao dịch' : 'transactions'}
                      </span>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold">{yearlyAmount.toLocaleString()} đ</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">
                        {adminLang === 'vi' ? `Gói Premium Trọn Đời Lifetime (${(bankConfig.lifetimePrice / 1000).toFixed(0)}k)` : 'Lifetime Premium Plan'}
                      </span>
                      <span className="text-gray-400 text-[11px]">
                        {lifetimeCount} {adminLang === 'vi' ? 'giao dịch' : 'transactions'}
                      </span>
                    </div>
                    <span className="font-mono text-emerald-400 font-bold">{lifetimeAmount.toLocaleString()} đ</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">
                        {adminLang === 'vi' ? 'Hoa Hồng Tiếp Thị Liên Kết (Affiliate)' : 'Affiliate Commissions'}
                      </span>
                      <span className="text-gray-400 text-[11px]">Shopee, Tiki, Lazada</span>
                    </div>
                    <span className="font-mono text-purple-400 font-bold">{financialSummary.totalAffiliateCommission.toLocaleString()} đ</span>
                  </div>
                </div>
              </div>

              {/* Right: Dòng Tiền Ra (Outflows / Costs - Admin can edit manually) */}
              <div className="p-6 rounded-3xl bg-[#0e0722] border border-white/10 space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                      <span>{adminLang === 'vi' ? 'Chi Phí Vận Hành Dự Tính (Outflows)' : 'Operational Outflows (Costs)'}</span>
                    </h3>
                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {adminLang === 'vi' ? 'Admin có thể tự điền các khoản chi phí bên dưới' : 'Admin can manually adjust operating cost inputs below'}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-rose-400 font-bold">
                    -{financialSummary.totalOutflow.toLocaleString()} đ
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  {/* Editable Outflow 1: AI API Tokens */}
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <span className="font-bold text-white block">Gemini / OpenAI API Token</span>
                      <span className="text-gray-400 text-[11px]">
                        {adminLang === 'vi' ? 'Chi phí gọi AI phân tích học thuật (tự điền)' : 'AI API Token consumption (manual input)'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <input
                        type="number"
                        min="0"
                        step="10000"
                        value={aiTokensCost}
                        onChange={(e) => {
                          const val = Math.max(0, Number(e.target.value));
                          setAiTokensCost(val);
                          if (typeof window !== 'undefined') {
                            localStorage.setItem('psyquizz_admin_outflow_ai', String(val));
                          }
                        }}
                        className="w-28 px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-right font-mono text-rose-300 font-bold text-xs focus:outline-none focus:border-purple-400"
                      />
                      <span className="text-gray-400 font-mono">đ</span>
                    </div>
                  </div>

                  {/* Editable Outflow 2: Cloud Hosting & Domain */}
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between gap-4">
                    <div className="flex-1">
                      <span className="font-bold text-white block">
                        {adminLang === 'vi' ? 'Hạ Tầng Cloud & Domain (Vercel)' : 'Cloud Hosting & Domain (Vercel)'}
                      </span>
                      <span className="text-gray-400 text-[11px]">
                        {adminLang === 'vi' ? 'Băng thông & Serverless (tự điền)' : 'Server & bandwidth (manual input)'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <input
                        type="number"
                        min="0"
                        step="10000"
                        value={hostingCost}
                        onChange={(e) => {
                          const val = Math.max(0, Number(e.target.value));
                          setHostingCost(val);
                          if (typeof window !== 'undefined') {
                            localStorage.setItem('psyquizz_admin_outflow_hosting', String(val));
                          }
                        }}
                        className="w-28 px-2.5 py-1 rounded-lg bg-black/50 border border-white/10 text-right font-mono text-rose-300 font-bold text-xs focus:outline-none focus:border-purple-400"
                      />
                      <span className="text-gray-400 font-mono">đ</span>
                    </div>
                  </div>

                  {/* Formula-calculated Outflow 3: Banking Gateway Fees */}
                  <div className="p-3 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">
                        {adminLang === 'vi' ? 'Phí Cổng Đối Soát Ngân Hàng (1.5%)' : 'Bank Gateway Reconciliation Fee (1.5%)'}
                      </span>
                      <span className="text-gray-400 text-[11px]">
                        {adminLang === 'vi' ? 'Tự động tính: 1.5% x Doanh thu thuần' : 'Auto formula: 1.5% x Gross Inflow'}
                      </span>
                    </div>
                    <span className="font-mono text-rose-400 font-bold">
                      {financialSummary.bankingGatewayFees.toLocaleString()} đ
                    </span>
                  </div>

                  {/* Result: Free Cash Flow */}
                  <div className="p-3 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-teal-300 block">
                        {adminLang === 'vi' ? 'Dòng Tiền Tự Do (Free Cash Flow)' : 'Free Cash Flow / Net Profit'}
                      </span>
                      <span className="text-gray-400 text-[11px]">
                        {adminLang === 'vi' ? 'Doanh Thu - Tổng Chi Phí' : 'Total Revenue - Outflows'}
                      </span>
                    </div>
                    <span className="font-mono text-teal-300 font-extrabold text-sm">
                      {financialSummary.netProfit.toLocaleString()} đ
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 2: BANK TRANSACTIONS & VIETQR RECONCILIATION */}
        {/* ============================================================== */}
        {activeTab === 'transactions' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0e0722] p-4 rounded-3xl border border-white/10">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTxn}
                  onChange={(e) => setSearchTxn(e.target.value)}
                  placeholder={
                    adminLang === 'vi'
                      ? 'Tìm theo mã giao dịch, số tiền, nội dung CK, khóa PQ-...'
                      : 'Search by transaction ID, amount, memo, PQ- key...'
                  }
                  className="w-full bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <span className="text-gray-400">{adminLang === 'vi' ? 'Trạng thái:' : 'Status:'}</span>
                <select
                  value={filterTxnStatus}
                  onChange={(e) => setFilterTxnStatus(e.target.value as any)}
                  className="bg-black/40 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none"
                >
                  <option value="all">
                    {adminLang === 'vi' ? `Tất cả (${transactions.length})` : `All (${transactions.length})`}
                  </option>
                  <option value="matched">
                    {adminLang === 'vi' ? 'Khớp tự động' : 'Auto Matched'}
                  </option>
                  <option value="manual_review">
                    {adminLang === 'vi' ? 'Cần đối soát tay' : 'Manual Review'}
                  </option>
                </select>
              </div>
            </div>

            {/* Transactions Table */}
            <div className="rounded-3xl bg-[#0e0722] border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-gray-400 font-mono">
                    <tr>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'MÃ ĐƠN / REF' : 'ORDER ID / REF'}</th>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'NGÂN HÀNG' : 'BANK'}</th>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'SỐ TIỀN' : 'AMOUNT'}</th>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'NỘI DUNG CHUYỂN KHOẢN' : 'TRANSFER MEMO'}</th>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'KHÓA ẨN DANH NHẬN' : 'RECIPIENT ANONYMOUS KEY'}</th>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'GÓI' : 'PLAN'}</th>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'TRẠNG THÁI' : 'STATUS'}</th>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'THỜI GIAN' : 'TIMESTAMP'}</th>
                      <th className="py-3.5 px-4 text-right">{adminLang === 'vi' ? 'THAO TÁC' : 'ACTION'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {transactions
                      .filter((t) => {
                        if (filterTxnStatus !== 'all' && t.status !== filterTxnStatus) return false;
                        if (!searchTxn.trim()) return true;
                        const s = searchTxn.toLowerCase();
                        return (
                          t.id.toLowerCase().includes(s) ||
                          t.description.toLowerCase().includes(s) ||
                          t.anonymousKey.toLowerCase().includes(s) ||
                          t.transactionRef.toLowerCase().includes(s)
                        );
                      })
                      .map((txn) => (
                        <tr key={txn.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-white">
                            <div>{txn.id}</div>
                            <span className="text-[10px] text-gray-500 font-normal">{txn.transactionRef}</span>
                          </td>
                          <td className="py-3.5 px-4 font-semibold text-purple-300">
                            {txn.gateway}
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">
                            {txn.amount.toLocaleString()} đ
                          </td>
                          <td className="py-3.5 px-4 font-mono text-gray-300 max-w-xs truncate">
                            {txn.description}
                          </td>
                          <td className="py-3.5 px-4 font-mono">
                            {txn.anonymousKey !== 'UNKNOWN' ? (
                              <span className="px-2 py-0.5 rounded-lg bg-purple-500/20 text-purple-200 border border-purple-500/30">
                                {txn.anonymousKey}
                              </span>
                            ) : (
                              <span className="text-rose-400 font-semibold">
                                {adminLang === 'vi' ? 'Chưa rõ mã' : 'Unknown Key'}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="capitalize font-semibold text-gray-300">
                              {txn.plan === 'lifetime'
                                ? (adminLang === 'vi' ? 'Trọn đời' : 'Lifetime')
                                : txn.plan === 'yearly'
                                ? (adminLang === 'vi' ? '1 Năm' : '1 Year')
                                : (adminLang === 'vi' ? '1 Tháng' : '1 Month')}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            {txn.status === 'matched' ? (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>{adminLang === 'vi' ? 'Khớp tự động' : 'Auto Matched'}</span>
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[11px] font-bold">
                                <AlertCircle className="w-3 h-3" />
                                <span>{adminLang === 'vi' ? 'Cần đối soát' : 'Manual Review'}</span>
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-gray-400 font-mono text-[11px]">
                            {txn.timestamp}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            {txn.status === 'manual_review' && (
                              <button
                                type="button"
                                onClick={() => {
                                  const key = prompt(
                                    adminLang === 'vi'
                                      ? 'Nhập mã Anonymous Key (PQ-XXXX-XXXX) để gán cho giao dịch này:'
                                      : 'Enter Anonymous Key (PQ-XXXX-XXXX) for this transaction:',
                                    'PQ-D4HT-CEP9'
                                  );
                                  if (key) handleApproveManual(txn.id, key.trim().toUpperCase());
                                }}
                                className="px-3 py-1 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs"
                              >
                                {adminLang === 'vi' ? 'Duyệt tay' : 'Approve'}
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 3: SUBSCRIBERS & ANONYMOUS KEYS REGISTRY */}
        {/* ============================================================== */}
        {activeTab === 'subscribers' && (
          <div className="space-y-5 animate-in fade-in duration-200">
            {/* Quick Manual Grant Bar */}
            <div className="p-4 rounded-3xl bg-[#0e0722] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <Key className="w-4 h-4 text-purple-400" />
                <input
                  type="text"
                  value={manualKeyInput}
                  onChange={(e) => setManualKeyInput(e.target.value)}
                  placeholder={
                    adminLang === 'vi'
                      ? 'Kích hoạt thủ công: Nhập mã PQ-XXXX-XXXX...'
                      : 'Manual activation: Enter PQ-XXXX-XXXX...'
                  }
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 font-mono focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={manualKeyPlan}
                  onChange={(e) => setManualKeyPlan(e.target.value as any)}
                  className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                >
                  <option value="monthly">{adminLang === 'vi' ? 'Gói 1 Tháng' : 'Monthly Plan'}</option>
                  <option value="yearly">{adminLang === 'vi' ? 'Gói 1 Năm' : 'Yearly Plan'}</option>
                  <option value="lifetime">{adminLang === 'vi' ? 'Trọn Đời' : 'Lifetime'}</option>
                </select>

                <button
                  type="button"
                  onClick={() => {
                    if (!manualKeyInput.trim()) return;
                    const key = manualKeyInput.trim().toUpperCase();
                    const expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + (manualKeyPlan === 'lifetime' ? 36500 : manualKeyPlan === 'yearly' ? 365 : 30));
                    
                    const newSub: SubscriberRecord = {
                      id: `SUB-0${subscribers.length + 1}`,
                      anonymousKey: key,
                      plan: manualKeyPlan,
                      amountPaid: 0,
                      registeredAt: new Date().toISOString().split('T')[0],
                      expiresAt: expireDate.toISOString().split('T')[0],
                      status: 'active',
                      aiTurnsUsed: 0,
                      paymentMethod: 'manual_admin'
                    };
                    setSubscribers([newSub, ...subscribers]);
                    if (typeof window !== 'undefined') {
                      localStorage.setItem(`psyquizz_plus_status_${key}`, 'true');
                    }
                    setManualKeyInput('');
                    showToast(
                      adminLang === 'vi'
                        ? `Đã kích hoạt Plus gói ${manualKeyPlan} cho ${key}!`
                        : `Activated Plus ${manualKeyPlan} plan for ${key}!`
                    );
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>{adminLang === 'vi' ? 'Kích Hoạt Ngay' : 'Activate Now'}</span>
                </button>
              </div>
            </div>

            {/* Subscribers Table */}
            <div className="rounded-3xl bg-[#0e0722] border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-gray-400 font-mono">
                    <tr>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'KHÓA ẨN DANH (KEY)' : 'ANONYMOUS KEY'}</th>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'TÀI KHOẢN LIÊN KẾT' : 'LINKED USER'}</th>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'GÓI' : 'PLAN'}</th>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'SỐ LƯỢT AI ĐÃ HỎI' : 'AI QUERIES USED'}</th>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'NGÀY ĐĂNG KÝ' : 'REGISTERED DATE'}</th>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'HẠN DÙNG' : 'EXPIRATION'}</th>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'TRẠNG THÁI' : 'STATUS'}</th>
                      <th className="py-3.5 px-4 text-right">{adminLang === 'vi' ? 'THAO TÁC' : 'ACTION'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {subscribers
                      .filter((s) => {
                        if (!searchSub.trim()) return true;
                        const q = searchSub.toLowerCase();
                        return (
                          s.anonymousKey.toLowerCase().includes(q) ||
                          (s.username && s.username.toLowerCase().includes(q))
                        );
                      })
                      .map((sub) => (
                        <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                          <td className="py-3.5 px-4 font-mono font-bold text-purple-300">
                            {sub.anonymousKey}
                          </td>
                          <td className="py-3.5 px-4 text-gray-300">
                            {sub.username ? (
                              <span className="font-semibold text-white">@{sub.username}</span>
                            ) : (
                              <span className="text-gray-500 italic">
                                {adminLang === 'vi' ? 'Chưa liên kết' : 'Not linked'}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full bg-white/10 font-bold capitalize">
                              {sub.plan}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-teal-300">
                            {sub.aiTurnsUsed} {adminLang === 'vi' ? 'lượt' : 'queries'}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-gray-400 text-[11px]">
                            {sub.registeredAt}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-gray-400 text-[11px]">
                            {sub.expiresAt}
                          </td>
                          <td className="py-3.5 px-4">
                            {sub.status === 'active' ? (
                              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold text-[11px]">
                                Active
                              </span>
                            ) : (
                              <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-[11px]">
                                Expired
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-2">
                            <button
                              type="button"
                              onClick={() => {
                                const updated = subscribers.map((item) => {
                                  if (item.id === sub.id) {
                                    return {
                                      ...item,
                                      status: item.status === 'active' ? ('expired' as const) : ('active' as const)
                                    };
                                  }
                                  return item;
                                });
                                setSubscribers(updated);
                                showToast(
                                  adminLang === 'vi'
                                    ? `Đã thay đổi trạng thái của ${sub.anonymousKey}!`
                                    : `Updated status for ${sub.anonymousKey}!`
                                );
                              }}
                              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white text-[11px] cursor-pointer"
                            >
                              {sub.status === 'active'
                                ? (adminLang === 'vi' ? 'Tạm khóa' : 'Suspend')
                                : (adminLang === 'vi' ? 'Kích hoạt lại' : 'Reactivate')}
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 4: AFFILIATE COMMISSION TRACKING */}
        {/* ============================================================== */}
        {activeTab === 'affiliate' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="p-5 rounded-3xl bg-gradient-to-r from-purple-950/60 via-[#160a2b] to-[#0d071f] border border-purple-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-bold text-white">
                  {adminLang === 'vi'
                    ? 'Doanh Số Tiếp Thị Liên Kết (Affiliate Revenue)'
                    : 'Affiliate Revenue Performance'}
                </h3>
                <p className="text-xs text-gray-400">
                  {adminLang === 'vi'
                    ? 'Hệ thống ghi nhận lượt chuyển đổi từ các sản phẩm gợi ý tại Khối 6 (Trà thảo mộc, Đồng hồ ADHD, Nến thơm, Sách tâm lý).'
                    : 'Conversion tracking for recommended physical products from Block 6 (Herbal tea, ADHD timer, scented candles, psychology books).'}
                </p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-400 block font-mono">
                  {adminLang === 'vi' ? 'Tổng hoa hồng ước tính:' : 'Estimated Total Commission:'}
                </span>
                <span className="text-2xl font-extrabold text-brand-teal font-mono">
                  {financialSummary.totalAffiliateCommission.toLocaleString()} đ
                </span>
              </div>
            </div>

            {/* Affiliate Products Table */}
            <div className="rounded-3xl bg-[#0e0722] border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 border-b border-white/10 text-gray-400 font-mono">
                    <tr>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'TÊN SẢN PHẨM TIẾP THỊ' : 'AFFILIATE PRODUCT'}</th>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'DANH MỤC' : 'CATEGORY'}</th>
                      <th className="py-3.5 px-4">{adminLang === 'vi' ? 'SÀN THƯƠNG MẠI' : 'PLATFORM'}</th>
                      <th className="py-3.5 px-4 text-center">{adminLang === 'vi' ? 'LƯỢT CLICKS' : 'CLICKS'}</th>
                      <th className="py-3.5 px-4 text-center">{adminLang === 'vi' ? 'ĐƠN HÀNG ƯỚC TÍNH' : 'EST. ORDERS'}</th>
                      <th className="py-3.5 px-4 text-right">{adminLang === 'vi' ? 'TỔNG GMV' : 'TOTAL GMV'}</th>
                      <th className="py-3.5 px-4 text-right">{adminLang === 'vi' ? 'HOA HỒNG NHẬN (8-10%)' : 'COMMISSION (8-10%)'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {affiliateProducts.map((prod) => (
                      <tr key={prod.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3.5 px-4 font-bold text-white">
                          {prod.productName}
                        </td>
                        <td className="py-3.5 px-4 text-gray-300">
                          {prod.category}
                        </td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            prod.retailer === 'Shopee' ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30' : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                          }`}>
                            {prod.retailer}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-purple-300">
                          {prod.clicks}
                        </td>
                        <td className="py-3.5 px-4 text-center font-mono font-bold text-emerald-400">
                          {prod.estimatedOrders}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono text-gray-300">
                          {prod.estimatedGmv.toLocaleString()} đ
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono font-extrabold text-teal-300">
                          +{prod.estimatedCommission.toLocaleString()} đ
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 5: TRAFFIC & CONVERSION FUNNEL (REAL-TIME LIVE DATA) */}
        {/* ============================================================== */}
        {activeTab === 'traffic' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Conversion Funnel Visualization */}
            <div className="p-6 rounded-3xl bg-[#0e0722] border border-white/10 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-white">
                    {adminLang === 'vi' ? 'Phễu Chuyển Đổi Người Dùng (Live Telemetry)' : 'Live Conversion Funnel (Real Telemetry)'}
                  </h3>
                  <p className="text-xs text-gray-400">
                    {adminLang === 'vi'
                      ? 'Dữ liệu đo lường thực tế từ các phiên truy cập và hoàn thành test của người dùng trên web'
                      : 'Live measured metrics from user sessions and test completion on the platform'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const fresh = getLiveAnalytics();
                    setLiveData(fresh);
                    showToast(adminLang === 'vi' ? 'Đã làm mới dữ liệu telemetry thời gian thực!' : 'Telemetry refreshed in real-time!');
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-semibold transition-all flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{adminLang === 'vi' ? 'Làm Mới Số Liệu' : 'Refresh Telemetry'}</span>
                </button>
              </div>

              {(() => {
                const livePageviews = liveData.pageviews || 1;
                const liveUnique = liveData.uniqueVisitors || 1;
                const liveDass = liveData.testsCompleted['dass-21'] || 0;
                const liveAdhd = liveData.testsCompleted['adhd'] || 0;
                const liveEysenck = liveData.testsCompleted['eysenck'] || 0;
                const liveBfi = liveData.testsCompleted['bfi-44'] || 0;
                const totalTests = liveDass + liveAdhd + liveEysenck + liveBfi;
                const paidCount = transactions.filter((t) => t.status === 'matched').length;

                return (
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2 text-center">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-mono">
                        {adminLang === 'vi' ? '1. Lượt Xem Trang' : '1. Pageviews'}
                      </span>
                      <span className="text-xl font-extrabold text-white">{livePageviews.toLocaleString()}</span>
                      <span className="text-[10px] text-gray-500 block">{liveUnique.toLocaleString()} unique visitors</span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-mono">
                        {adminLang === 'vi' ? '2. Bắt Đầu Làm Test' : '2. Tests Started'}
                      </span>
                      <span className="text-xl font-extrabold text-purple-300">
                        {Math.max(totalTests, Math.round(livePageviews * 0.75)).toLocaleString()}
                      </span>
                      <span className="text-[10px] text-purple-400 block">
                        {Math.min(100, Math.round((Math.max(totalTests, livePageviews * 0.75) / livePageviews) * 100))}% rate
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-mono">
                        {adminLang === 'vi' ? '3. Hoàn Thành Bài Test' : '3. Tests Completed'}
                      </span>
                      <span className="text-xl font-extrabold text-teal-300">{totalTests.toLocaleString()}</span>
                      <span className="text-[10px] text-teal-400 block">
                        {adminLang === 'vi' ? '4 bài chuẩn hóa' : '4 Standardized Tests'}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-1">
                      <span className="text-[10px] text-gray-400 uppercase tracking-wider block font-mono">
                        {adminLang === 'vi' ? '4. Hỏi Đáp AI RAG' : '4. AI Queries'}
                      </span>
                      <span className="text-xl font-extrabold text-amber-300">
                        {liveData.totalAiQuestionsAsked.toLocaleString()}
                      </span>
                      <span className="text-[10px] text-amber-400 block">
                        {adminLang === 'vi' ? 'lượt tương tác' : 'interactions'}
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 space-y-1">
                      <span className="text-[10px] text-emerald-300 uppercase tracking-wider block font-mono">
                        {adminLang === 'vi' ? '5. Chuyển Khoản Xong' : '5. Paid Upgrades'}
                      </span>
                      <span className="text-xl font-extrabold text-emerald-300">{paidCount}</span>
                      <span className="text-[10px] text-emerald-400 block">VPBank Napas247</span>
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Test Popularity Breakdown */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {(() => {
                const liveDass = liveData.testsCompleted['dass-21'] || 0;
                const liveAdhd = liveData.testsCompleted['adhd'] || 0;
                const liveEysenck = liveData.testsCompleted['eysenck'] || 0;
                const liveBfi = liveData.testsCompleted['bfi-44'] || 0;
                const totalTests = Math.max(1, liveDass + liveAdhd + liveEysenck + liveBfi);

                const pDass = ((liveDass / totalTests) * 100).toFixed(1);
                const pAdhd = ((liveAdhd / totalTests) * 100).toFixed(1);
                const pEysenck = ((liveEysenck / totalTests) * 100).toFixed(1);
                const pBfi = ((liveBfi / totalTests) * 100).toFixed(1);

                return (
                  <div className="p-6 rounded-3xl bg-[#0e0722] border border-white/10 space-y-3">
                    <h4 className="text-sm font-bold text-white">
                      {adminLang === 'vi' ? 'Thống Kê 4 Bài Trắc Nghiệm Tâm Lý Chuẩn Hóa' : 'Psychological Assessment Distribution'}
                    </h4>
                    <div className="space-y-3 text-xs pt-1">
                      <div>
                        <div className="flex justify-between font-semibold pb-1">
                          <span>
                            {adminLang === 'vi'
                              ? '1. Thang đo DASS-21 (Trầm cảm, Lo âu, Căng thẳng)'
                              : '1. DASS-21 Scale (Depression, Anxiety, Stress)'}
                          </span>
                          <span className="font-mono text-purple-300">
                            {liveDass} {adminLang === 'vi' ? 'lượt' : 'takes'} ({pDass}%)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-purple-500 rounded-full" style={{ width: `${pDass}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-semibold pb-1">
                          <span>
                            {adminLang === 'vi'
                              ? '2. Sàng lọc ADHD Người Lớn (ASRS v1.1)'
                              : '2. Adult ADHD Screener (ASRS v1.1)'}
                          </span>
                          <span className="font-mono text-cyan-300">
                            {liveAdhd} {adminLang === 'vi' ? 'lượt' : 'takes'} ({pAdhd}%)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-cyan-500 rounded-full" style={{ width: `${pAdhd}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-semibold pb-1">
                          <span>
                            {adminLang === 'vi'
                              ? '3. Khí chất Sinh học Eysenck (EPI-57)'
                              : '3. Eysenck Biological Temperament (EPI-57)'}
                          </span>
                          <span className="font-mono text-amber-300">
                            {liveEysenck} {adminLang === 'vi' ? 'lượt' : 'takes'} ({pEysenck}%)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-amber-500 rounded-full" style={{ width: `${pEysenck}%` }} />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-semibold pb-1">
                          <span>
                            {adminLang === 'vi'
                              ? '4. Năm Yếu Tố Nhân Cách Big Five (BFI-44)'
                              : '4. Big Five Personality Traits (BFI-44)'}
                          </span>
                          <span className="font-mono text-teal-300">
                            {liveBfi} {adminLang === 'vi' ? 'lượt' : 'takes'} ({pBfi}%)
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                          <div className="h-full bg-teal-500 rounded-full" style={{ width: `${pBfi}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              <div className="p-6 rounded-3xl bg-[#0e0722] border border-white/10 space-y-3">
                <h4 className="text-sm font-bold text-white">
                  {adminLang === 'vi' ? 'Chỉ Số Tương Tác Nghiên Cứu & Affiliate' : 'Interaction & Affiliate Metrics'}
                </h4>
                <div className="space-y-3 text-xs pt-1">
                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">
                        {adminLang === 'vi' ? 'Tổng câu hỏi AI đã phục vụ' : 'Total AI Questions Served'}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {adminLang === 'vi' ? 'Bao gồm Free Turns và Plus Unlimited' : 'Free and Plus unlimited queries'}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-lg text-teal-300">
                      {liveData.totalAiQuestionsAsked.toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">
                        {adminLang === 'vi' ? 'Tổng lượt click sản phẩm Affiliate' : 'Affiliate Product Clicks'}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {adminLang === 'vi' ? 'Click gợi ý trà thảo mộc, nến, sách tại Khối 6' : 'Safe Next-Step sensory & mindfulness items'}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-lg text-purple-300">
                      {Object.values(liveData.affiliateClicks).reduce((a, b) => a + b, 0).toLocaleString()}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-white block">
                        {adminLang === 'vi' ? 'Khách truy cập độc nhất (Unique Visitors)' : 'Unique Visitors'}
                      </span>
                      <span className="text-[11px] text-gray-400">
                        {adminLang === 'vi' ? 'Phân biệt theo phiên trình duyệt' : 'Deduplicated browser sessions'}
                      </span>
                    </div>
                    <span className="font-mono font-bold text-lg text-amber-300">
                      {liveData.uniqueVisitors.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* TAB 6: GATEWAY SETTINGS & BANK CONFIG */}
        {/* ============================================================== */}
        {activeTab === 'settings' && (
          <div className="space-y-6 w-full animate-in fade-in duration-200">
            {/* Header Title & Subtitle */}
            <div className="p-6 rounded-3xl bg-[#0e0722] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2.5">
                  <Building2 className="w-5 h-5 text-teal-300" />
                  <span>
                    {adminLang === 'vi'
                      ? 'Cài Đặt Ngân Hàng Thụ Hưởng'
                      : 'Receiving Bank Management'}
                  </span>
                </h3>
                <p className="text-xs text-gray-400 mt-1">
                  {adminLang === 'vi'
                    ? 'Tài khoản thụ hưởng nhận tiền khi khách hàng nâng cấp gói PsyQuizz Plus qua VietQR Napas247.'
                    : 'Recipient account for automated transfers when users upgrade to PsyQuizz Plus via VietQR Napas247.'}
                </p>
              </div>
            </div>

            {/* Balanced Grid: 2 Equal / Proportionate Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Left Column: QR Code & Bank Identification Card */}
              <div className="lg:col-span-5 rounded-3xl bg-[#0e0722] border border-white/10 p-6 flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-full flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-300 font-mono">
                    {adminLang === 'vi' ? 'Mã QR VPBank' : 'VPBank QR Code'}
                  </span>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>
                      {adminLang === 'vi'
                        ? 'Mã QR Đã Kích Hoạt Sẵn Sàng Nhận Tiền'
                        : 'QR Code Activated & Ready for Payments'}
                    </span>
                  </div>
                </div>

                {/* QR Image */}
                <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-2xl bg-white p-3 border-2 border-purple-400/80 shadow-2xl shadow-purple-500/20 overflow-hidden flex items-center justify-center transition-transform hover:scale-102">
                  <img src="/qr-vpbank-crop.jpg" alt="VPBank QR Code" className="w-full h-full object-contain" />
                </div>

                {/* Beneficiary Header Text */}
                <div className="space-y-1.5 w-full">
                  <p className="text-base sm:text-lg font-mono font-extrabold text-white tracking-wide">
                    VPBank • 39112082003 • LE HOANG ANH
                  </p>
                  <p className="text-xs text-gray-400 leading-relaxed max-w-sm mx-auto">
                    {adminLang === 'vi'
                      ? 'Khách hàng quét mã này trên ứng dụng ngân hàng bất kỳ sẽ tự động nhận diện đúng số tài khoản, tên chủ thụ hưởng LE HOANG ANH và cú pháp chuyển khoản.'
                      : 'Scanning this code auto-populates exact account number, beneficiary LE HOANG ANH, and transfer memo.'}
                  </p>
                </div>
              </div>

              {/* Right Column: Bank Details & Pricing Configuration */}
              <div className="lg:col-span-7 rounded-3xl bg-[#0e0722] border border-white/10 p-6 flex flex-col justify-between space-y-6">
                {/* Bank Account Fields */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider font-mono border-b border-white/10 pb-2">
                    {adminLang === 'vi' ? 'Thông Tin Tài Khoản Thụ Hưởng' : 'Receiving Bank Details'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-gray-300 font-semibold block">
                        {adminLang === 'vi' ? 'Ngân Hàng Thụ Hưởng' : 'Receiving Bank'}
                      </label>
                      <select
                        value={bankConfig.bankCode}
                        onChange={(e) => setBankConfig({ ...bankConfig, bankCode: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-purple-400"
                      >
                        <option value="VPBank">VPBank (Ngân hàng TMCP Việt Nam Thịnh Vượng)</option>
                        <option value="MB">MBBank (Ngân hàng Quân Đội)</option>
                        <option value="VCB">Vietcombank (Ngoại thương)</option>
                        <option value="TCB">Techcombank (Kỹ thương)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-gray-300 font-semibold block">
                        {adminLang === 'vi' ? 'Số Tài Khoản Nhận Tiền' : 'Account Number'}
                      </label>
                      <input
                        type="text"
                        value={bankConfig.accountNumber}
                        onChange={(e) => setBankConfig({ ...bankConfig, accountNumber: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:border-purple-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-gray-300 font-semibold block">
                        {adminLang === 'vi' ? 'Tên Chủ Tài Khoản (Không dấu)' : 'Account Holder (Uppercase)'}
                      </label>
                      <input
                        type="text"
                        value={bankConfig.accountHolder}
                        onChange={(e) => setBankConfig({ ...bankConfig, accountHolder: e.target.value.toUpperCase() })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:border-purple-400"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-gray-300 font-semibold block">
                        Webhook Destination URL (Vercel Endpoint)
                      </label>
                      <input
                        type="text"
                        readOnly
                        value="https://<your-vercel-domain>/api/webhook/payment"
                        className="w-full bg-black/60 border border-purple-500/30 rounded-xl px-3 py-2.5 text-teal-300 font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing Configuration */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider font-mono">
                    {adminLang === 'vi' ? 'Cấu Hình Giá Bán Gói Premium' : 'Premium Pricing Configuration'}
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="space-y-1.5">
                      <label className="text-gray-400 block">
                        {adminLang === 'vi' ? 'Gói Tháng (VNĐ)' : 'Monthly Plan'}
                      </label>
                      <input
                        type="number"
                        value={bankConfig.monthlyPrice}
                        onChange={(e) => setBankConfig({ ...bankConfig, monthlyPrice: Number(e.target.value) })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-gray-400 block">
                        {adminLang === 'vi' ? 'Gói 1 Năm (VNĐ)' : 'Yearly Plan'}
                      </label>
                      <input
                        type="number"
                        value={bankConfig.yearlyPrice}
                        onChange={(e) => setBankConfig({ ...bankConfig, yearlyPrice: Number(e.target.value) })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:border-purple-400"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-gray-400 block">
                        {adminLang === 'vi' ? 'Gói Trọn Đời (VNĐ)' : 'Lifetime Plan'}
                      </label>
                      <input
                        type="number"
                        value={bankConfig.lifetimePrice}
                        onChange={(e) => setBankConfig({ ...bankConfig, lifetimePrice: Number(e.target.value) })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-white font-mono focus:outline-none focus:border-purple-400"
                      />
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        const current = getPricingConfig();
                        const origYearly = bankConfig.monthlyPrice * 12;
                        const discount = Math.max(0, Math.round(((origYearly - bankConfig.yearlyPrice) / origYearly) * 100));
                        savePricingConfig({
                          monthly: {
                            ...current.monthly,
                            price: bankConfig.monthlyPrice,
                            originalPrice: bankConfig.monthlyPrice
                          },
                          yearly: {
                            ...current.yearly,
                            price: bankConfig.yearlyPrice,
                            originalPrice: origYearly,
                            discountPercent: discount
                          },
                          lifetime: {
                            ...current.lifetime,
                            price: bankConfig.lifetimePrice
                          }
                        });
                        showToast(adminLang === 'vi' ? 'Đã lưu cấu hình tài khoản ngân hàng và cập nhật giá bán toàn hệ thống!' : 'Bank settings and system pricing saved successfully!');
                      }}
                      className="px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-black font-bold text-xs shadow-lg transition-all cursor-pointer"
                    >
                      {adminLang === 'vi' ? 'Lưu Cấu Hình' : 'Save Configuration'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-width Danger / Reset Card */}
            <div className="p-6 rounded-3xl bg-[#0e0722] border border-rose-500/20 space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider font-mono">
                {adminLang === 'vi' ? 'Khởi Tạo Lại Dữ Liệu (Reset To Clean Slate)' : 'Wipe & Reset System Data'}
              </h4>
              <p className="text-xs text-gray-400 leading-relaxed max-w-3xl">
                {adminLang === 'vi'
                  ? 'Xóa sạch toàn bộ giao dịch, tài khoản giả lập và lượt tương tác telemetry, đưa hệ thống về trạng thái mới toanh 100%.'
                  : 'Wipe all mock transactions, test subscriptions, and telemetry metrics to start 100% fresh.'}
              </p>
              <button
                type="button"
                onClick={() => {
                  const clean = resetAllSystemTelemetry();
                  setLiveData(clean);
                  setTransactions([]);
                  setSubscribers([]);
                  setAffiliateProducts(INITIAL_AFFILIATE_PRODUCTS);
                  setAiTokensCost(0);
                  setHostingCost(0);
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('psyquizz_admin_outflow_ai');
                    localStorage.removeItem('psyquizz_admin_outflow_hosting');
                  }
                  showToast(adminLang === 'vi' ? 'Đã xóa toàn bộ dữ liệu giả lập và đặt lại hệ thống về mới toanh 100%!' : 'System completely reset to clean state (0 everywhere)!');
                }}
                className="px-5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-200 font-bold text-xs transition-all cursor-pointer"
              >
                {adminLang === 'vi' ? 'Xóa Toàn Bộ Data Giả Lập & Reset Về Mới Toanh' : 'Reset Everything to Clean Slate'}
              </button>
            </div>
          </div>
        )}

      </div>

      {/* ============================================================== */}
      {/* MODAL: SIMULATE VIETQR PAYMENT TEST FOR ADMIN */}
      {/* ============================================================== */}
      {showSimulateModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setShowSimulateModal(false)}
        >
          <div
            className="w-full max-w-md rounded-3xl bg-[#12082b] border border-purple-500/40 p-6 sm:p-7 text-white shadow-2xl space-y-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-teal-300" />
                <h3 className="text-base font-bold text-white">
                  {adminLang === 'vi' ? 'Mô Phỏng Chuyển Khoản Ngân Hàng' : 'Simulate Bank Transfer'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowSimulateModal(false)}
                className="p-1 rounded-full text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-gray-300">
              {adminLang === 'vi'
                ? 'Công cụ dành cho Admin kiểm tra tính năng Webhook: Khi một khách chuyển khoản qua VietQR, hệ thống sẽ tự động bóc tách Anonymous Key và kích hoạt Plus ngay tức thì.'
                : 'Admin testing tool for Webhook reconciliation: When a user pays via VietQR, system parses Anonymous Key and activates Plus immediately.'}
            </p>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="text-gray-300 font-semibold">
                  {adminLang === 'vi' ? 'Khóa Ẩn Danh Cần Mua (Anonymous Key)' : 'Target Anonymous Key'}
                </label>
                <input
                  type="text"
                  value={simKey}
                  onChange={(e) => setSimKey(e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono uppercase"
                />
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-semibold">
                  {adminLang === 'vi' ? 'Số tiền chuyển khoản' : 'Transfer Amount'}
                </label>
                <select
                  value={simAmount}
                  onChange={(e) => setSimAmount(Number(e.target.value))}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white font-mono"
                >
                  <option value={99000}>99,000 đ ({adminLang === 'vi' ? 'Gói 1 Tháng' : 'Monthly Plan'})</option>
                  <option value={299000}>299,000 đ ({adminLang === 'vi' ? 'Gói 1 Năm' : 'Yearly Plan'})</option>
                  <option value={699000}>699,000 đ ({adminLang === 'vi' ? 'Gói Trọn Đời Lifetime' : 'Lifetime Plan'})</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-gray-300 font-semibold">
                  {adminLang === 'vi' ? 'App Ngân hàng chuyển' : 'Sending Bank App'}
                </label>
                <select
                  value={simGateway}
                  onChange={(e) => setSimGateway(e.target.value as any)}
                  className="w-full bg-black/50 border border-white/10 rounded-xl px-3 py-2 text-white"
                >
                  <option value="MBBank">MBBank</option>
                  <option value="Vietcombank">Vietcombank</option>
                  <option value="Techcombank">Techcombank</option>
                </select>
              </div>

              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-[11px] text-purple-200">
                <strong>{adminLang === 'vi' ? 'Nội dung chuyển khoản mô phỏng:' : 'Simulated Transfer Memo:'}</strong>{' '}
                <span className="font-mono text-white">{simKey.trim().toUpperCase()} NANG CAP PREMIUM</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowSimulateModal(false)}
                className="px-4 py-2 rounded-xl bg-white/10 text-gray-300 hover:text-white text-xs cursor-pointer"
              >
                {adminLang === 'vi' ? 'Hủy' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={handleSimulatePayment}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-white font-bold text-xs shadow-md cursor-pointer"
              >
                {adminLang === 'vi' ? 'Bắn Webhook Khớp Tiền Ngay' : 'Trigger Webhook & Match'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
