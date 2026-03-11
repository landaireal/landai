import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize, Heart, TrendingUp, Eye, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useUserData } from '../context/UserDataContext';
import { useLanguage } from '../context/LanguageContext';
import { useComparison } from './PropertyComparison';
import ShareProperty from './ShareProperty';

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  image: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: string;
  aiScore?: number;
}

interface Props {
  property: Property;
}

export default function EnhancedPropertyCard({ property }: Props) {
  const { isSaved, toggleSaved, markViewed } = useUserData();
  const { language } = useLanguage();
  const { addToComparison, removeFromComparison, isInComparison } = useComparison();
  const [showShare, setShowShare] = useState(false);
  
  const saved = isSaved(property.id);
  const inComparison = isInComparison(property.id);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleSaved(property.id, { title: property.title, price: property.price });
  };

  const handleComparisonToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inComparison) {
      removeFromComparison(property.id);
    } else {
      const success = addToComparison(property.id);
      if (!success) {
        alert(language === 'ar' ? 'يمكنك مقارنة 4 عقارات كحد أقصى' : 'You can compare up to 4 properties');
      }
    }
  };

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <Link to={`/properties/${property.id}`} onClick={() => markViewed(property.id)}>
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={property.image}
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
          
          {/* AI Score Badge */}
          {property.aiScore && (
            <div className="absolute top-4 left-4 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
              <TrendingUp className="w-4 h-4" />
              AI {property.aiScore}
            </div>
          )}

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={handleSaveToggle}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                saved
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-red-500 hover:text-white'
              }`}
            >
              <Heart className={`w-5 h-5 ${saved ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleComparisonToggle}
              className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                inComparison
                  ? 'bg-blue-500 dark:bg-cyan-500 text-white'
                  : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <TrendingUp className="w-5 h-5" />
            </button>
          </div>

          {/* Type badge */}
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full text-xs font-semibold text-slate-700 dark:text-slate-300">
            {property.type}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
            {property.title}
          </h3>
          
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-4">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">{property.location}</span>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="text-2xl font-bold text-blue-600 dark:text-cyan-400">
              ${property.price.toLocaleString()}
            </div>
          </div>

          {/* Features */}
          <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Bed className="w-4 h-4" />
              <span>{property.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bath className="w-4 h-4" />
              <span>{property.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize className="w-4 h-4" />
              <span>{property.area.toLocaleString()} sq ft</span>
            </div>
          </div>

          {/* View Details button */}
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-blue-600 dark:text-cyan-400 group-hover:underline">
                {language === 'ar' ? 'عرض التفاصيل' : 'View Details'} →
              </span>
              <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-500">
                <Eye className="w-3 h-3" />
                <span>{Math.floor(Math.random() * 200 + 50)}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
