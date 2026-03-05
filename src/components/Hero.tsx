import { useLanguage } from '../context/LanguageContext';
import { Search, Sparkles, MapPin, Mic, Bed, Bath, Maximize, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { StaggerChildren, StaggerItem } from './AnimatedSection';
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { luxuryVillas } from '../data/villas';
import { luxuryPenthouses } from '../data/penthouses';

export default function Hero() {
  const { language } = useLanguage();
  const isAr = language === 'ar';
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  const t = {
    premium: isAr ? 'عقارات فاخرة في الإمارات' : 'Premium Real Estate in UAE',
    find: isAr ? 'ابحث عن حلمك' : 'Find Your Dream',
    luxury: isAr ? 'منزل فاخر' : 'Luxury Home',
    inUae: isAr ? 'في الإمارات' : 'in UAE',
    desc: isAr 
      ? 'عقارات حصرية في دبي وأبو ظبي مصممة خصيصاً لتناسب أسلوب حياتك.' 
      : 'Exclusive properties in Dubai & Abu Dhabi tailored to your lifestyle.',
    explore: isAr ? 'استكشف العقارات' : 'Explore Properties',
    contact: isAr ? 'اتصل بنا' : 'Contact Us',
    placeholder: isAr ? 'اسأل الذكاء الاصطناعي: فيلا في دبي...' : 'Ask AI: Luxury villa in Dubai...',
    search: isAr ? 'بحث' : 'Search'
  };

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setSpeechSupported(true);
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = isAr ? 'ar-SA' : 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, [isAr]);

  // Handle voice search
  const handleVoiceSearch = () => {
    if (!speechSupported) {
      alert(isAr ? 'البحث الصوتي غير مدعوم في هذا المتصفح' : 'Voice search is not supported in this browser');
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      recognitionRef.current?.start();
    }
  };

  // Handle search submission
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to properties page with search query
      navigate(`/properties?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Get featured products - best mix of new and premium properties
  const [currentIndex, setCurrentIndex] = useState(0);
  const featuredProducts = [
    luxuryVillas[0], // Palm Jumeirah Masterpiece
    luxuryPenthouses[0], // Burj Khalifa Sky Residence
    luxuryVillas[1], // Emirates Hills Estate
    luxuryPenthouses[1], // Marina Crown Penthouse
    luxuryVillas[2], // Arabian Ranches Villa
  ];

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center pt-32 pb-12 overflow-hidden">
      {/* Full-width Moving Backgrounds */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Light Mode Moving Daytime Background */}
        <div className="absolute inset-0 dark:opacity-0 transition-opacity duration-700">
          <img 
            src="https://images.unsplash.com/photo-1582685945432-29a7ab4ce32f?q=80&w=2560&auto=format&fit=crop" 
            alt="Daytime Premium Dubai Skyline Background" 
            className="w-full h-[120%] object-cover animate-pan opacity-100"
          />
        </div>
        
        {/* Dark Mode 12D Deep Space Background */}
        <div className="absolute inset-0 opacity-0 dark:opacity-100 transition-opacity duration-700">
          <img 
            src="https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&q=80" 
            alt="Cyberpunk Dubai Skyline Background" 
            className="w-full h-[120%] object-cover opacity-60 animate-pan filter contrast-125 brightness-125"
          />
          <div className="absolute inset-0 bg-[#030014]/70 z-10 pointer-events-none"></div>
        </div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center">

        <div className="relative z-10 w-full max-w-5xl mx-auto px-4 text-center space-y-8 mt-12">
          
          {/* Premium Badge (Adapts Light/Dark) */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-4 px-10 py-3 rounded-full bg-white/80 dark:bg-black/40 backdrop-blur-md border border-zinc-200 dark:border-cyan-500/50 shadow-lg dark:shadow-[0_0_30px_rgba(6,182,212,0.4)] animate-float-12d mb-6 group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-blue-500/5 dark:from-cyan-500/20 dark:via-purple-500/20 dark:to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <div className="w-3 h-3 bg-blue-500 dark:bg-purple-400 rounded-full dark:shadow-[0_0_10px_#a855f7] animate-ping"></div>
            <span className="font-black tracking-[0.4em] text-xs md:text-sm text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-purple-400 dark:via-cyan-400 dark:to-cyan-200 uppercase">
              ☆ PREMIUM REAL ESTATE IN UAE ☆
            </span>
            <div className="w-3 h-3 bg-indigo-500 dark:bg-cyan-400 rounded-full dark:shadow-[0_0_10px_#06b6d4] animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-7xl md:text-8xl lg:text-[10rem] font-black text-zinc-900 dark:text-white leading-[0.95] tracking-tighter drop-shadow-sm dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)]"
          >
            <span className="block mb-2 transition-all">{t.find}</span>
            <div className="relative inline-block mb-4 pb-4">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-cyan-400 dark:via-purple-500 dark:to-cyan-400 dark:filter dark:drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                {t.luxury}
              </span>
              {/* Underline */}
              <div className="absolute -bottom-4 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 dark:via-cyan-400 to-transparent dark:shadow-[0_0_20px_#06b6d4]"></div>
              <div className="absolute -bottom-4 left-0 w-full h-[1px] bg-zinc-300 dark:bg-white"></div>
            </div>
            <span className="block dark:drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]">{t.inUae}</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-xl md:text-2xl text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto font-light leading-relaxed tracking-wide backdrop-blur-md bg-white/40 dark:bg-black/20 p-4 rounded-2xl border border-zinc-200/50 dark:border-white/5 shadow-sm dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
          >
            {t.desc}
          </motion.p>

          {/* 12D Holographic AI Search Bar & Radar */}
          {/* Smart Contract Trust Badges */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-900/20 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)] text-emerald-300 text-xs md:text-sm font-semibold tracking-widest uppercase">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {isAr ? 'عقود ذكية موثقة' : 'Smart Contract Verified'}
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-purple-500/30 bg-purple-900/20 backdrop-blur-md shadow-[0_0_15px_rgba(168,85,247,0.2)] text-purple-300 text-xs md:text-sm font-semibold tracking-widest uppercase">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {isAr ? 'دفع بالعملات الرقمية متاح' : 'Crypto Payments Accepted'}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-10 max-w-4xl mx-auto relative group flex flex-col md:flex-row items-center gap-6"
          >
            
            {/* Radar Element Adapts to light/dark - NOW CLICKABLE */}
            <button 
              type="button"
              onClick={() => handleSearch()}
              className="hidden md:flex relative w-24 h-24 rounded-full bg-white/60 dark:bg-black/40 backdrop-blur-xl border border-blue-500/20 dark:border-cyan-500/50 items-center justify-center shrink-0 overflow-hidden shadow-lg dark:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-110 hover:shadow-xl dark:hover:shadow-[0_0_50px_rgba(6,182,212,0.5)] transition-all duration-300 cursor-pointer group/radar"
              title={isAr ? 'بحث' : 'Search'}
            >
              <div className="absolute inset-0 bg-blue-500/5 dark:bg-cyan-500/20 rounded-full group-hover/radar:bg-blue-500/10 dark:group-hover/radar:bg-cyan-500/30 transition-colors"></div>
              {/* Radar Sweep */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent to-blue-500/20 dark:to-cyan-400/50 origin-right animate-[spin_4s_linear_infinite] group-hover/radar:to-blue-500/40 dark:group-hover/radar:to-cyan-400/70"></div>
              <div className="absolute inset-2 border border-blue-500/10 dark:border-cyan-500/30 rounded-full group-hover/radar:border-blue-500/30 dark:group-hover/radar:border-cyan-500/50 transition-colors"></div>
              <div className="absolute inset-6 border border-blue-500/10 dark:border-cyan-500/20 rounded-full group-hover/radar:border-blue-500/20 dark:group-hover/radar:border-cyan-500/40 transition-colors"></div>
              <Search className="w-8 h-8 text-blue-600 dark:text-cyan-300 relative z-10 group-hover/radar:scale-110 group-hover/radar:text-blue-700 dark:group-hover/radar:text-cyan-200 transition-all" />
            </button>

            {/* Input Box */}
            <form onSubmit={handleSearch} className="relative flex-1 w-full">
              {/* 12D Glowing Border Container (Dark mode active only) */}
              <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 dark:from-orange-500 dark:via-cyan-500 dark:to-purple-500 rounded-full opacity-30 dark:opacity-70 blur-md group-hover:opacity-60 dark:group-hover:opacity-100 transition duration-500"></div>
              <div className="relative flex items-center bg-white/90 dark:bg-black/60 backdrop-blur-2xl border-t border-zinc-200 dark:border-cyan-500/30 border-b border-zinc-200 dark:border-purple-500/30 p-2 rounded-full h-[80px] shadow-xl">
                
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isAr ? "نظام 12D الكمي: أدخل أفكارك للبحث..." : "12D Quantum AI: Input search query..."}
                  className="flex-1 bg-transparent border-none text-zinc-900 dark:text-white px-6 py-4 outline-none placeholder:text-zinc-400 dark:placeholder:text-cyan-300/50 text-xl font-bold tracking-wider w-full"
                  dir={isAr ? "rtl" : "ltr"}
                />
                
                {/* 12D Voice AI Mic */}
                <div className="relative flex items-center justify-center mr-4 ml-2">
                  <div className={`absolute inset-0 rounded-full blur-md ${isListening ? 'bg-red-500/30 animate-pulse' : 'bg-indigo-500/10 dark:bg-purple-500/30 animate-pulse'}`}></div>
                  <div className={`absolute inset-0 rounded-full ${isListening ? 'bg-red-500/30 animate-ping' : 'bg-blue-500/10 dark:bg-cyan-500/20 animate-ping'}`}></div>
                  <button 
                    type="button"
                    onClick={handleVoiceSearch}
                    className={`relative z-10 p-3 bg-zinc-100 dark:bg-black/60 border rounded-full hover:scale-110 transition-all duration-300 shadow-md hover:shadow-lg ${
                      isListening 
                        ? 'border-red-500 text-red-600 dark:text-red-400 dark:shadow-[0_0_25px_rgba(239,68,68,0.6)]' 
                        : 'border-zinc-300 dark:border-purple-500/50 text-zinc-600 dark:text-purple-400 hover:text-blue-600 dark:hover:text-cyan-300 dark:shadow-[0_0_15px_rgba(168,85,247,0.4)] dark:hover:shadow-[0_0_25px_rgba(6,182,212,0.6)]'
                    }`}
                    title={isListening ? (isAr ? 'جاري الاستماع...' : 'Listening...') : (isAr ? 'البحث الصوتي' : 'Voice Search')}
                  >
                    <Mic className={`h-6 w-6 ${isListening ? 'animate-pulse' : ''}`} />
                  </button>
                </div>

                <button 
                  type="submit"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-cyan-500 dark:to-blue-600 text-white px-8 py-4 h-full rounded-full font-bold hover:scale-105 transition-all duration-300 shadow-lg dark:shadow-[0_0_20px_rgba(6,182,212,0.5)] flex items-center gap-2 border border-blue-400/30 dark:border-cyan-400/50 uppercase tracking-wider"
                >
                  <Sparkles className="w-5 h-5" />
                  {isAr ? "بحث هولوغرامي" : "Hologram Scan"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Featured Products Section */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 mt-24 mb-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <motion.div
              className="inline-block px-6 py-2 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 dark:from-cyan-500/20 dark:via-blue-500/20 dark:to-purple-500/20 rounded-full border border-cyan-500/30 dark:border-cyan-400/40 mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 uppercase tracking-wider">
                {isAr ? '✨ عقارات مميزة ✨' : '✨ Featured Properties ✨'}
              </span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4">
              {isAr ? 'أفضل اختياراتنا' : 'Our Premium Selection'}
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              {isAr 
                ? 'اكتشف أرقى العقارات الفاخرة في دبي وأبو ظبي - مختارة بعناية لتناسب أسلوب حياتك المميز'
                : 'Discover the finest luxury properties in Dubai & Abu Dhabi - Handpicked for your exclusive lifestyle'}
            </p>
          </motion.div>

          {/* Product Cards Grid */}
          <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6" staggerDelay={0.08}>
            {featuredProducts.map((product, idx) => (
              <StaggerItem key={product.id}>
                <motion.div 
                  initial={{ opacity: 0, y: 50, rotateX: -15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.08, y: -15, rotateY: 5, z: 50 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 200, damping: 15 }}
                  onClick={() => navigate(`/property/${product.id}`)}
                  style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                  className="group relative h-96 rounded-3xl overflow-hidden cursor-pointer shadow-2xl hover:shadow-[0_25px_50px_-12px_rgba(6,182,212,0.5)] border-2 border-white/20 dark:border-cyan-500/30 hover:border-cyan-400/70 dark:hover:border-cyan-400/80 transition-all duration-500 bg-gradient-to-br from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800"
                >
                  {/* 12D Holographic Glow Background */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-30 dark:group-hover:opacity-50 blur-2xl transition-opacity duration-700 animate-pulse"></div>
                  
                  {/* Product Image with Parallax */}
                  <div className="relative h-52 overflow-hidden">
                    <motion.img 
                      src={product.images[0]} 
                      alt={product.title} 
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700"
                      whileHover={{ scale: 1.2 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent group-hover:from-black/60 transition-all duration-500"></div>
                    
                    {/* Animated Scan Line Effect */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent h-32 w-full"
                      animate={{ y: ['-100%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                    />
                    
                    {/* NEW Badge with Enhanced Animation */}
                    <motion.div 
                      className="absolute top-3 left-3 px-2.5 py-1 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-[10px] font-black rounded-full shadow-2xl flex items-center gap-1"
                      animate={{ scale: [1, 1.08, 1], boxShadow: ['0 0 20px rgba(6,182,212,0.5)', '0 0 30px rgba(6,182,212,0.8)', '0 0 20px rgba(6,182,212,0.5)'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <TrendingUp className="w-2.5 h-2.5" />
                      {isAr ? 'جديد' : 'NEW'}
                    </motion.div>
                    
                    {/* Type Badge with Glow */}
                    <div className="absolute top-3 right-3 px-2.5 py-1 bg-white/95 dark:bg-black/90 backdrop-blur-md text-zinc-900 dark:text-cyan-400 text-[10px] font-black rounded-full shadow-xl border border-cyan-400/50">
                      {product.type}
                    </div>

                    {/* Premium Ribbon for High-Value Properties */}
                    {product.price > 10000000 && (
                      <div className="absolute -right-10 top-6 rotate-45 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-black px-12 py-1 shadow-xl">
                        {isAr ? 'فاخر' : 'PREMIUM'}
                      </div>
                    )}
                  </div>

                  {/* Product Info with Enhanced Typography */}
                  <div className="relative p-4 space-y-2.5 z-10">
                    {/* Title with Gradient on Hover */}
                    <h3 className="font-black text-base text-zinc-900 dark:text-white line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-600 group-hover:to-blue-600 dark:group-hover:from-cyan-400 dark:group-hover:to-blue-400 transition-all duration-300 leading-tight">
                      {product.title}
                    </h3>
                    
                    {/* Location with Enhanced Icon */}
                    <div className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400 text-xs">
                      <div className="w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MapPin className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <span className="line-clamp-1 font-semibold">{product.location}</span>
                    </div>

                    {/* Stats with Compact Icons */}
                    <div className="flex items-center justify-between text-[10px] font-bold text-zinc-700 dark:text-zinc-300 bg-gradient-to-r from-zinc-100 to-zinc-50 dark:from-zinc-800 dark:to-zinc-800/50 rounded-full px-3 py-1.5 border border-zinc-200 dark:border-zinc-700">
                      <div className="flex items-center gap-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                          <Bed className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                        </div>
                        <span>{product.bedrooms}</span>
                      </div>
                      <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-600"></div>
                      <div className="flex items-center gap-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        <div className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                          <Bath className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                        </div>
                        <span>{product.bathrooms}</span>
                      </div>
                      <div className="w-px h-4 bg-zinc-300 dark:bg-zinc-600"></div>
                      <div className="flex items-center gap-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                        <div className="w-5 h-5 rounded-full bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center">
                          <Maximize className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <span className="text-[9px]">{product.area}</span>
                      </div>
                    </div>

                    {/* Price with Enhanced Gradient */}
                    <div className="pt-2 border-t-2 border-zinc-200 dark:border-zinc-700 group-hover:border-cyan-400/50 transition-colors">
                      <motion.div 
                        className="flex flex-col"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-semibold uppercase tracking-wide">
                          {isAr ? 'السعر' : 'Price'}
                        </span>
                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 dark:from-cyan-400 dark:via-blue-400 dark:to-purple-400 group-hover:from-cyan-500 group-hover:via-blue-500 group-hover:to-purple-500 animate-gradient-x">
                          {formatPrice(product.price, product.currency)}
                        </span>
                      </motion.div>
                    </div>
                  </div>

                  {/* 12D Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/0 via-blue-500/0 to-purple-500/0 group-hover:from-cyan-500/20 group-hover:via-blue-500/10 group-hover:to-purple-500/5 dark:group-hover:from-cyan-500/30 dark:group-hover:via-blue-500/20 dark:group-hover:to-purple-500/10 transition-all duration-700 pointer-events-none"></div>
                  
                  {/* Click Indicator */}
                  <motion.div 
                    className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-cyan-500/20 dark:bg-cyan-400/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                  </motion.div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>

      </div>
    </section>
  );
}