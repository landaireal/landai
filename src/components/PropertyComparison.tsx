import { useState, useEffect } from 'react';
import { X, TrendingUp, Home, Bath, Maximize, DollarSign, MapPin, Star } from 'lucide-react';
import { useProperties } from '../hooks/useProperties';
import { useLanguage } from '../context/LanguageContext';

interface ComparisonProperty {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image: string;
  aiScore?: number;
  type: string;
}

export default function PropertyComparison() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const { properties } = useProperties();
  const { language } = useLanguage();

  const selectedProperties = selectedIds
    .map(id => properties.find(p => p.id === id))
    .filter(Boolean) as ComparisonProperty[];

  useEffect(() => {
    const stored = localStorage.getItem('landai:comparison');
    if (stored) {
      try {
        setSelectedIds(JSON.parse(stored));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const addToComparison = (id: string) => {
    if (selectedIds.length >= 4) return;
    const newIds = [...selectedIds, id];
    setSelectedIds(newIds);
    localStorage.setItem('landai:comparison', JSON.stringify(newIds));
  };

  const removeFromComparison = (id: string) => {
    const newIds = selectedIds.filter(i => i !== id);
    setSelectedIds(newIds);
    localStorage.setItem('landai:comparison', JSON.stringify(newIds));
  };

  const clearComparison = () => {
    setSelectedIds([]);
    localStorage.removeItem('landai:comparison');
  };

  if (selectedIds.length === 0) return null;

  return (
    <>
      {/* Floating comparison button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-40 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-cyan-500 dark:to-blue-500 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 font-semibold"
      >
        <TrendingUp className="w-5 h-5" />
        {language === 'ar' ? 'مقارنة' : 'Compare'} ({selectedIds.length})
      </button>

      {/* Comparison modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-auto">
            {/* Header */}
            <div className="sticky top-0 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? 'مقارنة العقارات' : 'Property Comparison'}
              </h2>
              <div className="flex items-center gap-3">
                <button
                  onClick={clearComparison}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  {language === 'ar' ? 'مسح الكل' : 'Clear All'}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Comparison table */}
            <div className="p-6 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left p-4 text-sm font-semibold text-slate-600 dark:text-slate-400">
                      {language === 'ar' ? 'المعايير' : 'Feature'}
                    </th>
                    {selectedProperties.map(property => (
                      <th key={property.id} className="p-4 min-w-[250px]">
                        <div className="relative">
                          <button
                            onClick={() => removeFromComparison(property.id)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                          <img
                            src={property.image}
                            alt={property.title}
                            className="w-full h-40 object-cover rounded-lg mb-3"
                          />
                          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
                            {property.title}
                          </h3>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {/* Price */}
                  <tr>
                    <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      {language === 'ar' ? 'السعر' : 'Price'}
                    </td>
                    {selectedProperties.map(property => (
                      <td key={property.id} className="p-4 text-center">
                        <span className="text-lg font-bold text-blue-600 dark:text-cyan-400">
                          ${property.price.toLocaleString()}
                        </span>
                      </td>
                    ))}
                  </tr>

                  {/* Location */}
                  <tr>
                    <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {language === 'ar' ? 'الموقع' : 'Location'}
                    </td>
                    {selectedProperties.map(property => (
                      <td key={property.id} className="p-4 text-center text-sm text-slate-700 dark:text-slate-300">
                        {property.location}
                      </td>
                    ))}
                  </tr>

                  {/* Type */}
                  <tr>
                    <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <Home className="w-4 h-4" />
                      {language === 'ar' ? 'النوع' : 'Type'}
                    </td>
                    {selectedProperties.map(property => (
                      <td key={property.id} className="p-4 text-center text-sm text-slate-700 dark:text-slate-300">
                        {property.type}
                      </td>
                    ))}
                  </tr>

                  {/* Bedrooms */}
                  <tr>
                    <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                      {language === 'ar' ? 'غرف النوم' : 'Bedrooms'}
                    </td>
                    {selectedProperties.map(property => (
                      <td key={property.id} className="p-4 text-center text-sm text-slate-700 dark:text-slate-300">
                        {property.bedrooms}
                      </td>
                    ))}
                  </tr>

                  {/* Bathrooms */}
                  <tr>
                    <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <Bath className="w-4 h-4" />
                      {language === 'ar' ? 'الحمامات' : 'Bathrooms'}
                    </td>
                    {selectedProperties.map(property => (
                      <td key={property.id} className="p-4 text-center text-sm text-slate-700 dark:text-slate-300">
                        {property.bathrooms}
                      </td>
                    ))}
                  </tr>

                  {/* Area */}
                  <tr>
                    <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                      <Maximize className="w-4 h-4" />
                      {language === 'ar' ? 'المساحة' : 'Area'}
                    </td>
                    {selectedProperties.map(property => (
                      <td key={property.id} className="p-4 text-center text-sm text-slate-700 dark:text-slate-300">
                        {property.area.toLocaleString()} sq ft
                      </td>
                    ))}
                  </tr>

                  {/* AI Score */}
                  {selectedProperties.some(p => p.aiScore) && (
                    <tr>
                      <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-400 flex items-center gap-2">
                        <Star className="w-4 h-4" />
                        {language === 'ar' ? 'تقييم AI' : 'AI Score'}
                      </td>
                      {selectedProperties.map(property => (
                        <td key={property.id} className="p-4 text-center">
                          {property.aiScore ? (
                            <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold">
                              <Star className="w-4 h-4 fill-current" />
                              {property.aiScore}/100
                            </span>
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                      ))}
                    </tr>
                  )}

                  {/* Price per sq ft */}
                  <tr>
                    <td className="p-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                      {language === 'ar' ? 'السعر لكل قدم مربع' : 'Price/sq ft'}
                    </td>
                    {selectedProperties.map(property => (
                      <td key={property.id} className="p-4 text-center text-sm text-slate-700 dark:text-slate-300">
                        ${Math.round(property.price / property.area).toLocaleString()}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Export helper function to be used in property cards
export function useComparison() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('landai:comparison');
    if (stored) {
      try {
        setSelectedIds(JSON.parse(stored));
      } catch (e) {
        // ignore
      }
    }
  }, []);

  const addToComparison = (id: string) => {
    if (selectedIds.length >= 4) return false;
    const newIds = [...selectedIds, id];
    setSelectedIds(newIds);
    localStorage.setItem('landai:comparison', JSON.stringify(newIds));
    return true;
  };

  const removeFromComparison = (id: string) => {
    const newIds = selectedIds.filter(i => i !== id);
    setSelectedIds(newIds);
    localStorage.setItem('landai:comparison', JSON.stringify(newIds));
  };

  const isInComparison = (id: string) => selectedIds.includes(id);

  return { selectedIds, addToComparison, removeFromComparison, isInComparison };
}
