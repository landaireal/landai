import SEO from '../../components/SEO';
import Contact from '../../components/Contact';
import CTA from '../../components/CTA';
import { useLanguage } from '../../context/LanguageContext';

export default function BuildFuturePage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Let's Build Your Future Together - Land AI Real Estate"
        description="Partner with us to build your real estate future with AI and blockchain technology"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'لنبني مستقبلك معاً' : 'Let\'s Build Your Future Together'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'شاركنا في بناء مستقبلك العقاري بتقنيات الذكاء الاصطناعي والبلوكتشين'
            : 'Partner with us to build your real estate future with AI and blockchain technology'}
        </p>
      </div>

      <CTA />
      <Contact />
    </div>
  );
}
