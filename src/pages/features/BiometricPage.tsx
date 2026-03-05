import SEO from '../../components/SEO';
import BiometricApproval from '../../components/BiometricApproval';
import { useLanguage } from '../../context/LanguageContext';

export default function BiometricPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Instant Biometric Approval - Land AI Real Estate"
        description="Experience instant property approvals with our advanced biometric authentication"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'الموافقة الفورية بالبصمة البيومترية' : 'Instant Biometric Approval'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'اختبر الموافقات الفورية للعقارات باستخدام المصادقة البيومترية المتقدمة'
            : 'Experience instant property approvals with our advanced biometric authentication'}
        </p>
      </div>

      <BiometricApproval />
    </div>
  );
}
