import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function CTA() {
  const { t, isRtl } = useLanguage();

  return (
    <section className="py-20 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-primary-900 to-primary-800 rounded-3xl overflow-hidden relative shadow-2xl">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-60 h-60 bg-accent-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 px-8 py-16 md:p-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fade-in-up">
              {t('cta.title')}
            </h2>
            <p className="text-primary-100 text-lg mb-8 max-w-2xl animate-fade-in-up delay-100">
              {t('cta.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-in-up delay-200">
              <button className="px-8 py-4 bg-white text-primary-900 rounded-xl font-bold text-lg hover:bg-gray-50 transition-colors shadow-xl shadow-black/20 flex items-center gap-2 group">
                {t('cta.button')} <ArrowRight className={`w-5 h-5 group-hover:translate-x-1 transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
              </button>
            </div>
            
            <div className="mt-10 flex flex-wrap justify-center gap-6 animate-fade-in-up delay-300">
              <div className="flex items-center gap-2 text-primary-200 text-sm">
                <CheckCircle2 className="w-4 h-4 text-accent-400" />
                {t('cta.f1')}
              </div>
              <div className="flex items-center gap-2 text-primary-200 text-sm">
                <CheckCircle2 className="w-4 h-4 text-accent-400" />
                {t('cta.f2')}
              </div>
              <div className="flex items-center gap-2 text-primary-200 text-sm">
                <CheckCircle2 className="w-4 h-4 text-accent-400" />
                {t('cta.f3')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}