import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import SkipToContent from './components/SkipToContent';
import ScrollToTop from './components/ScrollToTop';

// Lazy load pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const PropertiesPage = lazy(() => import('./pages/PropertiesPage'));
const PropertyDetailsPage = lazy(() => import('./pages/PropertyDetailsPage'));
const PaymentPage = lazy(() => import('./pages/PaymentPage'));
const PaymentGatewayPage = lazy(() => import('./pages/PaymentGatewayPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const InvestorsPage = lazy(() => import('./pages/InvestorsPage'));
const BlogPage = lazy(() => import('./pages/BlogPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const CareersPage = lazy(() => import('./pages/CareersPage'));
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'));
const TestimonialsPage = lazy(() => import('./pages/TestimonialsPage'));
const PartnersPage = lazy(() => import('./pages/PartnersPage'));
const LocationsPage = lazy(() => import('./pages/LocationsPage'));
const CalculatorsPage = lazy(() => import('./pages/CalculatorsPage'));

// Services Pages
const PremiumServicesPage = lazy(() => import('./pages/services/PremiumServicesPage'));
const QuantumSpacePage = lazy(() => import('./pages/services/QuantumSpacePage'));
const SatelliteAcquisitionPage = lazy(() => import('./pages/services/SatelliteAcquisitionPage'));

// Technology Pages
const HolographicFloorplanPage = lazy(() => import('./pages/technology/HolographicFloorplanPage'));
const PropertyFuturePage = lazy(() => import('./pages/technology/PropertyFuturePage'));

// Analytics Pages
const HeatmapPage = lazy(() => import('./pages/analytics/HeatmapPage'));
const SmartCityPage = lazy(() => import('./pages/analytics/SmartCityPage'));
const PricePredictionsPage = lazy(() => import('./pages/analytics/PricePredictionsPage'));

// Virtual Pages
const QuantumRealityPage = lazy(() => import('./pages/virtual/QuantumRealityPage'));
const MetaverseTourPage = lazy(() => import('./pages/virtual/MetaverseTourPage'));

// Investment Pages
const FractionalRealEstatePage = lazy(() => import('./pages/investment/FractionalRealEstatePage'));
const WealthGrowthPage = lazy(() => import('./pages/investment/WealthGrowthPage'));

// Features Pages
const DroneValuationPage = lazy(() => import('./pages/features/DroneValuationPage'));
const SmartContractsPage = lazy(() => import('./pages/features/SmartContractsPage'));
const BiometricPage = lazy(() => import('./pages/features/BiometricPage'));

// Company Pages
const LeadershipPage = lazy(() => import('./pages/company/LeadershipPage'));
const BuildFuturePage = lazy(() => import('./pages/company/BuildFuturePage'));

// Loading component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 dark:border-cyan-500"></div>
        <p className="mt-4 text-lg font-semibold text-slate-600 dark:text-slate-400">Loading...</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen relative bg-white dark:bg-[#030014] text-slate-900 dark:text-white selection:bg-blue-500/30 dark:selection:bg-cyan-500/30 overflow-x-hidden transition-colors duration-500">
        <SkipToContent />
        <Navbar />
        <main id="main-content">
          <Suspense fallback={<PageLoader />}>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<PropertiesPage />} />
            <Route path="/properties/:id" element={<PropertyDetailsPage />} />
            <Route path="/properties/:id/payment" element={<PaymentPage />} />
            <Route path="/properties/:id/payment/gateway" element={<PaymentGatewayPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/investors" element={<InvestorsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/privacy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/careers" element={<CareersPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/testimonials" element={<TestimonialsPage />} />
            <Route path="/partners" element={<PartnersPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/calculators" element={<CalculatorsPage />} />
            
            {/* Services Routes */}
            <Route path="/services/premium" element={<PremiumServicesPage />} />
            <Route path="/services/quantum-space" element={<QuantumSpacePage />} />
            <Route path="/services/satellite-acquisition" element={<SatelliteAcquisitionPage />} />
            
            {/* Technology Routes */}
            <Route path="/technology/quantum-generator" element={<HolographicFloorplanPage />} />
            <Route path="/technology/property-future" element={<PropertyFuturePage />} />
            
            {/* Analytics Routes */}
            <Route path="/analytics/heatmap" element={<HeatmapPage />} />
            <Route path="/analytics/smart-city" element={<SmartCityPage />} />
            <Route path="/analytics/price-predictions" element={<PricePredictionsPage />} />
            
            {/* Virtual Routes */}
            <Route path="/virtual/quantum-reality" element={<QuantumRealityPage />} />
            <Route path="/virtual/metaverse-tour" element={<MetaverseTourPage />} />
            
            {/* Investment Routes */}
            <Route path="/investment/fractional" element={<FractionalRealEstatePage />} />
            <Route path="/investment/wealth-growth" element={<WealthGrowthPage />} />
            
            {/* Features Routes */}
            <Route path="/features/drone-valuation" element={<DroneValuationPage />} />
            <Route path="/features/smart-contracts" element={<SmartContractsPage />} />
            <Route path="/features/biometric" element={<BiometricPage />} />
            
            {/* Company Routes */}
            <Route path="/company/leadership" element={<LeadershipPage />} />
            <Route path="/company/build-future" element={<BuildFuturePage />} />
          </Routes>
        </Suspense>
        </main>
        <Footer />
        <AIChat />
        <SpeedInsights />
      </div>
    </Router>
  );
}

export default App;
