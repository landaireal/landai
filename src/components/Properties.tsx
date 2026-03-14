import { useLanguage } from '../context/LanguageContext';
import { Heart, Sparkles, MapPin, Maximize, Bed, Bath, TrendingUp } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { luxuryVillas } from '../data/villas';
import { luxuryPenthouses } from '../data/penthouses';
import { luxuryTownhouses } from '../data/townhouses';

export default function Properties() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();

  const t = {
    title: isAr ? 'عقارات مميزة' : 'Featured Properties',
    subtitle: isAr ? 'عقارات فاخرة مختارة بعناية في مواقع رئيسية' : 'Handpicked luxury properties in prime locations',
    viewAll: isAr ? 'عرض كل العقارات' : 'View All Properties',
    viewDetails: isAr ? 'عرض التفاصيل' : 'View Details',
  };

  // Combine all properties from different categories - 12 total properties
  const allProperties = [
    ...luxuryVillas.slice(0, 5),      // 5 villas
    ...luxuryPenthouses.slice(0, 4),  // 4 penthouses
    ...luxuryTownhouses.slice(0, 3),  // 3 townhouses
  ];

  return (
    <section id="properties" className="section-animated-bg py-20 relative">
      {/* Animated floating orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-purple-500/20 to-violet-500/20 dark:from-purple-500/30 dark:to-violet-500/30 rounded-full blur-3xl animate-float-orb pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-purple-500/20 dark:from-violet-500/30 dark:to-purple-500/30 rounded-full blur-3xl animate-float-orb pointer-events-none" style={{animationDelay: '7s'}}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-50 via-violet-50 to-purple-50 dark:from-purple-900/30 dark:via-violet-900/30 dark:to-purple-900/30 rounded-full border-2 border-purple-200/60 dark:border-purple-400/30 mb-6 shadow-lg dark:shadow-[0_0_25px_rgba(124,58,237,0.3)] hover:shadow-xl dark:hover:shadow-[0_0_35px_rgba(124,58,237,0.4)] transition-all duration-500 backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" />
              <span className="blueberry-text text-sm font-black uppercase tracking-widest">
                {isAr ? 'عقارات مميزة' : 'Premium Listings'}
              </span>
              <Sparkles className="w-5 h-5 text-violet-600 dark:text-violet-400 animate-pulse" style={{animationDelay: '0.5s'}} />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="section-title text-gray-900 dark:text-white mb-4" 
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {t.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="section-subtitle max-w-2xl"
            >
              {t.subtitle}
            </motion.p>
            <div className="mt-4 flex items-center justify-center md:justify-start gap-3">
              <div className="h-1 w-16 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="h-1 w-16 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent rounded-full"></div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <Link 
              to="/properties"
              className="btn-primary inline-flex items-center gap-2"
            >
              {t.viewAll}
              <TrendingUp className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Properties Grid - 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {allProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              onClick={() => navigate(`/properties/${property.id}`)}
              className="group card-standard cursor-pointer relative overflow-hidden hover:-translate-y-2 hover:border-indigo-400/60 dark:hover:border-indigo-600/60 transition-all duration-700"
            >
              {/* Shimmer hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none z-10"></div>
              
              {/* Decorative elements matching contact form */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/10 via-violet-500/10 to-transparent dark:from-purple-500/20 dark:via-violet-500/20 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-violet-500/10 via-purple-500/10 to-transparent dark:from-violet-500/20 dark:via-purple-500/20 rounded-tr-full"></div>
              
              {/* Enhanced Property Image */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl z-10">
                <img 
                  src={property.images[0]} 
                  alt={property.title}
                  className="w-full h-full object-cover group-hover:scale-110 group-hover:rotate-1 transition-all duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Decorative corner accent */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/20 dark:from-cyan-500/30 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-white/95 dark:bg-black/90 backdrop-blur-sm text-xs font-bold rounded-full text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                    {property.type}
                  </span>
                  {property.ai_score >= 9 && (
                    <span className="badge-featured flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      AI {property.ai_score}/10
                    </span>
                  )}
                </div>

                {/* Save Button */}
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add to favorites logic here
                  }}
                  className="absolute top-3 right-3 p-2 bg-white/95 dark:bg-black/90 backdrop-blur-sm rounded-full hover:bg-pink-50 dark:hover:bg-pink-900/30 hover:text-pink-600 dark:hover:text-pink-400 transition-colors border border-gray-200 dark:border-gray-700"
                >
                  <Heart className="w-4 h-4" />
                </button>
              </div>

              {/* Property Info */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors leading-tight">
                  {property.title}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4">
                  <MapPin className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm font-medium line-clamp-1">{property.location}</span>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{property.bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{property.bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Maximize className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                    <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">{property.area} {property.areaUnit}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mb-1 uppercase font-semibold">
                      {isAr ? 'السعر' : 'Price'}
                    </p>
                    <p className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400">
                      {property.currency} {property.price.toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/properties/${property.id}`);
                    }}
                    className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-cyan-400 rounded-lg font-semibold text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                  >
                    {t.viewDetails}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button - Mobile */}
        <div className="mt-12 text-center">
          <Link 
            to="/properties"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
          >
            {t.viewAll}
            <TrendingUp className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
