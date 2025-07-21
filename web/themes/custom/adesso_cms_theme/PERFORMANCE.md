# Performance Optimization - adesso CMS Theme

## Overview

This document outlines the comprehensive performance optimization strategies implemented in the adesso CMS theme to ensure fast loading times, efficient resource usage, and excellent user experience.

## Optimization Status ✅

### Asset Optimization Features

#### ✅ Preload Hints
**Critical Resource Preloading:**
- Critical fonts (Open Sans WOFF2)
- Essential CSS files (adesso.css)
- Core JavaScript (error-handler.js)
- Hero images (homepage only)

**Implementation:**
```php
// In hook_page_attachments_alter()
$critical_assets = [
  [
    'href' => 'https://fonts.gstatic.com/s/opensans/v40/...',
    'as' => 'font',
    'type' => 'font/woff2',
    'crossorigin' => 'anonymous',
  ]
];
```

#### ✅ Resource Hints
**DNS Prefetch & Preconnect:**
- Google Fonts domains
- External CDN domains (unpkg.com)
- Font delivery optimization

**Benefits:**
- Reduces DNS lookup time
- Establishes early connections
- Improves perceived performance

#### ✅ Lazy Loading
**Intelligent Image Loading:**
- Non-critical images load on demand
- Critical images (logos, hero) load immediately
- Above-the-fold images excluded from lazy loading

**Implementation:**
```php
function adesso_cms_theme_preprocess_image(&$variables) {
  if (!_adesso_cms_theme_is_critical_image($variables)) {
    $variables['attributes']['loading'] = 'lazy';
    $variables['attributes']['decoding'] = 'async';
  }
}
```

#### ✅ Service Worker Caching
**Advanced Caching Strategies:**
- Static asset caching (7 days)
- Dynamic content caching (1 day)
- Network-first for admin/API
- Cache-first for static assets
- Stale-while-revalidate for HTML

## Performance Metrics

### Core Web Vitals Optimization

**Largest Contentful Paint (LCP):**
- ✅ Critical CSS preloaded
- ✅ Hero images optimized
- ✅ Font loading optimized
- **Target:** < 2.5 seconds

**First Input Delay (FID):**
- ✅ JavaScript loading optimized
- ✅ Error handling prevents blocking
- ✅ Event listeners cleaned up properly
- **Target:** < 100 milliseconds

**Cumulative Layout Shift (CLS):**
- ✅ Responsive image sizing
- ✅ Consistent component dimensions
- ✅ Font loading without layout shift
- **Target:** < 0.1

### Loading Performance

**Time to First Byte (TTFB):**
- ✅ Server-side caching
- ✅ PHP optimization
- ✅ Database query optimization

**First Contentful Paint (FCP):**
- ✅ Critical CSS inlined
- ✅ Non-critical CSS deferred
- ✅ JavaScript loading optimized

## Caching Strategies

### Service Worker Implementation

**Cache Types:**
```javascript
const CACHE_DURATION = {
  STATIC: 7 * 24 * 60 * 60 * 1000, // 7 days
  DYNAMIC: 24 * 60 * 60 * 1000,    // 1 day
  API: 5 * 60 * 1000,              // 5 minutes
};
```

**Caching Strategies:**

1. **Network First** (Admin/API):
   - Always try network
   - Fallback to cache on failure
   - Ensures fresh data for critical operations

2. **Cache First** (Static Assets):
   - Serve from cache immediately
   - Update cache in background
   - Optimal for CSS, JS, images

3. **Stale While Revalidate** (HTML):
   - Return cached version immediately
   - Update cache in background
   - Balance between speed and freshness

### Browser Caching

**HTTP Headers:**
- Static assets: 1 year cache
- Dynamic content: 1 hour cache
- API responses: No cache
- Images: 30 days cache

## Image Optimization

### Responsive Images

**Automatic Sizing:**
```php
$variables['attributes']['sizes'] = '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
```

**Format Optimization:**
- WebP for modern browsers
- JPEG fallback for compatibility
- SVG for icons and logos

### Lazy Loading Strategy

**Critical Image Detection:**
- Homepage hero images
- Logo and branding elements
- First 3 images on page
- Images above the fold

**Benefits:**
- Reduced initial page weight
- Faster perceived loading
- Better bandwidth usage
- Improved user experience

## JavaScript Optimization

### Code Splitting

**Loading Strategy:**
- Critical JS loaded immediately
- Non-critical JS deferred
- Component-specific JS loaded on demand

### Error Handling

**Performance Impact:**
- Graceful degradation
- No blocking errors
- Memory leak prevention
- Event listener cleanup

## CSS Optimization

### Critical CSS

**Inline Strategy:**
- Above-the-fold styles inlined
- Non-critical CSS loaded asynchronously
- Tailwind CSS optimized for production

### Font Loading

**Optimization Strategy:**
```css
@font-face {
  font-family: 'Open Sans';
  font-display: swap; /* Prevent layout shift */
  src: url('font.woff2') format('woff2');
}
```

## Environment Detection

### Production Optimizations

**Environment-Specific Features:**
```php
function _adesso_cms_theme_is_production() {
  // Check environment variables
  // Disable debug features
  // Enable aggressive caching
  // Register service worker
}
```

**Development Features:**
- Service worker disabled
- Cache headers relaxed
- Debug information available
- Hot reloading support

## Monitoring and Analytics

### Performance Monitoring

**Metrics Collection:**
- Core Web Vitals tracking
- Resource loading times
- Cache hit/miss ratios
- Error tracking

**Tools Integration:**
- Google PageSpeed Insights
- Lighthouse CI
- WebPageTest
- Real User Monitoring (RUM)

## Best Practices Implementation

### Resource Loading

1. **Critical Path Optimization:**
   - Minimize critical resources
   - Inline critical CSS
   - Defer non-critical JavaScript

2. **Progressive Enhancement:**
   - Content loads without JavaScript
   - Features enhance with JS
   - Graceful degradation

3. **Efficient Bundling:**
   - Webpack optimization
   - Code splitting
   - Tree shaking

### Performance Budget

**Resource Limits:**
- Total page weight: < 1MB
- JavaScript bundle: < 300KB
- CSS bundle: < 100KB
- Images: Optimized and compressed

## Testing Guidelines

### Performance Testing

**Automated Testing:**
```bash
# Lighthouse CI
npm run lighthouse

# PageSpeed testing
npm run pagespeed

# Bundle analysis
npm run analyze
```

**Manual Testing:**
- Test on 3G networks
- Test on mobile devices
- Test with throttled CPU
- Test cache scenarios

### Debugging Performance

**Common Issues:**
1. Large unused CSS/JS
2. Unoptimized images
3. Blocking resources
4. Cache misconfigurations

**Debug Tools:**
- Chrome DevTools Performance tab
- Network waterfall analysis
- Coverage analysis
- Lighthouse audits

## Implementation Checklist

### ✅ Completed Optimizations

- [x] Preload hints for critical resources
- [x] DNS prefetch for external domains
- [x] Lazy loading for images
- [x] Service worker caching
- [x] Critical CSS optimization
- [x] Font loading optimization
- [x] JavaScript error handling
- [x] Environment-specific optimizations

### 🔄 Ongoing Optimizations

- [ ] WebP image conversion
- [ ] HTTP/2 Server Push
- [ ] Brotli compression
- [ ] Edge caching configuration

### 📋 Future Improvements

- [ ] Advanced service worker features
- [ ] Real-time performance monitoring
- [ ] A/B testing for performance
- [ ] Progressive Web App features

## Configuration

### Environment Variables

```bash
# Production optimizations
DRUPAL_ENV=production

# Cache settings
CACHE_TTL=3600

# Performance monitoring
ENABLE_MONITORING=true
```

### Drupal Configuration

**Performance Settings:**
- CSS/JS aggregation enabled
- Gzip compression enabled
- Page caching enabled
- BigPipe enabled

## Troubleshooting

### Common Issues

**Service Worker Not Loading:**
- Check HTTPS requirement
- Verify file path
- Check console errors
- Verify registration script

**Cache Not Working:**
- Check cache headers
- Verify service worker registration
- Clear browser cache
- Check network requests

**Images Not Lazy Loading:**
- Verify IntersectionObserver support
- Check image attributes
- Verify JavaScript execution
- Test on different devices

## Resources

### External Resources
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Service Worker Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

### Internal Documentation
- [JavaScript Error Handling](./src/js/error-handler.js)
- [Component Architecture](./components/README.md)
- [Build Process](./webpack.config.js)

## Changelog

### Version 2.0.0 (Current)
- ✅ Complete asset optimization implementation
- ✅ Service worker caching strategy
- ✅ Intelligent lazy loading
- ✅ Critical resource preloading
- ✅ Environment-specific optimizations

### Planned for Version 2.1.0
- ⏳ WebP image conversion pipeline
- ⏳ Advanced cache strategies
- ⏳ Real-time performance monitoring
- ⏳ Progressive Web App features