import { useLanguage } from '../context/LanguageContext';
import { Phone, Mail } from 'lucide-react';

export default function Leadership() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const t = {
    title: isAr ? 'القيادة' : 'Leadership',
    role: isAr ? 'المؤسس والمدير التنفيذي' : 'Founder & CEO',
    name: isAr ? 'السيد بسام حسين' : 'Mr. Bassam Hussein',
    desc: isAr 
      ? 'مع سنوات من القيادة الحكيمة في سوق العقارات في الإمارات، قام السيد بسام حسين ببناء منصة لاند إي آي لتصبح الوجهة الأولى لحلول العقارات الفاخرة. التزامه بالنزاهة والابتكار ورضا العملاء يدفع كل جانب من جوانب عملياتنا في دبي وأبو ظبي.'
      : 'With years of visionary leadership in the UAE real estate market, Mr. Bassam Hussein has built Land AI into a premier destination for luxury property solutions. His commitment to integrity, innovation, and client satisfaction drives every aspect of our operations across Dubai and Abu Dhabi.'
  };

  return (
    <section id="leadership" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-7xl font-black mb-4 text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] tracking-tighter uppercase">{t.title}</h2>
      </div>

      <div className="glass-12d rounded-[3rem] p-8 md:p-12 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group">
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-cyan-500/20 transition-colors duration-1000"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-purple-500/20 transition-colors duration-1000"></div>

        {/* Profile Image/Avatar */}
        <div className="relative z-10 w-48 h-48 md:w-64 md:h-64 flex-shrink-0 animate-float-12d">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-orange-500 blur-md rounded-[2.5rem] opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="w-full h-full rounded-[2.5rem] bg-gradient-to-br from-cyan-400 to-purple-600 p-[2px] relative z-10">
            <div className="w-full h-full rounded-[2.4rem] bg-black/80 backdrop-blur-2xl flex items-center justify-center overflow-hidden relative shadow-inner shadow-black/80">
              <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">BH</span>
              {/* Scanline */}
              <div className="absolute left-0 right-0 h-[2px] bg-cyan-400/50 shadow-[0_0_15px_#06b6d4] animate-scan pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 text-center md:text-left">
          <div className="inline-block px-5 py-2 rounded-full glass-12d-panel border border-cyan-500/30 text-xs font-bold mb-4 text-cyan-400 uppercase tracking-widest shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            {t.role}
          </div>
          <h3 className="text-4xl md:text-5xl font-black text-white mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.4)]">{t.name}</h3>
          <p className="text-lg text-zinc-400 font-light leading-relaxed mb-8 border-l-2 border-purple-500/50 pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pr-4">
            {t.desc}
          </p>
          
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <a href="tel:+971522850625" className="flex items-center gap-2 bg-black/60 border border-white/10 px-6 py-4 rounded-2xl hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all font-bold text-cyan-50 uppercase tracking-widest text-xs group/btn">
              <Phone className="w-5 h-5 text-cyan-400 group-hover/btn:animate-pulse" />
              +971 52 285 0625
            </a>
            <a href="mailto:land.a.i@outlook.com" className="flex items-center gap-2 bg-black/60 border border-white/10 px-6 py-4 rounded-2xl hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all font-bold text-purple-50 uppercase tracking-widest text-xs group/btn2">
              <Mail className="w-5 h-5 text-purple-400 group-hover/btn2:animate-pulse" />
              Email
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}