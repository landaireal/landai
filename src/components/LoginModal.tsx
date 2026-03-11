import { useState } from 'react';
import { X, Mail, Lock, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: Props) {
  const { login } = useAuth();
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const success = await login(email, password);
    
    if (success) {
      onClose();
      setEmail('');
      setPassword('');
    } else {
      setError(language === 'ar' ? 'بيانات اعتماد غير صالحة' : 'Invalid credentials');
    }
    
    setLoading(false);
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
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full p-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Mail className="w-4 h-4" />
                  {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@landai.ae"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Lock className="w-4 h-4" />
                  {language === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}

              <div className="text-sm text-slate-600 dark:text-slate-400 bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg">
                <p className="font-semibold mb-1">{language === 'ar' ? 'حسابات تجريبية:' : 'Demo Accounts:'}</p>
                <p>Admin: admin@landai.ae / admin123</p>
                <p>User: user@landai.ae / user123</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <LogIn className="w-5 h-5" />
                {loading ? (language === 'ar' ? 'جاري تسجيل الدخول...' : 'Logging in...') : (language === 'ar' ? 'تسجيل الدخول' : 'Login')}
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
