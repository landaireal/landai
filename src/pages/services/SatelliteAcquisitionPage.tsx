import SEO from '../../components/SEO';
import OrbitalScanner from '../../components/OrbitalScanner';
import { useLanguage } from '../../context/LanguageContext';

export default function SatelliteAcquisitionPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Satellite Land Acquisition - Land AI Real Estate"
        description="Advanced satellite technology for land scanning and acquisition"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'الاستحواذ على الأراضي عبر الأقمار الصناعية' : 'Satellite Land Acquisition'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'تقنية الأقمار الصناعية المتقدمة لمسح الأراضي والاستحواذ عليها'
            : 'Advanced satellite technology for land scanning and acquisition'}
        </p>
      </div>

      <OrbitalScanner />
    </div>
  );
}
