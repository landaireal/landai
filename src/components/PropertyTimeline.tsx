import { Clock, TrendingUp, TrendingDown, Eye, Heart, DollarSign } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TimelineEvent {
  id: string;
  type: 'price_change' | 'view' | 'saved' | 'market_update';
  title: string;
  description: string;
  timestamp: number;
  value?: number;
  change?: number;
}

interface Props {
  propertyId: string;
}

export default function PropertyTimeline({ propertyId }: Props) {
  const { language } = useLanguage();

  // Demo timeline events
  const events: TimelineEvent[] = [
    {
      id: '1',
      type: 'price_change',
      title: language === 'ar' ? 'تغيير السعر' : 'Price Reduced',
      description: language === 'ar' ? 'انخفض السعر بنسبة 5%' : 'Price reduced by 5%',
      timestamp: Date.now() - 86400000 * 2,
      value: 4750000,
      change: -5
    },
    {
      id: '2',
      type: 'view',
      title: language === 'ar' ? 'زيادة المشاهدات' : 'High Interest',
      description: language === 'ar' ? '127 مشاهدة في آخر 7 أيام' : '127 views in last 7 days',
      timestamp: Date.now() - 86400000 * 5,
    },
    {
      id: '3',
      type: 'market_update',
      title: language === 'ar' ? 'تحديث السوق' : 'Market Update',
      description: language === 'ar' ? 'ارتفعت أسعار المنطقة بنسبة 3%' : 'Area prices increased by 3%',
      timestamp: Date.now() - 86400000 * 10,
      change: 3
    },
    {
      id: '4',
      type: 'saved',
      title: language === 'ar' ? 'تم الحفظ' : 'Saved by Users',
      description: language === 'ar' ? 'تم حفظه بواسطة 24 مستخدمًا' : 'Saved by 24 users',
      timestamp: Date.now() - 86400000 * 15,
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'price_change':
        return <DollarSign className="w-5 h-5" />;
      case 'view':
        return <Eye className="w-5 h-5" />;
      case 'saved':
        return <Heart className="w-5 h-5" />;
      case 'market_update':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Clock className="w-5 h-5" />;
    }
  };

  const getTimeAgo = (timestamp: number) => {
    const days = Math.floor((Date.now() - timestamp) / (1000 * 60 * 60 * 24));
    if (days === 0) return language === 'ar' ? 'اليوم' : 'Today';
    if (days === 1) return language === 'ar' ? 'أمس' : 'Yesterday';
    return language === 'ar' ? `منذ ${days} يوم` : `${days} days ago`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
        <Clock className="w-6 h-6" />
        {language === 'ar' ? 'الجدول الزمني للعقار' : 'Property Timeline'}
      </h3>

      <div className="space-y-6">
        {events.map((event, index) => (
          <div key={event.id} className="relative pl-8">
            {/* Timeline line */}
            {index !== events.length - 1 && (
              <div className="absolute left-[15px] top-10 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500"></div>
            )}

            {/* Event */}
            <div className="flex items-start gap-4">
              <div className={`absolute left-0 p-2 rounded-full ${
                event.type === 'price_change' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                event.type === 'view' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                event.type === 'saved' ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' :
                'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
              }`}>
                {getIcon(event.type)}
              </div>

              <div className="flex-1 ml-8">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {event.title}
                  </h4>
                  {event.change && (
                    <span className={`flex items-center gap-1 text-sm font-semibold ${
                      event.change > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {event.change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      {Math.abs(event.change)}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                  {event.description}
                </p>
                {event.value && (
                  <p className="text-lg font-bold text-blue-600 dark:text-cyan-400">
                    ${event.value.toLocaleString()}
                  </p>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                  {getTimeAgo(event.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
