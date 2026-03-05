import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { propertyAPI, Property } from '../services/api';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import { MapPin, Bed, Bath, Maximize, ArrowLeft, CheckCircle, Sparkles, CreditCard } from 'lucide-react';

export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const isAr = language === 'ar';
  
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const data = await propertyAPI.getPropertyById(id);
        setProperty(data);
        setError(null);
      } catch (err) {
        setError('Property not found');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen pt-20 flex flex-col justify-center items-center">
        <p className="text-red-500 mb-4">{error || 'Property not found'}</p>
        <button
          onClick={() => navigate('/properties')}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Back to Properties
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <SEO 
        title={`${property.title} - Land AI Real Estate`}
        description={property.description}
      />
      
      <div className="container mx-auto px-4">
        {/* Back Button */}
        <button
          onClick={() => navigate('/properties')}
          className="flex items-center gap-2 text-blue-600 dark:text-cyan-400 hover:underline mb-6"
        >
          <ArrowLeft className="w-5 h-5" />
          {isAr ? 'العودة إلى العقارات' : 'Back to Properties'}
        </button>

        {/* Main Image Gallery */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
          {/* Large Main Image */}
          <div className="lg:col-span-2">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <img
                src={property.images[selectedImage]}
                alt={`${property.title} - Image ${selectedImage + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/1200x800?text=Property+Image';
                }}
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/90 dark:bg-black/80 px-4 py-2 rounded-full text-sm font-bold uppercase">
                  {property.type}
                </span>
                {property.blockchain_verified && (
                  <span className="bg-emerald-500/90 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    {isAr ? 'موثق' : 'Verified'}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Thumbnail Grid */}
          <div className="grid grid-cols-3 lg:grid-cols-2 gap-2">
            {property.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative h-32 rounded-lg overflow-hidden border-2 transition-all ${
                  selectedImage === index
                    ? 'border-blue-500 dark:border-cyan-400'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300?text=Image';
                  }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Property Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-2">
                {property.title}
              </h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400 gap-2 mb-4">
                <MapPin className="w-5 h-5" />
                <span className="text-lg">{property.location}</span>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-5 h-5 text-purple-500" />
                <span className="text-lg font-semibold">
                  {isAr ? 'تقييم الذكاء الاصطناعي' : 'AI Score'}: {property.ai_score}/10
                </span>
              </div>
            </div>

            {/* Key Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-500/30">
                <Bed className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {property.bedrooms}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {isAr ? 'غرف النوم' : 'Bedrooms'}
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-500/30">
                <Bath className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {property.bathrooms}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {isAr ? 'الحمامات' : 'Bathrooms'}
                </div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-500/30">
                <Maximize className="w-6 h-6 text-blue-600 dark:text-blue-400 mb-2" />
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {property.area}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {property.areaUnit}
                </div>
              </div>
              <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-200 dark:border-emerald-500/30">
                <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mb-2" />
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
                  {property.available ? (isAr ? 'متاح' : 'Available') : (isAr ? 'محجوز' : 'Reserved')}
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
                {isAr ? 'الوصف' : 'Description'}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {property.description}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-zinc-900 dark:text-white">
                {isAr ? 'المميزات' : 'Features'}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Price & Contact */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="mb-6">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                  {isAr ? 'السعر' : 'Price'}
                </div>
                <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 dark:from-gold-300 dark:to-yellow-500">
                  {property.currency} {property.price.toLocaleString()}
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => navigate(`/properties/${id}/payment`)}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2"
                >
                  <CreditCard className="w-5 h-5" />
                  {isAr ? 'خطط الدفع' : 'View Payment Plans'}
                </button>
                <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors">
                  {isAr ? 'اتصل بنا' : 'Contact Agent'}
                </button>
                <button className="w-full py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold rounded-xl transition-colors">
                  {isAr ? 'جدولة معاينة' : 'Schedule Viewing'}
                </button>
                <button className="w-full py-4 border-2 border-blue-600 dark:border-cyan-400 text-blue-600 dark:text-cyan-400 font-bold rounded-xl hover:bg-blue-50 dark:hover:bg-cyan-900/20 transition-colors">
                  {isAr ? 'احفظ العقار' : 'Save Property'}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                  <div className="flex justify-between">
                    <span>{isAr ? 'رقم العقار' : 'Property ID'}:</span>
                    <span className="font-semibold">{property.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{isAr ? 'النوع' : 'Type'}:</span>
                    <span className="font-semibold capitalize">{property.type}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
