import { CheckCircle2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlueberryTimeline() {
  const steps = [
    {
      title: 'Browse Properties',
      description: 'Explore our curated collection of luxury properties with AI-powered recommendations',
      time: 'Step 1'
    },
    {
      title: 'Schedule Viewing',
      description: 'Book virtual or in-person tours at your convenience with our smart booking system',
      time: 'Step 2'
    },
    {
      title: 'Get Approved',
      description: 'Fast-track financing with our partner banks and instant eligibility checks',
      time: 'Step 3'
    },
    {
      title: 'Close the Deal',
      description: 'Sign smart contracts and complete the purchase with blockchain verification',
      time: 'Step 4'
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-blueberry-light inline-flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4" />
            <span>How It Works</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black blueberry-text mb-6">
            Your Journey to Property Ownership
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Simple, transparent, and efficient process from search to ownership
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative"
            >
              {/* Timeline line */}
              {index < steps.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 via-purple-400 to-indigo-400 dark:from-indigo-500 dark:via-purple-500 dark:to-indigo-500 -mb-8"></div>
              )}
              
              <div className="flex gap-6 items-start">
                {/* Icon */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 blueberry-gradient rounded-full blur-lg opacity-50"></div>
                  <div className="relative w-12 h-12 blueberry-gradient rounded-full flex items-center justify-center shadow-xl">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                {/* Content */}
                <div className="card-compact flex-1 group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/10 via-purple-500/10 to-transparent dark:from-indigo-500/20 dark:via-purple-500/20 rounded-bl-full"></div>
                  
                  <div className="badge-blueberry-light mb-3 inline-block">
                    {step.time}
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
