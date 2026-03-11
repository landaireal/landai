# 🏢 Land AI Real Estate - Premium Properties in UAE

A cutting-edge, futuristic real estate platform built with React, TypeScript, Tailwind CSS, and powered by AI technology. Experience the future of property browsing with blockchain verification, holographic tours, and multi-dimensional features.

![Land AI Real Estate](https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80)

## ✨ Features

### 🎨 Modern UI/UX
- **12D Spatial Design** - Futuristic interface with depth and dimension
- **Dark/Light Mode** - Seamless theme switching with beautiful gradients
- **Responsive Design** - Optimized for all devices and screen sizes
- **Smooth Animations** - Powered by Framer Motion for fluid transitions

### 🌍 Multi-Language Support
Support for 6 languages:
- 🇬🇧 English
- 🇦🇪 Arabic (RTL support)
- 🇫🇷 French
- 🇪🇸 Spanish
- 🇩🇪 German
- 🇨🇳 Chinese

### 🚀 Advanced Features
- **AI-Powered Search** - Quantum AI search with voice input
- **Blockchain Verification** - Smart contract verified properties
- **Holographic Floorplans** - 3D property visualization
- **AR Portal** - Augmented reality property tours
- **Metaverse Tours** - Virtual reality property exploration
- **Predictive Analytics** - AI-driven market insights
- **Biometric Approval** - Secure authentication
- **Drone Scanner** - Aerial property views
- **Neural Architect** - AI-powered property design

### 🔧 Technical Features
- **React Router** - Multi-page navigation
- **Form Validation** - React Hook Form + Zod schema validation
- **Lazy Loading** - Code splitting for optimal performance
- **SEO Optimized** - Meta tags and Open Graph support
- **Type Safety** - Full TypeScript implementation
- **Mock API** - Built-in property and market data API
- **Custom Hooks** - Reusable logic for properties and market data

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.3
- **Language:** TypeScript 5.9.3
- **Build Tool:** Vite 7.2.4
- **Styling:** Tailwind CSS 4.1.17
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **Form Handling:** React Hook Form + Zod
- **Icons:** Lucide React
- **State Management:** React Context API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/landai-realestate.git
   cd landai-realestate
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🚀 Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run format       # Format code with Prettier

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage
```

## 📁 Project Structure

```
landai-realestate/
├── public/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AIChat.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── AnimatedSection.tsx
│   │   ├── SEO.tsx
│   │   └── ...
│   ├── context/            # React Context providers
│   │   ├── ThemeContext.tsx
│   │   └── LanguageContext.tsx
│   ├── hooks/              # Custom React hooks
│   │   ├── useProperties.ts
│   │   └── useMarketData.ts
│   ├── pages/              # Page components
│   │   ├── Home.tsx
│   │   ├── PropertiesPage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ServicesPage.tsx
│   │   └── ContactPage.tsx
│   ├── services/           # API services
│   │   └── api.ts
│   ├── utils/              # Utility functions
│   │   └── cn.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Entry point
│   ├── index.css           # Global styles
│   └── translations.ts     # i18n translations
├── .eslintrc.cjs           # ESLint configuration
├── .prettierrc             # Prettier configuration
├── tsconfig.json           # TypeScript configuration
├── vite.config.ts          # Vite configuration
├── vitest.config.ts        # Vitest configuration
└── package.json
```

## 🎨 Key Components

### Hero Section
Futuristic landing with AI search, quantum animations, and location showcases.

### Properties
Interactive property cards with blockchain verification badges and AI scores.

### Services
Comprehensive real estate services including:
- Neural Architect
- Orbital Scanner
- Holographic Floorplans
- AI Time Travel
- Smart City Matrix
- And more...

### Contact Form
Fully validated contact form with Zod schema validation and real-time error feedback.

## 🌐 Internationalization (i18n)

The app supports 6 languages with full translation coverage. Translations are managed in `src/translations.ts`.

To add a new language:
1. Add the language code to the `Language` type
2. Add translations in the `translations` object
3. Update the language selector in `Navbar.tsx`

## 🎯 SEO

Each page includes dynamic SEO meta tags:
- Page-specific titles and descriptions
- Open Graph tags for social sharing
- Twitter Card support
- Structured data ready

## 🔒 Type Safety

Full TypeScript coverage ensures:
- Compile-time error checking
- IntelliSense support
- Better refactoring capabilities
- Self-documenting code

## 📱 Responsive Design

Optimized breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🎭 Animations

Framer Motion animations include:
- Page transitions
- Scroll-based reveals
- Hover effects
- Stagger animations
- Gesture interactions

## 🧪 Testing

Test setup with Vitest and React Testing Library:
- Unit tests for components
- Integration tests for features
- Coverage reports
- UI mode for interactive testing

## 📈 Performance Optimizations

- **Lazy Loading:** Pages are code-split and loaded on demand
- **Image Optimization:** External images from Unsplash CDN
- **Bundle Splitting:** Automatic vendor chunk splitting
- **Tree Shaking:** Unused code elimination
- **Minification:** Production builds are minified

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Contact

**Land AI Real Estate**
- Website: [https://landai.ae](https://landai.ae)
- Email: land.a.i@outlook.com
- Phone: +971 52 285 0625
- Location: Dubai & Abu Dhabi, UAE

## 🙏 Acknowledgments

- React Team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Framer Motion for beautiful animations
- Lucide for the icon library
- Unsplash for high-quality images

---

**Built with ❤️ for the future of real estate**

© 2026 Land AI Real Estate. All rights reserved.
