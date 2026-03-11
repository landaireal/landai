import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Heart, Bed, Bath, Maximize, MapPin, TrendingUp, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUserData } from '../context/UserDataContext';
import { propertyStorage } from '../services/storage';
import type { StoredProperty } from '../services/storage';

interface Props {
  limit?: number;
  showFilters?: boolean;
  title?: string;
  subtitle?: string;
}

export default function DynamicPropertyShowcase({ 
  limit, 
  showFilters = true,
  title,
  subtitle 
}: Props) {
  const { language } = useLanguage();
  const { isSaved, toggleSaved } = useUserData();
  const navigate = useNavigate();
  
  const [properties, setProperties] = useState<StoredProperty[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<StoredProperty[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'newest' | 'popular'>('newest');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    filterAndSortProperties();
  }, [properties, selectedType, selectedStatus, sortBy]);

  const loadProperties = () => {
    const allProperties = propertyStorage.getAll();
    setProperties(allProperties);
  };

  const filterAndSortProperties = () => {
    let filtered = [...properties];

    // Filter by type
    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.type.toLowerCase() === selectedType.toLowerCase());
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(p => p.status === selectedStatus);
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case 'popular':
        filtered.sort((a, b) => b.views - a.views);
        break;
    }

    setFilteredProperties(limit ? filtered.slice(0, limit) : filtered);
    setCurrentPage(0);
  };

  const propertyTypes = Array.from(new Set(properties.map(p => p.type)));
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  const currentProperties = filteredProperties.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4"
        >
          {title || (language === 'ar' ? 'عرض العقارات المتاحة' : 'Available Properties Showcase')}
        </motion.h2>
        {subtitle && (
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>
        )}
        <p className="text-sm text-blue-600 dark:text-cyan-400 font-semibold mt-2">
          {filteredProperties.length} {language === 'ar' ? 'عقار متاح' : 'Properties Available'}
        </p>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Type Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ar' ? 'نوع العقار' : 'Property Type'}
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{language === 'ar' ? 'الكل' : 'All Types'}</option>
                {propertyTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ar' ? 'الحالة' : 'Status'}
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">{language === 'ar' ? 'الكل' : 'All Status'}</option>
                <option value="Active">{language === 'ar' ? 'نشط' : 'Active'}</option>
                <option value="Pending">{language === 'ar' ? 'قيد الانتظار' : 'Pending'}</option>
                <option value="Sold">{language === 'ar' ? 'تم البيع' : 'Sold'}</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {language === 'ar' ? 'ترتيب حسب' : 'Sort By'}
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">{language === 'ar' ? 'الأحدث' : 'Newest First'}</option>
                <option value="popular">{language === 'ar' ? 'الأكثر مشاهدة' : 'Most Popular'}</option>
                <option value="price-asc">{language === 'ar' ? 'السعر: من الأقل' : 'Price: Low to High'}</option>
                <option value="price-desc">{language === 'ar' ? 'السعر: من الأعلى' : 'Price: High to Low'}</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Properties Grid */}
      {currentProperties.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {language === 'ar' ? 'لا توجد عقارات متاحة' : 'No properties available'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
                isSaved={isSaved(property.id)}
                onToggleSave={() => toggleSaved(property.id, { title: property.title, price: property.price })}
                onClick={() => navigate(`/properties/${property.id}`)}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 0}
                className="p-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <span className="text-slate-700 dark:text-slate-300 font-semibold">
                {currentPage + 1} / {totalPages}
              </span>
              
              <button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1}
                className="p-3 rounded-xl bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

interface PropertyCardProps {
  property: StoredProperty;
  index: number;
  isSaved: boolean;
  onToggleSave: () => void;
  onClick: () => void;
}

function PropertyCard({ property, index, isSaved, onToggleSave, onClick }: PropertyCardProps) {
  const { language } = useLanguage();
  const isNew = Date.now() - property.createdAt < 7 * 24 * 60 * 60 * 1000; // 7 days

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      className="group relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={property.image}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {isNew && (
            <span className="px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
              {language === 'ar' ? 'جديد' : 'NEW'}
            </span>
          )}
          <span className="px-3 py-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
            {property.type}
          </span>
          {property.status === 'Active' && (
            <span className="px-3 py-1 bg-purple-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full">
              {language === 'ar' ? 'متميز' : 'PREMIUM'}
            </span>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleSave();
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
            isSaved
              ? 'bg-red-500 text-white'
              : 'bg-white/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 hover:bg-red-500 hover:text-white'
          }`}
        >
          <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Views */}
        <div className="absolute bottom-4 right-4 flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
          <Eye className="w-3 h-3" />
          <span>{property.views}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400 mb-4">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 mb-4 text-sm text-slate-600 dark:text-slate-400">
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
            <span>{property.area}</span>
          </div>
        </div>

        {/* Price */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">
            {language === 'ar' ? 'السعر' : 'Price'}
          </p>
          <p className="text-xl font-bold text-blue-600 dark:text-cyan-400">
            AED {property.price.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Status Badge */}
      {property.status !== 'Active' && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center">
          <span className={`px-6 py-3 rounded-full text-white text-lg font-bold ${
            property.status === 'Sold' ? 'bg-red-500' : 'bg-yellow-500'
          }`}>
            {property.status === 'Sold' 
              ? (language === 'ar' ? 'تم البيع' : 'SOLD') 
              : (language === 'ar' ? 'قيد الانتظار' : 'PENDING')
            }
          </span>
        </div>
      )}
    </motion.div>
  );
}
