import { useLanguage } from '../context/LanguageContext';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { 
  Building2, 
  Sparkles, 
  TrendingUp, 
  BookOpen, 
  Shield, 
  Coins,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight
} from 'lucide-react';

export default function Footer() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  return (
    <footer className="relative bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-black border-t border-gray-200 dark:border-gray-800 mt-20 overflow-hidden">
      
      {/* Luxury background elements */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="pt-16 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
            
            {/* Brand Section - Takes up more space */}
            <div className="lg:col-span-4 space-y-6">
              <div className="flex items-center">
                <Logo className="w-20 h-20 md:w-24 md:h-24" />
              </div>
              
              <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed max-w-sm">
                {isAr 
                  ? 'عقارات حصرية في دبي وأبو ظبي مصممة خصيصاً لتناسب أسلوب حياتك. شريكك الموثوق في العقارات الفاخرة.' 
                  : 'Exclusive properties in Dubai & Abu Dhabi tailored to your lifestyle. Your trusted partner in luxury real estate.'}
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors group">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  </div>
                  <span className="text-sm font-medium">Dubai & Abu Dhabi, UAE</span>
                </div>
                
                <a href="tel:+971501234567" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors group">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                    <Phone className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  </div>
                  <span className="text-sm font-medium">+971 50 123 4567</span>
                </a>
                
                <a href="mailto:info@landai.ae" className="flex items-center gap-3 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors group">
                  <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 transition-colors">
                    <Mail className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  </div>
                  <span className="text-sm font-medium">info@landai.ae</span>
                </a>
              </div>

              {/* Social Media */}
              <div className="pt-4">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                  {isAr ? 'تابعنا' : 'Follow Us'}
                </h4>
                <div className="flex gap-3">
                  <a href="#" className="p-2.5 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-600 dark:hover:bg-cyan-500 text-blue-600 dark:text-cyan-400 hover:text-white rounded-lg transition-all hover:scale-110" aria-label="Facebook">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2.5 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-600 dark:hover:bg-cyan-500 text-blue-600 dark:text-cyan-400 hover:text-white rounded-lg transition-all hover:scale-110" aria-label="Twitter">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2.5 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-600 dark:hover:bg-cyan-500 text-blue-600 dark:text-cyan-400 hover:text-white rounded-lg transition-all hover:scale-110" aria-label="Instagram">
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a href="#" className="p-2.5 bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-600 dark:hover:bg-cyan-500 text-blue-600 dark:text-cyan-400 hover:text-white rounded-lg transition-all hover:scale-110" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Links Grid - 8 columns */}
            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
              
              {/* Company */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Building2 className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                    {isAr ? 'الشركة' : 'Company'}
                  </h4>
                </div>
                <ul className="space-y-3">
                  <li>
                    <Link to="/about" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'من نحن' : 'About Us'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/services" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'الخدمات' : 'Services'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/properties" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'العقارات' : 'Properties'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/company/leadership" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'القيادة' : 'Leadership'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/careers" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'الوظائف' : 'Careers'}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Services & Features */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                    {isAr ? 'الخدمات' : 'Services'}
                  </h4>
                </div>
                <ul className="space-y-3">
                  <li>
                    <Link to="/services/premium" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'خدمات مميزة' : 'Premium Services'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/features/smart-contracts" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'عقود ذكية' : 'Smart Contracts'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/features/drone-valuation" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'تقييم بالطائرات' : 'Drone Valuation'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/features/biometric" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'موافقة بيومترية' : 'Biometric Approval'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/virtual/metaverse-tour" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'جولة ميتافيرس' : 'Metaverse Tour'}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Technology & Analytics */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                    {isAr ? 'التحليلات' : 'Analytics'}
                  </h4>
                </div>
                <ul className="space-y-3">
                  <li>
                    <Link to="/analytics/heatmap" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'خريطة الحرارة' : 'Investment Heatmap'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/analytics/smart-city" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'مصفوفة المدينة' : 'Smart City Matrix'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/analytics/price-predictions" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'توقعات الأسعار' : 'Price Predictions'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/technology/property-future" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'مستقبل العقار' : 'Property Future'}
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Resources & Investment Combined */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <BookOpen className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                    {isAr ? 'الموارد' : 'Resources'}
                  </h4>
                </div>
                <ul className="space-y-3">
                  <li>
                    <Link to="/blog" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'المدونة' : 'Blog'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/locations" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'المواقع' : 'Locations'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/calculators" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'الحاسبات' : 'Calculators'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/faq" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'الأسئلة الشائعة' : 'FAQ'}
                    </Link>
                  </li>
                  <li>
                    <Link to="/contact" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                      {isAr ? 'اتصل بنا' : 'Contact'}
                    </Link>
                  </li>
                </ul>

                {/* Investment subsection */}
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Coins className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                    <h4 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">
                      {isAr ? 'الاستثمار' : 'Investment'}
                    </h4>
                  </div>
                  <ul className="space-y-3">
                    <li>
                      <Link to="/investment/wealth-growth" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                        {isAr ? 'نمو الثروة' : 'Wealth Growth'}
                      </Link>
                    </li>
                    <li>
                      <Link to="/investment/fractional" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors flex items-center gap-1 group">
                        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-4 group-hover:ml-0 transition-all" />
                        {isAr ? 'ملكية جزئية' : 'Fractional Ownership'}
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Section - Legal & Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            
            {/* Copyright */}
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                © 2026 <span className="font-bold text-gray-900 dark:text-white">Land AI Real Estate</span>. All rights reserved.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                Dubai & Abu Dhabi, UAE
              </p>
            </div>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <Link 
                to="/privacy" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-medium flex items-center gap-1 group"
              >
                <Shield className="w-3.5 h-3.5" />
                {isAr ? 'سياسة الخصوصية' : 'Privacy Policy'}
              </Link>
              <span className="text-gray-300 dark:text-gray-700">|</span>
              <Link 
                to="/terms" 
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors font-medium flex items-center gap-1 group"
              >
                <Shield className="w-3.5 h-3.5" />
                {isAr ? 'الشروط والأحكام' : 'Terms & Conditions'}
              </Link>
            </div>
          </div>

          {/* Premium Badge */}
          <div className="mt-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full border border-blue-200 dark:border-blue-800">
              <Sparkles className="w-4 h-4 text-blue-600 dark:text-cyan-400" />
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                {isAr ? 'شريكك الموثوق في العقارات الفاخرة' : 'Your Trusted Partner in Luxury Real Estate'}
              </span>
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}