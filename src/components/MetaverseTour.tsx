import { useLanguage } from '../context/LanguageContext';
import { View, Zap } from 'lucide-react';

export default function MetaverseTour() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section className="py-24 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 font-bold tracking-widest uppercase text-sm mb-4 border border-blue-500/20 dark:border-cyan-500/20">
            <Zap className="w-4 h-4" />
            {isAr ? 'عرض 12D' : '12D View'}
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-zinc-900 dark:text-white">
            {isAr ? 'جولة ميتافيرس الهولوغرامية' : 'Hologram Metaverse Tour'}
          </h2>
          <p className="text-xl text-zinc-700 dark:text-zinc-400 max-w-2xl mx-auto font-light">
            {isAr 
              ? 'استكشف عقارك المستقبلي بتقنية 12D في الواقع الافتراضي المدعوم بالذكاء الاصطناعي.' 
              : 'Explore your future property with 12D AI-powered virtual reality.'}
          </p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto rounded-[3rem] overflow-hidden bg-transparent dark:glass-12d aspect-video border border-blue-200 dark:border-cyan-500/30 group">
          {/* Animated Glow behind the viewer */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 dark:from-purple-500/30 dark:via-cyan-500/30 dark:to-blue-500/30 opacity-50 group-hover:opacity-100 transition-opacity duration-700 animate-pulse-fast pointer-events-none"></div>
          
          {/* 3D Scene Simulation */}
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-80 mix-blend-overlay dark:opacity-60 dark:mix-blend-color-dodge filter group-hover:scale-110 transition-transform duration-1000"></div>
          
          {/* Hologram Scan Line */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#06b6d4] animate-scanline"></div>

          {/* Central Play/Enter Button */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative group-hover:scale-110 transition-transform duration-500 pointer-events-auto cursor-pointer">
              <div className="absolute -inset-4 bg-cyan-500/30 rounded-full blur-xl animate-ping"></div>
              <div className="absolute inset-0 bg-blue-500/20 dark:bg-cyan-500/20 rounded-full blur-md"></div>
              <button className="relative w-24 h-24 flex items-center justify-center bg-black/80 backdrop-blur-xl border border-blue-400 dark:border-cyan-400 rounded-full shadow-[0_0_30px_rgba(6,182,212,0.5)] text-blue-600 dark:text-cyan-400">
                <View className="w-10 h-10" />
              </button>
            </div>
          </div>

          {/* HUD Elements */}
          <div className="absolute top-6 left-6 flex flex-col gap-2 pointer-events-none">
            <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-cyan-400 font-mono text-xs">
              SCANNING ENVIRONMENT...
            </div>
            <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 text-purple-400 font-mono text-xs">
              AI MATCH: 99.9%
            </div>
          </div>

          <div className="absolute bottom-6 right-6 pointer-events-none">
            <div className="flex gap-2">
              <div className="w-12 h-12 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-cyan-400 rounded-full border-t-transparent animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
