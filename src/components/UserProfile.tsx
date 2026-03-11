import { useState } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface UserData {
  name: string;
  email: string;
  phone: string;
  location: string;
  avatar: string;
}

export default function UserProfile() {
  const { language } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>(() => {
    const stored = localStorage.getItem('landai:userProfile');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        // ignore
      }
    }
    return {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+971 50 123 4567',
      location: 'Dubai, UAE',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=3b82f6&color=fff&size=128'
    };
  });

  const [editData, setEditData] = useState(userData);

  const handleSave = () => {
    setUserData(editData);
    localStorage.setItem('landai:userProfile', JSON.stringify(editData));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData(userData);
    setIsEditing(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          {language === 'ar' ? 'الملف الشخصي' : 'User Profile'}
        </h3>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="p-2 rounded-lg bg-blue-500 hover:bg-blue-600 dark:bg-cyan-500 dark:hover:bg-cyan-600 text-white transition-colors"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="p-2 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center mb-6">
        <img
          src={userData.avatar}
          alt={userData.name}
          className="w-24 h-24 rounded-full border-4 border-blue-500 dark:border-cyan-500"
        />
      </div>

      <div className="space-y-4">
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            <User className="w-4 h-4" />
            {language === 'ar' ? 'الاسم' : 'Name'}
          </label>
          <input
            type="text"
            value={isEditing ? editData.name : userData.name}
            onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white disabled:opacity-60"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            <Mail className="w-4 h-4" />
            {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
          </label>
          <input
            type="email"
            value={isEditing ? editData.email : userData.email}
            onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white disabled:opacity-60"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            <Phone className="w-4 h-4" />
            {language === 'ar' ? 'الهاتف' : 'Phone'}
          </label>
          <input
            type="tel"
            value={isEditing ? editData.phone : userData.phone}
            onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white disabled:opacity-60"
          />
        </div>

        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
            <MapPin className="w-4 h-4" />
            {language === 'ar' ? 'الموقع' : 'Location'}
          </label>
          <input
            type="text"
            value={isEditing ? editData.location : userData.location}
            onChange={(e) => setEditData({ ...editData, location: e.target.value })}
            disabled={!isEditing}
            className="w-full px-4 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white disabled:opacity-60"
          />
        </div>
      </div>
    </div>
  );
}
