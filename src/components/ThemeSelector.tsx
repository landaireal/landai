import { Palette } from 'lucide-react';
import { useState } from 'react';

const themes = [
  { 
    name: 'Royal Purple', 
    value: 'purple',
    gradient: 'from-purple-600 to-violet-600',
    preview: 'bg-gradient-to-r from-purple-600 to-violet-600',
    icon: '💜'
  },
  { 
    name: 'Light Purple', 
    value: 'purple-light',
    gradient: 'from-purple-400 to-violet-400',
    preview: 'bg-gradient-to-r from-purple-400 to-violet-400',
    icon: '🌸'
  },
  { 
    name: 'Dark Purple', 
    value: 'purple-dark',
    gradient: 'from-purple-800 to-violet-800',
    preview: 'bg-gradient-to-r from-purple-800 to-violet-800',
    icon: '🎭'
  },
  { 
    name: 'Sunset Orange', 
    value: 'sunset',
    gradient: 'from-orange-500 to-pink-500',
    preview: 'bg-gradient-to-r from-orange-500 to-pink-500',
    icon: '🌅'
  },
  { 
    name: 'Ocean Blue', 
    value: 'ocean',
    gradient: 'from-blue-600 to-cyan-500',
    preview: 'bg-gradient-to-r from-blue-600 to-cyan-500',
    icon: '🌊'
  },
  { 
    name: 'Forest Green', 
    value: 'forest',
    gradient: 'from-emerald-600 to-teal-500',
    preview: 'bg-gradient-to-r from-emerald-600 to-teal-500',
    icon: '🌲'
  },
  { 
    name: 'Lavender Dream', 
    value: 'lavender',
    gradient: 'from-purple-400 to-pink-400',
    preview: 'bg-gradient-to-r from-purple-400 to-pink-400',
    icon: '🪻'
  },
  { 
    name: 'Crimson Red', 
    value: 'crimson',
    gradient: 'from-red-600 to-orange-600',
    preview: 'bg-gradient-to-r from-red-600 to-orange-600',
    icon: '🔥'
  },
  { 
    name: 'Aqua Marine', 
    value: 'aqua',
    gradient: 'from-cyan-500 to-emerald-500',
    preview: 'bg-gradient-to-r from-cyan-500 to-emerald-500',
    icon: '💎'
  },
  { 
    name: 'Midnight Blue', 
    value: 'midnight',
    gradient: 'from-blue-800 to-blue-500',
    preview: 'bg-gradient-to-r from-blue-800 to-blue-500',
    icon: '🌙'
  },
  { 
    name: 'Rose Gold', 
    value: 'rose-gold',
    gradient: 'from-rose-500 to-amber-500',
    preview: 'bg-gradient-to-r from-rose-500 to-amber-500',
    icon: '🌹'
  }
];

export default function ThemeSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('purple');

  const handleThemeChange = (themeValue: string) => {
    setCurrentTheme(themeValue);
    // Here you would apply the theme - for now it's just for demonstration
    console.log('Theme changed to:', themeValue);
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {/* Theme Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn-blueberry p-4 rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
        aria-label="Change theme"
      >
        <Palette className="w-6 h-6" />
      </button>

      {/* Theme Options */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 card-standard p-6 w-80 animate-scale-in max-h-[600px] overflow-y-auto">
          <h3 className="text-lg font-black blueberry-text mb-4">🎨 Choose Theme</h3>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((theme) => (
              <button
                key={theme.value}
                onClick={() => handleThemeChange(theme.value)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 ${
                  currentTheme === theme.value
                    ? 'bg-purple-100 dark:bg-purple-900/30 border-2 border-purple-400 scale-105'
                    : 'bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-105'
                }`}
              >
                <div className="text-3xl mb-1">{theme.icon}</div>
                <div className={`w-full h-16 rounded-lg ${theme.preview} shadow-lg`}></div>
                <span className="font-bold text-xs text-center text-gray-900 dark:text-white">
                  {theme.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
