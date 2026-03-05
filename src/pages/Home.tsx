import Hero from '../components/Hero';
import Services from '../components/Services';
import Properties from '../components/Properties';
import Investors from '../components/Investors';
import Leadership from '../components/Leadership';
import Contact from '../components/Contact';
import MarketTicker from '../components/MarketTicker';
import Partners from '../components/Partners';
import Heatmap from '../components/Heatmap';
import PredictiveAnalytics from '../components/PredictiveAnalytics';
import FractionalOwnership from '../components/FractionalOwnership';
import HolographicFloorplan from '../components/HolographicFloorplan';
import SmartCityMatrix from '../components/SmartCityMatrix';
import NeuralArchitect from '../components/NeuralArchitect';
import OrbitalScanner from '../components/OrbitalScanner';
import AITimeTravel from '../components/AITimeTravel';
import BiometricApproval from '../components/BiometricApproval';
import MetaverseTour from '../components/MetaverseTour';
import DroneScanner from '../components/DroneScanner';
import ARPortal from '../components/ARPortal';
import Ledger from '../components/Ledger';
import SEO from '../components/SEO';

export default function Home() {
  return (
    <>
      <SEO 
        title="Land AI Real Estate - Find Your Dream Luxury Home in UAE"
        description="Discover premium properties in Dubai & Abu Dhabi with AI-powered search, blockchain verification, holographic tours, and cutting-edge spatial technology."
      />
      
      {/* Hero with background image */}
      <div className="relative">
        {/* Background image for light mode only - Hero section only */}
        <div className="absolute inset-0 z-0 dark:hidden overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2560&auto=format&fit=crop" 
            alt="Dubai Skyline Background" 
            className="absolute inset-0 w-full h-full object-cover animate-slow-zoom"
          />
          {/* White overlay to make content readable - very prominent */}
          <div className="absolute inset-0 bg-white/35"></div>
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10">
          <Hero />
        </div>
      </div>
      
      {/* Other sections without background */}
      <MarketTicker />
      <Partners />
      <Services />
      <Properties />
      <PredictiveAnalytics />
      <Investors />
      <Contact />
    </>
  );
}
