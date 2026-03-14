import { useState } from 'react';
import { TrendingUp, DollarSign, BarChart3, PieChart, Calendar, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  propertyPrice: number;
  propertyLocation: string;
}

export default function InvestmentAnalyticsDashboard({ propertyPrice, propertyLocation }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [timeframe, setTimeframe] = useState<'1Y' | '3Y' | '5Y'>('3Y');

  // Mock analytics data
  const analytics = {
    roi: {
      '1Y': 8.5,
      '3Y': 28.3,
      '5Y': 52.7
    },
    appreciation: {
      '1Y': 12.3,
      '3Y': 35.8,
      '5Y': 68.2
    },
    rentalYield: 6.8,
    marketTrend: 'up',
    demandIndex: 85,
    pricePerSqft: 1250
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-6 border-2 border-emerald-200 dark:border-emerald-500/40 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {isAr ? 'تحليل الاستثمار' : 'Investment Analytics'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {isAr ? 'توقعات العائد والنمو' : 'ROI & Growth Predictions'}
          </p>
        </div>
      </div>

      {/* Timeframe Selector */}
      <div className="flex gap-2 mb-6">
        {(['1Y', '3Y', '5Y'] as const).map((tf) => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`flex-1 py-2 px-4 rounded-xl font-bold transition-all ${
              timeframe === tf
                ? 'bg-emerald-600 text-white shadow-lg'
                : 'bg-white/50 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700'
            }`}
          >
            {tf}
          </button>
        ))}
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border-2 border-emerald-200 dark:border-emerald-500/30">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {isAr ? 'عائد الاستثمار' : 'ROI'}
            </span>
          </div>
          <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
            +{analytics.roi[timeframe]}%
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border-2 border-blue-200 dark:border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <ArrowUpRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {isAr ? 'التقدير' : 'Appreciation'}
            </span>
          </div>
          <p className="text-3xl font-black text-blue-600 dark:text-blue-400">
            +{analytics.appreciation[timeframe]}%
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border-2 border-purple-200 dark:border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {isAr ? 'العائد الإيجاري' : 'Rental Yield'}
            </span>
          </div>
          <p className="text-3xl font-black text-purple-600 dark:text-purple-400">
            {analytics.rentalYield}%
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 border-2 border-orange-200 dark:border-orange-500/30">
          <div className="flex items-center gap-2 mb-2">
            <PieChart className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {isAr ? 'مؤشر الطلب' : 'Demand Index'}
            </span>
          </div>
          <p className="text-3xl font-black text-orange-600 dark:text-orange-400">
            {analytics.demandIndex}/100
          </p>
        </div>
      </div>

      {/* Market Insight */}
      <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 border-2 border-emerald-500/30 rounded-2xl p-4">
        <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 mb-2">
          📈 {isAr ? 'رؤية السوق' : 'Market Insight'}
        </p>
        <p className="text-xs text-slate-700 dark:text-slate-300">
          {isAr 
            ? `موقع ${propertyLocation} يشهد نمواً قوياً. متوسط سعر المتر المربع AED ${analytics.pricePerSqft.toLocaleString()}.`
            : `${propertyLocation} experiencing strong growth. Avg ${analytics.pricePerSqft.toLocaleString()} AED/sqft.`}
        </p>
      </div>
    </motion.div>
  );
}
