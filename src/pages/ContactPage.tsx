import Contact from '../components/Contact';
import { useLanguage } from '../context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          {t('contact.title')}
        </h1>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto">
          {t('contact.subtitle')}
        </p>
      </div>
      <Contact />
    </div>
  );
}
