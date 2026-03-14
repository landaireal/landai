import { Award, CheckCircle, Sparkles, TrendingUp, AlertCircle, Info, AlertTriangle, XCircle } from 'lucide-react';

export default function DesignSystemDemo() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Header */}
        <section className="text-center">
          <h1 className="gradient-heading section-title mb-4">
            Design System Demo
          </h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            Explore all the premium design utilities and components
          </p>
          <div className="divider-gradient-blue my-8"></div>
        </section>

        {/* Badges Section */}
        <section className="section-premium p-12 rounded-3xl">
          <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white">Badges</h2>
          <div className="flex flex-wrap gap-4">
            <span className="badge-premium">⭐ Premium</span>
            <span className="badge-new">✨ New</span>
            <span className="badge-hot">🔥 Hot</span>
            <span className="badge-featured">💎 Featured</span>
            <span className="section-badge">
              <Award className="w-4 h-4" />
              <span>Section Badge</span>
            </span>
          </div>
        </section>

        {/* Buttons Section */}
        <section className="section-premium p-12 rounded-3xl">
          <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary">Primary Button</button>
            <button className="btn-secondary">Secondary Button</button>
            <button className="btn-outline">Outline Button</button>
            <button className="btn-ghost">Ghost Button</button>
          </div>
        </section>

        {/* Card Variants */}
        <section>
          <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white">Card Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card-variant-1">
              <h3 className="text-xl font-bold mb-2">Blue Variant</h3>
              <p className="text-gray-600 dark:text-gray-400">Card with blue gradient background</p>
            </div>
            <div className="card-variant-2">
              <h3 className="text-xl font-bold mb-2">Purple Variant</h3>
              <p className="text-gray-600 dark:text-gray-400">Card with purple gradient background</p>
            </div>
            <div className="card-variant-3">
              <h3 className="text-xl font-bold mb-2">Cyan Variant</h3>
              <p className="text-gray-600 dark:text-gray-400">Card with cyan gradient background</p>
            </div>
            <div className="card-variant-4">
              <h3 className="text-xl font-bold mb-2">Emerald Variant</h3>
              <p className="text-gray-600 dark:text-gray-400">Card with emerald gradient background</p>
            </div>
          </div>
        </section>

        {/* Stat Cards */}
        <section>
          <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white">Stat Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="stat-card-blue hover-scale">
              <h2 className="text-5xl font-black mb-2">850+</h2>
              <p className="text-xl opacity-90">Properties</p>
            </div>
            <div className="stat-card-purple hover-scale">
              <h2 className="text-5xl font-black mb-2">2,400+</h2>
              <p className="text-xl opacity-90">Happy Clients</p>
            </div>
            <div className="stat-card-cyan hover-scale">
              <h2 className="text-5xl font-black mb-2">18%</h2>
              <p className="text-xl opacity-90">Avg ROI</p>
            </div>
            <div className="stat-card-emerald hover-scale">
              <h2 className="text-5xl font-black mb-2">100%</h2>
              <p className="text-xl opacity-90">Verified</p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section>
          <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white">Pricing Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="pricing-card-basic">
              <h3 className="text-2xl font-bold mb-2">Basic</h3>
              <p className="text-4xl font-black mb-4">$99<span className="text-lg">/mo</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500" /> Feature 1</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500" /> Feature 2</li>
              </ul>
              <button className="btn-secondary w-full">Get Started</button>
            </div>
            <div className="pricing-card-pro">
              <div className="badge-featured mb-4">Popular</div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-4xl font-black mb-4">$299<span className="text-lg">/mo</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500" /> All Basic features</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500" /> Advanced Analytics</li>
              </ul>
              <button className="btn-primary w-full">Get Started</button>
            </div>
            <div className="pricing-card-enterprise">
              <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
              <p className="text-4xl font-black mb-4">Custom</p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500" /> All Pro features</li>
                <li className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-emerald-500" /> Dedicated Support</li>
              </ul>
              <button className="btn-outline w-full">Contact Sales</button>
            </div>
          </div>
        </section>

        {/* Alerts */}
        <section>
          <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white">Alerts</h2>
          <div className="space-y-4">
            <div className="alert-success">
              <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-emerald-900 dark:text-emerald-100">Success!</h4>
                <p className="text-emerald-700 dark:text-emerald-300">Your changes have been saved successfully.</p>
              </div>
            </div>
            <div className="alert-warning">
              <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-amber-900 dark:text-amber-100">Warning</h4>
                <p className="text-amber-700 dark:text-amber-300">Please review your information before proceeding.</p>
              </div>
            </div>
            <div className="alert-error">
              <XCircle className="w-6 h-6 text-rose-600 dark:text-rose-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-rose-900 dark:text-rose-100">Error</h4>
                <p className="text-rose-700 dark:text-rose-300">Something went wrong. Please try again.</p>
              </div>
            </div>
            <div className="alert-info">
              <Info className="w-6 h-6 text-blue-600 dark:text-blue-400 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-blue-900 dark:text-blue-100">Info</h4>
                <p className="text-blue-700 dark:text-blue-300">Here's some helpful information for you.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Cards */}
        <section>
          <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white">Feature Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="feature-card-icon-left hover-lift">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <Sparkles className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Icon Left Layout</h3>
                <p className="text-gray-600 dark:text-gray-400">Perfect for listing features with icons on the side.</p>
              </div>
            </div>
            <div className="feature-card-bordered hover-lift">
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Bordered Accent</h3>
              <p className="text-gray-600 dark:text-gray-400">Card with left border accent for emphasis.</p>
            </div>
          </div>
          <div className="feature-card-icon-top hover-lift">
            <div className="p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl mb-4">
              <TrendingUp className="w-12 h-12 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">Icon Top Layout</h3>
            <p className="text-gray-600 dark:text-gray-400">Centered layout with icon on top, great for showcasing.</p>
          </div>
        </section>

        {/* Tags */}
        <section>
          <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white">Tags</h2>
          <div className="flex flex-wrap gap-3">
            <span className="tag-gray">Gray Tag</span>
            <span className="tag-blue">Blue Tag</span>
            <span className="tag-purple">Purple Tag</span>
            <span className="tag-emerald">Emerald Tag</span>
          </div>
        </section>

        {/* Avatars */}
        <section>
          <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white">Avatars</h2>
          <div className="flex items-end gap-4">
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200" alt="Avatar" className="avatar-sm" />
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200" alt="Avatar" className="avatar-md" />
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200" alt="Avatar" className="avatar-lg" />
            <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200" alt="Avatar" className="avatar-xl" />
          </div>
        </section>

        {/* Animations */}
        <section>
          <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white">Animations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card-premium animate-float-bounce">
              <h3 className="font-bold mb-2">Float Bounce</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Smooth floating animation</p>
            </div>
            <div className="card-premium animate-glow-pulse-cyan">
              <h3 className="font-bold mb-2">Glow Pulse</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Cyan glow effect</p>
            </div>
            <div className="card-premium hover-scale">
              <h3 className="font-bold mb-2">Hover Scale</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Scales on hover</p>
            </div>
          </div>
        </section>

        {/* Text Gradients */}
        <section>
          <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white">Text Gradients</h2>
          <div className="space-y-4">
            <h3 className="text-gradient-blue text-4xl font-black">Blue Gradient Text</h3>
            <h3 className="text-gradient-purple text-4xl font-black">Purple Gradient Text</h3>
            <h3 className="text-gradient-cyan text-4xl font-black">Cyan Gradient Text</h3>
            <h3 className="text-gradient-emerald text-4xl font-black">Emerald Gradient Text</h3>
            <h3 className="gradient-heading text-4xl font-black">Main Gradient Heading</h3>
          </div>
        </section>

        {/* Timeline */}
        <section>
          <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white">Timeline</h2>
          <div className="space-y-6">
            <div className="timeline-card">
              <h4 className="font-bold text-lg mb-1">Event One</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Description of the first event</p>
            </div>
            <div className="timeline-card">
              <h4 className="font-bold text-lg mb-1">Event Two</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Description of the second event</p>
            </div>
            <div className="timeline-card">
              <h4 className="font-bold text-lg mb-1">Event Three</h4>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Description of the third event</p>
            </div>
          </div>
        </section>

        {/* Loading Skeletons */}
        <section>
          <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white">Loading Skeletons</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="skeleton-circle w-12 h-12"></div>
              <div className="flex-1 space-y-2">
                <div className="skeleton-text w-3/4"></div>
                <div className="skeleton-text w-1/2"></div>
              </div>
            </div>
            <div className="skeleton h-48 rounded-2xl"></div>
          </div>
        </section>

        {/* CTA Card */}
        <section>
          <div className="cta-card text-white text-center">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">Join thousands of satisfied customers today</p>
            <button className="bg-white text-purple-600 px-8 py-4 rounded-2xl font-bold hover:scale-105 transition-transform">
              Start Free Trial
            </button>
          </div>
        </section>

        {/* Input Demo */}
        <section>
          <h2 className="text-3xl font-black mb-8 text-gray-900 dark:text-white">Premium Input</h2>
          <div className="max-w-md">
            <input type="text" className="input-premium mb-4" placeholder="Enter your name..." />
            <input type="email" className="input-premium" placeholder="Enter your email..." />
          </div>
        </section>

      </div>
    </div>
  );
}
