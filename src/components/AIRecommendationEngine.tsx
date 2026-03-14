import { useState, useEffect } from 'react';
import { Sparkles, TrendingUp, Heart, DollarSign, MapPin, Home, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import type { Property } from '../services/api';

interface Props {
  userPreferences?: {
    budget?: number;
    location?: string;
    type?: string;
    bedrooms?: number;
  };
  currentProperty?: Property;
}

export default function AIRecommendationEngine({ userPreferences, currentProperty }: Props) {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [isOpen, setIsOpen] = useState(false);
  const [recommendations, setRecommendations] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState({
    matchScore: 0,
    reason: '',
    trend: '',
    investment: ''
  });

  useEffect(() => {
    if (isOpen) {
      generateRecommendations();
    }
  }, [isOpen, userPreferences]);

  const generateRecommendations = async () => {
    setLoading(true);
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock AI recommendations (would connect to real AI service)
    const mockRecommendations: Property[] = [
      {
        id: 'ai-rec-1',
        title: 'Luxury Penthouse - Dubai Marina',
        location: 'Dubai Marina',
        price: 4500000,
        currency: 'AED',
        bedrooms: 4,
        bathrooms: 4,
        area: 3200,
        areaUnit: 'sqft',
        type: 'penthouse',
        image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750',
        images: [],
        description: 'AI-selected premium penthouse',
        features: ['Smart Home', 'Rooftop Pool', 'City Views'],
        blockchain_verified: true,
        ai_score: 9.5,
        available: true
      }
    ];

    setRecommendations(mockRecommendations);
    
    setAiInsights({
      matchScore: 95,
      reason: 'Based on your search history and preferences',
      trend: 'Price expected to increase 12% in next 6 months',
      investment: 'High ROI potential - similar properties appreciated 15% last year'
    });
    
    setLoading(false);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 hover:from-purple-700 hover:via-pink-700 hover:to-rose-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
        <Sparkles className="w-5 h-5 relative z-10 animate-pulse" />
        <span className="relative z-10">{isAr ? 'توصيات الذكاء الاصطناعي' : 'AI Recommendations'}</span>
      </motion.button>

      {/* AI Recommendations Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border-2 border-purple-500/30 shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-900/90 to-pink-900/90 backdrop-blur-xl border-b border-white/10 p-6 z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl">
                      <Sparkles className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-black text-white">
                        {isAr ? 'توصيات الذكاء الاصطناعي' : 'AI-Powered Recommendations'}
                      </h2>
                      <p className="text-white/70 text-sm md:text-base">
                        {isAr ? 'عقارات مختارة خصيصاً لك' : 'Properties curated just for you'}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all hover:rotate-90 duration-300"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-20">
                    <div className="relative">
                      <div className="w-24 h-24 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                      <Sparkles className="w-12 h-12 text-purple-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                    </div>
                    <p className="text-white mt-6 text-lg font-semibold">
                      {isAr ? 'الذكاء الاصطناعي يحلل تفضيلاتك...' : 'AI analyzing your preferences...'}
                    </p>
                    <p className="text-white/60 mt-2">
                      {isAr ? 'جاري البحث عن أفضل العقارات' : 'Finding the best properties for you'}
                    </p>
                  </div>
                ) : (
                  <>
                    {/* AI Insights */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/30 rounded-2xl p-6"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <Heart className="w-6 h-6 text-pink-400" />
                          <span className="text-white/70 font-semibold">{isAr ? 'التطابق' : 'Match Score'}</span>
                        </div>
                        <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                          {aiInsights.matchScore}%
                        </div>
                        <p className="text-white/60 text-sm mt-2">{aiInsights.reason}</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/30 rounded-2xl p-6"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <TrendingUp className="w-6 h-6 text-cyan-400" />
                          <span className="text-white/70 font-semibold">{isAr ? 'الاتجاه' : 'Market Trend'}</span>
                        </div>
                        <p className="text-cyan-300 text-sm font-semibold leading-relaxed">{aiInsights.trend}</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border-2 border-emerald-500/30 rounded-2xl p-6"
                      >
                        <div className="flex items-center gap-3 mb-3">
                          <DollarSign className="w-6 h-6 text-emerald-400" />
                          <span className="text-white/70 font-semibold">{isAr ? 'الاستثمار' : 'Investment'}</span>
                        </div>
                        <p className="text-emerald-300 text-sm font-semibold leading-relaxed">{aiInsights.investment}</p>
                      </motion.div>
                    </div>

                    {/* Recommended Properties */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-black text-white flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-purple-400" />
                        {isAr ? 'العقارات الموصى بها' : 'Recommended Properties'}
                      </h3>

                      {recommendations.map((property, index) => (
                        <motion.div
                          key={property.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-white/5 backdrop-blur-sm border-2 border-white/10 rounded-2xl p-6 hover:border-purple-500/50 transition-all group"
                        >
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Image */}
                            <div className="w-full md:w-64 h-48 rounded-xl overflow-hidden relative">
                              <img
                                src={property.image}
                                alt={property.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute top-3 right-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                                AI Score: {property.ai_score}/10
                              </div>
                            </div>

                            {/* Info */}
                            <div className="flex-1">
                              <h4 className="text-xl font-bold text-white mb-2">{property.title}</h4>
                              <div className="flex items-center gap-2 text-white/60 mb-4">
                                <MapPin className="w-4 h-4" />
                                <span>{property.location}</span>
                              </div>

                              <div className="grid grid-cols-3 gap-4 mb-4">
                                <div>
                                  <p className="text-white/60 text-sm">{isAr ? 'غرف النوم' : 'Bedrooms'}</p>
                                  <p className="text-white font-bold text-lg">{property.bedrooms}</p>
                                </div>
                                <div>
                                  <p className="text-white/60 text-sm">{isAr ? 'الحمامات' : 'Bathrooms'}</p>
                                  <p className="text-white font-bold text-lg">{property.bathrooms}</p>
                                </div>
                                <div>
                                  <p className="text-white/60 text-sm">{isAr ? 'المساحة' : 'Area'}</p>
                                  <p className="text-white font-bold text-lg">{property.area} {property.areaUnit}</p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-white/60 text-sm">{isAr ? 'السعر' : 'Price'}</p>
                                  <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                                    {property.currency} {property.price.toLocaleString()}
                                  </p>
                                </div>
                                <Link
                                  to={`/properties/${property.id}`}
                                  className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl flex items-center gap-2 transition-all"
                                >
                                  {isAr ? 'عرض التفاصيل' : 'View Details'}
                                  <ChevronRight className="w-5 h-5" />
                                </Link>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* AI Learning Notice */}
                    <div className="mt-6 p-4 bg-purple-500/10 border-2 border-purple-500/30 rounded-xl">
                      <p className="text-white/70 text-sm text-center">
                        {isAr 
                          ? '💡 يتحسن الذكاء الاصطناعي مع كل بحث تقوم به. توصياتك ستصبح أكثر دقة بمرور الوقت.'
                          : '💡 Our AI learns from your searches. Your recommendations will become more accurate over time.'}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
