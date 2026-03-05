import SEO from '../../components/SEO';
import DroneScanner from '../../components/DroneScanner';
import { useLanguage } from '../../context/LanguageContext';

export default function DroneValuationPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Real-Time AI Drone Property Valuation - Land AI Real Estate"
        description="Get instant property valuations using our advanced AI-powered drone scanning technology"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'تقييم العقارات بالطائرات الذكية في الوقت الفعلي' : 'Real-Time AI Drone Property Valuation'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'احصل على تقييمات فورية للعقارات باستخدام تقنية المسح بالطائرات المدعومة بالذكاء الاصطناعي'
            : 'Get instant property valuations using our advanced AI-powered drone scanning technology'}
        </p>
      </div>

      <DroneScanner />
    </div>
  );
}
