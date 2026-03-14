import Hero from '../components/Hero';
import Services from '../components/Services';
import Properties from '../components/Properties';
import Investors from '../components/Investors';
import Contact from '../components/Contact';
import Partners from '../components/Partners';
import PredictiveAnalytics from '../components/PredictiveAnalytics';
import FractionalOwnership from '../components/FractionalOwnership';
import SEO from '../components/SEO';
import RecentlyViewed from '../components/RecentlyViewed';
import QuickStats from '../components/QuickStats';
import { Testimonials } from '../components/Testimonials';
import BlueberryFeatures from '../components/BlueberryFeatures';
import BlueberryStats from '../components/BlueberryStats';
import BlueberryCTA from '../components/BlueberryCTA';

export default function Home() {
  return (
    <>
      <SEO 
        title="Land AI Real Estate - Premium Properties in Dubai & Abu Dhabi"
        description="Discover luxury properties in Dubai & Abu Dhabi with AI-powered search, blockchain verification, and smart contracts. Your trusted partner in UAE real estate."
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
      
      {/* Blueberry Features Section */}
      <BlueberryFeatures />
      
      {/* Quick Stats - Key metrics showcase */}
      <section className="py-20 md:py-32 px-4 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-purple-800/30 relative overflow-hidden">
        {/* Architectural Background Elements - Dark Mode Only */}
        <div className="absolute inset-0 hidden dark:block opacity-10 pointer-events-none">
          <div className="architectural-float absolute top-20 left-10 w-64 h-64 border border-purple-500/20 rounded-lg"></div>
          <div className="architectural-float absolute bottom-20 right-20 w-48 h-48 border border-purple-400/20" style={{ animationDelay: '2s' }}></div>
          <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="0" y1="50%" x2="100%" y2="50%" stroke="rgb(168 85 247 / 0.1)" strokeWidth="1" strokeDasharray="10,10" className="skyline-drift" />
          </svg>
        </div>
        <div className="max-w-7xl mx-auto">
          <QuickStats />
        </div>
      </section>
      
      {/* Featured Properties - Highlight premium listings */}
      <section className="py-20 md:py-32 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-purple-800/30 relative overflow-hidden">
        {/* Subtle Architectural Grid - Dark Mode Only */}
        <div className="absolute inset-0 hidden dark:block opacity-5 pointer-events-none">
          <div className="architectural-float absolute top-40 right-10 w-96 h-96 border border-purple-500/30" style={{ animationDelay: '1s' }}></div>
        </div>
        <Properties />
      </section>
      
      {/* Services - What we offer */}
      <section className="py-20 md:py-32 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-purple-800/30">
        <Services />
      </section>
      
      {/* Investment Opportunities */}
      <section className="py-20 md:py-32 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-purple-800/30">
        <FractionalOwnership />
      </section>
      
      {/* AI-Powered Analytics */}
      <section className="py-20 md:py-32 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-purple-800/30">
        <PredictiveAnalytics />
      </section>
      
      {/* Recently Viewed Properties */}
      <div className="bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-purple-800/30">
        <RecentlyViewed />
      </div>
      
      {/* Client Testimonials */}
      <section className="py-20 md:py-32 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-purple-800/30 relative overflow-hidden">
        {/* Blueprint Style Lines - Dark Mode Only */}
        <div className="absolute inset-0 hidden dark:block opacity-5 pointer-events-none">
          <svg className="absolute w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10%" cy="20%" r="150" stroke="rgb(168 85 247 / 0.2)" strokeWidth="1" fill="none" className="architectural-float" />
            <circle cx="90%" cy="80%" r="200" stroke="rgb(168 85 247 / 0.15)" strokeWidth="1" fill="none" className="architectural-float" style={{ animationDelay: '3s' }} />
          </svg>
        </div>
        <Testimonials />
      </section>
      
      {/* Trusted Partners */}
      <section className="py-20 md:py-32 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-purple-800/30">
        <Partners />
      </section>
      
      {/* Investor Relations */}
      <section className="py-20 md:py-32 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-purple-800/30">
        <Investors />
      </section>
      
      {/* Blueberry Stats Section */}
      <BlueberryStats />
      
      {/* Contact Section */}
      <section className="py-20 md:py-32 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-purple-800/30">
        <Contact />
      </section>
      
      {/* Blueberry CTA Section */}
      <BlueberryCTA />
    </>
  );
}
