export default {
  plugins: {
    'postcss-preset-env': {
      stage: 2, // Use features at stage 2 or more stable
      features: {
        'nesting-rules': true,
        'custom-properties': {
          preserve: true, // Keep CSS custom properties
          disableDeprecationNotice: true // Avoid deprecation warnings
        },
        'custom-media-queries': true,
        'media-query-ranges': true,
        'logical-properties-and-values': true,
        'color-functional-notation': true
      },
      // Enhanced browser support with automatic polyfills
      // browsers: 'browserslist', // Remove to use default browserslist config
      preserve: true, // Keep original code alongside transformed code for better compatibility
    },
    autoprefixer: {
      // Use browserslist configuration
      cascade: false, // Disable visual cascade for smaller files
      remove: true, // Remove outdated prefixes
    },
    // Basic CSS optimization for production
    ...(process.env.NODE_ENV === 'production' && {
      'cssnano': {
        preset: ['default', {
          calc: false, // Don't transform calc() expressions to prevent lexical errors
          cssDeclarationSorter: false // Preserve CSS declaration order for complex calculations
        }]
      }
    })
  },
};