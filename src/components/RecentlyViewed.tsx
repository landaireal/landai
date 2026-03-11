import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useUserData } from '../context/UserDataContext';
import { propertyAPI, type Property } from '../services/api';

export default function RecentlyViewed() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const { recentlyViewedIds } = useUserData();
  const [all, setAll] = useState<Property[]>([]);

  useEffect(() => {
    if (recentlyViewedIds.length === 0) return;
    propertyAPI.getAllProperties().then(setAll);
  }, [recentlyViewedIds.length]);

  const items = useMemo(() => {
    const map = new Map(all.map((p) => [p.id, p]));
    return recentlyViewedIds.map((id) => map.get(id)).filter(Boolean) as Property[];
  }, [all, recentlyViewedIds]);

  if (items.length === 0) return null;

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-cyan-500" aria-hidden />
        <h2 className="text-2xl font-black text-zinc-900 dark:text-white">
          {isAr ? 'شوهدت مؤخراً' : 'Recently Viewed'}
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.slice(0, 4).map((p) => (
          <Link
            key={p.id}
            to={`/properties/${p.id}`}
            className="group glass-12d rounded-2xl overflow-hidden border border-zinc-200 dark:border-white/10 hover:border-cyan-500/50 transition-all"
          >
            <div className="relative h-36">
              <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-purple-600/70 text-white text-xs font-bold flex items-center gap-1">
                <Sparkles className="w-3 h-3" aria-hidden /> {p.ai_score}
              </div>
            </div>
            <div className="p-4">
              <p className="font-bold text-zinc-900 dark:text-white line-clamp-2">{p.title}</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 flex items-center gap-1 mt-1">
                <MapPin className="w-3 h-3" aria-hidden /> {p.location}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

