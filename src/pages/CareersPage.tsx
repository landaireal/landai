import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, MapPin, Clock, ArrowRight } from 'lucide-react';

export default function CareersPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const positions = [
    {
      id: 1,
      title: isAr ? 'مطور Full Stack' : 'Full Stack Developer',
      department: isAr ? 'التكنولوجيا' : 'Technology',
      location: isAr ? 'دبي' : 'Dubai',
      type: isAr ? 'دوام كامل' : 'Full-time',
      description: isAr 
        ? 'نبحث عن مطور Full Stack متمرس للعمل على منصتنا المدعومة بالذكاء الاصطناعي والبلوكتشين.'
        : 'Looking for an experienced Full Stack Developer to work on our AI-powered and blockchain platform.',
    },
    {
      id: 2,
      title: isAr ? 'وكيل عقارات' : 'Real Estate Agent',
      department: isAr ? 'المبيعات' : 'Sales',
      location: isAr ? 'دبي وأبو ظبي' : 'Dubai & Abu Dhabi',
      type: isAr ? 'دوام كامل' : 'Full-time',
      description: isAr 
        ? 'انضم إلى فريق المبيعات لدينا وساعد العملاء في العثور على منزل أحلامهم باستخدام تقنيتنا المتطورة.'
        : 'Join our sales team and help clients find their dream homes using our cutting-edge technology.',
    },
    {
      id: 3,
      title: isAr ? 'مدير مشروع' : 'Property Manager',
      department: isAr ? 'الإدارة' : 'Operations',
      location: isAr ? 'دبي' : 'Dubai',
      type: isAr ? 'دوام كامل' : 'Full-time',
      description: isAr 
        ? 'إدارة محفظة من العقارات الفاخرة وضمان رضا المستأجرين والمستثمرين.'
        : 'Manage a portfolio of luxury properties and ensure tenant and investor satisfaction.',
    },
    {
      id: 4,
      title: isAr ? 'مهندس ذكاء اصطناعي' : 'AI Engineer',
      department: isAr ? 'التكنولوجيا' : 'Technology',
      location: isAr ? 'دبي' : 'Dubai',
      type: isAr ? 'دوام كامل' : 'Full-time',
      description: isAr 
        ? 'تطوير وتحسين نماذج الذكاء الاصطناعي لتقييم العقارات والتنبؤ بالسوق.'
        : 'Develop and improve AI models for property valuation and market prediction.',
    },
    {
      id: 5,
      title: isAr ? 'مسوق رقمي' : 'Digital Marketing Specialist',
      department: isAr ? 'التسويق' : 'Marketing',
      location: isAr ? 'دبي' : 'Dubai',
      type: isAr ? 'دوام كامل' : 'Full-time',
      description: isAr 
        ? 'قيادة استراتيجيات التسويق الرقمي لزيادة الوعي بالعلامة التجارية وجذب العملاء.'
        : 'Lead digital marketing strategies to increase brand awareness and attract clients.',
    },
    {
      id: 6,
      title: isAr ? 'مستشار استثماري' : 'Investment Consultant',
      department: isAr ? 'الاستثمار' : 'Investment',
      location: isAr ? 'أبو ظبي' : 'Abu Dhabi',
      type: isAr ? 'دوام كامل' : 'Full-time',
      description: isAr 
        ? 'تقديم المشورة للعملاء حول فرص الاستثمار العقاري وإدارة محافظهم.'
        : 'Advise clients on real estate investment opportunities and manage their portfolios.',
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Careers - Land AI Real Estate"
        description="Join our team and help shape the future of real estate in UAE"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'الوظائف' : 'Careers'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'انضم إلى فريقنا وساعد في تشكيل مستقبل العقارات في الإمارات'
            : 'Join our team and help shape the future of real estate in UAE'}
        </p>

        {/* Why Join Us */}
        <div className="mb-20 p-12 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-3xl">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-6 text-center">
            {isAr ? 'لماذا تنضم إلينا؟' : 'Why Join Us?'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                {isAr ? 'تقنية مبتكرة' : 'Innovative Technology'}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                {isAr 
                  ? 'اعمل مع أحدث التقنيات في الذكاء الاصطناعي والبلوكتشين'
                  : 'Work with cutting-edge AI and blockchain technology'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                {isAr ? 'رواتب تنافسية' : 'Competitive Salary'}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                {isAr 
                  ? 'رواتب من بين الأفضل في السوق مع مزايا إضافية'
                  : 'Market-leading salaries with excellent benefits'}
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                {isAr ? 'نمو وظيفي' : 'Career Growth'}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                {isAr 
                  ? 'فرص للتطوير المهني والترقية'
                  : 'Opportunities for professional development and advancement'}
              </p>
            </div>
          </div>
        </div>

        {/* Open Positions */}
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
          {isAr ? 'الوظائف المتاحة' : 'Open Positions'}
        </h2>
        
        <div className="space-y-6">
          {positions.map((position) => (
            <div 
              key={position.id}
              className="p-6 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-3xl hover:border-blue-500 dark:hover:border-cyan-500 transition-all duration-300"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                    {position.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4" />
                      <span>{position.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{position.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{position.type}</span>
                    </div>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400">
                    {position.description}
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 dark:bg-cyan-600 text-white font-bold rounded-2xl hover:bg-blue-700 dark:hover:bg-cyan-700 transition-colors whitespace-nowrap">
                  {isAr ? 'تقدم الآن' : 'Apply Now'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-3xl text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            {isAr ? 'لا ترى الوظيفة المناسبة؟' : 'Don\'t See the Right Position?'}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            {isAr 
              ? 'نحن دائماً نبحث عن مواهب استثنائية. أرسل سيرتك الذاتية وسنتواصل معك.'
              : 'We\'re always looking for exceptional talent. Send us your resume and we\'ll get in touch.'}
          </p>
          <button className="px-8 py-4 bg-blue-600 dark:bg-cyan-600 text-white font-bold rounded-2xl hover:bg-blue-700 dark:hover:bg-cyan-700 transition-colors">
            {isAr ? 'أرسل سيرتك الذاتية' : 'Send Your Resume'}
          </button>
        </div>
      </div>
    </div>
  );
}
