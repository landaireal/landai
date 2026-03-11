import SEO from '../../components/SEO';
import NeuralArchitect from '../../components/NeuralArchitect';
import { useLanguage } from '../../context/LanguageContext';

export default function QuantumSpacePage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Quantum Space Generation - Land AI Real Estate"
        description="Experience the future of architecture with our AI-powered Quantum Space Generator"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'توليد الفضاء الكمي' : 'Quantum Space Generation'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'اختبر مستقبل الهندسة المعمارية مع مولد الفضاء الكمي المدعوم بالذكاء الاصطناعي'
            : 'Experience the future of architecture with our AI-powered Quantum Space Generator'}
        </p>
      </div>

      <NeuralArchitect />
    </div>
  );
}
