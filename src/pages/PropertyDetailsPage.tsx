import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProperty } from '../hooks/useProperty';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { MapPin, Bed, Bath, Maximize, ArrowLeft, CheckCircle, Sparkles, CreditCard, TrendingUp, Phone } from 'lucide-react';
import { getSimilarProperties, getPriceInsight } from '../services/aiService';
import type { Property } from '../services/api';
import { useUserData } from '../context/UserDataContext';
import PropertyTimeline from '../components/PropertyTimeline';
import VirtualTourScheduler from '../components/VirtualTourScheduler';
import ShareProperty from '../components/ShareProperty';
import CurrencyConverter from '../components/CurrencyConverter';

export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isAr = language === 'ar';
  const { property, loading, error } = useProperty(id);
  const { isSaved, toggleSaved, markViewed } = useUserData();
  const [selectedImage, setSelectedImage] = useState(0);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [priceInsight, setPriceInsight] = useState<{ prediction: string; confidence: number; trend: string } | null>(null);

  useEffect(() => {
    if (!property) return;
    markViewed(property.id, { source: 'property_details' });
    getSimilarProperties(property, 4).then(setSimilarProperties);
    getPriceInsight(property).then((insight) =>
      setPriceInsight({ prediction: insight.prediction, confidence: insight.confidence, trend: insight.trend })
    );
  }, [property]);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-32 flex justify-center items-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 dark:border-cyan-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            {isAr ? 'جاري التحميل...' : 'Loading property...'}
          </p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen pt-32 flex flex-col justify-center items-center bg-gray-50 dark:bg-gray-900 px-4">
        <p className="text-red-500 dark:text-red-400 mb-6 text-lg font-semibold text-center">
          {error || (isAr ? 'العقار غير موجود' : 'Property not found')}
        </p>
        <button
          onClick={() => navigate('/properties')}
          className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50"
        >
          {t('backToProperties')}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <SEO 
        title={`${property.title} - Land AI Real Estate`}
        description={property.description}
      />
      
      {/* Spacer to account for fixed navbar - increased for better visibility */}
      <div className="h-28 md:h-32"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {/* Back Button - Now clearly visible below navbar with proper spacing */}
        <div className="mb-6 md:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-3 md:px-6 md:py-3.5 bg-white dark:bg-slate-800 border-2 border-blue-600 dark:border-cyan-400 text-blue-600 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-cyan-900/20 rounded-xl font-semibold transition-all shadow-md hover:shadow-xl hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-blue-500/50 dark:focus:ring-cyan-400/50"
            aria-label={isAr ? 'العودة إلى الصفحة السابقة' : 'Go back to previous page'}
          >
            <ArrowLeft className="w-5 h-5" />
            <span>{isAr ? 'رجوع' : 'Back'}</span>
          </button>
        </div>

        {/* Main Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-12">
          {/* Large Main Image */}
          <div className="lg:col-span-2">
            <div className="relative h-[400px] md:h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl bg-gray-200 dark:bg-gray-800">
              <img
                src={property.images[selectedImage]}
                alt={`${property.title} - Image ${selectedImage + 1}`}
                loading={selectedImage === 0 ? 'eager' : 'lazy'}
                fetchPriority={selectedImage === 0 ? 'high' : undefined}
                className="w-full h-full object-cover transition-opacity duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/1200x800?text=Property+Image';
                }}
              />
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                <span className="bg-white/95 dark:bg-black/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold uppercase text-gray-800 dark:text-white shadow-lg">
                  {property.type}
                </span>
                {property.blockchain_verified && (
                  <span className="bg-emerald-500/95 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1 shadow-lg">
                    <CheckCircle className="w-4 h-4" />
                    {isAr ? 'موثق' : 'Verified'}
                  </span>
                )}
              </div>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-semibold">
                {selectedImage + 1} / {property.images.length}
              </div>
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-3 lg:grid-cols-2 gap-2 lg:gap-3">
            {property.images.slice(0, 6).map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-24 md:h-32 rounded-lg overflow-hidden border-2 transition-all shadow-md hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 ${
                  selectedImage === index
                    ? 'border-blue-600 dark:border-cyan-400 scale-95'
                    : 'border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-cyan-500'
                }`}
                aria-label={`View image ${index + 1}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300?text=Image';
                  }}
                />
                {selectedImage === index && (
                  <div className="absolute inset-0 bg-blue-600/20 dark:bg-cyan-400/20"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            {/* Title & Location Section */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-4 leading-tight">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400 gap-2 mb-6">
                <MapPin className="w-5 h-5 flex-shrink-0" />
                <span className="text-base md:text-lg">{property.location}</span>
              </div>
              <div className="flex items-center gap-2 p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-500/30 w-fit">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-base md:text-lg font-bold text-purple-600 dark:text-purple-400">
                  {isAr ? 'تقييم الذكاء الاصطناعي' : 'AI Score'}: <span className="text-xl">{property.ai_score}/10</span>
                </span>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <div className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-500/30 p-4 md:p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Bed className="w-7 h-7 text-blue-600 dark:text-blue-400 mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {property.bedrooms}
                </div>
                <div className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                  {isAr ? 'غرف النوم' : 'Bedrooms'}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-500/30 p-4 md:p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Bath className="w-7 h-7 text-blue-600 dark:text-blue-400 mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {property.bathrooms}
                </div>
                <div className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                  {isAr ? 'الحمامات' : 'Bathrooms'}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 border-2 border-blue-200 dark:border-blue-500/30 p-4 md:p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <Maximize className="w-7 h-7 text-blue-600 dark:text-blue-400 mb-3" />
                <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                  {property.area}
                </div>
                <div className="text-xs md:text-sm font-medium text-gray-600 dark:text-gray-400">
                  {property.areaUnit}
                </div>
              </div>
              <div className="bg-white dark:bg-gray-800 border-2 border-emerald-200 dark:border-emerald-500/30 p-4 md:p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400 mb-3" />
                <div className="text-base md:text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-2">
                  {property.available ? (isAr ? 'متاح' : 'Available') : (isAr ? 'محجوز' : 'Reserved')}
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-zinc-900 dark:text-white flex items-center gap-2">
                {isAr ? 'الوصف' : 'Description'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 md:p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-zinc-900 dark:text-white">
                {isAr ? 'المميزات' : 'Features'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl border border-gray-200 dark:border-gray-600 hover:border-emerald-400 dark:hover:border-emerald-500 transition-colors"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                    <span className="text-sm md:text-base text-gray-700 dark:text-gray-300 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Price & Contact */}
          <div className="lg:col-span-1 space-y-6">
            <div className="lg:sticky lg:top-32 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8 border-2 border-gray-200 dark:border-gray-700">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                    {isAr ? 'السعر' : 'Price'}
                  </div>
                  <ShareProperty propertyId={property.id} propertyTitle={property.title} />
                </div>
                <div className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-yellow-400 dark:to-orange-500 mb-1">
                  {property.currency} {property.price.toLocaleString()}
                </div>
                {priceInsight && (
                  <div className="mt-4 p-4 rounded-xl bg-cyan-50 dark:bg-cyan-900/30 border-2 border-cyan-200 dark:border-cyan-500/50 hover:border-cyan-400 dark:hover:border-cyan-400 transition-colors">
                    <div className="flex items-center gap-2 text-xs font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-wider mb-2">
                      <TrendingUp className="w-4 h-4" />
                      {t('aiPriceInsight')}
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-200 font-medium mb-2">{priceInsight.prediction}</p>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">{priceInsight.confidence}% confidence</p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => navigate(`/properties/${id}/payment`)}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-purple-500/50 active:scale-95"
                  aria-label={isAr ? 'عرض خطط الدفع' : 'View payment plans'}
                >
                  <CreditCard className="w-5 h-5" />
                  {isAr ? 'خطط الدفع' : 'View Payment Plans'}
                </button>
                <button 
                  onClick={() => navigate('/contact')}
                  className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 active:scale-95"
                  aria-label={isAr ? 'الاتصال بالوكيل' : 'Contact agent'}
                >
                  {isAr ? 'اتصل بنا' : 'Contact Agent'}
                </button>
                <a 
                  href={`tel:+971501234567`}
                  className="w-full py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-green-500/50 active:scale-95"
                  aria-label={isAr ? 'اتصل الآن' : 'Call now'}
                >
                  <Phone className="w-5 h-5" />
                  {isAr ? 'اتصل الآن' : 'Call Now'}
                </a>
                <a 
                  href={`https://wa.me/971501234567?text=${encodeURIComponent(`I'm interested in ${property.title}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-center flex items-center justify-center gap-2 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 active:scale-95"
                  aria-label={isAr ? 'تواصل عبر واتساب' : 'Contact via WhatsApp'}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  {isAr ? 'واتساب' : 'WhatsApp'}
                </a>
                <button
                  onClick={() => toggleSaved(property.id, { source: 'property_details' })}
                  className="w-full py-4 border-2 border-blue-600 dark:border-cyan-400 text-blue-600 dark:text-cyan-400 font-bold rounded-xl hover:bg-blue-50 dark:hover:bg-cyan-900/20 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/50 active:scale-95"
                  aria-label={isSaved(property.id) ? (isAr ? 'إزالة من المحفوظات' : 'Remove from saved') : (isAr ? 'حفظ العقار' : 'Save property')}
                >
                  {isSaved(property.id)
                    ? (isAr ? '✓ محفوظ (انقر للإزالة)' : '✓ Saved (click to remove)')
                    : (isAr ? 'احفظ العقار' : 'Save Property')}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t-2 border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-3">
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <span className="font-medium">{isAr ? 'رقم العقار' : 'Property ID'}:</span>
                    <span className="font-bold text-gray-900 dark:text-white">{property.id}</span>
                  </div>
                  <div className="flex justify-between items-center p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <span className="font-medium">{isAr ? 'النوع' : 'Type'}:</span>
                    <span className="font-bold text-gray-900 dark:text-white capitalize">{property.type}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* New Components in Sidebar */}
            <div className="space-y-6">
              <PropertyTimeline propertyId={property.id} />
              <VirtualTourScheduler propertyId={property.id} propertyTitle={property.title} />
              <CurrencyConverter />
            </div>
          </div>

        </div>

        {/* Similar Properties - AI Recommendations - Moved outside the grid */}
        {similarProperties.length > 0 && (
          <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t-2 border-gray-300 dark:border-gray-700">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-zinc-900 dark:text-white flex items-center gap-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-purple-600 dark:text-purple-400" />
              </div>
              <span>{t('aiSimilarProps')}</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {similarProperties.map((sim) => (
                <Link
                  key={sim.id}
                  to={`/properties/${sim.id}`}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border-2 border-gray-200 dark:border-gray-700 hover:border-cyan-500 dark:hover:border-cyan-400 transition-all hover:shadow-2xl dark:hover:shadow-cyan-500/30 hover:-translate-y-1"
                  onClick={() => window.scrollTo(0, 0)}
                >
                  <div className="relative h-48 md:h-52 overflow-hidden bg-gray-200 dark:bg-gray-700">
                    <img
                      src={sim.image}
                      alt={sim.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm text-white text-xs font-bold uppercase">
                      {sim.type}
                    </div>
                    <div className="absolute top-3 right-3 px-3 py-1.5 rounded-lg bg-purple-600/90 backdrop-blur-sm text-white text-xs font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> 
                      <span>{sim.ai_score}/10</span>
                    </div>
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4 md:p-5">
                    <h3 className="font-bold text-base md:text-lg text-zinc-900 dark:text-white line-clamp-2 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors mb-2 min-h-[3rem]">
                      {sim.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1.5 mb-3">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="line-clamp-1">{sim.location}</span>
                    </p>
                    <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                      <p className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400">
                        {sim.currency} {sim.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
