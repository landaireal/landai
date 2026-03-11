import { useState } from 'react';
import { Calendar, Clock, Video, User, Mail, Phone } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  propertyId: string;
  propertyTitle: string;
}

export default function VirtualTourScheduler({ propertyId, propertyTitle }: Props) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle tour scheduling
    alert(language === 'ar' ? 'تم جدولة الجولة الافتراضية بنجاح!' : 'Virtual tour scheduled successfully!');
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-6 border border-blue-200 dark:border-slate-700">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-blue-500 dark:bg-cyan-500 rounded-xl">
          <Video className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            {language === 'ar' ? 'جدولة جولة افتراضية' : 'Schedule Virtual Tour'}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400">{propertyTitle}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <User className="w-4 h-4" />
            {language === 'ar' ? 'الاسم' : 'Name'}
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <Mail className="w-4 h-4" />
            {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            <Phone className="w-4 h-4" />
            {language === 'ar' ? 'الهاتف' : 'Phone'}
          </label>
          <input
            type="tel"
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Calendar className="w-4 h-4" />
              {language === 'ar' ? 'التاريخ' : 'Date'}
            </label>
            <input
              type="date"
              required
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              <Clock className="w-4 h-4" />
              {language === 'ar' ? 'الوقت' : 'Time'}
            </label>
            <input
              type="time"
              required
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
        >
          {language === 'ar' ? 'جدولة الجولة' : 'Schedule Tour'}
        </button>
      </form>
    </div>
  );
}
