import SEO from '../../components/SEO';
import AITimeTravel from '../../components/AITimeTravel';
import { useLanguage } from '../../context/LanguageContext';

export default function PropertyFuturePage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Predict Your Property's Future - Land AI Real Estate"
        description="Use AI time travel technology to predict your property's future value and performance"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'توقع مستقبل عقارك' : 'Predict Your Property\'s Future'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'استخدم تقنية السفر عبر الزمن بالذكاء الاصطناعي للتنبؤ بقيمة وأداء عقارك المستقبلي'
            : 'Use AI time travel technology to predict your property\'s future value and performance'}
        </p>
      </div>

      <AITimeTravel />
    </div>
  );
}
