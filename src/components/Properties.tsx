import { useLanguage } from '../context/LanguageContext';
import { Heart, Sparkles, MapPin, Maximize } from 'lucide-react';

export default function Properties() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const t = {
    title: isAr ? 'عقارات مميزة' : 'Featured Properties',
    subtitle: isAr ? 'عقارات فاخرة مختارة بعناية في مواقع رئيسية' : 'Handpicked luxury properties in prime locations',
    viewAll: isAr ? 'عرض كل العقارات' : 'View All Properties',
  };

  const properties = [
    {
      id: 1,
      title: isAr ? 'فيلا فاخرة في نخلة جميرا' : 'Luxury Villa in Palm Jumeirah',
      location: isAr ? 'دبي' : 'Dubai',
      price: 'AED 15,000,000',
      type: isAr ? 'للبيع' : 'For Sale',
      size: '7,000 sqft',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
      aiMatch: '99%'
    },
    {
      id: 2,
      title: isAr ? 'شقة حديثة في وسط المدينة' : 'Modern Apartment in Downtown',
      location: isAr ? 'دبي' : 'Dubai',
      price: 'AED 180,000 / yr',
      type: isAr ? 'للإيجار' : 'For Rent',
      size: '1,200 sqft',
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80',
      aiMatch: '96%'
    },
    {
      id: 3,
      title: isAr ? 'مكتب تجاري في أبو ظبي' : 'Commercial Office in Abu Dhabi',
      location: isAr ? 'أبو ظبي' : 'Abu Dhabi',
      price: 'AED 95,000 / yr',
      type: isAr ? 'للإيجار' : 'For Rent',
      size: '1,500 sqft',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
      aiMatch: '92%'
    },
    {
      id: 4,
      title: isAr ? 'أرض واسعة في الخوانيج' : 'Spacious Land in Al Khawaneej',
      location: isAr ? 'دبي' : 'Dubai',
      price: 'AED 3,500,000',
      type: isAr ? 'للبيع' : 'For Sale',
      size: '15,000 sqft',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80',
      aiMatch: '88%'
    }
  ];

  return (
    <section id="properties" className="py-24 px-4 sm:px-6 lg:px-8 max-w-[100rem] mx-auto relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 max-w-7xl mx-auto">
        <div>
          <h2 className="text-4xl md:text-7xl font-black mb-4 tracking-tighter text-zinc-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] uppercase transition-colors">{t.title}</h2>
          <p className="text-xl text-blue-600 dark:text-purple-200/60 font-bold uppercase tracking-widest transition-colors">{t.subtitle}</p>
        </div>
        <button className="hidden md:flex glass-pill border border-zinc-200 dark:border-cyan-500/50 text-blue-600 dark:text-cyan-400 px-8 py-4 rounded-full font-bold shadow-sm dark:shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-md dark:hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:bg-zinc-50 dark:hover:bg-cyan-500/10 transition-all uppercase tracking-wider text-sm">
          {t.viewAll}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {properties.map((prop) => (
          <div key={prop.id} className="glass-12d rounded-[3rem] p-6 group hover:shadow-xl dark:hover:shadow-[0_40px_100px_rgba(6,182,212,0.4)] hover:border-blue-300 dark:hover:border-cyan-500/60 transition-all duration-500 relative">
            {/* 12D Portal Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-cyan-500 dark:via-purple-500 dark:to-cyan-500 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 blur-3xl transition-opacity duration-1000 pointer-events-none animate-spin-slow"></div>

            {/* Image Container */}
            <div className="relative h-80 rounded-[2.5rem] overflow-hidden mb-6 border border-zinc-200 dark:border-white/20 shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 dark:from-[#030014]/40 dark:to-[#030014]/90 z-10 pointer-events-none mix-blend-overlay"></div>
              
              <img src={prop.image} alt={prop.title} className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-125" />
              
              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex gap-2 z-20">
                <span className="glass-pill px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-500/50 shadow-sm dark:shadow-[0_0_20px_rgba(6,182,212,0.4)] bg-white/90 dark:bg-black/60 backdrop-blur-xl">
                  {prop.type}
                </span>
                <span className="bg-white/90 dark:bg-black/80 border border-purple-200 dark:border-purple-500/50 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 shadow-sm dark:shadow-[0_0_30px_rgba(168,85,247,0.6)] uppercase tracking-[0.2em]">
                  <Sparkles className="w-4 h-4 animate-ping text-purple-500 dark:text-purple-300" /> 12D Sync {prop.aiMatch}
                </span>
              </div>
              
              <button className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-xl border border-zinc-200 dark:border-white/20 p-3 rounded-full hover:border-pink-400 dark:hover:border-cyan-400 hover:text-pink-500 dark:hover:text-cyan-400 text-zinc-400 dark:text-white transition-all z-20 shadow-sm">
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Content Container */}
            <div className="px-4 pb-4 relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{prop.title}</h3>
                  <div className="flex items-center text-zinc-500 dark:text-zinc-400 gap-1 font-bold uppercase tracking-wider text-xs">
                    <MapPin className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                    {prop.location}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-gold-300 dark:to-yellow-500 drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">{prop.price}</p>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-zinc-100 dark:border-white/10 pt-4 mt-4 transition-colors">
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-cyan-200 font-bold text-xs uppercase tracking-widest bg-blue-50 dark:bg-black/40 border border-blue-100 dark:border-cyan-500/20 px-4 py-2 rounded-xl group-hover:shadow-sm dark:group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-shadow">
                    <Maximize className="w-4 h-4" />
                    {prop.size}
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-500/30 px-4 py-2 rounded-xl group-hover:shadow-sm dark:group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {isAr ? 'عقد ذكي' : 'Smart Contract'}
                  </div>
                </div>
                
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-600/20 dark:to-cyan-600/20 border border-purple-200 dark:border-purple-500/30 hover:border-blue-400 dark:hover:border-cyan-400 text-purple-700 dark:text-purple-300 hover:text-blue-700 dark:hover:text-cyan-300 hover:bg-blue-100 dark:hover:bg-cyan-900/40 hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all flex justify-center items-center gap-2 text-sm font-bold uppercase tracking-widest">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {isAr ? 'عرض الهولوغرام 12D' : 'View 12D Hologram'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center md:hidden">
        <button className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 px-8 py-4 rounded-full font-bold w-full shadow-sm hover:shadow-md transition-all">
          {t.viewAll}
        </button>
      </div>
    </section>
  );
}