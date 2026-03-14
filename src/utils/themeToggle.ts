// Theme Toggle Utility
// Easy way to switch between color themes

export const themes = {
  purple: {
    name: 'Royal Purple',
    primary: '#7c3aed',
    secondary: '#a855f7',
    class: 'theme-purple'
  },
  purpleLight: {
    name: 'Light Purple',
    primary: '#a78bfa',
    secondary: '#d8b4fe',
    class: 'theme-purple-light'
  },
  purpleDark: {
    name: 'Dark Purple',
    primary: '#6d28d9',
    secondary: '#7c3aed',
    class: 'theme-purple-dark'
  },
  sunset: {
    name: 'Sunset Orange',
    primary: '#f97316',
    secondary: '#ec4899',
    class: 'theme-sunset'
  },
  ocean: {
    name: 'Ocean Blue',
    primary: '#1e40af',
    secondary: '#0891b2',
    class: 'theme-ocean'
  },
  forest: {
    name: 'Forest Green',
    primary: '#059669',
    secondary: '#14b8a6',
    class: 'theme-forest'
  }
};

export type ThemeName = keyof typeof themes;

export function setTheme(themeName: ThemeName) {
  const theme = themes[themeName];
  if (!theme) return;
  
  // Store in localStorage
  localStorage.setItem('theme', themeName);
  
  // Apply to document root
  document.documentElement.style.setProperty('--theme-primary', theme.primary);
  document.documentElement.style.setProperty('--theme-secondary', theme.secondary);
  
  console.log(`Theme changed to: ${theme.name}`);
}

export function getTheme(): ThemeName {
  return (localStorage.getItem('theme') as ThemeName) || 'purple';
}

export function initTheme() {
  const savedTheme = getTheme();
  setTheme(savedTheme);
}
