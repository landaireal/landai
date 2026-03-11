import SEO from '../../components/SEO';
import HolographicFloorplan from '../../components/HolographicFloorplan';
import { useLanguage } from '../../context/LanguageContext';

export default function HolographicFloorplanPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Quantum Space Generator - Land AI Real Estate"
        description="Generate and visualize property spaces in holographic 3D with our quantum technology"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'مولد الفضاء الكمي' : 'Quantum Space Generator'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'قم بتوليد وتصور مساحات العقارات بتقنية ثلاثية الأبعاد الهولوغرافية'
            : 'Generate and visualize property spaces in holographic 3D with our quantum technology'}
        </p>
      </div>

      <HolographicFloorplan />
    </div>
  );
}
