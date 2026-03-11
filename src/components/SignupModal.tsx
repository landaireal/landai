import { useState } from 'react';
import { X, Mail, Lock, User, Phone, MapPin, UserPlus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { userStorage } from '../services/storage';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SignupModal({ isOpen, onClose, onSuccess }: Props) {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError(language === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError(language === 'ar' ? 'يجب أن تكون كلمة المرور 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    // Check if email already exists
    const existingUser = userStorage.getByEmail(formData.email);
    if (existingUser) {
      setError(language === 'ar' ? 'البريد الإلكتروني مستخدم بالفعل' : 'Email already exists');
      setLoading(false);
      return;
    }

    // Create new user
    try {
      const newUser = userStorage.create({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: 'user',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=random&color=fff&size=128`,
        status: 'Active'
      });

      // Success
      setFormData({ name: '', email: '', password: '', confirmPassword: '', phone: '', location: '' });
      setLoading(false);
      
      if (onSuccess) {
        onSuccess();
      } else {
        onClose();
      }
      
      alert(language === 'ar' ? 'تم إنشاء الحساب بنجاح! يمكنك الآن تسجيل الدخول.' : 'Account created successfully! You can now login.');
    } catch (err) {
      setError(language === 'ar' ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' : 'An error occurred. Please try again.');
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? 'إنشاء حساب' : 'Create Account'}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <User className="w-4 h-4" />
                  {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Mail className="w-4 h-4" />
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={language === 'ar' ? 'example@email.com' : 'example@email.com'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Phone className="w-4 h-4" />
                  {language === 'ar' ? 'رقم الهاتف (اختياري)' : 'Phone Number (Optional)'}
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+971 50 123 4567"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <MapPin className="w-4 h-4" />
                  {language === 'ar' ? 'الموقع (اختياري)' : 'Location (Optional)'}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder={language === 'ar' ? 'دبي، الإمارات' : 'Dubai, UAE'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Lock className="w-4 h-4" />
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder={language === 'ar' ? '6 أحرف على الأقل' : 'At least 6 characters'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Lock className="w-4 h-4" />
                  {language === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'}
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder={language === 'ar' ? 'أعد إدخال كلمة المرور' : 'Re-enter password'}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">{error}</p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <UserPlus className="w-5 h-5" />
                {loading ? (language === 'ar' ? 'جاري الإنشاء...' : 'Creating...') : (language === 'ar' ? 'إنشاء حساب' : 'Create Account')}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
