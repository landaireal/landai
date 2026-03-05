import { Star, Quote } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export function Testimonials() {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Ahmed Al Mansoori",
      role: t('testimonials.role1'),
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
      content: "LandAI found the perfect warehouse for my distribution business in just two days. The AI matching is scary accurate.",
      rating: 5,
    },
    {
      name: "Sarah Jenkins",
      role: t('testimonials.role2'),
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      content: "The virtual AI tours saved me so much time. I was able to narrow down my options from abroad before flying to Dubai.",
      rating: 5,
    },
    {
      name: "Mohammed Tariq",
      role: t('testimonials.role3'),
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
      content: "Renting commercial space used to be a headache. The automated smart contracts via LandAI made the process seamless.",
      rating: 4,
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white dark:bg-dark-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">{t('testimonials.title')}</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            {t('testimonials.subtitle')}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-gray-50 dark:bg-dark-800 p-8 rounded-2xl border border-gray-100 dark:border-dark-700 relative animate-fade-in-up hover:-translate-y-1 transition-transform duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary-200 dark:text-dark-600 rotate-180" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < testimonial.rating ? 'text-gold-400 fill-gold-400' : 'text-gray-300 dark:text-dark-600'}`} 
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-8 italic relative z-10">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-dark-700 shadow-sm"
                />
                <div>
                  <h4 className="font-bold text-gray-900 dark:text-white text-sm">{testimonial.name}</h4>
                  <p className="text-primary-600 dark:text-primary-400 text-xs font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}