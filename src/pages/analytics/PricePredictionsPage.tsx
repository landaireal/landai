import SEO from '../../components/SEO';
import PredictiveAnalytics from '../../components/PredictiveAnalytics';
import { useLanguage } from '../../context/LanguageContext';

export default function PricePredictionsPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="12D AI Price Predictions - Land AI Real Estate"
        description="Get accurate property price predictions powered by our 12D AI technology"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'توقعات الأسعار بالذكاء الاصطناعي 12D' : '12D AI Price Predictions'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'احصل على توقعات دقيقة لأسعار العقارات مدعومة بتقنية الذكاء الاصطناعي 12D'
            : 'Get accurate property price predictions powered by our 12D AI technology'}
        </p>
      </div>

      <PredictiveAnalytics />
    </div>
  );
}
