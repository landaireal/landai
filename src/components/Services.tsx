import { useLanguage } from '../context/LanguageContext';
import { Shield, Wrench, Map, ShoppingBag, TrendingUp, Sparkles, Building2, ChevronRight } from 'lucide-react';

export default function Services() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const t = {
    title: isAr ? 'خدماتنا المميزة' : 'Our Premium Services',
    subtitle: isAr ? 'نقدم خدمات عقارية شاملة عبر دبي وأبو ظبي' : 'We provide comprehensive real estate services across Dubai and Abu Dhabi',
    services: [
      {
        icon: <Building2 className="w-12 h-12" />,
        title: isAr ? 'الوساطة العقارية' : 'Real Estate Brokerage',
        desc: isAr ? 'شراء وبيع وتأجير العقارات بإرشاد الخبراء.' : 'Buying, selling, and leasing properties with expert guidance.'
      },
      {
        icon: <Shield className="w-12 h-12" />,
        title: isAr ? 'إدارة العقارات' : 'Property Management',
        desc: isAr ? 'حلول إدارة شاملة لأصولك.' : 'Comprehensive management solutions for your assets.'
      },
      {
        icon: <Wrench className="w-12 h-12" />,
        title: isAr ? 'صيانة المباني' : 'Building Maintenance',
        desc: isAr ? 'خدمات صيانة عالية الجودة للحفاظ على قيمة العقار.' : 'Quality maintenance services to preserve property value.'
      },
      {
        icon: <Map className="w-12 h-12" />,
        title: isAr ? 'تجارة الأراضي' : 'Land Trading',
        desc: isAr ? 'شراء وبيع استراتيجي لقطع الأراضي المميزة.' : 'Strategic buying and selling of prime land plots.'
      },
      {
        icon: <ShoppingBag className="w-12 h-12" />,
        title: isAr ? 'التجارة الإلكترونية' : 'E-Commerce',
        desc: isAr ? 'التسويق عبر منصات التواصل الاجتماعي.' : 'Marketing via social media platforms.'
      },
      {
        icon: <TrendingUp className="w-12 h-12" />,
        title: isAr ? 'تحليل الاستثمار' : 'Investment Analysis',
        desc: isAr ? 'رؤى مدعومة بالذكاء الاصطناعي لتعظيم العوائد.' : 'AI-powered insights to maximize your returns.'
      }
    ]
  };

  return (
    <section id="services" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto section-animated-bg">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-purple-500/20 via-violet-500/15 to-transparent dark:from-purple-500/30 dark:via-violet-500/25 rounded-full blur-3xl animate-float-orb"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-violet-500/20 via-purple-500/15 to-transparent dark:from-violet-500/30 dark:via-purple-500/25 rounded-full blur-3xl animate-float-orb" style={{animationDelay: '8s'}}></div>
      </div>

      <div className="text-center mb-20 relative z-10">
        {/* Premium Badge with Animation */}
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 dark:from-cyan-500/20 dark:via-purple-500/20 dark:to-pink-500/20 rounded-full mb-8 border border-blue-500/20 dark:border-cyan-500/30 backdrop-blur-xl animate-pulse">
          <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-spin" style={{animationDuration: '3s'}} />
          <span className="blueberry-text text-sm font-black uppercase tracking-widest">
            {isAr ? 'خدمات مميزة' : 'Premium Services'}
          </span>
          <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400 animate-spin" style={{animationDuration: '3s', animationDirection: 'reverse'}} />
        </div>
        
        <h2 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter blueberry-text dark:drop-shadow-[0_0_30px_rgba(102,126,234,0.6)] uppercase transition-all hover:scale-105 duration-500 cursor-default">
          {t.title}
        </h2>
        <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 max-w-3xl mx-auto font-semibold leading-relaxed">
          {t.subtitle}
        </p>
        
        {/* Decorative Line */}
        <div className="mt-8 flex items-center justify-center gap-3">
          <div className="h-1 w-20 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 rounded-full"></div>
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <div className="h-1 w-20 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent rounded-full"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
        {/* Large Featured Card (Spans 2x2) - PREMIUM */}
        <div className="bento-card md:col-span-2 lg:col-span-2 lg:row-span-2 text-zinc-900 dark:text-white group flex flex-col justify-end p-10 hover:border-blue-400 dark:hover:border-cyan-400 relative overflow-hidden">
          {/* Animated Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-white dark:from-cyan-500/10 dark:via-purple-500/5 dark:to-orange-500/10 transition-all duration-700 pointer-events-none group-hover:scale-110"></div>
          
          {/* Floating Particles Effect */}
          <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 dark:bg-cyan-400 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-20 right-20 w-2 h-2 bg-purple-400 dark:bg-purple-400 rounded-full animate-ping opacity-75" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-20 left-20 w-2 h-2 bg-pink-400 dark:bg-pink-400 rounded-full animate-ping opacity-75" style={{animationDelay: '1s'}}></div>
          
          {/* Large Icon Background */}
          <div className="absolute top-0 right-0 p-10 opacity-5 dark:opacity-10 text-blue-600 dark:text-cyan-400 group-hover:scale-125 group-hover:rotate-12 group-hover:opacity-20 transition-all duration-1000">
            {t.services[0].icon}
          </div>
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          
          <div className="relative z-10">
            {/* Premium Icon Badge */}
            <div className="bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-blue-500 dark:to-purple-600 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 shadow-2xl dark:shadow-[0_0_40px_rgba(6,182,212,0.8)] group-hover:shadow-[0_0_60px_rgba(99,102,241,0.8)] dark:group-hover:shadow-[0_0_60px_rgba(6,182,212,1)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-6">
              <Sparkles className="w-10 h-10 text-white animate-pulse" />
            </div>
            
            <h3 className="text-6xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-blue-900 to-purple-900 dark:from-white dark:via-cyan-200 dark:to-purple-200 group-hover:scale-105 transition-transform duration-500">{t.services[0].title}</h3>
            <p className="text-zinc-700 dark:text-zinc-300 text-lg max-w-md leading-relaxed font-semibold">{t.services[0].desc}</p>
            
            {/* Premium Badge */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-400 dark:from-amber-500 dark:via-orange-500 dark:to-amber-500 rounded-full text-sm font-black text-white shadow-lg">
              <span>★</span> FEATURED <span>★</span>
            </div>
          </div>
        </div>

        {/* Medium Horizontal Card (Spans 2x1) - LUXURY */}
        <div className="bento-card md:col-span-1 lg:col-span-2 group flex items-center gap-8 border-indigo-200 dark:border-purple-500/30 hover:border-indigo-400 dark:hover:border-purple-400/80 relative overflow-hidden">
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/0 via-purple-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
          
          {/* Icon Container with Luxury Effects */}
          <div className="relative">
            <div className="absolute inset-0 bg-indigo-500 dark:bg-purple-500 rounded-3xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500"></div>
            <div className="relative bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-50 dark:from-purple-900/40 dark:via-indigo-900/40 dark:to-purple-900/40 border-2 border-indigo-200 dark:border-purple-500/50 text-indigo-600 dark:text-purple-400 p-7 rounded-3xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl dark:shadow-[0_5px_25px_rgba(168,85,247,0.4)] backdrop-blur-sm">
              {t.services[1].icon}
            </div>
          </div>
          
          <div className="relative z-10 flex-1">
            <h3 className="text-4xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-indigo-900 to-purple-900 dark:from-white dark:via-purple-200 dark:to-pink-200 group-hover:scale-105 transition-transform duration-300">{t.services[1].title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 font-semibold text-sm leading-relaxed">{t.services[1].desc}</p>
          </div>
        </div>

        {/* Luxury Square Cards with Premium Animations */}
        {t.services.slice(2, 6).map((service, idx) => (
          <div key={idx} className="bento-card group flex flex-col justify-between border-blue-100 dark:border-cyan-500/20 hover:border-blue-400 dark:hover:border-cyan-400/80 relative overflow-hidden cursor-pointer">
            {/* Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-cyan-900/20 dark:via-purple-900/20 dark:to-pink-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 dark:via-white/10 to-transparent translate-x-[-100%] translate-y-[-100%] group-hover:translate-x-[100%] group-hover:translate-y-[100%] transition-transform duration-1000"></div>
            
            {/* Floating Icon Badge */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500 dark:bg-cyan-500 rounded-2xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
              <div className="relative bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-900/40 dark:via-indigo-900/40 dark:to-purple-900/40 border-2 border-blue-200 dark:border-cyan-500/30 text-blue-600 dark:text-cyan-400 p-5 rounded-2xl w-fit group-hover:scale-110 group-hover:-rotate-6 group-hover:border-blue-400 dark:group-hover:border-cyan-400 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-purple-500 dark:group-hover:from-cyan-500 dark:group-hover:to-blue-500 group-hover:text-white dark:group-hover:text-black transition-all duration-500 shadow-lg dark:shadow-[0_5px_20px_rgba(6,182,212,0.3)] group-hover:shadow-2xl dark:group-hover:shadow-[0_10px_40px_rgba(6,182,212,0.6)] backdrop-blur-sm z-10">
                {service.icon}
              </div>
            </div>
            
            <div className="relative z-10 mt-8">
              <h3 className="text-2xl md:text-3xl font-black mb-3 text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-blue-900 to-purple-900 dark:from-white dark:via-cyan-200 dark:to-purple-200 group-hover:scale-105 transition-transform duration-300">{service.title}</h3>
              <p className="text-zinc-600 dark:text-zinc-400 font-semibold text-sm leading-relaxed">{service.desc}</p>
              
              {/* Hover Arrow */}
              <div className="mt-4 flex items-center gap-2 text-blue-600 dark:text-cyan-400 opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-300">
                <span className="text-xs font-black uppercase tracking-wider">{isAr ? 'اعرف المزيد' : 'Explore'}</span>
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            
            {/* Corner Accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/10 dark:from-cyan-500/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
}