import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Building2, TrendingUp } from 'lucide-react';

export default function LocationsPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const locations = [
    {
      name: isAr ? 'وسط مدينة دبي' : 'Downtown Dubai',
      properties: 250,
      avgPrice: 'AED 2.5M',
      growth: '+15.2%',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80',
      description: isAr 
        ? 'قلب دبي النابض، موطن برج خليفة ودبي مول'
        : 'The beating heart of Dubai, home to Burj Khalifa and Dubai Mall',
    },
    {
      name: isAr ? 'دبي مارينا' : 'Dubai Marina',
      properties: 320,
      avgPrice: 'AED 1.8M',
      growth: '+12.8%',
      image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80',
      description: isAr 
        ? 'مجتمع حيوي على الواجهة البحرية مع أسلوب حياة عصري'
        : 'Vibrant waterfront community with modern lifestyle',
    },
    {
      name: isAr ? 'نخلة جميرا' : 'Palm Jumeirah',
      properties: 180,
      avgPrice: 'AED 4.2M',
      growth: '+18.5%',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80',
      description: isAr 
        ? 'جزيرة اصطناعية فاخرة مع عقارات حصرية على الشاطئ'
        : 'Iconic artificial island with exclusive beachfront properties',
    },
    {
      name: isAr ? 'الخليج التجاري' : 'Business Bay',
      properties: 290,
      avgPrice: 'AED 1.6M',
      growth: '+10.3%',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
      description: isAr 
        ? 'المركز التجاري مع مزيج من المكاتب والشقق السكنية'
        : 'Business hub with mix of offices and residential apartments',
    },
    {
      name: isAr ? 'جميرا بيتش ريزيدنس' : 'Jumeirah Beach Residence',
      properties: 240,
      avgPrice: 'AED 2.1M',
      growth: '+13.7%',
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80',
      description: isAr 
        ? 'مجتمع شاطئي مع مطاعم ومحلات ووسائل ترفيه'
        : 'Beachfront community with dining, retail and entertainment',
    },
    {
      name: isAr ? 'جزيرة الريم - أبو ظبي' : 'Al Reem Island - Abu Dhabi',
      properties: 160,
      avgPrice: 'AED 1.5M',
      growth: '+11.2%',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80',
      description: isAr 
        ? 'تطوير حديث في أبو ظبي مع مرافق عالمية المستوى'
        : 'Modern development in Abu Dhabi with world-class amenities',
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Prime Locations - Land AI Real Estate"
        description="Explore the best real estate locations in Dubai and Abu Dhabi"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'المواقع الرئيسية' : 'Prime Locations'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'استكشف أفضل مواقع العقارات في دبي وأبو ظبي'
            : 'Explore the best real estate locations in Dubai and Abu Dhabi'}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((location, index) => (
            <div 
              key={index}
              className="group bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-3xl overflow-hidden hover:border-blue-500 dark:hover:border-cyan-500 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={location.image} 
                  alt={location.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                  {location.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                  {location.description}
                </p>
                
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <div>
                    <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 text-xs mb-1">
                      <Building2 className="w-3 h-3" />
                      <span>{isAr ? 'عقارات' : 'Properties'}</span>
                    </div>
                    <p className="font-bold text-zinc-900 dark:text-white">{location.properties}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 text-xs mb-1">
                      <MapPin className="w-3 h-3" />
                      <span>{isAr ? 'متوسط السعر' : 'Avg Price'}</span>
                    </div>
                    <p className="font-bold text-zinc-900 dark:text-white">{location.avgPrice}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-zinc-600 dark:text-zinc-400 text-xs mb-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>{isAr ? 'النمو' : 'Growth'}</span>
                    </div>
                    <p className="font-bold text-green-600 dark:text-green-400">{location.growth}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
