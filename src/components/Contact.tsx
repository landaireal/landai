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
        
        {/* Info Side */}
        <div className="space-y-12">
          <div>
            <h2 className="text-5xl md:text-6xl font-extrabold text-zinc-900 dark:text-white mb-6 tracking-tight">
              Let's build your <br />
              <span className="ai-gradient-text">Future together.</span>
            </h2>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium max-w-md">
              {t.subtitle}
            </p>
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
                  className={`flex items-center gap-6 p-6 rounded-[2rem] bg-white dark:bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/50 shadow-sm ${href ? 'hover:border-indigo-400 dark:hover:border-indigo-600 transition-all cursor-pointer hover:shadow-md' : ''}`}
                >
                  <div className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 p-4 rounded-2xl">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium">{item.detail}</p>
                  </div>
                </Component>
              );
            })}
          </div>
        </div>

        {/* Form Side */}
        <div className="bg-white dark:bg-zinc-900 p-8 md:p-12 rounded-[3rem] border border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl">
          {isSubmitted && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
              <p className="text-green-800 dark:text-green-300 font-medium">
                {isAr ? 'تم إرسال رسالتك بنجاح!' : 'Message sent successfully!'}
              </p>
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-zinc-900 dark:text-white ml-2">{t.name}</label>
              <input 
                type="text" 
                placeholder="John Doe" 
                {...register('name')}
                className={`w-full bg-zinc-50 dark:bg-zinc-950 border ${
                  errors.name ? 'border-red-500' : 'border-zinc-200 dark:border-zinc-800'
                } rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all text-zinc-900 dark:text-white`}
              />
              {errors.name && (
                <p className="text-red-500 text-sm ml-2">{errors.name.message}</p>
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
              className="w-full ai-gradient-bg text-white py-5 rounded-2xl font-bold text-lg hover:shadow-lg hover:shadow-indigo-500/25 transition-all flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (isAr ? 'جارٍ الإرسال...' : 'Sending...') : t.send} 
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}