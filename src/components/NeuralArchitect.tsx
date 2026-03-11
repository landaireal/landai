import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Cpu, Zap, Box, Hexagon, Sparkles } from 'lucide-react';

export default function NeuralArchitect() {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const isDark = theme === 'dark';
  const isAr = language === 'ar';

  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGenerate = () => {
    setGenerating(true);
    setProgress(0);
  };

  useEffect(() => {
    if (generating) {
      const interval = setInterval(() => {
        setProgress(p => {
          if (p >= 100) {
            clearInterval(interval);
            setTimeout(() => setGenerating(false), 1000);
            return 100;
          }
          return p + 5;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [generating]);

  return (
    <section className={`py-24 relative overflow-hidden transition-colors duration-500 ${isDark ? 'text-white bg-[#030014]' : 'text-slate-900 bg-slate-50'}`}>
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
           style={{
             backgroundImage: isDark 
               ? 'radial-gradient(circle at 50% 50%, #8b5cf6 0%, transparent 50%), linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)'
               : 'radial-gradient(circle at 50% 50%, #3b82f6 0%, transparent 50%), linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
             backgroundSize: '100% 100%, 40px 40px, 40px 40px'
           }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-6 transition-colors">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wider uppercase">
              {isAr ? '12D المهندس المعماري العصبي' : '12D Neural Architect'}
            </span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 font-serif transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
            {isAr ? 'توليد مساحات الكم' : 'Quantum Space Generation'}
          </h2>
          <p className={`text-xl max-w-2xl mx-auto transition-colors ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
            {isAr 
              ? 'استخدم الذكاء الاصطناعي الخاص بنا لتوليد وتصور عقار أحلامك في الوقت الفعلي بأبعاد 12D.' 
              : 'Use our proprietary AI to generate and visualize your dream property in real-time 12D.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Controls Panel */}
          <div className={`p-8 rounded-[2rem] border backdrop-blur-2xl transition-all duration-500 shadow-xl ${
            isDark ? 'bg-slate-900/50 border-white/10 dark:shadow-[0_0_50px_rgba(168,85,247,0.1)]' : 'bg-white border-slate-200 shadow-blue-500/5'
          }`}>
            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <Cpu className={`w-6 h-6 transition-colors ${isDark ? 'text-cyan-400' : 'text-blue-600'}`} />
              {isAr ? 'معلمات الذكاء الاصطناعي' : 'AI Parameters'}
            </h3>

            <div className="space-y-8">
              {/* Slider 1 */}
              <div>
                <div className="flex justify-between mb-2 text-sm font-semibold">
                  <span>{isAr ? 'الجماليات المستقبلية' : 'Futuristic Aesthetics'}</span>
                  <span className={isDark ? 'text-cyan-400' : 'text-blue-600'}>88%</span>
                </div>
                <div className={`h-2 rounded-full transition-colors ${isDark ? 'bg-slate-800' : 'bg-slate-200'} overflow-hidden`}>
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[88%] relative">
                    <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/50 blur-[2px] animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Slider 2 */}
              <div>
                <div className="flex justify-between mb-2 text-sm font-semibold">
                  <span>{isAr ? 'الاستدامة والطبيعة' : 'Biophilic Integration'}</span>
                  <span className={isDark ? 'text-emerald-400' : 'text-emerald-600'}>94%</span>
                </div>
                <div className={`h-2 rounded-full transition-colors ${isDark ? 'bg-slate-800' : 'bg-slate-200'} overflow-hidden`}>
                  <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 w-[94%] relative">
                    <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/50 blur-[2px] animate-pulse"></div>
                  </div>
                </div>
              </div>

              {/* Slider 3 */}
              <div>
                <div className="flex justify-between mb-2 text-sm font-semibold">
                  <span>{isAr ? 'تكنولوجيا المنزل الذكي' : 'Smart Tech Matrix'}</span>
                  <span className={isDark ? 'text-purple-400' : 'text-purple-600'}>100%</span>
                </div>
                <div className={`h-2 rounded-full transition-colors ${isDark ? 'bg-slate-800' : 'bg-slate-200'} overflow-hidden`}>
                  <div className="h-full bg-gradient-to-r from-purple-400 to-pink-500 w-[100%] relative">
                    <div className="absolute top-0 right-0 bottom-0 w-4 bg-white/50 blur-[2px] animate-pulse"></div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={generating}
                className={`w-full py-4 mt-8 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group ${
                  isDark 
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-500 text-white hover:shadow-[0_0_30px_rgba(6,182,212,0.4)]' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:shadow-blue-500/20'
                }`}
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                {generating ? (
                  <>
                    <Zap className="w-5 h-5 animate-pulse" />
                    {isAr ? 'جاري المعالجة الكمية...' : 'Quantum Processing...'} {progress}%
                  </>
                ) : (
                  <>
                    <Hexagon className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
                    {isAr ? 'توليد المخطط' : 'Generate Blueprint'}
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Hologram Viewer Panel */}
          <div className="relative aspect-square lg:aspect-auto lg:h-[600px] perspective-1000">
            <div className={`absolute inset-0 rounded-[2rem] border backdrop-blur-md overflow-hidden flex items-center justify-center transform transition-all duration-700 shadow-2xl ${
              isDark ? 'bg-slate-950/80 border-cyan-500/30 dark:shadow-[0_0_50px_rgba(6,182,212,0.1)]' : 'bg-white border-blue-200'
            } ${generating ? 'scale-95' : 'scale-100'}`}>
              
              {generating ? (
                <div className="text-center relative z-10">
                  <div className="relative w-32 h-32 mx-auto mb-6">
                    <div className="absolute inset-0 rounded-full border-t-2 border-r-2 border-cyan-400 animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border-b-2 border-l-2 border-purple-400 animate-spin-slow"></div>
                    <Box className={`w-12 h-12 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-cyan-400' : 'text-blue-600'} animate-pulse`} />
                  </div>
                  <div className={`font-mono text-xl transition-colors ${isDark ? 'text-cyan-400' : 'text-blue-600'}`}>
                    {isAr ? 'تجميع المصفوفة...' : 'COMPILING MATRIX...'}
                  </div>
                  <div className={`text-sm mt-2 font-mono transition-colors ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {Math.floor(Math.random() * 999999)}.HASH.{progress}
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full group">
                  <img 
                    src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                    alt="AI Generated Villa"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  
                  {/* Hologram Overlay Lines */}
                  <div className="absolute inset-0 opacity-30 pointer-events-none hidden dark:block">
                    <div className="w-full h-full border-[1px] border-cyan-400/50 m-4 rounded-xl relative">
                      <div className="absolute top-0 left-1/4 w-px h-full bg-cyan-400/50"></div>
                      <div className="absolute top-1/3 left-0 w-full h-px bg-cyan-400/50"></div>
                    </div>
                  </div>

                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                    <div>
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 text-xs font-mono mb-2 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
                        12D RENDER COMPLETE
                      </div>
                      <h4 className="text-white text-2xl font-bold font-serif">Aura Penthouse V.2</h4>
                    </div>
                    <div className="text-right">
                      <div className="text-cyan-300 font-mono text-sm">ROI PROJECTION</div>
                      <div className="text-white text-xl font-bold">+24.8%</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
