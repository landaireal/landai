import { Sparkles, Zap, Shield, TrendingUp, Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlueberryFeatures() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Lightning Fast",
      description: "Experience blazing fast property searches powered by advanced AI algorithms"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Secure",
      description: "Bank-level security with blockchain verification for all transactions"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Smart Insights",
      description: "AI-powered analytics help you make informed investment decisions"
    },
    {
      icon: <Star className="w-8 h-8" />,
      title: "Premium Properties",
      description: "Exclusive access to luxury properties in prime locations"
    }
  ];

  return (
    <section className="py-20 px-4 blueberry-section-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-3 badge-blueberry-light mb-6"
          >
            <Sparkles className="w-5 h-5" />
            <span className="uppercase tracking-widest">Why Choose Us</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black blueberry-text mb-6">
            Built for Excellence
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experience the future of real estate with our cutting-edge platform
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-compact group hover:-translate-y-2 hover:border-indigo-400/60 dark:hover:border-indigo-600/60 transition-all duration-500 relative overflow-hidden"
            >
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 via-purple-500/10 to-transparent dark:from-indigo-500/20 dark:via-purple-500/20 rounded-bl-full"></div>
              
              {/* Icon */}
              <div className="relative mb-6">
                <div className="absolute inset-0 blueberry-gradient rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="relative inline-flex p-4 rounded-2xl blueberry-gradient text-white shadow-xl group-hover:scale-110 transition-transform duration-500">
                  {feature.icon}
                </div>
              </div>
              
              {/* Content */}
              <h3 className="text-xl font-black text-gray-900 dark:text-white mb-3 relative z-10">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed relative z-10">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="btn-blueberry">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
}
