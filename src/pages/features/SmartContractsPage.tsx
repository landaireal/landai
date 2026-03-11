import SEO from '../../components/SEO';
import Ledger from '../../components/Ledger';
import { useLanguage } from '../../context/LanguageContext';

export default function SmartContractsPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Real-time Verified Smart Contracts - Land AI Real Estate"
        description="Secure your transactions with blockchain-verified smart contracts in real-time"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'العقود الذكية الموثقة في الوقت الفعلي' : 'Real-time Verified Smart Contracts'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'أمّن معاملاتك بعقود ذكية موثقة بالبلوكتشين في الوقت الفعلي'
            : 'Secure your transactions with blockchain-verified smart contracts in real-time'}
        </p>
      </div>

      <Ledger />
    </div>
  );
}
