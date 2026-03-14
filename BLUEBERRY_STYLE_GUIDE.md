# 🫐 Blueberry Theme Style Guide

> **Complete design system documentation for the Land AI Real Estate blueberry theme**

---

## 📚 Table of Contents

1. [Color System](#color-system)
2. [Components](#components)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Dark Mode](#dark-mode)
6. [Best Practices](#best-practices)
7. [Examples](#examples)

---

## 🎨 Color System

### Primary Blueberry Palette

#### Light Mode
- **Primary**: `#667eea` (Indigo 500)
- **Secondary**: `#764ba2` (Purple 600)
- **Gradient**: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`

#### Dark Mode
- **Primary**: `#7c8aed` (Indigo 400 - Brighter)
- **Secondary**: `#8b5cb8` (Purple 500 - Brighter)
- **Gradient**: `linear-gradient(135deg, #7c8aed 0%, #8b5cb8 100%)`

### Gradient Variants

```css
/* Standard Gradient */
.blueberry-gradient
Background: #667eea → #764ba2
Use: Primary buttons, badges, icons

/* Soft Gradient */
.blueberry-gradient-soft
Background: #818cf8 → #a78bfa
Use: Subtle backgrounds, hover states

/* Vibrant Gradient */
.blueberry-gradient-vibrant
Background: #5b6fe8 → #6b3fa0
Use: High-impact CTAs, featured elements

/* Light Gradient */
.blueberry-gradient-light
Background: rgba(102, 126, 234, 0.1) → rgba(118, 75, 162, 0.1)
Use: Section backgrounds, subtle overlays

/* Subtle Gradient */
.blueberry-gradient-subtle
Background: rgba(102, 126, 234, 0.05) → rgba(118, 75, 162, 0.05)
Use: Very light backgrounds, decorative elements
```

### Text Colors

```html
<!-- Standard gradient text -->
<h1 class="blueberry-text">Heading</h1>

<!-- Lighter variant -->
<h2 class="blueberry-text-light">Subheading</h2>

<!-- Darker variant -->
<h3 class="blueberry-text-dark">Bold text</h3>
```

**Output:**
- **Light Mode**: Indigo 600 → Purple 600 → Indigo 600
- **Dark Mode**: Indigo 400 → Purple 400 → Indigo 400 (10% brighter)

---

## 🧩 Components

### Cards

#### Standard Card (Contact Form Style)
```html
<div class="card-standard">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

**Specifications:**
- Padding: `2rem (md: 3rem)`
- Border Radius: `3rem` (48px)
- Border: `1px zinc-200/50` (light) | `zinc-800/50` (dark)
- Shadow: `2xl`
- Hover: `-translate-y-2` + border highlight

**Dark Mode Enhancements:**
- Extra shadow layers for depth
- Subtle border glow (`rgba(255, 255, 255, 0.1)`)

#### Compact Card
```html
<div class="card-compact">
  <h4>Compact Card</h4>
  <p>Less padding, smaller radius</p>
</div>
```

**Specifications:**
- Padding: `1.5rem (md: 2rem)`
- Border Radius: `2rem` (32px)
- Hover: `-translate-y-1`
- Transition: `500ms`

#### Spacious Card
```html
<div class="card-spacious">
  <h2>Spacious Card</h2>
  <p>More padding, larger radius</p>
</div>
```

**Specifications:**
- Padding: `3rem (md: 5rem)`
- Border Radius: `3.5rem` (56px)
- Hover: `-translate-y-2`
- Transition: `700ms`

#### Blueberry Card
```html
<div class="card-blueberry">
  <h3>Blueberry Card</h3>
  <p>Themed with indigo accents</p>
</div>
```

**Specifications:**
- Border: `2px indigo-200` (light) | `indigo-800/50` (dark)
- Shadow: Indigo glow (`shadow-indigo-500/10`)
- Hover: Enhanced glow + lift
- **Dark Mode**: Stronger glow effect

#### Blueberry Subtle Card
```html
<div class="card-blueberry-subtle">
  <h3>Subtle Card</h3>
  <p>Gradient background with blur</p>
</div>
```

**Specifications:**
- Background: Gradient overlay (indigo/purple)
- Backdrop Blur: `xl`
- Border: Semi-transparent
- Hover: Border highlight

### Buttons

#### Primary Blueberry Button
```html
<button class="btn-blueberry">
  Click Me
</button>
```

**Features:**
- Gradient background
- Shimmer effect on hover
- Scale: `1.05` on hover
- **Dark Mode**: Enhanced glow shadow

#### Outline Blueberry Button
```html
<button class="btn-blueberry-outline">
  Secondary Action
</button>
```

**Features:**
- Transparent background
- 2px border
- Fill transition on hover
- Color shifts to white on hover

### Badges

#### Gradient Badge
```html
<span class="badge-blueberry">
  ⭐ Featured
</span>
```

**Features:**
- Gradient background
- White text
- Shadow effect
- **Dark Mode**: Glow effect

#### Light Badge
```html
<span class="badge-blueberry-light">
  New
</span>
```

**Features:**
- Light background
- Colored text
- Border accent
- **Dark Mode**: Enhanced contrast

### Alerts

```html
<div class="alert-blueberry">
  <Icon />
  <div>
    <h4>Alert Title</h4>
    <p>Alert message</p>
  </div>
</div>
```

**Features:**
- Indigo background tint
- 2px border
- Flex layout
- Icon support

---

## ✍️ Typography

### Heading Classes

```html
<!-- Main gradient heading -->
<h1 class="blueberry-text text-5xl md:text-7xl font-black">
  Hero Title
</h1>

<!-- Section title -->
<h2 class="section-title blueberry-text">
  Section Heading
</h2>

<!-- Subtitle -->
<p class="section-subtitle">
  Descriptive text
</p>
```

### Font Weights

- **Black**: `font-black` (900) - Headlines
- **Bold**: `font-bold` (700) - Subheadings
- **Semibold**: `font-semibold` (600) - Labels
- **Medium**: `font-medium` (500) - Body text

### Font Sizes (Responsive)

| Element | Mobile | Tablet | Desktop |
|---------|--------|--------|---------|
| Hero | `text-5xl` | `text-6xl` | `text-7xl` |
| Section | `text-4xl` | `text-5xl` | `text-6xl` |
| Card Title | `text-xl` | `text-2xl` | `text-2xl` |
| Body | `text-base` | `text-lg` | `text-lg` |

---

## 📏 Spacing & Layout

### Standard Spacing Scale

```css
Section Padding:       py-20 (80px)
Card Padding:          p-8 md:p-12 (32-48px)
Compact Card:          p-6 md:p-8 (24-32px)
Spacious Card:         p-12 md:p-20 (48-80px)
Element Gap:           gap-6 (24px)
Grid Gap:              gap-8 (32px)
```

### Container Max Widths

```css
Hero/Content:          max-w-4xl (896px)
Sections:              max-w-7xl (1280px)
Forms:                 max-w-md (448px)
```

### Border Radius Scale

```css
Small:                 rounded-xl (12px)
Medium:                rounded-2xl (16px)
Large:                 rounded-3xl (24px)
Card Standard:         rounded-[3rem] (48px)
Card Spacious:         rounded-[3.5rem] (56px)
```

---

## 🌙 Dark Mode

### Automatic Optimizations

The blueberry theme includes automatic dark mode enhancements:

#### Color Adjustments
- **Gradients**: 10-15% brighter
- **Text**: 10% brightness boost
- **Borders**: Semi-transparent with glow

#### Shadow Enhancements
```css
Light Mode Shadow:     0 20px 60px rgba(0,0,0,0.15)
Dark Mode Shadow:      0 20px 60px rgba(0,0,0,0.5) + glow layers
```

#### Border Glow
```css
.dark .card-blueberry {
  border-color: rgba(102, 126, 234, 0.3);
  box-shadow: 0 0 40px rgba(102, 126, 234, 0.1);
}
```

#### Button Glow
```css
.dark .btn-blueberry {
  box-shadow: 
    0 10px 30px rgba(102, 126, 234, 0.3),
    0 0 20px rgba(102, 126, 234, 0.2);
}
```

#### Section Backgrounds
```css
.dark .blueberry-section-bg {
  background: Darker purple-tinted gradient;
}
```

### Dark Mode Testing

**Checklist:**
- ✅ Text contrast > 4.5:1
- ✅ Glow effects visible but not harsh
- ✅ Borders have subtle luminance
- ✅ Shadows provide depth
- ✅ Gradients remain vibrant

---

## 📋 Best Practices

### 1. **Consistent Spacing**
Always use the standard spacing scale. Avoid custom margins.

```html
<!-- ✅ Good -->
<div class="py-20 px-4">
  <div class="max-w-7xl mx-auto">
    <div class="grid gap-8">
      ...
    </div>
  </div>
</div>

<!-- ❌ Bad -->
<div style="padding: 73px 15px">
  <div style="max-width: 1200px">
    ...
  </div>
</div>
```

### 2. **Card Selection**
Choose the right card for context:

- **Contact forms, detailed content**: `.card-standard`
- **Grid items, features**: `.card-compact`
- **Hero sections, major CTAs**: `.card-spacious`
- **Highlighted items**: `.card-blueberry`
- **Subtle backgrounds**: `.card-blueberry-subtle`

### 3. **Button Hierarchy**
```html
<!-- Primary action -->
<button class="btn-blueberry">Buy Now</button>

<!-- Secondary action -->
<button class="btn-blueberry-outline">Learn More</button>
```

### 4. **Decorative Elements**
Always include decorative corners for consistency:

```html
<div class="card-standard relative overflow-hidden">
  <!-- Top-right corner -->
  <div class="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-indigo-500/10 via-purple-500/10 to-transparent rounded-bl-full"></div>
  
  <!-- Bottom-left corner -->
  <div class="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-purple-500/10 via-indigo-500/10 to-transparent rounded-tr-full"></div>
  
  <!-- Content -->
  <div class="relative z-10">
    ...
  </div>
</div>
```

### 5. **Shimmer Effect**
Add shimmer for interactive elements:

```html
<div class="card-standard group">
  <!-- Shimmer overlay -->
  <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none rounded-[3rem]"></div>
  
  <!-- Content -->
  ...
</div>
```

---

## 💡 Examples

### Complete Feature Card

```html
<div class="card-compact group hover:-translate-y-2 transition-all duration-500 relative overflow-hidden">
  <!-- Decorative corner -->
  <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/10 via-purple-500/10 to-transparent rounded-bl-full"></div>
  
  <!-- Icon with glow -->
  <div class="relative mb-6">
    <div class="absolute inset-0 blueberry-gradient rounded-2xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
    <div class="relative inline-flex p-4 rounded-2xl blueberry-gradient text-white shadow-xl group-hover:scale-110 transition-transform duration-500">
      <Icon className="w-8 h-8" />
    </div>
  </div>
  
  <!-- Content -->
  <h3 class="text-xl font-black text-gray-900 dark:text-white mb-3">
    Feature Title
  </h3>
  <p class="text-gray-600 dark:text-gray-400 leading-relaxed">
    Feature description goes here
  </p>
</div>
```

### Stat Card with Animation

```html
<div class="card-blueberry group hover:scale-105 transition-all duration-500">
  <!-- Icon -->
  <div class="relative mb-6">
    <div class="absolute inset-0 blueberry-gradient rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
    <div class="relative inline-flex p-4 rounded-2xl blueberry-gradient text-white shadow-xl">
      <Icon className="w-8 h-8" />
    </div>
  </div>
  
  <!-- Value -->
  <div class="blueberry-text text-5xl font-black mb-2">
    850+
  </div>
  
  <!-- Label -->
  <div class="text-lg font-bold text-gray-900 dark:text-white">
    Properties
  </div>
</div>
```

### Section Header

```html
<div class="text-center mb-16">
  <div class="badge-blueberry-light inline-flex items-center gap-2 mb-6">
    <Icon className="w-4 h-4" />
    <span>Section Label</span>
  </div>
  
  <h2 class="text-5xl md:text-6xl font-black blueberry-text mb-6">
    Section Title
  </h2>
  
  <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
    Section description
  </p>
</div>
```

---

## 🎯 Component Checklist

When creating new components:

- [ ] Uses standard card variant
- [ ] Includes decorative corner elements
- [ ] Has shimmer effect on hover (if interactive)
- [ ] Uses blueberry color palette
- [ ] Responsive padding/sizing
- [ ] Dark mode optimized
- [ ] Proper z-index layering
- [ ] Smooth transitions (500-700ms)
- [ ] Accessibility considered

---

## 📱 Responsive Guidelines

### Mobile First
Always start with mobile styles, then enhance for larger screens:

```html
<div class="text-4xl md:text-5xl lg:text-6xl">
  Responsive Heading
</div>

<div class="p-6 md:p-8 lg:p-12">
  Responsive Padding
</div>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
  Responsive Grid
</div>
```

### Breakpoints
- **sm**: 640px
- **md**: 768px
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

---

## 🚀 Quick Start

1. **Import the blueberry utilities** (already in `index.css`)
2. **Use card variants** for consistent styling
3. **Apply blueberry colors** for brand consistency
4. **Add decorative elements** for premium feel
5. **Test in dark mode** for optimal appearance

---

## 📞 Support

For questions about the blueberry theme:
- Review this style guide
- Check `DESIGN_SYSTEM.md` for general utilities
- Visit `/design-system` route for live examples

**Version**: 2.0.0  
**Last Updated**: 2026-03-11  
**Theme**: Blueberry (Indigo-Purple)
