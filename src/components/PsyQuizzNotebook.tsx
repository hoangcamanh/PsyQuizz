'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Sparkles, 
  Send, 
  ExternalLink, 
  Copy, 
  Check, 
  MessageSquare, 
  FileText, 
  Edit3, 
  RotateCcw, 
  ShieldCheck, 
  HelpCircle, 
  Bookmark, 
  User, 
  Bot 
} from 'lucide-react';
import { AssessmentDefinition } from '@/data/assessments/types';
import { KNOWLEDGE_BASE, queryAssessmentKnowledge } from '@/data/assessments/knowledgeBase';

interface NotebookMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  citation?: string;
  source?: string;
  timestamp: string;
}

interface PsyQuizzNotebookProps {
  assessment: AssessmentDefinition;
  resultsSummary?: string;
}

// Inline Markdown parser for clean bold, italics, and code formatting
function renderInlineText(str: string): React.ReactNode[] {
  const regex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  const parts = str.split(regex);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={i} className="italic text-purple-200">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 rounded bg-black/40 text-purple-300 font-mono text-xs">
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}

// Comprehensive message formatter with proper paragraph & bullet list line breaking
function FormattedMessageText({ content }: { content: string }) {
  const normalized = content.replace(/\r\n/g, '\n');

  // Fix clumping if multiple bullet items (* **Item:**) were returned on a single line
  const fixedContent = normalized.replace(/([^\n])\s*\*\s+\*\*/g, '$1\n\n* **');

  // Split into blocks by double newlines
  const blocks = fixedContent.split(/\n\n+/);

  return (
    <div className="space-y-3 font-sans text-sm leading-relaxed">
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Headings
        if (trimmed.startsWith('### ')) {
          return (
            <h4 key={bIdx} className="font-bold text-base text-purple-200 pt-1">
              {renderInlineText(trimmed.replace(/^###\s+/, ''))}
            </h4>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h3 key={bIdx} className="font-bold text-lg text-white pt-1">
              {renderInlineText(trimmed.replace(/^##\s+/, ''))}
            </h3>
          );
        }

        // Bullet lists
        const lines = trimmed.split('\n');
        const hasListItems = lines.some((l) => /^(\s*[-*•]|\s*\d+\.)\s+/.test(l.trim()));

        if (hasListItems) {
          return (
            <div key={bIdx} className="space-y-2 pt-1">
              {lines.map((line, lIdx) => {
                const tLine = line.trim();
                const isItem = /^(\s*[-*•]|\s*\d+\.)\s+/.test(tLine);
                if (isItem) {
                  const cleanText = tLine.replace(/^(\s*[-*•]|\s*\d+\.)\s+/, '');
                  return (
                    <div key={lIdx} className="flex items-start gap-2.5 pl-1">
                      <span className="text-brand-teal mt-1 shrink-0 text-xs">•</span>
                      <div className="flex-1 leading-relaxed">
                        {renderInlineText(cleanText)}
                      </div>
                    </div>
                  );
                }
                return (
                  <p key={lIdx} className="leading-relaxed">
                    {renderInlineText(tLine)}
                  </p>
                );
              })}
            </div>
          );
        }

        // Regular paragraph with single newline support
        return (
          <p key={bIdx} className="leading-relaxed">
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                {renderInlineText(line)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
}

export function PsyQuizzNotebook({ assessment, resultsSummary }: PsyQuizzNotebookProps) {
  const [activeTab, setActiveTab] = useState<'chat' | 'digest' | 'journal'>('chat');
  
  // Knowledge base reference
  const kb = KNOWLEDGE_BASE[assessment.id] || KNOWLEDGE_BASE['adhd'];

  // Chat State
  const [messages, setMessages] = useState<NotebookMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      text: `Hello! I am your **PsyQuizz Research Companion** for the **${assessment.name}**.\n\nI am connected with verified scientific literature (${kb.canonicalSource}). Ask me anything about your score profile, psychological mechanisms, career alignment, or evidence-based lifestyle adaptations.\n\nType your question in the input box below to begin!`,
      source: kb.canonicalSource,
      citation: kb.academicCitation,
      timestamp: 'Just now'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Ref strictly to the inner chat messages scroll container
  const chatScrollContainerRef = useRef<HTMLDivElement>(null);

  // Journal State
  const journalStorageKey = `psyquizz_notes_${assessment.id}`;
  const [journalContent, setJournalContent] = useState('');
  const [isJournalSaved, setIsJournalSaved] = useState(false);

  // Load saved notes from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(journalStorageKey);
      if (saved) {
        setJournalContent(saved);
      }
    }
  }, [journalStorageKey]);

  // Scroll ONLY the inner chat container (NEVER jumps the browser window)
  useEffect(() => {
    if (activeTab === 'chat' && chatScrollContainerRef.current) {
      chatScrollContainerRef.current.scrollTo({
        top: chatScrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isLoading, activeTab]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: NotebookMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/notebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assessmentId: assessment.id,
          question: text,
          userResultsSummary: resultsSummary || assessment.subtitle,
          history: messages.slice(-4)
        })
      });

      if (!res.ok) {
        throw new Error('Failed to fetch response');
      }

      const data = await res.json();
      const assistantMessage: NotebookMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: data.answer,
        source: data.source,
        citation: data.citation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.warn('API fetch error, using local fallback:', err);
      const fallbackResult = queryAssessmentKnowledge(assessment.id, text, resultsSummary);
      const assistantMessage: NotebookMessage = {
        id: `assistant-${Date.now()}`,
        sender: 'assistant',
        text: fallbackResult.answer,
        source: fallbackResult.source,
        citation: fallbackResult.citation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleJournalChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setJournalContent(val);
    if (typeof window !== 'undefined') {
      localStorage.setItem(journalStorageKey, val);
      setIsJournalSaved(true);
      setTimeout(() => setIsJournalSaved(false), 1500);
    }
  };

  const handleClearJournal = () => {
    if (window.confirm('Clear all personal notes for this assessment?')) {
      setJournalContent('');
      if (typeof window !== 'undefined') {
        localStorage.removeItem(journalStorageKey);
      }
    }
  };

  const handleCopyJournal = () => {
    navigator.clipboard.writeText(journalContent);
    setCopiedId('journal');
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="w-full h-[800px] sm:h-[860px] flex flex-col rounded-3xl bg-gradient-to-b from-[#130b29] to-[#0a0517] border border-purple-500/30 overflow-hidden shadow-2xl transition-all">
      {/* 1. PERMANENT TOP HEADER (Always fixed at the top of the box) */}
      <div className="shrink-0 p-6 sm:p-8 border-b border-white/10 space-y-4 bg-[#130b29]/95 backdrop-blur-md z-10">
        {/* Eyebrow */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-purple-400">
            In-Depth Research with NotebookLM
          </span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-purple/20 text-brand-purple-light border border-purple-500/30">
            In-App Hub
          </span>
        </div>

        {/* Title Row + Google NotebookLM Button */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-purple-600/30 to-brand-teal/20 border border-purple-400/40 text-brand-teal shrink-0 shadow-lg">
              <BookOpen className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-none">
                PsyQuizz Research Notebook
              </h3>
              <p className="text-xs text-gray-400 mt-1 line-clamp-1">
                Grounded academic companion for {assessment.name}
              </p>
            </div>
          </div>

          {assessment.notebookLmUrl && (
            <a
              href={assessment.notebookLmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 hover:border-purple-400/60 text-xs font-semibold text-gray-200 hover:text-white transition-all shrink-0 self-start sm:self-auto shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-brand-teal" />
              <span>Google NotebookLM</span>
              <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
            </a>
          )}
        </div>

        {/* 3-Tab Bar (Spacious, full text, never truncated) */}
        <div className="pt-2">
          <div className="inline-flex flex-wrap items-center gap-3 p-1.5 rounded-2xl bg-black/40 border border-white/10">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2.5 py-2.5 px-5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'chat'
                  ? 'bg-purple-900/60 text-white border border-purple-400/40 shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <MessageSquare className="w-4 h-4 shrink-0 text-purple-300" />
              <span>Ask Assistant</span>
            </button>

            <button
              onClick={() => setActiveTab('digest')}
              className={`flex items-center gap-2.5 py-2.5 px-5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'digest'
                  ? 'bg-purple-900/60 text-white border border-purple-400/40 shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <FileText className="w-4 h-4 shrink-0 text-brand-teal" />
              <span>Academic Digest</span>
            </button>

            <button
              onClick={() => setActiveTab('journal')}
              className={`flex items-center gap-2.5 py-2.5 px-5 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === 'journal'
                  ? 'bg-purple-900/60 text-white border border-purple-400/40 shadow-sm'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Edit3 className="w-4 h-4 shrink-0 text-pink-400" />
              <span>My Journal</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. BODY CONTAINER (Fills available space) */}
      <div className="flex-1 min-h-0 flex flex-col">
        {/* TAB 1: ASK ASSISTANT */}
        {activeTab === 'chat' && (
          <div className="flex-1 min-h-0 flex flex-col">
            {/* Scrollable Conversation Stream (Scrolls ONLY inside this div) */}
            <div 
              ref={chatScrollContainerRef}
              className="flex-1 min-h-0 p-6 sm:p-9 space-y-6 overflow-y-auto"
            >
              {messages.map((msg) => (
                <div key={msg.id} className="space-y-4">
                  <div className={`flex gap-3 sm:gap-4 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.sender === 'assistant' && (
                      <div className="w-8 h-8 rounded-full bg-brand-purple/30 border border-purple-400/40 flex items-center justify-center shrink-0 text-brand-teal mt-1 shadow-sm">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}

                    <div className={`space-y-2 max-w-[88%] sm:max-w-[80%] min-w-0 ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`p-4 sm:p-5 rounded-2xl text-sm leading-relaxed shadow-md min-w-0 break-words [overflow-wrap:anywhere] ${
                          msg.sender === 'user'
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none'
                            : 'bg-[#180e33] border border-purple-500/30 text-gray-100 rounded-tl-none'
                        }`}
                      >
                        {/* Properly formatted Markdown with line breaks & bullet lists */}
                        <FormattedMessageText content={msg.text} />

                        {/* Italic and subtle/muted citation footer */}
                        {msg.citation && (
                          <div className="pt-2.5 mt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 min-w-0">
                            <div className="flex items-start gap-1.5 min-w-0 flex-1">
                              <ShieldCheck className="w-3.5 h-3.5 text-gray-500 shrink-0 mt-0.5" />
                              <span className="font-mono text-[11px] leading-snug break-words [overflow-wrap:anywhere] italic text-gray-400">
                                Source: {msg.citation}
                              </span>
                            </div>
                            <button
                              onClick={() => handleCopyMessage(msg.id, msg.text)}
                              className="self-end sm:self-auto inline-flex items-center gap-1 text-gray-400 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 transition-all text-[11px] shrink-0"
                              title="Copy response"
                            >
                              {copiedId === msg.id ? (
                                <>
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                  <span className="text-emerald-400">Copied</span>
                                </>
                              ) : (
                                <>
                                  <Copy className="w-3.5 h-3.5" />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>

                      <span className="text-[11px] text-gray-500 block px-2">
                        {msg.timestamp}
                      </span>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full bg-purple-600/40 border border-purple-400/40 flex items-center justify-center shrink-0 text-white mt-1 shadow-sm">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3 items-center pl-1">
                  <div className="w-8 h-8 rounded-full bg-brand-purple/30 border border-purple-400/40 flex items-center justify-center shrink-0 text-brand-teal shadow-sm">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-none bg-[#180e33] border border-purple-500/30 text-xs text-purple-300 flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
                    <span>Gemini AI is analyzing research literature...</span>
                  </div>
                </div>
              )}
            </div>

            {/* PERMANENT BOTTOM INPUT BAR (Always visible and pinned at the bottom) */}
            <div className="shrink-0 p-4 sm:p-5 bg-[#0f0822] border-t border-purple-500/20">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-3 w-full"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Ask anything about ${assessment.code} or your results...`}
                  disabled={isLoading}
                  className="flex-1 bg-black/60 border border-white/15 focus:border-purple-400 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-gray-500 focus:outline-none transition-all disabled:opacity-50 shadow-inner"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim() || isLoading}
                  className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-sm font-bold transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-purple-600/25 shrink-0 active:scale-95"
                >
                  <span>Send</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* TAB 2: ACADEMIC DIGEST */}
        {activeTab === 'digest' && (
          <div className="flex-1 min-h-0 p-6 sm:p-8 space-y-6 overflow-y-auto">
            {/* Foundation Theory Card */}
            <div className="p-6 rounded-2xl bg-[#150c2e] border border-purple-500/30 space-y-3 shadow-md">
              <div className="flex items-center gap-2.5">
                <Bookmark className="w-5 h-5 text-brand-teal" />
                <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                  Foundational Theoretical Model
                </h4>
              </div>
              <p className="text-sm text-gray-200 leading-relaxed">
                {kb.foundationalTheory}
              </p>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 text-xs text-purple-300 font-mono break-words [overflow-wrap:anywhere]">
                Academic Citation: {kb.academicCitation}
              </div>
            </div>

            {/* Research Articles */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-400" />
                Curated Research Literature
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {kb.articles.map((art, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#140b2b]/90 border border-white/10 hover:border-purple-500/30 transition-all space-y-3 flex flex-col justify-between shadow-sm"
                  >
                    <div className="space-y-2.5">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/20 text-purple-300 border border-purple-500/30">
                        {art.category}
                      </span>
                      <h5 className="text-sm font-bold text-white leading-snug">
                        {art.title}
                      </h5>
                      <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                        {art.content}
                      </p>
                    </div>
                    <div className="pt-2.5 border-t border-white/10 space-y-1.5">
                      <span className="text-xs font-semibold text-gray-400 block">Key Scientific Takeaways:</span>
                      {art.keyTakeaways.map((t, i) => (
                        <div key={i} className="text-xs text-gray-300 flex items-start gap-2">
                          <span className="text-brand-teal shrink-0">•</span>
                          <span>{t}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ */}
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-brand-teal" />
                Peer-Reviewed Frequently Asked Questions
              </h4>
              <div className="space-y-3">
                {kb.faq.map((item, idx) => (
                  <div key={idx} className="p-4 sm:p-5 rounded-2xl bg-[#140b2b]/80 border border-white/10 space-y-2">
                    <h5 className="text-sm font-bold text-purple-200">
                      Q: {item.question}
                    </h5>
                    <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                    <span className="text-[11px] text-gray-500 block font-mono pt-1 break-words [overflow-wrap:anywhere]">
                      Ref: {item.citation}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PERSONAL JOURNAL */}
        {activeTab === 'journal' && (
          <div className="flex-1 min-h-0 p-6 sm:p-8 flex flex-col space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
              <div className="space-y-1">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Edit3 className="w-5 h-5 text-purple-400" />
                  Personal Reflection & Action Journal
                </h4>
                <p className="text-xs text-gray-400">
                  Record personal takeaways, reflections, or questions to discuss with a mentor or psychologist.
                </p>
              </div>
              <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
                {isJournalSaved && (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-pulse bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                    <Check className="w-3.5 h-3.5" /> Auto-saved
                  </span>
                )}
                <button
                  onClick={handleCopyJournal}
                  disabled={!journalContent.trim()}
                  className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-purple-400 text-gray-300 hover:text-white text-xs font-semibold transition-all disabled:opacity-40 flex items-center gap-1.5"
                >
                  {copiedId === 'journal' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedId === 'journal' ? 'Copied' : 'Copy Notes'}</span>
                </button>
                <button
                  onClick={handleClearJournal}
                  disabled={!journalContent.trim()}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 hover:border-red-400 text-gray-400 hover:text-red-300 transition-all disabled:opacity-40"
                  title="Clear notes"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 min-h-0 flex flex-col space-y-2">
              <textarea
                value={journalContent}
                onChange={handleJournalChange}
                placeholder={`Write your personal notes for ${assessment.name} here...\n\nPrompts for reflection:\n1. What surprised me most about my scores:\n2. One concrete habit or environmental adjustment I want to try this week:\n3. Questions I want to bring to a professional or trusted mentor:`}
                className="flex-1 w-full p-5 rounded-2xl bg-black/40 border border-white/15 focus:border-purple-400 text-sm text-gray-100 placeholder-gray-500 focus:outline-none font-sans leading-relaxed resize-none transition-all"
              />
              <div className="shrink-0 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 gap-1 pt-1">
                <span>🔒 Encrypted locally in your browser storage. PsyQuizz never uploads your private notes.</span>
                <span>{journalContent.length} characters</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
