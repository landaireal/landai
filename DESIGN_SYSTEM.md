# 🎨 Land AI Design System Documentation

> **Premium, Modern Design System for Luxury Real Estate Platform**

---

## 📚 Table of Contents

1. [Color System](#color-system)
2. [Typography](#typography)
3. [Animations](#animations)
4. [Components](#components)
5. [Transitions](#transitions)
6. [Utilities](#utilities)
7. [Best Practices](#best-practices)

---

## 🌈 Color System

### Gradient Utilities

#### Background Gradients
```html
<!-- Blue to Purple gradient -->
<div class="gradient-blue-purple">Content</div>

<!-- Cyan to Blue gradient -->
<div class="gradient-cyan-blue">Content</div>

<!-- Purple to Pink gradient -->
<div class="gradient-purple-pink">Content</div>

<!-- Emerald to Cyan gradient -->
<div class="gradient-emerald-cyan">Content</div>
```

#### Text Gradients
```html
<!-- Blue gradient text -->
<h1 class="text-gradient-blue">Heading</h1>

<!-- Purple gradient text -->
<h1 class="text-gradient-purple">Heading</h1>

<!-- Cyan gradient text -->
<h1 class="text-gradient-cyan">Heading</h1>

<!-- Emerald gradient text -->
<h1 class="text-gradient-emerald">Heading</h1>

<!-- Main gradient heading (Blue → Purple → Pink) -->
<h1 class="gradient-heading">Premium Heading</h1>
```

### Color Palette

- **Primary**: Blue (#3B82F6) → Cyan (#06B6D4) in dark mode
- **Secondary**: Purple (#A855F7) → Pink (#EC4899)
- **Accent**: Indigo (#6366F1)
- **Success**: Emerald (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Rose (#F43F5E)

---

## ✍️ Typography

### Heading Utilities

```html
<!-- Section title (responsive) -->
<h1 class="section-title">Large Heading</h1>
<!-- Output: text-4xl md:text-5xl lg:text-6xl font-black -->

<!-- Section subtitle -->
<p class="section-subtitle">Descriptive text</p>
<!-- Output: text-lg md:text-xl text-gray-600 dark:text-gray-400 -->
```

### Font Families

- **Sans-serif**: Inter (default)
- **Display**: Playfair Display (for headings)

---

## 🎬 Animations

### Animation Effects

#### Float & Bounce
```html
<!-- Gentle floating -->
<div class="animate-float-bounce">Floats smoothly</div>

<!-- Float with 12D effect -->
<div class="animate-float-12d">3D floating</div>
```

#### Glow Effects
```html
<!-- Blue glow pulse -->
<div class="animate-glow-pulse">Glows blue</div>

<!-- Cyan glow pulse -->
<div class="animate-glow-pulse-cyan">Glows cyan</div>

<!-- Purple glow pulse -->
<div class="animate-glow-pulse-purple">Glows purple</div>
```

#### Entrance Animations
```html
<!-- Slide up with fade -->
<div class="animate-slide-up-fade">Slides in from bottom</div>

<!-- Scale in -->
<div class="animate-scale-in">Zooms in</div>

<!-- Bounce in -->
<div class="animate-bounce-in">Bounces in elastically</div>
```

#### Special Effects
```html
<!-- Shake (attention grabber) -->
<div class="animate-shake">Shakes</div>

<!-- Gradient animation -->
<div class="animate-gradient bg-gradient-to-r from-blue-500 to-purple-500">
  Animated gradient
</div>
```

### Stagger Delays

Use for sequential animations:

```html
<div class="animate-slide-up-fade stagger-1">Item 1</div>
<div class="animate-slide-up-fade stagger-2">Item 2</div>
<div class="animate-slide-up-fade stagger-3">Item 3</div>
<div class="animate-slide-up-fade stagger-4">Item 4</div>
<div class="animate-slide-up-fade stagger-5">Item 5</div>
<div class="animate-slide-up-fade stagger-6">Item 6</div>
```

**Delays**: 0.1s, 0.2s, 0.3s, 0.4s, 0.5s, 0.6s

---

## 🧩 Components

### Cards

#### Premium Card
```html
<div class="card-premium">
  <h3>Premium Card</h3>
  <p>Content with backdrop blur and smooth hover</p>
</div>
```

**Features**: Glassmorphism, -translate-y-3 on hover, 700ms transition

#### Card Variants
```html
<!-- Blue/Indigo variant -->
<div class="card-variant-1">Blue themed card</div>

<!-- Purple/Pink variant -->
<div class="card-variant-2">Purple themed card</div>

<!-- Cyan/Teal variant -->
<div class="card-variant-3">Cyan themed card</div>

<!-- Emerald/Green variant -->
<div class="card-variant-4">Emerald themed card</div>
```

#### Bento Cards
```html
<div class="bento-card">
  <h3>Bento Grid Item</h3>
  <p>Modern card for grid layouts</p>
</div>
```

**Features**: Gradient overlay on hover, elastic bounce transition

#### Stat Cards
```html
<!-- Blue stat card -->
<div class="stat-card-blue">
  <h2>850+</h2>
  <p>Properties</p>
</div>

<!-- Purple stat card -->
<div class="stat-card-purple">
  <h2>2,400+</h2>
  <p>Clients</p>
</div>

<!-- Cyan stat card -->
<div class="stat-card-cyan">
  <h2>18%</h2>
  <p>Avg ROI</p>
</div>

<!-- Emerald stat card -->
<div class="stat-card-emerald">
  <h2>100%</h2>
  <p>Satisfaction</p>
</div>
```

### Badges

```html
<!-- Premium badge (Gold) -->
<span class="badge-premium">⭐ Premium</span>

<!-- New badge (Green) -->
<span class="badge-new">✨ New</span>

<!-- Hot badge (Red) -->
<span class="badge-hot">🔥 Hot</span>

<!-- Featured badge (Purple) -->
<span class="badge-featured">💎 Featured</span>

<!-- Section badge -->
<div class="section-badge">
  <Icon />
  <span>Badge Text</span>
</div>
```

### Buttons

```html
<!-- Primary button (with shimmer) -->
<button class="btn-primary">
  Click Me
</button>

<!-- Secondary button -->
<button class="btn-secondary">
  Secondary Action
</button>

<!-- Outline button -->
<button class="btn-outline">
  Outline Style
</button>

<!-- Ghost button -->
<button class="btn-ghost">
  Subtle Action
</button>
```

**Primary Features**: Gradient background, shimmer overlay on hover, scale-105

### Inputs

```html
<!-- Premium input -->
<input 
  type="text" 
  class="input-premium" 
  placeholder="Enter text..."
/>

<!-- With error state -->
<input 
  type="text" 
  class="input-premium border-red-500" 
  placeholder="Error state"
/>
```

**Features**: Focus ring, smooth border transitions, hover shadow

### Glass Effects

```html
<!-- Premium glass effect -->
<div class="glass-premium">
  <p>Frosted glass appearance</p>
</div>
```

---

## ⚡ Transitions

### Transition Timing Utilities

```html
<!-- Smooth transition (500ms) -->
<div class="transition-smooth">Content</div>

<!-- Bounce transition (600ms) -->
<div class="transition-bounce">Content</div>

<!-- Elastic transition (800ms) -->
<div class="transition-elastic">Content</div>

<!-- Premium transition (700ms) -->
<div class="transition-premium">Content</div>
```

### Hover Effects

```html
<!-- Lift on hover -->
<div class="hover-lift">Lifts up</div>

<!-- Glow on hover -->
<div class="hover-glow">Glows on hover</div>

<!-- Scale on hover -->
<div class="hover-scale">Scales up</div>

<!-- Icon float effect -->
<div class="icon-float">Rotates and scales</div>
```

---

## 🛠️ Utilities

### Section Utilities

```html
<!-- Premium section with background -->
<section class="section-premium">
  <h1 class="section-title">Section Title</h1>
  <p class="section-subtitle">Section description</p>
</section>
```

### Special Effects

```html
<!-- Glow effect -->
<div class="glow-effect">Has ambient glow</div>

<!-- Shimmer effect -->
<div class="shimmer-effect relative">Has shimmer overlay</div>
```

---

## 📋 Best Practices

### 1. **Consistency**
- Use the predefined utilities instead of custom styles
- Stick to the color palette for brand consistency

### 2. **Performance**
- Use `will-change: transform` for frequently animated elements
- Avoid animating expensive properties like `width` or `height`
- Prefer `transform` and `opacity` for animations

### 3. **Accessibility**
- Ensure sufficient color contrast (WCAG AA minimum)
- Provide `prefers-reduced-motion` alternatives for animations
- Use semantic HTML with utility classes

### 4. **Responsive Design**
- Mobile-first approach
- Test on multiple screen sizes
- Use responsive variants: `md:`, `lg:`, `xl:`

### 5. **Dark Mode**
- All utilities support dark mode via `dark:` variant
- Test both light and dark themes
- Ensure readability in both modes

---

## 🎯 Usage Examples

### Hero Section
```html
<section class="section-premium py-24">
  <div class="max-w-7xl mx-auto text-center">
    <div class="badge-featured mb-8 animate-bounce-in">
      ✨ Premium Properties
    </div>
    <h1 class="gradient-heading section-title mb-6 animate-slide-up-fade stagger-1">
      Discover Your Dream Home
    </h1>
    <p class="section-subtitle mb-8 animate-slide-up-fade stagger-2">
      Luxury real estate powered by AI
    </p>
    <button class="btn-primary animate-slide-up-fade stagger-3">
      Explore Properties
    </button>
  </div>
</section>
```

### Property Card
```html
<div class="card-premium hover-lift group">
  <img src="property.jpg" alt="Property" class="rounded-t-3xl" />
  <div class="p-6">
    <span class="badge-hot mb-2">🔥 Hot Deal</span>
    <h3 class="text-gradient-blue text-2xl font-bold mb-2">
      Luxury Villa
    </h3>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      Palm Jumeirah, Dubai
    </p>
    <div class="stat-card-cyan p-4">
      <span class="text-3xl font-black">AED 12M</span>
    </div>
  </div>
</div>
```

### Stats Section
```html
<section class="py-20">
  <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
    <div class="stat-card-blue animate-scale-in stagger-1">
      <h2 class="text-5xl font-black mb-2">850+</h2>
      <p class="text-xl">Properties</p>
    </div>
    <div class="stat-card-purple animate-scale-in stagger-2">
      <h2 class="text-5xl font-black mb-2">2,400+</h2>
      <p class="text-xl">Clients</p>
    </div>
    <div class="stat-card-cyan animate-scale-in stagger-3">
      <h2 class="text-5xl font-black mb-2">18%</h2>
      <p class="text-xl">Avg ROI</p>
    </div>
    <div class="stat-card-emerald animate-scale-in stagger-4">
      <h2 class="text-5xl font-black mb-2">100%</h2>
      <p class="text-xl">Verified</p>
    </div>
  </div>
</section>
```

### Form Example
```html
<form class="card-premium p-8 space-y-6">
  <h2 class="text-gradient-purple text-3xl font-black mb-4">
    Get In Touch
  </h2>
  
  <div>
    <label class="block text-sm font-bold mb-2">Name</label>
    <input 
      type="text" 
      class="input-premium" 
      placeholder="John Doe"
    />
  </div>
  
  <div>
    <label class="block text-sm font-bold mb-2">Email</label>
    <input 
      type="email" 
      class="input-premium" 
      placeholder="john@example.com"
    />
  </div>
  
  <button type="submit" class="btn-primary w-full">
    Submit Form
  </button>
</form>
```

---

## 🚀 Quick Reference

| Category | Class Examples | Use Case |
|----------|---------------|----------|
| **Cards** | `card-premium`, `card-variant-1` | Containers, content blocks |
| **Buttons** | `btn-primary`, `btn-outline` | CTAs, actions |
| **Badges** | `badge-premium`, `badge-hot` | Labels, status indicators |
| **Text** | `gradient-heading`, `text-gradient-blue` | Headings, emphasis |
| **Animations** | `animate-bounce-in`, `animate-glow-pulse-cyan` | Entrance effects, attention |
| **Transitions** | `transition-smooth`, `hover-lift` | Smooth interactions |
| **Inputs** | `input-premium` | Form fields |
| **Stats** | `stat-card-blue`, `stat-card-purple` | Metrics, numbers |

---

## 📞 Support

For questions or suggestions about the design system, please refer to the main project documentation.

**Version**: 2.0.0  
**Last Updated**: 2026-03-11  
**License**: MIT
