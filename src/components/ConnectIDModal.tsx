import { useState } from 'react';
import { X, Fingerprint, Scan, Shield, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectIDModal({ isOpen, onClose }: Props) {
  const { loginWithBiometric } = useAuth();
  const { language } = useLanguage();
  const [step, setStep] = useState<'select' | 'scanning' | 'success' | 'error'>('select');
  const [selectedMethod, setSelectedMethod] = useState<'fingerprint' | 'face' | null>(null);

  const handleConnect = async () => {
    if (!selectedMethod) return;
    
    setStep('scanning');
    
    // Simulate biometric scan
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Try to authenticate with demo biometric ID
    const success = await loginWithBiometric('bio-admin-123');
    
    if (success) {
      setStep('success');
      setTimeout(() => {
        onClose();
        setStep('select');
      }, 2000);
    } else {
      setStep('error');
      setTimeout(() => setStep('select'), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 border border-blue-200 dark:border-cyan-500/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500 rounded-xl">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'توصيل الهوية' : 'Connect ID'}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            {step === 'select' && (
              <div className="space-y-6">
                <p className="text-slate-600 dark:text-slate-400 text-center">
                  {language === 'ar' 
                    ? 'اختر طريقة المصادقة البيومترية الخاصة بك'
                    : 'Choose your biometric authentication method'
                  }
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedMethod('fingerprint')}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      selectedMethod === 'fingerprint'
                        ? 'border-blue-500 dark:border-cyan-500 bg-blue-50 dark:bg-cyan-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-cyan-600'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        selectedMethod === 'fingerprint'
                          ? 'bg-blue-500 dark:bg-cyan-500'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}>
                        <Fingerprint className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {language === 'ar' ? 'بصمة الإصبع' : 'Fingerprint'}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {language === 'ar' ? 'مسح بصمة الإصبع' : 'Scan your fingerprint'}
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => setSelectedMethod('face')}
                    className={`w-full p-6 rounded-xl border-2 transition-all ${
                      selectedMethod === 'face'
                        ? 'border-blue-500 dark:border-cyan-500 bg-blue-50 dark:bg-cyan-900/20'
                        : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-cyan-600'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-lg ${
                        selectedMethod === 'face'
                          ? 'bg-blue-500 dark:bg-cyan-500'
                          : 'bg-slate-200 dark:bg-slate-700'
                      }`}>
                        <Scan className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-left">
                        <h3 className="font-semibold text-slate-900 dark:text-white">
                          {language === 'ar' ? 'التعرف على الوجه' : 'Face Recognition'}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          {language === 'ar' ? 'مسح وجهك' : 'Scan your face'}
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                <button
                  onClick={handleConnect}
                  disabled={!selectedMethod}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500 text-white rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  {language === 'ar' ? 'توصيل' : 'Connect'}
                </button>
              </div>
            )}

            {step === 'scanning' && (
              <div className="text-center py-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="inline-block p-6 bg-gradient-to-br from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500 rounded-full mb-6"
                >
                  {selectedMethod === 'fingerprint' ? (
                    <Fingerprint className="w-12 h-12 text-white" />
                  ) : (
                    <Scan className="w-12 h-12 text-white" />
                  )}
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {language === 'ar' ? 'المسح...' : 'Scanning...'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {language === 'ar' 
                    ? 'يرجى وضع إصبعك على الماسح الضوئي'
                    : 'Please place your finger on the scanner'
                  }
                </p>
              </div>
            )}

            {step === 'success' && (
              <div className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="inline-block p-6 bg-green-500 rounded-full mb-6"
                >
                  <CheckCircle2 className="w-12 h-12 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {language === 'ar' ? 'نجح!' : 'Success!'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {language === 'ar' 
                    ? 'تمت المصادقة بنجاح'
                    : 'Authentication successful'
                  }
                </p>
              </div>
            )}

            {step === 'error' && (
              <div className="text-center py-8">
                <div className="inline-block p-6 bg-red-500 rounded-full mb-6">
                  <X className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  {language === 'ar' ? 'فشل' : 'Failed'}
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {language === 'ar' 
                    ? 'فشلت المصادقة. يرجى المحاولة مرة أخرى'
                    : 'Authentication failed. Please try again'
                  }
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
