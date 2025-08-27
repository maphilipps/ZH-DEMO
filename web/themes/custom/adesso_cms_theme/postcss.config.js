export default {
  plugins: {
    'postcss-preset-env': {
      stage: 2, // Use features at stage 2 or more stable
      features: {
        'nesting-rules': true,
        'custom-properties': true,
        'custom-media-queries': true,
        'media-query-ranges': true
      }
    },
    autoprefixer: {}
  },
};