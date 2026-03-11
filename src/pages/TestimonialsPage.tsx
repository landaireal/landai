import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { Star, Quote } from 'lucide-react';

export default function TestimonialsPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const testimonials = [
    {
      name: 'Ahmed Al Mansouri',
      role: isAr ? 'رائد أعمال' : 'Entrepreneur',
      location: isAr ? 'دبي' : 'Dubai',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80',
      rating: 5,
      text: isAr 
        ? 'تجربة استثنائية! ساعدني فريق Land AI في العثور على الاستثمار المثالي في دبي مارينا. منصتهم المدعومة بالذكاء الاصطناعي جعلت العملية سلسة وسريعة.'
        : 'Exceptional experience! Land AI team helped me find the perfect investment in Dubai Marina. Their AI-powered platform made the process smooth and fast.',
    },
    {
      name: 'Sarah Johnson',
      role: isAr ? 'مديرة تنفيذية' : 'Executive',
      location: isAr ? 'المملكة المتحدة' : 'UK',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80',
      rating: 5,
      text: isAr 
        ? 'كمستثمر أجنبي، كنت قلقاً من التعقيدات. لكن Land AI جعل كل شيء سهلاً. التحقق من البلوكتشين أعطاني راحة بال كاملة.'
        : 'As a foreign investor, I was worried about complexities. But Land AI made everything easy. Blockchain verification gave me complete peace of mind.',
    },
    {
      name: 'Mohammed Khalid',
      role: isAr ? 'مستثمر' : 'Investor',
      location: isAr ? 'أبو ظبي' : 'Abu Dhabi',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80',
      rating: 5,
      text: isAr 
        ? 'حققت عائداً بنسبة 14% في السنة الأولى! تنبؤات الذكاء الاصطناعي كانت دقيقة بشكل مذهل. أفضل قرار استثماري اتخذته.'
        : 'Achieved 14% return in the first year! AI predictions were incredibly accurate. Best investment decision I\'ve made.',
    },
    {
      name: 'Elena Rodriguez',
      role: isAr ? 'مصممة' : 'Designer',
      location: isAr ? 'إسبانيا' : 'Spain',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80',
      rating: 5,
      text: isAr 
        ? 'اشتريت شقة في نخلة جميرا من خلال برنامج الملكية الجزئية. رائع! الآن أملك عقاراً في دبي دون الحاجة لملايين الدراهم.'
        : 'Bought an apartment in Palm Jumeirah through fractional ownership. Amazing! Now I own property in Dubai without needing millions.',
    },
    {
      name: 'Rajesh Kumar',
      role: isAr ? 'مدير تقني' : 'Tech Manager',
      location: isAr ? 'الهند' : 'India',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80',
      rating: 5,
      text: isAr 
        ? 'التكنولوجيا مذهلة! جولة الواقع الافتراضي سمحت لي بمعاينة العقار من مومباي. أكملت الصفقة خلال 48 ساعة.'
        : 'The technology is impressive! VR tour allowed me to view the property from Mumbai. Completed the deal in 48 hours.',
    },
    {
      name: 'Fatima Al Hashemi',
      role: isAr ? 'طبيبة' : 'Doctor',
      location: isAr ? 'دبي' : 'Dubai',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80',
      rating: 5,
      text: isAr 
        ? 'خدمة إدارة العقارات لا مثيل لها. يهتمون بكل شيء - من الصيانة إلى البحث عن المستأجرين. يمكنني التركيز على عملي.'
        : 'Property management service is unmatched. They handle everything - from maintenance to finding tenants. I can focus on my work.',
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Client Testimonials - Land AI Real Estate"
        description="Read what our clients say about their experience with Land AI Real Estate"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'آراء العملاء' : 'Client Testimonials'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'اقرأ ما يقوله عملاؤنا عن تجربتهم مع Land AI Real Estate'
            : 'Read what our clients say about their experience with Land AI Real Estate'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="p-6 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-3xl hover:border-blue-500 dark:hover:border-cyan-500 transition-all duration-300"
            >
              <Quote className="w-10 h-10 text-blue-600 dark:text-cyan-400 mb-4" />
              
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-zinc-200 dark:border-zinc-700">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-bold text-zinc-900 dark:text-white">{testimonial.name}</h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {testimonial.role} • {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-3xl text-center">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
            {isAr ? 'شارك تجربتك' : 'Share Your Experience'}
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 mb-6">
            {isAr 
              ? 'هل عملت معنا؟ نحب أن نسمع قصتك!'
              : 'Have you worked with us? We\'d love to hear your story!'}
          </p>
          <button className="px-8 py-4 bg-blue-600 dark:bg-cyan-600 text-white font-bold rounded-2xl hover:bg-blue-700 dark:hover:bg-cyan-700 transition-colors">
            {isAr ? 'اكتب تقييماً' : 'Write a Review'}
          </button>
        </div>
      </div>
    </div>
  );
}
