import SEO from '../../components/SEO';
import Heatmap from '../../components/Heatmap';
import { useLanguage } from '../../context/LanguageContext';

export default function HeatmapPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="12D AI Investment Heatmap - Land AI Real Estate"
        description="Visualize investment opportunities with our advanced 12D AI-powered heatmap"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'خريطة الاستثمار بالذكاء الاصطناعي 12D' : '12D AI Investment Heatmap'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'تصور فرص الاستثمار باستخدام خريطة الحرارة المتقدمة المدعومة بالذكاء الاصطناعي'
            : 'Visualize investment opportunities with our advanced 12D AI-powered heatmap'}
        </p>
      </div>

      <Heatmap />
    </div>
  );
}
