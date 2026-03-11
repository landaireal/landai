import Leadership from '../components/Leadership';
import Partners from '../components/Partners';
import { useLanguage } from '../context/LanguageContext';
import { Building2, Rocket, Shield, Zap } from 'lucide-react';
import SEO from '../components/SEO';

export default function AboutPage() {
  const { t } = useLanguage();
  
  const values = [
    {
      icon: Rocket,
      title: 'Innovation',
      description: 'Leading the future of real estate with cutting-edge AI and spatial technology.',
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Blockchain-powered transactions ensuring transparency and trust.',
    },
    {
      icon: Zap,
      title: 'Speed',
      description: 'Lightning-fast property analysis and decision-making tools.',
    },
    {
      icon: Building2,
      title: 'Quality',
      description: 'Premium properties curated by advanced AI algorithms.',
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO 
        title="About Us - Land AI Real Estate"
        description="Learn about our mission to revolutionize real estate with AI, blockchain, and spatial computing technology in the UAE."
      />
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
          {t('about.title')}
        </h1>
        <p className="text-center text-slate-600 dark:text-slate-400 mb-16 max-w-3xl mx-auto text-lg">
          {t('about.subtitle')}
        </p>

        {/* Mission Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-8">Our Mission</h2>
          <p className="text-center text-slate-600 dark:text-slate-400 max-w-4xl mx-auto text-lg leading-relaxed">
            To revolutionize the real estate industry by combining artificial intelligence, 
            blockchain technology, and spatial computing to create unprecedented value for 
            investors, buyers, and sellers worldwide.
          </p>
        </div>

        {/* Values Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index}
                  className="p-6 rounded-2xl bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-cyan-500 transition-all duration-300 hover:shadow-lg"
                >
                  <Icon className="w-12 h-12 text-blue-500 dark:text-cyan-500 mb-4" />
                  <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Leadership />
      <Partners />
    </div>
  );
}
