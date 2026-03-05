import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, User, ArrowRight } from 'lucide-react';

export default function BlogPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const posts = [
    {
      id: 1,
      title: isAr ? 'مستقبل العقارات في دبي 2030' : 'The Future of Dubai Real Estate in 2030',
      excerpt: isAr 
        ? 'كيف سيشكل الذكاء الاصطناعي والبلوكتشين مستقبل العقارات في دبي'
        : 'How AI and blockchain will shape Dubai\'s real estate landscape',
      author: 'Bassam Hussein',
      date: '2026-03-01',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80',
      category: isAr ? 'رؤى السوق' : 'Market Insights',
    },
    {
      id: 2,
      title: isAr ? 'الملكية الجزئية: دليل المستثمر' : 'Fractional Ownership: An Investor\'s Guide',
      excerpt: isAr
        ? 'كل ما تحتاج معرفته عن الاستثمار في الملكية الجزئية للعقارات'
        : 'Everything you need to know about fractional property investment',
      author: 'Sarah Ahmed',
      date: '2026-02-28',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80',
      category: isAr ? 'الاستثمار' : 'Investment',
    },
    {
      id: 3,
      title: isAr ? 'أفضل 10 مناطق في دبي للاستثمار' : 'Top 10 Areas in Dubai for Investment',
      excerpt: isAr
        ? 'استكشف أفضل المواقع للاستثمار العقاري في دبي'
        : 'Explore the best locations for real estate investment in Dubai',
      author: 'Michael Chen',
      date: '2026-02-25',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80',
      category: isAr ? 'دليل العقارات' : 'Property Guide',
    },
    {
      id: 4,
      title: isAr ? 'التحقق من البلوكتشين في العقارات' : 'Blockchain Verification in Real Estate',
      excerpt: isAr
        ? 'فهم كيفية عمل التحقق من البلوكتشين في المعاملات العقارية'
        : 'Understanding how blockchain verification works in property transactions',
      author: 'David Martinez',
      date: '2026-02-20',
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80',
      category: isAr ? 'التكنولوجيا' : 'Technology',
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Blog & News - Land AI Real Estate"
        description="Stay updated with the latest news, insights, and trends in UAE real estate market"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'المدونة والأخبار' : 'Blog & News'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'ابق على اطلاع بأحدث الأخبار والرؤى والاتجاهات في سوق العقارات في الإمارات'
            : 'Stay updated with the latest news, insights, and trends in UAE real estate market'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <article 
              key={post.id}
              className="group bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-3xl overflow-hidden hover:border-blue-500 dark:hover:border-cyan-500 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-4 py-2 bg-blue-600 dark:bg-cyan-600 text-white rounded-full text-sm font-semibold">
                  {post.category}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  {post.excerpt}
                </p>
                
                <button className="inline-flex items-center gap-2 text-blue-600 dark:text-cyan-400 font-semibold hover:gap-4 transition-all">
                  {isAr ? 'اقرأ المزيد' : 'Read More'}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
