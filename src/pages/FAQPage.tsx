import { useState } from 'react';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: isAr ? 'كيف يعمل التحقق من البلوكتشين؟' : 'How does blockchain verification work?',
      answer: isAr 
        ? 'جميع عقاراتنا مسجلة على البلوكتشين، مما يوفر شفافية كاملة وإثباتاً للملكية. كل معاملة تتم تسجيلها وتوثيقها بشكل دائم، مما يضمن الأمان والثقة.'
        : 'All our properties are registered on blockchain, providing complete transparency and proof of ownership. Every transaction is permanently recorded and verified, ensuring security and trust.',
    },
    {
      question: isAr ? 'ما هي الملكية الجزئية؟' : 'What is fractional ownership?',
      answer: isAr
        ? 'الملكية الجزئية تتيح لك شراء حصة من عقار بدلاً من العقار بأكمله. يمكنك الاستثمار برأس مال أقل والاستفادة من العوائد الإيجارية وارتفاع القيمة.'
        : 'Fractional ownership allows you to buy a share of a property instead of the whole property. You can invest with less capital and benefit from rental income and appreciation.',
    },
    {
      question: isAr ? 'ما هي العوائد المتوقعة؟' : 'What returns can I expect?',
      answer: isAr
        ? 'تختلف العوائد حسب نوع العقار والموقع، ولكن عملاؤنا عادةً ما يحققون عوائد سنوية تتراوح بين 8-15%. نستخدم الذكاء الاصطناعي لتحديد العقارات ذات أعلى إمكانات للعوائد.'
        : 'Returns vary by property type and location, but our clients typically see 8-15% annual returns. We use AI to identify properties with the highest return potential.',
    },
    {
      question: isAr ? 'هل يمكن للأجانب شراء عقارات في الإمارات؟' : 'Can foreigners buy property in UAE?',
      answer: isAr
        ? 'نعم، يمكن للأجانب شراء عقارات في مناطق التملك الحر في دبي وأبو ظبي. نقدم المساعدة الكاملة في جميع الإجراءات القانونية والتوثيق.'
        : 'Yes, foreigners can buy properties in freehold areas in Dubai and Abu Dhabi. We provide full assistance with all legal procedures and documentation.',
    },
    {
      question: isAr ? 'كيف يساعدني الذكاء الاصطناعي في العثور على عقار؟' : 'How does AI help me find a property?',
      answer: isAr
        ? 'ذكاءنا الاصطناعي يحلل آلاف نقاط البيانات بما في ذلك اتجاهات السوق، معدلات النمو، البنية التحتية، والعوامل الاقتصادية لتوصيتك بأفضل العقارات التي تناسب احتياجاتك وميزانيتك.'
        : 'Our AI analyzes thousands of data points including market trends, growth rates, infrastructure, and economic factors to recommend the best properties matching your needs and budget.',
    },
    {
      question: isAr ? 'ما هي الرسوم المرتبطة؟' : 'What fees are involved?',
      answer: isAr
        ? 'رسومنا شفافة وتنافسية. تشمل رسوم التسجيل (4% من قيمة العقار)، رسوم الوكالة (2%)، ورسوم الإدارة السنوية (إذا اخترت خدمات إدارة العقارات).'
        : 'Our fees are transparent and competitive. They include registration fees (4% of property value), agency fees (2%), and annual management fees (if you choose property management services).',
    },
    {
      question: isAr ? 'كم من الوقت تستغرق المعاملة؟' : 'How long does a transaction take?',
      answer: isAr
        ? 'مع منصتنا المدعومة بالذكاء الاصطناعي والبلوكتشين، يمكن إتمام معظم المعاملات خلال 48-72 ساعة، مقارنة بأسابيع في العمليات التقليدية.'
        : 'With our AI-powered and blockchain platform, most transactions can be completed in 48-72 hours, compared to weeks with traditional processes.',
    },
    {
      question: isAr ? 'هل تقدمون خيارات التمويل؟' : 'Do you offer financing options?',
      answer: isAr
        ? 'نعم، لدينا شراكات مع المؤسسات المالية الرائدة في الإمارات. نساعدك في الحصول على تمويل عقاري بأفضل الأسعار والشروط.'
        : 'Yes, we have partnerships with leading financial institutions in UAE. We help you secure mortgages at the best rates and terms.',
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Frequently Asked Questions - Land AI Real Estate"
        description="Find answers to common questions about buying, selling, and investing in UAE real estate"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 text-lg">
          {isAr 
            ? 'إجابات على الأسئلة الأكثر شيوعاً حول العقارات في الإمارات'
            : 'Answers to the most common questions about UAE real estate'}
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white pr-4">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-zinc-600 dark:text-zinc-400 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-zinc-600 dark:text-zinc-400 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-5 pt-2">
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-3xl text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            {isAr ? 'لم تجد إجابة؟' : 'Didn\'t find your answer?'}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            {isAr 
              ? 'فريقنا جاهز لمساعدتك. تواصل معنا وسنجيب على جميع استفساراتك.'
              : 'Our team is ready to help. Contact us and we\'ll answer all your questions.'}
          </p>
          <button className="px-8 py-4 bg-blue-600 dark:bg-cyan-600 text-white font-bold rounded-2xl hover:bg-blue-700 dark:hover:bg-cyan-700 transition-colors">
            {isAr ? 'اتصل بنا' : 'Contact Us'}
          </button>
        </div>
      </div>
    </div>
  );
}
