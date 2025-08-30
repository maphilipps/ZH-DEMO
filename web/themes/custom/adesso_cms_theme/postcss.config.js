/**
 * PostCSS Configuration for PnX Architecture
 * Enhanced browser compatibility with Swiss government standards
 * Integrates with browserslist for consistent cross-browser support
 */

export default {
  plugins: {
    // Enhanced Autoprefixer configuration for Swiss government browser support
    autoprefixer: {
      // Uses browserslist from .browserslistrc automatically
      flexbox: 'no-2009', // Disable old flexbox for IE 10
      grid: 'autoplace', // Enable CSS Grid with IE 10-11 support
      overrideBrowserslist: undefined, // Use .browserslistrc
      cascade: false, // Disable visual cascade for smaller CSS
      remove: true, // Remove outdated prefixes
      supports: false, // Disable @supports detection
      stats: undefined, // Use default browser usage stats
    },
  },
};