import { useLanguage } from '../context/LanguageContext';
import { Network, Zap, Car, Wind } from 'lucide-react';

export default function SmartCityMatrix() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const t = {
    title: isAr ? 'مصفوفة المدينة الذكية 12D' : '12D Smart City Matrix',
    subtitle: isAr ? 'مزامنة حية مع البنية التحتية في دبي' : 'Live Sync with Dubai Infrastructure',
    grid: isAr ? 'شبكة الطاقة' : 'Energy Grid',
    transit: isAr ? 'حركة المرور الجوية' : 'Drone Traffic',
    air: isAr ? 'جودة الهواء' : 'Air Quality',
    metro: isAr ? 'قرب المترو' : 'Metro Link',
  };

  const metrics = [
    {
      id: 1,
      icon: <Zap className="w-8 h-8 text-yellow-400" />,
      label: t.grid,
      value: "99.8%",
      sub: isAr ? "كفاءة عالية" : "High Efficiency",
      border: "border-yellow-500/30",
      glow: "shadow-[0_0_20px_rgba(250,204,21,0.2)]",
      bar: "bg-yellow-400"
    },
    {
      id: 2,
      icon: <Car className="w-8 h-8 text-rose-400" />,
      label: t.transit,
      value: "Low",
      sub: isAr ? "المرور الجوي صافٍ" : "Clear Airspace",
      border: "border-rose-500/30",
      glow: "shadow-[0_0_20px_rgba(244,63,94,0.2)]",
      bar: "bg-rose-400"
    },
    {
      id: 3,
      icon: <Wind className="w-8 h-8 text-cyan-400" />,
      label: t.air,
      value: "42 AQI",
      sub: isAr ? "هواء نقي" : "Pristine Air",
      border: "border-cyan-500/30",
      glow: "shadow-[0_0_20px_rgba(6,182,212,0.2)]",
      bar: "bg-cyan-400"
    },
    {
      id: 4,
      icon: <Network className="w-8 h-8 text-purple-400" />,
      label: t.metro,
      value: "2m",
      sub: isAr ? "وقت الوصول" : "ETA Walking",
      border: "border-purple-500/30",
      glow: "shadow-[0_0_20px_rgba(168,85,247,0.2)]",
      bar: "bg-purple-400"
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[100rem] mx-auto relative z-10 bg-transparent border-t border-zinc-200 dark:border-white/5">
      <div className="absolute inset-0 bg-transparent dark:bg-gradient-to-t dark:from-[#030014] dark:via-cyan-900/5 dark:to-[#030014] pointer-events-none"></div>

      <div className="flex flex-col md:flex-row justify-between items-center mb-16 relative z-10 max-w-7xl mx-auto">
        <div className="text-center md:text-left mb-8 md:mb-0">
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-zinc-300 dark:border-purple-500/30 bg-transparent dark:bg-purple-500/10 text-zinc-700 dark:text-purple-400 mb-4 font-bold uppercase tracking-widest text-xs shadow-none dark:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <span className="w-2 h-2 rounded-full bg-zinc-600 dark:bg-purple-400 animate-pulse"></span>
            {t.subtitle}
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white tracking-tighter uppercase drop-shadow-none dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] flex items-center gap-4">
            {t.title}
          </h2>
        </div>
        <div className="hidden md:flex">
          <div className="bg-transparent px-6 py-4 rounded-3xl border border-zinc-300 dark:border-white/10 flex gap-6 text-sm font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-500">
            <div className="flex flex-col gap-1">
              <span className="text-zinc-900 dark:text-cyan-400">Node 01</span>
              <span>Online</span>
            </div>
            <div className="w-[1px] h-full bg-zinc-300 dark:bg-white/10"></div>
            <div className="flex flex-col gap-1">
              <span className="text-zinc-900 dark:text-purple-400">Sync Rate</span>
              <span>12ms</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hexagonal/Matrix Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {metrics.map((m) => (
          <div key={m.id} className={`glass-12d p-8 rounded-[2rem] border ${m.border} ${m.glow} hover:scale-105 transition-transform duration-500 cursor-default group relative overflow-hidden`}>
            
            {/* Abstract background sweep */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            
            <div className="flex justify-between items-start mb-8 relative z-10">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 group-hover:border-white/20 transition-colors shadow-inner">
                {m.icon}
              </div>
              <span className="text-[10px] text-zinc-500 font-black tracking-widest uppercase">Live Data</span>
            </div>
            
            <div className="relative z-10">
              <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-1">{m.label}</h4>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-4xl font-black text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">{m.value}</span>
              </div>
              
              <div className="w-full bg-black/50 h-1.5 rounded-full overflow-hidden border border-white/5">
                <div className={`h-full ${m.bar} shadow-[0_0_10px_currentColor] animate-pulse-fast w-[80%]`}></div>
              </div>
              
              <p className="mt-4 text-xs font-bold uppercase tracking-widest text-zinc-500 group-hover:text-zinc-300 transition-colors">
                {m.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}