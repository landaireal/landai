import SEO from '../../components/SEO';
import Services from '../../components/Services';
import { useLanguage } from '../../context/LanguageContext';

export default function PremiumServicesPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Our Premium Services - Land AI Real Estate"
        description="Discover our comprehensive premium real estate services powered by AI and blockchain technology"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'خدماتنا المميزة' : 'Our Premium Services'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'نقدم خدمات عقارية شاملة مدعومة بأحدث تقنيات الذكاء الاصطناعي والبلوكتشين'
            : 'We provide comprehensive real estate services powered by cutting-edge AI and blockchain technology'}
        </p>
      </div>

      <Services />

      <div className="container mx-auto px-4 py-12">
        <div className="mt-16 p-12 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-3xl text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            {isAr ? 'هل تحتاج إلى استشارة؟' : 'Need a Consultation?'}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto text-lg">
            {isAr 
              ? 'فريقنا من الخبراء جاهز لمساعدتك في العثور على الحل المثالي لاحتياجاتك العقارية'
              : 'Our expert team is ready to help you find the perfect solution for your real estate needs'}
          </p>
          <button className="px-8 py-4 bg-blue-600 dark:bg-cyan-600 text-white font-bold rounded-2xl hover:bg-blue-700 dark:hover:bg-cyan-700 transition-colors">
            {isAr ? 'احجز استشارة مجانية' : 'Book Free Consultation'}
          </button>
        </div>
      </div>
    </div>
  );
}
