import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{text: string, isBot: boolean}[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isRtl } = useLanguage();

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { 
          text: isRtl 
            ? 'مرحباً! أنا المساعد الذكي لـ Land AI. كيف يمكنني مساعدتك في العثور على عقارك المثالي اليوم؟' 
            : 'Hello! I am your Land AI assistant. How can I help you find your perfect property today?', 
          isBot: true 
        }
      ]);
    }
  }, [isOpen, isRtl]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isBot: false }]);
    const currentInput = input;
    setInput('');

    // Simulate AI thinking and response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: isRtl 
          ? `جاري تحليل طلبك عن "${currentInput}"... سيتواصل معك أحد مستشارينا قريباً بتوصيات مخصصة مدعومة بالذكاء الاصطناعي.` 
          : `Analyzing your request for "${currentInput}"... One of our consultants will contact you shortly with AI-powered personalized recommendations.`, 
        isBot: true 
      }]);
    }, 1500);
  };

  return (
    <>
      {/* Holographic 12D Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-50 p-4 rounded-full glass-12d-panel border border-cyan-400/50 text-cyan-300 shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:scale-110 hover:shadow-[0_0_50px_rgba(6,182,212,0.8)] transition-all duration-300 ${isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'} group`}
      >
        <div className="absolute inset-0 rounded-full bg-cyan-500/30 blur-xl animate-pulse"></div>
        <Bot size={28} className="relative z-10 animate-float-12d drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        {/* Glow Ring */}
        <div className="absolute -inset-2 rounded-full border border-cyan-400/30 group-hover:border-cyan-400/80 transition-colors animate-ping"></div>
      </button>

      {/* Holographic 12D Chat Window */}
      <div 
        className={`fixed bottom-8 ${isRtl ? 'left-8' : 'right-8'} z-50 w-[350px] sm:w-[400px] glass-12d backdrop-blur-3xl border border-cyan-500/30 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden transition-all duration-500 origin-bottom ${isOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0 pointer-events-none'}`}
      >
        {/* Header */}
        <div className="p-4 border-b border-cyan-500/20 flex items-center justify-between bg-black/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">Land AI Agent</h3>
              <p className="text-xs text-cyan-400 flex items-center gap-1 font-bold tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,1)]"></span>
                {isRtl ? 'هولوغرام نشط' : 'Hologram Active'}
              </p>
            </div>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-white/10 text-cyan-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Messages Body */}
        <div className="h-[350px] overflow-y-auto p-4 flex flex-col gap-4 bg-[#030014]/80">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.isBot ? 'justify-start' : 'justify-end'}`}>
              <div 
                className={`max-w-[85%] p-3 rounded-2xl text-sm border ${
                  msg.isBot 
                    ? 'bg-cyan-900/20 border-cyan-500/30 text-cyan-100 rounded-tl-none shadow-[0_0_15px_rgba(6,182,212,0.1)]' 
                    : 'bg-purple-900/20 border-purple-500/30 text-purple-100 rounded-tr-none shadow-[0_0_15px_rgba(168,85,247,0.1)]'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 bg-black/60 border-t border-cyan-500/20">
          <div className="relative">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={isRtl ? "أدخل استفسارك لـ 12D AI..." : "Transmit to 12D AI..."}
              className={`w-full bg-black/50 border border-cyan-500/30 rounded-full py-3 px-5 text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_15px_rgba(6,182,212,0.3)] text-white placeholder-cyan-500/50 transition-all ${isRtl ? 'pl-12' : 'pr-12'}`}
              dir={isRtl ? "rtl" : "ltr"}
            />
            <button 
              type="submit"
              disabled={!input.trim()}
              className={`absolute top-1/2 -translate-y-1/2 ${isRtl ? 'left-2' : 'right-2'} p-2 rounded-full ${input.trim() ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)] hover:scale-105' : 'bg-white/5 text-cyan-500/30'} transition-all`}
            >
              <Send size={16} className={isRtl ? 'rotate-180' : ''} />
            </button>
          </div>
          <div className="mt-2 text-center flex items-center justify-center gap-1 text-[10px] text-cyan-500/50 uppercase tracking-widest">
            <Sparkles size={10} />
            {isRtl ? 'معالجة كمية 12D' : '12D Quantum Processing'}
          </div>
        </form>
      </div>
    </>
  );
}