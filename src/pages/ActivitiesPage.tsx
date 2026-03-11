import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Trash2, ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { useUserData, type ActivityItem } from '../context/UserDataContext';

function formatWhen(ts: number) {
  const d = new Date(ts);
  return d.toLocaleString();
}

function describe(item: ActivityItem) {
  const id = (item.meta?.id as string | undefined) ?? '';
  const query = (item.meta?.query as string | undefined) ?? '';
  switch (item.type) {
    case 'view_property':
      return { title: 'Viewed property', detail: id ? `Property: ${id}` : '' };
    case 'save_property':
      return { title: 'Saved property', detail: id ? `Property: ${id}` : '' };
    case 'unsave_property':
      return { title: 'Removed saved property', detail: id ? `Property: ${id}` : '' };
    case 'ai_search':
      return { title: 'AI search', detail: query ? `Query: ${query}` : '' };
    default:
      return { title: item.type, detail: '' };
  }
}

export default function ActivitiesPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const { activities, clearActivities } = useUserData();

  const items = useMemo(() => activities.slice(0, 200), [activities]);

  return (
    <div className="min-h-screen pt-20 pb-12">
      <SEO title="Activity - Land AI" description="Your Land AI activity log." />

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between gap-4 max-w-5xl mx-auto mb-8">
          <div className="flex items-center gap-3">
            <Activity className="w-7 h-7 text-cyan-500" aria-hidden />
            <h1 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white">
              {isAr ? 'الأنشطة' : 'Activities'}
            </h1>
          </div>
          <button
            onClick={clearActivities}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Trash2 className="w-4 h-4" aria-hidden />
            {isAr ? 'مسح' : 'Clear'}
          </button>
        </div>

        <div className="max-w-5xl mx-auto glass-12d rounded-3xl border border-zinc-200 dark:border-white/10 overflow-hidden">
          {items.length === 0 ? (
            <div className="p-10 text-center text-zinc-700 dark:text-zinc-300">
              {isAr ? 'لا توجد أنشطة بعد.' : 'No activity yet.'}
            </div>
          ) : (
            <ul className="divide-y divide-zinc-200/60 dark:divide-white/10">
              {items.map((a) => {
                const desc = describe(a);
                const id = (a.meta?.id as string | undefined) ?? '';
                return (
                  <li key={a.id} className="p-5 flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <p className="font-bold text-zinc-900 dark:text-white">{desc.title}</p>
                      {desc.detail && (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400 truncate">{desc.detail}</p>
                      )}
                      <p className="text-xs text-zinc-500 dark:text-zinc-500 mt-1">{formatWhen(a.timestamp)}</p>
                    </div>
                    {a.type !== 'ai_search' && id ? (
                      <Link
                        to={`/properties/${id}`}
                        className="inline-flex items-center gap-2 text-sm font-bold text-cyan-600 dark:text-cyan-400 hover:underline shrink-0"
                      >
                        <ExternalLink className="w-4 h-4" aria-hidden />
                        {isAr ? 'فتح' : 'Open'}
                      </Link>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

