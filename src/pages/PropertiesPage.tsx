import PropertyList from '../components/PropertyList';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

export default function PropertiesPage() {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="Luxury Properties - Land AI Real Estate"
        description="Browse our exclusive collection of premium properties in Dubai & Abu Dhabi. AI-powered search and blockchain verification."
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          {t('properties.title')}
        </h1>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-12 max-w-3xl mx-auto">
          {t('properties.subtitle')}
        </p>
        <div className="text-center mb-8">
          <p className="text-lg font-semibold text-blue-600 dark:text-cyan-400">
            Explore our collection of luxury properties
          </p>
        </div>
      </div>
      <PropertyList />
    </div>
  );
}
