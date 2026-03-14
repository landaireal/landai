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
        {/* Enhanced Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, y: -2 }}
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 dark:from-indigo-900/30 dark:via-purple-900/30 dark:to-indigo-900/30 rounded-full border-2 border-indigo-200/60 dark:border-indigo-400/30 mb-6 shadow-lg dark:shadow-[0_0_25px_rgba(102,126,234,0.3)] hover:shadow-xl dark:hover:shadow-[0_0_35px_rgba(102,126,234,0.4)] transition-all duration-500 backdrop-blur-sm"
          >
            <Award className="w-5 h-5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
            <span className="blueberry-text text-sm font-black uppercase tracking-widest">
              {isAr ? 'آراء عملائنا' : 'Client Testimonials'}
            </span>
            <Award className="w-5 h-5 text-purple-600 dark:text-purple-400 animate-pulse" style={{animationDelay: '0.5s'}} />
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="section-title text-gray-900 dark:text-white mb-5"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {isAr ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="section-subtitle"
          >
            {isAr 
              ? 'نفخر بخدمة عملائنا وتحقيق أحلامهم في امتلاك عقارات فاخرة في دبي وأبو ظبي'
              : 'Proud to serve our clients and help them achieve their dreams of owning luxury properties in Dubai & Abu Dhabi'}
          </motion.p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <div className="h-1 w-20 bg-gradient-to-r from-transparent via-purple-500 to-pink-500 rounded-full"></div>
            <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
            <div className="h-1 w-20 bg-gradient-to-r from-pink-500 via-purple-500 to-transparent rounded-full"></div>
          </div>
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
              whileHover={{ y: -10, scale: 1.03 }}
              className="card-standard hover-glow group relative overflow-hidden"
            >
              {/* Decorative elements matching contact form */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-500/10 via-purple-500/10 to-transparent dark:from-indigo-500/20 dark:via-purple-500/20 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-500/10 via-indigo-500/10 to-transparent dark:from-purple-500/20 dark:via-indigo-500/20 rounded-tr-full"></div>
              
              {/* Decorative Quote with Animation */}
              <Quote className="absolute top-6 right-6 w-12 h-12 text-indigo-100 dark:text-indigo-900/30 rotate-180 group-hover:text-indigo-200 dark:group-hover:text-indigo-800/50 group-hover:scale-110 transition-all duration-500 z-10" />
              
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none rounded-[3rem]"></div>
              
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-5 h-5 ${i < testimonial.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}`} 
                  />
                ))}
              </div>
              
              {/* Enhanced Testimonial Content */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-base md:text-lg leading-relaxed relative z-10 font-medium group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                <span className="text-purple-600 dark:text-purple-400 text-2xl mr-1">"</span>
                {testimonial.content}
                <span className="text-purple-600 dark:text-purple-400 text-2xl ml-1">"</span>
              </p>
              
              {/* Enhanced Property Badge */}
              <div className="mb-6 p-4 bg-gradient-to-r from-purple-50 via-pink-50 to-purple-50 dark:from-purple-900/30 dark:via-pink-900/30 dark:to-purple-900/30 rounded-2xl border-2 border-purple-200 dark:border-purple-800/50 group-hover:border-purple-300 dark:group-hover:border-purple-700 transition-all duration-300 shadow-sm group-hover:shadow-md">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                      <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-sm md:text-base font-black text-purple-700 dark:text-purple-300">
                      {testimonial.property}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-sm font-black text-emerald-700 dark:text-emerald-300">
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