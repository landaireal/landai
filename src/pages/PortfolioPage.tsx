import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';
import { Building2, DollarSign, TrendingUp, Users } from 'lucide-react';

export default function PortfolioPage() {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  const stats = [
    {
      icon: Building2,
      value: '500+',
      label: isAr ? 'عقار نشط' : 'Active Properties',
    },
    {
      icon: DollarSign,
      value: 'AED 2.5B+',
      label: isAr ? 'القيمة الإجمالية' : 'Total Portfolio Value',
    },
    {
      icon: TrendingUp,
      value: '12.8%',
      label: isAr ? 'متوسط العائد السنوي' : 'Avg. Annual Return',
    },
    {
      icon: Users,
      value: '1,200+',
      label: isAr ? 'مستثمر نشط' : 'Active Investors',
    },
  ];

  const projects = [
    {
      name: isAr ? 'برج السماء دبي' : 'Dubai Sky Tower',
      location: isAr ? 'وسط مدينة دبي' : 'Downtown Dubai',
      value: 'AED 450M',
      units: 120,
      status: isAr ? 'مكتمل' : 'Completed',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&q=80',
      roi: '14.2%',
    },
    {
      name: isAr ? 'نخلة الواحة' : 'Palm Oasis Residences',
      location: isAr ? 'نخلة جميرا' : 'Palm Jumeirah',
      value: 'AED 680M',
      units: 85,
      status: isAr ? 'قيد التطوير' : 'Under Development',
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80',
      roi: '16.5%',
    },
    {
      name: isAr ? 'مارينا بلازا' : 'Marina Plaza',
      location: isAr ? 'دبي مارينا' : 'Dubai Marina',
      value: 'AED 320M',
      units: 95,
      status: isAr ? 'مكتمل' : 'Completed',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80',
      roi: '11.8%',
    },
    {
      name: isAr ? 'مدينة أبو ظبي المستقبلية' : 'Abu Dhabi Future City',
      location: isAr ? 'جزيرة الريم' : 'Al Reem Island',
      value: 'AED 550M',
      units: 150,
      status: isAr ? 'قيد التخطيط' : 'Planning',
      image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80',
      roi: '15.3%',
    },
  ];

  return (
    <div className="min-h-screen pt-20 bg-transparent">
      <SEO 
        title="Portfolio - Land AI Real Estate"
        description="Explore our diverse portfolio of premium real estate projects across UAE"
      />
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-6xl font-bold text-center mb-8 text-zinc-900 dark:text-white">
          {isAr ? 'محفظتنا العقارية' : 'Our Portfolio'}
        </h1>
        <p className="text-center text-zinc-600 dark:text-zinc-400 mb-16 max-w-3xl mx-auto text-lg">
          {isAr 
            ? 'استكشف محفظتنا المتنوعة من المشاريع العقارية الفاخرة في جميع أنحاء الإمارات'
            : 'Explore our diverse portfolio of premium real estate projects across UAE'}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index}
                className="p-6 bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-2xl text-center"
              >
                <Icon className="w-12 h-12 text-blue-600 dark:text-cyan-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">{stat.value}</div>
                <div className="text-zinc-600 dark:text-zinc-400">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Projects */}
        <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">
          {isAr ? 'مشاريعنا البارزة' : 'Featured Projects'}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group bg-transparent border border-zinc-300 dark:border-zinc-700 rounded-3xl overflow-hidden hover:border-blue-500 dark:hover:border-cyan-500 transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 px-4 py-2 bg-blue-600 dark:bg-cyan-600 text-white rounded-full font-semibold">
                  {project.status}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                  {project.name}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 mb-4">{project.location}</p>
                
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{isAr ? 'القيمة' : 'Value'}</p>
                    <p className="font-bold text-zinc-900 dark:text-white">{project.value}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{isAr ? 'الوحدات' : 'Units'}</p>
                    <p className="font-bold text-zinc-900 dark:text-white">{project.units}</p>
                  </div>
                  <div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">{isAr ? 'العائد' : 'ROI'}</p>
                    <p className="font-bold text-green-600 dark:text-green-400">{project.roi}</p>
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
