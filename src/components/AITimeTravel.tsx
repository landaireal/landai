import React, { useState } from 'react';
import { History, TrendingUp, Clock, Calendar } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function AITimeTravel() {
  const [year, setYear] = useState(2024);
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  // Base metrics for 2024
  const basePrice = 15000000; // 15M AED
  const baseRent = 800000; // 800k AED/year
  const baseDemand = 85; // 85%

  // Calculate projected metrics based on year
  const yearDiff = year - 2024;
  const currentPrice = Math.round(basePrice * Math.pow(1.09, yearDiff));
  const currentRent = Math.round(baseRent * Math.pow(1.06, yearDiff));
  const currentDemand = Math.min(100, Math.max(40, baseDemand + yearDiff * 2));

  // Determine visual style based on time period
  const getFilterStyle = () => {
    if (year < 2024) return 'grayscale(60%) sepia(30%)';
    if (year > 2024) return 'hue-rotate(30deg) saturate(150%) contrast(110%)';
    return 'none';
  };

  return (
    <section className="py-24 bg-transparent dark:bg-slate-950 transition-colors duration-500 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100/50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700/50 text-indigo-700 dark:text-indigo-400 font-medium text-sm mb-6">
            <Clock className="w-4 h-4" />
            {isArabic ? 'السفر عبر الزمن بالذكاء الاصطناعي' : 'AI Time-Travel Valuation'}
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 font-serif">
            {isArabic ? 'توقع مستقبل عقارك' : 'Predict Your Property\'s Future'}
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {isArabic 
              ? 'استخدم محركنا الكمي لرؤية التقييمات التاريخية والتوقعات المستقبلية المذهلة حتى عام 2030.'
              : 'Use our quantum engine to see historical valuations and hyper-accurate future projections up to 2030.'}
          </p>
        </div>

        <div className="bg-transparent dark:bg-slate-900 border border-zinc-300 dark:border-slate-800 rounded-3xl p-6 md:p-10 shadow-xl transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Image Portal */}
            <div className="relative rounded-2xl overflow-hidden aspect-video border border-slate-200 dark:border-slate-700 shadow-inner group">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80" 
                alt="Property Time Travel"
                className="w-full h-full object-cover transition-all duration-700"
                style={{ filter: getFilterStyle() }}
              />
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/20 text-white">
                <Calendar className="w-5 h-5" />
                <span className="font-bold text-xl">{year}</span>
              </div>
              
              {/* Future overlay effects */}
              {year > 2024 && (
                <div className="absolute inset-0 z-15 bg-indigo-500/10 mix-blend-overlay animate-pulse" />
              )}
            </div>

            {/* Metrics & Controls */}
            <div className="space-y-10">
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-transparent dark:bg-slate-800/50 border border-zinc-300 dark:border-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium">
                    {isArabic ? 'القيمة التقديرية' : 'Estimated Value'}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    AED {(currentPrice / 1000000).toFixed(2)}M
                  </p>
                  <div className={`flex items-center gap-1 text-sm font-medium ${year >= 2024 ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {year >= 2024 ? <TrendingUp className="w-4 h-4" /> : <History className="w-4 h-4" />}
                    <span>{Math.abs(yearDiff * 9)}% {year >= 2024 ? (isArabic ? 'نمو' : 'Growth') : (isArabic ? 'أقل' : 'Less')}</span>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-transparent dark:bg-slate-800/50 border border-zinc-300 dark:border-slate-700">
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-2 font-medium">
                    {isArabic ? 'العائد الإيجاري' : 'Rental Yield'}
                  </p>
                  <p className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    AED {(currentRent / 1000).toFixed(0)}k
                  </p>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-4">
                    <div 
                      className="bg-indigo-500 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${currentDemand}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Slider Control */}
              <div className="space-y-6">
                <div className="flex justify-between text-sm font-bold text-slate-400 dark:text-slate-500">
                  <span>2020</span>
                  <span className="text-indigo-600 dark:text-indigo-400">2024 (Now)</span>
                  <span>2030</span>
                </div>
                <input 
                  type="range" 
                  min="2020" 
                  max="2030" 
                  value={year}
                  onChange={(e) => setYear(parseInt(e.target.value))}
                  className="w-full h-3 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-600 dark:accent-indigo-500 hover:accent-indigo-500 transition-all"
                />
                <p className="text-center text-sm text-slate-500 dark:text-slate-400 italic">
                  {isArabic 
                    ? 'اسحب الشريط لرؤية تغيرات السوق عبر الزمن'
                    : 'Drag the timeline to shift market conditions'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
