import { Star, Quote, Award, TrendingUp, Building2 } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

export function Testimonials() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const testimonials = [
    {
      name: "Ahmed Al Mansoori",
      role: isAr ? "مستثمر عقاري" : "Real Estate Investor",
      location: isAr ? "دبي، الإمارات" : "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200",
      content: isAr 
        ? "وجدت Land AI الفيلا المثالية لي في نخلة جميرا. الخدمة المهنية والدعم المستمر جعلا العملية سلسة تماماً. أفضل استثمار قمت به."
        : "Land AI found me the perfect villa in Palm Jumeirah. The professional service and continuous support made the process seamless. Best investment I've made.",
      rating: 5,
      property: isAr ? "فيلا في نخلة جميرا" : "Villa in Palm Jumeirah",
      value: "AED 12M"
    },
    {
      name: "Sarah Williams",
      role: isAr ? "رائدة أعمال" : "Business Executive",
      location: isAr ? "أبو ظبي، الإمارات" : "Abu Dhabi, UAE",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200",
      content: isAr
        ? "كنت أبحث عن عقار فاخر في أبو ظبي وتعاملي مع Land AI كان استثنائياً. الفريق محترف جداً والتقنيات المتقدمة سهلت عملية البحث."
        : "I was looking for a luxury property in Abu Dhabi and my experience with Land AI was exceptional. The team is highly professional and the advanced technology made searching effortless.",
      rating: 5,
      property: isAr ? "شقة بنتهاوس في جزيرة السعديات" : "Penthouse in Saadiyat Island",
      value: "AED 8.5M"
    },
    {
      name: "Mohammed Al Hashimi",
      role: isAr ? "مدير شركة" : "Company Director",
      location: isAr ? "دبي، الإمارات" : "Dubai, UAE",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=200",
      content: isAr
        ? "استثمرت في عدة عقارات مع Land AI. العوائد ممتازة والخدمة لا مثيل لها. أنصح بشدة أي شخص يبحث عن عقارات فاخرة في الإمارات."
        : "I've invested in multiple properties with Land AI. The returns are excellent and the service is unmatched. Highly recommend to anyone looking for luxury properties in UAE.",
      rating: 5,
      property: isAr ? "شقق في دبي مارينا" : "Apartments in Dubai Marina",
      value: "AED 15M+"
    },
  ];

  return (
    <section id="testimonials" className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-full border border-purple-200 dark:border-purple-800 mb-6"
          >
            <Award className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
              {isAr ? 'آراء عملائنا' : 'Client Testimonials'}
            </span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-5 tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {isAr ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-gray-600 dark:text-gray-400"
          >
            {isAr 
              ? 'نفخر بخدمة عملائنا وتحقيق أحلامهم في امتلاك عقارات فاخرة في دبي وأبو ظبي'
              : 'Proud to serve our clients and help them achieve their dreams of owning luxury properties in Dubai & Abu Dhabi'}
          </motion.p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-white dark:bg-slate-800 p-6 md:p-8 rounded-3xl border border-gray-200 dark:border-slate-700/50 hover:border-purple-300 dark:hover:border-purple-500/80 hover:shadow-2xl dark:hover:shadow-[0_20px_60px_-15px_rgba(168,85,247,0.3)] transition-all duration-500 group"
            >
              {/* Decorative Quote */}
              <Quote className="absolute top-6 right-6 w-10 h-10 text-purple-100 dark:text-purple-900/30 rotate-180 group-hover:text-purple-200 dark:group-hover:text-purple-800/50 transition-colors" />
              
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`} 
                  />
                ))}
              </div>
              
              {/* Testimonial Content */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-base leading-relaxed relative z-10 font-medium">
                "{testimonial.content}"
              </p>
              
              {/* Property Badge */}
              <div className="mb-6 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-bold text-purple-700 dark:text-purple-300">
                      {testimonial.property}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-700 dark:text-emerald-300">
                      {testimonial.value}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Author Info */}
              <div className="flex items-center gap-4 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-purple-200 dark:border-purple-700 shadow-md group-hover:scale-110 transition-transform"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white dark:border-gray-800 flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 dark:text-white text-base mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-purple-600 dark:text-purple-400 text-sm font-semibold">
                    {testimonial.role}
                  </p>
                  <p className="text-gray-500 dark:text-gray-500 text-xs font-medium">
                    {testimonial.location}
                  </p>
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 rounded-2xl transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-full border-2 border-emerald-200 dark:border-emerald-800">
            <Award className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm md:text-base font-bold text-emerald-700 dark:text-emerald-300">
              {isAr ? '98% معدل رضا العملاء | +2,400 عميل سعيد' : '98% Client Satisfaction Rate | 2,400+ Happy Clients'}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}