import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

export default function TermsPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Terms & Conditions - Land AI Real Estate"
        description="Read our terms and conditions for using Land AI Real Estate services"
      />
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-12">
          {isAr ? 'آخر تحديث: 1 مارس 2026' : 'Last Updated: March 1, 2026'}
        </p>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {isAr ? '1. قبول الشروط' : '1. Acceptance of Terms'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isAr 
                ? 'من خلال الوصول إلى واستخدام خدمات Land AI Real Estate، فإنك توافق على الالتزام بهذه الشروط والأحكام. إذا كنت لا توافق على هذه الشروط، يرجى عدم استخدام خدماتنا.'
                : 'By accessing and using Land AI Real Estate services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {isAr ? '2. الخدمات' : '2. Services'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isAr 
                ? 'نقدم خدمات العقارات بما في ذلك الوساطة، إدارة العقارات، الاستثمار، والاستشارات. جميع الخدمات تخضع للقوانين واللوائح المعمول بها في دولة الإمارات العربية المتحدة.'
                : 'We provide real estate services including brokerage, property management, investment, and consulting. All services are subject to applicable laws and regulations in the United Arab Emirates.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {isAr ? '3. التزامات المستخدم' : '3. User Obligations'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed mb-4">
              {isAr ? 'أنت توافق على:' : 'You agree to:'}
            </p>
            <ul className="list-disc list-inside text-zinc-600 dark:text-zinc-400 space-y-2 ml-4">
              <li>{isAr ? 'تقديم معلومات دقيقة وكاملة' : 'Provide accurate and complete information'}</li>
              <li>{isAr ? 'الحفاظ على سرية حساب الدخول الخاص بك' : 'Maintain the confidentiality of your login credentials'}</li>
              <li>{isAr ? 'استخدام الخدمات للأغراض القانونية فقط' : 'Use services for lawful purposes only'}</li>
              <li>{isAr ? 'الامتثال لجميع القوانين واللوائح المعمول بها' : 'Comply with all applicable laws and regulations'}</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {isAr ? '4. الملكية الفكرية' : '4. Intellectual Property'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isAr 
                ? 'جميع المحتويات والمواد والتكنولوجيا المستخدمة في منصتنا هي ملكية حصرية لـ Land AI Real Estate. يحظر النسخ أو الاستنساخ أو التوزيع بدون إذن كتابي صريح.'
                : 'All content, materials, and technology used on our platform are the exclusive property of Land AI Real Estate. Copying, reproduction, or distribution without express written permission is prohibited.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {isAr ? '5. إخلاء المسؤولية' : '5. Disclaimer'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isAr 
                ? 'بينما نسعى جاهدين لتوفير معلومات دقيقة، لا نضمن اكتمال أو دقة أو موثوقية أي محتوى. الاستثمارات العقارية تنطوي على مخاطر، ويجب عليك إجراء العناية الواجبة الخاصة بك.'
                : 'While we strive to provide accurate information, we do not guarantee the completeness, accuracy, or reliability of any content. Real estate investments involve risks, and you should conduct your own due diligence.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {isAr ? '6. تحديد المسؤولية' : '6. Limitation of Liability'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isAr 
                ? 'لن نكون مسؤولين عن أي أضرار غير مباشرة أو عرضية أو خاصة أو تبعية ناتجة عن استخدامك لخدماتنا. مسؤوليتنا الإجمالية لن تتجاوز المبلغ المدفوع لنا مقابل الخدمات.'
                : 'We shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our services. Our total liability shall not exceed the amount paid to us for services.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {isAr ? '7. القانون الحاكم' : '7. Governing Law'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isAr 
                ? 'تخضع هذه الشروط وتفسر وفقاً لقوانين دولة الإمارات العربية المتحدة. أي نزاعات تخضع للاختصاص الحصري لمحاكم دبي.'
                : 'These Terms shall be governed by and construed in accordance with the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dubai.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {isAr ? '8. التعديلات' : '8. Modifications'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isAr 
                ? 'نحتفظ بالحق في تعديل هذه الشروط في أي وقت. سيتم إخطارك بأي تغييرات جوهرية. استمرارك في استخدام خدماتنا بعد التغييرات يشكل قبولك للشروط المعدلة.'
                : 'We reserve the right to modify these Terms at any time. You will be notified of any material changes. Your continued use of our services after changes constitutes acceptance of the modified Terms.'}
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
              {isAr ? '9. اتصل بنا' : '9. Contact Us'}
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
              {isAr 
                ? 'لأي أسئلة حول هذه الشروط، يرجى الاتصال بنا:'
                : 'For any questions about these Terms, please contact us:'}
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
