import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Fingerprint } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Logo } from './Logo';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const location = useLocation();
  
  const isDark = theme === 'dark';
  const isAr = language === 'ar';
  
  const toggleLanguage = () => {
    setLanguage(isAr ? 'en' : 'ar');
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: isAr ? 'الرئيسية' : 'Home', href: '/' },
    { name: isAr ? 'الخدمات' : 'Services', href: '/services' },
    { name: isAr ? 'العقارات' : 'Properties', href: '/properties' },
    { name: isAr ? 'المستثمرون' : 'Investors', href: '/investors' },
    { name: isAr ? 'المدونة' : 'Blog', href: '/blog' },
    { name: isAr ? 'من نحن' : 'About', href: '/about' },
    { name: isAr ? 'اتصل بنا' : 'Contact', href: '/contact' },
  ];

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 pt-6 px-4 ${scrolled ? 'top-0 pt-4' : 'top-0'}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto glass-pill rounded-full px-6 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <Logo className="w-16 h-16 sm:w-20 sm:h-20" />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-800/80 rounded-full p-1 border border-zinc-200/50 dark:border-zinc-700/50">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all hover:shadow-sm ${
                location.pathname === link.href
                  ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-cyan-400'
                  : 'hover:bg-white dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <select 
            value={language} 
            onChange={(e) => setLanguage(e.target.value as any)}
            className="p-2.5 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors font-bold text-xs cursor-pointer border-none outline-none"
          >
            <option value="en">EN</option>
            <option value="ar">AR</option>
            <option value="fr">FR</option>
            <option value="es">ES</option>
            <option value="de">DE</option>
            <option value="zh">中文</option>
          </select>
          
          <button onClick={toggleTheme} className="p-2.5 rounded-full bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 transition-colors">
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a href="#tokenization" className="group bg-blue-50 dark:glass-12d text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-cyan-500/50 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-blue-100 dark:hover:bg-cyan-900/40 shadow-sm hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all flex items-center gap-2 uppercase tracking-widest">
            <Fingerprint className="w-4 h-4 group-hover:scale-110 transition-transform" />
            {isAr ? 'ربط الهوية' : 'Connect ID'}
          </a>
        </div>

        {/* Mobile menu button */}
        <button 
          className="lg:hidden p-2 text-zinc-900 dark:text-white" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle mobile menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="lg:hidden absolute top-24 left-4 right-4 glass-pill rounded-3xl p-4 flex flex-col gap-2">
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
              onChange={(e) => setLanguage(e.target.value as any)}
              className="flex-1 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-sm cursor-pointer border-none outline-none"
            >
              <option value="en">English</option>
              <option value="ar">العربية</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="zh">中文</option>
            </select>
            <button onClick={toggleTheme} className="flex-1 p-3 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 flex justify-center">
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}