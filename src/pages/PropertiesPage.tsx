import { useSearchParams } from 'react-router-dom';
import PropertyList from '../components/PropertyList';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { Sparkles, Search, TrendingUp, Award } from 'lucide-react';
import QuickStats from '../components/QuickStats';
import { motion } from 'framer-motion';

export default function PropertiesPage() {
  const { t } = useLanguage();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <SEO 
        title="Luxury Properties - Land AI Real Estate"
        description="Browse our exclusive collection of premium properties in Dubai & Abu Dhabi. AI-powered search and blockchain verification."
      />
      
      {/* Premium Hero Header */}
      <div className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-purple-600/5 to-pink-600/5 dark:from-blue-600/10 dark:via-purple-600/10 dark:to-pink-600/10"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full mb-6 border border-blue-500/20 dark:border-purple-500/30"
            >
              <Award className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <span className="text-sm font-bold text-blue-600 dark:text-cyan-400">
                Premium Collection
              </span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent leading-tight">
              {t('properties')}
            </h1>
            
            {searchQuery ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700"
              >
                <Sparkles className="w-5 h-5 text-purple-500 dark:text-purple-400" />
                <span className="text-slate-700 dark:text-slate-300">
                  AI search results for
                </span>
                <span className="font-bold text-purple-600 dark:text-purple-400">&quot;{searchQuery}&quot;</span>
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed"
              >
                Browse our exclusive collection of premium properties in Dubai & Abu Dhabi. 
                <span className="block mt-2 text-blue-600 dark:text-cyan-400 font-semibold">
                  AI-powered search • Blockchain verification • Smart contracts
                </span>
              </motion.p>
            )}

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center justify-center gap-4 mt-8"
            >
              <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <Search className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Advanced Filters Available</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                <TrendingUp className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">Live Market Data</span>
              </div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <QuickStats />
          </motion.div>
        </div>
      </div>
      
      {/* Properties List */}
      <div className="container mx-auto px-4 pb-16">
        <PropertyList searchQuery={searchQuery} />
      </div>
    </div>
  );
}
