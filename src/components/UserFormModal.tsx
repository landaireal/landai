import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { userStorage, StoredUser } from '../services/storage';

interface Props {
  user: StoredUser | null;
  onClose: () => void;
  onSave: () => void;
}

export default function UserFormModal({ user, onClose, onSave }: Props) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' as 'admin' | 'user',
    status: 'Active' as 'Active' | 'Inactive'
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: user.password,
        role: user.role,
        status: user.status
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (user) {
      // Update existing user
      userStorage.update(user.id, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        status: formData.status
      });
    } else {
      // Create new user
      userStorage.create({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random&color=fff&size=128`,
        status: formData.status
      });
    }
    
    onSave();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full"
      >
        <div className="border-b border-slate-200 dark:border-slate-700 p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {user 
              ? (language === 'ar' ? 'تعديل المستخدم' : 'Edit User')
              : (language === 'ar' ? 'إضافة مستخدم جديد' : 'Add New User')
            }
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {language === 'ar' ? 'الاسم' : 'Name'}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {language === 'ar' ? 'كلمة المرور' : 'Password'}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              placeholder={user ? (language === 'ar' ? 'اتركها فارغة للحفاظ على الحالية' : 'Leave blank to keep current') : ''}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              required={!user}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {language === 'ar' ? 'الدور' : 'Role'}
            </label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value as 'admin' | 'user' })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              required
            >
              <option value="user">{language === 'ar' ? 'مستخدم' : 'User'}</option>
              <option value="admin">{language === 'ar' ? 'مسؤول' : 'Admin'}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              {language === 'ar' ? 'الحالة' : 'Status'}
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
              className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              required
            >
              <option value="Active">{language === 'ar' ? 'نشط' : 'Active'}</option>
              <option value="Inactive">{language === 'ar' ? 'غير نشط' : 'Inactive'}</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white rounded-xl font-semibold hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <Save className="w-5 h-5" />
              {language === 'ar' ? 'حفظ' : 'Save'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
