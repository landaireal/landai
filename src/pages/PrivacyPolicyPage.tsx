import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export default function PrivacyPolicyPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Privacy Policy - Land AI Real Estate"
        description="Learn how we protect and handle your personal information"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-12">
          {isAr ? 'آخر تحديث: 1 مارس 2026' : 'Last Updated: March 1, 2026'}
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {isAr ? '1. المعلومات التي نجمعها' : '1. Information We Collect'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              {isAr 
                ? 'نجمع المعلومات التي تقدمها لنا مباشرة عند استخدام خدماتنا، بما في ذلك:'
                : 'We collect information you provide directly to us when using our services, including:'}
            </p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2 ml-4">
              <li>{isAr ? 'الاسم ومعلومات الاتصال' : 'Name and contact information'}</li>
              <li>{isAr ? 'المعلومات المالية للمعاملات' : 'Financial information for transactions'}</li>
              <li>{isAr ? 'تفضيلات العقارات واحتياجات الاستثمار' : 'Property preferences and investment needs'}</li>
              <li>{isAr ? 'معلومات الجهاز والاستخدام' : 'Device and usage information'}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {isAr ? '2. كيف نستخدم معلوماتك' : '2. How We Use Your Information'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              {isAr 
                ? 'نستخدم المعلومات التي نجمعها من أجل:'
                : 'We use the information we collect to:'}
            </p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2 ml-4">
              <li>{isAr ? 'تقديم وتحسين خدماتنا' : 'Provide and improve our services'}</li>
              <li>{isAr ? 'معالجة المعاملات' : 'Process transactions'}</li>
              <li>{isAr ? 'إرسال تحديثات وتوصيات العقارات' : 'Send property updates and recommendations'}</li>
              <li>{isAr ? 'الامتثال للمتطلبات القانونية' : 'Comply with legal requirements'}</li>
              <li>{isAr ? 'منع الاحتيال وحماية الأمان' : 'Prevent fraud and protect security'}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {isAr ? '3. أمان البيانات' : '3. Data Security'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isAr 
                ? 'نستخدم تقنية البلوكتشين والتشفير المتقدم لحماية معلوماتك. جميع البيانات الحساسة يتم تشفيرها أثناء النقل والتخزين. نطبق تدابير أمنية صارمة للحماية من الوصول غير المصرح به.'
                : 'We use blockchain technology and advanced encryption to protect your information. All sensitive data is encrypted in transit and at rest. We implement strict security measures to guard against unauthorized access.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {isAr ? '4. مشاركة المعلومات' : '4. Information Sharing'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isAr 
                ? 'نحن لا نبيع معلوماتك الشخصية. قد نشارك معلوماتك مع مقدمي الخدمات الموثوقين، الشركاء القانونيين، والسلطات التنظيمية عند الضرورة لتقديم خدماتنا أو الامتثال للقانون.'
                : 'We do not sell your personal information. We may share your information with trusted service providers, legal partners, and regulatory authorities when necessary to provide our services or comply with law.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {isAr ? '5. حقوقك' : '5. Your Rights'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              {isAr ? 'لديك الحق في:' : 'You have the right to:'}
            </p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2 ml-4">
              <li>{isAr ? 'الوصول إلى معلوماتك الشخصية' : 'Access your personal information'}</li>
              <li>{isAr ? 'تصحيح البيانات غير الدقيقة' : 'Correct inaccurate data'}</li>
              <li>{isAr ? 'طلب حذف بياناتك' : 'Request deletion of your data'}</li>
              <li>{isAr ? 'الاعتراض على معالجة البيانات' : 'Object to data processing'}</li>
              <li>{isAr ? 'نقل بياناتك' : 'Data portability'}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {isAr ? '6. اتصل بنا' : '6. Contact Us'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isAr 
                ? 'إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه، يرجى الاتصال بنا:'
                : 'If you have any questions about this Privacy Policy, please contact us:'}
            </p>
            <div className="mt-4 p-6 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-2xl">
              <p className="text-zinc-700 dark:text-zinc-300">
                <strong>{isAr ? 'البريد الإلكتروني:' : 'Email:'}</strong> land.a.i@outlook.com<br />
                <strong>{isAr ? 'الهاتف:' : 'Phone:'}</strong> +971 52 285 0625<br />
                <strong>{isAr ? 'العنوان:' : 'Address:'}</strong> Dubai & Abu Dhabi, UAE
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
