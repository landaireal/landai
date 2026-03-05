import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export default function Footer() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <footer className="bg-transparent border-t border-zinc-200 dark:border-zinc-800 pt-20 pb-10 px-4 sm:px-6 lg:px-8 mt-20 relative overflow-hidden">
      
      {/* Abstract massive background gradient */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-transparent dark:bg-indigo-500/10 blur-[100px] pointer-events-none rounded-t-full"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-6 lg:col-span-3 xl:col-span-2">
            <div className="flex items-center">
              <Logo className="w-24 h-24" />
            </div>
            <p className="text-zinc-500 dark:text-zinc-400 max-w-md font-medium leading-relaxed">
              {isAr 
                ? 'عقارات حصرية في دبي وأبو ظبي مصممة خصيصاً لتناسب أسلوب حياتك. شريكك الموثوق في العقارات الفاخرة.' 
                : 'Exclusive properties in Dubai & Abu Dhabi tailored to your lifestyle. Your trusted partner in luxury real estate.'}
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-extrabold text-lg mb-6 text-zinc-900 dark:text-white">{isAr ? 'الشركة' : 'Company'}</h4>
            <ul className="space-y-3 text-zinc-500 dark:text-zinc-400 text-sm">
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'من نحن' : 'About Us'}</Link></li>
              <li><Link to="/services" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'الخدمات' : 'Services'}</Link></li>
              <li><Link to="/properties" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'العقارات' : 'Properties'}</Link></li>
              <li><Link to="/investors" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'المستثمرون' : 'Investors'}</Link></li>
              <li><Link to="/careers" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'الوظائف' : 'Careers'}</Link></li>
              <li><Link to="/company/leadership" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'القيادة' : 'Leadership'}</Link></li>
            </ul>
          </div>

          {/* Services & Features */}
          <div>
            <h4 className="font-extrabold text-lg mb-6 text-zinc-900 dark:text-white">{isAr ? 'الخدمات والمميزات' : 'Services & Features'}</h4>
            <ul className="space-y-3 text-zinc-500 dark:text-zinc-400 text-sm">
              <li><Link to="/services/premium" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'خدمات مميزة' : 'Premium Services'}</Link></li>
              <li><Link to="/services/quantum-space" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'فضاء كمي' : 'Quantum Space'}</Link></li>
              <li><Link to="/features/drone-valuation" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'تقييم بالطائرات' : 'Drone Valuation'}</Link></li>
              <li><Link to="/features/smart-contracts" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'عقود ذكية' : 'Smart Contracts'}</Link></li>
              <li><Link to="/features/biometric" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'موافقة بيومترية' : 'Biometric Approval'}</Link></li>
            </ul>
          </div>

          {/* Technology & Analytics */}
          <div>
            <h4 className="font-extrabold text-lg mb-6 text-zinc-900 dark:text-white">{isAr ? 'التكنولوجيا والتحليلات' : 'Technology & Analytics'}</h4>
            <ul className="space-y-3 text-zinc-500 dark:text-zinc-400 text-sm">
              <li><Link to="/analytics/heatmap" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'خريطة الحرارة' : 'Investment Heatmap'}</Link></li>
              <li><Link to="/analytics/smart-city" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'مصفوفة المدينة' : 'Smart City Matrix'}</Link></li>
              <li><Link to="/analytics/price-predictions" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'توقعات الأسعار' : 'Price Predictions'}</Link></li>
              <li><Link to="/technology/property-future" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'مستقبل العقار' : 'Property Future'}</Link></li>
              <li><Link to="/virtual/metaverse-tour" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'جولة ميتافيرس' : 'Metaverse Tour'}</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-extrabold text-lg mb-6 text-zinc-900 dark:text-white">{isAr ? 'الموارد' : 'Resources'}</h4>
            <ul className="space-y-3 text-zinc-500 dark:text-zinc-400 text-sm">
              <li><Link to="/blog" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'المدونة' : 'Blog'}</Link></li>
              <li><Link to="/locations" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'المواقع' : 'Locations'}</Link></li>
              <li><Link to="/calculators" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'الحاسبات' : 'Calculators'}</Link></li>
              <li><Link to="/faq" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'الأسئلة الشائعة' : 'FAQ'}</Link></li>
              <li><Link to="/contact" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'اتصل بنا' : 'Contact'}</Link></li>
              <li><Link to="/portfolio" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'المحفظة' : 'Portfolio'}</Link></li>
            </ul>
          </div>

          {/* More */}
          <div>
            <h4 className="font-extrabold text-lg mb-6 text-zinc-900 dark:text-white">{isAr ? 'المزيد' : 'More'}</h4>
            <ul className="space-y-3 text-zinc-500 dark:text-zinc-400 text-sm">
              <li><Link to="/testimonials" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'آراء العملاء' : 'Testimonials'}</Link></li>
              <li><Link to="/partners" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'الشركاء' : 'Partners'}</Link></li>
              <li><Link to="/investment/fractional" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'ملكية جزئية' : 'Fractional Ownership'}</Link></li>
              <li><Link to="/company/build-future" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'ابن مستقبلك' : 'Build Your Future'}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-extrabold text-lg mb-6 text-zinc-900 dark:text-white">{isAr ? 'قانوني' : 'Legal'}</h4>
            <ul className="space-y-3 text-zinc-500 dark:text-zinc-400 text-sm">
              <li><Link to="/privacy" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}</Link></li>
              <li><Link to="/terms" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}</Link></li>
            </ul>
          </div>

          {/* Investment */}
          <div>
            <h4 className="font-extrabold text-lg mb-6 text-zinc-900 dark:text-white">{isAr ? 'الاستثمار' : 'Investment'}</h4>
            <ul className="space-y-3 text-zinc-500 dark:text-zinc-400 text-sm">
              <li><Link to="/investment/wealth-growth" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'نمو الثروة' : 'Wealth Growth'}</Link></li>
              <li><Link to="/investment/fractional" className="hover:text-blue-600 dark:hover:text-cyan-400 transition-colors">{isAr ? 'عقارات جزئية' : 'Fractional Real Estate'}</Link></li>
            </ul>
          </div>
        </div>

        {/* Massive Typographical Footer */}
        <div className="mt-20 border-t border-zinc-200 dark:border-zinc-800 pt-10 text-center">
          <h1 className="text-[12vw] font-black leading-none tracking-tighter ai-gradient-text opacity-20 dark:opacity-40 select-none">
            LAND AI
          </h1>
          <div className="flex flex-col md:flex-row justify-between items-center mt-10 text-zinc-500 dark:text-zinc-500 font-medium text-sm">
            <p>© 2026 Land AI Real Estate. All rights reserved.</p>
            <p className="mt-2 md:mt-0">Dubai & Abu Dhabi, UAE</p>
          </div>
        </div>
      </div>
    </footer>
  );
}