import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';

export default function Partners() {
  const { isRtl } = useLanguage();

  const partners = [
    { 
      name: "EMAAR", 
      icon: <svg viewBox="0 0 100 100" className="w-16 h-16 mb-3" style={{ filter: 'drop-shadow(0 0 20px rgba(6,182,212,0.6))' }}>
        <defs>
          <linearGradient id="emaar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#0891b2" />
          </linearGradient>
        </defs>
        {/* 12D Layered Triangle */}
        <path d="M50 15 L20 85 L80 85 Z" fill="url(#emaar-grad)" opacity="0.3" className="animate-pulse"/>
        <path d="M50 20 L25 80 L75 80 Z" fill="none" stroke="url(#emaar-grad)" strokeWidth="3"/>
        <path d="M35 55 L65 55" stroke="currentColor" strokeWidth="3" className="animate-pulse"/>
        <circle cx="50" cy="30" r="3" fill="#06b6d4" className="animate-pulse"/>
      </svg>,
      color: "from-cyan-400 to-cyan-600",
      delay: "0s"
    },
    { 
      name: "DAMAC", 
      icon: <svg viewBox="0 0 100 100" className="w-16 h-16 mb-3" style={{ filter: 'drop-shadow(0 0 20px rgba(250,204,21,0.6))' }}>
        <defs>
          <linearGradient id="damac-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
        {/* 12D Cube with depth */}
        <rect x="20" y="20" width="60" height="60" fill="url(#damac-grad)" opacity="0.2" className="animate-pulse"/>
        <rect x="25" y="25" width="50" height="50" fill="none" stroke="url(#damac-grad)" strokeWidth="3" className="animate-[spin_20s_linear_infinite]" style={{ transformOrigin: 'center' }}/>
        <circle cx="50" cy="50" r="12" fill="currentColor" className="animate-[breathe_3s_ease-in-out_infinite]"/>
        <circle cx="50" cy="50" r="20" fill="none" stroke="#fbbf24" strokeWidth="1" opacity="0.5"/>
      </svg>,
      color: "from-yellow-400 to-yellow-600",
      delay: "0.2s"
    },
    { 
      name: "NAKHEEL", 
      icon: <svg viewBox="0 0 100 100" className="w-16 h-16 mb-3" style={{ filter: 'drop-shadow(0 0 20px rgba(59,130,246,0.6))' }}>
        <defs>
          <linearGradient id="nakheel-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
        </defs>
        {/* 12D Orbital rings */}
        <circle cx="50" cy="50" r="35" fill="url(#nakheel-grad)" opacity="0.1" className="animate-pulse"/>
        <circle cx="50" cy="50" r="30" fill="none" stroke="url(#nakheel-grad)" strokeWidth="2" className="animate-[spin_15s_linear_infinite]" strokeDasharray="5 5"/>
        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="2" className="animate-[spin_10s_linear_reverse_infinite]" strokeDasharray="3 3"/>
        <path d="M50 20 L50 80" stroke="#3b82f6" strokeWidth="2"/>
        <path d="M20 50 L80 50" stroke="#3b82f6" strokeWidth="2"/>
        <circle cx="50" cy="50" r="5" fill="#3b82f6" className="animate-pulse"/>
      </svg>,
      color: "from-blue-400 to-blue-600",
      delay: "0.4s"
    },
    { 
      name: "LAND AI",
      isLogo: true,
      delay: "0.5s"
    },
    { 
      name: "MERAAS", 
      icon: <svg viewBox="0 0 100 100" className="w-16 h-16 mb-3" style={{ filter: 'drop-shadow(0 0 20px rgba(239,68,68,0.6))' }}>
        <defs>
          <linearGradient id="meraas-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
        </defs>
        {/* 12D Mountain peaks with layers */}
        <path d="M15 85 L15 25 L45 55 L75 25 L85 85" fill="url(#meraas-grad)" opacity="0.2"/>
        <path d="M20 80 L20 30 L50 60 L80 30 L80 80" fill="none" stroke="url(#meraas-grad)" strokeWidth="3" className="animate-pulse"/>
        <circle cx="20" cy="30" r="3" fill="#f87171" className="animate-pulse" style={{ animationDelay: '0s' }}/>
        <circle cx="50" cy="60" r="3" fill="#f87171" className="animate-pulse" style={{ animationDelay: '0.3s' }}/>
        <circle cx="80" cy="30" r="3" fill="#f87171" className="animate-pulse" style={{ animationDelay: '0.6s' }}/>
      </svg>,
      color: "from-rose-400 to-red-600",
      delay: "0.7s"
    },
    { 
      name: "ALDAR", 
      icon: <svg viewBox="0 0 100 100" className="w-16 h-16 mb-3" style={{ filter: 'drop-shadow(0 0 20px rgba(34,197,94,0.6))' }}>
        <defs>
          <linearGradient id="aldar-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
        {/* 12D Diamond with rotating layers */}
        <path d="M50 10 L90 50 L50 90 L10 50 Z" fill="url(#aldar-grad)" opacity="0.2" className="animate-[spin_25s_linear_infinite]" style={{ transformOrigin: 'center' }}/>
        <path d="M50 15 L85 50 L50 85 L15 50 Z" fill="none" stroke="url(#aldar-grad)" strokeWidth="3"/>
        <path d="M50 25 L75 50 L50 75 L25 50 Z" fill="none" stroke="currentColor" strokeWidth="2" className="animate-[spin_15s_linear_reverse_infinite]" style={{ transformOrigin: 'center' }}/>
        <circle cx="50" cy="50" r="8" fill="#34d399" className="animate-[breathe_4s_ease-in-out_infinite]"/>
      </svg>,
      color: "from-emerald-400 to-green-600",
      delay: "0.9s"
    },
    { 
      name: "SOBHA", 
      icon: <svg viewBox="0 0 100 100" className="w-16 h-16 mb-3" style={{ filter: 'drop-shadow(0 0 20px rgba(168,85,247,0.6))' }}>
        <defs>
          <linearGradient id="sobha-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#7c3aed" />
          </linearGradient>
        </defs>
        {/* 12D Arch with depth layers */}
        <path d="M20 75 C 20 25, 80 25, 80 75" fill="url(#sobha-grad)" opacity="0.2"/>
        <path d="M25 70 C 25 30, 75 30, 75 70" fill="none" stroke="url(#sobha-grad)" strokeWidth="3" className="animate-pulse"/>
        <rect x="42" y="45" width="16" height="35" fill="currentColor" className="animate-[pulse_3s_ease-in-out_infinite]"/>
        <circle cx="50" cy="35" r="4" fill="#a855f7" className="animate-pulse"/>
        <path d="M30 70 L70 70" stroke="#a855f7" strokeWidth="2"/>
      </svg>,
      color: "from-purple-400 to-indigo-600",
      delay: "1.1s"
    },
  ];

  return (
    <section className="py-24 relative z-20 overflow-hidden bg-white dark:bg-slate-900 border-b border-zinc-200 dark:border-white/5 section-premium">
      <div className="absolute inset-0 bg-transparent dark:bg-slate-900 pointer-events-none z-0"></div>
      
      {/* Enhanced Grid Overlay */}
      <div className="absolute inset-0 bg-transparent dark:bg-[linear-gradient(rgba(168,85,247,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] dark:bg-[size:50px_50px] pointer-events-none z-0 opacity-0 dark:opacity-50"></div>
      
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full border-2 border-zinc-300/60 dark:border-cyan-500/30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl text-zinc-800 dark:text-cyan-400 mb-6 font-black uppercase tracking-[0.2em] text-sm shadow-xl dark:shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:scale-105 transition-transform duration-300">
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 dark:bg-cyan-400 animate-pulse dark:shadow-[0_0_15px_#06b6d4]"></span>
            {isRtl ? 'شركاء موثوقون من قبل كبار المطورين' : 'Trusted by Top UAE Developers'}
            <span className="w-2.5 h-2.5 rounded-full bg-zinc-600 dark:bg-purple-400 animate-pulse dark:shadow-[0_0_15px_#a855f7]" style={{ animationDelay: '0.5s' }}></span>
          </div>
        </div>
        
        {/* 12D Moving Floating Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-6 md:gap-8" style={{ perspective: '1000px' }}>
          {partners.map((partner, idx) => (
            <div 
              key={idx} 
              className={`glass-12d rounded-[2rem] flex flex-col items-center justify-center relative group overflow-hidden border transition-all duration-700 cursor-pointer ${
                partner.isLogo 
                  ? 'p-4 md:p-6 border-cyan-400/50 dark:border-cyan-400/50 shadow-xl dark:shadow-[0_0_60px_rgba(6,182,212,0.5)] hover:shadow-2xl dark:hover:shadow-[0_0_80px_rgba(6,182,212,0.7)] scale-110 hover:scale-125' 
                  : 'p-6 md:p-8 border-zinc-200 dark:border-white/5 hover:border-zinc-400 dark:hover:border-cyan-400/50 hover:shadow-lg dark:hover:shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:-translate-y-4'
              }`}
              style={{ 
                animation: `float-12d ${partner.isLogo ? '5s' : '6s'} ease-in-out infinite`,
                animationDelay: partner.delay
              }}
            >
              {/* Spinning 12D Aura */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-2xl transition-all duration-700 animate-spin-slow pointer-events-none ${
                partner.isLogo 
                  ? 'bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-purple-500/30 dark:from-cyan-500/40 dark:via-blue-500/40 dark:to-purple-500/40' 
                  : 'bg-transparent dark:bg-cyan-500/0 dark:group-hover:bg-cyan-500/20'
              }`}></div>
              
              {/* Internal Holographic Glow */}
              <div className={`absolute inset-0 bg-gradient-to-b transition-opacity duration-700 pointer-events-none ${
                partner.isLogo 
                  ? 'from-cyan-500/10 via-blue-500/10 to-purple-500/10 dark:from-cyan-500/20 dark:via-blue-500/20 dark:to-purple-500/20 opacity-100' 
                  : 'from-transparent to-transparent dark:to-purple-500/10 opacity-0 group-hover:opacity-100'
              }`}></div>

              {partner.isLogo ? (
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <Logo className="w-20 h-20 md:w-24 md:h-24" />
                </div>
              ) : (
                <div className={`relative z-10 flex flex-col items-center group-hover:scale-110 transition-transform duration-500`}>
                  <div className="text-zinc-500 dark:text-zinc-500 group-hover:text-zinc-700 dark:group-hover:text-cyan-300 transition-colors duration-500">
                    {partner.icon}
                  </div>
                  <span className="font-black tracking-[0.2em] text-xs md:text-sm text-zinc-600 dark:text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors dark:group-hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] mt-2">
                    {partner.name}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}