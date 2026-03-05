import { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Leaf, Droplets, Sun, Wind, Cpu } from 'lucide-react';

export default function TerraformAI() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const { language } = useLanguage();
  const [progress, setProgress] = useState(0);

  const text = {
    en: {
      title: "12D CLIMATE TERRAFORMING",
      subtitle: "AI ENVIRONMENTAL MANIPULATION",
      desc: "Drag the slider to see how our AI predicts and terraforms barren land into level-5 sustainable luxury eco-cities.",
      barren: "BARREN PLOT",
      eco: "SMART ECO-CITY",
      stats: {
        temp: "Micro-Climate",
        water: "Water Gen",
        energy: "Energy",
        air: "Air Purity"
      }
    },
    ar: {
      title: "12D إعادة تأهيل المناخ",
      subtitle: "التلاعب البيئي بالذكاء الاصطناعي",
      desc: "اسحب شريط التمرير لرؤية كيف يتوقع الذكاء الاصطناعي لدينا ويحول الأراضي القاحلة إلى مدن بيئية فاخرة ومستدامة من المستوى الخامس.",
      barren: "أرض قاحلة",
      eco: "مدينة ذكية بيئية",
      stats: {
        temp: "المناخ المحلي",
        water: "توليد المياه",
        energy: "الطاقة",
        air: "نقاء الهواء"
      }
    }
  };

  const t = text[language as keyof typeof text];

  // Calculate colors based on progress
  const getGradient = () => {
    if (progress < 30) return 'from-amber-700 via-orange-500 to-yellow-500'; // Desert
    if (progress < 70) return 'from-emerald-700 via-teal-500 to-cyan-500'; // Terraforming
    return 'from-green-500 via-emerald-400 to-teal-400'; // Eco City
  };

  const getStatusText = () => {
    if (progress < 30) return "Desert Arid State";
    if (progress < 70) return "Active Terraforming Matrix...";
    return "Level 5 Eco-Optimization Reached";
  };

  return (
    <section className={`py-24 relative overflow-hidden ${isDarkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 tracking-tight ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">
              {t.title}
            </span>
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
            {t.desc}
          </p>
        </div>

        <div className={`p-8 rounded-[2rem] border ${
          isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200 shadow-xl'
        } backdrop-blur-xl transition-all duration-500`}>
          
          {/* Visualizer Display */}
          <div className={`h-64 rounded-2xl mb-8 relative overflow-hidden transition-all duration-700 bg-gradient-to-br ${getGradient()}`}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            
            {/* AI Grid Overlay */}
            <div className="absolute inset-0 border-[1px] border-white/20" style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>

            {/* Status Text in Visualizer */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
              <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                <span className="text-white font-mono text-sm flex items-center gap-2">
                  <Cpu className={`w-4 h-4 ${progress > 0 && progress < 100 ? 'animate-spin text-cyan-400' : 'text-white'}`} />
                  {getStatusText()}
                </span>
              </div>
              <div className="text-white font-bold text-4xl drop-shadow-lg">
                {progress}%
              </div>
            </div>
          </div>

          {/* Interactive Slider */}
          <div className="mb-12">
            <div className="flex justify-between text-sm font-bold tracking-widest mb-4">
              <span className={isDarkMode ? 'text-orange-400' : 'text-orange-600'}>{t.barren}</span>
              <span className={isDarkMode ? 'text-emerald-400' : 'text-emerald-600'}>{t.eco}</span>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progress}
              onChange={(e) => setProgress(parseInt(e.target.value))}
              className="w-full h-3 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
            />
          </div>

          {/* Live Stats Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <Sun className={`w-8 h-8 mb-2 ${progress < 50 ? 'text-orange-500' : 'text-yellow-400'}`} />
              <p className={`text-xs uppercase tracking-widest mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.stats.temp}</p>
              <p className={`font-mono font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {Math.max(22, 45 - (progress * 0.23)).toFixed(1)}°C
              </p>
            </div>
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <Droplets className={`w-8 h-8 mb-2 ${progress < 30 ? 'text-slate-600' : 'text-blue-400'}`} />
              <p className={`text-xs uppercase tracking-widest mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.stats.water}</p>
              <p className={`font-mono font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {(progress * 1500).toLocaleString()} L/day
              </p>
            </div>
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <Wind className={`w-8 h-8 mb-2 ${progress < 50 ? 'text-slate-500' : 'text-cyan-400'}`} />
              <p className={`text-xs uppercase tracking-widest mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.stats.air}</p>
              <p className={`font-mono font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {Math.min(99.9, 40 + (progress * 0.6)).toFixed(1)}%
              </p>
            </div>
            <div className={`p-4 rounded-xl border ${isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
              <Leaf className={`w-8 h-8 mb-2 ${progress < 70 ? 'text-slate-600' : 'text-green-500'}`} />
              <p className={`text-xs uppercase tracking-widest mb-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{t.stats.energy}</p>
              <p className={`font-mono font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                {progress < 20 ? '0' : '100'}% Solar
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
