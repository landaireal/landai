import { useState } from 'react';
import { TrendingUp, Calendar, BarChart3, DollarSign, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  currentPrice: number;
  currency: string;
  location: string;
}

export default function PropertyPricePredictor({ currentPrice, currency, location }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [selectedYear, setSelectedYear] = useState(1);

  const predictions = {
    1: { price: currentPrice * 1.08, change: 8.0, confidence: 92 },
    3: { price: currentPrice * 1.25, change: 25.0, confidence: 85 },
    5: { price: currentPrice * 1.42, change: 42.0, confidence: 78 },
    10: { price: currentPrice * 1.95, change: 95.0, confidence: 65 }
  };

  const selected = predictions[selectedYear as keyof typeof predictions];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 rounded-3xl p-6 border-2 border-violet-200 dark:border-violet-500/40 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-violet-600 to-fuchsia-600 rounded-2xl">
          <Sparkles className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {isAr ? 'توقع الأسعار بالذكاء الاصطناعي' : 'AI Price Predictor'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {location}
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {[1, 3, 5, 10].map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`flex-1 py-2 px-3 rounded-xl font-bold text-sm transition-all ${
              selectedYear === year
                ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white shadow-lg'
                : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-violet-50 dark:hover:bg-slate-600'
            }`}
          >
            {year}Y
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl p-6 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/80 text-sm font-semibold">
            {isAr ? `السعر المتوقع بعد ${selectedYear} سنة` : `Predicted in ${selectedYear} year${selectedYear > 1 ? 's' : ''}`}
          </span>
          <div className="flex items-center gap-1 text-white/80 text-sm">
            <TrendingUp className="w-4 h-4" />
            <span>+{selected.change}%</span>
          </div>
        </div>
        <div className="text-4xl font-black text-white mb-2">
          {currency} {selected.price.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </div>
        <div className="flex items-center gap-2 text-white/90 text-sm">
          <BarChart3 className="w-4 h-4" />
          <span>{isAr ? 'ثقة' : 'Confidence'}: {selected.confidence}%</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4">
          <Calendar className="w-5 h-5 text-violet-600 dark:text-violet-400 mb-2" />
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
            {isAr ? 'أفضل وقت للبيع' : 'Best Time to Sell'}
          </p>
          <p className="text-lg font-black text-violet-600 dark:text-violet-400">
            {selectedYear >= 5 ? `${selectedYear}Y` : '5Y+'}
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800 rounded-xl p-4">
          <DollarSign className="w-5 h-5 text-fuchsia-600 dark:text-fuchsia-400 mb-2" />
          <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">
            {isAr ? 'الزيادة المتوقعة' : 'Expected Gain'}
          </p>
          <p className="text-lg font-black text-fuchsia-600 dark:text-fuchsia-400">
            {currency} {(selected.price - currentPrice).toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
