import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { useUserData } from '../context/UserDataContext';
import { propertyAPI, type Property } from '../services/api';

export default function SavedPage() {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const { savedIds, toggleSaved } = useUserData();
  const [all, setAll] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    propertyAPI
      .getAllProperties()
      .then(setAll)
      .finally(() => setLoading(false));
  }, []);

  const saved = useMemo(() => {
    const set = new Set(savedIds);
    return all.filter((p) => set.has(p.id));
  }, [all, savedIds]);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <SEO title="Saved Properties - Land AI" description="Your saved Land AI properties." />

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center gap-3 mb-6">
          <Heart className="w-6 h-6 text-pink-500" aria-hidden />
          <h1 className="text-4xl md:text-6xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
            {isAr ? 'المحفوظات' : 'Saved'}
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500" />
          </div>
        ) : saved.length === 0 ? (
          <div className="max-w-xl mx-auto text-center glass-12d rounded-3xl p-10 border border-zinc-200 dark:border-white/10">
            <p className="text-zinc-700 dark:text-zinc-300 font-semibold mb-4">
              {isAr ? 'لم تقم بحفظ أي عقار بعد.' : 'You have no saved properties yet.'}
            </p>
            <Link
              to="/properties"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-colors"
            >
              {isAr ? 'استكشف العقارات' : 'Browse properties'}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {saved.map((p) => (
              <div
                key={p.id}
                className="glass-12d rounded-[2rem] p-5 border border-zinc-200 dark:border-white/10 hover:border-pink-400/60 transition-all group"
              >
                <Link to={`/properties/${p.id}`} className="block">
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-4">
                    <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/60 text-white text-xs font-bold uppercase">
                      {p.type}
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-purple-600/70 text-white text-xs font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3" aria-hidden /> {p.ai_score}
                    </div>
                  </div>
                  <h3 className="text-xl font-black text-zinc-900 dark:text-white mb-1 line-clamp-2">{p.title}</h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 flex items-center gap-1">
                    <MapPin className="w-4 h-4" aria-hidden /> {p.location}
                  </p>
                  <p className="mt-3 font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-gold-300 dark:to-yellow-500">
                    {p.currency} {p.price.toLocaleString()}
                  </p>
                </Link>

                <button
                  onClick={() => toggleSaved(p.id, { source: 'saved_page' })}
                  className="mt-4 w-full py-3 rounded-xl border-2 border-pink-500/60 text-pink-600 dark:text-pink-300 font-bold hover:bg-pink-500/10 transition-colors"
                >
                  {isAr ? 'إزالة من المحفوظات' : 'Remove from saved'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

