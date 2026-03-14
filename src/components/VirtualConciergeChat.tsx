import { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface Message {
  id: string;
  type: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

export default function VirtualConciergeChat() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: isAr ? 'مرحباً! أنا المساعد الافتراضي. كيف يمكنني مساعدتك اليوم؟' : 'Hello! I\'m your virtual property concierge. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = generateResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        text: response,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (input: string): string => {
    const lower = input.toLowerCase();
    
    if (lower.includes('price') || lower.includes('cost') || lower.includes('سعر')) {
      return isAr 
        ? 'الأسعار تبدأ من AED 2,500,000. هل تريد رؤية خطط الدفع المتاحة؟'
        : 'Prices start from AED 2,500,000. Would you like to see available payment plans?';
    }
    if (lower.includes('location') || lower.includes('where') || lower.includes('موقع')) {
      return isAr
        ? 'العقار يقع في دبي مارينا، واحدة من أرقى المناطق. قريب من المترو والشاطئ.'
        : 'The property is located in Dubai Marina, one of the most prestigious areas. Close to metro and beach.';
    }
    if (lower.includes('amenities') || lower.includes('facilities') || lower.includes('مرافق')) {
      return isAr
        ? 'المرافق تشمل: مسبح، صالة رياضية، أمن 24/7، مواقف سيارات، وحديقة.'
        : 'Amenities include: Swimming pool, gym, 24/7 security, parking, and garden.';
    }
    if (lower.includes('viewing') || lower.includes('visit') || lower.includes('زيارة')) {
      return isAr
        ? 'يمكنني ترتيب زيارة لك! متى يناسبك الوقت؟'
        : 'I can arrange a viewing for you! When would be convenient for you?';
    }
    
    return isAr
      ? 'شكراً على سؤالك! دعني أساعدك. هل تريد معرفة المزيد عن السعر، الموقع، أو المرافق؟'
      : 'Thank you for your question! Let me help you. Would you like to know more about pricing, location, or amenities?';
  };

  const quickReplies = [
    { text: isAr ? 'عرض السعر' : 'Show Price', icon: '💰' },
    { text: isAr ? 'الموقع' : 'Location', icon: '📍' },
    { text: isAr ? 'حجز زيارة' : 'Book Viewing', icon: '📅' },
    { text: isAr ? 'المرافق' : 'Amenities', icon: '🏊' }
  ];

  return (
    <>
      {/* Chat Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-16 right-4 z-30 p-4 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-full shadow-2xl text-white hover:from-blue-700 hover:to-cyan-700 transition-all"
      >
        <MessageCircle className="w-7 h-7" />
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-20 right-4 z-40 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] bg-white dark:bg-slate-800 rounded-3xl shadow-2xl border-2 border-blue-500/30 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-white">{isAr ? 'المساعد الافتراضي' : 'Virtual Concierge'}</h3>
                  <p className="text-xs text-white/80 flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    {isAr ? 'متصل' : 'Online'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-all"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'bot' 
                      ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                      : 'bg-gradient-to-br from-purple-500 to-pink-500'
                  }`}>
                    {message.type === 'bot' ? (
                      <Bot className="w-5 h-5 text-white" />
                    ) : (
                      <User className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div className={`max-w-[70%] ${message.type === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                    <div className={`px-4 py-3 rounded-2xl ${
                      message.type === 'bot'
                        ? 'bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600'
                        : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                    }`}>
                      <p className={`text-sm ${message.type === 'bot' ? 'text-slate-700 dark:text-slate-200' : 'text-white'}`}>
                        {message.text}
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 px-2">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <div className="bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 px-4 py-3 rounded-2xl">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 border-t border-slate-200 dark:border-slate-700">
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickReplies.map((reply, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setInputText(reply.text);
                      handleSend();
                    }}
                    className="px-3 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-semibold whitespace-nowrap hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all flex items-center gap-1"
                  >
                    <span>{reply.icon}</span>
                    <span>{reply.text}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isAr ? 'اكتب رسالتك...' : 'Type your message...'}
                  className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-700 rounded-2xl text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSend}
                  disabled={!inputText.trim()}
                  className="px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-slate-300 disabled:to-slate-400 text-white rounded-2xl transition-all disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
              <p className="text-xs text-slate-400 mt-2 text-center flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                {isAr ? 'مدعوم بالذكاء الاصطناعي' : 'Powered by AI'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
