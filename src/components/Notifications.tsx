import { useState, useEffect } from 'react';
import { Bell, X, TrendingUp, DollarSign, Home, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export interface Notification {
  id: string;
  type: 'price_drop' | 'new_listing' | 'saved_update' | 'market_alert';
  title: string;
  message: string;
  timestamp: number;
  read: boolean;
  propertyId?: string;
  icon?: 'trending' | 'dollar' | 'home' | 'bell';
}

export default function Notifications() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { language } = useLanguage();

  useEffect(() => {
    // Load notifications from localStorage
    const stored = localStorage.getItem('landai:notifications');
    if (stored) {
      try {
        setNotifications(JSON.parse(stored));
      } catch (e) {
        // ignore
      }
    }

    // Generate some demo notifications
    if (!stored || JSON.parse(stored).length === 0) {
      const demoNotifications: Notification[] = [
        {
          id: 'n1',
          type: 'price_drop',
          title: language === 'ar' ? 'انخفاض السعر' : 'Price Drop Alert',
          message: language === 'ar' ? 'انخفض سعر فيلا نخلة جميرا بنسبة 10%' : 'Palm Jumeirah Villa price dropped by 10%',
          timestamp: Date.now() - 3600000,
          read: false,
          propertyId: 'villa-1',
          icon: 'dollar'
        },
        {
          id: 'n2',
          type: 'new_listing',
          title: language === 'ar' ? 'عقار جديد' : 'New Listing',
          message: language === 'ar' ? 'عقار جديد في دبي مارينا يطابق معاييرك' : 'New property in Dubai Marina matches your criteria',
          timestamp: Date.now() - 7200000,
          read: false,
          icon: 'home'
        },
        {
          id: 'n3',
          type: 'market_alert',
          title: language === 'ar' ? 'تنبيه السوق' : 'Market Alert',
          message: language === 'ar' ? 'ارتفع متوسط أسعار العقارات في وسط مدينة دبي بنسبة 5%' : 'Downtown Dubai property prices increased by 5%',
          timestamp: Date.now() - 86400000,
          read: true,
          icon: 'trending'
        }
      ];
      setNotifications(demoNotifications);
      localStorage.setItem('landai:notifications', JSON.stringify(demoNotifications));
    }
  }, [language]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    const updated = notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    );
    setNotifications(updated);
    localStorage.setItem('landai:notifications', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('landai:notifications', JSON.stringify(updated));
  };

  const removeNotification = (id: string) => {
    const updated = notifications.filter(n => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('landai:notifications', JSON.stringify(updated));
  };

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem('landai:notifications', JSON.stringify([]));
  };

  const getIcon = (iconType?: string) => {
    switch (iconType) {
      case 'dollar':
        return <DollarSign className="w-5 h-5" />;
      case 'home':
        return <Home className="w-5 h-5" />;
      case 'trending':
        return <TrendingUp className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return language === 'ar' ? `منذ ${days} يوم` : `${days}d ago`;
    if (hours > 0) return language === 'ar' ? `منذ ${hours} ساعة` : `${hours}h ago`;
    if (minutes > 0) return language === 'ar' ? `منذ ${minutes} دقيقة` : `${minutes}m ago`;
    return language === 'ar' ? 'الآن' : 'just now';
  };

  return (
    <div className="relative">
      {/* Notification bell button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors"
        aria-label={language === 'ar' ? 'الإشعارات' : 'Notifications'}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute right-0 top-14 w-96 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {language === 'ar' ? 'الإشعارات' : 'Notifications'}
              </h3>
              {notifications.length > 0 && (
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-xs text-blue-600 dark:text-cyan-400 hover:underline"
                    >
                      {language === 'ar' ? 'تحديد الكل كمقروء' : 'Mark all read'}
                    </button>
                  )}
                  <button
                    onClick={clearAll}
                    className="text-xs text-red-600 dark:text-red-400 hover:underline"
                  >
                    {language === 'ar' ? 'مسح الكل' : 'Clear all'}
                  </button>
                </div>
              )}
            </div>

            {/* Notifications list */}
            <div className="max-h-96 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700 mb-3" />
                  <p className="text-slate-500 dark:text-slate-400">
                    {language === 'ar' ? 'لا توجد إشعارات' : 'No notifications'}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-slate-200 dark:divide-slate-700">
                  {notifications.map(notification => (
                    <div
                      key={notification.id}
                      className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer ${
                        !notification.read ? 'bg-blue-50/50 dark:bg-cyan-900/10' : ''
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-full ${
                          notification.type === 'price_drop' ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' :
                          notification.type === 'new_listing' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' :
                          'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                        }`}>
                          {getIcon(notification.icon)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-semibold text-sm text-slate-900 dark:text-white">
                              {notification.title}
                            </h4>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                              className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors"
                            >
                              <X className="w-4 h-4 text-slate-400" />
                            </button>
                          </div>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                            {notification.message}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-slate-500 dark:text-slate-500">
                            <Clock className="w-3 h-3" />
                            {getTimeAgo(notification.timestamp)}
                          </div>
                        </div>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
