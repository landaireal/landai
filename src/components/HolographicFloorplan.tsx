import { useLanguage } from '../context/LanguageContext';
import { Layers, Maximize, Eye } from 'lucide-react';

export default function HolographicFloorplan() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[100rem] mx-auto relative z-10">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.05)_0%,transparent_70%)] pointer-events-none blur-2xl transition-colors"></div>

      <div className="flex flex-col items-center text-center mb-16 relative z-10">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-blue-200 dark:border-cyan-500/30 bg-blue-50 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 mb-6 font-bold uppercase tracking-widest shadow-sm dark:shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-colors">
          <Layers className="w-5 h-5 animate-pulse" />
          {isAr ? "مخطط أرضي هولوغرامي" : "Holographic 12D Floorplans"}
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tighter uppercase transition-colors dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">
          {isAr ? "مولد المساحات الكمية" : "Quantum Space Generator"}
        </h2>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl font-light transition-colors">
          {isAr 
            ? "استكشف العقارات من خلال مخططات معمارية مدعومة بالذكاء الاصطناعي تُبنى أمام عينيك." 
            : "Explore properties through AI-powered architectural blueprints that build themselves before your eyes."}
        </p>
      </div>

      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
        {/* Holographic Viewer */}
        <div className="flex-1 w-full relative">
          <div className="glass-12d rounded-[3rem] p-4 relative overflow-hidden border border-blue-200 dark:border-cyan-500/30 shadow-md dark:shadow-[0_0_50px_rgba(6,182,212,0.15)] group transition-colors">
            
            {/* Grid & Scanner Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:30px_30px] opacity-30 transition-colors"></div>
            <div className="absolute inset-0 w-full h-[2px] bg-blue-400/50 dark:bg-cyan-400/50 shadow-[0_0_15px_#3b82f6] dark:shadow-[0_0_20px_#06b6d4] animate-[scanline_3s_linear_infinite] pointer-events-none transition-colors"></div>

            {/* SVG Blueprint */}
            <div className="relative aspect-video w-full flex items-center justify-center p-8 bg-zinc-50/80 dark:bg-[#030014]/60 rounded-[2.5rem] transition-colors">
              <svg viewBox="0 0 400 300" className="w-full h-full drop-shadow-md dark:drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                {/* External Walls */}
                <path 
                  d="M 50 50 L 350 50 L 350 250 L 50 250 Z" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="4" 
                  className="animate-draw-blueprint text-blue-600 dark:text-[#06b6d4]" 
                />
                
                {/* Internal Walls & Rooms */}
                <path 
                  d="M 150 50 L 150 150 L 50 150 M 250 50 L 250 120 L 350 120 M 150 250 L 150 200 L 250 200 L 250 250 M 250 120 L 250 150 L 350 150" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  className="animate-draw-blueprint-delayed text-indigo-500 dark:text-[#8b5cf6]" 
                />

                {/* Doors / Entry Points */}
                <path d="M 190 250 L 210 250" stroke="currentColor" strokeWidth="6" className="text-zinc-200 dark:text-[#030014]" />
                <path d="M 190 250 A 20 20 0 0 1 210 230" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" className="text-blue-400 dark:text-[#22d3ee]" />

                {/* AI Processing Nodes */}
                <circle cx="100" cy="100" r="4" fill="currentColor" className="animate-ping text-blue-500 dark:text-[#06b6d4]" />
                <circle cx="300" cy="85" r="4" fill="currentColor" className="animate-ping text-indigo-500 dark:text-[#8b5cf6]" style={{ animationDelay: '0.5s' }} />
                <circle cx="200" cy="225" r="4" fill="currentColor" className="animate-ping text-blue-500 dark:text-[#06b6d4]" style={{ animationDelay: '1s' }} />
              </svg>
            </div>

            {/* Floating Info Panels inside viewer */}
            <div className="absolute top-8 left-8 bg-white/90 dark:bg-black/60 backdrop-blur-xl px-4 py-2 rounded-xl text-xs font-bold text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-500/30 uppercase tracking-widest flex items-center gap-2 shadow-sm transition-colors">
              <Eye className="w-4 h-4" /> Live Render
            </div>
          </div>
        </div>

        {/* UI Controls */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          <div className="glass-12d p-6 rounded-3xl border border-zinc-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-purple-500/50 transition-colors group cursor-pointer">
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-2 flex items-center gap-3 transition-colors">
              <span className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-purple-500/20 flex items-center justify-center text-indigo-600 dark:text-purple-400 font-black transition-colors">1</span>
              {isAr ? "تحليل الأبعاد" : "Dimension Scan"}
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed pl-11 transition-colors">AI accurately measures room depth, ceiling height, and natural light exposure.</p>
          </div>

          <div className="glass-12d p-6 rounded-3xl border border-blue-200 dark:border-cyan-500/50 shadow-sm dark:shadow-[0_0_20px_rgba(6,182,212,0.2)] group cursor-pointer relative overflow-hidden transition-colors">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 dark:from-cyan-500/10 to-transparent transition-colors"></div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white uppercase tracking-widest mb-2 flex items-center gap-3 relative z-10 transition-colors">
              <span className="w-8 h-8 rounded-full bg-blue-600 dark:bg-cyan-500 flex items-center justify-center text-white dark:text-[#030014] font-black shadow-sm dark:shadow-[0_0_10px_#06b6d4] transition-colors">2</span>
              {isAr ? "محاكاة المساحة" : "Space Simulation"}
            </h3>
            <p className="text-sm text-zinc-600 dark:text-cyan-100/60 font-medium leading-relaxed pl-11 relative z-10 transition-colors">Holographically project your furniture and lifestyle directly into the blueprint.</p>
          </div>

          <button className="w-full mt-4 bg-transparent border-2 border-zinc-300 dark:border-white/20 text-zinc-700 dark:text-white hover:border-blue-500 dark:hover:border-cyan-400 hover:text-blue-600 dark:hover:text-cyan-300 py-5 rounded-2xl font-black tracking-widest uppercase flex items-center justify-center gap-3 transition-all hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]">
            <Maximize className="w-5 h-5" />
            {isAr ? "بدء العرض الثلاثي الأبعاد" : "Launch 3D Render"}
          </button>
        </div>
      </div>
    </section>
  );
}