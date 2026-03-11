import { Building2, Search, TrendingUp } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Stats() {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-primary-900 to-primary-800 py-12 relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:20px_20px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
          <div className="text-center">
            <div className="flex justify-center mb-3 text-accent-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">50K+</div>
            <div className="text-primary-200 text-sm font-medium">{t('stats.properties')}</div>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-3 text-accent-400">
              <Search className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">2M+</div>
            <div className="text-primary-200 text-sm font-medium">{t('stats.clients')}</div>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-3 text-accent-400">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">100+</div>
            <div className="text-primary-200 text-sm font-medium">{t('stats.cities')}</div>
          </div>
          
          <div className="text-center">
            <div className="flex justify-center mb-3 text-accent-400">
              <div className="text-xl font-black">AI</div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">99%</div>
            <div className="text-primary-200 text-sm font-medium">{t('stats.satisfaction')}</div>
          </div>
        </div>
      </div>
    </div>
  );
}