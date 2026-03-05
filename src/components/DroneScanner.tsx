import { useLanguage } from '../context/LanguageContext';
import { Scan, ShieldCheck } from 'lucide-react';

export default function DroneScanner() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold tracking-widest uppercase text-sm border border-purple-500/20">
              <Scan className="w-4 h-4" />
              {isAr ? 'المسح بالدرون' : '12D Drone Scan'}
            </div>
            <h2 className="text-4xl md:text-5xl font-black dark:text-white leading-tight">
              {isAr ? 'تقييم العقار عبر الذكاء الاصطناعي' : 'Real-Time AI Drone Property Valuation'}
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              {isAr 
                ? 'تقوم طائراتنا المسيرة المجهزة بالذكاء الاصطناعي بمسح الممتلكات وتحليل أكثر من 1000 نقطة بيانات لتوفير تقييمات دقيقة وفورية.' 
                : 'Our AI-equipped drones scan properties and analyze over 1,000 data points to provide instant, hyper-accurate valuations.'}
            </p>
            <ul className="space-y-4">
              {[
                isAr ? 'التحليل الهيكلي 12D' : '12D Structural Analysis',
                isAr ? 'مسح حراري للأصول' : 'Thermal Asset Scanning',
                isAr ? 'التحقق عبر العقود الذكية' : 'Smart Contract Verification'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-4 text-zinc-700 dark:text-zinc-300 font-medium">
                  <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-cyan-900/40 flex items-center justify-center border border-blue-200 dark:border-cyan-500/30 shadow-[0_0_10px_rgba(6,182,212,0.2)]">
                    <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 relative">
            <div className="relative w-full aspect-square max-w-md mx-auto rounded-full glass-12d border border-purple-500/30 overflow-hidden flex items-center justify-center group">
              {/* Drone Radar Rings */}
              <div className="absolute inset-4 rounded-full border border-cyan-500/20 animate-ping" style={{ animationDuration: '3s' }}></div>
              <div className="absolute inset-12 rounded-full border border-purple-500/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '1s' }}></div>
              <div className="absolute inset-24 rounded-full border border-blue-500/20 animate-ping" style={{ animationDuration: '3s', animationDelay: '2s' }}></div>
              
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579805908127-d0fb02f5a044?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-50 dark:opacity-40 mix-blend-luminosity filter group-hover:scale-110 transition-transform duration-1000"></div>
              
              {/* Center Drone Focus */}
              <div className="relative z-10 w-32 h-32 rounded-full border-2 border-dashed border-cyan-400 animate-[spin_10s_linear_infinite] flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.4)]">
                <div className="w-16 h-16 rounded-full border-2 border-purple-400 animate-[spin_5s_linear_infinite_reverse] flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
                </div>
              </div>

              {/* Data Overlay */}
              <div className="absolute top-1/4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-cyan-500/50 text-cyan-400 text-xs font-mono animate-pulse">
                ALT: 450m
              </div>
              <div className="absolute bottom-1/4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded border border-purple-500/50 text-purple-400 text-xs font-mono animate-pulse" style={{ animationDelay: '0.5s' }}>
                ROI: +18.4%
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
