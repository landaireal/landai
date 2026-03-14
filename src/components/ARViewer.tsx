import { useState } from 'react';
import { Smartphone, Camera, Maximize2, X, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  propertyTitle: string;
  modelUrl?: string;
}

export default function ARViewer({ propertyTitle, modelUrl }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        <Camera className="w-5 h-5 relative z-10" />
        <span className="relative z-10">{isAr ? 'معاينة الواقع المعزز' : 'AR Preview'}</span>
      </motion.button>

      {/* AR Viewer Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-900/50 to-rose-900/50 backdrop-blur-md border-b border-white/10 p-4">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <Camera className="w-6 h-6" />
                    {isAr ? 'معاينة الواقع المعزز' : 'Augmented Reality Preview'}
                  </h3>
                  <p className="text-sm text-white/70">{propertyTitle}</p>
                </div>
                
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all hover:rotate-90 duration-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center p-4 md:p-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-full max-w-4xl"
              >
                {/* AR Preview Card */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 md:p-12 text-center border-2 border-pink-500/30 shadow-2xl">
                  {/* Icon */}
                  <motion.div
                    animate={{ 
                      rotateY: [0, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-pink-500 to-rose-500 rounded-3xl mb-8 shadow-2xl"
                  >
                    <Smartphone className="w-16 h-16 text-white" />
                  </motion.div>

                  {/* Title */}
                  <h4 className="text-3xl md:text-4xl font-black text-white mb-4">
                    {isAr ? 'قريباً!' : 'Coming Soon!'}
                  </h4>

                  {/* Description */}
                  <p className="text-lg text-white/70 mb-8 max-w-2xl mx-auto">
                    {isAr 
                      ? 'ستتمكن قريباً من استخدام الواقع المعزز لمعاينة العقار في منزلك باستخدام كاميرا هاتفك.'
                      : 'Soon you\'ll be able to use AR to visualize this property in your space using your phone\'s camera.'}
                  </p>

                  {/* Features List */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <Maximize2 className="w-8 h-8 text-pink-400 mb-3 mx-auto" />
                      <h5 className="font-bold text-white mb-2">
                        {isAr ? 'قياس دقيق' : 'Accurate Scaling'}
                      </h5>
                      <p className="text-sm text-white/60">
                        {isAr ? 'شاهد الأبعاد الحقيقية' : 'See real dimensions'}
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <Camera className="w-8 h-8 text-rose-400 mb-3 mx-auto" />
                      <h5 className="font-bold text-white mb-2">
                        {isAr ? 'تفاعل مباشر' : 'Live Interaction'}
                      </h5>
                      <p className="text-sm text-white/60">
                        {isAr ? 'تجول في العقار' : 'Walk through spaces'}
                      </p>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                      <Download className="w-8 h-8 text-purple-400 mb-3 mx-auto" />
                      <h5 className="font-bold text-white mb-2">
                        {isAr ? 'التقط صور' : 'Capture Photos'}
                      </h5>
                      <p className="text-sm text-white/60">
                        {isAr ? 'احفظ المشاهد' : 'Save your views'}
                      </p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-2xl hover:from-pink-700 hover:to-rose-700 transition-all shadow-xl">
                      {isAr ? 'اشترك للتحديثات' : 'Get Notified'}
                    </button>
                    <button 
                      onClick={() => setIsOpen(false)}
                      className="px-8 py-3 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all border border-white/20"
                    >
                      {isAr ? 'إغلاق' : 'Close'}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Footer Note */}
            <div className="bg-gradient-to-r from-pink-900/50 to-rose-900/50 backdrop-blur-md border-t border-white/10 p-4">
              <p className="text-center text-sm text-white/60 max-w-3xl mx-auto">
                {isAr 
                  ? '💡 ستكون هذه الميزة متاحة قريباً على أجهزة iOS وAndroid التي تدعم ARKit وARCore'
                  : '💡 This feature will be available soon for iOS and Android devices with ARKit and ARCore support'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
