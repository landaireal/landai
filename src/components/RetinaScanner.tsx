import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { ScanFace, Unlock, ShieldAlert } from 'lucide-react';

export default function RetinaScanner() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { language } = useLanguage();
  const [scanState, setScanState] = useState<'idle' | 'scanning' | 'granted'>('idle');

  const handleScan = () => {
    if (scanState !== 'idle') return;
    setScanState('scanning');
    setTimeout(() => {
      setScanState('granted');
    }, 3500);
  };

  const resetScan = () => setScanState('idle');

  const text = {
    en: {
      title: "12D OFF-MARKET ASSETS",
      subtitle: "RESTRICTED VIP MATRIX",
      idle: "INITIATE RETINA SCAN",
      scanning: "QUANTUM BIOMETRIC ANALYSIS...",
      granted: "ACCESS GRANTED: CLASSIFIED ASSETS UNLOCKED",
      desc: "Scan your biometric Web3 identity to unlock classified, zero-gravity luxury properties and off-market VIP penthouses not available to the public."
    },
    ar: {
      title: "أصول 12D غير معروضة في السوق",
      subtitle: "مصفوفة كبار الشخصيات المقيدة",
      idle: "بدء مسح شبكية العين",
      scanning: "تحليل بيومتري كمي...",
      granted: "تم منح الوصول: تم فتح الأصول السرية",
      desc: "قم بمسح هويتك البيومترية Web3 لفتح عقارات فاخرة منعدمة الجاذبية وشقق بنتهاوس حصرية لكبار الشخصيات غير متاحة للجمهور."
    }
  };

  const t = text[language as keyof typeof text];

  return (
    <section className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-slate-950' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500 animate-pulse">
              {t.title}
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.desc}
          </p>
        </div>

        <div className="flex justify-center items-center">
          <div 
            onClick={handleScan}
            className={`relative w-80 h-80 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${
              scanState === 'granted' 
                ? 'shadow-[0_0_100px_rgba(16,185,129,0.5)] border-emerald-500' 
                : scanState === 'scanning'
                ? 'shadow-[0_0_80px_rgba(236,72,153,0.5)] border-pink-500 animate-pulse'
                : 'shadow-[0_0_50px_rgba(6,182,212,0.3)] border-cyan-500 hover:shadow-[0_0_80px_rgba(6,182,212,0.6)] hover:scale-105'
            } border-4 bg-slate-900/50 backdrop-blur-xl group`}
          >
            {/* Inner Ring */}
            <div className={`absolute inset-4 rounded-full border-2 border-dashed ${
              scanState === 'granted' ? 'border-emerald-400/50' : 'border-cyan-400/50 animate-spin-slow'
            }`}></div>

            {/* Scanner Laser */}
            {scanState === 'scanning' && (
              <div className="absolute inset-0 rounded-full overflow-hidden">
                <div className="w-full h-1 bg-pink-500 shadow-[0_0_20px_rgba(236,72,153,1)] animate-scan-vertical"></div>
              </div>
            )}

            {/* Icon */}
            <div className="relative z-10 flex flex-col items-center justify-center">
              {scanState === 'idle' && (
                <>
                  <ScanFace className="w-24 h-24 text-cyan-400 mb-4 group-hover:scale-110 transition-transform" />
                  <p className="text-cyan-400 font-bold tracking-widest text-sm">{t.idle}</p>
                </>
              )}
              {scanState === 'scanning' && (
                <>
                  <ShieldAlert className="w-24 h-24 text-pink-500 mb-4 animate-pulse" />
                  <p className="text-pink-500 font-bold tracking-widest text-sm text-center px-4">{t.scanning}</p>
                </>
              )}
              {scanState === 'granted' && (
                <>
                  <Unlock className="w-24 h-24 text-emerald-400 mb-4" />
                  <p className="text-emerald-400 font-bold tracking-widest text-sm text-center px-4">{t.granted}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {scanState === 'granted' && (
          <div className="mt-12 text-center animate-fade-in-up">
            <button 
              onClick={resetScan}
              className="px-8 py-3 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 hover:bg-emerald-500/40 transition-all font-bold tracking-widest text-sm"
            >
              CLOSE VIP MATRIX
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
