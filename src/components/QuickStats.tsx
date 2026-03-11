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
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-full border border-blue-200 dark:border-blue-800 mb-4"
        >
          <Award className="w-3.5 h-3.5 text-blue-600 dark:text-cyan-400" />
          <span className="text-sm font-bold text-blue-600 dark:text-cyan-400 uppercase tracking-wider">
            {isAr ? 'إنجازاتنا بالأرقام' : 'Our Achievements in Numbers'}
          </span>
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
            whileHover={{ y: -5, scale: 1.02 }}
            className={`relative overflow-hidden bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 border ${stat.borderColor} hover:shadow-2xl dark:hover:shadow-[0_20px_60px_-15px_rgba(6,182,212,0.3)] transition-all duration-500 group`}
          >
            {/* Background Gradient Decoration */}
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity`}></div>
            
            {/* Icon */}
            <div className="relative mb-6">
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            
            {/* Value with Animated Counter */}
            <div className="relative mb-3">
              <div className={`text-4xl md:text-5xl font-black bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`}>
                {stat.prefix && <span>{stat.prefix}</span>}
                <AnimatedCounter end={stat.value} duration={2} />
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
            </div>
            
            {/* Label */}
            <div className="relative">
              <div className="text-base md:text-lg font-bold text-gray-900 dark:text-white mb-1">
                {stat.label}
              </div>
              <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400 font-medium flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                {stat.subLabel}
              </div>
            </div>

            {/* Hover Effect Border */}
            <div className={`absolute inset-0 border-2 border-transparent group-hover:border-opacity-50 rounded-2xl transition-all duration-300 pointer-events-none`}></div>
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
  );
}
