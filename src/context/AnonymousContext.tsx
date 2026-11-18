'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface AccountRecord {
  username: string;
  passwordHash: string;
  key: string;
  createdAt: string;
}

interface AnonymousContextType {
  anonymousKey: string;
  isPlus: boolean;
  remainingAiQuestions: number;
  maxFreeAiQuestions: number;
  accountInfo: { username: string } | null;
  useAiQuestion: () => boolean;
  restoreKey: (key: string) => boolean;
  activatePlus: () => void;
  exportKeyText: () => void;
  resetQuotaForTesting: () => void;
  bindAccount: (username: string, password: string) => { success: boolean; message: string };
  loginWithAccount: (username: string, password: string) => { success: boolean; message: string };
  unlinkAccount: () => void;
}

const AnonymousContext = createContext<AnonymousContextType | undefined>(undefined);

const STORAGE_KEY = 'psyquizz_anonymous_key';
const PLUS_KEY_PREFIX = 'psyquizz_plus_status_';
const AI_USAGE_PREFIX = 'psyquizz_ai_usage_';
const ACCOUNTS_STORAGE_KEY = 'psyquizz_accounts_registry';
const KEY_TO_ACCOUNT_PREFIX = 'psyquizz_key_account_';
const MAX_FREE_AI_QUESTIONS = 3;

// Generate a memorable, crypto-random Anonymous Key like PQ-88A7-91C2
export function generateAnonymousKey(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let segment1 = '';
  let segment2 = '';
  for (let i = 0; i < 4; i++) {
    segment1 += chars.charAt(Math.floor(Math.random() * chars.length));
    segment2 += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return `PQ-${segment1}-${segment2}`;
}

export function AnonymousProvider({ children }: { children: React.ReactNode }) {
  const [anonymousKey, setAnonymousKey] = useState<string>('');
  const [isPlus, setIsPlus] = useState<boolean>(false);
  const [aiQuestionsUsed, setAiQuestionsUsed] = useState<number>(0);
  const [accountInfo, setAccountInfo] = useState<{ username: string } | null>(null);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Initialize or restore Anonymous Key on load
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Check if URL has ?key=PQ-... for quick recovery (Magic Link)
    const urlParams = new URLSearchParams(window.location.search);
    const urlKey = urlParams.get('key') || urlParams.get('anonymousKey');

    let currentKey = '';
    if (urlKey && /^PQ-[A-Z0-9]{4}-[A-Z0-9]{4}$/i.test(urlKey.trim())) {
      currentKey = urlKey.trim().toUpperCase();
      localStorage.setItem(STORAGE_KEY, currentKey);
    } else {
      // 2. Read from local storage
      const savedKey = localStorage.getItem(STORAGE_KEY);
      if (savedKey) {
        currentKey = savedKey;
      } else {
        // 3. Auto-generate new Anonymous Key on first visit
        currentKey = generateAnonymousKey();
        localStorage.setItem(STORAGE_KEY, currentKey);
      }
    }

    setAnonymousKey(currentKey);

    // Read Plus status & AI usage for this specific key
    const savedPlus = localStorage.getItem(`${PLUS_KEY_PREFIX}${currentKey}`) === 'true';
    setIsPlus(savedPlus);

    const savedUsage = parseInt(localStorage.getItem(`${AI_USAGE_PREFIX}${currentKey}`) || '0', 10);
    setAiQuestionsUsed(isNaN(savedUsage) ? 0 : savedUsage);

    // Check if an account is bound to this key
    const linkedUser = localStorage.getItem(`${KEY_TO_ACCOUNT_PREFIX}${currentKey}`);
    if (linkedUser) {
      setAccountInfo({ username: linkedUser });
    } else {
      setAccountInfo(null);
    }

    setIsLoaded(true);
  }, []);

  // Use 1 AI question turn
  const useAiQuestion = (): boolean => {
    if (isPlus) return true; // Unlimited for Plus

    if (aiQuestionsUsed >= MAX_FREE_AI_QUESTIONS) {
      return false; // Quota exceeded
    }

    const nextUsage = aiQuestionsUsed + 1;
    setAiQuestionsUsed(nextUsage);
    if (typeof window !== 'undefined' && anonymousKey) {
      localStorage.setItem(`${AI_USAGE_PREFIX}${anonymousKey}`, nextUsage.toString());
    }
    return true;
  };

  // Restore key from another device or backup
  const restoreKey = (keyToRestore: string): boolean => {
    const cleanKey = keyToRestore.trim().toUpperCase();
    if (!cleanKey.startsWith('PQ-') || cleanKey.length < 8) {
      return false;
    }

    setAnonymousKey(cleanKey);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, cleanKey);

      // Refresh Plus status and AI usage for this restored key
      const savedPlus = localStorage.getItem(`${PLUS_KEY_PREFIX}${cleanKey}`) === 'true';
      setIsPlus(savedPlus);

      const savedUsage = parseInt(localStorage.getItem(`${AI_USAGE_PREFIX}${cleanKey}`) || '0', 10);
      setAiQuestionsUsed(isNaN(savedUsage) ? 0 : savedUsage);

      // Check linked account
      const linkedUser = localStorage.getItem(`${KEY_TO_ACCOUNT_PREFIX}${cleanKey}`);
      if (linkedUser) {
        setAccountInfo({ username: linkedUser });
      } else {
        setAccountInfo(null);
      }
    }
    return true;
  };

  // Bind username and password to this anonymous key
  const bindAccount = (username: string, password: string): { success: boolean; message: string } => {
    const cleanUser = username.trim().toLowerCase();
    if (cleanUser.length < 3) {
      return { success: false, message: 'Tên đăng nhập phải có ít nhất 3 ký tự.' };
    }
    if (!/^[a-zA-Z0-9_]+$/.test(cleanUser)) {
      return { success: false, message: 'Tên đăng nhập chỉ gồm chữ cái, số và dấu gạch dưới (_).' };
    }
    if (password.length < 6) {
      return { success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự.' };
    }

    if (typeof window === 'undefined') {
      return { success: false, message: 'Lỗi môi trường duyệt web.' };
    }

    const registryRaw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    const registry: Record<string, AccountRecord> = registryRaw ? JSON.parse(registryRaw) : {};

    // Check if this username is already registered to a DIFFERENT key
    if (registry[cleanUser] && registry[cleanUser].key !== anonymousKey) {
      return { success: false, message: 'Tên đăng nhập này đã được sử dụng. Vui lòng chọn tên khác.' };
    }

    // Save account
    registry[cleanUser] = {
      username: cleanUser,
      passwordHash: password,
      key: anonymousKey,
      createdAt: new Date().toISOString()
    };

    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(registry));
    localStorage.setItem(`${KEY_TO_ACCOUNT_PREFIX}${anonymousKey}`, cleanUser);
    setAccountInfo({ username: cleanUser });

    return { success: true, message: `Đã liên kết tài khoản @${cleanUser} vào mã ${anonymousKey} thành công!` };
  };

  // Login with username and password to restore the linked key
  const loginWithAccount = (username: string, password: string): { success: boolean; message: string } => {
    const cleanUser = username.trim().toLowerCase();
    if (!cleanUser || !password) {
      return { success: false, message: 'Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu.' };
    }

    if (typeof window === 'undefined') {
      return { success: false, message: 'Lỗi môi trường duyệt web.' };
    }

    const registryRaw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    const registry: Record<string, AccountRecord> = registryRaw ? JSON.parse(registryRaw) : {};

    const account = registry[cleanUser];
    if (!account || account.passwordHash !== password) {
      return { success: false, message: 'Tên đăng nhập hoặc mật khẩu không chính xác.' };
    }

    // Restore key
    restoreKey(account.key);
    setAccountInfo({ username: account.username });

    return { success: true, message: `Đăng nhập thành công! Đã đồng bộ mã ${account.key}.` };
  };

  // Unlink account
  const unlinkAccount = () => {
    if (typeof window === 'undefined' || !accountInfo) return;
    const cleanUser = accountInfo.username.trim().toLowerCase();
    const registryRaw = localStorage.getItem(ACCOUNTS_STORAGE_KEY);
    if (registryRaw) {
      const registry: Record<string, AccountRecord> = JSON.parse(registryRaw);
      delete registry[cleanUser];
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(registry));
    }
    localStorage.removeItem(`${KEY_TO_ACCOUNT_PREFIX}${anonymousKey}`);
    setAccountInfo(null);
  };

  // Activate Plus (used after VietQR payment confirmation)
  const activatePlus = () => {
    setIsPlus(true);
    if (typeof window !== 'undefined' && anonymousKey) {
      localStorage.setItem(`${PLUS_KEY_PREFIX}${anonymousKey}`, 'true');
    }
  };

  // Export Key as a downloadable text backup file
  const exportKeyText = () => {
    if (typeof window === 'undefined' || !anonymousKey) return;
    const content = `=====================================================
PSYQUIZZ ANONYMOUS PRIVATE IDENTITY KEY
=====================================================
Your Secret Anonymous Key: ${anonymousKey}
Linked Account: ${accountInfo?.username ? `@${accountInfo.username}` : 'None (Pure Anonymous)'}
Created on: ${new Date().toLocaleString()}
Status: ${isPlus ? 'PsyQuizz Plus (Active)' : 'Free Tier'}

HOW TO RESTORE YOUR SESSION:
1. Open PsyQuizz: ${window.location.origin}
2. Click on the Anonymous ID pill in the top header.
3. Paste this key (${anonymousKey}) or login with your linked username.
Or simply use this instant recovery link:
${window.location.origin}/?key=${anonymousKey}

KEEP THIS KEY SAFE. This key is your cryptographic identity on PsyQuizz.
=====================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `PsyQuizz-Key-${anonymousKey}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Reset Quota (for development/testing)
  const resetQuotaForTesting = () => {
    setAiQuestionsUsed(0);
    if (typeof window !== 'undefined' && anonymousKey) {
      localStorage.removeItem(`${AI_USAGE_PREFIX}${anonymousKey}`);
    }
  };

  const remainingAiQuestions = isPlus
    ? Infinity
    : Math.max(0, MAX_FREE_AI_QUESTIONS - aiQuestionsUsed);

  return (
    <AnonymousContext.Provider
      value={{
        anonymousKey: isLoaded ? anonymousKey : 'PQ-LOADING',
        isPlus,
        remainingAiQuestions,
        maxFreeAiQuestions: MAX_FREE_AI_QUESTIONS,
        accountInfo,
        useAiQuestion,
        restoreKey,
        activatePlus,
        exportKeyText,
        resetQuotaForTesting,
        bindAccount,
        loginWithAccount,
        unlinkAccount
      }}
    >
      {children}
    </AnonymousContext.Provider>
  );
}

export function useAnonymous() {
  const context = useContext(AnonymousContext);
  if (!context) {
    throw new Error('useAnonymous must be used within an AnonymousProvider');
  }
  return context;
}
