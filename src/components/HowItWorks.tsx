import { Search, Brain, CheckCircle, Key } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function HowItWorks() {
  const { t, isRtl } = useLanguage();

  const steps = [
    {
      icon: <Search className="w-6 h-6" />,
      title: t('how.step1'),
      description: t('how.step1_desc'),
      delay: "delay-0",
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: t('how.step2'),
      description: t('how.step2_desc'),
      delay: "delay-100",
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: t('how.step3'),
      description: t('how.step3_desc'),
      delay: "delay-200",
    },
    {
      icon: <Key className="w-6 h-6" />,
      title: t('how.step4'),
      description: t('how.step4_desc'),
      delay: "delay-300",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">{t('how.title')}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {t('how.subtitle')}
          </p>
        </div>

        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-200 via-primary-400 to-primary-200 dark:from-dark-700 dark:via-primary-800 dark:to-dark-700 -translate-y-1/2 z-0"></div>

          <div className="grid md:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className={`relative text-center animate-fade-in-up ${step.delay}`}>
                <div className="w-16 h-16 mx-auto bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-lg border-4 border-gray-50 dark:border-slate-900 text-primary-600 dark:text-primary-400 relative z-10 group hover:scale-110 hover:bg-primary-600 hover:text-white dark:hover:bg-primary-500 transition-all duration-300">
                  {step.icon}
                  {/* Step number badge */}
                  <div className={`absolute -top-2 ${isRtl ? '-left-2' : '-right-2'} w-6 h-6 bg-accent-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-sm border-2 border-white dark:border-dark-800`}>
                    {index + 1}
                  </div>
                </div>
                <div className="mt-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 h-full">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}