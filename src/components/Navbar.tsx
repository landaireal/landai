import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Fingerprint, Heart, Activity, User, LogOut, Shield } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';
import Notifications from './Notifications';
import ConnectIDModal from './ConnectIDModal';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showConnectID, setShowConnectID] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const location = useLocation();
  
  const isDark = theme === 'dark';
  
  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('home'), href: '/' },
    { name: t('services'), href: '/services' },
    { name: t('properties'), href: '/properties' },
    { name: language === 'ar' ? 'المحفوظات' : 'Saved', href: '/saved' },
    { name: language === 'ar' ? 'الأنشطة' : 'Activities', href: '/activities' },
    { name: t('investorsNav'), href: '/investors' },
    { name: t('blog'), href: '/blog' },
    { name: t('aboutUs'), href: '/about' },
    { name: t('contact'), href: '/contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 pt-6 px-4 ${scrolled ? 'top-0 pt-4' : 'top-0'}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-[1400px] mx-auto glass-pill rounded-full px-6 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Logo className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-0.5 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-full p-1 border border-zinc-200/50 dark:border-zinc-700/50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`px-3 py-2 rounded-full text-xs font-semibold transition-all hover:shadow-sm whitespace-nowrap ${
                location.pathname === link.href
                  ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-cyan-400'
                  : 'hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-2">
          <Notifications />
          <Link
            to="/saved"
            className="p-2 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#030014]"
            aria-label={language === 'ar' ? 'المحفوظات' : 'Saved'}
          >
            <Heart className="w-4 h-4" aria-hidden />
          </Link>
          <Link
            to="/activities"
            className="p-2 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#030014]"
            aria-label={language === 'ar' ? 'الأنشطة' : 'Activities'}
          >
            <Activity className="w-4 h-4" aria-hidden />
          </Link>
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as 'en' | 'ar' | 'fr' | 'es' | 'de' | 'zh')}
            aria-label={language === 'ar' ? 'اختر اللغة' : 'Select language'}
            className="p-2 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors font-bold text-xs cursor-pointer border-none outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#030014]"
          >
            <option value="en">EN</option>
            <option value="ar">AR</option>
            <option value="fr">FR</option>
            <option value="es">ES</option>
            <option value="de">DE</option>
            <option value="zh">中文</option>
          </select>
          
          <button 
            onClick={toggleTheme} 
            aria-label={isDark ? (language === 'ar' ? 'تفعيل الوضع الفاتح' : 'Switch to light mode') : (language === 'ar' ? 'تفعيل الوضع الداكن' : 'Switch to dark mode')}
            className="p-2 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#030014]"
          >
            {isDark ? <Sun className="w-4 h-4" aria-hidden /> : <Moon className="w-4 h-4" aria-hidden />}
          </button>

          {!isAuthenticated ? (
            <>
              <button
                onClick={() => setShowConnectID(true)}
                className="group bg-blue-50 dark:glass-12d text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-cyan-500/50 px-4 py-2 rounded-full font-bold text-xs hover:bg-blue-100 dark:hover:bg-cyan-900/40 shadow-sm hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all flex items-center gap-1 uppercase tracking-wider focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#030014] whitespace-nowrap"
              >
                <Fingerprint className="w-4 h-4 group-hover:scale-110 transition-transform" aria-hidden />
                {t('connectId')}
              </button>
              <button
                onClick={() => setShowLogin(true)}
                className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white rounded-full font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all whitespace-nowrap"
              >
                {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
              </button>
              <button
                onClick={() => setShowSignup(true)}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 dark:from-cyan-500 dark:to-blue-500 text-white rounded-full font-bold text-xs hover:shadow-lg transition-all whitespace-nowrap"
              >
                {language === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
              </button>
            </>
          ) : (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-3 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <img
                  src={user?.avatar || 'https://ui-avatars.com/api/?name=User&background=3b82f6&color=fff&size=128'}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full"
                />
                <span className="font-semibold text-slate-900 dark:text-white">{user?.name}</span>
                {isAdmin && (
                  <Shield className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                )}
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-14 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                  <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                    <p className="font-semibold text-slate-900 dark:text-white">{user?.name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{user?.email}</p>
                    {isAdmin && (
                      <span className="inline-block mt-2 px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-semibold rounded-full">
                        Admin
                      </span>
                    )}
                  </div>
                  <div className="p-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors text-slate-700 dark:text-slate-300"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <User className="w-4 h-4" />
                      {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                    </Link>
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl transition-colors text-purple-600 dark:text-purple-400"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Shield className="w-4 h-4" />
                        {language === 'ar' ? 'لوحة التحكم' : 'Admin Dashboard'}
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors text-red-600 dark:text-red-400"
                    >
                      <LogOut className="w-4 h-4" />
                      {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden p-2 text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#030014] rounded-lg" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label={language === 'ar' ? 'فتح القائمة' : 'Toggle mobile menu'}
          aria-expanded={isOpen}
          aria-controls="mobile-nav-menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Modals */}
      <ConnectIDModal isOpen={showConnectID} onClose={() => setShowConnectID(false)} />
      <LoginModal isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <SignupModal 
        isOpen={showSignup} 
        onClose={() => setShowSignup(false)}
        onSuccess={() => {
          setShowSignup(false);
          setShowLogin(true);
        }}
      />

      {/* Mobile Nav */}
      {isOpen && (
        <div id="mobile-nav-menu" className="lg:hidden absolute top-24 left-4 right-4 glass-pill rounded-3xl p-4 flex flex-col gap-2" role="menu">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`px-4 py-3 rounded-xl font-medium transition-all ${
                location.pathname === link.href
                  ? 'bg-zinc-100 dark:bg-zinc-800 text-blue-600 dark:text-cyan-400'
                  : 'text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="flex gap-2 p-2">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value as 'en' | 'ar' | 'fr' | 'es' | 'de' | 'zh')}
              aria-label={language === 'ar' ? 'اختر اللغة' : 'Select language'}
              className="flex-1 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-sm cursor-pointer border-none outline-none"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
            </select>
            <button 
              onClick={toggleTheme} 
              aria-label={isDark ? (language === 'ar' ? 'تفعيل الوضع الفاتح' : 'Switch to light mode') : (language === 'ar' ? 'تفعيل الوضع الداكن' : 'Switch to dark mode')}
              className="flex-1 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex justify-center focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {isDark ? <Sun className="w-5 h-5" aria-hidden /> : <Moon className="w-5 h-5" aria-hidden />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}