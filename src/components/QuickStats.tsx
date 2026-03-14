import { TrendingUp, Home, DollarSign, Users, Building2, Award, CheckCircle, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import AnimatedCounter from './AnimatedCounter';

export default function QuickStats() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const stats = [
    {
      icon: Building2,
      value: 850,
      suffix: '+',
      label: isAr ? 'عقارات فاخرة' : 'Luxury Properties',
      subLabel: isAr ? 'في دبي وأبو ظبي' : 'in Dubai & Abu Dhabi',
      color: 'from-blue-600 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    },
    {
      icon: DollarSign,
      value: 4.2,
      prefix: 'AED ',
      suffix: 'B+',
      label: isAr ? 'قيمة المحفظة' : 'Portfolio Value',
      subLabel: isAr ? 'عقارات متميزة' : 'Premium Assets',
      color: 'from-emerald-600 to-green-500',
      bgColor: 'bg-emerald-50 dark:bg-emerald-900/20',
      borderColor: 'border-emerald-200 dark:border-emerald-800'
    },
    {
      icon: Users,
      value: 2400,
      suffix: '+',
      label: isAr ? 'عملاء راضون' : 'Satisfied Clients',
      subLabel: isAr ? 'عبر الإمارات' : 'Across UAE',
      color: 'from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      borderColor: 'border-purple-200 dark:border-purple-800'
    },
    {
      icon: TrendingUp,
      value: 18,
      suffix: '%',
      label: isAr ? 'متوسط عائد الاستثمار' : 'Avg. ROI',
      subLabel: isAr ? 'نمو سنوي' : 'Annual Growth',
      color: 'from-orange-600 to-red-500',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      borderColor: 'border-orange-200 dark:border-orange-800'
    }
  ];

  return (
    <div className="section-animated-bg py-8 relative">
      {/* Animated decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-20 w-64 h-64 bg-gradient-to-br from-purple-400/20 to-violet-400/20 dark:from-purple-500/25 dark:to-violet-500/25 rounded-full blur-3xl animate-float-orb"></div>
        <div className="absolute bottom-10 right-20 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-400/20 dark:from-violet-500/25 dark:to-purple-500/25 rounded-full blur-3xl animate-float-orb" style={{animationDelay: '10s'}}></div>
      </div>
      
      <div className="space-y-8 relative z-10">
      {/* Enhanced Section Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05, y: -2 }}
          className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-50 via-violet-50 to-purple-50 dark:from-purple-900/30 dark:via-violet-900/30 dark:to-purple-900/30 rounded-full border-2 border-purple-200/60 dark:border-purple-400/30 mb-6 shadow-lg dark:shadow-[0_0_25px_rgba(124,58,237,0.3)] hover:shadow-xl dark:hover:shadow-[0_0_35px_rgba(124,58,237,0.4)] transition-all duration-500 backdrop-blur-sm"
        >
          <Award className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
          <span className="blueberry-text text-sm font-black uppercase tracking-widest">
            {isAr ? 'إنجازاتنا بالأرقام' : 'Our Achievements in Numbers'}
          </span>
          <Award className="w-5 h-5 text-violet-600 dark:text-violet-400 animate-pulse" style={{animationDelay: '0.5s'}} />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {isAr ? 'شريكك الموثوق في العقارات' : 'Your Trusted Real Estate Partner'}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          {isAr 
            ? 'نفخر بخدمة آلاف العملاء وتقديم أفضل العقارات الفاخرة في دبي وأبو ظبي' 
            : 'Proudly serving thousands of clients with the finest luxury properties in Dubai & Abu Dhabi'}
        </motion.p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, scale: 1.03 }}
            className={`card-standard hover-lift group relative`}
          >
            {/* Decorative elements matching contact form */}
            <div className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/10 via-violet-500/10 to-transparent dark:from-purple-500/20 dark:via-violet-500/20 rounded-bl-full`}></div>
            <div className={`absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-violet-500/10 via-purple-500/10 to-transparent dark:from-violet-500/20 dark:via-purple-500/20 rounded-tr-full`}></div>
            
            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none rounded-[3rem]"></div>
            
            {/* Enhanced Icon with Glow */}
            <div className="relative mb-6">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500`}></div>
              <div className={`relative inline-flex p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 icon-float`}>
                <stat.icon className="w-7 h-7" />
              </div>
            </div>
            
            {/* Enhanced Value with Animated Counter */}
            <div className="relative mb-4">
              <div className={`text-5xl md:text-6xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent drop-shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                {stat.prefix && <span>{stat.prefix}</span>}
                <AnimatedCounter end={stat.value} duration={2} />
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
            </div>
            
            {/* Enhanced Label */}
            <div className="relative">
              <div className="text-lg md:text-xl font-black text-gray-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-gray-900 group-hover:to-gray-700 dark:group-hover:from-white dark:group-hover:to-gray-300 transition-all duration-300">
                {stat.label}
              </div>
              <div className="text-sm md:text-base text-gray-600 dark:text-gray-400 font-semibold flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform" />
                {stat.subLabel}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="flex flex-wrap justify-center gap-4 md:gap-6 pt-8"
      >
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full border border-emerald-200 dark:border-emerald-800">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span className="text-xs md:text-sm font-bold text-emerald-700 dark:text-emerald-300">
            {isAr ? 'معتمد من RERA' : 'RERA Certified'}
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-full border border-blue-200 dark:border-blue-800">
          <Globe className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span className="text-xs md:text-sm font-bold text-blue-700 dark:text-blue-300">
            {isAr ? 'خدمات عالمية' : 'Global Services'}
          </span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-full border border-purple-200 dark:border-purple-800">
          <Award className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
          <span className="text-xs md:text-sm font-bold text-purple-700 dark:text-purple-300">
            {isAr ? 'خدمة 24/7' : '24/7 Support'}
          </span>
        </div>
      </motion.div>
      </div>
    </div>
  );
}
