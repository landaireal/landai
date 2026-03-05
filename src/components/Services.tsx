import { useLanguage } from '../context/LanguageContext';
import { Shield, Wrench, Map, ShoppingBag, TrendingUp, Sparkles, Building2 } from 'lucide-react';

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
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter text-zinc-900 dark:text-white dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] uppercase transition-colors">{t.title}</h2>
        <p className="text-xl text-blue-600 dark:text-cyan-200/60 max-w-2xl mx-auto font-bold uppercase tracking-widest transition-colors">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[280px]">
        {/* Large Featured Card (Spans 2x2) */}
        <div className="bento-card md:col-span-2 lg:col-span-2 lg:row-span-2 text-zinc-900 dark:text-white group flex flex-col justify-end p-10 hover:border-blue-400 dark:hover:border-cyan-400">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/50 to-white dark:from-cyan-500/10 dark:via-purple-500/5 dark:to-orange-500/10 transition-colors duration-700 pointer-events-none mix-blend-overlay"></div>
          <div className="absolute top-0 right-0 p-10 opacity-10 text-blue-600 dark:text-cyan-400 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700">
            {t.services[0].icon}
          </div>
          <div className="relative z-10">
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-cyan-400 dark:to-blue-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg dark:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-shadow">
              <Sparkles className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h3 className="text-5xl font-black mb-4 text-zinc-900 dark:text-white dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{t.services[0].title}</h3>
            <p className="text-zinc-600 dark:text-zinc-300 text-xl max-w-md leading-relaxed uppercase tracking-wider text-xs font-bold">{t.services[0].desc}</p>
          </div>
        </div>

        {/* Medium Horizontal Card (Spans 2x1) */}
        <div className="bento-card md:col-span-1 lg:col-span-2 group flex items-center gap-8 border-indigo-200 dark:border-purple-500/30 hover:border-indigo-400 dark:hover:border-purple-400/80">
          <div className="bg-indigo-50 dark:bg-black/60 border border-indigo-100 dark:border-purple-500/30 text-indigo-600 dark:text-purple-400 p-6 rounded-3xl group-hover:scale-110 transition-all duration-500 shadow-sm dark:shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
            {t.services[1].icon}
          </div>
          <div>
            <h3 className="text-3xl font-black mb-2 text-zinc-900 dark:text-white dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">{t.services[1].title}</h3>
            <p className="text-zinc-500 dark:text-zinc-400 uppercase tracking-widest text-xs font-bold">{t.services[1].desc}</p>
          </div>
        </div>

        {/* Standard Square Cards */}
        {t.services.slice(2, 6).map((service, idx) => (
          <div key={idx} className="bento-card group flex flex-col justify-between border-blue-100 dark:border-cyan-500/20 hover:border-blue-300 dark:hover:border-cyan-400/60">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-50/50 dark:from-cyan-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="bg-blue-50 dark:bg-black/40 border border-blue-100 dark:border-white/10 text-blue-600 dark:text-cyan-400 p-4 rounded-2xl w-fit group-hover:bg-blue-500 dark:group-hover:bg-cyan-500 group-hover:text-white dark:group-hover:text-black transition-all duration-500 shadow-sm dark:shadow-[0_5px_15px_rgba(0,0,0,0.5)] relative z-10">
              {service.icon}
            </div>
            <div className="relative z-10 mt-6">
              <h3 className="text-2xl font-black mb-2 text-zinc-900 dark:text-white group-hover:text-blue-700 dark:group-hover:text-cyan-300 transition-colors">{service.title}</h3>
              <p className="text-zinc-500 dark:text-zinc-500 uppercase tracking-widest text-[10px] font-bold">{service.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}