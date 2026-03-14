import { Mail, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function BlueberryNewsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <section className="py-20 px-4 blueberry-section-bg">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="card-blueberry text-center relative overflow-hidden"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-indigo-500/20 via-purple-500/20 to-transparent dark:from-indigo-500/30 dark:via-purple-500/30 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-purple-500/20 via-indigo-500/20 to-transparent dark:from-purple-500/30 dark:via-indigo-500/30 rounded-tr-full"></div>
          
          {/* Content */}
          <div className="relative z-10">
            <div className="inline-flex p-4 blueberry-gradient rounded-2xl mb-6 shadow-xl">
              <Mail className="w-8 h-8 text-white" />
            </div>
            
            <h2 className="text-4xl md:text-5xl font-black blueberry-text mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-xl mx-auto">
              Get exclusive property listings, market insights, and investment tips delivered to your inbox
            </p>
            
            {subscribed ? (
              <div className="alert-blueberry max-w-md mx-auto">
                <div className="flex items-center gap-3 justify-center">
                  <div className="w-6 h-6 blueberry-gradient rounded-full flex items-center justify-center">
                    <Send className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-indigo-700 dark:text-indigo-300">
                    Thanks for subscribing! Check your email.
                  </span>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex gap-3">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email..."
                    required
                    className="flex-1 px-6 py-4 rounded-2xl border-2 border-indigo-200 dark:border-indigo-800 bg-white dark:bg-zinc-950 focus:border-indigo-500 dark:focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/30 transition-all duration-400 font-medium text-gray-900 dark:text-white"
                  />
                  <button type="submit" className="btn-blueberry px-8">
                    Subscribe
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-500 mt-3">
                  We respect your privacy. Unsubscribe anytime.
                </p>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
