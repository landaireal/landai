import { Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlueberryPricing() {
  const plans = [
    {
      name: 'Starter',
      price: '99',
      period: 'month',
      description: 'Perfect for first-time buyers',
      features: [
        'Access to 100+ properties',
        'Basic property analytics',
        'Email support',
        'Property alerts',
        'Mobile app access'
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: '299',
      period: 'month',
      description: 'Best for serious investors',
      features: [
        'Unlimited property access',
        'Advanced AI analytics',
        'Priority 24/7 support',
        'Investment insights',
        'Portfolio management',
        'Market predictions',
        'Exclusive listings'
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For institutional investors',
      features: [
        'Everything in Professional',
        'Dedicated account manager',
        'Custom integrations',
        'API access',
        'White-label solutions',
        'Advanced reporting'
      ],
      popular: false
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
            className="badge-blueberry-light inline-flex items-center gap-2 mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span>Pricing Plans</span>
          </motion.div>
          
          <h2 className="text-5xl md:text-6xl font-black blueberry-text mb-6">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Flexible pricing options for every type of property seeker
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${plan.popular ? 'card-blueberry scale-105' : 'card-standard'} relative`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="badge-blueberry">
                    ⭐ Most Popular
                  </div>
                </div>
              )}
              
              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-end justify-center gap-1">
                  {plan.price !== 'Custom' && (
                    <span className="text-gray-600 dark:text-gray-400 text-xl">AED</span>
                  )}
                  <span className="text-5xl font-black blueberry-text">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-gray-600 dark:text-gray-400 mb-1">
                      /{plan.period}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className={`${plan.popular ? 'blueberry-gradient' : 'bg-indigo-100 dark:bg-indigo-900/30'} p-1 rounded-full flex-shrink-0`}>
                      <Check className={`w-4 h-4 ${plan.popular ? 'text-white' : 'text-indigo-600 dark:text-indigo-400'}`} />
                    </div>
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className={plan.popular ? 'btn-blueberry w-full' : 'btn-blueberry-outline w-full'}>
                {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
