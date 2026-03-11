import { useState } from 'react';
import { Filter, X, DollarSign, Home, Maximize, Bed, Bath, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export interface FilterOptions {
  priceMin: number;
  priceMax: number;
  bedrooms: string;
  bathrooms: string;
  areaMin: number;
  areaMax: number;
  propertyType: string[];
  location: string[];
  amenities: string[];
  aiScoreMin: number;
}

interface Props {
  onApply: (filters: FilterOptions) => void;
  onReset: () => void;
}

export default function AdvancedFilters({ onApply, onReset }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  const [filters, setFilters] = useState<FilterOptions>({
    priceMin: 0,
    priceMax: 50000000,
    bedrooms: 'any',
    bathrooms: 'any',
    areaMin: 0,
    areaMax: 50000,
    propertyType: [],
    location: [],
    amenities: [],
    aiScoreMin: 0
  });

  const propertyTypes = ['Villa', 'Penthouse', 'Townhouse', 'Studio', 'Apartment'];
  const locations = ['Dubai Marina', 'Palm Jumeirah', 'Downtown Dubai', 'Business Bay', 'Jumeirah Beach', 'Abu Dhabi'];
  const amenities = ['Pool', 'Gym', 'Beach Access', 'Smart Home', 'Parking', 'Security', 'Garden', 'Concierge'];

  const handleApply = () => {
    onApply(filters);
    setIsOpen(false);
  };

  const handleReset = () => {
    const defaultFilters: FilterOptions = {
      priceMin: 0,
      priceMax: 50000000,
      bedrooms: 'any',
      bathrooms: 'any',
      areaMin: 0,
      areaMax: 50000,
      propertyType: [],
      location: [],
      amenities: [],
      aiScoreMin: 0
    };
    setFilters(defaultFilters);
    onReset();
  };

  const toggleArrayValue = (key: keyof FilterOptions, value: string) => {
    const current = filters[key] as string[];
    if (current.includes(value)) {
      setFilters({ ...filters, [key]: current.filter(v => v !== value) });
    } else {
      setFilters({ ...filters, [key]: [...current, value] });
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white rounded-xl font-semibold transition-colors shadow-lg"
      >
        <Filter className="w-5 h-5" />
        {language === 'ar' ? 'تصفية متقدمة' : 'Advanced Filters'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between z-10">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  {language === 'ar' ? 'تصفية متقدمة' : 'Advanced Filters'}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Price Range */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    <DollarSign className="w-4 h-4" />
                    {language === 'ar' ? 'نطاق السعر' : 'Price Range'}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                        {language === 'ar' ? 'الحد الأدنى' : 'Minimum'}
                      </label>
                      <input
                        type="number"
                        value={filters.priceMin}
                        onChange={(e) => setFilters({ ...filters, priceMin: Number(e.target.value) })}
                        className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-slate-500 dark:text-slate-400 mb-1 block">
                        {language === 'ar' ? 'الحد الأقصى' : 'Maximum'}
                      </label>
                      <input
                        type="number"
                        value={filters.priceMax}
                        onChange={(e) => setFilters({ ...filters, priceMax: Number(e.target.value) })}
                        className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Bedrooms & Bathrooms */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      <Bed className="w-4 h-4" />
                      {language === 'ar' ? 'غرف النوم' : 'Bedrooms'}
                    </label>
                    <select
                      value={filters.bedrooms}
                      onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="any">{language === 'ar' ? 'أي' : 'Any'}</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                      <option value="5">5+</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      <Bath className="w-4 h-4" />
                      {language === 'ar' ? 'الحمامات' : 'Bathrooms'}
                    </label>
                    <select
                      value={filters.bathrooms}
                      onChange={(e) => setFilters({ ...filters, bathrooms: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="any">{language === 'ar' ? 'أي' : 'Any'}</option>
                      <option value="1">1+</option>
                      <option value="2">2+</option>
                      <option value="3">3+</option>
                      <option value="4">4+</option>
                    </select>
                  </div>
                </div>

                {/* Area Range */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    <Maximize className="w-4 h-4" />
                    {language === 'ar' ? 'نطاق المساحة (قدم مربع)' : 'Area Range (sq ft)'}
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="number"
                      value={filters.areaMin}
                      onChange={(e) => setFilters({ ...filters, areaMin: Number(e.target.value) })}
                      placeholder={language === 'ar' ? 'الحد الأدنى' : 'Min'}
                      className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <input
                      type="number"
                      value={filters.areaMax}
                      onChange={(e) => setFilters({ ...filters, areaMax: Number(e.target.value) })}
                      placeholder={language === 'ar' ? 'الحد الأقصى' : 'Max'}
                      className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    <Home className="w-4 h-4" />
                    {language === 'ar' ? 'نوع العقار' : 'Property Type'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {propertyTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => toggleArrayValue('propertyType', type)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          filters.propertyType.includes(type)
                            ? 'bg-blue-500 dark:bg-cyan-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    {language === 'ar' ? 'الموقع' : 'Location'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {locations.map(loc => (
                      <button
                        key={loc}
                        onClick={() => toggleArrayValue('location', loc)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          filters.location.includes(loc)
                            ? 'bg-blue-500 dark:bg-cyan-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    {language === 'ar' ? 'المرافق' : 'Amenities'}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {amenities.map(amenity => (
                      <button
                        key={amenity}
                        onClick={() => toggleArrayValue('amenities', amenity)}
                        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                          filters.amenities.includes(amenity)
                            ? 'bg-blue-500 dark:bg-cyan-500 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {amenity}
                      </button>
                    ))}
                  </div>
                </div>

                {/* AI Score */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    <Star className="w-4 h-4" />
                    {language === 'ar' ? 'الحد الأدنى لدرجة AI' : 'Minimum AI Score'}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={filters.aiScoreMin}
                    onChange={(e) => setFilters({ ...filters, aiScoreMin: Number(e.target.value) })}
                    className="w-full"
                  />
                  <div className="text-center mt-2">
                    <span className="text-2xl font-bold text-blue-600 dark:text-cyan-400">
                      {filters.aiScoreMin}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400">/100</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700 p-6 flex gap-3">
                <button
                  onClick={handleReset}
                  className="flex-1 px-6 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-900 dark:text-white rounded-xl font-semibold transition-colors"
                >
                  {language === 'ar' ? 'إعادة تعيين' : 'Reset'}
                </button>
                <button
                  onClick={handleApply}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-xl font-semibold transition-colors shadow-lg"
                >
                  {language === 'ar' ? 'تطبيق الفلاتر' : 'Apply Filters'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
