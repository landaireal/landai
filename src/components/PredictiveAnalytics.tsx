import { useLanguage } from '../context/LanguageContext';
import { LineChart, TrendingUp, Cpu } from 'lucide-react';

export default function PredictiveAnalytics() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const t = {
    title: isAr ? 'تحليلات الأسعار التنبؤية بالذكاء الاصطناعي' : '12D AI Price Predictions',
    subtitle: isAr ? 'خوارزميات كمية تحلل 10 ملايين نقطة بيانات' : 'Quantum algorithms analyzing 10M+ data points',
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[100rem] mx-auto section-animated-bg">
      {/* Animated floating orbs */}
      <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-purple-500/15 to-violet-500/15 dark:from-purple-500/25 dark:to-violet-500/25 rounded-full blur-3xl animate-float-orb pointer-events-none"></div>
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-violet-500/15 to-purple-500/15 dark:from-violet-500/25 dark:to-purple-500/25 rounded-full blur-3xl animate-float-orb pointer-events-none" style={{animationDelay: '11s'}}></div>

      <div className="max-w-7xl mx-auto flex flex-col items-center text-center mb-20 transition-colors">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-purple-900/30 rounded-full border-2 border-purple-200/60 dark:border-purple-400/30 mb-6 shadow-lg dark:shadow-[0_0_25px_rgba(168,85,247,0.3)] backdrop-blur-sm">
          <Cpu className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
          <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400 uppercase tracking-widest">AI-Powered Analytics</span>
        </div>
        <h2 className="section-title gradient-heading mb-4 dark:drop-shadow-[0_0_30px_rgba(168,85,247,0.5)] uppercase flex flex-col md:flex-row items-center gap-6 justify-center transition-colors">
          <LineChart className="w-16 h-16 text-purple-600 dark:text-purple-500 animate-pulse-fast transition-colors" />
          {t.title}
        </h2>
        <p className="text-xl md:text-2xl text-purple-600/80 dark:text-purple-300/70 font-bold tracking-wider transition-colors max-w-3xl">
          {t.subtitle}
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-purple-500 to-pink-500 rounded-full"></div>
          <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
          <div className="h-1 w-24 bg-gradient-to-r from-pink-500 via-purple-500 to-transparent rounded-full"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto card-premium p-8 md:p-12 relative">
        {/* Enhanced Hologram Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30 pointer-events-none rounded-3xl transition-colors"></div>
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-purple-100/60 via-pink-100/30 to-transparent dark:from-purple-900/50 dark:via-pink-900/30 to-transparent pointer-events-none blur-xl transition-colors rounded-b-3xl"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-2000 pointer-events-none rounded-3xl"></div>

        <div className="flex flex-col md:flex-row justify-between items-center mb-12 relative z-10 border-b border-zinc-200 dark:border-white/5 pb-8 transition-colors">
          <div>
            <h3 className="text-3xl font-black text-zinc-900 dark:text-white tracking-widest uppercase flex items-center gap-4 dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] transition-colors">
              Downtown Dubai
              <span className="bg-emerald-50 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 px-4 py-1 rounded-full text-sm font-bold border border-emerald-200 dark:border-emerald-500/50 flex items-center gap-2 shadow-sm dark:shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-colors">
                <TrendingUp className="w-4 h-4" /> +68% 5Y Forecast
              </span>
            </h3>
          </div>
          <div className="text-right mt-6 md:mt-0 flex gap-4 transition-colors">
            <button className="bg-purple-50 dark:bg-purple-500/20 border border-purple-200 dark:border-purple-500/50 px-6 py-2 rounded-full text-purple-700 dark:text-purple-300 font-bold uppercase tracking-widest text-xs hover:bg-purple-100 dark:hover:bg-purple-500/40 transition-all shadow-sm dark:shadow-[0_0_10px_rgba(168,85,247,0.4)]">
              1 Year
            </button>
            <button className="bg-blue-50 dark:bg-cyan-500/20 border border-blue-200 dark:border-cyan-500/50 px-6 py-2 rounded-full text-blue-700 dark:text-cyan-300 font-bold uppercase tracking-widest text-xs hover:bg-blue-100 dark:hover:bg-cyan-500/40 transition-all shadow-sm dark:shadow-[0_0_20px_rgba(6,182,212,0.6)]">
              5 Year
            </button>
            <button className="bg-zinc-100 dark:bg-white/5 border border-zinc-200 dark:border-white/10 px-6 py-2 rounded-full text-zinc-600 dark:text-zinc-500 font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 dark:hover:bg-white/10 transition-all">
              10 Year
            </button>
          </div>
        </div>

        {/* SVG Graph Animation */}
        <div className="relative h-[400px] w-full mt-8 z-10">
          <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 1000 400">
            {/* Grid Lines */}
            {[0, 100, 200, 300].map((y) => (
              <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="5,5" />
            ))}
            
            {/* Y Axis Labels */}
            <text x="0" y="20" fill="rgba(168,85,247,0.5)" fontSize="14" fontWeight="bold" className="uppercase tracking-widest" transform="translate(0, 0)">AED 3.5M</text>
            <text x="0" y="120" fill="rgba(168,85,247,0.5)" fontSize="14" fontWeight="bold" className="uppercase tracking-widest" transform="translate(0, 0)">AED 2.8M</text>
            <text x="0" y="220" fill="rgba(168,85,247,0.5)" fontSize="14" fontWeight="bold" className="uppercase tracking-widest" transform="translate(0, 0)">AED 2.1M</text>
            <text x="0" y="320" fill="rgba(168,85,247,0.5)" fontSize="14" fontWeight="bold" className="uppercase tracking-widest" transform="translate(0, 0)">AED 1.5M</text>

            {/* X Axis Labels */}
            <text x="100" y="380" fill="rgba(6,182,212,0.5)" fontSize="14" fontWeight="bold">2024</text>
            <text x="300" y="380" fill="rgba(6,182,212,0.5)" fontSize="14" fontWeight="bold">2025</text>
            <text x="500" y="380" fill="rgba(6,182,212,0.5)" fontSize="14" fontWeight="bold">2026</text>
            <text x="700" y="380" fill="rgba(6,182,212,0.5)" fontSize="14" fontWeight="bold">2027</text>
            <text x="900" y="380" fill="rgba(6,182,212,0.5)" fontSize="14" fontWeight="bold">2028</text>

            {/* Glow Filter */}
            <defs>
              <filter id="glow-neon" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="15" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Glowing Trend Line */}
            <path 
              d="M100 300 C 250 280, 350 220, 500 200 S 750 150, 950 50" 
              fill="none" 
              stroke="url(#neon-gradient)" 
              strokeWidth="6"
              strokeLinecap="round"
              filter="url(#glow-neon)"
              className="animate-draw-line"
            />
            
            <path 
              d="M100 300 C 250 280, 350 220, 500 200 S 750 150, 950 50" 
              fill="none" 
              stroke="#fff" 
              strokeWidth="2"
              strokeLinecap="round"
              className="animate-draw-line"
            />

            {/* Gradient Definition */}
            <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>

            {/* Data Points */}
            <circle cx="500" cy="200" r="8" fill="#030014" stroke="#06B6D4" strokeWidth="4" className="animate-pulse-fast" filter="url(#glow-neon)" />
            <circle cx="950" cy="50" r="10" fill="#030014" stroke="#22D3EE" strokeWidth="4" className="animate-pulse-fast" filter="url(#glow-neon)" />

            {/* Tooltip Simulation */}
            <g transform="translate(800, 10)">
              <rect width="180" height="60" rx="10" fill="rgba(3,0,20,0.8)" stroke="#06B6D4" strokeWidth="1" />
              <text x="90" y="25" fill="#fff" fontSize="12" fontWeight="bold" textAnchor="middle" className="uppercase tracking-widest">Q4 2028 Value</text>
              <text x="90" y="45" fill="#22D3EE" fontSize="16" fontWeight="900" textAnchor="middle" className="uppercase tracking-widest">AED 4.2M</text>
            </g>
          </svg>
        </div>
      </div>
    </section>
  );
}