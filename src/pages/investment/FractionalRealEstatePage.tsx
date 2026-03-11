import SEO from '../../components/SEO';
import FractionalOwnership from '../../components/FractionalOwnership';
import { useLanguage } from '../../context/LanguageContext';

export default function FractionalRealEstatePage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Fractional Real Estate - Land AI Real Estate"
        description="Invest in premium properties with fractional ownership powered by blockchain"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'الملكية الجزئية للعقارات' : 'Fractional Real Estate'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'استثمر في العقارات الفاخرة بالملكية الجزئية المدعومة بالبلوكتشين'
            : 'Invest in premium properties with fractional ownership powered by blockchain'}
        </p>
      </div>

      <FractionalOwnership />
    </div>
  );
}
