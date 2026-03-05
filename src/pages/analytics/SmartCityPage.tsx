import SEO from '../../components/SEO';
import SmartCityMatrix from '../../components/SmartCityMatrix';
import { useLanguage } from '../../context/LanguageContext';

export default function SmartCityPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="12D Smart City Matrix - Land AI Real Estate"
        description="Navigate the future of urban real estate with our 12D Smart City Matrix technology"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'مصفوفة المدينة الذكية 12D' : '12D Smart City Matrix'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'تنقل في مستقبل العقارات الحضرية باستخدام تقنية مصفوفة المدينة الذكية 12D'
            : 'Navigate the future of urban real estate with our 12D Smart City Matrix technology'}
        </p>
      </div>

      <SmartCityMatrix />
    </div>
  );
}
