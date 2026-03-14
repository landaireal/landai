import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function NotFoundPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-12 bg-white dark:bg-slate-900">
      <SEO
        title="404 - Page Not Found | Land AI Real Estate"
        description="The page you are looking for does not exist or has been moved."
      />
      <div className="max-w-md w-full text-center">
        <p className="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 mb-4">
          404
        </p>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
          {t('pageNotFound')}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-8">
          {t('pageNotFoundDesc')}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-[#030014]"
          >
            <Home className="w-5 h-5" aria-hidden />
            {t('goToHome')}
          </Link>
          <Link
            to="/properties"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 font-semibold rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:ring-offset-2 dark:focus:ring-offset-[#030014]"
          >
            <Search className="w-5 h-5" aria-hidden />
            {t('browseProperties')}
          </Link>
        </div>
      </div>
    </div>
  );
}
