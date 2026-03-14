import { useLanguage } from '../context/LanguageContext';
import { Activity, Target, Zap } from 'lucide-react';

export default function Heatmap() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[100rem] mx-auto relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-transparent dark:bg-gradient-to-r dark:from-purple-900/40 dark:via-cyan-900/40 dark:to-emerald-900/40 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight flex items-center justify-center gap-4">
          <Activity className="w-10 h-10 text-zinc-700 dark:text-cyan-400 animate-pulse" />
          {isAr ? "خريطة الحرارة 12D الاستثمارية" : "12D AI Investment Heatmap"}
        </h2>
        <p className="text-lg text-zinc-700 dark:text-zinc-400 max-w-2xl mx-auto font-light">
          {isAr 
            ? "يقوم الذكاء الاصطناعي الخاص بنا بتحليل آلاف نقاط البيانات لحظياً للتنبؤ بمناطق النمو العقاري في الإمارات." 
            : "Our AI analyzes thousands of real-time data points to predict the highest growth sectors across the UAE."}
        </p>
      </div>

      {/* Hologram Map Container */}
      <div className="relative w-full max-w-6xl mx-auto h-[600px] rounded-[3rem] border border-zinc-300 dark:border-white/5 bg-transparent dark:bg-slate-900/80 backdrop-blur-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row p-6 md:p-12 gap-12">
        
        {/* Holographic Grid Background inside container */}
        <div className="absolute inset-0 z-0 dark:block hidden" style={{ backgroundImage: 'linear-gradient(rgba(6, 182, 212, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.05) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute inset-0 z-0 bg-transparent dark:bg-slate-900"></div>

        {/* Abstract Map Interface */}
        <div className="relative z-10 flex-1 border border-zinc-300 dark:border-cyan-500/20 rounded-3xl bg-transparent dark:bg-black/50 overflow-hidden group">
          <div className="absolute inset-0 bg-transparent dark:bg-gradient-to-br dark:from-blue-900/20 dark:via-transparent dark:to-purple-900/20"></div>
          
          {/* Faux Radar Sweep */}
          <div className="absolute inset-0 w-full h-full border-b border-transparent dark:border-cyan-400/30 bg-transparent dark:bg-gradient-to-b dark:from-transparent dark:to-cyan-500/10 animate-[scanline_4s_linear_infinite]"></div>
          
          <img 
            src="https://images.unsplash.com/photo-1546412414-8035e1776c9a?auto=format&fit=crop&q=80" 
            className="w-full h-full object-cover opacity-30 mix-blend-screen group-hover:scale-110 transition-transform duration-1000"
            alt="Map"
          />

          {/* Hotspots */}
          <div className="absolute top-[30%] left-[40%] flex flex-col items-center hidden dark:flex">
            <div className="w-4 h-4 rounded-full bg-rose-500 animate-ping"></div>
            <div className="mt-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-500/50 backdrop-blur-md text-xs font-bold text-rose-300">
              {isAr ? "دبي مارينا: +14.2%" : "Dubai Marina: +14.2%"}
            </div>
          </div>
          <div className="absolute top-[60%] left-[60%] flex flex-col items-center hidden dark:flex">
            <div className="w-6 h-6 rounded-full bg-emerald-400 animate-ping" style={{ animationDelay: '0.5s' }}></div>
            <div className="mt-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/50 backdrop-blur-md text-xs font-bold text-emerald-300">
              {isAr ? "نخلة جميرا: +22.5%" : "Palm Jumeirah: +22.5%"}
            </div>
          </div>
          <div className="absolute top-[20%] left-[70%] flex flex-col items-center hidden dark:flex">
            <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" style={{ animationDelay: '1s' }}></div>
            <div className="mt-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/50 backdrop-blur-md text-xs font-bold text-cyan-300">
              {isAr ? "الخليج التجاري: +8.9%" : "Business Bay: +8.9%"}
            </div>
          </div>
        </div>

        {/* Live Data Panel */}
        <div className="relative z-10 w-full md:w-80 flex flex-col justify-center space-y-6">
          <div className="p-6 rounded-3xl border border-zinc-300 dark:border-white/5 bg-transparent dark:bg-white/5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-cyan-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Target className="w-5 h-5 text-zinc-700 dark:text-rose-400" />
              <h3 className="text-sm text-zinc-700 dark:text-zinc-400 uppercase tracking-widest font-semibold">{isAr ? "أعلى طلب" : "Highest Demand"}</h3>
            </div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">Palm Jumeirah</p>
            <div className="w-full bg-zinc-300 dark:bg-black rounded-full h-1 mt-4 overflow-hidden">
              <div className="bg-gradient-to-r from-rose-500 to-orange-500 h-full w-[92%]"></div>
            </div>
          </div>

          <div className="p-6 rounded-3xl border border-zinc-300 dark:border-white/5 bg-transparent dark:bg-white/5 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:border-emerald-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-zinc-700 dark:text-emerald-400" />
              <h3 className="text-sm text-zinc-700 dark:text-zinc-400 uppercase tracking-widest font-semibold">{isAr ? "أعلى عائد استثماري" : "Peak ROI Yield"}</h3>
            </div>
            <p className="text-2xl font-bold text-zinc-900 dark:text-white">Dubai Marina <span className="text-emerald-600 dark:text-emerald-400 text-lg ml-2">14.2%</span></p>
            <div className="w-full bg-zinc-300 dark:bg-black rounded-full h-1 mt-4 overflow-hidden">
              <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-full w-[85%]"></div>
            </div>
          </div>
          
          <button className="w-full py-4 rounded-full bg-transparent dark:bg-gradient-to-r dark:from-cyan-600/20 dark:to-purple-600/20 border border-zinc-400 dark:border-cyan-500/30 text-zinc-900 dark:text-cyan-300 font-bold tracking-widest hover:bg-cyan-500/10 dark:hover:bg-cyan-500/20 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] uppercase text-sm">
            {isAr ? "تحليل تقرير السوق الكامل" : "Run Full Market Scan"}
          </button>
        </div>

      </div>
    </section>
  );
}
