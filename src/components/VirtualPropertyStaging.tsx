import { useState } from 'react';
import { Palette, Sofa, Image, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export default function VirtualPropertyStaging() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [selectedStyle, setSelectedStyle] = useState('modern');

  const styles = [
    { id: 'modern', name: isAr ? 'عصري' : 'Modern', icon: '🏢' },
    { id: 'luxury', name: isAr ? 'فاخر' : 'Luxury', icon: '💎' },
    { id: 'minimalist', name: isAr ? 'بسيط' : 'Minimalist', icon: '⚪' },
    { id: 'traditional', name: isAr ? 'تقليدي' : 'Traditional', icon: '🏛️' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 rounded-3xl p-6 border-2 border-pink-200 dark:border-pink-500/40 shadow-xl"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-pink-600 to-rose-600 rounded-2xl">
          <Palette className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            {isAr ? 'التصميم الافتراضي' : 'Virtual Staging'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {isAr ? 'شاهد العقار بأثاث افتراضي' : 'See property with virtual furniture'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-4">
        {styles.map((style) => (
          <button
            key={style.id}
            onClick={() => setSelectedStyle(style.id)}
            className={`p-4 rounded-2xl border-2 transition-all ${
              selectedStyle === style.id
                ? 'border-pink-500 bg-pink-50 dark:bg-pink-900/30'
                : 'border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 hover:border-pink-300'
            }`}
          >
            <div className="text-3xl mb-2">{style.icon}</div>
            <p className="text-sm font-bold text-slate-700 dark:text-slate-300">{style.name}</p>
          </button>
        ))}
      </div>

      <div className="bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-2xl h-48 flex items-center justify-center mb-4 border-2 border-slate-300 dark:border-slate-700">
        <div className="text-center">
          <Image className="w-16 h-16 text-slate-400 mx-auto mb-3" />
          <p className="text-slate-600 dark:text-slate-400 font-semibold">
            {isAr ? 'معاينة التصميم' : 'Staging Preview'}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-500">
            {selectedStyle.charAt(0).toUpperCase() + selectedStyle.slice(1)} Style
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button className="flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white rounded-xl font-bold text-sm transition-all">
          <Wand2 className="w-4 h-4" />
          {isAr ? 'تطبيق' : 'Apply'}
        </button>
        <button className="flex items-center justify-center gap-2 py-3 bg-white dark:bg-slate-700 border-2 border-pink-200 dark:border-pink-500/30 text-pink-600 dark:text-pink-400 rounded-xl font-bold text-sm hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all">
          <Sofa className="w-4 h-4" />
          {isAr ? 'الأثاث' : 'Furniture'}
        </button>
      </div>
    </motion.div>
  );
}
