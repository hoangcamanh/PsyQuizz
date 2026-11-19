'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Crown, 
  Check, 
  ShieldCheck, 
  X, 
  Copy,
  QrCode
} from 'lucide-react';
import { useAnonymous } from '@/context/AnonymousContext';
import { useTranslation } from '@/i18n/I18nContext';
import { trackLiveEvent } from '@/lib/realtimeAnalytics';
import { getPricingConfig, SystemPricingConfig } from '@/config/pricing';

interface PremiumUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PremiumUpgradeModal({ isOpen, onClose }: PremiumUpgradeModalProps) {
  const { anonymousKey, isPlus, activatePlus } = useAnonymous();
  const { locale } = useTranslation();
  const isVi = locale === 'vi';

  const [pricingConfig, setPricingConfig] = useState<SystemPricingConfig>(() => getPricingConfig());
  const [upgradePlan, setUpgradePlan] = useState<'monthly' | 'yearly'>('monthly');
  const [copiedPayField, setCopiedPayField] = useState<string | null>(null);
  const [paySuccessMsg, setPaySuccessMsg] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setPricingConfig(getPricingConfig());
  }, [isOpen]);

  const planAmount = upgradePlan === 'monthly' ? pricingConfig.monthly.price : pricingConfig.yearly.price;
  const transferContent = `PQ ${anonymousKey.replace('PQ-', '')}`;

  // Poll for webhook completion while upgrade modal is open
  useEffect(() => {
    if (!isOpen || isPlus) return;
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/webhook/payment?key=${encodeURIComponent(anonymousKey)}`);
        const data = await res.json();
        if (data?.paid) {
          activatePlus();
          trackLiveEvent('payment_success', {
            anonymousKey,
            amount: planAmount,
            plan: upgradePlan,
            gateway: 'VPBank',
            description: `${transferContent} AUTO WEBHOOK`
          });
          setPaySuccessMsg(
            isVi 
              ? 'Thanh toán thành công! Chào mừng bạn đến với PsyQuizz Plus!' 
              : 'Payment received! Welcome to PsyQuizz Plus!'
          );
          setTimeout(() => {
            onClose();
            setPaySuccessMsg(null);
          }, 2500);
        }
      } catch {
        // network polling silence
      }
    }, 3000);
    return () => clearInterval(interval);
  }, [isOpen, isPlus, anonymousKey, planAmount, upgradePlan, transferContent, isVi, activatePlus, onClose]);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPayField(field);
    setTimeout(() => setCopiedPayField(null), 2000);
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      onClick={onClose}
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl my-auto rounded-3xl bg-gradient-to-b from-[#180e33] to-[#0c0618] border border-purple-500/40 p-6 sm:p-8 text-white shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto [scrollbar-width:thin]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1.5 text-center sm:text-left pr-8">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {isVi ? 'Nâng cấp Gói PsyQuizz Plus' : 'Upgrade to PsyQuizz Plus'}
          </h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            {isVi
              ? 'Mở khóa toàn bộ quyền lợi hỏi đáp AI không giới hạn và phân tích đa thang đo.'
              : 'Unlock unlimited AI questions and complete cross-scale psychology analysis.'}
          </p>
        </div>

        {/* Plan Selector with Crossed-out Original Price */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setUpgradePlan('monthly')}
            className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
              upgradePlan === 'monthly'
                ? 'bg-purple-600/30 border-purple-400 ring-2 ring-purple-500/50'
                : 'bg-black/30 border-white/10 hover:border-white/20'
            }`}
          >
            <span className="text-[11px] text-gray-400 block font-semibold">
              {isVi ? pricingConfig.monthly.labelVi : pricingConfig.monthly.labelEn}
            </span>
            <div className="pt-0.5">
              <span className="text-lg font-black text-white font-mono">
                {pricingConfig.monthly.price.toLocaleString()} đ
              </span>
            </div>
            <span className="text-[10px] text-purple-300 block pt-0.5">
              {pricingConfig.monthly.durationDays} {isVi ? 'ngày sử dụng' : 'days access'}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setUpgradePlan('yearly')}
            className={`p-3.5 rounded-2xl border text-left transition-all relative cursor-pointer ${
              upgradePlan === 'yearly'
                ? 'bg-purple-600/30 border-purple-400 ring-2 ring-purple-500/50'
                : 'bg-black/30 border-white/10 hover:border-white/20'
            }`}
          >
            <span className="absolute top-2 right-2 px-1.5 py-0.5 rounded-full bg-emerald-500 text-black font-extrabold text-[10px]">
              -{pricingConfig.yearly.discountPercent}%
            </span>
            <span className="text-[11px] text-gray-400 block font-semibold">
              {isVi ? pricingConfig.yearly.labelVi : pricingConfig.yearly.labelEn}
            </span>
            <div className="flex items-baseline gap-1.5 pt-0.5">
              <span className="text-xs text-gray-400 line-through font-mono">
                {pricingConfig.yearly.originalPrice.toLocaleString()} đ
              </span>
              <span className="text-lg font-black text-teal-300 font-mono">
                {pricingConfig.yearly.price.toLocaleString()} đ
              </span>
            </div>
            <span className="text-[10px] text-teal-200 block pt-0.5">
              {pricingConfig.yearly.durationDays} {isVi ? 'ngày sử dụng' : 'days access'}
            </span>
          </button>
        </div>

        {/* Real VPBank QR Code & Bank Transfer Details */}
        <div className="p-4 sm:p-5 rounded-2xl bg-black/50 border border-purple-500/30 space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Enlarged QR Code Container */}
            <div className="relative group shrink-0">
              <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-2xl bg-white p-2.5 shadow-2xl flex items-center justify-center overflow-hidden border-2 border-purple-400/70">
                <img 
                  src={`https://img.vietqr.io/image/970432-39112082003-compact2.png?amount=${planAmount}&addInfo=${encodeURIComponent(transferContent)}&accountName=LE%20HOANG%20ANH`}
                  alt="VPBank QR Code"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Account Details */}
            <div className="flex-1 w-full space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block">{isVi ? 'Ngân hàng thụ hưởng' : 'Bank'}</span>
                  <strong className="text-white font-mono text-sm">VPBank (Napas 247)</strong>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block">{isVi ? 'Số tài khoản' : 'Account Number'}</span>
                  <strong className="text-white font-mono text-base tracking-wider">39112082003</strong>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard('39112082003', 'account')}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 transition-colors cursor-pointer"
                  title="Copy"
                >
                  {copiedPayField === 'account' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block">{isVi ? 'Chủ tài khoản' : 'Account Name'}</span>
                  <strong className="text-teal-300 font-mono text-sm">LE HOANG ANH</strong>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-purple-500/15 border border-purple-400/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-purple-300 block font-semibold">
                    {isVi ? 'Nội dung chuyển khoản (Bắt buộc)' : 'Transfer Note (Required)'}
                  </span>
                  <strong className="text-white font-mono text-base tracking-wider">{transferContent}</strong>
                </div>
                <button
                  type="button"
                  onClick={() => copyToClipboard(transferContent, 'content')}
                  className="p-1.5 rounded-lg bg-purple-500/30 hover:bg-purple-500/50 text-white transition-colors cursor-pointer"
                  title="Copy"
                >
                  {copiedPayField === 'content' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>

          {/* Waiting status radar */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-amber-300 font-medium py-0.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
            </span>
            <span>{isVi ? 'Hệ thống đang tự động lắng nghe giao dịch chuyển khoản...' : 'Listening for real-time bank transfer confirmation...'}</span>
          </div>
        </div>

        {paySuccessMsg && (
          <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold text-center animate-in fade-in">
            {paySuccessMsg}
          </div>
        )}

        {/* Automated Activation Notice */}
        <div className="space-y-2 pt-1">
          <p className="text-xs text-center text-gray-400 leading-relaxed">
            {isVi
              ? 'Quét mã bằng ứng dụng ngân hàng bất kỳ (VPBank NEO, MB, VCB, Momo...). Hệ thống đối soát tự động kích hoạt quyền lợi Plus ngay khi tiền vào tài khoản.'
              : 'Scan with any mobile banking app. Plus perks activate automatically once the payment is received.'}
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}
