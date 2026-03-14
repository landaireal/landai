import { ChevronDown, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function BlueberryFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does the AI-powered property search work?",
      answer: "Our AI analyzes your preferences, budget, and lifestyle to recommend properties that match your exact needs. It learns from your interactions to provide increasingly accurate suggestions over time."
    },
    {
      question: "Are all properties blockchain-verified?",
      answer: "Yes, every property on our platform undergoes blockchain verification to ensure authenticity, clear ownership, and transparent transaction history. This provides you with complete peace of mind."
    },
    {
      question: "What financing options are available?",
      answer: "We partner with leading UAE banks to offer competitive mortgage rates, instant pre-approval, and flexible payment plans. Our financial advisors can help you find the best option for your situation."
    },
    {
      question: "Can I schedule virtual property tours?",
      answer: "Absolutely! All our properties offer immersive 3D virtual tours, and you can schedule live virtual walkthroughs with our agents at your convenience. We also offer AR viewing for select properties."
    },
    {
      question: "What are the fees and commissions?",
      answer: "We maintain transparent pricing with no hidden fees. Buyer commission is typically 2% of the property value, and we offer special rates for investors purchasing multiple properties."
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="badge-blueberry-light inline-flex items-center gap-2 mb-6">
            <HelpCircle className="w-4 h-4" />
            <span>FAQ</span>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-black blueberry-text mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to know about our platform
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`card-compact cursor-pointer transition-all duration-300 ${
                openIndex === index ? 'blueberry-border' : ''
              }`}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              {/* Question */}
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown className={`w-6 h-6 ${
                    openIndex === index 
                      ? 'text-indigo-600 dark:text-indigo-400' 
                      : 'text-gray-400 dark:text-gray-600'
                  }`} />
                </motion.div>
              </div>

              {/* Answer */}
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="mt-4 text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Still have questions?
          </p>
          <button className="btn-blueberry-outline">
            Contact Support
          </button>
        </div>
      </div>
    </section>
  );
}
