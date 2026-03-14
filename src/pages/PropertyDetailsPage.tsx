import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProperty } from '../hooks/useProperty';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import {
  MapPin,
  Bed,
  Bath,
  Maximize,
  ArrowLeft,
  CheckCircle,
  Sparkles,
  CreditCard,
  TrendingUp,
  Phone,
  ChevronLeft,
  ChevronRight,
  X,
  Heart,
  Star,
  Building2,
  Home,
  Shield,
  Award,
  Zap,
  ChevronDown,
  SlidersHorizontal,
  BarChart3,
  Layers3,
} from 'lucide-react';
import { getSimilarProperties, getPriceInsight } from '../services/aiService';
import type { Property } from '../services/api';
import { useUserData } from '../context/UserDataContext';
import PropertyTimeline from '../components/PropertyTimeline';
import VirtualTourScheduler from '../components/VirtualTourScheduler';
import ShareProperty from '../components/ShareProperty';
import CurrencyConverter from '../components/CurrencyConverter';
import MortgageCalculator from '../components/MortgageCalculator';
import PropertyComparisonWidget from '../components/PropertyComparisonWidget';
import Tour360Viewer from '../components/Tour360Viewer';
import ARViewer from '../components/ARViewer';
import AIRecommendationEngine from '../components/AIRecommendationEngine';
import Interactive3DFloorPlan from '../components/Interactive3DFloorPlan';
import InvestmentAnalyticsDashboard from '../components/InvestmentAnalyticsDashboard';
import SmartHomePreview from '../components/SmartHomePreview';
import NeighborhoodIntelligence from '../components/NeighborhoodIntelligence';
import { motion, AnimatePresence } from 'framer-motion';

type PriceInsightState = {
  prediction: string;
  confidence: number;
  trend: string;
} | null;

type AdvancedToolKey =
  | 'mortgage'
  | 'investment'
  | 'compare'
  | 'recommendations'
  | 'floorplan'
  | 'smarthome'
  | 'neighborhood'
  | 'timeline'
  | 'tour'
  | 'currency';

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const glassCard =
  'rounded-[28px] border border-white/60 bg-white/85 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/70 dark:shadow-[0_25px_80px_rgba(0,0,0,0.35)]';

function StatCard({
  icon,
  value,
  label,
  accent,
}: {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  accent: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.015 }}
      className={`group relative overflow-hidden rounded-[24px] border p-5 md:p-6 shadow-xl ${accent}`}
    >
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-white/20 blur-xl transition-transform duration-500 group-hover:scale-150 dark:bg-white/10" />
      <div className="relative z-10">{icon}</div>
      <div className="relative z-10 mt-4 text-3xl md:text-4xl font-black tracking-tight">
        {value}
      </div>
      <div className="relative z-10 mt-2 text-xs md:text-sm font-bold uppercase tracking-[0.18em] opacity-80">
        {label}
      </div>
    </motion.div>
  );
}

export default function PropertyDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { language, t } = useLanguage();
  const isAr = language === 'ar';
  const { property, loading, error } = useProperty(id);
  const { isSaved, toggleSaved, markViewed } = useUserData();

  const [selectedImage, setSelectedImage] = useState(0);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [priceInsight, setPriceInsight] = useState<PriceInsightState>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [showAdvancedTools, setShowAdvancedTools] = useState(false);
  const [activeTool, setActiveTool] = useState<AdvancedToolKey>('mortgage');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!property) return;

    markViewed(property.id, { source: 'property_details' });
    getSimilarProperties(property, 4).then(setSimilarProperties);
    getPriceInsight(property).then((insight) => {
      setPriceInsight({
        prediction: insight.prediction,
        confidence: insight.confidence,
        trend: insight.trend,
      });
    });
  }, [property, markViewed]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isGalleryOpen || !property) return;

      if (e.key === 'ArrowRight') {
        setImageLoading(true);
        setSelectedImage((prev) => (prev + 1) % property.images.length);
      }

      if (e.key === 'ArrowLeft') {
        setImageLoading(true);
        setSelectedImage((prev) => (prev - 1 + property.images.length) % property.images.length);
      }

      if (e.key === 'Escape') {
        setIsGalleryOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isGalleryOpen, property]);

  const nextImage = () => {
    if (!property) return;
    setImageLoading(true);
    setSelectedImage((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    if (!property) return;
    setImageLoading(true);
    setSelectedImage((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  const saved = property ? isSaved(property.id) : false;

  const propertyImages = useMemo(() => {
    if (!property?.images?.length) {
      return ['https://via.placeholder.com/1200x800?text=Property+Image'];
    }
    return property.images;
  }, [property]);

  const premiumFeatures = useMemo(
    () =>
      Array.from(
        new Set([
          ...(property?.features || []),
          'Sea View',
          'High Floor',
          'Beach Access',
          'Island Living',
          'Pool',
          'Gym',
          'Retail',
          'Restaurants',
          'Parking',
          'Security',
        ])
      ),
    [property]
  );

  const toolTabs: { key: AdvancedToolKey; label: string }[] = [
    { key: 'mortgage', label: isAr ? 'التمويل' : 'Mortgage' },
    { key: 'investment', label: isAr ? 'الاستثمار' : 'Investment' },
    { key: 'compare', label: isAr ? 'المقارنة' : 'Compare' },
    { key: 'recommendations', label: isAr ? 'الذكاء الاصطناعي' : 'AI' },
    { key: 'floorplan', label: isAr ? 'المخطط' : '3D Plan' },
    { key: 'smarthome', label: isAr ? 'المنزل الذكي' : 'Smart Home' },
    { key: 'neighborhood', label: isAr ? 'الحي' : 'Neighborhood' },
    { key: 'timeline', label: isAr ? 'الجدول الزمني' : 'Timeline' },
    { key: 'tour', label: isAr ? 'الحجز' : 'Tour' },
    { key: 'currency', label: isAr ? 'العملات' : 'Currency' },
  ];

  const renderAdvancedTool = () => {
    if (!property) return null;

    switch (activeTool) {
      case 'mortgage':
        return <MortgageCalculator propertyPrice={property.price} currency={property.currency} />;
      case 'investment':
        return (
          <InvestmentAnalyticsDashboard
            propertyPrice={property.price}
            propertyLocation={property.location}
          />
        );
      case 'compare':
        return <PropertyComparisonWidget currentProperty={property} />;
      case 'recommendations':
        return <AIRecommendationEngine currentProperty={property} />;
      case 'floorplan':
        return <Interactive3DFloorPlan propertyId={property.id} propertyTitle={property.title} />;
      case 'smarthome':
        return <SmartHomePreview />;
      case 'neighborhood':
        return <NeighborhoodIntelligence location={property.location} />;
      case 'timeline':
        return <PropertyTimeline propertyId={property.id} />;
      case 'tour':
        return <VirtualTourScheduler propertyId={property.id} propertyTitle={property.title} />;
      case 'currency':
        return <CurrencyConverter />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 pt-36 dark:bg-slate-950">
        <div className="flex min-h-[60vh] items-center justify-center px-4">
          <div className="text-center">
            <div className="mx-auto mb-5 h-16 w-16 animate-spin rounded-full border-4 border-indigo-600 border-t-transparent dark:border-fuchsia-400 dark:border-t-transparent" />
            <p className="text-base font-semibold text-slate-600 dark:text-slate-400">
              {isAr ? 'جاري تحميل العقار...' : 'Loading property...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-slate-50 pt-36 dark:bg-slate-950">
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
          <p className="mb-6 text-lg font-bold text-rose-500 dark:text-rose-400">
            {error || (isAr ? 'العقار غير موجود' : 'Property not found')}
          </p>
          <button
            onClick={() => navigate('/properties')}
            className="rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-4 font-bold text-white shadow-xl transition hover:translate-y-[-2px] hover:shadow-2xl dark:from-fuchsia-600 dark:to-violet-600"
          >
            {t('backToProperties')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-x-hidden bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.12),transparent_25%),radial-gradient(circle_at_top_right,rgba(236,72,153,0.09),transparent_22%),linear-gradient(to_bottom_right,#f8fafc,#eef2ff,#f8fafc)] dark:bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.16),transparent_22%),radial-gradient(circle_at_top_right,rgba(217,70,239,0.12),transparent_18%),linear-gradient(to_bottom_right,#020617,#0f172a,#020617)]">
      <SEO title={`${property.title} - Land AI Real Estate`} description={property.description} />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-120px] top-[140px] h-72 w-72 rounded-full bg-indigo-400/10 blur-3xl dark:bg-fuchsia-500/10" />
        <div className="absolute right-[-100px] top-[320px] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl dark:bg-violet-500/10" />
      </div>

      <div className="h-32 md:h-36" />

      <div className="relative container mx-auto px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.45 }}
          className="mt-3 mb-7 md:mt-5 md:mb-10"
        >
          <div className="flex flex-wrap items-center gap-3 md:gap-4">
            <button
              onClick={() => navigate(-1)}
              className="group inline-flex items-center gap-2 rounded-2xl border border-slate-200/80 bg-white/90 px-5 py-3 text-sm font-bold text-slate-700 shadow-lg backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-indigo-400 hover:text-indigo-600 hover:shadow-xl dark:border-slate-700/70 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-fuchsia-500 dark:hover:text-fuchsia-400"
              aria-label={isAr ? 'العودة للصفحة السابقة' : 'Go back'}
            >
              <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
              <span>{isAr ? 'رجوع' : 'Back'}</span>
            </button>

            <div className="hidden min-w-0 items-center gap-2 md:flex">
              <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-sm font-semibold text-slate-600 dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-400">
                {property.type}
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400 dark:text-slate-600" />
              <span className="truncate text-sm font-bold text-indigo-600 dark:text-fuchsia-400">
                {property.title}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.section
          {...fadeUp}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="mb-10 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6"
        >
          <div className="lg:col-span-2">
            <div className="group relative h-[420px] overflow-hidden rounded-[32px] border border-white/50 bg-slate-200 shadow-[0_30px_80px_rgba(15,23,42,0.18)] dark:border-white/10 dark:bg-slate-900 md:h-[560px] lg:h-[680px]">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0.35, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={propertyImages[selectedImage]}
                alt={`${property.title} - ${selectedImage + 1}`}
                className="h-full w-full object-cover"
                loading={selectedImage === 0 ? 'eager' : 'lazy'}
                fetchPriority={selectedImage === 0 ? 'high' : undefined}
                onLoad={() => setImageLoading(false)}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/1200x800?text=Property+Image';
                  setImageLoading(false);
                }}
              />

              {imageLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-200/90 backdrop-blur-md dark:bg-slate-900/85">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent dark:border-fuchsia-400 dark:border-t-transparent" />
                </div>
              )}

              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/8 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-transparent" />

              <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2 md:left-6 md:top-6 md:gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/92 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-slate-900 shadow-xl dark:bg-black/85 dark:text-white">
                  <Building2 className="h-4 w-4" />
                  {property.type}
                </span>

                {property.blockchain_verified && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white shadow-xl">
                    <Shield className="h-4 w-4" />
                    {isAr ? 'موثق' : 'Verified'}
                  </span>
                )}

                {property.available && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white shadow-xl dark:from-fuchsia-600 dark:to-violet-600">
                    <Zap className="h-4 w-4" />
                    {isAr ? 'متاح الآن' : 'Available Now'}
                  </span>
                )}
              </div>

              <div className="absolute right-4 top-4 z-10 md:right-6 md:top-6">
                <div className="rounded-full border border-white/15 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-pink-600 px-4 py-2.5 text-white shadow-2xl">
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="text-xs font-black uppercase tracking-[0.18em] md:text-sm">
                      AI Score
                    </span>
                    <span className="text-base font-black md:text-lg">{property.ai_score}/10</span>
                  </div>
                </div>
              </div>

              <button
                onClick={prevImage}
                className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-white/85 p-3 text-slate-900 shadow-xl backdrop-blur-md transition hover:scale-110 hover:bg-white focus:opacity-100 dark:bg-black/70 dark:text-white dark:hover:bg-black md:left-5 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/25 bg-white/85 p-3 text-slate-900 shadow-xl backdrop-blur-md transition hover:scale-110 hover:bg-white focus:opacity-100 dark:bg-black/70 dark:text-white dark:hover:bg-black md:right-5 opacity-100 md:opacity-0 md:group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center justify-between md:bottom-6 md:left-6 md:right-6">
                <button
                  onClick={() => setIsGalleryOpen(true)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/65 px-4 py-2.5 text-xs font-bold text-white shadow-xl backdrop-blur-md transition hover:bg-black/80 md:text-sm dark:bg-white/15 dark:hover:bg-white/20"
                >
                  <Maximize className="h-4 w-4" />
                  {isAr ? 'عرض كامل' : 'Open Gallery'}
                </button>

                <div className="rounded-full border border-white/15 bg-black/65 px-4 py-2.5 text-xs font-black text-white shadow-xl backdrop-blur-md md:text-sm dark:bg-white/15">
                  {selectedImage + 1} / {propertyImages.length}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 lg:grid-cols-2">
            {propertyImages.slice(0, 6).map((img, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                onClick={() => {
                  setImageLoading(true);
                  setSelectedImage(index);
                }}
                className={`group relative h-24 overflow-hidden rounded-2xl border-2 shadow-lg transition md:h-32 lg:h-[162px] ${
                  selectedImage === index
                    ? 'border-indigo-600 ring-4 ring-indigo-500/20 dark:border-fuchsia-400 dark:ring-fuchsia-500/20'
                    : 'border-slate-200 hover:scale-[1.02] hover:border-indigo-400 dark:border-slate-700 dark:hover:border-fuchsia-500'
                }`}
                aria-label={`Open image ${index + 1}`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x300?text=Image';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                {selectedImage === index && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-indigo-600/30 to-fuchsia-600/30">
                    <div className="rounded-full bg-white p-2 shadow-xl dark:bg-slate-950">
                      <CheckCircle className="h-5 w-5 text-indigo-600 dark:text-fuchsia-400" />
                    </div>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.section>

        <AnimatePresence>
          {isGalleryOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl"
              onClick={() => setIsGalleryOpen(false)}
            >
              <button
                onClick={() => setIsGalleryOpen(false)}
                className="absolute right-4 top-4 z-50 rounded-full bg-white/10 p-3 text-white transition hover:rotate-90 hover:bg-white/20 md:right-6 md:top-6"
                aria-label="Close gallery"
              >
                <X className="h-7 w-7" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:scale-110 hover:bg-white/20 md:left-8"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-7 w-7" />
              </button>

              <motion.div
                key={selectedImage}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className="relative mx-4 max-h-[88vh] max-w-7xl"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={propertyImages[selectedImage]}
                  alt={`${property.title} - ${selectedImage + 1}`}
                  className="max-h-[88vh] w-full rounded-[28px] object-contain shadow-2xl"
                />
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-5 py-2.5 text-sm font-black text-white backdrop-blur-md">
                  {selectedImage + 1} / {propertyImages.length}
                </div>
              </motion.div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:scale-110 hover:bg-white/20 md:right-8"
                aria-label="Next image"
              >
                <ChevronRight className="h-7 w-7" />
              </button>

              <div className="absolute bottom-5 left-0 right-0 mx-auto flex max-w-4xl items-center justify-center gap-2 overflow-x-auto px-4 md:bottom-8">
                {propertyImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      setImageLoading(true);
                      setSelectedImage(index);
                    }}
                    className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-xl border-2 transition md:h-20 md:w-20 ${
                      selectedImage === index
                        ? 'scale-105 border-white'
                        : 'border-white/25 opacity-60 hover:border-white/60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-7 lg:grid-cols-3 lg:gap-8">
          <div className="space-y-7 lg:col-span-2">
            <motion.section
              {...fadeUp}
              transition={{ duration: 0.45, delay: 0.08 }}
              className={`${glassCard} p-6 md:p-10`}
            >
              <div className="mb-7 flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <h1 className="text-3xl font-black leading-tight tracking-tight text-slate-900 dark:text-white md:text-4xl lg:text-5xl">
                    {property.title}
                  </h1>

                  <div className="mt-4 flex items-center gap-2 text-slate-600 dark:text-slate-400">
                    <MapPin className="h-5 w-5 flex-shrink-0 text-indigo-600 dark:text-fuchsia-400" />
                    <span className="text-base font-semibold md:text-xl">{property.location}</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleSaved(property.id, { source: 'property_details' })}
                  className={`rounded-2xl p-3.5 shadow-lg transition hover:scale-110 active:scale-95 ${
                    saved
                      ? 'bg-gradient-to-br from-rose-500 to-pink-600 text-white'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
                  }`}
                  aria-label={saved ? 'Remove from favorites' : 'Add to favorites'}
                >
                  <Heart className={`h-5 w-5 md:h-6 md:w-6 ${saved ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="flex flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-2xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-bold text-violet-700 shadow-sm dark:border-fuchsia-500/30 dark:bg-fuchsia-500/10 dark:text-fuchsia-300 md:text-base">
                  <Sparkles className="h-5 w-5" />
                  <span>
                    {isAr ? 'تقييم الذكاء الاصطناعي' : 'AI Score'}: {property.ai_score}/10
                  </span>
                </div>

                {property.blockchain_verified && (
                  <div className="inline-flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 shadow-sm dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300 md:text-base">
                    <Shield className="h-5 w-5" />
                    <span>{isAr ? 'موثق عبر البلوكتشين' : 'Blockchain Verified'}</span>
                  </div>
                )}
              </div>
            </motion.section>

            <motion.section
              {...fadeUp}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="grid grid-cols-2 gap-4 md:grid-cols-4"
            >
              <StatCard
                icon={<Bed className="h-8 w-8 text-indigo-600 dark:text-fuchsia-400" />}
                value={property.bedrooms}
                label={isAr ? 'غرف النوم' : 'Bedrooms'}
                accent="border-indigo-200 bg-gradient-to-br from-indigo-50 to-violet-50 text-indigo-700 dark:border-fuchsia-500/25 dark:bg-gradient-to-br dark:from-fuchsia-500/10 dark:to-violet-500/10 dark:text-fuchsia-300"
              />
              <StatCard
                icon={<Bath className="h-8 w-8 text-cyan-600 dark:text-cyan-400" />}
                value={property.bathrooms}
                label={isAr ? 'الحمامات' : 'Bathrooms'}
                accent="border-cyan-200 bg-gradient-to-br from-cyan-50 to-sky-50 text-cyan-700 dark:border-cyan-500/25 dark:bg-gradient-to-br dark:from-cyan-500/10 dark:to-sky-500/10 dark:text-cyan-300"
              />
              <StatCard
                icon={<Maximize className="h-8 w-8 text-violet-600 dark:text-violet-400" />}
                value={property.area}
                label={property.areaUnit}
                accent="border-violet-200 bg-gradient-to-br from-violet-50 to-pink-50 text-violet-700 dark:border-violet-500/25 dark:bg-gradient-to-br dark:from-violet-500/10 dark:to-pink-500/10 dark:text-violet-300"
              />
              <StatCard
                icon={<CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />}
                value={property.available ? (isAr ? 'متاح' : 'Available') : isAr ? 'محجوز' : 'Reserved'}
                label={isAr ? 'الحالة' : 'Status'}
                accent="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50 text-emerald-700 dark:border-emerald-500/25 dark:bg-gradient-to-br dark:from-emerald-500/10 dark:to-green-500/10 dark:text-emerald-300"
              />
            </motion.section>

            <motion.section
              {...fadeUp}
              transition={{ duration: 0.45, delay: 0.16 }}
              className={`${glassCard} p-6 md:p-10`}
            >
              <div className="mb-6 flex items-center gap-3">
                <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-3 text-white shadow-lg dark:from-fuchsia-600 dark:to-violet-600">
                  <Home className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl">
                  {isAr ? 'الوصف' : 'Description'}
                </h2>
              </div>

              <p className="text-base leading-8 text-slate-700 dark:text-slate-300 md:text-lg">
                {property.description}
              </p>
            </motion.section>

            <motion.section
              {...fadeUp}
              transition={{ duration: 0.45, delay: 0.2 }}
              className={`${glassCard} p-6 md:p-10`}
            >
              <div className="mb-6 flex items-center gap-3 md:mb-8">
                <div className="rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 p-3 text-white shadow-lg">
                  <Star className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl">
                  {isAr ? 'المميزات' : 'Premium Features'}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 md:gap-4">
                {premiumFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.22 + index * 0.035 }}
                    whileHover={{ x: 3 }}
                    className="group flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/90 p-4 shadow-sm transition hover:border-emerald-400 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800/60 dark:hover:border-emerald-500"
                  >
                    <div className="rounded-xl bg-emerald-100 p-2 transition group-hover:bg-emerald-500 dark:bg-emerald-500/10">
                      <CheckCircle className="h-4 w-4 text-emerald-600 transition group-hover:text-white dark:text-emerald-400" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 md:text-base">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </div>

          <div className="space-y-6 lg:col-span-1">
            <motion.aside
              {...fadeUp}
              transition={{ duration: 0.45, delay: 0.12 }}
              className="lg:sticky lg:top-32"
            >
              <div className={`${glassCard} border-slate-200/70 p-6 md:p-8 dark:border-slate-700/60`}>
                <div className="mb-6">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <span className="text-xs font-black uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
                      {isAr ? 'السعر' : 'Price'}
                    </span>
                    <ShareProperty propertyId={property.id} propertyTitle={property.title} />
                  </div>

                  <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-500 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl">
                    {property.currency} {property.price.toLocaleString()}
                  </div>

                  {priceInsight && (
                    <div className="mt-5 rounded-2xl border border-cyan-200 bg-cyan-50/90 p-4 shadow-sm dark:border-cyan-500/30 dark:bg-cyan-500/10">
                      <div className="mb-2 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-cyan-700 dark:text-cyan-300">
                        <TrendingUp className="h-4 w-4" />
                        {t('aiPriceInsight')}
                      </div>
                      <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                        {priceInsight.prediction}
                      </p>
                      <p className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                        {priceInsight.confidence}% confidence
                      </p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <Tour360Viewer
                      propertyTitle={property.title}
                      tourUrl={property.tour360Url}
                    />
                    <ARViewer
                      propertyTitle={property.title}
                      modelUrl={property.arModelUrl}
                      usdzUrl={property.usdzUrl}
                    />
                  </div>

                  <button
                    onClick={() => navigate(`/properties/${id}/payment`)}
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-4 text-sm font-black text-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl dark:from-fuchsia-600 dark:to-violet-600 md:text-base"
                  >
                    <CreditCard className="h-5 w-5" />
                    {isAr ? 'خطط الدفع' : 'View Payment Plans'}
                  </button>

                  <button
                    onClick={() => navigate('/contact')}
                    className="w-full rounded-2xl bg-slate-900 px-5 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:text-slate-950 md:text-base"
                  >
                    {isAr ? 'اتصل بالوكيل' : 'Contact Agent'}
                  </button>

                  <a
                    href="tel:+971501234567"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-green-700 hover:shadow-xl md:text-base"
                  >
                    <Phone className="h-5 w-5" />
                    {isAr ? 'اتصل الآن' : 'Call Now'}
                  </a>

                  <a
                    href={`https://wa.me/971501234567?text=${encodeURIComponent(`I'm interested in ${property.title}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-5 py-4 text-sm font-black text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-700 hover:shadow-xl md:text-base"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    {isAr ? 'واتساب' : 'WhatsApp'}
                  </a>

                  <button
                    onClick={() => toggleSaved(property.id, { source: 'property_details' })}
                    className="w-full rounded-2xl border-2 border-indigo-600 px-5 py-4 text-sm font-black text-indigo-600 shadow-sm transition hover:bg-indigo-50 hover:shadow-lg dark:border-fuchsia-400 dark:text-fuchsia-400 dark:hover:bg-fuchsia-500/10 md:text-base"
                  >
                    {saved
                      ? isAr
                        ? '✓ محفوظ (اضغط للإزالة)'
                        : '✓ Saved (click to remove)'
                      : isAr
                      ? 'احفظ العقار'
                      : 'Save Property'}
                  </button>
                </div>

                <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
                  <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <div className="flex items-center justify-between rounded-xl p-3 transition hover:bg-slate-50 dark:hover:bg-slate-800/70">
                      <span className="font-semibold">{isAr ? 'رقم العقار' : 'Property ID'}:</span>
                      <span className="font-black text-slate-900 dark:text-white">{property.id}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl p-3 transition hover:bg-slate-50 dark:hover:bg-slate-800/70">
                      <span className="font-semibold">{isAr ? 'النوع' : 'Type'}:</span>
                      <span className="font-black capitalize text-slate-900 dark:text-white">
                        {property.type}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>

        <motion.section
          {...fadeUp}
          transition={{ duration: 0.45, delay: 0.22 }}
          className={`${glassCard} mt-10 p-5 md:p-8`}
        >
          <button
            onClick={() => setShowAdvancedTools((prev) => !prev)}
            className="flex w-full items-center justify-between gap-4 text-left"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 p-3 text-white shadow-lg dark:from-fuchsia-600 dark:to-violet-600">
                <SlidersHorizontal className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl">
                  {isAr ? 'الأدوات والتحليلات المتقدمة' : 'Advanced Tools & Insights'}
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                  {isAr
                    ? 'تم تجميع الأدوات الثانوية هنا لتقليل طول الصفحة'
                    : 'Secondary tools are grouped here to keep the page shorter and cleaner'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-bold text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <span>{showAdvancedTools ? (isAr ? 'إخفاء' : 'Hide') : isAr ? 'إظهار' : 'Show'}</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${showAdvancedTools ? 'rotate-180' : ''}`}
              />
            </div>
          </button>

          <AnimatePresence initial={false}>
            {showAdvancedTools && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="mb-6 flex items-center gap-3">
                  <BarChart3 className="h-5 w-5 text-indigo-600 dark:text-fuchsia-400" />
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                    {isAr
                      ? 'يظهر قسم واحد فقط في كل مرة لتبقى الصفحة مريحة وسريعة'
                      : 'Only one tool is shown at a time to keep the page focused and lightweight'}
                  </p>
                </div>

                <div className="mb-6 flex flex-wrap gap-2">
                  {toolTabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTool(tab.key)}
                      className={`rounded-full px-4 py-2.5 text-sm font-bold transition ${
                        activeTool === tab.key
                          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg dark:from-fuchsia-600 dark:to-violet-600'
                          : 'border border-slate-200 bg-white text-slate-700 hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:border-fuchsia-500 dark:hover:text-fuchsia-400'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div className="rounded-[24px] border border-slate-200/70 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-950/40 md:p-6">
                  <div className="mb-4 flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Layers3 className="h-5 w-5 text-indigo-600 dark:text-fuchsia-400" />
                    <span className="font-bold">
                      {toolTabs.find((t) => t.key === activeTool)?.label}
                    </span>
                  </div>
                  {renderAdvancedTool()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {similarProperties.length > 0 && (
          <motion.section
            {...fadeUp}
            transition={{ duration: 0.45, delay: 0.24 }}
            className="mt-14 border-t border-slate-200/80 pt-10 dark:border-slate-800 md:mt-16 md:pt-12"
          >
            <div className="mb-7 flex items-center gap-3 md:mb-8">
              <div className="rounded-2xl bg-violet-100 p-3 text-violet-700 dark:bg-fuchsia-500/10 dark:text-fuchsia-400">
                <Sparkles className="h-6 w-6" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white md:text-3xl">
                {t('aiSimilarProps')}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {similarProperties.map((sim) => (
                <Link
                  key={sim.id}
                  to={`/properties/${sim.id}`}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white/90 shadow-lg transition hover:-translate-y-1.5 hover:border-indigo-400 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900/75 dark:hover:border-fuchsia-500"
                >
                  <div className="relative h-52 overflow-hidden bg-slate-200 dark:bg-slate-800">
                    <img
                      src={sim.image}
                      alt={sim.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                      loading="lazy"
                    />

                    <div className="absolute left-3 top-3 rounded-xl bg-black/70 px-3 py-1.5 text-xs font-black uppercase tracking-[0.15em] text-white backdrop-blur-sm">
                      {sim.type}
                    </div>

                    <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-xl bg-violet-600/90 px-3 py-1.5 text-xs font-black text-white backdrop-blur-sm dark:bg-fuchsia-600/90">
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>{sim.ai_score}/10</span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                  </div>

                  <div className="p-5">
                    <h3 className="min-h-[3rem] text-base font-black leading-snug text-slate-900 transition group-hover:text-indigo-600 dark:text-white dark:group-hover:text-fuchsia-400 md:text-lg">
                      {sim.title}
                    </h3>

                    <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      <span className="line-clamp-1">{sim.location}</span>
                    </p>

                    <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
                      <p className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-xl font-black text-transparent dark:from-fuchsia-400 dark:to-violet-400">
                        {sim.currency} {sim.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}