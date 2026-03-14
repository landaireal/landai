import { Building2, Users, DollarSign, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimatedCounter from './AnimatedCounter';

export default function BlueberryStats() {
  const stats = [
    {
      icon: Building2,
      value: 850,
      suffix: '+',
      label: 'Premium Properties',
      sublabel: 'Curated Collection'
    },
    {
      icon: Users,
      value: 2400,
      suffix: '+',
      label: 'Happy Clients',
      sublabel: 'Worldwide'
    },
    {
      icon: DollarSign,
      value: 4.2,
      prefix: 'AED ',
      suffix: 'B',
      label: 'Portfolio Value',
      sublabel: 'Under Management'
    },
    {
      icon: Award,
      value: 98,
      suffix: '%',
      label: 'Satisfaction Rate',
      sublabel: 'Client Reviews'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-blueberry group hover:scale-105 transition-all duration-500 relative overflow-hidden"
            >
              {/* Shimmer */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none rounded-[3rem]"></div>
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className="absolute inset-0 blueberry-gradient rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                <div className="relative inline-flex p-4 rounded-2xl blueberry-gradient text-white shadow-xl">
                  <stat.icon className="w-8 h-8" />
                </div>
              </div>
              
              {/* Value */}
              <div className="blueberry-text text-5xl font-black mb-2">
                {stat.prefix}
                <AnimatedCounter end={stat.value} duration={2} />
                {stat.suffix}
              </div>
              
              {/* Label */}
              <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
