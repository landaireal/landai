import { useState } from 'react';
import { MapPin, School, ShoppingCart, Hospital, Train, Coffee, TrendingUp, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  location: string;
}

export default function NeighborhoodIntelligence({ location }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const nearbyPlaces = [
    { icon: School, name: isAr ? 'مدارس' : 'Schools', count: 12, distance: '0.5km', color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-900/20' },
    { icon: ShoppingCart, name: isAr ? 'تسوق' : 'Shopping', count: 8, distance: '1.2km', color: 'text-purple-600 dark:text-purple-400', bg: 'bg-purple-50 dark:bg-purple-900/20' },
    { icon: Hospital, name: isAr ? 'مستشفيات' : 'Hospitals', count: 5, distance: '2km', color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/20' },
    { icon: Train, name: isAr ? 'مواصلات' : 'Transit', count: 3, distance: '0.8km', color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/20' },
    { icon: Coffee, name: isAr ? 'مطاعم' : 'Dining', count: 25, distance: '0.3km', color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-900/20' },
  ];

  const heatmapData = {
    walkability: 92,
    safety: 88,
    schools: 95,
    transit: 85,
    growth: 78
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900/20 rounded-3xl p-6 border-2 border-slate-200 dark:border-slate-700 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl">
          <MapPin className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {isAr ? 'معلومات المنطقة' : 'Neighborhood Intelligence'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{location}</p>
        </div>
      </div>

      {/* Nearby Places */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {nearbyPlaces.map((place, i) => (
          <motion.button
            key={i}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(place.name)}
            className={`p-4 rounded-2xl border-2 transition-all ${
              selectedCategory === place.name
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-slate-300 dark:hover:border-slate-500'
            }`}
          >
            <div className={`w-10 h-10 ${place.bg} rounded-xl flex items-center justify-center mb-2`}>
              <place.icon className={`w-5 h-5 ${place.color}`} />
            </div>
            <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{place.name}</p>
            <div className="flex items-center justify-between mt-1">
              <span className="text-lg font-black text-slate-900 dark:text-white">{place.count}</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">{place.distance}</span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Heatmap Scores */}
      <div className="space-y-3">
        <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">
          {isAr ? 'تقييمات المنطقة' : 'Area Scores'}
        </p>
        {Object.entries(heatmapData).map(([key, value]) => (
          <div key={key}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 capitalize">
                {key}
              </span>
              <span className="text-sm font-black text-blue-600 dark:text-blue-400">{value}/100</span>
            </div>
            <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${value}%` }}
                transition={{ duration: 1, delay: 0.2 }}
                className={`h-full rounded-full ${
                  value >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
                  value >= 80 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                  'bg-gradient-to-r from-orange-500 to-yellow-500'
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Growth Indicator */}
      <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-2 border-green-200 dark:border-green-500/30 rounded-2xl">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
          <div className="flex-1">
            <p className="text-xs font-bold text-green-700 dark:text-green-300">
              {isAr ? 'منطقة سريعة النمو' : 'High Growth Area'}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {isAr ? '+12% قيمة العقارات السنة الماضية' : '+12% property value last year'}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
