export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className} group`}>
      {/* Elegant pulsing glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 group-hover:from-cyan-500/30 group-hover:via-blue-500/30 group-hover:to-purple-500/30 blur-3xl rounded-full transition-all duration-1000 pointer-events-none animate-[pulse_6s_ease-in-out_infinite]"></div>

      <svg viewBox="0 0 120 120" className="w-full h-full drop-shadow-[0_0_30px_rgba(6,182,212,0.4)] animate-rotate3d" preserveAspectRatio="xMidYMid meet" style={{ transformStyle: 'preserve-3d', shapeRendering: 'geometricPrecision' }}>
        <defs>
          <linearGradient id="silver-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="50%" stopColor="#94a3b8" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="blue-grad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          
          {/* Professional 12D Gradient for LAND text - Luminous Cyan to White */}
          <linearGradient id="land-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#e0f2fe" />
            <stop offset="100%" stopColor="#bae6fd" />
          </linearGradient>
          
          {/* Professional 12D Gradient for AI text - Glowing Cyan */}
          <linearGradient id="ai-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#06b6d4" />
            <stop offset="50%" stopColor="#0ea5e9" />
            <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          
          {/* Professional 12D Gradient for REAL ESTATE - Subtle Cyan Glow */}
          <linearGradient id="subtitle-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="50%" stopColor="#22d3ee" />
            <stop offset="100%" stopColor="#06b6d4" />
          </linearGradient>
          
          {/* 12D Glow Filter - Enhanced */}
          <filter id="logo-glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          {/* Strong 12D Glow for text */}
          <filter id="text-glow-12d">
            <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur"/>
            <feFlood floodColor="#06b6d4" floodOpacity="0.8" result="color"/>
            <feComposite in="color" in2="blur" operator="in" result="glow"/>
            <feMerge>
              <feMergeNode in="glow"/>
              <feMergeNode in="glow"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Orbital ring - slow rotation */}
        <circle cx="60" cy="60" r="52" fill="none" stroke="url(#blue-grad)" strokeWidth="0.3" className="animate-[spin_20s_linear_infinite] opacity-20" strokeDasharray="8 8" />

        {/* Silver House Frame - gentle float */}
        <g className="animate-[floatGentle_7s_ease-in-out_infinite]" style={{ transformOrigin: '60px 45px' }}>
          <path
            d="M 60 10 L 15 45 L 15 80 L 25 80 L 25 45 L 60 25 L 95 45 L 95 80 L 105 80 L 105 45 Z"
            fill="url(#silver-grad)"
            className="drop-shadow-lg"
            filter="url(#logo-glow)"
          />
        </g>

        {/* 3 Blue Pillars - subtle wave motion */}
        <g className="animate-[wave_5s_ease-in-out_infinite]">
          <rect x="29" y="45" width="9" height="35" fill="url(#blue-grad)" rx="0.5" className="opacity-90" />
          <rect x="42" y="35" width="9" height="45" fill="url(#blue-grad)" rx="0.5" className="opacity-95" />
          <rect x="55" y="25" width="9" height="55" fill="url(#blue-grad)" rx="0.5" />
        </g>

        {/* Right side gray scaffolding */}
        <g className="opacity-80">
          <rect x="85" y="45" width="4" height="35" fill="#94a3b8" rx="0.5" />
          <rect x="64" y="55" width="21" height="3" fill="#94a3b8" rx="0.5" />
        </g>

        {/* AI Badge - orbiting elements with 3D rotation */}
        <g className="animate-[orbit3d_8s_ease-in-out_infinite]" style={{ transformOrigin: '78px 42px' }}>
          {/* Make the circle bigger for better visibility */}
          <circle cx="78" cy="42" r="11" fill="#0ea5e9" className="animate-[breathe_4s_ease-in-out_infinite]" opacity="0.95" />
          <circle cx="78" cy="42" r="13" fill="none" stroke="#0ea5e9" strokeWidth="0.5" className="animate-[spin_12s_linear_infinite] opacity-60" strokeDasharray="3 3" />
          <circle cx="78" cy="42" r="16" fill="none" stroke="#06b6d4" strokeWidth="0.3" className="animate-[spin_16s_linear_reverse_infinite] opacity-40" strokeDasharray="2 5" />
          
          {/* AI text - LARGE, BOLD and CRYSTAL CLEAR */}
          <text 
            x="78" 
            y="47" 
            fontSize="12" 
            fill="#ffffff" 
            fontWeight="900" 
            textAnchor="middle" 
            letterSpacing="0" 
            fontFamily="'Montserrat', 'Arial Black', sans-serif"
            style={{ 
              textRendering: 'optimizeLegibility',
              paintOrder: 'stroke fill'
            }}
            stroke="#0c4a6e" 
            strokeWidth="0.8"
          >
            AI
          </text>
        </g>

        {/* Bottom Text - LAND AI - CRISP AND CLEAR */}
        <g style={{ transformOrigin: '60px 102px' }} className="logo-text-glow">
          {/* Main text - SHARP with CSS glow */}
          <text 
            x="60" 
            y="104" 
            fontFamily="'Montserrat', sans-serif" 
            fontWeight="900" 
            fontSize="22" 
            textAnchor="middle" 
            letterSpacing="1.5"
            style={{ 
              paintOrder: 'stroke fill',
              textRendering: 'optimizeLegibility'
            }}
          >
            <tspan fill="#1e293b" className="dark:fill-white">LAND </tspan>
            <tspan fill="#06b6d4" className="dark:fill-#22d3ee">AI</tspan>
          </text>
        </g>

        {/* Bottom Text - REAL ESTATE - CRISP AND CLEAR */}
        <g className="logo-text-glow">
          {/* Main text - SHARP with CSS glow */}
          <text 
            x="60" 
            y="117" 
            fontFamily="'Montserrat', sans-serif" 
            fontWeight="800" 
            fontSize="10" 
            fill="#0891b2" 
            className="dark:fill-#22d3ee"
            textAnchor="middle" 
            letterSpacing="3.5"
            style={{ 
              paintOrder: 'stroke fill',
              textRendering: 'optimizeLegibility'
            }}
          >
            REAL ESTATE
          </text>
        </g>
      </svg>
    </div>
  );
}
