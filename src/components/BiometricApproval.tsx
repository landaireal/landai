import React, { useState, useEffect } from 'react';
import { Fingerprint, CheckCircle, Shield, Zap } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BiometricApproval() {
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'approved'>('idle');
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  useEffect(() => {
    if (scanState === 'scanning') {
      const timer = setTimeout(() => {
        setScanState('approved');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [scanState]);

  const handleScan = () => {
    if (scanState === 'idle') setScanState('scanning');
    if (scanState === 'approved') setScanState('idle'); // Reset for demo
  };

  return (
    <section className="py-24 bg-transparent dark:bg-slate-900 transition-colors duration-500 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 bg-transparent dark:bg-indigo-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 bg-transparent dark:bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-transparent dark:bg-slate-950 border border-zinc-300 dark:border-slate-800 rounded-3xl p-8 md:p-16 text-center shadow-2xl relative overflow-hidden">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-transparent dark:bg-slate-800 border border-zinc-300 dark:border-slate-700 text-zinc-700 dark:text-slate-300 font-medium text-sm mb-8">
            <Shield className="w-4 h-4" />
            {isArabic ? 'العقود الذكية الآمنة' : 'Secure Smart Contracts'}
          </div>

          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 font-serif">
            {isArabic ? 'الموافقة الفورية بالبصمة البيومترية' : 'Instant Biometric Approval'}
          </h2>
          <p className="text-lg text-zinc-700 dark:text-slate-400 max-w-2xl mx-auto mb-12">
            {isArabic 
              ? 'تجاوز المعاملات الورقية. استخدم بصمتك البيومترية المربوطة بمحفظتك الرقمية للحصول على تمويل عقاري فوري.'
              : 'Skip the paperwork. Use your Web3-linked biometric identity to secure instant mortgage liquidity and property deeds.'}
          </p>

          {/* Scanner UI */}
          <div className="relative w-48 h-64 mx-auto mb-8 cursor-pointer group" onClick={handleScan}>
            {/* Background scanner plate */}
            <div className={`absolute inset-0 rounded-3xl border-2 transition-all duration-500 flex items-center justify-center
              ${scanState === 'idle' ? 'border-zinc-300 dark:border-slate-700 bg-transparent dark:bg-slate-900 group-hover:border-indigo-400' : ''}
              ${scanState === 'scanning' ? 'border-indigo-500 dark:border-indigo-400 bg-transparent dark:bg-indigo-900/20' : ''}
              ${scanState === 'approved' ? 'border-emerald-500 dark:border-emerald-400 bg-transparent dark:bg-emerald-900/20' : ''}
            `}>
              {scanState === 'idle' && (
                <Fingerprint className="w-24 h-24 text-slate-300 dark:text-slate-600 group-hover:text-indigo-400 transition-colors" strokeWidth={1} />
              )}
              {scanState === 'scanning' && (
                <Fingerprint className="w-24 h-24 text-indigo-500 dark:text-indigo-400 animate-pulse" strokeWidth={1.5} />
              )}
              {scanState === 'approved' && (
                <CheckCircle className="w-20 h-20 text-emerald-500 dark:text-emerald-400 animate-bounce" />
              )}
            </div>

            {/* Scanning Laser Line */}
            {scanState === 'scanning' && (
              <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 dark:bg-indigo-400 shadow-[0_0_15px_rgba(99,102,241,1)] animate-[scan_1.5s_ease-in-out_infinite] z-20 rounded-full" />
            )}
          </div>

          {/* Status Text */}
          <div className="h-16 flex items-center justify-center">
            {scanState === 'idle' && (
              <p className="text-zinc-600 dark:text-slate-400 font-medium animate-pulse">
                {isArabic ? 'اضغط للتحقق البيومتري' : 'Tap to initiate Biometric Scan'}
              </p>
            )}
            {scanState === 'scanning' && (
              <div className="flex items-center gap-3 text-indigo-600 dark:text-indigo-400 font-bold">
                <Zap className="w-5 h-5 animate-pulse" />
                {isArabic ? 'جاري فحص العقود الذكية...' : 'Verifying Smart Contracts...'}
              </div>
            )}
            {scanState === 'approved' && (
              <div className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">
                {isArabic ? 'تمت الموافقة! 15,000,000 درهم جاهزة.' : 'Approved! 15,000,000 AED Allocated.'}
              </div>
            )}
          </div>

        </div>
      </div>

      <style>{`
        @keyframes scan {
          0%, 100% { top: 0; opacity: 0; }
          10% { opacity: 1; }
          50% { top: 100%; opacity: 1; }
          90% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
