import {
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Link } from 'react-router-dom';
import {
  Bot,
  X,
  Send,
  Sparkles,
  MapPin,
  Bed,
  Building2,
  Loader2,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { answerVisitorQuery } from '../services/aiService';
import type { Property } from '../services/api';
import { useUserData } from '../context/UserDataContext';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  properties?: Property[];
  createdAt: number;
  status?: 'sent' | 'error';
}

interface AIResult {
  answer: string;
  properties?: Property[];
}

const STORAGE_KEY = 'landai-ai-chat-history';
const MAX_MESSAGES = 50;
const MAX_INPUT_LENGTH = 700;

const QUICK_SUGGESTIONS = [
  { query: 'villa in Dubai', key: 'aiChatQuickVillas' },
  { query: 'under 2 million AED', key: 'aiChatQuickUnder2M' },
  { query: 'luxury penthouse', key: 'aiChatQuickPenthouse' },
  { query: '3 bedroom apartment', key: 'aiChatQuick3Bed' },
] as const;

function createMessageId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function clampMessages(messages: ChatMessage[]) {
  return messages.slice(-MAX_MESSAGES);
}

function formatPrice(price: number, currency: string) {
  if (!Number.isFinite(price)) return `${currency} -`;
  if (price >= 1_000_000) return `${currency} ${(price / 1_000_000).toFixed(1)}M`;
  if (price >= 1_000) return `${currency} ${(price / 1_000).toFixed(0)}K`;
  return `${currency} ${price.toLocaleString()}`;
}

function getFocusableElements(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter(
    (el) =>
      !el.hasAttribute('disabled') &&
      el.getAttribute('aria-hidden') !== 'true' &&
      el.tabIndex !== -1
  );
}

/**
 * مهم:
 * هذا السياق يطلب من الذكاء الاصطناعي أن:
 * 1) يرد بنفس لغة المستخدم بالضبط
 * 2) يجيب على أي سؤال
 * 3) يبقى مفيدًا في العقارات وفي غير العقارات
 */
function buildSystemContext(userMessage: string) {
  return `
You are Land AI, a premium intelligent assistant for Land AI Real Estate and the Land AI website.

CRITICAL LANGUAGE RULE:
- Always respond in the EXACT SAME language as the user's latest message.
- Never switch language unless the user switches language first.
- If the user writes in Arabic, reply in Arabic.
- If the user writes in English, reply in English.
- If the user writes in French, reply in French.
- If the user writes in Spanish, reply in Spanish.
- If the user writes in any other language, reply in that same language.

CORE CAPABILITIES:
- You can answer any question the user asks.
- You can help with real estate, properties, communities, locations, prices, investment, buying, selling, renting, legal/general guidance, and website services.
- If the question is not related to real estate, still answer helpfully, naturally, and clearly.
- When useful, recommend suitable properties.
- If information is uncertain, be transparent.

STYLE:
- Professional
- Elegant
- Helpful
- Natural
- Concise but useful
- Never sound robotic

USER MESSAGE:
${userMessage}
`.trim();
}

const PropertyCard = memo(function PropertyCard({
  property,
  onNavigate,
  viewPropertyLabel,
}: {
  property: Property;
  onNavigate: () => void;
  viewPropertyLabel: string;
}) {
  const imageSrc = property.image || '/placeholder-property.jpg';

  return (
    <Link
      to={`/properties/${property.id}`}
      onClick={onNavigate}
      className="group flex gap-3 rounded-2xl border border-cyan-500/25 bg-white/[0.04] p-2.5 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-500/10"
    >
      <img
        src={imageSrc}
        alt={property.title}
        loading="lazy"
        className="h-16 w-16 flex-shrink-0 rounded-xl object-cover ring-1 ring-white/10"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = '/placeholder-property.jpg';
        }}
      />

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">{property.title}</p>

        <div className="mt-1 flex items-center gap-1.5 text-xs text-cyan-200/80">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-purple-100/80">
          {typeof property.bedrooms === 'number' && (
            <span className="inline-flex items-center gap-1">
              <Bed className="h-3.5 w-3.5 flex-shrink-0" />
              {property.bedrooms} bed
            </span>
          )}

          {property.type && (
            <span className="inline-flex items-center gap-1 capitalize">
              <Building2 className="h-3.5 w-3.5 flex-shrink-0" />
              {property.type}
            </span>
          )}

          <span className="font-bold text-cyan-400">
            {formatPrice(property.price, property.currency)}
          </span>
        </div>
      </div>

      <span className="self-center text-[10px] font-bold uppercase tracking-wide text-cyan-400 transition-colors group-hover:text-cyan-300">
        {viewPropertyLabel}
      </span>
    </Link>
  );
});

const MessageBubble = memo(function MessageBubble({
  message,
  onClose,
  viewPropertyLabel,
}: {
  message: ChatMessage;
  onClose: () => void;
  viewPropertyLabel: string;
}) {
  return (
    <div className={`flex flex-col gap-2 ${message.isBot ? 'items-start' : 'items-end'}`}>
      <div
        className={`max-w-[92%] whitespace-pre-wrap rounded-2xl border p-3 text-sm leading-6 ${
          message.isBot
            ? 'rounded-tl-none border-cyan-500/25 bg-cyan-900/20 text-cyan-50 shadow-[0_0_18px_rgba(6,182,212,0.08)]'
            : 'rounded-tr-none border-purple-500/25 bg-purple-900/20 text-purple-50 shadow-[0_0_18px_rgba(168,85,247,0.08)]'
        }`}
      >
        {message.text}
      </div>

      {!!message.properties?.length && (
        <div className="flex w-full flex-col gap-2">
          {message.properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onNavigate={onClose}
              viewPropertyLabel={viewPropertyLabel}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default function AIChat() {
  const { isRtl, t, language } = useLanguage();
  const { logActivity } = useUserData();

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const chatPanelRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const mountedRef = useRef(true);
  const activeRequestRef = useRef(0);

  const dialogTitleId = useId();
  const dialogDescId = useId();

  const assistantSubtitle = useMemo(() => {
    return language === 'ar'
      ? 'يرد بنفس لغتك • يجيب على أي سؤال'
      : 'Replies in your language • Answers any question';
  }, [language]);

  const initialGreeting = useMemo<ChatMessage>(
    () => ({
      id: createMessageId(),
      text:
        language === 'ar'
          ? 'مرحبًا، أنا Land AI. يمكنك سؤالي بأي لغة، وسأرد عليك بنفس اللغة. أستطيع مساعدتك في العقارات، الأسعار، الاستثمار، الشراء، البيع، الإيجار، وخدمات الموقع، وكذلك الإجابة على أي سؤال عام.'
          : 'Hello, I’m Land AI. You can ask me in any language, and I will reply in the same language. I can help with properties, prices, investment, buying, selling, renting, website services, and general questions too.',
      isBot: true,
      createdAt: Date.now(),
      status: 'sent',
    }),
    [language]
  );

  const persistMessages = useCallback((nextMessages: ChatMessage[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(clampMessages(nextMessages)));
    } catch {
      // تجاهل أخطاء التخزين
    }
  }, []);

  const appendMessage = useCallback(
    (message: ChatMessage) => {
      setMessages((prev) => {
        const next = clampMessages([...prev, message]);
        persistMessages(next);
        return next;
      });
    },
    [persistMessages]
  );

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) return;

      const parsed = JSON.parse(stored) as ChatMessage[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setMessages(clampMessages(parsed));
      }
    } catch {
      // تجاهل البيانات التالفة
    }
  }, []);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([initialGreeting]);
      persistMessages([initialGreeting]);
    }
  }, [isOpen, messages.length, initialGreeting, persistMessages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (chatPanelRef.current && target && !chatPanelRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    return () => document.removeEventListener('mousedown', handlePointerDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const panel = chatPanelRef.current;
    if (!panel) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        setIsOpen(false);
        return;
      }

      if (e.key !== 'Tab') return;

      const focusable = getFocusableElements(panel);
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (e.shiftKey) {
        if (active === first || !panel.contains(active)) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    panel.addEventListener('keydown', handleKeyDown);
    return () => panel.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      openButtonRef.current?.focus();
    }
  }, [isOpen]);

  const processQuery = useCallback(
    async (rawQuery: string) => {
      const trimmed = rawQuery.trim();
      if (!trimmed || isTyping) return;

      const requestId = ++activeRequestRef.current;

      const userMessage: ChatMessage = {
        id: createMessageId(),
        text: trimmed,
        isBot: false,
        createdAt: Date.now(),
        status: 'sent',
      };

      appendMessage(userMessage);
      setInput('');
      setIsTyping(true);

      try {
        logActivity('ai_search', { query: trimmed, source: 'ai_chat' });
        const enhancedQuery = `
${buildSystemContext(trimmed)}

Latest user message:
${trimmed}
        `.trim();

        const result = (await answerVisitorQuery(enhancedQuery, {
          language: language === 'ar' ? 'ar' : 'en',
          companyName: 'Land AI Real Estate',
          projectName: 'Land AI',
        })) as AIResult;

        if (!mountedRef.current || requestId !== activeRequestRef.current) return;

        const botMessage: ChatMessage = {
          id: createMessageId(),
          text:
            result?.answer ||
            (language === 'ar'
              ? 'عذرًا، لم أتمكن من إنشاء رد مناسب الآن. حاول مرة أخرى.'
              : 'Sorry, I could not generate a proper answer right now. Please try again.'),
          isBot: true,
          properties: Array.isArray(result?.properties) ? result.properties : [],
          createdAt: Date.now(),
          status: 'sent',
        };

        appendMessage(botMessage);
      } catch (error) {
        console.error('AI chat error:', error);

        if (!mountedRef.current || requestId !== activeRequestRef.current) return;

        const fallbackMessage: ChatMessage = {
          id: createMessageId(),
          text:
            language === 'ar'
              ? 'حدث خطأ مؤقت. أعد المحاولة أو أعد صياغة سؤالك، وسأرد عليك بنفس لغتك.'
              : 'A temporary error occurred. Please try again or rephrase your question, and I will reply in your language.',
          isBot: true,
          createdAt: Date.now(),
          status: 'error',
        };

        appendMessage(fallbackMessage);
      } finally {
        if (mountedRef.current && requestId === activeRequestRef.current) {
          setIsTyping(false);
        }
      }
    },
    [appendMessage, isTyping, language]
  );

  const handleSend = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!input.trim() || isTyping) return;
      void processQuery(input);
    },
    [input, isTyping, processQuery]
  );

  const handleQuickSuggestion = useCallback(
    (query: string) => {
      if (isTyping) return;
      void processQuery(query);
    },
    [isTyping, processQuery]
  );

  const handleInputKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!input.trim() || isTyping) return;
        void processQuery(input);
      }
    },
    [input, isTyping, processQuery]
  );

  const handleOpen = useCallback(() => setIsOpen(true), []);
  const handleClose = useCallback(() => setIsOpen(false), []);

  const clearConversation = useCallback(() => {
    const resetMessages = [initialGreeting];
    setMessages(resetMessages);
    persistMessages(resetMessages);
    setInput('');
  }, [initialGreeting, persistMessages]);

  return (
    <>
      <button
        ref={openButtonRef}
        type="button"
        onClick={handleOpen}
        aria-label={t('aiChatOpenAssistant')}
        aria-expanded={isOpen}
        aria-controls="landai-chat-dialog"
        className={`group fixed bottom-8 z-50 rounded-full border border-cyan-400/50 p-4 text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all duration-300 hover:scale-110 hover:shadow-[0_0_50px_rgba(6,182,212,0.85)] focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 dark:focus:ring-offset-[#030014] ${
          isRtl ? 'left-8' : 'right-8'
        } ${
          isOpen ? 'pointer-events-none scale-0 opacity-0' : 'scale-100 opacity-100'
        } glass-12d-panel`}
      >
        <div
          className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl animate-pulse"
          aria-hidden
        />
        <Bot
          size={28}
          aria-hidden
          className="relative z-10 animate-float-12d drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]"
        />
        <div
          aria-hidden
          className="absolute -inset-2 rounded-full border border-cyan-400/30 transition-colors group-hover:border-cyan-400/80 animate-ping"
        />
      </button>

      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden="true"
      />

      <section
        id="landai-chat-dialog"
        ref={chatPanelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={dialogTitleId}
        aria-describedby={dialogDescId}
        tabIndex={-1}
        className={`fixed bottom-8 z-50 w-[calc(100vw-1.5rem)] max-w-[430px] overflow-hidden rounded-[2rem] border border-cyan-500/30 bg-[#050014]/90 shadow-[0_20px_70px_rgba(0,0,0,0.85)] backdrop-blur-3xl transition-all duration-500 origin-bottom ${
          isRtl ? 'left-3 sm:left-8' : 'right-3 sm:right-8'
        } ${
          isOpen ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'
        }`}
      >
        <header className="flex items-center justify-between border-b border-cyan-500/20 bg-black/40 p-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_18px_rgba(6,182,212,0.45)]">
              <Bot size={20} aria-hidden />
            </div>

            <div className="min-w-0">
              <h3
                id={dialogTitleId}
                className="truncate text-sm font-bold text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.45)] sm:text-base"
              >
                Land AI Agent
              </h3>

              <p
                id={dialogDescId}
                className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] text-cyan-400"
              >
                <span
                  aria-hidden
                  className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,1)] animate-pulse"
                />
                {assistantSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clearConversation}
              className="rounded-full border border-white/10 px-3 py-1.5 text-[11px] font-medium text-cyan-300 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              {language === 'ar' ? 'مسح' : 'Clear'}
            </button>

            <button
              type="button"
              onClick={handleClose}
              aria-label={t('aiChatCloseChat')}
              className="rounded-full p-2 text-cyan-500 transition-colors hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <X size={20} aria-hidden />
            </button>
          </div>
        </header>

        <div
          role="log"
          aria-live="polite"
          aria-relevant="additions text"
          aria-label="Chat messages"
          className="flex h-[440px] flex-col gap-4 overflow-y-auto bg-[#030014]/80 p-4"
        >
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onClose={handleClose}
              viewPropertyLabel={t('viewProperty')}
            />
          ))}

          {isTyping && (
            <div className="flex items-start">
              <div className="flex items-center gap-2 rounded-2xl rounded-tl-none border border-cyan-500/30 bg-cyan-900/20 p-3 text-cyan-100 shadow-[0_0_12px_rgba(6,182,212,0.08)]">
                <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                <span className="text-sm">
                  {language === 'ar' ? 'جاري كتابة الرد...' : 'Generating reply...'}
                </span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} aria-hidden />
        </div>

        {messages.length <= 1 && (
          <div className="border-t border-cyan-500/20 bg-black/40 px-4 py-3">
            <p className="mb-2 text-[10px] uppercase tracking-[0.22em] text-cyan-400/80">
              {t('aiChatQuickSuggestions')}
            </p>

            <div className="flex flex-wrap gap-2">
              {QUICK_SUGGESTIONS.map((suggestion) => (
                <button
                  key={suggestion.key}
                  type="button"
                  onClick={() => handleQuickSuggestion(suggestion.query)}
                  disabled={isTyping}
                  className="rounded-full border border-cyan-500/35 bg-cyan-500/15 px-3 py-1.5 text-[11px] font-semibold text-cyan-100 transition-all hover:bg-cyan-500/30 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t(suggestion.key)}
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSend} className="border-t border-cyan-500/20 bg-black/60 p-4">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              maxLength={MAX_INPUT_LENGTH}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleInputKeyDown}
              placeholder={
                language === 'ar'
                  ? 'اكتب سؤالك بأي لغة...'
                  : 'Ask your question in any language...'
              }
              aria-label={
                language === 'ar'
                  ? 'اكتب سؤالك بأي لغة'
                  : 'Ask your question in any language'
              }
              aria-disabled={isTyping}
              disabled={isTyping}
              dir={isRtl ? 'rtl' : 'ltr'}
              className={`w-full rounded-full border border-cyan-500/30 bg-black/50 py-3 text-sm text-white placeholder-cyan-500/45 transition-all focus:border-cyan-400 focus:outline-none focus:shadow-[0_0_18px_rgba(6,182,212,0.25)] disabled:opacity-60 ${
                isRtl ? 'pl-12 pr-5' : 'pl-5 pr-12'
              }`}
            />

            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              aria-label={t('aiChatSendMessage')}
              className={`absolute top-1/2 -translate-y-1/2 rounded-full p-2 transition-all focus:outline-none focus:ring-2 focus:ring-cyan-400 ${
                isRtl ? 'left-2' : 'right-2'
              } ${
                input.trim() && !isTyping
                  ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_12px_rgba(6,182,212,0.5)] hover:scale-105'
                  : 'bg-white/5 text-cyan-500/30'
              }`}
            >
              <Send size={16} className={isRtl ? 'rotate-180' : ''} aria-hidden />
            </button>
          </div>

          <div className="mt-2 flex items-center justify-between gap-3 px-1">
            <div className="flex items-center gap-1 text-[10px] uppercase tracking-[0.2em] text-cyan-500/50">
              <Sparkles size={10} aria-hidden />
              {language === 'ar'
                ? 'يرد بنفس لغتك • إجابات ذكية'
                : 'Replies in your language • Smart answers'}
            </div>

            <div className="text-[10px] text-cyan-500/40">
              {input.length}/{MAX_INPUT_LENGTH}
            </div>
          </div>
        </form>
      </section>
    </>
  );
}