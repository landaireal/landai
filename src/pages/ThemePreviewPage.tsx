import { useState } from 'react';
import { Palette, Check, Sparkles } from 'lucide-react';
import SEO from '../components/SEO';

const allThemes = [
  { name: 'Royal Purple', value: 'purple', gradientClass: 'blueberry-gradient', textClass: 'blueberry-text', icon: '💜' },
  { name: 'Light Purple', value: 'purple-light', gradientClass: 'blueberry-gradient-lighter', textClass: 'blueberry-text-lighter', icon: '🌸' },
  { name: 'Dark Purple', value: 'purple-dark', gradientClass: 'blueberry-gradient-darker', textClass: 'blueberry-text-darker', icon: '🎭' },
  { name: 'Sunset Orange', value: 'sunset', gradientClass: 'theme-sunset', textClass: 'text-sunset', icon: '🌅' },
  { name: 'Ocean Blue', value: 'ocean', gradientClass: 'theme-ocean', textClass: 'text-ocean', icon: '🌊' },
  { name: 'Forest Green', value: 'forest', gradientClass: 'theme-forest', textClass: 'text-forest', icon: '🌲' },
  { name: 'Lavender Dream', value: 'lavender', gradientClass: 'theme-lavender', textClass: 'text-lavender', icon: '🪻' },
  { name: 'Crimson Red', value: 'crimson', gradientClass: 'theme-crimson', textClass: 'text-crimson', icon: '🔥' },
  { name: 'Aqua Marine', value: 'aqua', gradientClass: 'theme-aqua', textClass: 'text-aqua', icon: '💎' },
  { name: 'Midnight Blue', value: 'midnight', gradientClass: 'theme-midnight', textClass: 'text-midnight', icon: '🌙' },
  { name: 'Rose Gold', value: 'rose-gold', gradientClass: 'theme-rose-gold', textClass: 'text-rose-gold', icon: '🌹' },
];

export default function ThemePreviewPage() {
  const [selectedTheme, setSelectedTheme] = useState(allThemes[0]);

  return (
    <>
      <SEO 
        title="Theme Preview - Land AI Real Estate"
        description="Explore all available color themes and variations"
      />
      
      {/* Hero */}
      <section className="pt-32 pb-20 px-4 section-animated-bg">
        <div className="max-w-7xl mx-auto text-center">
          <div className="badge-blueberry-light inline-flex items-center gap-2 mb-6">
            <Palette className="w-4 h-4" />
            <span>Theme Gallery</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black blueberry-text mb-6">
            Explore All Themes
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose from 11 beautiful color themes to customize your experience
          </p>
        </div>
      </section>

      {/* Theme Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allThemes.map((theme) => (
              <div
                key={theme.value}
                onClick={() => setSelectedTheme(theme)}
                className={`card-compact cursor-pointer transition-all duration-500 hover:scale-105 ${
                  selectedTheme.value === theme.value ? 'ring-4 ring-purple-400' : ''
                }`}
              >
                {/* Theme Preview */}
                <div className={`relative h-40 rounded-2xl mb-4 overflow-hidden ${theme.gradientClass}`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-6xl">{theme.icon}</span>
                  </div>
                  {selectedTheme.value === theme.value && (
                    <div className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <Check className="w-5 h-5 text-purple-600" />
                    </div>
                  )}
                </div>

                {/* Theme Info */}
                <h3 className={`text-xl font-black mb-2 ${theme.textClass}`}>
                  {theme.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {theme.value}
                </p>

                {/* Color Samples */}
                <div className="flex gap-2">
                  <div className={`flex-1 h-3 rounded-full ${theme.gradientClass}`}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected Theme Preview */}
      <section className="py-20 px-4 section-animated-bg">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black blueberry-text mb-12 text-center">
            Preview: {selectedTheme.name}
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Buttons */}
            <div className="card-standard">
              <h3 className={`text-2xl font-black mb-6 ${selectedTheme.textClass}`}>
                Buttons
              </h3>
              <div className="space-y-4">
                <button className={`px-8 py-4 rounded-2xl font-bold text-white shadow-lg w-full ${selectedTheme.gradientClass}`}>
                  Primary Button
                </button>
                <button className="btn-secondary w-full">
                  Secondary Button
                </button>
              </div>
            </div>

            {/* Badges */}
            <div className="card-standard">
              <h3 className={`text-2xl font-black mb-6 ${selectedTheme.textClass}`}>
                Badges
              </h3>
              <div className="flex flex-wrap gap-3">
                <span className={`inline-flex items-center gap-2 px-4 py-2 text-white font-black text-xs rounded-full shadow-lg ${selectedTheme.gradientClass}`}>
                  <Sparkles className="w-3 h-3" />
                  Featured
                </span>
                <span className={`inline-flex items-center gap-2 px-4 py-2 text-white font-black text-xs rounded-full shadow-lg ${selectedTheme.gradientClass}`}>
                  New
                </span>
                <span className={`inline-flex items-center gap-2 px-4 py-2 text-white font-black text-xs rounded-full shadow-lg ${selectedTheme.gradientClass}`}>
                  Popular
                </span>
              </div>
            </div>

            {/* Typography */}
            <div className="card-standard">
              <h3 className={`text-2xl font-black mb-6 ${selectedTheme.textClass}`}>
                Typography
              </h3>
              <div className="space-y-3">
                <h1 className={`text-4xl font-black ${selectedTheme.textClass}`}>
                  Heading 1
                </h1>
                <h2 className={`text-3xl font-bold ${selectedTheme.textClass}`}>
                  Heading 2
                </h2>
                <h3 className={`text-2xl font-bold ${selectedTheme.textClass}`}>
                  Heading 3
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Body text with standard styling
                </p>
              </div>
            </div>

            {/* Cards */}
            <div className="card-standard">
              <h3 className={`text-2xl font-black mb-6 ${selectedTheme.textClass}`}>
                Card Example
              </h3>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                <div className={`w-16 h-16 rounded-2xl ${selectedTheme.gradientClass} mb-4 flex items-center justify-center text-white text-2xl`}>
                  {selectedTheme.icon}
                </div>
                <h4 className={`text-lg font-bold mb-2 ${selectedTheme.textClass}`}>
                  Card Title
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  This is an example of how cards look with the {selectedTheme.name} theme applied.
                </p>
              </div>
            </div>
          </div>

          {/* Full Width Preview */}
          <div className="mt-8">
            <div className={`relative overflow-hidden rounded-[3rem] p-12 md:p-20 text-center ${selectedTheme.gradientClass}`}>
              <div className="relative z-10">
                <span className="text-6xl mb-6 block">{selectedTheme.icon}</span>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6">
                  {selectedTheme.name}
                </h2>
                <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                  Experience the beautiful gradient colors and smooth animations
                </p>
                <button className="px-8 py-4 bg-white/20 backdrop-blur-xl border-2 border-white/50 text-white font-bold rounded-2xl hover:bg-white/30 transition-all duration-300">
                  Apply This Theme
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black blueberry-text mb-12 text-center">
            All Color Palettes
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allThemes.map((theme) => (
              <div key={theme.value} className="card-compact">
                <h4 className={`text-lg font-black mb-4 ${theme.textClass}`}>
                  {theme.icon} {theme.name}
                </h4>
                <div className="space-y-3">
                  <div className={`h-16 rounded-xl ${theme.gradientClass} flex items-center justify-center text-white font-bold shadow-lg`}>
                    Gradient
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className={`h-12 rounded-lg ${theme.gradientClass} opacity-70`}></div>
                    <div className={`h-12 rounded-lg ${theme.gradientClass}`}></div>
                    <div className={`h-12 rounded-lg ${theme.gradientClass} opacity-70`}></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Usage Guide */}
      <section className="py-20 px-4 section-animated-bg">
        <div className="max-w-4xl mx-auto">
          <div className="card-standard text-center">
            <h2 className="text-4xl font-black blueberry-text mb-6">
              How to Use Themes
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Click the 🎨 palette button in the bottom-right corner to change themes anytime!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-blueberry">
                View Documentation
              </button>
              <button className="btn-secondary">
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
