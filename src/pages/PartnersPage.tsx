import SEO from '../components/SEO';
import Partners from '../components/Partners';
import { useLanguage } from '../context/LanguageContext';
import { Handshake, Globe, Award, Users } from 'lucide-react';

export default function PartnersPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const benefits = [
    {
      icon: Globe,
      title: isAr ? 'وصول عالمي' : 'Global Reach',
      description: isAr ? 'شبكة واسعة من المستثمرين والمشترين الدوليين' : 'Extensive network of international investors and buyers',
    },
    {
      icon: Award,
      title: isAr ? 'تكنولوجيا متقدمة' : 'Advanced Technology',
      description: isAr ? 'منصة الذكاء الاصطناعي والبلوكتشين الحائزة على جوائز' : 'Award-winning AI and blockchain platform',
    },
    {
      icon: Users,
      title: isAr ? 'فريق خبراء' : 'Expert Team',
      description: isAr ? 'محترفون ذوو خبرة في العقارات والتكنولوجيا' : 'Experienced professionals in real estate and technology',
    },
    {
      icon: Handshake,
      title: isAr ? 'شراكات مربحة' : 'Win-Win Partnerships',
      description: isAr ? 'نماذج عمولة تنافسية ونمو مشترك' : 'Competitive commission models and mutual growth',
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Partners - Land AI Real Estate"
        description="Join our network of trusted partners and grow your business with us"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'شركاؤنا' : 'Our Partners'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'انضم إلى شبكة شركائنا الموثوقين وحقق نمواً معنا'
            : 'Join our network of trusted partners and grow your business with us'}
        </p>

        {/* Partnership Benefits */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8 text-center">
            {isAr ? 'لماذا تصبح شريكاً؟' : 'Why Become a Partner?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className="p-6 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-2xl text-center"
                >
                  <Icon className="w-12 h-12 text-blue-600 dark:text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">{benefit.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Partners Component */}
        <Partners />

        {/* Become a Partner CTA */}
        <div className="mt-20 p-12 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-3xl text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">
            {isAr ? 'هل تريد أن تصبح شريكاً؟' : 'Want to Become a Partner?'}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto text-lg">
            {isAr 
              ? 'نحن نبحث دائماً عن شركاء استراتيجيين لتوسيع شبكتنا وتقديم قيمة أكبر لعملائنا.'
              : 'We\'re always looking for strategic partners to expand our network and deliver greater value to our clients.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-blue-600 dark:bg-cyan-600 text-white font-bold rounded-2xl hover:bg-blue-700 dark:hover:bg-cyan-700 transition-colors">
              {isAr ? 'تقدم بطلب شراكة' : 'Apply for Partnership'}
            </button>
            <button className="px-8 py-4 bg-transparent border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-white font-bold rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors">
              {isAr ? 'تنزيل حزمة الشراكة' : 'Download Partnership Pack'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
