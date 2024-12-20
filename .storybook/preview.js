/** @type { import('@storybook/server').Preview } */
const preview = {
  globals: {
    drupalTheme: 'adesso_standard',
    supportedDrupalThemes: {
      adesso_standard: {title: 'adesso_standard'},
    },
  },
  server: {
    url: process.env.STORYBOOK_SERVER_URL || 'http://adesso-cms.ddev.site/storybook/stories/render',
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
