# Tailwind CSS Usage Examples (Issue #36)

## Dynamic Color System

### Basic Usage
```html
<!-- Primary colors automatically adapt to theme settings -->
<div class="bg-primary-500 text-white">
    Primary Button
</div>

<div class="text-primary-700 border-primary-200">
    Primary content with border
</div>
```

### Municipality-Specific Colors
```html
<!-- Thalwil theme (blue) -->
<div class="bg-thalwil-500 text-thalwil-50">
    Thalwil styled content
</div>

<!-- Thalheim theme (green) -->
<div class="bg-thalheim-500 text-thalheim-50">
    Thalheim styled content
</div>

<!-- Erlenbach theme (turquoise) -->
<div class="bg-erlenbach-500 text-erlenbach-50">
    Erlenbach styled content
</div>
```

## Dynamic Typography

### Primary Font Usage
```html
<!-- Uses theme-selected font (Inter, Crimson Text, etc.) -->
<h1 class="font-primary text-2xl">
    Theme-Dynamic Heading
</h1>

<p class="font-primary text-base">
    This text will use the selected Google Font
</p>
```

### Specific Font Families
```html
<!-- Force specific fonts if needed -->
<h2 class="font-inter">Inter Heading</h2>
<p class="font-crimson">Crimson Text paragraph</p>
<div class="font-playfair">Playfair Display content</div>
<span class="font-open-sans">Open Sans text</span>
<em class="font-montserrat">Montserrat emphasis</em>
```

## Component Examples

### Hero Section
```html
<section class="bg-primary-50 py-16">
    <div class="container mx-auto px-4">
        <h1 class="font-primary text-4xl font-bold text-primary-900 mb-6">
            Gemeinde Bruchtal
        </h1>
        <p class="font-primary text-xl text-primary-700 mb-8">
            Leben am See - Your municipality description
        </p>
        <button class="bg-primary-500 hover:bg-primary-600 text-white font-primary font-semibold py-3 px-6 rounded-lg transition-colors">
            Mehr erfahren
        </button>
    </div>
</section>
```

### Navigation Menu
```html
<nav class="bg-white border-b border-primary-200">
    <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16">
            <div class="text-primary-800 font-primary font-bold text-xl">
                Logo
            </div>
            <div class="flex space-x-8">
                <a href="#" class="text-primary-600 hover:text-primary-800 font-primary transition-colors">
                    Home
                </a>
                <a href="#" class="text-primary-600 hover:text-primary-800 font-primary transition-colors">
                    Services
                </a>
                <a href="#" class="text-primary-600 hover:text-primary-800 font-primary transition-colors">
                    Contact
                </a>
            </div>
        </div>
    </div>
</nav>
```

### Card Component
```html
<div class="bg-white border border-primary-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
    <div class="p-6">
        <h3 class="font-primary font-semibold text-lg text-primary-800 mb-2">
            Card Title
        </h3>
        <p class="font-primary text-primary-600 mb-4">
            Card description text that uses the theme colors.
        </p>
        <button class="bg-primary-500 hover:bg-primary-600 text-white font-primary font-medium py-2 px-4 rounded transition-colors">
            Read More
        </button>
    </div>
</div>
```

### Form Elements
```html
<form class="space-y-4">
    <div>
        <label class="block font-primary font-medium text-primary-700 mb-2">
            Name
        </label>
        <input 
            type="text" 
            class="w-full font-primary px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            placeholder="Ihr Name"
        >
    </div>
    <div>
        <label class="block font-primary font-medium text-primary-700 mb-2">
            Nachricht
        </label>
        <textarea 
            class="w-full font-primary px-3 py-2 border border-primary-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            rows="4"
            placeholder="Ihre Nachricht"
        ></textarea>
    </div>
    <button 
        type="submit"
        class="bg-primary-500 hover:bg-primary-600 text-white font-primary font-semibold py-2 px-6 rounded-md transition-colors"
    >
        Absenden
    </button>
</form>
```

### Status Indicators
```html
<!-- Success -->
<div class="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
    <p class="font-primary">✓ Success message</p>
</div>

<!-- Warning -->
<div class="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-md">
    <p class="font-primary">⚠ Warning message</p>
</div>

<!-- Error -->
<div class="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
    <p class="font-primary">✗ Error message</p>
</div>

<!-- Info with primary colors -->
<div class="bg-primary-50 border border-primary-200 text-primary-800 px-4 py-3 rounded-md">
    <p class="font-primary">ℹ Information using theme colors</p>
</div>
```

## Advanced Examples

### Responsive Design
```html
<div class="bg-primary-500 text-white p-4 md:p-8 lg:p-12">
    <h2 class="font-primary text-lg md:text-2xl lg:text-3xl">
        Responsive heading
    </h2>
    <p class="font-primary text-sm md:text-base lg:text-lg mt-2">
        Responsive text that adapts to screen size
    </p>
</div>
```

### Dark Mode Support (Future)
```html
<!-- When dark mode is implemented -->
<div class="bg-white dark:bg-primary-900 text-primary-900 dark:text-primary-100">
    <h3 class="font-primary">Content that adapts to dark mode</h3>
</div>
```

### Gradient Backgrounds
```html
<div class="bg-gradient-to-r from-primary-500 to-primary-700 text-white">
    <div class="p-8">
        <h2 class="font-primary text-2xl font-bold">
            Gradient Background
        </h2>
        <p class="font-primary mt-4">
            Using primary color gradients
        </p>
    </div>
</div>
```

## CSS Custom Properties Integration

The system automatically generates these CSS custom properties:

```css
:root {
    /* Colors */
    --color-primary: #3b82f6;
    --color-primary-50: #f0f9ff;
    --color-primary-100: #e0f2fe;
    --color-primary-200: #bae6fd;
    /* ... all 11 shades */
    --color-primary-950: #172554;
    
    /* Typography */
    --font-primary: 'Inter', sans-serif;
}
```

### Using Custom Properties Directly
```css
.custom-component {
    background-color: var(--color-primary-500);
    color: var(--color-primary-50);
    font-family: var(--font-primary);
}

.custom-button {
    background: linear-gradient(
        135deg,
        var(--color-primary-500),
        var(--color-primary-600)
    );
}
```

## Best Practices

### 1. Prefer Theme Colors
```html
<!-- ✅ Good: Uses theme colors -->
<button class="bg-primary-500 text-white">Button</button>

<!-- ❌ Avoid: Hard-coded colors -->
<button class="bg-blue-500 text-white">Button</button>
```

### 2. Use Primary Font
```html
<!-- ✅ Good: Uses theme font -->
<p class="font-primary">Text content</p>

<!-- ❌ Avoid: Hard-coded fonts -->
<p class="font-sans">Text content</p>
```

### 3. Consistent Color Shades
```html
<!-- ✅ Good: Consistent shade usage -->
<div class="bg-primary-50 border-primary-200">
    <p class="text-primary-700">Content</p>
    <button class="bg-primary-500">Action</button>
</div>
```

### 4. Accessible Contrast
```html
<!-- ✅ Good: High contrast -->
<div class="bg-primary-50">
    <p class="text-primary-900">Dark text on light background</p>
</div>

<div class="bg-primary-900">
    <p class="text-primary-50">Light text on dark background</p>
</div>
```

This system ensures that all Tailwind classes automatically adapt to the theme colors and fonts selected in the admin interface, providing a truly dynamic theming system for the GPZH municipal portal demos.