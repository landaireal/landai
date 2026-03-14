import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Send, CheckCircle2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number').optional().or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log('Form data:', data);
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  const t = {
    title: isAr ? 'اتصل بنا' : 'Get In Touch',
    subtitle: isAr ? 'جاهز للعثور على عقارك المثالي؟ تواصل مع فريق الخبراء لدينا اليوم.' : 'Ready to find your perfect property? Get in touch with our expert team today.',
    name: isAr ? 'الاسم' : 'Your Name',
    email: isAr ? 'البريد الإلكتروني' : 'Email Address',
    phone: isAr ? 'رقم الهاتف' : 'Phone Number',
    message: isAr ? 'الرسالة' : 'Message',
    send: isAr ? 'إرسال الرسالة' : 'Send Message',
    info: [
      { icon: <MapPin />, title: isAr ? 'زورنا' : 'Visit Us', detail: 'Dubai & Abu Dhabi, UAE' },
      { icon: <Phone />, title: isAr ? 'اتصل بنا' : 'Call Us', detail: '+971 52 285 0625' },
      { icon: <Mail />, title: isAr ? 'راسلنا' : 'Email Us', detail: 'land.a.i@outlook.com' }
    ]
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Enhanced Info Side */}
        <div className="space-y-12">
          <div>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight">
              Let's build your <br />
              <span className="blueberry-text drop-shadow-lg dark:drop-shadow-[0_0_30px_rgba(102,126,234,0.5)]">Future together.</span>
            </h2>
            <p className="text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 font-semibold max-w-md leading-relaxed">
              {t.subtitle}
            </p>
            <div className="mt-6 flex items-start gap-3">
              <div className="h-1 w-20 bg-gradient-to-r from-transparent via-blue-500 to-purple-500 rounded-full"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
              <div className="h-1 w-20 bg-gradient-to-r from-purple-500 via-pink-500 to-transparent rounded-full"></div>
            </div>
          </div>

          <div className="space-y-6">
            {t.info.map((item, idx) => {
              const isPhone = idx === 1;
              const isEmail = idx === 2;
              const href = isPhone ? `tel:${item.detail}` : isEmail ? `mailto:${item.detail}` : undefined;
              const Component = href ? 'a' : 'div';
              
              return (
                <Component
                  key={idx}
                  href={href}
                  className={`group flex items-center gap-6 p-6 md:p-8 rounded-[2rem] card-premium relative overflow-hidden ${href ? 'cursor-pointer' : ''}`}
                >
                  {/* Shimmer effect for clickable items */}
                  {href && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>}
                  
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 dark:from-cyan-500 dark:to-purple-500 rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/40 dark:to-purple-900/40 text-indigo-600 dark:text-cyan-400 p-5 rounded-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 icon-float">
                      {item.icon}
                    </div>
                  </div>
                  <div className="relative z-10">
                    <h4 className="text-xl font-black text-zinc-900 dark:text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-purple-600 dark:group-hover:from-cyan-400 dark:group-hover:to-purple-400 transition-all duration-300">{item.title}</h4>
                    <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-semibold">{item.detail}</p>
                  </div>
                </Component>
              );
            })}
          </div>
        </div>

        {/* Enhanced Form Side */}
        <div className="card-premium p-8 md:p-12 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-blue-500/10 via-purple-500/10 to-transparent dark:from-cyan-500/20 dark:via-purple-500/20 rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-500/10 via-pink-500/10 to-transparent dark:from-purple-500/20 dark:via-pink-500/20 rounded-tr-full"></div>
          
          {isSubmitted && (
            <div className="relative z-10 mb-8 p-5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 border-2 border-green-200 dark:border-green-800/50 rounded-2xl flex items-center gap-4 shadow-lg dark:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
                <CheckCircle2 className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <p className="text-green-800 dark:text-green-300 font-bold text-lg">
                {isAr ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!'}
              </p>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 relative z-10">
            <div className="space-y-3">
              <label className="text-sm font-black text-zinc-900 dark:text-white ml-2 uppercase tracking-wider">{t.name}</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                {...register('name')}
                className={`w-full bg-white dark:bg-zinc-950 border-2 ${
                  errors.name ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'
                } rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-cyan-500 focus:border-transparent transition-all text-zinc-900 dark:text-white font-medium shadow-sm hover:shadow-md`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm ml-2 font-semibold">{errors.name.message}</p>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 dark:text-white ml-2">{t.email}</label>
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  {...register('email')}
                  className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${
                    errors.email ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'
                  } rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-zinc-900 dark:text-white`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm ml-2">{errors.email.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-900 dark:text-white ml-2">{t.phone}</label>
                <input 
                  type="tel" 
                  placeholder="+971 50 123 4567" 
                  {...register('phone')}
                  className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${
                    errors.phone ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'
                  } rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-zinc-900 dark:text-white`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm ml-2">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 dark:text-white ml-2">{t.message}</label>
              <textarea 
                rows={4} 
                placeholder="Tell us about your requirements..." 
                {...register('message')}
                className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${
                  errors.message ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'
                } rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-zinc-900 dark:text-white resize-none`}
              ></textarea>
              {errors.message && (
                <p className="text-red-500 text-sm ml-2">{errors.message.message}</p>
              )}
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full btn-primary py-6 text-xl justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              <span>{isSubmitting ? (isAr ? 'جارٍ الإرسال...' : 'Sending...') : t.send}</span>
              <Send className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}