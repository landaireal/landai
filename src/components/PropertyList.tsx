import { useState, useEffect } from 'react';
import { useProperties } from '../hooks/useProperties';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Sparkles, MapPin, Maximize, Bed, Bath } from 'lucide-react';
import { Link } from 'react-router-dom';
import { aiPropertySearch } from '../services/aiService';
import type { Property } from '../services/api';
import { useUserData } from '../context/UserDataContext';

interface PropertyListProps {
  searchQuery?: string | null;
}

export default function PropertyList({ searchQuery }: PropertyListProps) {
  const { properties: allProperties, loading: loadingAll, error: errorAll } = useProperties();
  const [aiProperties, setAiProperties] = useState<Property[] | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const { isSaved, toggleSaved, logActivity } = useUserData();

  useEffect(() => {
    if (!searchQuery?.trim()) {
      setAiProperties(null);
      return;
    }
    setLoadingAi(true);
    logActivity('ai_search', { query: searchQuery, source: 'properties_page' });
    aiPropertySearch(searchQuery)
      .then(setAiProperties)
      .catch(() => setAiProperties([]))
      .finally(() => setLoadingAi(false));
  }, [logActivity, searchQuery]);

  const useAISearch = Boolean(searchQuery?.trim());
  const properties = useAISearch ? (aiProperties ?? []) : allProperties;
  const loading = useAISearch ? loadingAi : loadingAll;
  const error = useAISearch ? null : errorAll;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-12">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-[100rem] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {properties.map((property) => (
          <Link
            key={property.id}
            to={`/properties/${property.id}`}
            className="glass-12d rounded-[3rem] p-6 group hover:shadow-xl dark:hover:shadow-[0_40px_100px_rgba(6,182,212,0.4)] hover:border-blue-300 dark:hover:border-cyan-500/60 transition-all duration-500 relative block"
          >
            {/* 12D Portal Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-cyan-500 dark:via-purple-500 dark:to-cyan-500 opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 blur-3xl transition-opacity duration-1000 pointer-events-none animate-spin-slow"></div>

            {/* Image Container */}
            <div className="relative h-80 rounded-[2.5rem] overflow-hidden mb-6 border border-zinc-200 dark:border-white/20 shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/60 dark:from-[#030014]/40 dark:to-[#030014]/90 z-10 pointer-events-none mix-blend-overlay"></div>
              
              <img 
                src={property.image} 
                alt={property.title} 
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-[3s] group-hover:scale-125"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/800x600/4A90E2/FFFFFF?text=Property+Image';
                }}
              />
              
              {/* Floating Badges */}
              <div className="absolute top-4 left-4 flex gap-2 z-20">
                <span className="glass-pill px-4 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-500/50 shadow-sm dark:shadow-[0_0_20px_rgba(6,182,212,0.4)] bg-white/90 dark:bg-black/60 backdrop-blur-xl">
                  {property.type}
                </span>
                <span className="bg-white/90 dark:bg-black/80 border border-purple-200 dark:border-purple-500/50 text-purple-700 dark:text-purple-300 px-4 py-2 rounded-full text-xs font-black flex items-center gap-2 shadow-sm dark:shadow-[0_0_30px_rgba(168,85,247,0.6)] uppercase tracking-[0.2em]">
                  <Sparkles className="w-4 h-4 animate-ping text-purple-500 dark:text-purple-300" /> 
                  AI {property.ai_score}
                </span>
              </div>
              
              <button 
                className="absolute top-4 right-4 bg-white/90 dark:bg-black/60 backdrop-blur-xl border border-zinc-200 dark:border-white/20 p-3 rounded-full hover:border-pink-400 dark:hover:border-cyan-400 hover:text-pink-500 dark:hover:text-cyan-400 text-zinc-400 dark:text-white transition-all z-20 shadow-sm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleSaved(property.id, { source: 'property_list' });
                }}
                aria-label={isSaved(property.id) ? (isAr ? 'إزالة من المحفوظات' : 'Remove from saved') : (isAr ? 'حفظ العقار' : 'Save property')}
              >
                <Heart className={`w-5 h-5 ${isSaved(property.id) ? 'fill-pink-500 text-pink-500' : ''}`} />
              </button>
            </div>

            {/* Content Container */}
            <div className="px-4 pb-4 relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-cyan-300 transition-colors dark:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-zinc-500 dark:text-zinc-400 gap-1 font-bold uppercase tracking-wider text-xs">
                    <MapPin className="w-4 h-4 text-purple-500 dark:text-purple-400" />
                    {property.location}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-gold-300 dark:to-yellow-500 drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(251,191,36,0.3)]">
                    {property.currency} {property.price.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 border-t border-zinc-100 dark:border-white/10 pt-4 mt-4 transition-colors">
                <div className="flex gap-4 flex-wrap">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-cyan-200 font-bold text-xs uppercase tracking-widest bg-blue-50 dark:bg-black/40 border border-blue-100 dark:border-cyan-500/20 px-4 py-2 rounded-xl group-hover:shadow-sm dark:group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-shadow">
                    <Bed className="w-4 h-4" />
                    {property.bedrooms}
                  </div>
                  <div className="flex items-center gap-2 text-blue-700 dark:text-cyan-200 font-bold text-xs uppercase tracking-widest bg-blue-50 dark:bg-black/40 border border-blue-100 dark:border-cyan-500/20 px-4 py-2 rounded-xl group-hover:shadow-sm dark:group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-shadow">
                    <Bath className="w-4 h-4" />
                    {property.bathrooms}
                  </div>
                  <div className="flex items-center gap-2 text-blue-700 dark:text-cyan-200 font-bold text-xs uppercase tracking-widest bg-blue-50 dark:bg-black/40 border border-blue-100 dark:border-cyan-500/20 px-4 py-2 rounded-xl group-hover:shadow-sm dark:group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-shadow">
                    <Maximize className="w-4 h-4" />
                    {property.area} {property.areaUnit}
                  </div>
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 font-bold text-xs uppercase tracking-widest bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-500/30 px-4 py-2 rounded-xl group-hover:shadow-sm dark:group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)] transition-shadow">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {isAr ? 'موثق' : 'Verified'}
                  </div>
                </div>
                
                <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-600/20 dark:to-cyan-600/20 border border-purple-200 dark:border-purple-500/30 hover:border-blue-400 dark:hover:border-cyan-400 text-purple-700 dark:text-purple-300 hover:text-blue-700 dark:hover:text-cyan-300 hover:bg-blue-100 dark:hover:bg-cyan-900/40 hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-all flex justify-center items-center gap-2 text-sm font-black uppercase tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  {isAr ? 'عرض التفاصيل' : 'View Details'}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {properties.length === 0 && (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">No properties found.</p>
        </div>
      )}
    </section>
  );
}
