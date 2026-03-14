import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Radio, CheckCircle, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { useNavigate } from 'react-router-dom';

export default function VoiceSearchCommand() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();
  
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if browser supports speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = language === 'ar' ? 'ar-AE' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        setTranscript(transcriptText);

        if (event.results[current].isFinal) {
          processVoiceCommand(transcriptText);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setResult({ type: 'error', message: isAr ? 'خطأ في التعرف على الصوت' : 'Speech recognition error' });
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [language]);

  const startListening = () => {
    if (recognitionRef.current) {
      setTranscript('');
      setResult(null);
      setIsListening(true);
      recognitionRef.current.start();
    } else {
      setResult({ 
        type: 'error', 
        message: isAr ? 'المتصفح لا يدعم التعرف على الصوت' : 'Browser does not support speech recognition' 
      });
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  const processVoiceCommand = async (command: string) => {
    setIsProcessing(true);
    const lowerCommand = command.toLowerCase();

    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Voice command parsing
    if (lowerCommand.includes('search') || lowerCommand.includes('find') || lowerCommand.includes('show')) {
      // Extract search terms
      if (lowerCommand.includes('villa')) {
        navigate('/properties?search=villa');
        setResult({ type: 'success', message: isAr ? 'البحث عن فلل...' : 'Searching for villas...' });
      } else if (lowerCommand.includes('penthouse')) {
        navigate('/properties?search=penthouse');
        setResult({ type: 'success', message: isAr ? 'البحث عن بنتهاوس...' : 'Searching for penthouses...' });
      } else if (lowerCommand.includes('apartment')) {
        navigate('/properties?search=apartment');
        setResult({ type: 'success', message: isAr ? 'البحث عن شقق...' : 'Searching for apartments...' });
      } else {
        const searchTerm = command.replace(/(search|find|show|for|me)/gi, '').trim();
        navigate(`/properties?search=${encodeURIComponent(searchTerm)}`);
        setResult({ type: 'success', message: `${isAr ? 'البحث عن' : 'Searching for'} "${searchTerm}"` });
      }
    } else if (lowerCommand.includes('home') || lowerCommand.includes('homepage')) {
      navigate('/');
      setResult({ type: 'success', message: isAr ? 'الانتقال إلى الصفحة الرئيسية' : 'Going to homepage' });
    } else if (lowerCommand.includes('contact')) {
      navigate('/contact');
      setResult({ type: 'success', message: isAr ? 'فتح صفحة الاتصال' : 'Opening contact page' });
    } else if (lowerCommand.includes('dark mode') || lowerCommand.includes('theme')) {
      // Trigger dark mode toggle
      document.dispatchEvent(new CustomEvent('toggleTheme'));
      setResult({ type: 'success', message: isAr ? 'تبديل المظهر' : 'Toggling theme' });
    } else {
      setResult({ 
        type: 'error', 
        message: isAr ? 'لم أفهم الأمر. حاول مرة أخرى.' : 'I didn\'t understand that command. Try again.' 
      });
    }

    setIsProcessing(false);
    setTimeout(() => setResult(null), 3000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-30">
      {/* Voice Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={isListening ? stopListening : startListening}
        className={`p-4 rounded-full shadow-2xl transition-all ${
          isListening
            ? 'bg-gradient-to-br from-red-500 to-pink-500 animate-pulse'
            : 'bg-gradient-to-br from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700'
        }`}
      >
        {isListening ? (
          <MicOff className="w-7 h-7 text-white" />
        ) : (
          <Mic className="w-7 h-7 text-white" />
        )}
      </motion.button>

      {/* Voice Feedback Panel */}
      <AnimatePresence>
        {(isListening || isProcessing || result) && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="absolute bottom-20 right-0 w-80 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border-2 border-purple-500/30 p-6"
          >
            {isListening && (
              <div className="text-center">
                <div className="flex items-center justify-center gap-2 mb-4">
                  <Radio className="w-5 h-5 text-red-500 animate-pulse" />
                  <span className="text-red-500 font-bold animate-pulse">
                    {isAr ? 'الاستماع...' : 'Listening...'}
                  </span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-3">
                  {isAr ? 'قل أمراً...' : 'Say a command...'}
                </p>
                {transcript && (
                  <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-3 border-2 border-purple-200 dark:border-purple-500/30">
                    <p className="text-purple-600 dark:text-purple-400 font-semibold">
                      "{transcript}"
                    </p>
                  </div>
                )}
                <div className="mt-4 flex justify-center gap-1">
                  <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse"></div>
                  <div className="w-1 h-6 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-1 h-8 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-1 h-6 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                  <div className="w-1 h-4 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}

            {isProcessing && (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent mb-4"></div>
                <p className="text-slate-700 dark:text-slate-300 font-semibold">
                  {isAr ? 'معالجة الأمر...' : 'Processing command...'}
                </p>
              </div>
            )}

            {result && (
              <div className="text-center">
                {result.type === 'success' ? (
                  <>
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <p className="text-green-600 dark:text-green-400 font-semibold">
                      {result.message}
                    </p>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
                    <p className="text-red-600 dark:text-red-400 font-semibold">
                      {result.message}
                    </p>
                  </>
                )}
              </div>
            )}

            {/* Example Commands */}
            {!isListening && !isProcessing && !result && (
              <div>
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                  {isAr ? 'أمثلة على الأوامر:' : 'Example commands:'}
                </p>
                <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                  <li>• "Find villas in Dubai"</li>
                  <li>• "Show penthouses"</li>
                  <li>• "Go to homepage"</li>
                  <li>• "Toggle dark mode"</li>
                </ul>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
