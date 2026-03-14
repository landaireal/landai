import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlueberryCTA() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-spacious text-center relative overflow-hidden"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 blueberry-gradient-light opacity-50"></div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/20 via-purple-500/20 to-transparent dark:from-indigo-500/30 dark:via-purple-500/30 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/20 via-indigo-500/20 to-transparent dark:from-purple-500/30 dark:via-indigo-500/30 rounded-tr-full"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="badge-blueberry mb-6 mx-auto">
              <Sparkles className="w-4 h-4" />
              <span>Limited Time Offer</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-black blueberry-text mb-6">
              Ready to Find Your Dream Property?
            </h2>
            
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Join thousands of satisfied clients who found their perfect home with our AI-powered platform
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-blueberry inline-flex items-center justify-center gap-2">
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="btn-blueberry-outline">
                Schedule Consultation
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
