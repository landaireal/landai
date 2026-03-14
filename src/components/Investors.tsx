import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, ShieldCheck, MapPin, PieChart, ArrowUpRight } from 'lucide-react';

export default function Investors() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const t = {
    title: isAr ? 'للمستثمرين' : 'For Investors',
    subtitle: isAr ? 'فرص استثمارية مميزة' : 'Investment Opportunities',
    desc: isAr 
      ? 'عظم عوائدك من خلال تحليل السوق المتخصص لدينا وفرص الاستثمار المتميزة في سوق العقارات في الإمارات.' 
      : 'Maximize your returns with our expert market analysis and premium investment opportunities in the UAE real estate market.',
    stats: [
      { label: isAr ? 'نمو سنوي' : 'Annual Growth', value: '12%+', icon: <TrendingUp className="w-6 h-6" /> },
      { label: isAr ? 'منظم وموثوق' : 'Regulated', value: '100%', icon: <ShieldCheck className="w-6 h-6" /> },
      { label: isAr ? 'مواقع مميزة' : 'Locations', value: '20+', icon: <MapPin className="w-6 h-6" /> },
      { label: isAr ? 'عوائد سنوية' : 'Yearly Returns', value: '8-15%', icon: <PieChart className="w-6 h-6" /> },
    ]
  };

  return (
    <section id="investors" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto section-animated-bg">
      {/* Animated floating orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-violet-500/20 dark:from-purple-500/30 dark:to-violet-500/30 rounded-full blur-3xl animate-float-orb pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-purple-500/20 dark:from-violet-500/30 dark:to-purple-500/30 rounded-full blur-3xl animate-float-orb pointer-events-none" style={{animationDelay: '9s'}}></div>
      
      <div className="card-standard relative overflow-hidden z-10">
        {/* Decorative elements matching contact form */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/10 via-violet-500/10 to-transparent dark:from-purple-500/20 dark:via-violet-500/20 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-violet-500/10 via-purple-500/10 to-transparent dark:from-violet-500/20 dark:via-purple-500/20 rounded-tr-full"></div>
        
        <div className="flex flex-col lg:flex-row gap-16 items-center relative z-10">
          {/* Enhanced Text Content */}
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-50 via-violet-50 to-purple-50 dark:from-purple-900/30 dark:via-violet-900/30 dark:to-purple-900/30 border-2 border-purple-200/60 dark:border-purple-400/30 text-purple-600 dark:text-purple-400 text-sm font-black uppercase tracking-widest transition-all shadow-lg dark:shadow-[0_0_20px_rgba(124,58,237,0.3)] backdrop-blur-sm">
              <TrendingUp className="w-4 h-4 animate-pulse" />
              {t.subtitle}
            </div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-zinc-900 dark:text-white leading-[1.05] tracking-tight transition-colors">
              The Smart Way to <br />
              <span className="blueberry-text drop-shadow-lg dark:drop-shadow-[0_0_30px_rgba(102,126,234,0.5)]">Grow Wealth</span>
            </h2>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-semibold max-w-lg leading-relaxed transition-colors">
              {t.desc}
            </p>
            <div className="flex items-start gap-3">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-blue-500 to-cyan-500 rounded-full"></div>
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 via-purple-500 to-transparent rounded-full"></div>
            </div>
            
            {/* Enhanced AI Yield Calculator */}
            <div className="card-premium p-8 mt-8 relative group">
              <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 via-cyan-500 to-purple-500 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 shadow-lg dark:shadow-[0_0_15px_#06b6d4] rounded-l-3xl"></div>
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none rounded-3xl"></div>
              <div className="flex justify-between items-center mb-4">
                <span className="text-sm font-bold text-blue-600 dark:text-cyan-400 tracking-wider uppercase transition-colors">{isAr ? "محاكي العوائد (12D)" : "12D Yield Simulator"}</span>
                <span className="text-xs px-2 py-1 rounded bg-indigo-100 dark:bg-purple-500/20 text-indigo-700 dark:text-purple-300 border border-indigo-200 dark:border-purple-500/30 font-mono transition-colors">+68% ROI</span>
              </div>
              <p className="text-3xl font-black text-zinc-900 dark:text-white mb-2 font-mono dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] transition-colors">2,500,000 <span className="text-sm text-zinc-500">AED</span></p>
              <div className="w-full h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden mt-4 transition-colors">
                <div className="h-full bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-500 w-[68%] shadow-sm dark:shadow-[0_0_10px_#06b6d4]"></div>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-3 transition-colors">{isAr ? "العائد المتوقع خلال 5 سنوات" : "Projected 5-Year Return"}: <strong className="text-emerald-600 dark:text-emerald-400">+1,700,000 AED</strong></p>
            </div>
            
            <button className="btn-primary mt-8 group inline-flex">
              <span>Start Investing</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Enhanced Stats Grid */}
          <div className="flex-1 w-full grid grid-cols-2 gap-6">
            {t.stats.map((stat, idx) => (
              <div key={idx} className="card-standard group relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/10 via-violet-500/10 to-transparent dark:from-purple-500/20 dark:via-violet-500/20 rounded-bl-full"></div>
                
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none rounded-[3rem]"></div>
                
                {/* Icon with glow */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-cyan-500 dark:to-blue-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/40 dark:to-cyan-900/40 border-2 border-blue-100 dark:border-cyan-500/30 w-20 h-20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-cyan-400 group-hover:scale-110 group-hover:rotate-6 group-hover:text-white dark:group-hover:text-white group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-cyan-600 dark:group-hover:from-cyan-500 dark:group-hover:to-blue-500 group-hover:border-transparent transition-all duration-500 icon-float shadow-lg">
                    {stat.icon}
                  </div>
                </div>
                
                <h4 className="text-5xl md:text-6xl font-black gradient-heading mb-3 relative z-10 group-hover:scale-105 transition-transform duration-300">{stat.value}</h4>
                <p className="text-zinc-500 dark:text-zinc-400 font-black uppercase tracking-widest text-sm relative z-10 transition-colors group-hover:text-zinc-700 dark:group-hover:text-zinc-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}