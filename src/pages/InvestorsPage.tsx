import Investors from '../components/Investors';
import { Stats } from '../components/Stats';
import PredictiveAnalytics from '../components/PredictiveAnalytics';
import FractionalOwnership from '../components/FractionalOwnership';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { TrendingUp, DollarSign, PieChart, BarChart3 } from 'lucide-react';

export default function InvestorsPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const benefits = [
    {
      icon: TrendingUp,
      title: isAr ? 'عوائد عالية' : 'High Returns',
      description: isAr
        ? 'عوائد سنوية بنسبة 8-15% على الاستثمارات العقارية'
        : '8-15% annual returns on real estate investments',
    },
    {
      icon: DollarSign,
      title: isAr ? 'سيولة فورية' : 'Instant Liquidity',
      description: isAr
        ? 'بيع وشراء حصص العقارات على البلوكتشين'
        : 'Buy and sell property shares on blockchain',
    },
    {
      icon: PieChart,
      title: isAr ? 'محفظة متنوعة' : 'Diversified Portfolio',
      description: isAr
        ? 'استثمر في عقارات متعددة بحد أدنى للاستثمار'
        : 'Invest in multiple properties with minimal capital',
    },
    {
      icon: BarChart3,
      title: isAr ? 'تحليلات شفافة' : 'Transparent Analytics',
      description: isAr
        ? 'تتبع استثماراتك في الوقت الفعلي مع تحليلات الذكاء الاصطناعي'
        : 'Track your investments in real-time with AI analytics',
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO
        title="Investor Opportunities - Land AI Real Estate"
        description="Maximize your returns with AI-powered real estate investment opportunities in Dubai and Abu Dhabi. Blockchain-verified properties with 8-15% annual returns."
      />

      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          {isAr ? 'فرص الاستثمار' : 'Investment Opportunities'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr
            ? 'استثمر بذكاء في سوق العقارات في الإمارات مع تحليلات الذكاء الاصطناعي والتحقق من البلوكتشين'
            : 'Invest smart in UAE real estate market with AI-powered analytics and blockchain verification'}
        </p>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-transparent border border-zinc-300 dark:border-zinc-700 hover:border-blue-500 dark:hover:border-cyan-500 transition-all duration-300"
              >
                <Icon className="w-12 h-12 text-blue-500 dark:text-cyan-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-zinc-900 dark:text-white">
                  {benefit.title}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <Stats />
      <Investors />
      <PredictiveAnalytics />
      <FractionalOwnership />
    </div>
  );
}
