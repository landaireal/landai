import SEO from '../../components/SEO';
import MetaverseTour from '../../components/MetaverseTour';
import { useLanguage } from '../../context/LanguageContext';

export default function MetaverseTourPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Hologram Metaverse Tour - Land AI Real Estate"
        description="Take a holographic metaverse tour of properties before they are built"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'جولة الميتافيرس الهولوغرامية' : 'Hologram Metaverse Tour'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'قم بجولة هولوغرامية في الميتافيرس للعقارات قبل بنائها'
            : 'Take a holographic metaverse tour of properties before they are built'}
        </p>
      </div>

      <MetaverseTour />
    </div>
  );
}
