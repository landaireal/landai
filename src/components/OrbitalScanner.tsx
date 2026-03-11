import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Satellite, Crosshair, MapPin, Activity } from 'lucide-react';

export default function OrbitalScanner() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';
  const isAr = language === 'ar';
  
  const [target, setTarget] = useState(0);
  
  const targets = [
    { name: isAr ? 'جزيرة النخلة جبل علي' : 'Palm Jebel Ali', coords: '25.0135° N, 54.9865° E', status: 'HIGH YIELD', color: 'cyan', lightColor: 'blue' },
    { name: isAr ? 'دبي ساوث' : 'Dubai South', coords: '24.9080° N, 55.1500° E', status: 'EMERGING', color: 'purple', lightColor: 'indigo' },
    { name: isAr ? 'ميناء راشد' : 'Mina Rashid', coords: '25.2676° N, 55.2754° E', status: 'PRIME', color: 'emerald', lightColor: 'emerald' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTarget((prev) => (prev + 1) % targets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeTarget = targets[target];
  const activeColor = isDark ? activeTarget.color : activeTarget.lightColor;

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-500 ${isDark ? 'bg-[#030014] text-white' : 'bg-white text-slate-900'}`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border bg-rose-500/10 text-rose-600 dark:text-rose-400 mb-6 transition-colors border-rose-500/20 dark:border-rose-500/30">
            <Satellite className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-semibold tracking-wider uppercase">
              {isAr ? 'الماسح الضوئي المداري 12D' : '12D Orbital Scanner'}
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 font-serif transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isAr ? 'اكتساب الأراضي عبر الأقمار الصناعية' : 'Satellite Land Acquisition'}
          </h2>
          <p className={`text-xl max-w-2xl mx-auto transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {isAr 
              ? 'مراقبة حية للأراضي غير المطورة في دبي بدعم من الذكاء الاصطناعي الجغرافي.' 
              : 'Live orbital surveillance of prime undeveloped land in Dubai, powered by Geospatial AI.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-center">
          
          {/* Radar UI */}
          <div className="lg:col-span-7 relative aspect-square max-w-2xl mx-auto w-full">
            <div className={`absolute inset-0 rounded-full border border-dashed transition-colors animate-spin-slow ${isDark ? 'border-cyan-500/30' : 'border-blue-400/50'}`}></div>
            <div className={`absolute inset-4 rounded-full border transition-colors ${isDark ? 'border-purple-500/20' : 'border-indigo-400/30'}`}></div>
            <div className={`absolute inset-12 rounded-full border bg-gradient-to-b transition-colors ${isDark ? 'border-cyan-500/10 from-transparent to-cyan-500/5' : 'border-blue-400/20 from-transparent to-blue-500/5'}`}></div>
            
            {/* The Sweeping Radar Line */}
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <div className={`w-1/2 h-full bg-gradient-to-r origin-right animate-spin transition-colors ${isDark ? 'from-transparent to-cyan-400/30' : 'from-transparent to-blue-400/20'}`} style={{ animationDuration: '3s' }}></div>
            </div>

            {/* Crosshair */}
            <div className={`absolute top-1/2 left-0 w-full h-px transition-colors ${isDark ? 'bg-cyan-500/20' : 'bg-blue-500/20'}`}></div>
            <div className={`absolute top-0 left-1/2 w-px h-full transition-colors ${isDark ? 'bg-cyan-500/20' : 'bg-blue-500/20'}`}></div>
            
            <Crosshair className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 opacity-50 transition-colors ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />

            {/* Target Blip */}
            <div key={target} className={`absolute top-1/3 left-2/3 w-4 h-4 rounded-full bg-white shadow-[0_0_15px_#22d3ee] animate-ping`}></div>
            <div className={`absolute top-1/3 left-2/3 w-3 h-3 rounded-full -translate-x-[-2px] -translate-y-[-2px] transition-colors ${isDark ? 'bg-cyan-400' : 'bg-blue-500'}`}></div>

            {/* Data Overlay */}
            <div className={`absolute top-8 left-8 font-mono text-xs transition-colors ${isDark ? 'text-cyan-500' : 'text-blue-600'}`}>
              SYS.OP.11<br/>
              SCAN.ACTIVE
            </div>
          </div>

          {/* Data Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className={`p-8 rounded-[2rem] border backdrop-blur-xl transition-all duration-500 shadow-xl relative overflow-hidden group ${
              isDark ? 'bg-slate-900/50 border-white/10 dark:shadow-[0_0_40px_rgba(6,182,212,0.1)]' : 'bg-white border-slate-200 shadow-blue-500/10'
            }`}>
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ${isDark ? 'via-cyan-400' : 'via-blue-500'}`}></div>
              
              <div className="flex items-center gap-3 mb-6">
                <div className={`relative flex items-center justify-center w-12 h-12 rounded-full border transition-colors ${isDark ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-500' : 'bg-blue-500/10 border-blue-500/20 text-blue-600'}`}>
                  <MapPin className="w-5 h-5" />
                  <div className={`absolute inset-0 rounded-full border animate-ping transition-colors ${isDark ? 'border-cyan-500/50' : 'border-blue-500/50'}`}></div>
                </div>
                <div>
                  <div className={`text-sm font-mono transition-colors ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>TARGET ACQUIRED</div>
                  <h3 className="text-2xl font-bold">{activeTarget.name}</h3>
                </div>
              </div>

              <div className="space-y-4 font-mono text-sm">
                <div className={`flex justify-between border-b pb-2 transition-colors ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>COORDINATES</span>
                  <span className={isDark ? 'text-white' : 'text-slate-900'}>{activeTarget.coords}</span>
                </div>
                <div className={`flex justify-between border-b pb-2 transition-colors ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>AREA SIZE</span>
                  <span className={isDark ? 'text-white' : 'text-slate-900'}>150,000 SQ.M</span>
                </div>
                <div className={`flex justify-between border-b pb-2 transition-colors ${isDark ? 'border-white/10' : 'border-slate-200'}`}>
                  <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>AI ASSESSMENT</span>
                  <span className={`px-2 rounded bg-${activeColor}-500/20 text-${activeColor}-600 dark:text-${activeColor}-400 font-bold`}>
                    {activeTarget.status}
                  </span>
                </div>
              </div>

              <button className={`w-full mt-8 py-3 rounded-xl border font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-sm ${
                isDark 
                  ? 'border-cyan-500/50 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-white hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                  : 'border-blue-600 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-500/20'
              }`}>
                <Activity className="w-4 h-4" />
                {isAr ? 'بدء الاستحواذ' : 'INITIATE ACQUISITION'}
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
