import SEO from '../../components/SEO';
import ARPortal from '../../components/ARPortal';
import { useLanguage } from '../../context/LanguageContext';

export default function QuantumRealityPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Step Inside the Quantum Reality - Land AI Real Estate"
        description="Experience properties in quantum reality with our advanced AR portal technology"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'ادخل إلى الواقع الكمي' : 'Step Inside the Quantum Reality'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'اختبر العقارات في الواقع الكمي باستخدام تقنية البوابة الواقع المعزز المتقدمة'
            : 'Experience properties in quantum reality with our advanced AR portal technology'}
        </p>
      </div>

      <ARPortal />
    </div>
  );
}
