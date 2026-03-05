import SEO from '../../components/SEO';
import Investors from '../../components/Investors';
import Stats from '../../components/Stats';
import { useLanguage } from '../../context/LanguageContext';

export default function WealthGrowthPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="The Smart Way to Grow Wealth - Land AI Real Estate"
        description="Build your wealth intelligently with AI-powered real estate investments"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'الطريقة الذكية لتنمية الثروة' : 'The Smart Way to Grow Wealth'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'ابنِ ثروتك بذكاء من خلال الاستثمارات العقارية المدعومة بالذكاء الاصطناعي'
            : 'Build your wealth intelligently with AI-powered real estate investments'}
        </p>
      </div>

      <Stats />
      <Investors />
    </div>
  );
}
