import { useState } from 'react';
import { Scale, X, Plus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import type { Property } from '../services/api';

interface Props {
  currentProperty: Property;
}

export default function PropertyComparisonWidget({ currentProperty }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-6 border-2 border-amber-200 dark:border-amber-500/40 shadow-xl"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-amber-600 to-orange-600 rounded-2xl">
            <Scale className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              {isAr ? 'مقارنة العقارات' : 'Compare Properties'}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {isAr ? 'أضف للمقارنة' : 'Add to comparison'}
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => {
            // Add to comparison in global state
            const comparisonList = JSON.parse(localStorage.getItem('comparison') || '[]');
            if (!comparisonList.find((p: Property) => p.id === currentProperty.id)) {
              comparisonList.push(currentProperty);
              localStorage.setItem('comparison', JSON.stringify(comparisonList));
            }
            setIsExpanded(true);
          }}
          className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          {isAr ? 'أضف للمقارنة' : 'Add to Compare'}
        </motion.button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-4 border-t-2 border-amber-200 dark:border-amber-700">
                <div className="bg-white dark:bg-slate-800 rounded-2xl p-4 mb-3">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <p className="text-sm font-bold text-green-600 dark:text-green-400">
                      {isAr ? 'تمت الإضافة للمقارنة!' : 'Added to comparison!'}
                    </p>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {isAr 
                      ? 'انتقل إلى صفحة المقارنة لرؤية الفروقات'
                      : 'Go to comparison page to see differences'}
                  </p>
                </div>
                <button
                  onClick={() => window.location.href = '/properties?compare=true'}
                  className="w-full py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-xl font-semibold hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-all"
                >
                  {isAr ? 'عرض المقارنة' : 'View Comparison'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-3 gap-2 mt-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-amber-600 dark:text-amber-400">{currentProperty.bedrooms}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">{isAr ? 'غرف' : 'Beds'}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-orange-600 dark:text-orange-400">{currentProperty.bathrooms}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">{isAr ? 'حمام' : 'Baths'}</p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-xl p-3 text-center">
            <p className="text-2xl font-black text-red-600 dark:text-red-400">{currentProperty.area}</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">{currentProperty.areaUnit}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
